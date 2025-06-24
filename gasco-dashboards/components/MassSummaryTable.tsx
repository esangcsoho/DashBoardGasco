import { Card, Title } from "@tremor/react";
import React from "react";

interface MassSummaryRow {
  planta: string;
  formato: string;
  llenos: number;
  vacios: number;
  mantencion: number;
  competencia: number;
}

interface MassSummaryTableProps {
  data: MassSummaryRow[];
}

export function MassSummaryTable({ data }: MassSummaryTableProps) {
  // Obtener todas las plantas y formatos únicos
  const plantas = Array.from(new Set(data.map(row => row.planta)));
  const formatos = Array.from(new Set(data.map(row => row.formato)));

  return (
    <Card className="w-full max-w-5xl mx-auto p-4 mt-8">
      <Title className="mb-4">Masa por Planta y Formato</Title>
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-lg overflow-hidden">
          <thead className="bg-[#F0F4F8]">
            <tr>
              <th className="px-4 py-2 text-left text-[#0B54A3] font-bold align-top">Planta</th>
              <th className="px-4 py-2 text-left text-[#0B54A3] font-bold align-top">Formato</th>
              <th className="px-4 py-2 text-right text-[#0B54A3] font-bold">Llenos</th>
              <th className="px-4 py-2 text-right text-[#2E79B7] font-bold">Vacíos</th>
              <th className="px-4 py-2 text-right text-[#F6C700] font-bold">Mantención</th>
              <th className="px-4 py-2 text-right text-[#E94F4F] font-bold">Competencia</th>
            </tr>
          </thead>
          <tbody>
            {plantas.map((planta) => (
              <React.Fragment key={planta}>
                {formatos.map((formato, i) => {
                  const row = data.find(r => r.planta === planta && r.formato === formato);
                  if (!row) return null;
                  return (
                    <tr key={planta + formato} className={i % 2 === 0 ? 'bg-white' : 'bg-[#EBF6FC]'}>
                      {i === 0 && <td className="px-4 py-2 font-medium text-[#0B54A3] align-top" rowSpan={formatos.filter(f => data.some(d => d.planta === planta && d.formato === f)).length}>{planta}</td>}
                      <td className="px-4 py-2 text-[#0B54A3] align-top">{formato}</td>
                      <td className="px-4 py-2 text-right text-[#0B54A3]">{row.llenos.toLocaleString('de-DE')}</td>
                      <td className="px-4 py-2 text-right text-[#2E79B7]">{row.vacios.toLocaleString('de-DE')}</td>
                      <td className="px-4 py-2 text-right text-[#F6C700]">{row.mantencion.toLocaleString('de-DE')}</td>
                      <td className="px-4 py-2 text-right text-[#E94F4F]">{row.competencia.toLocaleString('de-DE')}</td>
                    </tr>
                  );
                })}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
} 