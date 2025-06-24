import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SubsystemDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Sample data based on the brainstorming image
  const subsystemData = [
    { name: 'Planta 1', cilindros: 2500, eficiencia: 87, autonomia: 72 },
    { name: 'Planta 2', cilindros: 1800, eficiencia: 82, autonomia: 68 },
    { name: 'Planta 3', cilindros: 3200, eficiencia: 91, autonomia: 76 },
    { name: 'Planta 4', cilindros: 2100, eficiencia: 85, autonomia: 70 }
  ];
  
  const kpiData = [
    { name: 'Eficiencia', valor: 86, meta: 90 },
    { name: 'Autonomía', valor: 72, meta: 80 },
    { name: 'Rendimiento', valor: 78, meta: 85 },
    { name: 'Mantenimientos', valor: 95, meta: 90 }
  ];
  
  const cilindrosPorTipo = [
    { tipo: 'Tipo 1', cantidad: 1250 },
    { tipo: 'Tipo 2', cantidad: 2800 },
    { tipo: 'Tipo 3', cantidad: 1500 },
    { tipo: 'Tipo 4', cantidad: 950 }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Subsistema Operacional - Gasco Chile</h1>
          <p className="text-slate-500">Monitoreo y análisis de operaciones SGP</p>
        </div>
        <img src="/api/placeholder/120/40" alt="Gasco Logo" className="h-10" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4 shadow">
          <h3 className="text-sm font-medium text-blue-600 mb-1">Total Cilindros en Sistema</h3>
          <p className="text-3xl font-bold text-slate-800">9,600</p>
          <p className="text-sm text-green-600">↑ 4.3% desde mes anterior</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 shadow">
          <h3 className="text-sm font-medium text-green-600 mb-1">Eficiencia Promedio</h3>
          <p className="text-3xl font-bold text-slate-800">86.25%</p>
          <p className="text-sm text-green-600">↑ 2.1% desde mes anterior</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 shadow">
          <h3 className="text-sm font-medium text-purple-600 mb-1">Autonomía de Carrusel</h3>
          <p className="text-3xl font-bold text-slate-800">71.5%</p>
          <p className="text-sm text-red-600">↓ 1.2% desde mes anterior</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="mb-4 border-b">
          <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
            <li className="mr-2">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'overview' ? 'text-blue-600 border-blue-600' : 'border-transparent hover:text-gray-600 hover:border-gray-300'}`}>
                Vista General
              </button>
            </li>
            <li className="mr-2">
              <button 
                onClick={() => setActiveTab('cilindros')}
                className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'cilindros' ? 'text-blue-600 border-blue-600' : 'border-transparent hover:text-gray-600 hover:border-gray-300'}`}>
                Cilindros por Tipo
              </button>
            </li>
            <li className="mr-2">
              <button 
                onClick={() => setActiveTab('kpis')}
                className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'kpis' ? 'text-blue-600 border-blue-600' : 'border-transparent hover:text-gray-600 hover:border-gray-300'}`}>
                KPIs
              </button>
            </li>
          </ul>
        </div>
        
        <div className="h-80">
          {activeTab === 'overview' && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={subsystemData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="cilindros" name="Cilindros" fill="#8884d8" />
                <Bar yAxisId="right" dataKey="eficiencia" name="Eficiencia (%)" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          )}
          
          {activeTab === 'cilindros' && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={cilindrosPorTipo}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tipo" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="cantidad" name="Cantidad" fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          )}
          
          {activeTab === 'kpis' && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={kpiData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="valor" name="Valor Actual" fill="#3b82f6" />
                <Bar dataKey="meta" name="Meta" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-medium text-slate-800 mb-4">Clasificación de Cilindros</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-slate-700">Cilindros por tipo (según clasificación)</span>
                <span className="text-sm font-medium text-slate-700">65%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-slate-700">Cilindros por planta + zona con clasificación</span>
                <span className="text-sm font-medium text-slate-700">82%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '82%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-slate-700">Cilindros en mantención / físicos</span>
                <span className="text-sm font-medium text-slate-700">24%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '24%' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-medium text-slate-800 mb-4">Eficiencia de Línea</h3>
          <div className="flex items-center justify-center h-40">
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600">86%</div>
              <div className="text-sm text-slate-500 mt-2">Eficiencia promedio de línea</div>
              <div className="flex items-center justify-center mt-4 space-x-6">
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600">92%</div>
                  <div className="text-xs text-slate-500">Máximo</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-red-600">78%</div>
                  <div className="text-xs text-slate-500">Mínimo</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubsystemDashboard;
