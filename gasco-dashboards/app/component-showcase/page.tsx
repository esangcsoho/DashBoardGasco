"use client";
import { useState } from "react";
import {
  Card,
  Metric,
  Text,
  Flex,
  Grid,
  Title,
  Subtitle,
  BarChart,
  DonutChart,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Badge,
  Button,
  Tracker,
  Divider,
  ProgressBar,
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@tremor/react";
import { MoveRight, TrendingUp, TrendingDown, Eye, AlertTriangle, Info } from "lucide-react";
import clsx from "clsx";
import fs from "fs";
import path from "path";
import KpiCard from "components/dashboard-blocks/KpiCard";
import CircularProgress from "components/dashboard-blocks/CircularProgress";
import RepoOverviewBlock from "components/dashboard-blocks/RepoOverviewBlock";
import CapitalOverviewBlock from "components/dashboard-blocks/CapitalOverviewBlock";

// --- Paleta de Colores Gasco (v14 en adelante) ---
const gascoColors = {
  primary: "#E2001A",   // Rojo Gasco
  secondary: "#004B8D", // Azul Gasco
  tertiary: "#00A3E0",  // Celeste Gasco
  accent: "#F39200",    // Naranja
  neutralDark: "#222222",
  neutralLight: "#F4F4F4",
  white: "#FFFFFF",
};

// --- Componentes de Ayuda para el Showcase ---
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-12">
    <Title className="text-2xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-6">{title}</Title>
    {children}
  </section>
);

const VersionBlock = ({ version, description, children }: { version: string; description: React.ReactNode; children: React.ReactNode }) => (
  <div className="mb-8">
    <Flex alignItems="baseline" className="gap-2">
      <h3 className="text-xl font-semibold text-gray-700">{version}</h3>
      <p className="text-sm text-gray-500">- {description}</p>
    </Flex>
    <div className="mt-4 p-6 bg-white rounded-lg shadow-md border border-gray-200">
      {children}
    </div>
  </div>
);

// --- Datos de Ejemplo ---
const distributionData = [
  { name: "Propano SC", value: 1250, percentage: 41.6 },
  { name: "Mezcla", value: 1000, percentage: 33.3 },
  { name: "Butano", value: 750, percentage: 25.1 },
];

const tableData = [
    { planta: 'Maipú', llenos: 1200, vacios: 300, mantencion: 50, competencia: 20 },
    { planta: 'La Serena', llenos: 800, vacios: 150, mantencion: 25, competencia: 10 },
    { planta: 'Rancagua', llenos: 950, vacios: 200, mantencion: 30, competencia: 15 },
];

// --- Mensaje institucional y técnico ---
const InfoBlock = () => (
  <Card className="mb-8 bg-blue-50 border-blue-200">
    <Title className="text-[#004B8D]">Catálogo Ejecutivo de Componentes Gasco</Title>
    <Text className="mt-2 text-gray-700">
      Explora y elige visualmente los bloques y variantes más óptimos para tu dashboard ejecutivo. <br />
      <span className="font-semibold">Nota técnica:</span> Por limitaciones de versión, los colores personalizados en gráficos solo funcionan con los nombres estándar de Tailwind/Tremor (ej: "red", "blue"). Si se actualiza a Tremor 2.x+, se podrá usar la paleta Gasco en todos los bloques.
    </Text>
  </Card>
);

// --- Ejemplo de variantes para KPI Cards ---
const kpiVariants = [
  {
    label: "Simple",
    element: (
      <Card className="w-full max-w-xs">
        <Text>Ventas Totales</Text>
        <Metric>$12,500</Metric>
      </Card>
    ),
  },
  {
    label: "Con Icono",
    element: (
      <Card className="w-full max-w-xs flex flex-col items-start">
        <Flex className="gap-2 items-center mb-2">
          <TrendingUp className="text-green-600" size={20} />
          <Text className="font-semibold">Ventas</Text>
        </Flex>
        <Metric>$12,500</Metric>
        <Text className="text-green-600 mt-1">+8% respecto al mes anterior</Text>
      </Card>
    ),
  },
  {
    label: "Con Mini Gráfico",
    element: (
      <Card className="w-full max-w-xs">
        <Text>Ingresos</Text>
        <Metric>$8,200</Metric>
        <BarChart
          data={[
            { mes: "Ene", valor: 2000 },
            { mes: "Feb", valor: 2500 },
            { mes: "Mar", valor: 3700 },
          ]}
          index="mes"
          categories={["valor"]}
          colors={["blue"]}
          className="mt-2 h-16"
        />
      </Card>
    ),
  },
];

type Variant = { label: string; element: React.ReactNode };
type VariantSelectorProps = {
  variants: Variant[];
  selected: number;
  setSelected: (idx: number) => void;
};

const VariantSelector = ({ variants, selected, setSelected }: VariantSelectorProps) => (
  <div className="flex gap-2 mb-4">
    {variants.map((v: Variant, i: number) => (
      <button
        key={i}
        className={clsx(
          "px-3 py-1 rounded border text-sm font-medium transition",
          selected === i
            ? "bg-gasco-red text-white border-gasco-red"
            : "bg-white text-gasco-red border-gasco-red hover:bg-gasco-red/10"
        )}
        onClick={() => setSelected(i)}
      >
        {v.label}
      </button>
    ))}
  </div>
);

// Variantes de Cards informativas
const cardVariants = [
  {
    label: "Simple",
    element: (
      <Card className="w-full max-w-md">
        <Title>Resumen de Stock</Title>
        <Text className="mt-2">Visualiza el stock actual de materia prima disponible en planta.</Text>
      </Card>
    ),
  },
  {
    label: "Con Icono",
    element: (
      <Card className="w-full max-w-md flex flex-col items-start">
        <Flex className="gap-2 items-center mb-2">
          <Info className="text-blue-600" size={20} />
          <Title>Alerta de Stock</Title>
        </Flex>
        <Text className="mt-2">El stock de propano está por debajo del mínimo recomendado.</Text>
      </Card>
    ),
  },
  {
    label: "Con Acción",
    element: (
      <Card className="w-full max-w-md">
        <Title>Detalle de Inventario</Title>
        <Text className="mt-2">Consulta el detalle de inventario por producto y planta.</Text>
        <Button className="mt-4" icon={Eye}>Ver detalle</Button>
      </Card>
    ),
  },
];

