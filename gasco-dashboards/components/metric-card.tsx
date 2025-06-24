import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface MetricCardProps {
  title: string
  value: string | number
  unit?: string
  change?: number
  changeType?: "positive" | "negative" | "neutral"
  subtitle?: string
}

export function MetricCard({ title, value, unit, change, changeType = "neutral", subtitle }: MetricCardProps) {
  const getChangeColor = () => {
    switch (changeType) {
      case "positive":
        return "text-green-600"
      case "negative":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold">{value}</span>
          {unit && <span className="text-sm text-gray-500">{unit}</span>}
        </div>
        {change !== undefined && (
          <div className={`text-sm ${getChangeColor()}`}>
            {change > 0 ? "+" : ""}
            {change}
            {changeType !== "neutral" && (
              <Badge variant={changeType === "positive" ? "default" : "destructive"} className="ml-2">
                {changeType === "positive" ? "↑" : "↓"}
              </Badge>
            )}
          </div>
        )}
        {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
      </CardContent>
    </Card>
  )
}
