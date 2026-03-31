import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Fingerprint, Globe, ChevronRight, CheckCircle2, Sparkles, User, Lock, Scan } from 'lucide-react';

const STEPS = [
  {
    id: 'welcome',
    title: 'Welcome to\nFuture Citizen',
    subtitle: 'Your sovereign identity and digital wallet — in one secure, private space.',
    icon: <Sparkles size={40} color="var(--gold)" />,
    bg: 'linear-gradient(160deg, #0f172a 0%, #1e293b 100%)',
    accent: 'var(--gold)',
  },
  {
    id: 'identity',
    title: 'Create Your\nSovereign Identity',
    subtitle: 'Your DID (Decentralized Identifier) is generated locally on this device. No central authority holds your data.',
    icon: <User size={40} color="#93c5fd" />,
    bg: 'linear-gradient(160deg, #0c1629 0%, #1e3a5f 100%)',
    accent: 'var(--blue)',
    features: [
      { icon: <Shield size={16} color="var(--green)" />, text: 'Zero-knowledge identity proofs' },
      { icon: <Lock size={16} color="#c4b5fd" />, text: 'End-to-end encrypted storage' },
      { icon: <Globe size={16} color="#93c5fd" />, text: 'Cross-border portability' },
    ],
  },
  {
    id: 'biometric',
    title: 'Secure With\nBiometrics',
    subtitle: 'Your face and fingerprint never leave this device. All biometric data stays in the local secure enclave.',
    icon: <Fingerprint size={40} color="var(--green)" />,
    bg: 'linear-gradient(160deg, #0a1f1a 0%, #064e3b 100%)',
    accent: 'var(--green)',
    features: [
      { icon: <Fingerprint size={16} color="var(--green)" />, text: 'FaceID & TouchID support' },
      { icon: <Shield size={16} color="#f5d46b" />, text: 'Hardware-backed key storage' },
      { icon: <Scan size={16} color="#93c5fd" />, text: 'Anti-spoof liveness detection' },
    ],
  },
  {
    id: 'ready',
    title: 'You\'re All Set',
    subtitle: 'Your sovereign wallet is ready. Start managing assets, documents, and identity proofs — all under your control.',
    icon: <CheckCircle2 size={40} color="var(--green)" />,
    bg: 'linear-gradient(160deg, #0f172a 0%, #1e293b 100%)',
    accent: 'var(--green)',
  },
];

const OnboardingModule = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;
  const isFirst = step === 0;

  return (
    <motion.div
      key="onboarding"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="onboarding-shell"
      style={{ background: current.bg }}
    >
      {/* Progress dots */}
      <div className="onboarding-progress">
        {STEPS.map((s, i) => (
          <div
            key={s.id}
            className={`onboarding-dot ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}
            style={i === step ? { background: current.accent } : {}}
          />
        ))}
      </div>

      {/* Skip */}
      {!isLast && (
        <button type="button" className="onboarding-skip" onClick={onComplete}>
          Skip
        </button>
      )}

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3 }}
          className="onboarding-content"
        >
          <div className="onboarding-icon-wrap" style={{ borderColor: current.accent }}>
            <div className="onboarding-icon-glow" style={{ background: current.accent }}></div>
            {current.icon}
          </div>

          <div className="onboarding-title">{current.title}</div>
          <div className="onboarding-subtitle">{current.subtitle}</div>

          {current.features && (
            <div className="onboarding-features">
              {current.features.map((f) => (
                <div key={f.text} className="onboarding-feature">
                  <div className="onboarding-feature-icon">{f.icon}</div>
                  <span>{f.text}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="onboarding-nav">
        {!isFirst && (
          <button type="button" className="onboarding-back-btn" onClick={() => setStep(step - 1)}>
            Back
          </button>
        )}
        <button
          type="button"
          className="onboarding-next-btn"
          style={{ background: current.accent }}
          onClick={() => {
            if (isLast) {
              onComplete();
            } else {
              setStep(step + 1);
            }
          }}
        >
          {isLast ? 'Enter Wallet' : 'Continue'}
          <ChevronRight size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default OnboardingModule;
