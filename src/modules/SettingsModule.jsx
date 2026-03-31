import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Globe, Activity, Bell, Wallet, User, Users, SlidersHorizontal, CreditCard, Info, FileText, FileSignature, ChevronLeft, ChevronRight, Fingerprint, Lock, Smartphone, Database, Clock, Share2, ArrowRightLeft, TrendingUp, CheckCircle2, Sparkles } from 'lucide-react';
import { CITIZEN_PROFILE } from '../data/mockData';
import { useAppStore } from '../store/useAppStore';
import { useWalletStore } from '../store/useWalletStore';

const SettingsToggle = ({ enabled, onToggle }) => (
  <button type="button" className={`settings-toggle ${enabled ? 'active' : ''}`} onClick={onToggle} aria-pressed={enabled}>
    <span className="settings-toggle-knob"></span>
  </button>
);

const SRow = ({ icon, label, desc, right, onClick }) => (
  <div
    onClick={onClick}
    onKeyDown={onClick ? (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onClick();
      }
    } : undefined}
    className={`settings-row-shell ${onClick ? 'clickable' : ''}`}
    role={onClick ? 'button' : undefined}
    tabIndex={onClick ? 0 : undefined}
  >
    <div className="settings-row-leading">
      {icon && <div className="settings-row-icon">{icon}</div>}
      <div className="settings-row-copy">
        <div className="settings-row-label">{label}</div>
        {desc && <div className="settings-row-desc">{desc}</div>}
      </div>
    </div>
    <div className="settings-row-trailing">
      {right || (onClick && <ChevronRight size={18} color="var(--text-tertiary)" />)}
    </div>
  </div>
);

const SettingsDivider = () => <div className="settings-divider-line"></div>;

const SettingsSubHeader = ({ title, onBack }) => (
  <div className="settings-subheader">
    <button type="button" className="settings-back-link" onClick={onBack}>
      <ChevronLeft size={22} color="var(--blue)" strokeWidth={2.5} />
    </button>
    <div className="settings-subheader-copy">
      <span className="settings-subheader-kicker">CONTROL SURFACE</span>
      <span className="settings-subheader-title">{title}</span>
    </div>
  </div>
);

