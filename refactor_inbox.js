const fs = require('fs');

const replacement = `const AlertsModule = () => {
  const [expandedAlert, setExpandedAlert] = React.useState(null);
  const [dismissedAlerts, setDismissedAlerts] = React.useState([]);

  const alerts = [
    { id: 'a1', from: 'FD', sender: 'Federal Dept of Taxation', time: '9:41 AM', unread: true, type: 'urgent', title: '2026 Declaration Required', preview: 'Please submit your encrypted annual tax proofs via ZKP to the Federal Revenue Office before April 15, 2026.', actions: ['Review & Submit', 'Remind Later'] },
    { id: 'a2', from: null, sender: 'NexaCorp HR', icon: 'building', time: 'Yesterday', unread: false, type: 'info', title: 'Payroll Deposit Confirmation', preview: 'Your monthly payroll of 12,400 FCUSD has been successfully routed to your sovereign wallet.', actions: ['View Receipt'] },
    { id: 'a3', from: null, sender: 'FC Identity Authority', icon: 'shield', time: '2 days ago', unread: false, type: 'security', title: 'Biometric Template Updated', preview: 'Your FaceID biometric vector has been re-encrypted and stored in your local secure enclave. No data left your device.', actions: ['View Audit Log'] },
    { id: 'a4', from: null, sender: 'Governance DAO', icon: 'vote', time: '3 days ago', unread: false, type: 'governance', title: 'Proposal #127 Passed', preview: 'Infrastructure Upgrade Fund allocation of 2.5M FCUSD approved with 89.2% quorum. Your vote: IN FAVOR.', actions: ['View Results'] },
    { id: 'a5', from: null, sender: 'FC Network', icon: 'activity', time: '5 days ago', unread: false, type: 'system', title: 'Scheduled Maintenance Complete', preview: 'Sovereign Chain node upgrade v3.2.1 completed. All ZKP circuits are operating at full throughput.', actions: [] },
  ];

  const visibleAlerts = alerts.filter(a => !dismissedAlerts.includes(a.id));

  const getAlertIcon = (alert) => {
    if (alert.from) return <span style={{fontWeight: '800', fontSize: '14px', color: 'var(--navy)'}}>{alert.from}</span>;
    if (alert.icon === 'building') return <Building2 size={20} color="var(--navy)" />;
    if (alert.icon === 'shield') return <Shield size={20} color="var(--blue)" />;
    if (alert.icon === 'vote') return <Vote size={20} color="var(--gold)" />;
    if (alert.icon === 'activity') return <Activity size={20} color="var(--green)" />;
    return <Bell size={20} color="var(--text-muted)" />;
  };

  const getAlertAccent = (type) => {
    if (type === 'urgent') return 'var(--red)';
    if (type === 'security') return 'var(--blue)';
    if (type === 'governance') return 'var(--gold)';
    return 'transparent';
  };

  return (
    <motion.div key="alerts" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="module-content" style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
      
      {/* Summary Banner */}
      <div className="dashboard-card-v5" style={{background: 'var(--navy)', borderColor: 'var(--navy)', color: '#fff'}}>
        <div className="dash-header">
          <span className="dash-title" style={{color: '#9CA3AF'}}>SECURE COMMUNICATIONS</span>
          <span className="pill-blue" style={{background: 'rgba(59,130,246,0.3)', color: '#fff', border: '1px solid rgba(59,130,246,0.5)'}}>{visibleAlerts.filter(a => a.unread).length} Unread</span>
        </div>
        <div className="dash-body">
          <div style={{fontSize: '24px', fontWeight: '800', lineHeight: '1.2'}}>Zero-Knowledge<br/>Alerts</div>
          <div style={{background: '#1F2937', padding: '12px', borderRadius: '50%'}}>
              <Bell size={32} color="var(--gold)" />
          </div>
        </div>
      </div>
  
      {/* Alert Items */}
      <div>
        <div className="section-title">NOTIFICATIONS</div>
        {visibleAlerts.map(alert => (
          <div key={alert.id} className="list-item-v5" 
            onClick={() => setExpandedAlert(expandedAlert === alert.id ? null : alert.id)}
            style={{ borderLeft: \`4px solid \${getAlertAccent(alert.type)}\`, cursor: 'pointer', transition: 'all 0.2s ease', marginBottom: '4px' }}
          >
            <div style={{display: 'flex', flexDirection: 'column', gap: '8px', width: '100%'}}>
              <div style={{display: 'flex', gap: '12px', alignItems: 'flex-start'}}>
                <div style={{width: '40px', height: '40px', background: '#F3F4F6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                  {getAlertIcon(alert)}
                </div>
                <div style={{flex: 1, minWidth: 0}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div style={{fontSize: '14px', fontWeight: alert.unread ? '800' : '700', color: alert.unread ? 'var(--navy)' : 'var(--text-dark)'}}>{alert.sender}</div>
                    <div style={{fontSize: '12px', fontWeight: alert.unread ? '700' : '500', color: alert.unread ? 'var(--blue)' : 'var(--text-muted)', flexShrink: 0}}>{alert.time}</div>
                  </div>
                  <div style={{fontSize: '14px', fontWeight: alert.unread ? '700' : '600', color: 'var(--text-dark)', marginTop: '4px'}}>{alert.title}</div>
                  {expandedAlert !== alert.id && (
                    <div style={{fontSize: '13px', color: 'var(--text-muted)', fontWeight: '500', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{alert.preview}</div>
                  )}
                </div>
              </div>
              
              {/* Expanded Content */}
              {expandedAlert === alert.id && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} style={{ paddingLeft: '52px', paddingTop: '4px' }}>
                  <div style={{ fontSize: '14px', color: 'var(--text-dark)', lineHeight: '1.6', fontWeight: '500', marginBottom: '12px' }}>{alert.preview}</div>
                  {alert.actions.length > 0 && (
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {alert.actions.map((action, i) => (
                        <button key={i} onClick={e => { e.stopPropagation(); setDismissedAlerts(p => [...p, alert.id]); }} style={{ padding: '8px 16px', borderRadius: '10px', background: i === 0 ? 'var(--navy)' : 'rgba(0,0,0,0.04)', color: i === 0 ? 'white' : 'var(--navy)', fontWeight: '700', fontSize: '13px', border: i === 0 ? 'none' : '1px solid #e2e8f0', cursor: 'pointer' }}>{action}</button>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        ))}

        {visibleAlerts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
            <CheckCircle2 size={48} color="var(--green)" style={{ marginBottom: '12px', opacity: 0.5 }} />
            <div style={{ fontSize: '16px', fontWeight: '700' }}>All Clear</div>
            <div style={{ fontSize: '14px', fontWeight: '500', marginTop: '4px' }}>No pending notifications</div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const ChatsModule = ({ onSelectChat, onOpenScanner }) => {
  const contacts = [
    { id: 'c1', name: 'Alexander Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100', status: 'L3 Verified', lastMsg: 'Payment Received', lastMsgType: 'payment', time: '10:42 AM', unread: 1 },
    { id: 'c2', name: 'Sarah Williams', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100', status: 'L2 Verified', lastMsg: "Let's split the dinner bill.", lastMsgType: 'text', time: 'Yesterday', unread: 0 },
    { id: 'c3', name: 'Marcus Rivera', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100', status: 'L3 Verified', lastMsg: 'Sent you 500 FCUSD', lastMsgType: 'payment', time: 'Yesterday', unread: 2 },
    { id: 'c4', name: 'Elena Vasquez', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100', status: 'L1 Verified', lastMsg: 'Can you sign the multi-sig?', lastMsgType: 'text', time: 'Mon', unread: 0 },
  ];

  return (
    <motion.div key="chats" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="module-content" style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
      
      {/* Summary Banner */}
      <div className="dashboard-card-v5" style={{background: 'var(--navy)', borderColor: 'var(--navy)', color: '#fff'}}>
        <div className="dash-header">
          <span className="dash-title" style={{color: '#9CA3AF'}}>CITIZEN NETWORK</span>
          <span className="pill-blue" style={{background: 'rgba(59,130,246,0.3)', color: '#fff', border: '1px solid rgba(59,130,246,0.5)'}}>{contacts.reduce((acc, c) => acc + c.unread, 0)} Unread</span>
        </div>
        <div className="dash-body">
          <div style={{fontSize: '24px', fontWeight: '800', lineHeight: '1.2'}}>Zero-Knowledge<br/>Encrypted Chat</div>
          <div style={{background: '#1F2937', padding: '12px', borderRadius: '50%'}}>
              <MessageSquare size={32} color="var(--gold)" />
          </div>
        </div>
      </div>

      {/* Search + QR */}
      <div style={{display: 'flex', gap: '12px'}}>
        <div className="search-bar" style={{ flex: 1, background: 'white', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Users size={20} color="var(--text-muted)" />
          <input type="text" placeholder="Search Verified Citizens..." style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '15px', fontWeight: '600', color: 'var(--navy)' }} />
        </div>
        <div onClick={onOpenScanner} style={{background: 'var(--blue)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(59,130,246,0.3)'}}>
          <QrCode size={24} color="white" />
        </div>
      </div>

      {/* Online Status */}
      <div style={{ display: 'flex', gap: '16px', paddingBottom: '4px', overflowX: 'auto' }}>
        {contacts.slice(0, 4).map(c => (
          <div key={c.id + '-avatar'} onClick={() => onSelectChat(c)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer', minWidth: '60px' }}>
            <div style={{ position: 'relative' }}>
              <img src={c.avatar} style={{width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #e2e8f0'}} />
              <div style={{position: 'absolute', bottom: '0', right: '0', width: '14px', height: '14px', background: 'var(--green)', borderRadius: '50%', border: '3px solid white'}}></div>
            </div>
            <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textAlign: 'center', maxWidth: '60px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name.split(' ')[0]}</div>
          </div>
        ))}
      </div>

      {/* Chat List */}
      <div>
        <div className="section-title">RECENT CHATS</div>
        {contacts.map(c => (
          <div key={c.id} className="list-item-v5" onClick={() => onSelectChat(c)} style={{cursor: 'pointer', transition: 'background 0.2s ease'}}>
            <div style={{display: 'flex', gap: '12px', alignItems: 'center', width: '100%'}}>
              <div style={{position: 'relative'}}>
                <img src={c.avatar} style={{width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover'}} />
                <div style={{position: 'absolute', bottom: '-2px', right: '-2px', background: 'white', borderRadius: '50%', padding: '2px'}}><CheckCircle2 size={12} color="var(--green)" /></div>
              </div>
              <div style={{flex: 1, minWidth: 0}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <div style={{fontSize: '15px', fontWeight: '800', color: 'var(--navy)'}}>{c.name}</div>
                  <div style={{fontSize: '12px', fontWeight: c.unread > 0 ? '700' : '500', color: c.unread > 0 ? 'var(--blue)' : 'var(--text-muted)'}}>{c.time}</div>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px'}}>
                  <div style={{fontSize: '13px', color: 'var(--text-muted)', fontWeight: c.unread > 0 ? '600' : '500', display: 'flex', alignItems: 'center', gap: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                    {c.lastMsgType === 'payment' && <Banknote size={14} color="var(--blue)" />}
                    {c.lastMsg}
                  </div>
                  {c.unread > 0 && (
                    <div style={{ background: 'var(--blue)', color: 'white', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '800', flexShrink: 0 }}>{c.unread}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
`

