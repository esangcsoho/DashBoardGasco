"use client";
import { useState } from "react";
import {
  Card,
  Metric,
  Text,
  Grid,
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
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Flex
} from "@tremor/react";

const chartData = [
  { producto: "Propano SC", toneladas: 1250, stock: 900 },
  { producto: "Mezcla", toneladas: 1000, stock: 700 },
  { producto: "Butano", toneladas: 750, stock: 500 },
];

export default function LayoutsShowcase() {
  const [tab, setTab] = useState(0);
  const [selectedPlanta, setSelectedPlanta] = useState("todas");
  const [toggle, setToggle] = useState(false);
  return (
    <main className="p-4 md:p-10 bg-gray-50 min-h-screen">
      {/* Layout 1: Propuesta KPI Nacional (Moderno) */}
      <section className="mb-16">
        <Text className="text-2xl font-bold mb-2">Propuesta KPI Nacional (Moderno)</Text>
        <Text className="mb-4 text-gray-600">Ejemplo de layout moderno para vista nacional, inspirado en el panel antiguo pero con mejores prácticas UI/UX y solo usando la data actual.</Text>
        <Grid numItems={1} className="gap-6 mb-8">
          <Card className="p-6 bg-white border-blue-100 shadow-md">
            <Flex className="gap-4 mb-4 items-center">
              <select value={selectedPlanta} onChange={(e) => setSelectedPlanta(e.target.value)} className="w-48">
                <option value="todas">Todas las Plantas</option>
                <option value="maipu">Maipú</option>
                <option value="mejillones">Mejillones</option>
                <option value="belloto">Belloto</option>
              </select>
              <fieldset>
                <input type="checkbox" checked={toggle} onChange={() => setToggle(!toggle)} />
                <label>Mostrar solo críticos</label>
              </fieldset>
              <Button color="blue">Exportar</Button>
            </Flex>
            {/* Fila 1: KPIs principales */}
            <Grid numItems={1} numItemsMd={3} className="gap-4 mb-4">
              {/* KPI Ocupación Total */}
              <Card className="bg-blue-50 border-blue-200 flex flex-col items-center justify-center">
                <Text className="text-blue-700">Ocupación Total</Text>
                <Metric className="text-blue-900">45%</Metric>
                <Text className="text-xs text-gray-500">1.963 TON Stock Físico</Text>
                <Text className="text-xs text-gray-500">-94 TON Diferencia</Text>
                <Text className="text-xs text-gray-500">2.057 TON SGP / 4.320 TON SAP</Text>
              </Card>
              {/* Resumen según producto (DonutChart simulado) */}
              <Card className="bg-white border-blue-100 flex flex-col items-center justify-center">
                <Text className="text-blue-700 mb-2">Resumen según producto</Text>
                <DonutChart data={chartData} category="toneladas" index="producto" colors={["blue", "cyan", "red"]} className="h-40 w-full" />
              </Card>
              {/* Resumen por producto (Tabla pequeña) */}
              <Card className="bg-white border-blue-100 flex flex-col items-center justify-center">
                <Text className="text-blue-700 mb-2">Resumen por producto</Text>
                <details>
                  <summary>Ver detalle</summary>
                  <Table className="w-full text-xs">
                    <TableHead>
                      <TableRow>
                        <TableHeaderCell>Producto</TableHeaderCell>
                        <TableHeaderCell>Stock Físico</TableHeaderCell>
                        <TableHeaderCell>Stock SGP</TableHeaderCell>
                        <TableHeaderCell>Stock SAP</TableHeaderCell>
                        <TableHeaderCell>Diferencia</TableHeaderCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Propano SC</TableCell>
                        <TableCell>1.389</TableCell>
                        <TableCell>1.389</TableCell>
                        <TableCell>1.389</TableCell>
                        <TableCell>0</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Mezcla</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Butano</TableCell>
                        <TableCell>469</TableCell>
                        <TableCell>469</TableCell>
                        <TableCell>469</TableCell>
                        <TableCell>0</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </details>
              </Card>
            </Grid>
            {/* Fila 2: Breakdown por subsistema */}
            <Grid numItems={1} numItemsMd={7} className="gap-2 mb-4">
              {/* Cards por subsistema (ejemplo con 7) */}
              {["Maipú", "Mejillones", "Belloto", "Talca", "Biobío", "Osorno", "Coyhaique"].map((ss, i) => (
                <Card key={ss} className="bg-blue-100 border-blue-200 flex flex-col items-center p-2">
                  <Text className="text-xs text-blue-700">SS{i + 1} {ss}</Text>
                  <Metric className="text-blue-900">{i === 0 ? "1.157 TON" : i === 1 ? "204 TON" : i === 4 ? "445 TON" : "0 TON"}</Metric>
                  <Text className="text-xs text-gray-500">Ocupación {i === 0 ? "48%" : i === 1 ? "84%" : i === 4 ? "56%" : "0%"}</Text>
                  <fieldset>
                    <input type="checkbox" checked={toggle} onChange={() => setToggle(!toggle)} />
                    <label>Mostrar detalle</label>
                  </fieldset>
                  {toggle && (
                    <details>
                      <summary>Breakdown</summary>
                      <Text className="text-xs">Detalle de breakdown para {ss}</Text>
                    </details>
                  )}
                </Card>
              ))}
            </Grid>
            {/* Fila 3: Stock Inicial Nacional y por Subsistema */}
            <Grid numItems={1} numItemsMd={2} className="gap-4 mb-4">
              <Card className="bg-blue-50 border-blue-200 flex flex-col items-center justify-center">
                <Text className="text-blue-700">Stock Inicial Nacional</Text>
                <Metric className="text-blue-900">47.897</Metric>
                <Text className="text-xs text-gray-500">Cilindros</Text>
              </Card>
              <Card className="bg-white border-blue-100 flex flex-col items-center justify-center">
                <Text className="text-blue-700">Stock Inicial por Subsistema</Text>
                <Grid numItems={7} className="gap-2 w-full">
                  {["Maipú", "Mejillones", "Belloto", "Talca", "Biobío", "Osorno", "Coyhaique"].map((ss, i) => (
                    <Card key={ss} className="bg-blue-100 border-blue-200 flex flex-col items-center p-2">
                      <Text className="text-xs text-blue-700">{ss}</Text>
                      <Metric className="text-blue-900">{i === 0 ? "23.454" : i === 1 ? "7.076" : i === 2 ? "57.206" : i === 4 ? "19.428" : i === 5 ? "3.241" : i === 6 ? "2.718" : "0"}</Metric>
                    </Card>
                  ))}
                </Grid>
              </Card>
            </Grid>
            {/* Fila 4: Resumen por Categoría (Tabla) */}
            <Card className="bg-white border-blue-100 mt-4">
              <Text className="text-blue-700 mb-2">Resumen por Categoría (Nacional)</Text>
              <details>
                <summary>Ver detalle</summary>
                <Table className="w-full text-xs">
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell>Masa Total</TableHeaderCell>
                      <TableHeaderCell>Llenos</TableHeaderCell>
                      <TableHeaderCell>Vacíos</TableHeaderCell>
                      <TableHeaderCell>Mantención</TableHeaderCell>
                      <TableHeaderCell>Competencia</TableHeaderCell>
                      <TableHeaderCell>Masa Operativa</TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>17.094</TableCell>
                      <TableCell>47.897</TableCell>
                      <TableCell>35.743</TableCell>
                      <TableCell>15.094</TableCell>
                      <TableCell>8.666</TableCell>
                      <TableCell>16.788</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </details>
            </Card>
          </Card>
        </Grid>
      </section>

      {/* Layout 2: Executive Overview con Tabs Interactivos */}
      <section className="mb-16">
        <Text className="text-2xl font-bold mb-2">Executive Overview (Interactivo)</Text>
        <Text className="mb-4 text-gray-600">Dashboard ejecutivo con tabs para alternar entre KPIs, gráficos y tablas. Usa bloques Tremor y buenas prácticas UI/UX.</Text>
        <Card className="p-6 bg-white border-blue-100 shadow-md">
          <TabGroup index={tab} onIndexChange={setTab}>
            <TabList>
              <Tab>KPIs</Tab>
              <Tab>Gráficos</Tab>
              <Tab>Detalle</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Grid numItems={1} numItemsMd={3} className="gap-4 mb-4">
                  <Card className="bg-blue-50 border-blue-200 flex flex-col items-center justify-center">
                    <Text className="text-blue-700">Producción Diaria</Text>
                    <Metric className="text-blue-900">2.500</Metric>
                    <Badge color="green">Óptimo</Badge>
                  </Card>
                  <Card className="bg-yellow-50 border-yellow-200 flex flex-col items-center justify-center">
                    <Text className="text-yellow-700">Stock Crítico</Text>
                    <Metric className="text-yellow-900">350</Metric>
                    <Badge color="red">Crítico</Badge>
                  </Card>
                  <Card className="bg-gray-50 border-gray-200 flex flex-col items-center justify-center">
                    <Text className="text-gray-700">Eficiencia</Text>
                    <Metric className="text-gray-900">91%</Metric>
                    <Badge color="green">Alta</Badge>
                  </Card>
                </Grid>
              </TabPanel>
              <TabPanel>
                <Grid numItems={1} numItemsMd={2} className="gap-4 mb-4">
                  <Card className="w-full">
                    <Text className="mb-2">Distribución Materia Prima</Text>
                    <BarChart data={chartData} index="producto" categories={["toneladas"]} colors={["blue"]} className="h-56" />
                  </Card>
                  <Card className="w-full">
                    <Text className="mb-2">Stock por Producto</Text>
                    <DonutChart data={chartData} category="stock" index="producto" colors={["red", "blue", "cyan"]} className="h-56" />
                  </Card>
                </Grid>
              </TabPanel>
              <TabPanel>
                <Card className="w-full">
                  <Text className="mb-2">Detalle de Stock</Text>
                  <details>
                    <summary>Ver tabla</summary>
                    <Table className="mt-4">
                      <TableHead>
                        <TableRow>
                          <TableHeaderCell>Producto</TableHeaderCell>
                          <TableHeaderCell>Toneladas</TableHeaderCell>
                          <TableHeaderCell>Stock</TableHeaderCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {chartData.map((row) => (
                          <TableRow key={row.producto}>
                            <TableCell>{row.producto}</TableCell>
                            <TableCell>{row.toneladas}</TableCell>
                            <TableCell>{row.stock}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </details>
                </Card>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </Card>
      </section>

      {/* Layout 3: Panel Operativo con Filtros y Acciones */}
      <section className="mb-16">
        <Text className="text-2xl font-bold mb-2">Panel Operativo (Filtros y Acciones)</Text>
        <Text className="mb-4 text-gray-600">Panel con filtros interactivos, acciones rápidas y breakdown visual. Usa bloques Tremor y buenas prácticas UI/UX.</Text>
        <Card className="p-6 bg-white border-blue-100 shadow-md">
          <Flex className="gap-4 mb-4">
            <select value={selectedPlanta} onChange={(e) => setSelectedPlanta(e.target.value)} className="w-48">
              <option value="todas">Todas las Plantas</option>
              <option value="maipu">Maipú</option>
              <option value="mejillones">Mejillones</option>
              <option value="belloto">Belloto</option>
            </select>
            <fieldset>
              <input type="checkbox" checked={toggle} onChange={() => setToggle(!toggle)} />
              <label>Mostrar solo críticos</label>
            </fieldset>
            <Button color="blue">Filtrar</Button>
            <Button color="gray">Hoy</Button>
            <Button color="yellow">Última Semana</Button>
            <Button color="red">Exportar</Button>
          </Flex>
          <Grid numItems={1} numItemsMd={3} className="gap-4 mb-4">
            <Card className="bg-blue-50 border-blue-200 flex flex-col items-center justify-center">
              <Text className="text-blue-700">Stock Total</Text>
              <Metric className="text-blue-900">3.150 ton</Metric>
            </Card>
            <Card className="bg-green-50 border-green-200 flex flex-col items-center justify-center">
              <Text className="text-green-700">Cilindros en Planta</Text>
              <Metric className="text-green-900">12.500</Metric>
            </Card>
            <Card className="bg-yellow-50 border-yellow-200 flex flex-col items-center justify-center">
              <Text className="text-yellow-700">Alertas Activas</Text>
              <Metric className="text-yellow-900">3</Metric>
            </Card>
          </Grid>
          <Grid numItems={1} numItemsMd={2} className="gap-4 mb-4">
            <Card className="w-full">
              <Text className="mb-2">Distribución Materia Prima</Text>
              <BarChart data={chartData} index="producto" categories={["toneladas"]} colors={["blue"]} className="h-56" />
            </Card>
            <Card className="w-full">
              <Text className="mb-2">Stock por Producto</Text>
              <DonutChart data={chartData} category="stock" index="producto" colors={["red", "blue", "cyan"]} className="h-56" />
            </Card>
          </Grid>
          <details>
            <summary>Ver detalle de breakdown</summary>
            <Table className="mt-4">
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Producto</TableHeaderCell>
                  <TableHeaderCell>Toneladas</TableHeaderCell>
                  <TableHeaderCell>Stock</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {chartData.map((row) => (
                  <TableRow key={row.producto}>
                    <TableCell>{row.producto}</TableCell>
                    <TableCell>{row.toneladas}</TableCell>
                    <TableCell>{row.stock}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </details>
        </Card>
      </section>
    </main>
  );
} 