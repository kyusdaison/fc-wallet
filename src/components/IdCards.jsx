import React from 'react';
import { Building2, ShieldCheck, Star, CheckCircle2, User, ChevronRight } from 'lucide-react';
import { CITIZEN_PROFILE, ORG_PROFILE } from '../data/mockData';

export const V5IdCard = ({ orgMode = false }) => {
  if (orgMode) {
    return (
      <div className="id-card-v5 org-theme">
        <div className="id-card-header org-theme-header">
          <div className="id-card-header-left"><Building2 size={18} color="var(--gold)" /> Enterprise Portal</div>
          <Star size={18} color="var(--gold)" fill="var(--gold)" />
        </div>
        <div className="id-card-body">
          <div className="id-avatar org-theme-avatar">
             <Building2 size={40} color="var(--gold)" />
          </div>
          <div className="id-details">
            <div className="id-label org-theme-label">ENTITY NAME</div>
            <div className="id-value org-theme-value">{ORG_PROFILE.name}</div>
            <div className="id-label org-theme-label">ENTITY ID</div>
            <div className="id-value org-theme-value">{ORG_PROFILE.entityId}</div>
            <div className="id-pills">
              <span className="v5-pill pill-blue"><CheckCircle2 size={14} /> {ORG_PROFILE.status}</span>
              <span className="v5-pill org-theme-pill"><ShieldCheck size={14} /> Multi-Sig {ORG_PROFILE.multiSigConfig}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="id-card-v5">
      <div className="id-card-header">
        <div className="id-card-header-left"><ShieldCheck size={18} color="var(--gold)" /> Future Citizen Identity</div>
        <Star size={18} color="var(--gold)" fill="var(--gold)" />
      </div>
      <div className="id-card-body">
        <img src={CITIZEN_PROFILE.avatar} alt="Avatar" className="id-avatar" />
        <div className="id-details">
          <div className="id-label">NAME</div>
          <div className="id-value">{CITIZEN_PROFILE.name}</div>
          <div className="id-label">FCDID</div>
          <div className="id-value">{CITIZEN_PROFILE.did}</div>
          <div className="id-pills">
            <span className="v5-pill pill-blue"><CheckCircle2 size={14} /> Biometrics Active</span>
            <span className="v5-pill pill-green"><ShieldCheck size={14} /> L3 Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MiniIdHeader = ({ orgMode, setActiveTab }) => (
  <div onClick={() => setActiveTab('Identity')} className="mini-id-header">
    <div className="mini-id-accent-bar" />
    <div className="mini-id-left">
      <div className="mini-id-avatar-wrap">
        <div className="mini-id-avatar">
          {orgMode ? <Building2 size={16} color="var(--blue)" /> : <User size={16} color="var(--blue)" />}
        </div>
        <div className="mini-id-online-dot"></div>
      </div>
      <div>
        <div className="mini-id-name">{orgMode ? ORG_PROFILE.name : CITIZEN_PROFILE.name}</div>
        <div className="mini-id-did">{orgMode ? ORG_PROFILE.entityId : CITIZEN_PROFILE.did}</div>
      </div>
    </div>
    <div className="mini-id-right">
      <div className="mini-id-status-pill">
        <div className="mini-id-status-dot" />
        <span>{orgMode ? 'Active' : 'Verified'}</span>
      </div>
      <ChevronRight size={14} color="var(--text-tertiary)" />
    </div>
  </div>
);
