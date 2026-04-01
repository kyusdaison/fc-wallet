import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  ChevronDown,
  FileText,
  Landmark,
  ShieldCheck,
  Lock,
  Globe,
  Sparkles,
  CheckCircle2,
  MapPin,
  Calendar,
  Users,
  Zap,
  Activity,
  AlertTriangle,
  Clock,
  TrendingUp,
} from 'lucide-react';
import { ORG_PROFILE, ORG_CHARTER, ORG_MEMBERS, ORG_CREDENTIALS } from '../data/mockData';

const iconMap = {
  certificate: FileText,
  legal: Landmark,
  compliance: ShieldCheck,
  security: Lock,
  domain: Globe,
};

const verifications = [
  { id: 1, name: 'Corporate Existence Proof', verified: true, date: 'Mar 28' },
  { id: 2, name: 'AML Compliance Status', verified: true, date: 'Mar 15' },
  { id: 3, name: 'Authorized Signatory List', verified: true, date: 'Mar 10' },
];

const complianceMetrics = [
  { label: 'KYB Score', value: '94', max: 100, color: '#34D399', icon: <ShieldCheck size={14} color="#34D399" /> },
  { label: 'AML Risk', value: 'Low', color: '#34D399', icon: <Activity size={14} color="#34D399" /> },
  { label: 'Filing Status', value: 'Current', color: '#4A8FE7', icon: <FileText size={14} color="#4A8FE7" /> },
  { label: 'Next Review', value: 'Jun 15', color: '#F59E0B', icon: <Clock size={14} color="#F59E0B" /> },
];

const auditTrail = [
  { id: 1, action: 'Annual compliance review passed', time: '2 days ago', type: 'success', actor: 'FC Authority' },
  { id: 2, action: 'Treasury policy updated (2-of-3 → 2-of-3)', time: '1 week ago', type: 'info', actor: 'Sarah Chen' },
  { id: 3, action: 'New operator added: James Park', time: '2 weeks ago', type: 'info', actor: 'Marcus Wei' },
  { id: 4, action: 'KYB re-verification completed', time: '3 weeks ago', type: 'success', actor: 'FC Authority' },
  { id: 5, action: 'Jurisdiction filing renewed', time: '1 month ago', type: 'success', actor: 'System' },
];

