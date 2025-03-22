
import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Shield, 
  UserCheck, 
  Globe, 
  Server, 
  Database, 
  Laptop, 
  Smartphone,
  AlertTriangle,
  Cpu,
  RefreshCw,
  EyeOff,
  Zap,
  ArrowRight,
  ExternalLink,
  NetworkIcon,
  CloudIcon
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import SecurityPanel from '@/components/SecurityPanel';
import StatusBadge from '@/components/StatusBadge';
import { useCounterAnimation } from '@/utils/animations';

interface AccessRequest {
  id: string;
  user: string;
  resource: string;
  timestamp: string;
  status: 'granted' | 'denied' | 'pending';
  risk: number;
  deviceTrust: number;
  detail: string;
}

interface ZeroTrustAsset {
  id: string;
  name: string;
  type: 'server' | 'database' | 'application' | 'endpoint' | 'network';
  status: 'protected' | 'vulnerable' | 'monitoring';
  accessLevel: string;
  lastVerified: string;
}

const accessRequests: AccessRequest[] = [
  {
    id: 'req001',
    user: 'alice.smith',
    resource: 'Financial Database',
    timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
    status: 'granted',
    risk: 12,
    deviceTrust: 98,
    detail: 'Regular access pattern, verified device'
  },
  {
    id: 'req002',
    user: 'bob.johnson',
    resource: 'HR System',
    timestamp: new Date(Date.now() - 12 * 60000).toISOString(),
    status: 'denied',
    risk: 85,
    deviceTrust: 45,
    detail: 'Unusual location, unverified device'
  },
  {
    id: 'req003',
    user: 'charlie.davis',
    resource: 'Code Repository',
    timestamp: new Date(Date.now() - 18 * 60000).toISOString(),
    status: 'granted',
    risk: 18,
    deviceTrust: 92,
    detail: 'Regular access pattern, verified identity'
  },
  {
    id: 'req004',
    user: 'admin',
    resource: 'Network Configuration',
    timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
    status: 'pending',
    risk: 65,
    deviceTrust: 78,
    detail: 'Elevated privileges requested, additional verification required'
  }
];

const zeroTrustAssets: ZeroTrustAsset[] = [
  {
    id: 'asset001',
    name: 'Primary Database Cluster',
    type: 'database',
    status: 'protected',
    accessLevel: 'Restricted',
    lastVerified: new Date(Date.now() - 15 * 60000).toISOString()
  },
  {
    id: 'asset002',
    name: 'Web Application Servers',
    type: 'server',
    status: 'protected',
    accessLevel: 'Conditional',
    lastVerified: new Date(Date.now() - 28 * 60000).toISOString()
  },
  {
    id: 'asset003',
    name: 'Financial Systems',
    type: 'application',
    status: 'protected',
    accessLevel: 'Highly Restricted',
    lastVerified: new Date(Date.now() - 45 * 60000).toISOString()
  },
  {
    id: 'asset004',
    name: 'Employee Workstations',
    type: 'endpoint',
    status: 'monitoring',
    accessLevel: 'User-based',
    lastVerified: new Date(Date.now() - 62 * 60000).toISOString()
  },
  {
    id: 'asset005',
    name: 'Development Environment',
    type: 'server',
    status: 'vulnerable',
    accessLevel: 'Restricted',
    lastVerified: new Date(Date.now() - 120 * 60000).toISOString()
  },
  {
    id: 'asset006',
    name: 'Cloud Storage',
    type: 'database',
    status: 'protected',
    accessLevel: 'Conditional',
    lastVerified: new Date(Date.now() - 90 * 60000).toISOString()
  }
];

