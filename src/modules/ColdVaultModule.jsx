import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, ArrowUp, ArrowRightLeft, CheckCircle2, ChevronLeft, ChevronRight, Clock, Copy, CreditCard, Database, FileText, Fingerprint, Lock, Share2, Shield, SlidersHorizontal, X } from 'lucide-react';

const ColdViewHeader = ({ tone = 'blue', eyebrow = 'Vault Flow', title, subtitle, badge, onBack }) => (
  <div className="cold-subview-head">
    <button type="button" className={`cold-back-link ${tone}`} onClick={onBack}>
      <ChevronLeft size={20} strokeWidth={2.5} />
      Back to Vault
    </button>
    <div className="cold-subview-title-wrap">
      <span className="cold-subview-kicker">{eyebrow}</span>
      <div className="cold-subview-title">{title}</div>
      <div className="cold-subview-subtitle">{subtitle}</div>
      {badge ? <div className={`cold-inline-badge ${tone}`}>{badge}</div> : null}
    </div>
  </div>
);

const ColdStageOrb = ({ tone = 'gold', icon, size = 'regular' }) => (
  <motion.div
    animate={{ scale: [1, 1.12, 1] }}
    transition={{ duration: 2, repeat: Infinity }}
    className={`cold-stage-orb ${tone} ${size}`}
  >
    <motion.div
      animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="cold-stage-orb-ring"
    />
    {icon}
  </motion.div>
);

const ColdActivityRow = ({ tx }) => {
  const iconTone = tx.type === 'receive' ? 'green' : tx.type === 'send' ? 'red' : 'purple';
  const title = tx.type === 'receive' ? `Received ${tx.asset}` : tx.type === 'send' ? `Sent ${tx.asset}` : `Swapped ${tx.asset}`;
  const meta = tx.from || tx.to || 'FC Vault';
  const amountTone = tx.type === 'receive' ? 'positive' : tx.type === 'send' ? 'negative' : 'neutral';

  return (
    <div className="cold-activity-row">
      <div className={`cold-activity-icon ${iconTone}`}>
        {tx.type === 'receive' ? <ArrowDown size={18} color="#10b981" /> : tx.type === 'send' ? <ArrowUp size={18} color="#ef4444" /> : <ArrowRightLeft size={16} color="#8b5cf6" />}
      </div>
      <div className="cold-activity-copy">
        <div className="cold-activity-title">{title}</div>
        <div className="cold-activity-subtitle">{tx.time} • {meta}</div>
      </div>
      <div className="cold-activity-side">
        <div className={`cold-activity-amount ${amountTone}`}>{tx.amount}</div>
        <div className="cold-activity-meta">
          {tx.level ? <span className={`cold-level-pill ${tx.level === 'L3' ? 'gold' : 'blue'}`}>{tx.level}</span> : null}
          <span>{tx.fiat}</span>
        </div>
      </div>
    </div>
  );
};

const ColdSectionHeader = ({ label, meta, actionLabel, onAction }) => (
  <div className="cold-section-head">
    <div>
      <div className="cold-section-title">{label}</div>
      {meta ? <div className="cold-section-meta">{meta}</div> : null}
    </div>
    {actionLabel ? (
      <button type="button" className="cold-section-link" onClick={onAction}>
        {actionLabel}
      </button>
    ) : null}
  </div>
);

const ColdVaultAssetRow = ({ asset, onClick }) => (
  <button type="button" className="cold-list-row" onClick={onClick}>
    <div className="cold-list-token" style={{ background: `${asset.color}18`, color: asset.color }}>
      {asset.icon}
    </div>
    <div className="cold-list-copy">
      <div className="cold-list-title">{asset.name}</div>
      <div className="cold-list-subtitle">
        {asset.symbol}
        <span className="cold-tag">Cold</span>
      </div>
    </div>
    <div className="cold-list-side">
      <div className="cold-list-value">{asset.balance}</div>
      <div className="cold-list-caption">
        {asset.fiat}
        <span className={asset.positive ? 'positive' : 'negative'}>{asset.change}</span>
      </div>
    </div>
  </button>
);

const ColdBackupCardRow = ({ card }) => (
  <div className={`cold-list-row static ${card.status}`}>
    <div className={`cold-card-token ${card.status}`}>
      <CreditCard size={20} color={card.status === 'connected' ? 'var(--gold)' : card.status === 'synced' ? '#10b981' : 'rgba(255,255,255,0.24)'} />
    </div>
    <div className="cold-list-copy">
      <div className="cold-list-title">{card.name}</div>
      <div className="cold-list-subtitle">····{card.last4} • {card.firmware} • {card.lastSync}</div>
    </div>
    <div className={`cold-state-pill ${card.status}`}>
      <span className="cold-state-pill-dot"></span>
      {card.status === 'empty' ? 'Add Card' : card.status}
    </div>
  </div>
);

const ColdSecurityRow = ({ item, onClick }) => (
  <button type="button" className="cold-list-row static security" onClick={onClick} disabled={!onClick}>
    <div className="cold-security-icon">{item.icon}</div>
    <div className="cold-list-copy">
      <div className="cold-list-title">{item.label}</div>
    </div>
    <div className="cold-security-value" style={{ color: item.vColor }}>{item.value}</div>
    <ChevronRight size={16} color="rgba(255,255,255,0.2)" />
  </button>
);

