"use client";

import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  Label,
} from "recharts";
import { Card, Title, Text } from "@tremor/react";
import { cn } from "@/lib/utils";

interface DataPoint {
  [key: string]: string | number;
}

interface GascoLineChartProps {
  data: DataPoint[];
  categories: string[];
  index: string;
  title?: string;
  description?: string;
  colors?: string[];
  valueFormatter?: (value: number) => string;
  dateFormatter?: (value: string) => string;
  showGridLines?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  yAxisWidth?: number;
  minValue?: number;
  maxValue?: number;
  connectNulls?: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
}

const defaultColors = ["#0066FF", "#22C55E", "#F59E0B", "#EF4444"];

const defaultValueFormatter = (value: number) =>
  new Intl.NumberFormat("es-CL").format(value);

const defaultDateFormatter = (value: string) => {
  try {
    return new Date(value).toLocaleDateString("es-CL", {
      month: "short",
      year: "numeric",
    });
  } catch {
    return value;
  }
};

export default function GascoLineChart({
  data,
  categories,
  index,
  title,
  description,
  colors = defaultColors,
  valueFormatter = defaultValueFormatter,
  dateFormatter = defaultDateFormatter,
  showGridLines = true,
  showLegend = true,
  showTooltip = true,
  yAxisWidth = 56,
  minValue,
  maxValue,
  connectNulls = false,
  xAxisLabel,
  yAxisLabel,
}: GascoLineChartProps) {
  // Calcular dominio del eje Y si no se proporciona
  const yDomain = React.useMemo(() => {
    if (minValue !== undefined && maxValue !== undefined) {
      return [minValue, maxValue];
    }

    const allValues = data.flatMap((item) =>
      categories.map((cat) => Number(item[cat]) || 0)
    );
    const min = Math.min(...allValues);
    const max = Math.max(...allValues);
    const padding = (max - min) * 0.1;

    return [
      Math.floor(min - padding),
      Math.ceil(max + padding),
    ];
  }, [data, categories, minValue, maxValue]);

  const content = (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          {/* Grid */}
          {showGridLines && (
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={true}
              vertical={false}
              className="stroke-gray-200 dark:stroke-gray-700"
            />
          )}

          {/* Ejes */}
          <XAxis
            dataKey={index}
            tickFormatter={dateFormatter}
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            padding={{ left: 10, right: 10 }}
            className="text-gray-500 dark:text-gray-400"
          >
            {xAxisLabel && (
              <Label
                value={xAxisLabel}
                position="bottom"
                offset={10}
                className="text-gray-600 dark:text-gray-300"
              />
            )}
          </XAxis>
          <YAxis
            width={yAxisWidth}
            tickFormatter={valueFormatter}
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            domain={yDomain}
            className="text-gray-500 dark:text-gray-400"
          >
            {yAxisLabel && (
              <Label
                value={yAxisLabel}
                position="left"
                angle={-90}
                offset={10}
                className="text-gray-600 dark:text-gray-300"
              />
            )}
          </YAxis>

          {/* Tooltip */}
          {showTooltip && (
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload) return null;
                return (
                  <div className="rounded-lg border border-gray-100 bg-white p-2 shadow-md dark:border-gray-800 dark:bg-gray-900">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {dateFormatter(payload[0]?.payload[index])}
                    </div>
                    <div className="mt-1 space-y-1">
                      {payload.map((item: any, idx: number) => (
                        <div
                          key={`${item.name}-${idx}`}
                          className="flex items-center gap-2"
                        >
                          <div
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {item.name}:
                          </span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {valueFormatter(item.value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }}
            />
          )}

          {/* Leyenda */}
          {showLegend && (
            <Legend
              verticalAlign="top"
              height={36}
              iconType="line"
              formatter={(value: string) => (
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {value}
                </span>
              )}
            />
          )}

          {/* Líneas */}
          {categories.map((category, idx) => (
            <Line
              key={category}
              type="monotone"
              dataKey={category}
              stroke={colors[idx % colors.length]}
              strokeWidth={2}
              dot={{
                r: 4,
                strokeWidth: 2,
                fill: "white",
                stroke: colors[idx % colors.length],
              }}
              activeDot={{
                r: 6,
                strokeWidth: 2,
                fill: colors[idx % colors.length],
                stroke: "white",
              }}
              connectNulls={connectNulls}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  if (title || description) {
    return (
      <Card>
        {title && <Title className="mb-2">{title}</Title>}
        {description && (
          <Text className="mb-6 text-gray-600">{description}</Text>
        )}
        {content}
      </Card>
    );
  }

  return content;
} 