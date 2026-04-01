import React from 'react';
import { motion } from 'framer-motion';
import {
  Wallet,
  Shield,
  FileText,
  MessageSquare,
  Database,
  Coins,
  ArrowRight,
  Sparkles,
  Fingerprint,
  Globe,
  Users,
  Zap,
} from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: 'easeOut' },
};

/* ───────────────────────────────────────
   WelcomeCard — first-time user banner
   ─────────────────────────────────────── */
export const WelcomeCard = ({ onDismiss }) => (
  <motion.div className="es-welcome" {...fadeUp}>
    <div className="es-welcome-glow" />
    <div className="es-welcome-icon">
      <Sparkles size={24} />
    </div>
    <div className="es-welcome-copy">
      <div className="es-welcome-title">Welcome to Future Citizen</div>
      <div className="es-welcome-sub">
        Your sovereign digital wallet is ready. Complete the steps below to unlock the full experience.
      </div>
    </div>
    {onDismiss && (
      <button type="button" className="es-welcome-dismiss" onClick={onDismiss}>
        Got it
      </button>
    )}
  </motion.div>
);

/* ───────────────────────────────────────
   OnboardingChecklist — progress tracker
   ─────────────────────────────────────── */
export const OnboardingChecklist = ({ steps, onStepClick }) => {
  const completed = steps.filter((s) => s.done).length;
  const pct = Math.round((completed / steps.length) * 100);

  return (
    <motion.div className="es-checklist" {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
      <div className="es-checklist-head">
        <span className="es-checklist-label">SETUP PROGRESS</span>
        <span className="es-checklist-pct">{pct}%</span>
      </div>
      <div className="es-progress-track">
        <motion.div
          className="es-progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
        />
      </div>
      <div className="es-steps">
        {steps.map((step, i) => (
          <button
            key={step.id}
            type="button"
            className={`es-step ${step.done ? 'done' : ''}`}
            onClick={() => !step.done && onStepClick?.(step)}
          >
            <div className={`es-step-dot ${step.done ? 'done' : ''}`}>
              {step.done ? '✓' : i + 1}
            </div>
            <div className="es-step-copy">
              <div className="es-step-title">{step.title}</div>
              <div className="es-step-sub">{step.done ? 'Completed' : step.subtitle}</div>
            </div>
            {!step.done && <ArrowRight size={14} className="es-step-arrow" />}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

/* ───────────────────────────────────────
   EmptyAssets — no tokens state
   ─────────────────────────────────────── */
export const EmptyAssets = ({ onAction }) => (
  <motion.div className="es-empty" {...fadeUp}>
    <div className="es-empty-icon es-icon-blue">
      <Wallet size={28} />
    </div>
    <div className="es-empty-title">No Assets Yet</div>
    <div className="es-empty-sub">
      Fund your wallet to start transacting on the sovereign network.
    </div>
    <div className="es-empty-actions">
      <button type="button" className="es-action-btn primary" onClick={() => onAction?.('receive')}>
        <Zap size={14} /> Receive Funds
      </button>
      <button type="button" className="es-action-btn secondary" onClick={() => onAction?.('explore')}>
        <Globe size={14} /> Explore Assets
      </button>
    </div>
  </motion.div>
);

/* ───────────────────────────────────────
   EmptyVault — no cold vault state
   ─────────────────────────────────────── */
export const EmptyVault = ({ onAction }) => (
  <motion.div className="es-empty" {...fadeUp}>
    <div className="es-empty-icon es-icon-purple">
      <Database size={28} />
    </div>
    <div className="es-empty-title">Cold Vault Not Set Up</div>
    <div className="es-empty-sub">
      Secure your long-term holdings in a hardware-backed vault with multi-sig protection.
    </div>
    <div className="es-empty-actions">
      <button type="button" className="es-action-btn primary" onClick={() => onAction?.('setup-vault')}>
        <Shield size={14} /> Set Up Vault
      </button>
    </div>
  </motion.div>
);

/* ───────────────────────────────────────
   EmptyIdentity — no verified credentials
   ─────────────────────────────────────── */
export const EmptyIdentity = ({ onAction }) => (
  <motion.div className="es-empty" {...fadeUp}>
    <div className="es-empty-icon es-icon-green">
      <Fingerprint size={28} />
    </div>
    <div className="es-empty-title">Verify Your Identity</div>
    <div className="es-empty-sub">
      Complete identity verification to access government services and unlock higher trust levels.
    </div>
    <div className="es-empty-actions">
      <button type="button" className="es-action-btn primary" onClick={() => onAction?.('verify')}>
        <Shield size={14} /> Start Verification
      </button>
      <button type="button" className="es-action-btn secondary" onClick={() => onAction?.('learn')}>
        <FileText size={14} /> Learn More
      </button>
    </div>
  </motion.div>
);

/* ───────────────────────────────────────
   EmptyComms — no messages state
   ─────────────────────────────────────── */
export const EmptyComms = ({ onAction }) => (
  <motion.div className="es-empty" {...fadeUp}>
    <div className="es-empty-icon es-icon-gold">
      <MessageSquare size={28} />
    </div>
    <div className="es-empty-title">No Messages Yet</div>
    <div className="es-empty-sub">
      Connect with verified citizens and organizations on the sovereign network.
    </div>
    <div className="es-empty-actions">
      <button type="button" className="es-action-btn primary" onClick={() => onAction?.('new-chat')}>
        <Users size={14} /> Find Contacts
      </button>
    </div>
  </motion.div>
);

/* ───────────────────────────────────────
   EmptyStaking — no staking state
   ─────────────────────────────────────── */
export const EmptyStaking = ({ onAction }) => (
  <motion.div className="es-empty" {...fadeUp}>
    <div className="es-empty-icon es-icon-gold">
      <Coins size={28} />
    </div>
    <div className="es-empty-title">Start Earning Rewards</div>
    <div className="es-empty-sub">
      Stake your FC tokens to participate in governance and earn network rewards.
    </div>
    <div className="es-empty-actions">
      <button type="button" className="es-action-btn primary" onClick={() => onAction?.('stake')}>
        <Coins size={14} /> Explore Staking
      </button>
    </div>
  </motion.div>
);
