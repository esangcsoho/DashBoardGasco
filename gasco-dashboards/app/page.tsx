"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Metric,
  Text,
  Flex,
  Grid,
  Title,
  BarChart,
  DonutChart,
  Badge,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  ProgressBar,
  Divider,
} from "@tremor/react"
import { TrendingUp, TrendingDown, Eye, BarChart2, Grid as GridIcon, Download } from "lucide-react"
import { Fragment } from "react"
import { StockDifferenceTable } from "@/components/StockDifferenceTable"
import { DataTable } from "@/components/data-table"
import { Radar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip as ChartTooltip,
  Legend as ChartLegend,
} from "chart.js"
import MateriaPrimaBlock from "@/components/dashboard-blocks/MateriaPrimaBlock"
import CilindrosBlock from "@/components/dashboard-blocks/CilindrosBlock"
import MasaOptimaBlock from "@/components/dashboard-blocks/MasaOptimaBlock"
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, ChartTooltip, ChartLegend)

// --- Datos de ejemplo (puedes reemplazar por fetch real) ---
const materiaPrimaKPI = [
  { label: "Stock Total", value: "3.150", unit: "ton", color: "blue", status: "Óptimo" },
  { label: "Ocupación", value: "71", unit: "%", color: "cyan", status: "Óptimo" },
];
const cilindrosKPI = [
  { label: "Cilindros Llenos", value: "14.307", unit: "", color: "green", status: "Óptimo" },
  { label: "Cilindros Vacíos", value: "6.156", unit: "", color: "cyan", status: "Bajo" },
];
const masaOptimaKPI = [
  { label: "Masa Óptima", value: "12.500", unit: "ton", color: "blue", status: "Óptimo" },
  { label: "Masa Actual", value: "11.200", unit: "ton", color: "green", status: "Óptimo" },
];

const materiaPrimaChart = [
  { producto: "Propano SC", toneladas: 1250, stock: 900 },
  { producto: "Mezcla", toneladas: 1000, stock: 700 },
  { producto: "Butano", toneladas: 750, stock: 500 },
];
const cilindrosChart = [
  { tipo: "Llenos", cantidad: 14307 },
  { tipo: "Vacíos", cantidad: 6156 },
  { tipo: "Mantención", cantidad: 22778 },
  { tipo: "Competencia", cantidad: 7397 },
];
const masaOptimaChart = [
  { subsistema: "Maipú", optima: 5000, actual: 4800 },
  { subsistema: "La Serena", optima: 4000, actual: 3900 },
  { subsistema: "Rancagua", optima: 3500, actual: 3500 },
];

const allowedColors = { "Óptimo": "green", "Bajo": "yellow", "Crítico": "red" } as const;
const subsistemasMP = [
  { ss: "SS1 Maipú", stock: 1157, ocupacion: 48, estado: "Óptimo", color: allowedColors["Óptimo"] },
  { ss: "SS2 Mejillones", stock: 204, ocupacion: 84, estado: "Bajo", color: allowedColors["Bajo"] },
  { ss: "SS4 Talca", stock: 0, ocupacion: 0, estado: "Crítico", color: allowedColors["Crítico"] },
  { ss: "SS5 Biobío", stock: 445, ocupacion: 56, estado: "Óptimo", color: allowedColors["Óptimo"] },
  { ss: "SS6 Osorno", stock: 0, ocupacion: 0, estado: "Crítico", color: allowedColors["Crítico"] },
  { ss: "SS7 Coyhaique", stock: 0, ocupacion: 0, estado: "Crítico", color: allowedColors["Crítico"] },
];
const subsistemasCil = [
  { ss: "SS1 Maipú", llenos: 47897, vacios: 35743, mantencion: 0, competencia: 0, estado: "Óptimo", color: allowedColors["Óptimo"] },
  { ss: "SS2 Mejillones", llenos: 86766, vacios: 16788, mantencion: 0, competencia: 0, estado: "Óptimo", color: allowedColors["Óptimo"] },
  { ss: "SS4 Talca", llenos: 0, vacios: 0, mantencion: 0, competencia: 0, estado: "Crítico", color: allowedColors["Crítico"] },
  { ss: "SS5 Biobío", llenos: 57706, vacios: 0, mantencion: 0, competencia: 0, estado: "Óptimo", color: allowedColors["Óptimo"] },
  { ss: "SS6 Osorno", llenos: 19428, vacios: 0, mantencion: 0, competencia: 0, estado: "Bajo", color: allowedColors["Bajo"] },
];

type KPI = {
  label: string;
  value: string;
  unit: string;
  color: string;
  status: string;
};

type MateriaPrimaRow = { producto: string; toneladas: number; stock: number };
type CilindrosRow = { tipo: string; cantidad: number };
type MasaOptimaRow = { subsistema: string; optima: number; actual: number };

type BlockProps<T> = {
  kpis: KPI[];
  chart: T[];
  expanded: { [key: string]: boolean };
  setExpanded: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
};

function RadarChartCustom({ labels, datasets, title }: { labels: string[]; datasets: any[]; title: string }) {
  return (
    <Card className="mb-6 p-4">
      <Title className="mb-2">{title}</Title>
      <div className="w-full flex justify-center">
        <div style={{ width: 400, height: 400 }}>
          <Radar
            data={{ labels, datasets }}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" as const },
                tooltip: { enabled: true },
              },
              scales: {
                r: {
                  angleLines: { display: true },
                  suggestedMin: 0,
                  suggestedMax: Math.max(...datasets.flatMap(ds => ds.data)) * 1.2,
                  pointLabels: { font: { size: 14 } },
                  ticks: { stepSize: 1, font: { size: 12 } },
                },
              },
            }}
          />
        </div>
      </div>
    </Card>
  );
}

export default function DashboardEjecutivo() {
  return (
    <main className="p-4 md:p-10 bg-gray-50 min-h-screen">
      <header className="flex items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-[#0B54A3]">Dashboard Ejecutivo Gasco</h1>
          <p className="text-gray-600 text-lg">Visión consolidada de Materia Prima, Cilindros y Masa Óptima para toma de decisiones ejecutivas.</p>
        </div>
      </header>
      <section className="mb-12">
        <MateriaPrimaBlock />
      </section>
      <section className="mb-12">
        <CilindrosBlock />
      </section>
      <section className="mb-12">
        <MasaOptimaBlock />
      </section>
    </main>
  )
}
