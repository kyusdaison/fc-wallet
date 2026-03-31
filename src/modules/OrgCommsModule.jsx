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
  ShieldCheck,
} from 'lucide-react';
import { ORG_CHAT_CONTACTS, ORG_APPROVALS, ORG_ALERTS, ORG_DIRECTORY } from '../data/mockData';
/* oc-* styles in index.css */

/* ─── Shared avatar helper ─── */
const ContactAvatar = ({ contact, size = 40 }) => {
  if (contact.avatar) {
    return (
      <div className="oc-avatar-wrap" style={{ width: size, height: size }}>
        <img src={contact.avatar} alt={contact.name} className="oc-avatar-img" style={{ width: size, height: size }} />
        <span className="oc-avatar-verified"><CheckCircle2 size={10} color="var(--green)" /></span>
      </div>
    );
  }
  const isGov = contact.type === 'government';
  return (
    <div className="oc-avatar-wrap" style={{ width: size, height: size }}>
      <div
        className="oc-avatar"
        style={{
          width: size, height: size, fontSize: size * 0.32,
          backgroundColor: isGov ? 'rgba(212,175,55,0.15)' : (contact.color || 'var(--navy)'),
          color: isGov ? 'var(--gold)' : '#fff',
          border: isGov ? '1px solid var(--gold)' : 'none',
        }}
      >
        {contact.initials}
      </div>
      {contact.type === 'government' && (
        <span className="oc-avatar-badge-gov"><Shield size={9} color="var(--gold)" /></span>
      )}
    </div>
  );
};

/* ─── Section title micro-component ─── */
const SectionTitle = ({ children }) => (
  <div className="oc-section-title">{children}</div>
);

/* =========================================================
   Enterprise Chats Tab
   ========================================================= */
