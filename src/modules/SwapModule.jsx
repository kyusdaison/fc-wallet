import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ChevronDown, Settings, ShieldCheck, ArrowUpDown, Fingerprint, CheckCircle2 } from 'lucide-react';

const SwapModule = ({ onClose }) => {
  const [step, setStep] = useState('input'); // 'input', 'review', 'scanning', 'success'
  const [fromAmount, setFromAmount] = useState('1000');
  const rate = 1.05;
  const fromValue = Number.parseFloat(fromAmount) || 0;
  const toValue = fromValue * rate;
  const formattedFrom = fromValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const formattedTo = toValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const handleReview = () => setStep('review');
  const handleConfirm = () => {
    setStep('scanning');
    setTimeout(() => {
      setStep('success');
    }, 2000);
  };

  const handleAmountChange = (event) => {
    const raw = event.target.value.replace(/[^0-9.]/g, '');
    const [whole, ...decimals] = raw.split('.');
    const next = decimals.length > 0 ? `${whole}.${decimals.join('').slice(0, 2)}` : whole;
    setFromAmount(next || '0');
  };

  return (
    <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="swap-shell">
      <div className="swap-header">
        <button type="button" className="swap-header-btn" onClick={onClose}>
          <ChevronLeft size={24} />
        </button>
        <div className="swap-header-copy">
          <div className="swap-header-kicker">Treasury Rebalance</div>
          <div className="swap-header-title">Swap Assets</div>
        </div>
        <button type="button" className="swap-header-btn">
          <Settings size={18} />
        </button>
      </div>

      <div className="swap-body">
        <div className="swap-hero">
          <div className="swap-hero-top">
            <div>
              <div className="swap-hero-kicker">Instant Route</div>
              <div className="swap-hero-title">Gasless Corporate Treasury Swap</div>
            </div>
            <div className="swap-hero-pill">
              <ShieldCheck size={14} />
              Treasury relay secured
            </div>
          </div>
          <div className="swap-hero-copy">
            Rebalance FCUSD into FCC without leaving the protected treasury execution lane.
          </div>
          <div className="swap-hero-metrics">
            <div className="swap-hero-metric">
              <span>Best Rate</span>
              <strong>1.05 FCC</strong>
            </div>
            <div className="swap-hero-metric">
              <span>Slippage</span>
              <strong>0.5% Auto</strong>
            </div>
            <div className="swap-hero-metric">
              <span>Execution</span>
              <strong>~4 sec</strong>
            </div>
          </div>
        </div>

        <div className="swap-stack">
          <div className="swap-token-card pay">
            <div className="swap-token-head">
              <span>You Pay</span>
              <strong>Balance: 12,480.50</strong>
            </div>
            <div className="swap-token-main">
              <input type="text" value={fromAmount} onChange={handleAmountChange} className="swap-amount-input" />
              <div className="swap-token-pill">
                <div className="swap-token-icon navy">$</div>
                <span>FCUSD</span>
                <ChevronDown size={14} color="#8b96ac" />
              </div>
            </div>
            <div className="swap-token-caption">${formattedFrom}</div>
          </div>

          <button type="button" className="swap-switch-btn" aria-label="Swap direction">
            <ArrowUpDown size={18} />
          </button>

          <div className="swap-token-card receive">
            <div className="swap-token-head">
              <span>You Receive</span>
              <strong>Balance: 0.00</strong>
            </div>
            <div className="swap-token-main">
              <div className="swap-amount-output">{formattedTo}</div>
              <div className="swap-token-pill">
                <div className="swap-token-icon gold">FC</div>
                <span>FCC</span>
                <ChevronDown size={14} color="#8b96ac" />
              </div>
            </div>
            <div className="swap-token-caption positive">${formattedTo} (+5.00%)</div>
          </div>
        </div>

        <div className="swap-insight-card">
          <div className="swap-insight-row">
            <span>Exchange Rate</span>
            <strong>1 FCUSD = {rate.toFixed(2)} FCC</strong>
          </div>
          <div className="swap-insight-row">
            <span>Route</span>
            <strong>Vault Relay to FC DEX to Reserve</strong>
          </div>
          <div className="swap-insight-row">
            <span>Slippage</span>
            <strong>0.5% (Auto)</strong>
          </div>
          <div className="swap-insight-row">
            <span>Network Fee</span>
            <strong className="green">$0.00 Gasless</strong>
          </div>
        </div>

        <div className="swap-route-card">
          <div className="swap-route-kicker">Execution Path</div>
          <div className="swap-route-flow">
            <span>FCUSD Treasury</span>
            <ChevronRight size={16} color="#7c879f" />
            <span>Protected Liquidity Pool</span>
            <ChevronRight size={16} color="#7c879f" />
            <span>FCC Reserve</span>
          </div>
        </div>
      </div>

      <div className="swap-footer">
        <button type="button" className="swap-primary-btn" onClick={handleReview}>
          Review Swap
        </button>
      </div>

      <AnimatePresence>
        {(step === 'review' || step === 'scanning' || step === 'success') && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="swap-overlay-backdrop" onClick={() => step === 'review' && setStep('input')} />
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="swap-review-sheet">
              <div className="swap-sheet-handle"></div>

              {step === 'review' && (
                <div className="swap-sheet-stack">
                  <div className="swap-sheet-head">
                    <div className="swap-sheet-kicker">Confirm Treasury Swap</div>
                    <div className="swap-sheet-title">{formattedFrom} FCUSD to {formattedTo} FCC</div>
                  </div>

                  <div className="swap-review-summary">
                    <div className="swap-review-row">
                      <span>From Vault</span>
                      <strong>{formattedFrom} FCUSD</strong>
                    </div>
                    <div className="swap-review-row">
                      <span>To Reserve</span>
                      <strong>{formattedTo} FCC</strong>
                    </div>
                    <div className="swap-review-row">
                      <span>Route Integrity</span>
                      <strong>Protected Treasury Relay</strong>
                    </div>
                    <div className="swap-review-row">
                      <span>Execution Fee</span>
                      <strong className="green">$0.00</strong>
                    </div>
                  </div>

                  <button type="button" className="swap-primary-btn" onClick={handleConfirm}>
                    <Fingerprint size={22} />
                    Authenticate & Swap
                  </button>
                </div>
              )}

              {step === 'scanning' && (
                <div className="swap-sheet-state">
                  <motion.div animate={{ scale: [1, 1.08, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }} className="swap-bio-orb">
                    <Fingerprint size={78} color="#60a5fa" strokeWidth={1.2} />
                  </motion.div>
                  <div className="swap-sheet-title center">Verifying Identity...</div>
                  <div className="swap-sheet-copy center">Biometric confirmation and treasury route checks are in progress.</div>
                </div>
              )}

              {step === 'success' && (
                <div className="swap-sheet-state">
                  <div className="swap-success-orb">
                    <CheckCircle2 size={40} color="#34d399" />
                  </div>
                  <div className="swap-sheet-title center">Swap Completed</div>
                  <div className="swap-sheet-copy center">FCC reserve balance updated and settlement proof stored locally.</div>
                  <button type="button" className="swap-secondary-btn" onClick={onClose}>
                    Return to Dashboard
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SwapModule;
