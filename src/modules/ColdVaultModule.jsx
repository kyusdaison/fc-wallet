import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, ArrowUp, ArrowRightLeft, CheckCircle2, ChevronLeft, ChevronRight, Clock, Copy, CreditCard, Database, FileText, Fingerprint, Lock, Share2, Shield, SlidersHorizontal, X } from 'lucide-react';

/* ---- Shared micro-components (matches Settings page pattern) ---- */
const CvBack = ({ title, onBack }) => (
  <div className="cv-sub-header">
    <button type="button" className="cv-back" onClick={onBack}><ChevronLeft size={20} color="#93c5fd" strokeWidth={2.5} /></button>
    <span className="cv-sub-title">{title}</span>
  </div>
);

const CvInfoBar = ({ items }) => (
  <div className="cv-info-bar">
    {items.map(item => (
      <div key={item.label} className="cv-info-item">
        <span>{item.label}</span>
        <strong style={item.color ? { color: item.color } : undefined}>{item.value}</strong>
      </div>
    ))}
  </div>
);

const CvDivider = () => <div className="cv-divider"></div>;

const CvRow = ({ icon, label, desc, right, onClick }) => (
  <div onClick={onClick} onKeyDown={onClick ? e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } } : undefined} className={`cv-row ${onClick ? 'clickable' : ''}`} role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined}>
    {icon && <div className="cv-row-icon">{icon}</div>}
    <div className="cv-row-copy">
      <div className="cv-row-label">{label}</div>
      {desc && <div className="cv-row-desc">{desc}</div>}
    </div>
    <div className="cv-row-trail">{right || (onClick && <ChevronRight size={16} color="var(--text-tertiary)" />)}</div>
  </div>
);

/* ---- Activity row ---- */
const CvActivityRow = ({ tx }) => {
  const iconMap = { receive: <ArrowDown size={15} color="#10b981" />, send: <ArrowUp size={15} color="#ef4444" />, swap: <ArrowRightLeft size={14} color="#8b5cf6" /> };
  const toneMap = { receive: 'green', send: 'red', swap: 'purple' };
  const titleMap = { receive: `Received ${tx.asset}`, send: `Sent ${tx.asset}`, swap: `Swapped ${tx.asset}` };
  return (
    <div className="cv-tx-row">
      <div className={`cv-tx-icon ${toneMap[tx.type]}`}>{iconMap[tx.type]}</div>
      <div className="cv-tx-copy">
        <div className="cv-tx-title">{titleMap[tx.type]}</div>
        <div className="cv-tx-meta">{tx.time} · {tx.from || tx.to || 'FC Vault'}</div>
      </div>
      <div className="cv-tx-side">
        <div className={`cv-tx-amount ${tx.type === 'receive' ? 'positive' : tx.type === 'send' ? 'negative' : ''}`}>{tx.amount}</div>
        <div className="cv-tx-fiat">
          {tx.level && <span className={`cv-badge ${tx.level === 'L3' ? 'gold' : 'blue'}`}>{tx.level}</span>}
          <span>{tx.fiat}</span>
        </div>
      </div>
    </div>
  );
};

/* ---- Asset row ---- */
const CvAssetRow = ({ asset, onClick }) => (
  <button type="button" className="cv-row clickable" onClick={onClick}>
    <div className="cv-token" style={{ background: `${asset.color}18`, color: asset.color }}>{asset.icon}</div>
    <div className="cv-row-copy">
      <div className="cv-row-label">{asset.name}</div>
      <div className="cv-row-desc">{asset.symbol} <span className="cv-cold-tag">Cold</span></div>
    </div>
    <div className="cv-row-trail" style={{ textAlign: 'right' }}>
      <div className="cv-row-label">{asset.balance}</div>
      <div className="cv-row-desc">{asset.fiat} <span className={asset.positive ? 'positive' : 'negative'}>{asset.change}</span></div>
    </div>
  </button>
);

