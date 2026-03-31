import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Camera, CheckCircle2, ChevronDown, ChevronLeft, Fingerprint, QrCode, Scan, ShieldCheck } from 'lucide-react';
import { CITIZEN_PROFILE } from '../data/mockData';

const QrScannerModule = ({ onClose }) => {
  const [mode, setMode] = useState('scan');
  
  return (
    <motion.div key="qr-scanner" initial={{ opacity: 0, y: '100%' }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 300 }} className={`scanner-shell ${mode}`}>
      <div className="scanner-header">
        <button type="button" className="scanner-close" onClick={onClose}>
          <ChevronDown size={24} />
        </button>
        <div className="scanner-header-copy">
          <div className="scanner-kicker">Citizen Exchange</div>
          <div className="scanner-title">{mode === 'scan' ? 'Scan Citizen' : 'My QR Identity'}</div>
        </div>
        <div className="scanner-status-pill">
          <ShieldCheck size={14} />
          Secure
        </div>
      </div>

      <div className="scanner-content">
        {mode === 'scan' ? (
          <div className="scanner-scan-stack">
            <div className="scanner-frame">
              <div className="scanner-corner top-left"></div>
              <div className="scanner-corner top-right"></div>
              <div className="scanner-corner bottom-left"></div>
              <div className="scanner-corner bottom-right"></div>
              <motion.div animate={{ y: [12, 244, 12] }} transition={{ repeat: Infinity, duration: 2.6, ease: 'linear' }} className="scanner-beam" />
              <div className="scanner-frame-center">
                <QrCode size={72} color="rgba(255,255,255,0.12)" strokeWidth={1.4} />
              </div>
            </div>

            <div className="scanner-helper-card">
              <div className="scanner-helper-icon"><Camera size={20} color="#93c5fd" /></div>
              <div>
                <div className="scanner-helper-title">Align the citizen code inside the frame</div>
                <div className="scanner-helper-copy">We verify identity proofs locally before adding the peer to your encrypted network.</div>
              </div>
            </div>

            <div className="scanner-tips">
              <div className="scanner-tip">
                <Scan size={16} color="#6ee7b7" />
                Works with citizen cards and vault receipts
              </div>
              <div className="scanner-tip">
                <ShieldCheck size={16} color="#f5d46b" />
                No image leaves this device during verification
              </div>
            </div>
          </div>
        ) : (
          <div className="scanner-card">
            <div className="scanner-card-avatar-wrap">
              <img src={CITIZEN_PROFILE.avatar} alt={CITIZEN_PROFILE.name} className="scanner-card-avatar" />
              <span className="scanner-card-badge"><CheckCircle2 size={22} color="var(--green)" /></span>
            </div>

            <div className="scanner-qr-shell">
              <QrCode size={176} color="#f8fafc" strokeWidth={1.3} />
            </div>

            <div className="scanner-card-name">{CITIZEN_PROFILE.name}</div>
            <div className="scanner-card-id">{CITIZEN_PROFILE.did}</div>
            <div className="scanner-card-copy">Share this code to exchange verified identity and encrypted payment rails.</div>
          </div>
        )}
      </div>

      <div className="scanner-footer">
        <div className="scanner-toggle">
          <button type="button" className={`scanner-toggle-btn ${mode === 'scan' ? 'active' : ''}`} onClick={() => setMode('scan')}>
            Scan QR
          </button>
          <button type="button" className={`scanner-toggle-btn ${mode === 'my-qr' ? 'active' : ''}`} onClick={() => setMode('my-qr')}>
            My QR
          </button>
        </div>
      </div>
    </motion.div>
  );
};


// --- New Swap FC-DEX Module ---

