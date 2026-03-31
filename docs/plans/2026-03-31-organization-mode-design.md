# Organization Mode — Full Design Specification

**Date:** 2026-03-31
**Status:** Approved
**Author:** Kyus Daison / Claude

---

## Overview

Organization Mode transforms the FC Wallet from a personal sovereign identity wallet into an enterprise command center. When a user switches to Organization mode via the context switcher, ALL five tabs render enterprise-specific content while sharing the same navigation structure.

## Visual Differentiation

- **Gold accent theme** throughout Organization mode
- Header status pill shows "ORG MODE" with gold styling
- Gold borders, gradients, and icon tints on hero cards
- Nav icons use gold active state instead of blue

## Tab Architecture

### Tab 1: Home → Enterprise Command Center
- **OrgIdentitySummary** card (gold themed, entity name, ID, approval policy, operator seats)
- **Quick Actions**: Approvals, Swap, Members, Policies (gold-tinted)
- **Treasury Hero**: $4.25M total across Operating ($1.8M), Payroll ($1.5M), Reserve ($0.95M) vaults
- **Approval Flow**: Pending multi-sig card with signature progress
- **Ops Dashboard**: Signer coverage, reserve health cards

### Tab 2: Services → Enterprise Registry
- **Company Charter NFT** card with incorporation details
- **Equity Structure**: Shareholder visualization with ownership percentages
- **Revenue & Profit-Sharing**: Recent distribution records
- **Enterprise Credentials**: Business licenses, tax certificates, compliance docs
- **Enterprise Apps**: Corp-specific verified applications

### Tab 3: QR (Scanner) → Enterprise QR
- Entity identity QR code for B2B interactions
- Same scanner overlay, but org-branded

### Tab 4: Comms → Enterprise Communications
Three sub-tabs:
- **Chats**: Enterprise-identity DIDComm messaging. Company name as sender identity. Embedded payment capability. Internal operator tracking.
- **Approvals**: Multi-sig approval queue with Urgent/Pending/Completed filters. Each card shows amount, signers, deadline.
- **Alerts**: Compliance notifications, audit events, system alerts with severity levels.

### Tab 5: Settings → Organization Settings
- **Signing Policy Panel**: Configure thresholds per operation type
- **Employee/Role Management**: Operators list with roles and permissions
- **Vault Rules**: Spending limits, time locks, whitelists per vault
- **Enterprise Security**: Audit log, compliance settings, entity recovery

## Mock Data Expansion

New data constants in `mockData.js`:
- `ORG_MEMBERS` — 5 team members with roles, signing authority
- `ORG_TREASURY` — Vault breakdown with balances
- `ORG_APPROVALS` — 4 pending/completed approval items
- `ORG_CHARTER` — Company registration details
- `ORG_EQUITY` — Shareholder structure
- `ORG_REVENUE` — Revenue distribution records
- `ORG_CREDENTIALS` — Enterprise documents/certificates
- `ORG_CHAT_CONTACTS` — B2B and internal contacts
- `ORG_ALERTS` — Enterprise notifications
- `ORG_AUDIT_LOG` — Recent audit events

## New Module Files

1. `src/modules/OrgServicesModule.jsx` — Enterprise Registry tab
2. `src/modules/OrgCommsModule.jsx` — Enterprise Communications (Chats + Approvals + Alerts)
3. `src/modules/OrgSettingsModule.jsx` — Organization Settings
4. `src/modules/OrgIdentityModule.jsx` — Enterprise Identity (entity profile, members, credentials)

## Routing Changes in App.jsx

Lines 808-814 updated to check `appMode` for all tabs:
```
{activeTab === 'Home' && appMode === 'Citizen' && <HomeModule ... />}
{activeTab === 'Home' && appMode === 'Organization' && <OrgHomeModule ... />}
{activeTab === 'Identity' && appMode === 'Citizen' && <IdentityModule ... />}
{activeTab === 'Identity' && appMode === 'Organization' && <OrgIdentityModule ... />}
{activeTab === 'Services' && appMode === 'Citizen' && <ServicesModule ... />}
{activeTab === 'Services' && appMode === 'Organization' && <OrgServicesModule ... />}
{activeTab === 'Settings' && appMode === 'Citizen' && <SettingsModule ... />}
{activeTab === 'Settings' && appMode === 'Organization' && <OrgSettingsModule ... />}
{activeTab === 'Chats' && appMode === 'Citizen' && <ChatsModule ... />}
{activeTab === 'Chats' && appMode === 'Organization' && <OrgCommsModule ... />}
{activeTab === 'Alerts' && appMode === 'Citizen' && <AlertsModule />}
{activeTab === 'Alerts' && appMode === 'Organization' && <OrgCommsModule tab="alerts" />}
```
