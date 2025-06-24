"use client"

import { useState } from "react";
import { Card } from "@tremor/react";
import { ProgressCircle, BarList } from "@tremor/react";
import { Select, SelectItem } from "@tremor/react";

type SubsystemDistributionCardProps = {
  name: string
  stock: number
  occupation: number
  diffPercentage: number
  diffTon: number
}

const visualOptions = [
  { value: "donut", label: "Donut" },
  { value: "bar", label: "Barra" },
];

export function SubsystemDistributionCard({ name, stock, occupation, diffPercentage, diffTon }: SubsystemDistributionCardProps) {
  const [visual, setVisual] = useState("donut");

  return (
    <Card className="relative group rounded-tremor-small px-3 py-2 w-full h-full flex flex-col justify-between">
      <div className="flex justify-between items-center mb-2">
        <span className="text-tremor-content font-semibold text-sm">{name}</span>
        <Select value={visual} onValueChange={setVisual} className="w-20 h-7 text-xs">
          {visualOptions.map((opt) => (
            <SelectItem key={opt.value} value={opt.value} className="text-xs">
              {opt.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className="flex flex-col items-center justify-center flex-1">
        {visual === "donut" ? (
          <div className="relative flex flex-col items-center justify-center w-full">
            <ProgressCircle
              value={occupation}
              size="lg"
              color="blue"
              className="mx-auto"
            />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-tremor-metric font-bold text-blue-500">
              {occupation}%
            </span>
            <span className="mt-2 text-xs text-tremor-content font-semibold">Ocupación</span>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center">
            <BarList
              data={[
                { name: "Ocupado", value: occupation, color: "blue" },
                { name: "Libre", value: 100 - occupation, color: "gray" },
              ]}
              className="w-full"
              showAnimation
            />
            <span className="mt-2 text-xs text-tremor-content font-semibold">Ocupación</span>
          </div>
        )}
      </div>
      <div className="mt-2 flex flex-col items-center">
        <span className="text-tremor-default text-tremor-content-strong font-bold">{stock.toLocaleString('de-DE')} TON</span>
        <span className="text-xs text-tremor-content mt-1">
          Diferencia vs SAP: <span className={diffPercentage >= 0 ? 'text-green-600' : 'text-red-500'}>{diffPercentage >= 0 ? `+${diffPercentage}` : diffPercentage}%</span> / <span className={diffTon >= 0 ? 'text-green-600' : 'text-red-500'}>{diffTon >= 0 ? `+${diffTon}` : diffTon} Ton</span>
        </span>
      </div>
    </Card>
  );
} 