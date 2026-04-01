import React, { useState } from 'react';
import { QrCode, ChevronDown, CheckCircle2, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SheetCloseButtonV2, SheetTitleBlockV2, AssetSelectorOverlayV2 } from './SheetParts';
import { CITIZEN_ASSETS } from '../data/mockData';

const SendSheetV2 = ({ onClose, onTriggerBiometric, onSendComplete }) => {
  const [step, setStep] = useState('input');
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('did:fc:vanguard_treasury');
  const [assetIdx, setAssetIdx] = useState(0);
  const [showAssetSelector, setShowAssetSelector] = useState(false);
  const [errors, setErrors] = useState({});

  const assets = [
    { id: 'FCUSD', name: 'Future Citizen Stablecoin', color: 'var(--blue)' },
    { id: 'FCC', name: 'FC Coin', color: 'var(--text-primary)' },
    { id: 'ETH', name: 'Ethereum', color: '#60a5fa' },
    { id: 'BTC', name: 'Bitcoin', color: '#F7931A' },
  ];
  const currentAsset = assets[assetIdx];

  const validate = () => {
    const newErrors = {};

    if (!recipient.trim()) {
      newErrors.recipient = 'Recipient address is required';
    } else if (!recipient.startsWith('did:') && !recipient.startsWith('0x') && !recipient.startsWith('bc1')) {
      newErrors.recipient = 'Invalid address format';
    }

    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = 'Enter an amount';
    } else {
      const assetData = CITIZEN_ASSETS.find(asset => asset.id === currentAsset.id);
      if (assetData && parseFloat(amount) > assetData.balance) {
        newErrors.amount = 'Insufficient balance';
      }
    }

    return newErrors;
  };

  const handleSend = () => {
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    onTriggerBiometric({
      action: 'Authorize Transfer',
      subtitle: `Sending ${amount} ${currentAsset.id} to ${recipient.substring(0, 16)}...`,
      onComplete: () => {
        setStep('success');
        onSendComplete({
          id: `tx-${Date.now()}`,
          type: 'send',
          title: 'Secure Transfer',
          subtitle: `Sent to ${recipient.substring(0, 16)}...`,
          amount: `-${amount}`,
          currency: currentAsset.id,
          date: 'JUST NOW',
          category: 'transfer',
          status: 'completed'
        });
      }
    });
  };

  return (
    <div className="sheet-v2-backdrop" onClick={onClose}>
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="sheet-v2-shell sheet-v2-medium"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sheet-v2-handle"></div>
        <div className="sheet-v2-header">
          <SheetTitleBlockV2 eyebrow="TRANSFER" title="Send Assets" subtitle="Biometric approval and DID validation happen before any value leaves your wallet." />
          <SheetCloseButtonV2 onClick={onClose} />
        </div>

        {step === 'input' ? (
          <>
            <div className="sheet-v2-scroll">
              <div className="sheet-v2-hero tone-blue">
                <div className="sheet-v2-hero-kicker">TRANSFER PREVIEW</div>
                <div className="sheet-v2-hero-amount">
                  {amount || '0.00'} <span>{currentAsset.id}</span>
                </div>
                <div className="sheet-v2-hero-note">Biometric approval and DID routing are required before this transfer is finalized.</div>
              </div>

              <div className="sheet-v2-card">
                <div className="sheet-v2-field-label">Recipient DID / Address</div>
                <div className="sheet-v2-input-shell">
                  <input
                    type="text"
                    value={recipient}
                    onChange={(e) => {
                      setRecipient(e.target.value);
                      setErrors(prev => ({ ...prev, recipient: undefined }));
                    }}
                    placeholder="did:fc:..."
                    className="sheet-v2-input"
                  />
                  <button type="button" className="sheet-v2-icon-btn accent-blue">
                    <QrCode size={18} />
                  </button>
                </div>
                {errors.recipient && <div className="sheet-v2-error">{errors.recipient}</div>}
              </div>

              <div className="sheet-v2-card">
                <div className="sheet-v2-field-label">Asset & Amount</div>
                <button type="button" className="sheet-v2-picker" onClick={() => setShowAssetSelector(true)}>
                  <div className="sheet-v2-selector-token">
                    <div className="sheet-v2-token-mark" style={{ background: currentAsset.color }}>
                      <span>{currentAsset.id.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="sheet-v2-selector-name">{currentAsset.id}</div>
                      <div className="sheet-v2-selector-meta">{currentAsset.name}</div>
                    </div>
                  </div>
                  <ChevronDown size={18} color="rgba(255,255,255,0.5)" />
                </button>

                <div className="sheet-v2-amount-shell">
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                      setErrors(prev => ({ ...prev, amount: undefined }));
                    }}
                    className="sheet-v2-amount-input"
                  />
                  <span className="sheet-v2-amount-token">{currentAsset.id}</span>
                </div>
                {errors.amount && <div className="sheet-v2-error">{errors.amount}</div>}
              </div>

              <div className="sheet-v2-inline-note">
                <Shield size={16} color="var(--gold)" />
                DID routing, signing, and biometric verification stay inside one secure flow.
              </div>
            </div>

            <div className="sheet-v2-footer">
              <button type="button" className="sheet-v2-secondary-btn" onClick={onClose}>Cancel</button>
              <button
                type="button"
                className="sheet-v2-primary-btn"
                onClick={handleSend}
              >
                Authorize & Send
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="sheet-v2-success">
              <div className="sheet-v2-success-icon">
                <CheckCircle2 size={40} color="var(--green)" strokeWidth={3} />
              </div>
              <div className="sheet-v2-success-title">Transfer Complete</div>
              <div className="sheet-v2-success-copy">{amount} {currentAsset.id} was dispatched with biometric confirmation.</div>
            </div>

            <div className="sheet-v2-footer single">
              <button type="button" className="sheet-v2-primary-btn" onClick={onClose}>Done</button>
            </div>
          </>
        )}
      </motion.div>

      <AnimatePresence>
        <AssetSelectorOverlayV2
          open={showAssetSelector}
          title="Send From"
          assets={assets}
          selectedIndex={assetIdx}
          onSelect={(index) => {
            setAssetIdx(index);
            setShowAssetSelector(false);
          }}
          onClose={() => setShowAssetSelector(false)}
        />
      </AnimatePresence>
    </div>
  );
};

export default SendSheetV2;
