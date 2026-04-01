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
  ChevronRight,
  Building2,
  ShieldCheck,
  Users,
  Server,
  Sparkles,
  SlidersHorizontal,
  Activity,
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

/* ---- ORG SETTINGS MODULE ---- */
const OrgSettingsModule = ({ isTab = false, onClose }) => {
  const [biometricRequired, setBiometricRequired] = useState(true);
  const [geoFenceEnabled, setGeoFenceEnabled] = useState(false);
  const [autoLockEnabled, setAutoLockEnabled] = useState(true);
  const [emergencyFreezeEnabled, setEmergencyFreezeEnabled] = useState(false);

  const signingPolicies = [
    { operation: 'Internal Transfer', threshold: '1 of 3', color: 'var(--blue)' },
    { operation: 'External Payment', threshold: '2 of 3', color: 'var(--gold)' },
    { operation: 'Payroll Batch', threshold: '3 of 3', color: 'var(--green)' },
    { operation: 'Policy Change', threshold: '2 of 3', color: 'var(--gold)' },
    { operation: 'Bridge/Swap', threshold: '2 of 3', color: 'var(--blue)' },
    { operation: 'Emergency Lock', threshold: '1 of 3', color: '#ff6b6b' },
  ];

  const securityToggles = [
    { id: 'biometric', label: 'Require biometric for all signing', state: biometricRequired, setState: setBiometricRequired, tone: 'default' },
    { id: 'geofence', label: 'Geo-fence signing regions', state: geoFenceEnabled, setState: setGeoFenceEnabled, tone: 'default' },
    { id: 'autolock', label: 'Auto-lock after 15min inactivity', state: autoLockEnabled, setState: setAutoLockEnabled, tone: 'default' },
    { id: 'emergency', label: 'Emergency entity freeze', state: emergencyFreezeEnabled, setState: setEmergencyFreezeEnabled, tone: 'danger' },
  ];

  /* Quick Actions */
  const OST_ACTIONS = [
    { id: 'signing', title: 'Signing', subtitle: 'Multi-sig rules', icon: <SlidersHorizontal size={20} color="var(--gold)" />, iconClass: 'cm-icon-gold', toneClass: 'tone-gold', emphasis: 'primary' },
    { id: 'team', title: 'Team', subtitle: 'Roles & access', icon: <Users size={20} color="#10b981" />, iconClass: 'cm-icon-green', toneClass: 'tone-green', emphasis: 'primary' },
    { id: 'vaults', title: 'Vaults', subtitle: 'Treasury rules', icon: <Server size={20} color="var(--blue)" />, iconClass: 'cm-icon-blue', toneClass: 'tone-blue', emphasis: 'secondary' },
    { id: 'security', title: 'Security', subtitle: 'Enterprise lock', icon: <Shield size={20} color="#ef4444" />, iconClass: 'cm-icon-red', toneClass: 'tone-red', emphasis: 'secondary' },
  ];

  /* Menu groups with tone mapping */
  const menuGroups = [
    {
      title: 'SIGNING POLICIES',
      tone: 'gold',
      rows: signingPolicies.map((p, i) => ({
        key: `policy-${i}`,
        icon: <SlidersHorizontal size={16} color="var(--gold)" />,
        label: p.operation,
        desc: p.threshold,
        descColor: p.color,
      })),
    },
    {
      title: 'TEAM & ROLES',
      tone: 'green',
      rows: ORG_MEMBERS.map((m) => ({
        key: m.id,
        icon: <Users size={16} color="#10b981" />,
        label: m.name,
        desc: `${m.role}${m.signer ? ' · Signer' : ''}`,
        badge: m.status === 'online' ? { text: 'Online', tone: 'green' } : null,
      })),
    },
    {
      title: 'RECENT AUDIT LOG',
      tone: 'blue',
      rows: ORG_AUDIT_LOG.slice(0, 4).map((e) => ({
        key: e.id,
        icon: e.type === 'signing' ? <FileText size={16} color="var(--gold)" /> :
              e.type === 'transfer' ? <Zap size={16} color="var(--blue)" /> :
              e.type === 'auth' ? <Lock size={16} color="var(--green)" /> :
              e.type === 'policy' ? <Settings size={16} color="var(--gold)" /> :
              e.type === 'credential' ? <Shield size={16} color="var(--blue)" /> :
              <FileText size={16} color="var(--green)" />,
        label: e.action,
        desc: `${e.operator} · ${e.time}`,
      })),
    },
  ];

  const toneColors = { gold: 'var(--gold)', green: '#10b981', blue: 'var(--blue)', red: '#ef4444' };

  const activeSigners = ORG_MEMBERS.filter(m => m.signer).length;
  const totalMembers = ORG_MEMBERS.length;

  return (
    <motion.div
      className="module-content module-stack-sm osg-page"
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
            <div className="og-hero-kicker">ENTERPRISE GOVERNANCE</div>
            <div className="og-hero-title">Settings</div>
          </div>
          <div className="og-hero-badge">
            <div className="og-hero-pulse" />
            <ShieldCheck size={11} />
            Secured
          </div>
        </div>
        <div className="og-hero-stats">
          <div className="og-hero-stat">
            <span className="og-stat-value">{activeSigners}/{totalMembers}</span>
            <span className="og-stat-label">Signers</span>
          </div>
          <div className="og-hero-stat-divider" />
          <div className="og-hero-stat">
            <span className="og-stat-value">{ORG_TREASURY.vaults.length}</span>
            <span className="og-stat-label">Vaults</span>
          </div>
          <div className="og-hero-stat-divider" />
          <div className="og-hero-stat">
            <span className="og-stat-value">{signingPolicies.length}</span>
            <span className="og-stat-label">Policies</span>
          </div>
        </div>
      </div>

      {/* ── 2. Quick Actions ── */}
      <div className="home-action-grid">
        {OST_ACTIONS.map((a) => (
          <button key={a.id} type="button" className={`home-action-btn ${a.emphasis} ${a.toneClass}`}>
            <div className={`icon-wrap ${a.iconClass}`}>{a.icon}</div>
            <div className="home-action-copy">
              <span className="home-action-title">{a.title}</span>
              <span className="home-action-subtitle">{a.subtitle}</span>
            </div>
          </button>
        ))}
      </div>

      {/* ── 3. Vault Rules — glass cards ── */}
      <div className="set-menu-group">
        <div className="sh-section-head">
          <div className="section-title" style={{ margin: 0 }}>VAULT RULES</div>
          <span className="sh-section-count">{ORG_TREASURY.vaults.length} vaults</span>
        </div>
        <div className="ost-vault-grid">
          {ORG_TREASURY.vaults.map((vault) => (
            <div key={vault.id} className="ost-vault-card">
              <div className="ost-vault-accent" style={{ background: vault.color }} />
              <div className="ost-vault-name">{vault.name}</div>
              <div className="ost-vault-bal">{vault.balance}</div>
              <div className="ost-vault-meta">{vault.pct}% · Limit: {vault.limit}</div>
              {vault.id === 'reserve' && (
                <div className="ost-vault-lock"><Clock size={11} /> 24h cooling</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── 4. Menu Groups — glass rows with color bars ── */}
      {menuGroups.map(group => (
        <div key={group.title} className="set-menu-group">
          <div className="sh-section-head">
            <div className="section-title" style={{ margin: 0 }}>{group.title}</div>
            <span className="sh-section-count">{group.rows.length} items</span>
          </div>
          <div className="st-menu-list">
            {group.rows.map((row) => (
              <div key={row.key} className="st-menu-row">
                <div className="st-menu-bar" style={{ background: toneColors[group.tone] }} />
                <div className="set-row-icon">{row.icon}</div>
                <div className="set-row-copy">
                  <div className="set-row-label">{row.label}</div>
                  <div className="set-row-desc" style={row.descColor ? { color: row.descColor } : undefined}>{row.desc}</div>
                </div>
                {row.badge && (
                  <span className={`osg-badge ${row.badge.tone}`}>{row.badge.text}</span>
                )}
                <ChevronRight size={14} color="var(--text-tertiary)" className="st-menu-arrow" />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* ── 5. Enterprise Security Toggles ── */}
      <div className="set-menu-group">
        <div className="sh-section-head">
          <div className="section-title" style={{ margin: 0 }}>ENTERPRISE SECURITY</div>
          <span className="sh-section-count">{securityToggles.length} controls</span>
        </div>
        <div className="st-menu-list">
          {securityToggles.map((toggle) => (
            <div key={toggle.id} className={`st-menu-row osg-toggle-row ${toggle.tone === 'danger' ? 'danger' : ''}`}>
              <div className="st-menu-bar" style={{ background: toggle.tone === 'danger' ? '#ef4444' : 'var(--gold)' }} />
              <div className="set-row-copy" style={{ flex: 1 }}>
                <div className="set-row-label">{toggle.label}</div>
              </div>
              <Toggle enabled={toggle.state} onToggle={() => toggle.setState(!toggle.state)} />
            </div>
          ))}
        </div>
      </div>

      {/* ── 6. Footer Stats ── */}
      <div className="cm-net-stats">
        <div className="cm-net-stat">
          <ShieldCheck size={12} color="#10b981" />
          <span>Governance</span>
        </div>
        <div className="cm-net-divider" />
        <div className="cm-net-stat">
          <Users size={12} color="var(--gold)" />
          <span>{totalMembers} Members</span>
        </div>
        <div className="cm-net-divider" />
        <div className="cm-net-stat">
          <Lock size={12} color="var(--blue)" />
          <span>{activeSigners} Signers</span>
        </div>
      </div>
    </motion.div>
  );
};

export default OrgSettingsModule;
