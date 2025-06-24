"use client"

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
import CilindrosBlock from "components/dashboard-blocks/CilindrosBlock";

const breadcrumb = [
  { name: "Home", href: "/" },
  { name: "Gestión e Indicadores", href: "#" },
  { name: "Resumen Cilindros", href: "/gestion-indicadores/resumen-cilindros" },
]

const cylinderSummary = {
  total: "50.648",
  llenos: { value: "14.307", percentage: "34%" },
  vacios: { value: "6.156", percentage: "12%" },
  mantencion: { value: "22.778", percentage: "45%" },
  rechazo: { value: "7.397", percentage: "14%" },
}

const stockDifference = [
  { tipo: "Llenos", sgp: 15000, sap: 15500, diff: 500, percentage: "12%" },
  { tipo: "Vacíos", sgp: 38500, sap: 40000, diff: -500, percentage: "-4%" },
];

const subsystemStockData = [
    {
        name: 'S. Mejillones', value: '7.258', percentage: '12%',
        items: [
            { name: 'Llenos', value: 40, color: '#3b82f6' }, { name: 'Vacios', value: 30, color: '#14b8a6' },
            { name: 'Mantención', value: 20, color: '#f59e0b' }, { name: 'Competencia', value: 10, color: '#ef4444' },
        ]
    },
    {
        name: 'S. Baquedano', value: '7.258', percentage: '12%',
        items: [
            { name: 'Llenos', value: 40, color: '#3b82f6' }, { name: 'Vacios', value: 30, color: '#14b8a6' },
            { name: 'Mantención', value: 20, color: '#f59e0b' }, { name: 'Competencia', value: 10, color: '#ef4444' },
        ]
    },
    {
        name: 'S. Minera', value: '7.258', percentage: '12%',
        items: [
            { name: 'Llenos', value: 40, color: '#3b82f6' }, { name: 'Vacios', value: 30, color: '#14b8a6' },
            { name: 'Mantención', value: 20, color: '#f59e0b' }, { name: 'Competencia', value: 10, color: '#ef4444' },
        ]
    },
    {
        name: 'S. Talca', value: '7.258', percentage: '12%',
        items: [
            { name: 'Llenos', value: 40, color: '#3b82f6' }, { name: 'Vacios', value: 30, color: '#14b8a6' },
            { name: 'Mantención', value: 20, color: '#f59e0b' }, { name: 'Competencia', value: 10, color: '#ef4444' },
        ]
    },
    {
        name: 'S. Osorno', value: '7.258', percentage: '12%',
        items: [
            { name: 'Llenos', value: 40, color: '#3b82f6' }, { name: 'Vacios', value: 30, color: '#14b8a6' },
            { name: 'Mantención', value: 20, color: '#f59e0b' }, { name: 'Competencia', value: 10, color: '#ef4444' },
        ]
    },
];

const differenceBreakdown = [
  { formato: "05K", llenos: 0, vacios: 0 },
  { formato: "11K", llenos: -50, vacios: -50 },
  { formato: "15K", llenos: -500, vacios: -26 },
  { formato: "45K", llenos: 658, vacios: 25 },
  { formato: "GH-Aluminio", llenos: -356, vacios: -56 },
];

const maintenanceBreakdown = [
  { mantencion: "Pintura", cilindros: 0, porcentaje: "0%" },
  { mantencion: "Reinspección", cilindros: 0, porcentaje: "50%" },
  { mantencion: "Inutilizados", cilindros: 500, porcentaje: "25%" },
];

const competenciaBreakdown = [
  { competencia: "Marca 1", cilindros: 0, porcentaje: "0%" },
  { competencia: "Marca 2", cilindros: 0, porcentaje: "50%" },
  { competencia: "Marca 3", cilindros: 300, porcentaje: "25%" },
];

const classificationSummary = [
  { clasificacion: "Llenos", "05K": 0, "11K": 12, "15K": 0, "45K": 0, "GH-Aluminio": 92.34, total: 92.46 },
  { clasificacion: "Vacíos", "05K": 0, "11K": -1236, "15K": 0, "45K": 0, "GH-Aluminio": 45.37, total: 44.13 },
  { clasificacion: "Mantención", "05K": 0, "11K": 1236, "15K": -56, "45K": -26, "GH-Aluminio": 345, total: 67.99 },
  { clasificacion: "Competencia", "05K": 0, "11K": 56, "15K": 56, "45K": 56, "GH-Aluminio": 456, total: 23.87 },
  { clasificacion: "Total", "05K": 0, "11K": 23, "15K": 97, "45K": 97, "GH-Aluminio": 454, total: 23.56 },
];

const cylinderKeys = ["llenos", "vacios", "mantencion", "rechazo"] as const;
type CylinderKey = typeof cylinderKeys[number];

const DetailCard = ({ title, value }: { title: string, value: string | number }) => (
    <div className="bg-gray-100 p-2 rounded-md text-center">
        <p className="text-xs text-gray-500">{title}</p>
        <p className="font-bold">{value}</p>
    </div>
)

const kpiData: { label: string; value: string; unit: string; color: string; status: string; trendType: "up" | "down"; trend: string; sparkline: { mes: string; valor: number }[] }[] = [
  { label: "Masa Total", value: "50.648", unit: "cilindros", color: "blue", status: "Óptimo", trendType: "up", trend: "+2.1%", sparkline: [{ mes: "Ene", valor: 48000 }, { mes: "Feb", valor: 50000 }, { mes: "Mar", valor: 50648 }] },
  { label: "Llenos", value: "14.307", unit: "", color: "green", status: "Óptimo", trendType: "up", trend: "+1.2%", sparkline: [{ mes: "Ene", valor: 14000 }, { mes: "Feb", valor: 14200 }, { mes: "Mar", valor: 14307 }] },
  { label: "Vacíos", value: "6.156", unit: "", color: "cyan", status: "Bajo", trendType: "down", trend: "-0.8%", sparkline: [{ mes: "Ene", valor: 6200 }, { mes: "Feb", valor: 6300 }, { mes: "Mar", valor: 6156 }] },
  { label: "Mantención", value: "22.778", unit: "", color: "yellow", status: "Alerta", trendType: "down", trend: "-2.0%", sparkline: [{ mes: "Ene", valor: 23000 }, { mes: "Feb", valor: 22500 }, { mes: "Mar", valor: 22778 }] },
  { label: "Competencia", value: "7.397", unit: "", color: "red", status: "Crítico", trendType: "up", trend: "+0.5%", sparkline: [{ mes: "Ene", valor: 7300 }, { mes: "Feb", valor: 7350 }, { mes: "Mar", valor: 7397 }] },
];

export default function ResumenCilindrosPage() {
  return (
    <main className="p-4 md:p-10 bg-gray-50 min-h-screen">
      <CilindrosBlock />
    </main>
  );
}