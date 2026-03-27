# FC Wallet PRD Notes

Source:
- User-provided text summary: `FC Wallet (未来公民钱包) 产品与设计功能规范文档 (PRD)`

## Product Definition

The PRD defines `FC Wallet` as the sovereign-level core portal of the `Future Citizen Ecosystem`.

It is positioned as:

- A key infrastructure product built by `Future Citizen Bureau`
- A digital gateway connecting citizens, `E-Company`, and government partners
- A product for identity confirmation, sovereign wealth management, and cross-border governance

This confirms that the wallet should not be framed as a simple crypto app.

## Product Vision

The product vision is explicitly anchored on:

- `Identity`
- `Trust`
- `Governance`

The wallet is meant to turn complex protocols into intuitive interfaces and give digital citizens a practical way to express sovereign identity.

## Technical Environment Requirements

The PRD states that the wallet runs on `Future Citizen Chain` and assumes:

- `HTTS` consensus
- `PoH` time sequencing
- `50,000 TPS` per shard
- `100` shards and up to `5,000,000 TPS` theoretical throughput
- `0.5 - 2 seconds` confirmation time
- Full `EVM` compatibility
- `Solidity` support
- `Cancun-Deneb` compatibility target

For design, these metrics mainly justify:

- Fast transaction feedback
- Near-instant verification experiences
- Enterprise-grade responsiveness

## Identity Module Requirements

The identity module is formal and standards-driven.

The PRD requires:

- Full compliance with `W3C DID v1.0`
- Full compliance with `VC v2.0`
- `did:fc:0x[Hex_Address]`
- `did:fc:[Name].fc`

The PRD also defines `FNS` as the naming layer that supports:

- Human-readable addresses
- DApp login
- DIDComm routing

This means naming is not cosmetic.
It is a core UX primitive across wallet, identity, and messaging.

## National Digital ID Binding

The PRD requires strong binding between `FCDID` and government-issued digital identity through `PKI` and `X.509`.

It explicitly frames the benefits as:

- Stronger trust anchor
- Legal effect in the real world
- DID recovery through Digital ID
- Built-in compliance support for AML and KYC

For product design, this suggests:

- Identity status must be visible
- Trust level may need to be surfaced
- Compliance-ready credentials may become a first-class part of onboarding and verification

## Privacy and ZKP

The PRD requires `ZKP` support and mentions `BBS+` signatures for selective disclosure.

The example is:

- Prove "adult" without revealing exact date of birth

This has strong UX implications:

- Users need a proof review screen
- Attribute-level disclosure controls must be understandable
- Privacy-preserving proof flows may become a flagship experience

## Security Module Requirements

The PRD defines a secret-sharing-based `MPC` wallet with three shard locations:

1. `User Device`
2. `On-chain Server` run by `Future Citizen Bureau`
3. `Backup Node` designated under `Future Citizen Authority`

Other stated details:

- Private key material based on the `secp256k1` field
- Device shard stored in secure hardware or `TEE`
- `AES-256` encryption
- `PBKDF2`-derived key material from biometrics or password

## Recovery Flow

The recovery process requires:

1. Recovery initiated on a new device
2. Identity verified through bound national Digital ID and `PKI` signature
3. Server and backup node send shards through an `ECDH` encrypted channel
4. Local reconstruction with Lagrange interpolation
5. Recovery latency under `1 second`

Important design and architecture note:

- Section `3.1` calls the architecture `3-of-3`
- Section `3.2` calls the recovery logic `2-of-3`

These statements conflict.
The recovery flow itself reads like a `2-of-3` threshold scheme.
We should not turn this into user-facing security copy until the exact threshold model is confirmed.

## Payment and Gas Swap Requirements

The PRD makes auto gas handling a mandatory feature, not an optional convenience.

Required payment logic:

- Check `FCC` balance before every transaction
- If `RequiredFCC > CurrentBalance`, trigger gas swap silently
- Use built-in `FC-DEX`
- Convert stablecoins such as `USDT` into `FCC`
- Support `EIP-712` signing for first interaction without native gas

Defined parameters:

- `10%` buffer
- `5%` default slippage tolerance
- Path score formula for route choice
- `Dijkstra` optimization
- Maximum `3-hop` routing

