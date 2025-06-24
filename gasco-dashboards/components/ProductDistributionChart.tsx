import { useState } from "react";
import { Card, Title, DonutChart, BarChart, Tab, TabGroup, TabList, TabPanel, TabPanels, Legend } from "@tremor/react";

interface ProductData {
  name: string;
  value: number; // toneladas
}

interface ProductDistributionChartProps {
  data: ProductData[];
  total: number; // toneladas totales
  colors?: string[]; // paleta de colores opcional
}

const defaultColors = ["#0B54A3", "#2E79B7", "#A7C7E7", "#F6C700", "#A0AEC0", "#CBD5E1"];

export function ProductDistributionChart({ data, total, colors = defaultColors }: ProductDistributionChartProps) {
  const [visual, setVisual] = useState("donut");

  // Prepara los datos con porcentaje
  const chartData = data.map(item => ({
    ...item,
    percent: ((item.value / total) * 100),
    label: `${item.name} (${((item.value / total) * 100).toFixed(1)}%) - ${item.value.toLocaleString('de-DE')} t`
  }));

  return (
    <Card className="w-full max-w-xl mx-auto p-4">
      <Title className="mb-4">Distribución por Producto</Title>
      <TabGroup index={visual === "donut" ? 0 : 1} onIndexChange={i => setVisual(i === 0 ? "donut" : "bar") }>
        <TabList>
          <Tab>Gráfico de Torta</Tab>
          <Tab>Gráfico de Barras</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <DonutChart
              data={chartData}
              category="value"
              index="name"
              variant="pie"
              valueFormatter={v => `${((v/total)*100).toFixed(1)}% | ${v.toLocaleString('de-DE')} t`}
              className="h-64"
              showTooltip
              colors={colors}
            />
            <Legend
              categories={chartData.map(d => d.label)}
              className="mt-4"
            />
          </TabPanel>
          <TabPanel>
            <BarChart
              data={chartData}
              index="name"
              categories={["value"]}
              valueFormatter={v => `${((v/total)*100).toFixed(1)}% | ${v.toLocaleString('de-DE')} t`}
              className="h-64"
              colors={colors}
            />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </Card>
  );
} 