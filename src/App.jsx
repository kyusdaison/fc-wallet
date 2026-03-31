import React, { useState, useRef, useEffect } from 'react';
import { Home as HomeIcon, IdCard, Building2, ChevronDown, Bell, Settings, ArrowDown, CheckCircle2, X, Info, ShieldCheck, MessageSquare, LayoutGrid, QrCode, Shield, Snowflake } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

// --- Module imports ---
import { HomeModule, OrgHomeModule } from './modules/HomeModule';
import SwapModule from './modules/SwapModule';
import SettingsModule from './modules/SettingsModule';
import ColdVaultModule from './modules/ColdVaultModule';
import { AlertsModule, ChatsModule, ChatDetailModule } from './modules/CommsModule';
import CitizenCommsModule from './modules/CitizenCommsModule';
import { ServicesModule, IdentityModule } from './modules/ServicesIdentityModule';
import { QrScannerModule, MultiSigModule, ZkpModal } from './modules/InteractionModules';
import { GlobalBiometricGate } from './modules/SheetModules';
import OrgServicesModule from './modules/OrgServicesModule';
import OrgCommsModule from './modules/OrgCommsModule';
import OrgSettingsModule from './modules/OrgSettingsModule';
import OrgIdentityModule from './modules/OrgIdentityModule';

// --- Extracted components ---
import HistorySheetV2 from './components/HistorySheet';
import SendSheetV2 from './components/SendSheet';
import ReceiveSheetV2 from './components/ReceiveSheet';
import AssetDetailSheetV2 from './components/AssetDetailSheet';
import GovernanceModule from './modules/GovernanceModule';
import StakingModule from './modules/StakingModule';
import OnboardingModule from './modules/OnboardingModule';

// --- Stores ---
import { useAppStore } from './store/useAppStore';
import { useWalletStore } from './store/useWalletStore';

// --- Data ---
import { CITIZEN_PROFILE, ORG_PROFILE, CITIZEN_ALERTS, CITIZEN_CHAT_CONTACTS } from './data/mockData';

const lionLogoSrc = `${import.meta.env.BASE_URL}lion_logo.png`;

