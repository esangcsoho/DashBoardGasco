import React from "react";

interface CircularProgressProps {
  value: number; // porcentaje (0-100)
  label?: string;
  size?: number; // px
  strokeWidth?: number; // px
  color?: string; // color del anillo
  bgColor?: string; // color de fondo del anillo
}

const DEFAULT_SIZE = 80;
const DEFAULT_STROKE = 7;
const DEFAULT_COLOR = "#6EE7B7"; // verde tremor
const DEFAULT_BG = "#E5E7EB"; // gris claro

const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  label,
  size = DEFAULT_SIZE,
  strokeWidth = DEFAULT_STROKE,
  color = DEFAULT_COLOR,
  bgColor = DEFAULT_BG,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - value / 100);

  return (
    <div style={{ width: size, height: size, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={bgColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.5s" }}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={size * 0.28}
          fontWeight="bold"
          fill="#1F2937"
        >
          {`${value}%`}
        </text>
        {label && (
          <text
            x="50%"
            y="62%"
            textAnchor="middle"
            fontSize={size * 0.16}
            fill="#374151"
          >
            {label}
          </text>
        )}
      </svg>
    </div>
  );
};

export default CircularProgress; 