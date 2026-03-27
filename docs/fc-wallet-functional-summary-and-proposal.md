# FC Wallet Functional Summary and Product Proposal

## 1. Product Conclusion

`FC Wallet` should be positioned as the main operating interface of the `Future Citizen` system.

It is not only:

- a crypto wallet
- a DID wallet
- a payments app

It is a combined portal for:

- identity
- credentials
- assets
- payments
- recovery
- organization
- communication
- governance

In one sentence:

`FC Wallet` is a sovereign identity and operations wallet for future citizens.

## 2. Functional Summary

### 2.1 Identity Layer

This is the first-priority foundation of the product.

Core capabilities:

- `FCDID` creation and management
- `did:fc` identity support
- `FNS` human-readable naming such as `name.fc`
- binding with national `Digital ID`
- identity status and trust-level display
- login and routing for apps and secure messaging

User meaning:

- the wallet is the user's digital citizenship entry
- identity is more important than a raw wallet address

### 2.2 Credential and Privacy Layer

This is the trust surface of the product.

Core capabilities:

- `VC` credential storage
- issuer and credential verification
- proof requests
- `ZKP` selective disclosure
- privacy-preserving proofs such as "adult" without exposing birthdate

User meaning:

- users can prove facts without oversharing data
- the wallet becomes a privacy-preserving identity carrier

### 2.3 Security and Recovery Layer

This is the confidence layer of the product.

Core capabilities:

- `MPC` account architecture
- no seed phrase experience
- shard-based recovery
- identity-based recovery using `Digital ID`
- recovery readiness and device security management

User meaning:

- the wallet should feel safer than normal self-custody wallets
- recovery should feel understandable and trustworthy

### 2.4 Asset and Payment Layer

This is the execution layer of the product.

Core capabilities:

- balance and asset account views
- send and receive
- stablecoin-first payment flows
- automatic `FCC` gas conversion
- gas abstraction through `FC-DEX`
- clear receipts for completed conversions and payments
- support for remittance and retail payment scenarios

User meaning:

- users should be able to pay without learning native-token mechanics
- blockchain complexity should stay behind the interface

### 2.5 Organization and E-Company Layer

This is the institutional layer of the product.

Core capabilities:

- digital company registration through `FCDID`
- enterprise identity and entity profile
- company charter and license anchoring
- equity and permission structure
- multisig approvals
- revenue-sharing and settlement visibility

User meaning:

- the wallet supports both personal and organizational participation
- enterprise functions are part of the product core, not a side module

### 2.6 Physical Card and Offline Layer

This is the physical-world extension of the product.

Core capabilities:

- physical `ID Card` binding
- card status and pairing management
- offline identity verification
- `NFC` payment or signing interaction
- freeze, replace, and rebind flows

User meaning:

- the wallet extends beyond the phone into real-world trusted interaction

### 2.7 Secure Communication Layer

This is the trusted interaction layer of the product.

Core capabilities:

- `DIDComm` secure messaging
- verified sender identity
- credential requests and proofs over message channels
- government and organization notices
- encrypted citizen-to-service communication

User meaning:

- the wallet is also a secure communication endpoint

### 2.8 Governance and Compliance Layer

This is the governance layer of the product.

Core capabilities:

- governance participation
- role-based voting tied to identity
- compliance-friendly transaction review paths
- regulated observation points for large cross-border flows

User meaning:

- the wallet is part of a live digital governance system

## 3. Recommended Product Scheme

### 3.1 Recommended Positioning

Recommended external definition:

`FC Wallet is the trusted digital gateway for future citizens, connecting identity, assets, credentials, organizations, and secure interaction in one system.`

Recommended internal definition:

`FC Wallet is the app shell of the Future Citizen ecosystem.`

### 3.2 Recommended Product Structure

I recommend one app shell with two main contexts:

- `Citizen Mode`
- `Organization Mode`

This is better than splitting everything into separate apps too early because:

- identity, payment, card, and message systems are shared
- users may switch between personal and organizational actions
- the system narrative remains unified

### 3.3 Recommended Information Architecture

Recommended primary navigation for mobile:

- `Home`
- `Identity`
- `Pay`
- `Organization`
- `Inbox`

Recommended secondary modules:

- `Credentials`
- `Card`
- `Security`
- `Governance`
- `Settings`

Why this structure works:

- `Home` gives one unified dashboard
- `Identity` reflects the product's real center of gravity
- `Pay` keeps the most frequent action immediate
- `Organization` gives enterprise capability its own serious space
- `Inbox` supports DIDComm, credential requests, and official notices

