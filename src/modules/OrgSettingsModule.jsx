import React, { useState, Fragment } from 'react';
import { motion } from 'framer-motion';
import {
  Lock,
  Edit2,
  Plus,
  Clock,
  Zap,
  FileText,
  Shield,
  Settings,
} from 'lucide-react';
import { ORG_PROFILE, ORG_MEMBERS, ORG_TREASURY, ORG_AUDIT_LOG } from '../data/mockData';

/* ---- Micro-components ---- */
const Toggle = ({ enabled, onToggle }) => (
  <button
    type="button"
    className={`ost-toggle ${enabled ? 'active' : ''}`}
    onClick={onToggle}
    aria-pressed={enabled}
  >
    <span className="ost-toggle-knob"></span>
  </button>
);

const OstRow = ({ icon, label, desc, right }) => (
  <div className="ost-row">
    {icon && <div className="ost-row-icon">{icon}</div>}
    <div className="ost-row-copy">
      <div className="ost-row-label">{label}</div>
      {desc && <div className="ost-row-desc">{desc}</div>}
    </div>
    {right && <div className="ost-row-trail">{right}</div>}
  </div>
);

const Divider = () => <div className="ost-divider" />;

/* ---- ORG SETTINGS MODULE ---- */
const OrgSettingsModule = ({ isTab = false, onClose }) => {
  // ===== SECURITY TOGGLES STATE =====
  const [biometricRequired, setBiometricRequired] = useState(true);
  const [geoFenceEnabled, setGeoFenceEnabled] = useState(false);
  const [autoLockEnabled, setAutoLockEnabled] = useState(true);
  const [emergencyFreezeEnabled, setEmergencyFreezeEnabled] = useState(false);

  // ===== SIGNING POLICIES DATA =====
  const signingPolicies = [
    { operation: 'Internal Transfer', threshold: '1 of 3', color: 'var(--blue)' },
    { operation: 'External Payment', threshold: '2 of 3', color: 'var(--gold)' },
    { operation: 'Payroll Batch', threshold: '3 of 3', color: 'var(--green)' },
    { operation: 'Policy Change', threshold: '2 of 3', color: 'var(--gold)' },
    { operation: 'Bridge/Swap', threshold: '2 of 3', color: 'var(--blue)' },
    { operation: 'Emergency Lock', threshold: '1 of 3', color: '#ff6b6b' },
  ];

  // ===== SECURITY TOGGLES DATA =====
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

  return (
    <motion.div
      className="ost-page"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* ===== HEADER ===== */}
      <div className="ost-header">
        <div className="ost-header-title">Organization Settings</div>
        <div className="ost-header-sub">
          {ORG_PROFILE.entityId} · Enterprise management
        </div>
      </div>

      {/* ===== SIGNING POLICIES ===== */}
      <div className="ost-section">
        <div className="ost-label">SIGNING POLICIES</div>
        <div className="ost-card">
          {signingPolicies.map((policy, idx) => (
            <Fragment key={idx}>
              {idx > 0 && <Divider />}
              <div className="ost-policy-row">
                <span className="ost-policy-op">{policy.operation}</span>
                <span
                  className="ost-policy-thr"
                  style={{ color: policy.color }}
                >
                  {policy.threshold}
                </span>
                <button className="ost-edit-btn" aria-label="Edit policy">
                  <Edit2 size={13} />
                </button>
              </div>
            </Fragment>
          ))}
        </div>
      </div>

      {/* ===== TEAM & ROLES ===== */}
      <div className="ost-section">
        <div className="ost-label">TEAM & ROLES</div>
        <div className="ost-card">
          {ORG_MEMBERS.map((member, idx) => (
            <Fragment key={member.id}>
              {idx > 0 && <Divider />}
              <div className="ost-member-row">
                <div className="ost-member-avatar">
                  {member.avatar ? (
                    <img src={member.avatar} alt={member.name} />
                  ) : (
                    <span>{member.initials}</span>
                  )}
                </div>
                <div className="ost-member-copy">
                  <div className="ost-member-name">{member.name}</div>
                  <div className="ost-member-role">{member.role}</div>
                </div>
                <div className="ost-member-trail">
                  <div className={`ost-dot ${member.status}`} />
                  {member.signer && (
                    <span className="ost-signer-badge">
                      <Lock size={10} /> Signer
                    </span>
                  )}
                </div>
              </div>
            </Fragment>
          ))}
          <button className="ost-invite-btn">
            <Plus size={14} /> Invite Member
          </button>
        </div>
      </div>

      {/* ===== VAULT RULES ===== */}
      <div className="ost-section">
        <div className="ost-label">VAULT RULES</div>
        <div className="ost-vault-grid">
          {ORG_TREASURY.vaults.map((vault) => (
            <div key={vault.id} className="ost-vault-card">
              <div
                className="ost-vault-accent"
                style={{ background: vault.color }}
              />
              <div className="ost-vault-name">{vault.name}</div>
              <div className="ost-vault-bal">{vault.balance}</div>
              <div className="ost-vault-meta">
                {vault.pct}% · Limit: {vault.limit}
              </div>
              {vault.id === 'reserve' && (
                <div className="ost-vault-lock">
                  <Clock size={11} /> 24h cooling
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ===== AUDIT LOG ===== */}
      <div className="ost-section">
        <div className="ost-label">RECENT AUDIT LOG</div>
        <div className="ost-card">
          {ORG_AUDIT_LOG.map((entry, idx) => (
            <Fragment key={entry.id}>
              {idx > 0 && <Divider />}
              <div className="ost-audit-row">
                <div className="ost-audit-icon">
                  {entry.type === 'signing' && (
                    <FileText size={14} color="var(--gold)" />
                  )}
                  {entry.type === 'transfer' && (
                    <Zap size={14} color="var(--blue)" />
                  )}
                  {entry.type === 'auth' && (
                    <Lock size={14} color="var(--green)" />
                  )}
                  {entry.type === 'policy' && (
                    <Settings size={14} color="var(--gold)" />
                  )}
                  {entry.type === 'credential' && (
                    <Shield size={14} color="var(--blue)" />
                  )}
                  {entry.type === 'distribution' && (
                    <FileText size={14} color="var(--green)" />
                  )}
                </div>
                <div className="ost-audit-copy">
                  <div className="ost-audit-action">{entry.action}</div>
                  <div className="ost-audit-detail">{entry.detail}</div>
                </div>
                <div className="ost-audit-time">
                  <div>{entry.time}</div>
                  <div className="ost-audit-operator">{entry.operator}</div>
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      </div>

      {/* ===== ENTERPRISE SECURITY ===== */}
      <div className="ost-section">
        <div className="ost-label">ENTERPRISE SECURITY</div>
        <div className="ost-card">
          {securityToggles.map((toggle, idx) => (
            <Fragment key={toggle.id}>
              {idx > 0 && <Divider />}
              <div
                className={`ost-toggle-row ${
                  toggle.tone === 'danger' ? 'danger' : ''
                }`}
              >
                <span className="ost-toggle-label">{toggle.label}</span>
                <Toggle
                  enabled={toggle.state}
                  onToggle={() => toggle.setState(!toggle.state)}
                />
              </div>
            </Fragment>
          ))}
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <div className="ost-footer">FC Wallet Enterprise v2.4.0 · Org Mode</div>
    </motion.div>
  );
};

export default OrgSettingsModule;
