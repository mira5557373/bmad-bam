# Step 21: Validate HIPAA Compliance

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array

---

## Purpose

Execute comprehensive validation of the HIPAA compliance specification against HIPAA Security Rule requirements, Privacy Rule requirements, and BAA regulations.

## Prerequisites

- HIPAA specification loaded (Step 20 complete)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv` → filter: HIPAA


---

## Inputs

- Loaded HIPAA compliance specification
- HIPAA regulatory requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Validate PHI Coverage

Check PHI inventory completeness:

| Validation Check | Requirement | Status | Finding |
|------------------|-------------|--------|---------|
| PHI elements identified | All 18 HIPAA identifiers | {Pass/Fail} | {Detail} |
| Data flows mapped | All PHI movement documented | {Pass/Fail} | {Detail} |
| Sensitivity classified | All PHI categorized | {Pass/Fail} | {Detail} |
| Tenant isolation defined | Per-tenant PHI boundaries | {Pass/Fail} | {Detail} |

### 2. Validate Administrative Safeguards

Check 164.308 compliance:

| Safeguard | HIPAA Reference | Required | Status | Gap |
|-----------|-----------------|----------|--------|-----|
| Security Management | 164.308(a)(1) | Yes | {Pass/Fail} | {Gap} |
| Workforce Security | 164.308(a)(3) | Yes | {Pass/Fail} | {Gap} |
| Information Access | 164.308(a)(4) | Yes | {Pass/Fail} | {Gap} |
| Security Training | 164.308(a)(5) | Yes | {Pass/Fail} | {Gap} |
| Incident Procedures | 164.308(a)(6) | Yes | {Pass/Fail} | {Gap} |
| Contingency Plan | 164.308(a)(7) | Yes | {Pass/Fail} | {Gap} |
| Evaluation | 164.308(a)(8) | Yes | {Pass/Fail} | {Gap} |
| BAA Requirements | 164.308(b)(1) | Yes | {Pass/Fail} | {Gap} |

### 3. Validate Technical Safeguards

Check 164.312 compliance:

| Safeguard | HIPAA Reference | Required | Status | Gap |
|-----------|-----------------|----------|--------|-----|
| Access Control | 164.312(a)(1) | Yes | {Pass/Fail} | {Gap} |
| Audit Controls | 164.312(b) | Yes | {Pass/Fail} | {Gap} |
| Integrity Controls | 164.312(c)(1) | Yes | {Pass/Fail} | {Gap} |
| Authentication | 164.312(d) | Yes | {Pass/Fail} | {Gap} |
| Transmission Security | 164.312(e)(1) | Yes | {Pass/Fail} | {Gap} |

### 4. Validate Physical Safeguards

Check 164.310 compliance:

| Safeguard | HIPAA Reference | Required | Status | Gap |
|-----------|-----------------|----------|--------|-----|
| Facility Access | 164.310(a)(1) | Yes | {Pass/Fail} | {Gap} |
| Workstation Use | 164.310(b) | Yes | {Pass/Fail} | {Gap} |
| Workstation Security | 164.310(c) | Yes | {Pass/Fail} | {Gap} |
| Device Controls | 164.310(d)(1) | Yes | {Pass/Fail} | {Gap} |

### 5. Validate BAA Management

Check BAA compliance:

| Validation Check | Requirement | Status | Finding |
|------------------|-------------|--------|---------|
| BAA template exists | Written agreement | {Pass/Fail} | {Detail} |
| Subcontractor flow-down | Chain tracking | {Pass/Fail} | {Detail} |
| Breach notification SLA | 60-day requirement | {Pass/Fail} | {Detail} |
| Termination procedures | Data return/destroy | {Pass/Fail} | {Detail} |

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Conduct deeper analysis of the current step's domain
- Present additional options and trade-offs
- Return to checkpoint after elicitation

#### If 'P' (Party Mode):
- Enable collaborative exploration
- Generate creative alternatives
- Document insights before returning

#### If 'C' (Continue):
- Verify all outputs are complete
- Proceed to next step file

### Menu Options

### [A] Analyse - Validation Deep Dive
- **A1**: Analyze administrative safeguard implementation details
- **A2**: Evaluate technical control effectiveness
- **A3**: Assess BAA chain completeness
- **A4**: Review breach notification procedure adequacy

### [P] Propose - Remediation Recommendations
- **P1**: Propose remediation plan for critical gaps
- **P2**: Suggest safeguard enhancement priorities
- **P3**: Recommend BAA coverage improvements
- **P4**: Propose validation automation approach

### [C] Continue - Workflow Navigation
- **C1**: Continue to Step 22 (Generate Report) - load `step-22-v-generate-report.md`
- **C2**: Switch to Edit Mode - load `step-10-e-load-hipaa.md`
- **C3**: Return to workflow overview

---

## Verification

- [ ] PHI coverage validated
- [ ] Administrative safeguards checked
- [ ] Technical safeguards verified
- [ ] Physical safeguards assessed
- [ ] BAA management validated
- [ ] All findings documented
- [ ] Patterns align with pattern registry

## Outputs

- PHI coverage validation results
- Safeguard compliance matrix (Administrative/Technical/Physical)
- BAA compliance assessment
- Gap analysis with severity ratings

## Next Step

Proceed to `step-22-v-generate-report.md` to generate the validation report.
