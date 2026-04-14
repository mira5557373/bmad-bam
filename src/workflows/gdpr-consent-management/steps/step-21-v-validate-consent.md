# Step 21: Validate Consent Management

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

Execute comprehensive validation of the consent management specification against GDPR consent requirements (Articles 6, 7, 13, 14).

## Prerequisites

- Consent specification loaded (Step 20 complete)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance

---

## Actions

### 1. Validate Consent Requirements (Article 7)

| Validation Check | Requirement | Status | Finding |
|------------------|-------------|--------|---------|
| Freely given | No service denial | {Pass/Fail} | {Detail} |
| Specific | Granular purposes | {Pass/Fail} | {Detail} |
| Informed | Clear language | {Pass/Fail} | {Detail} |
| Unambiguous | Affirmative action | {Pass/Fail} | {Detail} |
| Withdrawable | Easy withdrawal | {Pass/Fail} | {Detail} |

### 2. Validate Information Requirements (Articles 13/14)

| Information Element | Required | Provided | Status |
|---------------------|----------|----------|--------|
| Controller identity | Yes | {Yes/No} | {Pass/Fail} |
| Processing purposes | Yes | {Yes/No} | {Pass/Fail} |
| Lawful basis | Yes | {Yes/No} | {Pass/Fail} |
| Data categories | Yes | {Yes/No} | {Pass/Fail} |
| Recipients | Yes | {Yes/No} | {Pass/Fail} |
| Retention period | Yes | {Yes/No} | {Pass/Fail} |
| Data subject rights | Yes | {Yes/No} | {Pass/Fail} |

### 3. Validate Lawful Basis (Article 6)

| Purpose | Claimed Basis | Valid | Justification |
|---------|---------------|-------|---------------|
| {Purpose 1} | {Basis} | {Yes/No} | {Justification} |
| {Purpose 2} | {Basis} | {Yes/No} | {Justification} |

### 4. Validate Consent Storage

| Validation Check | Requirement | Status | Finding |
|------------------|-------------|--------|---------|
| Proof of consent | Demonstrable | {Pass/Fail} | {Detail} |
| Consent record | Complete schema | {Pass/Fail} | {Detail} |
| Audit trail | Available | {Pass/Fail} | {Detail} |
| Tenant isolation | Enforced | {Pass/Fail} | {Detail} |

---

## COLLABORATION MENUS (A/P/C)

### [C] Continue - Workflow Navigation
- **C1**: Continue to Step 22 (Generate Report) - load `step-22-v-generate-report.md`
- **C2**: Switch to Edit Mode - load `step-10-e-load-consent.md`
- **C3**: Return to workflow overview

---

## Verification

- [ ] Article 7 requirements validated
- [ ] Articles 13/14 information checked
- [ ] Lawful basis verified
- [ ] Storage requirements validated
- [ ] All findings documented

## Outputs

- GDPR consent compliance matrix
- Gap analysis with severity ratings

## Next Step

Proceed to `step-22-v-generate-report.md` to generate the validation report.
