import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings,
  Lock,
  Users,
  Vault,
  FileText,
  Shield,
  MapPin,
  Clock,
  AlertCircle,
  Edit2,
  Plus,
  CheckCircle2,
  Circle,
  Zap,
  Eye,
  EyeOff,
} from 'lucide-react';
import { ORG_PROFILE, ORG_MEMBERS, ORG_TREASURY, ORG_AUDIT_LOG } from '../data/mockData';

// --- ORG SETTINGS MODULE (Enterprise Settings Hub) ---
const OrgSettingsModule = ({ isTab = false, onClose }) => {
  // ===== SECURITY TOGGLES STATE =====
  const [biometricRequired, setBiometricRequired] = useState(true);
  const [geoFenceEnabled, setGeoFenceEnabled] = useState(false);
  const [autoLockEnabled, setAutoLockEnabled] = useState(true);
  const [emergencyFreezeEnabled, setEmergencyFreezeEnabled] = useState(false);

  // ===== RENDER: HERO SECTION =====
  const renderHero = () => (
    <motion.div
      className="org-settings-hero"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className="org-settings-hero-kicker">ORGANIZATION SETTINGS</div>
      <div className="org-settings-hero-title">{ORG_PROFILE.name}</div>
      <div className="org-settings-hero-subtitle">
        {ORG_PROFILE.entityId} · Manage signing policies, members, vault rules, and enterprise security.
      </div>
    </motion.div>
  );

  // ===== RENDER: SIGNING POLICIES SECTION =====
  const signingPolicies = [
    { operation: 'Internal Transfer', threshold: '1 of 3', color: 'var(--blue)' },
    { operation: 'External Payment', threshold: '2 of 3', color: 'var(--gold)' },
    { operation: 'Payroll Batch', threshold: '3 of 3', color: 'var(--green)' },
    { operation: 'Policy Change', threshold: '2 of 3', color: 'var(--gold)' },
    { operation: 'Bridge/Swap', threshold: '2 of 3', color: 'var(--blue)' },
    { operation: 'Emergency Lock', threshold: '1 of 3', color: '#ff6b6b' },
  ];

  const renderSigningPolicies = () => (
    <motion.div
      className="org-settings-section"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="section-title">SIGNING POLICIES</div>
      <div className="glass-panel org-policies-grid">
        {signingPolicies.map((policy, idx) => (
          <div key={idx} className="org-policy-row">
            <div className="org-policy-operation">{policy.operation}</div>
            <div className="org-policy-threshold" style={{ color: policy.color, fontWeight: 600 }}>
              {policy.threshold}
            </div>
            <button className="org-policy-edit-btn" aria-label="Edit policy">
              <Edit2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );

  // ===== RENDER: MEMBER MANAGEMENT SECTION =====
  const renderMembers = () => (
    <motion.div
      className="org-settings-section"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="section-title">TEAM & ROLES</div>
      <div className="glass-panel org-members-container">
        {ORG_MEMBERS.map((member) => (
          <div key={member.id} className="org-member-card">
            <div className="org-member-avatar">
              {member.avatar ? (
                <img src={member.avatar} alt={member.name} />
              ) : (
                <div className="org-member-initials">{member.initials}</div>
              )}
            </div>
            <div className="org-member-info">
              <div className="org-member-name">{member.name}</div>
              <div className="org-member-role">{member.role}</div>
            </div>
            <div className="org-member-status-container">
              <div className={`org-member-status-dot ${member.status}`}></div>
              <div className="org-member-status-label">{member.status}</div>
            </div>
            {member.signer && (
              <div className="org-member-signer-badge">
                <Lock size={12} />
                Signer
              </div>
            )}
            {member.permissions && (
              <div className="org-member-permissions">
                {member.permissions.slice(0, 2).map((perm, idx) => (
                  <span key={idx} className="org-member-permission-tag">
                    {perm}
                  </span>
                ))}
                {member.permissions.length > 2 && (
                  <span className="org-member-permission-tag">+{member.permissions.length - 2}</span>
                )}
              </div>
            )}
          </div>
        ))}
        <button className="org-member-invite-btn">
          <Plus size={16} />
          Invite Member
        </button>
      </div>
    </motion.div>
  );

  // ===== RENDER: VAULT RULES SECTION =====
  const renderVaultRules = () => (
    <motion.div
      className="org-settings-section"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="section-title">VAULT RULES</div>
      <div className="org-vaults-container">
        {ORG_TREASURY.vaults.map((vault, idx) => (
          <div key={vault.id} className="glass-card org-vault-card">
            <div
              className="org-vault-left-border"
              style={{ backgroundColor: vault.color }}
            ></div>
            <div className="org-vault-header">
              <div className="org-vault-name">{vault.name}</div>
              <div className="org-vault-icon" style={{ color: vault.color }}>
                {vault.icon === 'activity' && <Zap size={18} />}
                {vault.icon === 'banknote' && <FileText size={18} />}
                {vault.icon === 'shield' && <Shield size={18} />}
              </div>
            </div>
            <div className="org-vault-balance">{vault.balance}</div>
            <div className="org-vault-pct">{vault.pct}% of total</div>
            <div className="org-vault-limit">
              <span className="org-vault-limit-label">Limit:</span>
              <span className="org-vault-limit-value">{vault.limit}</span>
            </div>
            {vault.id === 'reserve' && (
              <div className="org-vault-timelock-note">
                <Clock size={12} />
                Time Lock: 24h cooling period
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );

  // ===== RENDER: AUDIT LOG SECTION =====
  const renderAuditLog = () => (
    <motion.div
      className="org-settings-section"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="section-title">RECENT AUDIT LOG</div>
      <div className="glass-panel org-audit-log">
        {ORG_AUDIT_LOG.map((entry, idx) => (
          <React.Fragment key={entry.id}>
            <div className="org-audit-row">
              <div className="org-audit-icon-col">
                {entry.type === 'signing' && <FileText size={14} color="var(--gold)" />}
                {entry.type === 'transfer' && <Zap size={14} color="var(--blue)" />}
                {entry.type === 'auth' && <Lock size={14} color="var(--green)" />}
                {entry.type === 'policy' && <Settings size={14} color="var(--gold)" />}
                {entry.type === 'credential' && <Shield size={14} color="var(--blue)" />}
                {entry.type === 'distribution' && <FileText size={14} color="var(--green)" />}
              </div>
              <div className="org-audit-content">
                <div className="org-audit-action">{entry.action}</div>
                <div className="org-audit-detail">{entry.detail}</div>
              </div>
              <div className="org-audit-meta">
                <div className="org-audit-time">{entry.time}</div>
                <div className="org-audit-operator">{entry.operator}</div>
              </div>
            </div>
            {idx < ORG_AUDIT_LOG.length - 1 && <div className="org-audit-divider"></div>}
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  );

  // ===== RENDER: SECURITY TOGGLES SECTION =====
  const securityToggles = [
    {
      id: 'biometric',
      label: 'Require biometric for all signing',
      state: biometricRequired,
      setState: setBiometricRequired,
      tone: 'default',
    },
    {
      id: 'geofence',
      label: 'Geo-fence signing regions',
      state: geoFenceEnabled,
      setState: setGeoFenceEnabled,
      tone: 'default',
    },
    {
      id: 'autolock',
      label: 'Auto-lock after 15min inactivity',
      state: autoLockEnabled,
      setState: setAutoLockEnabled,
      tone: 'default',
    },
    {
      id: 'emergency',
      label: 'Emergency entity freeze',
      state: emergencyFreezeEnabled,
      setState: setEmergencyFreezeEnabled,
      tone: 'danger',
    },
  ];

  const renderSecuritySection = () => (
    <motion.div
      className="org-settings-section"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6 }}
    >
      <div className="section-title">ENTERPRISE SECURITY</div>
      <div className="glass-panel org-security-toggles">
        {securityToggles.map((toggle, idx) => (
          <React.Fragment key={toggle.id}>
            <div
              className={`org-security-toggle-row ${toggle.tone === 'danger' ? 'org-security-danger' : ''}`}
            >
              <div className="org-security-toggle-label">{toggle.label}</div>
              <button
                className={`org-security-switch ${toggle.state ? 'org-security-switch-active' : ''}`}
                onClick={() => toggle.setState(!toggle.state)}
                aria-label={`Toggle ${toggle.label}`}
              >
                <div className="org-security-switch-thumb"></div>
              </button>
            </div>
            {idx < securityToggles.length - 1 && <div className="org-security-divider"></div>}
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  );

  // ===== MAIN RENDER =====
  return (
    <motion.div
      className="module-content org-settings-module"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {renderHero()}
      {renderSigningPolicies()}
      {renderMembers()}
      {renderVaultRules()}
      {renderAuditLog()}
      {renderSecuritySection()}
      <div className="org-settings-footer">FC Wallet Enterprise v2.4.0 • Org Mode</div>
    </motion.div>
  );
};

export default OrgSettingsModule;