const ColdVaultModule = ({ onClose, onOpenSettings }) => {
  const [cardConnected, setCardConnected] = useState(true);
  const [showNfcModal, setShowNfcModal] = useState(false);
  const [coldView, setColdView] = useState('main'); // main, send, receive, swap, activity, assetDetail
  const [coldSendStep, setColdSendStep] = useState('form'); // form, nfc, pin, success
  const [coldSendAddr, setColdSendAddr] = useState('');
  const [coldSendAmount, setColdSendAmount] = useState('');
  const [coldSendAsset, setColdSendAsset] = useState('FCUSD');
  const [coldPinInput, setColdPinInput] = useState('');
  const [copiedAddr, setCopiedAddr] = useState(false);
  // Swap state
  const [swapFrom, setSwapFrom] = useState('FCC');
  const [swapTo, setSwapTo] = useState('FCUSD');
  const [swapAmount, setSwapAmount] = useState('');
  const [swapStep, setSwapStep] = useState('form'); // form, preview, nfc, success
  // Asset detail state
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [activityFilter, setActivityFilter] = useState('All');

  const coldAssets = [
    { symbol: 'FCC', name: 'FC Coin', balance: '125,000.00', fiat: '$227,500.00', change: '+3.2%', positive: true, color: 'var(--green)', icon: '◆' },
    { symbol: 'FCUSD', name: 'FC Stablecoin', balance: '250,000.00', fiat: '$250,000.00', change: '0.0%', positive: true, color: '#3b82f6', icon: '◎' },
    { symbol: 'BTC', name: 'Bitcoin', balance: '1.8524', fiat: '$178,430.00', change: '+1.8%', positive: true, color: '#f7931a', icon: '₿' },
    { symbol: 'ETH', name: 'Ethereum', balance: '28.45', fiat: '$98,472.00', change: '-0.4%', positive: false, color: '#627eea', icon: 'Ξ' },
    { symbol: 'SOL', name: 'Solana', balance: '340.00', fiat: '$62,220.00', change: '+5.1%', positive: true, color: '#9945ff', icon: '◐' },
  ];

  const coldTransactions = [
    { type: 'receive', asset: 'BTC', amount: '+0.5000', fiat: '+$48,200', time: '2h ago', level: 'L3', from: '0x7f2...4e1' },
    { type: 'send', asset: 'FCUSD', amount: '-10,000', fiat: '-$10,000', time: '1d ago', level: 'L2', to: '0xa3c...9b2' },
    { type: 'receive', asset: 'ETH', amount: '+5.0000', fiat: '+$17,300', time: '3d ago', level: 'L2', from: '0x1b8...5f0' },
    { type: 'swap', asset: 'FCC→FCUSD', amount: '5,000', fiat: '$9,100', time: '5d ago', level: 'L2', from: 'DEX' },
  ];

  const backupCards = [
    { id: 1, name: 'Primary Card', last4: '9201', status: 'connected', firmware: 'v2.1.4', lastSync: 'Just now' },
    { id: 2, name: 'Backup Card 1', last4: '4782', status: 'synced', firmware: 'v2.1.4', lastSync: '12h ago' },
    { id: 3, name: 'Backup Card 2', last4: '—', status: 'empty', firmware: '—', lastSync: 'Not paired' },
  ];

  const totalColdBalance = '$816,622.00';
  const coldReceiveAddress = 'fc1q9x8m4v2k7h3n5p6w0t1r8y4u2i9o7a3s5d';
  const extendedColdTransactions = [
    ...coldTransactions,
    { type: 'receive', asset: 'FCC', amount: '+15,000', fiat: '+$27,300', time: '1w ago', level: 'L2', from: '0x4d2...8c3' },
    { type: 'send', asset: 'BTC', amount: '-0.2500', fiat: '-$24,050', time: '1w ago', level: 'L3', to: '0xb7e...2f1' },
    { type: 'swap', asset: 'ETH→FCC', amount: '10.00', fiat: '$34,600', time: '2w ago', level: 'L2', from: 'DEX' },
    { type: 'receive', asset: 'SOL', amount: '+100.00', fiat: '+$18,300', time: '2w ago', level: 'L2', from: '0x9f1...3a8' },
    { type: 'send', asset: 'FCUSD', amount: '-5,000', fiat: '-$5,000', time: '3w ago', level: 'L2', to: '0xe5c...7d4' },
    { type: 'receive', asset: 'BTC', amount: '+0.3000', fiat: '+$28,860', time: '1m ago', level: 'L3', from: '0x2a8...6e9' },
  ];

  const getColdAssetRate = (symbol) => {
    const rates = { BTC: 96200, ETH: 3460, FCC: 1.82, SOL: 183, FCUSD: 1 };
    return rates[symbol] || 1;
  };

  const getColdSwapQuote = (amount, from, to) => {
    const parsedAmount = Number.parseFloat(String(amount).replace(/,/g, ''));
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) return '';
    const quote = (parsedAmount * getColdAssetRate(from)) / getColdAssetRate(to);
    const digits = to === 'BTC' ? 6 : to === 'ETH' ? 4 : 2;
    return quote.toFixed(digits);
  };

  const coldSwapQuote = getColdSwapQuote(swapAmount, swapFrom, swapTo);
  const coldSwapRate = (getColdAssetRate(swapFrom) / getColdAssetRate(swapTo));
  const coldSendReady = coldSendAddr.trim() && coldSendAmount.trim();
  const swapReady = swapAmount.trim() && Number.parseFloat(String(swapAmount).replace(/,/g, '')) > 0;
  const swapFromAsset = coldAssets.find((asset) => asset.symbol === swapFrom);
  const swapTargetAssets = coldAssets.filter((asset) => asset.symbol !== swapFrom);
  const filteredActivityTransactions = extendedColdTransactions.filter((tx) => {
    if (activityFilter === 'All') return true;
    if (activityFilter === 'Sent') return tx.type === 'send';
    if (activityFilter === 'Received') return tx.type === 'receive';
    if (activityFilter === 'Swapped') return tx.type === 'swap';
    return true;
  });
  const selectedAssetTransactions = selectedAsset
    ? extendedColdTransactions.filter((tx) => tx.asset.includes(selectedAsset.symbol))
    : [];
  const securityItems = [
    { icon: <Fingerprint size={18} color="#10b981" />, label: 'Biometric Lock', value: 'Enabled', vColor: '#10b981', action: null },
    { icon: <Lock size={18} color="#f59e0b" />, label: 'Access Code', value: '••••••', vColor: 'rgba(255,255,255,0.6)', action: null },
    { icon: <Clock size={18} color="#3b82f6" />, label: 'Auto-Lock', value: '5 minutes', vColor: 'rgba(255,255,255,0.6)', action: null },
    { icon: <SlidersHorizontal size={18} color="#ef4444" />, label: 'Signing Rules', value: '4 Levels Active', vColor: '#fca5a5', action: () => { if (onOpenSettings) { onClose(); onOpenSettings(); } } },
    { icon: <Shield size={18} color="#8b5cf6" />, label: 'Firmware Attestation', value: 'Verified', vColor: '#10b981', action: null },
  ];

  const handleCopyColdAddress = () => {
    navigator.clipboard.writeText(coldReceiveAddress).catch(() => {});
    setCopiedAddr(true);
    setTimeout(() => setCopiedAddr(false), 2000);
  };

  const handleShareColdAddress = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'FC Cold Vault Address',
          text: coldReceiveAddress,
        });
        return;
      } catch {
        // fall through to copy on share cancel/failure
      }
    }
    handleCopyColdAddress();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="cold-vault-overlay"
      style={{ background: '#0d0d0f', display: 'flex', flexDirection: 'column' }}
    >
      {/* NFC Tap Overlay */}
      {showNfcModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '32px' }}>
          <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ width: '160px', height: '160px', borderRadius: '50%', border: '3px solid rgba(212,175,55,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }} transition={{ duration: 2, repeat: Infinity }} style={{ position: 'absolute', inset: '-20px', borderRadius: '50%', border: '1px solid rgba(212,175,55,0.15)' }}></motion.div>
            <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0, 0.2] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }} style={{ position: 'absolute', inset: '-40px', borderRadius: '50%', border: '1px solid rgba(212,175,55,0.08)' }}></motion.div>
            <CreditCard size={48} color="var(--gold)" />
          </motion.div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '20px', fontWeight: '800', color: 'white', marginBottom: '8px' }}>Tap Your FC Card</div>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', fontWeight: '500' }}>Hold your card near the top of the phone</div>
          </div>
          <button onClick={() => { setShowNfcModal(false); setCardConnected(true); }} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '14px', padding: '14px 40px', color: 'rgba(255,255,255,0.6)', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>Cancel</button>
        </div>
      )}

      {/* Header */}
      <div className="cold-vault-header">
        <div className="cold-vault-header-brand">
          <div className="cold-vault-header-icon">
            <Shield size={18} color="var(--gold)" />
          </div>
          <div>
            <div className="cold-vault-header-title">Cold Vault</div>
            <div className="cold-vault-header-subtitle">FC Black Card ····9201</div>
          </div>
        </div>

        <div className="cold-vault-header-actions">
          <button
            type="button"
            className={`cold-vault-header-chip ${cardConnected ? 'connected' : 'disconnected'}`}
            onClick={() => { if (!cardConnected) setShowNfcModal(true); }}
          >
            <span className="cold-vault-header-chip-dot"></span>
            {cardConnected ? 'Ready to sign' : 'Tap card'}
          </button>
          <button type="button" className="cold-vault-close" onClick={onClose}>
            <X size={18} color="rgba(255,255,255,0.64)" />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="cold-vault-scroll">

        {/* ===== SEND SUB-VIEW ===== */}
        {coldView === 'send' && (
          <div className="cold-subview">
            <ColdViewHeader
              tone="blue"
              eyebrow="Secure Transfer"
              title="Cold Send"
              subtitle="Move funds out of hardware custody with NFC confirmation and PIN verification."
              badge="L2 single sign • NFC required"
              onBack={() => setColdView('main')}
            />

            {coldSendStep === 'form' && (<>
              <div className="cold-panel tonal-blue">
                <div className="cold-form-label">Recipient Address</div>
                <input
                  type="text"
                  value={coldSendAddr}
                  onChange={e => setColdSendAddr(e.target.value)}
                  placeholder="0x... or fc1..."
                  className="cold-form-input cold-mono"
                />
              </div>

              <div className="cold-panel">
                <div className="cold-form-label">Asset</div>
                <div className="cold-chip-list fixed">
                  {['FCUSD', 'FCC', 'BTC', 'ETH'].map((assetId) => (
                    <button
                      key={assetId}
                      type="button"
                      className={`cold-chip blue ${coldSendAsset === assetId ? 'active' : ''}`}
                      onClick={() => setColdSendAsset(assetId)}
                    >
                      {assetId}
                    </button>
                  ))}
                </div>
              </div>

              <div className="cold-panel">
                <div className="cold-form-label">Amount</div>
                <div className="cold-amount-shell">
                  <input
                    type="text"
                    value={coldSendAmount}
                    onChange={e => setColdSendAmount(e.target.value)}
                    placeholder="0.00"
                    className="cold-form-input cold-form-amount cold-mono"
                  />
                  <span className="cold-amount-suffix">{coldSendAsset}</span>
                </div>
                <div className="cold-form-note">This transfer will be signed by FC Black Card ····9201 and broadcast after PIN confirmation.</div>
              </div>

              <div className="cold-note-card blue">
                <Shield size={16} color="#60a5fa" />
                <div>
                  Policy check is active. Trusted destinations can pass through single-sign, while restricted routes escalate automatically.
                </div>
              </div>

              <button
                type="button"
                className={`cold-primary-cta blue ${coldSendReady ? '' : 'disabled'}`}
                onClick={() => { if (coldSendReady) setColdSendStep('nfc'); }}
              >
                <CreditCard size={20} />
                Continue to Sign
              </button>
            </>)}

            {coldSendStep === 'nfc' && (
              <div className="cold-stage-shell">
                <ColdStageOrb tone="gold" size="large" icon={<CreditCard size={44} color="var(--gold)" />} />
                <div className="cold-stage-copy">
                  <div className="cold-stage-title">Tap Your FC Card</div>
                  <div className="cold-stage-subtitle">Hold the card near the top of your phone to authorize this cold-storage transfer.</div>
                </div>
                <div className="cold-stage-summary">
                  <span>Sending</span>
                  <strong>{coldSendAmount} {coldSendAsset}</strong>
                  <small>{coldSendAddr}</small>
                </div>
                <div className="cold-stage-actions">
                  <button type="button" className="cold-primary-cta gold" onClick={() => setColdSendStep('pin')}>Simulate NFC Tap</button>
                  <button type="button" className="cold-secondary-cta" onClick={() => setColdSendStep('form')}>Cancel</button>
                </div>
              </div>
            )}

            {coldSendStep === 'pin' && (
              <div className="cold-stage-shell">
                <div className="cold-verification-pill">
                  <CheckCircle2 size={16} color="#10b981" />
                  Card verified
                </div>
                <div className="cold-stage-copy">
                  <div className="cold-stage-title">Enter PIN Code</div>
                  <div className="cold-stage-subtitle">Complete the final hardware check with your 6-digit vault PIN.</div>
                </div>
                <div className="cold-pin-dots">
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <div key={index} className={`cold-pin-dot ${coldPinInput.length > index ? 'filled' : ''}`}>
                      {coldPinInput.length > index ? '•' : ''}
                    </div>
                  ))}
                </div>
                <div className="cold-pin-grid">
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'].map((key) => (
                    <button
                      key={key || 'empty'}
                      type="button"
                      className={`cold-pin-key ${key ? '' : 'blank'}`}
                      onClick={() => {
                        if (key === '⌫') setColdPinInput(value => value.slice(0, -1));
                        else if (key && coldPinInput.length < 6) {
                          const next = coldPinInput + key;
                          setColdPinInput(next);
                          if (next.length === 6) setTimeout(() => setColdSendStep('success'), 600);
                        }
                      }}
                      disabled={!key}
                    >
                      {key}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {coldSendStep === 'success' && (
              <div className="cold-stage-shell">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 12 }} className="cold-success-mark">
                  <CheckCircle2 size={48} color="#10b981" />
                </motion.div>
                <div className="cold-stage-copy">
                  <div className="cold-stage-title">Transaction Signed</div>
                  <div className="cold-stage-subtitle">Broadcast to FC Chain successfully and queued in your cold-vault activity log.</div>
                </div>
                <div className="cold-stage-summary success">
                  <span>Dispatch Record</span>
                  <strong>-{coldSendAmount} {coldSendAsset}</strong>
                  <small>{coldSendAddr}</small>
                </div>
                <div className="cold-stage-footnote">
                  <span className="cold-stage-footnote-dot"></span>
                  Signed with FC Black Card ····9201 • L2 Single Sign
                </div>
                <button type="button" className="cold-secondary-cta solid" onClick={() => { setColdView('main'); setColdSendStep('form'); setColdPinInput(''); }}>
                  Done
                </button>
              </div>
            )}
          </div>
        )}

        {/* ===== RECEIVE SUB-VIEW ===== */}
        {coldView === 'receive' && (
          <div className="cold-subview">
            <ColdViewHeader
              tone="green"
              eyebrow="Receive to Vault"
              title="Cold Vault Address"
              subtitle="Scan, copy, or share the hardware-linked address for incoming funds."
              badge="Hardware-linked destination"
              onBack={() => setColdView('main')}
            />

            <div className="cold-receive-shell">
              <div className="cold-receive-qr-card">
                <svg viewBox="0 0 200 200" width="168" height="168">
                  <rect x="10" y="10" width="50" height="50" rx="8" fill="#0f172a" />
                  <rect x="140" y="10" width="50" height="50" rx="8" fill="#0f172a" />
                  <rect x="10" y="140" width="50" height="50" rx="8" fill="#0f172a" />
                  <rect x="20" y="20" width="30" height="30" rx="4" fill="#0f172a" />
                  <rect x="150" y="20" width="30" height="30" rx="4" fill="#0f172a" />
                  <rect x="20" y="150" width="30" height="30" rx="4" fill="#0f172a" />
                  <rect x="26" y="26" width="18" height="18" rx="2" fill="#0f172a" />
                  <rect x="156" y="26" width="18" height="18" rx="2" fill="#0f172a" />
                  <rect x="26" y="156" width="18" height="18" rx="2" fill="#0f172a" />
                  {[70,80,90,100,110,120,130].map((x,i) => [20,40,60,80,100,120,140,160].map((y,j) => (i+j)%3!==0 && <rect key={`${x}-${y}`} x={x} y={y} width="8" height="8" rx="1" fill="#0f172a" />))}
                  {[20,40,60].map((x,i) => [70,90,110].map((y,j) => (i+j)%2===0 && <rect key={`b${x}-${y}`} x={x} y={y} width="8" height="8" rx="1" fill="#0f172a" />))}
                  {[140,160].map((x,i) => [80,100,120,140].map((y,j) => (i+j)%2!==0 && <rect key={`c${x}-${y}`} x={x} y={y} width="8" height="8" rx="1" fill="#0f172a" />))}
                </svg>
                <div className="cold-receive-center-badge">FC</div>
              </div>

              <div className="cold-inline-badge green wide">Secure arrival route • FC Black Card ····9201</div>
            </div>

            <div className="cold-panel">
              <div className="cold-form-label">Cold Vault Address</div>
              <div className="cold-address-card">{coldReceiveAddress}</div>
            </div>

            <div className="cold-action-grid">
              <button type="button" className={`cold-primary-cta green ${copiedAddr ? 'success' : ''}`} onClick={handleCopyColdAddress}>
                {copiedAddr ? <><CheckCircle2 size={18} /> Copied!</> : <><Copy size={18} /> Copy Address</>}
              </button>
              <button type="button" className="cold-secondary-cta bordered" onClick={handleShareColdAddress}>
                <Share2 size={18} />
                Share Address
              </button>
            </div>

            <div className="cold-note-card blue">
              <Shield size={16} color="#60a5fa" />
              <div>
                Funds received here land directly in hardware custody. Outbound movement still requires NFC tap plus local PIN confirmation.
              </div>
            </div>
          </div>
        )}

        {/* ===== SWAP SUB-VIEW ===== */}
        {coldView === 'swap' && (
          <div className="cold-subview">
            <ColdViewHeader
              tone="purple"
              eyebrow="Vault Rebalance"
              title="Cold Swap"
              subtitle="Reallocate assets inside cold storage without exposing private keys to a hot environment."
              badge="NFC approval required"
              onBack={() => { setColdView('main'); setSwapStep('form'); setSwapAmount(''); }}
            />

            {swapStep === 'form' && (<>
              <div className="cold-panel tonal-purple">
                <div className="cold-form-label">From</div>
                <div className="cold-chip-list wrap">
                  {coldAssets.map((asset) => (
                    <button
                      key={asset.symbol}
                      type="button"
                      className={`cold-chip purple ${swapFrom === asset.symbol ? 'active' : ''}`}
                      onClick={() => {
                        setSwapFrom(asset.symbol);
                        if (asset.symbol === swapTo) setSwapTo(coldAssets.find(x => x.symbol !== asset.symbol)?.symbol || 'FCUSD');
                      }}
                    >
                      <span>{asset.icon}</span>
                      {asset.symbol}
                    </button>
                  ))}
                </div>
                <div className="cold-amount-shell swap">
                  <input
                    type="text"
                    value={swapAmount}
                    onChange={e => setSwapAmount(e.target.value)}
                    placeholder="0.00"
                    className="cold-form-input cold-form-amount cold-mono"
                  />
                  <span className="cold-amount-suffix">{swapFrom}</span>
                </div>
                <div className="cold-form-note">Available: {swapFromAsset?.balance || '0'} {swapFrom}</div>
              </div>

              <div className="cold-swap-toggle-wrap">
                <button
                  type="button"
                  className="cold-swap-toggle"
                  onClick={() => { const next = swapFrom; setSwapFrom(swapTo); setSwapTo(next); }}
                >
                  <ArrowRightLeft size={18} color="#c4b5fd" style={{ transform: 'rotate(90deg)' }} />
                </button>
              </div>

              <div className="cold-panel">
                <div className="cold-form-label">To</div>
                <div className="cold-chip-list wrap">
                  {swapTargetAssets.map((asset) => (
                    <button
                      key={asset.symbol}
                      type="button"
                      className={`cold-chip green ${swapTo === asset.symbol ? 'active' : ''}`}
                      onClick={() => setSwapTo(asset.symbol)}
                    >
                      <span>{asset.icon}</span>
                      {asset.symbol}
                    </button>
                  ))}
                </div>
                <div className="cold-quote-card">
                  <div className="cold-quote-value">{swapAmount ? `≈ ${coldSwapQuote}` : '—'}</div>
                  <div className="cold-quote-symbol">{swapTo}</div>
                </div>
              </div>

              {swapAmount && (
                <div className="cold-rate-card">
                  <div className="cold-rate-row">
                    <span>Exchange Rate</span>
                    <strong>1 {swapFrom} = {coldSwapRate > 1000 ? coldSwapRate.toFixed(0) : coldSwapRate.toFixed(4)} {swapTo}</strong>
                  </div>
                  <div className="cold-rate-row">
                    <span>Slippage</span>
                    <strong className="positive">0.1%</strong>
                  </div>
                  <div className="cold-rate-row">
                    <span>Network Fee</span>
                    <strong>~$0.02 (FC Chain)</strong>
                  </div>
                </div>
              )}

              <div className="cold-note-card purple">
                <Shield size={16} color="#c4b5fd" />
                <div>
                  Swap execution stays inside cold custody. Confirmation still requires FC card tap and local authorization before settlement.
                </div>
              </div>

              <button
                type="button"
                className={`cold-primary-cta purple ${swapReady ? '' : 'disabled'}`}
                onClick={() => { if (swapReady) setSwapStep('nfc'); }}
              >
                <ArrowRightLeft size={20} />
                Review Swap
              </button>
            </>)}

            {swapStep === 'nfc' && (
              <div className="cold-stage-shell">
                <div className="cold-stage-summary">
                  <span>Swap Preview</span>
                  <strong>-{swapAmount} {swapFrom}</strong>
                  <small>Estimated return +{coldSwapQuote} {swapTo}</small>
                </div>
                <ColdStageOrb tone="purple" icon={<CreditCard size={40} color="#c4b5fd" />} />
                <div className="cold-stage-copy">
                  <div className="cold-stage-title">Tap to Confirm Swap</div>
                  <div className="cold-stage-subtitle">Hold your FC card near the phone to approve the rebalance inside cold storage.</div>
                </div>
                <div className="cold-stage-actions">
                  <button type="button" className="cold-primary-cta purple" onClick={() => setSwapStep('success')}>Simulate NFC Tap</button>
                  <button type="button" className="cold-secondary-cta" onClick={() => setSwapStep('form')}>Cancel</button>
                </div>
              </div>
            )}

            {swapStep === 'success' && (
              <div className="cold-stage-shell">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 12 }} className="cold-success-mark">
                  <CheckCircle2 size={48} color="#10b981" />
                </motion.div>
                <div className="cold-stage-copy">
                  <div className="cold-stage-title">Swap Complete</div>
                  <div className="cold-stage-subtitle">The rebalance settled on FC Chain DEX and remains fully under hardware custody.</div>
                </div>
                <div className="cold-stage-summary success">
                  <span>Settlement Record</span>
                  <strong>-{swapAmount} {swapFrom}</strong>
                  <small>Received +{coldSwapQuote} {swapTo}</small>
                </div>
                <div className="cold-stage-footnote">
                  <span className="cold-stage-footnote-dot"></span>
                  Signed with FC Card ····9201 • L2 Single Sign
                </div>
                <button type="button" className="cold-secondary-cta solid" onClick={() => { setColdView('main'); setSwapStep('form'); setSwapAmount(''); }}>
                  Done
                </button>
              </div>
            )}
          </div>
        )}

        {/* ===== ACTIVITY FULL VIEW ===== */}
        {coldView === 'activity' && (
          <div className="cold-subview">
            <ColdViewHeader
              tone="gold"
              eyebrow="Audit Trail"
              title="Cold Vault Activity"
              subtitle="Review every hardware-signed movement across your protected assets."
              badge={`${filteredActivityTransactions.length} records shown`}
              onBack={() => setColdView('main')}
            />

            <div className="cold-activity-stats">
              <div className="cold-activity-stat">
                <span>Total Records</span>
                <strong>{extendedColdTransactions.length}</strong>
              </div>
              <div className="cold-activity-stat">
                <span>L3 Approvals</span>
                <strong>{extendedColdTransactions.filter(tx => tx.level === 'L3').length}</strong>
              </div>
              <div className="cold-activity-stat">
                <span>Latest Event</span>
                <strong>{extendedColdTransactions[0]?.time || 'Now'}</strong>
              </div>
            </div>

            <div className="cold-filter-row">
              {['All', 'Sent', 'Received', 'Swapped'].map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className={`cold-filter-pill ${activityFilter === filter ? 'active gold' : ''}`}
                  onClick={() => setActivityFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="cold-activity-list">
              {filteredActivityTransactions.map((tx, idx) => (
                <div key={`${tx.time}-${tx.asset}-${idx}`}>
                  <ColdActivityRow tx={tx} />
                  {idx < filteredActivityTransactions.length - 1 ? <div className="cold-activity-divider"></div> : null}
                </div>
              ))}
            </div>

            <button type="button" className="cold-secondary-cta bordered full">
              <FileText size={16} />
              Export Transaction History
            </button>
          </div>
        )}

        {/* ===== ASSET DETAIL VIEW ===== */}
        {coldView === 'assetDetail' && selectedAsset && (
          <div className="cold-subview">
            <ColdViewHeader
              tone="blue"
              eyebrow="Asset Deep Dive"
              title={selectedAsset.name}
              subtitle={`${selectedAsset.symbol} stored inside hardware custody with NFC-only outbound movement.`}
              badge={`${selectedAsset.symbol} • Cold storage`}
              onBack={() => { setColdView('main'); setSelectedAsset(null); }}
            />

            <div className="cold-asset-hero">
              <div className="cold-asset-token" style={{ background: `${selectedAsset.color}18`, borderColor: `${selectedAsset.color}35`, color: selectedAsset.color }}>
                {selectedAsset.icon}
              </div>
              <div className="cold-asset-balance">{selectedAsset.balance}</div>
              <div className="cold-asset-symbol">{selectedAsset.symbol}</div>
              <div className="cold-asset-meta-row">
                <div className="cold-asset-meta-card">
                  <span>Value</span>
                  <strong>{selectedAsset.fiat}</strong>
                </div>
                <div className="cold-asset-meta-card">
                  <span>24H</span>
                  <strong style={{ color: selectedAsset.positive ? '#34d399' : '#fca5a5' }}>{selectedAsset.change}</strong>
                </div>
              </div>
            </div>

            <div className="cold-panel">
              <div className="cold-chart-head">
                <span>Price Chart</span>
                <div className="cold-mini-tabs">
                  {['1D', '1W', '1M', '1Y'].map((period) => (
                    <span key={period} className={period === '1W' ? 'active' : ''}>{period}</span>
                  ))}
                </div>
              </div>
              <svg viewBox="0 0 300 80" style={{ width: '100%', height: '80px' }}>
                <defs>
                  <linearGradient id={`grad-${selectedAsset.symbol}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={selectedAsset.color} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={selectedAsset.color} stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d={selectedAsset.positive ? 'M0,60 C30,55 60,50 90,40 C120,30 150,45 180,35 C210,25 240,30 270,20 L300,15 L300,80 L0,80 Z' : 'M0,30 C30,35 60,25 90,40 C120,50 150,35 180,45 C210,55 240,50 270,60 L300,65 L300,80 L0,80 Z'} fill={`url(#grad-${selectedAsset.symbol})`} />
                <path d={selectedAsset.positive ? 'M0,60 C30,55 60,50 90,40 C120,30 150,45 180,35 C210,25 240,30 270,20 L300,15' : 'M0,30 C30,35 60,25 90,40 C120,50 150,35 180,45 C210,55 240,50 270,60 L300,65'} fill="none" stroke={selectedAsset.color} strokeWidth="2.5" />
              </svg>
            </div>

            <div className="cold-asset-actions">
              <button
                type="button"
                className="cold-main-action blue"
                onClick={() => {
                  setColdView('send');
                  setColdSendAsset(['FCUSD', 'FCC', 'BTC', 'ETH'].includes(selectedAsset.symbol) ? selectedAsset.symbol : 'FCUSD');
                  setColdSendStep('form');
                }}
              >
                <div className="cold-main-action-icon"><ArrowUp size={18} /></div>
                <div className="cold-main-action-copy"><span>Send</span><small>Move out securely</small></div>
              </button>
              <button type="button" className="cold-main-action green" onClick={() => { setColdView('receive'); }}>
                <div className="cold-main-action-icon"><ArrowDown size={18} /></div>
                <div className="cold-main-action-copy"><span>Receive</span><small>Share vault route</small></div>
              </button>
              <button type="button" className="cold-main-action purple" onClick={() => { setColdView('swap'); setSwapFrom(selectedAsset.symbol); }}>
                <div className="cold-main-action-icon"><ArrowRightLeft size={18} /></div>
                <div className="cold-main-action-copy"><span>Swap</span><small>Rebalance position</small></div>
              </button>
            </div>

            <div className="cold-panel">
              <div className="cold-chart-head">
                <span>Recent {selectedAsset.symbol} Activity</span>
                <span>{selectedAssetTransactions.length} records</span>
              </div>
              <div className="cold-activity-list embedded">
                {selectedAssetTransactions.length > 0 ? (
                  selectedAssetTransactions.map((tx, idx) => (
                    <div key={`${tx.time}-${tx.asset}-${idx}`}>
                      <ColdActivityRow tx={tx} />
                      {idx < selectedAssetTransactions.length - 1 ? <div className="cold-activity-divider"></div> : null}
                    </div>
                  ))
                ) : (
                  <div className="cold-empty-state">No recent {selectedAsset.symbol} transactions</div>
                )}
              </div>
            </div>

            <div className="cold-note-card" style={{ borderColor: `${selectedAsset.color}22` }}>
              <Shield size={18} color={selectedAsset.color} />
              <div>
                This {selectedAsset.name} position is sealed inside the FC Black Card secure element. Every outbound action still requires hardware tap and local authorization.
              </div>
            </div>
          </div>
        )}

        {/* ===== MAIN VIEW ===== */}
        {coldView === 'main' && (<>
        <div className="cold-hero-card">
          <div className="cold-hero-top">
            <div>
              <div className="cold-hero-kicker">DEEP STORAGE BALANCE</div>
              <div className="cold-hero-balance">{totalColdBalance}</div>
            </div>
            <button
              type="button"
              className={`cold-hero-status ${cardConnected ? 'connected' : 'disconnected'}`}
              onClick={() => { if (!cardConnected) setShowNfcModal(true); }}
            >
              <span className="cold-hero-status-dot"></span>
              {cardConnected ? 'Card Connected' : 'Tap to Connect'}
            </button>
          </div>

          <div className="cold-hero-subcopy">
            Hardware-isolated custody with NFC signing, backup card redundancy, and policy-based approvals.
          </div>

          <div className="cold-hero-change-row">
            <span className="cold-hero-change positive">+$4,280.50 (24h)</span>
            <span className="cold-hero-muted">92.4% of protected net worth</span>
          </div>

          <div className="cold-hero-grid">
            <div className="cold-hero-stat">
              <span>Protected Assets</span>
              <strong>{coldAssets.length} tokens</strong>
            </div>
            <div className="cold-hero-stat">
              <span>Backup Cards</span>
              <strong>{backupCards.filter(card => card.status !== 'empty').length} paired</strong>
            </div>
            <div className="cold-hero-stat">
              <span>Signing Policy</span>
              <strong>4 levels active</strong>
            </div>
          </div>
        </div>

        <div className="cold-main-actions">
          {[
            { icon: <ArrowUp size={20} />, label: 'Send', detail: 'NFC signature', tone: 'blue', action: () => { setColdView('send'); setColdSendStep('form'); setColdSendAddr(''); setColdSendAmount(''); setColdPinInput(''); } },
            { icon: <ArrowDown size={20} />, label: 'Receive', detail: 'Share vault address', tone: 'green', action: () => { setColdView('receive'); setCopiedAddr(false); } },
            { icon: <ArrowRightLeft size={20} />, label: 'Swap', detail: 'Rebalance offline', tone: 'purple', action: () => { setColdView('swap'); setSwapStep('form'); setSwapAmount(''); } },
          ].map((act) => (
            <button key={act.label} type="button" className={`cold-main-action ${act.tone}`} onClick={act.action}>
              <div className="cold-main-action-icon">{act.icon}</div>
              <div className="cold-main-action-copy">
                <span>{act.label}</span>
                <small>{act.detail}</small>
              </div>
            </button>
          ))}
        </div>

        {/* Cold Assets List */}
        <div className="cold-stack-section">
          <ColdSectionHeader label="Cold Assets" meta={`${coldAssets.length} protected positions`} />
          <div className="cold-list-shell">
            {coldAssets.map((asset, idx) => (
              <div key={asset.symbol}>
                <ColdVaultAssetRow asset={asset} onClick={() => { setSelectedAsset(asset); setColdView('assetDetail'); }} />
                {idx < coldAssets.length - 1 ? <div className="cold-activity-divider"></div> : null}
              </div>
            ))}
          </div>
        </div>

        {/* Card Management */}
        <div className="cold-stack-section">
          <ColdSectionHeader label="Backup Cards" meta="Redundancy and recovery posture" />
          <div className="cold-stack">
            {backupCards.map((card) => (
              <ColdBackupCardRow key={card.id} card={card} />
            ))}
          </div>
        </div>

        {/* Security Quick Panel */}
        <div className="cold-stack-section">
          <ColdSectionHeader label="Security" meta="Active protection layers and signer controls" />
          <div className="cold-list-shell">
            {securityItems.map((item, idx) => (
              <div key={item.label}>
                <ColdSecurityRow item={item} onClick={item.action} />
                {idx < securityItems.length - 1 ? <div className="cold-activity-divider"></div> : null}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="cold-stack-section">
          <ColdSectionHeader label="Recent Activity" meta="Latest vault movement" actionLabel="View All" onAction={() => setColdView('activity')} />
          <div className="cold-activity-list">
            {coldTransactions.map((tx, idx) => (
              <div key={`${tx.time}-${tx.asset}-${idx}`}>
                <ColdActivityRow tx={tx} />
                {idx < coldTransactions.length - 1 ? <div className="cold-activity-divider"></div> : null}
              </div>
            ))}
          </div>
        </div>

        {/* Seedless Info */}
        <div className="cold-seedless-card">
          <div className="cold-seedless-head">
            <Database size={18} color="#c4b5fd" />
            <span>Seedless Architecture</span>
          </div>
          <div className="cold-seedless-copy">
            Your private keys are generated and stored exclusively within the FC card&apos;s EAL6+ secure element. Keys never leave the chip, so recovery is handled through card redundancy instead of a seed phrase.
          </div>
          <div className="cold-action-grid">
            <button type="button" className="cold-secondary-cta purple-soft">Export Seed (Optional)</button>
            <button type="button" className="cold-secondary-cta bordered subdued">Import Seed</button>
          </div>
        </div>

        {/* Factory Reset */}
        <button type="button" className="cold-danger-cta">
          Factory Reset Card
        </button>

        </>)}

      </div>
    </motion.div>
  );
};

// --- Global Biometric Gate Component ---

export default ColdVaultModule;