// --- MULTI-SIG MODULE ---
const MultiSigModule = ({ selectedMultiSig, onClose }) => {
  const [phase, setPhase] = useState('review'); // review -> signing -> success
  
  if (!selectedMultiSig) return null;
  
  const handleSign = () => {
    setPhase('signing');
    setTimeout(() => {
      setPhase('success');
    }, 2500);
  };
  
  const totalSignatures = selectedMultiSig.reqSignatures;
  const currentSignatures = phase === 'success' ? selectedMultiSig.currentSignatures + 1 : selectedMultiSig.currentSignatures;
  const progressPercent = (currentSignatures / totalSignatures) * 100;
  const dashArray = 402;
  const dashOffset = dashArray - (dashArray * progressPercent) / 100;
  const signerRows = [
    { id: 'cb', initials: 'CB', name: 'Christopher B.', role: 'Board Member • 0x7F...3B9', status: 'signed' },
    { id: 'me', initials: 'ME', name: 'Kyus Daison', role: 'Chief Executive • You', status: phase === 'success' ? 'signed' : 'required', me: true },
    { id: 'al', initials: 'AL', name: 'Amanda L.', role: 'CFO • 0x2A...9C1', status: 'pending' },
  ];

  return (
    <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="multi-approval-shell">
      <div className="multi-approval-header">
        <button type="button" className="multi-approval-header-btn" onClick={onClose}>
          <ChevronLeft size={22} />
        </button>
        <div className="multi-approval-header-copy">
          <div className="multi-approval-header-kicker">Signer Queue</div>
          <div className="multi-approval-header-title">Authorization Required</div>
        </div>
        <div className="multi-approval-threshold-pill">{currentSignatures}/{totalSignatures}</div>
      </div>

      <div className="multi-approval-body">
        <div className="multi-approval-hero">
          <div className="multi-approval-hero-kicker">Pending Treasury Request</div>
          <div className="multi-approval-hero-amount">{selectedMultiSig.amount}</div>
          <div className="multi-approval-hero-title">{selectedMultiSig.title}</div>
          <div className="multi-approval-hero-copy">
            This payment requires executive biometric authorization before it can advance to final settlement.
          </div>
          <div className="multi-approval-hero-metrics">
            <div className="multi-approval-metric">
              <span>Threshold</span>
              <strong>{totalSignatures} Signers</strong>
            </div>
            <div className="multi-approval-metric">
              <span>Collected</span>
              <strong>{currentSignatures} Approved</strong>
            </div>
            <div className="multi-approval-metric">
              <span>Priority</span>
              <strong>Urgent</strong>
            </div>
          </div>
        </div>

        <div className="multi-approval-progress-card">
          <div className="multi-approval-progress-visual">
            <svg className="multi-approval-ring" viewBox="0 0 160 160">
              <circle className="ring-bg" cx="80" cy="80" r="64" />
              <circle className="ring-progress" cx="80" cy="80" r="64" style={{ strokeDasharray: dashArray, strokeDashoffset: dashOffset, stroke: phase === 'success' ? 'var(--green)' : 'var(--gold)' }} />
            </svg>
            <div className="multi-approval-ring-copy">
              <span>{currentSignatures}/{totalSignatures}</span>
              <small>Signatures</small>
            </div>
          </div>

          <div className="multi-approval-progress-copy">
            <div className="multi-approval-card-title">Execution Threshold</div>
            <div className="multi-approval-card-text">
              Treasury release triggers once all required signers complete biometric authorization.
            </div>
          </div>
        </div>

        <div className="multi-approval-policy-card">
          <div className="multi-approval-card-title">Approval Policy</div>
          <div className="multi-approval-policy-list">
            <div className="multi-approval-policy-row">
              <span>Signer threshold</span>
              <strong>{totalSignatures} required</strong>
            </div>
            <div className="multi-approval-policy-row">
              <span>Execution route</span>
              <strong>Board to Treasury to Vendor</strong>
            </div>
            <div className="multi-approval-policy-row">
              <span>Biometric gate</span>
              <strong>D-ID + device enclave</strong>
            </div>
          </div>
        </div>

        <div className="multi-approval-signer-panel">
          <div className="multi-approval-card-title">Signer Ledger</div>
          <div className="multi-approval-signer-list">
            {signerRows.map((signer) => (
              <div key={signer.id} className={`multi-approval-signer-row ${signer.me ? 'me' : ''}`}>
                <div className={`multi-approval-signer-avatar ${signer.me ? 'me' : ''}`}>{signer.initials}</div>
                <div className="multi-approval-signer-copy">
                  <div className="multi-approval-signer-name">{signer.name}</div>
                  <div className="multi-approval-signer-role">{signer.role}</div>
                </div>
                <div className={`multi-approval-signer-status ${signer.status}`}>
                  {signer.status === 'signed' ? <CheckCircle2 size={14} /> : <ShieldCheck size={14} />}
                  {signer.status === 'signed' ? 'Signed' : signer.status === 'required' ? 'Required' : 'Pending'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="multi-approval-footer">
        {phase === 'review' && (
          <button type="button" className="multi-approval-primary-btn" onClick={handleSign}>
            <Fingerprint size={22} />
            Authorize Signature
          </button>
        )}
        {phase === 'signing' && (
          <div className="multi-approval-state-card">
            <Fingerprint size={48} color="var(--gold)" className="pulse-anim" />
            <div className="multi-approval-state-title">Verifying Biometrics...</div>
            <div className="multi-approval-state-copy">Securing the cryptographic signature via D-ID and device enclave.</div>
          </div>
        )}
        {phase === 'success' && (
          <div className="multi-approval-state-card success">
            <CheckCircle2 size={28} color="var(--green)" />
            <div className="multi-approval-state-title">Signature Appended</div>
            <div className="multi-approval-state-copy">The request moved forward in the signer queue with your cryptographic approval.</div>
            <button type="button" className="multi-approval-secondary-btn" onClick={onClose}>
              Return to Treasury
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// --- ZKP MODULE ---
const ZkpModal = ({ request, onClose, onApprove }) => {
  const [phase, setPhase] = useState('review'); // review -> generating -> success
  if (!request) return null;
  const proofRows = [
    { label: 'Citizenship', value: 'Global citizen attestation' },
    { label: 'Age', value: '18+ verification only' },
  ];
  const cryptRows = [
    { label: 'DOB', visible: '1990-11-23', obfuscated: '***-**-**' },
    { label: 'ID Hash', visible: '0x8F9...2A1', obfuscated: '0x***...***' },
  ];

  const handleApprove = () => {
    setPhase('generating');
    setTimeout(() => {
      setPhase('success');
    }, 2500);
  };

  return (
    <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="zkp-shell">
      <div className="zkp-header">
        <button type="button" className="zkp-header-btn" onClick={onClose}>
          <ChevronLeft size={22} />
        </button>
        <div className="zkp-header-copy">
          <div className="zkp-header-kicker">Proof Request</div>
          <div className="zkp-header-title">ZKP Authorization</div>
        </div>
        <div className="zkp-header-pill">
          <ShieldCheck size={14} />
          Secure
        </div>
      </div>

      <div className="zkp-body">
        <div className="zkp-hero">
          <div className="zkp-hero-icon">
            <Building2 size={30} color="var(--gold)" />
          </div>
          <div className="zkp-hero-title">{request.entity}</div>
          <div className="zkp-hero-copy">is requesting a zero-knowledge proof package without exposing your raw identity records.</div>
          <div className="zkp-hero-metrics">
            <div className="zkp-hero-metric">
              <span>Proofs</span>
              <strong>{proofRows.length}</strong>
            </div>
            <div className="zkp-hero-metric">
              <span>Raw Fields</span>
              <strong>Hidden</strong>
            </div>
            <div className="zkp-hero-metric">
              <span>Delivery</span>
              <strong>Local only</strong>
            </div>
          </div>
        </div>

        <div className="zkp-proof-card">
          <div className="zkp-card-title">Required Proofs</div>
          <div className="zkp-proof-list">
            {proofRows.map((proof) => (
              <div key={proof.label} className="zkp-proof-row">
                <span>{proof.label}</span>
                <strong>{proof.value}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="zkp-crypt-card">
          <div className="zkp-crypt-head">
            <div className="zkp-card-title">Underlying Data</div>
            <div className={`zkp-state-pill ${phase === 'review' ? 'review' : 'hidden'}`}>
              {phase === 'review' ? 'Visible locally' : 'Obfuscated'}
            </div>
          </div>

          <div className="zkp-crypt-list">
            {cryptRows.map((row) => (
              <div key={row.label} className="zkp-crypt-row">
                <span>{row.label}</span>
                <strong>{phase === 'review' ? row.visible : row.obfuscated}</strong>
              </div>
            ))}
          </div>

          <AnimatePresence>
            {phase !== 'review' && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="zkp-obfuscation-block">
                <div className="zkp-hash-anim">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="zkp-hash-line" style={{ animationDelay: `${i * 0.2}s` }}>
                      <div className="hash-block"></div><div className="hash-block"></div><div className="hash-block"></div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <div className="zkp-footer">
        {phase === 'review' && (
          <button type="button" className="zkp-primary-btn" onClick={handleApprove}>
            <Fingerprint size={22} />
            Generate ZKP
          </button>
        )}
        {phase === 'generating' && (
          <div className="zkp-state-card">
            <Fingerprint size={48} color="var(--blue)" className="pulse-anim" />
            <div className="zkp-state-title">Generating Proof...</div>
            <div className="zkp-state-copy">Applying zero-knowledge transformations and sealing the payload on device.</div>
          </div>
        )}
        {phase === 'success' && (
          <div className="zkp-state-card success">
            <CheckCircle2 size={28} color="var(--green)" />
            <div className="zkp-state-title">ZKP Payload Delivered</div>
            <div className="zkp-state-copy">The verified proof package was generated and delivered without exposing raw personal data.</div>
            <button type="button" className="zkp-secondary-btn" onClick={() => { onApprove(); onClose(); }}>
              Return to Identity
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// --- Settings Helper Components (declared outside to avoid re-creation during render) ---


export { QrScannerModule, MultiSigModule, ZkpModal };
