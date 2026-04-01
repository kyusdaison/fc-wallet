import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ChevronDown, Info, ShieldCheck } from 'lucide-react';

const BridgeSheet = ({ onClose, onConfirm }) => {
  return (
    <motion.div key="bridge-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bridge-overlay" onClick={onClose}>
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

          <button onClick={onConfirm} className="bridge-confirm-btn">
            <ShieldCheck size={20} /> Confirm &amp; Bridge
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BridgeSheet;
