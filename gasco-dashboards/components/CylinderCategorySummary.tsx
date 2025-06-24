import { Card, Title, BarList } from "@tremor/react";

interface Category {
  name: string;
  value: number;
  color: string;
  link?: string;
}

interface CylinderCategorySummaryProps {
  data: Category[];
  total: number;
}

export function CylinderCategorySummary({ data, total }: CylinderCategorySummaryProps) {
  // Calcula el porcentaje de cada categoría
  const chartData = data.map(cat => ({
    ...cat,
    percent: ((cat.value / total) * 100),
    label: `${cat.name} (${((cat.value / total) * 100).toFixed(1)}%) - ${cat.value.toLocaleString('de-DE')}`
  }));

  // Suma de porcentajes para validación visual
  const percentSum = chartData.reduce((acc, c) => acc + c.percent, 0);

  return (
    <Card className="w-full max-w-xl mx-auto p-4">
      <Title className="mb-4">Resumen por categorías</Title>
      <BarList
        data={chartData.map(cat => ({
          name: cat.link ? <a href={cat.link} className="text-blue-600 underline">{cat.name}</a> : cat.name,
          value: cat.value,
          color: cat.color,
        }))}
        valueFormatter={(v: number) => `${((v/total)*100).toFixed(1)}% | ${v.toLocaleString('de-DE')}`}
        className="mb-2"
      />
      <div className="text-xs text-right text-gray-500 mt-2">
        Total: {total.toLocaleString('de-DE')} cilindros &mdash; Suma porcentajes: {percentSum.toFixed(1)}%
      </div>
    </Card>
  );
} 