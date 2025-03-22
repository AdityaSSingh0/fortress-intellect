
export type ThreatLevel = 'low' | 'medium' | 'high' | 'critical';

export interface Threat {
  id: string;
  timestamp: string;
  name: string;
  source: string;
  type: string;
  level: ThreatLevel;
  status: 'detected' | 'analyzing' | 'mitigating' | 'resolved';
  details: string;
  ip?: string;
}

export interface SystemStatus {
  overall: 'normal' | 'warning' | 'critical';
  ai: 'normal' | 'warning' | 'critical';
  network: 'normal' | 'warning' | 'critical';
  endpoints: 'normal' | 'warning' | 'critical';
  identity: 'normal' | 'warning' | 'critical';
}

export interface ActivityEntry {
  id: string;
  timestamp: string;
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
  source: string;
}

export interface SecurityMetric {
  name: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  unit?: string;
}

export interface BlockchainIdentity {
  id: string;
  username: string;
  publicKey: string;
  status: 'verified' | 'pending' | 'revoked';
  lastVerified: string;
  trustScore: number;
}

// System Status
export const systemStatus: SystemStatus = {
  overall: 'normal',
  ai: 'normal',
  network: 'normal',
  endpoints: 'warning',
  identity: 'normal',
};

// Recent Threats
export const recentThreats: Threat[] = [
  {
    id: 'threat-001',
    timestamp: new Date(Date.now() - 13 * 60000).toISOString(),
    name: 'Suspicious Authentication Pattern',
    source: 'Authentication Service',
    type: 'Potential Credential Stuffing',
    level: 'medium',
    status: 'mitigating',
    details: 'Multiple failed login attempts from different locations',
    ip: '192.168.1.54'
  },
  {
    id: 'threat-002',
    timestamp: new Date(Date.now() - 47 * 60000).toISOString(),
    name: 'Anomalous Data Transfer',
    source: 'Network Sensor',
    type: 'Data Exfiltration',
    level: 'high',
    status: 'analyzing',
    details: 'Unusual outbound data transfer to unknown external domain',
    ip: '203.0.113.100'
  },
  {
    id: 'threat-003',
    timestamp: new Date(Date.now() - 126 * 60000).toISOString(),
    name: 'Behavioral Anomaly',
    source: 'User Behavior Analytics',
    type: 'Insider Threat',
    level: 'medium',
    status: 'detected',
    details: 'User accessing resources outside normal pattern',
  },
  {
    id: 'threat-004',
    timestamp: new Date(Date.now() - 240 * 60000).toISOString(),
    name: 'Malware Signature Detected',
    source: 'Endpoint Protection',
    type: 'Trojan',
    level: 'critical',
    status: 'mitigating',
    details: 'Potential remote access trojan detected on workstation',
    ip: '10.0.0.23'
  },
  {
    id: 'threat-005',
    timestamp: new Date(Date.now() - 360 * 60000).toISOString(),
    name: 'Port Scanning Activity',
    source: 'Network IDS',
    type: 'Reconnaissance',
    level: 'low',
    status: 'resolved',
    details: 'Sequential port scanning from external IP',
    ip: '198.51.100.75'
  }
];

// Activity Log
export const activityLog: ActivityEntry[] = [
  {
    id: 'act-001',
    timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
    type: 'info',
    message: 'AI model updated with latest threat intelligence data',
    source: 'Threat Intelligence Module'
  },
  {
    id: 'act-002',
    timestamp: new Date(Date.now() - 17 * 60000).toISOString(),
    type: 'warning',
    message: 'Unusual login attempt blocked for user admin@example.com',
    source: 'Authentication Service'
  },
  {
    id: 'act-003',
    timestamp: new Date(Date.now() - 38 * 60000).toISOString(),
    type: 'success',
    message: 'Zero-day vulnerability patch automatically deployed',
    source: 'Patch Management'
  },
  {
    id: 'act-004',
    timestamp: new Date(Date.now() - 94 * 60000).toISOString(),
    type: 'info',
    message: 'Blockchain identity verification performed for 12 users',
    source: 'Identity Management'
  },
  {
    id: 'act-005',
    timestamp: new Date(Date.now() - 132 * 60000).toISOString(),
    type: 'error',
    message: 'System resource limit reached on AI analytics node',
    source: 'Resource Monitor'
  },
  {
    id: 'act-006',
    timestamp: new Date(Date.now() - 187 * 60000).toISOString(),
    type: 'success',
    message: 'Network segmentation rules updated based on new threat model',
    source: 'Network Security'
  },
];

