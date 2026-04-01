import React, { useState } from 'react';
import { ChevronDown, CheckCircle2, Copy, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SheetCloseButtonV2, SheetTitleBlockV2, AssetSelectorOverlayV2 } from './SheetParts';

const ReceiveSheetV2 = ({ onClose }) => {
  const [assetIdx, setAssetIdx] = useState(0);
  const [showAssetSelector, setShowAssetSelector] = useState(false);
  const [copied, setCopied] = useState(false);

  const assets = [
    { id: 'FCUSD', name: 'Future Citizen Stablecoin', color: 'var(--blue)', address: 'did:fc:amelia_thorne_0x7A3b...9F21' },
    { id: 'FCC', name: 'FC Coin', color: 'var(--text-primary)', address: 'did:fc:amelia_thorne_0x7A3b...9F21' },
    { id: 'ETH', name: 'Ethereum', color: '#60a5fa', address: '0x7A3b4c9E2d1F8a6B5c0D3e4F9A21' },
    { id: 'BTC', name: 'Bitcoin', color: '#F7931A', address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh' },
  ];
  const currentAsset = assets[assetIdx];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentAsset.address).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Receive ${currentAsset.id}`,
          text: currentAsset.address,
        });
      } else {
        handleCopy();
      }
    } catch (error) {
      // Share API throws on user cancel — expected, no action needed
    }
  };

  const generateQrPattern = (addr) => {
    const cells = [];
    const size = 21;
    const hash = addr.split('').reduce((acc, c, i) => acc + c.charCodeAt(0) * (i + 1), 0);
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const isFinderTL = r < 7 && c < 7;
        const isFinderTR = r < 7 && c >= size - 7;
        const isFinderBL = r >= size - 7 && c < 7;
        const isFinderBorder = (r2, c2) => r2 === 0 || r2 === 6 || c2 === 0 || c2 === 6 || (r2 >= 2 && r2 <= 4 && c2 >= 2 && c2 <= 4);
        if (isFinderTL) {
          cells.push({ r, c, fill: isFinderBorder(r, c) });
        } else if (isFinderTR) {
          cells.push({ r, c, fill: isFinderBorder(r, c - (size - 7)) });
        } else if (isFinderBL) {
          cells.push({ r, c, fill: isFinderBorder(r - (size - 7), c) });
        } else {
          const val = (hash * (r * size + c + 1) * 7 + r * 31 + c * 17) % 100;
          cells.push({ r, c, fill: val < 45 });
        }
      }
    }
    return cells;
  };

  const qrCells = generateQrPattern(currentAsset.address);
  const cellSize = 8;
  const qrSize = 21 * cellSize;
  const networkLabel = currentAsset.id === 'BTC' ? 'Bitcoin mainnet' : currentAsset.id === 'ETH' ? 'Ethereum mainnet' : 'FC sovereign chain';

  return (
    <div className="sheet-v2-backdrop" onClick={onClose}>
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="sheet-v2-shell sheet-v2-tall"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sheet-v2-handle"></div>
        <div className="sheet-v2-header">
          <SheetTitleBlockV2 eyebrow="INBOUND" title="Receive Assets" subtitle="Share the exact wallet endpoint that matches the token and network you expect." />
          <SheetCloseButtonV2 onClick={onClose} />
        </div>

        <div className="sheet-v2-scroll receive-v2-layout">
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

          <div className="receive-v2-qr-shell">
            <motion.div
              key={currentAsset.id}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="receive-v2-qr-card"
            >
              <svg width={qrSize} height={qrSize} viewBox={`0 0 ${qrSize} ${qrSize}`}>
                {qrCells.map((cell, i) => (
                  cell.fill ? <rect key={i} x={cell.c * cellSize} y={cell.r * cellSize} width={cellSize} height={cellSize} fill="#0f172a" rx={1} /> : null
                ))}
              </svg>
              <div className="receive-v2-qr-center" style={{ background: currentAsset.color }}>
                <span>{currentAsset.id.charAt(0)}</span>
              </div>
            </motion.div>

            <div className="receive-v2-network-pill">
              <div className="receive-v2-network-dot"></div>
              <span>{networkLabel}</span>
            </div>
          </div>

          <div className="sheet-v2-card">
            <div className="sheet-v2-field-label">{currentAsset.id === 'BTC' || currentAsset.id === 'ETH' ? 'Wallet Address' : 'Decentralized Identifier (DID)'}</div>
            <div className="receive-v2-address">{currentAsset.address}</div>
          </div>
        </div>

        <div className="sheet-v2-footer">
          <button type="button" className={`sheet-v2-primary-btn ${copied ? 'success' : ''}`} onClick={handleCopy}>
            {copied ? <><CheckCircle2 size={18} /> Copied</> : <><Copy size={18} /> Copy Address</>}
          </button>
          <button type="button" className="sheet-v2-icon-action" onClick={handleShare}>
            <Share2 size={18} />
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        <AssetSelectorOverlayV2
          open={showAssetSelector}
          title="Receive To"
          assets={assets}
          selectedIndex={assetIdx}
          onSelect={(index) => {
            setAssetIdx(index);
            setShowAssetSelector(false);
            setCopied(false);
          }}
          onClose={() => setShowAssetSelector(false)}
        />
      </AnimatePresence>
    </div>
  );
};

export default ReceiveSheetV2;
