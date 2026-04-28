# Step 20: Load Artifact for Validation (Validate Mode)

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 **Focus:** Load artifact and validation checklist, confirm validation scope with user
- 💾 **Track:** `stepsCompleted: [20]` when complete
- 📖 **Context:** Validate mode entry point - artifact must exist to proceed
- 🚫 **Do NOT:** Execute validation checks in this step - only prepare for validation
- 🔍 **Use web search:** Not applicable for Validate mode - verify against defined criteria only

---


## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Loading artifact and checklist
- Evaluating against criteria
- Documenting evidence

**OUT OF SCOPE:**
- Modifying the artifact
- Creating new content
## Purpose

Load the white-labeling design artifact and validation checklist for quality gate verification.

---

## YOUR TASK

Load the existing white-labeling design artifact and prepare validation criteria. Extract document metadata including version, status, and sections present. Load or generate the validation checklist covering branding, domain architecture, feature customization, tier alignment, implementation feasibility, and security considerations. Confirm validation scope with user.

---

## Prerequisites

- Existing white-labeling design to validate
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `customization`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-wl1.md` (if exists)

---

## Actions

### 1. Load Artifact

Load the white-labeling design:
- `{output_folder}/planning-artifacts/white-labeling-design.md`

If the file does not exist, inform the user and suggest switching to Create mode.

### 2. Display Artifact Summary

Present artifact overview:

| Attribute | Value |
|-----------|-------|
| Document Path | {path} |
| Version | {version} |
| Last Modified | {date} |
| Status | {status} |
| Sections Present | {count} |

### 3. Load Validation Checklist

Load or generate validation criteria for white-labeling:

| Category | Criteria Count | Weight |
|----------|----------------|--------|
| Branding Completeness | {count} | High |
| Domain Architecture | {count} | High |
| Feature Customization | {count} | Medium |
| Tier Alignment | {count} | High |
| Implementation Feasibility | {count} | Medium |
| Security Considerations | {count} | High |

### 4. Prepare Validation Scope

Confirm validation scope with user:

| Validation Area | Include | Notes |
|-----------------|---------|-------|
| Branding design | {Yes/No} | {notes} |
| Domain design | {Yes/No} | {notes} |
| Feature design | {Yes/No} | {notes} |
| Tier matrix | {Yes/No} | {notes} |
| Architecture | {Yes/No} | {notes} |
| Security review | {Yes/No} | {notes} |

---

## SUCCESS METRICS

- ✅ White-labeling design artifact loaded successfully
- ✅ Document metadata extracted (version, status, sections)
- ✅ Validation checklist loaded with 6 categories
- ✅ Category weights identified (High/Medium)
- ✅ Validation scope confirmed with user

---

## FAILURE MODES

- ❌ **Artifact not found:** Redirect to Create mode
- ❌ **Missing checklist:** Generate criteria from standard template
- ❌ **Incomplete document:** Required sections missing blocks validation
- ❌ **Scope unclear:** User must confirm validation areas

---

## Verification

- [ ] Artifact loaded successfully
- [ ] Document metadata captured
- [ ] Validation checklist loaded
- [ ] Validation scope confirmed with user
- [ ] Ready for validation checks

---

## Outputs

- Artifact summary
- Validation checklist
- Confirmed validation scope

---

## Next Step

Proceed to `step-21-v-validate.md` to execute validation checks.
