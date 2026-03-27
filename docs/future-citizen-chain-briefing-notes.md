# Future Citizen Chain Briefing Notes

Source:
- User-provided text summary: `Future Citizen Blockchain: Comprehensive Strategic Briefing`

## Core Judgment

The `FC Blockchain` is being positioned as the technical infrastructure layer of the Future Citizen system.
Its narrative is not only about chain performance.
It combines:

- High-throughput execution
- Identity-centric infrastructure
- Low-friction wallet usability
- EVM developer compatibility
- Support for real-world institutional and enterprise scenarios

For wallet design, this means the chain should mostly stay in the background.
Users should feel identity, trust, speed, and simplicity, rather than raw blockchain complexity.

## Technical Foundation

The chain briefing defines `HTTS` as the main consensus architecture.

Its stated components are:

- `PoH` time sequence generator using `SHA-256`
- `PoS` validator election with `VRF`
- Validator minimum stake of `1,000 FCC`
- `100` validators rotated every `10 seconds`
- Initial network split into `100` shards
- `Tower BFT` for fork resolution and block locking
- Asynchronous eventual consistency model

The system explicitly prioritizes:

- Availability
- Partition tolerance

And accepts:

- Eventual consistency

## Claimed Performance Positioning

The provided positioning claims:

- `50,000 TPS` per shard
- Scalable up to `5,000,000 TPS`
- Confirmation delay of `0.5–2 seconds`
- Low energy consumption
- High decentralization through PoS plus validator rotation

These are important product narrative inputs, even if they should be treated as project claims until the implementation is fully validated.

## Identity and Digital Sovereignty

Identity is not an add-on in this architecture.
It is one of the chain's primary differentiators.

The briefing says `FCID` includes:

- `W3C DID Core v1.0` compliance
- `Verifiable Credentials Data Model v2.0`
- `ZKP`-based selective disclosure
- Binding with national digital IDs through `PKI` and `X.509`
- Human-readable decentralized naming such as `did:fc:username.fc`

This strongly reinforces an identity-first wallet model.
The wallet is not only an account container.
It is also a credential carrier, verification interface, and privacy-control surface.

## Wallet-Critical Infrastructure

Two chain-level usability features have direct wallet impact.

### MPC Recovery

The briefing describes:

- A key split across `User Phone`, `Chain Server`, and `Backup Node`
- Reconstruction using any two shares
- Identity verification through Digital ID and `ZKP` when recovering
- Elimination of seed phrase dependency

Important ambiguity to verify later:

- The text calls this a `3-of-3 Shamir Secret Sharing mechanism`
- It also says `any two shares can reconstruct the key`

Those two descriptions do not match.
The recovery flow sounds like a `2-of-3` threshold design.
We should confirm the exact mechanism before turning it into UI copy, recovery diagrams, or security claims.

### Automatic Gas Exchange

The briefing describes:

- No hard requirement for users to hold `FCC` for gas
- Internal routing through `FC-DEX`
- Optimal pair search using the `Dijkstra` algorithm
- Routing up to `3 hops`
- Automatic conversion from stablecoins or other tokens into `FCC`
- Default slippage protection of `5%`
- Minimum liquidity reserve of `1,000 FCC`

For product design, this is a major simplification lever.
Users can be shown a stablecoin-native payment flow while the gas logic remains abstracted.

## Ecosystem Scenarios

The chain briefing highlights these application areas:

- `E-Company` digital enterprise governance
- High-frequency retail payments
- Low-cost cross-border remittance
- `RWA` tokenization
- Trust and inheritance management
- `NFC` physical identity cards for offline verification and small payments

This matters because the wallet cannot be designed only for personal transfer behavior.
It may need to support:

- Personal context
- Enterprise context
- Credential context
- Compliance context
- Physical-world interaction

## EVM Compatibility

The briefing states full `EVM` compatibility and support for `Solidity`.

This suggests:

- Developer onboarding can lean on familiar Ethereum tooling
- Wallet integration may need to support contract interactions in an Ethereum-like mental model
- Existing DeFi and NFT patterns may be reusable, but should be translated into the Future Citizen identity and trust framework

