// ============================
// Centralized Mock / Demo Data
// ============================

export const CITIZEN_PROFILE = {
  name: 'Amelia J. Thorne',
  did: 'did:fc:amelia',
  avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=280',
  avatarThumb: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100&h=100',
  trustLevel: 'L3 Verified',
  biometricsActive: true,
};

export const ORG_PROFILE = {
  name: 'NexaCorp Limited',
  entityId: 'FC-ORG-9941',
  multiSigConfig: '2/3',
  status: 'Active Entity',
};

export const WALLET_ASSETS = [
  { id: 'FCUSD', name: 'Future Citizen Stablecoin', color: 'var(--blue)' },
  { id: 'FCC', name: 'FC Coin', color: 'var(--text-primary)' },
  { id: 'ETH', name: 'Ethereum', color: '#60a5fa' },
  { id: 'BTC', name: 'Bitcoin', color: '#F7931A' },
];

export const WALLET_ADDRESSES = {
  FCUSD: 'did:fc:amelia_thorne_0x7A3b...9F21',
  FCC:   'did:fc:amelia_thorne_0x7A3b...9F21',
  ETH:   '0x7A3b4c9E2d1F8a6B5c0D3e4F9A21',
  BTC:   'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
};

export const INITIAL_TRANSACTIONS = [
  { id: 'tx-1', type: 'receive', title: 'Treasury Yield', subtitle: 'Sovereign Staking Payout', amount: '+42.50', currency: 'FCUSD', date: 'TODAY', category: 'yield', status: 'completed' },
  { id: 'tx-2', type: 'send', title: 'Vanguard Tax Auth', subtitle: 'Automated Deduction', amount: '-240.00', currency: 'FCUSD', date: 'TODAY', category: 'tax', status: 'completed' },
  { id: 'tx-3', type: 'system', title: 'ZKP Verification', subtitle: 'Age & Residency Proof', amount: 'CONFIRMED', currency: '', date: 'YESTERDAY', category: 'auth', status: 'completed' },
  { id: 'tx-4', type: 'swap', title: 'Cross-Chain Swap', subtitle: 'USDT to FCUSD', amount: '+1,500.00', currency: 'FCUSD', date: 'YESTERDAY', category: 'swap', status: 'completed' },
];

export const MARKET_DATA = {
  BTC: { marketCap: '$1.27T', volume24h: '$34.2B', yourValue: '$2,890' },
  ETH: { marketCap: '$253B', volume24h: '$12.8B', yourValue: '$2,495' },
  FCC: { marketCap: '$4.8B', volume24h: '$890M', yourValue: '$49,877' },
  FCUSD: { marketCap: '$100B', volume24h: '$52B', yourValue: '$4,750' },
};

// ============================
// Citizen Mode — Comms Data
// ============================

export const CITIZEN_ALERTS = [
  { id: 'a1', from: 'FD', sender: 'Federal Dept of Taxation', time: '9:41 AM', unread: true, type: 'urgent', title: '2026 Declaration Required', preview: 'Please submit your encrypted annual tax proofs via ZKP to the Federal Revenue Office before April 15, 2026.', actions: ['Review & Submit', 'Remind Later'] },
  { id: 'a2', from: null, sender: 'NexaCorp HR', icon: 'building', time: 'Yesterday', unread: false, type: 'info', title: 'Payroll Deposit Confirmation', preview: 'Your monthly payroll of 12,400 FCUSD has been successfully routed to your sovereign wallet.', actions: ['View Receipt'] },
  { id: 'a3', from: null, sender: 'FC Identity Authority', icon: 'shield', time: '2 days ago', unread: false, type: 'security', title: 'Biometric Template Updated', preview: 'Your FaceID biometric vector has been re-encrypted and stored in your local secure enclave. No data left your device.', actions: ['View Audit Log'] },
  { id: 'a4', from: null, sender: 'Governance DAO', icon: 'vote', time: '3 days ago', unread: false, type: 'governance', title: 'Proposal #127 Passed', preview: 'Infrastructure Upgrade Fund allocation of 2.5M FCUSD approved with 89.2% quorum. Your vote: IN FAVOR.', actions: ['View Results'] },
  { id: 'a5', from: null, sender: 'FC Network', icon: 'activity', time: '5 days ago', unread: false, type: 'system', title: 'Scheduled Maintenance Complete', preview: 'Sovereign Chain node upgrade v3.2.1 completed. All ZKP circuits are operating at full throughput.', actions: [] },
];

