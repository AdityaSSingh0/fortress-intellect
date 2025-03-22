
import React, { useEffect, useState } from 'react';
import { 
  LineChart, 
  Line, 
  AreaChart,
  Area,
  PieChart, 
  Pie, 
  BarChart,
  Bar,
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

interface DataPoint {
  [key: string]: string | number;
}

type ChartType = 'line' | 'area' | 'pie' | 'bar';

interface SecurityGraphProps {
  data: DataPoint[];
  type?: ChartType;
  xKey: string;
  yKey: string;
  height?: number;
  width?: number;
  colors?: string[];
  title?: string;
  animate?: boolean;
  showGrid?: boolean;
  hideLegend?: boolean;
}

const SecurityGraph: React.FC<SecurityGraphProps> = ({
  data,
  type = 'line',
  xKey,
  yKey,
  height = 300,
  width = 100,
  colors = ['#60A5FA', '#10B981', '#F59E0B', '#EF4444'],
  title,
  animate = true,
  showGrid = false,
  hideLegend = false
}) => {
  const [isVisible, setIsVisible] = useState(!animate);
  
  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [animate]);
  
  const renderChart = () => {
    const opacity = isVisible ? 1 : 0;
    const transition = 'opacity 1s ease-in-out';
    
    switch (type) {
      case 'area':
        return (
          <ResponsiveContainer width={`${width}%`} height={height} style={{ opacity, transition }}>
            <div>
              {title && <div className="text-sm font-medium text-gray-300 mb-2">{title}</div>}
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="rgba(59, 130, 246, 0.2)" />}
                <XAxis 
                  dataKey={xKey} 
                  tick={{ fill: '#9CA3AF', fontSize: 10 }} 
                  axisLine={{ stroke: 'rgba(59, 130, 246, 0.2)' }} 
                />
                <YAxis 
                  tick={{ fill: '#9CA3AF', fontSize: 10 }} 
                  axisLine={{ stroke: 'rgba(59, 130, 246, 0.2)' }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E293B', 
                    borderColor: 'rgba(59, 130, 246, 0.3)',
                    color: '#F9FAFB',
                    borderRadius: '4px',
                    fontSize: '12px',
                  }} 
                />
                {!hideLegend && <Legend wrapperStyle={{ fontSize: '12px', color: '#D1D5DB' }} />}
                <Area 
                  type="monotone" 
                  dataKey={yKey} 
                  stroke={colors[0]} 
                  fill={`url(#colorGradient)`} 
                  strokeWidth={2}
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors[0]} stopOpacity={0.4}/>
                    <stop offset="95%" stopColor={colors[0]} stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </div>
          </ResponsiveContainer>
        );
        
      case 'pie':
        return (
          <ResponsiveContainer width={`${width}%`} height={height} style={{ opacity, transition }}>
            <div>
              {title && <div className="text-sm font-medium text-gray-300 mb-2">{title}</div>}
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey={yKey}
                  nameKey={xKey}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: '#1E293B', 
                    borderColor: 'rgba(59, 130, 246, 0.3)',
                    color: '#F9FAFB',
                    borderRadius: '4px',
                    fontSize: '12px',
                  }}
                />
                {!hideLegend && <Legend wrapperStyle={{ fontSize: '12px', color: '#D1D5DB' }} />}
              </PieChart>
            </div>
          </ResponsiveContainer>
        );
        
      case 'bar':
        return (
          <ResponsiveContainer width={`${width}%`} height={height} style={{ opacity, transition }}>
            <div>
              {title && <div className="text-sm font-medium text-gray-300 mb-2">{title}</div>}
              <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="rgba(59, 130, 246, 0.2)" />}
                <XAxis 
                  dataKey={xKey} 
                  tick={{ fill: '#9CA3AF', fontSize: 10 }} 
                  axisLine={{ stroke: 'rgba(59, 130, 246, 0.2)' }} 
                />
                <YAxis 
                  tick={{ fill: '#9CA3AF', fontSize: 10 }} 
                  axisLine={{ stroke: 'rgba(59, 130, 246, 0.2)' }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E293B', 
                    borderColor: 'rgba(59, 130, 246, 0.3)',
                    color: '#F9FAFB',
                    borderRadius: '4px',
                    fontSize: '12px',
                  }} 
                />
                {!hideLegend && <Legend wrapperStyle={{ fontSize: '12px', color: '#D1D5DB' }} />}
                <Bar dataKey={yKey} fill={colors[0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </div>
          </ResponsiveContainer>
        );
        
      case 'line':
      default:
        return (
          <ResponsiveContainer width={`${width}%`} height={height} style={{ opacity, transition }}>
            <div>
              {title && <div className="text-sm font-medium text-gray-300 mb-2">{title}</div>}
              <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="rgba(59, 130, 246, 0.2)" />}
                <XAxis 
                  dataKey={xKey} 
                  tick={{ fill: '#9CA3AF', fontSize: 10 }} 
                  axisLine={{ stroke: 'rgba(59, 130, 246, 0.2)' }} 
                />
                <YAxis 
                  tick={{ fill: '#9CA3AF', fontSize: 10 }} 
                  axisLine={{ stroke: 'rgba(59, 130, 246, 0.2)' }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E293B', 
                    borderColor: 'rgba(59, 130, 246, 0.3)',
                    color: '#F9FAFB',
                    borderRadius: '4px',
                    fontSize: '12px',
                  }} 
                />
                {!hideLegend && <Legend wrapperStyle={{ fontSize: '12px', color: '#D1D5DB' }} />}
                <Line 
                  type="monotone" 
                  dataKey={yKey} 
                  stroke={colors[0]} 
                  strokeWidth={2}
                  dot={{ stroke: colors[0], strokeWidth: 2, fill: '#1F2937' }} 
                />
              </LineChart>
            </div>
          </ResponsiveContainer>
        );
    }
  };
  
  return renderChart();
};

export default SecurityGraph;