## Tokenomics and Governance Context

The native token is described as `FCC` with a total supply of `5 billion`.

Allocation summary from the briefing:

- `74%` ecosystem incentive fund
- `10%` early presale
- `8%` management fund
- `8%` R&D and early contributors

Other stated governance elements:

- DAO-style community structure
- Legal team
- Finance center
- Development team
- Annual disclosure obligations

For wallet design, tokenomics should not dominate the primary UX.
But governance status, disclosures, and ecosystem trust markers may become relevant in institutional or advanced views.

## Roadmap Signals

The briefing gives this roadmap:

1. `2025 Q4`: early presale and team expansion
2. `2026 Q1`: finalize underlying architecture
3. `2026 Q2`: ecosystem setup and internal testing
4. `2026 Q3`: public testing, open registration, and partner onboarding
5. `2026 Q4`: target `1 million` global users
6. `2027 Q2`: broader DApp and developer ecosystem expansion

Because the current date is `March 27, 2026`, this implies the project is positioned around the architecture-finalization and pre-ecosystem-launch stage.
That timing matters for design:

- Some flows may need to feel "pilot" or "early access"
- Trust-building, education, and onboarding clarity are especially important
- Public-facing language may need to balance ambition with readiness

## Risk Notes

The briefing explicitly names these risks:

- Regulatory uncertainty
- Technical and development risk
- Security vulnerability risk
- Token market volatility and liquidity risk

These should influence design language.
The wallet should not overpromise certainty where the project materials themselves disclose risk.

## Wallet Design Implications

The chain briefing strengthens several product directions.

### 1. Identity Before Assets

The wallet home should likely foreground:

- Citizen identity state
- Credential readiness
- Verification status
- Trusted access points

Assets should be important, but not the only center of gravity.

### 2. Hide Blockchain Operations

If auto gas exchange is real, user-facing payment design should avoid exposing:

- FCC top-up anxiety
- Manual gas management
- Swap-path complexity
- Chain jargon by default

### 3. Recovery Is a Feature, Not a Footnote

The `MPC` model should likely be surfaced through:

- Friendly account safety setup
- Recovery readiness indicators
- Clear device / server / backup relationship explanation
- Reassurance without false guarantees

### 4. Verification Needs a First-Class Surface

Because `ZKP`, `VC`, and digital ID binding are core differentiators, the wallet should likely include:

- Credential vault
- Request-to-prove flows
- Selective disclosure controls
- Verified issuer markers
- History of proofs and verifications

### 5. Personal and Organization Modes May Both Matter

Because of `E-Company`, the wallet may need:

- Personal vs organization switching
- Role and permission views
- Multi-sign requests
- Clear separation of personal assets, organizational approvals, and shared credentials

### 6. NFC and Offline Interaction Should Not Feel Secondary

If physical cards are strategic, then design may need:

- Card binding and pairing
- Offline-capable explanations
- Tap-to-verify or tap-to-pay interactions
- Card freeze, replace, and status management

### 7. Secure Messaging Can Be a System Layer

If `DIDComm` is part of the product stack, then the wallet may also act as:

- A secure message center
- A channel for verified requests
- A place for institution-to-citizen notices
- A record of trusted interactions

## Working Product Hypothesis

Based on the blueprint plus this chain briefing, the strongest current interpretation is:

`FC Wallet` is the operational interface of the Future Citizen system.

It may combine:

- Identity wallet
- Payment wallet
- Credential wallet
- Enterprise gateway
- Security center
- Communication endpoint
- Physical credential companion

## Open Questions To Resolve With Future Materials

- Is the recovery scheme actually `2-of-3` or `3-of-3`?
- Is `FCDID` the same concept as `FCID`, or a product naming distinction?
- Will `Future Citizen ID` and `FC Wallet` be separate apps, or one app with two modules?
- How visible should `FCC` be in mainstream user flows?
- Is offline NFC payment part of first release or later roadmap?
- Which scenarios are first-priority: citizen identity, payments, enterprise governance, or cross-border credentials?
