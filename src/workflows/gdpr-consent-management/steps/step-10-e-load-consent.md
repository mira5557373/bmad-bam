# Step 10: Load Existing Consent Management Spec

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

This step loads the existing GDPR consent management specification document for modification.

## Prerequisites

- Existing consent management specification to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance

## Artifact Location

Load the existing consent management specification document:
- `{output_folder}/planning-artifacts/gdpr-consent-management-spec.md`

---

## Actions

### 1. Load Consent Management Specification

Read and parse the existing consent management specification document.

### 2. Parse Document Structure

| Section | Status | Last Updated |
|---------|--------|--------------|
| Processing Purposes | {Status} | {Date} |
| Lawful Basis Mapping | {Status} | {Date} |
| Consent Collection | {Status} | {Date} |
| Consent Storage | {Status} | {Date} |
| Preference Center | {Status} | {Date} |

### 3. Confirm Modification Scope

| Option | Description |
|--------|-------------|
| A | Update processing purposes |
| B | Modify consent collection mechanisms |
| C | Update storage architecture |
| D | Revise preference center design |
| E | Multiple sections (specify) |

---

## COLLABORATION MENUS (A/P/C)

### [C] Continue - Workflow Navigation
- **C1**: Continue to Step 11 (Apply Changes) - load `step-11-e-apply-consent-changes.md`
- **C2**: Switch to Create Mode - load `step-01-c-define-purposes.md`
- **C3**: Switch to Validate Mode - load `step-20-v-load-consent.md`

---

## Verification

- [ ] Existing artifact loaded successfully
- [ ] Document structure parsed correctly
- [ ] Modification scope confirmed with user

## Outputs

- Summary of current consent management specification
- Confirmed list of sections to modify

## Next Step

Proceed to `step-11-e-apply-consent-changes.md` with identified modification targets.
