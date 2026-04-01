import React from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  FileText,
  TrendingUp,
  Shield,
  Check,
  AlertCircle,
  Clock,
  DollarSign,
  Lock,
  PieChart,
  Server,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';
import { ORG_CHARTER, ORG_EQUITY, ORG_REVENUE, ORG_CREDENTIALS } from '../data/mockData';

const OrgServicesModule = () => {
  const getCredentialIcon = (type) => {
    switch (type) {
      case 'license':
        return <FileText size={14} />;
      case 'tax':
        return <DollarSign size={14} />;
      case 'compliance':
        return <Shield size={14} />;
      case 'data':
        return <Shield size={14} />;
      case 'trade':
        return <Building2 size={14} />;
      default:
        return <Check size={14} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'var(--gold)';
      case 'pending_renewal':
        return '#F59E0B';
      case 'expired':
        return '#EF4444';
      default:
        return 'var(--text-secondary)';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <Check size={12} />;
      case 'pending_renewal':
        return <AlertCircle size={12} />;
      case 'expired':
        return <AlertCircle size={12} />;
      default:
        return <Clock size={12} />;
    }
  };

  return (
    <motion.div
      className="module-content module-stack-sm os-page"
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* ── 1. Gold Glass Hero Card ── */}
      <div className="og-hero">
        <div className="og-hero-glow" />
        <div className="og-hero-top">
          <div>
            <div className="og-hero-kicker">ENTERPRISE REGISTRY</div>
            <div className="og-hero-title">Services</div>
          </div>
          <div className="og-hero-badge">
            <div className="og-hero-pulse" />
            <Sparkles size={11} />
            Active
          </div>
        </div>
        <div className="og-hero-stats">
          <div className="og-hero-stat">
            <span className="og-stat-value">{ORG_CHARTER.charterStatus === 'Active — Good Standing' ? '✓' : '—'}</span>
            <span className="og-stat-label">Charter</span>
          </div>
          <div className="og-hero-stat-divider" />
          <div className="og-hero-stat">
            <span className="og-stat-value">{ORG_EQUITY.length}</span>
            <span className="og-stat-label">Holders</span>
          </div>
          <div className="og-hero-stat-divider" />
          <div className="og-hero-stat">
            <span className="og-stat-value">{ORG_CREDENTIALS.length}</span>
            <span className="og-stat-label">Credentials</span>
          </div>
        </div>
      </div>

      {/* ── 2. Quick Actions ── */}
      <div className="home-action-grid">
        {[
          { id: 'charter', title: 'Charter', subtitle: 'Corp details', icon: <Building2 size={20} color="var(--gold)" />, iconClass: 'cm-icon-gold', toneClass: 'tone-gold', emphasis: 'primary' },
          { id: 'equity', title: 'Equity', subtitle: 'Shareholders', icon: <PieChart size={20} color="var(--gold)" />, iconClass: 'cm-icon-gold', toneClass: 'tone-gold', emphasis: 'primary' },
          { id: 'revenue', title: 'Revenue', subtitle: 'Distributions', icon: <TrendingUp size={20} color="#10b981" />, iconClass: 'cm-icon-green', toneClass: 'tone-green', emphasis: 'secondary' },
          { id: 'creds', title: 'Credentials', subtitle: 'Licenses', icon: <Shield size={20} color="#8b5cf6" />, iconClass: 'cm-icon-purple', toneClass: 'tone-purple', emphasis: 'secondary' },
        ].map((a) => (
          <button key={a.id} type="button" className={`home-action-btn ${a.emphasis} ${a.toneClass}`}>
            <div className={`icon-wrap ${a.iconClass}`}>{a.icon}</div>
            <div className="home-action-copy">
              <span className="home-action-title">{a.title}</span>
              <span className="home-action-subtitle">{a.subtitle}</span>
            </div>
          </button>
        ))}
      </div>

      {/* ========== COMPANY CHARTER ========== */}
      <div className="os-section">
        <div className="os-label">COMPANY CHARTER</div>
        <div className="os-card">
          <div className="os-grid">
            <div className="os-kv">
              <span>Entity</span>
              <strong>{ORG_CHARTER.entityName}</strong>
            </div>
            <div className="os-kv">
              <span>Entity ID</span>
              <strong className="os-mono">{ORG_CHARTER.entityId}</strong>
            </div>
            <div className="os-kv">
              <span>Registration Date</span>
              <strong>{ORG_CHARTER.registrationDate}</strong>
            </div>
            <div className="os-kv">
              <span>Jurisdiction</span>
              <strong>{ORG_CHARTER.jurisdiction}</strong>
            </div>
            <div className="os-kv">
              <span>NFT ID</span>
              <strong className="os-mono">{ORG_CHARTER.charterNft}</strong>
            </div>
            <div className="os-kv">
              <span>Company Type</span>
              <strong>{ORG_CHARTER.type}</strong>
            </div>
            <div className="os-kv">
              <span>Registered Agent</span>
              <strong>{ORG_CHARTER.registeredAgent}</strong>
            </div>
            <div className="os-kv">
              <span>Annual Filing</span>
              <strong>{ORG_CHARTER.annualFiling}</strong>
            </div>
          </div>
          <div className="os-status-row">
            <div className="os-badge green">
              <Check size={12} />
              {ORG_CHARTER.charterStatus}
            </div>
          </div>
        </div>
      </div>

      {/* ========== EQUITY STRUCTURE ========== */}
      <div className="os-section">
        <div className="os-label">
          <PieChart size={13} />
          EQUITY STRUCTURE
        </div>
        <div className="os-card">
          {/* Ownership bar */}
          <div className="os-bar-track">
            {ORG_EQUITY.map((s) => (
              <div
                key={s.holder}
                className="os-bar-seg"
                style={{ flex: s.pct, background: s.color }}
              />
            ))}
          </div>

          {/* Shareholder rows */}
          {ORG_EQUITY.map((s) => (
            <div key={s.holder} className="os-eq-row">
              <div
                className="os-eq-dot"
                style={{ background: s.color }}
              />
              <div className="os-eq-copy">
                <div className="os-eq-name">{s.holder}</div>
                <div className="os-eq-role">
                  {s.role} · {s.type}
                </div>
              </div>
              <div className="os-eq-right">
                <strong style={{ color: s.color }}>{s.pct}%</strong>
                <span>{s.shares.toLocaleString()} shares</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========== REVENUE & PROFIT-SHARING ========== */}
      <div className="os-section">
        <div className="os-label">
          <TrendingUp size={13} />
          REVENUE & PROFIT-SHARING
        </div>
        {ORG_REVENUE.map((r) => (
          <div key={r.id} className="os-card">
            <div className="os-rev-head">
              <div>
                <span className="os-rev-period">{r.period}</span>
                <strong className="os-rev-amount">{r.gross}</strong>
              </div>
              <div className="os-badge green">
                <Check size={12} />
                {r.status}
              </div>
            </div>
            <div className="os-rev-dist">
              {r.distributions.map((d, i) => (
                <div key={i} className="os-dist-row">
                  <span>{d.to}</span>
                  <div className="os-dist-bar">
                    <div
                      className="os-dist-fill"
                      style={{
                        width: `${d.pct}%`,
                        background:
                          i === 0
                            ? 'var(--gold)'
                            : i === 1
                            ? 'var(--blue)'
                            : 'var(--green)',
                      }}
                    />
                  </div>
                  <strong>{d.pct}%</strong>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ========== ENTERPRISE CREDENTIALS ========== */}
      <div className="os-section">
        <div className="sh-section-head">
          <div className="os-label" style={{ margin: 0 }}>
            <Shield size={13} />
            ENTERPRISE CREDENTIALS
          </div>
          <span className="sh-section-count">{ORG_CREDENTIALS.length} items</span>
        </div>
        <div className="os-card">
          {ORG_CREDENTIALS.map((c, i) => (
            <React.Fragment key={c.id}>
              {i > 0 && <div className="os-divider" />}
              <div className="os-cred-row">
                <div
                  className="os-cred-icon"
                  style={{ color: getStatusColor(c.status) }}
                >
                  {getCredentialIcon(c.type)}
                </div>
                <div className="os-cred-copy">
                  <div className="os-cred-name">{c.name}</div>
                  <div className="os-cred-meta">
                    {c.issuer} · {c.issued} – {c.expires}
                  </div>
                </div>
                <div
                  className="os-cred-status"
                  style={{ color: getStatusColor(c.status) }}
                >
                  {getStatusIcon(c.status)} {c.status.replace('_', ' ')}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ── Footer Stats ── */}
      <div className="cm-net-stats">
        <div className="cm-net-stat">
          <Building2 size={12} color="var(--gold)" />
          <span>Active Entity</span>
        </div>
        <div className="cm-net-divider" />
        <div className="cm-net-stat">
          <Shield size={12} color="var(--gold)" />
          <span>{ORG_CREDENTIALS.length} Credentials</span>
        </div>
        <div className="cm-net-divider" />
        <div className="cm-net-stat">
          <ShieldCheck size={12} color="var(--gold)" />
          <span>KYB Verified</span>
        </div>
      </div>
    </motion.div>
  );
};

export default OrgServicesModule;
