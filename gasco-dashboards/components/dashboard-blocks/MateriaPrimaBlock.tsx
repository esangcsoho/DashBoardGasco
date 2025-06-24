import React from "react";
import { Card, Flex, Title, Text, Badge } from "@tremor/react";
import { DonutChart } from "@tremor/react";
import { Radar } from "react-chartjs-2";
import { DataTable } from "../data-table";
import { StockDifferenceTable } from "../StockDifferenceTable";
import KpiCard from "./KpiCard";
import { Chart, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from "chart.js";
Chart.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

// Datos de ejemplo para las tarjetas KPI (puedes reemplazar por props o datos reales)
const kpis = [
  {
    title: "Stock Total",
    value: "3.150",
    unit: "ton",
    trend: "+2.1%",
    trendType: "up",
    status: "Óptimo",
    statusColor: "blue" as "blue",
    borderColor: "blue",
    miniChartData: [
      { label: "Ene", value: 8 },
      { label: "Feb", value: 12 },
      { label: "Mar", value: 15 },
    ],
  },
  {
    title: "Ocupación",
    value: "71",
    unit: "%",
    trend: "+1.5%",
    trendType: "up" as "up",
    status: "Óptimo",
    statusColor: "blue" as "blue",
    borderColor: "cyan",
    miniChartData: [
      { label: "Ene", value: 7 },
      { label: "Feb", value: 10 },
      { label: "Mar", value: 13 },
    ],
    circularPercent: 71,
  },
];

const donutData = [
  { name: "GLP", value: 700 },
  { name: "Butano", value: 300 },
  { name: "Propano", value: 200 },
];

const radarData = {
  labels: ["GLP", "Butano", "Propano"],
  datasets: [
    {
      label: "Stock",
      data: [700, 300, 200],
      backgroundColor: "rgba(34, 197, 94, 0.2)",
      borderColor: "rgba(34, 197, 94, 1)",
      borderWidth: 2,
    },
    {
      label: "Ocupación",
      data: [90, 95, 85],
      backgroundColor: "rgba(59, 130, 246, 0.2)",
      borderColor: "rgba(59, 130, 246, 1)",
      borderWidth: 2,
    },
  ],
};

const columns = [
  { key: "producto", label: "Producto", align: "left" as const },
  { key: "sgp", label: "SGP", align: "right" as const },
  { key: "sap", label: "SAP", align: "right" as const },
  { key: "diferencia", label: "Diferencia", align: "right" as const },
];
const data = [
  { producto: "GLP", sgp: 700, sap: 690, diferencia: 10 },
  { producto: "Butano", sgp: 300, sap: 295, diferencia: 5 },
  { producto: "Propano", sgp: 200, sap: 165, diferencia: 35 },
];

export default function MateriaPrimaBlock() {
  return (
    <Card className="mb-10 p-6 bg-white shadow-lg rounded-xl">
      <Flex className="justify-between items-center mb-4">
        <Title className="text-2xl font-bold text-[#0B54A3]">Materia Prima</Title>
        <Badge color="blue">Actualizado</Badge>
      </Flex>
      {/* Grid de tarjetas KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 mb-6">
        {kpis.map((kpi, idx) => (
          <KpiCard
            key={kpi.title}
            {...kpi}
            trendType={kpi.trendType as "up" | "down"}
            statusColor={kpi.statusColor as "blue" | "green" | "yellow" | "red"}
            onDetails={() => alert(`Ver más de ${kpi.title}`)}
          />
        ))}
      </div>
      <Flex className="gap-8 flex-wrap mb-8">
        <div className="w-72">
          <Text className="mb-2 font-semibold">Distribución por producto</Text>
          <DonutChart data={donutData} category="value" index="name" colors={["blue", "green", "yellow"]} />
        </div>
        <div className="w-96">
          <Text className="mb-2 font-semibold">Radar Stock vs Ocupación</Text>
          <Radar data={radarData} options={{ responsive: true, plugins: { legend: { position: "top" } } }} />
        </div>
      </Flex>
      <Text className="font-semibold mb-2">Diferencias SGP/SAP por producto</Text>
      <DataTable title="Diferencias SGP/SAP por producto" columns={columns} data={data} />
      <div className="mt-6">
        <Text className="font-semibold mb-2">Detalle avanzado</Text>
        <StockDifferenceTable title="Detalle avanzado" data={data.map(row => ({ name: row.producto, sgp: row.sgp, sap: row.sap }))} />
      </div>
    </Card>
  );
} 