export default function OrgIdentityModule() {
  const [expanded, setExpanded] = useState(false);

  const sortedMembers = [...ORG_MEMBERS].sort((a, b) => {
    if (a.status === 'online' && b.status !== 'online') return -1;
    if (a.status !== 'online' && b.status === 'online') return 1;
    return 0;
  });

  const CredIcon = ({ type }) => {
    const Icon = iconMap[type] || FileText;
    return <Icon size={20} />;
  };

  return (
    <motion.div
      className="module-content module-stack-sm oi-page"
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* ── 1. Gold Glass Hero Card ── */}
      <div className="og-hero">
        <div className="og-hero-glow" />
        <div className="og-hero-top">
          <div className="oi-hero-profile">
            <div className="oi-avatar">
              <Building2 size={28} />
            </div>
            <div>
              <div className="og-hero-kicker">ENTITY IDENTITY</div>
              <div className="og-hero-title" style={{ fontSize: 17 }}>{ORG_CHARTER.entityName}</div>
              <div className="oi-entity-id-new">{ORG_CHARTER.entityId}</div>
            </div>
          </div>
          <div className="og-hero-badge">
            <div className="og-hero-pulse" />
            <ShieldCheck size={11} />
            Active
          </div>
        </div>
        <div className="og-hero-stats">
          <div className="og-hero-stat">
            <span className="og-stat-value">{ORG_MEMBERS.length}</span>
            <span className="og-stat-label">Operators</span>
          </div>
          <div className="og-hero-stat-divider" />
          <div className="og-hero-stat">
            <span className="og-stat-value">{ORG_CREDENTIALS.length}</span>
            <span className="og-stat-label">Credentials</span>
          </div>
          <div className="og-hero-stat-divider" />
          <div className="og-hero-stat">
            <span className="og-stat-value">94</span>
            <span className="og-stat-label">KYB Score</span>
          </div>
        </div>
      </div>

      {/* NFT + multi-sig pills */}
      <div className="oi-pills-row">
        <motion.div className="oi-charter-nft" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
          <Sparkles size={13} />
          <span>{ORG_CHARTER.charterNft}</span>
        </motion.div>
        <span className="oi-pill oi-pill-gold">{ORG_PROFILE.multiSigConfig} Multi-Sig</span>
      </div>

      {/* Entity Details */}
      <div className="oi-section">
        <button className="oi-section-toggle" onClick={() => setExpanded(!expanded)}>
          <span className="oi-label">ENTITY DETAILS</span>
          <ChevronDown size={16} className={expanded ? 'oi-rot' : ''} />
        </button>
        {expanded && (
          <motion.div
            className="oi-card"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="oi-detail-row">
              <Building2 size={16} className="oi-detail-icon" />
              <span className="oi-detail-label">Entity Type</span>
              <span className="oi-detail-value">{ORG_CHARTER.type}</span>
            </div>
            <div className="oi-detail-row">
              <MapPin size={16} className="oi-detail-icon" />
              <span className="oi-detail-label">Jurisdiction</span>
              <span className="oi-detail-value">{ORG_CHARTER.jurisdiction}</span>
            </div>
            <div className="oi-detail-row">
              <Users size={16} className="oi-detail-icon" />
              <span className="oi-detail-label">Registered Agent</span>
              <span className="oi-detail-value">{ORG_CHARTER.registeredAgent}</span>
            </div>
            <div className="oi-detail-row">
              <Calendar size={16} className="oi-detail-icon" />
              <span className="oi-detail-label">Annual Filing</span>
              <span className="oi-detail-value">{ORG_CHARTER.annualFiling}</span>
            </div>
            <div className="oi-detail-row">
              <Zap size={16} className="oi-detail-icon" />
              <span className="oi-detail-label">Multi-Sig Policy</span>
              <span className="oi-detail-value">{ORG_PROFILE.multiSigConfig}</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Operators */}
      <div className="oi-section">
        <div className="oi-section-head">
          <span className="oi-label">AUTHORIZED OPERATORS</span>
          <span className="oi-count">{ORG_MEMBERS.length} members</span>
        </div>
        <div className="oi-card oi-members-grid">
          {sortedMembers.map((member, i) => (
            <motion.div
              key={member.id}
              className="oi-member-row"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.15 + i * 0.04 }}
              whileHover={{ y: -2 }}
            >
              <div className="oi-member-avatar">
                {member.avatar ? (
                  <img src={member.avatar} alt={member.name} />
                ) : (
                  <div className="oi-avatar-initials">{member.initials}</div>
                )}
                <div className={`oi-status-dot oi-status-${member.status}`} />
              </div>
              <div className="oi-member-info">
                <div className="oi-member-name">{member.name}</div>
                <div className="oi-member-role">{member.role}</div>
              </div>
              {member.signer && (
                <span className="oi-badge oi-badge-signer">
                  <Sparkles size={12} />
                  L{member.signerLevel}
                </span>
              )}
              {member.permissions && member.permissions.length > 0 && (
                <div className="oi-perms">
                  {member.permissions.slice(0, 2).map((p, j) => (
                    <span key={j} className="oi-perm-tag">{p}</span>
                  ))}
                  {member.permissions.length > 2 && (
                    <span className="oi-perm-tag oi-perm-more">+{member.permissions.length - 2}</span>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Credentials */}
      <div className="oi-section">
        <div className="oi-label">VERIFIED CREDENTIALS</div>
        <div className="oi-card oi-creds-grid">
          {ORG_CREDENTIALS.map((cred, i) => (
            <motion.div
              key={cred.id}
              className="oi-cred-row"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: 0.15 + i * 0.05 }}
              whileHover={{ y: -4 }}
            >
              <div className="oi-cred-icon">
                <CredIcon type={cred.type} />
              </div>
              <div className="oi-cred-info">
                <div className="oi-cred-name">{cred.name}</div>
                <div className="oi-cred-issuer">{cred.issuer}</div>
                <div className="oi-cred-dates">
                  <span>Issued: {cred.issued}</span>
                  <span>Expires: {cred.expires}</span>
                </div>
              </div>
              <span className={`oi-cred-status oi-cred-status-${cred.status}`}>
                {cred.status === 'active' ? '✓ Active' : '⚡ Renewing'}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Verifications */}
      <div className="oi-section">
        <div className="oi-label">ENTITY VERIFICATIONS</div>
        <div className="oi-card oi-verif-list">
          {verifications.map((v, i) => (
            <motion.div
              key={v.id}
              className="oi-verif-row"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: 0.15 + i * 0.06 }}
            >
              <CheckCircle2 size={20} className="oi-verif-icon" />
              <div className="oi-verif-info">
                <div className="oi-verif-name">{v.name}</div>
                <div className="oi-verif-date">{v.date}</div>
              </div>
              <span className="oi-badge oi-badge-zkp">ZKP Verified</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Compliance Health */}
      <div className="oi-section">
        <div className="oi-section-head">
          <span className="oi-label">COMPLIANCE HEALTH</span>
          <span className="oi-health-badge">
            <TrendingUp size={10} />
            Healthy
          </span>
        </div>
        <div className="oi-card oi-health-grid">
          {complianceMetrics.map((m, i) => (
            <motion.div
              key={m.label}
              className="oi-health-item"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: 0.1 + i * 0.05 }}
            >
              <div className="oi-health-icon">{m.icon}</div>
              <div className="oi-health-value" style={{ color: m.color }}>{m.value}</div>
              <div className="oi-health-label">{m.label}</div>
              {m.max && (
                <div className="oi-health-bar">
                  <div className="oi-health-fill" style={{ width: `${(parseInt(m.value) / m.max) * 100}%`, background: m.color }} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Audit Trail */}
      <div className="oi-section">
        <div className="oi-section-head">
          <span className="oi-label">AUDIT TRAIL</span>
          <span className="oi-count">{auditTrail.length} events</span>
        </div>
        <div className="oi-card oi-audit-list">
          {auditTrail.map((evt, i) => (
            <motion.div
              key={evt.id}
              className="oi-audit-row"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: 0.1 + i * 0.04 }}
            >
              <div className={`oi-audit-dot ${evt.type}`}>
                {evt.type === 'success' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
              </div>
              <div className="oi-audit-copy">
                <div className="oi-audit-action">{evt.action}</div>
                <div className="oi-audit-meta">{evt.actor} · {evt.time}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Footer Stats ── */}
      <div className="cm-net-stats">
        <div className="cm-net-stat">
          <Building2 size={12} color="var(--gold)" />
          <span>Entity Active</span>
        </div>
        <div className="cm-net-divider" />
        <div className="cm-net-stat">
          <Users size={12} color="var(--gold)" />
          <span>{ORG_MEMBERS.length} Operators</span>
        </div>
        <div className="cm-net-divider" />
        <div className="cm-net-stat">
          <ShieldCheck size={12} color="#34d399" />
          <span>KYB 94%</span>
        </div>
      </div>
    </motion.div>
  );
}
