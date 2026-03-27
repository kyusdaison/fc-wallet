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
        <Star size={16} color="var(--gold)" fill="var(--gold)" />
      </div>
      <div className="id-content">
        <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=280" alt="Identity" className="id-photo" />
        <div className="id-details">
          <div className="id-label">Name</div>
          <div className="id-value">Amelia J. Thorne</div>
          <div className="id-label">FCDID</div>
          <div className="id-value" style={{fontSize: '12px'}}>did:fc:amelia</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '6px' }}>
            <span className="id-badge"><CheckCircle2 size={12} /> Biometrics Active</span>
            <span className="id-badge" style={{background: '#dcfce7', color: '#166534'}}><CheckCircle2 size={12} /> L3 Verified</span>
          </div>
        </div>
      </div>
    </div>

    {/* Action Grid */}
    <div className="action-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
      <div className="action-btn" style={{ background: '#f8fafc', border: '1px solid var(--line-light)' }}>
        <Banknote size={20} color="var(--cyan-strong)" />
        <span style={{ fontSize: '11px', marginTop: '6px', fontWeight: '600' }}>Pay</span>
      </div>
      <div className="action-btn" style={{ background: '#f8fafc', border: '1px solid var(--line-light)' }}>
        <ShieldCheck size={20} color="var(--gold)" />
        <span style={{ fontSize: '11px', marginTop: '6px', fontWeight: '600' }}>Prove</span>
      </div>
      <div className="action-btn" style={{ background: '#f8fafc', border: '1px solid var(--line-light)' }}>
        <MailPlus size={20} color="#8b5cf6" />
        <span style={{ fontSize: '11px', marginTop: '6px', fontWeight: '600' }}>Inbox</span>
      </div>
      <div className="action-btn" style={{ background: '#f8fafc', border: '1px solid var(--line-light)' }}>
        <Building2 size={20} color="#f97316" />
        <span style={{ fontSize: '11px', marginTop: '6px', fontWeight: '600' }}>Org</span>
      </div>
    </div>

    {/* Citizen Dashboard (Trust & Credentials) */}
    <div className="balance-card" style={{ background: '#fff', border: '1px solid var(--line-light)', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--muted-light)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Citizen Dashboard</span>
        <span style={{ background: '#dcfce7', color: '#166534', fontSize: '10px', fontWeight: '700', padding: '3px 8px', borderRadius: '12px' }}>Network Active</span>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <Award size={18} color="var(--gold)" />
            <span style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>L3 Verified</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={18} color="var(--cyan-strong)" />
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#475569' }}>4 Active VCs</span>
          </div>
        </div>
        <div style={{ textAlign: 'right', borderLeft: '1px solid var(--line-light)', paddingLeft: '16px' }}>
          <div style={{ fontSize: '11px', color: 'var(--muted-light)', marginBottom: '4px' }}>Native Balance</div>
          <div style={{ fontFamily: 'var(--heading-font)', fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>
            12,480.50 <span style={{ fontSize: '10px', color: 'var(--cyan-strong)' }}>FCUSD</span>
          </div>
        </div>
      </div>
    </div>

    {/* Official Broadcast Message */}
    <div style={{ background: '#e0f2fe', borderRadius: '12px', padding: '14px', display: 'flex', gap: '12px', alignItems: 'flex-start', borderLeft: '4px solid #0284c7' }}>
      <div style={{ background: '#0284c7', color: '#fff', borderRadius: '50%', padding: '6px', flexShrink: 0 }}>
        <Bell size={14} />
      </div>
      <div>
        <div style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a', marginBottom: '2px' }}>FCA Network Update</div>
        <div style={{ fontSize: '12px', color: '#0369a1', lineHeight: '1.4' }}>Protocol upgrade scheduled for 00:00 UTC. Expect 5 minutes of limited proving service.</div>
      </div>
    </div>

    {/* Pending Trust Requests */}
    <div className="requests-section">
      <h3>Pending Trust Requests</h3>
      <div className="request-item">
        <div className="req-icon"><Building2 size={18} /></div>
        <div className="req-info">
          <div className="req-title">NexaCorp Employment</div>
          <div className="req-sub"><div className="req-dot"></div> ZKP Request</div>
        </div>
        <button className="req-action">Review</button>
      </div>
      <div className="request-item">
        <div className="req-icon"><Fingerprint size={18} /></div>
        <div className="req-info">
          <div className="req-title">City Transit Pass</div>
          <div className="req-sub"><div className="req-dot" style={{background: '#64748b'}}></div> Age Proof (&gt;18)</div>
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
    <div className="balance-card" style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)', color: '#fff', border: 'none' }}>
      <div className="balance-title" style={{color: '#94a3b8'}}>Civic Trust Score</div>
      <div className="balance-amount" style={{color: '#fff'}}>842 <span style={{fontSize: '14px', color: '#34d399', fontWeight: '500'}}>+12 this month</span></div>
      <div className="balance-sub" style={{color: '#94a3b8', marginTop: '8px'}}>Excellent standing • All base protocols verified</div>
    </div>
    
    <div className="requests-section">
      <h3>Verifiable Credentials (VCs)</h3>
      <div className="request-item" style={{ alignItems: 'flex-start' }}>
        <div className="req-icon" style={{background: '#e0e7ff', color: '#4f46e5'}}><FileText size={18} /></div>
        <div className="req-info">
          <div className="req-title">Government E-ID</div>
          <div className="req-sub" style={{marginBottom: '6px'}}>Issued by FCA Authority</div>
          <span className="id-badge" style={{background: '#dcfce7', color: '#166534'}}>Valid till 2035</span>
        </div>
      </div>
      <div className="request-item" style={{ alignItems: 'flex-start' }}>
        <div className="req-icon" style={{background: '#fee2e2', color: '#dc2626'}}><ShieldCheck size={18} /></div>
        <div className="req-info">
          <div className="req-title">Stanford University Degree</div>
          <div className="req-sub" style={{marginBottom: '6px'}}>Issued by Stanford Registry</div>
          <span className="id-badge" style={{background: '#dcfce7', color: '#166534'}}>Cryptographically Signed</span>
        </div>
      </div>
      <div className="request-item" style={{ border: '1px dashed #cbd5e1', background: 'transparent', justifyContent: 'center', cursor: 'pointer' }}>
        <span style={{ fontSize: '13px', color: 'var(--cyan-strong)', fontWeight: '600' }}>+ Import New Credential</span>
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
      <div style={{ fontSize: '14px', color: 'var(--muted-light)', fontWeight: '500' }}>Total Liquid Assets</div>
      <div style={{ fontFamily: 'var(--heading-font)', fontSize: '42px', fontWeight: '700', color: '#0f172a', margin: '8px 0' }}>
        $15,820.00
      </div>
      <div style={{ display: 'inline-flex', gap: '4px', alignItems: 'center', fontSize: '12px', background: '#f1f5f9', padding: '4px 12px', borderRadius: '12px', color: '#475569' }}>
        <CheckCircle2 size={12} color="var(--green)" /> Gas Subsidized by FCC
      </div>
    </div>

    <div className="action-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
      <div className="action-btn" style={{ background: '#0f172a', color: '#fff' }}><ArrowUpRight size={20} /><span>Send</span></div>
      <div className="action-btn"><ArrowDownLeft size={20} color="var(--cyan-strong)" /><span>Receive</span></div>
      <div className="action-btn"><RefreshCcw size={20} color="#f97316" /><span>Swap</span></div>
    </div>

    <div className="requests-section" style={{ marginTop: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h3>Digital Assets</h3>
        <span style={{ fontSize: '11px', color: 'var(--cyan-strong)', fontWeight: '600', cursor: 'pointer' }}>Manage</span>
      </div>
      
      {/* FC Stablecoin */}
      <div className="request-item" style={{ background: '#fff', padding: '14px', border: '1px solid var(--gold)', boxShadow: '0 4px 12px rgba(212, 187, 115, 0.15)' }}>
        <div className="req-icon" style={{background: '#fef9c3', color: '#854d0e', fontWeight: '800', fontSize: '15px'}}>$</div>
        <div className="req-info">
          <div className="req-title" style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
            FCUSD <span className="status-pill" style={{padding: '3px 6px', fontSize: '8px', background: 'var(--gold)', color: '#fff', border: 'none', lineHeight: '1'}}>Native</span>
          </div>
          <div className="req-sub">Future Citizen Network</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{fontWeight: '700', color: '#0f172a', fontSize: '13px'}}>12,480.50</div>
          <div style={{fontSize: '11px', color: 'var(--muted-light)'}}>≈ $12,480.50</div>
        </div>
      </div>

      {/* FC Coin (Gas) */}
      <div className="request-item" style={{ background: '#fff', padding: '14px', borderLeft: '3px solid var(--cyan-strong)' }}>
        <div className="req-icon" style={{background: '#e0f2fe', color: '#0284c7', fontWeight: '800', fontSize: '11px'}}>FCC</div>
        <div className="req-info">
          <div className="req-title">Future Citizen Coin</div>
          <div className="req-sub">Future Citizen Network</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{fontWeight: '700', color: '#0f172a', fontSize: '13px'}}>450.00 FCC</div>
          <div style={{fontSize: '11px', color: 'var(--muted-light)'}}>≈ $2,250.00</div>
        </div>
      </div>

      <div className="request-item" style={{ background: '#fff', padding: '14px' }}>
        <div className="req-icon" style={{background: '#fffbeb', color: '#f59e0b', fontWeight: '800', fontSize: '16px', fontFamily: 'var(--heading-font)'}}>₿</div>
        <div className="req-info">
          <div className="req-title">Bitcoin</div>
          <div className="req-sub">Bitcoin Network</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{fontWeight: '700', color: '#0f172a', fontSize: '13px'}}>0.045 BTC</div>
          <div style={{fontSize: '11px', color: 'var(--muted-light)'}}>≈ $3,120.00</div>
        </div>
      </div>

      <div className="request-item" style={{ background: '#fff', padding: '14px' }}>
        <div className="req-icon" style={{background: '#f8fafc', color: '#64748b', fontWeight: '800', fontSize: '16px', fontFamily: 'var(--heading-font)'}}>Ξ</div>
        <div className="req-info">
          <div className="req-title">Ethereum</div>
          <div className="req-sub">Ethereum Mainnet</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{fontWeight: '700', color: '#0f172a', fontSize: '13px'}}>0.11 ETH</div>
          <div style={{fontSize: '11px', color: 'var(--muted-light)'}}>≈ $300.00</div>
        </div>
      </div>
    </div>

    <div className="requests-section" style={{ marginTop: '10px' }}>
      <h3>Recent Transfers</h3>
      <div className="request-item">
        <div className="req-icon" style={{background: '#dbeafe'}}><ArrowUpRight size={16} color="#2563eb" /></div>
        <div className="req-info">
          <div className="req-title">To: Local Coffee Co.</div>
          <div className="req-sub">Today, 08:42 AM</div>
        </div>
        <div style={{fontWeight: '700', color: '#0f172a'}}>- $4.50</div>
      </div>
      <div className="request-item">
        <div className="req-icon" style={{background: '#dcfce7'}}><ArrowDownLeft size={16} color="#16a34a" /></div>
        <div className="req-info">
          <div className="req-title">From: NexaCorp (Salary)</div>
          <div className="req-sub">Yesterday</div>
        </div>
        <div style={{fontWeight: '700', color: '#16a34a'}}>+ $6,200.00</div>
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
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: '#fff', borderRadius: '16px', border: '1px solid var(--line-light)'}}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><Building2 size={20} /></div>
        <div>
          <div style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>NexaCorp Ltd.</div>
          <div style={{ fontSize: '12px', color: 'var(--muted-light)' }}>Role: Active Treasurer</div>
        </div>
      </div>
      <GitCompareArrows size={20} color="var(--muted-light)" />
    </div>

    <div className="requests-section">
      <h3>Multi-Sig Pending Approvals (2)</h3>
      <div className="request-item" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div>
            <div className="req-title">Infrastructure Payment</div>
            <div className="req-sub">AWS Hosting - May 2026</div>
          </div>
          <div style={{ fontSize: '15px', fontWeight: '700', color: '#ef4444' }}>-$4,200.00</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f1f5f9', padding: '8px 12px', borderRadius: '8px' }}>
          <div style={{ fontSize: '12px', color: '#475569' }}>Signatures: <strong style={{color: '#0f172a'}}>2/3</strong></div>
          <button style={{ padding: '6px 16px', borderRadius: '6px', background: 'var(--cyan-strong)', color: '#fff', fontSize: '12px', fontWeight: '600', border: 'none', cursor: 'pointer' }}>Sign & Execute</button>
        </div>
      </div>

      <div className="request-item" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div>
            <div className="req-title">Add New Employee</div>
            <div className="req-sub">Grant Access: "Dev Team"</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f1f5f9', padding: '8px 12px', borderRadius: '8px' }}>
          <div style={{ fontSize: '12px', color: '#475569' }}>Signatures: <strong style={{color: '#0f172a'}}>1/2</strong></div>
          <button style={{ padding: '6px 16px', borderRadius: '6px', background: '#0f172a', color: '#fff', fontSize: '12px', fontWeight: '600', border: 'none', cursor: 'pointer' }}>Sign Policy</button>
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h3>Secure Messages</h3>
        <span style={{ fontSize: '11px', color: 'var(--cyan-strong)', fontWeight: '600', cursor: 'pointer' }}>Mark all read</span>
      </div>
      
      <div className="request-item" style={{ background: '#fff' }}>
        <div className="req-icon" style={{background: '#fef3c7', color: '#d97706'}}><Bell size={18} /></div>
        <div className="req-info">
          <div className="req-title" style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
            <div style={{width: '6px', height: '6px', background: '#ef4444', borderRadius: '50%'}}></div>
            Global Voting: Proposal 402
          </div>
          <div className="req-sub">FCA Network parameters update</div>
        </div>
      </div>

      <div className="request-item" style={{ background: '#fff' }}>
        <div className="req-icon" style={{background: '#f1f5f9', color: '#64748b'}}><ShieldCheck size={18} /></div>
        <div className="req-info">
          <div className="req-title">VC Renewal Notice</div>
          <div className="req-sub">Your Health Pass expires in 7 days</div>
        </div>
      </div>

      <div className="request-item" style={{ background: '#fff' }}>
        <div className="req-icon" style={{background: '#f1f5f9', color: '#64748b'}}><CheckSquare size={18} /></div>
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
    <div className="id-card" style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)' }}>
      <div className="id-header">
        <span className="id-title">
          <Building2 size={18} color="var(--gold)" /> E-Company Digital ID
        </span>
        <div style={{ background: 'var(--gold)', color: '#fff', fontSize: '9px', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>ACTIVE</div>
      </div>
      <div className="id-content">
        <div style={{ width: '60px', height: '60px', background: '#334155', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Building2 size={32} color="#94a3b8" />
        </div>
        <div className="id-details">
          <div className="id-label" style={{color: '#94a3b8'}}>Entity Name</div>
          <div className="id-value" style={{color: '#fff'}}>NexaCorp Ltd.</div>
          <div className="id-label" style={{color: '#94a3b8'}}>Registration No.</div>
          <div className="id-value" style={{fontSize: '12px', color: '#fff'}}>FC-ORG-9941X</div>
          <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
            <span className="id-badge" style={{background: '#dcfce7', color: '#166534'}}><CheckCircle2 size={12} /> Good Standing</span>
          </div>
        </div>
      </div>
    </div>

    {/* Org Action Grid */}
    <div className="action-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
      <div className="action-btn" style={{ background: '#f8fafc', border: '1px solid var(--line-light)' }}>
        <Banknote size={20} color="var(--cyan-strong)" />
        <span style={{ fontSize: '11px', marginTop: '6px', fontWeight: '600' }}>Transfer</span>
      </div>
      <div className="action-btn" style={{ background: '#f8fafc', border: '1px solid var(--line-light)' }}>
        <FileSignature size={20} color="var(--gold)" />
        <span style={{ fontSize: '11px', marginTop: '6px', fontWeight: '600' }}>Sign</span>
      </div>
      <div className="action-btn" style={{ background: '#f8fafc', border: '1px solid var(--line-light)' }}>
        <Users size={20} color="#8b5cf6" />
        <span style={{ fontSize: '11px', marginTop: '6px', fontWeight: '600' }}>Members</span>
      </div>
      <div className="action-btn" style={{ background: '#f8fafc', border: '1px solid var(--line-light)' }}>
        <Settings size={20} color="#64748b" />
        <span style={{ fontSize: '11px', marginTop: '6px', fontWeight: '600' }}>Manage</span>
      </div>
    </div>

    {/* Corporate Treasury Dashboard */}
    <div className="balance-card" style={{ background: '#fff', border: '1px solid var(--line-light)', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--muted-light)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Corporate Treasury</span>
        <span style={{ background: '#fef9c3', color: '#854d0e', fontSize: '10px', fontWeight: '700', padding: '3px 8px', borderRadius: '12px' }}>Multi-Sig Active (2/3)</span>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <Users size={18} color="var(--cyan-strong)" />
            <span style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>12 Employees</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileSignature size={18} color="#64748b" />
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#475569' }}>2 Pending Approvals</span>
          </div>
        </div>
        <div style={{ textAlign: 'right', borderLeft: '1px solid var(--line-light)', paddingLeft: '16px' }}>
          <div style={{ fontSize: '11px', color: 'var(--muted-light)', marginBottom: '4px' }}>Total Vault Assets</div>
          <div style={{ fontFamily: 'var(--heading-font)', fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>
            4,250,000 <span style={{ fontSize: '10px', color: 'var(--cyan-strong)' }}>FCUSD</span>
          </div>
        </div>
      </div>
    </div>

    {/* Pending Multi-Sig */}
    <div className="requests-section" style={{ marginTop: '10px' }}>
      <h3>Awaiting Your Signature</h3>
      <div className="request-item" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div>
            <div className="req-title">Infrastructure Payment</div>
            <div className="req-sub">AWS Hosting - May 2026</div>
          </div>
          <div style={{ fontSize: '15px', fontWeight: '700', color: '#ef4444' }}>-$4,200.00</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f1f5f9', padding: '8px 12px', borderRadius: '8px' }}>
          <div style={{ fontSize: '12px', color: '#475569' }}>Signatures: <strong style={{color: '#0f172a'}}>1/3</strong></div>
          <button style={{ padding: '6px 16px', borderRadius: '6px', background: 'var(--cyan-strong)', color: '#fff', fontSize: '12px', fontWeight: '600', border: 'none', cursor: 'pointer' }}>Review & Sign</button>
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
      {/* Header Container (Dark Theme) */}
      <div className="header-area" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Lion Watermark SVG */}
        <svg viewBox="0 0 200 200" style={{ position: 'absolute', top: '-10%', left: '-15%', width: '130%', height: '130%', opacity: 0.04, pointerEvents: 'none', fill: '#fff', zIndex: 0 }}>
          <path d="M100 10 L140 40 L160 30 L170 80 L140 110 L160 160 L100 190 L40 160 L60 110 L30 80 L40 30 L60 40 Z" />
          <path d="M100 30 L120 70 L80 70 Z M70 80 L130 80 L100 140 Z" opacity="0.4" />
        </svg>

        <div className="header-top" style={{ position: 'relative', zIndex: 1 }}>
          <div className="logo-container">
            <span>FUTURE</span>
            <span>CITIZEN</span>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div className="status-pill" onClick={() => setShowContextModal(true)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div className="status-dot" style={{ background: appMode === 'Citizen' ? 'var(--cyan-strong)' : '#f59e0b' }}></div>
              {appMode} Mode
              <ChevronDown size={14} color="#64748b" />
            </div>
            <QrCode size={20} color="#94a3b8" style={{ cursor: 'pointer' }} />
          </div>
        </div>
      </div>

      {/* Main Container (Light Theme) */}
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
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.6)', zIndex: 100, backdropFilter: 'blur(4px)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}
            onClick={() => setShowContextModal(false)}
          >
            <motion.div 
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{ background: '#fff', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}
              onClick={e => e.stopPropagation()}
            >
              <h3 style={{ margin: 0, color: '#0f172a', fontSize: '16px' }}>Select Active Context</h3>
              
              <div 
                onClick={() => { setAppMode('Citizen'); setShowContextModal(false); }}
                style={{ padding: '16px', borderRadius: '12px', border: appMode === 'Citizen' ? '2px solid var(--cyan-strong)' : '1px solid var(--line-light)', background: appMode === 'Citizen' ? '#f0f9ff' : '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}
              >
                <div style={{ background: appMode === 'Citizen' ? '#0284c7' : '#e2e8f0', color: '#fff', padding: '10px', borderRadius: '50%' }}><User size={20} /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '15px' }}>Amelia J. Thorne</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Personal Citizen Account</div>
                </div>
                {appMode === 'Citizen' && <CheckCircle2 size={20} color="var(--cyan-strong)" />}
              </div>

              <div 
                onClick={() => { setAppMode('Organization'); setShowContextModal(false); }}
                style={{ padding: '16px', borderRadius: '12px', border: appMode === 'Organization' ? '2px solid #f59e0b' : '1px solid var(--line-light)', background: appMode === 'Organization' ? '#fffbeb' : '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}
              >
                <div style={{ background: appMode === 'Organization' ? '#f59e0b' : '#e2e8f0', color: '#fff', padding: '10px', borderRadius: '50%' }}><Building2 size={20} /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '15px' }}>NexaCorp Ltd.</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>E-Company • Treasurer</div>
                </div>
                {appMode === 'Organization' && <CheckCircle2 size={20} color="#f59e0b" />}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Nav (Dark Theme) */}
      <div className="bottom-nav">
        <div className={`nav-item ${activeTab === 'Home' ? 'active' : ''}`} onClick={() => setActiveTab('Home')}>
          <Home size={22} strokeWidth={1.5} /> Home
        </div>
        <div className={`nav-item ${activeTab === 'Identity' ? 'active' : ''}`} onClick={() => setActiveTab('Identity')}>
          <IdCard size={22} strokeWidth={1.5} /> Identity
        </div>
        <div className={`nav-item ${activeTab === 'Pay' ? 'active' : ''}`} onClick={() => setActiveTab('Pay')}>
          <Wallet size={22} strokeWidth={1.5} /> Pay
        </div>
        <div className={`nav-item ${activeTab === 'Org' ? 'active' : ''}`} onClick={() => setActiveTab('Org')}>
          <Building2 size={22} strokeWidth={1.5} /> Org
        </div>
        <div className={`nav-item ${activeTab === 'Inbox' ? 'active' : ''}`} onClick={() => setActiveTab('Inbox')}>
          <Inbox size={22} strokeWidth={1.5} /> Inbox
        </div>
      </div>
    </div>
  );
}
