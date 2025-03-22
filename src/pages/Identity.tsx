
import React, { useState } from 'react';
import { 
  FileDigit, 
  Shield, 
  Key, 
  Fingerprint, 
  RefreshCw, 
  Search, 
  Eye, 
  PlusCircle,
  Database,
  Lock,
  CheckCircle,
  Scan
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import SecurityPanel from '@/components/SecurityPanel';
import BlockchainVerification from '@/components/BlockchainVerification';
import { blockchainIdentities } from '@/utils/mockData';
import StatusBadge from '@/components/StatusBadge';

const Identity = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  
  const filteredIdentities = blockchainIdentities.filter(identity => {
    let matchesSearch = true;
    let matchesStatus = true;
    
    if (searchQuery) {
      matchesSearch = identity.username.toLowerCase().includes(searchQuery.toLowerCase());
    }
    
    if (selectedStatus !== 'all') {
      matchesStatus = identity.status === selectedStatus;
    }
    
    return matchesSearch && matchesStatus;
  });
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center mb-8">
          <FileDigit className="w-8 h-8 text-cyber-blue-accent mr-3" />
          <h1 className="text-3xl font-semibold cyber-gradient-text">
            Blockchain Identity
          </h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <SecurityPanel className="glass-panel" title="Identity Status">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center p-4 rounded-lg bg-cyber-blue-light/30">
                <div className="w-12 h-12 rounded-full bg-cyber-blue-light flex items-center justify-center mr-4 ring-1 ring-cyber-blue-accent/30">
                  <Key className="w-6 h-6 text-cyber-blue-accent" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-white mb-1">Identity Gateway</div>
                  <StatusBadge status="normal" label="Online" size="sm" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 rounded-lg bg-cyber-blue-light/30">
                  <div className="text-2xl font-semibold cyber-gradient-text">5</div>
                  <div className="text-xs text-gray-400">Total Users</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-cyber-blue-light/30">
                  <div className="text-2xl font-semibold text-cyber-green">4</div>
                  <div className="text-xs text-gray-400">Verified</div>
                </div>
              </div>
              
              <div className="p-3 glass-panel">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-300">Last Verification</span>
                  <span className="text-xs text-gray-400">13 minutes ago</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Next Verification</span>
                  <span className="text-xs text-gray-400">47 minutes</span>
                </div>
              </div>
            </div>
          </SecurityPanel>
          
          <SecurityPanel className="md:col-span-2" title="Blockchain Security">
            <div className="p-4 mb-4 glass-panel border border-cyber-blue-accent/30">
              <div className="flex items-center mb-3">
                <Database className="w-5 h-5 text-cyber-blue-accent mr-3" />
                <h3 className="text-base font-medium text-white">Decentralized Identity Network</h3>
              </div>
              <p className="text-sm text-gray-300 mb-3">
                Identity verification is secured through a decentralized blockchain network, eliminating single points of failure and ensuring immutable identity records.
              </p>
              <div className="grid grid-cols-3 gap-3 text-center text-xs">
                <div className="p-2 bg-cyber-blue-light/50 rounded">
                  <div className="text-lg font-medium text-cyber-blue-highlight mb-1">128</div>
                  <div className="text-gray-400">Active Nodes</div>
                </div>
                <div className="p-2 bg-cyber-blue-light/50 rounded">
                  <div className="text-lg font-medium text-cyber-blue-highlight mb-1">99.98%</div>
                  <div className="text-gray-400">Uptime</div>
                </div>
                <div className="p-2 bg-cyber-blue-light/50 rounded">
                  <div className="text-lg font-medium text-cyber-blue-highlight mb-1">1.2s</div>
                  <div className="text-gray-400">Verify Time</div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="p-4 glass-panel flex-1 animate-fade-in">
                <div className="flex items-center mb-3">
                  <Lock className="w-5 h-5 text-cyber-green mr-3" />
                  <h3 className="text-base font-medium text-white">Zero Knowledge Proofs</h3>
                </div>
                <p className="text-sm text-gray-300">
                  Verify identity without exposing sensitive data using zero-knowledge cryptography
                </p>
              </div>
              <div className="p-4 glass-panel flex-1 animate-fade-in" style={{ animationDelay: '100ms' }}>
                <div className="flex items-center mb-3">
                  <CheckCircle className="w-5 h-5 text-cyber-green mr-3" />
                  <h3 className="text-base font-medium text-white">Tamper-Proof Records</h3>
                </div>
                <p className="text-sm text-gray-300">
                  Cryptographically secured identity records that cannot be altered
                </p>
              </div>
              <div className="p-4 glass-panel flex-1 animate-fade-in" style={{ animationDelay: '200ms' }}>
                <div className="flex items-center mb-3">
                  <Scan className="w-5 h-5 text-cyber-green mr-3" />
                  <h3 className="text-base font-medium text-white">Biometric Binding</h3>
                </div>
                <p className="text-sm text-gray-300">
                  Secure binding of biometric signatures to blockchain identities
                </p>
              </div>
            </div>
          </SecurityPanel>
        </div>
        
        <SecurityPanel 
          title="Blockchain Identities" 
          className="mb-8"
          headerActions={
            <div className="flex space-x-2">
              <button className="p-1.5 rounded hover:bg-cyber-blue-accent/10 transition-colors">
                <RefreshCw className="w-4 h-4 text-gray-400" />
              </button>
              <button className="p-1.5 rounded hover:bg-cyber-blue-accent/10 transition-colors">
                <PlusCircle className="w-4 h-4 text-gray-400" />
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
                placeholder="Search identities..."
                className="w-full pl-10 pr-4 py-2 bg-cyber-blue-light/50 border border-cyber-blue-accent/20 rounded-md focus:outline-none focus:ring-1 focus:ring-cyber-blue-accent text-white text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center">
              <select
                className="px-4 py-2 appearance-none bg-cyber-blue-light/50 border border-cyber-blue-accent/20 rounded-md focus:outline-none focus:ring-1 focus:ring-cyber-blue-accent text-white text-sm"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="verified">Verified</option>
                <option value="pending">Pending</option>
                <option value="revoked">Revoked</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredIdentities.map((identity, index) => (
              <BlockchainVerification 
                key={identity.id} 
                identity={identity} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              />
            ))}
          </div>
        </SecurityPanel>
        
        <div className="glass-panel p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 cyber-gradient-text">
            Passwordless Authentication
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <div className="glass-panel p-4 h-full flex flex-col items-center text-center">
                <Fingerprint className="w-12 h-12 text-cyber-blue-accent mb-3" />
                <h3 className="text-lg font-medium mb-2">Biometric Access</h3>
                <p className="text-sm text-gray-300">
                  Secure access using facial recognition and fingerprint verification
                </p>
              </div>
            </div>
            
            <div className="md:col-span-3">
              <div className="glass-panel p-4 h-full cyber-scan-effect">
                <h3 className="text-lg font-medium mb-3">Identity Verification Protocol</h3>
                <div className="font-mono text-xs text-cyber-blue-highlight bg-cyber-blue-light/70 p-3 rounded mb-3 overflow-auto max-h-32">
                  <p className="opacity-80">
                    &gt; initiating verification sequence...<br />
                    &gt; connecting to blockchain network...<br />
                    &gt; nodes responding: 128/128<br />
                    &gt; generating zero-knowledge proof...<br />
                    &gt; cryptographic challenge issued...<br />
                    &gt; signature verified successfully<br />
                    &gt; biometric factors matched: 2/2<br />
                    &gt; behavioral analysis: consistent<br />
                    &gt; verification complete: identity confirmed
                  </p>
                </div>
                <p className="text-sm text-gray-300">
                  The AI-CSF system utilizes a multi-factor, zero-knowledge verification protocol to confirm identities without exposing sensitive information. This creates a secure, immutable record of verification while maintaining user privacy.
                </p>
                <div className="mt-3 flex justify-end">
                  <button className="cyber-button py-1 px-3 text-sm flex items-center">
                    <Eye className="w-3 h-3 mr-1" />
                    View Protocol Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Identity;