const ZeroTrust = () => {
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState(accessRequests);
  const [selectedAsset, setSelectedAsset] = useState<ZeroTrustAsset | null>(null);
  
  const { count: protectionScore } = useCounterAnimation(94);
  const { count: complianceScore } = useCounterAnimation(97);
  const { count: riskScore } = useCounterAnimation(14);
  
  useEffect(() => {
    // Simulate occasional new access requests
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newStatus = Math.random() > 0.7 ? 'denied' : Math.random() > 0.5 ? 'granted' : 'pending';
        const newRisk = newStatus === 'denied' ? Math.floor(Math.random() * 40) + 60 : Math.floor(Math.random() * 30) + 10;
        const newRequest: AccessRequest = {
          id: `req${Math.floor(Math.random() * 10000)}`,
          user: ['alice.smith', 'bob.johnson', 'charlie.davis', 'dana.miller', 'admin'][Math.floor(Math.random() * 5)],
          resource: ['Financial Database', 'HR System', 'Code Repository', 'Network Configuration', 'Customer Data'][Math.floor(Math.random() * 5)],
          timestamp: new Date().toISOString(),
          status: newStatus as any,
          risk: newRisk,
          deviceTrust: newStatus === 'denied' ? Math.floor(Math.random() * 50) + 30 : Math.floor(Math.random() * 20) + 80,
          detail: newStatus === 'denied' 
            ? 'Suspicious access pattern, verification failed' 
            : newStatus === 'pending'
            ? 'Additional verification required'
            : 'Verified user and device'
        };
        
        setRequests(prev => [newRequest, ...prev.slice(0, 5)]);
      }
    }, 15000);
    
    return () => clearInterval(interval);
  }, []);
  
  const refreshData = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  
  const getAssetTypeIcon = (type: string) => {
    switch (type) {
      case 'server':
        return <Server className="w-5 h-5 text-cyber-blue-accent" />;
      case 'database':
        return <Database className="w-5 h-5 text-cyber-blue-accent" />;
      case 'application':
        return <Cpu className="w-5 h-5 text-cyber-blue-accent" />;
      case 'endpoint':
        return <Laptop className="w-5 h-5 text-cyber-blue-accent" />;
      case 'network':
        return <NetworkIcon className="w-5 h-5 text-cyber-blue-accent" />;
      default:
        return <Globe className="w-5 h-5 text-cyber-blue-accent" />;
    }
  };
  
  const getAssetStatusBadge = (status: string) => {
    switch (status) {
      case 'protected':
        return <StatusBadge status="normal" label="Protected" size="sm" />;
      case 'vulnerable':
        return <StatusBadge status="critical" label="Vulnerable" size="sm" />;
      case 'monitoring':
        return <StatusBadge status="warning" label="Monitoring" size="sm" />;
      default:
        return <StatusBadge status="info" label={status} size="sm" />;
    }
  };
  
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center mb-8">
          <Lock className="w-8 h-8 text-cyber-blue-accent mr-3" />
          <h1 className="text-3xl font-semibold cyber-gradient-text">
            Zero Trust Security
          </h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <SecurityPanel className="glass-panel md:col-span-1" title="Security Posture">
            <div className="space-y-4 py-2">
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 mb-2">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-3xl font-bold cyber-gradient-text">{protectionScore}</div>
                    <div className="text-lg font-bold cyber-gradient-text">%</div>
                  </div>
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle 
                      cx="50" cy="50" r="45" 
                      fill="none" 
                      stroke="#1E293B" 
                      strokeWidth="8"
                    />
                    <circle 
                      cx="50" cy="50" r="45" 
                      fill="none" 
                      stroke="#3B82F6" 
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray="283"
                      strokeDashoffset={283 - (283 * protectionScore) / 100}
                      transform="rotate(-90 50 50)"
                      className="animate-pulse-opacity"
                    />
                  </svg>
                </div>
                <div className="text-sm text-gray-300">Protection Score</div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 rounded-lg bg-cyber-blue-light/30">
                  <div className="text-xl font-semibold text-cyber-green">{complianceScore}%</div>
                  <div className="text-xs text-gray-400">Compliance</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-cyber-blue-light/30">
                  <div className="text-xl font-semibold text-amber-500">{riskScore}%</div>
                  <div className="text-xs text-gray-400">Risk Score</div>
                </div>
              </div>
              
              <button className="w-full cyber-button py-2 flex items-center justify-center">
                <Shield className="w-4 h-4 mr-2" />
                View Details
              </button>
            </div>
          </SecurityPanel>
          
          <SecurityPanel 
            title="Zero Trust Architecture" 
            className="md:col-span-3"
            headerActions={
              <button 
                onClick={refreshData}
                className="p-1.5 rounded hover:bg-cyber-blue-accent/10 transition-colors"
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 text-gray-400 ${loading ? 'animate-spin' : ''}`} />
              </button>
            }
          >
            <div className="relative min-h-[280px] glass-panel rounded-lg p-6 cyber-scan-effect">
              <div className="absolute inset-0 bg-cyber-blue-light/10 rounded-lg z-0">
                <div className="w-full h-full bg-cyber-grid bg-[length:30px_30px] opacity-30"></div>
              </div>
              
              <div className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="p-3 glass-panel mb-4">
                      <div className="flex items-center mb-2">
                        <UserCheck className="w-5 h-5 text-cyber-blue-accent mr-2" />
                        <h3 className="text-sm font-medium">User Verification</h3>
                      </div>
                      <div className="text-xs text-gray-300">
                        <div className="flex justify-between mb-1">
                          <span>Identity</span>
                          <span className="text-cyber-green">Verified</span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span>MFA</span>
                          <span className="text-cyber-green">Active</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Behavior</span>
                          <span className="text-cyber-green">Normal</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 glass-panel">
                      <div className="flex items-center mb-2">
                        <Laptop className="w-5 h-5 text-cyber-blue-accent mr-2" />
                        <h3 className="text-sm font-medium">Device Trust</h3>
                      </div>
                      <div className="text-xs text-gray-300">
                        <div className="flex justify-between mb-1">
                          <span>Posture</span>
                          <span className="text-cyber-green">Compliant</span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span>Encryption</span>
                          <span className="text-cyber-green">Active</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Patch Status</span>
                          <span className="text-amber-500">Update Required</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-cyber-blue-light border-4 border-cyber-blue-accent/30 flex items-center justify-center relative animate-pulse-opacity">
                      <Lock className="w-10 h-10 text-cyber-blue-accent" />
                      <div className="absolute w-full h-full rounded-full border-2 border-cyber-blue-accent/20 animate-rotate-slow"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="p-3 glass-panel mb-4">
                      <div className="flex items-center mb-2">
                        <Server className="w-5 h-5 text-cyber-blue-accent mr-2" />
                        <h3 className="text-sm font-medium">Resource Access</h3>
                      </div>
                      <div className="text-xs text-gray-300">
                        <div className="flex justify-between mb-1">
                          <span>Databases</span>
                          <span className="text-cyber-green">Secure</span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span>Applications</span>
                          <span className="text-cyber-green">Secure</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Data</span>
                          <span className="text-cyber-green">Encrypted</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 glass-panel">
                      <div className="flex items-center mb-2">
                        <NetworkIcon className="w-5 h-5 text-cyber-blue-accent mr-2" />
                        <h3 className="text-sm font-medium">Network Security</h3>
                      </div>
                      <div className="text-xs text-gray-300">
                        <div className="flex justify-between mb-1">
                          <span>Segmentation</span>
                          <span className="text-cyber-green">Active</span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span>Encryption</span>
                          <span className="text-cyber-green">TLS 1.3</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Monitoring</span>
                          <span className="text-cyber-green">Real-time</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap justify-center mt-6 gap-3 text-xs">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-cyber-green rounded-full mr-1"></span>
                    <span className="text-gray-300">Secure Connection</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mr-1"></span>
                    <span className="text-gray-300">Conditional Access</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-cyber-red rounded-full mr-1"></span>
                    <span className="text-gray-300">Blocked Access</span>
                  </div>
                </div>
              </div>
            </div>
          </SecurityPanel>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <SecurityPanel 
            title="Access Requests" 
            className="mb-6 md:mb-0"
          >
            <div className="space-y-3">
              {requests.map((request) => (
                <div key={request.id} className="p-3 glass-panel animate-fade-in">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium text-sm">{request.user}</div>
                      <div className="text-xs text-gray-400">{request.resource}</div>
                    </div>
                    {request.status === 'granted' && (
                      <StatusBadge status="normal" label="Granted" size="sm" />
                    )}
                    {request.status === 'denied' && (
                      <StatusBadge status="critical" label="Denied" size="sm" />
                    )}
                    {request.status === 'pending' && (
                      <StatusBadge status="warning" label="Pending" size="sm" />
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div className="text-xs">
                      <span className="text-gray-400">Risk Score: </span>
                      <span className={request.risk > 50 ? 'text-cyber-red' : 'text-cyber-green'}>
                        {request.risk}%
                      </span>
                    </div>
                    <div className="text-xs">
                      <span className="text-gray-400">Device Trust: </span>
                      <span className={request.deviceTrust < 70 ? 'text-amber-500' : 'text-cyber-green'}>
                        {request.deviceTrust}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-300">{request.detail}</div>
                  
                  <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
                    <span>{formatTime(request.timestamp)}</span>
                    <button className="text-cyber-blue-highlight hover:text-cyber-blue-accent transition-colors">
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </SecurityPanel>
          
          <SecurityPanel title="Protected Assets">
            <div className="grid grid-cols-1 gap-3">
              {zeroTrustAssets.map((asset) => (
                <div 
                  key={asset.id} 
                  className={`p-3 glass-panel cursor-pointer hover:bg-cyber-blue-light/20 transition-colors ${
                    selectedAsset?.id === asset.id ? 'ring-1 ring-cyber-blue-accent' : ''
                  }`}
                  onClick={() => setSelectedAsset(asset === selectedAsset ? null : asset)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      {getAssetTypeIcon(asset.type)}
                      <span className="ml-2 font-medium text-sm">{asset.name}</span>
                    </div>
                    {getAssetStatusBadge(asset.status)}
                  </div>
                  
                  {selectedAsset?.id === asset.id && (
                    <div className="mt-3 pt-3 border-t border-cyber-blue-accent/20 animate-fade-in">
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                        <div>
                          <span className="text-gray-400">Type: </span>
                          <span className="text-white capitalize">{asset.type}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Access: </span>
                          <span className="text-white">{asset.accessLevel}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-gray-400">Last Verified: </span>
                          <span className="text-white">{new Date(asset.lastVerified).toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex gap-2">
                        <button className="text-xs cyber-button py-1 px-2 flex items-center">
                          <Shield className="w-3 h-3 mr-1" />
                          Access Policies
                        </button>
                        <button className="text-xs cyber-button py-1 px-2 flex items-center">
                          <EyeOff className="w-3 h-3 mr-1" />
                          Audit Log
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </SecurityPanel>
        </div>
        
        <div className="glass-panel p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 cyber-gradient-text">
            Core Zero Trust Principles
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel p-4">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-cyber-blue-light flex items-center justify-center mr-3 ring-1 ring-cyber-blue-accent/30">
                  <Lock className="w-5 h-5 text-cyber-blue-accent" />
                </div>
                <h3 className="text-base font-medium">Verify Explicitly</h3>
              </div>
              <p className="text-sm text-gray-300">
                Always authenticate and authorize based on all available data points, including user identity, location, device health, service or workload, data classification, and anomalies.
              </p>
            </div>
            
            <div className="glass-panel p-4">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-cyber-blue-light flex items-center justify-center mr-3 ring-1 ring-cyber-blue-accent/30">
                  <Zap className="w-5 h-5 text-cyber-blue-accent" />
                </div>
                <h3 className="text-base font-medium">Least Privilege Access</h3>
              </div>
              <p className="text-sm text-gray-300">
                Limit user access with just-in-time and just-enough-access, risk-based adaptive policies, and data protection to help secure both data and productivity.
              </p>
            </div>
            
            <div className="glass-panel p-4">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-cyber-blue-light flex items-center justify-center mr-3 ring-1 ring-cyber-blue-accent/30">
                  <AlertTriangle className="w-5 h-5 text-cyber-blue-accent" />
                </div>
                <h3 className="text-base font-medium">Assume Breach</h3>
              </div>
              <p className="text-sm text-gray-300">
                Minimize blast radius for breaches and prevent lateral movement by segmenting access, verifying end-to-end encryption, and using analytics to drive threat detection.
              </p>
            </div>
          </div>
          
          <div className="mt-6 p-4 border border-cyber-blue-accent/20 bg-cyber-blue-light/30 rounded-lg">
            <div className="flex items-start">
              <CloudIcon className="w-5 h-5 text-cyber-blue-accent flex-shrink-0 mt-0.5 mr-3" />
              <div>
                <h4 className="text-sm font-medium mb-1">AI-Powered Continuous Verification</h4>
                <p className="text-sm text-gray-300">
                  The AI-CSF system continuously analyzes user behavior, device health, and network conditions to dynamically adjust access privileges in real-time. This adaptive security model ensures that even authorized users are continuously validated based on their risk profile.
                </p>
                <div className="mt-3">
                  <a 
                    href="#" 
                    className="text-xs flex items-center text-cyber-blue-highlight hover:text-cyber-blue-accent transition-colors"
                  >
                    <span>Learn more about AI-Driven Zero Trust</span>
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ZeroTrust;
