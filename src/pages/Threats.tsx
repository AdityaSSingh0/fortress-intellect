
import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Filter, 
  Search, 
  RefreshCw, 
  Clock, 
  AlertOctagon, 
  FileBarChart,
  Info,
  Download,
  Map
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import SecurityPanel from '@/components/SecurityPanel';
import ThreatCard from '@/components/ThreatCard';
import SecurityGraph from '@/components/SecurityGraph';
import { recentThreats, threatDistribution, generateRandomThreat } from '@/utils/mockData';
import { useCounterAnimation } from '@/utils/animations';
import StatusBadge from '@/components/StatusBadge';

const threatTypes = [
  { name: 'All Types', value: 'all' },
  { name: 'Malware', value: 'malware' },
  { name: 'Phishing', value: 'phishing' },
  { name: 'DDoS', value: 'ddos' },
  { name: 'Zero-day', value: 'zero-day' },
  { name: 'Ransomware', value: 'ransomware' }
];

const threatLevels = [
  { name: 'All Levels', value: 'all' },
  { name: 'Low', value: 'low' },
  { name: 'Medium', value: 'medium' },
  { name: 'High', value: 'high' },
  { name: 'Critical', value: 'critical' }
];

const threatStatus = [
  { name: 'All Status', value: 'all' },
  { name: 'Detected', value: 'detected' },
  { name: 'Analyzing', value: 'analyzing' },
  { name: 'Mitigating', value: 'mitigating' },
  { name: 'Resolved', value: 'resolved' }
];

