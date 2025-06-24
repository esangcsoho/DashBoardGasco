import { useState } from 'react';

export function TanqueGasHorizontal() {
  const [gasLevel, setGasLevel] = useState(50);

  const changeGasLevel = (newLevel: number) => {
    if (newLevel >= 0 && newLevel <= 100) {
      setGasLevel(newLevel);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md w-full max-w-2xl">
      <h2 className="text-2xl font-bold mb-4">Tanque de Gas Propano</h2>
      <div className="relative w-full h-96 mb-4">
        {/* Cuerpo principal del tanque */}
        <div className="absolute top-1/4 left-0 right-0 h-48 bg-gray-300 border-2 border-gray-500 rounded-full overflow-hidden">
          {/* Nivel de gas interno */}
          <div 
            className="absolute bottom-0 left-0 right-0 bg-yellow-400 transition-all duration-500"
            style={{ height: `${gasLevel}%` }}
          ></div>
          {/* Flotador */}
          <div className="absolute left-1/2 w-8 h-1 bg-gray-700 -ml-4" style={{ bottom: `${gasLevel}%` }}>
            <div className="absolute bottom-0 left-1/2 w-4 h-8 bg-gray-600 rounded-t-full -ml-2"></div>
          </div>
          {/* Etiqueta del cuerpo */}
          <div className="absolute bottom-0 left-6 text-black font-bold">Cuerpo</div>
          {/* Etiqueta del flotador */}
          <div className="absolute top-14 left-1/2 ml-4 text-black font-bold">
            <div className="h-px w-16 bg-black mb-1"></div>
            Flotador
          </div>
        </div>
        {/* Patas */}
        <div className="absolute bottom-8 left-12 w-6 h-12 bg-gray-500"></div>
        <div className="absolute bottom-8 right-12 w-6 h-12 bg-gray-500"></div>
        {/* Etiqueta de patas */}
        <div className="absolute bottom-2 left-1/2 text-black font-bold">
          <div className="h-px w-12 bg-black mb-1"></div>
          Patas
        </div>
        {/* Línea de servicio */}
        <div className="absolute bottom-32 right-0 w-24 h-2 bg-yellow-500"></div>
        <div className="absolute bottom-30 right-0 text-black font-bold">Línea de servicio</div>
        {/* Línea de llenado */}
        <div className="absolute top-24 left-0 w-16 h-2 bg-yellow-500"></div>
        <div className="absolute top-16 left-0 text-black font-bold">Línea de llenado</div>
        {/* Tapa protectora */}
        <div className="absolute top-8 left-1/2 -ml-20 w-40 h-24 bg-blue-500 rounded-t-full"></div>
        <div className="absolute top-2 left-1/2 -ml-16 text-black font-bold">Tapa protectora</div>
        {/* Válvula de servicio */}
        <div className="absolute top-12 right-24 w-6 h-10">
          <div className="w-4 h-6 bg-gray-400 rounded-full mx-auto"></div>
          <div className="w-6 h-4 bg-gray-600 mt-1"></div>
        </div>
        <div className="absolute top-2 right-24 text-black font-bold">Válvula de servicio</div>
        {/* Regulador */}
        <div className="absolute top-12 right-12 w-8 h-12 bg-red-500"></div>
        <div className="absolute top-2 right-6 text-black font-bold">Regulador</div>
        {/* Medidor de porcentaje */}
        <div className="absolute top-14 left-1/2 w-8 h-8 rounded-full bg-white border-2 border-gray-700 flex items-center justify-center">
          <div className="w-4 h-1 bg-black transform rotate-45"></div>
        </div>
        <div className="absolute top-2 left-1/2 ml-6 text-black font-bold">Medidor de porcentaje</div>
        {/* Cañuelas */}
        <div className="absolute top-20 left-1/2 w-12 h-4 bg-gray-700 rounded-full"></div>
        <div className="absolute top-24 left-1/2 ml-12 text-black font-bold">Cañuela</div>
      </div>
      <div className="text-center mb-4">
        <span className="text-xl font-bold">{gasLevel}%</span>
        <p className="text-gray-600">Nivel actual de gas</p>
      </div>
      <div className="flex flex-col w-full gap-4">
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" onClick={() => changeGasLevel(gasLevel - 10)}>-10%</button>
          <input
            type="range"
            min="0"
            max="100"
            value={gasLevel}
            onChange={(e) => changeGasLevel(parseInt(e.target.value))}
            className="mx-2 w-1/2"
          />
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" onClick={() => changeGasLevel(gasLevel + 10)}>+10%</button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded" onClick={() => changeGasLevel(0)}>Vacío</button>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-2 rounded" onClick={() => changeGasLevel(50)}>Medio</button>
          <button className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded" onClick={() => changeGasLevel(100)}>Lleno</button>
        </div>
      </div>
    </div>
  );
} 