import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Globe, Activity, Bell, Wallet, User, Users, SlidersHorizontal, CreditCard, Info, FileText, FileSignature, ChevronLeft, ChevronRight, Fingerprint, Lock, Smartphone, Database, Clock, Share2, ArrowRightLeft, TrendingUp, CheckCircle2, Sparkles, X } from 'lucide-react';
import { CITIZEN_PROFILE } from '../data/mockData';
import { useAppStore } from '../store/useAppStore';
import { useWalletStore } from '../store/useWalletStore';

/* ---- Shared micro-components ---- */
const Toggle = ({ enabled, onToggle }) => (
  <button type="button" className={`settings-toggle ${enabled ? 'active' : ''}`} onClick={onToggle} aria-pressed={enabled}>
    <span className="settings-toggle-knob"></span>
  </button>
);

const SRow = ({ icon, label, desc, right, onClick }) => (
  <div onClick={onClick} onKeyDown={onClick ? e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } } : undefined} className={`set-row ${onClick ? 'clickable' : ''}`} role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined}>
    {icon && <div className="set-row-icon">{icon}</div>}
    <div className="set-row-copy">
      <div className="set-row-label">{label}</div>
      {desc && <div className="set-row-desc">{desc}</div>}
    </div>
    <div className="set-row-trail">{right || (onClick && <ChevronRight size={16} color="var(--text-tertiary)" />)}</div>
  </div>
);

const Divider = () => <div className="set-divider"></div>;

const SubHeader = ({ title, onBack }) => (
  <div className="set-sub-header">
    <button type="button" className="set-back" onClick={onBack}><ChevronLeft size={20} color="#93c5fd" strokeWidth={2.5} /></button>
    <span className="set-sub-title">{title}</span>
  </div>
);

const InfoBar = ({ items }) => (
  <div className="set-info-bar">
    {items.map((item, i) => (
      <div key={item.label} className="set-info-item">
        <span>{item.label}</span>
        <strong>{item.value}</strong>
      </div>
    ))}
  </div>
);

