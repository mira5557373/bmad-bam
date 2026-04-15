# Step 1: Define Secret Classification

## MANDATORY EXECUTION RULES (READ FIRST)

- STOP **NEVER generate content without user input** - Wait for explicit direction
- BOOK **CRITICAL: ALWAYS read the complete step file** before taking any action
- CYCLE **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- PAUSE **ALWAYS pause after presenting findings** and await user direction
- TARGET **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- TARGET Show your analysis before taking any action
- SAVE Update document frontmatter after each section completion
- MEMO Maintain append-only document building
- CHECK Track progress in `stepsCompleted` array
- SEARCH Use web search to verify current best practices when making technology decisions
- CLIP Reference pattern registry `web_queries` for search topics


---

## Purpose

Define comprehensive secret classification framework covering secret types, sensitivity levels, and tenant isolation requirements for the multi-tenant AI platform.

## Prerequisites

- Master architecture approved or in progress
- Tenant tier model defined (Free/Pro/Enterprise)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: security
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: tenant-isolation


---

## Inputs

- User requirements for secrets management
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Define Secret Types

Categorize secrets by type:

| Secret Type | Examples | Sensitivity | Owner |
|-------------|----------|-------------|-------|
| Platform Credentials | Database passwords, service accounts | Critical | Platform Team |
| API Keys | LLM provider keys, third-party APIs | High | Platform Team |
| Tenant Credentials | Tenant DB passwords, integration keys | Critical | Per Tenant |
| Encryption Keys | Data encryption keys, signing keys | Critical | Security Team |
| Certificates | TLS certs, mTLS certs, signing certs | High | Security Team |
| OAuth Secrets | Client secrets, tokens | High | Identity Team |
| AI Credentials | Model API keys, inference tokens | High | AI Team |

### 2. Define Sensitivity Levels

Create sensitivity classification:

| Level | Description | Storage | Access Control |
|-------|-------------|---------|----------------|
| Critical | Compromise causes catastrophic damage | HSM-backed vault | MFA + approval |
| High | Compromise causes significant damage | Vault secret engine | MFA required |
| Medium | Compromise causes moderate impact | Vault KV store | RBAC |
| Low | Minimal impact if compromised | Encrypted config | Standard auth |

### 3. Define Tenant Secret Isolation

For multi-tenant secrets:

| Isolation Model | Implementation | Use Case |
|-----------------|----------------|----------|
| Namespace per Tenant | Vault namespace | Enterprise tier |
| Path per Tenant | `/tenant/{id}/secrets/*` | Pro tier |
| Shared with Prefix | Key prefix `tenant:{id}:` | Free tier |

### 4. Define Secret Lifecycle

Create lifecycle policies:

| Phase | Actions | Automation |
|-------|---------|------------|
| Creation | Generate, classify, store | Automated |
| Distribution | Inject, rotate, sync | Automated |
| Usage | Access, audit, monitor | Automated |
| Rotation | Regenerate, update, verify | Scheduled |
| Revocation | Invalidate, remove, audit | On-demand |

**Verify current best practices with web search:**
Search the web: "secret classification framework best practices {date}"
Search the web: "multi-tenant secrets isolation patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### Menu Options

### [A]nalyze Options
- **A1**: Review secret types for completeness
- **A2**: Analyze sensitivity levels against compliance
- **A3**: Evaluate tenant isolation requirements
- **A4**: Assess lifecycle policy automation

### [P]ropose Changes
- **P1**: Propose additional secret types
- **P2**: Propose sensitivity level adjustments
- **P3**: Suggest tenant isolation refinements
- **P4**: Recommend lifecycle modifications

### [C]ontinue
- **C1**: Accept current classification and proceed to vault integration
- **C2**: Mark step complete and load `step-02-c-design-vault-integration.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Secret types defined comprehensively
- [ ] Sensitivity levels documented with criteria
- [ ] Tenant isolation model defined
- [ ] Lifecycle policies established
- [ ] Patterns align with pattern registry

## Outputs

- Secret type taxonomy
- Sensitivity classification matrix
- Tenant isolation model
- Secret lifecycle policies

## Next Step

Proceed to `step-02-c-design-vault-integration.md` to design vault integration.