// --- SETTINGS MODULE (Security Hub) ---
const SettingsModule = ({ isTab = false, onClose }) => {
  const setShowOnboarding = useAppStore(s => s.setShowOnboarding);
  const faceIdEnabled = useWalletStore(s => s.faceIdEnabled);
  const setFaceIdEnabled = useWalletStore(s => s.setFaceIdEnabled);
  const dualLockEnabled = useWalletStore(s => s.dualLockEnabled);
  const setDualLockEnabled = useWalletStore(s => s.setDualLockEnabled);
  const [settingsSection, setSettingsSection] = useState(null); // null = main menu
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

  // Signing Rules State
  const [signingLevels, setSigningLevels] = useState({
    level1: { enabled: true, threshold: '50', dailyLimit: '200' },
    level2: { enabled: true, thresholdMin: '50', thresholdMax: '5000' },
    level3: { enabled: true, threshold: '5000' },
    level4: { enabled: true, triggerMode: 'manual' }, // 'amount', 'manual', 'sensitive'
  });
  const whitelistEnabled = useWalletStore(s => s.whitelistEnabled);
  const setWhitelistEnabled = useWalletStore(s => s.setWhitelistEnabled);

  const updateLevel = (level, field, value) => {
    setSigningLevels(prev => ({
      ...prev,
      [level]: { ...prev[level], [field]: value }
    }));
  };

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

  const limitPresets = ['1000', '5000', '10000', '50000'];

  const selectedLanguage = languages.find((lang) => lang.code === selectedLang);
  const selectedCurrencyOption = currencies.find((currency) => currency.code === selectedCurrency);
  const selectedChain = chains.find((chain) => chain.id === defaultChain);
  const confirmedGuardians = recoveryContacts.filter((contact) => contact.status === 'confirmed').length;
  const activeNotificationCount = [pushEnabled, txAlerts, priceAlerts].filter(Boolean).length;
  const numericDailyLimit = Number(dailyLimit || 0);
  const numericLevel2Max = Number(signingLevels.level2.thresholdMax || 0);
  const numericLevel3Threshold = Number(signingLevels.level3.threshold || 0);
  const securityPosture = dualLockEnabled ? 'Dual lock fortified' : faceIdEnabled ? 'Biometric shield live' : 'Security review needed';
  const signingSummary = signingLevels.level4.enabled ? 'Vault mode armed' : 'Vault mode manual';
  const vaultTriggerLabel = signingLevels.level4.triggerMode === 'manual' ? 'Manual' : signingLevels.level4.triggerMode === 'sensitive' ? 'Ops Only' : 'By Amount';

  const signingPresets = {
    level1: ['20', '50', '100', '200'],
    level3: ['1000', '5000', '10000', '50000'],
  };

  const vaultTriggerOptions = [
    { id: 'manual', label: 'Manual Selection', desc: 'Choose vault mode per transaction' },
    { id: 'amount', label: 'Auto by Amount', desc: 'Trigger above a set threshold' },
    { id: 'sensitive', label: 'Sensitive Ops Only', desc: 'Reset, export, card changes' },
  ];

  const signingOverviewCards = [
    { key: 'tap', tone: 'green', label: 'Tap Pay', value: `< $${signingLevels.level1.threshold}` },
    { key: 'single', tone: 'blue', label: 'Single Sign', value: `$${signingLevels.level2.thresholdMin}-${numericLevel2Max.toLocaleString()}` },
    { key: 'secure', tone: 'gold', label: 'Secure', value: `> $${numericLevel3Threshold.toLocaleString()}` },
    { key: 'vault', tone: 'red', label: 'Vault', value: vaultTriggerLabel },
  ];

  const settingsSignals = [
    {
      label: 'Security posture',
      value: dualLockEnabled ? 'Fortified' : faceIdEnabled ? 'Adaptive' : 'Review',
      hint: securityPosture,
      tone: dualLockEnabled ? 'gold' : 'blue',
    },
    {
      label: 'Spending rail',
      value: `${numericDailyLimit.toLocaleString()} FCUSD`,
      hint: signingSummary,
      tone: 'blue',
    },
    {
      label: 'Recovery mesh',
      value: `${confirmedGuardians}/3 guardians`,
      hint: whitelistEnabled ? 'Trusted downgrade enabled' : 'Manual approvals only',
      tone: 'green',
    },
  ];

  const settingsGroups = [
    {
      key: 'trust',
      eyebrow: 'Identity & Trust',
      title: 'Protect access, region and chain defaults',
      note: securityPosture,
      rows: [
        { key: 'security', icon: <Shield size={18} color="#ef4444" />, label: 'Security Center', desc: 'Biometric, devices, login history', action: () => setSettingsSection('security') },
        { key: 'language', icon: <Globe size={18} color="var(--blue)" />, label: 'Language & Region', desc: `${selectedLanguage?.flag} ${selectedLanguage?.name} • ${selectedCurrency}`, action: () => setSettingsSection('language') },
        { key: 'network', icon: <Activity size={18} color="#10b981" />, label: 'Network & Chain', desc: `Default: ${selectedChain?.name}`, action: () => setSettingsSection('network') },
      ],
    },
    {
      key: 'wallet',
      eyebrow: 'Wallet Operations',
      title: 'Alerts, exports and trusted recipients',
      note: pushEnabled ? 'Live alerting' : 'Quiet mode',
      rows: [
        { key: 'notifications', icon: <Bell size={18} color="var(--gold)" />, label: 'Notifications', desc: pushEnabled ? 'Push enabled on this device' : 'Push alerts muted', action: () => setSettingsSection('notifications') },
        { key: 'wallet', icon: <Wallet size={18} color="var(--navy)" />, label: 'Wallet Management', desc: 'Backup, export, contracts', action: () => setSettingsSection('wallet') },
        { key: 'addressbook', icon: <User size={18} color="var(--blue)" />, label: 'Address Book', desc: `${addressBook.length} saved contacts`, action: () => setSettingsSection('addressbook') },
      ],
    },
    {
      key: 'rules',
      eyebrow: 'Approval Logic',
      title: 'Tune signing tiers, limits and recovery',
      note: 'L1-L4 thresholds live',
      rows: [
        { key: 'signing', icon: <SlidersHorizontal size={18} color="#ef4444" />, label: 'Signing Rules', desc: `4 levels • Tap Pay < $${signingLevels.level1.threshold}`, action: () => setSettingsSection('signing') },
        { key: 'limits', icon: <CreditCard size={18} color="#f59e0b" />, label: 'Spending Limits', desc: `Daily: ${numericDailyLimit.toLocaleString()} FCUSD`, action: () => setSettingsSection('limits') },
        { key: 'recovery', icon: <Users size={18} color="#8b5cf6" />, label: 'Social Recovery', desc: `${confirmedGuardians} guardians active`, action: () => setSettingsSection('recovery') },
      ],
    },
    {
      key: 'product',
      eyebrow: 'Visual & Product',
      title: 'Appearance, release channel and app details',
      note: darkMode ? 'Dark theme preview' : 'Light theme preview',
      rows: [
        { key: 'appearance', icon: <div className="settings-emoji-icon">{darkMode ? '🌙' : '☀️'}</div>, label: 'Appearance', desc: darkMode ? 'Dark mode preview enabled' : 'Light mode preview enabled', action: () => setSettingsSection('appearance') },
        { key: 'about', icon: <Info size={18} color="var(--text-tertiary)" />, label: 'About', desc: 'v2.4.0 • FC Authority', action: () => setSettingsSection('about') },
        { key: 'onboarding', icon: <Sparkles size={18} color="var(--gold)" />, label: 'Replay Welcome Tour', desc: 'Walk through the setup experience again', action: () => setShowOnboarding(true) },
      ],
    },
  ];

  const securityLogs = [
    { label: 'Face ID', time: 'Today 12:05 PM', detail: 'Primary unlock on current device' },
    { label: 'Face ID', time: 'Yesterday 9:42 AM', detail: 'Successful biometric confirmation' },
    { label: 'PIN Fallback', time: 'Mar 28', detail: 'Manual fallback from secure enclave' },
  ];

  const authorizedContracts = [
    { name: 'FC-DEX Router', permission: 'Unlimited FCUSD', tone: 'blue' },
    { name: 'FC Real Estate', permission: 'Read ZKP Identity', tone: 'gold' },
  ];

  const themeModes = [
    { id: 'light', icon: '☀️', title: 'Light', copy: 'Soft contrast for day use', active: !darkMode },
    { id: 'dark', icon: '🌙', title: 'Dark', copy: 'High contrast vault mode', active: darkMode },
  ];

  const aboutLinks = [
    { key: 'privacy', icon: <FileText size={18} color="var(--blue)" />, label: 'Privacy Policy' },
    { key: 'terms', icon: <FileSignature size={18} color="var(--gold)" />, label: 'Terms of Service' },
    { key: 'support', icon: <Users size={18} color="#10b981" />, label: 'Community & Support' },
    { key: 'site', icon: <Globe size={18} color="#8b5cf6" />, label: 'FC Authority Website' },
  ];

  // --- Sub pages ---
  const renderSubSection = () => {
    switch(settingsSection) {
      case 'security':
        return (<>
          <SettingsSubHeader title="Security Center" onBack={() => setSettingsSection(null)} />
          <div className="settings-page-stack">
            <div className="settings-detail-hero">
              <div className="settings-detail-top">
                <span className="settings-detail-kicker">ACCESS FORTRESS</span>
                <span className={`settings-inline-badge ${dualLockEnabled ? 'gold' : 'blue'}`}>{securityPosture}</span>
              </div>
              <div className="settings-detail-title">Keep biometric, hardware and emergency controls aligned.</div>
              <div className="settings-detail-copy">Identity gates, cold-lock rules and device trust all live here, so your signing stack stays consistent across phone and vault flows.</div>
              <div className="settings-detail-grid">
                <div className="settings-mini-stat">
                  <span>Face / Iris</span>
                  <strong>{faceIdEnabled ? 'Live' : 'Paused'}</strong>
                </div>
                <div className="settings-mini-stat">
                  <span>Dual Lock</span>
                  <strong>{dualLockEnabled ? 'Armed' : 'Manual'}</strong>
                </div>
                <div className="settings-mini-stat">
                  <span>Trusted Devices</span>
                  <strong>2 linked</strong>
                </div>
              </div>
            </div>

            <div className="settings-subsection-label">Access Rules</div>
            <div className="settings-row-card">
              <SRow icon={<Fingerprint size={18} color="var(--blue)" />} label="Face/Iris Gateway" desc="Biometric scan for tx > 100 FCUSD" right={<SettingsToggle enabled={faceIdEnabled} onToggle={() => setFaceIdEnabled(!faceIdEnabled)} />} />
              <SettingsDivider />
              <SRow icon={<Lock size={18} color="var(--gold)" />} label="Dual Cold-Lock" desc="Secure Enclave for tx > 1000 FCUSD" right={<SettingsToggle enabled={dualLockEnabled} onToggle={() => setDualLockEnabled(!dualLockEnabled)} />} />
              <SettingsDivider />
              <SRow icon={<Shield size={18} color="#ef4444" />} label="Emergency Lock" desc="Instantly freeze all assets" onClick={() => {}} />
            </div>

            <div className="settings-subsection-label">Authorized Devices</div>
            <div className="settings-row-card">
              <SRow icon={<Smartphone size={18} color="#10b981" />} label="iPhone 16 Pro" desc="Current active device • Last seen just now" right={<span className="settings-inline-badge green">Active</span>} />
              <SettingsDivider />
              <SRow icon={<Database size={18} color="var(--blue)" />} label="FC Vault 01 (Cold)" desc="Last synced 2 days ago" right={<span className="settings-inline-badge slate">Paired</span>} />
            </div>

            <div className="settings-subsection-label">Login History</div>
            <div className="settings-row-card">
              <div className="settings-log-list">
                {securityLogs.map((log, index) => (
                  <React.Fragment key={log.time}>
                    <div className="settings-log-row">
                      <div className="settings-log-icon"><Clock size={14} color="var(--text-tertiary)" /></div>
                      <div className="settings-log-copy">
                        <strong>{log.label}</strong>
                        <span>{log.detail}</span>
                      </div>
                      <div className="settings-log-time">{log.time}</div>
                    </div>
                    {index < securityLogs.length - 1 ? <SettingsDivider /> : null}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </>);

      case 'language':
        return (<>
          <SettingsSubHeader title="Language & Region" onBack={() => setSettingsSection(null)} />
          <div className="settings-page-stack">
            <div className="settings-detail-hero">
              <div className="settings-detail-top">
                <span className="settings-detail-kicker">LOCALIZATION</span>
                <span className="settings-inline-badge blue">{selectedLanguage?.flag} {selectedLanguage?.name}</span>
              </div>
              <div className="settings-detail-title">Set how the wallet speaks, formats and values money.</div>
              <div className="settings-detail-copy">Language and currency affect the entire shell, from portfolio totals to compliance prompts and document summaries.</div>
              <div className="settings-detail-grid">
                <div className="settings-mini-stat">
                  <span>Language</span>
                  <strong>{selectedLanguage?.name}</strong>
                </div>
                <div className="settings-mini-stat">
                  <span>Currency</span>
                  <strong>{selectedCurrencyOption?.code}</strong>
                </div>
                <div className="settings-mini-stat">
                  <span>Formatting</span>
                  <strong>Regional</strong>
                </div>
              </div>
            </div>

            <div className="settings-subsection-label">Display Language</div>
            <div className="settings-row-card">
              {languages.map((lang, index) => (
                <React.Fragment key={lang.code}>
                  <button type="button" className={`settings-select-row ${selectedLang === lang.code ? 'active' : ''}`} onClick={() => setSelectedLang(lang.code)}>
                    <div className="settings-select-leading">
                      <div className="settings-select-flag">{lang.flag}</div>
                      <div className="settings-select-copy">
                        <strong>{lang.name}</strong>
                        <span>{lang.code.toUpperCase()} interface pack</span>
                      </div>
                    </div>
                    {selectedLang === lang.code ? <CheckCircle2 size={20} color="var(--blue)" strokeWidth={2.5} /> : null}
                  </button>
                  {index < languages.length - 1 ? <SettingsDivider /> : null}
                </React.Fragment>
              ))}
            </div>

            <div className="settings-subsection-label">Display Currency</div>
            <div className="settings-row-card">
              {currencies.map((currency, index) => (
                <React.Fragment key={currency.code}>
                  <button type="button" className={`settings-select-row ${selectedCurrency === currency.code ? 'active' : ''}`} onClick={() => setSelectedCurrency(currency.code)}>
                    <div className="settings-select-leading">
                      <div className="settings-select-symbol">{currency.symbol}</div>
                      <div className="settings-select-copy">
                        <strong>{currency.code}</strong>
                        <span>{currency.name}</span>
                      </div>
                    </div>
                    {selectedCurrency === currency.code ? <CheckCircle2 size={20} color="var(--blue)" strokeWidth={2.5} /> : null}
                  </button>
                  {index < currencies.length - 1 ? <SettingsDivider /> : null}
                </React.Fragment>
              ))}
            </div>
          </div>
        </>);

      case 'network':
        return (<>
          <SettingsSubHeader title="Network & Chain" onBack={() => setSettingsSection(null)} />
          <div className="settings-page-stack">
            <div className="settings-detail-hero">
              <div className="settings-detail-top">
                <span className="settings-detail-kicker">CHAIN ROUTING</span>
                <span className="settings-inline-badge green">{selectedChain?.id} default</span>
              </div>
              <div className="settings-detail-title">Choose the rail that new flows should trust first.</div>
              <div className="settings-detail-copy">Your default chain shapes what send, receive and swap surfaces prioritize. Telemetry below shows the health of the current route.</div>
              <div className="settings-detail-grid">
                <div className="settings-mini-stat">
                  <span>Default</span>
                  <strong>{selectedChain?.name}</strong>
                </div>
                <div className="settings-mini-stat">
                  <span>Latency</span>
                  <strong>12ms</strong>
                </div>
                <div className="settings-mini-stat">
                  <span>Status</span>
                  <strong>Stable</strong>
                </div>
              </div>
            </div>

            <div className="settings-subsection-label">Default Chain</div>
            <div className="settings-row-card">
              {chains.map((chain, index) => (
                <React.Fragment key={chain.id}>
                  <button type="button" className={`settings-select-row ${defaultChain === chain.id ? 'active' : ''}`} onClick={() => setDefaultChain(chain.id)}>
                    <div className="settings-select-leading">
                      <div className="settings-chain-badge" style={{ background: chain.color }}>
                        <span>{chain.id}</span>
                      </div>
                      <div className="settings-select-copy">
                        <strong>{chain.name}</strong>
                        <span>{chain.id} route preset</span>
                      </div>
                    </div>
                    {defaultChain === chain.id ? <CheckCircle2 size={20} color="var(--blue)" strokeWidth={2.5} /> : null}
                  </button>
                  {index < chains.length - 1 ? <SettingsDivider /> : null}
                </React.Fragment>
              ))}
            </div>

            <div className="settings-subsection-label">Network Status</div>
            <div className="settings-telemetry-grid">
              {networkTelemetry.map((item) => (
                <div key={item.label} className={`settings-telemetry-card ${item.tone || ''}`}>
                  <span>{item.label}</span>
                  <strong className={item.mono ? 'mono' : ''}>{item.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </>);

      case 'notifications':
        return (<>
          <SettingsSubHeader title="Notifications" onBack={() => setSettingsSection(null)} />
          <div className="settings-page-stack">
            <div className="settings-detail-hero">
              <div className="settings-detail-top">
                <span className="settings-detail-kicker">ALERT CHANNELS</span>
                <span className="settings-inline-badge blue">{activeNotificationCount} active</span>
              </div>
              <div className="settings-detail-title">Decide which wallet events should interrupt you.</div>
              <div className="settings-detail-copy">Alert rules apply across device activity, transfers and market movement so you can stay informed without noise.</div>
              <div className="settings-detail-grid">
                <div className="settings-mini-stat">
                  <span>Push</span>
                  <strong>{pushEnabled ? 'Enabled' : 'Muted'}</strong>
                </div>
                <div className="settings-mini-stat">
                  <span>Transfers</span>
                  <strong>{txAlerts ? 'Live' : 'Off'}</strong>
                </div>
                <div className="settings-mini-stat">
                  <span>Price Watch</span>
                  <strong>{priceAlerts ? 'Tracked' : 'Off'}</strong>
                </div>
              </div>
            </div>

            <div className="settings-row-card">
              <SRow icon={<Bell size={18} color="var(--blue)" />} label="Push Notifications" desc="Receive alerts on this device" right={<SettingsToggle enabled={pushEnabled} onToggle={() => setPushEnabled(!pushEnabled)} />} />
              <SettingsDivider />
              <SRow icon={<ArrowRightLeft size={18} color="#10b981" />} label="Transaction Alerts" desc="Notify on incoming and outgoing transfers" right={<SettingsToggle enabled={txAlerts} onToggle={() => setTxAlerts(!txAlerts)} />} />
              <SettingsDivider />
              <SRow icon={<TrendingUp size={18} color="var(--gold)" />} label="Price Alerts" desc="Notify when assets hit target price" right={<SettingsToggle enabled={priceAlerts} onToggle={() => setPriceAlerts(!priceAlerts)} />} />
            </div>
          </div>
        </>);

      case 'wallet':
        return (<>
          <SettingsSubHeader title="Wallet Management" onBack={() => setSettingsSection(null)} />
          <div className="settings-page-stack">
            <div className="settings-detail-hero">
              <div className="settings-detail-top">
                <span className="settings-detail-kicker">KEY MATERIAL</span>
                <span className={`settings-inline-badge ${seedRevealed ? 'red' : 'green'}`}>{seedRevealed ? 'Seed Visible' : 'Seed Vault Locked'}</span>
              </div>
              <div className="settings-detail-title">Protect exports, backups and third-party permissions.</div>
              <div className="settings-detail-copy">Anything that can move or reveal wallet state is grouped here, so sensitive operations stay obvious and reviewable.</div>
              <div className="settings-detail-grid">
                <div className="settings-mini-stat">
                  <span>Backups</span>
                  <strong>1 phrase</strong>
                </div>
                <div className="settings-mini-stat">
                  <span>Exports</span>
                  <strong>CSV / PDF</strong>
                </div>
                <div className="settings-mini-stat">
                  <span>Contracts</span>
                  <strong>{authorizedContracts.length} active</strong>
                </div>
              </div>
            </div>

            <div className="settings-row-card">
              <SRow icon={<Lock size={18} color="var(--gold)" />} label="Recovery Phrase" desc="View your 12-word seed phrase" onClick={() => setSeedRevealed(!seedRevealed)} />
              {seedRevealed && (
                <div className="settings-seed-panel">
                  <div className="settings-seed-warning">Warning: never share this phrase with anyone.</div>
                  <div className="settings-seed-grid">
                    {['citizen','future','vault','secure','anchor','bridge','token','shield','verify','chain','crypto','ledger'].map((word, index) => (
                      <div key={word} className="settings-seed-pill">
                        <span>{index + 1}.</span>
                        {word}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <SettingsDivider />
              <SRow icon={<Share2 size={18} color="var(--blue)" />} label="Export Transactions" desc="Download CSV or PDF history" onClick={() => {}} />
            </div>

            <div className="settings-subsection-label">Authorized Contracts</div>
            <div className="settings-row-card">
              {authorizedContracts.map((contract, index) => (
                <React.Fragment key={contract.name}>
                  <div className="settings-contract-row">
                    <div className="settings-contract-copy">
                      <strong>{contract.name}</strong>
                      <span>Allowance: {contract.permission}</span>
                    </div>
                    <button type="button" className="settings-danger-button">Revoke</button>
                  </div>
                  {index < authorizedContracts.length - 1 ? <SettingsDivider /> : null}
                </React.Fragment>
              ))}
            </div>
          </div>
        </>);

      case 'addressbook':
        return (<>
          <SettingsSubHeader title="Address Book" onBack={() => setSettingsSection(null)} />
          <div className="settings-page-stack">
            <div className="settings-detail-hero">
              <div className="settings-detail-top">
                <span className="settings-detail-kicker">TRUSTED RECIPIENTS</span>
                <span className="settings-inline-badge blue">{addressBook.length} saved</span>
              </div>
              <div className="settings-detail-title">Keep your most-used routes verified and easy to reach.</div>
              <div className="settings-detail-copy">Saved recipients reduce friction during send flows and can also feed whitelist downgrade rules in advanced signing.</div>
              <div className="settings-detail-grid">
                <div className="settings-mini-stat">
                  <span>Contacts</span>
                  <strong>{addressBook.length}</strong>
                </div>
                <div className="settings-mini-stat">
                  <span>Primary Chain</span>
                  <strong>{defaultChain}</strong>
                </div>
                <div className="settings-mini-stat">
                  <span>Trust Rules</span>
                  <strong>{whitelistEnabled ? 'Linked' : 'Manual'}</strong>
                </div>
              </div>
            </div>

            <button type="button" className="settings-primary-cta">
              <User size={18} />
              Add New Contact
            </button>

            <div className="settings-row-card">
              {addressBook.map((contact, index) => (
                <React.Fragment key={contact.address}>
                  <div className="settings-contact-row">
                    <div className="settings-contact-leading">
                      <div className="settings-contact-avatar">{contact.name.charAt(0)}</div>
                      <div className="settings-contact-copy">
                        <strong>{contact.name}</strong>
                        <span>{contact.address}</span>
                      </div>
                    </div>
                    <div className="settings-contact-tags">
                      <span className="settings-inline-badge blue">{contact.chain}</span>
                      <span className="settings-inline-badge slate">{contact.tag}</span>
                    </div>
                  </div>
                  {index < addressBook.length - 1 ? <SettingsDivider /> : null}
                </React.Fragment>
              ))}
            </div>
          </div>
        </>);

      case 'limits':
        return (<>
          <SettingsSubHeader title="Spending Limits" onBack={() => setSettingsSection(null)} />
          <div className="settings-page-stack">
            <div className="settings-detail-hero">
              <div className="settings-detail-top">
                <span className="settings-detail-kicker">SPENDING RAILS</span>
                <span className="settings-inline-badge gold">{numericDailyLimit.toLocaleString()} FCUSD</span>
              </div>
              <div className="settings-detail-title">Set the limit where flows become more deliberate.</div>
              <div className="settings-detail-copy">When a transfer crosses this line, the wallet escalates approvals and tightens biometric or card-based controls automatically.</div>
              <div className="settings-detail-grid">
                <div className="settings-mini-stat">
                  <span>Daily Limit</span>
                  <strong>{numericDailyLimit.toLocaleString()}</strong>
                </div>
                <div className="settings-mini-stat">
                  <span>Monthly Rail</span>
                  <strong>{(numericDailyLimit * 10).toLocaleString()}</strong>
                </div>
                <div className="settings-mini-stat">
                  <span>Escalation</span>
                  <strong>Biometric</strong>
                </div>
              </div>
            </div>

            <div className="settings-limit-card">
              <div className="settings-subsection-label">Daily Transaction Limit</div>
              <div className="settings-limit-input-shell">
                <input type="text" value={dailyLimit} onChange={(event) => setDailyLimit(event.target.value)} className="settings-limit-input" />
                <span className="settings-limit-unit">FCUSD</span>
              </div>
              <div className="settings-chip-grid">
                {limitPresets.map((value) => (
                  <button
                    key={value}
                    type="button"
                    className={`settings-chip ${dailyLimit === value ? 'active' : ''}`}
                    onClick={() => setDailyLimit(value)}
                  >
                    {Number(value).toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            <div className="settings-info-panel">
              <Info size={18} color="var(--blue)" />
              <div>Transactions above this limit require stronger verification. Monthly allowance is currently modeled at 10x your daily rail.</div>
            </div>
          </div>
        </>);

      case 'recovery':
        return (<>
          <SettingsSubHeader title="Social Recovery" onBack={() => setSettingsSection(null)} />
          <div className="settings-page-stack">
            <div className="settings-detail-hero">
              <div className="settings-detail-top">
                <span className="settings-detail-kicker">GUARDIAN MESH</span>
                <span className="settings-inline-badge purple">{confirmedGuardians} confirmed</span>
              </div>
              <div className="settings-detail-title">Recovery stays social, but the threshold stays yours.</div>
              <div className="settings-detail-copy">Nominate trusted guardians so a lost device never becomes a lost treasury. Recovery only activates when the threshold is met.</div>
              <div className="settings-detail-grid">
                <div className="settings-mini-stat">
                  <span>Guardians</span>
                  <strong>{confirmedGuardians}/3 live</strong>
                </div>
                <div className="settings-mini-stat">
                  <span>Threshold</span>
                  <strong>2 of 3</strong>
                </div>
                <div className="settings-mini-stat">
                  <span>Fallback</span>
                  <strong>Trusted only</strong>
                </div>
              </div>
            </div>

            <div className="settings-subsection-label">Recovery Guardians</div>
            <div className="settings-guardian-grid">
              {recoveryContacts.map((contact) => (
                <button
                  key={contact.name}
                  type="button"
                  className={`settings-guardian-card ${contact.status === 'empty' ? 'empty' : 'confirmed'}`}
                >
                  <div className="settings-guardian-avatar">{contact.avatar}</div>
                  <div className="settings-guardian-name">{contact.name}</div>
                  <div className={`settings-guardian-status ${contact.status}`}>{contact.status === 'confirmed' ? 'Confirmed' : 'Add guardian'}</div>
                </button>
              ))}
            </div>

            <div className="settings-threshold-card">
              <div className="settings-subsection-label">Recovery Threshold</div>
              <div className="settings-threshold-value">2 <span>of</span> 3</div>
              <div className="settings-threshold-copy">Two confirmed guardians are needed before a recovery request can re-open the wallet.</div>
            </div>
          </div>
        </>);

      case 'appearance':
        return (<>
          <SettingsSubHeader title="Appearance" onBack={() => setSettingsSection(null)} />
          <div className="settings-page-stack">
            <div className="settings-detail-hero">
              <div className="settings-detail-top">
                <span className="settings-detail-kicker">VISUAL MODE</span>
                <span className={`settings-inline-badge ${darkMode ? 'blue' : 'gold'}`}>{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
              </div>
              <div className="settings-detail-title">Choose the shell your wallet should live in.</div>
              <div className="settings-detail-copy">Theme choice stays lightweight for now, but this panel is ready for broader profile-level display preferences later.</div>
            </div>

            <div className="settings-row-card">
              <SRow icon={<div className="settings-emoji-icon">🌙</div>} label="Dark Mode" desc="Switch to dark theme" right={<SettingsToggle enabled={darkMode} onToggle={() => setDarkMode(!darkMode)} />} />
            </div>

            <div className="settings-theme-grid">
              {themeModes.map((mode) => (
                <button
                  key={mode.id}
                  type="button"
                  className={`settings-theme-card ${mode.active ? 'active' : ''}`}
                  onClick={() => setDarkMode(mode.id === 'dark')}
                >
                  <div className="settings-theme-symbol">{mode.icon}</div>
                  <div className="settings-theme-title">{mode.title}</div>
                  <div className="settings-theme-copy">{mode.copy}</div>
                </button>
              ))}
            </div>
          </div>
        </>);

      case 'signing':
        return (<>
          <SettingsSubHeader title="Signing Rules" onBack={() => setSettingsSection(null)} />
          <div className="settings-page-stack">
            <div className="settings-detail-hero">
              <div className="settings-detail-top">
                <span className="settings-detail-kicker">APPROVAL LATTICE</span>
                <span className={`settings-inline-badge ${signingLevels.level4.enabled ? 'red' : 'blue'}`}>{signingSummary}</span>
              </div>
              <div className="settings-detail-title">Escalate approvals as value and sensitivity rise.</div>
              <div className="settings-detail-copy">These four levels define how the wallet steps from simple biometric unlocks up to full vault mode. Every threshold stays under your control.</div>
              <div className="settings-detail-grid">
                <div className="settings-mini-stat">
                  <span>Tap Pay</span>
                  <strong>{`< $${signingLevels.level1.threshold}`}</strong>
                </div>
                <div className="settings-mini-stat">
                  <span>Single Sign</span>
                  <strong>{`$${signingLevels.level2.thresholdMin}-${numericLevel2Max.toLocaleString()}`}</strong>
                </div>
                <div className="settings-mini-stat">
                  <span>Vault Trigger</span>
                  <strong>{vaultTriggerLabel}</strong>
                </div>
              </div>
            </div>

            <div className="settings-signing-stack">
              <div className="settings-signing-block">
                <div className="settings-signing-head">
                  <div className="settings-signing-head-copy">
                    <div className="settings-signing-dot green"></div>
                    <span className="settings-signing-title">Level 1 — Tap Pay</span>
                  </div>
                  <SettingsToggle enabled={signingLevels.level1.enabled} onToggle={() => updateLevel('level1', 'enabled', !signingLevels.level1.enabled)} />
                </div>
                <div className={`settings-signing-card green ${signingLevels.level1.enabled ? 'active' : 'muted'}`}>
                  <div className="settings-signing-card-top">
                    <div className="settings-signing-icon green"><Fingerprint size={20} color="#10b981" /></div>
                    <div className="settings-signing-card-copy">
                      <strong>Biometric Only</strong>
                      <span>Transactions below this amount require only Face ID or fingerprint confirmation.</span>
                    </div>
                  </div>
                  <div className="settings-signing-input-row">
                    <span className="settings-signing-input-label">Below</span>
                    <div className="settings-signing-input-shell">
                      <input type="text" value={signingLevels.level1.threshold} onChange={(event) => updateLevel('level1', 'threshold', event.target.value)} className="settings-signing-input" disabled={!signingLevels.level1.enabled} />
                      <span className="settings-signing-input-unit">USD</span>
                    </div>
                  </div>
                  <div className="settings-signing-chip-grid">
                    {signingPresets.level1.map((value) => (
                      <button key={value} type="button" className={`settings-chip ${signingLevels.level1.threshold === value ? 'active' : ''}`} onClick={() => updateLevel('level1', 'threshold', value)} disabled={!signingLevels.level1.enabled}>
                        ${value}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="settings-signing-block">
                <div className="settings-signing-head">
                  <div className="settings-signing-head-copy">
                    <div className="settings-signing-dot blue"></div>
                    <span className="settings-signing-title">Level 2 — Single Sign</span>
                  </div>
                  <SettingsToggle enabled={signingLevels.level2.enabled} onToggle={() => updateLevel('level2', 'enabled', !signingLevels.level2.enabled)} />
                </div>
                <div className={`settings-signing-card blue ${signingLevels.level2.enabled ? 'active' : 'muted'}`}>
                  <div className="settings-signing-card-top">
                    <div className="settings-signing-icon blue"><CreditCard size={20} color="#60a5fa" /></div>
                    <div className="settings-signing-card-copy">
                      <strong>Biometric + NFC Card</strong>
                      <span>Tap your FC card to sign transactions that fall within this approval range.</span>
                    </div>
                  </div>
                  <div className="settings-signing-range-grid">
                    <div className="settings-signing-input-shell">
                      <input type="text" value={signingLevels.level2.thresholdMin} onChange={(event) => updateLevel('level2', 'thresholdMin', event.target.value)} className="settings-signing-input compact" disabled={!signingLevels.level2.enabled} />
                      <span className="settings-signing-input-unit">USD</span>
                    </div>
                    <span className="settings-signing-range-divider">to</span>
                    <div className="settings-signing-input-shell">
                      <input type="text" value={signingLevels.level2.thresholdMax} onChange={(event) => updateLevel('level2', 'thresholdMax', event.target.value)} className="settings-signing-input compact" disabled={!signingLevels.level2.enabled} />
                      <span className="settings-signing-input-unit">USD</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="settings-signing-block">
                <div className="settings-signing-head">
                  <div className="settings-signing-head-copy">
                    <div className="settings-signing-dot gold"></div>
                    <span className="settings-signing-title">Level 3 — Secure Sign</span>
                  </div>
                  <SettingsToggle enabled={signingLevels.level3.enabled} onToggle={() => updateLevel('level3', 'enabled', !signingLevels.level3.enabled)} />
                </div>
                <div className={`settings-signing-card gold ${signingLevels.level3.enabled ? 'active' : 'muted'}`}>
                  <div className="settings-signing-card-top">
                    <div className="settings-signing-icon gold"><Lock size={20} color="#f5d46b" /></div>
                    <div className="settings-signing-card-copy">
                      <strong>Biometric + NFC + PIN</strong>
                      <span>High-value transactions require a card tap and a manual PIN before approval completes.</span>
                    </div>
                  </div>
                  <div className="settings-signing-input-row">
                    <span className="settings-signing-input-label">Above</span>
                    <div className="settings-signing-input-shell">
                      <input type="text" value={signingLevels.level3.threshold} onChange={(event) => updateLevel('level3', 'threshold', event.target.value)} className="settings-signing-input" disabled={!signingLevels.level3.enabled} />
                      <span className="settings-signing-input-unit">USD</span>
                    </div>
                  </div>
                  <div className="settings-signing-chip-grid">
                    {signingPresets.level3.map((value) => (
                      <button key={value} type="button" className={`settings-chip ${signingLevels.level3.threshold === value ? 'active' : ''}`} onClick={() => updateLevel('level3', 'threshold', value)} disabled={!signingLevels.level3.enabled}>
                        ${Number(value).toLocaleString()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="settings-signing-block">
                <div className="settings-signing-head">
                  <div className="settings-signing-head-copy">
                    <div className="settings-signing-dot red"></div>
                    <span className="settings-signing-title">Level 4 — Vault Mode</span>
                  </div>
                  <SettingsToggle enabled={signingLevels.level4.enabled} onToggle={() => updateLevel('level4', 'enabled', !signingLevels.level4.enabled)} />
                </div>
                <div className={`settings-signing-card red ${signingLevels.level4.enabled ? 'active' : 'muted'}`}>
                  <div className="settings-signing-card-top">
                    <div className="settings-signing-icon red"><Database size={20} color="#fca5a5" /></div>
                    <div className="settings-signing-card-copy">
                      <strong>Biometric + Dual-Card Multi-Sig</strong>
                      <span>Maximum security mode requires two different FC cards before a signing window opens.</span>
                    </div>
                  </div>
                  <div className="settings-signing-options">
                    {vaultTriggerOptions.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        className={`settings-trigger-option ${signingLevels.level4.triggerMode === option.id ? 'active' : ''}`}
                        onClick={() => signingLevels.level4.enabled && updateLevel('level4', 'triggerMode', option.id)}
                        disabled={!signingLevels.level4.enabled}
                      >
                        <div className="settings-trigger-indicator"></div>
                        <div className="settings-trigger-copy">
                          <strong>{option.label}</strong>
                          <span>{option.desc}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="settings-subsection-label">Smart Rules</div>
            <div className="settings-row-card">
              <SRow icon={<CheckCircle2 size={18} color="#10b981" />} label="Whitelist Downgrade" desc="Trusted addresses reduce level by 1" right={<SettingsToggle enabled={whitelistEnabled} onToggle={() => setWhitelistEnabled(!whitelistEnabled)} />} />
              <SettingsDivider />
              <SRow icon={<User size={18} color="var(--blue)" />} label="Trusted Addresses" desc={`${addressBook.length} saved contacts`} onClick={() => setSettingsSection('addressbook')} />
            </div>

            <div className="settings-signing-summary">
              <div className="settings-subsection-label">Your Current Rules</div>
              <div className="settings-signing-summary-grid">
                {signingOverviewCards.map((card) => (
                  <div key={card.key} className="settings-signing-summary-card">
                    <div className="settings-signing-summary-top">
                      <div className={`settings-signing-dot ${card.tone}`}></div>
                      <span>{card.label}</span>
                    </div>
                    <div className="settings-signing-summary-value">{card.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>);

      case 'about':
        return (<>
          <SettingsSubHeader title="About" onBack={() => setSettingsSection(null)} />
          <div className="settings-page-stack">
            <div className="settings-about-hero">
              <div className="settings-about-logo">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M4 4h10l6 6v10H4z" /></svg>
              </div>
              <div className="settings-about-name">FC Wallet</div>
              <div className="settings-about-version">Version 2.4.0 • Build 2026.03</div>
              <div className="settings-about-copy">A sovereign wallet shell for identity, assets, approvals and zero-knowledge flows.</div>
              <div className="settings-detail-grid">
                <div className="settings-mini-stat">
                  <span>Release Channel</span>
                  <strong>Authority</strong>
                </div>
                <div className="settings-mini-stat">
                  <span>Profile Mode</span>
                  <strong>Citizen</strong>
                </div>
                <div className="settings-mini-stat">
                  <span>Security Build</span>
                  <strong>2026.03</strong>
                </div>
              </div>
            </div>

            <div className="settings-row-card">
              {aboutLinks.map((link, index) => (
                <React.Fragment key={link.key}>
                  <SRow icon={link.icon} label={link.label} onClick={() => {}} />
                  {index < aboutLinks.length - 1 ? <SettingsDivider /> : null}
                </React.Fragment>
              ))}
            </div>
          </div>
        </>);

      default: return null;
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className={isTab ? "module-content settings-panel-shell settings-tab-shell" : "settings-overlay settings-panel-shell"}
    >
      {!isTab && onClose ? (
        <div className="settings-panel-topbar">
          <div className="settings-panel-topbar-copy">
            <span className="settings-panel-topbar-kicker">Wallet Controls</span>
            <span className="settings-panel-topbar-title">Settings</span>
          </div>
          <button type="button" className="settings-panel-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
      ) : null}
      {settingsSection ? (
        <div className="settings-panel-scroll">
          {renderSubSection()}
          <div style={{ height: '40px' }}></div>
        </div>
      ) : (
        <div className="settings-panel-scroll settings-home-shell">
          <div className="settings-hero">
            <div className="settings-hero-copy">
              <span className="settings-hero-kicker">SOVEREIGN CONTROL</span>
              <div className="settings-hero-title">Security, signing and identity control</div>
              <div className="settings-hero-subtitle">Tune wallet trust, approval logic and recovery rules from one calm command surface.</div>
            </div>
            <div className="settings-hero-actions">
              <button type="button" className="settings-hero-button primary" onClick={() => setSettingsSection('security')}>
                Security Center
              </button>
              <button type="button" className="settings-hero-button" onClick={() => setSettingsSection('signing')}>
                Signing Rules
              </button>
            </div>
          </div>

          <div className="settings-identity-card">
            <div className="settings-identity-top">
              <img
                src={CITIZEN_PROFILE.avatarThumb}
                alt={CITIZEN_PROFILE.name}
                className="settings-identity-avatar"
              />
              <div className="settings-identity-copy">
                <div className="settings-identity-name">{CITIZEN_PROFILE.name}</div>
                <div className="settings-identity-id">DID: {CITIZEN_PROFILE.did}</div>
                <div className="settings-pill-row">
                  <span className="settings-status-pill gold">L3 Verified</span>
                  <span className="settings-status-pill blue">Premium</span>
                </div>
              </div>
              <div className="settings-identity-score">
                <span className="settings-identity-score-label">Trust Layer</span>
                <span className="settings-identity-score-value">94</span>
              </div>
            </div>
            <div className="settings-identity-metrics">
              <div className="settings-identity-metric">
                <span className="settings-identity-metric-label">Devices</span>
                <span className="settings-identity-metric-value">2 trusted</span>
              </div>
              <div className="settings-identity-metric">
                <span className="settings-identity-metric-label">Default Chain</span>
                <span className="settings-identity-metric-value">{selectedChain?.id}</span>
              </div>
              <div className="settings-identity-metric">
                <span className="settings-identity-metric-label">Alerts</span>
                <span className="settings-identity-metric-value">{pushEnabled ? 'Live' : 'Muted'}</span>
              </div>
            </div>
          </div>

          <div className="settings-signal-grid">
            {settingsSignals.map((signal) => (
              <div key={signal.label} className={`settings-signal-card ${signal.tone}`}>
                <div className="settings-signal-label">{signal.label}</div>
                <div className="settings-signal-value">{signal.value}</div>
                <div className="settings-signal-hint">{signal.hint}</div>
              </div>
            ))}
          </div>

          {settingsGroups.map((group) => (
            <section key={group.key} className="settings-section-block">
              <div className="settings-section-header">
                <div>
                  <div className="settings-section-kicker">{group.eyebrow}</div>
                  <div className="settings-section-title">{group.title}</div>
                </div>
                <div className="settings-section-note">{group.note}</div>
              </div>
              <div className="settings-row-card">
                {group.rows.map((row, index) => (
                  <React.Fragment key={row.key}>
                    <SRow icon={row.icon} label={row.label} desc={row.desc} onClick={row.action} />
                    {index < group.rows.length - 1 ? <SettingsDivider /> : null}
                  </React.Fragment>
                ))}
              </div>
            </section>
          ))}

          <div className="settings-home-footer">FC Wallet v2.4.0 • Authority build 2026.03</div>
        </div>
      )}
    </motion.div>
  );
};

export default SettingsModule;
