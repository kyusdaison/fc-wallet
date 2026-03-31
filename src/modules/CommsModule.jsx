import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ArrowUp, Banknote, Bell, Building2, CheckCircle2, ChevronDown, ChevronLeft, CircleDollarSign, Fingerprint, MessageSquare, Phone, QrCode, Share2, Shield, ShieldCheck, Users, Vote } from 'lucide-react';
import { CITIZEN_ALERTS, CITIZEN_CHAT_CONTACTS } from '../data/mockData';

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

const AlertsModule = () => {
  const [expandedAlert, setExpandedAlert] = useState(null);
  const [dismissedAlerts, setDismissedAlerts] = useState([]);
  const [alertFilter, setAlertFilter] = useState('All');

  const alerts = CITIZEN_ALERTS;

  const activeAlerts = alerts.filter((alert) => !dismissedAlerts.includes(alert.id));
  const visibleAlerts = activeAlerts.filter((alert) => {
    if (alertFilter === 'All') return true;
    if (alertFilter === 'Unread') return alert.unread;
    if (alertFilter === 'Urgent') return alert.type === 'urgent';
    if (alertFilter === 'Security') return alert.type === 'security';
    return true;
  });

  const getAlertIcon = (alert) => {
    if (alert.from) return <span className="signal-avatar-copy">{alert.from}</span>;
    if (alert.icon === 'building') return <Building2 size={20} color="var(--navy)" />;
    if (alert.icon === 'shield') return <Shield size={20} color="var(--blue)" />;
    if (alert.icon === 'vote') return <Vote size={20} color="var(--gold)" />;
    if (alert.icon === 'activity') return <Activity size={20} color="var(--green)" />;
    return <Bell size={20} color="var(--text-muted)" />;
  };

  return (
    <motion.div key="alerts" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="module-content" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <CommsHero
        tone="gold"
        eyebrow="Secure Communications"
        title="Zero-Knowledge Alerts"
        subtitle="Priority notices, governance signals, and security updates in one encrypted inbox."
        badge={`${activeAlerts.filter((alert) => alert.unread).length} unread`}
        icon={<Bell size={30} color="var(--gold)" />}
        metrics={[
          { label: 'Urgent', value: activeAlerts.filter((alert) => alert.type === 'urgent').length },
          { label: 'Security', value: activeAlerts.filter((alert) => alert.type === 'security').length },
          { label: 'Pending', value: activeAlerts.length },
        ]}
      />

      <div className="signal-filter-row">
        {['All', 'Unread', 'Urgent', 'Security'].map((filter) => (
          <button
            key={filter}
            type="button"
            className={`signal-filter-pill ${alertFilter === filter ? 'active gold' : ''}`}
            onClick={() => setAlertFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="signal-stack">
        {visibleAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`signal-card ${alert.type} ${alert.unread ? 'unread' : ''}`}
            onClick={() => setExpandedAlert(expandedAlert === alert.id ? null : alert.id)}
          >
            <div className="signal-card-head">
              <div className={`signal-avatar ${alert.type}`}>{getAlertIcon(alert)}</div>
              <div className="signal-copy">
                <div className="signal-meta-row">
                  <div className="signal-sender">{alert.sender}</div>
                  <div className="signal-time">{alert.time}</div>
                </div>
                <div className="signal-title-row">
                  <div className="signal-title">{alert.title}</div>
                  {alert.unread ? <span className="signal-status-dot"></span> : null}
                </div>
                {expandedAlert !== alert.id ? <div className="signal-preview">{alert.preview}</div> : null}
              </div>
            </div>

            {expandedAlert === alert.id && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="signal-expanded">
                <div className="signal-expanded-copy">{alert.preview}</div>
                {alert.actions.length > 0 ? (
                  <div className="signal-action-row">
                    {alert.actions.map((action, index) => (
                      <button
                        key={action}
                        type="button"
                        className={`signal-action-btn ${index === 0 ? 'primary' : 'secondary'}`}
                        onClick={(event) => {
                          event.stopPropagation();
                          setDismissedAlerts((prev) => [...prev, alert.id]);
                        }}
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                ) : null}
              </motion.div>
            )}
          </div>
        ))}

        {visibleAlerts.length === 0 ? (
          <div className="signal-empty-state">
            <CheckCircle2 size={46} color="var(--green)" />
            <div className="signal-empty-title">All Clear</div>
            <div className="signal-empty-copy">No notifications match the current filter.</div>
          </div>
        ) : null}
      </div>
    </motion.div>
  );
};

const ChatsModule = ({ onSelectChat, onOpenScanner }) => {
  const [chatQuery, setChatQuery] = useState('');

  const contacts = CITIZEN_CHAT_CONTACTS;

  const totalUnread = contacts.reduce((count, contact) => count + contact.unread, 0);
  const filteredContacts = contacts.filter((contact) => {
    const query = chatQuery.trim().toLowerCase();
    if (!query) return true;
    return contact.name.toLowerCase().includes(query) || contact.lastMsg.toLowerCase().includes(query);
  });

  return (
    <motion.div key="chats" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="module-content" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <CommsHero
        tone="blue"
        eyebrow="Citizen Network"
        title="Encrypted Chat"
        subtitle="Verified peers, payment threads, and secure message history in one live relay."
        badge={`${totalUnread} unread`}
        icon={<MessageSquare size={30} color="var(--gold)" />}
        metrics={[
          { label: 'Contacts', value: contacts.length },
          { label: 'L3 Peers', value: contacts.filter((contact) => contact.status.includes('L3')).length },
          { label: 'Payments', value: contacts.filter((contact) => contact.lastMsgType === 'payment').length },
        ]}
      />

      <div className="chat-search-row">
        <div className="chat-search-shell">
          <Users size={20} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search verified citizens..."
            value={chatQuery}
            onChange={(event) => setChatQuery(event.target.value)}
            className="chat-search-input"
          />
        </div>
        <button type="button" className="chat-scan-btn" onClick={onOpenScanner}>
          <QrCode size={22} color="white" />
        </button>
      </div>

      <div>
        <div className="section-title">ACTIVE NOW</div>
        <div className="chat-orbit-strip">
          {contacts.slice(0, 4).map((contact) => (
            <button key={contact.id} type="button" className="chat-orbit-pill" onClick={() => onSelectChat(contact)}>
              <div className="chat-orbit-avatar-wrap">
                <img src={contact.avatar} alt={contact.name} className="chat-orbit-avatar" />
                <span className="chat-orbit-status"></span>
              </div>
              <span className="chat-orbit-name">{contact.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="section-title">RECENT CHATS</div>
        <div className="chat-list-shell">
          {filteredContacts.map((contact, index) => (
            <div key={contact.id}>
              <button type="button" className="chat-row" onClick={() => onSelectChat(contact)}>
                <div className="chat-row-avatar-wrap">
                  <img src={contact.avatar} alt={contact.name} className="chat-row-avatar" />
                  <span className="chat-row-verified"><CheckCircle2 size={12} color="var(--green)" /></span>
                </div>
                <div className="chat-row-copy">
                  <div className="chat-row-meta">
                    <div className="chat-row-name">{contact.name}</div>
                    <div className={`chat-row-time ${contact.unread > 0 ? 'active' : ''}`}>{contact.time}</div>
                  </div>
                  <div className="chat-row-message">
                    <div className="chat-row-message-copy">
                      {contact.lastMsgType === 'payment' ? <Banknote size={14} color="var(--blue)" /> : null}
                      {contact.lastMsg}
                    </div>
                    {contact.unread > 0 ? <span className="chat-row-unread">{contact.unread}</span> : null}
                  </div>
                  <div className="chat-row-status">{contact.status}</div>
                </div>
              </button>
              {index < filteredContacts.length - 1 ? <div className="chat-row-divider"></div> : null}
            </div>
          ))}

          {filteredContacts.length === 0 ? (
            <div className="signal-empty-state compact">
              <MessageSquare size={42} color="var(--blue)" />
              <div className="signal-empty-title">No matches</div>
              <div className="signal-empty-copy">Try another name or search term.</div>
            </div>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
};
const ChatDetailModule = ({ contact, onBack }) => {
  const [showPaySheet, setShowPaySheet] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('150');
  const [messageDraft, setMessageDraft] = useState('');

  const formattedPaymentAmount = Number(paymentAmount || 0).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const messageRows = [
    {
      id: 'contact-1',
      type: 'incoming',
      body: 'Hey! Are we still on for the Web3 summit tonight?',
      meta: '10:30 AM',
    },
    {
      id: 'me-1',
      type: 'outgoing',
      body: "Yes absolutely! I'll cover the tickets.",
      meta: '10:35 AM • Read',
    },
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


export { CommsHero, AlertsModule, ChatsModule, ChatDetailModule };
