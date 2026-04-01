import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Home as HomeIcon, IdCard, Building2, ChevronDown, Bell, Settings, CheckCircle2, X, Info, MessageSquare, LayoutGrid, QrCode, Snowflake } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Module imports ---
import { HomeModule, OrgHomeModule } from './modules/HomeModule';
import SwapModule from './modules/SwapModule';
import SettingsModule from './modules/SettingsModule';
import ColdVaultModule from './modules/ColdVaultModule';
import { AlertsModule, ChatDetailModule } from './modules/CommsModule';
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
import BridgeSheet from './components/BridgeSheet';
import GovernanceModule from './modules/GovernanceModule';
import StakingModule from './modules/StakingModule';
import OnboardingModule from './modules/OnboardingModule';

// --- Hooks ---
import { useClickOutside } from './hooks/useClickOutside';

// --- Stores ---
import { useAppStore } from './store/useAppStore';
import { useWalletStore } from './store/useWalletStore';
import { useShallow } from 'zustand/react/shallow';

// --- Data ---
import { CITIZEN_PROFILE, ORG_PROFILE, CITIZEN_ALERTS, CITIZEN_CHAT_CONTACTS } from './data/mockData';

const lionLogoSrc = `${import.meta.env.BASE_URL}lion_logo.png`;

