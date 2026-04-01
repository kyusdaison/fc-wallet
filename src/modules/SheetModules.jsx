import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Fingerprint, X } from 'lucide-react';

const GlobalBiometricGate = ({ request, onClose }) => {
  const [scanState, setScanState] = useState('scanning'); // scanning, success, failed

  useEffect(() => {
    if (!request) return;
    const timer = setTimeout(() => {
      setScanState('success');
      setTimeout(() => {
        if (request.onComplete) request.onComplete();
        onClose();
      }, 1000);
    }, 2000);
    return () => clearTimeout(timer);
  }, [request, onClose]);

  if (!request) return null;

  return (
    <div className="settings-overlay">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        exit={{ scale: 0.9, opacity: 0 }}
        className="biometric-gate-modal"
      >
        <div className="biometric-gate-glow-bar"></div>
        
        <div className="biometric-gate-header">
          <div className="biometric-gate-eyebrow">SECURITY CLEARANCE</div>
          <div className="biometric-gate-title">{request.action || 'Authorization Required'}</div>
          {request.subtitle && <div className="biometric-gate-subtitle">{request.subtitle}</div>}
        </div>

        <div className="biometric-gate-scanner">
          {scanState === 'scanning' && (
            <>
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} className="biometric-gate-ring"></motion.div>
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} className="biometric-gate-pulse"></motion.div>
              <Fingerprint size={48} color="var(--blue)" />
              <motion.div animate={{ y: ['-50px', '50px', '-50px'] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} className="biometric-gate-scanline"></motion.div>
            </>
          )}
          {scanState === 'success' && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="biometric-gate-success-icon">
              <CheckCircle2 size={40} color="var(--green)" />
            </motion.div>
          )}
        </div>

        <div className={`biometric-gate-status ${scanState === 'success' ? 'confirmed' : ''}`}>
          {scanState === 'scanning' ? 'VERIFYING BIOMETRICS...' : 'IDENTITY CONFIRMED'}
        </div>
        
        <button onClick={onClose} className="biometric-gate-close">
          <X size={20} />
        </button>
      </motion.div>
    </div>
  );
};

export { GlobalBiometricGate };
