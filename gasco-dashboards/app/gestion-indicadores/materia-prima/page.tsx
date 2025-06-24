"use client"

import { useState } from "react"
import {
  Card,
  Metric,
  Text,
  Flex,
  Grid,
  Title,
  BarChart,
  DonutChart,
  Badge,
  Button,
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  ProgressBar,
  Divider,
} from "@tremor/react"
import { TrendingUp, TrendingDown, AlertTriangle, Eye, Info, BarChart2, List, Grid as GridIcon, Download } from "lucide-react"
import MateriaPrimaBlock from "components/dashboard-blocks/MateriaPrimaBlock"

// Paleta Gasco
const gascoColors = {
  primary: "#E2001A",
  secondary: "#004B8D",
  tertiary: "#00A3E0",
  accent: "#F39200",
  neutralDark: "#222222",
  neutralLight: "#F4F4F4",
  white: "#FFFFFF",
}

const productos = [
  { name: "Propano SC", value: 1642 },
  { name: "Butano", value: 338 },
  { name: "Mezcla", value: 108 },
  { name: "Propano", value: 0 },
]
const total = productos.reduce((acc, p) => acc + p.value, 0)

const subsistemas = [
  { name: "S. Mejillones", valueCil: 20, valueTon: 1.5, ocupacion: 8.5 },
  { name: "S. Belloto", valueCil: 165, valueTon: 12.3, ocupacion: 47 },
  { name: "S. Maipú", valueCil: 1689, valueTon: 125, ocupacion: 71 },
  { name: "S. Talca", valueCil: 0, valueTon: 0, ocupacion: 6 },
  { name: "S. Bio-Bio", valueCil: 231, valueTon: 17.1, ocupacion: 29 },
  { name: "S. Osorno", valueCil: 18, valueTon: 1.3, ocupacion: 8 },
  { name: "S. Coyhaique", valueCil: 31, valueTon: 2.3, ocupacion: 53 },
]

const chartData = [
  { producto: "Propano SC", toneladas: 1250, stock: 900 },
  { producto: "Mezcla", toneladas: 1000, stock: 700 },
  { producto: "Butano", toneladas: 750, stock: 500 },
]

const tableData = [
  { producto: "Propano SC", stock: 1642, estado: "Óptimo" },
  { producto: "Butano", stock: 338, estado: "Bajo" },
  { producto: "Mezcla", stock: 108, estado: "Crítico" },
  { producto: "Propano", stock: 0, estado: "Sin datos" },
]

// Datos de desglose ejemplo
const desgloseDiferencia = [
  { formato: "05K", llenos: 0, vacios: 0, total: 0 },
  { formato: "11K", llenos: 0, vacios: 0, total: 0 },
  { formato: "15K", llenos: -500, vacios: -25, total: -50 },
  { formato: "45K", llenos: 650, vacios: 25, total: 25 },
  { formato: "GH-Aluminio", llenos: -356, vacios: -56, total: -56 },
];
const desgloseMantenimiento = [
  { variable: "Fuga", cilindros: 8, porcentaje: "8%" },
  { variable: "Intervención", cilindros: 30, porcentaje: "24%" },
  { variable: "Habilitado", cilindros: 100, porcentaje: "68%" },
];
const desgloseCompetencia = [
  { competencia: "Marca A", cilindros: 8, porcentaje: "8%" },
  { competencia: "Marca B", cilindros: 30, porcentaje: "24%" },
  { competencia: "Marca C", cilindros: 100, porcentaje: "68%" },
];
const resumenClasificacion = [
  { clasificacion: "Llenos", "05K": 0, "11K": 0, "15K": -500, "45K": 650, "GH-Aluminio": -356, total: -206 },
  { clasificacion: "Vacíos", "05K": 0, "11K": 0, "15K": -25, "45K": 25, "GH-Aluminio": -56, total: -56 },
  { clasificacion: "Mantención", "05K": 8, "11K": 10, "15K": 12, "45K": 14, "GH-Aluminio": 16, total: 60 },
  { clasificacion: "Competencia", "05K": 8, "11K": 10, "15K": 12, "45K": 14, "GH-Aluminio": 16, total: 60 },
];

