import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DataTableProps {
  title: string
  data: Array<{
    [key: string]: string | number
  }>
  columns: Array<{
    key: string
    label: string
    align?: "left" | "center" | "right"
  }>
}

export function DataTable({ title, data, columns }: DataTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className={
                    column.align === "right" ? "text-right" : column.align === "center" ? "text-center" : "text-left"
                  }
                >
                  {column.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell
                    key={column.key}
                    className={
                      column.align === "right" ? "text-right" : column.align === "center" ? "text-center" : "text-left"
                    }
                  >
                    {typeof row[column.key] === "number" && row[column.key] < 0 ? (
                      <span className="text-red-600">{row[column.key]}</span>
                    ) : (
                      row[column.key]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
