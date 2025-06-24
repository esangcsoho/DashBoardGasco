"use client";
import { useState } from "react";
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
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  ProgressBar,
  Divider,
} from "@tremor/react";
import { TrendingUp, TrendingDown, Eye, BarChart2, List, Grid as GridIcon, Download } from "lucide-react";
import MasaOptimaBlock from "components/dashboard-blocks/MasaOptimaBlock";

// Datos de ejemplo
const kpiData: { label: string; value: string; unit: string; color: string; status: string; trendType: "up" | "down"; trend: string; sparkline: { mes: string; valor: number }[] }[] = [
  { label: "Masa Óptima", value: "12.500", unit: "ton", color: "blue", status: "Óptimo", trendType: "up", trend: "+2.1%", sparkline: [{ mes: "Ene", valor: 12000 }, { mes: "Feb", valor: 12400 }, { mes: "Mar", valor: 12500 }] },
  { label: "Masa Actual", value: "11.200", unit: "ton", color: "green", status: "Óptimo", trendType: "down", trend: "-1.2%", sparkline: [{ mes: "Ene", valor: 11200 }, { mes: "Feb", valor: 11300 }, { mes: "Mar", valor: 11200 }] },
  { label: "Diferencia", value: "-1.300", unit: "ton", color: "red", status: "Crítico", trendType: "down", trend: "-10.4%", sparkline: [{ mes: "Ene", valor: -1000 }, { mes: "Feb", valor: -1200 }, { mes: "Mar", valor: -1300 }] },
];
const masaBreakdown = [
  { subsistema: "Maipú", optima: 5000, actual: 4800, diff: -200 },
  { subsistema: "La Serena", optima: 4000, actual: 3900, diff: -100 },
  { subsistema: "Rancagua", optima: 3500, actual: 3500, diff: 0 },
];
const masaPorFormato = [
  { formato: "05K", optima: 1000, actual: 900 },
  { formato: "11K", optima: 3000, actual: 2800 },
  { formato: "15K", optima: 4000, actual: 4000 },
  { formato: "45K", optima: 4500, actual: 4500 },
];

// Progress circle data ejemplo
const masaOptima = 12500;
const masaActual = 11200;
const porcentaje = Math.round((masaActual / masaOptima) * 100);
const restante = 100 - porcentaje;

export default function ResumenMasaOptimaPage() {
  return (
    <main className="p-4 md:p-10 bg-gray-50 min-h-screen">
      <MasaOptimaBlock />
    </main>
  );
} 