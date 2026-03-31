import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  Banknote,
  Bell,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  FileText,
  Lock,
  MessageSquare,
  Search,
  Shield,
} from 'lucide-react';
import { ORG_CHAT_CONTACTS, ORG_APPROVALS, ORG_ALERTS } from '../data/mockData';

// Reuse CommsHero from CommsModule
const CommsHero = ({ tone = 'blue', eyebrow, title, subtitle, badge, icon, metrics }) => (
  <div className={`comms-hero ${tone}`}>
    <div className="comms-hero-top">
      <div>
        <div className="comms-hero-kicker">{eyebrow}</div>
        <div className="comms-hero-title">{title}</div>
        <div className="comms-hero-subtitle">{subtitle}</div>
      </div>
      <div className="comms-hero-side">
        <div className={`comms-hero-badge ${tone}`}>{badge}</div>
        <div className="comms-hero-icon-shell">{icon}</div>
      </div>
    </div>
    <div className="comms-hero-metrics">
      {metrics.map((metric) => (
        <div key={metric.label} className="comms-hero-metric">
          <span>{metric.label}</span>
          <strong>{metric.value}</strong>
        </div>
      ))}
    </div>
  </div>
);

// Enterprise Chats Sub-tab
const EnterpriseChatTab = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return ORG_CHAT_CONTACTS.filter(
      (contact) =>
        contact.name.toLowerCase().includes(query) ||
        (contact.entityId && contact.entityId.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  const unreadCount = ORG_CHAT_CONTACTS.reduce((sum, c) => sum + (c.unread || 0), 0);
  const enterpriseCount = ORG_CHAT_CONTACTS.filter((c) => c.type === 'enterprise').length;
  const contactCount = ORG_CHAT_CONTACTS.length;

  const getMessageIcon = (msgType) => {
    if (msgType === 'payment') return <Banknote size={14} />;
    if (msgType === 'document') return <FileText size={14} />;
    return null;
  };

  const getContactAvatar = (contact) => {
    if (contact.avatar) {
      return (
        <img
          src={contact.avatar}
          alt={contact.name}
          className="signal-avatar-img"
          style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
        />
      );
    }

    // Initials circle
    const bgColor = contact.type === 'government'
      ? 'rgba(212, 175, 55, 0.15)' // gold tint
      : contact.color || 'var(--navy)';
    const textColor = contact.type === 'government' ? 'var(--gold)' : '#ffffff';

    return (
      <div
        className="signal-avatar"
        style={{
          width: '40px',
          height: '40px',
          backgroundColor: bgColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          fontSize: '13px',
          fontWeight: '600',
          color: textColor,
          border: contact.type === 'government' ? '1px solid var(--gold)' : 'none',
        }}
      >
        {contact.initials}
      </div>
    );
  };

  return (
    <motion.div
      key="chats"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="module-content"
      style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
    >
      <CommsHero
        tone="gold"
        eyebrow="Organization Communications"
        title="Secure Channels"
        subtitle="Encrypted enterprise network for partnerships, vendors, and authorities."
        badge={`${unreadCount} unread`}
        icon={<MessageSquare size={30} color="var(--gold)" />}
        metrics={[
          { label: 'Contacts', value: contactCount },
          { label: 'Enterprises', value: enterpriseCount },
          { label: 'Unread', value: unreadCount },
        ]}
      />

      {/* Search Bar */}
      <div className="chat-search-row">
        <div className="chat-search-shell">
          <Search size={18} color="var(--text-muted)" style={{ marginRight: '8px' }} />
          <input
            type="text"
            className="chat-search-input"
            placeholder="Search entities & contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Contact List */}
      <div className="chat-list-shell">
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact) => (
            <div key={contact.id} className="chat-row">
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flex: 1 }}>
                {getContactAvatar(contact)}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)' }}>
                    {contact.name}
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: 'var(--text-muted)',
                      marginTop: '2px',
                    }}
                  >
                    {contact.entityId || contact.status}
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  minWidth: '180px',
                  justifyContent: 'flex-end',
                }}
              >
                <div style={{ textAlign: 'right', flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: '12px',
                      color: 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      justifyContent: 'flex-end',
                      marginBottom: '3px',
                    }}
                  >
                    {getMessageIcon(contact.lastMsgType)}
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {contact.lastMsg}
                    </span>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{contact.time}</div>
                </div>

                {contact.unread > 0 && (
                  <div
                    style={{
                      backgroundColor: 'var(--gold)',
                      color: '#000',
                      borderRadius: '50%',
                      width: '20px',
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      fontWeight: '600',
                      flexShrink: 0,
                    }}
                  >
                    {contact.unread}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div
            style={{
              textAlign: 'center',
              padding: '40px 20px',
              color: 'var(--text-muted)',
              fontSize: '14px',
            }}
          >
            No contacts found
          </div>
        )}
      </div>

      {/* Identity Note */}
      <div
        style={{
          padding: '12px 16px',
          backgroundColor: 'rgba(212, 175, 55, 0.05)',
          borderLeft: '3px solid var(--gold)',
          borderRadius: '4px',
          fontSize: '12px',
          color: 'var(--text-secondary)',
        }}
      >
        Messages sent as <strong>NexaCorp Limited</strong>
      </div>
    </motion.div>
  );
};

