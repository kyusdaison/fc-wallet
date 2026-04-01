import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, ArrowRightLeft, History, Bitcoin, CircleDollarSign, ChevronRight, Database, User, Building2, Shield, Fingerprint, ShieldCheck, CheckCircle2, FileSignature, Users, Activity, Banknote, TrendingUp, Coins, Gift } from 'lucide-react';
import { CITIZEN_PROFILE, CITIZEN_PORTFOLIO, ORG_PROFILE, ORG_TREASURY, STAKING_SUMMARY, CITIZEN_ASSETS } from '../data/mockData';
import { OnboardingChecklist } from '../components/EmptyStates';

// --- Asset Icon Helper ---

const getAssetIcon = (iconType) => {
  switch (iconType) {
    case 'fc':
      return <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M4 4h10l6 6v10H4z" /></svg>;
    case 'eth':
      return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><rect x="5" y="5" width="14" height="14" transform="rotate(45 12 12)" /><rect x="9" y="9" width="6" height="6" transform="rotate(45 12 12)" /></svg>;
    case 'btc':
      return <Bitcoin color="white" size={18} />;
    case 'usdt':
      return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 6h10M12 6v12"/></svg>;
    case 'usdc':
      return <CircleDollarSign color="white" size={18} />;
    default:
      return null;
  }
};

// --- Asset Sparkline Component ---

const AssetSparkline = ({ sparkPath, sparkColor }) => {
  if (!sparkPath) {
    return (
      <svg width="60" height="20" viewBox="0 0 60 20" className="flex-shrink-0">
        <path d="M0,10 L60,10" fill="none" stroke={sparkColor} strokeWidth="1.5" strokeDasharray="3,3" opacity="0.5" />
      </svg>
    );
  }

  return (
    <svg width="60" height="20" viewBox="0 0 60 20" className="flex-shrink-0">
      <path d={sparkPath} fill="none" stroke={sparkColor} strokeWidth="1.5" className="sparkline-glow" />
    </svg>
  );
};

// --- Shared Identity Components ---

const CitizenIdentitySummary = ({ setActiveTab }) => (
  <button type="button" className="citizen-summary-card" onClick={() => setActiveTab('Identity')}>
    <div className="citizen-summary-top">
      <span className="citizen-summary-kicker">IDENTITY VAULT</span>
      <span className="citizen-summary-status">
        <span className="citizen-summary-status-dot"></span>
        Trusted
      </span>
    </div>

    <div className="citizen-summary-main">
      <div className="citizen-summary-avatar">
        <User size={22} color="white" />
      </div>
      <div className="citizen-summary-copy">
        <div className="citizen-summary-name">{CITIZEN_PROFILE.name}</div>
        <div className="citizen-summary-id">did:fc:amelia</div>
      </div>
      <div className="citizen-summary-arrow">
        <ChevronRight size={18} color="white" strokeWidth={2.5} />
      </div>
    </div>

    <div className="citizen-summary-metrics">
      <div className="citizen-summary-metric">
        <Shield size={15} color="var(--gold)" />
        <div>
          <span>Trust Level</span>
          <strong>L3 Verified</strong>
        </div>
      </div>
      <div className="citizen-summary-divider"></div>
      <div className="citizen-summary-metric">
        <Fingerprint size={15} color="var(--blue)" />
        <div>
          <span>Biometric Gate</span>
          <strong>Enabled</strong>
        </div>
      </div>
    </div>
  </button>
);

