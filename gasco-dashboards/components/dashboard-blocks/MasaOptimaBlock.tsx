import React from "react";
import { Card, Flex, Title, Text, Badge } from "@tremor/react";
import { DonutChart } from "@tremor/react";
import { DataTable } from "../data-table";
import KpiCard from "./KpiCard";

const kpis = [
  {
    title: "Masa Óptima",
    value: "12.500",
    unit: "ton",
    trend: "+2.1%",
    trendType: "up" as "up",
    status: "Óptimo",
    statusColor: "blue" as "blue",
    borderColor: "blue",
    miniChartData: [
      { label: "Ene", value: 10 },
      { label: "Feb", value: 12 },
      { label: "Mar", value: 15 },
    ],
  },
  {
    title: "Masa Actual",
    value: "11.200",
    unit: "ton",
    trend: "-1.2%",
    trendType: "down" as "down",
    status: "Óptimo",
    statusColor: "blue" as "blue",
    borderColor: "green",
    miniChartData: [
      { label: "Ene", value: 9 },
      { label: "Feb", value: 10 },
      { label: "Mar", value: 8 },
    ],
  },
];

const donutData = [
  { name: "Subsistema 1", value: 1200 },
  { name: "Subsistema 2", value: 1000 },
  { name: "Subsistema 3", value: 1000 },
];

const columns = [
  { key: "subsistema", label: "Subsistema", align: "left" as const },
  { key: "optima", label: "Óptima", align: "right" as const },
  { key: "actual", label: "Actual", align: "right" as const },
  { key: "diferencia", label: "Diferencia", align: "right" as const },
];
const data = [
  { subsistema: "Subsistema 1", optima: 1200, actual: 1100, diferencia: 100 },
  { subsistema: "Subsistema 2", optima: 1000, actual: 950, diferencia: 50 },
  { subsistema: "Subsistema 3", optima: 1000, actual: 950, diferencia: 50 },
];

export default function MasaOptimaBlock() {
  return (
    <Card className="mb-10 p-6 bg-white shadow-lg rounded-xl">
      <Flex className="justify-between items-center mb-4">
        <Title className="text-2xl font-bold text-[#0B54A3]">Resumen Masa Óptima</Title>
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
          <Text className="mb-2 font-semibold">Distribución por subsistema</Text>
          <DonutChart data={donutData} category="value" index="name" colors={["green", "blue", "yellow"]} />
        </div>
      </Flex>
      <Text className="font-semibold mb-2">Detalle por subsistema</Text>
      <DataTable title="Detalle por subsistema" columns={columns} data={data} />
    </Card>
  );
} 