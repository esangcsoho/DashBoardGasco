import { Card, Title } from "@tremor/react";

interface StockDifferenceRow {
  name: string;
  sgp: number;
  sap: number;
}

interface StockDifferenceTableProps {
  title: string;
  data: StockDifferenceRow[];
  color?: string; // para resaltar filas (ej: azul para llenos, gris para vacíos)
}

export function StockDifferenceTable({ title, data, color = '#0B54A3' }: StockDifferenceTableProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto p-4 mt-8">
      <Title className="mb-4">{title}</Title>
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-lg overflow-hidden">
          <thead className="bg-[#F0F4F8]">
            <tr>
              <th className="px-4 py-2 text-left text-[#0B54A3] font-bold">Subsistema</th>
              <th className="px-4 py-2 text-right text-[#0B54A3] font-bold">Llenos SGP</th>
              <th className="px-4 py-2 text-right text-[#0B54A3] font-bold">Llenos SAP</th>
              <th className="px-4 py-2 text-right text-[#0B54A3] font-bold">Diferencia</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => {
              const diff = row.sgp - row.sap;
              return (
                <tr key={row.name} className={i % 2 === 0 ? 'bg-white' : 'bg-[#EBF6FC]'}>
                  <td className="px-4 py-2 font-medium text-[#0B54A3]">{row.name}</td>
                  <td className="px-4 py-2 text-right text-gasco-blue-dark">{row.sgp.toLocaleString('de-DE')}</td>
                  <td className="px-4 py-2 text-right text-gasco-blue">{row.sap.toLocaleString('de-DE')}</td>
                  <td className={`px-4 py-2 text-right font-bold ${diff >= 0 ? 'text-green-600' : 'text-red-500'}`}>{diff >= 0 ? `+${diff}` : diff}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
} 