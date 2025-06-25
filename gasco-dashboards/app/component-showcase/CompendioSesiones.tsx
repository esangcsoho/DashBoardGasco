"use client";

import { Section, VersionBlock } from "./components";
import {
  Card,
  Text,
  Grid,
  Metric,
  Badge,
  BarChart,
  Button,
  Title,
  DonutChart,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
} from "@tremor/react";
import CircularProgress from "components/dashboard-blocks/CircularProgress";

// Datos de ejemplo para gráficos
const chartData = [
  { producto: "Propano SC", toneladas: 1250, stock: 900 },
  { producto: "Mezcla", toneladas: 1000, stock: 700 },
  { producto: "Butano", toneladas: 750, stock: 500 },
];

// Datos de imágenes por versión
const imagenesPorVersion: Record<string, string[]> = {
  "VERSION1-6": ["001-006.jpg"],
  "VERSION7": ["001.jpg"],
  "VERSION8": ["001.jpg", "002.jpg"],
  "VERSION9": ["001.jpg", "002.jpg"],
  "VERSION10": ["001.jpg", "002.jpg"],
  "VERSION11": ["001.jpg", "002.jpg"],
  "VERSION12": ["001.jpg", "002.jpg"],
  "VERSION13": ["001.jpg", "002.jpg", "003.jpg", "004.jpg"],
  "VERSION14": ["001.jpg", "002.jpg", "003.jpg"],
};