export default function App() {
  // Navigation & mode
  const activeTab = useAppStore(s => s.activeTab);
  const setActiveTab = useAppStore(s => s.setActiveTab);
  const appMode = useAppStore(s => s.appMode);
  const setAppMode = useAppStore(s => s.setAppMode);

  // Modal visibility (from useAppStore)
  const showContextModal = useAppStore(s => s.showContextModal);
  const setShowContextModal = useAppStore(s => s.setShowContextModal);
  const showScanner = useAppStore(s => s.showScanner);
  const setShowScanner = useAppStore(s => s.setShowScanner);
  const showSwap = useAppStore(s => s.showSwap);
  const setShowSwap = useAppStore(s => s.setShowSwap);
  const showHistory = useAppStore(s => s.showHistory);
  const setShowHistory = useAppStore(s => s.setShowHistory);
  const showSendDrawer = useAppStore(s => s.showSendDrawer);
  const setShowSendDrawer = useAppStore(s => s.setShowSendDrawer);
  const showReceiveDrawer = useAppStore(s => s.showReceiveDrawer);
  const setShowReceiveDrawer = useAppStore(s => s.setShowReceiveDrawer);
  const showColdVault = useAppStore(s => s.showColdVault);
  const setShowColdVault = useAppStore(s => s.setShowColdVault);
  const showSettings = useAppStore(s => s.showSettings);
  const setShowSettings = useAppStore(s => s.setShowSettings);
  const showBridge = useAppStore(s => s.showBridge);
  const setShowBridge = useAppStore(s => s.setShowBridge);
  const showGovernance = useAppStore(s => s.showGovernance);
  const setShowGovernance = useAppStore(s => s.setShowGovernance);
  const showStaking = useAppStore(s => s.showStaking);
  const setShowStaking = useAppStore(s => s.setShowStaking);
  const showOnboarding = useAppStore(s => s.showOnboarding);
  const setShowOnboarding = useAppStore(s => s.setShowOnboarding);
  const globalBiometricRequest = useAppStore(s => s.globalBiometricRequest);
  const setGlobalBiometricRequest = useAppStore(s => s.setGlobalBiometricRequest);
  const selectedMultiSig = useAppStore(s => s.selectedMultiSig);
  const setSelectedMultiSig = useAppStore(s => s.setSelectedMultiSig);
  const selectedChat = useAppStore(s => s.selectedChat);
  const setSelectedChat = useAppStore(s => s.setSelectedChat);

  // Toast system (from useAppStore)
  const toasts = useAppStore(s => s.toasts);
  const addToast = useAppStore(s => s.addToast);

  // Wallet state (from useWalletStore)
  const transactions = useWalletStore(s => s.transactions);
  const addTransaction = useWalletStore(s => s.addTransaction);
  const selectedAsset = useWalletStore(s => s.selectedAsset);
  const setSelectedAsset = useWalletStore(s => s.setSelectedAsset);
  const selectedZkpRequest = useWalletStore(s => s.selectedZkpRequest);
  const setSelectedZkpRequest = useWalletStore(s => s.setSelectedZkpRequest);

  // Notification panel state
  const [showNotifPanel, setShowNotifPanel] = useState(false);
  const notifRef = useRef(null);

  // Mode dropdown state
  const [showModeMenu, setShowModeMenu] = useState(false);
  const modeMenuRef = useRef(null);

  // Close notif panel on outside click
  useEffect(() => {
    if (!showNotifPanel) return;
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifPanel(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showNotifPanel]);

  // Close mode menu on outside click
  useEffect(() => {
    if (!showModeMenu) return;
    const handler = (e) => {
      if (modeMenuRef.current && !modeMenuRef.current.contains(e.target)) setShowModeMenu(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showModeMenu]);

  const handleSendComplete = (newTx) => {
    addTransaction(newTx);
    addToast('Transaction sent successfully', 'success');
  };

  return (
    <div className="phone">
      {/* ====== Onboarding ====== */}
      <AnimatePresence>
        {showOnboarding && <OnboardingModule onComplete={() => setShowOnboarding(false)} />}
      </AnimatePresence>

      {/* ====== Full-screen overlays ====== */}
      <AnimatePresence>
        {selectedChat && <ChatDetailModule contact={selectedChat} onBack={() => setSelectedChat(null)} />}
      </AnimatePresence>
      <AnimatePresence>
        {showScanner && <QrScannerModule onClose={() => setShowScanner(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {showSwap && <SwapModule onClose={() => setShowSwap(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {selectedMultiSig && <MultiSigModule selectedMultiSig={selectedMultiSig} onClose={() => setSelectedMultiSig(null)} />}
      </AnimatePresence>
      <AnimatePresence>
        {selectedZkpRequest && <ZkpModal request={selectedZkpRequest} onClose={() => setSelectedZkpRequest(null)} onApprove={() => console.log("ZKP Approved")} />}
      </AnimatePresence>
      <AnimatePresence>
        {showGovernance && <GovernanceModule onClose={() => setShowGovernance(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {showStaking && <StakingModule onClose={() => setShowStaking(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {showColdVault && <ColdVaultModule onClose={() => setShowColdVault(false)} onOpenSettings={() => setShowSettings(true)} />}
      </AnimatePresence>
      <AnimatePresence>
        {showSettings && <SettingsModule onClose={() => setShowSettings(false)} />}
      </AnimatePresence>

      {/* ====== Sheet overlays (extracted components) ====== */}
      <AnimatePresence>
        {showHistory && <HistorySheetV2 onClose={() => setShowHistory(false)} transactions={transactions} />}
      </AnimatePresence>
      <AnimatePresence>
        {showSendDrawer && <SendSheetV2 onClose={() => setShowSendDrawer(false)} onTriggerBiometric={setGlobalBiometricRequest} onSendComplete={handleSendComplete} />}
      </AnimatePresence>
      <AnimatePresence>
        {showReceiveDrawer && <ReceiveSheetV2 onClose={() => setShowReceiveDrawer(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {selectedAsset && <AssetDetailSheetV2 asset={selectedAsset} onClose={() => setSelectedAsset(null)} onOpenSend={() => setShowSendDrawer(true)} onOpenReceive={() => setShowReceiveDrawer(true)} />}
      </AnimatePresence>

      {/* ====== Header ====== */}
      <div className="hdr">
        <div className="hdr-glow"></div>
        <div className="hdr-inner">
          {/* Brand cluster */}
          <div className="hdr-brand" ref={modeMenuRef}>
            <button type="button" className="hdr-logo-btn" onClick={() => setShowModeMenu(v => !v)}>
              <div className="hdr-logo-ring">
                <img src={lionLogoSrc} alt="FC" className="hdr-logo-img" />
                <div className={`hdr-status-dot ${appMode === 'Organization' ? 'org' : 'cit'}`}></div>
              </div>
              <div className="hdr-titles">
                <span className="hdr-wordmark">FUTURE CITIZEN</span>
                <span className="hdr-mode-label">{appMode === 'Organization' ? 'Organization' : 'Citizen'} Mode</span>
              </div>
              <ChevronDown size={14} className={`hdr-chevron ${showModeMenu ? 'open' : ''}`} />
            </button>

            {/* Mode dropdown */}
            <AnimatePresence>
              {showModeMenu && (
                <motion.div
                  key="mode-dd"
                  initial={{ opacity: 0, y: -6, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.95 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 400 }}
                  className="mode-dropdown"
                >
                  <button
                    type="button"
                    className={`mode-dd-option ${appMode === 'Citizen' ? 'active' : ''}`}
                    onClick={() => { setAppMode('Citizen'); setActiveTab('Home'); setShowModeMenu(false); }}
                  >
                    <div className="mode-dd-icon cit"><img src={CITIZEN_PROFILE.avatarThumb} alt="" className="mode-dd-avatar" /></div>
                    <div className="mode-dd-copy">
                      <strong>{CITIZEN_PROFILE.name}</strong>
                      <span>Citizen Mode</span>
                    </div>
                    {appMode === 'Citizen' && <CheckCircle2 size={16} color="var(--blue)" strokeWidth={2.5} />}
                  </button>

                  <div className="mode-dd-divider"></div>

                  <button
                    type="button"
                    className={`mode-dd-option ${appMode === 'Organization' ? 'active' : ''}`}
                    onClick={() => { setAppMode('Organization'); setActiveTab('Home'); setShowModeMenu(false); }}
                  >
                    <div className="mode-dd-icon org"><Building2 size={15} /></div>
                    <div className="mode-dd-copy">
                      <strong>{ORG_PROFILE.name}</strong>
                      <span>Organization Mode</span>
                    </div>
                    {appMode === 'Organization' && <CheckCircle2 size={16} color="var(--blue)" strokeWidth={2.5} />}
                  </button>

                  <div className="mode-dd-divider"></div>

                  <button
                    type="button"
                    className="mode-dd-option"
                    onClick={() => { setShowColdVault(true); setShowModeMenu(false); }}
                  >
                    <div className="mode-dd-icon cold"><Snowflake size={15} /></div>
                    <div className="mode-dd-copy">
                      <strong>Cold Wallet</strong>
                      <span>Vault & Cold Storage</span>
                    </div>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action cluster */}
          <div className="hdr-actions">
            <button type="button" className="hdr-action-btn" onClick={() => setShowScanner(true)}>
              <QrCode size={18} strokeWidth={1.8} />
            </button>
            <button type="button" className="hdr-action-btn" onClick={() => setShowNotifPanel(v => !v)}>
              <Bell size={18} strokeWidth={1.8} />
              {CITIZEN_ALERTS.filter(a => a.unread).length > 0 && (
                <span className="hdr-badge"></span>
              )}
            </button>
          </div>
        </div>
        <div className="hdr-rule"></div>
      </div>

      {/* ====== Notification Dropdown Panel ====== */}
      <AnimatePresence>
        {showNotifPanel && (
          <motion.div key="notif-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="notif-backdrop" onClick={() => setShowNotifPanel(false)}>
            <motion.div ref={notifRef} key="notif-panel" initial={{ opacity: 0, y: -10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.95 }} transition={{ type: 'spring', damping: 25, stiffness: 350 }} className="notif-panel" onClick={e => e.stopPropagation()}>
              <AlertsModule />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====== Main Content ====== */}
      <div className="main-container">
        <AnimatePresence mode="wait">
          {activeTab === 'Home' && appMode === 'Citizen' && <HomeModule setActiveTab={setActiveTab} onOpenSwap={() => setShowSwap(true)} onOpenHistory={() => setShowHistory(true)} onTriggerBiometric={setGlobalBiometricRequest} onOpenSend={() => setShowSendDrawer(true)} onOpenReceive={() => setShowReceiveDrawer(true)} onOpenAsset={setSelectedAsset} onOpenColdVault={() => setShowColdVault(true)} onOpenStaking={() => setShowStaking(true)} />}
          {activeTab === 'Home' && appMode === 'Organization' && <OrgHomeModule setActiveTab={setActiveTab} onOpenSwap={() => setShowSwap(true)} onOpenMultiSig={setSelectedMultiSig} />}
          {activeTab === 'Identity' && appMode === 'Citizen' && <IdentityModule onOpenZkp={setSelectedZkpRequest} />}
          {activeTab === 'Identity' && appMode === 'Organization' && <OrgIdentityModule />}
          {activeTab === 'Services' && appMode === 'Citizen' && <ServicesModule onOpenBridge={() => setShowBridge(true)} onOpenGovernance={() => setShowGovernance(true)} />}
          {activeTab === 'Services' && appMode === 'Organization' && <OrgServicesModule />}
          {activeTab === 'Settings' && appMode === 'Citizen' && <SettingsModule isTab={true} />}
          {activeTab === 'Settings' && appMode === 'Organization' && <OrgSettingsModule />}
          {activeTab === 'Comms' && appMode === 'Citizen' && <CitizenCommsModule onSelectChat={setSelectedChat} onOpenScanner={() => setShowScanner(true)} />}
          {activeTab === 'Comms' && appMode === 'Organization' && <OrgCommsModule initialTab="chats" />}
        </AnimatePresence>
      </div>

      {/* ====== Bottom Navigation (5 tabs) ====== */}
      <div className="bottom-nav">
        <div className={`nav-item ${activeTab === 'Home' ? 'active' : ''}`} onClick={() => setActiveTab('Home')}>
          <HomeIcon size={22} strokeWidth={activeTab === 'Home' ? 2.5 : 2} /> Home
        </div>
        <div className={`nav-item ${activeTab === 'Identity' ? 'active' : ''}`} onClick={() => setActiveTab('Identity')}>
          <IdCard size={22} strokeWidth={activeTab === 'Identity' ? 2.5 : 2} /> Identity
        </div>
        <div className={`nav-item ${activeTab === 'Comms' ? 'active' : ''}`} onClick={() => setActiveTab('Comms')}>
          <div style={{ position: 'relative' }}>
            <MessageSquare size={22} strokeWidth={activeTab === 'Comms' ? 2.5 : 2} />
            {CITIZEN_CHAT_CONTACTS.reduce((n, c) => n + c.unread, 0) > 0 && (
              <span className="nav-badge">{CITIZEN_CHAT_CONTACTS.reduce((n, c) => n + c.unread, 0)}</span>
            )}
          </div>
          Comms
        </div>
        <div className={`nav-item ${activeTab === 'Services' ? 'active' : ''}`} onClick={() => setActiveTab('Services')}>
          <LayoutGrid size={22} strokeWidth={activeTab === 'Services' ? 2.5 : 2} /> Services
        </div>
        <div className={`nav-item ${activeTab === 'Settings' ? 'active' : ''}`} onClick={() => setActiveTab('Settings')}>
          <Settings size={22} strokeWidth={activeTab === 'Settings' ? 2.5 : 2} /> Settings
        </div>
      </div>

      {/* Context modal removed — replaced by logo dropdown */}

      {/* ====== Global Biometric Gate ====== */}
      {globalBiometricRequest && <GlobalBiometricGate request={globalBiometricRequest} onClose={() => {
        setGlobalBiometricRequest(null);
      }} />}

      {/* ====== Bridge Sheet ====== */}
      <AnimatePresence>
        {showBridge && (
          <motion.div key="bridge-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bridge-overlay" onClick={() => setShowBridge(false)}>
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 28, stiffness: 300 }} onClick={e => e.stopPropagation()} className="bridge-sheet">
              <div className="bridge-handle"><div className="bridge-handle-bar"></div></div>

              <div className="bridge-body">
                <div className="bridge-heading">
                  <div className="bridge-title">Cross-Chain Bridge</div>
                  <div className="bridge-subtitle">Transfer assets between chains</div>
                </div>

                <div className="bridge-chain-card">
                  <div className="bridge-chain-label">FROM</div>
                  <div className="bridge-chain-row">
                    <div className="bridge-chain-info">
                      <div className="bridge-chain-icon navy">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M4 4h10l6 6v10H4z" /></svg>
                      </div>
                      <div>
                        <div className="bridge-chain-name">FC Chain</div>
                        <div className="bridge-chain-balance">5,230.15 FCC available</div>
                      </div>
                    </div>
                    <ChevronDown size={20} color="var(--text-tertiary)" />
                  </div>
                </div>

                <div className="bridge-arrow-wrap">
                  <div className="bridge-arrow-circle">
                    <ArrowDown size={20} color="white" />
                  </div>
                </div>

                <div className="bridge-chain-card">
                  <div className="bridge-chain-label">TO</div>
                  <div className="bridge-chain-row">
                    <div className="bridge-chain-info">
                      <div className="bridge-chain-icon eth">&#9670;</div>
                      <div>
                        <div className="bridge-chain-name">Ethereum</div>
                        <div className="bridge-chain-balance">ERC-20 Network</div>
                      </div>
                    </div>
                    <ChevronDown size={20} color="var(--text-tertiary)" />
                  </div>
                </div>

                <div className="bridge-amount-display">
                  <div className="bridge-amount-value">500.00</div>
                  <div className="bridge-amount-token">FCC</div>
                </div>

                <div className="bridge-info-box">
                  <Info size={18} color="var(--blue)" className="bridge-info-icon" />
                  <div className="bridge-info-text">Bridge fee: <strong>0.1%</strong> &bull; Est. time: <strong>~5 min</strong> &bull; Secured by ZKP relay</div>
                </div>

                <button onClick={() => { setShowBridge(false); addToast('Bridge transfer initiated', 'success'); }} className="bridge-confirm-btn">
                  <ShieldCheck size={20} /> Confirm &amp; Bridge
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====== Global Toast Notifications ====== */}
      <div className="toast-container">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div key={toast.id} initial={{ opacity: 0, y: -30, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.9 }} transition={{ type: 'spring', damping: 20, stiffness: 300 }} className={`toast-item toast-${toast.type}`}>
              {toast.type === 'success' ? <CheckCircle2 size={18} /> : toast.type === 'error' ? <X size={18} /> : <Info size={18} />}
              {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