const OrgIdentitySummary = ({ setActiveTab }) => (
  <button type="button" className="org-summary-card" onClick={() => setActiveTab('Identity')}>
    <div className="org-summary-top">
      <span className="org-summary-kicker">ENTERPRISE CONTROL</span>
      <span className="org-summary-status">
        <span className="org-summary-status-dot"></span>
        Treasury Live
      </span>
    </div>

    <div className="org-summary-main">
      <div className="org-summary-avatar">
        <Building2 size={22} color="white" />
      </div>
      <div className="org-summary-copy">
        <div className="org-summary-name">NexaCorp Limited</div>
        <div className="org-summary-id">FC-ORG-9941</div>
      </div>
      <div className="org-summary-arrow">
        <ChevronRight size={18} color="white" strokeWidth={2.5} />
      </div>
    </div>

    <div className="org-summary-metrics">
      <div className="org-summary-metric">
        <FileSignature size={15} color="var(--gold)" />
        <div>
          <span>Approval Policy</span>
          <strong>2 of 3 active</strong>
        </div>
      </div>
      <div className="org-summary-divider"></div>
      <div className="org-summary-metric">
        <Users size={15} color="var(--blue)" />
        <div>
          <span>Operator Seats</span>
          <strong>12 members</strong>
        </div>
      </div>
    </div>
  </button>
);

// --- HomeModule (Citizen) ---