// Approvals Queue Sub-tab
const ApprovalsQueueTab = () => {
  const [filterStatus, setFilterStatus] = useState('All');
  const [expandedApproval, setExpandedApproval] = useState(null);

  const filteredApprovals = useMemo(() => {
    return ORG_APPROVALS.filter((approval) => {
      if (filterStatus === 'All') return true;
      return approval.status === filterStatus.toLowerCase();
    });
  }, [filterStatus]);

  const getStatusColor = (status) => {
    if (status === 'urgent') return '#ef4444';
    if (status === 'pending') return 'var(--gold)';
    if (status === 'completed') return 'var(--green)';
    return 'var(--text-muted)';
  };

  const getStatusLabel = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const isNegativeAmount = (amount) => amount.startsWith('-');

  return (
    <motion.div
      key="approvals"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="module-content"
      style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
    >
      <CommsHero
        tone="gold"
        eyebrow="Multi-Signature Vaults"
        title="Approvals Queue"
        subtitle="Pending authorizations, signature requirements, and completion status."
        badge={`${ORG_APPROVALS.filter((a) => a.status !== 'completed').length} pending`}
        icon={<CheckCircle2 size={30} color="var(--gold)" />}
        metrics={[
          { label: 'Urgent', value: ORG_APPROVALS.filter((a) => a.status === 'urgent').length },
          { label: 'Pending', value: ORG_APPROVALS.filter((a) => a.status === 'pending').length },
          { label: 'Completed', value: ORG_APPROVALS.filter((a) => a.status === 'completed').length },
        ]}
      />

      {/* Filter Row */}
      <div className="signal-filter-row">
        {['All', 'Urgent', 'Pending', 'Completed'].map((filter) => (
          <button
            key={filter}
            type="button"
            className={`signal-filter-pill ${filterStatus === filter ? 'active gold' : ''}`}
            onClick={() => setFilterStatus(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Approval Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredApprovals.map((approval) => (
          <motion.div
            key={approval.id}
            layout
            className={`signal-card ${approval.status} ${expandedApproval === approval.id ? 'expanded' : ''}`}
            style={{
              opacity: approval.status === 'completed' ? 0.6 : 1,
              cursor: 'pointer',
            }}
            onClick={() =>
              setExpandedApproval(expandedApproval === approval.id ? null : approval.id)
            }
          >
            {/* Card Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                    marginBottom: '4px',
                  }}
                >
                  {approval.title}
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    color: 'var(--text-secondary)',
                    marginBottom: '8px',
                  }}
                >
                  {approval.subtitle}
                </div>

                {/* Amount and Vault */}
                <div
                  style={{
                    display: 'flex',
                    gap: '20px',
                    fontSize: '13px',
                    marginBottom: '12px',
                  }}
                >
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Amount: </span>
                    <span
                      style={{
                        fontWeight: '600',
                        color: isNegativeAmount(approval.amount) ? '#ef4444' : 'var(--text-primary)',
                      }}
                    >
                      {approval.amount}
                    </span>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Vault: </span>
                    <span style={{ fontWeight: '500', color: 'var(--blue)' }}>{approval.vault}</span>
                  </div>
                </div>

                {/* Signature Progress */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '8px',
                  }}
                >
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    {approval.currentSignatures} of {approval.reqSignatures} signatures
                  </span>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {Array.from({ length: approval.reqSignatures }).map((_, idx) => (
                      <div
                        key={idx}
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor:
                            idx < approval.currentSignatures ? 'var(--gold)' : 'var(--navy)',
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Deadline */}
                {approval.deadline && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '11px',
                      color:
                        approval.status === 'urgent' ? '#ef4444' : 'var(--text-secondary)',
                    }}
                  >
                    <Clock size={12} />
                    {approval.deadline}
                  </div>
                )}
              </div>

              {/* Status Badge */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: '8px',
                }}
              >
                <div
                  style={{
                    padding: '4px 10px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: '600',
                    backgroundColor:
                      approval.status === 'urgent'
                        ? 'rgba(239, 68, 68, 0.15)'
                        : approval.status === 'pending'
                          ? 'rgba(212, 175, 55, 0.15)'
                          : 'rgba(16, 185, 129, 0.15)',
                    color: getStatusColor(approval.status),
                  }}
                >
                  {getStatusLabel(approval.status)}
                </div>
                {expandedApproval === approval.id ? (
                  <ChevronUp size={18} color="var(--text-muted)" />
                ) : (
                  <ChevronDown size={18} color="var(--text-muted)" />
                )}
              </div>
            </div>

            {/* Expanded Content - Signers */}
            {expandedApproval === approval.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{
                  marginTop: '12px',
                  paddingTop: '12px',
                  borderTop: '1px solid var(--navy)',
                }}
              >
                <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '8px', color: 'var(--text-secondary)' }}>
                  Signers
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {approval.signers.map((signer, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '12px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div
                          style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            backgroundColor: signer.signed ? 'var(--green)' : 'var(--navy)',
                          }}
                        />
                        <span style={{ color: 'var(--text-primary)' }}>{signer.name}</span>
                      </div>
                      <span style={{ color: 'var(--text-secondary)' }}>
                        {signer.signed ? (
                          <span style={{ color: 'var(--green)' }}>{signer.time}</span>
                        ) : (
                          'Pending'
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Enterprise Alerts Sub-tab
const EnterpriseAlertsTab = () => {
  const [filterType, setFilterType] = useState('All');
  const [expandedAlert, setExpandedAlert] = useState(null);

  const filteredAlerts = useMemo(() => {
    return ORG_ALERTS.filter((alert) => {
      if (filterType === 'All') return true;
      if (filterType === 'Unread') return alert.unread;
      return alert.type === filterType.toLowerCase();
    });
  }, [filterType]);

  const getAlertIcon = (alert) => {
    if (alert.icon === 'shield') return <Shield size={20} color="var(--blue)" />;
    if (alert.icon === 'banknote') return <Banknote size={20} color="var(--gold)" />;
    if (alert.icon === 'activity') return <Activity size={20} color="var(--green)" />;
    if (alert.icon === 'building') return <Building2 size={20} color="var(--navy)" />;
    if (alert.icon === 'lock') return <Lock size={20} color="#a78bfa" />;
    return <Bell size={20} color="var(--text-muted)" />;
  };

  const getTypeColor = (type) => {
    if (type === 'compliance') return 'var(--blue)';
    if (type === 'treasury') return 'var(--gold)';
    if (type === 'audit') return 'var(--green)';
    if (type === 'regulatory') return 'var(--navy)';
    if (type === 'security') return '#a78bfa';
    return 'var(--text-muted)';
  };

  return (
    <motion.div
      key="alerts"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="module-content"
      style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
    >
      <CommsHero
        tone="gold"
        eyebrow="Organization Monitoring"
        title="Enterprise Alerts"
        subtitle="Compliance notices, treasury events, audits, and security notifications."
        badge={`${ORG_ALERTS.filter((a) => a.unread).length} unread`}
        icon={<Bell size={30} color="var(--gold)" />}
        metrics={[
          { label: 'Unread', value: ORG_ALERTS.filter((a) => a.unread).length },
          { label: 'Compliance', value: ORG_ALERTS.filter((a) => a.type === 'compliance').length },
          { label: 'Treasury', value: ORG_ALERTS.filter((a) => a.type === 'treasury').length },
        ]}
      />

      {/* Filter Row */}
      <div className="signal-filter-row">
        {['All', 'Unread', 'Compliance', 'Treasury'].map((filter) => (
          <button
            key={filter}
            type="button"
            className={`signal-filter-pill ${filterType === filter ? 'active gold' : ''}`}
            onClick={() => setFilterType(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Alert Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredAlerts.map((alert) => (
          <motion.div
            key={alert.id}
            layout
            className={`signal-card ${alert.unread ? 'unread' : ''}`}
            style={{
              cursor: 'pointer',
              opacity: !alert.unread ? 0.8 : 1,
            }}
            onClick={() => setExpandedAlert(expandedAlert === alert.id ? null : alert.id)}
          >
            {/* Alert Header */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {/* Unread indicator */}
              {alert.unread && (
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--gold)',
                    marginTop: '6px',
                    flexShrink: 0,
                  }}
                />
              )}

              {/* Icon */}
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  backgroundColor: `${getTypeColor(alert.type)}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {getAlertIcon(alert)}
              </div>

              {/* Main Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                  <div>
                    <div
                      style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: 'var(--text-primary)',
                        marginBottom: '2px',
                      }}
                    >
                      {alert.title}
                    </div>
                    <div
                      style={{
                        fontSize: '12px',
                        color: 'var(--text-secondary)',
                        marginBottom: '6px',
                      }}
                    >
                      {alert.sender}
                    </div>
                  </div>
                  {expandedAlert === alert.id ? (
                    <ChevronUp size={18} color="var(--text-muted)" style={{ flexShrink: 0 }} />
                  ) : (
                    <ChevronDown size={18} color="var(--text-muted)" style={{ flexShrink: 0 }} />
                  )}
                </div>

                {/* Preview */}
                <div
                  style={{
                    fontSize: '12px',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.4',
                    marginBottom: '8px',
                  }}
                >
                  {alert.preview}
                </div>

                {/* Time */}
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{alert.time}</div>
              </div>
            </div>

            {/* Expanded Content - Actions */}
            {expandedAlert === alert.id && alert.actions && alert.actions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{
                  marginTop: '12px',
                  paddingTop: '12px',
                  borderTop: '1px solid var(--navy)',
                  display: 'flex',
                  gap: '8px',
                  flexWrap: 'wrap',
                }}
              >
                {alert.actions.map((action, idx) => (
                  <button
                    key={idx}
                    type="button"
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      border: '1px solid var(--navy)',
                      backgroundColor: 'transparent',
                      color: 'var(--text-primary)',
                      fontSize: '12px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = 'rgba(212, 175, 55, 0.15)';
                      e.target.style.borderColor = 'var(--gold)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.borderColor = 'var(--navy)';
                    }}
                  >
                    {action}
                  </button>
                ))}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Main OrgCommsModule Component
const OrgCommsModule = ({ initialTab = 'chats' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  const tabs = [
    { id: 'chats', label: 'Chats', component: <EnterpriseChatTab /> },
    { id: 'approvals', label: 'Approvals', component: <ApprovalsQueueTab /> },
    { id: 'alerts', label: 'Alerts', component: <EnterpriseAlertsTab /> },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0', height: '100%' }}>
      {/* Sub-tab Bar */}
      <div
        className="signal-filter-row"
        style={{
          borderBottom: '1px solid var(--navy)',
          padding: '12px 16px',
          marginBottom: '0',
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`signal-filter-pill ${activeTab === tab.id ? 'active gold' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            style={{
              borderRadius: '20px',
              padding: '6px 14px',
              fontSize: '13px',
              fontWeight: '500',
              border: 'none',
              backgroundColor: activeTab === tab.id ? 'var(--gold)' : 'transparent',
              color: activeTab === tab.id ? '#000' : 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div
        style={{
          flex: 1,
          overflow: 'auto',
          paddingLeft: '16px',
          paddingRight: '16px',
          paddingTop: '20px',
          paddingBottom: '20px',
        }}
      >
        <AnimatePresence mode="wait">
          {tabs.find((t) => t.id === activeTab)?.component}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OrgCommsModule;
export { CommsHero };
