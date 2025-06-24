import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

// Subsystem Dashboard
const SubsystemDashboard = () => {
  const subsystemData = [
    { 
      name: 'Mejillones', 
      totalStock: 2.390, 
      propanoSC: 1.574, 
      butano: 277, 
      occupancy: 77 
    },
    { 
      name: 'Maipú', 
      totalStock: 1.851, 
      propanoSC: 1.574, 
      butano: 277, 
      occupancy: 77 
    },
    { 
      name: 'Biobío', 
      totalStock: 620, 
      propanoSC: 350, 
      butano: 47, 
      occupancy: 78 
    },
    { 
      name: 'Belloto', 
      totalStock: 247, 
      propanoSC: 223, 
      butano: 0, 
      occupancy: 70 
    }
  ];

  return (
    <Card className="w-full bg-white shadow-lg rounded-lg">
      <CardHeader className="bg-[#0B54A3] text-white p-4">
        <CardTitle className="text-xl font-bold">Subsistemas - Resumen de Stock</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={subsystemData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#D9D9D9" />
            <XAxis dataKey="name" stroke="#666666" />
            <YAxis stroke="#666666" />
            <Tooltip 
              contentStyle={{ backgroundColor: 'white', border: '1px solid #2E79B7' }}
              labelStyle={{ color: '#0B54A3', fontWeight: 'bold' }}
            />
            <Legend 
              wrapperStyle={{ color: '#0B54A3' }}
            />
            <Bar dataKey="propanoSC" fill="#0B54A3" name="Propano SC" />
            <Bar dataKey="butano" fill="#2E79B7" name="Butano" />
          </BarChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {subsystemData.map((subsystem) => (
            <div 
              key={subsystem.name} 
              className="border rounded-lg p-4 text-center"
              style={{ borderColor: '#2E79B7' }}
            >
              <h3 className="font-semibold text-[#0B54A3]">{subsystem.name}</h3>
              <p className="text-[#666666]">Total Stock: {subsystem.totalStock} TON</p>
              <div 
                className="mt-2 h-2 rounded"
                style={{ 
                  width: `${subsystem.occupancy}%`, 
                  backgroundColor: subsystem.occupancy > 75 ? '#0B54A3' : '#2E79B7' 
                }}
              />
              <p className="text-sm mt-1">{subsystem.occupancy}% Ocupación</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Inventory Stock Dashboard
const InventoryStockDashboard = () => {
  const [inventoryData] = useState({
    totalStorage: {
      capacity: 5000,
      current: 3725,
      percentage: 74.5
    },
    productInventory: [
      { 
        product: 'Propano SC', 
        currentStock: 1642, 
        capacity: 2000, 
        percentage: 82.1
      },
      { 
        product: 'Butano', 
        currentStock: 338, 
        capacity: 500, 
        percentage: 67.6
      },
      { 
        product: 'Mezcla', 
        currentStock: 108, 
        capacity: 250, 
        percentage: 43.2
      }
    ]
  });

  const TankVisualization = ({ percentage, height = 200, width = 100 }) => {
    const fillHeight = height * (percentage / 100);
    
    return (
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <path 
          d={`M10,20 L10,${height-20} Q${width/2},${height} ${width-10},${height-20} L${width-10},20 Q${width/2},0 10,20`} 
          fill="none" 
          stroke="#2E79B7" 
          strokeWidth="2" 
        />
        
        <path 
          d={`M12,${height-20-fillHeight} L${width-12},${height-20-fillHeight} L${width-12},${height-20} Q${width/2},${height} 12,${height-20}`} 
          fill={percentage > 80 ? "#0B54A3" : percentage > 50 ? "#2E79B7" : "#666666"} 
          fillOpacity="0.7" 
        />
        
        <text 
          x={width/2} 
          y={height/2} 
          textAnchor="middle" 
          fill="#0B54A3" 
          fontWeight="bold"
        >
          {percentage.toFixed(1)}%
        </text>
      </svg>
    );
  };

  return (
    <Card className="w-full bg-white shadow-lg rounded-lg">
      <CardHeader className="bg-[#0B54A3] text-white p-4">
        <CardTitle className="text-xl font-bold">Inventario de Stock</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#F0F4F8] rounded-lg p-4 text-center">
            <h3 className="text-[#0B54A3] font-semibold mb-4">Almacenamiento Total</h3>
            <div className="flex items-center justify-center">
              <TankVisualization percentage={inventoryData.totalStorage.percentage} />
              <div className="ml-4">
                <p className="text-2xl font-bold text-[#0B54A3]">
                  {inventoryData.totalStorage.percentage}%
                </p>
                <p className="text-[#666666]">
                  {inventoryData.totalStorage.current} / {inventoryData.totalStorage.capacity} TON
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 bg-[#F0F4F8] rounded-lg p-4">
            <h3 className="text-[#0B54A3] font-semibold mb-4">Inventario por Producto</h3>
            <div className="grid grid-cols-3 gap-4">
              {inventoryData.productInventory.map(product => (
                <div key={product.product} className="text-center">
                  <h4 className="text-[#2E79B7] font-medium">{product.product}</h4>
                  <div className="flex justify-center items-center">
                    <TankVisualization percentage={product.percentage} height={150} width={80} />
                  </div>
                  <p className="text-sm text-[#666666]">
                    {product.currentStock} / {product.capacity} TON
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Carousel Performance Dashboard
const CarouselPerformanceDashboard = () => {
  const performanceData = [
    { name: 'Lunes', efficiency: 85, throughput: 120, downtime: 15 },
    { name: 'Martes', efficiency: 88, throughput: 135, downtime: 12 },
    { name: 'Miércoles', efficiency: 82, throughput: 110, downtime: 18 },
    { name: 'Jueves', efficiency: 90, throughput: 145, downtime: 10 },
    { name: 'Viernes', efficiency: 86, throughput: 125, downtime: 14 }
  ];

  return (
    <Card className="w-full bg-white shadow-lg rounded-lg">
      <CardHeader className="bg-[#0B54A3] text-white p-4">
        <CardTitle className="text-xl font-bold">Rendimiento Carrusel</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#D9D9D9" />
            <XAxis dataKey="name" stroke="#666666" />
            <YAxis stroke="#666666" />
            <Tooltip 
              contentStyle={{ backgroundColor: 'white', border: '1px solid #2E79B7' }}
              labelStyle={{ color: '#0B54A3', fontWeight: 'bold' }}
            />
            <Legend 
              wrapperStyle={{ color: '#0B54A3' }}
            />
            <Bar dataKey="efficiency" fill="#0B54A3" name="Eficiencia (%)" />
            <Bar dataKey="throughput" fill="#2E79B7" name="Rendimiento" />
            <Bar dataKey="downtime" fill="#666666" name="Tiempo Inactivo" />
          </BarChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-3 gap-4 mt-6 text-center">
          <div>
            <h4 className="text-[#0B54A3] font-semibold">Eficiencia Promedio</h4>
            <p className="text-[#2E79B7] text-2xl">86.4%</p>
          </div>
          <div>
            <h4 className="text-[#0B54A3] font-semibold">Rendimiento Máximo</h4>
            <p className="text-[#2E79B7] text-2xl">145</p>
          </div>
          <div>
            <h4 className="text-[#0B54A3] font-semibold">Tiempo Inactivo</h4>
            <p className="text-[#666666] text-2xl">13.8</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Main App Component to showcase all dashboards
const GascoDashboards = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <SubsystemDashboard />
      <InventoryStockDashboard />
      <CarouselPerformanceDashboard />
    </div>
  );
};

export default GascoDashboards;