Design implication:

- The wallet should feel stablecoin-first
- Gas should rarely be exposed as a user problem
- Users may still need a transparent receipt view showing what happened behind the scenes

## E-Company Requirements

The enterprise module is a major part of the product.

The PRD requires:

- Fast company registration through `FCDID`
- Corporate charter, equity structure, and operating license anchored as `NFT`
- Built-in multisig such as `3/5`
- Support for high-value approvals and contract changes

It also requires automated revenue-sharing infrastructure for:

- License fees
- Annual service fees
- Transaction commissions

And defines settlement between:

- Partner governments
- `Future Citizen Bureau`

Design implication:

- Enterprise mode is not a future add-on
- The wallet may need a serious workspace model with approval flows, signers, treasury, and compliance-aware records

## Physical ID Card and Offline NFC

The PRD requires a hardware extension through a physical ID card.

It states:

- The card contains a secure cryptographic chip
- It acts as an offline extension of `FCDID`
- It stores a physical backup related to the `MPC` scheme
- `NFC` signing latency must stay below `100ms`

The listed use cases are:

- Retail payment
- Public transit
- Hotel check-in
- Border crossing

Important open design question:

- The PRD says the physical card stores a physical backup tied to the `MPC` shard model
- It does not fully clarify whether this is an additional shard, a replica of one shard, or a separate hardware credential

We should confirm the exact role of the card before mapping account recovery, pairing, or lockout flows.

## DIDComm Requirements

The communication layer is required to use:

- `DIDComm v2.0`
- `X25519` end-to-end encryption
- `did:fc` as the addressing layer

This means messaging is part of the identity fabric of the product.
It is not just a chat feature.

The wallet may need to support:

- Verified requests
- Credential exchange
- Governance notices
- Institution-to-citizen secure communication

## FCC Token Interaction

The PRD defines `FCC` as the native token used for:

- Gas payment
- Validator incentives
- Governance voting weight

It confirms the total supply of `5 billion` and repeats the main allocation model:

- `74%` ecosystem incentives
- `10%` early presale
- `8%` management fund
- `8%` R&D and contributors

This should likely be secondary in the mainstream wallet UX and more visible in:

- Governance views
- Advanced asset views
- Validator or ecosystem participant flows

## Governance and Compliance Requirements

The PRD adds two important layers:

### Governance Plugin

The wallet should support governance participation across:

- Legal
- Finance
- Development

Voting weight is tied to `FCDID` to reduce sybil risk.

### Supervisory Access

The architecture must include compliance access for government partners.

The stated role is:

- Observer-style access for AML and KYC review on large cross-border transactions
- Privacy preserved while enabling regulated oversight

This means the product will likely need a carefully designed trust and audit narrative.

## Risk and Legal Framing

The PRD explicitly names:

- Quantum risk
- FCC market volatility
- Limited liability around non-MPC private key leakage
- No responsibility for speculative loss
- Final jurisdiction retained by partner governments over local Digital ID services

Design implication:

- High-trust tone is appropriate
- Overclaiming certainty would be a mistake
- Security explanations need to be precise, not just reassuring

## Strongest Confirmed UX Direction

After reading this PRD, the most defensible current interpretation is:

`FC Wallet` should be designed as a sovereign identity and operations wallet.

It likely needs to combine:

- Identity onboarding
- Credential management
- Selective disclosure
- Stablecoin-first payments
- Auto gas abstraction
- Account recovery center
- Secure communication
- Physical card management
- Enterprise workspace
- Governance participation

## Emerging Information Architecture

A practical IA candidate, based on current materials, could revolve around:

- Home
- Identity
- Credentials
- Wallet
- Payments
- Organization
- Messages
- Card
- Governance
- Security

## Open Questions Raised By The PRD

- Is the key-sharing model truly `3-of-3`, or actually `2-of-3` with three shards?
- What exact role does the physical card play in the `MPC` recovery architecture?
- Are `FCDID`, `FCID`, and `Future Citizen ID` one product concept or multiple branded surfaces?
- Is the governance plugin part of the initial release or a later module?
- Will retail, enterprise, and government-partner functions live in one app shell or separate modes?
- Which user segment is the primary first-release target: individual citizens, enterprises, or institutions?
