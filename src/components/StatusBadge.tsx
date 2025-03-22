
import React from 'react';

export type StatusType = 'normal' | 'warning' | 'critical' | 'info' | 'success';

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  label, 
  size = 'md',
  animate = true,
  className = ''
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'normal':
      case 'success':
        return 'bg-cyber-green text-white border-cyber-green-dark';
      case 'warning':
        return 'bg-amber-500 text-white border-amber-600';
      case 'critical':
        return 'bg-cyber-red text-white border-cyber-red-dark';
      case 'info':
        return 'bg-cyber-blue-accent text-white border-blue-700';
      default:
        return 'bg-gray-500 text-white border-gray-600';
    }
  };
  
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'text-xs py-0.5 px-2';
      case 'lg':
        return 'text-sm py-1.5 px-4';
      case 'md':
      default:
        return 'text-xs py-1 px-3';
    }
  };
  
  const getIndicatorSize = () => {
    switch (size) {
      case 'sm':
        return 'w-1.5 h-1.5';
      case 'lg':
        return 'w-3 h-3';
      case 'md':
      default:
        return 'w-2 h-2';
    }
  };

  return (
    <div className={`inline-flex items-center rounded border ${getStatusColor()} ${getSizeClasses()} ${className}`}>
      <span className={`${getIndicatorSize()} rounded-full mr-1.5 ${animate ? 'animate-pulse-opacity' : ''}`}
        style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.8)', 
          boxShadow: '0 0 5px rgba(255, 255, 255, 0.5)'
        }}
      />
      {label || status.charAt(0).toUpperCase() + status.slice(1)}
    </div>
  );
};

export default StatusBadge;
