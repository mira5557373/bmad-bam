# Step 2: Validate Threat Model

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

---

## Purpose

Perform detailed validation of the threat model against security best practices.

## Prerequisites

- Threat model loaded in Step 20
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: security

---

## Actions

### 1. Validate Attack Surface

| Validation Item | Criteria | Status |
|-----------------|----------|--------|
| Component Coverage | All components listed | [ ] |
| Data Flows | Flows documented | [ ] |
| Trust Boundaries | Boundaries defined | [ ] |
| AI Entry Points | AI vectors identified | [ ] |

### 2. Validate STRIDE Coverage

| Validation Item | Criteria | Status |
|-----------------|----------|--------|
| Spoofing | Threats identified | [ ] |
| Tampering | Threats identified | [ ] |
| Repudiation | Threats identified | [ ] |
| Info Disclosure | Threats identified | [ ] |
| Denial of Service | Threats identified | [ ] |
| Privilege Escalation | Threats identified | [ ] |

### 3. Validate Mitigations

| Validation Item | Criteria | Status |
|-----------------|----------|--------|
| Coverage | All high risks mitigated | [ ] |
| Controls | Controls mapped | [ ] |
| Priorities | Priorities assigned | [ ] |

### 4. Validate Risk Register

| Validation Item | Criteria | Status |
|-----------------|----------|--------|
| Completeness | All threats tracked | [ ] |
| Ownership | Owners assigned | [ ] |
| Timelines | Due dates set | [ ] |

---

## COLLABORATION MENUS (A/P/C)

### Menu Options

### [A]nalyze Options
- **A1**: Deep dive into attack surface gaps
- **A2**: Analyze STRIDE coverage
- **A3**: Evaluate mitigation effectiveness
- **A4**: Assess risk register accuracy

### [P]ropose Changes
- **P1**: Propose attack surface additions
- **P2**: Suggest STRIDE improvements
- **P3**: Recommend mitigation enhancements
- **P4**: Propose risk register updates

### [C]ontinue
- **C1**: Accept validation results
- **C2**: Mark step complete and load `step-22-v-generate-report.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Attack surface validated
- [ ] STRIDE coverage validated
- [ ] Mitigations validated
- [ ] Risk register validated

## Outputs

- Validation results
- Gap analysis

## Next Step

Proceed to `step-22-v-generate-report.md`.
