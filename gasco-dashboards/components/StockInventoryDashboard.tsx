import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
 
export function StockInventoryDashboard() {
  const [activeTab, setActiveTab] = useState('summary');
  const [timeRange, setTimeRange] = useState('month');
  // ... (resto del código igual que el original, solo cambia la exportación)
} 