export default function App() {
  // Navigation & mode
  const { activeTab, setActiveTab, appMode, setAppMode } = useAppStore(
    useShallow(s => ({ activeTab: s.activeTab, setActiveTab: s.setActiveTab, appMode: s.appMode, setAppMode: s.setAppMode }))
  );

  // Modal visibility
  const {
    showScanner, setShowScanner, showSwap, setShowSwap,
    showHistory, setShowHistory, showSendDrawer, setShowSendDrawer,
    showReceiveDrawer, setShowReceiveDrawer, showColdVault, setShowColdVault,
    showSettings, setShowSettings, showBridge, setShowBridge,
    showGovernance, setShowGovernance, showStaking, setShowStaking,
    showOnboarding, setShowOnboarding, globalBiometricRequest, setGlobalBiometricRequest,
    selectedMultiSig, setSelectedMultiSig, selectedChat, setSelectedChat,
  } = useAppStore(
    useShallow(s => ({
      showScanner: s.showScanner, setShowScanner: s.setShowScanner,
      showSwap: s.showSwap, setShowSwap: s.setShowSwap,
      showHistory: s.showHistory, setShowHistory: s.setShowHistory,
      showSendDrawer: s.showSendDrawer, setShowSendDrawer: s.setShowSendDrawer,
      showReceiveDrawer: s.showReceiveDrawer, setShowReceiveDrawer: s.setShowReceiveDrawer,
      showColdVault: s.showColdVault, setShowColdVault: s.setShowColdVault,
      showSettings: s.showSettings, setShowSettings: s.setShowSettings,
      showBridge: s.showBridge, setShowBridge: s.setShowBridge,
      showGovernance: s.showGovernance, setShowGovernance: s.setShowGovernance,
      showStaking: s.showStaking, setShowStaking: s.setShowStaking,
      showOnboarding: s.showOnboarding, setShowOnboarding: s.setShowOnboarding,
      globalBiometricRequest: s.globalBiometricRequest, setGlobalBiometricRequest: s.setGlobalBiometricRequest,
      selectedMultiSig: s.selectedMultiSig, setSelectedMultiSig: s.setSelectedMultiSig,
      selectedChat: s.selectedChat, setSelectedChat: s.setSelectedChat,
    }))
  );

  // Toast system
  const { toasts, addToast } = useAppStore(
    useShallow(s => ({ toasts: s.toasts, addToast: s.addToast }))
  );

  // Wallet state
  const { transactions, addTransaction, selectedAsset, setSelectedAsset, selectedZkpRequest, setSelectedZkpRequest } = useWalletStore(
    useShallow(s => ({
      transactions: s.transactions, addTransaction: s.addTransaction,
      selectedAsset: s.selectedAsset, setSelectedAsset: s.setSelectedAsset,
      selectedZkpRequest: s.selectedZkpRequest, setSelectedZkpRequest: s.setSelectedZkpRequest,
    }))
  );

  // Notification panel state
  const [showNotifPanel, setShowNotifPanel] = useState(false);
  const closeNotifPanel = useCallback(() => setShowNotifPanel(false), []);
  const notifRef = useClickOutside(showNotifPanel, closeNotifPanel);

  // Mode dropdown state
  const [showModeMenu, setShowModeMenu] = useState(false);
  const closeModeMenu = useCallback(() => setShowModeMenu(false), []);
  const modeMenuRef = useClickOutside(showModeMenu, closeModeMenu);

  // Header scroll elevation
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const mainContainerRef = useRef(null);
  useEffect(() => {
    const el = mainContainerRef.current;
    if (!el) return;
    const handler = () => setHeaderScrolled(el.scrollTop > 8);
    el.addEventListener('scroll', handler, { passive: true });
    return () => el.removeEventListener('scroll', handler);
  }, []);

  const handleSendComplete = (newTx) => {
    addTransaction(newTx);
    addToast('Transaction sent successfully', 'success');
  };

  return (
    <div className={`phone ${appMode === 'Organization' ? 'org-mode' : 'cit-mode'}`}>
      {/* ====== Full-screen overlays ====== */}
      <AnimatePresence>
        {showOnboarding && <OnboardingModule onComplete={() => setShowOnboarding(false)} />}
        {selectedChat && <ChatDetailModule contact={selectedChat} onBack={() => setSelectedChat(null)} />}
        {showScanner && <QrScannerModule onClose={() => setShowScanner(false)} />}
        {showSwap && <SwapModule onClose={() => setShowSwap(false)} />}
        {selectedMultiSig && <MultiSigModule selectedMultiSig={selectedMultiSig} onClose={() => setSelectedMultiSig(null)} />}
        {selectedZkpRequest && <ZkpModal request={selectedZkpRequest} onClose={() => setSelectedZkpRequest(null)} onApprove={() => addToast('ZKP proof shared successfully', 'success')} />}
        {showGovernance && <GovernanceModule onClose={() => setShowGovernance(false)} />}
        {showStaking && <StakingModule onClose={() => setShowStaking(false)} />}
        {showColdVault && <ColdVaultModule onClose={() => setShowColdVault(false)} onOpenSettings={() => setShowSettings(true)} />}
        {showSettings && <SettingsModule onClose={() => setShowSettings(false)} />}
      </AnimatePresence>

      {/* ====== Sheet overlays ====== */}
      <AnimatePresence>
        {showHistory && <HistorySheetV2 onClose={() => setShowHistory(false)} transactions={transactions} />}
        {showSendDrawer && <SendSheetV2 onClose={() => setShowSendDrawer(false)} onTriggerBiometric={setGlobalBiometricRequest} onSendComplete={handleSendComplete} />}
        {showReceiveDrawer && <ReceiveSheetV2 onClose={() => setShowReceiveDrawer(false)} />}
        {selectedAsset && <AssetDetailSheetV2 asset={selectedAsset} onClose={() => setSelectedAsset(null)} onOpenSend={() => setShowSendDrawer(true)} onOpenReceive={() => setShowReceiveDrawer(true)} />}
        {showBridge && <BridgeSheet onClose={() => setShowBridge(false)} onConfirm={() => { setShowBridge(false); addToast('Bridge transfer initiated', 'success'); }} />}
      </AnimatePresence>

      {/* ====== Header ====== */}
      <div className={`hdr ${headerScrolled ? 'scrolled' : ''}`}>
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
      <div className="main-container" ref={mainContainerRef}>
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
      <nav className="bottom-nav" aria-label="Main navigation">
        <button className={`nav-item ${activeTab === 'Home' ? 'active' : ''}`} onClick={() => setActiveTab('Home')} aria-current={activeTab === 'Home' ? 'page' : undefined}>
          <HomeIcon size={22} strokeWidth={activeTab === 'Home' ? 2.5 : 2} /> Home
        </button>
        <button className={`nav-item ${activeTab === 'Identity' ? 'active' : ''}`} onClick={() => setActiveTab('Identity')} aria-current={activeTab === 'Identity' ? 'page' : undefined}>
          <IdCard size={22} strokeWidth={activeTab === 'Identity' ? 2.5 : 2} /> Identity
        </button>
        <button className={`nav-item ${activeTab === 'Comms' ? 'active' : ''}`} onClick={() => setActiveTab('Comms')} aria-current={activeTab === 'Comms' ? 'page' : undefined}>
          <span className="nav-icon-wrap">
            <MessageSquare size={22} strokeWidth={activeTab === 'Comms' ? 2.5 : 2} />
            {CITIZEN_CHAT_CONTACTS.reduce((n, c) => n + c.unread, 0) > 0 && (
              <span className="nav-badge">{CITIZEN_CHAT_CONTACTS.reduce((n, c) => n + c.unread, 0)}</span>
            )}
          </span>
          Comms
        </button>
        <button className={`nav-item ${activeTab === 'Services' ? 'active' : ''}`} onClick={() => setActiveTab('Services')} aria-current={activeTab === 'Services' ? 'page' : undefined}>
          <LayoutGrid size={22} strokeWidth={activeTab === 'Services' ? 2.5 : 2} /> Services
        </button>
        <button className={`nav-item ${activeTab === 'Settings' ? 'active' : ''}`} onClick={() => setActiveTab('Settings')} aria-current={activeTab === 'Settings' ? 'page' : undefined}>
          <Settings size={22} strokeWidth={activeTab === 'Settings' ? 2.5 : 2} /> Settings
        </button>
      </nav>

      {/* ====== Global Biometric Gate ====== */}
      {globalBiometricRequest && <GlobalBiometricGate request={globalBiometricRequest} onClose={() => {
        setGlobalBiometricRequest(null);
      }} />}

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
