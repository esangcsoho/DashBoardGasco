import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StockInventoryDashboard = () => {
  const [activeTab, setActiveTab] = useState('summary');
  const [timeRange, setTimeRange] = useState('month');
  
  // Sample data for the dashboard
  const inventoryData = [
    { nombre: 'Planta Santiago', stockFisico: 3250, stockSAP: 3180, diff: 70 },
    { nombre: 'Planta Concepción', stockFisico: 2180, stockSAP: 2200, diff: -20 },
    { nombre: 'Planta Antofagasta', stockFisico: 1850, stockSAP: 1800, diff: 50 },
    { nombre: 'Planta Puerto Montt', stockFisico: 1420, stockSAP: 1400, diff: 20 }
  ];
  
  const inventoryByCylinder = [
    { tipo: '5 kg', cantidad: 2200, porcentaje: 25 },
    { tipo: '11 kg', cantidad: 3500, porcentaje: 40 },
    { tipo: '15 kg', cantidad: 2100, porcentaje: 24 },
    { tipo: '45 kg', cantidad: 900, porcentaje: 11 }
  ];
  
  const historicalData = [
    { mes: 'Ene', stockFisico: 8200, stockSAP: 8150 },
    { mes: 'Feb', stockFisico: 8400, stockSAP: 8350 },
    { mes: 'Mar', stockFisico: 8600, stockSAP: 8500 },
    { mes: 'Abr', stockFisico: 8800, stockSAP: 8750 },
    { mes: 'May', stockFisico: 8500, stockSAP: 8400 },
    { mes: 'Jun', stockFisico: 8700, stockSAP: 8600 }
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Stock & Inventario - Gasco Chile</h1>
          <p className="text-slate-500">Comparativo físico vs SAP</p>
        </div>
        <img src="/api/placeholder/120/40" alt="Gasco Logo" className="h-10" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4 shadow">
          <h3 className="text-sm font-medium text-blue-600 mb-1">Stock Físico Total</h3>
          <p className="text-3xl font-bold text-slate-800">8,700</p>
          <p className="text-sm text-green-600">↑ 2.3% vs mes anterior</p>
        </div>
        <div className="bg-indigo-50 rounded-lg p-4 shadow">
          <h3 className="text-sm font-medium text-indigo-600 mb-1">Stock SAP Total</h3>
          <p className="text-3xl font-bold text-slate-800">8,580</p>
          <p className="text-sm text-green-600">↑ 2.1% vs mes anterior</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 shadow">
          <h3 className="text-sm font-medium text-green-600 mb-1">Diferencia</h3>
          <p className="text-3xl font-bold text-slate-800">+120</p>
          <p className="text-sm text-slate-600">1.4% del total</p>
        </div>
        <div className="bg-amber-50 rounded-lg p-4 shadow">
          <h3 className="text-sm font-medium text-amber-600 mb-1">Precisión Inventario</h3>
          <p className="text-3xl font-bold text-slate-800">98.6%</p>
          <p className="text-sm text-green-600">↑ 0.4% vs mes anterior</p>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2">
            <button 
              onClick={() => setActiveTab('summary')}
              className={`px-4 py-2 rounded ${activeTab === 'summary' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Resumen
            </button>
            <button 
              onClick={() => setActiveTab('comparison')}
              className={`px-4 py-2 rounded ${activeTab === 'comparison' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Comparativo
            </button>
            <button 
              onClick={() => setActiveTab('byType')}
              className={`px-4 py-2 rounded ${activeTab === 'byType' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Por Tipo
            </button>
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => setTimeRange('week')}
              className={`px-3 py-1 rounded text-sm ${timeRange === 'week' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Semana
            </button>
            <button 
              onClick={() => setTimeRange('month')}
              className={`px-3 py-1 rounded text-sm ${timeRange === 'month' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Mes
            </button>
            <button 
              onClick={() => setTimeRange('quarter')}
              className={`px-3 py-1 rounded text-sm ${timeRange === 'quarter' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Trimestre
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 h-80">
          {activeTab === 'summary' && (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={historicalData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="stockFisico" name="Stock Físico" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="stockSAP" name="Stock SAP" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          )}
          
          {activeTab === 'comparison' && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={inventoryData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nombre" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="stockFisico" name="Stock Físico" fill="#3b82f6" />
                <Bar dataKey="stockSAP" name="Stock SAP" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          )}
          
          {activeTab === 'byType' && (
            <div className="grid grid-cols-2 gap-4 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={inventoryByCylinder}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="cantidad"
                    nameKey="tipo"
                    label={({ tipo, porcentaje }) => `${tipo}: ${porcentaje}%`}
                  >
                    {inventoryByCylinder.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="flex flex-col justify-center">
                <h3 className="text-lg font-semibold mb-4">Distribución por Tipo de Cilindro</h3>
                {inventoryByCylinder.map((item, index) => (
                  <div key={index} className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{item.tipo}</span>
                      <span className="text-sm font-medium">{item.cantidad} unidades ({item.porcentaje}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="h-2 rounded-full" style={{ width: `${item.porcentaje}%`, backgroundColor: COLORS[index % COLORS.length] }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-medium text-slate-800 mb-4">Brechas Inventario</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">Planta</th>
                  <th scope="col" className="px-6 py-3">Stock Físico</th>
                  <th scope="col" className="px-6 py-3">Stock SAP</th>
                  <th scope="col" className="px-6 py-3">Diferencia</th>
                  <th scope="col" className="px-6 py-3">% Precisión</th>
                </tr>
              </thead>
              <tbody>
                {inventoryData.map((item, index) => (
                  <tr key={index} className="bg-white border-b">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.nombre}</th>
                    <td className="px-6 py-4">{item.stockFisico}</td>
                    <td className="px-6 py-4">{item.stockSAP}</td>
                    <td className={`px-6 py-4 font-medium ${item.diff > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {item.diff > 0 ? `+${item.diff}` : item.diff}
                    </td>
                    <td className="px-6 py-4">
                      {(100 - Math.abs(item.diff / item.stockFisico * 100)).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-medium text-slate-800 mb-4">Estado de Inventario</h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="text-md font-medium text-blue-700 mb-2">Validación Inventario</h4>
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-blue-100 text-blue-800 text-xl font-bold">98%</div>
                <div className="ml-4">
                  <p className="text-sm text-slate-600">Último inventario realizado: 15/02/2025</p>
                  <p className="text-sm text-slate-600">Próximo inventario: 15/03/2025</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="text-md font-medium text-green-700 mb-2">Proyección de Stock</h4>
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-green-100 text-green-800 text-xl font-bold">+2%</div>
                <div className="ml-4">
                  <p className="text-sm text-slate-600">Tendencia mensual: Crecimiento</p>
                  <p className="text-sm text-slate-600">Proyección próximo mes: 8,870 unidades</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockInventoryDashboard;
