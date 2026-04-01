import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, TrendingUp, Lock, Coins, Gift, CircleDollarSign, Percent, ChevronRight } from 'lucide-react';
import { STAKING_POSITIONS, STAKING_SUMMARY } from '../data/mockData';
import { useAppStore } from '../store/useAppStore';

const StakingModule = ({ onClose }) => {
  const [claimedRewards, setClaimedRewards] = useState(new Set());
  const addToast = useAppStore(s => s.addToast);

  const handleClaim = (id) => {
    const pos = STAKING_POSITIONS.find(p => p.id === id);
    setClaimedRewards(prev => new Set([...prev, id]));
    if (pos) addToast(`Claimed ${pos.rewards} rewards`, 'success');
  };

  return (
    <motion.div key="staking" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.3, ease: 'easeOut' }} className="module-content staking-shell module-stack-lg">
      <button type="button" className="identity-back-link" onClick={onClose}>
        <ChevronLeft size={20} strokeWidth={2.5} />
        Back to Home
      </button>

      <div className="staking-hero">
        <div className="staking-hero-top">
          <div>
            <div className="staking-hero-kicker">YIELD DASHBOARD</div>
            <div className="staking-hero-title">Staking & Rewards</div>
          </div>
          <div className="staking-hero-badge">
            <TrendingUp size={14} />
            {STAKING_SUMMARY.avgApy} avg
          </div>
        </div>

        <div className="staking-hero-metrics">
          <div className="staking-hero-metric primary">
            <span>Total Staked</span>
            <strong>{STAKING_SUMMARY.totalStaked}</strong>
          </div>
          <div className="staking-hero-metric">
            <span>Pending Rewards</span>
            <strong className="staking-reward-value">{STAKING_SUMMARY.totalRewards}</strong>
          </div>
          <div className="staking-hero-metric">
            <span>Positions</span>
            <strong>{STAKING_SUMMARY.positions}</strong>
          </div>
        </div>

        <button type="button" className="staking-claim-all-btn" onClick={() => {
          STAKING_POSITIONS.filter(p => !claimedRewards.has(p.id) && p.status !== 'locked').forEach(p => handleClaim(p.id));
        }}>
          <Gift size={16} />
          Claim All Rewards
        </button>
      </div>

      <div className="staking-section-title">Active Positions</div>

      <div className="staking-positions">
        {STAKING_POSITIONS.map(pos => (
          <div key={pos.id} className="staking-position-card">
            <div className="staking-pos-header">
              <div className="staking-pos-icon" style={{ borderColor: pos.color }}>
                {pos.status === 'locked' ? <Lock size={18} color={pos.color} /> : <Coins size={18} color={pos.color} />}
              </div>
              <div className="staking-pos-info">
                <div className="staking-pos-name">{pos.pool}</div>
                <div className="staking-pos-token">{pos.token} {pos.status === 'locked' && <span className="staking-lock-badge"><Lock size={10} /> {pos.lockEnd}</span>}</div>
              </div>
              <div className="staking-pos-apy">
                <Percent size={12} />
                {pos.apy}
              </div>
            </div>

            <div className="staking-pos-details">
              <div className="staking-pos-detail">
                <span>Staked</span>
                <strong>{pos.staked} {pos.token}</strong>
                <small>{pos.stakedUsd}</small>
              </div>
              <div className="staking-pos-divider"></div>
              <div className="staking-pos-detail">
                <span>Rewards</span>
                <strong className="staking-reward-value">{pos.rewards}</strong>
                <small>{pos.rewardsUsd}</small>
              </div>
            </div>

            {pos.status !== 'locked' && (
              <div className="staking-pos-actions">
                {claimedRewards.has(pos.id) ? (
                  <div className="staking-claimed-banner">
                    <Gift size={14} color="var(--green)" /> Rewards claimed
                  </div>
                ) : (
                  <button type="button" className="staking-claim-btn" onClick={(e) => { e.stopPropagation(); handleClaim(pos.id); }}>
                    <Gift size={14} />
                    Claim {pos.rewards}
                  </button>
                )}
              </div>
            )}
            {pos.status === 'locked' && (
              <div className="staking-locked-banner">
                <Lock size={14} color="var(--purple)" />
                Locked for {pos.lockEnd} — earning {pos.apy} APY
              </div>
            )}
          </div>
        ))}
      </div>

      <button type="button" className="staking-new-position-btn">
        <CircleDollarSign size={18} />
        <div>
          <div className="staking-new-title">Stake More Assets</div>
          <div className="staking-new-subtitle">Browse available pools and lock periods</div>
        </div>
        <ChevronRight size={18} color="var(--text-tertiary)" />
      </button>
    </motion.div>
  );
};

export default StakingModule;