### 3.4 Recommended Core Screens

The first design package should include these screens:

1. `Onboarding`
   - create wallet
   - bind identity
   - create or claim `FCDID`
   - set up recovery

2. `Home Dashboard`
   - identity status
   - asset summary
   - credential summary
   - pending requests
   - organization shortcuts

3. `Identity Center`
   - `FCDID`
   - `FNS`
   - trust status
   - linked national identity

4. `Credential Vault`
   - all credentials
   - issuers
   - proof history
   - selective disclosure actions

5. `Payment Flow`
   - send
   - receive
   - request
   - gas-free or auto-gas confirmation

6. `Transaction Receipt`
   - user-facing result
   - behind-the-scenes gas swap detail
   - trust and compliance markers

7. `Security and Recovery Center`
   - recovery readiness
   - device state
   - shard or backup explanations
   - card relationship

8. `Organization Workspace`
   - company profile
   - treasury
   - signer list
   - pending approvals

9. `Multisig Approval Flow`
   - proposal detail
   - signer progress
   - approval and rejection action

10. `Card Center`
    - pair card
    - card status
    - freeze or replace
    - offline actions

11. `Secure Inbox`
    - verified messages
    - proof requests
    - institution notices
    - enterprise notices

12. `Governance Center`
    - proposals
    - departments
    - voting status
    - participation records

## 4. Recommended Design Principles

### 4.1 Identity First

Do not make the app feel like a balance-first wallet.
The first thing users should feel is:

- who they are
- what they can prove
- what trusted actions are available

### 4.2 Hide Chain Complexity

Users should not need to think about:

- gas tokens
- routing
- shards
- low-level contract mechanics

Only show advanced detail when needed for trust and transparency.

### 4.3 Make Trust Visible

The product should visibly communicate:

- identity verification state
- credential validity
- issuer trust
- organization legitimacy
- official communication authenticity

### 4.4 Treat Privacy as a Feature

Do not bury privacy inside settings.
`ZKP` and selective disclosure should feel like premium product value.

### 4.5 Separate Personal and Organization Actions Clearly

Users must always know whether they are acting:

- as an individual
- on behalf of an organization

This is especially important for:

- payments
- approvals
- credentials
- governance

### 4.6 Keep an Institutional Tone

The wallet should feel:

- future-facing
- serious
- trustworthy
- efficient

It should avoid looking like a speculative trading app.

## 5. Recommended Release Plan

### Phase 1: Foundation Release

Goal:

- launch the citizen wallet core

Priority scope:

- onboarding
- `FCDID`
- `FNS`
- Digital ID binding
- asset account
- send and receive
- auto gas conversion
- basic credential vault
- basic security and recovery center
- basic secure inbox

Why:

- this validates the identity-plus-wallet core
- this is the smallest version that still matches the system vision

### Phase 2: Trust and Organization Release

Goal:

- expand from personal wallet into trust and enterprise flows

Priority scope:

- advanced selective disclosure
- proof request flow
- `E-Company` workspace
- multisig approvals
- revenue-sharing visibility
- stronger DIDComm flows

Why:

- this turns the app into a real operating interface

### Phase 3: Physical and Governance Release

Goal:

- complete the future citizen interaction stack

Priority scope:

- physical card center
- offline `NFC` scenarios
- governance plugin
- compliance and supervisory views
- advanced cross-border and public-service interactions

Why:

- these functions are strategically important but operationally heavier

## 6. My Recommended First-Version Focus

If the team needs a practical starting point, I recommend designing version one around these five pillars:

- `Identity`
- `Credentials`
- `Wallet`
- `Security`
- `Inbox`

And treat these as controlled second-wave expansions:

- `Organization`
- `Card`
- `Governance`

This keeps the first product focused while still preserving the long-term architecture.

## 7. Key Risks and Open Questions

These questions should be confirmed before final UX copy and system diagrams are locked:

- Is recovery truly `2-of-3` or `3-of-3`?
- What exact role does the physical card play in the recovery architecture?
- Are `FCDID`, `FCID`, and `Future Citizen ID` the same branded concept?
- Is governance part of first launch or later launch?
- Is the first target user an individual citizen, an enterprise operator, or a government-connected participant?

## 8. Final Recommendation

My overall recommendation is:

Do not design `FC Wallet` as a conventional crypto wallet.
Design it as a sovereign identity and trusted interaction platform with wallet capabilities inside it.

The best product direction is:

- one app shell
- identity-first structure
- payment simplicity
- visible trust and privacy
- clear citizen and organization modes
- phased expansion into card and governance scenarios
