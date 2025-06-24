"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type TankCardProps = {
  tankNumber: string
  product: string
  color: "blue" | "green" | "orange"
  percentage: number
  lastUpdated: string
  metrics: { label: string; value: string | number; unit: string }[]
  sampleTemp: number
  tankCode: string
}

const colorMap = {
  blue: "bg-[#00B0F0]",
  green: "bg-[#80C446]",
  orange: "bg-[#F8971D]",
}

export function TankCard({
  tankNumber,
  product,
  color,
  percentage,
  lastUpdated,
  metrics,
  sampleTemp,
  tankCode,
}: TankCardProps) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-base font-bold">Estanque {tankNumber}</CardTitle>
            <p className="text-sm text-[#00B0F0] font-semibold">{product}</p>
          </div>
          <div className="text-xs text-gray-500 text-right">
            <p>{lastUpdated.split(" ")[0]}</p>
            <p>
              <span className="relative top-0.5 mr-1">
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 3V6L8 7" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              {lastUpdated.split(" ")[1]}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative h-10 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className={cn("absolute top-0 left-0 h-full", colorMap[color])}
            style={{ width: `${percentage}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-bold text-lg">{percentage}%</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-y-4 gap-x-2 mt-4 text-sm">
          {metrics.map((metric) => (
            <div key={metric.label}>
              <p className="text-xs text-gray-500">{metric.label}</p>
              <p className="font-bold text-base">
                {metric.value}{" "}
                <span className="font-normal text-gray-600">{metric.unit}</span>
              </p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-x-2 mt-4 pt-4 border-t text-sm">
          <div>
            <p className="text-xs text-gray-500">Temperatura Muestra</p>
            <p className="font-bold text-base">{sampleTemp}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Codigo Estanque</p>
            <p className="font-bold text-base">{tankCode}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 