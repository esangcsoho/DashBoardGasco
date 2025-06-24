import React, { useState } from 'react';

const GasInventoryDashboard = () => {
  const [selectedPlant, setSelectedPlant] = useState('all');
  
  // Sample data extracted from screenshots
  const summaryData = {
    occupation: 49,
    stockFisico: 2088,
    stockSAP: 1763,
    diferencia: 325,
    nominal: 4293
  };
  
  const productData = [
    { product: 'PROPANO SC', stockFisico: 1642, stockSAP: 1410, diferencia: 232, difPercentage: 16 },
    { product: 'PROPANO', stockFisico: 0, stockSAP: 158, diferencia: -158, difPercentage: -100 },
    { product: 'MEZCLA', stockFisico: 108, stockSAP: 28, diferencia: 80, difPercentage: 286 },
    { product: 'BUTANO', stockFisico: 338, stockSAP: 167, diferencia: 171, difPercentage: 102 }
  ];
  
  const plantData = [
    { id: 'ss1', name: 'Mejillones', occupation: 0, total: 0 },
    { id: 'ss2', name: 'Belloto', occupation: 74, total: 262 },
    { id: 'ss3', name: 'Maipú', occupation: 75, total: 1785 },
    { id: 'ss5', name: 'Biobío', occupation: 0, total: 0 },
    { id: 'ss6', name: 'Osorno', occupation: 0, total: 0 },
    { id: 'ss7', name: 'Coyhaique', occupation: 0, total: 0 }
  ];
  
  const maipuTanks = [
    { id: 1, percentage: 85, weight: 49, product: 'PROPANO SC' },
    { id: 2, percentage: 85, weight: 49, product: 'PROPANO SC' },
    { id: 3, percentage: 85, weight: 49, product: 'PROPANO SC' },
    { id: 4, percentage: 85, weight: 49, product: 'PROPANO SC' },
    { id: 5, percentage: 85, weight: 49, product: 'PROPANO SC' },
    { id: 6, percentage: 85, weight: 49, product: 'BUTANO' }
  ];

  // Custom Tank/Gallon SVG component
  const GallonTank = ({ percentage, product, size = 'md' }) => {
    const height = size === 'sm' ? 80 : size === 'md' ? 120 : 160;
    const width = size === 'sm' ? 60 : size === 'md' ? 80 : 100;
    
    // Calculate fill height based on percentage
    const fillHeight = (height * 0.85) * (percentage / 100);
    
    // Determine color based on product type
    const getColor = () => {
      switch(product) {
        case 'PROPANO SC': return '#10b981'; // emerald-500
        case 'PROPANO': return '#eab308'; // yellow-500
        case 'MEZCLA': return '#8b5cf6'; // purple-500
        case 'BUTANO': return '#3b82f6'; // blue-500
        default: return '#9ca3af'; // gray-400
      }
    };
    
    return (
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {/* Tank outline */}
        <path 
          d={`M5,${height * 0.1} 
              Q${width/2},0 ${width-5},${height * 0.1} 
              L${width-5},${height * 0.85} 
              Q${width/2},${height} 5,${height * 0.85} 
              Z`} 
          stroke="#475569" 
          strokeWidth="2" 
          fill="white" 
        />
        
        {/* Tank fill */}
        <path 
          d={`M7,${height * 0.85 - fillHeight} 
              L${width-7},${height * 0.85 - fillHeight} 
              L${width-7},${height * 0.85} 
              Q${width/2},${height-2} 7,${height * 0.85} 
              Z`} 
          fill={getColor()} 
        />
        
        {/* Percentage text */}
        <text 
          x={width/2} 
          y={height * 0.5} 
          fontWeight="bold" 
          fontSize={size === 'sm' ? 14 : 18} 
          textAnchor="middle" 
          fill="#1e293b"
        >
          {percentage}%
        </text>
        
        {/* Measurement lines */}
        {[25, 50, 75].map(level => (
          <line 
            key={level}
            x1="2" 
            y1={height * 0.85 - (height * 0.75 * level/100)} 
            x2="10" 
            y2={height * 0.85 - (height * 0.75 * level/100)} 
            stroke="#475569" 
            strokeWidth="1" 
          />
        ))}
      </svg>
    );
  };
  
  // Filter plant data based on selection
  const getPlantDetails = () => {
    if (selectedPlant === 'ss3') {
      return (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-xl font-bold mb-4">SUBSISTEMA MAIPÚ - Detalles</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-blue-500 text-white p-4 rounded-lg">
              <h4 className="text-2xl font-bold">75%</h4>
              <p>OCUPACIÓN TOTAL</p>
            </div>
            <div className="bg-blue-500 text-white p-4 rounded-lg">
              <h4 className="text-2xl font-bold">1.785 TON</h4>
              <p>STOCK FÍSICO</p>
            </div>
          </div>
          
          <h4 className="text-lg font-bold mb-2">ESTANQUES - BATERÍA: BATERIA_A</h4>
          <div className="grid grid-cols-3 gap-4">
            {maipuTanks.map(tank => (
              <div key={tank.id} className="flex flex-col items-center mb-4">
                <GallonTank percentage={tank.percentage} product={tank.product} size="md" />
                <div className="mt-2 text-center">
                  <p className="text-sm">Estanque {tank.id.toString().padStart(2, '0')}</p>
                  <p className="font-bold">{tank.weight} TON</p>
                  <p className="text-xs text-gray-600">{tank.product}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <header className="bg-blue-500 text-white p-4 flex justify-between items-center mb-6 rounded-lg">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">Red GASCO</h1>
          <span className="ml-4 bg-white bg-opacity-20 p-1 rounded">&gt;&gt;</span>
        </div>
        <div className="flex items-center">
          <button className="bg-red-600 text-white px-4 py-2 rounded mr-4">Salir</button>
          <p>Datos para el: 03/03/2025 10:20:03</p>
        </div>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-500 text-white p-4 rounded-lg flex flex-col items-center justify-center">
          <h2 className="text-4xl font-bold">{summaryData.occupation}%</h2>
          <p className="text-center">OCUPACIÓN TOTAL</p>
          <div className="mt-2">
            <GallonTank percentage={summaryData.occupation} product="TOTAL" size="sm" />
          </div>
        </div>
        
        <div className="bg-blue-400 text-white p-4 rounded-lg flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold">{summaryData.stockFisico.toLocaleString()} TON</h2>
          <p className="text-center">STOCK FÍSICO</p>
        </div>
        
        <div className="bg-blue-400 text-white p-4 rounded-lg flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold">{summaryData.diferencia.toLocaleString()} TON</h2>
          <p className="text-center">DIFERENCIA</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">RESUMEN SEGÚN PRODUCTO (TON)</h2>
          <div className="flex items-center mb-6">
            {productData.map(item => (
              <div key={item.product} className="text-center mx-2 flex-1">
                <GallonTank 
                  percentage={item.stockFisico > 0 ? Math.round((item.stockFisico / 2000) * 100) : 0} 
                  product={item.product} 
                  size="md" 
                />
                <p className={`mt-2 font-medium ${
                  item.product === 'PROPANO SC' ? 'text-emerald-600' :
                  item.product === 'PROPANO' ? 'text-yellow-600' :
                  item.product === 'MEZCLA' ? 'text-purple-600' :
                  'text-blue-600'
                }`}>{item.product}</p>
                <p className="font-bold">{item.stockFisico}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">RESUMEN POR PRODUCTO (TON)</h2>
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">PRODUCTO</th>
                <th className="p-2 text-right">STOCK FÍSICO</th>
                <th className="p-2 text-right">STOCK SAP</th>
                <th className="p-2 text-right">DIFEREN.</th>
                <th className="p-2 text-right">% DIF.</th>
              </tr>
            </thead>
            <tbody>
              {productData.map(item => (
                <tr key={item.product} className={`
                  ${item.product === 'PROPANO SC' ? 'bg-emerald-100' :
                    item.product === 'PROPANO' ? 'bg-yellow-100' :
                    item.product === 'MEZCLA' ? 'bg-purple-100' :
                    'bg-blue-100'
                  }`}>
                  <td className="p-2 font-medium">{item.product}</td>
                  <td className="p-2 text-right">{item.stockFisico.toLocaleString()}</td>
                  <td className="p-2 text-right">{item.stockSAP.toLocaleString()}</td>
                  <td className="p-2 text-right">{item.diferencia.toLocaleString()}</td>
                  <td className="p-2 text-right">{item.difPercentage}%</td>
                </tr>
              ))}
              <tr className="font-bold bg-gray-50">
                <td className="p-2">Total</td>
                <td className="p-2 text-right">{summaryData.stockFisico.toLocaleString()}</td>
                <td className="p-2 text-right">{summaryData.stockSAP.toLocaleString()}</td>
                <td className="p-2 text-right">{summaryData.diferencia.toLocaleString()}</td>
                <td className="p-2 text-right">18%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <h2 className="text-xl font-bold mb-4">RESUMEN POR PLANTA</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {plantData.map(plant => (
          <div 
            key={plant.id}
            onClick={() => setSelectedPlant(plant.id)}
            className={`${plant.total > 0 ? 'bg-blue-500' : 'bg-blue-300'} text-white p-4 rounded-lg cursor-pointer ${selectedPlant === plant.id ? 'ring-4 ring-blue-300' : ''}`}
          >
            <div className="flex">
              <div className="flex-1">
                <h3 className="text-lg font-medium">{plant.id} {plant.name}</h3>
                <p className="text-3xl font-bold mb-2">{plant.total}</p>
                <p className="text-sm">TON</p>
                <p className="mt-2">Ocupación {plant.occupation}%</p>
              </div>
              <div className="flex items-center justify-center">
                {plant.total > 0 && (
                  <GallonTank percentage={plant.occupation} product="TOTAL" size="sm" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {getPlantDetails()}
      
      <div className="mt-6 bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Estructura de Base de Datos</h2>
        <div className="flex flex-wrap gap-4">
          {['df_batteries', 'df_material_groups', 'df_material_measurements', 'df_materials', 'df_plants', 'df_ponds', 'df_subsystems', 'df_warehouses'].map(table => (
            <div key={table} className="p-2 bg-gray-100 rounded border border-gray-200">
              <span className="font-medium">{table}</span>
              <span className="ml-2 text-xs text-gray-500">
                {table === 'df_material_measurements' ? '112K' : '24K'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GasInventoryDashboard;
