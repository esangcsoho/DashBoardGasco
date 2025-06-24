"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type SubsystemStockCardProps = {
  name: string
  value: string
  percentage: string
  items: {
    name: string
    value: number
    color: string
  }[]
}

export function SubsystemStockCard({ name, value, percentage, items }: SubsystemStockCardProps) {
  const totalValue = items.reduce((sum, item) => sum + item.value, 0)

  return (
    <Card className="text-center">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
        <div className="flex justify-center items-baseline gap-1 text-sm">
          <span>Cil</span>
          <Badge variant="secondary">{percentage}</Badge>
        </div>
        <div className="mt-4 space-y-2 text-left">
          {items.map((item) => (
            <div key={item.name} className="flex items-center justify-between text-xs">
              <div className="flex items-center">
                <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: item.color }}></span>
                <span>{item.name}</span>
              </div>
              <span>{item.value}%</span>
            </div>
          ))}
        </div>
         <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div className="flex h-full rounded-full overflow-hidden">
                {items.map(item => (
                    <div key={item.name} style={{ width: `${item.value}%`, backgroundColor: item.color }}></div>
                ))}
            </div>
        </div>
      </CardContent>
    </Card>
  )
} 