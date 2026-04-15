# Step 1: Define Identity Architecture

## MANDATORY EXECUTION RULES (READ FIRST)

- STOP **NEVER generate content without user input** - Wait for explicit direction
- BOOK **CRITICAL: ALWAYS read the complete step file** before taking any action
- PAUSE **ALWAYS pause after presenting findings** and await user direction
- TARGET **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- TARGET Show your analysis before taking any action
- SAVE Update document frontmatter after each section completion
- SEARCH Use web search to verify current best practices when making technology decisions

---

## Purpose

Define identity-centric architecture with strong authentication, authorization, and identity verification for all actors.

## Prerequisites

- Master architecture approved
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: security

---

## Actions

### 1. Define Identity Types

| Identity Type | Examples | Authentication | Verification |
|---------------|----------|----------------|--------------|
| Human Users | Admins, tenants | MFA, SSO | Continuous |
| Service Accounts | Microservices | mTLS, JWT | Per-request |
| AI Agents | LLM orchestrators | Service identity | Per-action |
| External APIs | Third-party | API key + OAuth | Per-request |
| Devices | Admin devices | Device cert | Session |

### 2. Configure Identity Provider

| Component | Implementation | Purpose |
|-----------|----------------|---------|
| IdP | Okta/Auth0/Keycloak | User authentication |
| SPIFFE/SPIRE | Service identity | Workload attestation |
| PKI | Private CA | Certificate management |
| MFA | TOTP/WebAuthn | Second factor |

### 3. Design Authorization Model

| Model | Use Case | Implementation |
|-------|----------|----------------|
| RBAC | User permissions | Role assignments |
| ABAC | Dynamic access | Attribute policies |
| ReBAC | Relationship-based | Relationship graphs |
| Policy Engine | Complex rules | OPA/Cedar |

**Verify current best practices with web search:**
Search the web: "zero trust identity architecture {date}"
Search the web: "SPIFFE service identity {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

### Menu Options

### [A]nalyze Options
- **A1**: Review identity types
- **A2**: Analyze IdP configuration
- **A3**: Evaluate authorization model

### [P]ropose Changes
- **P1**: Propose identity additions
- **P2**: Propose IdP changes
- **P3**: Suggest authorization improvements

### [C]ontinue
- **C1**: Accept identity architecture
- **C2**: Mark step complete and load `step-02-c-design-network-segmentation.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Identity types defined
- [ ] IdP configured
- [ ] Authorization model designed
- [ ] Patterns align with pattern registry

## Outputs

- Identity type matrix
- IdP configuration
- Authorization model

## Next Step

Proceed to `step-02-c-design-network-segmentation.md`.
