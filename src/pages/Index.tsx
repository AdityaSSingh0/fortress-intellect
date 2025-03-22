
import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Shield, 
  Activity, 
  AlertTriangle, 
  FileBarChart, 
  Eye, 
  Search,
  ArrowRight,
  ArrowUpRight,
  RefreshCw,
  Cpu,
  Network,
  Smartphone,
  FileDigit
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import SecurityPanel from '@/components/SecurityPanel';
import StatusBadge from '@/components/StatusBadge';
import ThreatCard from '@/components/ThreatCard';
import ActivityLog from '@/components/ActivityLog';
import SecurityGraph from '@/components/SecurityGraph';
import { 
  systemStatus, 
  recentThreats, 
  activityLog, 
  securityMetrics,
  aiDetectionEvents,
  threatDistribution,
  generateRandomThreat
} from '@/utils/mockData';
import { useCounterAnimation, useTypewriterEffect } from '@/utils/animations';

const Dashboard = () => {
  const navigate = useNavigate();
  const [threats, setThreats] = useState(recentThreats);
  const { count: detectionRate } = useCounterAnimation(99.4);
  const { count: responseTime } = useCounterAnimation(4.3);
  const { displayText } = useTypewriterEffect('AI-CSF System ready. Protecting network perimeter.', 30);
  
  // Simulate new threats coming in
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newThreat = generateRandomThreat();
        setThreats(prev => [newThreat, ...prev.slice(0, 4)]);
      }
    }, 20000);
    
    return () => clearInterval(interval);
  }, []);
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal':
        return <ShieldCheck className="w-5 h-5 text-cyber-green" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'critical':
        return <Shield className="w-5 h-5 text-cyber-red" />;
      default:
        return <Activity className="w-5 h-5 text-gray-400" />;
    }
  };
  
  const getTrendIcon = (trend: string) => {
    if (trend === 'up') {
      return <ArrowUpRight className="w-4 h-4 text-cyber-green" />;
    }
    return <ArrowRight className="w-4 h-4 text-cyber-blue-accent" />;
  };
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-2 cyber-gradient-text">
            AI-Driven Cyber Security Fortress
          </h1>
          <div className="flex items-center">
            <StatusBadge 
              status={systemStatus.overall} 
              label={`System ${systemStatus.overall}`} 
              size="lg" 
            />
            <div className="ml-4 font-mono text-sm text-cyber-blue-highlight">
              {displayText}
              <span className="animate-pulse">_</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <SecurityPanel 
            title="System Status" 
            className="md:col-span-1"
            headerActions={
              <button className="p-1 rounded hover:bg-cyber-blue-accent/10 transition-colors">
                <RefreshCw className="w-4 h-4 text-gray-400" />
              </button>
            }
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 glass-panel">
                <div className="flex items-center">
                  <Cpu className="w-5 h-5 text-cyber-blue-accent mr-3" />
                  <span className="text-sm">AI Core</span>
                </div>
                <StatusBadge status={systemStatus.ai} size="sm" />
              </div>
              
              <div className="flex items-center justify-between p-3 glass-panel">
                <div className="flex items-center">
                  <Network className="w-5 h-5 text-cyber-blue-accent mr-3" />
                  <span className="text-sm">Network</span>
                </div>
                <StatusBadge status={systemStatus.network} size="sm" />
              </div>
              
              <div className="flex items-center justify-between p-3 glass-panel">
                <div className="flex items-center">
                  <Smartphone className="w-5 h-5 text-cyber-blue-accent mr-3" />
                  <span className="text-sm">Endpoints</span>
                </div>
                <StatusBadge status={systemStatus.endpoints} size="sm" />
              </div>
              
              <div className="flex items-center justify-between p-3 glass-panel">
                <div className="flex items-center">
                  <FileDigit className="w-5 h-5 text-cyber-blue-accent mr-3" />
                  <span className="text-sm">Identity</span>
                </div>
                <StatusBadge status={systemStatus.identity} size="sm" />
              </div>
            </div>
          </SecurityPanel>
          
          <SecurityPanel 
            title="Threat Distribution" 
            className="md:col-span-2"
          >
            <div className="h-64">
              <SecurityGraph 
                data={threatDistribution}
                type="pie"
                xKey="name"
                yKey="value"
                height={250}
                hideLegend={false}
              />
            </div>
          </SecurityPanel>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <SecurityPanel 
            title="Recent Threats" 
            className="md:col-span-2"
            headerActions={
              <button 
                onClick={() => navigate('/threats')}
                className="text-xs cyber-button py-1 px-2 flex items-center"
              >
                <Eye className="w-3 h-3 mr-1" />
                View All
              </button>
            }
          >
            <div className="space-y-4">
              {threats.slice(0, 3).map((threat) => (
                <ThreatCard key={threat.id} threat={threat} className="cyber-scan-effect" />
              ))}
            </div>
          </SecurityPanel>
          
          <SecurityPanel 
            title="Activity Log" 
            className="md:col-span-1"
            headerActions={
              <button className="p-1 rounded hover:bg-cyber-blue-accent/10 transition-colors">
                <Search className="w-4 h-4 text-gray-400" />
              </button>
            }
          >
            <ActivityLog activities={activityLog} maxItems={5} />
          </SecurityPanel>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <SecurityPanel 
            title="AI Detection Trends" 
            className="md:col-span-2"
          >
            <div className="h-64">
              <SecurityGraph 
                data={aiDetectionEvents}
                type="area"
                xKey="day"
                yKey="count"
                height={250}
                title="Detection Events (7-day trend)"
                showGrid
              />
            </div>
          </SecurityPanel>
          
          <SecurityPanel 
            title="Security Metrics" 
            className="md:col-span-1"
          >
            <div className="space-y-3">
              {securityMetrics.map((metric, index) => (
                <div 
                  key={index} 
                  className="p-3 glass-panel animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">{metric.name}</span>
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(metric.trend)}
                      <span className={`text-base font-medium ${
                        metric.trend === 'up' ? 'text-cyber-green' : 
                        metric.trend === 'down' ? 'text-cyber-blue-highlight' : 
                        'text-gray-400'
                      }`}>
                        {metric.value}{metric.unit}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SecurityPanel>
        </div>
        
        <div className="glass-panel p-6 text-center mb-8 mt-12">
          <h2 className="text-2xl font-semibold mb-4 cyber-gradient-text">
            Transforming Cybersecurity with AI
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto mb-6">
            AI-CSF delivers proactive protection by analyzing behaviors, identifying anomalies, and automatically responding to threats before they can impact your business.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="p-4 glass-panel">
              <div className="w-12 h-12 rounded-full bg-cyber-blue-light mx-auto mb-4 flex items-center justify-center ring-1 ring-cyber-blue-accent/30">
                <Shield className="w-6 h-6 text-cyber-blue-accent" />
              </div>
              <h3 className="text-lg font-medium mb-2 text-white">AI-Powered Protection</h3>
              <p className="text-gray-400 text-sm">
                Advanced machine learning models detect and respond to evolving threats automatically.
              </p>
            </div>
            <div className="p-4 glass-panel">
              <div className="w-12 h-12 rounded-full bg-cyber-blue-light mx-auto mb-4 flex items-center justify-center ring-1 ring-cyber-blue-accent/30">
                <FileDigit className="w-6 h-6 text-cyber-blue-accent" />
              </div>
              <h3 className="text-lg font-medium mb-2 text-white">Blockchain Identity</h3>
              <p className="text-gray-400 text-sm">
                Secure identity verification using decentralized blockchain technology.
              </p>
            </div>
            <div className="p-4 glass-panel">
              <div className="w-12 h-12 rounded-full bg-cyber-blue-light mx-auto mb-4 flex items-center justify-center ring-1 ring-cyber-blue-accent/30">
                <FileBarChart className="w-6 h-6 text-cyber-blue-accent" />
              </div>
              <h3 className="text-lg font-medium mb-2 text-white">Threat Intelligence</h3>
              <p className="text-gray-400 text-sm">
                Real-time analysis and correlation of global threat data to predict attacks.
              </p>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex justify-center space-x-4">
              <button 
                onClick={() => navigate('/threats')}
                className="cyber-button bg-cyber-blue-accent/20 border-cyber-blue-accent/40 px-6"
              >
                Explore Threats
              </button>
              <button 
                onClick={() => navigate('/identity')}
                className="cyber-button px-6"
              >
                Blockchain Identity
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