/* ---- SETTINGS MODULE ---- */
const SettingsModule = ({ isTab = false, onClose }) => {
  const setShowOnboarding = useAppStore(s => s.setShowOnboarding);
  const faceIdEnabled = useWalletStore(s => s.faceIdEnabled);
  const setFaceIdEnabled = useWalletStore(s => s.setFaceIdEnabled);
  const dualLockEnabled = useWalletStore(s => s.dualLockEnabled);
  const setDualLockEnabled = useWalletStore(s => s.setDualLockEnabled);
  const [settingsSection, setSettingsSection] = useState(null);
  const selectedLang = useWalletStore(s => s.selectedLang);
  const setSelectedLang = useWalletStore(s => s.setSelectedLang);
  const selectedCurrency = useWalletStore(s => s.selectedCurrency);
  const setSelectedCurrency = useWalletStore(s => s.setSelectedCurrency);
  const darkMode = useWalletStore(s => s.darkMode);
  const setDarkMode = useWalletStore(s => s.setDarkMode);
  const pushEnabled = useWalletStore(s => s.pushEnabled);
  const setPushEnabled = useWalletStore(s => s.setPushEnabled);
  const txAlerts = useWalletStore(s => s.txAlerts);
  const setTxAlerts = useWalletStore(s => s.setTxAlerts);
  const priceAlerts = useWalletStore(s => s.priceAlerts);
  const setPriceAlerts = useWalletStore(s => s.setPriceAlerts);
  const dailyLimit = useWalletStore(s => s.dailyLimit);
  const setDailyLimit = useWalletStore(s => s.setDailyLimit);
  const defaultChain = useWalletStore(s => s.defaultChain);
  const setDefaultChain = useWalletStore(s => s.setDefaultChain);
  const seedRevealed = useWalletStore(s => s.seedRevealed);
  const setSeedRevealed = useWalletStore(s => s.setSeedRevealed);
  const whitelistEnabled = useWalletStore(s => s.whitelistEnabled);
  const setWhitelistEnabled = useWalletStore(s => s.setWhitelistEnabled);

  const [signingLevels, setSigningLevels] = useState({
    level1: { enabled: true, threshold: '50', dailyLimit: '200' },
    level2: { enabled: true, thresholdMin: '50', thresholdMax: '5000' },
    level3: { enabled: true, threshold: '5000' },
    level4: { enabled: true, triggerMode: 'manual' },
  });

  const updateLevel = (level, field, value) => {
    setSigningLevels(prev => ({ ...prev, [level]: { ...prev[level], [field]: value } }));
  };

  /* ---- Data ---- */
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
  ];
  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  ];
  const addressBook = [
    { name: 'Alex Kim', address: '0x8a2E...4F91', chain: 'FC', tag: 'Friend' },
    { name: 'Elena V.', address: '0x3bC1...7D02', chain: 'ETH', tag: 'Work' },
    { name: 'Treasury Vault', address: 'fc1q9...xmr7', chain: 'FC', tag: 'Savings' },
  ];
  const recoveryContacts = [
    { name: 'Alex Kim', status: 'confirmed', avatar: 'A' },
    { name: 'Marcus R.', status: 'confirmed', avatar: 'M' },
    { name: 'Add Guardian', status: 'empty', avatar: '+' },
  ];
  const chains = [
    { id: 'FC', name: 'FC Chain', color: 'var(--text-dark)' },
    { id: 'ETH', name: 'Ethereum', color: '#627EEA' },
    { id: 'BTC', name: 'Bitcoin', color: '#F7931A' },
    { id: 'SOL', name: 'Solana', color: '#14F195' },
  ];
  const networkTelemetry = [
    { label: 'RPC Endpoint', value: 'fc-mainnet-0xA9', tone: 'green' },
    { label: 'Latency', value: '12ms' },
    { label: 'Block Height', value: '19,847,231', mono: true },
    { label: 'Gas Price', value: '0.5 gwei' },
  ];
  const securityLogs = [
    { label: 'Face ID', time: 'Today 12:05 PM', detail: 'Primary unlock' },
    { label: 'Face ID', time: 'Yesterday 9:42 AM', detail: 'Biometric confirm' },
    { label: 'PIN Fallback', time: 'Mar 28', detail: 'Manual fallback' },
  ];
  const authorizedContracts = [
    { name: 'FC-DEX Router', permission: 'Unlimited FCUSD', tone: 'blue' },
    { name: 'FC Real Estate', permission: 'Read ZKP Identity', tone: 'gold' },
  ];
  const aboutLinks = [
    { key: 'privacy', icon: <FileText size={16} color="var(--blue)" />, label: 'Privacy Policy' },
    { key: 'terms', icon: <FileSignature size={16} color="var(--gold)" />, label: 'Terms of Service' },
    { key: 'support', icon: <Users size={16} color="#10b981" />, label: 'Community & Support' },
    { key: 'site', icon: <Globe size={16} color="#8b5cf6" />, label: 'FC Authority Website' },
  ];
  const limitPresets = ['1000', '5000', '10000', '50000'];
  const signingPresets = { level1: ['20', '50', '100', '200'], level3: ['1000', '5000', '10000', '50000'] };
  const vaultTriggerOptions = [
    { id: 'manual', label: 'Manual Selection', desc: 'Choose vault mode per tx' },
    { id: 'amount', label: 'Auto by Amount', desc: 'Trigger above threshold' },
    { id: 'sensitive', label: 'Sensitive Ops Only', desc: 'Reset, export, card changes' },
  ];

  /* ---- Derived ---- */
  const selectedLanguage = languages.find(l => l.code === selectedLang);
  const selectedCurrencyOption = currencies.find(c => c.code === selectedCurrency);
  const selectedChain = chains.find(c => c.id === defaultChain);
  const confirmedGuardians = recoveryContacts.filter(c => c.status === 'confirmed').length;
  const numericDailyLimit = Number(dailyLimit || 0);
  const numericLevel2Max = Number(signingLevels.level2.thresholdMax || 0);
  const numericLevel3Threshold = Number(signingLevels.level3.threshold || 0);
  const vaultTriggerLabel = signingLevels.level4.triggerMode === 'manual' ? 'Manual' : signingLevels.level4.triggerMode === 'sensitive' ? 'Ops Only' : 'By Amount';

  /* ---- Menu rows for the main page ---- */
  const menuGroups = [
    {
      title: 'ACCOUNT',
      rows: [
        { key: 'language', icon: <Globe size={16} color="var(--blue)" />, label: 'Language & Region', desc: `${selectedLanguage?.flag} ${selectedLanguage?.name} · ${selectedCurrency}`, action: () => setSettingsSection('language') },
        { key: 'appearance', icon: <Sparkles size={16} color="var(--gold)" />, label: 'Appearance', desc: darkMode ? 'Dark mode' : 'Light mode', action: () => setSettingsSection('appearance') },
        { key: 'notifications', icon: <Bell size={16} color="var(--gold)" />, label: 'Notifications', desc: pushEnabled ? 'Push enabled' : 'Muted', action: () => setSettingsSection('notifications') },
      ],
    },
    {
      title: 'SECURITY',
      rows: [
        { key: 'security', icon: <Shield size={16} color="#ef4444" />, label: 'Security Center', desc: 'Biometric, devices, login', action: () => setSettingsSection('security') },
        { key: 'signing', icon: <SlidersHorizontal size={16} color="#ef4444" />, label: 'Signing Rules', desc: `4 levels · Tap < $${signingLevels.level1.threshold}`, action: () => setSettingsSection('signing') },
        { key: 'limits', icon: <CreditCard size={16} color="#f59e0b" />, label: 'Spending Limits', desc: `Daily: ${numericDailyLimit.toLocaleString()} FCUSD`, action: () => setSettingsSection('limits') },
      ],
    },
    {
      title: 'WALLET & RECOVERY',
      rows: [
        { key: 'wallet', icon: <Wallet size={16} color="var(--navy)" />, label: 'Wallet Management', desc: 'Backup, export, contracts', action: () => setSettingsSection('wallet') },
        { key: 'recovery', icon: <Users size={16} color="#8b5cf6" />, label: 'Social Recovery', desc: `${confirmedGuardians} guardians active`, action: () => setSettingsSection('recovery') },
        { key: 'addressbook', icon: <User size={16} color="var(--blue)" />, label: 'Address Book', desc: `${addressBook.length} saved contacts`, action: () => setSettingsSection('addressbook') },
        { key: 'network', icon: <Activity size={16} color="#10b981" />, label: 'Network & Chain', desc: `Default: ${selectedChain?.name}`, action: () => setSettingsSection('network') },
      ],
    },
    {
      title: 'ABOUT',
      rows: [
        { key: 'about', icon: <Info size={16} color="var(--text-tertiary)" />, label: 'About FC Wallet', desc: 'v2.4.0 · FC Authority', action: () => setSettingsSection('about') },
        { key: 'onboarding', icon: <Sparkles size={16} color="var(--gold)" />, label: 'Replay Welcome Tour', desc: 'Walk through setup again', action: () => setShowOnboarding(true) },
      ],
    },
  ];

  /* ============================================================
     SUB-PAGES
     ============================================================ */
  const renderSubSection = () => {
    switch (settingsSection) {

      case 'security':
        return (<>
          <SubHeader title="Security Center" onBack={() => setSettingsSection(null)} />
          <div className="set-page">
            <InfoBar items={[
              { label: 'Face / Iris', value: faceIdEnabled ? 'Live' : 'Paused' },
              { label: 'Dual Lock', value: dualLockEnabled ? 'Armed' : 'Manual' },
              { label: 'Devices', value: '2 linked' },
            ]} />

            <div className="section-title">ACCESS RULES</div>
            <div className="set-card">
              <SRow icon={<Fingerprint size={16} color="var(--blue)" />} label="Face/Iris Gateway" desc="Biometric for tx > 100 FCUSD" right={<Toggle enabled={faceIdEnabled} onToggle={() => setFaceIdEnabled(!faceIdEnabled)} />} />
              <Divider />
              <SRow icon={<Lock size={16} color="var(--gold)" />} label="Dual Cold-Lock" desc="Secure Enclave for tx > 1000" right={<Toggle enabled={dualLockEnabled} onToggle={() => setDualLockEnabled(!dualLockEnabled)} />} />
              <Divider />
              <SRow icon={<Shield size={16} color="#ef4444" />} label="Emergency Lock" desc="Instantly freeze all assets" onClick={() => {}} />
            </div>

            <div className="section-title">AUTHORIZED DEVICES</div>
            <div className="set-card">
              <SRow icon={<Smartphone size={16} color="#10b981" />} label="iPhone 16 Pro" desc="Current · Last seen just now" right={<span className="set-badge green">Active</span>} />
              <Divider />
              <SRow icon={<Database size={16} color="var(--blue)" />} label="FC Vault 01 (Cold)" desc="Last synced 2 days ago" right={<span className="set-badge slate">Paired</span>} />
            </div>

            <div className="section-title">LOGIN HISTORY</div>
            <div className="set-card">
              {securityLogs.map((log, i) => (
                <React.Fragment key={log.time}>
                  <div className="set-log-row">
                    <Clock size={13} color="var(--text-tertiary)" />
                    <div className="set-log-copy"><strong>{log.label}</strong><span>{log.detail}</span></div>
                    <span className="set-log-time">{log.time}</span>
                  </div>
                  {i < securityLogs.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </>);

      case 'language':
        return (<>
          <SubHeader title="Language & Region" onBack={() => setSettingsSection(null)} />
          <div className="set-page">
            <InfoBar items={[
              { label: 'Language', value: selectedLanguage?.name },
              { label: 'Currency', value: selectedCurrencyOption?.code },
              { label: 'Format', value: 'Regional' },
            ]} />

            <div className="section-title">DISPLAY LANGUAGE</div>
            <div className="set-card">
              {languages.map((lang, i) => (
                <React.Fragment key={lang.code}>
                  <button type="button" className={`set-select-row ${selectedLang === lang.code ? 'active' : ''}`} onClick={() => setSelectedLang(lang.code)}>
                    <span className="set-select-flag">{lang.flag}</span>
                    <div className="set-select-copy"><strong>{lang.name}</strong><span>{lang.code.toUpperCase()}</span></div>
                    {selectedLang === lang.code && <CheckCircle2 size={18} color="var(--blue)" strokeWidth={2.5} />}
                  </button>
                  {i < languages.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </div>

            <div className="section-title">DISPLAY CURRENCY</div>
            <div className="set-card">
              {currencies.map((cur, i) => (
                <React.Fragment key={cur.code}>
                  <button type="button" className={`set-select-row ${selectedCurrency === cur.code ? 'active' : ''}`} onClick={() => setSelectedCurrency(cur.code)}>
                    <span className="set-select-symbol">{cur.symbol}</span>
                    <div className="set-select-copy"><strong>{cur.code}</strong><span>{cur.name}</span></div>
                    {selectedCurrency === cur.code && <CheckCircle2 size={18} color="var(--blue)" strokeWidth={2.5} />}
                  </button>
                  {i < currencies.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </>);

      case 'network':
        return (<>
          <SubHeader title="Network & Chain" onBack={() => setSettingsSection(null)} />
          <div className="set-page">
            <InfoBar items={[
              { label: 'Default', value: selectedChain?.name },
              { label: 'Latency', value: '12ms' },
              { label: 'Status', value: 'Stable' },
            ]} />

            <div className="section-title">DEFAULT CHAIN</div>
            <div className="set-card">
              {chains.map((chain, i) => (
                <React.Fragment key={chain.id}>
                  <button type="button" className={`set-select-row ${defaultChain === chain.id ? 'active' : ''}`} onClick={() => setDefaultChain(chain.id)}>
                    <div className="set-chain-dot" style={{ background: chain.color }}><span>{chain.id}</span></div>
                    <div className="set-select-copy"><strong>{chain.name}</strong><span>{chain.id} route</span></div>
                    {defaultChain === chain.id && <CheckCircle2 size={18} color="var(--blue)" strokeWidth={2.5} />}
                  </button>
                  {i < chains.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </div>

            <div className="section-title">NETWORK STATUS</div>
            <div className="set-telemetry-grid">
              {networkTelemetry.map(item => (
                <div key={item.label} className={`set-telemetry-card ${item.tone || ''}`}>
                  <span>{item.label}</span>
                  <strong className={item.mono ? 'mono' : ''}>{item.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </>);

      case 'notifications':
        return (<>
          <SubHeader title="Notifications" onBack={() => setSettingsSection(null)} />
          <div className="set-page">
            <InfoBar items={[
              { label: 'Push', value: pushEnabled ? 'On' : 'Off' },
              { label: 'Transfers', value: txAlerts ? 'Live' : 'Off' },
              { label: 'Prices', value: priceAlerts ? 'On' : 'Off' },
            ]} />
            <div className="set-card">
              <SRow icon={<Bell size={16} color="var(--blue)" />} label="Push Notifications" desc="Alerts on this device" right={<Toggle enabled={pushEnabled} onToggle={() => setPushEnabled(!pushEnabled)} />} />
              <Divider />
              <SRow icon={<ArrowRightLeft size={16} color="#10b981" />} label="Transaction Alerts" desc="Incoming & outgoing transfers" right={<Toggle enabled={txAlerts} onToggle={() => setTxAlerts(!txAlerts)} />} />
              <Divider />
              <SRow icon={<TrendingUp size={16} color="var(--gold)" />} label="Price Alerts" desc="Target price notifications" right={<Toggle enabled={priceAlerts} onToggle={() => setPriceAlerts(!priceAlerts)} />} />
            </div>
          </div>
        </>);

      case 'wallet':
        return (<>
          <SubHeader title="Wallet Management" onBack={() => setSettingsSection(null)} />
          <div className="set-page">
            <InfoBar items={[
              { label: 'Backups', value: '1 phrase' },
              { label: 'Exports', value: 'CSV / PDF' },
              { label: 'Contracts', value: `${authorizedContracts.length} active` },
            ]} />

            <div className="set-card">
              <SRow icon={<Lock size={16} color="var(--gold)" />} label="Recovery Phrase" desc="View your 12-word seed" onClick={() => setSeedRevealed(!seedRevealed)} />
              {seedRevealed && (
                <div className="set-seed-panel">
                  <div className="set-seed-warn">Never share this phrase with anyone.</div>
                  <div className="set-seed-grid">
                    {['citizen','future','vault','secure','anchor','bridge','token','shield','verify','chain','crypto','ledger'].map((word, i) => (
                      <div key={word} className="set-seed-pill"><span>{i + 1}.</span>{word}</div>
                    ))}
                  </div>
                </div>
              )}
              <Divider />
              <SRow icon={<Share2 size={16} color="var(--blue)" />} label="Export Transactions" desc="Download CSV or PDF history" onClick={() => {}} />
            </div>

            <div className="section-title">AUTHORIZED CONTRACTS</div>
            <div className="set-card">
              {authorizedContracts.map((c, i) => (
                <React.Fragment key={c.name}>
                  <div className="set-contract-row">
                    <div className="set-contract-copy"><strong>{c.name}</strong><span>{c.permission}</span></div>
                    <button type="button" className="set-danger-btn">Revoke</button>
                  </div>
                  {i < authorizedContracts.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </>);

      case 'addressbook':
        return (<>
          <SubHeader title="Address Book" onBack={() => setSettingsSection(null)} />
          <div className="set-page">
            <InfoBar items={[
              { label: 'Contacts', value: addressBook.length },
              { label: 'Chain', value: defaultChain },
              { label: 'Trust', value: whitelistEnabled ? 'Linked' : 'Manual' },
            ]} />

            <button type="button" className="set-primary-btn"><User size={16} /> Add New Contact</button>

            <div className="set-card">
              {addressBook.map((contact, i) => (
                <React.Fragment key={contact.address}>
                  <div className="set-contact-row">
                    <div className="set-contact-avatar">{contact.name.charAt(0)}</div>
                    <div className="set-contact-copy"><strong>{contact.name}</strong><span>{contact.address}</span></div>
                    <div className="set-contact-tags">
                      <span className="set-badge blue">{contact.chain}</span>
                      <span className="set-badge slate">{contact.tag}</span>
                    </div>
                  </div>
                  {i < addressBook.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </>);

      case 'limits':
        return (<>
          <SubHeader title="Spending Limits" onBack={() => setSettingsSection(null)} />
          <div className="set-page">
            <InfoBar items={[
              { label: 'Daily', value: numericDailyLimit.toLocaleString() },
              { label: 'Monthly', value: (numericDailyLimit * 10).toLocaleString() },
              { label: 'Escalation', value: 'Biometric' },
            ]} />

            <div className="set-card" style={{ padding: '14px' }}>
              <div className="section-title" style={{ margin: 0 }}>DAILY TRANSACTION LIMIT</div>
              <div className="set-limit-input-row">
                <input type="text" value={dailyLimit} onChange={e => setDailyLimit(e.target.value)} className="set-limit-input" />
                <span className="set-limit-unit">FCUSD</span>
              </div>
              <div className="set-chip-grid">
                {limitPresets.map(v => (
                  <button key={v} type="button" className={`set-chip ${dailyLimit === v ? 'active' : ''}`} onClick={() => setDailyLimit(v)}>{Number(v).toLocaleString()}</button>
                ))}
              </div>
            </div>

            <div className="set-info-note">
              <Info size={16} color="var(--blue)" />
              <span>Transactions above this limit require stronger verification. Monthly allowance is modeled at 10x daily.</span>
            </div>
          </div>
        </>);

      case 'recovery':
        return (<>
          <SubHeader title="Social Recovery" onBack={() => setSettingsSection(null)} />
          <div className="set-page">
            <InfoBar items={[
              { label: 'Guardians', value: `${confirmedGuardians}/3` },
              { label: 'Threshold', value: '2 of 3' },
              { label: 'Fallback', value: 'Trusted' },
            ]} />

            <div className="section-title">RECOVERY GUARDIANS</div>
            <div className="set-guardian-grid">
              {recoveryContacts.map(c => (
                <button key={c.name} type="button" className={`set-guardian-card ${c.status}`}>
                  <div className="set-guardian-avatar">{c.avatar}</div>
                  <div className="set-guardian-name">{c.name}</div>
                  <div className={`set-guardian-status ${c.status}`}>{c.status === 'confirmed' ? 'Confirmed' : 'Add'}</div>
                </button>
              ))}
            </div>

            <div className="set-card" style={{ padding: '14px', textAlign: 'center' }}>
              <div className="section-title" style={{ margin: 0 }}>RECOVERY THRESHOLD</div>
              <div className="set-threshold-value">2 <span>of</span> 3</div>
              <div className="set-threshold-copy">Two guardians needed before recovery can open the wallet.</div>
            </div>
          </div>
        </>);

      case 'appearance':
        return (<>
          <SubHeader title="Appearance" onBack={() => setSettingsSection(null)} />
          <div className="set-page">
            <div className="set-card">
              <SRow icon={<Sparkles size={16} color="var(--gold)" />} label="Dark Mode" desc="Toggle dark theme" right={<Toggle enabled={darkMode} onToggle={() => setDarkMode(!darkMode)} />} />
            </div>
            <div className="set-theme-grid">
              {[
                { id: 'light', icon: '☀️', title: 'Light', copy: 'Soft contrast', active: !darkMode },
                { id: 'dark', icon: '🌙', title: 'Dark', copy: 'High contrast vault', active: darkMode },
              ].map(mode => (
                <button key={mode.id} type="button" className={`set-theme-card ${mode.active ? 'active' : ''}`} onClick={() => setDarkMode(mode.id === 'dark')}>
                  <div className="set-theme-icon">{mode.icon}</div>
                  <div className="set-theme-title">{mode.title}</div>
                  <div className="set-theme-copy">{mode.copy}</div>
                </button>
              ))}
            </div>
          </div>
        </>);

      case 'signing':
        return (<>
          <SubHeader title="Signing Rules" onBack={() => setSettingsSection(null)} />
          <div className="set-page">
            <InfoBar items={[
              { label: 'Tap Pay', value: `< $${signingLevels.level1.threshold}` },
              { label: 'Single', value: `$${signingLevels.level2.thresholdMin}-${numericLevel2Max.toLocaleString()}` },
              { label: 'Vault', value: vaultTriggerLabel },
            ]} />

            <div className="set-signing-stack">
              {/* Level 1 */}
              <div className="set-signing-block">
                <div className="set-signing-head">
                  <div className="set-signing-dot green"></div>
                  <span className="set-signing-label">L1 — Tap Pay</span>
                  <Toggle enabled={signingLevels.level1.enabled} onToggle={() => updateLevel('level1', 'enabled', !signingLevels.level1.enabled)} />
                </div>
                <div className={`set-signing-body green ${signingLevels.level1.enabled ? '' : 'muted'}`}>
                  <div className="set-signing-desc"><Fingerprint size={15} color="#10b981" /><span>Biometric only · Below threshold</span></div>
                  <div className="set-signing-input-row">
                    <span>Below</span>
                    <div className="set-signing-input-shell">
                      <input type="text" value={signingLevels.level1.threshold} onChange={e => updateLevel('level1', 'threshold', e.target.value)} className="set-signing-input" disabled={!signingLevels.level1.enabled} />
                      <span>USD</span>
                    </div>
                  </div>
                  <div className="set-chip-grid">
                    {signingPresets.level1.map(v => (
                      <button key={v} type="button" className={`set-chip ${signingLevels.level1.threshold === v ? 'active' : ''}`} onClick={() => updateLevel('level1', 'threshold', v)} disabled={!signingLevels.level1.enabled}>${v}</button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Level 2 */}
              <div className="set-signing-block">
                <div className="set-signing-head">
                  <div className="set-signing-dot blue"></div>
                  <span className="set-signing-label">L2 — Single Sign</span>
                  <Toggle enabled={signingLevels.level2.enabled} onToggle={() => updateLevel('level2', 'enabled', !signingLevels.level2.enabled)} />
                </div>
                <div className={`set-signing-body blue ${signingLevels.level2.enabled ? '' : 'muted'}`}>
                  <div className="set-signing-desc"><CreditCard size={15} color="#60a5fa" /><span>Biometric + NFC Card</span></div>
                  <div className="set-signing-range">
                    <div className="set-signing-input-shell">
                      <input type="text" value={signingLevels.level2.thresholdMin} onChange={e => updateLevel('level2', 'thresholdMin', e.target.value)} className="set-signing-input" disabled={!signingLevels.level2.enabled} />
                      <span>USD</span>
                    </div>
                    <span className="set-signing-range-to">to</span>
                    <div className="set-signing-input-shell">
                      <input type="text" value={signingLevels.level2.thresholdMax} onChange={e => updateLevel('level2', 'thresholdMax', e.target.value)} className="set-signing-input" disabled={!signingLevels.level2.enabled} />
                      <span>USD</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Level 3 */}
              <div className="set-signing-block">
                <div className="set-signing-head">
                  <div className="set-signing-dot gold"></div>
                  <span className="set-signing-label">L3 — Secure Sign</span>
                  <Toggle enabled={signingLevels.level3.enabled} onToggle={() => updateLevel('level3', 'enabled', !signingLevels.level3.enabled)} />
                </div>
                <div className={`set-signing-body gold ${signingLevels.level3.enabled ? '' : 'muted'}`}>
                  <div className="set-signing-desc"><Lock size={15} color="#f5d46b" /><span>Biometric + NFC + PIN</span></div>
                  <div className="set-signing-input-row">
                    <span>Above</span>
                    <div className="set-signing-input-shell">
                      <input type="text" value={signingLevels.level3.threshold} onChange={e => updateLevel('level3', 'threshold', e.target.value)} className="set-signing-input" disabled={!signingLevels.level3.enabled} />
                      <span>USD</span>
                    </div>
                  </div>
                  <div className="set-chip-grid">
                    {signingPresets.level3.map(v => (
                      <button key={v} type="button" className={`set-chip ${signingLevels.level3.threshold === v ? 'active' : ''}`} onClick={() => updateLevel('level3', 'threshold', v)} disabled={!signingLevels.level3.enabled}>${Number(v).toLocaleString()}</button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Level 4 */}
              <div className="set-signing-block">
                <div className="set-signing-head">
                  <div className="set-signing-dot red"></div>
                  <span className="set-signing-label">L4 — Vault Mode</span>
                  <Toggle enabled={signingLevels.level4.enabled} onToggle={() => updateLevel('level4', 'enabled', !signingLevels.level4.enabled)} />
                </div>
                <div className={`set-signing-body red ${signingLevels.level4.enabled ? '' : 'muted'}`}>
                  <div className="set-signing-desc"><Database size={15} color="#fca5a5" /><span>Biometric + Dual-Card Multi-Sig</span></div>
                  <div className="set-trigger-options">
                    {vaultTriggerOptions.map(opt => (
                      <button key={opt.id} type="button" className={`set-trigger-opt ${signingLevels.level4.triggerMode === opt.id ? 'active' : ''}`} onClick={() => signingLevels.level4.enabled && updateLevel('level4', 'triggerMode', opt.id)} disabled={!signingLevels.level4.enabled}>
                        <div className="set-trigger-dot"></div>
                        <div className="set-trigger-copy"><strong>{opt.label}</strong><span>{opt.desc}</span></div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="section-title">SMART RULES</div>
            <div className="set-card">
              <SRow icon={<CheckCircle2 size={16} color="#10b981" />} label="Whitelist Downgrade" desc="Trusted addresses reduce level by 1" right={<Toggle enabled={whitelistEnabled} onToggle={() => setWhitelistEnabled(!whitelistEnabled)} />} />
              <Divider />
              <SRow icon={<User size={16} color="var(--blue)" />} label="Trusted Addresses" desc={`${addressBook.length} saved contacts`} onClick={() => setSettingsSection('addressbook')} />
            </div>
          </div>
        </>);

      case 'about':
        return (<>
          <SubHeader title="About" onBack={() => setSettingsSection(null)} />
          <div className="set-page">
            <div className="set-about-hero">
              <div className="set-about-logo">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M4 4h10l6 6v10H4z" /></svg>
              </div>
              <div className="set-about-name">FC Wallet</div>
              <div className="set-about-ver">v2.4.0 · Build 2026.03</div>
            </div>
            <div className="set-card">
              {aboutLinks.map((link, i) => (
                <React.Fragment key={link.key}>
                  <SRow icon={link.icon} label={link.label} onClick={() => {}} />
                  {i < aboutLinks.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </>);

      default: return null;
    }
  };

  /* ============================================================
     MAIN RENDER
     ============================================================ */
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className={isTab ? 'module-content settings-panel-shell settings-tab-shell' : 'settings-overlay settings-panel-shell'}
    >
      {!isTab && onClose && (
        <div className="set-topbar">
          <span className="set-topbar-title">Settings</span>
          <button type="button" className="set-topbar-close" onClick={onClose}><X size={16} /></button>
        </div>
      )}

      {settingsSection ? (
        <div className="settings-panel-scroll">
          {renderSubSection()}
          <div style={{ height: '30px' }}></div>
        </div>
      ) : (
        <div className="settings-panel-scroll" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

          {/* Compact header */}
          <div className="set-main-header">
            <div>
              <div className="set-main-title">Settings</div>
              <div className="set-main-subtitle">Sovereign control surface</div>
            </div>
          </div>

          {/* Mini profile strip */}
          <div className="set-profile-strip">
            <img src={CITIZEN_PROFILE.avatarThumb} alt="" className="set-profile-avatar" />
            <div className="set-profile-copy">
              <div className="set-profile-name">{CITIZEN_PROFILE.name}</div>
              <div className="set-profile-did">{CITIZEN_PROFILE.did} · {CITIZEN_PROFILE.trustLevel}</div>
            </div>
          </div>

          {/* Menu groups */}
          {menuGroups.map(group => (
            <div key={group.title} className="set-menu-group">
              <div className="section-title">{group.title}</div>
              <div className="set-card">
                {group.rows.map((row, i) => (
                  <React.Fragment key={row.key}>
                    <SRow icon={row.icon} label={row.label} desc={row.desc} onClick={row.action} />
                    {i < group.rows.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}

          <div className="set-footer">FC Wallet v2.4.0 · Authority build 2026.03</div>
        </div>
      )}
    </motion.div>
  );
};

export default SettingsModule;
