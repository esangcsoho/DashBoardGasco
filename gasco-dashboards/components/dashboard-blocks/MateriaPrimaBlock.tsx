import React from "react";
import {
  Card,
  Flex,
  Title,
  Text,
  Badge,
  Grid,
  BarChart,
  LineChart,
  DonutChart,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Button,
  Select,
  SelectItem,
} from "@tremor/react";
import { theme } from "@/lib/theme";

// Datos de ejemplo actualizados según el diseño de Gasco
const stockData = [
  { fecha: "2024-01", propano: 1200, butano: 800, mezcla: 950 },
  { fecha: "2024-02", propano: 1150, butano: 850, mezcla: 900 },
  { fecha: "2024-03", propano: 1300, butano: 750, mezcla: 1000 },
  { fecha: "2024-04", propano: 1250, butano: 820, mezcla: 980 },
];

const stockActual = [
  { producto: "Propano SC", stock: 1200, minimo: 800, estado: "Normal" },
  { producto: "Butano", stock: 800, minimo: 600, estado: "Precaución" },
  { producto: "Mezcla", stock: 950, minimo: 1000, estado: "Crítico" },
];

const distribucionData = [
  { producto: "Propano SC", toneladas: 1200 },
  { producto: "Butano", toneladas: 800 },
  { producto: "Mezcla", toneladas: 950 },
];

export default function MateriaPrimaBlock() {
  return (
    <Card className="p-6 bg-white shadow-lg rounded-xl">
      {/* Header con título y controles */}
      <div className="flex justify-between items-center mb-6">
        <Title className="text-2xl font-bold text-[#0B54A3]">Dashboard Materia Prima</Title>
        <div className="flex gap-4">
          <select className="px-3 py-2 border rounded-lg">
            <option>Última Semana</option>
            <option>Último Mes</option>
            <option>Último Año</option>
          </select>
          <Button size="xs">Exportar</Button>
        </div>
      </div>

      {/* KPI Cards */}
      <Grid numItems={1} numItemsMd={3} className="gap-6 mb-6">
        <Card className="bg-blue-50">
          <Text>Stock Propano</Text>
          <Text className="text-2xl font-bold">1.200 TON</Text>
          <Badge color="green">Normal</Badge>
        </Card>
        <Card className="bg-yellow-50">
          <Text>Stock Butano</Text>
          <Text className="text-2xl font-bold">800 TON</Text>
          <Badge color="yellow">Precaución</Badge>
        </Card>
        <Card className="bg-red-50">
          <Text>Stock Mezcla</Text>
          <Text className="text-2xl font-bold">950 TON</Text>
          <Badge color="red">Crítico</Badge>
        </Card>
      </Grid>

      {/* Gráficos y Tablas */}
      <div className="space-y-6">
        <Card>
          <Title className="mb-4">Evolución de Stock</Title>
          <LineChart
            data={stockData}
            index="fecha"
            categories={["propano", "butano", "mezcla"]}
            colors={["blue", "yellow", "red"]}
            yAxisWidth={40}
            className="h-72"
          />
        </Card>

        <Grid numItems={1} numItemsMd={2} className="gap-6">
          <Card>
            <Title className="mb-4">Distribución Actual</Title>
            <DonutChart
              data={distribucionData}
              category="toneladas"
              index="producto"
              colors={["blue", "yellow", "red"]}
              className="h-64"
            />
          </Card>
          <Card>
            <Title className="mb-4">Detalle por Producto</Title>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Producto</TableHeaderCell>
                  <TableHeaderCell>Stock Actual</TableHeaderCell>
                  <TableHeaderCell>Stock Mínimo</TableHeaderCell>
                  <TableHeaderCell>Estado</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stockActual.map((row) => (
                  <TableRow key={row.producto}>
                    <TableCell>{row.producto}</TableCell>
                    <TableCell>{row.stock} TON</TableCell>
                    <TableCell>{row.minimo} TON</TableCell>
                    <TableCell>
                      <Badge 
                        color={
                          row.estado === "Normal" ? "green" : 
                          row.estado === "Precaución" ? "yellow" : "red"
                        }
                      >
                        {row.estado}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </Grid>
      </div>
    </Card>
  );
} 