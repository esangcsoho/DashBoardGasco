import React from 'react';

interface GallonTankProps {
  percentage: number;
  product: string;
  size?: 'sm' | 'md' | 'lg';
}

export function GallonTank({ percentage, product, size = 'md' }: GallonTankProps) {
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
        d={`M5,${height * 0.1} Q${width/2},0 ${width-5},${height * 0.1} L${width-5},${height * 0.85} Q${width/2},${height} 5,${height * 0.85} Z`} 
        stroke="#475569" 
        strokeWidth="2" 
        fill="white" 
      />
      {/* Tank fill */}
      <path 
        d={`M7,${height * 0.85 - fillHeight} L${width-7},${height * 0.85 - fillHeight} L${width-7},${height * 0.85} Q${width/2},${height-2} 7,${height * 0.85} Z`} 
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
} 