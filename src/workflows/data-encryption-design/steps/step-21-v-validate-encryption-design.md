# Step 2: Validate Encryption Design

## MANDATORY EXECUTION RULES (READ FIRST)

- STOP **NEVER generate content without user input** - Wait for explicit direction
- BOOK **CRITICAL: ALWAYS read the complete step file** before taking any action
- PAUSE **ALWAYS pause after presenting findings** and await user direction
- TARGET **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- TARGET Show your analysis before taking any action

---

## Purpose

Perform detailed validation of the encryption design.

## Prerequisites

- Encryption design loaded in Step 20
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: security
- **Load quality gate:** `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-S7`

## Quality Gate Contribution

**Contributes to:** QG-S7 (Data Protection Gate) - `encryption_verified` pattern

---

## Actions

### 1. Validate Data Classification

| Validation Item | Criteria | Status |
|-----------------|----------|--------|
| Data Types | All types classified | [ ] |
| Encryption Requirements | Requirements mapped | [ ] |
| Tenant Boundaries | Boundaries defined | [ ] |

### 2. Validate Encryption at Rest

| Validation Item | Criteria | Status |
|-----------------|----------|--------|
| Key Hierarchy | Hierarchy defined | [ ] |
| Storage Encryption | All storage covered | [ ] |
| Tenant Keys | Isolation configured | [ ] |

### 3. Validate Encryption in Transit

| Validation Item | Criteria | Status |
|-----------------|----------|--------|
| TLS Configuration | TLS 1.3 minimum | [ ] |
| mTLS | Services covered | [ ] |
| API Encryption | Endpoints configured | [ ] |

### 4. Validate Compliance

| Framework | Requirement | Status |
|-----------|-------------|--------|
| SOC2 | CC6.1 - Encryption | [ ] |
| HIPAA | Technical safeguards | [ ] |
| GDPR | Data protection | [ ] |
| PCI-DSS | Encryption requirements | [ ] |

---

## COLLABORATION MENUS (A/P/C)

### [C]ontinue
- **C1**: Accept validation results
- **C2**: Load `step-22-v-generate-report.md`

---

## Verification

- [ ] Data classification validated
- [ ] Encryption at rest validated
- [ ] Encryption in transit validated
- [ ] Compliance checked

### QG-S7 Contribution Verification
This workflow contributes to QG-S7 `encryption_verified` pattern:

| Requirement | Status | Evidence |
|-------------|--------|----------|
| Data classification with encryption reqs | [ ] Pass / [ ] Fail | Classification matrix |
| Encryption at rest (AES-256 minimum) | [ ] Pass / [ ] Fail | Storage encryption config |
| Encryption in transit (TLS 1.3) | [ ] Pass / [ ] Fail | TLS configuration |
| Tenant key isolation | [ ] Pass / [ ] Fail | Key hierarchy design |
| Key management procedures | [ ] Pass / [ ] Fail | Key rotation schedule |

**QG-S7 encryption_verified pattern:** [ ] SATISFIED / [ ] NOT SATISFIED

## Outputs

- Validation results

## Next Step

Proceed to `step-22-v-generate-report.md`.
