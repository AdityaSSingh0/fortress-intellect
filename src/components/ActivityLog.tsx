
import React from 'react';
import { Info, AlertTriangle, AlertOctagon, CheckCircle } from 'lucide-react';
import { ActivityEntry } from '@/utils/mockData';

interface ActivityLogProps {
  activities: ActivityEntry[];
  maxItems?: number;
  className?: string;
}

const ActivityLog: React.FC<ActivityLogProps> = ({ 
  activities, 
  maxItems = 6,
  className = '' 
}) => {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'info':
        return <Info className="w-4 h-4 text-blue-400" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      case 'error':
        return <AlertOctagon className="w-4 h-4 text-cyber-red" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-cyber-green" />;
      default:
        return <Info className="w-4 h-4 text-blue-400" />;
    }
  };
  
  return (
    <div className={`space-y-3 ${className}`}>
      {activities.slice(0, maxItems).map((activity, index) => (
        <div 
          key={activity.id}
          className="flex items-start p-3 glass-panel animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex-shrink-0 mr-3 mt-0.5">
            {getActivityIcon(activity.type)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white">{activity.message}</p>
            <div className="flex justify-between mt-1 text-xs text-gray-400">
              <span>
                {activity.source}
              </span>
              <span>
                {formatTime(activity.timestamp)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityLog;
