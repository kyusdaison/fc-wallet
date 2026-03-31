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
      className="oi-page"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Hero */}
      <div className="oi-hero">
        <div className="oi-avatar">
          <Building2 size={28} />
        </div>
        <div className="oi-hero-copy">
          <div className="oi-entity-name">{ORG_CHARTER.entityName}</div>
          <div className="oi-entity-id">{ORG_CHARTER.entityId}</div>
          <div className="oi-pills">
            <span className="oi-pill oi-pill-active">✓ Active</span>
            <span className="oi-pill oi-pill-gold">{ORG_PROFILE.multiSigConfig}</span>
          </div>
        </div>
        <motion.div
          className="oi-charter-nft"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <Sparkles size={13} />
          <span>{ORG_CHARTER.charterNft}</span>
        </motion.div>
      </div>
      <div className="oi-hero-meta">
        {ORG_CHARTER.type} · {ORG_CHARTER.jurisdiction} · Registered {ORG_CHARTER.registrationDate}
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
    </motion.div>
  );
}
