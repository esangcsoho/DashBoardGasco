"use client";

import React from "react";
import { Card, Title, Text, Badge } from "@tremor/react";

interface CategoryData {
  label: string;
  value: number;
  color: string;
  percentage?: number;
}

interface GascoCategoryBarProps {
  title?: string;
  description?: string;
  data: CategoryData[];
  showLabels?: boolean;
  showPercentages?: boolean;
  marker?: {
    value: number;
    label: string;
  };
  formatValue?: (value: number) => string;
}

const defaultFormatValue = (value: number) => value.toString();

export default function GascoCategoryBar({
  title,
  description,
  data,
  showLabels = true,
  showPercentages = true,
  marker,
  formatValue = defaultFormatValue,
}: GascoCategoryBarProps) {
  // Calcular el total y los porcentajes
  const total = React.useMemo(() => data.reduce((sum, item) => sum + item.value, 0), [data]);
  const dataWithPercentages = React.useMemo(
    () =>
      data.map((item) => ({
        ...item,
        percentage: (item.value / total) * 100,
      })),
    [data, total]
  );

  // Calcular la posición del marcador
  const markerPosition = React.useMemo(() => {
    if (!marker) return null;
    const position = (marker.value / total) * 100;
    return Math.min(Math.max(position, 0), 100);
  }, [marker, total]);

  return (
    <Card>
      {title && <Title className="mb-2">{title}</Title>}
      {description && <Text className="mb-6 text-gray-600">{description}</Text>}

      <div className="space-y-4">
        {/* Barra de categorías */}
        <div className="relative">
          <div className="flex h-6 w-full overflow-hidden rounded-full">
            {dataWithPercentages.map((item, index) => (
              <div
                key={item.label}
                className="h-full transition-all duration-200"
                style={{
                  width: `${item.percentage}%`,
                  backgroundColor: item.color,
                }}
              />
            ))}
          </div>

          {/* Marcador */}
          {marker && markerPosition !== null && (
            <div
              className="absolute top-0 h-8 w-0.5 -translate-x-1/2 transform"
              style={{
                left: `${markerPosition}%`,
                backgroundColor: "#000",
              }}
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs">
                {marker.label}
              </div>
            </div>
          )}
        </div>

        {/* Leyenda y etiquetas */}
        {showLabels && (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
            {dataWithPercentages.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between gap-2 rounded-lg border p-2"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <Text>{item.label}</Text>
                </div>
                <div className="flex items-center gap-2">
                  <Text className="font-medium">{formatValue(item.value)}</Text>
                  {showPercentages && (
                    <Text className="text-gray-500">
                      ({item.percentage?.toFixed(1)}%)
                    </Text>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
} 