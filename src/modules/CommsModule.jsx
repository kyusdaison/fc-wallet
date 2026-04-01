import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ArrowUp, Banknote, Bell, Building2, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, CircleDollarSign, Fingerprint, Lock, MessageSquare, Phone, Pin, Plus, QrCode, Radio, Search, Send, Share2, Shield, ShieldCheck, Users, Vote, Wifi, X, BookUser, Zap } from 'lucide-react';
import { CITIZEN_ALERTS, CITIZEN_CHAT_CONTACTS } from '../data/mockData';

/* =========================================================
   AlertsModule — now used inside the bell dropdown only
   ========================================================= */
const AlertsModule = ({ compact }) => {
  const [expandedAlert, setExpandedAlert] = useState(null);
  const [dismissedAlerts, setDismissedAlerts] = useState([]);

  const alerts = CITIZEN_ALERTS;
  const activeAlerts = alerts.filter((alert) => !dismissedAlerts.includes(alert.id));

  const getAlertIcon = (alert) => {
    if (alert.from) return <span className="signal-avatar-copy">{alert.from}</span>;
    if (alert.icon === 'building') return <Building2 size={18} color="var(--navy)" />;
    if (alert.icon === 'shield') return <Shield size={18} color="var(--blue)" />;
    if (alert.icon === 'vote') return <Vote size={18} color="var(--gold)" />;
    if (alert.icon === 'activity') return <Activity size={18} color="var(--green)" />;
    return <Bell size={18} color="var(--text-muted)" />;
  };

  return (
    <div className="notif-alerts-list">
      {activeAlerts.length === 0 ? (
        <div className="notif-empty">
          <CheckCircle2 size={32} color="var(--green)" />
          <span>All caught up</span>
        </div>
      ) : (
        activeAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`notif-alert-card ${alert.type} ${alert.unread ? 'unread' : ''}`}
            onClick={() => setExpandedAlert(expandedAlert === alert.id ? null : alert.id)}
          >
            <div className="notif-alert-head">
              <div className={`notif-alert-icon ${alert.type}`}>{getAlertIcon(alert)}</div>
              <div className="notif-alert-copy">
                <div className="notif-alert-top-row">
                  <span className="notif-alert-sender">{alert.sender}</span>
                  <span className="notif-alert-time">{alert.time}</span>
                </div>
                <div className="notif-alert-title">{alert.title}</div>
              </div>
              {alert.unread && <span className="notif-alert-dot"></span>}
            </div>
            {expandedAlert === alert.id && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="notif-alert-body">
                <p>{alert.preview}</p>
                {alert.actions.length > 0 && (
                  <div className="notif-alert-actions">
                    {alert.actions.map((action, i) => (
                      <button key={action} type="button" className={`notif-alert-btn ${i === 0 ? 'primary' : ''}`} onClick={(e) => { e.stopPropagation(); setDismissedAlerts(prev => [...prev, alert.id]); }}>
                        {action}
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

/* =========================================================
   ChatsModule — redesigned to match Home page richness
   ========================================================= */
const TAG_FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'pinned', label: 'Pinned' },
  { key: 'work', label: 'Work' },
  { key: 'personal', label: 'Personal' },
  { key: 'gov', label: 'Gov' },
];

const COMMS_ACTIONS = [
  { id: 'new', title: 'New Chat', subtitle: 'Start encrypted', icon: <Plus size={20} color="var(--blue)" />, iconClass: 'cm-icon-blue', toneClass: 'tone-blue', emphasis: 'primary' },
  { id: 'send', title: 'Pay', subtitle: 'Send FCUSD', icon: <Send size={20} color="var(--green)" />, iconClass: 'cm-icon-green', toneClass: 'tone-green', emphasis: 'primary' },
  { id: 'scan', title: 'Scan', subtitle: 'QR connect', icon: <QrCode size={20} color="var(--purple, #8B5CF6)" />, iconClass: 'cm-icon-purple', toneClass: 'tone-purple', emphasis: 'secondary' },
  { id: 'contacts', title: 'Contacts', subtitle: 'Directory', icon: <BookUser size={20} color="var(--text-dark)" />, iconClass: 'cm-icon-slate', toneClass: 'tone-slate', emphasis: 'secondary' },
];

const getMsgTypeColor = (tag) => {
  switch (tag) {
    case 'work': return 'var(--blue)';
    case 'gov': return 'var(--gold)';
    case 'personal': return 'var(--green)';
    default: return 'var(--text-muted)';
  }
};

const ChatsModule = ({ onSelectChat, onOpenScanner }) => {
  const [chatQuery, setChatQuery] = useState('');
  const [showDirectory, setShowDirectory] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const contacts = CITIZEN_CHAT_CONTACTS;
  const totalUnread = contacts.reduce((count, contact) => count + contact.unread, 0);
  const paymentThreads = contacts.filter(c => c.lastMsgType === 'payment').length;

  const filteredContacts = contacts.filter((contact) => {
    const query = chatQuery.trim().toLowerCase();
    const matchesQuery = !query || contact.name.toLowerCase().includes(query) || contact.lastMsg.toLowerCase().includes(query);
    const matchesFilter = activeFilter === 'all' || (activeFilter === 'pinned' ? contact.pinned : contact.tag === activeFilter);
    return matchesQuery && matchesFilter;
  });

  // Directory: all contacts sorted alphabetically
  const directoryContacts = [...contacts].sort((a, b) => a.name.localeCompare(b.name));
  const filteredDirectory = directoryContacts.filter((contact) => {
    const query = chatQuery.trim().toLowerCase();
    if (!query) return true;
    return contact.name.toLowerCase().includes(query);
  });

  const handleAction = (id) => {
    if (id === 'scan') onOpenScanner?.();
    if (id === 'contacts') setShowDirectory(prev => !prev);
  };

  return (
    <motion.div key="chats" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.3, ease: 'easeOut' }} className="module-content module-stack-sm">

      {/* ── 1. Comms Hero Card ── */}
      <div className="cm-hero">
        <div className="cm-hero-glow" />
        <div className="cm-hero-top">
          <div>
            <div className="cm-hero-kicker">SOVEREIGN RELAY</div>
            <div className="cm-hero-title">Messages</div>
          </div>
          <div className="cm-hero-badge">
            <div className="cm-hero-pulse" />
            <Lock size={11} />
            ZK Encrypted
          </div>
        </div>
        <div className="cm-hero-stats">
          <div className="cm-hero-stat">
            <span className="cm-stat-value">{contacts.length}</span>
            <span className="cm-stat-label">Peers</span>
          </div>
          <div className="cm-hero-stat-divider" />
          <div className="cm-hero-stat">
            <span className="cm-stat-value">{totalUnread}</span>
            <span className="cm-stat-label">Unread</span>
          </div>
          <div className="cm-hero-stat-divider" />
          <div className="cm-hero-stat">
            <span className="cm-stat-value">{paymentThreads}</span>
            <span className="cm-stat-label">Payments</span>
          </div>
        </div>
      </div>

      {/* ── 2. Quick Actions ── */}
      <div className="home-action-grid">
        {COMMS_ACTIONS.map((action) => (
          <button key={action.id} type="button" className={`home-action-btn ${action.emphasis} ${action.toneClass}`} onClick={() => handleAction(action.id)}>
            <div className={`icon-wrap ${action.iconClass}`}>{action.icon}</div>
            <div className="home-action-copy">
              <span className="home-action-title">{action.title}</span>
              <span className="home-action-subtitle">{action.subtitle}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="chat-search-shell compact">
        <Search size={16} color="var(--text-muted)" />
        <input
          type="text"
          placeholder={showDirectory ? 'Search contacts...' : 'Search chats...'}
          value={chatQuery}
          onChange={(event) => setChatQuery(event.target.value)}
          className="chat-search-input compact"
        />
      </div>

      {/* Directory View */}
      {showDirectory && (
        <div className="chat-directory-section">
          <div className="section-title">CONTACT DIRECTORY</div>
          <div className="chat-directory-grid">
            {filteredDirectory.map((contact) => (
              <button key={contact.id} type="button" className="chat-directory-card" onClick={() => { onSelectChat(contact); setShowDirectory(false); }}>
                <div className="chat-directory-avatar-wrap">
                  <img src={contact.avatar} alt={contact.name} className="chat-directory-avatar" />
                  <span className="chat-directory-status-dot"></span>
                </div>
                <div className="chat-directory-name">{contact.name.split(' ')[0]}</div>
                <div className="chat-directory-level">{contact.status}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Filter Chips */}
      {!showDirectory && (
        <div className="comms-filter-strip">
          {TAG_FILTERS.map(f => (
            <button key={f.key} type="button" className={`comms-filter-chip ${activeFilter === f.key ? 'active' : ''}`} onClick={() => setActiveFilter(f.key)}>
              {f.key === 'pinned' && <Pin size={10} />}
              {f.label}
            </button>
          ))}
        </div>
      )}

      {/* ── 3. Active Now — upgraded glass panel ── */}
      {!showDirectory && activeFilter === 'all' && (
        <>
          <div className="cm-active-panel">
            <div className="cm-active-header">
              <div className="section-title" style={{ margin: 0 }}>ACTIVE NOW</div>
              <span className="cm-active-count">{contacts.filter(c => c.unread > 0 || contacts.indexOf(c) < 3).slice(0, 4).length} online</span>
            </div>
            <div className="cm-active-strip">
              {contacts.filter(c => c.unread > 0 || contacts.indexOf(c) < 3).slice(0, 4).map((contact) => (
                <button key={contact.id} type="button" className="cm-active-pill" onClick={() => onSelectChat(contact)}>
                  <div className="cm-active-avatar-wrap">
                    <img src={contact.avatar} alt={contact.name} className="cm-active-avatar" />
                    <span className="cm-active-dot" />
                  </div>
                  <span className="cm-active-name">{contact.name.split(' ')[0]}</span>
                  <span className="cm-active-time">now</span>
                </button>
              ))}
            </div>
          </div>

          {/* ── 4. Recent Chats — enhanced glass rows ── */}
          <div>
            <div className="cm-section-head">
              <div className="section-title" style={{ margin: 0 }}>RECENT CHATS</div>
              <span className="cm-section-count">{filteredContacts.length} threads</span>
            </div>
            <div className="cm-chat-list">
              {filteredContacts.map((contact) => (
                <button key={contact.id} type="button" className={`cm-chat-row ${contact.unread > 0 ? 'unread' : ''}`} onClick={() => onSelectChat(contact)}>
                  <div className="cm-chat-type-bar" style={{ background: getMsgTypeColor(contact.tag) }} />
                  <div className="cm-chat-avatar-wrap">
                    <img src={contact.avatar} alt={contact.name} className="cm-chat-avatar" />
                    <span className="cm-chat-verified"><CheckCircle2 size={10} color="var(--green)" /></span>
                  </div>
                  <div className="cm-chat-copy">
                    <div className="cm-chat-meta-row">
                      <div className="cm-chat-name">
                        {contact.pinned && <Pin size={10} color="var(--gold)" className="chat-pin-icon" />}
                        {contact.name}
                      </div>
                      <div className={`cm-chat-time ${contact.unread > 0 ? 'active' : ''}`}>{contact.time}</div>
                    </div>
                    <div className="cm-chat-msg-row">
                      <div className="cm-chat-msg">
                        {contact.lastMsgType === 'payment' && <Banknote size={12} color="var(--blue)" />}
                        {contact.lastMsg}
                      </div>
                      {contact.unread > 0 && <span className="cm-chat-unread">{contact.unread}</span>}
                    </div>
                  </div>
                  <ChevronRight size={14} color="var(--text-tertiary)" className="cm-chat-arrow" />
                </button>
              ))}

              {filteredContacts.length === 0 && (
                <div className="signal-empty-state compact">
                  <MessageSquare size={32} color="var(--blue)" />
                  <div className="signal-empty-title">{chatQuery ? 'No matches' : 'No chats here'}</div>
                  <div className="signal-empty-copy">
                    {chatQuery
                      ? 'Try another name or keyword.'
                      : activeFilter === 'pinned'
                        ? 'Pin important conversations for quick access.'
                        : `No ${activeFilter} conversations yet.`}
                  </div>
                  {activeFilter !== 'all' && !chatQuery && (
                    <button type="button" className="es-action-btn secondary" style={{ marginTop: 12, fontSize: 11 }} onClick={() => setActiveFilter('all')}>
                      View all chats
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* ── 5. Network Stats Footer ── */}
      {!showDirectory && (
        <div className="cm-net-stats">
          <div className="cm-net-stat">
            <Radio size={12} color="var(--green)" />
            <span>ZK Relay Active</span>
          </div>
          <div className="cm-net-divider" />
          <div className="cm-net-stat">
            <ShieldCheck size={12} color="var(--blue)" />
            <span>{contacts.length} verified peers</span>
          </div>
          <div className="cm-net-divider" />
          <div className="cm-net-stat">
            <Wifi size={12} color="var(--gold)" />
            <span>L3 mesh</span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

/* =========================================================
   ChatDetailModule — kept as is (already functional)
   ========================================================= */
const ChatDetailModule = ({ contact, onBack }) => {
  const [showPaySheet, setShowPaySheet] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('150');
  const [messageDraft, setMessageDraft] = useState('');

  const formattedPaymentAmount = Number(paymentAmount || 0).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const messageRows = [
    { id: 'contact-1', type: 'incoming', body: 'Hey! Are we still on for the Web3 summit tonight?', meta: '10:30 AM' },
    { id: 'me-1', type: 'outgoing', body: "Yes absolutely! I'll cover the tickets.", meta: '10:35 AM • Read' },
  ];

  const [messages, setMessages] = useState(messageRows);

  const handleSendMessage = () => {
    const text = messageDraft.trim();
    if (!text) return;
    setMessages(prev => [...prev, {
      id: `me-${Date.now()}`,
      type: 'outgoing',
      body: text,
      meta: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' • Sent',
    }]);
    setMessageDraft('');
  };

  const handlePaymentKey = (key) => {
    if (key === 'backspace') {
      setPaymentAmount((current) => current.slice(0, -1) || '0');
      return;
    }
    if (key === '.') {
      setPaymentAmount((current) => (current.includes('.') ? current : `${current}.`));
      return;
    }
    setPaymentAmount((current) => {
      if (current === '0') return String(key);
      return `${current}${key}`;
    });
  };

  return (
    <motion.div key="chat-detail" initial={{ opacity: 0, y: 50, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 50, scale: 0.98 }} transition={{ type: 'spring', damping: 25, stiffness: 300 }} className="chat-thread-shell">
      <div className="chat-thread-header">
        <button type="button" className="chat-thread-back" onClick={onBack}>
          <ChevronLeft size={22} strokeWidth={2.5} />
          <span>Back</span>
        </button>

        <div className="chat-thread-contact">
          <img src={contact.avatar} alt={contact.name} className="chat-thread-contact-avatar" />
          <div className="chat-thread-contact-copy">
            <div className="chat-thread-contact-name">
              {contact.name}
              <CheckCircle2 size={14} color="var(--green)" />
            </div>
            <div className="chat-thread-contact-status">{contact.status}</div>
          </div>
        </div>

        <div className="chat-thread-header-actions">
          <button type="button" className="chat-thread-header-btn">
            <Phone size={16} color="#93c5fd" />
          </button>
          <button type="button" className="chat-thread-header-btn">
            <ShieldCheck size={16} color="#34d399" />
          </button>
        </div>
      </div>

      <div className="chat-thread-body">
        <div className="chat-thread-hero">
          <div className="chat-thread-hero-kicker">ZK Relay Active</div>
          <div className="chat-thread-hero-title">{contact.name}</div>
          <div className="chat-thread-hero-subtitle">
            Verified peer messaging, payment approvals, and receipt proofs are all secured in one thread.
          </div>

          <div className="chat-thread-hero-pills">
            <span className="chat-thread-pill secure">
              <ShieldCheck size={13} />
              End-to-end encrypted
            </span>
            <span className="chat-thread-pill verified">
              <CheckCircle2 size={13} />
              FaceID transfer guard
            </span>
          </div>

          <div className="chat-thread-hero-actions">
            <button type="button" className="chat-thread-hero-btn primary" onClick={() => setShowPaySheet(true)}>
              <CircleDollarSign size={18} />
              Send FCUSD
            </button>
            <button type="button" className="chat-thread-hero-btn secondary">
              <Share2 size={16} />
              Share ID
            </button>
          </div>
        </div>

        <div className="chat-thread-system-row">
          <ShieldCheck size={14} strokeWidth={2.5} />
          ZK-SECURED L3 CONNECTION
        </div>

        <div className="chat-thread-message-stack">
          {messages.map((message) => (
            <div key={message.id} className={`chat-thread-row ${message.type}`}>
              <div className={`chat-thread-bubble ${message.type}`}>{message.body}</div>
              <div className="chat-thread-meta">{message.meta}</div>
            </div>
          ))}

          <div className="chat-thread-row outgoing payment">
            <div className="chat-thread-payment-card">
              <div className="chat-thread-payment-head">
                <div className="chat-thread-payment-label">
                  <Banknote size={16} color="var(--gold)" />
                  PAYMENT SENT
                </div>
                <div className="chat-thread-payment-status">
                  <CheckCircle2 size={16} color="var(--green)" />
                </div>
              </div>
              <div className="chat-thread-payment-amount">{formattedPaymentAmount}</div>
              <div className="chat-thread-payment-currency">FCUSD</div>
              <div className="chat-thread-payment-note">For 2x VIP Tickets</div>
            </div>
            <div className="chat-thread-meta">10:42 AM • Completed</div>
          </div>
        </div>
      </div>

      <div className="chat-thread-composer">
        <button type="button" className="chat-thread-pay-trigger" onClick={() => setShowPaySheet(true)}>
          <CircleDollarSign size={22} strokeWidth={2.5} />
        </button>

        <div className="chat-thread-input-shell">
          <input
            type="text"
            placeholder="Encrypted message..."
            value={messageDraft}
            onChange={(event) => setMessageDraft(event.target.value)}
            onKeyDown={(event) => { if (event.key === 'Enter') handleSendMessage(); }}
            className="chat-thread-input"
          />
          <span className="chat-thread-input-meta">Local relay</span>
        </div>

        <button type="button" className="chat-thread-send-btn" onClick={handleSendMessage}>
          <ArrowUp size={20} color="white" strokeWidth={2.6} />
        </button>
      </div>

      <AnimatePresence>
        {showPaySheet && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="chat-pay-backdrop" onClick={() => setShowPaySheet(false)}>
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="chat-pay-sheet"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="chat-pay-handle"></div>
              <div className="chat-pay-header">
                <div>
                  <div className="chat-pay-kicker">Secure Transfer</div>
                  <div className="chat-pay-title">Send to {contact.name}</div>
                </div>
                <div className="chat-pay-currency-pill">
                  <Banknote size={15} color="#93c5fd" />
                  FCUSD
                  <ChevronDown size={14} color="#8b96ac" />
                </div>
              </div>

              <div className="chat-pay-display">
                <div className="chat-pay-display-label">Biometric confirmation required above 100 FCUSD</div>
                <div className="chat-pay-amount">
                  <span>$</span>
                  {formattedPaymentAmount}
                </div>
                <div className="chat-pay-caption">
                  Routed through the sovereign wallet relay with local device approval only.
                </div>
              </div>

              <div className="chat-pay-shortcuts">
                {[25, 50, 100].map((value) => (
                  <button key={value} type="button" className="chat-pay-shortcut" onClick={() => setPaymentAmount(String(value))}>
                    ${value}
                  </button>
                ))}
              </div>

              <div className="chat-pay-keypad">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, 'backspace'].map((key) => (
                  <button
                    key={key}
                    type="button"
                    className={`chat-pay-key ${key === 'backspace' ? 'icon' : ''}`}
                    onClick={() => handlePaymentKey(key)}
                  >
                    {key === 'backspace' ? '⌫' : key}
                  </button>
                ))}
              </div>

              <button type="button" className="chat-pay-auth-btn" onClick={() => setShowPaySheet(false)}>
                <Fingerprint size={22} color="var(--gold)" />
                Authorize {formattedPaymentAmount} FCUSD
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};


export { AlertsModule, ChatsModule, ChatDetailModule };