// Datos representativos de Gasco para los charts
const chartData = [
  { producto: "Propano SC", toneladas: 1250, stock: 900 },
  { producto: "Mezcla", toneladas: 1000, stock: 700 },
  { producto: "Butano", toneladas: 750, stock: 500 },
];

// Variantes de Tablas avanzadas
const tableVariants: Variant[] = [
  {
    label: "Tabla Simple",
    element: (
      <Card className="w-full max-w-2xl">
        <Title>Inventario de Materia Prima</Title>
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
      </Card>
    ),
  },
  {
    label: "Tabla con Acciones",
    element: (
      <Card className="w-full max-w-2xl">
        <Title>Inventario con Acciones</Title>
        <Table className="mt-4">
          <TableHead>
            <TableRow>
              <TableHeaderCell>Producto</TableHeaderCell>
              <TableHeaderCell>Stock</TableHeaderCell>
              <TableHeaderCell>Acción</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {chartData.map((row) => (
              <TableRow key={row.producto}>
                <TableCell>{row.producto}</TableCell>
                <TableCell>{row.stock}</TableCell>
                <TableCell>
                  <Button size="xs" variant="light">Ver detalle</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    ),
  },
];

// Variantes de Charts
const chartVariants = [
  {
    label: "BarChart",
    element: (
      <Card className="w-full max-w-2xl">
        <Title>Distribución de Materia Prima (Toneladas)</Title>
        <BarChart
          data={chartData}
          index="producto"
          categories={["toneladas"]}
          colors={["blue"]}
          className="mt-4 h-64"
        />
      </Card>
    ),
  },
  {
    label: "DonutChart",
    element: (
      <Card className="w-full max-w-2xl">
        <Title>Distribución Porcentual de Materia Prima</Title>
        <DonutChart
          data={chartData}
          category="toneladas"
          index="producto"
          colors={["red", "blue", "cyan"]}
          valueFormatter={(number) => `${((number / 3000) * 100).toFixed(1)}% = ${number.toLocaleString()} ton.`}
          className="mt-4 h-64"
        />
      </Card>
    ),
  },
  {
    label: "LineChart",
    element: (
      <Card className="w-full max-w-2xl">
        <Title>Evolución de Stock por Producto</Title>
        <BarChart
          data={chartData}
          index="producto"
          categories={["stock"]}
          colors={["cyan"]}
          className="mt-4 h-64"
        />
      </Card>
    ),
  },
];

// Variantes de Badges representativos de Gasco
const badgeVariants: Variant[] = [
  {
    label: "Estados de Stock",
    element: (
      <Card className="w-full max-w-xl flex flex-wrap gap-4 p-6">
        <div className="flex flex-col gap-2">
          <Text className="mb-1">Stock de Producto</Text>
          <div className="flex gap-2">
            <Badge color="green">Stock Óptimo</Badge>
            <Badge color="yellow">Stock Bajo</Badge>
            <Badge color="red">Stock Crítico</Badge>
          </div>
        </div>
      </Card>
    ),
  },
  {
    label: "Alertas de Seguridad",
    element: (
      <Card className="w-full max-w-xl flex flex-wrap gap-4 p-6">
        <div className="flex flex-col gap-2">
          <Text className="mb-1">Alertas Operativas</Text>
          <div className="flex gap-2">
            <Badge color="red">Fuga Detectada</Badge>
            <Badge color="yellow">Mantenimiento Pendiente</Badge>
            <Badge color="blue">Operación Normal</Badge>
          </div>
        </div>
      </Card>
    ),
  },
  {
    label: "Niveles de Operación",
    element: (
      <Card className="w-full max-w-xl flex flex-wrap gap-4 p-6">
        <div className="flex flex-col gap-2">
          <Text className="mb-1">Nivel de Planta</Text>
          <div className="flex gap-2">
            <Badge color="cyan">Planta Maipú</Badge>
            <Badge color="blue">Planta Chillán</Badge>
            <Badge color="gray">Planta Temuco</Badge>
          </div>
        </div>
      </Card>
    ),
  },
];

// Variantes de Layouts ejecutivos
const layoutVariants: Variant[] = [
  {
    label: "Overview Dashboard",
    element: (
      <Card className="w-full max-w-5xl p-6 flex flex-col gap-6">
        <div className="grid grid-cols-3 gap-4">
          <KpiCard title="Stock Total" value="3.150 ton" trend="+2.1%" trendType="up" />
          <KpiCard title="Cilindros en Planta" value="12.500" trend="-1.2%" trendType="down" />
          <KpiCard title="Alertas Activas" value="3" trend="+1" trendType="up" />
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <Title>Distribución Materia Prima</Title>
            <BarChart data={chartData} index="producto" categories={["toneladas"]} colors={["blue"]} className="h-56" />
          </div>
          <div className="flex-1">
            <Title>Stock por Producto</Title>
            <DonutChart data={chartData} category="stock" index="producto" colors={["red", "blue", "cyan"]} className="h-56" />
          </div>
        </div>
        <div>
          <Title>Detalle de Stock</Title>
          {tableVariants[0].element}
        </div>
      </Card>
    ),
  },
  {
    label: "Split Layout",
    element: (
      <Card className="w-full max-w-5xl p-6 flex flex-col md:flex-row gap-6">
        <div className="flex flex-col gap-4 w-full md:w-1/3">
          <KpiCard title="Stock Total" value="3.150 ton" trend="+2.1%" trendType="up" />
          <KpiCard title="Cilindros en Planta" value="12.500" trend="-1.2%" trendType="down" />
          <KpiCard title="Alertas Activas" value="3" trend="+1" trendType="up" />
        </div>
        <div className="flex-1 flex flex-col gap-6">
          <div>
            <Title>Distribución Materia Prima</Title>
            <BarChart data={chartData} index="producto" categories={["toneladas"]} colors={["blue"]} className="h-40" />
          </div>
          <div>
            <Title>Detalle de Stock</Title>
            {tableVariants[0].element}
          </div>
        </div>
      </Card>
    ),
  },
  {
    label: "Grid Modular",
    element: (
      <Card className="w-full max-w-5xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 flex flex-col gap-4">
          <KpiCard title="Stock Total" value="3.150 ton" trend="+2.1%" trendType="up" />
          <KpiCard title="Cilindros en Planta" value="12.500" trend="-1.2%" trendType="down" />
        </div>
        <div className="col-span-1 flex flex-col gap-4">
          <Title>Distribución Materia Prima</Title>
          <BarChart data={chartData} index="producto" categories={["toneladas"]} colors={["blue"]} className="h-40" />
          <Title>Stock por Producto</Title>
          <DonutChart data={chartData} category="stock" index="producto" colors={["red", "blue", "cyan"]} className="h-40" />
        </div>
        <div className="col-span-1 flex flex-col gap-4">
          <Title>Detalle de Stock</Title>
          {tableVariants[0].element}
        </div>
      </Card>
    ),
  },
];

// --- NUEVA SECCIÓN: Evolución de Sesiones 1 a 6 ---
const sesionesEvolucion = [
  {
    version: "Sesión 1",
    description: "Primer prototipo: solo KPIs simples, sin interacción ni visualización avanzada.",
    element: (
      <Card className="w-full max-w-2xl">
        <Grid numItems={1} numItemsMd={3} className="gap-6">
          <Card className="flex flex-col items-center justify-center p-6">
            <Text>Stock Total</Text>
            <Metric>3.150 ton</Metric>
          </Card>
          <Card className="flex flex-col items-center justify-center p-6">
            <Text>Ocupación</Text>
            <Metric>71%</Metric>
          </Card>
          <Card className="flex flex-col items-center justify-center p-6">
            <Text>Cilindros Llenos</Text>
            <Metric>14.307</Metric>
          </Card>
        </Grid>
      </Card>
    ),
  },
  {
    version: "Sesión 2",
    description: "Se agregan badges de estado y colores diferenciados para cada KPI.",
    element: (
      <Card className="w-full max-w-2xl">
        <Grid numItems={1} numItemsMd={3} className="gap-6">
          <Card className="flex flex-col items-center justify-center p-6">
            <Text>Stock Total</Text>
            <Metric>3.150 ton</Metric>
            <Badge color="green" className="mt-2">Óptimo</Badge>
          </Card>
          <Card className="flex flex-col items-center justify-center p-6">
            <Text>Ocupación</Text>
            <Metric>71%</Metric>
            <Badge color="green" className="mt-2">Óptimo</Badge>
          </Card>
          <Card className="flex flex-col items-center justify-center p-6">
            <Text>Cilindros Llenos</Text>
            <Metric>14.307</Metric>
            <Badge color="green" className="mt-2">Óptimo</Badge>
          </Card>
        </Grid>
      </Card>
    ),
  },
  {
    version: "Sesión 3",
    description: "Se integran tendencias y mini-gráficos para cada KPI.",
    element: (
      <Card className="w-full max-w-2xl">
        <Grid numItems={1} numItemsMd={3} className="gap-6">
          <Card className="flex flex-col items-center justify-center p-6">
            <Text>Stock Total</Text>
            <Metric>3.150 ton</Metric>
            <Text className="text-green-600 mt-1">+2.1%</Text>
            <BarChart
              data={[
                { mes: "Ene", valor: 2000 },
                { mes: "Feb", valor: 2500 },
                { mes: "Mar", valor: 3700 },
              ]}
              index="mes"
              categories={["valor"]}
              colors={["blue"]}
              className="mt-2 h-12"
            />
          </Card>
          <Card className="flex flex-col items-center justify-center p-6">
            <Text>Ocupación</Text>
            <Metric>71%</Metric>
            <Text className="text-green-600 mt-1">+1.5%</Text>
            <BarChart
              data={[
                { mes: "Ene", valor: 60 },
                { mes: "Feb", valor: 65 },
                { mes: "Mar", valor: 71 },
              ]}
              index="mes"
              categories={["valor"]}
              colors={["green"]}
              className="mt-2 h-12"
            />
          </Card>
          <Card className="flex flex-col items-center justify-center p-6">
            <Text>Cilindros Llenos</Text>
            <Metric>14.307</Metric>
            <Text className="text-green-600 mt-1">+1.2%</Text>
            <BarChart
              data={[
                { mes: "Ene", valor: 13000 },
                { mes: "Feb", valor: 14000 },
                { mes: "Mar", valor: 14307 },
              ]}
              index="mes"
              categories={["valor"]}
              colors={["cyan"]}
              className="mt-2 h-12"
            />
          </Card>
        </Grid>
      </Card>
    ),
  },
  {
    version: "Sesión 4",
    description: "Se agregan acciones rápidas y botón 'Ver más' en cada KPI.",
    element: (
      <Card className="w-full max-w-2xl">
        <Grid numItems={1} numItemsMd={3} className="gap-6">
          <Card className="flex flex-col items-center justify-center p-6">
            <Text>Stock Total</Text>
            <Metric>3.150 ton</Metric>
            <Button size="xs" variant="light" className="mt-2">Ver más</Button>
          </Card>
          <Card className="flex flex-col items-center justify-center p-6">
            <Text>Ocupación</Text>
            <Metric>71%</Metric>
            <Button size="xs" variant="light" className="mt-2">Ver más</Button>
          </Card>
          <Card className="flex flex-col items-center justify-center p-6">
            <Text>Cilindros Llenos</Text>
            <Metric>14.307</Metric>
            <Button size="xs" variant="light" className="mt-2">Ver más</Button>
          </Card>
        </Grid>
      </Card>
    ),
  },
  {
    version: "Sesión 5",
    description: "Se introduce el anillo de progreso circular para KPIs de porcentaje.",
    element: (
      <Card className="w-full max-w-2xl">
        <Grid numItems={1} numItemsMd={3} className="gap-6">
          <Card className="flex flex-col items-center justify-center p-6">
            <Text>Stock Total</Text>
            <Metric>3.150 ton</Metric>
          </Card>
          <Card className="flex flex-col items-center justify-center p-6">
            <Text>Ocupación</Text>
            <div className="my-2">
              <CircularProgress value={71} label="Ocupación" size={60} />
            </div>
          </Card>
          <Card className="flex flex-col items-center justify-center p-6">
            <Text>Cilindros Llenos</Text>
            <Metric>14.307</Metric>
          </Card>
        </Grid>
      </Card>
    ),
  },
  {
    version: "Sesión 6",
    description: "Versión final: layout profesional, colores Gasco, badges, tendencias, anillo de progreso y acciones.",
    element: (
      <Card className="w-full max-w-2xl">
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
            <Button size="xs" variant="light" className="mt-2">Ver más</Button>
          </Card>
          <Card className="flex flex-col items-center justify-center p-6">
            <Text>Cilindros Llenos</Text>
            <Metric>14.307</Metric>
            <Badge color="green" className="mt-2">Óptimo</Badge>
            <Text className="text-green-600 mt-1">+1.2%</Text>
            <Button size="xs" variant="light" className="mt-2">Ver más</Button>
          </Card>
        </Grid>
      </Card>
    ),
  },
];

// --- Compendio de Sesiones (Iteraciones 1-14) ---
const versiones = [
  { key: "VERSION1-6", label: "Sesiones 1-6", pdf: "VERSION1CD-Tremor UI Kit (Community) (Community) (Copy).pdf" },
  { key: "VERSION7", label: "Versión 7", pdf: "VERSION7-Tremor UI Kit (Community) (Community) (Copy).pdf" },
  { key: "VERSION8", label: "Versión 8", pdf: "VERSION8-Tremor UI Kit (Community) (Community) (Copy).pdf" },
  { key: "VERSION9", label: "Versión 9", pdf: "VERSION9-Tremor UI Kit (Community) (Community) (Copy).pdf" },
  { key: "VERSION10", label: "Versión 10", pdf: "VERSION10-Tremor UI Kit (Community) (Community) (Copy).pdf" },
  { key: "VERSION11", label: "Versión 11", pdf: "VERSION11-Tremor UI Kit (Community) (Community) (Copy).pdf" },
  { key: "VERSION12", label: "Versión 12", pdf: "VERSION12-Tremor UI Kit (Community) (Community) (Copy).pdf" },
  { key: "VERSION13", label: "Versión 13", pdf: "VERSION13-Tremor UI Kit (Community) (Community) (Copy).pdf" },
  { key: "VERSION14", label: "Versión 14", pdf: "VERSION14-Tremor UI Kit .pdf" },
];

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

const aprendizajesPorVersion: Record<string, { aprendizajes: string[]; descartados: string[]; utiles: string[] }> = {
  "VERSION1-6": {
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
    ]
  },
  "VERSION7": {
    aprendizajes: [
      "Precisión terminológica: 'Masa' vs 'Volumen'",
      "Códigos de color para indicadores: rojo negativo, verde positivo",
      "Jerarquía visual: números importantes destacan sobre etiquetas",
      "Orden lógico: Propanos arriba → Mezclas medio → Butanos abajo"
    ],
    descartados: [
      "Títulos grandes repetitivos",
      "Uso de 'Volumen' (reemplazado por 'Materia Prima')",
      "Presentación sin códigos de color",
      "Orden por cantidad (favor de orden lógico)"
    ],
    utiles: [
      "Tabla SGP vs SAP consolidada",
      "Distribución geográfica por subsistemas",
      "Indicadores de eficiencia (masa operativa vs óptima)"
    ]
  },
  "VERSION8": {
    aprendizajes: [
      "Precisión terminológica: 'Masa' vs 'Volumen'",
      "Códigos de color para indicadores: rojo negativo, verde positivo",
      "Jerarquía visual: números importantes destacan sobre etiquetas",
      "Orden lógico: Propanos arriba → Mezclas medio → Butanos abajo"
    ],
    descartados: [
      "Títulos grandes repetitivos",
      "Uso de 'Volumen' (reemplazado por 'Materia Prima')",
      "Presentación sin códigos de color",
      "Orden por cantidad (favor de orden lógico)"
    ],
    utiles: [
      "Tabla SGP vs SAP consolidada",
      "Distribución geográfica por subsistemas",
      "Indicadores de eficiencia (masa operativa vs óptima)"
    ]
  },
  "VERSION9": {
    aprendizajes: [
      "Precisión terminológica: 'Masa' vs 'Volumen'",
      "Códigos de color para indicadores: rojo negativo, verde positivo",
      "Jerarquía visual: números importantes destacan sobre etiquetas",
      "Orden lógico: Propanos arriba → Mezclas medio → Butanos abajo"
    ],
    descartados: [
      "Títulos grandes repetitivos",
      "Uso de 'Volumen' (reemplazado por 'Materia Prima')",
      "Presentación sin códigos de color",
      "Orden por cantidad (favor de orden lógico)"
    ],
    utiles: [
      "Tabla SGP vs SAP consolidada",
      "Distribución geográfica por subsistemas",
      "Indicadores de eficiencia (masa operativa vs óptima)"
    ]
  },
  "VERSION10": {
    aprendizajes: [
      "Necesidad de drill-down: Nacional → Subsistema → CD específico",
      "Información contextual por planta: temperatura, presión, densidad",
      "Toggle INICIAL/ONLINE para análisis temporal",
      "Consistencia de datos entre niveles"
    ],
    descartados: [
      "Vista única sin drill-down",
      "Información sin contexto específico por ubicación",
      "Navegación lineal sin jerarquía"
    ],
    utiles: [
      "Breadcrumb navegación: 'Subsistema → Maipú'",
      "Vista nacional + vista por subsistema",
      "Información ambiental por instalación"
    ]
  },
  "VERSION11": {
    aprendizajes: [
      "Necesidad de drill-down: Nacional → Subsistema → CD específico",
      "Información contextual por planta: temperatura, presión, densidad",
      "Toggle INICIAL/ONLINE para análisis temporal",
      "Consistencia de datos entre niveles"
    ],
    descartados: [
      "Vista única sin drill-down",
      "Información sin contexto específico por ubicación",
      "Navegación lineal sin jerarquía"
    ],
    utiles: [
      "Breadcrumb navegación: 'Subsistema → Maipú'",
      "Vista nacional + vista por subsistema",
      "Información ambiental por instalación"
    ]
  },
  "VERSION12": {
    aprendizajes: [
      "Necesidad de drill-down: Nacional → Subsistema → CD específico",
      "Información contextual por planta: temperatura, presión, densidad",
      "Toggle INICIAL/ONLINE para análisis temporal",
      "Consistencia de datos entre niveles"
    ],
    descartados: [
      "Vista única sin drill-down",
      "Información sin contexto específico por ubicación",
      "Navegación lineal sin jerarquía"
    ],
    utiles: [
      "Breadcrumb navegación: 'Subsistema → Maipú'",
      "Vista nacional + vista por subsistema",
      "Información ambiental por instalación"
    ]
  },
  "VERSION13": {
    aprendizajes: [
      "Vistas gerenciales separadas para diferentes audiencias",
      "Modularización de componentes para flexibilidad",
      "Especialización por tipo de análisis"
    ],
    descartados: [
      "Vista monolítica única",
      "Navegación vertical extensa",
      "Información mezclada sin segmentación"
    ],
    utiles: [
      "Desglose Diferencia: Tabla por formatos con porcentajes",
      "Desglose Mantenimiento: Por tipo (Pintura, Reinspección, Inutilizados)",
      "Desglose Competencia: Por marcas competidoras"
    ]
  },
  "VERSION14": {
    aprendizajes: [
      "Gráficos de torta mejores para distribución proporcional",
      "Títulos específicos en columnas: 'Llenos SGP', 'Llenos SAP'",
      "Tres niveles de navegación definidos",
      "Enfoque en monitoreo actual (no histórico)"
    ],
    descartados: [
      "Looker Studio: Por limitaciones de objetos y costos",
      "Actualización tiempo real costosa: Optimizada a intervalos apropiados",
      "Vistas únicas: Favor de modularización",
      "Análisis histórico: Enfoque en monitoreo actual",
      "Combinatorias complejas: Vistas estáticas por ahora"
    ],
    utiles: [
      "Gráfico torta con porcentajes y valores absolutos",
      "Estructura definitiva de navegación",
      "Especificaciones técnicas exactas"
    ]
  },
};

const CompendioSesiones = () => (
  <Section title="Compendio de Sesiones (Iteraciones 1-14)">
    {versiones.map((v) => (
      <VersionBlock
        key={v.key}
        version={v.label}
        description={
          <>
            <a
              href={`/sesiones/${v.pdf}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline mr-4"
            >
              Ver PDF original
            </a>
            <span className="text-gray-500">(completa aprendizajes y descartes abajo)</span>
          </>
        }
      >
        <div className="flex flex-wrap gap-4 mb-4">
          {(imagenesPorVersion[v.key] || []).map((img) => (
            <a key={img} href={`/sesiones/${v.key}/${img}`} target="_blank" rel="noopener noreferrer">
              <img
                src={`/sesiones/${v.key}/${img}`}
                alt={`Nota ${v.label}`}
                className="w-64 h-auto border rounded shadow"
              />
            </a>
          ))}
        </div>
        <div className="mb-2">
          <strong>Aprendizajes:</strong>
          <ul className="bg-gray-50 border rounded p-2 mt-1 text-sm text-gray-700 min-h-[40px] list-disc list-inside">
            {(aprendizajesPorVersion[v.key]?.aprendizajes || ["(Completar aquí los aprendizajes de la iteración)"]).map((txt: string, i: number) => (
              <li key={i}>{txt}</li>
            ))}
          </ul>
        </div>
        <div className="mb-2">
          <strong>Elementos descartados/depreciados:</strong>
          <ul className="bg-gray-50 border rounded p-2 mt-1 text-sm text-gray-700 min-h-[40px] list-disc list-inside">
            {(aprendizajesPorVersion[v.key]?.descartados || ["(Completar aquí los elementos descartados y por qué)"]).map((txt: string, i: number) => (
              <li key={i}>{txt}</li>
            ))}
          </ul>
        </div>
        <div className="mb-2">
          <strong>Elementos útiles/mantenidos:</strong>
          <ul className="bg-gray-50 border rounded p-2 mt-1 text-sm text-gray-700 min-h-[40px] list-disc list-inside">
            {(aprendizajesPorVersion[v.key]?.utiles || ["(Completar aquí los elementos que se mantuvieron o fueron clave)"]).map((txt: string, i: number) => (
              <li key={i}>{txt}</li>
            ))}
          </ul>
        </div>
      </VersionBlock>
    ))}
  </Section>
);

// --- Showcase de Bloques Ejecutivos ---
<section className="mb-16">
  <Title className="mb-4">Bloques Ejecutivos</Title>
  <Text className="mb-6 text-gray-600">Ejemplos de bloques ejecutivos reutilizables para dashboards de proyectos, finanzas, DevOps o control de gestión.</Text>
  <div className="mb-12">
    <Title className="mb-2 text-lg">Overview de Repositorio</Title>
    <RepoOverviewBlock />
  </div>
  <div>
    <Title className="mb-2 text-lg">Overview de Capital</Title>
    <CapitalOverviewBlock />
  </div>
</section>

export default function ExecutiveShowcase() {
  const [tab, setTab] = useState(0);
  return (
    <main className="p-4 md:p-10 bg-gray-50 min-h-screen">
      <TabGroup index={tab} onIndexChange={setTab}>
        <TabList>
          <Tab>Bloques de Elementos</Tab>
          <Tab>Layouts Ejecutivos</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <CompendioSesiones />
            <Section title="Bloques Temáticos Gasco (Tremor)">
              <Grid numItems={1} numItemsMd={2} numItemsLg={3} className="gap-6 mb-8">
                {/* Bloque de Acciones Rápidas */}
                <Card className="bg-blue-50 border-blue-200">
                  <Title className="text-blue-700 text-lg mb-2">Acciones Rápidas</Title>
                  <Flex className="gap-2 flex-wrap">
                    <Button size="xs" color="blue">Nuevo Registro</Button>
                    <Button size="xs" color="gray">Exportar</Button>
                    <Button size="xs" color="yellow">Actualizar</Button>
                    <Button size="xs" color="red">Eliminar Selección</Button>
                  </Flex>
                </Card>
                {/* Bloque de Estado Operacional */}
                <Card className="bg-yellow-50 border-yellow-200">
                  <Title className="text-yellow-700 text-lg mb-2">Estado Operacional</Title>
                  <Flex className="gap-2 mb-2 items-center">
                    <Badge color="red">Crítico</Badge>
                    <Text className="text-sm">Stock Propano SC bajo mínimo</Text>
                  </Flex>
                  <Flex className="gap-2 mb-2 items-center">
                    <Badge color="yellow">Advertencia</Badge>
                    <Text className="text-sm">Mantenimiento pendiente en Planta Maipú</Text>
                  </Flex>
                  <Flex className="gap-2 items-center">
                    <Badge color="blue">Normal</Badge>
                    <Text className="text-sm">Operación estable en Planta Chillán</Text>
                  </Flex>
                </Card>
              </Grid>
              <Grid numItems={1} numItemsMd={2} numItemsLg={3} className="gap-6 mb-8">
                {/* Bloque de Filtros Avanzados */}
                <Card className="bg-white border-blue-100">
                  <Title className="text-blue-700 text-lg mb-2">Filtros Avanzados</Title>
                  <Flex className="gap-2 flex-wrap mb-2">
                    <Button size="xs" color="gray">Todas las Plantas</Button>
                    <Button size="xs" color="blue">Maipú</Button>
                    <Button size="xs" color="cyan">Chillán</Button>
                    <Button size="xs" color="gray">Temuco</Button>
                  </Flex>
                  <Flex className="gap-2 flex-wrap">
                    <Button size="xs" color="yellow">Hoy</Button>
                    <Button size="xs" color="gray">Última Semana</Button>
                    <Button size="xs" color="gray">Último Mes</Button>
                  </Flex>
                </Card>
                {/* Bloque de Resumen Visual */}
                <Card className="bg-white border-blue-100">
                  <Title className="text-blue-700 text-lg mb-2">Resumen Visual</Title>
                  <BarChart
                    data={chartData}
                    index="producto"
                    categories={["toneladas"]}
                    colors={["red", "blue", "cyan"]}
                    className="h-40"
                  />
                </Card>
                {/* Cards de Estado */}
                <Flex className="gap-4 flex-col">
                  <Card className="bg-red-50 border-red-200">
                    <Title className="text-red-700 text-base">Stock Crítico</Title>
                    <Text className="text-red-700">Propano SC bajo mínimo</Text>
                  </Card>
                  <Card className="bg-yellow-50 border-yellow-200">
                    <Title className="text-yellow-700 text-base">En Mantención</Title>
                    <Text className="text-yellow-700">Planta Maipú</Text>
                  </Card>
                  <Card className="bg-gray-50 border-gray-200">
                    <Title className="text-gray-700 text-base">Sin Actualizar</Title>
                    <Text className="text-gray-700">Planta Temuco</Text>
                  </Card>
                </Flex>
              </Grid>
            </Section>
            <InfoBlock />

            {/* KPI CARDS */}
            <Section title="KPI Cards (Variantes)">
              <Text className="mb-4 text-gray-600">Bloques de métricas ejecutivas para destacar cifras clave. Elige la variante que mejor se adapte a tu storytelling.</Text>
              <Grid numItems={1} numItemsMd={3} className="gap-6 mb-8">
                {/* Simple */}
                <Card className="w-full max-w-xs flex flex-col items-center justify-center">
                  <Text>Stock Total</Text>
                  <Metric>3.150 ton</Metric>
                </Card>
                {/* Con Icono */}
                <Card className="w-full max-w-xs flex flex-col items-center justify-center">
                  <Flex className="gap-2 items-center mb-2">
                    <TrendingUp className="text-green-600" size={20} />
                    <Text className="font-semibold">Cilindros en Planta</Text>
                  </Flex>
                  <Metric>12.500</Metric>
                  <Text className="text-green-600 mt-1">+8% respecto al mes anterior</Text>
                </Card>
                {/* Con Mini Gráfico */}
                <Card className="w-full max-w-xs flex flex-col items-center justify-center">
                  <Text>Ingresos</Text>
                  <Metric>$8,200</Metric>
                  <BarChart
                    data={[
                      { mes: "Ene", valor: 2000 },
                      { mes: "Feb", valor: 2500 },
                      { mes: "Mar", valor: 3700 },
                    ]}
                    index="mes"
                    categories={["valor"]}
                    colors={["blue"]}
                    className="mt-2 h-16"
                  />
                </Card>
                {/* Con fondo y badge */}
                <Card className="w-full max-w-xs bg-blue-50 border-blue-200 flex flex-col items-center justify-center">
                  <Text className="text-blue-700">Stock Óptimo</Text>
                  <Metric className="text-blue-900">2.500</Metric>
                  <Badge color="green">Óptimo</Badge>
                </Card>
                <Card className="w-full max-w-xs bg-yellow-50 border-yellow-200 flex flex-col items-center justify-center">
                  <Text className="text-yellow-700">Stock Bajo</Text>
                  <Metric className="text-yellow-900">1.200</Metric>
                  <Badge color="yellow">Bajo</Badge>
                </Card>
                <Card className="w-full max-w-xs bg-red-50 border-red-200 flex flex-col items-center justify-center">
                  <Text className="text-red-700">Stock Crítico</Text>
                  <Metric className="text-red-900">350</Metric>
                  <Badge color="red">Crítico</Badge>
                </Card>
                <Card className="w-full max-w-xs bg-gray-50 border-gray-200 flex flex-col items-center justify-center">
                  <Text className="text-gray-700">Sin Actualizar</Text>
                  <Metric className="text-gray-900">0</Metric>
                  <Badge color="gray">Sin datos</Badge>
                </Card>
              </Grid>
            </Section>

            {/* CARDS INFORMATIVAS */}
            <Section title="Cards Informativas (Variantes)">
              <Text className="mb-4 text-gray-600">Tarjetas para mostrar información relevante, alertas o acciones rápidas. Elige la variante que mejor se adapte a tu caso de uso.</Text>
              <Grid numItems={1} numItemsMd={4} className="gap-6 mb-8">
                {/* Simple */}
                <Card className="w-full max-w-md">
                  <Title>Resumen de Stock</Title>
                  <Text className="mt-2">Visualiza el stock actual de materia prima disponible en planta.</Text>
                </Card>
                {/* Con Icono */}
                <Card className="w-full max-w-md flex flex-col items-start">
                  <Flex className="gap-2 items-center mb-2">
                    <Info className="text-blue-600" size={20} />
                    <Title>Alerta de Stock</Title>
                  </Flex>
                  <Text className="mt-2">El stock de propano está por debajo del mínimo recomendado.</Text>
                </Card>
                {/* Con Acción */}
                <Card className="w-full max-w-md">
                  <Title>Detalle de Inventario</Title>
                  <Text className="mt-2">Consulta el detalle de inventario por producto y planta.</Text>
                  <Button className="mt-4" icon={Eye}>Ver detalle</Button>
                </Card>
                {/* Con fondo y badge */}
                <Card className="w-full max-w-md bg-blue-50 border-blue-200">
                  <Title className="text-blue-700">Stock Óptimo</Title>
                  <Text>Inventario en niveles óptimos.</Text>
                  <Badge color="green" className="mt-2">Óptimo</Badge>
                </Card>
                <Card className="w-full max-w-md bg-yellow-50 border-yellow-200">
                  <Title className="text-yellow-700">Stock Bajo</Title>
                  <Text>Inventario por debajo del nivel recomendado.</Text>
                  <Badge color="yellow" className="mt-2">Bajo</Badge>
                </Card>
                <Card className="w-full max-w-md bg-red-50 border-red-200">
                  <Title className="text-red-700">Stock Crítico</Title>
                  <Text>Inventario en nivel crítico.</Text>
                  <Badge color="red" className="mt-2">Crítico</Badge>
                </Card>
                <Card className="w-full max-w-md bg-gray-50 border-gray-200">
                  <Title className="text-gray-700">Sin Actualizar</Title>
                  <Text>No hay datos recientes.</Text>
                  <Badge color="gray" className="mt-2">Sin datos</Badge>
                </Card>
              </Grid>
            </Section>

            {/* TABLAS */}
            <Section title="Tablas (Variantes)">
              <Text className="mb-4 text-gray-600">Tablas para mostrar datos operativos, estados y acciones rápidas. Elige la variante que mejor se adapte a tu operación.</Text>
              <Grid numItems={1} numItemsMd={2} className="gap-6 mb-8">
                {/* Tabla Simple */}
                <Card className="w-full max-w-2xl">
                  <Title>Inventario de Materia Prima</Title>
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
                </Card>
                {/* Tabla con Acciones */}
                <Card className="w-full max-w-2xl">
                  <Title>Inventario con Acciones</Title>
                  <Table className="mt-4">
                    <TableHead>
                      <TableRow>
                        <TableHeaderCell>Producto</TableHeaderCell>
                        <TableHeaderCell>Stock</TableHeaderCell>
                        <TableHeaderCell>Acción</TableHeaderCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {chartData.map((row) => (
                        <TableRow key={row.producto}>
                          <TableCell>{row.producto}</TableCell>
                          <TableCell>{row.stock}</TableCell>
                          <TableCell>
                            <Button size="xs" variant="light">Ver detalle</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
                {/* Tabla con Badges */}
                <Card className="w-full max-w-2xl bg-blue-50 border-blue-200">
                  <Title className="text-blue-700">Tabla con Badges</Title>
                  <Table className="mt-4">
                    <TableHead>
                      <TableRow>
                        <TableHeaderCell>Producto</TableHeaderCell>
                        <TableHeaderCell>Estado</TableHeaderCell>
                        <TableHeaderCell>Stock</TableHeaderCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {chartData.map((row, idx) => (
                        <TableRow key={row.producto}>
                          <TableCell>{row.producto}</TableCell>
                          <TableCell>
                            {idx === 0 ? <Badge color="green">Óptimo</Badge> : idx === 1 ? <Badge color="yellow">Bajo</Badge> : <Badge color="red">Crítico</Badge>}
                          </TableCell>
                          <TableCell>{row.stock}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
                {/* Tabla con Acciones Múltiples */}
                <Card className="w-full max-w-2xl bg-gray-50 border-gray-200">
                  <Title className="text-gray-700">Tabla con Acciones Múltiples</Title>
                  <Table className="mt-4">
                    <TableHead>
                      <TableRow>
                        <TableHeaderCell>Producto</TableHeaderCell>
                        <TableHeaderCell>Stock</TableHeaderCell>
                        <TableHeaderCell>Acciones</TableHeaderCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {chartData.map((row) => (
                        <TableRow key={row.producto}>
                          <TableCell>{row.producto}</TableCell>
                          <TableCell>{row.stock}</TableCell>
                          <TableCell>
                            <Button size="xs" color="blue" className="mr-2">Ver</Button>
                            <Button size="xs" color="yellow" className="mr-2">Editar</Button>
                            <Button size="xs" color="red">Eliminar</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </Grid>
            </Section>

            {/* CHARTS */}
            <Section title="Charts Ejecutivos (Variantes)">
              <Text className="mb-4 text-gray-600">Visualizaciones para distribución, evolución y comparación de datos clave de Gasco. Elige la variante que mejor cuente tu historia.</Text>
              <Grid numItems={1} numItemsMd={3} className="gap-6 mb-8">
                {/* BarChart */}
                <Card className="w-full max-w-2xl">
                  <Title>Distribución de Materia Prima (Toneladas)</Title>
                  <BarChart
                    data={chartData}
                    index="producto"
                    categories={["toneladas"]}
                    colors={["blue"]}
                    className="mt-4 h-64"
                  />
                </Card>
                {/* DonutChart */}
                <Card className="w-full max-w-2xl">
                  <Title>Distribución Porcentual de Materia Prima</Title>
                  <DonutChart
                    data={chartData}
                    category="toneladas"
                    index="producto"
                    colors={["red", "blue", "cyan"]}
                    valueFormatter={(number) => `${((number / 3000) * 100).toFixed(1)}% = ${number.toLocaleString()} ton.`}
                    className="mt-4 h-64"
                  />
                </Card>
                {/* LineChart (simulado con BarChart) */}
                <Card className="w-full max-w-2xl">
                  <Title>Evolución de Stock por Producto</Title>
                  <BarChart
                    data={chartData}
                    index="producto"
                    categories={["stock"]}
                    colors={["cyan"]}
                    className="mt-4 h-64"
                  />
                </Card>
                {/* BarChart Stacked */}
                <Card className="w-full max-w-2xl bg-blue-50 border-blue-200">
                  <Title className="text-blue-700">BarChart Stacked</Title>
                  <BarChart
                    data={chartData}
                    index="producto"
                    categories={["toneladas", "stock"]}
                    colors={["blue", "red"]}
                    stack={true}
                    className="mt-4 h-64"
                  />
                </Card>
                {/* DonutChart con Badges */}
                <Card className="w-full max-w-2xl bg-gray-50 border-gray-200">
                  <Title className="text-gray-700">DonutChart con Badges</Title>
                  <DonutChart
                    data={chartData}
                    category="toneladas"
                    index="producto"
                    colors={["red", "blue", "cyan"]}
                    className="mt-4 h-64"
                  />
                  <Flex className="gap-2 mt-4">
                    <Badge color="green">Óptimo</Badge>
                    <Badge color="yellow">Bajo</Badge>
                    <Badge color="red">Crítico</Badge>
                  </Flex>
                </Card>
              </Grid>
            </Section>

            {/* GRIDS Y LAYOUTS */}
            <Section title="Grids y Layouts Ejecutivos (Variantes)">
              <Text className="mb-4 text-gray-600">Estructuras visuales recomendadas para dashboards ejecutivos Gasco. Elige la variante que mejor se adapte a tu presentación.</Text>
              <Grid numItems={1} numItemsMd={2} className="gap-6 mb-8">
                {/* Overview Dashboard */}
                <Card className="w-full max-w-5xl p-6 flex flex-col gap-6">
                  <div className="grid grid-cols-3 gap-4">
                    <KpiCard title="Stock Total" value="3.150 ton" trend="+2.1%" trendType="up" />
                    <KpiCard title="Cilindros en Planta" value="12.500" trend="-1.2%" trendType="down" />
                    <KpiCard title="Alertas Activas" value="3" trend="+1" trendType="up" />
                  </div>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <Title>Distribución Materia Prima</Title>
                      <BarChart data={chartData} index="producto" categories={["toneladas"]} colors={["blue"]} className="h-56" />
                    </div>
                    <div className="flex-1">
                      <Title>Stock por Producto</Title>
                      <DonutChart data={chartData} category="stock" index="producto" colors={["red", "blue", "cyan"]} className="h-56" />
                    </div>
                  </div>
                  <div>
                    <Title>Detalle de Stock</Title>
                    <Card className="w-full max-w-2xl">
                      <Title>Inventario de Materia Prima</Title>
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
                    </Card>
                  </div>
                </Card>
                {/* Split Layout */}
                <Card className="w-full max-w-5xl p-6 flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col gap-4 w-full md:w-1/3">
                    <KpiCard title="Stock Total" value="3.150 ton" trend="+2.1%" trendType="up" />
                    <KpiCard title="Cilindros en Planta" value="12.500" trend="-1.2%" trendType="down" />
                    <KpiCard title="Alertas Activas" value="3" trend="+1" trendType="up" />
                  </div>
                  <div className="flex-1 flex flex-col gap-6">
                    <div>
                      <Title>Distribución Materia Prima</Title>
                      <BarChart data={chartData} index="producto" categories={["toneladas"]} colors={["blue"]} className="h-40" />
                    </div>
                    <div>
                      <Title>Detalle de Stock</Title>
                      <Card className="w-full max-w-2xl">
                        <Title>Inventario de Materia Prima</Title>
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
                      </Card>
                    </div>
                  </div>
                </Card>
                {/* Grid Modular */}
                <Card className="w-full max-w-5xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="col-span-1 flex flex-col gap-4">
                    <KpiCard title="Stock Total" value="3.150 ton" trend="+2.1%" trendType="up" />
                    <KpiCard title="Cilindros en Planta" value="12.500" trend="-1.2%" trendType="down" />
                  </div>
                  <div className="col-span-1 flex flex-col gap-4">
                    <Title>Distribución Materia Prima</Title>
                    <BarChart data={chartData} index="producto" categories={["toneladas"]} colors={["blue"]} className="h-40" />
                    <Title>Stock por Producto</Title>
                    <DonutChart data={chartData} category="stock" index="producto" colors={["red", "blue", "cyan"]} className="h-40" />
                  </div>
                  <div className="col-span-1 flex flex-col gap-4">
                    <Title>Detalle de Stock</Title>
                    <Card className="w-full max-w-2xl">
                      <Title>Inventario de Materia Prima</Title>
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
                    </Card>
                  </div>
                </Card>
              </Grid>
            </Section>
          </TabPanel>
          <TabPanel>
            <Text className="mb-4 text-gray-600">Aquí puedes ver y comparar los layouts ejecutivos completos. Para más variantes, visita la página de layouts.</Text>
            {/* Opción 1: Renderizar aquí algunos layouts destacados (copiar desde layouts-showcase) */}
            {/* Opción 2: Mostrar un link a /layouts-showcase para ver todos los layouts */}
            {/* Ejemplo de link: */}
            <a href="/layouts-showcase" className="text-blue-600 underline">Ver todos los layouts ejecutivos &rarr;</a>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </main>
  );
}