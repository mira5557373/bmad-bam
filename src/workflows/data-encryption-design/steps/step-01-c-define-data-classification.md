# Step 1: Define Data Classification

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

Define data classification framework mapping data types to encryption requirements for the multi-tenant AI platform.

## Prerequisites

- Master architecture approved
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: security

---

## Inputs

- Master architecture document
- Pattern registry

---

## Actions

### 1. Classify Data Types

| Data Type | Sensitivity | Examples | Encryption Required |
|-----------|-------------|----------|---------------------|
| PII | Critical | Names, emails, SSN | AES-256, tenant key |
| PHI | Critical | Health records | AES-256, tenant key, HIPAA |
| Financial | Critical | Payment data | AES-256, PCI-DSS |
| Business | High | Tenant configuration | AES-256, shared key |
| AI Data | High | Prompts, embeddings | AES-256, tenant key |
| Operational | Medium | Logs, metrics | AES-256, platform key |
| Public | Low | Marketing content | TLS only |

### 2. Map Encryption Requirements

| Classification | At Rest | In Transit | Application |
|----------------|---------|------------|-------------|
| Critical | AES-256-GCM | TLS 1.3 | Field-level |
| High | AES-256-GCM | TLS 1.3 | Optional |
| Medium | AES-256 | TLS 1.2+ | No |
| Low | Volume encryption | TLS 1.2+ | No |

### 3. Define Tenant Data Boundaries

| Data Scope | Key Type | Isolation |
|------------|----------|-----------|
| Platform data | Platform DEK | Shared |
| Tenant data | Tenant DEK | Isolated |
| Shared data | Shared DEK | Role-based |
| Cross-tenant | Prohibited | N/A |

**Verify current best practices with web search:**
Search the web: "data classification encryption requirements {date}"
Search the web: "multi-tenant encryption key isolation {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

### Menu Options

### [A]nalyze Options
- **A1**: Review data classification completeness
- **A2**: Analyze encryption requirements
- **A3**: Evaluate tenant boundaries

### [P]ropose Changes
- **P1**: Propose additional data types
- **P2**: Propose encryption requirement changes
- **P3**: Suggest tenant boundary adjustments

### [C]ontinue
- **C1**: Accept classification and proceed
- **C2**: Mark step complete and load `step-02-c-design-encryption-at-rest.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Data types classified
- [ ] Encryption requirements mapped
- [ ] Tenant boundaries defined
- [ ] Patterns align with pattern registry

## Outputs

- Data classification matrix
- Encryption requirements mapping
- Tenant data boundary documentation

## Next Step

Proceed to `step-02-c-design-encryption-at-rest.md`.
