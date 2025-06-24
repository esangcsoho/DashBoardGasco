import React from "react";
import { Card, Badge, Button, Flex, Text } from "@tremor/react";
import { TrendingUp, TrendingDown, Eye, BarChart2 } from "lucide-react";
import CircularProgress from "./CircularProgress";

interface MiniChartPoint {
  label: string;
  value: number;
}

interface KpiCardProps {
  title: string;
  value: string | number;
  unit?: string;
  trend?: string;
  trendType?: "up" | "down";
  status?: string;
  statusColor?: "blue" | "green" | "yellow" | "red";
  borderColor?: string;
  miniChartData?: MiniChartPoint[];
  onDetails?: () => void;
  circularPercent?: number;
}

const trendIcon = {
  up: <TrendingUp className="inline text-green-600" size={18} />,
  down: <TrendingDown className="inline text-red-600" size={18} />,
};

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  unit,
  trend,
  trendType = "up",
  status,
  statusColor = "blue",
  borderColor = "blue",
  miniChartData = [
    { label: "Ene", value: 10 },
    { label: "Feb", value: 12 },
    { label: "Mar", value: 15 },
  ],
  onDetails,
  circularPercent,
}) => {
  return (
    <Card
      className={`relative w-full max-w-xs p-4 border-2 rounded-xl bg-white shadow flex flex-col justify-between min-h-[230px] transition hover:shadow-lg border-${borderColor}-300`}
    >
      <Flex className="justify-between items-start mb-2">
        <BarChart2 className={`text-${borderColor}-400`} size={20} />
        {status && (
          <Badge color={statusColor} className="text-xs font-semibold">{status}</Badge>
        )}
      </Flex>
      <Text className="text-lg font-semibold text-gray-700 mb-1">{title}</Text>
      {typeof circularPercent === "number" ? (
        <div className="flex flex-col items-center justify-center mb-2">
          <CircularProgress value={circularPercent} label={title} size={70} color="#6EE7B7" />
        </div>
      ) : (
        <div className="flex items-end gap-2 mb-1">
          <span className="text-3xl font-bold text-gray-900">{value}</span>
          {unit && <span className="text-base text-gray-500 font-medium">{unit}</span>}
        </div>
      )}
      <Flex className="justify-between items-center mb-2">
        <div className="flex items-center gap-1">
          {trendType && trendIcon[trendType]}
          {trend && (
            <span className={trendType === "up" ? "text-green-600" : "text-red-600"}>{trend}</span>
          )}
        </div>
        {/* Mini gráfico simulado */}
        <div className="flex gap-1 items-end">
          {miniChartData.map((point, idx) => (
            <span
              key={point.label}
              className={`inline-block rounded-full bg-${borderColor}-400`}
              style={{ width: 7, height: 7 + point.value, marginBottom: 2 }}
            />
          ))}
        </div>
      </Flex>
      <Flex className="justify-between items-center mt-2">
        <div className="flex gap-2 text-xs text-gray-500">
          {miniChartData.map((point) => (
            <span key={point.label}>{point.label}</span>
          ))}
        </div>
        <Button size="xs" variant="light" icon={Eye} onClick={onDetails}>
          Ver más
        </Button>
      </Flex>
    </Card>
  );
};

export default KpiCard; 