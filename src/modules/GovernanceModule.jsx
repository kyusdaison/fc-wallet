import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Vote, CheckCircle2, XCircle, Clock, TrendingUp, Users, Zap, Shield, Heart, Landmark, BarChart3 } from 'lucide-react';
import { GOVERNANCE_PROPOSALS, GOVERNANCE_STATS } from '../data/mockData';

const categoryMeta = {
  fiscal: { icon: <Landmark size={16} color="#f5d46b" />, label: 'Fiscal', color: '#f5d46b' },
  infrastructure: { icon: <Zap size={16} color="#93c5fd" />, label: 'Infrastructure', color: '#93c5fd' },
  welfare: { icon: <Heart size={16} color="#6ee7b7" />, label: 'Welfare', color: '#6ee7b7' },
  governance: { icon: <Shield size={16} color="#c4b5fd" />, label: 'Governance', color: '#c4b5fd' },
};

const statusMeta = {
  active: { label: 'Active', color: 'var(--green)', bg: 'var(--green-dim)' },
  passed: { label: 'Passed', color: 'var(--blue)', bg: 'var(--blue-dim)' },
  rejected: { label: 'Rejected', color: 'var(--red)', bg: 'rgba(239,68,68,0.1)' },
};

const GovernanceModule = ({ onClose }) => {
  const [filter, setFilter] = useState('all');
  const [votes, setVotes] = useState(() => {
    const init = {};
    GOVERNANCE_PROPOSALS.forEach(p => { if (p.yourVote) init[p.id] = p.yourVote; });
    return init;
  });
  const [selectedProposal, setSelectedProposal] = useState(null);

  const filtered = filter === 'all'
    ? GOVERNANCE_PROPOSALS
    : GOVERNANCE_PROPOSALS.filter(p => p.status === filter);

  const handleVote = (proposalId, direction) => {
    setVotes(prev => ({ ...prev, [proposalId]: direction }));
  };

  // Detail view
  if (selectedProposal) {
    const p = GOVERNANCE_PROPOSALS.find(x => x.id === selectedProposal);
    if (!p) return null;
    const cat = categoryMeta[p.category] || categoryMeta.governance;
    const st = statusMeta[p.status];
    const forPct = Math.round((p.votesFor / (p.votesFor + p.votesAgainst)) * 100);
    const againstPct = 100 - forPct;
    const myVote = votes[p.id];

    return (
      <motion.div key="gov-detail" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.3, ease: 'easeOut' }} className="module-content gov-shell module-stack-lg">
        <button type="button" className="identity-back-link" onClick={() => setSelectedProposal(null)}>
          <ChevronLeft size={20} strokeWidth={2.5} />
          Back to Proposals
        </button>

        <div className="gov-detail-hero">
          <div className="gov-detail-hero-top">
            <div className="gov-cat-pill" style={{ color: cat.color, borderColor: cat.color }}>
              {cat.icon}
              {cat.label}
            </div>
            <div className="gov-status-chip" style={{ color: st.color, background: st.bg }}>
              {p.status === 'active' ? <Clock size={12} /> : p.status === 'passed' ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
              {st.label}
            </div>
          </div>
          <div className="gov-detail-title">{p.title}</div>
          <div className="gov-detail-id">{p.id.toUpperCase()}</div>
          <div className="gov-detail-desc">{p.description}</div>
          {p.endsIn && <div className="gov-detail-timer"><Clock size={14} color="var(--gold)" /> Voting ends in {p.endsIn}</div>}
        </div>

        <div className="gov-results-card">
          <div className="gov-results-head">
            <BarChart3 size={16} color="#93c5fd" />
            Voting Results
          </div>

          <div className="gov-bar-wrap">
            <div className="gov-bar">
              <div className="gov-bar-for" style={{ width: `${forPct}%` }}></div>
            </div>
            <div className="gov-bar-labels">
              <span className="gov-bar-label for">
                <CheckCircle2 size={12} /> For {forPct}%
                <small>{p.votesFor.toLocaleString()}</small>
              </span>
              <span className="gov-bar-label against">
                <XCircle size={12} /> Against {againstPct}%
                <small>{p.votesAgainst.toLocaleString()}</small>
              </span>
            </div>
          </div>

          <div className="gov-results-stats">
            <div className="gov-result-stat">
              <span>Quorum</span>
              <strong>{p.quorum}%</strong>
            </div>
            <div className="gov-result-stat">
              <span>Total Voters</span>
              <strong>{p.totalVoters.toLocaleString()}</strong>
            </div>
            <div className="gov-result-stat">
              <span>Participation</span>
              <strong>{Math.round(((p.votesFor + p.votesAgainst) / p.totalVoters) * 100)}%</strong>
            </div>
          </div>
        </div>

        {p.status === 'active' && (
          <div className="gov-vote-section">
            <div className="gov-vote-head">Cast Your Vote</div>
            {myVote ? (
              <div className="gov-voted-section">
                <div className="gov-voted-banner">
                  <CheckCircle2 size={18} color="var(--green)" />
                  You voted <strong>{myVote === 'for' ? 'IN FAVOR' : 'AGAINST'}</strong>
                </div>
                <button type="button" className="gov-change-vote-btn" onClick={() => handleVote(p.id, myVote === 'for' ? 'against' : 'for')}>
                  Switch to {myVote === 'for' ? 'Against' : 'For'}
                </button>
              </div>
            ) : (
              <div className="gov-vote-actions">
                <button type="button" className="gov-vote-btn for" onClick={() => handleVote(p.id, 'for')}>
                  <CheckCircle2 size={18} />
                  Vote For
                </button>
                <button type="button" className="gov-vote-btn against" onClick={() => handleVote(p.id, 'against')}>
                  <XCircle size={18} />
                  Vote Against
                </button>
              </div>
            )}
          </div>
        )}
      </motion.div>
    );
  }

  // List view
  return (
    <motion.div key="governance" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.3, ease: 'easeOut' }} className="module-content gov-shell module-stack-lg">
      <button type="button" className="identity-back-link" onClick={onClose}>
        <ChevronLeft size={20} strokeWidth={2.5} />
        Back to Services
      </button>

      <div className="gov-hero">
        <div className="gov-hero-top">
          <div>
            <div className="gov-hero-kicker">CITIZEN GOVERNANCE</div>
            <div className="gov-hero-title">DAO Voting</div>
            <div className="gov-hero-copy">Shape the future of the sovereign network through decentralized proposals.</div>
          </div>
          <div className="gov-hero-badge">
            <Vote size={14} />
            {GOVERNANCE_STATS.activeProposals} active
          </div>
        </div>
        <div className="gov-hero-metrics">
          <div className="gov-hero-metric">
            <span>Your Power</span>
            <strong>{GOVERNANCE_STATS.votingPower}</strong>
          </div>
          <div className="gov-hero-metric">
            <span>Participation</span>
            <strong>{GOVERNANCE_STATS.yourParticipation}</strong>
          </div>
          <div className="gov-hero-metric">
            <span>Total Props</span>
            <strong>{GOVERNANCE_STATS.totalProposals}</strong>
          </div>
        </div>
      </div>

      <div className="gov-filter-row">
        {[
          { key: 'all', label: 'All' },
          { key: 'active', label: 'Active' },
          { key: 'passed', label: 'Passed' },
          { key: 'rejected', label: 'Rejected' },
        ].map(f => (
          <button key={f.key} type="button" className={`gov-filter-btn ${filter === f.key ? 'active' : ''}`} onClick={() => setFilter(f.key)}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="gov-proposals-list">
        {filtered.map(p => {
          const cat = categoryMeta[p.category] || categoryMeta.governance;
          const st = statusMeta[p.status];
          const forPct = Math.round((p.votesFor / (p.votesFor + p.votesAgainst)) * 100);
          const myVote = votes[p.id];

          return (
            <button key={p.id} type="button" className="gov-proposal-card" onClick={() => setSelectedProposal(p.id)}>
              <div className="gov-proposal-top">
                <div className="gov-cat-pill" style={{ color: cat.color, borderColor: cat.color }}>
                  {cat.icon}
                  {cat.label}
                </div>
                <div className="gov-status-chip" style={{ color: st.color, background: st.bg }}>
                  {p.status === 'active' ? <Clock size={12} /> : p.status === 'passed' ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                  {st.label}
                </div>
              </div>
              <div className="gov-proposal-title">{p.title}</div>
              <div className="gov-proposal-id">{p.id.toUpperCase()}</div>
              <div className="gov-mini-bar">
                <div className="gov-mini-bar-fill" style={{ width: `${forPct}%` }}></div>
              </div>
              <div className="gov-proposal-footer">
                <span>{forPct}% approval</span>
                {p.endsIn && <span><Clock size={12} /> {p.endsIn}</span>}
                {myVote && <span className="gov-your-vote"><CheckCircle2 size={12} /> Voted</span>}
              </div>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default GovernanceModule;
