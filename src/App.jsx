import React, { useState } from 'react';
import { Home, IdCard, Wallet, Building2, Inbox, Banknote, ShieldCheck, MailPlus, GitCompareArrows, CheckCircle2, Star, Fingerprint, MapPin, ArrowUpRight, ArrowDownLeft, RefreshCcw, Bell, FileText, CheckSquare, Settings, QrCode, Award, ChevronDown, FileSignature, User, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- SUB-MODULES ---

const HomeModule = () => (
  <motion.div 
    key="home"
    initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.3, ease: 'easeOut' }}
    style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
  >
    {/* ID Card */}
    <div className="id-card">
      <div className="id-header">
        <span className="id-title">
          <ShieldCheck size={18} color="var(--gold)" /> Future Citizen Identity
        </span>
        <Star size={16} color="var(--gold)" fill="var(--gold)" style={{ filter: 'drop-shadow(0 0 8px rgba(212,187,115,0.5))' }} />
      </div>
      <div className="id-content">
        <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=280" alt="Identity" className="id-photo" />
        <div className="id-details">
          <div className="id-label">Name</div>
          <div className="id-value">Amelia J. Thorne</div>
          <div className="id-label">FCDID</div>
          <div className="id-value" style={{fontSize: '11px', color: 'var(--cyan)'}}>did:fc:amelia</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' }}>
            <span className="id-badge"><CheckCircle2 size={12} /> Biometrics Active</span>
            <span className="id-badge" style={{ borderColor: 'rgba(16,185,129,0.3)', color: 'var(--green)', background: 'rgba(16,185,129,0.1)' }}><CheckCircle2 size={12} /> L3 Verified</span>
          </div>
        </div>
      </div>
    </div>

    {/* Action Grid */}
    <div className="action-grid">
      <div className="action-btn">
        <Banknote size={22} color="var(--cyan-strong)" />
        <span>Pay</span>
      </div>
      <div className="action-btn">
        <ShieldCheck size={22} color="var(--gold)" />
        <span>Prove</span>
      </div>
      <div className="action-btn">
        <MailPlus size={22} color="#a855f7" />
        <span>Inbox</span>
      </div>
      <div className="action-btn">
        <Building2 size={22} color="#f97316" />
        <span>Org</span>
      </div>
    </div>

    {/* Citizen Dashboard (Trust & Credentials) */}
    <div className="balance-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', position: 'relative', zIndex: 1 }}>
        <span className="balance-title">Citizen Dashboard</span>
        <span style={{ background: 'rgba(16,185,129,0.1)', color: 'var(--green)', fontSize: '10px', fontWeight: '700', padding: '4px 8px', borderRadius: '12px', border: '1px solid rgba(16,185,129,0.3)' }}>Network Active</span>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', position: 'relative', zIndex: 1 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Award size={18} color="var(--gold)" style={{ filter: 'drop-shadow(0 0 5px rgba(212,187,115,0.4))' }} />
            <span style={{ fontSize: '15px', fontWeight: '700', color: '#fff' }}>L3 Verified</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={18} color="var(--cyan-strong)" />
            <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--muted-dark)' }}>4 Active VCs</span>
          </div>
        </div>
        <div style={{ textAlign: 'right', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '16px' }}>
          <div className="balance-sub" style={{ marginBottom: '4px' }}>Native Balance</div>
          <div className="balance-amount" style={{ fontSize: '20px', margin: 0 }}>
            12,480.50 <span style={{ fontSize: '10px', color: 'var(--cyan)' }}>FCUSD</span>
          </div>
        </div>
      </div>
    </div>

    {/* Official Broadcast Message */}
    <div style={{ background: 'rgba(0, 240, 255, 0.05)', borderRadius: '16px', padding: '16px', display: 'flex', gap: '14px', alignItems: 'flex-start', borderLeft: '4px solid var(--cyan)', borderRight: '1px solid rgba(255,255,255,0.05)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
      <div style={{ background: 'rgba(0, 240, 255, 0.1)', color: 'var(--cyan)', borderRadius: '50%', padding: '8px', flexShrink: 0, border: '1px solid rgba(0, 240, 255, 0.3)', boxShadow: '0 0 10px rgba(0,240,255,0.2)' }}>
        <Bell size={16} />
      </div>
      <div>
        <div style={{ fontSize: '13px', fontWeight: '700', color: '#fff', marginBottom: '4px', letterSpacing: '0.05em' }}>FCA Network Update</div>
        <div style={{ fontSize: '12px', color: 'var(--muted-dark)', lineHeight: '1.5' }}>Protocol upgrade scheduled for 00:00 UTC. Expect 5 minutes of limited proving service.</div>
      </div>
    </div>

    {/* Pending Trust Requests */}
    <div className="requests-section">
      <h3>Pending Trust Requests</h3>
      <div className="request-item">
        <div className="req-icon" style={{ color: 'var(--gold)' }}><Building2 size={20} /></div>
        <div className="req-info">
          <div className="req-title">NexaCorp Employment</div>
          <div className="req-sub"><div className="req-dot" style={{ background: 'var(--gold)' }}></div> ZKP Request</div>
        </div>
        <button className="req-action" style={{ background: 'rgba(212, 187, 115, 0.1)', color: 'var(--gold)', borderColor: 'rgba(212, 187, 115, 0.3)' }}>Review</button>
      </div>
      <div className="request-item">
        <div className="req-icon"><Fingerprint size={20} /></div>
        <div className="req-info">
          <div className="req-title">City Transit Pass</div>
          <div className="req-sub"><div className="req-dot"></div> Age Proof (&gt;18)</div>
        </div>
        <button className="req-action">Review</button>
      </div>
    </div>
  </motion.div>
);

const IdentityModule = () => (
  <motion.div 
    key="identity"
    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
    style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
  >
    <div className="balance-card">
      <div className="balance-title">Civic Trust Score</div>
      <div className="balance-amount">842 <span style={{fontSize: '14px', color: 'var(--green)', fontWeight: '600', textShadow: 'none'}}>+12 this month</span></div>
      <div className="balance-sub" style={{ marginTop: '8px'}}>Excellent standing • All base protocols verified</div>
    </div>
    
    <div className="requests-section">
      <h3>Verifiable Credentials (VCs)</h3>
      <div className="request-item" style={{ alignItems: 'flex-start' }}>
        <div className="req-icon" style={{color: '#a855f7'}}><FileText size={20} /></div>
        <div className="req-info">
          <div className="req-title">Government E-ID</div>
          <div className="req-sub" style={{marginBottom: '10px'}}>Issued by FCA Authority</div>
          <span className="id-badge" style={{background: 'rgba(16,185,129,0.1)', color: 'var(--green)', borderColor: 'rgba(16,185,129,0.3)', textShadow: 'none'}}>Valid till 2035</span>
        </div>
      </div>
      <div className="request-item" style={{ alignItems: 'flex-start' }}>
        <div className="req-icon" style={{color: '#ef4444'}}><ShieldCheck size={20} /></div>
        <div className="req-info">
          <div className="req-title">Stanford University Degree</div>
          <div className="req-sub" style={{marginBottom: '10px'}}>Issued by Stanford Registry</div>
          <span className="id-badge" style={{background: 'rgba(0,240,255,0.1)', color: 'var(--cyan)'}}>Cryptographically Signed</span>
        </div>
      </div>
      <div className="request-item" style={{ border: '1px dashed rgba(0,240,255,0.3)', background: 'transparent', justifyContent: 'center', boxShadow: 'none' }}>
        <span style={{ fontSize: '13px', color: 'var(--cyan)', fontWeight: '700', letterSpacing: '0.05em' }}>+ Import Credential</span>
      </div>
    </div>
  </motion.div>
);

const PayModule = () => (
  <motion.div 
    key="pay"
    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
    style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
  >
    <div style={{ textAlign: 'center', padding: '20px 0' }}>
      <div style={{ fontSize: '13px', color: 'var(--muted-dark)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Total Liquid Assets</div>
      <div style={{ fontFamily: 'var(--heading-font)', fontSize: '46px', fontWeight: '800', color: '#fff', margin: '12px 0', textShadow: '0 0 20px rgba(255,255,255,0.2)' }}>
        $15,820.00
      </div>
      <div style={{ display: 'inline-flex', gap: '6px', alignItems: 'center', fontSize: '11px', background: 'rgba(0,240,255,0.1)', padding: '6px 14px', borderRadius: '999px', color: 'var(--cyan)', border: '1px solid rgba(0,240,255,0.3)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        <CheckCircle2 size={12} color="var(--cyan)" /> Gas Subsidized by FCC
      </div>
    </div>

    <div className="action-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
      <div className="action-btn" style={{ background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)' }}><ArrowUpRight size={22} color="#fff" /><span>Send</span></div>
      <div className="action-btn"><ArrowDownLeft size={22} color="var(--cyan)" /><span>Receive</span></div>
      <div className="action-btn"><RefreshCcw size={22} color="var(--gold)" /><span>Swap</span></div>
    </div>

    <div className="requests-section" style={{ marginTop: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3>Digital Assets</h3>
        <span style={{ fontSize: '11px', color: 'var(--cyan)', fontWeight: '700', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Manage</span>
      </div>
      
      {/* FC Stablecoin */}
      <div className="request-item" style={{ border: '1px solid rgba(212,187,115,0.3)', boxShadow: '0 10px 20px rgba(212, 187, 115, 0.05)' }}>
        <div className="req-icon" style={{color: 'var(--gold)', borderColor: 'rgba(212,187,115,0.2)', background: 'rgba(212,187,115,0.05)', fontWeight: '800', fontSize: '16px'}}>$</div>
        <div className="req-info">
          <div className="req-title" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
            FCUSD <span className="status-pill" style={{padding: '3px 8px', fontSize: '8px', background: 'rgba(212,187,115,0.1)', color: 'var(--gold)', border: '1px solid rgba(212,187,115,0.3)', boxShadow: 'none'}}>Native</span>
          </div>
          <div className="req-sub">Future Citizen Network</div>
        </div>
        <div style={{ textAlign: 'right', position: 'relative', zIndex: 1 }}>
          <div style={{fontWeight: '700', color: '#fff', fontSize: '14px', letterSpacing: '0.02em'}}>12,480.50</div>
          <div style={{fontSize: '11px', color: 'var(--muted-dark)', marginTop: '2px'}}>≈ $12,480.50</div>
        </div>
      </div>

      {/* FC Coin (Gas) */}
      <div className="request-item" style={{ borderLeft: '3px solid var(--cyan)' }}>
        <div className="req-icon" style={{fontWeight: '800', fontSize: '12px'}}>FCC</div>
        <div className="req-info">
          <div className="req-title">Future Citizen Coin</div>
          <div className="req-sub">Future Citizen Network</div>
        </div>
        <div style={{ textAlign: 'right', position: 'relative', zIndex: 1 }}>
          <div style={{fontWeight: '700', color: '#fff', fontSize: '14px', letterSpacing: '0.02em'}}>450.00 FCC</div>
          <div style={{fontSize: '11px', color: 'var(--muted-dark)', marginTop: '2px'}}>≈ $2,250.00</div>
        </div>
      </div>

      <div className="request-item">
        <div className="req-icon" style={{color: '#f59e0b', fontFamily: 'var(--heading-font)', fontSize: '18px', fontWeight: '800'}}>₿</div>
        <div className="req-info">
          <div className="req-title">Bitcoin</div>
          <div className="req-sub">Bitcoin Network</div>
        </div>
        <div style={{ textAlign: 'right', position: 'relative', zIndex: 1 }}>
          <div style={{fontWeight: '700', color: '#fff', fontSize: '14px', letterSpacing: '0.02em'}}>0.045 BTC</div>
          <div style={{fontSize: '11px', color: 'var(--muted-dark)', marginTop: '2px'}}>≈ $3,120.00</div>
        </div>
      </div>

      <div className="request-item">
        <div className="req-icon" style={{color: '#a8a29e', fontFamily: 'var(--heading-font)', fontSize: '18px', fontWeight: '800'}}>Ξ</div>
        <div className="req-info">
          <div className="req-title">Ethereum</div>
          <div className="req-sub">Ethereum Mainnet</div>
        </div>
        <div style={{ textAlign: 'right', position: 'relative', zIndex: 1 }}>
          <div style={{fontWeight: '700', color: '#fff', fontSize: '14px', letterSpacing: '0.02em'}}>0.11 ETH</div>
          <div style={{fontSize: '11px', color: 'var(--muted-dark)', marginTop: '2px'}}>≈ $300.00</div>
        </div>
      </div>
    </div>

    <div className="requests-section" style={{ marginTop: '10px' }}>
      <h3>Recent Transfers</h3>
      <div className="request-item">
        <div className="req-icon" style={{color: '#3b82f6'}}><ArrowUpRight size={18} /></div>
        <div className="req-info">
          <div className="req-title">To: Local Coffee Co.</div>
          <div className="req-sub">Today, 08:42 AM</div>
        </div>
        <div style={{fontWeight: '700', color: '#fff', zIndex: 1}}>- $4.50</div>
      </div>
      <div className="request-item">
        <div className="req-icon" style={{color: 'var(--green)'}}><ArrowDownLeft size={18} /></div>
        <div className="req-info">
          <div className="req-title">From: NexaCorp (Salary)</div>
          <div className="req-sub">Yesterday</div>
        </div>
        <div style={{fontWeight: '700', color: 'var(--green)', zIndex: 1}}>+ $6,200.00</div>
      </div>
    </div>
  </motion.div>
);

const OrgModule = () => (
  <motion.div 
    key="org"
    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
    style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
  >
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)'}}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(212,187,115,0.1)', border: '1px solid rgba(212,187,115,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)' }}><Building2 size={24} /></div>
        <div>
          <div style={{ fontSize: '16px', fontWeight: '700', color: '#fff', letterSpacing: '0.02em' }}>NexaCorp Ltd.</div>
          <div style={{ fontSize: '12px', color: 'var(--muted-dark)', marginTop: '4px' }}>Role: Active Treasurer</div>
        </div>
      </div>
      <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '50%' }}><GitCompareArrows size={20} color="var(--cyan)" /></div>
    </div>

    <div className="requests-section">
      <h3>Multi-Sig Pending Approvals (2)</h3>
      <div className="request-item" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', position: 'relative', zIndex: 1 }}>
          <div>
            <div className="req-title">Infrastructure Payment</div>
            <div className="req-sub">AWS Hosting - May 2026</div>
          </div>
          <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--red)' }}>-$4,200.00</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.2)', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', zIndex: 1 }}>
          <div style={{ fontSize: '12px', color: 'var(--muted-dark)' }}>Signatures: <strong style={{color: '#fff'}}>2/3</strong></div>
          <button style={{ padding: '8px 20px', borderRadius: '999px', background: 'var(--cyan)', color: '#000', fontSize: '11px', fontWeight: '700', border: 'none', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em', boxShadow: '0 0 15px rgba(0,240,255,0.4)' }}>Sign & Execute</button>
        </div>
      </div>

      <div className="request-item" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', position: 'relative', zIndex: 1 }}>
          <div>
            <div className="req-title">Add New Employee</div>
            <div className="req-sub">Grant Access: "Dev Team"</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.2)', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', zIndex: 1 }}>
          <div style={{ fontSize: '12px', color: 'var(--muted-dark)' }}>Signatures: <strong style={{color: '#fff'}}>1/2</strong></div>
          <button style={{ padding: '8px 20px', borderRadius: '999px', background: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: '11px', fontWeight: '700', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sign Policy</button>
        </div>
      </div>
    </div>
  </motion.div>
);

const InboxModule = () => (
  <motion.div 
    key="inbox"
    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
    style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
  >
    <div className="requests-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3>Secure Messages</h3>
        <span style={{ fontSize: '11px', color: 'var(--cyan)', fontWeight: '700', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Mark all read</span>
      </div>
      
      <div className="request-item" style={{ border: '1px solid rgba(212,187,115,0.3)', boxShadow: '0 10px 20px rgba(212, 187, 115, 0.05)' }}>
        <div className="req-icon" style={{color: 'var(--gold)', borderColor: 'rgba(212,187,115,0.2)', background: 'rgba(212,187,115,0.05)'}}><Bell size={20} /></div>
        <div className="req-info">
          <div className="req-title" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
            <div style={{width: '6px', height: '6px', background: 'var(--cyan)', borderRadius: '50%', boxShadow: '0 0 8px var(--cyan)'}}></div>
            Global Voting: Proposal 402
          </div>
          <div className="req-sub">FCA Network parameters update</div>
        </div>
      </div>

      <div className="request-item">
        <div className="req-icon"><ShieldCheck size={20} /></div>
        <div className="req-info">
          <div className="req-title">VC Renewal Notice</div>
          <div className="req-sub">Your Health Pass expires in 7 days</div>
        </div>
      </div>

      <div className="request-item">
        <div className="req-icon"><CheckSquare size={20} /></div>
        <div className="req-info">
          <div className="req-title">NexaCorp Onboarding</div>
          <div className="req-sub">Your device was securely registered</div>
        </div>
      </div>
    </div>
  </motion.div>
);

const OrgHomeModule = () => (
  <motion.div 
    key="org-home"
    initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.3, ease: 'easeOut' }}
    style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
  >
    {/* Enterprise ID Card */}
    <div className="id-card" style={{ borderColor: 'rgba(212,187,115,0.2)' }}>
      <div className="id-header">
        <span className="id-title">
          <Building2 size={18} color="var(--gold)" /> E-Company Digital ID
        </span>
        <div style={{ background: 'rgba(212,187,115,0.1)', border: '1px solid rgba(212,187,115,0.3)', color: 'var(--gold)', fontSize: '9px', padding: '3px 8px', borderRadius: '4px', fontWeight: '800', letterSpacing: '0.05em' }}>ACTIVE</div>
      </div>
      <div className="id-content">
        <div style={{ width: '70px', height: '70px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Building2 size={34} color="#fff" />
        </div>
        <div className="id-details">
          <div className="id-label">Entity Name</div>
          <div className="id-value">NexaCorp Ltd.</div>
          <div className="id-label">Registration No.</div>
          <div className="id-value" style={{fontSize: '13px', color: 'var(--cyan)', letterSpacing: '0.05em'}}>FC-ORG-9941X</div>
          <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
            <span className="id-badge" style={{background: 'rgba(16,185,129,0.1)', color: 'var(--green)', borderColor: 'rgba(16,185,129,0.3)'}}><CheckCircle2 size={12} /> Good Standing</span>
          </div>
        </div>
      </div>
    </div>

    {/* Org Action Grid */}
    <div className="action-grid">
      <div className="action-btn">
        <Banknote size={22} color="var(--cyan)" />
        <span>Transfer</span>
      </div>
      <div className="action-btn">
        <FileSignature size={22} color="var(--gold)" />
        <span>Sign</span>
      </div>
      <div className="action-btn">
        <Users size={22} color="#a855f7" />
        <span>Members</span>
      </div>
      <div className="action-btn">
        <Settings size={22} color="#94a3b8" />
        <span>Manage</span>
      </div>
    </div>

    {/* Corporate Treasury Dashboard */}
    <div className="balance-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', position: 'relative', zIndex: 1 }}>
        <span className="balance-title">Corporate Treasury</span>
        <span style={{ background: 'rgba(212,187,115,0.1)', color: 'var(--gold)', fontSize: '10px', fontWeight: '700', padding: '4px 8px', borderRadius: '12px', border: '1px solid rgba(212,187,115,0.3)' }}>Multi-Sig Active (2/3)</span>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', position: 'relative', zIndex: 1 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Users size={18} color="var(--cyan)" />
            <span style={{ fontSize: '15px', fontWeight: '700', color: '#fff' }}>12 Employees</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileSignature size={18} color="var(--muted-dark)" />
            <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--muted-dark)' }}>2 Pending Approvals</span>
          </div>
        </div>
        <div style={{ textAlign: 'right', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '16px' }}>
          <div className="balance-sub" style={{ marginBottom: '4px' }}>Total Vault Assets</div>
          <div className="balance-amount" style={{ fontSize: '20px', margin: 0 }}>
            4,250,000 <span style={{ fontSize: '10px', color: 'var(--cyan)' }}>FCUSD</span>
          </div>
        </div>
      </div>
    </div>

    {/* Pending Multi-Sig */}
    <div className="requests-section" style={{ marginTop: '10px' }}>
      <h3>Awaiting Your Signature</h3>
      <div className="request-item" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', position: 'relative', zIndex: 1 }}>
          <div>
            <div className="req-title">Infrastructure Payment</div>
            <div className="req-sub">AWS Hosting - May 2026</div>
          </div>
          <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--red)' }}>-$4,200.00</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.2)', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', zIndex: 1}}>
          <div style={{ fontSize: '12px', color: 'var(--muted-dark)' }}>Signatures: <strong style={{color: '#fff'}}>1/3</strong></div>
          <button style={{ padding: '8px 20px', borderRadius: '999px', background: 'var(--cyan)', color: '#000', fontSize: '11px', fontWeight: '700', border: 'none', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em', boxShadow: '0 0 15px rgba(0,240,255,0.4)' }}>Review & Sign</button>
        </div>
      </div>
    </div>
  </motion.div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [appMode, setAppMode] = useState('Citizen'); // 'Citizen' or 'Organization'
  const [showContextModal, setShowContextModal] = useState(false);

  return (
    <div className="phone">
      {/* Header Container */}
      <div className="header-area" style={{ position: 'relative', overflow: 'hidden' }}>
        
        {/* Background ambient lighting */}
        <div style={{ position: 'absolute', top: '-50px', left: '-50px', width: '200px', height: '200px', background: 'rgba(212, 187, 115, 0.1)', filter: 'blur(50px)', pointerEvents: 'none' }}></div>
        <div style={{ position: 'absolute', top: '20px', right: '-50px', width: '200px', height: '200px', background: 'rgba(0, 240, 255, 0.1)', filter: 'blur(50px)', pointerEvents: 'none' }}></div>

        <div className="header-top" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="/fc-lion-logo.png" alt="FCA" style={{ width: '40px', height: '40px', objectFit: 'contain', filter: 'drop-shadow(0 0 10px rgba(212,187,115,0.5))' }} onError={(e) => e.target.style.display='none'} />
            <div className="logo-container">
              <span>FUTURE</span>
              <span>CITIZEN</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div className="status-pill" onClick={() => setShowContextModal(true)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div className="status-dot" style={{ background: appMode === 'Citizen' ? 'var(--cyan)' : 'var(--gold)', boxShadow: appMode === 'Citizen' ? '0 0 8px var(--cyan)' : '0 0 8px var(--gold)' }}></div>
              <span style={{ color: appMode === 'Citizen' ? 'var(--cyan)' : 'var(--gold)' }}>{appMode}</span>
              <ChevronDown size={14} color="var(--muted-dark)" />
            </div>
            <QrCode size={22} color="#fff" style={{ cursor: 'pointer', opacity: 0.8 }} />
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="main-container">
        <AnimatePresence mode="wait">
          {activeTab === 'Home' && appMode === 'Citizen' && <HomeModule />}
          {activeTab === 'Home' && appMode === 'Organization' && <OrgHomeModule />}
          {activeTab === 'Identity' && <IdentityModule />}
          {activeTab === 'Pay' && <PayModule />}
          {activeTab === 'Org' && <OrgModule />}
          {activeTab === 'Inbox' && <InboxModule />}
        </AnimatePresence>
      </div>

      {/* Context Switcher Modal */}
      <AnimatePresence>
        {showContextModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="context-modal"
            onClick={() => setShowContextModal(false)}
          >
            <motion.div 
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="context-modal-inner"
              onClick={e => e.stopPropagation()}
            >
              <h3 style={{ margin: 0, color: '#fff', fontSize: '16px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Select Active Context</h3>
              
              <div 
                className={`context-option ${appMode === 'Citizen' ? 'active-cit' : ''}`}
                onClick={() => { setAppMode('Citizen'); setShowContextModal(false); }}
              >
                <div style={{ background: appMode === 'Citizen' ? 'var(--cyan)' : 'rgba(255,255,255,0.05)', color: appMode === 'Citizen' ? '#000' : '#fff', padding: '12px', borderRadius: '50%' }}><User size={20} /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '700', color: '#fff', fontSize: '15px', letterSpacing: '0.02em' }}>Amelia J. Thorne</div>
                  <div style={{ fontSize: '12px', color: 'var(--cyan)', marginTop: '2px' }}>Personal Citizen Account</div>
                </div>
                {appMode === 'Citizen' && <CheckCircle2 size={22} color="var(--cyan)" />}
              </div>

              <div 
                className={`context-option ${appMode === 'Organization' ? 'active-org' : ''}`}
                onClick={() => { setAppMode('Organization'); setShowContextModal(false); }}
              >
                <div style={{ background: appMode === 'Organization' ? 'var(--gold)' : 'rgba(255,255,255,0.05)', color: appMode === 'Organization' ? '#000' : '#fff', padding: '12px', borderRadius: '50%' }}><Building2 size={20} /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '700', color: '#fff', fontSize: '15px', letterSpacing: '0.02em' }}>NexaCorp Ltd.</div>
                  <div style={{ fontSize: '12px', color: 'var(--gold)', marginTop: '2px' }}>E-Company • Treasurer</div>
                </div>
                {appMode === 'Organization' && <CheckCircle2 size={22} color="var(--gold)" />}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Nav */}
      <div className="bottom-nav">
        <div className={`nav-item ${activeTab === 'Home' ? 'active' : ''}`} onClick={() => setActiveTab('Home')}>
          <Home size={22} strokeWidth={2} /> Home
        </div>
        <div className={`nav-item ${activeTab === 'Identity' ? 'active' : ''}`} onClick={() => setActiveTab('Identity')}>
          <IdCard size={22} strokeWidth={2} /> Identity
        </div>
        <div className={`nav-item ${activeTab === 'Pay' ? 'active' : ''}`} onClick={() => setActiveTab('Pay')}>
          <Wallet size={22} strokeWidth={2} /> Pay
        </div>
        <div className={`nav-item ${activeTab === 'Org' ? 'active' : ''}`} onClick={() => setActiveTab('Org')}>
          <Building2 size={22} strokeWidth={2} /> Org
        </div>
        <div className={`nav-item ${activeTab === 'Inbox' ? 'active' : ''}`} onClick={() => setActiveTab('Inbox')}>
          <Inbox size={22} strokeWidth={2} /> Inbox
        </div>
      </div>
    </div>
  );
}
