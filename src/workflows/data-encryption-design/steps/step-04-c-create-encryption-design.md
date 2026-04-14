# Step 4: Create Encryption Design Document

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

Assemble the comprehensive encryption design document.

## Prerequisites

- All previous steps completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: security

---

## Actions

### 1. Assemble Document

| Section | Source | Status |
|---------|--------|--------|
| Executive Summary | New | Draft |
| Data Classification | Step 1 | Complete |
| Encryption at Rest | Step 2 | Complete |
| Encryption in Transit | Step 3 | Complete |
| Key Management | New | Draft |
| Key Rotation Schedule | New | Draft |

### 2. Define Key Management Procedures

| Procedure | Trigger | Responsibility |
|-----------|---------|----------------|
| Key Creation | New tenant | Automated |
| Key Rotation | Schedule | Automated |
| Key Revocation | Tenant offboarding | Security Team |
| Key Recovery | DR event | Security Team |

### 3. Schedule Key Rotation

| Key Type | Rotation Period | Notification |
|----------|-----------------|--------------|
| Master KEK | Annual | 30 days |
| Platform DEK | Quarterly | 14 days |
| Tenant DEK | Monthly | 7 days |
| TLS Certificates | 90 days | 14 days |

**Verify current best practices with web search:**
Search the web: "key management procedures enterprise {date}"
Search the web: "key rotation automation {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

### Menu Options

### [A]nalyze Options
- **A1**: Review document completeness
- **A2**: Analyze key management procedures
- **A3**: Evaluate rotation schedule

### [P]ropose Changes
- **P1**: Propose document additions
- **P2**: Propose procedure changes
- **P3**: Suggest rotation adjustments

### [C]ontinue
- **C1**: Finalize encryption design
- **C2**: Mark workflow complete and output

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] All sections populated
- [ ] Key management documented
- [ ] Rotation schedule defined
- [ ] Document ready for approval

## Outputs

- `{output_folder}/planning-artifacts/data-encryption-design.md`
- **Load template:** `{project-root}/_bmad/bam/templates/encryption-design-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/encryption-key-management-template.md`

---

## Quality Gate Contribution: QG-S7 Data Protection Gate

This workflow contributes to QG-S7 `encryption_verified` pattern:

| QG-S7 Requirement | Addressed In | Status |
|-------------------|--------------|--------|
| Data classification with encryption | Step 1 - Data Classification | Sensitivity and encryption mapping |
| Encryption at rest | Step 2 - Encryption at Rest | AES-256, tenant key isolation |
| Encryption in transit | Step 3 - Encryption in Transit | TLS 1.3, mTLS |
| Key management procedures | Step 4 - Key Management | Key lifecycle and rotation |

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-S7`

---

## Next Step

Workflow complete.
