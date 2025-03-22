
import React, { ReactNode } from 'react';

interface SecurityPanelProps {
  title: string;
  children: ReactNode;
  className?: string;
  headerActions?: ReactNode;
  animate?: boolean;
}

const SecurityPanel: React.FC<SecurityPanelProps> = ({ 
  title, 
  children, 
  className = '', 
  headerActions,
  animate = true
}) => {
  return (
    <div 
      className={`glass-panel ${animate ? 'animate-scale-up' : ''} ${className}`}
    >
      <div className="flex justify-between items-center p-4 border-b border-cyber-blue-accent/20">
        <h3 className="font-medium text-cyber-blue-highlight">{title}</h3>
        {headerActions && (
          <div className="flex items-center space-x-2">
            {headerActions}
          </div>
        )}
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

export default SecurityPanel;
