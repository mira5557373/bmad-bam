# Step 20: Load Consent Spec for Validation

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

This step loads the consent management specification artifact for validation against GDPR requirements.

## Prerequisites

- Consent management specification artifact exists to validate
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance

## Artifact Location

Load the existing consent management specification document:
- `{output_folder}/planning-artifacts/gdpr-consent-management-spec.md`

## Document Structure Validation

| Required Section | Present | Valid |
|------------------|---------|-------|
| Processing Purposes | {Yes/No} | {Valid/Invalid} |
| Lawful Basis Mapping | {Yes/No} | {Valid/Invalid} |
| Consent Collection | {Yes/No} | {Valid/Invalid} |
| Consent Storage | {Yes/No} | {Valid/Invalid} |
| Preference Center | {Yes/No} | {Valid/Invalid} |

---

## Actions

### 1. Load Artifact
### 2. Validate Content
### 3. Generate Findings

---

## COLLABORATION MENUS (A/P/C)

### [C] Continue - Workflow Navigation
- **C1**: Continue to Step 21 (Validate Consent) - load `step-21-v-validate-consent.md`
- **C2**: Switch to Create Mode - load `step-01-c-define-purposes.md`
- **C3**: Switch to Edit Mode - load `step-10-e-load-consent.md`

---

## Verification

- [ ] Artifact loaded successfully
- [ ] Document structure validated
- [ ] All required sections present
- [ ] Validation context prepared

## Outputs

- Validation context prepared
- Document structure assessment

## Next Step

Proceed to `step-21-v-validate-consent.md` to run validation checks against GDPR requirements.
