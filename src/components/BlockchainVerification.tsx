
import React, { useState } from 'react';
import { Check, X, ShieldCheck, Fingerprint, Clock9 } from 'lucide-react';
import { BlockchainIdentity } from '@/utils/mockData';
import { useCounterAnimation } from '@/utils/animations';

interface BlockchainVerificationProps {
  identity: BlockchainIdentity;
  className?: string;
}

const BlockchainVerification: React.FC<BlockchainVerificationProps> = ({ 
  identity,
  className = ''
}) => {
  const { username, publicKey, status, lastVerified, trustScore } = identity;
  const [expanded, setExpanded] = useState(false);
  const { count } = useCounterAnimation(trustScore);
  
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  
  const getStatusIcon = () => {
    switch (status) {
      case 'verified':
        return <ShieldCheck className="w-5 h-5 text-cyber-green" />;
      case 'pending':
        return <Clock9 className="w-5 h-5 text-amber-400" />;
      case 'revoked':
        return <X className="w-5 h-5 text-cyber-red" />;
      default:
        return null;
    }
  };
  
  const getStatusColor = () => {
    switch (status) {
      case 'verified':
        return 'text-cyber-green';
      case 'pending':
        return 'text-amber-400';
      case 'revoked':
        return 'text-cyber-red';
      default:
        return 'text-gray-400';
    }
  };
  
  const getTrustScoreColor = () => {
    if (trustScore >= 90) return 'text-cyber-green';
    if (trustScore >= 70) return 'text-green-500';
    if (trustScore >= 50) return 'text-amber-400';
    return 'text-cyber-red';
  };
  
  return (
    <div className={`glass-panel ring-glow hover-scale ${className}`}>
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-cyber-blue-light flex items-center justify-center mr-3 ring-1 ring-cyber-blue-accent/30">
              <Fingerprint className="w-6 h-6 text-cyber-blue-highlight" />
            </div>
            <div>
              <h3 className="text-base font-medium text-white">{username}</h3>
              <div className="flex items-center mt-1">
                <span className={`text-xs font-medium ${getStatusColor()}`}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-xl font-semibold leading-none mb-1 cyber-gradient-text">{count}</div>
            <div className="text-xs text-gray-400">Trust Score</div>
          </div>
        </div>
        
        <button 
          onClick={() => setExpanded(!expanded)}
          className="w-full text-center mt-3 text-xs cyber-button py-1"
        >
          {expanded ? 'Hide Details' : 'Show Details'}
        </button>
        
        {expanded && (
          <div className="mt-3 pt-3 border-t border-cyber-blue-accent/20 text-sm animate-fade-in">
            <div className="mb-2">
              <span className="text-gray-400 mr-2">Public Key:</span>
              <span className="font-mono text-xs text-cyber-blue-highlight">{publicKey}</span>
            </div>
            <div className="mb-2">
              <span className="text-gray-400 mr-2">Last Verified:</span>
              <span className="text-white">{formatTime(lastVerified)}</span>
            </div>
            {status === 'verified' && (
              <div className="flex items-center mt-3 p-2 bg-cyber-green/10 rounded border border-cyber-green/20">
                <Check className="w-4 h-4 text-cyber-green mr-2" />
                <span className="text-xs text-cyber-green">Identity Confirmed on Blockchain</span>
              </div>
            )}
            {status === 'pending' && (
              <div className="flex items-center mt-3 p-2 bg-amber-500/10 rounded border border-amber-500/20">
                <Clock9 className="w-4 h-4 text-amber-400 mr-2" />
                <span className="text-xs text-amber-400">Verification in Progress</span>
              </div>
            )}
            {status === 'revoked' && (
              <div className="flex items-center mt-3 p-2 bg-cyber-red/10 rounded border border-cyber-red/20">
                <X className="w-4 h-4 text-cyber-red mr-2" />
                <span className="text-xs text-cyber-red">Identity Verification Revoked</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlockchainVerification;
