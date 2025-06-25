"use client";

import { useState } from "react";
import {
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Title,
  Text,
  Grid,
  Card,
  Metric,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  BarChart,
  DonutChart,
  Badge,
  Button,
  Flex,
  LineChart
} from "@tremor/react";

import CompendioSesiones from "./CompendioSesiones";
import RepoOverviewBlock from "components/dashboard-blocks/RepoOverviewBlock";
import CapitalOverviewBlock from "components/dashboard-blocks/CapitalOverviewBlock";
import CilindrosBlock from "components/dashboard-blocks/CilindrosBlock";
import MateriaPrimaBlock from "components/dashboard-blocks/MateriaPrimaBlock";
import MasaOptimaBlock from "components/dashboard-blocks/MasaOptimaBlock";
import KpiCard from "components/dashboard-blocks/KpiCard";
import CircularProgress from "components/dashboard-blocks/CircularProgress";
import ComponentsShowcase from "./components";

// Datos de ejemplo para los layouts
const chartData = [
  { producto: "Propano SC", toneladas: 1250, stock: 900 },
  { producto: "Mezcla", toneladas: 1000, stock: 700 },
  { producto: "Butano", toneladas: 750, stock: 500 },
];

const materiaPrimaData = [
  { fecha: "2024-01-01", propano: 1200, butano: 800, mezcla: 950 },
  { fecha: "2024-01-02", propano: 1150, butano: 850, mezcla: 900 },
  { fecha: "2024-01-03", propano: 1300, butano: 750, mezcla: 1000 },
];

const cilindrosData = [
  { tipo: "5 Kg", llenos: 1200, vacios: 800, mantencion: 100 },
  { tipo: "11 Kg", llenos: 2500, vacios: 1500, mantencion: 200 },
  { tipo: "15 Kg", llenos: 1800, vacios: 1200, mantencion: 150 },
  { tipo: "45 Kg", llenos: 500, vacios: 300, mantencion: 50 },
];

const masaOptimaData = [
  { fecha: "2024-01-01", real: 95, objetivo: 98 },
  { fecha: "2024-01-02", real: 96, objetivo: 98 },
  { fecha: "2024-01-03", real: 97, objetivo: 98 },
];

// Definimos las dos secciones principales
const SECTIONS = {
  COMPENDIO: "compendio",
  CATALOGO: "catalogo"
} as const;