/* ---- Backup card row ---- */
const CvCardRow = ({ card }) => (
  <div className="cv-row">
    <div className={`cv-card-icon ${card.status}`}>
      <CreditCard size={16} color={card.status === 'connected' ? 'var(--gold)' : card.status === 'synced' ? '#10b981' : 'var(--text-tertiary)'} />
    </div>
    <div className="cv-row-copy">
      <div className="cv-row-label">{card.name}</div>
      <div className="cv-row-desc">····{card.last4} · {card.firmware} · {card.lastSync}</div>
    </div>
    <div className={`cv-status-pill ${card.status}`}>
      <span className="cv-status-dot"></span>
      {card.status === 'empty' ? 'Add' : card.status}
    </div>
  </div>
);

/* ============================================================
   COLD VAULT MODULE
   ============================================================ */
const ColdVaultModule = ({ onClose, onOpenSettings }) => {
  const [cardConnected, setCardConnected] = useState(true);
  const [showNfcModal, setShowNfcModal] = useState(false);
  const [coldView, setColdView] = useState('main');
  const [coldSendStep, setColdSendStep] = useState('form');
  const [coldSendAddr, setColdSendAddr] = useState('');
  const [coldSendAmount, setColdSendAmount] = useState('');
  const [coldSendAsset, setColdSendAsset] = useState('FCUSD');
  const [coldPinInput, setColdPinInput] = useState('');
  const [copiedAddr, setCopiedAddr] = useState(false);
  const [swapFrom, setSwapFrom] = useState('FCC');
  const [swapTo, setSwapTo] = useState('FCUSD');
  const [swapAmount, setSwapAmount] = useState('');
  const [swapStep, setSwapStep] = useState('form');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [activityFilter, setActivityFilter] = useState('All');

  /* ---- Data ---- */
  const coldAssets = [
    { symbol: 'FCC', name: 'FC Coin', balance: '125,000.00', fiat: '$227,500', change: '+3.2%', positive: true, color: 'var(--green)', icon: '◆' },
    { symbol: 'FCUSD', name: 'FC Stablecoin', balance: '250,000.00', fiat: '$250,000', change: '0.0%', positive: true, color: '#3b82f6', icon: '◎' },
    { symbol: 'BTC', name: 'Bitcoin', balance: '1.8524', fiat: '$178,430', change: '+1.8%', positive: true, color: '#f7931a', icon: '₿' },
    { symbol: 'ETH', name: 'Ethereum', balance: '28.45', fiat: '$98,472', change: '-0.4%', positive: false, color: '#627eea', icon: 'Ξ' },
    { symbol: 'SOL', name: 'Solana', balance: '340.00', fiat: '$62,220', change: '+5.1%', positive: true, color: '#9945ff', icon: '◐' },
  ];
  const coldTransactions = [
    { type: 'receive', asset: 'BTC', amount: '+0.5000', fiat: '+$48,200', time: '2h ago', level: 'L3', from: '0x7f2...4e1' },
    { type: 'send', asset: 'FCUSD', amount: '-10,000', fiat: '-$10,000', time: '1d ago', level: 'L2', to: '0xa3c...9b2' },
    { type: 'receive', asset: 'ETH', amount: '+5.0000', fiat: '+$17,300', time: '3d ago', level: 'L2', from: '0x1b8...5f0' },
    { type: 'swap', asset: 'FCC→FCUSD', amount: '5,000', fiat: '$9,100', time: '5d ago', level: 'L2', from: 'DEX' },
  ];
  const extendedColdTransactions = [
    ...coldTransactions,
    { type: 'receive', asset: 'FCC', amount: '+15,000', fiat: '+$27,300', time: '1w ago', level: 'L2', from: '0x4d2...8c3' },
    { type: 'send', asset: 'BTC', amount: '-0.2500', fiat: '-$24,050', time: '1w ago', level: 'L3', to: '0xb7e...2f1' },
    { type: 'swap', asset: 'ETH→FCC', amount: '10.00', fiat: '$34,600', time: '2w ago', level: 'L2', from: 'DEX' },
    { type: 'receive', asset: 'SOL', amount: '+100.00', fiat: '+$18,300', time: '2w ago', level: 'L2', from: '0x9f1...3a8' },
    { type: 'send', asset: 'FCUSD', amount: '-5,000', fiat: '-$5,000', time: '3w ago', level: 'L2', to: '0xe5c...7d4' },
    { type: 'receive', asset: 'BTC', amount: '+0.3000', fiat: '+$28,860', time: '1m ago', level: 'L3', from: '0x2a8...6e9' },
  ];
  const backupCards = [
    { id: 1, name: 'Primary Card', last4: '9201', status: 'connected', firmware: 'v2.1.4', lastSync: 'Just now' },
    { id: 2, name: 'Backup Card 1', last4: '4782', status: 'synced', firmware: 'v2.1.4', lastSync: '12h ago' },
    { id: 3, name: 'Backup Card 2', last4: '—', status: 'empty', firmware: '—', lastSync: 'Not paired' },
  ];
  const securityItems = [
    { icon: <Fingerprint size={16} color="#10b981" />, label: 'Biometric Lock', value: 'Enabled', vColor: '#10b981' },
    { icon: <Lock size={16} color="#f59e0b" />, label: 'Access Code', value: '••••••', vColor: 'var(--text-secondary)' },
    { icon: <Clock size={16} color="#3b82f6" />, label: 'Auto-Lock', value: '5 min', vColor: 'var(--text-secondary)' },
    { icon: <SlidersHorizontal size={16} color="#ef4444" />, label: 'Signing Rules', value: '4 Levels', vColor: '#fca5a5', action: () => { if (onOpenSettings) { onClose(); onOpenSettings(); } } },
    { icon: <Shield size={16} color="#8b5cf6" />, label: 'Firmware', value: 'Verified', vColor: '#10b981' },
  ];
  const coldReceiveAddress = 'fc1q9x8m4v2k7h3n5p6w0t1r8y4u2i9o7a3s5d';

  /* ---- Derived ---- */
  const totalColdBalance = '$816,622';
  const getColdAssetRate = (s) => ({ BTC: 96200, ETH: 3460, FCC: 1.82, SOL: 183, FCUSD: 1 }[s] || 1);
  const getColdSwapQuote = (amt, from, to) => {
    const p = Number.parseFloat(String(amt).replace(/,/g, ''));
    if (!Number.isFinite(p) || p <= 0) return '';
    const q = (p * getColdAssetRate(from)) / getColdAssetRate(to);
    return q.toFixed(to === 'BTC' ? 6 : to === 'ETH' ? 4 : 2);
  };
  const coldSwapQuote = getColdSwapQuote(swapAmount, swapFrom, swapTo);
  const coldSwapRate = getColdAssetRate(swapFrom) / getColdAssetRate(swapTo);
  const coldSendReady = coldSendAddr.trim() && coldSendAmount.trim();
  const swapReady = swapAmount.trim() && Number.parseFloat(String(swapAmount).replace(/,/g, '')) > 0;
  const swapFromAsset = coldAssets.find(a => a.symbol === swapFrom);
  const swapTargetAssets = coldAssets.filter(a => a.symbol !== swapFrom);
  const filteredActivity = extendedColdTransactions.filter(tx => activityFilter === 'All' || (activityFilter === 'Sent' && tx.type === 'send') || (activityFilter === 'Received' && tx.type === 'receive') || (activityFilter === 'Swapped' && tx.type === 'swap'));
  const selectedAssetTxs = selectedAsset ? extendedColdTransactions.filter(tx => tx.asset.includes(selectedAsset.symbol)) : [];

  const handleCopy = () => { navigator.clipboard.writeText(coldReceiveAddress).catch(() => {}); setCopiedAddr(true); setTimeout(() => setCopiedAddr(false), 2000); };
  const handleShare = async () => { if (navigator.share) { try { await navigator.share({ title: 'FC Cold Vault', text: coldReceiveAddress }); return; } catch {} } handleCopy(); };

  /* ---- NFC tap stage (reusable) ---- */
  const NfcStage = ({ label, detail, onTap, onCancel, tone = 'gold' }) => (
    <div className="cv-stage">
      <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} className={`cv-stage-orb ${tone}`}>
        <CreditCard size={36} color={tone === 'gold' ? 'var(--gold)' : tone === 'purple' ? '#c4b5fd' : '#60a5fa'} />
      </motion.div>
      <div className="cv-stage-title">Tap Your FC Card</div>
      <div className="cv-stage-desc">Hold card near phone to sign</div>
      {label && <div className="cv-stage-summary"><span>{label}</span><strong>{detail}</strong></div>}
      <div className="cv-stage-actions">
        <button type="button" className={`cv-btn primary ${tone}`} onClick={onTap}>Simulate NFC Tap</button>
        <button type="button" className="cv-btn ghost" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );

  /* ---- Success stage (reusable) ---- */
  const SuccessStage = ({ title, subtitle, detail, onDone }) => (
    <div className="cv-stage">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 12 }}>
        <CheckCircle2 size={44} color="#10b981" />
      </motion.div>
      <div className="cv-stage-title">{title}</div>
      <div className="cv-stage-desc">{subtitle}</div>
      {detail && <div className="cv-stage-summary success"><strong>{detail}</strong></div>}
      <button type="button" className="cv-btn primary green" onClick={onDone}>Done</button>
    </div>
  );

  /* ============================================================
     SUB-PAGES
     ============================================================ */
  const renderSubView = () => {
    switch (coldView) {

      /* ---- SEND ---- */
      case 'send':
        return (<>
          <CvBack title="Cold Send" onBack={() => { setColdView('main'); setColdSendStep('form'); }} />
          <div className="cv-page">
            {coldSendStep === 'form' && (<>
              <CvInfoBar items={[
                { label: 'Asset', value: coldSendAsset },
                { label: 'Level', value: 'L2 Sign' },
                { label: 'Card', value: '····9201' },
              ]} />

              <div className="cv-card" style={{ padding: '14px' }}>
                <div className="cv-field-label">Recipient</div>
                <input type="text" value={coldSendAddr} onChange={e => setColdSendAddr(e.target.value)} placeholder="0x... or fc1..." className="cv-input mono" />
              </div>

              <div className="cv-card" style={{ padding: '14px' }}>
                <div className="cv-field-label">Asset</div>
                <div className="cv-chip-row">
                  {['FCUSD', 'FCC', 'BTC', 'ETH'].map(a => (
                    <button key={a} type="button" className={`cv-chip ${coldSendAsset === a ? 'active' : ''}`} onClick={() => setColdSendAsset(a)}>{a}</button>
                  ))}
                </div>
                <div className="cv-field-label" style={{ marginTop: 10 }}>Amount</div>
                <div className="cv-input-row">
                  <input type="text" value={coldSendAmount} onChange={e => setColdSendAmount(e.target.value)} placeholder="0.00" className="cv-input mono amount" />
                  <span className="cv-input-unit">{coldSendAsset}</span>
                </div>
              </div>

              <div className="cv-note blue">
                <Shield size={14} color="#60a5fa" />
                <span>Trusted destinations pass single-sign; restricted routes auto-escalate.</span>
              </div>

              <button type="button" className={`cv-btn primary blue full ${coldSendReady ? '' : 'disabled'}`} onClick={() => { if (coldSendReady) setColdSendStep('nfc'); }}>
                <CreditCard size={18} /> Continue to Sign
              </button>
            </>)}

            {coldSendStep === 'nfc' && (
              <NfcStage label="Sending" detail={`${coldSendAmount} ${coldSendAsset}`} onTap={() => setColdSendStep('pin')} onCancel={() => setColdSendStep('form')} />
            )}

            {coldSendStep === 'pin' && (
              <div className="cv-stage">
                <div className="cv-verified-pill"><CheckCircle2 size={14} color="#10b981" /> Card verified</div>
                <div className="cv-stage-title">Enter PIN</div>
                <div className="cv-stage-desc">6-digit vault PIN</div>
                <div className="cv-pin-dots">
                  {[0,1,2,3,4,5].map(i => (
                    <div key={i} className={`cv-pin-dot ${coldPinInput.length > i ? 'filled' : ''}`}>{coldPinInput.length > i ? '•' : ''}</div>
                  ))}
                </div>
                <div className="cv-pin-grid">
                  {['1','2','3','4','5','6','7','8','9','','0','⌫'].map(k => (
                    <button key={k || 'empty'} type="button" className={`cv-pin-key ${k ? '' : 'blank'}`} disabled={!k} onClick={() => {
                      if (k === '⌫') setColdPinInput(v => v.slice(0, -1));
                      else if (k && coldPinInput.length < 6) {
                        const next = coldPinInput + k;
                        setColdPinInput(next);
                        if (next.length === 6) setTimeout(() => setColdSendStep('success'), 600);
                      }
                    }}>{k}</button>
                  ))}
                </div>
              </div>
            )}

            {coldSendStep === 'success' && (
              <SuccessStage title="Transaction Signed" subtitle="Broadcast to FC Chain" detail={`-${coldSendAmount} ${coldSendAsset} → ${coldSendAddr.slice(0, 8)}...`} onDone={() => { setColdView('main'); setColdSendStep('form'); setColdPinInput(''); }} />
            )}
          </div>
        </>);

      /* ---- RECEIVE ---- */
      case 'receive':
        return (<>
          <CvBack title="Receive to Vault" onBack={() => setColdView('main')} />
          <div className="cv-page">
            <CvInfoBar items={[
              { label: 'Route', value: 'Hardware' },
              { label: 'Card', value: '····9201' },
              { label: 'Chain', value: 'FC' },
            ]} />

            <div className="cv-qr-wrap">
              <div className="cv-qr-card">
                <svg viewBox="0 0 200 200" width="140" height="140">
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
                </svg>
                <div className="cv-qr-badge">FC</div>
              </div>
            </div>

            <div className="cv-card" style={{ padding: '12px 14px' }}>
              <div className="cv-field-label">Cold Vault Address</div>
              <div className="cv-address-text">{coldReceiveAddress}</div>
            </div>

            <div className="cv-action-pair">
              <button type="button" className={`cv-btn primary green ${copiedAddr ? 'success' : ''}`} onClick={handleCopy}>
                {copiedAddr ? <><CheckCircle2 size={16} /> Copied</> : <><Copy size={16} /> Copy</>}
              </button>
              <button type="button" className="cv-btn ghost bordered" onClick={handleShare}><Share2 size={16} /> Share</button>
            </div>

            <div className="cv-note blue">
              <Shield size={14} color="#60a5fa" />
              <span>Funds land in hardware custody. Outbound requires NFC + PIN.</span>
            </div>
          </div>
        </>);

      /* ---- SWAP ---- */
      case 'swap':
        return (<>
          <CvBack title="Cold Swap" onBack={() => { setColdView('main'); setSwapStep('form'); setSwapAmount(''); }} />
          <div className="cv-page">
            {swapStep === 'form' && (<>
              <CvInfoBar items={[
                { label: 'From', value: swapFrom },
                { label: 'To', value: swapTo },
                { label: 'Approval', value: 'NFC' },
              ]} />

              <div className="cv-card" style={{ padding: '14px' }}>
                <div className="cv-field-label">From</div>
                <div className="cv-chip-row wrap">
                  {coldAssets.map(a => (
                    <button key={a.symbol} type="button" className={`cv-chip ${swapFrom === a.symbol ? 'active purple' : ''}`} onClick={() => { setSwapFrom(a.symbol); if (a.symbol === swapTo) setSwapTo(coldAssets.find(x => x.symbol !== a.symbol)?.symbol || 'FCUSD'); }}>
                      <span>{a.icon}</span> {a.symbol}
                    </button>
                  ))}
                </div>
                <div className="cv-input-row" style={{ marginTop: 10 }}>
                  <input type="text" value={swapAmount} onChange={e => setSwapAmount(e.target.value)} placeholder="0.00" className="cv-input mono amount" />
                  <span className="cv-input-unit">{swapFrom}</span>
                </div>
                <div className="cv-field-hint">Available: {swapFromAsset?.balance || '0'} {swapFrom}</div>
              </div>

              <div className="cv-swap-arrow">
                <button type="button" className="cv-swap-toggle" onClick={() => { const n = swapFrom; setSwapFrom(swapTo); setSwapTo(n); }}>
                  <ArrowRightLeft size={16} color="#c4b5fd" style={{ transform: 'rotate(90deg)' }} />
                </button>
              </div>

              <div className="cv-card" style={{ padding: '14px' }}>
                <div className="cv-field-label">To</div>
                <div className="cv-chip-row wrap">
                  {swapTargetAssets.map(a => (
                    <button key={a.symbol} type="button" className={`cv-chip ${swapTo === a.symbol ? 'active green' : ''}`} onClick={() => setSwapTo(a.symbol)}>
                      <span>{a.icon}</span> {a.symbol}
                    </button>
                  ))}
                </div>
                <div className="cv-quote-row">
                  <span className="cv-quote-value">{swapAmount ? `≈ ${coldSwapQuote}` : '—'}</span>
                  <span className="cv-quote-symbol">{swapTo}</span>
                </div>
              </div>

              {swapAmount && (
                <div className="cv-card" style={{ padding: '12px 14px' }}>
                  <div className="cv-rate-line"><span>Rate</span><strong>1 {swapFrom} = {coldSwapRate > 1000 ? coldSwapRate.toFixed(0) : coldSwapRate.toFixed(4)} {swapTo}</strong></div>
                  <div className="cv-rate-line"><span>Slippage</span><strong className="positive">0.1%</strong></div>
                  <div className="cv-rate-line"><span>Fee</span><strong>~$0.02</strong></div>
                </div>
              )}

              <button type="button" className={`cv-btn primary purple full ${swapReady ? '' : 'disabled'}`} onClick={() => { if (swapReady) setSwapStep('nfc'); }}>
                <ArrowRightLeft size={18} /> Review Swap
              </button>
            </>)}

            {swapStep === 'nfc' && (
              <NfcStage tone="purple" label="Swap" detail={`${swapAmount} ${swapFrom} → ${coldSwapQuote} ${swapTo}`} onTap={() => setSwapStep('success')} onCancel={() => setSwapStep('form')} />
            )}

            {swapStep === 'success' && (
              <SuccessStage title="Swap Complete" subtitle="Settled on FC Chain DEX" detail={`-${swapAmount} ${swapFrom} → +${coldSwapQuote} ${swapTo}`} onDone={() => { setColdView('main'); setSwapStep('form'); setSwapAmount(''); }} />
            )}
          </div>
        </>);

      /* ---- ACTIVITY FULL ---- */
      case 'activity':
        return (<>
          <CvBack title="Vault Activity" onBack={() => setColdView('main')} />
          <div className="cv-page">
            <CvInfoBar items={[
              { label: 'Records', value: extendedColdTransactions.length },
              { label: 'L3 Signs', value: extendedColdTransactions.filter(t => t.level === 'L3').length },
              { label: 'Latest', value: extendedColdTransactions[0]?.time || '—' },
            ]} />

            <div className="cv-chip-row">
              {['All', 'Sent', 'Received', 'Swapped'].map(f => (
                <button key={f} type="button" className={`cv-chip ${activityFilter === f ? 'active' : ''}`} onClick={() => setActivityFilter(f)}>{f}</button>
              ))}
            </div>

            <div className="cv-card">
              {filteredActivity.map((tx, i) => (
                <React.Fragment key={`${tx.time}-${tx.asset}-${i}`}>
                  <CvActivityRow tx={tx} />
                  {i < filteredActivity.length - 1 && <CvDivider />}
                </React.Fragment>
              ))}
            </div>

            <button type="button" className="cv-btn ghost bordered full"><FileText size={14} /> Export History</button>
          </div>
        </>);

      /* ---- ASSET DETAIL ---- */
      case 'assetDetail':
        if (!selectedAsset) return null;
        return (<>
          <CvBack title={selectedAsset.name} onBack={() => { setColdView('main'); setSelectedAsset(null); }} />
          <div className="cv-page">
            <div className="cv-asset-hero">
              <div className="cv-token large" style={{ background: `${selectedAsset.color}18`, color: selectedAsset.color }}>{selectedAsset.icon}</div>
              <div className="cv-asset-bal">{selectedAsset.balance} <span>{selectedAsset.symbol}</span></div>
              <CvInfoBar items={[
                { label: 'Value', value: selectedAsset.fiat },
                { label: '24H', value: selectedAsset.change, color: selectedAsset.positive ? '#34d399' : '#fca5a5' },
                { label: 'Storage', value: 'Cold' },
              ]} />
            </div>

            {/* Mini chart */}
            <div className="cv-card" style={{ padding: '12px 14px' }}>
              <div className="cv-chart-head"><span>Price</span>
                <div className="cv-mini-tabs">{['1D','1W','1M','1Y'].map(p => <span key={p} className={p === '1W' ? 'active' : ''}>{p}</span>)}</div>
              </div>
              <svg viewBox="0 0 300 60" style={{ width: '100%', height: '60px' }}>
                <defs><linearGradient id={`cg-${selectedAsset.symbol}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={selectedAsset.color} stopOpacity="0.25" /><stop offset="100%" stopColor={selectedAsset.color} stopOpacity="0" /></linearGradient></defs>
                <path d={selectedAsset.positive ? 'M0,45 C50,40 100,30 150,25 C200,20 250,22 300,12 L300,60 L0,60 Z' : 'M0,20 C50,25 100,35 150,30 C200,40 250,45 300,50 L300,60 L0,60 Z'} fill={`url(#cg-${selectedAsset.symbol})`} />
                <path d={selectedAsset.positive ? 'M0,45 C50,40 100,30 150,25 C200,20 250,22 300,12' : 'M0,20 C50,25 100,35 150,30 C200,40 250,45 300,50'} fill="none" stroke={selectedAsset.color} strokeWidth="2" />
              </svg>
            </div>

            {/* Quick actions */}
            <div className="cv-action-trio">
              <button type="button" className="cv-action-btn blue" onClick={() => { setColdView('send'); setColdSendAsset(['FCUSD','FCC','BTC','ETH'].includes(selectedAsset.symbol) ? selectedAsset.symbol : 'FCUSD'); setColdSendStep('form'); }}>
                <ArrowUp size={16} /><span>Send</span>
              </button>
              <button type="button" className="cv-action-btn green" onClick={() => setColdView('receive')}>
                <ArrowDown size={16} /><span>Receive</span>
              </button>
              <button type="button" className="cv-action-btn purple" onClick={() => { setColdView('swap'); setSwapFrom(selectedAsset.symbol); }}>
                <ArrowRightLeft size={16} /><span>Swap</span>
              </button>
            </div>

            {/* Asset activity */}
            <div className="cv-section-label">RECENT {selectedAsset.symbol} ACTIVITY</div>
            <div className="cv-card">
              {selectedAssetTxs.length > 0 ? selectedAssetTxs.map((tx, i) => (
                <React.Fragment key={`${tx.time}-${tx.asset}-${i}`}>
                  <CvActivityRow tx={tx} />
                  {i < selectedAssetTxs.length - 1 && <CvDivider />}
                </React.Fragment>
              )) : <div className="cv-empty">No recent {selectedAsset.symbol} transactions</div>}
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
      className="cold-vault-overlay"
      style={{ background: '#0d0d0f', display: 'flex', flexDirection: 'column' }}
    >
      {/* NFC Tap Modal */}
      {showNfcModal && (
        <div className="cv-nfc-overlay">
          <motion.div animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 2, repeat: Infinity }} className="cv-stage-orb gold" style={{ width: 120, height: 120 }}>
            <CreditCard size={40} color="var(--gold)" />
          </motion.div>
          <div className="cv-stage-title">Tap Your FC Card</div>
          <div className="cv-stage-desc">Hold card near the top of phone</div>
          <button type="button" className="cv-btn ghost" onClick={() => { setShowNfcModal(false); setCardConnected(true); }}>Cancel</button>
        </div>
      )}

      {/* Header */}
      <div className="cv-header">
        <div className="cv-header-brand">
          <div className="cv-header-icon"><Shield size={16} color="var(--gold)" /></div>
          <div>
            <div className="cv-header-title">Cold Vault</div>
            <div className="cv-header-sub">FC Black Card ····9201</div>
          </div>
        </div>
        <div className="cv-header-right">
          <button type="button" className={`cv-conn-chip ${cardConnected ? 'on' : 'off'}`} onClick={() => { if (!cardConnected) setShowNfcModal(true); }}>
            <span className="cv-conn-dot"></span>
            {cardConnected ? 'Ready' : 'Tap card'}
          </button>
          <button type="button" className="cv-close" onClick={onClose}><X size={16} color="var(--text-secondary)" /></button>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="cv-scroll">
        {coldView !== 'main' ? (
          <>
            {renderSubView()}
            <div style={{ height: 30 }}></div>
          </>
        ) : (<>

          {/* Balance strip */}
          <div className="cv-balance-strip">
            <div className="cv-balance-label">DEEP STORAGE</div>
            <div className="cv-balance-value">{totalColdBalance}</div>
            <div className="cv-balance-change">
              <span className="positive">+$4,280.50 (24h)</span>
              <span className="cv-balance-pct">92.4% of net worth</span>
            </div>
          </div>

          <CvInfoBar items={[
            { label: 'Assets', value: `${coldAssets.length} tokens` },
            { label: 'Cards', value: `${backupCards.filter(c => c.status !== 'empty').length} paired` },
            { label: 'Policy', value: '4 levels' },
          ]} />

          {/* Action buttons */}
          <div className="cv-action-trio">
            <button type="button" className="cv-action-btn blue" onClick={() => { setColdView('send'); setColdSendStep('form'); setColdSendAddr(''); setColdSendAmount(''); setColdPinInput(''); }}>
              <ArrowUp size={18} /><span>Send</span><small>NFC sign</small>
            </button>
            <button type="button" className="cv-action-btn green" onClick={() => { setColdView('receive'); setCopiedAddr(false); }}>
              <ArrowDown size={18} /><span>Receive</span><small>Vault addr</small>
            </button>
            <button type="button" className="cv-action-btn purple" onClick={() => { setColdView('swap'); setSwapStep('form'); setSwapAmount(''); }}>
              <ArrowRightLeft size={18} /><span>Swap</span><small>Rebalance</small>
            </button>
          </div>

          {/* Cold Assets */}
          <div className="cv-section">
            <div className="cv-section-label">COLD ASSETS</div>
            <div className="cv-card">
              {coldAssets.map((a, i) => (
                <React.Fragment key={a.symbol}>
                  <CvAssetRow asset={a} onClick={() => { setSelectedAsset(a); setColdView('assetDetail'); }} />
                  {i < coldAssets.length - 1 && <CvDivider />}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Backup Cards */}
          <div className="cv-section">
            <div className="cv-section-label">BACKUP CARDS</div>
            <div className="cv-card">
              {backupCards.map((c, i) => (
                <React.Fragment key={c.id}>
                  <CvCardRow card={c} />
                  {i < backupCards.length - 1 && <CvDivider />}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Security */}
          <div className="cv-section">
            <div className="cv-section-label">SECURITY</div>
            <div className="cv-card">
              {securityItems.map((item, i) => (
                <React.Fragment key={item.label}>
                  <CvRow icon={item.icon} label={item.label} right={<span style={{ fontSize: 12, fontWeight: 600, color: item.vColor }}>{item.value}</span>} onClick={item.action} />
                  {i < securityItems.length - 1 && <CvDivider />}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="cv-section">
            <div className="cv-section-head">
              <div className="cv-section-label">RECENT ACTIVITY</div>
              <button type="button" className="cv-link" onClick={() => setColdView('activity')}>View All</button>
            </div>
            <div className="cv-card">
              {coldTransactions.map((tx, i) => (
                <React.Fragment key={`${tx.time}-${tx.asset}-${i}`}>
                  <CvActivityRow tx={tx} />
                  {i < coldTransactions.length - 1 && <CvDivider />}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Seedless & Recovery */}
          <div className="cv-section">
            <div className="cv-note purple">
              <Database size={14} color="#c4b5fd" />
              <span>Seedless architecture — keys live in EAL6+ secure element. Recovery via card redundancy.</span>
            </div>
            <div className="cv-action-pair">
              <button type="button" className="cv-btn ghost bordered">Export Seed</button>
              <button type="button" className="cv-btn ghost bordered">Import Seed</button>
            </div>
          </div>

          <button type="button" className="cv-btn danger-link">Factory Reset Card</button>

          <div style={{ height: 40 }}></div>
        </>)}
      </div>
    </motion.div>
  );
};

export default ColdVaultModule;
