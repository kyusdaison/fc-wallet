import React from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const SheetCloseButtonV2 = ({ onClick }) => (
  <button type="button" className="sheet-v2-close" onClick={onClick}>
    <X size={18} />
  </button>
);

export const SheetTitleBlockV2 = ({ eyebrow, title, subtitle }) => (
  <div className="sheet-v2-title-block">
    {eyebrow && <div className="sheet-v2-eyebrow">{eyebrow}</div>}
    <h2 className="sheet-v2-title">{title}</h2>
    {subtitle && <div className="sheet-v2-subtitle">{subtitle}</div>}
  </div>
);

export const AssetSelectorOverlayV2 = ({ open, title, assets, selectedIndex, onSelect, onClose }) => {
  if (!open) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="sheet-v2-selector-overlay"
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <motion.div
        initial={{ y: 24, opacity: 0.9 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 24, opacity: 0.9 }}
        transition={{ type: 'spring', damping: 22, stiffness: 260 }}
        className="sheet-v2-selector-shell"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sheet-v2-header">
          <SheetTitleBlockV2 eyebrow="ASSET LIST" title={title} subtitle="Choose the token and chain context you want to use." />
          <SheetCloseButtonV2 onClick={onClose} />
        </div>

        <div className="sheet-v2-selector-list">
          {assets.map((asset, index) => (
            <button
              key={asset.id}
              type="button"
              className={`sheet-v2-selector-row ${selectedIndex === index ? 'active' : ''}`}
              onClick={() => onSelect(index)}
            >
              <div className="sheet-v2-selector-token">
                <div className="sheet-v2-token-mark" style={{ background: asset.color }}>
                  <span>{asset.id.charAt(0)}</span>
                </div>
                <div>
                  <div className="sheet-v2-selector-name">{asset.id}</div>
                  <div className="sheet-v2-selector-meta">{asset.name}</div>
                </div>
              </div>
              {selectedIndex === index && <CheckCircle2 size={20} color="var(--green)" />}
            </button>
          ))}
        </div>

        <button type="button" className="sheet-v2-secondary-btn" onClick={onClose}>
          Close
        </button>
      </motion.div>
    </motion.div>
  );
};