// Security Metrics
export const securityMetrics: SecurityMetric[] = [
  {
    name: 'Threat Detection Rate',
    value: 99.4,
    trend: 'up',
    unit: '%'
  },
  {
    name: 'Mean Time to Detect',
    value: 1.7,
    trend: 'down',
    unit: 'min'
  },
  {
    name: 'Mean Time to Respond',
    value: 4.3,
    trend: 'down',
    unit: 'min'
  },
  {
    name: 'AI False Positive Rate',
    value: 0.8,
    trend: 'down',
    unit: '%'
  },
  {
    name: 'Zero Trust Compliance',
    value: 94.2,
    trend: 'up',
    unit: '%'
  },
  {
    name: 'Identity Verification Strength',
    value: 9.7,
    trend: 'up',
    unit: '/10'
  }
];

// Blockchain Identities
export const blockchainIdentities: BlockchainIdentity[] = [
  {
    id: 'bid-001',
    username: 'alice.smith',
    publicKey: '0x3F8e2b75C92f4b48383cf0Ae3c199C4F99E9...',
    status: 'verified',
    lastVerified: new Date(Date.now() - 2 * 60 * 60000).toISOString(),
    trustScore: 98
  },
  {
    id: 'bid-002',
    username: 'bob.johnson',
    publicKey: '0x7D4c6e3A9C81f4b58f37F1E9a2C3B4D5E6F7...',
    status: 'verified',
    lastVerified: new Date(Date.now() - 5 * 60 * 60000).toISOString(),
    trustScore: 95
  },
  {
    id: 'bid-003',
    username: 'charlie.davis',
    publicKey: '0x1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q...',
    status: 'pending',
    lastVerified: new Date(Date.now() - 24 * 60 * 60000).toISOString(),
    trustScore: 85
  },
  {
    id: 'bid-004',
    username: 'dana.miller',
    publicKey: '0x8F7E6D5C4B3A2918F7E6D5C4B3A2918F7E6...',
    status: 'verified',
    lastVerified: new Date(Date.now() - 3 * 60 * 60000).toISOString(),
    trustScore: 97
  },
  {
    id: 'bid-005',
    username: 'evan.white',
    publicKey: '0x2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S...',
    status: 'revoked',
    lastVerified: new Date(Date.now() - 72 * 60 * 60000).toISOString(),
    trustScore: 30
  }
];

// AI Detection Events (for trends)
export const aiDetectionEvents = [
  { day: '2023-09-01', count: 27 },
  { day: '2023-09-02', count: 25 },
  { day: '2023-09-03', count: 32 },
  { day: '2023-09-04', count: 18 },
  { day: '2023-09-05', count: 29 },
  { day: '2023-09-06', count: 41 },
  { day: '2023-09-07', count: 38 }
];

// Threat Distribution
export const threatDistribution = [
  { name: 'Malware', value: 35 },
  { name: 'Phishing', value: 25 },
  { name: 'DDoS', value: 15 },
  { name: 'Insider', value: 10 },
  { name: 'Zero-day', value: 8 },
  { name: 'Other', value: 7 }
];

// Function to generate random threats for demo
export function generateRandomThreat(): Threat {
  const threatTypes = ['Malware', 'Phishing', 'DDoS', 'Insider', 'Zero-day', 'Ransomware'];
  const sources = ['Network Sensor', 'Endpoint Protection', 'User Behavior Analytics', 'Email Gateway', 'Web Proxy'];
  const levels: ThreatLevel[] = ['low', 'medium', 'high', 'critical'];
  const statuses = ['detected', 'analyzing', 'mitigating', 'resolved'];
  
  return {
    id: `threat-${Math.floor(Math.random() * 10000)}`,
    timestamp: new Date().toISOString(),
    name: `${threatTypes[Math.floor(Math.random() * threatTypes.length)]} Attempt`,
    source: sources[Math.floor(Math.random() * sources.length)],
    type: threatTypes[Math.floor(Math.random() * threatTypes.length)],
    level: levels[Math.floor(Math.random() * levels.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)] as any,
    details: 'Generated threat for demonstration purposes',
    ip: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
  };
}
