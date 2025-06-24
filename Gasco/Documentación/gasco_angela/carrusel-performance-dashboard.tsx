import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CarruselPerformanceDashboard = () => {
  const [selectedPlant, setSelectedPlant] = useState('all');
  const [timeRange, setTimeRange] = useState('month');
  
  // Sample data for the dashboard
  const rendimientoData = [
    { fecha: '01/02', planta1: 78, planta2: 82, planta3: 76, planta4: 80 },
    { fecha: '02/02', planta1: 80, planta2: 81, planta3: 78, planta4: 79 },
    { fecha: '03/02', planta1: 82, planta2: 84, planta3: 77, planta4: 81 },
    { fecha: '04/02', planta1: 79, planta2: 83, planta3: 75, planta4: 82 },
    { fecha: '05/02', planta1: 81, planta2: 85, planta3: 79, planta4: 83 },
    { fecha: '06/02', planta1: 83, planta2: 86, planta3: 80, planta4: 82 },
    { fecha: '07/02', planta1: 84, planta2: 87, planta3: 82, planta4: 84 }
  ];
  
  const kpisCarrusel = [
    { nombre: 'Planta Santiago', rendimiento: 83, autonomia: 76, mantenimientos: 3, eficiencia: 88 },
    { nombre: 'Planta Concepción', rendimiento: 86, autonomia: 72, mantenimientos: 2, eficiencia: 91 },
    { nombre: 'Planta Antofagasta', rendimiento: 79, autonomia: 68, mantenimientos: 4, eficiencia: 83 },
    { nombre: 'Planta Puerto Montt', rendimiento: 82, autonomia: 74, mantenimientos: 3, eficiencia: 85 }
  ];
  
  const diagnosticosData = [
    { tipo: 'Preventivos', cantidad: 28, porcentaje: 56 },
    { tipo: 'Correctivos', cantidad: 12, porcentaje: 24 },
    { tipo: 'Predictivos', cantidad: 10, porcentaje: 20 }
  ];
  
  const eficienciaLineaData = [
    { planta: 'Santiago', eficiencia: 88, meta: 90 },
    { planta: 'Concepción', eficiencia: 91, meta: 90 },
    { planta: 'Antofagasta', eficiencia: 83, meta: 90 },
    { planta: 'Puerto Montt', eficiencia: 85, meta: 90 }
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Rendimiento de Carrusel - Gasco Chile</h1>
          <p className="text-slate-500">Análisis de rendimiento y mantenimiento</p>
        </div>
        <img src="/api/placeholder/120/40" alt="Gasco Logo" className="h-10" />
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          <select 
            value={selectedPlant} 
            onChange={(e) => setSelectedPlant(e.target.value)}
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
          >
            <option value="all">Todas las plantas</option>
            <option value="planta1">Planta Santiago</option>
            <option value="planta2">Planta Concepción</option>
            <option value="planta3">Planta Antofagasta</option>
            <option value="planta4">Planta Puerto Montt</option>
          </select>
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={() => setTimeRange('week')}
            className={`px-3 py-1 rounded text-sm ${timeRange === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Semana
          </button>
          <button 
            onClick={() => setTimeRange('month')}
            className={`px-3 py-1 rounded text-sm ${timeRange === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Mes
          </button>
          <button 
            onClick={() => setTimeRange('quarter')}
            className={`px-3 py-1 rounded text-sm ${timeRange === 'quarter' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Trimestre
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-purple-50 rounded-lg p-4 shadow">
          <h3 className="text-sm font-medium text-purple-600 mb-1">Rendimiento Promedio</h3>
          <p className="text-3xl font-bold text-slate-800">82.5%</p>
          <p className="text-sm text-green-600">↑ 1.8% vs mes anterior</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 shadow">
          <h3 className="text-sm font-medium text-blue-600 mb-1">Autonomía Carrusel</h3>
          <p className="text-3xl font-bold text-slate-800">72.5%</p>
          <p className="text-sm text-green-600">↑ 2.1% vs mes anterior</p>
        </div>
        <div className="bg-amber-50 rounded-lg p-4 shadow">
          <h3 className="text-sm font-medium text-amber-600 mb-1">Eficiencia de Línea</h3>
          <p className="text-3xl font-bold text-slate-800">86.8%</p>
          <p className="text-sm text-green-600">↑ 0.9% vs mes anterior</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 shadow">
          <h3 className="text-sm font-medium text-green-600 mb-1">Mantenimientos</h3>
          <p className="text-3xl font-bold text-slate-800">12</p>
          <p className="text-sm text-red-600">↑ 2 más que mes anterior</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-medium text-slate-800 mb-4">Rendimiento del Carrusel</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={rendimientoData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="fecha" />
                <YAxis type="number" domain={[70, 90]} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey={selectedPlant === 'all' ? 'planta1' : selectedPlant} 
                  name="Planta Santiago" 
                  stroke="#8884d8" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={selectedPlant === 'all' || selectedPlant === 'planta1' ? 2 : 0}
                  hide={selectedPlant !== 'all' && selectedPlant !== 'planta1'}
                />
                <Line 
                  type="monotone" 
                  dataKey={selectedPlant === 'all' ? 'planta2' : selectedPlant} 
                  name="Planta Concepción" 
                  stroke="#82ca9d" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={selectedPlant === 'all' || selectedPlant === 'planta2' ? 2 : 0}
                  hide={selectedPlant !== 'all' && selectedPlant !== 'planta2'}
                />
                <Line 
                  type="monotone" 
                  dataKey={selectedPlant === 'all' ? 'planta3' : selectedPlant} 
                  name="Planta Antofagasta" 
                  stroke="#ffc658" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={selectedPlant === 'all' || selectedPlant === 'planta3' ? 2 : 0}
                  hide={selectedPlant !== 'all' && selectedPlant !== 'planta3'}
                />
                <Line 
                  type="monotone" 
                  dataKey={selectedPlant === 'all' ? 'planta4' : selectedPlant} 
                  name="Planta Puerto Montt" 
                  stroke="#ff7300" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={selectedPlant === 'all' || selectedPlant === 'planta4' ? 2 : 0}
                  hide={selectedPlant !== 'all' && selectedPlant !== 'planta4'}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-medium text-slate-800 mb-4">Eficiencia de Línea vs Meta</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={eficienciaLineaData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="planta" />
                <YAxis domain={[75, 95]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="eficiencia" name="Eficiencia Actual" fill="#8884d8" />
                <Bar dataKey="meta" name="Meta" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-medium text-slate-800 mb-4">KPIs por Planta</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">Planta</th>
                  <th scope="col" className="px-6 py-3">Rendimiento</th>
                  <th scope="col" className="px-6 py-3">Autonomía</th>
                  <th scope="col" className="px-6 py-3">Eficiencia</th>
                  <th scope="col" className="px-6 py-3">Mantenimientos</th>
                </tr>
              </thead>
              <tbody>
                {kpisCarrusel.map((item, index) => (
                  <tr key={index} className="bg-white border-b">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.nombre}</th>
                    <td className="px-6 py-4">{item.rendimiento}%</td>
                    <td className="px-6 py-4">{item.autonomia}%</td>
                    <td className="px-6 py-4">{item.eficiencia}%</td>
                    <td className="px-6 py-4">{item.mantenimientos}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-medium text-slate-800 mb-4">Diagnósticos y Mantenimientos</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={diagnosticosData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="cantidad"
                    nameKey="tipo"
                    label={({ tipo, porcentaje }) => `${tipo}: ${porcentaje}%`}
                  >
                    {diagnosticosData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex flex-col justify-center">
              <div className="p-4 bg-blue-50 rounded-lg mb-4">
                <h4 className="text-md font-medium text-blue-700 mb-2">Diagnóstico Promedio</h4>
                <div className="flex items-center">
                  <div className="mr-4">
                    <p className="text-sm text-slate-600">Tiempo medio entre fallas:</p>
                    <p className="text-lg font-bold text-slate-800">72 horas</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Tiempo medio de reparación:</p>
                    <p className="text-lg font-bold text-slate-800">3.5 horas</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="text-md font-medium text-green-700 mb-2">Próximos Mantenimientos</h4>
                <ul className="text-sm text-slate-600">
                  <li className="mb-1">• Planta Santiago: 15/03/2025</li>
                  <li className="mb-1">• Planta Concepción: 18/03/2025</li>
                  <li>• Planta Antofagasta: 10/03/2025</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarruselPerformanceDashboard;
