# Step 2: Design Encryption at Rest

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

Design storage encryption strategy with tenant-specific key management and key hierarchy.

## Prerequisites

- Data classification from Step 1
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: security

---

## Actions

### 1. Define Key Hierarchy

| Level | Key Type | Protection | Rotation |
|-------|----------|------------|----------|
| Master Key (KEK) | HSM-protected | Hardware | Annual |
| Platform DEK | KMS-wrapped | KEK | Quarterly |
| Tenant DEK | KMS-wrapped | KEK | Monthly |
| Field Key | Vault-stored | Platform DEK | Per access |

### 2. Configure Storage Encryption

| Storage Type | Encryption Method | Key Source |
|--------------|-------------------|------------|
| PostgreSQL | TDE + Column | Tenant DEK |
| Object Storage | SSE-KMS | Tenant DEK |
| Vector Store | Application | Tenant DEK |
| Redis Cache | At-rest encryption | Platform DEK |
| Backups | AES-256-GCM | Tenant DEK |

### 3. Design Tenant Key Isolation

| Tier | Key Model | Key Storage | BYOK |
|------|-----------|-------------|------|
| Free | Shared DEK | Cloud KMS | No |
| Pro | Dedicated DEK | Cloud KMS | No |
| Enterprise | Dedicated + BYOK | Customer HSM | Yes |

**Verify current best practices with web search:**
Search the web: "encryption at rest multi-tenant {date}"
Search the web: "tenant key hierarchy KMS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

### Menu Options

### [A]nalyze Options
- **A1**: Review key hierarchy security
- **A2**: Analyze storage encryption coverage
- **A3**: Evaluate tenant key isolation

### [P]ropose Changes
- **P1**: Propose key hierarchy adjustments
- **P2**: Propose storage encryption changes
- **P3**: Suggest tenant key improvements

### [C]ontinue
- **C1**: Accept encryption at rest design
- **C2**: Mark step complete and load `step-03-c-design-encryption-in-transit.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Key hierarchy defined
- [ ] Storage encryption configured
- [ ] Tenant key isolation designed
- [ ] Patterns align with pattern registry

## Outputs

- Key hierarchy diagram
- Storage encryption configuration
- Tenant key isolation model

## Next Step

Proceed to `step-03-c-design-encryption-in-transit.md`.
