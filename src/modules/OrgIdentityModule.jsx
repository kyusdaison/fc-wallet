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
  Badge,
  Zap,
} from 'lucide-react';
import { ORG_PROFILE, ORG_CHARTER, ORG_MEMBERS, ORG_CREDENTIALS } from '../data/mockData';
import './OrgIdentityModule.css';

export default function OrgIdentityModule() {
  const [expandedDetails, setExpandedDetails] = useState(false);

  // Mock verification history
  const verifications = [
    { id: 1, name: 'Corporate Existence Proof', verified: true, date: 'Mar 28' },
    { id: 2, name: 'AML Compliance Status', verified: true, date: 'Mar 15' },
    { id: 3, name: 'Authorized Signatory List', verified: true, date: 'Mar 10' },
  ];

  // Sort members: online first, then by role
  const sortedMembers = [...ORG_MEMBERS].sort((a, b) => {
    if (a.status === 'online' && b.status !== 'online') return -1;
    if (a.status !== 'online' && b.status === 'online') return 1;
    return 0;
  });

  // Get credential icon component
  const getCredentialIcon = (type) => {
    const iconProps = { size: 20, className: 'credential-icon' };
    switch (type) {
      case 'certificate':
        return <FileText {...iconProps} />;
      case 'legal':
        return <Landmark {...iconProps} />;
      case 'compliance':
        return <ShieldCheck {...iconProps} />;
      case 'security':
        return <Lock {...iconProps} />;
      case 'domain':
        return <Globe {...iconProps} />;
      default:
        return <FileText {...iconProps} />;
    }
  };

  return (
    <motion.div
      className="module-content org-identity-module"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* ENTITY IDENTITY HERO SECTION */}
      <motion.div
        className="entity-hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="entity-hero-content">
          {/* Avatar */}
          <div className="entity-avatar">
            <div className="avatar-wrapper">
              <Building2 size={40} className="avatar-icon" />
            </div>
          </div>

          {/* Entity Identity Info */}
          <div className="entity-info">
            <h1 className="entity-name">{ORG_CHARTER.entityName}</h1>
            <p className="entity-id">{ORG_CHARTER.entityId}</p>

            {/* Status Pills */}
            <div className="status-pills">
              <span className="pill pill-active">
                {ORG_PROFILE.status === 'active' ? '✓ Active Entity' : 'Inactive'}
              </span>
              <span className="pill pill-gold">
                {ORG_PROFILE.multiSigConfig}
              </span>
            </div>

            {/* Registration Info */}
            <p className="registration-info">
              {ORG_CHARTER.type} · {ORG_CHARTER.jurisdiction}
            </p>
            <p className="registration-date">
              <Calendar size={14} className="inline-icon" />
              Registered {ORG_CHARTER.registrationDate}
            </p>
          </div>
        </div>

        {/* Charter NFT Badge */}
        <motion.div
          className="charter-badge"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <Sparkles size={16} className="sparkle-icon" />
          <span>{ORG_CHARTER.charterNft}</span>
        </motion.div>
      </motion.div>

      {/* ENTITY DETAILS SECTION */}
      <motion.section
        className="details-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <button
          className="section-header"
          onClick={() => setExpandedDetails(!expandedDetails)}
        >
          <span className="section-title">ENTITY DETAILS</span>
          <motion.div
            animate={{ rotate: expandedDetails ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </button>

        {expandedDetails && (
          <motion.div
            className="details-content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="details-grid">
              <div className="detail-row">
                <Building2 size={16} className="detail-icon" />
                <div className="detail-content">
                  <span className="detail-label">Entity Type</span>
                  <span className="detail-value">{ORG_CHARTER.type}</span>
                </div>
              </div>

              <div className="detail-row">
                <MapPin size={16} className="detail-icon" />
                <div className="detail-content">
                  <span className="detail-label">Jurisdiction</span>
                  <span className="detail-value">{ORG_CHARTER.jurisdiction}</span>
                </div>
              </div>

              <div className="detail-row">
                <Users size={16} className="detail-icon" />
                <div className="detail-content">
                  <span className="detail-label">Registered Agent</span>
                  <span className="detail-value">{ORG_CHARTER.registeredAgent}</span>
                </div>
              </div>

              <div className="detail-row">
                <Calendar size={16} className="detail-icon" />
                <div className="detail-content">
                  <span className="detail-label">Annual Filing</span>
                  <span className="detail-value">{ORG_CHARTER.annualFiling}</span>
                </div>
              </div>

              <div className="detail-row">
                <Zap size={16} className="detail-icon" />
                <div className="detail-content">
                  <span className="detail-label">Multi-Sig Policy</span>
                  <span className="detail-value">{ORG_PROFILE.multiSigConfig}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.section>

      {/* AUTHORIZED OPERATORS SECTION */}
      <motion.section
        className="members-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <div className="section-header-static">
          <span className="section-title">AUTHORIZED OPERATORS</span>
          <span className="member-badge">{ORG_MEMBERS.length} members</span>
        </div>

        <div className="members-grid">
          {sortedMembers.map((member, index) => (
            <motion.div
              key={member.id}
              className="member-card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
              whileHover={{ y: -4 }}
            >
              {/* Avatar */}
              <div className="member-avatar-wrapper">
                {member.avatar ? (
                  <img src={member.avatar} alt={member.name} className="member-avatar-img" />
                ) : (
                  <div className="member-avatar-initials">
                    {member.initials}
                  </div>
                )}
                <div className={`status-dot ${member.status}`} title={member.status} />
              </div>

              {/* Member Info */}
              <div className="member-info">
                <h4 className="member-name">{member.name}</h4>
                <p className="member-role">{member.role}</p>

                {/* Badges */}
                <div className="member-badges">
                  {member.signer && (
                    <span className="badge badge-signer">
                      <Sparkles size={12} />
                      Signer L{member.signerLevel}
                    </span>
                  )}
                </div>

                {/* Permissions */}
                {member.permissions && member.permissions.length > 0 && (
                  <div className="member-permissions">
                    {member.permissions.slice(0, 2).map((perm, i) => (
                      <span key={i} className="permission-tag">
                        {perm}
                      </span>
                    ))}
                    {member.permissions.length > 2 && (
                      <span className="permission-tag permission-more">
                        +{member.permissions.length - 2}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* VERIFIED CREDENTIALS SECTION */}
      <motion.section
        className="credentials-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <div className="section-header-static">
          <span className="section-title">VERIFIED CREDENTIALS</span>
        </div>

        <div className="credentials-grid">
          {ORG_CREDENTIALS.map((cred, index) => (
            <motion.div
              key={cred.id}
              className="credential-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.06 }}
              whileHover={{ y: -6, boxShadow: '0 12px 32px rgba(212, 175, 55, 0.15)' }}
            >
              {/* Icon */}
              <div className="credential-icon-wrapper">
                {getCredentialIcon(cred.type)}
              </div>

              {/* Credential Info */}
              <div className="credential-info">
                <h4 className="credential-name">{cred.name}</h4>
                <p className="credential-issuer">{cred.issuer}</p>

                <div className="credential-dates">
                  <span className="date-label">Issued:</span>
                  <span className="date-value">{cred.issued}</span>
                  <span className="date-label">Expires:</span>
                  <span className="date-value">{cred.expires}</span>
                </div>

                {/* Status Badge */}
                <div className="credential-status">
                  <span className={`status-badge status-${cred.status}`}>
                    {cred.status === 'active' ? '✓ Active' : '⚡ Renewing'}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ENTITY VERIFICATIONS SECTION */}
      <motion.section
        className="verifications-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <div className="section-header-static">
          <span className="section-title">ENTITY VERIFICATIONS</span>
        </div>

        <div className="verifications-list">
          {verifications.map((v, index) => (
            <motion.div
              key={v.id}
              className="verification-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.08 }}
            >
              <CheckCircle2 size={24} className="verification-icon" />
              <div className="verification-content">
                <h5 className="verification-name">{v.name}</h5>
                <p className="verification-date">{v.date}</p>
              </div>
              <span className="verification-badge">ZKP Verified</span>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}