// Datos de evolución de todas las sesiones
const sesionesEvolucion = [
  {
    version: "Sesión 1-6",
    description: "Evolución inicial del dashboard: desde KPIs básicos hasta visualización avanzada",
    aprendizajes: [
      "Diferenciación crítica entre datos SGP (físicos) vs SAP (teóricos)",
      "Importancia de matriz cruzada: formato × clasificación",
      "Necesidad de información en tiempo real para stock",
      "Validación de productos: solo mostrar existentes físicamente"
    ],
    descartados: [
      "Sistema SGP legacy completo",
      "Actualización por minuto (por costos)",
      "Información inconsistente entre sistemas"
    ],
    utiles: [
      "Cuatro categorías operacionales: Llenos, Vacíos, Mantenimiento, Competencia",
      "Formatos estándar: 05K, 11K, 15K, 45K, GH-Aluminio",
      "Comparación SGP vs SAP como elemento central"
    ],
    element: (
      <Card className="w-full">
        <Grid numItems={1} numItemsMd={3} className="gap-6">
          <Card className="flex flex-col items-center justify-center p-6">
            <Text>Stock Total</Text>
            <Metric>3.150 ton</Metric>
            <Badge color="green" className="mt-2">Óptimo</Badge>
            <Text className="text-green-600 mt-1">+2.1%</Text>
            <Button size="xs" variant="light" className="mt-2">Ver más</Button>
          </Card>
          <Card className="flex flex-col items-center justify-center p-6">
            <Text>Ocupación</Text>
            <div className="my-2">
              <CircularProgress value={71} label="Ocupación" size={60} />
            </div>
            <Badge color="green" className="mt-2">Óptimo</Badge>
            <Text className="text-green-600 mt-1">+1.5%</Text>
          </Card>
          <Card className="flex flex-col items-center justify-center p-6">
            <Text>Cilindros Llenos</Text>
            <Metric>14.307</Metric>
            <Badge color="green" className="mt-2">Óptimo</Badge>
            <Text className="text-green-600 mt-1">+1.2%</Text>
          </Card>
        </Grid>
      </Card>
    ),
  },
  {
    version: "Sesión 7",
    description: "Mejoras en la terminología y organización visual de datos",
    aprendizajes: [
      "Precisión terminológica: 'Masa' vs 'Volumen'",
      "Códigos de color para indicadores",
      "Jerarquía visual: números importantes destacan",
      "Orden lógico: Propanos → Mezclas → Butanos"
    ],
    descartados: [
      "Títulos grandes repetitivos",
      "Uso de 'Volumen' (reemplazado por 'Materia Prima')",
      "Presentación sin códigos de color"
    ],
    utiles: [
      "Tabla SGP vs SAP consolidada",
      "Distribución geográfica por subsistemas",
      "Indicadores de eficiencia"
    ],
    element: (
      <Card className="w-full">
        <Grid numItems={1} numItemsMd={2} className="gap-6">
          <Card>
            <Title>Distribución de Materia Prima</Title>
            <DonutChart
              data={chartData}
              category="toneladas"
              index="producto"
              colors={["red", "blue", "cyan"]}
              className="mt-4 h-64"
            />
          </Card>
          <Card>
            <Title>Comparativa SGP vs SAP</Title>
            <Table className="mt-4">
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Producto</TableHeaderCell>
                  <TableHeaderCell>SGP</TableHeaderCell>
                  <TableHeaderCell>SAP</TableHeaderCell>
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
          </Card>
        </Grid>
      </Card>
    ),
  },
  {
    version: "Sesión 8-9",
    description: "Integración de vistas geográficas y mejoras en comparativas",
    aprendizajes: [
      "Necesidad de visualización geográfica",
      "Importancia de comparativas temporales",
      "Mejoras en la presentación de datos SGP vs SAP"
    ],
    descartados: [
      "Vistas sin contexto geográfico",
      "Comparativas sin línea temporal"
    ],
    utiles: [
      "Mapa de distribución",
      "Comparativas con histórico",
      "Filtros por ubicación"
    ],
    element: (
      <Card className="w-full">
        <Grid numItems={1} numItemsMd={2} className="gap-6">
          <Card>
            <Title>Distribución por Subsistema</Title>
            <BarChart
              data={chartData}
              index="producto"
              categories={["toneladas"]}
              colors={["blue"]}
              className="mt-4 h-64"
            />
          </Card>
          <Card>
            <Title>Comparativa Temporal</Title>
            <BarChart
              data={chartData}
              index="producto"
              categories={["stock"]}
              colors={["cyan"]}
              className="mt-4 h-64"
            />
          </Card>
        </Grid>
      </Card>
    ),
  },
  {
    version: "Sesión 10-12",
    description: "Implementación de drill-down y mejoras en navegación",
    aprendizajes: [
      "Necesidad de drill-down: Nacional → Subsistema → CD específico",
      "Información contextual por planta",
      "Toggle INICIAL/ONLINE para análisis temporal"
    ],
    descartados: [
      "Vista única sin drill-down",
      "Información sin contexto específico",
      "Navegación lineal"
    ],
    utiles: [
      "Breadcrumb navegación",
      "Vista nacional + subsistema",
      "Información ambiental por instalación"
    ],
    element: (
      <Card className="w-full">
        <div className="text-sm text-gray-500 mb-4">Subsistema → Maipú</div>
        <Grid numItems={1} numItemsMd={3} className="gap-6">
          <Card>
            <Title>Vista Nacional</Title>
            <DonutChart
              data={chartData}
              category="toneladas"
              index="producto"
              colors={["red", "blue", "cyan"]}
              className="mt-4 h-48"
            />
          </Card>
          <Card>
            <Title>Subsistema Maipú</Title>
            <BarChart
              data={chartData}
              index="producto"
              categories={["toneladas"]}
              colors={["blue"]}
              className="mt-4 h-48"
            />
          </Card>
          <Card>
            <Title>Detalles CD</Title>
            <div className="mt-4 space-y-2">
              <Text>Temperatura: 25°C</Text>
              <Text>Presión: 150 PSI</Text>
              <Text>Densidad: 0.95 g/cm³</Text>
            </div>
          </Card>
        </Grid>
      </Card>
    ),
  },
  {
    version: "Sesión 13",
    description: "Especialización de vistas por audiencia y modularización",
    aprendizajes: [
      "Vistas gerenciales separadas",
      "Modularización de componentes",
      "Especialización por tipo de análisis"
    ],
    descartados: [
      "Vista monolítica única",
      "Navegación vertical extensa",
      "Información mezclada"
    ],
    utiles: [
      "Desglose por formatos",
      "Desglose por mantenimiento",
      "Desglose por competencia"
    ],
    element: (
      <Card className="w-full">
        <Grid numItems={1} numItemsMd={2} className="gap-6">
          <Card>
            <Title>Vista Gerencial</Title>
            <DonutChart
              data={chartData}
              category="toneladas"
              index="producto"
              colors={["red", "blue", "cyan"]}
              className="mt-4 h-64"
            />
          </Card>
          <Card>
            <Title>Desglose Operativo</Title>
            <Table className="mt-4">
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Tipo</TableHeaderCell>
                  <TableHeaderCell>Cantidad</TableHeaderCell>
                  <TableHeaderCell>Estado</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Pintura</TableCell>
                  <TableCell>150</TableCell>
                  <TableCell><Badge color="yellow">En Proceso</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Reinspección</TableCell>
                  <TableCell>75</TableCell>
                  <TableCell><Badge color="green">Completado</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Inutilizados</TableCell>
                  <TableCell>25</TableCell>
                  <TableCell><Badge color="red">Descartado</Badge></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </Grid>
      </Card>
    ),
  },
  {
    version: "Sesión 14",
    description: "Versión final con optimizaciones y estructura definitiva",
    aprendizajes: [
      "Gráficos de torta para distribución",
      "Títulos específicos en columnas",
      "Tres niveles de navegación",
      "Enfoque en monitoreo actual"
    ],
    descartados: [
      "Looker Studio",
      "Actualización tiempo real",
      "Vistas únicas",
      "Análisis histórico extenso"
    ],
    utiles: [
      "Gráfico torta con porcentajes",
      "Estructura de navegación",
      "Especificaciones técnicas"
    ],
    element: (
      <Card className="w-full">
        <Grid numItems={1} numItemsMd={2} className="gap-6">
          <Card>
            <Title>Distribución Final</Title>
            <DonutChart
              data={chartData}
              category="toneladas"
              index="producto"
              colors={["red", "blue", "cyan"]}
              valueFormatter={(number) => `${((number / 3000) * 100).toFixed(1)}% = ${number.toLocaleString()} ton.`}
              className="mt-4 h-64"
            />
          </Card>
          <Card>
            <Title>Vista Consolidada</Title>
            <Table className="mt-4">
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Producto</TableHeaderCell>
                  <TableHeaderCell>Llenos SGP</TableHeaderCell>
                  <TableHeaderCell>Llenos SAP</TableHeaderCell>
                  <TableHeaderCell>Diferencia</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {chartData.map((row) => (
                  <TableRow key={row.producto}>
                    <TableCell>{row.producto}</TableCell>
                    <TableCell>{row.toneladas}</TableCell>
                    <TableCell>{row.stock}</TableCell>
                    <TableCell>
                      <Badge color={row.toneladas > row.stock ? "red" : "green"}>
                        {row.toneladas - row.stock}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </Grid>
      </Card>
    ),
  },
];

const CompendioSesiones = () => (
  <Section title="Compendio de Sesiones (Iteraciones 1-14)">
    <Text className="mb-6 text-gray-600">
      Evolución completa del dashboard Gasco, mostrando el progreso desde KPIs básicos hasta el sistema completo de visualización y control.
    </Text>
    <Grid numItems={1} className="gap-6">
      {sesionesEvolucion.map((sesion, idx) => {
        const versionKey = sesion.version.replace("Sesión ", "VERSION");
        const imagenes = imagenesPorVersion[versionKey] || [];
        
        return (
          <VersionBlock
            key={idx}
            version={sesion.version}
            description={sesion.description}
          >
            <div className="mt-4 space-y-4">
              {/* Galería de imágenes */}
              {imagenes.length > 0 && (
                <div className="mb-6">
                  <Title className="text-sm mb-4">Capturas de la Iteración:</Title>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {imagenes.map((img, i) => (
                      <a 
                        key={i} 
                        href={`/sesiones/${versionKey}/${img}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <img
                          src={`/sesiones/${versionKey}/${img}`}
                          alt={`Captura ${sesion.version} - ${i + 1}`}
                          className="w-full h-auto rounded-lg shadow-md hover:shadow-lg transition-shadow"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Componente interactivo */}
              {sesion.element}
              
              {/* Aprendizajes y elementos */}
              <div className="mt-6 space-y-4">
                <div>
                  <Title className="text-sm mb-2">Aprendizajes Clave:</Title>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {sesion.aprendizajes.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <Title className="text-sm mb-2">Elementos Descartados:</Title>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {sesion.descartados.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <Title className="text-sm mb-2">Elementos Útiles Mantenidos:</Title>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {sesion.utiles.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </VersionBlock>
        );
      })}
    </Grid>
  </Section>
);

export default CompendioSesiones;