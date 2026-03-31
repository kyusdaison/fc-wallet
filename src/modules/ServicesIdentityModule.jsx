import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ArrowRightLeft, Building2, Calendar, Car, CheckCircle2, ChevronLeft, ChevronRight, Clock, CreditCard, Database, Download, Eye, EyeOff, FileText, Fingerprint, Globe, GraduationCap, Hash, Heart, Home as HomeIcon, IdCard, Landmark, Lock, Mail, MapPin, Phone, QrCode, Scan, Share2, Shield, ShieldCheck, Sparkles, Upload, User, Vote } from 'lucide-react';
import { CITIZEN_PROFILE } from '../data/mockData';

const ServicesModule = ({ onOpenBridge, onOpenGovernance }) => {
  const [serviceQuery, setServiceQuery] = useState('');
  const nftCollection = [
    { id: 'nft-1', name: 'FC Genesis Badge', collection: 'FC Authority', rarity: 'Legendary', image: null, color: '#D4AF37', bgGrad: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)' },
    { id: 'nft-2', name: 'Citizen ID #0042', collection: 'DID Collection', rarity: 'Unique', image: null, color: '#3b82f6', bgGrad: 'linear-gradient(135deg, #1e3a5f 0%, #3b82f6 100%)' },
    { id: 'nft-3', name: 'Vanguard Access', collection: 'Corp Tokens', rarity: 'Rare', image: null, color: 'var(--green)', bgGrad: 'linear-gradient(135deg, #064e3b 0%, #10b981 100%)' },
    { id: 'nft-4', name: 'ZKP Pioneer', collection: 'Achievement', rarity: 'Epic', image: null, color: '#8b5cf6', bgGrad: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)' },
  ];

  const bridgeChains = [
    { name: 'Ethereum', symbol: 'ETH', color: '#627EEA', icon: '◆' },
    { name: 'Bitcoin', symbol: 'BTC', color: '#F7931A', icon: '₿' },
    { name: 'Solana', symbol: 'SOL', color: '#14F195', icon: '◎' },
    { name: 'Polygon', symbol: 'MATIC', color: '#8247E5', icon: '⬡' },
  ];

  const rwaAssets = [
    { id: 'rwa-home', title: 'Primary Residence', subtitle: 'Deed #884-A • ZK-Verified', icon: <HomeIcon size={20} color="#93c5fd" />, status: 'Attested' },
    { id: 'rwa-car', title: 'Tesla Model S Plaid', subtitle: 'VIN 5YJSA... • Registration active', icon: <Car size={20} color="#6ee7b7" />, status: 'Active' },
  ];

  const appRegistry = [
    { id: 'explorer', title: 'FC Explorer', subtitle: 'Block explorer', icon: <Globe size={20} color="#93c5fd" />, tone: 'blue' },
    { id: 'registry', title: 'Corp Registry', subtitle: 'Business portal', icon: <Building2 size={20} color="#6ee7b7" />, tone: 'green' },
    { id: 'gov', title: 'Gov Portal', subtitle: 'Citizen services', icon: <Landmark size={20} color="#f5d46b" />, tone: 'gold' },
    { id: 'zkp', title: 'ZKP Studio', subtitle: 'Proof generator', icon: <ShieldCheck size={20} color="#c4b5fd" />, tone: 'purple' },
  ];

  const normalizedQuery = serviceQuery.trim().toLowerCase();
  const filteredApps = appRegistry.filter((app) => {
    if (!normalizedQuery) return true;
    return app.title.toLowerCase().includes(normalizedQuery) || app.subtitle.toLowerCase().includes(normalizedQuery);
  });

  const filteredNfts = nftCollection.filter((nft) => {
    if (!normalizedQuery) return true;
    return nft.name.toLowerCase().includes(normalizedQuery) || nft.collection.toLowerCase().includes(normalizedQuery) || nft.rarity.toLowerCase().includes(normalizedQuery);
  });

  const filteredChains = bridgeChains.filter((chain) => {
    if (!normalizedQuery) return true;
    return chain.name.toLowerCase().includes(normalizedQuery) || chain.symbol.toLowerCase().includes(normalizedQuery);
  });

  const filteredRwa = rwaAssets.filter((asset) => {
    if (!normalizedQuery) return true;
    return asset.title.toLowerCase().includes(normalizedQuery) || asset.subtitle.toLowerCase().includes(normalizedQuery);
  });

  return (
    <motion.div key="services" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="module-content services-shell" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="services-hero">
        <div className="services-hero-top">
          <div>
            <div className="services-hero-kicker">Discovery Hub</div>
            <div className="services-hero-title">Sovereign Services</div>
            <div className="services-hero-copy">Collectibles, bridges, real-world assets, and verified applications in one secure directory.</div>
          </div>
          <div className="services-hero-badge">
            <Sparkles size={14} />
            {normalizedQuery ? `${filteredNfts.length + filteredChains.length + filteredRwa.length + filteredApps.length} results` : `${nftCollection.length + appRegistry.length} active`}
          </div>
        </div>
        <div className="services-hero-metrics">
          <div className="services-hero-metric">
            <span>Collectibles</span>
            <strong>{nftCollection.length}</strong>
          </div>
          <div className="services-hero-metric">
            <span>Bridge Routes</span>
            <strong>{bridgeChains.length}</strong>
          </div>
          <div className="services-hero-metric">
            <span>Verified Apps</span>
            <strong>{appRegistry.length}</strong>
          </div>
        </div>
      </div>

      <div className="services-search-shell">
        <Sparkles size={18} color="#93c5fd" />
        <input
          type="text"
          value={serviceQuery}
          onChange={(event) => setServiceQuery(event.target.value)}
          placeholder="Search services, NFTs, bridges..."
          className="services-search-input"
        />
        <button type="button" className="services-search-btn">
          Search
        </button>
      </div>

      {(filteredNfts.length > 0 || !normalizedQuery) && (
        <div className="services-section-card">
          <div className="services-section-head">
            <div>
              <div className="section-title" style={{ margin: 0 }}>MY DIGITAL COLLECTIBLES</div>
              <div className="services-section-copy">Identity proofs, access badges, and sovereign achievements.</div>
            </div>
            <div className="services-section-count">{filteredNfts.length} items</div>
          </div>
          <div className="services-collectible-grid">
            {filteredNfts.map((nft) => (
              <button key={nft.id} type="button" className="services-collectible-card" style={{ background: nft.bgGrad }}>
                <div className="services-collectible-overlay"></div>
                <div className="services-collectible-top">
                  <div className="services-collectible-mark">
                    {nft.name.charAt(0)}{nft.name.charAt(nft.name.indexOf(' ') + 1)}
                  </div>
                  <div className="services-collectible-rarity" style={{ color: nft.color }}>{nft.rarity}</div>
                </div>
                <div className="services-collectible-title">{nft.name}</div>
                <div className="services-collectible-subtitle">{nft.collection}</div>
              </button>
            ))}
          </div>
          {filteredNfts.length === 0 && normalizedQuery && (
            <div className="services-empty-state compact">No collectibles match your search.</div>
          )}
        </div>
      )}

      {(filteredChains.length > 0 || !normalizedQuery) && (
        <div className="services-bridge-card">
          <div className="services-section-head">
            <div>
              <div className="section-title" style={{ margin: 0 }}>CROSS-CHAIN BRIDGE</div>
              <div className="services-section-copy">Move sovereign assets across approved liquidity routes.</div>
            </div>
            <div className="services-bridge-icon">
              <ArrowRightLeft size={20} color="#93c5fd" />
            </div>
          </div>

          <div className="services-bridge-grid">
            {filteredChains.map((chain) => (
              <div key={chain.symbol} className="services-bridge-pill">
                <div className="services-bridge-glyph">{chain.icon}</div>
                <div className="services-bridge-symbol" style={{ color: chain.color }}>{chain.symbol}</div>
                <div className="services-bridge-name">{chain.name}</div>
              </div>
            ))}
          </div>

          <button type="button" className="services-primary-btn" onClick={onOpenBridge}>
            <ArrowRightLeft size={18} />
            Start Bridge Transfer
          </button>
        </div>
      )}

      {(filteredRwa.length > 0 || !normalizedQuery) && (
        <div className="services-section-card">
          <div className="services-section-head">
            <div>
              <div className="section-title" style={{ margin: 0 }}>RWA REGISTRY</div>
              <div className="services-section-copy">Physical assets linked to verified ownership proofs.</div>
            </div>
            <div className="services-section-count">{filteredRwa.length} attested</div>
          </div>
          <div className="services-registry-list">
            {filteredRwa.map((asset) => (
              <div key={asset.id} className="services-registry-row">
                <div className="services-registry-icon">{asset.icon}</div>
                <div className="services-registry-copy">
                  <div className="services-registry-title">{asset.title}</div>
                  <div className="services-registry-subtitle">{asset.subtitle}</div>
                </div>
                <div className="services-registry-status">
                  <CheckCircle2 size={14} />
                  {asset.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <button type="button" className="services-governance-card" onClick={onOpenGovernance}>
        <div className="services-governance-top">
          <div className="services-governance-icon">
            <Vote size={22} color="#c4b5fd" />
          </div>
          <div className="services-governance-copy">
            <div className="services-governance-title">Citizen Governance</div>
            <div className="services-governance-subtitle">3 active proposals awaiting your vote</div>
          </div>
          <ChevronRight size={20} color="var(--text-tertiary)" />
        </div>
        <div className="services-governance-stats">
          <div className="services-governance-stat">
            <span>Your Power</span>
            <strong>1,250 FCC</strong>
          </div>
          <div className="services-governance-stat">
            <span>Participation</span>
            <strong>87%</strong>
          </div>
          <div className="services-governance-stat">
            <span>Last Vote</span>
            <strong>3 days ago</strong>
          </div>
        </div>
      </button>

      <div className="services-section-card">
        <div className="services-section-head">
          <div>
            <div className="section-title" style={{ margin: 0 }}>VERIFIED APPLICATIONS</div>
            <div className="services-section-copy">Only trusted portals and proof-enabled services appear here.</div>
          </div>
          <div className="services-section-count">{filteredApps.length} shown</div>
        </div>
        <div className="services-app-grid">
          {filteredApps.map((app) => (
            <button key={app.id} type="button" className={`services-app-card ${app.tone}`}>
              <div className="services-app-icon">{app.icon}</div>
              <div className="services-app-title">{app.title}</div>
              <div className="services-app-subtitle">{app.subtitle}</div>
            </button>
          ))}
          {filteredApps.length === 0 ? (
            <div className="services-empty-state">
              <Sparkles size={26} color="#93c5fd" />
              <div className="services-empty-title">No matches</div>
              <div className="services-empty-copy">Try another keyword for apps or services.</div>
            </div>
          ) : null}
        </div>
      </div>
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