const HomeModule = ({ setActiveTab, onOpenSwap, onOpenHistory, onOpenSend, onOpenReceive, onOpenAsset, onOpenColdVault, onOpenStaking }) => {
  const [portfolioRange, setPortfolioRange] = useState('24H');

  const assetList = CITIZEN_ASSETS;

  const homeActions = [
    {
      id: 'send',
      title: 'Send',
      subtitle: 'Move funds out',
      icon: <ArrowUp size={20} color="var(--blue)" />,
      iconClass: 'bg-blue-subtle',
      toneClass: 'tone-blue',
      emphasis: 'primary',
      onClick: onOpenSend,
    },
    {
      id: 'receive',
      title: 'Receive',
      subtitle: 'Share your wallet',
      icon: <ArrowDown size={20} color="var(--green)" />,
      iconClass: 'bg-green-subtle',
      toneClass: 'tone-green',
      emphasis: 'primary',
      onClick: onOpenReceive,
    },
    {
      id: 'swap',
      title: 'Swap',
      subtitle: 'Rebalance assets',
      icon: <ArrowRightLeft size={20} color="var(--purple)" />,
      iconClass: 'bg-purple-subtle',
      toneClass: 'tone-purple',
      emphasis: 'secondary',
      onClick: onOpenSwap,
    },
    {
      id: 'history',
      title: 'History',
      subtitle: 'Review activity',
      icon: <History size={20} color="var(--text-dark)" />,
      iconClass: 'bg-gray-subtle',
      toneClass: 'tone-slate',
      emphasis: 'secondary',
      onClick: onOpenHistory,
    },
  ];

  return (
    <motion.div key="home" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.3, ease: 'easeOut' }} className="module-stack">
      <CitizenIdentitySummary setActiveTab={setActiveTab} />

      <div className="home-action-grid">
        {homeActions.map((action) => (
          <button
            key={action.id}
            type="button"
            className={`home-action-btn ${action.emphasis} ${action.toneClass}`}
            onClick={action.onClick}
          >
            <div className={`icon-wrap ${action.iconClass}`}>{action.icon}</div>
            <div className="home-action-copy">
              <span className="home-action-title">{action.title}</span>
              <span className="home-action-subtitle">{action.subtitle}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Onboarding Checklist — new user guidance */}
      <OnboardingChecklist
        steps={[
          { id: 'identity', title: 'Verify Identity', subtitle: '~2 min · Biometric scan', done: true },
          { id: 'fund', title: 'Fund Your Wallet', subtitle: 'Receive your first deposit', done: true },
          { id: 'vault', title: 'Set Up Cold Vault', subtitle: 'Secure long-term holdings', done: false },
          { id: 'stake', title: 'Start Staking', subtitle: 'Earn network rewards', done: false },
        ]}
        onStepClick={(step) => {
          if (step.id === 'vault') onOpenColdVault?.();
          if (step.id === 'stake') onOpenStaking?.();
        }}
      />

      <div className="portfolio-hero">
        <div className="portfolio-hero-header">
          <div>
            <div className="portfolio-hero-kicker">PORTFOLIO BALANCE</div>
            <div className="mt-6">
              <span className="dash-pill-active"><div className="pulse-dot"></div> <span className="mt-1">Network Sync</span></span>
            </div>
          </div>
          <div className="portfolio-range-switch">
            {['24H', '7D', '30D'].map(range => (
              <span key={range} className={`portfolio-range-pill ${portfolioRange === range ? 'active' : ''}`} onClick={() => setPortfolioRange(range)}>{range}</span>
            ))}
          </div>
        </div>

        <div className="portfolio-amount">
          <span className="currency">$</span>{CITIZEN_PORTFOLIO.totalBalance.replace('$', '').split('.')[0]}<span className="decimals">.{CITIZEN_PORTFOLIO.totalBalance.split('.')[1]}</span>
        </div>
        <div className="portfolio-change">{CITIZEN_PORTFOLIO.change24h} ({CITIZEN_PORTFOLIO.changePct}) Today</div>

        <div className="portfolio-hero-stats">
          <div className="portfolio-stat-card">
            <span>Cold Vault</span>
            <strong>Connected</strong>
          </div>
          <div className="portfolio-stat-card">
            <span>Tracked Assets</span>
            <strong>{assetList.length} tokens</strong>
          </div>
        </div>

        <div className="portfolio-graph">
          <svg width="100%" height="64" viewBox="0 0 300 64" preserveAspectRatio="none">
            <path d="M0,46 C18,44 26,30 46,31 C66,32 78,44 102,40 C124,36 136,18 160,20 C184,22 194,50 220,48 C242,46 256,18 274,17 C286,16 294,24 300,32 L300,64 L0,64 Z" fill="url(#portfolioGrad)" />
            <defs>
              <linearGradient id="portfolioGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--blue)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="var(--blue)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,46 C18,44 26,30 46,31 C66,32 78,44 102,40 C124,36 136,18 160,20 C184,22 194,50 220,48 C242,46 256,18 274,17 C286,16 294,24 300,32" fill="none" stroke="var(--blue)" strokeWidth="3" className="sparkline-glow" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Earn & Protect — merged Cold Vault + Staking */}
      <div className="ep-section">
        <div className="ep-section-title">EARN & PROTECT</div>
        <div className="ep-grid">
          <button type="button" className="ep-card ep-vault" onClick={onOpenColdVault}>
            <div className="ep-card-icon ep-icon-blue">
              <Database size={18} color="#60A5FA" strokeWidth={1.5} />
            </div>
            <div className="ep-card-copy">
              <div className="ep-card-title">Cold Vault</div>
              <div className="ep-card-value">{CITIZEN_PORTFOLIO.coldVaultBalance}</div>
              <div className="ep-card-meta">{CITIZEN_PORTFOLIO.coldVaultPct} secured</div>
            </div>
            <ChevronRight size={16} color="var(--text-tertiary)" className="ep-arrow" />
          </button>
          <button type="button" className="ep-card ep-staking" onClick={onOpenStaking}>
            <div className="ep-card-icon ep-icon-gold">
              <Coins size={18} color="var(--gold)" />
            </div>
            <div className="ep-card-copy">
              <div className="ep-card-title">Staking</div>
              <div className="ep-card-value">{STAKING_SUMMARY.totalStaked}</div>
              <div className="ep-card-meta">
                <TrendingUp size={10} color="var(--green)" />
                {STAKING_SUMMARY.avgApy} · <Gift size={10} /> {STAKING_SUMMARY.totalRewards}
              </div>
            </div>
            <ChevronRight size={16} color="var(--text-tertiary)" className="ep-arrow" />
          </button>
        </div>
      </div>

    {/* My Assets - Grouped Container */}
    <div>
      <div className="asset-list-header">
        <span className="asset-list-title">Tracked Assets</span>
        <span className="asset-list-count">{assetList.length} tokens</span>
      </div>
      <div className="asset-list-panel glass-panel">
        {assetList.map((asset, index) => (
          <div key={asset.id} onClick={() => onOpenAsset(asset)} className="asset-row glass-card" style={{
            borderTop: index > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none'
          }}>
            <div className="asset-icon-circle" style={{ background: asset.bgColor, boxShadow: asset.bgShadow || 'none' }}>
              {getAssetIcon(asset.iconType)}
            </div>
            <div className="asset-info">
              <div className="asset-name-row">
                <span className="asset-name">{asset.name}</span>
                {asset.tag && <span className="asset-tag">{asset.tag}</span>}
              </div>
              <div className="asset-price">{asset.price}</div>
            </div>

            {/* Asset Sparkline Space */}
            <div className="asset-sparkline">
              <AssetSparkline sparkPath={asset.sparkPath} sparkColor={asset.sparkColor} />
            </div>

            <div className="asset-amounts">
              <div className="asset-amount-value">{asset.amount.split(' ')[0]}</div>
              <div className={`asset-change ${asset.changeDir}`}>{asset.change}</div>
            </div>
          </div>
        ))}
      </div>
    </div>

      <div className="request-section">
        <div className="asset-section-header">
          <div>
            <div className="section-title section-title-flush">TRUST REQUESTS</div>
            <div className="asset-section-subtitle">Priority identity actions waiting for review</div>
          </div>
          <div className="asset-section-count">1 pending</div>
        </div>

        <div className="request-card">
          <div className="request-card-main">
            <div className="request-card-icon">
              <Building2 size={20} color="var(--blue)" />
            </div>
            <div>
              <div className="request-card-title">NexaCorp Employment</div>
              <div className="request-card-subtitle">
                <span className="request-card-dot"></span>
                ZKP verification request
              </div>
            </div>
          </div>
          <button type="button" className="request-cta">Review</button>
        </div>
      </div>
    </motion.div>
  );
};

