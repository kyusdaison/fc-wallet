import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ArrowRightLeft, Building2, Calendar, Car, CheckCircle2, ChevronLeft, ChevronRight, Clock, CreditCard, Database, Download, Eye, EyeOff, FileText, Fingerprint, Globe, GraduationCap, Hash, Heart, Home as HomeIcon, IdCard, Landmark, Lock, Mail, MapPin, Phone, QrCode, Scan, Search, Share2, Shield, ShieldCheck, Sparkles, Upload, User, Vote } from 'lucide-react';
import { CITIZEN_PROFILE } from '../data/mockData';

const ServicesModule = ({ onOpenBridge, onOpenGovernance }) => {
  const [serviceQuery, setServiceQuery] = useState('');

  /* ---- Government Services ---- */
  const govServices = [
    { id: 'governance', title: 'Governance', subtitle: '3 active proposals', icon: <Vote size={18} color="#c4b5fd" />, tone: 'purple', badge: '3', action: onOpenGovernance },
    { id: 'gov-portal', title: 'Gov Portal', subtitle: 'Citizen services', icon: <Landmark size={18} color="#f5d46b" />, tone: 'gold' },
    { id: 'tax', title: 'Tax & Revenue', subtitle: 'Filing & compliance', icon: <FileText size={18} color="#93c5fd" />, tone: 'blue' },
    { id: 'immigration', title: 'Immigration', subtitle: 'Visa & residency', icon: <Globe size={18} color="#6ee7b7" />, tone: 'green' },
    { id: 'registry', title: 'Corp Registry', subtitle: 'Business portal', icon: <Building2 size={18} color="#6ee7b7" />, tone: 'green' },
    { id: 'legal', title: 'Legal Aid', subtitle: 'Dispute resolution', icon: <Shield size={18} color="#fca5a5" />, tone: 'red' },
  ];

  /* ---- Financial Services ---- */
  const finServices = [
    { id: 'bridge', title: 'Cross-Chain Bridge', subtitle: '4 routes active', icon: <ArrowRightLeft size={18} color="#93c5fd" />, tone: 'blue', action: onOpenBridge },
    { id: 'explorer', title: 'FC Explorer', subtitle: 'Block explorer', icon: <Globe size={18} color="#93c5fd" />, tone: 'blue' },
    { id: 'zkp', title: 'ZKP Studio', subtitle: 'Proof generator', icon: <ShieldCheck size={18} color="#c4b5fd" />, tone: 'purple' },
    { id: 'lending', title: 'Sovereign Lending', subtitle: 'Collateral loans', icon: <CreditCard size={18} color="#f5d46b" />, tone: 'gold' },
  ];

  /* ---- Digital Assets / Collectibles ---- */
  const digitalAssets = [
    { id: 'nft-1', name: 'FC Genesis Badge', collection: 'FC Authority', rarity: 'Legendary', color: '#D4AF37', bgGrad: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)' },
    { id: 'nft-2', name: 'Citizen ID #0042', collection: 'DID Collection', rarity: 'Unique', color: '#3b82f6', bgGrad: 'linear-gradient(135deg, #1e3a5f 0%, #3b82f6 100%)' },
    { id: 'nft-3', name: 'Vanguard Access', collection: 'Corp Tokens', rarity: 'Rare', color: 'var(--green)', bgGrad: 'linear-gradient(135deg, #064e3b 0%, #10b981 100%)' },
    { id: 'nft-4', name: 'ZKP Pioneer', collection: 'Achievement', rarity: 'Epic', color: '#8b5cf6', bgGrad: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)' },
  ];

  /* ---- RWA Assets ---- */
  const rwaAssets = [
    { id: 'rwa-home', title: 'Primary Residence', subtitle: 'Deed #884-A · ZK-Verified', icon: <HomeIcon size={16} color="#93c5fd" />, status: 'Attested' },
    { id: 'rwa-car', title: 'Tesla Model S Plaid', subtitle: 'VIN 5YJSA · Registration active', icon: <Car size={16} color="#6ee7b7" />, status: 'Active' },
  ];

  /* ---- Search ---- */
  const q = serviceQuery.trim().toLowerCase();
  const matchGov = govServices.filter(s => !q || s.title.toLowerCase().includes(q) || s.subtitle.toLowerCase().includes(q));
  const matchFin = finServices.filter(s => !q || s.title.toLowerCase().includes(q) || s.subtitle.toLowerCase().includes(q));
  const matchNft = digitalAssets.filter(a => !q || a.name.toLowerCase().includes(q) || a.collection.toLowerCase().includes(q));
  const matchRwa = rwaAssets.filter(a => !q || a.title.toLowerCase().includes(q));
  const totalResults = matchGov.length + matchFin.length + matchNft.length + matchRwa.length;

  return (
    <motion.div key="services" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="module-content" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

      {/* Compact Header */}
      <div className="svc-header">
        <div>
          <div className="svc-header-title">Services</div>
          <div className="svc-header-subtitle">Sovereign service hub · {govServices.length + finServices.length} services</div>
        </div>
        <div className="svc-header-badge">
          <Sparkles size={12} />
          {q ? `${totalResults} found` : 'All active'}
        </div>
      </div>

      {/* Search */}
      <div className="svc-search">
        <Search size={16} color="var(--text-muted)" />
        <input type="text" value={serviceQuery} onChange={e => setServiceQuery(e.target.value)} placeholder="Search services..." className="svc-search-input" />
      </div>

      {/* ========== SECTION 1: Government Services ========== */}
      {matchGov.length > 0 && (
        <div className="svc-section">
          <div className="section-title">GOVERNMENT SERVICES</div>
          <div className="svc-list">
            {matchGov.map(svc => (
              <button key={svc.id} type="button" className="svc-row" onClick={svc.action || undefined}>
                <div className={`svc-row-icon ${svc.tone}`}>{svc.icon}</div>
                <div className="svc-row-copy">
                  <div className="svc-row-title">{svc.title}</div>
                  <div className="svc-row-sub">{svc.subtitle}</div>
                </div>
                {svc.badge && <span className="svc-row-badge">{svc.badge}</span>}
                <ChevronRight size={16} color="var(--text-tertiary)" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ========== SECTION 2: Financial Services ========== */}
      {matchFin.length > 0 && (
        <div className="svc-section">
          <div className="section-title">FINANCIAL SERVICES</div>
          <div className="svc-grid">
            {matchFin.map(svc => (
              <button key={svc.id} type="button" className={`svc-card ${svc.tone}`} onClick={svc.action || undefined}>
                <div className="svc-card-icon">{svc.icon}</div>
                <div className="svc-card-title">{svc.title}</div>
                <div className="svc-card-sub">{svc.subtitle}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ========== SECTION 3: Digital Assets & RWA ========== */}
      {(matchNft.length > 0 || matchRwa.length > 0) && (
        <div className="svc-section">
          <div className="section-title">DIGITAL ASSETS</div>

          {/* NFT / Badge Scroll Strip */}
          {matchNft.length > 0 && (
            <div className="svc-nft-strip">
              {matchNft.map(nft => (
                <button key={nft.id} type="button" className="svc-nft-card" style={{ background: nft.bgGrad }}>
                  <div className="svc-nft-overlay"></div>
                  <div className="svc-nft-top">
                    <span className="svc-nft-mark">{nft.name.charAt(0)}{nft.name.charAt(nft.name.indexOf(' ') + 1)}</span>
                    <span className="svc-nft-rarity" style={{ color: nft.color }}>{nft.rarity}</span>
                  </div>
                  <div className="svc-nft-name">{nft.name}</div>
                  <div className="svc-nft-col">{nft.collection}</div>
                </button>
              ))}
            </div>
          )}

          {/* RWA Compact List */}
          {matchRwa.length > 0 && (
            <div className="svc-rwa-list">
              {matchRwa.map(asset => (
                <div key={asset.id} className="svc-rwa-row">
                  <div className="svc-rwa-icon">{asset.icon}</div>
                  <div className="svc-rwa-copy">
                    <div className="svc-rwa-title">{asset.title}</div>
                    <div className="svc-rwa-sub">{asset.subtitle}</div>
                  </div>
                  <div className="svc-rwa-status"><CheckCircle2 size={12} />{asset.status}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {q && totalResults === 0 && (
        <div className="svc-empty">
          <Sparkles size={24} color="#93c5fd" />
          <span>No services match your search.</span>
        </div>
      )}
    </motion.div>
  );
};

const IdentityModule = ({ onOpenZkp }) => {
  const [identityView, setIdentityView] = useState('main'); // main, docDetail
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [revealedFields, setRevealedFields] = useState(new Set());
  const [identityTab, setIdentityTab] = useState('documents'); // documents, personal, history

  const toggleReveal = (fieldId) => {
    setRevealedFields(prev => {
      const next = new Set(prev);
      if (next.has(fieldId)) next.delete(fieldId);
      else next.add(fieldId);
      return next;
    });
  };

  const documents = [
    { id: 'national-id', type: 'National ID', issuer: 'FC Authority', status: 'verified', expiry: '2032-08-15', icon: <IdCard size={22} color="#fff" />, gradient: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)', accent: '#d4af37', number: 'FC-2026-8847-1203', issuedDate: '2022-08-15' },
    { id: 'drivers-license', type: "Driver's License", issuer: 'Dept. of Transport', status: 'verified', expiry: '2029-03-22', icon: <Car size={22} color="#fff" />, gradient: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)', accent: '#93c5fd', number: 'DL-7741-9920', issuedDate: '2021-03-22', class: 'Class B' },
    { id: 'education', type: 'Education Certificate', issuer: 'MIT University', status: 'verified', expiry: null, icon: <GraduationCap size={22} color="#fff" />, gradient: 'linear-gradient(135deg, #5b21b6 0%, #7c3aed 100%)', accent: '#c4b5fd', number: 'EDU-MIT-2020-4481', issuedDate: '2020-06-15', degree: 'M.S. Computer Science' },
    { id: 'insurance', type: 'Health Insurance', issuer: 'FC National Health', status: 'verified', expiry: '2027-01-01', icon: <Heart size={22} color="#fff" />, gradient: 'linear-gradient(135deg, #065f46 0%, #10b981 100%)', accent: '#6ee7b7', number: 'INS-NH-884712', issuedDate: '2024-01-01', plan: 'Premium Plus' },
    { id: 'bank-card', type: 'Bank Account', issuer: 'FC Central Bank', status: 'verified', expiry: '2030-12-31', icon: <CreditCard size={22} color="#fff" />, gradient: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)', accent: '#fbbf24', number: '•••• •••• •••• 4829', issuedDate: '2023-05-10', bankName: 'FC Central' },
    { id: 'tax-id', type: 'Tax ID (TIN)', issuer: 'Federal Revenue', status: 'pending', expiry: null, icon: <Hash size={22} color="#fff" />, gradient: 'linear-gradient(135deg, #991b1b 0%, #dc2626 100%)', accent: '#fca5a5', number: 'TIN-***-**-8834', issuedDate: '2019-04-01' },
  ];

  const personalInfo = [
    { id: 'full-name', label: 'Full Legal Name', value: 'Amelia Josephine Thorne', masked: 'A**** J. T*****', icon: <User size={16} color="var(--blue)" /> },
    { id: 'dob', label: 'Date of Birth', value: 'August 15, 1994', masked: '****-**-15', icon: <Calendar size={16} color="var(--purple)" /> },
    { id: 'gender', label: 'Gender', value: 'Female', masked: '••••••', icon: <User size={16} color="var(--text-tertiary)" /> },
    { id: 'nationality', label: 'Nationality', value: 'Future Citizen', masked: 'F***** C*****', icon: <Globe size={16} color="var(--navy)" /> },
    { id: 'address', label: 'Home Address', value: '42 Sovereign Lane, Block 7\nDistrict 12, FC Capital 90210', masked: '•• S******** Ln, Block *\nDistrict **, FC Capital *****', icon: <MapPin size={16} color="var(--green)" /> },
    { id: 'email', label: 'Email Address', value: 'amelia.thorne@fc-citizen.id', masked: 'a****@fc-******.id', icon: <Mail size={16} color="var(--blue)" /> },
    { id: 'phone', label: 'Phone Number', value: '+1 (555) 842-4567', masked: '+1 (***) ***-4567', icon: <Phone size={16} color="var(--green)" /> },
    { id: 'tin', label: 'Tax ID (TIN)', value: '334-82-8834', masked: '***-**-8834', icon: <Hash size={16} color="var(--red)" /> },
    { id: 'ssn', label: 'Social Security No.', value: '198-44-5678', masked: '***-**-5678', icon: <Shield size={16} color="var(--navy)" /> },
  ];

  const verificationHistory = [
    { action: 'Biometric Re-verified', time: '2 hours ago', type: 'success', detail: 'FaceID + Retinal' },
    { action: 'Insurance Card Updated', time: 'Yesterday', type: 'success', detail: 'Premium Plus renewal' },
    { action: 'Address Proof Submitted', time: '3 days ago', type: 'success', detail: 'Utility bill ZKP' },
    { action: 'Tax ID Verification', time: '1 week ago', type: 'pending', detail: 'Awaiting IRS confirmation' },
    { action: 'National ID Issued', time: '2 weeks ago', type: 'success', detail: 'FC Authority' },
  ];

  const verifiedCount = documents.filter((doc) => doc.status === 'verified').length;
  // const pendingCount = documents.filter((doc) => doc.status === 'pending').length;
  const protectedFieldCount = personalInfo.length;

  // Document Detail View
  if (identityView === 'docDetail' && selectedDoc) {
    const doc = documents.find((entry) => entry.id === selectedDoc);
    if (!doc) return null;

    const detailRows = [
      { label: 'Document Type', value: doc.type },
      { label: 'Issuing Authority', value: doc.issuer },
      { label: 'Document Number', value: doc.number },
      { label: 'Date Issued', value: doc.issuedDate },
      ...(doc.expiry ? [{ label: 'Expiry Date', value: doc.expiry }] : []),
      ...(doc.degree ? [{ label: 'Degree', value: doc.degree }] : []),
      ...(doc.class ? [{ label: 'License Class', value: doc.class }] : []),
      ...(doc.plan ? [{ label: 'Plan', value: doc.plan }] : []),
      ...(doc.bankName ? [{ label: 'Bank', value: doc.bankName }] : []),
    ];

    return (
      <motion.div key="doc-detail" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="module-content identity-shell" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <button type="button" className="identity-back-link" onClick={() => { setIdentityView('main'); setSelectedDoc(null); }}>
          <ChevronLeft size={20} strokeWidth={2.5} />
          Back to Identity Vault
        </button>

        <div className="identity-doc-hero" style={{ background: doc.gradient }}>
          <div className="identity-doc-hero-glow top"></div>
          <div className="identity-doc-hero-glow bottom"></div>

          <div className="identity-doc-hero-top">
            <div className="identity-doc-hero-copy">
              <div className="identity-doc-hero-icon">{doc.icon}</div>
              <div>
                <div className="identity-doc-hero-title">{doc.type}</div>
                <div className="identity-doc-hero-subtitle">{doc.issuer}</div>
              </div>
            </div>
            <div className={`identity-doc-chip ${doc.status}`}>
              {doc.status === 'verified' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
              {doc.status}
            </div>
          </div>

          <div className="identity-doc-number-label">Document Number</div>
          <div className="identity-doc-number">{doc.number}</div>
          <div className="identity-doc-accent" style={{ background: `linear-gradient(90deg, transparent, ${doc.accent}, transparent)` }}></div>
        </div>

        <div className="identity-section-shell">
          <div className="identity-section-head">
            <div>
              <div className="section-title">DOCUMENT DETAILS</div>
              <div className="identity-section-copy">Issued fields and attested metadata for selective disclosure.</div>
            </div>
          </div>

          <div className="identity-detail-list">
            {detailRows.map((item, index) => (
              <div key={item.label} className="identity-detail-row">
                <span className="identity-detail-label">{item.label}</span>
                <span className="identity-detail-value">{item.value}</span>
                {index < detailRows.length - 1 ? <div className="identity-detail-divider"></div> : null}
              </div>
            ))}
          </div>
        </div>

        <div className="identity-dual-actions">
          <button type="button" className="identity-detail-action" onClick={() => onOpenZkp({ id: 'zkp-1', entity: doc.issuer })}>
            <div className="identity-detail-action-icon share"><Share2 size={18} color="var(--blue)" /></div>
            <div>
              <div className="identity-detail-action-title">Share via ZKP</div>
              <div className="identity-detail-action-copy">Selective disclosure request</div>
            </div>
          </button>

          <button type="button" className="identity-detail-action">
            <div className="identity-detail-action-icon export"><Download size={18} color="var(--green)" /></div>
            <div>
              <div className="identity-detail-action-title">Export Backup</div>
              <div className="identity-detail-action-copy">Encrypted local archive</div>
            </div>
          </button>
        </div>

        <div className="identity-attestation-card">
          <div className="identity-attestation-icon"><Database size={18} color="#93c5fd" /></div>
          <div className="identity-attestation-copy">
            <div className="identity-attestation-title">On-Chain Attestation</div>
            <div className="identity-attestation-meta">0x7f3a...c8d2 • Block #4,821,003</div>
          </div>
          <CheckCircle2 size={18} color="var(--green)" />
        </div>
      </motion.div>
    );
  }

  // Main Identity View
  return (
    <motion.div key="identity" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="module-content identity-shell" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

      {/* === Sovereign ID Card === */}
      <div className="id-card">
        <div className="id-card-glow"></div>
        <div className="id-card-header">
          <div className="id-card-issuer">
            <ShieldCheck size={12} color="var(--gold)" />
            <span>FUTURE CITIZEN AUTHORITY</span>
          </div>
          <div className="id-card-trust">
            <span className="id-card-trust-dot"></span>
            L3
          </div>
        </div>

        <div className="id-card-body">
          <div className="id-card-photo-wrap">
            <img src={CITIZEN_PROFILE.avatar} alt={CITIZEN_PROFILE.name} className="id-card-photo" />
            <div className="id-card-photo-badge">
              <CheckCircle2 size={10} color="var(--green)" strokeWidth={3} />
            </div>
          </div>
          <div className="id-card-info">
            <div className="id-card-name">{CITIZEN_PROFILE.name}</div>
            <div className="id-card-did">{CITIZEN_PROFILE.did}</div>
            <div className="id-card-meta-row">
              <span className="id-card-meta"><Fingerprint size={11} /> Biometric Active</span>
              <span className="id-card-meta"><Shield size={11} /> {verifiedCount} Docs</span>
            </div>
          </div>
        </div>

        <div className="id-card-footer">
          <div className="id-card-stat">
            <span>Trust</span>
            <strong>{CITIZEN_PROFILE.trustLevel}</strong>
          </div>
          <div className="id-card-stat-divider"></div>
          <div className="id-card-stat">
            <span>Fields</span>
            <strong>{protectedFieldCount} protected</strong>
          </div>
          <div className="id-card-stat-divider"></div>
          <div className="id-card-stat">
            <span>Biometric</span>
            <strong>{verificationHistory[0].time}</strong>
          </div>
        </div>
      </div>

      {/* === Auth Request (compact) === */}
      <button type="button" className="identity-auth-banner compact" onClick={() => onOpenZkp({ id: 'zkp-1', entity: 'MetaAuth Protocol' })}>
        <div className="identity-auth-icon compact">
          <ShieldCheck size={18} color="#93c5fd" />
        </div>
        <div className="identity-auth-copy">
          <div className="identity-auth-title">Auth Request Pending</div>
          <div className="identity-auth-subtitle">MetaAuth Protocol requesting selective proof.</div>
        </div>
        <div className="identity-auth-status">Review</div>
      </button>

      {/* === Quick Actions (compact) === */}
      <div className="id-action-strip">
        <button type="button" className="id-action-chip" onClick={() => onOpenZkp({ id: 'zkp-1', entity: 'Verification Relay' })}>
          <Fingerprint size={16} color="#93c5fd" />
          Verify
        </button>
        <button type="button" className="id-action-chip" onClick={() => setIdentityTab('personal')}>
          <QrCode size={16} color="#c4b5fd" />
          Share
        </button>
        <button type="button" className="id-action-chip" onClick={() => setIdentityTab('documents')}>
          <Scan size={16} color="#6ee7b7" />
          Scan
        </button>
        <button type="button" className="id-action-chip" onClick={() => setIdentityTab('documents')}>
          <Upload size={16} color="#f5d46b" />
          Add
        </button>
      </div>

      <div className="identity-tab-row">
        {[
          { key: 'documents', label: 'Documents' },
          { key: 'personal', label: 'Personal Info' },
          { key: 'history', label: 'Activity' },
        ].map((tab) => (
          <button key={tab.key} type="button" className={`identity-tab-btn ${identityTab === tab.key ? 'active' : ''}`} onClick={() => setIdentityTab(tab.key)}>
            {tab.label}
          </button>
        ))}
      </div>

      {identityTab === 'documents' && (
        <div className="identity-section-shell compact">
          <div className="identity-section-head compact">
            <div>
              <div className="section-title">DIGITAL DOCUMENT VAULT</div>
              <div className="identity-section-copy">Tap any credential to view details and export options.</div>
            </div>
            <div className="identity-section-badge compact">{verifiedCount}/{documents.length}</div>
          </div>

          <div className="identity-doc-grid compact">
            {documents.map((doc, index) => (
              <button
                key={doc.id}
                type="button"
                className="identity-doc-card compact"
                style={{ background: doc.gradient, animationDelay: `${index * 0.04}s` }}
                onClick={() => { setSelectedDoc(doc.id); setIdentityView('docDetail'); }}
              >
                <div className="identity-doc-card-glow"></div>
                <div className="identity-doc-card-top compact">
                  <div className="identity-doc-card-icon compact">{React.cloneElement(doc.icon, { size: 16 })}</div>
                  <div className={`identity-doc-status compact ${doc.status}`}>
                    {doc.status === 'verified' ? <CheckCircle2 size={8} /> : <Clock size={8} />}
                  </div>
                </div>
                <div className="identity-doc-card-title compact">{doc.type}</div>
                <div className="identity-doc-card-issuer compact">{doc.issuer}</div>
                <div className="identity-doc-card-accent" style={{ background: `linear-gradient(90deg, ${doc.accent}, transparent)` }}></div>
              </button>
            ))}

            <button type="button" className="identity-doc-add compact">
              <Upload size={16} />
              <span>Add Document</span>
            </button>
          </div>
        </div>
      )}

      {identityTab === 'personal' && (
        <div className="identity-section-shell compact">
          <div className="identity-section-head compact">
            <div>
              <div className="section-title">PERSONAL INFORMATION</div>
              <div className="identity-section-copy">Tap the eye icon to reveal fields locally.</div>
            </div>
            <div className="identity-section-badge compact blue">
              <Lock size={10} />
              ZKP
            </div>
          </div>

          <div className="identity-protection-banner compact">
            <ShieldCheck size={16} color="#93c5fd" />
            <div>
              <div className="identity-protection-title compact">Zero-Knowledge Protected</div>
              <div className="identity-protection-copy">Fields are encrypted and only revealed on this device.</div>
            </div>
          </div>

          <div className="identity-personal-stack compact">
            {personalInfo.map((field, index) => (
              <div key={field.id} className="identity-personal-row compact">
                <div className="identity-personal-icon compact">{React.cloneElement(field.icon, { size: 14 })}</div>
                <div className="identity-personal-copy">
                  <div className="identity-personal-label">{field.label}</div>
                  <div className={`identity-personal-value compact ${revealedFields.has(field.id) ? 'revealed' : 'masked'}`}>
                    {revealedFields.has(field.id) ? field.value : field.masked}
                  </div>
                </div>
                <button type="button" className="identity-visibility-btn compact" onClick={() => toggleReveal(field.id)}>
                  {revealedFields.has(field.id) ? <EyeOff size={14} color="#93c5fd" /> : <Eye size={14} color="#8b96ac" />}
                </button>
                {index < personalInfo.length - 1 ? <div className="identity-personal-divider"></div> : null}
              </div>
            ))}
          </div>

          <div className="identity-bulk-actions compact">
            <button type="button" className="identity-bulk-btn primary compact" onClick={() => setRevealedFields(new Set(personalInfo.map((field) => field.id)))}>
              <Eye size={14} />
              Reveal All
            </button>
            <button type="button" className="identity-bulk-btn secondary compact" onClick={() => setRevealedFields(new Set())}>
              <EyeOff size={14} />
              Hide All
            </button>
          </div>
        </div>
      )}

      {identityTab === 'history' && (
        <div className="identity-section-shell compact">
          <div className="identity-section-head compact">
            <div>
              <div className="section-title">VERIFICATION ACTIVITY</div>
              <div className="identity-section-copy">Biometric checks, document refreshes, and trust events.</div>
            </div>
            <div className="identity-section-badge compact">{verificationHistory.length} events</div>
          </div>

          <div className="identity-history-list compact">
            {verificationHistory.map((item) => (
              <div key={`${item.action}-${item.time}`} className="identity-history-row compact">
                <div className={`identity-history-marker compact ${item.type}`}>
                  {item.type === 'success' ? <CheckCircle2 size={12} color="var(--green)" /> : <Clock size={12} color="#f5d46b" />}
                </div>
                <div className="identity-history-copy">
                  <div className="identity-history-title compact">{item.action}</div>
                  <div className="identity-history-detail">{item.detail}</div>
                </div>
                <div className="identity-history-time compact">
                  <span>{item.time}</span>
                  <small>{item.type === 'success' ? 'Confirmed' : 'Pending'}</small>
                </div>
              </div>
            ))}
          </div>

          <button type="button" className="identity-export-row compact">
            <div className="identity-export-icon compact"><FileText size={15} color="#93c5fd" /></div>
            <div className="identity-export-copy">
              <div className="identity-export-title compact">Export Verification Log</div>
              <div className="identity-export-subtitle">Encrypted PDF for audit trails.</div>
            </div>
            <ChevronRight size={16} color="#7c879f" />
          </button>
        </div>
      )}

      <div className="identity-credential-card compact">
        <div className="identity-credential-icon compact">
          <Landmark size={16} color="#93c5fd" />
        </div>
        <div className="identity-credential-copy">
          <div className="identity-credential-title compact">National KYC Level 3</div>
          <div className="identity-credential-subtitle">FCA Core Auth</div>
        </div>
        <CheckCircle2 size={18} color="var(--green)" />
      </div>
    </motion.div>
  );
};

export { ServicesModule, IdentityModule };
