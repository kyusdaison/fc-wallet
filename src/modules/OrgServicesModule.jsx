import React from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  FileText,
  Users,
  TrendingUp,
  Shield,
  Check,
  AlertCircle,
  Clock,
  DollarSign,
  PieChart,
} from 'lucide-react';
import { ORG_CHARTER, ORG_EQUITY, ORG_REVENUE, ORG_CREDENTIALS } from '../data/mockData';

const OrgServicesModule = () => {
  const containerVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const getCredentialIcon = (type) => {
    switch (type) {
      case 'license':
        return <FileText size={18} />;
      case 'tax':
        return <DollarSign size={18} />;
      case 'compliance':
        return <Shield size={18} />;
      case 'data':
        return <Shield size={18} />;
      case 'trade':
        return <Building2 size={18} />;
      default:
        return <Check size={18} />;
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
        return <Check size={14} />;
      case 'pending_renewal':
        return <AlertCircle size={14} />;
      case 'expired':
        return <AlertCircle size={14} />;
      default:
        return <Clock size={14} />;
    }
  };

  return (
    <motion.div
      className="module-content services-shell"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* Hero Section */}
      <motion.div
        className="services-hero"
        style={{
          background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.08) 0%, rgba(59, 130, 246, 0.05) 100%)',
          borderLeft: '3px solid var(--gold)',
          borderRadius: '12px',
          padding: '24px 20px',
          marginBottom: '24px',
        }}
        variants={itemVariants}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <Building2
            size={28}
            style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '2px' }}
          />
          <div style={{ flex: 1 }}>
            <p style={{ color: 'var(--gold)', fontSize: '12px', fontWeight: '600', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '4px' }}>
              ENTERPRISE REGISTRY
            </p>
            <h2 style={{ color: 'var(--text-primary)', fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>
              Corporate Governance
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.5', marginBottom: '12px' }}>
              Charter, equity structure, and regulatory credentials for NexaCorp Limited
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span
                style={{
                  background: 'var(--gold)',
                  color: '#000',
                  fontSize: '11px',
                  fontWeight: '600',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  textTransform: 'uppercase',
                }}
              >
                4 Items
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Company Charter NFT Card */}
      <motion.div
        className="glass-card"
        style={{
          borderColor: 'var(--gold)',
          borderWidth: '1.5px',
          marginBottom: '24px',
          overflow: 'hidden',
        }}
        variants={itemVariants}
      >
        <div style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <FileText size={20} style={{ color: 'var(--gold)' }} />
            <h3 style={{ color: 'var(--text-primary)', fontSize: '16px', fontWeight: '600' }}>
              Company Charter NFT
            </h3>
          </div>

          {/* Charter Content */}
          <div style={{ backgroundColor: 'var(--surface-2)', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div>
                <p style={{ color: 'var(--text-tertiary)', fontSize: '11px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '4px' }}>
                  Entity Name
                </p>
                <p style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: '600' }}>
                  {ORG_CHARTER.entityName}
                </p>
              </div>
              <div>
                <p style={{ color: 'var(--text-tertiary)', fontSize: '11px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '4px' }}>
                  Entity ID
                </p>
                <p style={{ color: 'var(--gold)', fontSize: '14px', fontWeight: '600', fontFamily: 'monospace' }}>
                  {ORG_CHARTER.entityId}
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div>
                <p style={{ color: 'var(--text-tertiary)', fontSize: '11px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '4px' }}>
                  Registration Date
                </p>
                <p style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: '600' }}>
                  {ORG_CHARTER.registrationDate}
                </p>
              </div>
              <div>
                <p style={{ color: 'var(--text-tertiary)', fontSize: '11px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '4px' }}>
                  Jurisdiction
                </p>
                <p style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: '600' }}>
                  {ORG_CHARTER.jurisdiction}
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <p style={{ color: 'var(--text-tertiary)', fontSize: '11px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '4px' }}>
                  NFT ID
                </p>
                <p style={{ color: 'var(--gold)', fontSize: '13px', fontWeight: '600', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                  {ORG_CHARTER.charterNft}
                </p>
              </div>
              <div>
                <p style={{ color: 'var(--text-tertiary)', fontSize: '11px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '4px' }}>
                  Company Type
                </p>
                <p style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: '600' }}>
                  {ORG_CHARTER.type}
                </p>
              </div>
            </div>
          </div>

          {/* Status & Agent Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: 'rgba(212, 175, 55, 0.1)',
                color: 'var(--gold)',
                padding: '6px 10px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: '600',
              }}
            >
              <Check size={14} />
              {ORG_CHARTER.charterStatus}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <p style={{ color: 'var(--text-tertiary)', fontSize: '11px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '4px' }}>
                Registered Agent
              </p>
              <p style={{ color: 'var(--text-primary)', fontSize: '13px', fontWeight: '500' }}>
                {ORG_CHARTER.registeredAgent}
              </p>
            </div>
            <div>
              <p style={{ color: 'var(--text-tertiary)', fontSize: '11px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '4px' }}>
                Annual Filing
              </p>
              <p style={{ color: 'var(--text-primary)', fontSize: '13px', fontWeight: '500' }}>
                {ORG_CHARTER.annualFiling}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Equity Structure Section */}
      <motion.div variants={itemVariants}>
        <h3
          className="section-title"
          style={{
            color: 'var(--gold)',
            fontSize: '12px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <PieChart size={16} />
          EQUITY STRUCTURE
        </h3>

        {/* Ownership Percentage Bar */}
        <div
          className="glass-card"
          style={{
            padding: '16px',
            marginBottom: '16px',
          }}
        >
          <p style={{ color: 'var(--text-tertiary)', fontSize: '11px', fontWeight: '500', marginBottom: '8px' }}>
            Ownership Distribution
          </p>
          <div style={{ display: 'flex', height: '24px', borderRadius: '4px', overflow: 'hidden', gap: '2px' }}>
            {ORG_EQUITY.map((shareholder) => (
              <div
                key={shareholder.holder}
                style={{
                  flex: shareholder.pct,
                  backgroundColor: shareholder.color,
                  opacity: 0.8,
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  fontWeight: '600',
                  color: shareholder.color === 'var(--gold)' ? '#000' : '#fff',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s',
                }}
                title={`${shareholder.holder}: ${shareholder.pct}%`}
              >
                {shareholder.pct > 12 && `${shareholder.pct}%`}
              </div>
            ))}
          </div>
        </div>

        {/* Shareholders List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {ORG_EQUITY.map((shareholder) => (
            <div
              key={shareholder.holder}
              className="glass-card"
              style={{
                padding: '14px',
                borderLeft: `3px solid ${shareholder.color}`,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div>
                  <p style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: '600' }}>
                    {shareholder.holder}
                  </p>
                  <p style={{ color: 'var(--text-tertiary)', fontSize: '12px' }}>
                    {shareholder.role}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ color: shareholder.color, fontSize: '16px', fontWeight: '700' }}>
                    {shareholder.pct}%
                  </p>
                  <p style={{ color: 'var(--text-tertiary)', fontSize: '11px' }}>
                    {shareholder.shares.toLocaleString()} shares
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: '500',
                    color: 'var(--text-tertiary)',
                    background: 'var(--surface-2)',
                    padding: '3px 8px',
                    borderRadius: '3px',
                    textTransform: 'capitalize',
                  }}
                >
                  {shareholder.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Revenue & Distributions Section */}
      <motion.div variants={itemVariants} style={{ marginTop: '24px' }}>
        <h3
          className="section-title"
          style={{
            color: 'var(--gold)',
            fontSize: '12px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <TrendingUp size={16} />
          REVENUE & PROFIT-SHARING
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {ORG_REVENUE.map((revenue) => (
            <div key={revenue.id} className="glass-card" style={{ padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <p style={{ color: 'var(--text-tertiary)', fontSize: '11px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '4px' }}>
                    {revenue.period}
                  </p>
                  <p style={{ color: 'var(--text-primary)', fontSize: '18px', fontWeight: '700' }}>
                    {revenue.gross}
                  </p>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: 'rgba(16, 185, 129, 0.1)',
                    color: 'var(--green)',
                    padding: '6px 10px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: '600',
                    textTransform: 'capitalize',
                  }}
                >
                  <Check size={14} />
                  {revenue.status}
                </div>
              </div>

              {/* Distribution Breakdown */}
              <div style={{ marginBottom: '12px' }}>
                <p style={{ color: 'var(--text-tertiary)', fontSize: '10px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.3px', marginBottom: '8px' }}>
                  Distribution Breakdown
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {revenue.distributions.map((dist, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                        {dist.to}
                      </span>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <div
                          style={{
                            height: '8px',
                            width: '80px',
                            backgroundColor: 'var(--surface-2)',
                            borderRadius: '2px',
                            overflow: 'hidden',
                          }}
                        >
                          <div
                            style={{
                              height: '100%',
                              width: `${dist.pct}%`,
                              backgroundColor: idx === 0 ? 'var(--gold)' : idx === 1 ? 'var(--blue)' : 'var(--green)',
                            }}
                          />
                        </div>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '12px', fontWeight: '600', width: '40px', textAlign: 'right' }}>
                          {dist.pct}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Enterprise Credentials Section */}
      <motion.div variants={itemVariants} style={{ marginTop: '24px', marginBottom: '40px' }}>
        <h3
          className="section-title"
          style={{
            color: 'var(--gold)',
            fontSize: '12px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <Shield size={16} />
          ENTERPRISE CREDENTIALS
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {ORG_CREDENTIALS.map((credential) => (
            <div
              key={credential.id}
              className="glass-card"
              style={{
                padding: '14px',
                borderLeft: `3px solid ${getStatusColor(credential.status)}`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div
                  style={{
                    color: 'var(--gold)',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}
                >
                  {getCredentialIcon(credential.type)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '6px' }}>
                    <p style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: '600' }}>
                      {credential.name}
                    </p>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px',
                        color: getStatusColor(credential.status),
                        fontSize: '11px',
                        fontWeight: '600',
                        textTransform: 'capitalize',
                        flexShrink: 0,
                      }}
                    >
                      {getStatusIcon(credential.status)}
                      {credential.status.replace('_', ' ')}
                    </div>
                  </div>

                  <p style={{ color: 'var(--text-tertiary)', fontSize: '12px', marginBottom: '8px' }}>
                    Issued by {credential.issuer}
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px' }}>
                    <div>
                      <p style={{ color: 'var(--text-tertiary)', fontSize: '10px', fontWeight: '500', marginBottom: '2px' }}>
                        Issued
                      </p>
                      <p style={{ color: 'var(--text-primary)', fontWeight: '500' }}>
                        {credential.issued}
                      </p>
                    </div>
                    <div>
                      <p style={{ color: 'var(--text-tertiary)', fontSize: '10px', fontWeight: '500', marginBottom: '2px' }}>
                        Expires
                      </p>
                      <p style={{ color: credential.status === 'expired' ? '#EF4444' : 'var(--text-primary)', fontWeight: '500' }}>
                        {credential.expires}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OrgServicesModule;
