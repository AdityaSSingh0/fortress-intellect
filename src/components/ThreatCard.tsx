
import React, { useState } from 'react';
import { Shield, AlertTriangle, AlertCircle, Clock, CheckCircle2, ExternalLink, Shield as ShieldIcon } from 'lucide-react';
import { Threat } from '@/utils/mockData';
import StatusBadge from './StatusBadge';
import { useToast } from '@/hooks/use-toast';

interface ThreatCardProps {
  threat: Threat;
  compact?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const ThreatCard: React.FC<ThreatCardProps> = ({ threat, compact = false, className = '', style }) => {
  const { id, name, source, type, level, status, details, timestamp, ip } = threat;
  const [isResponding, setIsResponding] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(status);
  const { toast } = useToast();
  
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const getStatusMapping = (status: string): { 
    type: 'normal' | 'warning' | 'critical' | 'info', 
    label: string,
    icon: React.ReactNode
  } => {
    switch (status) {
      case 'detected':
        return { 
          type: 'warning', 
          label: 'Detected', 
          icon: <AlertTriangle className="w-4 h-4" /> 
        };
      case 'analyzing':
        return { 
          type: 'info', 
          label: 'Analyzing', 
          icon: <Clock className="w-4 h-4" /> 
        };
      case 'mitigating':
        return { 
          type: 'warning', 
          label: 'Mitigating', 
          icon: <Shield className="w-4 h-4" /> 
        };
      case 'resolved':
        return { 
          type: 'normal', 
          label: 'Resolved', 
          icon: <CheckCircle2 className="w-4 h-4" /> 
        };
      default:
        return { 
          type: 'info', 
          label: status, 
          icon: <AlertCircle className="w-4 h-4" /> 
        };
    }
  };
  
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'text-cyber-green';
      case 'medium':
        return 'text-amber-400';
      case 'high':
        return 'text-orange-500';
      case 'critical':
        return 'text-cyber-red';
      default:
        return 'text-gray-400';
    }
  };
  
  const handleViewDetails = () => {
    toast({
      title: "Threat Details",
      description: `Viewing detailed analysis for threat: ${name}`,
      variant: "default",
    });
  };
  
  const handleRespond = () => {
    setIsResponding(true);
    
    // Simulate response process
    setTimeout(() => {
      setCurrentStatus('mitigating');
      
      toast({
        title: "Response Initiated",
        description: `AI-CSF is responding to threat: ${name}`,
        variant: "default",
      });
      
      setTimeout(() => {
        setCurrentStatus('resolved');
        setIsResponding(false);
        
        toast({
          title: "Threat Resolved",
          description: `The ${name} threat has been successfully mitigated`,
          variant: "success",
        });
      }, 3000);
    }, 1500);
  };
  
  const statusInfo = getStatusMapping(currentStatus);
  
  if (compact) {
    return (
      <div className={`glass-panel hover-scale ${className}`} style={style}>
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center">
            <div className={`w-2 h-2 rounded-full ${getLevelColor(level)} mr-3`}></div>
            <span className="text-sm font-medium mr-3">{name}</span>
          </div>
          <StatusBadge status={statusInfo.type} label={statusInfo.label} size="sm" />
        </div>
      </div>
    );
  }
  
  return (
    <div className={`glass-panel hover-scale ${className}`} style={style}>
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-base font-medium text-white">{name}</h3>
          <StatusBadge status={statusInfo.type} label={statusInfo.label} size="sm" />
        </div>
        
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-3 text-sm">
          <div>
            <span className="text-gray-400">Source:</span>{' '}
            <span className="text-white">{source}</span>
          </div>
          <div>
            <span className="text-gray-400">Type:</span>{' '}
            <span className="text-white">{type}</span>
          </div>
          <div>
            <span className="text-gray-400">Level:</span>{' '}
            <span className={`font-medium ${getLevelColor(level)}`}>
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </span>
          </div>
          <div>
            <span className="text-gray-400">Time:</span>{' '}
            <span className="text-white">{formatTime(timestamp)}</span>
          </div>
          {ip && (
            <div className="col-span-2">
              <span className="text-gray-400">IP:</span>{' '}
              <span className="font-mono text-white">{ip}</span>
            </div>
          )}
        </div>
        
        <p className="text-sm text-gray-300 mb-3">{details}</p>
        
        <div className="flex justify-end gap-2 mt-2">
          <button 
            className="text-xs cyber-button py-1 px-3 flex items-center"
            onClick={handleViewDetails}
          >
            <ExternalLink className="w-3 h-3 mr-1" />
            Details
          </button>
          <button 
            className={`text-xs cyber-button py-1 px-3 bg-cyber-blue-accent/20 border-cyber-blue-accent/40 flex items-center ${
              isResponding || currentStatus === 'resolved' ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={handleRespond}
            disabled={isResponding || currentStatus === 'resolved'}
          >
            {isResponding ? (
              <>
                <Clock className="w-3 h-3 mr-1 animate-spin" />
                Responding...
              </>
            ) : currentStatus === 'resolved' ? (
              <>
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Resolved
              </>
            ) : (
              <>
                <ShieldIcon className="w-3 h-3 mr-1" />
                Respond
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThreatCard;
