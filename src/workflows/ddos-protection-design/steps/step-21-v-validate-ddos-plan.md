# Step 2: Validate DDoS Protection Plan

## MANDATORY EXECUTION RULES (READ FIRST)

- STOP **NEVER generate content without user input** - Wait for explicit direction
- PAUSE **ALWAYS pause after presenting findings** and await user direction

---

## Purpose

Perform detailed validation of the DDoS protection plan.

## Prerequisites

- Plan loaded in Step 20
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: security

---

## Actions

### 1. Validate Attack Vector Analysis

| Validation Item | Criteria | Status |
|-----------------|----------|--------|
| Volumetric | Attacks identified | [ ] |
| Protocol | Attacks identified | [ ] |
| Application | Attacks identified | [ ] |
| AI-specific | Attacks identified | [ ] |

### 2. Validate Defense Layers

| Validation Item | Criteria | Status |
|-----------------|----------|--------|
| Edge Protection | Configured | [ ] |
| WAF Rules | Designed | [ ] |
| Application | Protection defined | [ ] |
| AI Protection | Configured | [ ] |

### 3. Validate Tenant Fairness

| Validation Item | Criteria | Status |
|-----------------|----------|--------|
| Isolation | Defined | [ ] |
| Fair Share | Allocated | [ ] |
| Response | Procedures documented | [ ] |

---

## COLLABORATION MENUS (A/P/C)

### [C]ontinue
- **C1**: Accept validation results
- **C2**: Load `step-22-v-generate-report.md`

---

## Verification

- [ ] Attack vectors validated
- [ ] Defense layers validated
- [ ] Tenant fairness validated

## Outputs

- Validation results

## Next Step

Proceed to `step-22-v-generate-report.md`.