export const CITIZEN_CHAT_CONTACTS = [
  { id: 'c1', name: 'Alexander Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100', status: 'L3 Verified', lastMsg: 'Payment Received', lastMsgType: 'payment', time: '10:42 AM', unread: 1 },
  { id: 'c2', name: 'Sarah Williams', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100', status: 'L2 Verified', lastMsg: "Let's split the dinner bill.", lastMsgType: 'text', time: 'Yesterday', unread: 0 },
  { id: 'c3', name: 'Marcus Rivera', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100', status: 'L3 Verified', lastMsg: 'Sent you 500 FCUSD', lastMsgType: 'payment', time: 'Yesterday', unread: 2 },
  { id: 'c4', name: 'Elena Vasquez', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100', status: 'L1 Verified', lastMsg: 'Can you sign the multi-sig?', lastMsgType: 'text', time: 'Mon', unread: 0 },
];

export const CITIZEN_PORTFOLIO = {
  totalBalance: '$14,482.50',
  totalBalanceRaw: 14482.50,
  change24h: '+$124.50',
  changePct: '+0.87%',
  coldVaultBalance: '$816,622.00',
  coldVaultPct: '92.4%',
};

// ============================
// Citizen Mode — Governance Data
// ============================

export const GOVERNANCE_PROPOSALS = [
  { id: 'prop-131', title: 'Digital Residency Tax Incentive', description: 'Reduce digital resident annual fees from 500 FCUSD to 250 FCUSD for the first 2 years to attract new citizens.', category: 'fiscal', status: 'active', endsIn: '2d 14h', quorum: 72, votesFor: 14820, votesAgainst: 3410, totalVoters: 25000, yourVote: null },
  { id: 'prop-130', title: 'ZKP Circuit Upgrade v4.0', description: 'Upgrade zero-knowledge proof circuits to support batch verification, reducing gas costs by 60%.', category: 'infrastructure', status: 'active', endsIn: '5d 8h', quorum: 58, votesFor: 9200, votesAgainst: 1800, totalVoters: 25000, yourVote: null },
  { id: 'prop-129', title: 'Sovereign Healthcare Fund', description: 'Allocate 500,000 FCUSD from treasury reserves to establish a citizen healthcare subsidy program.', category: 'welfare', status: 'active', endsIn: '1d 3h', quorum: 81, votesFor: 18200, votesAgainst: 2100, totalVoters: 25000, yourVote: null },
  { id: 'prop-128', title: 'Cross-Chain Bridge Expansion', description: 'Add Avalanche and Arbitrum bridge routes to the sovereign chain liquidity network.', category: 'infrastructure', status: 'passed', endsIn: null, quorum: 89, votesFor: 19500, votesAgainst: 2800, totalVoters: 25000, yourVote: 'for' },
  { id: 'prop-127', title: 'Infrastructure Upgrade Fund', description: 'Allocate 2.5M FCUSD for sovereign chain node infrastructure upgrades across 12 regions.', category: 'infrastructure', status: 'passed', endsIn: null, quorum: 89, votesFor: 22300, votesAgainst: 2700, totalVoters: 25000, yourVote: 'for' },
  { id: 'prop-126', title: 'Privacy-First KYC Standard', description: 'Mandate ZKP-based identity verification for all government services, eliminating raw data exposure.', category: 'governance', status: 'rejected', endsIn: null, quorum: 45, votesFor: 8100, votesAgainst: 9900, totalVoters: 25000, yourVote: 'against' },
];

export const GOVERNANCE_STATS = {
  totalProposals: 131,
  activeProposals: 3,
  yourParticipation: '87%',
  votingPower: '1,250 FCC',
  delegatedTo: null,
};

// ============================
// Citizen Mode — Staking Data
// ============================

export const STAKING_POSITIONS = [
  { id: 'stake-1', pool: 'Sovereign Validator', token: 'FCC', staked: '2,500.00', stakedUsd: '$12,450.00', apy: '8.2%', rewards: '17.12 FCC', rewardsUsd: '$85.30', status: 'active', lockEnd: null, color: 'var(--gold)' },
  { id: 'stake-2', pool: 'FCUSD Stability Pool', token: 'FCUSD', staked: '5,000.00', stakedUsd: '$5,000.00', apy: '4.5%', rewards: '18.75 FCUSD', rewardsUsd: '$18.75', status: 'active', lockEnd: null, color: 'var(--blue)' },
  { id: 'stake-3', pool: 'Governance Lock', token: 'FCC', staked: '1,250.00', stakedUsd: '$6,225.00', apy: '12.0%', rewards: '12.50 FCC', rewardsUsd: '$62.25', status: 'locked', lockEnd: '90 days', color: 'var(--purple)' },
];

export const STAKING_SUMMARY = {
  totalStaked: '$23,675.00',
  totalRewards: '$166.30',
  avgApy: '7.8%',
  positions: 3,
};

// ============================
// Citizen Mode — Tracked Assets
// ============================

export const CITIZEN_ASSETS = [
  {
    id: 'FCC', name: 'FC Coin', tag: 'NATIVE',
    price: '$9,540.00', amount: '5,230.15 FCC', balance: 5230.15,
    change: '+4.8%', changeDir: 'up',
    bgColor: 'linear-gradient(140deg, #0A1628 0%, #0F2240 40%, #132D55 100%)',
    bgShadow: '0 2px 8px rgba(74,143,231,0.15)',
    iconType: 'fc',
    sparkColor: 'var(--blue)',
    sparkPath: 'M0,15 C10,15 15,5 30,12 C45,19 50,5 60,8',
  },
  {
    id: 'ETH', name: 'Ethereum', tag: null,
    price: '$2,105.75', amount: '1.185 ETH', balance: 1.185,
    change: '+2.3%', changeDir: 'up',
    bgColor: 'linear-gradient(140deg, #7B8FEE 0%, #5468D4 100%)',
    bgShadow: '0 2px 8px rgba(98,126,234,0.20)',
    iconType: 'eth',
    sparkColor: 'var(--blue)',
    sparkPath: 'M0,10 C15,10 20,4 35,9 C50,14 55,2 60,5',
  },
  {
    id: 'BTC', name: 'Bitcoin', tag: null,
    price: '$64,230.00', amount: '0.045 BTC', balance: 0.045,
    change: '-1.2%', changeDir: 'down',
    bgColor: 'linear-gradient(140deg, #F7931A 0%, #D67D0E 100%)',
    bgShadow: '0 2px 8px rgba(247,147,26,0.20)',
    iconType: 'btc',
    sparkColor: '#EF4444',
    sparkPath: 'M0,5 C10,5 20,15 30,10 C40,5 50,15 60,18',
  },
  {
    id: 'USDT', name: 'Tether', tag: null,
    price: '$1.00', amount: '3,500.00 USDT', balance: 3500.0,
    change: '0.0%', changeDir: 'neutral',
    bgColor: 'linear-gradient(140deg, #26A17B 0%, #1A7A5A 100%)',
    bgShadow: '0 2px 8px rgba(38,161,123,0.20)',
    iconType: 'usdt',
    sparkColor: 'var(--green)',
    sparkPath: null,
  },
  {
    id: 'USDC', name: 'USD Coin', tag: null,
    price: '$1.00', amount: '1,250.00 USDC', balance: 1250.0,
    change: '0.0%', changeDir: 'neutral',
    bgColor: 'linear-gradient(140deg, #2775CA 0%, #1A5DA8 100%)',
    bgShadow: '0 2px 8px rgba(39,117,202,0.15)',
    iconType: 'usdc',
    sparkColor: 'var(--blue)',
    sparkPath: null,
  },
];

// ============================
// Organization Mode Data
// ============================

export const ORG_MEMBERS = [
  { id: 'm1', name: 'Kyus Daison', role: 'Chief Executive', avatar: null, initials: 'KD', signer: true, signerLevel: 'primary', status: 'online', lastActive: 'Now', permissions: ['treasury', 'policy', 'members', 'signing'] },
  { id: 'm2', name: 'Victoria Tan', role: 'Chief Financial Officer', avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=100&h=100', initials: 'VT', signer: true, signerLevel: 'primary', status: 'online', lastActive: 'Now', permissions: ['treasury', 'signing', 'audit'] },
  { id: 'm3', name: 'James Chen', role: 'Chief Technology Officer', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100', initials: 'JC', signer: true, signerLevel: 'secondary', status: 'offline', lastActive: '2h ago', permissions: ['treasury', 'signing'] },
  { id: 'm4', name: 'Amara Osei', role: 'Head of Compliance', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100&h=100', initials: 'AO', signer: false, signerLevel: null, status: 'online', lastActive: 'Now', permissions: ['audit', 'policy'] },
  { id: 'm5', name: 'Rafael Mendes', role: 'Operations Manager', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100', initials: 'RM', signer: false, signerLevel: null, status: 'offline', lastActive: '1d ago', permissions: ['members'] },
];

export const ORG_TREASURY = {
  totalBalance: '$4,250,000',
  totalBalanceRaw: 4250000,
  change24h: '+$18,420',
  changePct: '+0.43%',
  vaults: [
    { id: 'operating', name: 'Operating', balance: '$1,800,000', pct: 42, color: 'var(--blue)', limit: '$50,000/day', icon: 'activity' },
    { id: 'payroll', name: 'Payroll', balance: '$1,500,000', pct: 35, color: 'var(--gold)', limit: '$200,000/cycle', icon: 'banknote' },
    { id: 'reserve', name: 'Reserve', balance: '$950,000', pct: 23, color: 'var(--green)', limit: 'Board approval', icon: 'shield' },
  ],
};

export const ORG_APPROVALS = [
  { id: 'ap-1', title: 'AWS Infrastructure', subtitle: 'Monthly hosting payment', amount: '-$4,250.00', currency: 'FCUSD', vault: 'Operating', reqSignatures: 3, currentSignatures: 1, signers: [{ name: 'Kyus Daison', signed: true, time: '10:30 AM' }, { name: 'Victoria Tan', signed: false }, { name: 'James Chen', signed: false }], status: 'urgent', deadline: '4h 18m', category: 'infrastructure' },
  { id: 'ap-2', title: 'Marketing Campaign Q2', subtitle: 'Social media & content budget', amount: '-$12,500.00', currency: 'FCUSD', vault: 'Operating', reqSignatures: 2, currentSignatures: 1, signers: [{ name: 'Victoria Tan', signed: true, time: 'Yesterday' }, { name: 'Kyus Daison', signed: false }], status: 'pending', deadline: '2d 6h', category: 'marketing' },
  { id: 'ap-3', title: 'Payroll Batch — March', subtitle: '12 operators, monthly cycle', amount: '-$86,400.00', currency: 'FCUSD', vault: 'Payroll', reqSignatures: 3, currentSignatures: 2, signers: [{ name: 'Kyus Daison', signed: true, time: 'Mar 28' }, { name: 'Victoria Tan', signed: true, time: 'Mar 29' }, { name: 'James Chen', signed: false }], status: 'urgent', deadline: '1d 2h', category: 'payroll' },
  { id: 'ap-4', title: 'Legal Retainer — Clifford', subtitle: 'Q2 advisory contract', amount: '-$8,000.00', currency: 'FCUSD', vault: 'Operating', reqSignatures: 2, currentSignatures: 2, signers: [{ name: 'Kyus Daison', signed: true, time: 'Mar 25' }, { name: 'Victoria Tan', signed: true, time: 'Mar 25' }], status: 'completed', deadline: null, category: 'legal' },
];

export const ORG_CHARTER = {
  entityName: 'NexaCorp Limited',
  entityId: 'FC-ORG-9941',
  registrationDate: '2025-09-15',
  jurisdiction: 'FC Sovereign Zone — Vanuatu',
  charterNft: 'NFT #FC-CHARTER-9941',
  charterStatus: 'Active',
  registeredAgent: 'FC Corporate Services',
  annualFiling: 'Next due: Sep 15, 2026',
  type: 'Digital Limited Company',
};

export const ORG_EQUITY = [
  { holder: 'Kyus Daison', role: 'Founder & CEO', shares: 5000, pct: 50, type: 'Common A', color: 'var(--gold)' },
  { holder: 'Victoria Tan', role: 'Co-founder & CFO', shares: 2500, pct: 25, type: 'Common A', color: 'var(--blue)' },
  { holder: 'Employee Pool', role: 'ESOP Reserve', shares: 1500, pct: 15, type: 'Common B', color: 'var(--green)' },
  { holder: 'Angel Round', role: 'Seed Investors', shares: 1000, pct: 10, type: 'Preferred', color: '#a78bfa' },
];

export const ORG_REVENUE = [
  { id: 'rev-1', period: 'March 2026', gross: '$142,800', distributions: [{ to: 'Operating', amount: '$85,680', pct: 60 }, { to: 'Reserve', amount: '$28,560', pct: 20 }, { to: 'Dividends', amount: '$28,560', pct: 20 }], status: 'distributed' },
  { id: 'rev-2', period: 'February 2026', gross: '$128,500', distributions: [{ to: 'Operating', amount: '$77,100', pct: 60 }, { to: 'Reserve', amount: '$25,700', pct: 20 }, { to: 'Dividends', amount: '$25,700', pct: 20 }], status: 'distributed' },
  { id: 'rev-3', period: 'January 2026', gross: '$115,200', distributions: [{ to: 'Operating', amount: '$69,120', pct: 60 }, { to: 'Reserve', amount: '$23,040', pct: 20 }, { to: 'Dividends', amount: '$23,040', pct: 20 }], status: 'distributed' },
];

export const ORG_CREDENTIALS = [
  { id: 'cred-1', name: 'Business License', issuer: 'FC Corporate Authority', issued: '2025-09-15', expires: '2026-09-15', status: 'active', icon: 'file-text', type: 'license' },
  { id: 'cred-2', name: 'Tax Registration', issuer: 'FC Revenue Office', issued: '2025-10-01', expires: null, status: 'active', icon: 'landmark', type: 'tax' },
  { id: 'cred-3', name: 'AML Compliance Cert', issuer: 'FC Compliance Bureau', issued: '2025-11-20', expires: '2026-11-20', status: 'active', icon: 'shield-check', type: 'compliance' },
  { id: 'cred-4', name: 'Data Protection Registration', issuer: 'FC Privacy Authority', issued: '2026-01-10', expires: '2027-01-10', status: 'active', icon: 'lock', type: 'privacy' },
  { id: 'cred-5', name: 'Cross-Border Operating Permit', issuer: 'FC Trade Authority', issued: '2026-02-01', expires: '2027-02-01', status: 'pending_renewal', icon: 'globe', type: 'trade' },
];

export const ORG_CHAT_CONTACTS = [
  { id: 'oc1', name: 'Meridian Holdings', entityId: 'FC-ORG-2201', avatar: null, initials: 'MH', type: 'enterprise', status: 'L3 Verified', lastMsg: 'Invoice #2847 settled — 25,000 FCUSD', lastMsgType: 'payment', time: '11:20 AM', unread: 1, color: '#3b82f6' },
  { id: 'oc2', name: 'Alexander Chen', entityId: null, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100', type: 'individual', status: 'L3 Verified', lastMsg: 'Contract review complete', lastMsgType: 'text', time: 'Yesterday', unread: 0, color: null },
  { id: 'oc3', name: 'Vanguard Capital', entityId: 'FC-ORG-0088', avatar: null, initials: 'VC', type: 'enterprise', status: 'L3 Verified', lastMsg: 'Q1 investment memo attached', lastMsgType: 'document', time: 'Yesterday', unread: 2, color: '#10b981' },
  { id: 'oc4', name: 'FC Revenue Office', entityId: 'FC-GOV-0001', avatar: null, initials: 'FR', type: 'government', status: 'Authority', lastMsg: 'Tax filing deadline reminder', lastMsgType: 'text', time: 'Mon', unread: 0, color: '#D4AF37' },
  { id: 'oc5', name: 'Sarah Williams', entityId: null, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100', type: 'individual', status: 'L2 Verified', lastMsg: 'Please process my expense claim', lastMsgType: 'text', time: 'Mar 26', unread: 0, color: null },
];

export const ORG_ALERTS = [
  { id: 'oa1', sender: 'FC Compliance Bureau', icon: 'shield', time: '9:15 AM', unread: true, type: 'compliance', title: 'Quarterly AML Report Due', preview: 'Your Q1 2026 Anti-Money Laundering compliance report must be submitted by April 15, 2026. ZKP-verified proofs accepted.', actions: ['Begin Filing', 'Remind Later'] },
  { id: 'oa2', sender: 'Treasury System', icon: 'banknote', time: '8:30 AM', unread: true, type: 'treasury', title: 'Payroll Window Opening', preview: 'The March payroll batch ($86,400 FCUSD) requires 1 more signature before the 48h execution window closes.', actions: ['Review & Sign'] },
  { id: 'oa3', sender: 'Audit Engine', icon: 'activity', time: 'Yesterday', unread: false, type: 'audit', title: 'Unusual Transaction Pattern', preview: 'Operating vault showed 3x normal outflow in the last 24h ($42,750 vs $14,200 avg). All transactions were properly authorized.', actions: ['View Details'] },
  { id: 'oa4', sender: 'FC Corporate Authority', icon: 'building', time: '2 days ago', unread: false, type: 'regulatory', title: 'Annual Filing Reminder', preview: 'NexaCorp Limited annual return is due September 15, 2026. Early filing discount available until July 15.', actions: ['Start Filing'] },
  { id: 'oa5', sender: 'Security Monitor', icon: 'lock', time: '3 days ago', unread: false, type: 'security', title: 'New Device Access Attempt', preview: 'A new device attempted to access the corporate portal from Singapore. Access was blocked pending biometric verification.', actions: ['Review Log'] },
];

export const ORG_AUDIT_LOG = [
  { id: 'log-1', action: 'Multi-sig approval', detail: 'Kyus Daison signed AP-1 (AWS Infrastructure)', time: '10:30 AM', operator: 'Kyus Daison', type: 'signing' },
  { id: 'log-2', action: 'Treasury transfer', detail: 'Operating → Vendor: $4,250.00 FCUSD', time: '10:31 AM', operator: 'System', type: 'transfer' },
  { id: 'log-3', action: 'Member login', detail: 'Victoria Tan authenticated via FaceID', time: '9:45 AM', operator: 'Victoria Tan', type: 'auth' },
  { id: 'log-4', action: 'Policy update', detail: 'Daily operating limit increased to $50,000', time: 'Yesterday', operator: 'Kyus Daison', type: 'policy' },
  { id: 'log-5', action: 'Credential issued', detail: 'AML Compliance Certificate renewed', time: '2 days ago', operator: 'System', type: 'credential' },
  { id: 'log-6', action: 'Revenue distribution', detail: 'March revenue $142,800 distributed per policy', time: '3 days ago', operator: 'System', type: 'distribution' },
];