const Threats = () => {
  const [threats, setThreats] = useState(recentThreats);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  
  const { count: detectedCount } = useCounterAnimation(128);
  const { count: mitigatedCount } = useCounterAnimation(117);
  const { count: activeCount } = useCounterAnimation(11);
  
  useEffect(() => {
    // Simulate new threats coming in periodically
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newThreat = generateRandomThreat();
        setThreats(prev => [newThreat, ...prev].slice(0, 12));
      }
    }, 15000);
    
    return () => clearInterval(interval);
  }, []);
  
  const refreshThreats = () => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      const newThreats = [...threats];
      // Add 1-3 new threats at the top
      const numNewThreats = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < numNewThreats; i++) {
        newThreats.unshift(generateRandomThreat());
      }
      setThreats(newThreats.slice(0, 12));
      setIsLoading(false);
    }, 1000);
  };
  
  const filteredThreats = threats.filter(threat => {
    let matchesSearch = true;
    let matchesType = true;
    let matchesLevel = true;
    let matchesStatus = true;
    
    if (searchQuery) {
      matchesSearch = 
        threat.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        threat.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (threat.ip && threat.ip.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    
    if (selectedType !== 'all') {
      matchesType = threat.type.toLowerCase().includes(selectedType.toLowerCase());
    }
    
    if (selectedLevel !== 'all') {
      matchesLevel = threat.level === selectedLevel;
    }
    
    if (selectedStatus !== 'all') {
      matchesStatus = threat.status === selectedStatus;
    }
    
    return matchesSearch && matchesType && matchesLevel && matchesStatus;
  });
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center mb-8">
          <ShieldAlert className="w-8 h-8 text-cyber-blue-accent mr-3" />
          <h1 className="text-3xl font-semibold cyber-gradient-text">
            Threat Management
          </h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <SecurityPanel className="glass-panel" title="Threats Summary">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 rounded-lg bg-cyber-blue-light/30">
                <div className="text-2xl font-semibold cyber-gradient-text mb-1">{detectedCount}</div>
                <div className="text-xs text-gray-400">Detected</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-cyber-blue-light/30">
                <div className="text-2xl font-semibold text-cyber-green mb-1">{mitigatedCount}</div>
                <div className="text-xs text-gray-400">Mitigated</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-cyber-blue-light/30">
                <div className="text-2xl font-semibold text-cyber-red mb-1">{activeCount}</div>
                <div className="text-xs text-gray-400">Active</div>
              </div>
            </div>
            <div className="mt-4">
              <div className="p-3 glass-panel">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-300">Response Rate</span>
                  <span className="text-sm font-medium text-cyber-green">91.4%</span>
                </div>
                <div className="w-full bg-cyber-blue-light/50 rounded-full h-1.5">
                  <div className="bg-cyber-green h-1.5 rounded-full" style={{ width: '91.4%' }}></div>
                </div>
              </div>
              <div className="mt-3 text-center">
                <button className="w-full cyber-button py-1 flex items-center justify-center">
                  <FileBarChart className="w-4 h-4 mr-2" />
                  <span>Detailed Report</span>
                </button>
              </div>
            </div>
          </SecurityPanel>
          
          <SecurityPanel className="md:col-span-2" title="Threat Distribution">
            <div className="h-60">
              <SecurityGraph 
                data={threatDistribution}
                type="bar"
                xKey="name"
                yKey="value"
                height={240}
                showGrid
                title="Distribution by Category"
              />
            </div>
          </SecurityPanel>
        </div>
        
        <SecurityPanel 
          title="Active Threats" 
          className="mb-8"
          headerActions={
            <div className="flex space-x-2">
              <button 
                onClick={refreshThreats}
                className="p-1.5 rounded hover:bg-cyber-blue-accent/10 transition-colors"
                disabled={isLoading}
              >
                <RefreshCw className={`w-4 h-4 text-gray-400 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
              <button className="p-1.5 rounded hover:bg-cyber-blue-accent/10 transition-colors">
                <Download className="w-4 h-4 text-gray-400" />
              </button>
              <button className="p-1.5 rounded hover:bg-cyber-blue-accent/10 transition-colors">
                <Map className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          }
        >
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search threats..."
                className="w-full pl-10 pr-4 py-2 bg-cyber-blue-light/50 border border-cyber-blue-accent/20 rounded-md focus:outline-none focus:ring-1 focus:ring-cyber-blue-accent text-white text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap md:flex-nowrap gap-2">
              <div className="relative flex items-center">
                <Filter className="w-4 h-4 text-gray-400 absolute left-3" />
                <select
                  className="pl-9 pr-8 py-2 appearance-none bg-cyber-blue-light/50 border border-cyber-blue-accent/20 rounded-md focus:outline-none focus:ring-1 focus:ring-cyber-blue-accent text-white text-sm"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  {threatTypes.map((type) => (
                    <option key={type.value} value={type.value}>{type.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="relative">
                <select
                  className="px-4 py-2 appearance-none bg-cyber-blue-light/50 border border-cyber-blue-accent/20 rounded-md focus:outline-none focus:ring-1 focus:ring-cyber-blue-accent text-white text-sm"
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                >
                  {threatLevels.map((level) => (
                    <option key={level.value} value={level.value}>{level.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="relative">
                <select
                  className="px-4 py-2 appearance-none bg-cyber-blue-light/50 border border-cyber-blue-accent/20 rounded-md focus:outline-none focus:ring-1 focus:ring-cyber-blue-accent text-white text-sm"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  {threatStatus.map((status) => (
                    <option key={status.value} value={status.value}>{status.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {filteredThreats.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredThreats.map((threat, index) => (
                <ThreatCard 
                  key={threat.id} 
                  threat={threat} 
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <Info className="w-10 h-10 text-gray-500 mx-auto mb-3" />
              <p className="text-gray-400">No threats match your filter criteria</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedType('all');
                  setSelectedLevel('all');
                  setSelectedStatus('all');
                }}
                className="mt-3 cyber-button py-1 px-3"
              >
                Reset Filters
              </button>
            </div>
          )}
        </SecurityPanel>
        
        <div className="glass-panel p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 cyber-gradient-text">
            AI Threat Response Status
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel p-4 flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-cyber-blue-light flex items-center justify-center">
                <ShieldAlert className="w-6 h-6 text-cyber-blue-accent" />
              </div>
              <div>
                <h3 className="text-sm font-medium mb-1">Threat Detection</h3>
                <StatusBadge status="normal" label="Active" size="sm" />
              </div>
            </div>
            
            <div className="glass-panel p-4 flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-cyber-blue-light flex items-center justify-center">
                <AlertOctagon className="w-6 h-6 text-cyber-blue-accent" />
              </div>
              <div>
                <h3 className="text-sm font-medium mb-1">Anomaly Detection</h3>
                <StatusBadge status="normal" label="Active" size="sm" />
              </div>
            </div>
            
            <div className="glass-panel p-4 flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-cyber-blue-light flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h3 className="text-sm font-medium mb-1">Threat Intelligence</h3>
                <StatusBadge status="warning" label="Updating" size="sm" />
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 border border-cyber-blue-accent/20 bg-cyber-blue-light/30 rounded-lg">
            <div className="flex items-start">
              <Info className="w-5 h-5 text-cyber-blue-accent flex-shrink-0 mt-0.5 mr-3" />
              <p className="text-sm text-gray-300">
                The AI-CSF system is currently monitoring all network traffic and endpoint activities. 
                Threat intelligence feeds are being updated with the latest global security data. 
                Enhanced monitoring is in place for critical infrastructure.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Threats;