// Datos de ejemplo para ambas unidades
const kpiData: Record<"cil" | "ton", { label: string; value: string; unit: string; color: string; status: string; trendType: "up" | "down"; trend: string; sparkline: { mes: string; valor: number }[] }[]> = {
  cil: [
    { label: "Materia Prima SGP", value: "2.718", unit: "CIL", color: "blue", status: "Óptimo", trendType: "up", trend: "+2.1%", sparkline: [{ mes: "Ene", valor: 2000 }, { mes: "Feb", valor: 2500 }, { mes: "Mar", valor: 3700 }] },
    { label: "Materia Prima SAP", value: "2.101", unit: "CIL", color: "cyan", status: "Óptimo", trendType: "down", trend: "-1.2%", sparkline: [{ mes: "Ene", valor: 1800 }, { mes: "Feb", valor: 2100 }, { mes: "Mar", valor: 2100 }] },
    { label: "Diferencia SGP vs SAP", value: "+617", unit: "CIL", color: "green", status: "Óptimo", trendType: "up", trend: "+1.5%", sparkline: [{ mes: "Ene", valor: 200 }, { mes: "Feb", valor: 300 }, { mes: "Mar", valor: 617 }] },
    { label: "Ocupación", value: "4.276", unit: "CIL", color: "yellow", status: "Bajo", trendType: "down", trend: "-0.5%", sparkline: [{ mes: "Ene", valor: 4000 }, { mes: "Feb", valor: 4200 }, { mes: "Mar", valor: 4276 }] },
  ],
  ton: [
    { label: "Materia Prima SGP", value: "2.718", unit: "Ton", color: "blue", status: "Óptimo", trendType: "up", trend: "+2.1%", sparkline: [{ mes: "Ene", valor: 2000 }, { mes: "Feb", valor: 2500 }, { mes: "Mar", valor: 3700 }] },
    { label: "Materia Prima SAP", value: "2.101", unit: "Ton", color: "cyan", status: "Óptimo", trendType: "down", trend: "-1.2%", sparkline: [{ mes: "Ene", valor: 1800 }, { mes: "Feb", valor: 2100 }, { mes: "Mar", valor: 2100 }] },
    { label: "Diferencia SGP vs SAP", value: "+617", unit: "Ton", color: "green", status: "Óptimo", trendType: "up", trend: "+1.5%", sparkline: [{ mes: "Ene", valor: 200 }, { mes: "Feb", valor: 300 }, { mes: "Mar", valor: 617 }] },
    { label: "Ocupación", value: "4.276", unit: "Ton", color: "yellow", status: "Bajo", trendType: "down", trend: "-0.5%", sparkline: [{ mes: "Ene", valor: 4000 }, { mes: "Feb", valor: 4200 }, { mes: "Mar", valor: 4276 }] },
  ],
};
const breakdownData = [
  { producto: "PropanoSC", porcentaje: 75, valueCil: 2250, valueTon: 168.7 },
  { producto: "Propano", porcentaje: 0, valueCil: 0, valueTon: 0 },
  { producto: "Mezcla", porcentaje: 15, valueCil: 105, valueTon: 7.9 },
  { producto: "Butano", porcentaje: 50, valueCil: 363, valueTon: 27.2 },
];
const diferenciaTable = [
  { producto: "Propano SC", sgp: 0, sap: 12, diff: 0, pct: 0 },
  { producto: "Propano", sgp: -1256, sap: 1256, diff: -98, pct: -50 },
  { producto: "Mezcla", sgp: -500, sap: 1236, diff: -58, pct: -26 },
  { producto: "Butano", sgp: 581, sap: 2.45, diff: 16, pct: 56 },
];

// Progress circle data ejemplo
const ocupacion = 71;
const libre = 100 - ocupacion;

export default function MateriaPrimaPage() {
  return (
    <main className="p-4 md:p-10 bg-gray-50 min-h-screen">
      <MateriaPrimaBlock />
    </main>
  );
}