// --- OrgHomeModule ---

const OrgHomeModule = ({ setActiveTab, onOpenSwap, onOpenMultiSig }) => {
  const pendingRequest = {
    id: 'tx-1',
    title: 'AWS Hosting - May 2026',
    amount: '- $4,250.00',
    reqSignatures: 3,
    currentSignatures: 1,
  };

  const orgActions = [
    {
      id: 'approvals',
      title: 'Approvals',
      subtitle: 'Review signer queue',
      icon: <FileSignature size={20} color="var(--gold)" />,
      iconClass: 'bg-gold-subtle',
      toneClass: 'tone-gold',
      emphasis: 'primary',
      onClick: () => onOpenMultiSig(pendingRequest),
    },
    {
      id: 'swap',
      title: 'Swap',
      subtitle: 'Rebalance treasury',
      icon: <ArrowRightLeft size={20} color="var(--purple)" />,
      iconClass: 'bg-purple-subtle',
      toneClass: 'tone-purple',
      emphasis: 'primary',
      onClick: onOpenSwap,
    },
    {
      id: 'members',
      title: 'Members',
      subtitle: 'Review entity profile',
      icon: <Users size={20} color="var(--blue)" />,
      iconClass: 'bg-blue-subtle',
      toneClass: 'tone-blue',
      emphasis: 'secondary',
      onClick: () => setActiveTab('Identity'),
    },
    {
      id: 'policies',
      title: 'Policies',
      subtitle: 'Limits and controls',
      icon: <ShieldCheck size={20} color="var(--green)" />,
      iconClass: 'bg-green-subtle',
      toneClass: 'tone-green',
      emphasis: 'secondary',
      onClick: () => setActiveTab('Settings'),
    },
  ];

  const treasuryStats = [
    { label: 'Employees', value: '12 operators', icon: <Users size={15} color="var(--blue)" /> },
    { label: 'Pending', value: '2 approvals', icon: <FileSignature size={15} color="var(--gold)" /> },
    { label: 'Daily Flow', value: '$182k moved', icon: <Activity size={15} color="var(--green)" /> },
  ];

  return (
    <motion.div key="org" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.3, ease: 'easeOut' }} className="oh-org-wrapper">
      <OrgIdentitySummary setActiveTab={setActiveTab} />

      <div className="home-action-grid">
        {orgActions.map((action) => (
          <button
            key={action.id}
            type="button"
            className={`home-action-btn ${action.emphasis} ${action.toneClass}`}
            onClick={action.onClick}
          >
            <div className={`icon-wrap ${action.iconClass}`}>{action.icon}</div>
            <div className="home-action-copy">
              <span className="home-action-title">{action.title}</span>
              <span className="home-action-subtitle">{action.subtitle}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="org-treasury-hero">
        <div className="org-treasury-head">
          <div>
            <div className="org-treasury-kicker">CORPORATE TREASURY</div>
            <div className="org-treasury-balance">$4.25M</div>
          </div>
          <div className="org-treasury-pill">
            <ShieldCheck size={14} color="var(--gold)" />
            2 of 3 signers ready
          </div>
        </div>

        <div className="org-treasury-subcopy">
          Operating reserve distributed across payroll, liquidity, and vendor settlement vaults.
        </div>

        {/* Vault Allocation Bars */}
        <div className="oh-vault-grid">
          {[
            { label: 'Operating', amount: '$1.8M', pct: 42, color: 'var(--blue)' },
            { label: 'Payroll', amount: '$1.5M', pct: 35, color: 'var(--gold)' },
            { label: 'Reserve', amount: '$0.95M', pct: 23, color: 'var(--green)' },
          ].map(item => (
            <div key={item.label} className="oh-vault-card">
              <div className="oh-vault-label">{item.label}</div>
              <div className="oh-vault-amount">{item.amount}</div>
              <div className="oh-vault-bar-track">
                <div className="oh-vault-bar-fill" style={{ width: `${item.pct}%`, background: item.color, boxShadow: `0 0 6px ${item.color}` }}></div>
              </div>
            </div>
          ))}
        </div>

        <div className="org-treasury-meta-grid">
          {treasuryStats.map((stat) => (
            <div key={stat.label} className="org-treasury-meta-card">
              <div className="org-treasury-meta-label">{stat.label}</div>
              <strong>{stat.value}</strong>
              <div className="org-treasury-meta-icon">{stat.icon}</div>
            </div>
          ))}
        </div>

        <div className="org-treasury-timeline">
          <div>
            <span>Next release window</span>
            <strong>Payroll batch opens in 04h 18m</strong>
          </div>
          <button type="button" className="org-inline-link" onClick={() => setActiveTab('Settings')}>
            Policy Center
          </button>
        </div>
      </div>

      <div className="request-section">
        <div className="asset-section-header">
          <div>
            <div className="section-title oh-section-title-override">APPROVAL FLOW</div>
            <div className="asset-section-subtitle">Keep the signer queue moving before treasury windows close</div>
          </div>
          <div className="asset-section-count">1 urgent</div>
        </div>

        <button type="button" className="org-signature-card" onClick={() => onOpenMultiSig(pendingRequest)}>
          <div className="org-signature-top">
            <div className="org-signature-main">
              <div className="org-signature-icon">
                <Banknote size={20} color="#fca5a5" />
              </div>
              <div className="org-signature-copy">
                <div className="org-signature-title">Infrastructure Payment</div>
                <div className="org-signature-subtitle">AWS Hosting · May 2026</div>
              </div>
            </div>
            <div className="org-signature-amount">- $4,250.00</div>
          </div>

          <div className="org-signature-footer">
            <div className="oh-sig-container">
              <div className="org-signature-progress">
                <span className="org-signature-progress-dot"></span>
                1 of 3 signatures collected
              </div>
              <div className="oh-sig-bars">
                <div className="oh-sig-bar filled"></div>
                <div className="oh-sig-bar"></div>
                <div className="oh-sig-bar"></div>
              </div>
            </div>
            <span className="org-signature-cta">Review request</span>
          </div>
        </button>

        <div className="org-ops-grid">
          <div className="org-ops-card">
            <span>Signer Coverage</span>
            <strong>APAC + EU ready</strong>
            <p>Two regional approvers are online and within signing window.</p>
          </div>
          <div className="org-ops-card">
            <span>Reserve Health</span>
            <strong>42 days runway</strong>
            <p>Payroll and infrastructure buffers remain above treasury minimums.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export { HomeModule, OrgHomeModule, CitizenIdentitySummary, OrgIdentitySummary };
