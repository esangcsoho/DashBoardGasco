import { useState } from "react";
import { Card, Title, Tab, TabGroup, TabList, TabPanel, TabPanels, BarList } from "@tremor/react";

interface SubsystemStock {
  name: string;
  llenos: number;
  mantencion: number;
  vacios: number;
  competencia: number;
  llenosTon: number;
  mantencionTon: number;
  vaciosTon: number;
  competenciaTon: number;
}

interface SubsystemStockSwitchProps {
  data: SubsystemStock[];
}

export function SubsystemStockSwitch({ data }: SubsystemStockSwitchProps) {
  const [unit, setUnit] = useState<'cil' | 'ton'>('cil');

  return (
    <Card className="w-full max-w-3xl mx-auto p-4 mt-8">
      <div className="flex justify-between items-center mb-4">
        <Title>Stock Inicial por Subsistema</Title>
        <TabGroup index={unit === 'cil' ? 0 : 1} onIndexChange={i => setUnit(i === 0 ? 'cil' : 'ton')}>
          <TabList>
            <Tab>CIL</Tab>
            <Tab>Toneladas</Tab>
          </TabList>
        </TabGroup>
      </div>
      <div className="space-y-4">
        {data.map((sub) => {
          const categories = [
            {
              name: 'Llenos',
              value: unit === 'cil' ? sub.llenos : sub.llenosTon,
              color: '#0B54A3',
            },
            {
              name: 'Mantención',
              value: unit === 'cil' ? sub.mantencion : sub.mantencionTon,
              color: '#F6C700',
            },
            {
              name: 'Vacíos',
              value: unit === 'cil' ? sub.vacios : sub.vaciosTon,
              color: '#2E79B7',
            },
            {
              name: 'Competencia',
              value: unit === 'cil' ? sub.competencia : sub.competenciaTon,
              color: '#E94F4F',
            },
          ];
          return (
            <div key={sub.name} className="bg-[#F0F4F8] rounded-lg p-4">
              <div className="font-bold text-[#0B54A3] mb-2">{sub.name}</div>
              <BarList
                data={categories}
                valueFormatter={(v: number) => v.toLocaleString('de-DE') + (unit === 'cil' ? ' CIL' : ' t')}
                className="mb-2"
              />
            </div>
          );
        })}
      </div>
    </Card>
  );
} 