# Step 20: Load Epic Document for Validation (Validate Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 🔍 **LOAD validation checklist** - Epic quality criteria
- 📋 **VERIFY artifact exists** before proceeding to validation checks

## EXECUTION PROTOCOLS

- 🎯 Focus: Load epic document and validation checklist
- 💾 Track: `stepsCompleted: [20]` when complete
- 📖 Context: Validate mode verifies existing artifact against quality criteria
- 🚫 Do NOT: Generate new content; Edit mode handles modifications
- 🔍 Use web search: Verify current epic validation best practices
- ⚠️ Gate: Epic validation ensures implementation readiness

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

Load the existing module epic document and validation checklist in preparation for formal quality verification. This validates that epics and stories meet BAM multi-tenant standards and are ready for implementation.

---

## Prerequisites

- Epic document exists at `{output_folder}/planning-artifacts/modules/{module}/epics.md`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-m1.md` (or equivalent)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: epic-*

---

## YOUR TASK

Load the epic document created in Create mode. If the artifact does not exist, inform the user and suggest switching to Create mode. Prepare all validation criteria for systematic verification.

---

## Main Sequence

### Action 1: Load Epic Document

**Attempt to read:**

```
{output_folder}/planning-artifacts/modules/{module}/epics.md
```

**If artifact does not exist:**
- Inform user: "Epic document not found. Please run Create mode first."
- Suggest: `bmad-bam-module-epics` Create mode (step-01-c-*)
- HALT validation workflow

**If artifact exists, extract metadata:**

| Attribute | Value |
|-----------|-------|
| Document Path | `{output_folder}/planning-artifacts/modules/{module}/epics.md` |
| Module | {module_name from frontmatter} |
| Version | {from frontmatter} |
| Tenant Model | {tenant_model} |
| Total Epics | {epic_count} |
| Total Stories | {story_count} |
| Total Points | {total_points} |
| Last Modified | {date} |
| Create Steps Completed | {stepsCompleted array} |

### Action 2: Load Validation Checklist

Extract the validation categories:

| Category | Classification | Pass Criteria |
|----------|----------------|---------------|
| Epic Structure | CRITICAL | All epics have required sections |
| Story Completeness | CRITICAL | All stories have tenant context |
| Estimation | Non-critical | All stories have point estimates |
| Sprint Allocation | Non-critical | Stories allocated to sprints |
| Done Criteria | CRITICAL | DoD defined with QG mappings |
| Dependencies | Non-critical | Dependencies mapped |

### Action 3: Verify Core Components Present

Check document contains all required components:

| Component | Present | Status |
|-----------|---------|--------|
| Executive Summary | [ ] | |
| Module Boundaries | [ ] | |
| Epic List | [ ] | |
| User Stories | [ ] | |
| Sprint Allocation | [ ] | |
| Definition of Done | [ ] | |
| Quality Gate Requirements | [ ] | |
| Dependencies | [ ] | |
| Change Log | [ ] | |

**If any component missing:**
- Document which components are incomplete
- This will result in FAIL at validation

### Action 4: Verify Tenant Context Presence

Check for tenant-scoping in all stories:

| Story ID | Tenant Scope | Tier Availability | Isolation | Status |
|----------|--------------|-------------------|-----------|--------|
| S-{module}-001-01 | [ ] | [ ] | [ ] | |
| S-{module}-001-02 | [ ] | [ ] | [ ] | |
| S-{module}-002-01 | [ ] | [ ] | [ ] | |

**CRITICAL:** All stories must have tenant context defined.

### Action 5: Prepare Validation Summary

Present document overview to user:

```
================================================================================
EPIC DOCUMENT LOADED FOR VALIDATION
================================================================================

DOCUMENT: {output_folder}/planning-artifacts/modules/{module}/epics.md
MODULE: {module_name}
VERSION: {version}

CONTENTS:
- Epics: {epic_count}
- Stories: {story_count}
- Total Points: {total_points}
- Sprints: {sprint_count}

TENANT MODEL: {tenant_model}

VALIDATION CATEGORIES:
- Epic Structure (CRITICAL)
- Story Completeness (CRITICAL)
- Estimation (Non-critical)
- Sprint Allocation (Non-critical)
- Done Criteria (CRITICAL)
- Dependencies (Non-critical)

================================================================================
Ready for validation checks?
================================================================================
```

---

## Quality Gate Integration

**Epic Validation Scope:**

This validation workflow verifies the epic document meets implementation readiness criteria:

- All epics have complete structure
- All stories have tenant context
- Sprint allocation is realistic
- Done criteria align with quality gates
- **CRITICAL:** No stories missing tenant isolation requirements

**Validation Outcomes:**

| Outcome | Definition |
|---------|------------|
| **PASS** | All CRITICAL checks pass, non-critical documented |
| **CONDITIONAL** | All CRITICAL pass, non-critical gaps with remediation plan |
| **FAIL** | Any CRITICAL check fails - block until resolved |
| **WAIVED** | Non-critical item waived with stakeholder sign-off |

---

## SUCCESS METRICS

- ✅ Epic document loaded successfully
- ✅ Document metadata extracted and displayed
- ✅ Validation checklist loaded and understood
- ✅ Core components presence verified
- ✅ Tenant context markers identified
- ✅ Validation readiness confirmed by user
- ✅ Create mode steps (1-5) completed in document

---

## FAILURE MODES

- ❌ **Document not found:** Redirect to Create mode
- ❌ **Missing frontmatter:** Cannot extract metadata
- ❌ **Incomplete Create mode:** stepsCompleted missing steps 1-5
- ❌ **Checklist not found:** Verify BAM installation

---

## Verification

- [ ] Document loaded from correct path
- [ ] Document metadata captured
- [ ] Validation checklist loaded
- [ ] Core components verified present
- [ ] Tenant context markers identified
- [ ] User confirmed ready for validation

---

## Outputs

- Loaded document content with metadata
- Validation criteria prepared
- Validation readiness confirmation

---

## NEXT STEP

Proceed to `step-21-v-validate.md` to run validation checks against the epic document. The validation step will systematically verify all CRITICAL and non-critical criteria.
