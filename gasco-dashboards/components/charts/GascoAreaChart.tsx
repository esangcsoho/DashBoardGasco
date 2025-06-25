"use client";

import React from "react";
import {
  Area,
  AreaChart as RechartsAreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, Title, Text } from "@tremor/react";

// Tipos de datos para el gráfico
interface DataPoint {
  fecha: string;
  [key: string]: number | string;
}

interface GascoAreaChartProps {
  title?: string;
  description?: string;
  data: DataPoint[];
  categories: string[];
  colors?: string[];
  yAxisWidth?: number;
  showGridLines?: boolean;
  showTooltip?: boolean;
  valueFormatter?: (value: number) => string;
}

const defaultColors = ["#0066FF", "#22C55E", "#F59E0B", "#EF4444"];

const defaultValueFormatter = (value: number) => 
  new Intl.NumberFormat("es-CL", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

export default function GascoAreaChart({
  title,
  description,
  data,
  categories,
  colors = defaultColors,
  yAxisWidth = 56,
  showGridLines = true,
  showTooltip = true,
  valueFormatter = defaultValueFormatter,
}: GascoAreaChartProps) {
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload) return null;

    return (
      <div className="rounded-lg border border-gray-200 bg-white p-2 shadow-md">
        <p className="mb-2 text-sm font-medium text-gray-600">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={entry.name} className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <p className="text-sm text-gray-600">
              {entry.name}: {valueFormatter(entry.value)}
            </p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card>
      {title && <Title className="mb-2">{title}</Title>}
      {description && <Text className="mb-6 text-gray-600">{description}</Text>}
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsAreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={showGridLines}
              vertical={false}
              stroke="#E5E7EB"
            />
            <XAxis
              dataKey="fecha"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              width={yAxisWidth}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
              tickFormatter={valueFormatter}
            />
            {showTooltip && (
              <Tooltip
                content={CustomTooltip}
                cursor={{ stroke: "#6B7280", strokeWidth: 1 }}
              />
            )}
            {categories.map((category, index) => (
              <Area
                key={category}
                type="monotone"
                dataKey={category}
                stroke={colors[index % colors.length]}
                fill={colors[index % colors.length]}
                fillOpacity={0.1}
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 4,
                  stroke: colors[index % colors.length],
                  strokeWidth: 2,
                  fill: "white",
                }}
              />
            ))}
          </RechartsAreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
} 