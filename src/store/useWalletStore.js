import { create } from 'zustand';
import { INITIAL_TRANSACTIONS } from '../data/mockData';

export const useWalletStore = create((set) => ({
  // Transactions — sourced from centralized mockData
  transactions: INITIAL_TRANSACTIONS,
  addTransaction: (tx) => set((state) => ({ transactions: [tx, ...state.transactions] })),

  // User Settings
  faceIdEnabled: true,
  setFaceIdEnabled: (enabled) => set({ faceIdEnabled: enabled }),
  
  dualLockEnabled: false,
  setDualLockEnabled: (enabled) => set({ dualLockEnabled: enabled }),

  selectedLang: 'en',
  setSelectedLang: (lang) => set({ selectedLang: lang }),

  selectedCurrency: 'USD',
  setSelectedCurrency: (curr) => set({ selectedCurrency: curr }),

  darkMode: false,
  setDarkMode: (enabled) => set({ darkMode: enabled }),

  pushEnabled: true,
  setPushEnabled: (enabled) => set({ pushEnabled: enabled }),

  txAlerts: true,
  setTxAlerts: (enabled) => set({ txAlerts: enabled }),

  priceAlerts: false,
  setPriceAlerts: (enabled) => set({ priceAlerts: enabled }),

  dailyLimit: '5000',
  setDailyLimit: (limit) => set({ dailyLimit: limit }),

  defaultChain: 'FC',
  setDefaultChain: (chain) => set({ defaultChain: chain }),
  
  whitelistEnabled: true,
  setWhitelistEnabled: (enabled) => set({ whitelistEnabled: enabled }),

  // Vault Status
  seedRevealed: false,
  setSeedRevealed: (revealed) => set({ seedRevealed: revealed }),

  cardConnected: true,
  setCardConnected: (connected) => set({ cardConnected: connected }),

  // Auth / Signings Customizations
  signingLevels: {
    sendInternal: 'none',
    sendExternal: 'biometric',
    swap: 'none',
    signMsg: 'biometric',
    bridge: 'biometric',
    dapp: 'biometric',
    vaultSend: 'nfc_biometric',
    settings: 'biometric'
  },
  setSigningLevels: (levels) => set({ signingLevels: levels }),

  // ZKP
  selectedZkpRequest: null,
  setSelectedZkpRequest: (req) => set({ selectedZkpRequest: req }),
  
  // Selected Asset Data
  selectedAsset: null,
  setSelectedAsset: (asset) => set({ selectedAsset: asset }),
}));