export default function ComponentShowcase() {
  const [selectedSection, setSelectedSection] = useState<typeof SECTIONS[keyof typeof SECTIONS]>(SECTIONS.CATALOGO);
  const [selectedCatalogoTab, setSelectedCatalogoTab] = useState(0);
  const [selectedPlanta, setSelectedPlanta] = useState("todas");
  const [toggle, setToggle] = useState(false);
  const [layoutTab, setLayoutTab] = useState(0);
  const [selectedLayout, setSelectedLayout] = useState("kpi-nacional");

  return (
    <main className="p-4 md:p-10 bg-gray-50 min-h-screen">
      {/* Selector Principal */}
      <div className="mb-8">
        <Title className="mb-4">Dashboard Gasco - Recursos de Diseño</Title>
        <div className="flex gap-4">
          <button
            onClick={() => setSelectedSection(SECTIONS.CATALOGO)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedSection === SECTIONS.CATALOGO
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Catálogo de Componentes
          </button>
          <button
            onClick={() => setSelectedSection(SECTIONS.COMPENDIO)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedSection === SECTIONS.COMPENDIO
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Compendio de Sesiones
          </button>
        </div>
      </div>

      {/* Contenido Principal */}
      {selectedSection === SECTIONS.CATALOGO ? (
        <div>
          <Title className="mb-4">Catálogo de Bloques Ejecutivos Gasco</Title>
          <Text className="mb-8 text-gray-600">
            Explora y elige visualmente los bloques y variantes más óptimos para tu dashboard ejecutivo.
          </Text>

          <TabGroup index={selectedCatalogoTab} onIndexChange={setSelectedCatalogoTab}>
            <TabList className="mb-8">
              <Tab>
                <span>Overview</span>
              </Tab>
              <Tab>
                <span>Temáticos</span>
              </Tab>
              <Tab>
                <span>KPI Cards</span>
              </Tab>
              <Tab>
                <span>Layouts</span>
              </Tab>
              <Tab>
                <span>Componentes</span>
              </Tab>
        </TabList>
        <TabPanels>
              {/* Overview Panel */}
          <TabPanel>
                <div className="space-y-8">
                  <Card>
                    <Title className="mb-4">Overview de Repositorio</Title>
                    <RepoOverviewBlock />
                </Card>
                  <Card>
                    <Title className="mb-4">Overview de Capital</Title>
                    <CapitalOverviewBlock />
                </Card>
                </div>
              </TabPanel>

              {/* Temáticos Panel */}
              <TabPanel>
                <div className="space-y-8">
                  <Card>
                    <Title className="mb-4">Cilindros</Title>
                    <CilindrosBlock />
                </Card>
                  <Card>
                    <Title className="mb-4">Materia Prima</Title>
                    <MateriaPrimaBlock />
                </Card>
                  <Card>
                    <Title className="mb-4">Masa Óptima</Title>
                    <MasaOptimaBlock />
                  </Card>
                </div>
              </TabPanel>

              {/* KPI Cards Panel */}
              <TabPanel>
                <div className="space-y-8">
                  <Card>
                    <Title className="mb-4">KPI Cards</Title>
                    <Grid numItems={1} numItemsMd={3} className="gap-6">
                      <KpiCard title="Stock Total" value="3.150 ton" trend="+2.1%" trendType="up" />
                      <KpiCard title="Cilindros en Planta" value="12.500" trend="-1.2%" trendType="down" />
                      <KpiCard title="Alertas Activas" value="3" trend="+1" trendType="up" />
                    </Grid>
                  </Card>
                  <Card>
                    <Title className="mb-4">Progreso Circular</Title>
                    <CircularProgress value={71} label="Ocupación" size={80} />
                  </Card>
                </div>
              </TabPanel>

              {/* Layouts Panel */}
              <TabPanel>
                <div className="mb-8">
                  <Title className="mb-4">Selecciona un Layout</Title>
                  <div className="flex gap-4 mb-8">
                    <button
                      onClick={() => setSelectedLayout("kpi-nacional")}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        selectedLayout === "kpi-nacional" ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      KPI Nacional
                    </button>
                    <button
                      onClick={() => setSelectedLayout("materia-prima")}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        selectedLayout === "materia-prima" ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      Materia Prima
                    </button>
                    <button
                      onClick={() => setSelectedLayout("resumen-cilindros")}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        selectedLayout === "resumen-cilindros" ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      Resumen Cilindros
                    </button>
                    <button
                      onClick={() => setSelectedLayout("masa-optima")}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        selectedLayout === "masa-optima" ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      Masa Óptima
                    </button>
                  </div>

                  {/* Layout KPI Nacional */}
                  {selectedLayout === "kpi-nacional" && (
                    <Card className="p-6 bg-white border-blue-100 shadow-md">
                      <Flex className="gap-4 mb-4 items-center">
                        <select 
                          value={selectedPlanta} 
                          onChange={(e) => setSelectedPlanta(e.target.value)}
                          className="w-48 px-3 py-2 border rounded-lg"
                        >
                          <option value="todas">Todas las Plantas</option>
                          <option value="maipu">Maipú</option>
                          <option value="mejillones">Mejillones</option>
                          <option value="belloto">Belloto</option>
                        </select>
                        <label className="flex items-center gap-2">
                          <input 
                            type="checkbox" 
                            checked={toggle} 
                            onChange={() => setToggle(!toggle)}
                            className="w-4 h-4"
                          />
                          <span>Mostrar solo críticos</span>
                        </label>
                        <Button size="xs" color="blue">Exportar</Button>
                </Flex>

                      {/* KPIs principales */}
                      <Grid numItems={1} numItemsMd={3} className="gap-4 mb-4">
                        <Card className="bg-blue-50 border-blue-200">
                          <Text className="text-blue-700">Ocupación Total</Text>
                          <Metric className="text-blue-900">45%</Metric>
                          <Text className="text-xs text-gray-500">1.963 TON Stock Físico</Text>
                          <Text className="text-xs text-gray-500">-94 TON Diferencia</Text>
                </Card>
                        <Card className="bg-white border-blue-100">
                          <Text className="text-blue-700 mb-2">Resumen según producto</Text>
                          <DonutChart
                            data={chartData}
                            category="toneladas"
                            index="producto"
                            colors={["blue", "cyan", "red"]}
                            className="h-40"
                  />
                </Card>
                        <Card className="bg-white border-blue-100">
                          <Text className="text-blue-700 mb-2">Resumen por producto</Text>
                          <Table className="mt-2">
                    <TableHead>
                      <TableRow>
                        <TableHeaderCell>Producto</TableHeaderCell>
                        <TableHeaderCell>Stock</TableHeaderCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {chartData.map((row) => (
                        <TableRow key={row.producto}>
                          <TableCell>{row.producto}</TableCell>
                          <TableCell>{row.stock}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
                      </Grid>
                    </Card>
                  )}

                  {/* Layout Materia Prima */}
                  {selectedLayout === "materia-prima" && (
                    <Card className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <Title>Dashboard Materia Prima</Title>
                        <div className="flex gap-4">
                          <select className="px-3 py-2 border rounded-lg">
                            <option>Última Semana</option>
                            <option>Último Mes</option>
                            <option>Último Año</option>
                          </select>
                          <Button size="xs">Exportar</Button>
                        </div>
                      </div>

                      <Grid numItems={1} numItemsMd={3} className="gap-6 mb-6">
                        <Card className="bg-blue-50">
                          <Text>Stock Propano</Text>
                          <Metric>1.200 TON</Metric>
                          <Badge color="green">Normal</Badge>
                </Card>
                        <Card className="bg-yellow-50">
                          <Text>Stock Butano</Text>
                          <Metric>800 TON</Metric>
                          <Badge color="yellow">Precaución</Badge>
                </Card>
                        <Card className="bg-red-50">
                          <Text>Stock Mezcla</Text>
                          <Metric>950 TON</Metric>
                          <Badge color="red">Crítico</Badge>
                </Card>
              </Grid>

                      <div className="space-y-6">
                        <Card>
                          <Title className="mb-4">Evolución de Stock</Title>
                          <LineChart
                            data={materiaPrimaData}
                            index="fecha"
                            categories={["propano", "butano", "mezcla"]}
                            colors={["blue", "yellow", "red"]}
                            yAxisWidth={40}
                            className="h-72"
                  />
                </Card>

                        <Grid numItems={1} numItemsMd={2} className="gap-6">
                          <Card>
                            <Title className="mb-4">Distribución Actual</Title>
                  <DonutChart
                    data={chartData}
                    category="toneladas"
                    index="producto"
                              colors={["blue", "yellow", "red"]}
                              className="h-64"
                  />
                </Card>
                          <Card>
                            <Title className="mb-4">Detalle por Producto</Title>
                            <Table>
                        <TableHead>
                          <TableRow>
                            <TableHeaderCell>Producto</TableHeaderCell>
                                  <TableHeaderCell>Stock Actual</TableHeaderCell>
                                  <TableHeaderCell>Stock Mínimo</TableHeaderCell>
                                  <TableHeaderCell>Estado</TableHeaderCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                                <TableRow>
                                  <TableCell>Propano SC</TableCell>
                                  <TableCell>1.200 TON</TableCell>
                                  <TableCell>800 TON</TableCell>
                                  <TableCell><Badge color="green">Normal</Badge></TableCell>
                            </TableRow>
                            <TableRow>
                                  <TableCell>Butano</TableCell>
                                  <TableCell>800 TON</TableCell>
                                  <TableCell>600 TON</TableCell>
                                  <TableCell><Badge color="yellow">Precaución</Badge></TableCell>
                            </TableRow>
                                <TableRow>
                                  <TableCell>Mezcla</TableCell>
                                  <TableCell>950 TON</TableCell>
                                  <TableCell>1000 TON</TableCell>
                                  <TableCell><Badge color="red">Crítico</Badge></TableCell>
                              </TableRow>
                          </TableBody>
                        </Table>
                      </Card>
                        </Grid>
                  </div>
                </Card>
                  )}

                  {/* Layout Resumen Cilindros */}
                  {selectedLayout === "resumen-cilindros" && (
                    <Card className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <Title>Dashboard Resumen Cilindros</Title>
                        <div className="flex gap-4">
                          <select className="px-3 py-2 border rounded-lg">
                            <option>Todas las Plantas</option>
                            <option>Maipú</option>
                            <option>Belloto</option>
                          </select>
                          <Button size="xs">Exportar</Button>
                  </div>
                  </div>

                      <Grid numItems={1} numItemsMd={4} className="gap-6 mb-6">
                        {cilindrosData.map((tipo) => (
                          <Card key={tipo.tipo} className="bg-blue-50">
                            <Text>{tipo.tipo}</Text>
                            <Metric>{tipo.llenos + tipo.vacios + tipo.mantencion}</Metric>
                            <Text className="text-sm">Llenos: {tipo.llenos}</Text>
                            <Text className="text-sm">Vacíos: {tipo.vacios}</Text>
                          </Card>
                        ))}
                      </Grid>

                      <div className="space-y-6">
                        <Card>
                          <Title className="mb-4">Distribución por Estado</Title>
                          <Grid numItems={1} numItemsMd={2} className="gap-6">
                            <BarChart
                              data={cilindrosData}
                              index="tipo"
                              categories={["llenos", "vacios", "mantencion"]}
                              colors={["green", "yellow", "red"]}
                              stack
                              className="h-72"
                            />
                            <Table>
                        <TableHead>
                          <TableRow>
                                  <TableHeaderCell>Tipo</TableHeaderCell>
                                  <TableHeaderCell>Llenos</TableHeaderCell>
                                  <TableHeaderCell>Vacíos</TableHeaderCell>
                                  <TableHeaderCell>Mantención</TableHeaderCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                                {cilindrosData.map((row) => (
                                  <TableRow key={row.tipo}>
                                    <TableCell>{row.tipo}</TableCell>
                                    <TableCell>{row.llenos}</TableCell>
                                    <TableCell>{row.vacios}</TableCell>
                                    <TableCell>{row.mantencion}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                          </Grid>
                    </Card>
                  </div>
                </Card>
                  )}

                  {/* Layout Masa Óptima */}
                  {selectedLayout === "masa-optima" && (
                    <Card className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <Title>Dashboard Masa Óptima</Title>
                        <div className="flex gap-4">
                          <select className="px-3 py-2 border rounded-lg">
                            <option>Último Mes</option>
                            <option>Último Trimestre</option>
                            <option>Último Año</option>
                          </select>
                          <Button size="xs">Exportar</Button>
                        </div>
                      </div>

                      <Grid numItems={1} numItemsMd={3} className="gap-6 mb-6">
                        <Card className="bg-blue-50">
                          <Text>Eficiencia Actual</Text>
                          <Metric>97%</Metric>
                          <Badge color="green">Por encima del objetivo</Badge>
                  </Card>
                        <Card className="bg-green-50">
                          <Text>Objetivo</Text>
                          <Metric>98%</Metric>
                          <Text className="text-sm">Meta establecida</Text>
                  </Card>
                        <Card className="bg-yellow-50">
                          <Text>Promedio Mensual</Text>
                          <Metric>96%</Metric>
                          <Badge color="yellow">1% bajo objetivo</Badge>
                  </Card>
              </Grid>

                      <div className="space-y-6">
                        <Card>
                          <Title className="mb-4">Evolución de Eficiencia</Title>
                          <LineChart
                            data={masaOptimaData}
                            index="fecha"
                            categories={["real", "objetivo"]}
                            colors={["blue", "green"]}
                            yAxisWidth={40}
                          />
                        </Card>

                        <Grid numItems={1} numItemsMd={2} className="gap-6">
                          <Card>
                            <Title className="mb-4">Distribución de Desviaciones</Title>
                   <DonutChart
                              data={[
                                { rango: "Óptimo", cantidad: 80 },
                                { rango: "Aceptable", cantidad: 15 },
                                { rango: "Crítico", cantidad: 5 }
                              ]}
                              category="cantidad"
                              index="rango"
                              colors={["green", "yellow", "red"]}
                              className="h-64"
                            />
                          </Card>
                   <Card>
                            <Title className="mb-4">Detalle por Rango</Title>
                            <Table>
                          <TableHead>
                                <TableRow>
                                  <TableHeaderCell>Rango</TableHeaderCell>
                                  <TableHeaderCell>Cantidad</TableHeaderCell>
                                  <TableHeaderCell>Estado</TableHeaderCell>
                              </TableRow>
                          </TableHead>
                          <TableBody>
                                <TableRow>
                                  <TableCell>Óptimo (&gt;97%)</TableCell>
                                  <TableCell>80%</TableCell>
                                  <TableCell><Badge color="green">Normal</Badge></TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>Aceptable (95-97%)</TableCell>
                                  <TableCell>15%</TableCell>
                                  <TableCell><Badge color="yellow">Precaución</Badge></TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>Crítico (&lt;95%)</TableCell>
                                  <TableCell>5%</TableCell>
                                  <TableCell><Badge color="red">Crítico</Badge></TableCell>
                                  </TableRow>
                          </TableBody>
                       </Table>
                   </Card>
                        </Grid>
                      </div>
                    </Card>
                  )}
                </div>
          </TabPanel>

              {/* Componentes Panel */}
          <TabPanel>
                <ComponentsShowcase />
          </TabPanel>
        </TabPanels>
      </TabGroup>
        </div>
      ) : (
        <CompendioSesiones />
      )}
    </main>
  );
}