const EnterpriseChatTab = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = useMemo(() => {
    const query = searchQuery.toLowerCase();
    if (!query) return ORG_CHAT_CONTACTS;
    return ORG_CHAT_CONTACTS.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        (c.entityId && c.entityId.toLowerCase().includes(query)) ||
        c.lastMsg.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const unreadCount = ORG_CHAT_CONTACTS.reduce((sum, c) => sum + (c.unread || 0), 0);
  const activeEntities = ORG_CHAT_CONTACTS.filter((c) => c.unread > 0 || ORG_CHAT_CONTACTS.indexOf(c) < 3).slice(0, 4);

  const getMessageIcon = (msgType) => {
    if (msgType === 'payment') return <Banknote size={12} color="var(--gold)" />;
    if (msgType === 'document') return <FileText size={12} color="var(--blue)" />;
    return null;
  };

  return (
    <motion.div
      key="chats"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="oc-tab-content"
    >
      {/* Search */}
      <div className="oc-search">
        <Search size={16} className="oc-search-icon" />
        <input
          type="text"
          className="oc-search-input"
          placeholder="Search channels & entities..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Active Entities Strip */}
      {!searchQuery && (
        <div>
          <SectionTitle>ACTIVE ENTITIES</SectionTitle>
          <div className="oc-active-strip">
            {activeEntities.map((contact) => (
              <button key={contact.id} type="button" className="oc-active-pill">
                <div className="oc-active-avatar-wrap">
                  <ContactAvatar contact={contact} size={36} />
                  <span className="oc-active-dot" />
                </div>
                <span className="oc-active-name">{contact.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Recent Channels */}
      <div>
        <SectionTitle>
          {searchQuery ? 'SEARCH RESULTS' : 'RECENT CHANNELS'}
        </SectionTitle>
        <div className="oc-card">
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact, index) => (
              <div key={contact.id}>
                <button type="button" className="oc-chat-row">
                  <ContactAvatar contact={contact} size={42} />
                  <div className="oc-chat-copy">
                    <div className="oc-chat-meta-row">
                      <span className="oc-chat-name">{contact.name}</span>
                      <span className={`oc-chat-time ${contact.unread > 0 ? 'oc-time-active' : ''}`}>{contact.time}</span>
                    </div>
                    {contact.entityId && (
                      <div className="oc-chat-entity">{contact.entityId}</div>
                    )}
                    <div className="oc-chat-msg-row">
                      <div className="oc-chat-preview">
                        {getMessageIcon(contact.lastMsgType)}
                        <span>{contact.lastMsg}</span>
                      </div>
                      {contact.unread > 0 && (
                        <span className="oc-unread-badge">{contact.unread}</span>
                      )}
                    </div>
                  </div>
                </button>
                {index < filteredContacts.length - 1 && <div className="oc-row-divider" />}
              </div>
            ))
          ) : (
            <div className="oc-empty">
              <MessageSquare size={28} color="var(--text-tertiary)" />
              <span>No channels found</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer note */}
      <div className="oc-note">
        <Lock size={12} />
        Encrypted as <strong>NexaCorp Limited</strong> · {unreadCount} unread
      </div>
    </motion.div>
  );
};

/* =========================================================
   Approvals Queue Tab
   ========================================================= */
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

  const isNegativeAmount = (amount) => amount.startsWith('-');

  return (
    <motion.div
      key="approvals"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="oc-tab-content"
    >
      <div className="oc-filter-row">
        {['All', 'Urgent', 'Pending', 'Completed'].map((filter) => (
          <button
            key={filter}
            type="button"
            className={`oc-filter-pill ${filterStatus === filter ? 'oc-filter-active' : ''}`}
            onClick={() => setFilterStatus(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="oc-card">
        {filteredApprovals.map((approval) => (
          <motion.div
            key={approval.id}
            layout
            className={`oc-approval ${approval.status} ${expandedApproval === approval.id ? 'oc-expanded' : ''}`}
            onClick={() =>
              setExpandedApproval(expandedApproval === approval.id ? null : approval.id)
            }
          >
            <div className="oc-approval-header">
              <div className="oc-approval-main">
                <div className="oc-approval-title">{approval.title}</div>
                <div className="oc-approval-subtitle">{approval.subtitle}</div>

                <div className="oc-approval-details">
                  <div className="oc-approval-detail">
                    <span className="oc-detail-label">Amount:</span>
                    <span
                      className="oc-detail-value"
                      style={{
                        color: isNegativeAmount(approval.amount) ? '#ef4444' : 'var(--text-primary)',
                      }}
                    >
                      {approval.amount}
                    </span>
                  </div>
                  <div className="oc-approval-detail">
                    <span className="oc-detail-label">Vault:</span>
                    <span className="oc-detail-vault">{approval.vault}</span>
                  </div>
                </div>

                <div className="oc-signatures">
                  <span className="oc-sig-label">
                    {approval.currentSignatures} of {approval.reqSignatures} signatures
                  </span>
                  <div className="oc-sig-dots">
                    {Array.from({ length: approval.reqSignatures }).map((_, idx) => (
                      <div
                        key={idx}
                        className="oc-sig-dot"
                        style={{
                          backgroundColor:
                            idx < approval.currentSignatures ? 'var(--gold)' : 'var(--navy)',
                        }}
                      />
                    ))}
                  </div>
                </div>

                {approval.deadline && (
                  <div
                    className="oc-deadline"
                    style={{
                      color: approval.status === 'urgent' ? '#ef4444' : 'var(--text-secondary)',
                    }}
                  >
                    <Clock size={12} />
                    {approval.deadline}
                  </div>
                )}
              </div>

              <div className="oc-approval-side">
                <span
                  className={`oc-status-badge oc-status-${approval.status}`}
                  style={{ color: getStatusColor(approval.status) }}
                >
                  {approval.status.charAt(0).toUpperCase() + approval.status.slice(1)}
                </span>
                {expandedApproval === approval.id ? (
                  <ChevronUp size={18} className="oc-chevron" />
                ) : (
                  <ChevronDown size={18} className="oc-chevron" />
                )}
              </div>
            </div>

            {expandedApproval === approval.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="oc-approval-expanded"
              >
                <div className="oc-signers-label">Signers</div>
                <div className="oc-signers-list">
                  {approval.signers.map((signer, idx) => (
                    <div key={idx} className="oc-signer-row">
                      <div className="oc-signer-left">
                        <div
                          className="oc-signer-dot"
                          style={{
                            backgroundColor: signer.signed ? 'var(--green)' : 'var(--navy)',
                          }}
                        />
                        <span className="oc-signer-name">{signer.name}</span>
                      </div>
                      <span
                        className="oc-signer-status"
                        style={{
                          color: signer.signed ? 'var(--green)' : 'var(--text-secondary)',
                        }}
                      >
                        {signer.signed ? signer.time : 'Pending'}
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

/* =========================================================
   Enterprise Alerts Tab
   ========================================================= */
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
    if (alert.icon === 'shield') return <Shield size={20} className="oc-icon-blue" />;
    if (alert.icon === 'banknote') return <Banknote size={20} className="oc-icon-gold" />;
    if (alert.icon === 'activity') return <Activity size={20} className="oc-icon-green" />;
    if (alert.icon === 'building') return <Building2 size={20} className="oc-icon-navy" />;
    if (alert.icon === 'lock') return <Lock size={20} className="oc-icon-purple" />;
    return <Bell size={20} className="oc-icon-muted" />;
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
      className="oc-tab-content"
    >
      <div className="oc-filter-row">
        {['All', 'Unread', 'Compliance', 'Treasury'].map((filter) => (
          <button
            key={filter}
            type="button"
            className={`oc-filter-pill ${filterType === filter ? 'oc-filter-active' : ''}`}
            onClick={() => setFilterType(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="oc-card">
        {filteredAlerts.map((alert) => (
          <motion.div
            key={alert.id}
            layout
            className={`oc-alert ${alert.unread ? 'oc-unread' : ''}`}
            onClick={() => setExpandedAlert(expandedAlert === alert.id ? null : alert.id)}
          >
            <div className="oc-alert-header">
              {alert.unread && <div className="oc-alert-unread-dot" />}

              <div
                className="oc-alert-icon-box"
                style={{ backgroundColor: `${getTypeColor(alert.type)}20` }}
              >
                {getAlertIcon(alert)}
              </div>

              <div className="oc-alert-copy">
                <div className="oc-alert-header-top">
                  <div>
                    <div className="oc-alert-title">{alert.title}</div>
                    <div className="oc-alert-sender">{alert.sender}</div>
                  </div>
                  {expandedAlert === alert.id ? (
                    <ChevronUp size={18} className="oc-chevron" />
                  ) : (
                    <ChevronDown size={18} className="oc-chevron" />
                  )}
                </div>

                <div className="oc-alert-preview">{alert.preview}</div>
                <div className="oc-alert-time">{alert.time}</div>
              </div>
            </div>

            {expandedAlert === alert.id && alert.actions && alert.actions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="oc-alert-actions"
              >
                {alert.actions.map((action, idx) => (
                  <button key={idx} type="button" className="oc-action-btn">
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

/* =========================================================
   Enterprise Contacts Directory Tab
   ========================================================= */
const EnterpriseContactsTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Enterprise', 'Government', 'Team'];

  const filtered = useMemo(() => {
    let list = ORG_DIRECTORY;
    if (activeCategory === 'Enterprise') list = list.filter((c) => c.type === 'enterprise');
    else if (activeCategory === 'Government') list = list.filter((c) => c.type === 'government');
    else if (activeCategory === 'Team') list = list.filter((c) => c.type === 'individual');

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.entityId.toLowerCase().includes(q) ||
          c.role.toLowerCase().includes(q)
      );
    }
    return list.sort((a, b) => a.name.localeCompare(b.name));
  }, [searchQuery, activeCategory]);

  const getStatusIcon = (status) => {
    if (status === 'Authority') return <Shield size={11} style={{ color: 'var(--gold)' }} />;
    if (status === 'L3 Verified') return <ShieldCheck size={11} style={{ color: 'var(--green)' }} />;
    return <ShieldCheck size={11} style={{ color: 'var(--text-muted)' }} />;
  };

  return (
    <motion.div
      key="contacts"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="oc-tab-content"
    >
      <div className="oc-search">
        <Search size={16} className="oc-search-icon" />
        <input
          type="text"
          className="oc-search-input"
          placeholder="Search directory..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="oc-filter-row">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`oc-filter-pill ${activeCategory === cat ? 'oc-filter-active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div>
        <SectionTitle>{activeCategory === 'All' ? 'ALL CONTACTS' : activeCategory.toUpperCase()}</SectionTitle>
        <div className="oc-card">
          {filtered.length > 0 ? (
            filtered.map((contact, index) => (
              <div key={contact.id}>
                <div className="oc-dir-row">
                  <ContactAvatar contact={contact} size={40} />
                  <div className="oc-dir-info">
                    <div className="oc-dir-name">{contact.name}</div>
                    <div className="oc-dir-role">{contact.role}</div>
                    <div className="oc-dir-meta">
                      <span className="oc-dir-eid">{contact.entityId}</span>
                      <span className="oc-dir-status">
                        {getStatusIcon(contact.status)} {contact.status}
                      </span>
                    </div>
                  </div>
                  <MessageSquare size={16} className="oc-dir-action" />
                </div>
                {index < filtered.length - 1 && <div className="oc-row-divider" />}
              </div>
            ))
          ) : (
            <div className="oc-empty">
              <Search size={28} color="var(--text-tertiary)" />
              <span>No contacts found</span>
            </div>
          )}
        </div>
      </div>

      <div className="oc-note">
        <Building2 size={12} />
        {filtered.length} contact{filtered.length !== 1 ? 's' : ''} in NexaCorp directory
      </div>
    </motion.div>
  );
};

/* =========================================================
   Main OrgCommsModule
   ========================================================= */
const OrgCommsModule = ({ initialTab = 'chats' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  const unreadCount = ORG_CHAT_CONTACTS.reduce((sum, c) => sum + (c.unread || 0), 0);
  const pendingCount = ORG_APPROVALS.filter((a) => a.status !== 'completed').length;
  const unreadAlerts = ORG_ALERTS.filter((a) => a.unread).length;

  const tabs = [
    { id: 'chats', label: 'Chats', component: <EnterpriseChatTab />, count: unreadCount },
    { id: 'approvals', label: 'Approvals', component: <ApprovalsQueueTab />, count: pendingCount },
    { id: 'alerts', label: 'Alerts', component: <EnterpriseAlertsTab />, count: unreadAlerts },
    { id: 'contacts', label: 'Contacts', component: <EnterpriseContactsTab />, count: null },
  ];

  return (
    <motion.div
      className="oc-page"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="oc-header">
        <div className="oc-header-left">
          <div className="oc-header-title">Enterprise Comms</div>
          <div className="oc-header-sub">
            <Lock size={10} />
            Encrypted channels · NexaCorp Limited
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="oc-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`oc-tab ${activeTab === tab.id ? 'oc-tab-active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            {tab.count !== null && tab.count > 0 && (
              <span className="oc-tab-count">{tab.count}</span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="oc-content">
        <AnimatePresence mode="wait">
          {tabs.find((t) => t.id === activeTab)?.component}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default OrgCommsModule;