let content = fs.readFileSync('src/App.jsx', 'utf8');

// Replace InboxModule
const parts = content.split('const InboxModule = ({ onSelectChat, onOpenScanner }) => {');
if (parts.length === 2) {
  const parts2 = parts[1].split('const ChatDetailModule = ({ contact, onBack }) => {');
  
  let newContent = parts[0] + replacement + '\n\nconst ChatDetailModule = ({ contact, onBack }) => {' + parts2[1];
  
  // Replace references
  // <MessageSquare size={20} color="var(--gold)" />
  // We need to alter onClick={() => setActiveTab('Inbox')} for both icons.
  
  // Replace all instances of setActiveTab('Inbox') inside header:
  let modContent = newContent.replace(
    /onClick=\{\(\) => setActiveTab\('Inbox'\)\}\>\n\s+<MessageSquare/g, 
    "onClick={() => setActiveTab('Chats')}>\n            <MessageSquare"
  );
  
  modContent = modContent.replace(
    /onClick=\{\(\) => setActiveTab\('Inbox'\)\}\>\n\s+<Bell/g, 
    "onClick={() => setActiveTab('Alerts')}>\n            <Bell"
  );
  
  // Replace module rendering
  // {activeTab === 'Inbox' && <InboxModule onSelectChat={setSelectedChat} onOpenScanner={() => setShowScanner(true)} />}
  modContent = modContent.replace(
    /\{activeTab === 'Inbox' && <InboxModule onSelectChat=\{setSelectedChat\} onOpenScanner=\{\(\) => setShowScanner\(true\)\} \/>\}/g,
    "{activeTab === 'Chats' && <ChatsModule onSelectChat={setSelectedChat} onOpenScanner={() => setShowScanner(true)} />}\n          {activeTab === 'Alerts' && <AlertsModule />}"
  );
  
  fs.writeFileSync('src/App.jsx', modContent);
  console.log('SUCCESS');
} else {
  console.log('FAILED');
}
