import { create } from 'zustand';

export const useAppStore = create((set) => ({
  // Core Navigation
  activeTab: 'Home',
  setActiveTab: (tab) => set({ activeTab: tab }),

  appMode: 'Citizen', // Citizen or Organization
  setAppMode: (mode) => set({ appMode: mode }),

  // Modal Visibilities
  showScanner: false,
  setShowScanner: (show) => set({ showScanner: show }),
  
  showSwap: false,
  setShowSwap: (show) => set({ showSwap: show }),
  
  showHistory: false,
  setShowHistory: (show) => set({ showHistory: show }),
  
  showSendDrawer: false,
  setShowSendDrawer: (show) => set({ showSendDrawer: show }),
  
  showReceiveDrawer: false,
  setShowReceiveDrawer: (show) => set({ showReceiveDrawer: show }),
  
  showColdVault: false,
  setShowColdVault: (show) => set({ showColdVault: show }),
  
  showSettings: false,
  setShowSettings: (show) => set({ showSettings: show }),
  
  showBridge: false,
  setShowBridge: (show) => set({ showBridge: show }),

  showGovernance: false,
  setShowGovernance: (show) => set({ showGovernance: show }),

  showStaking: false,
  setShowStaking: (show) => set({ showStaking: show }),

  showOnboarding: false,
  setShowOnboarding: (show) => set({ showOnboarding: show }),

  // Contextual Modals
  showContextModal: false,
  setShowContextModal: (show) => set({ showContextModal: show }),

  // Selected items (full-screen overlays)
  selectedMultiSig: null,
  setSelectedMultiSig: (sig) => set({ selectedMultiSig: sig }),

  selectedChat: null,
  setSelectedChat: (chat) => set({ selectedChat: chat }),

  // Global Biometric Request State
  // null = inactive
  // { action: 'Send', amount: '...', onApprove: () => {}, onReject: () => {} }
  globalBiometricRequest: null,
  setGlobalBiometricRequest: (req) => set({ globalBiometricRequest: req }),

  // Toast System
  toasts: [],
  addToast: (message, type = 'info') => set((state) => {
    const id = Date.now();
    setTimeout(() => {
      set((s) => ({
        toasts: s.toasts.filter(t => t.id !== id)
      }));
    }, 4000);
    return {
      toasts: [...state.toasts, { id, message, type }]
    };
  }),
  removeToast: (id) => set((state) => ({
    toasts: state.toasts.filter(t => t.id !== id)
  }))
}));
