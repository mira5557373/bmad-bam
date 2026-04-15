# Step 2: Validate Zero Trust Design

## MANDATORY EXECUTION RULES (READ FIRST)

- STOP **NEVER generate content without user input** - Wait for explicit direction
- PAUSE **ALWAYS pause after presenting findings** and await user direction

---

## Purpose

Perform detailed validation of the zero-trust design.

## Prerequisites

- Design loaded in Step 20
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: security

---

## Actions

### 1. Validate Identity Architecture

| Validation Item | Criteria | Status |
|-----------------|----------|--------|
| Identity Types | All types defined | [ ] |
| IdP Configuration | Provider configured | [ ] |
| Authorization | Model documented | [ ] |

### 2. Validate Network Segmentation

| Validation Item | Criteria | Status |
|-----------------|----------|--------|
| Network Zones | Zones defined | [ ] |
| Microsegmentation | Configured | [ ] |
| Service Access | Matrix complete | [ ] |

### 3. Validate Continuous Verification

| Validation Item | Criteria | Status |
|-----------------|----------|--------|
| Verification Points | Defined | [ ] |
| Context-Aware | Configured | [ ] |
| Behavioral | Analysis designed | [ ] |

### 4. Validate NIST ZTA Alignment

| Principle | Implementation | Status |
|-----------|----------------|--------|
| Assume breach | Network segmentation | [ ] |
| Verify explicitly | Continuous verification | [ ] |
| Least privilege | Authorization model | [ ] |

---

## COLLABORATION MENUS (A/P/C)

### [C]ontinue
- **C1**: Accept validation results
- **C2**: Load `step-22-v-generate-report.md`

---

## Verification

- [ ] Identity validated
- [ ] Network validated
- [ ] Verification validated
- [ ] NIST alignment checked

## Outputs

- Validation results

## Next Step

Proceed to `step-22-v-generate-report.md`.
