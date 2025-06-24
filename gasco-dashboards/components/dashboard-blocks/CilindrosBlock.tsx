import React from "react";
import { Card, Flex, Title, Text, Badge } from "@tremor/react";
import { DonutChart } from "@tremor/react";
import { Radar } from "react-chartjs-2";
import { DataTable } from "../data-table";
import KpiCard from "./KpiCard";
import { Chart, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from "chart.js";
Chart.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const kpis = [
  {
    title: "Cilindros Llenos",
    value: "14.307",
    unit: "",
    trend: "+1.2%",
    trendType: "up" as "up",
    status: "Óptimo",
    statusColor: "green" as "green",
    borderColor: "green",
    miniChartData: [
      { label: "Ene", value: 10 },
      { label: "Feb", value: 13 },
      { label: "Mar", value: 15 },
    ],
  },
  {
    title: "Cilindros Vacíos",
    value: "6.156",
    unit: "",
    trend: "-0.8%",
    trendType: "down" as "down",
    status: "Bajo",
    statusColor: "yellow" as "yellow",
    borderColor: "cyan",
    miniChartData: [
      { label: "Ene", value: 8 },
      { label: "Feb", value: 7 },
      { label: "Mar", value: 6 },
    ],
  },
];

const donutData = [
  { name: "15Kg", value: 2000 },
  { name: "45Kg", value: 1500 },
  { name: "11Kg", value: 1500 },
];

const radarData = {
  labels: ["15Kg", "45Kg", "11Kg"],
  datasets: [
    {
      label: "SGP",
      data: [1200, 800, 600],
      backgroundColor: "rgba(34, 197, 94, 0.2)",
      borderColor: "rgba(34, 197, 94, 1)",
      borderWidth: 2,
    },
    {
      label: "SAP",
      data: [1100, 700, 600],
      backgroundColor: "rgba(59, 130, 246, 0.2)",
      borderColor: "rgba(59, 130, 246, 1)",
      borderWidth: 2,
    },
  ],
};

const columns = [
  { key: "tipo", label: "Tipo", align: "left" as const },
  { key: "sgp", label: "SGP", align: "right" as const },
  { key: "sap", label: "SAP", align: "right" as const },
  { key: "diferencia", label: "Diferencia", align: "right" as const },
];
const data = [
  { tipo: "15Kg", sgp: 1200, sap: 1100, diferencia: 100 },
  { tipo: "45Kg", sgp: 800, sap: 700, diferencia: 100 },
  { tipo: "11Kg", sgp: 600, sap: 600, diferencia: 0 },
];

export default function CilindrosBlock() {
  return (
    <Card className="mb-10 p-6 bg-white shadow-lg rounded-xl">
      <Flex className="justify-between items-center mb-4">
        <Title className="text-2xl font-bold text-[#0B54A3]">Resumen Cilindros</Title>
        <Badge color="blue">Actualizado</Badge>
      </Flex>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 mb-6">
        {kpis.map((kpi) => (
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
          <Text className="mb-2 font-semibold">Distribución por tipo</Text>
          <DonutChart data={donutData} category="value" index="name" colors={["blue", "green", "yellow"]} />
        </div>
        <div className="w-96">
          <Text className="mb-2 font-semibold">Radar SGP vs SAP</Text>
          <Radar data={radarData} options={{ responsive: true, plugins: { legend: { position: "top" } } }} />
        </div>
      </Flex>
      <Text className="font-semibold mb-2">Diferencias SGP/SAP por tipo</Text>
      <DataTable title="Diferencias SGP/SAP por tipo" columns={columns} data={data} />
    </Card>
  );
} 