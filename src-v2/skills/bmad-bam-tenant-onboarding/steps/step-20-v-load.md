# Step 20: Load Design for Validation (Validate Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER proceed without loading QG-ONBOARD validation checklist**
- 📖 **CRITICAL: ALWAYS verify provisioning saga** has defined steps and rollback
- 🔄 **CRITICAL: Check all 7 validation categories** are present in checklist
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **VERIFY tier coverage** - Free, Pro, Enterprise configurations must exist
- ✅ **CONFIRM QG-F1 prerequisite** - Foundation gate must pass first

## EXECUTION PROTOCOLS

- 🎯 Focus: Load onboarding design and validation checklist
- 💾 Track: `stepsCompleted: [20]` when complete
- 📖 Context: Document state and validation criteria
- 🚫 Do NOT: Run validation checks in this step - load only
- 🔍 Use web search: Not required for loading
- ⚠️ Gate: Tenant lifecycle patterns

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

Load the tenant onboarding design artifact and validation checklist for quality assessment.

---

## YOUR TASK

Load the existing tenant onboarding design artifact and prepare the validation checklist. Extract document metadata including version, tenant model, and tier coverage. Verify all required sections are present and identify the applicable quality gate (QG-ONBOARD) for validation.

---

## Prerequisites

- Existing tenant onboarding design to validate
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-lifecycle
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-ops.md`

---

## Inputs

- Document: `{output_folder}/planning-artifacts/tenant-onboarding-design.md`
- Checklist: `{project-root}/_bmad/bam/data/checklists/qg-ops.md`
- Quality gates: `{project-root}/_bmad/bam/data/quality-gates.csv`

---

## Actions

### 1. Load Design Artifact

Load the tenant onboarding design:

```
{output_folder}/planning-artifacts/tenant-onboarding-design.md
```

If the file does not exist, inform the user and suggest switching to Create mode.

### 2. Display Artifact Summary

Present artifact overview:

| Attribute | Value |
|-----------|-------|
| Document Path | `{path}` |
| Version | `{version}` |
| Last Modified | `{date}` |
| Tenant Model | `{tenant_model}` |
| Status | `{status}` |
| Tiers Covered | `{tiers}` |

### 3. Load Validation Checklist

Load the onboarding design validation checklist and present categories:

| Checklist Category | Items | Critical |
|--------------------|-------|----------|
| Registration Flow | {count} | {count} |
| Provisioning Saga | {count} | {count} |
| Resource Initialization | {count} | {count} |
| Validation Design | {count} | {count} |
| Rollback Procedures | {count} | {count} |
| Monitoring & Alerting | {count} | {count} |
| Security Controls | {count} | {count} |
| **Total** | {total} | {critical_total} |

### 4. Identify Quality Gate

Map to applicable quality gate:

| Quality Gate | ID | Description |
|--------------|----|-------------|
| Tenant Onboarding Design | QG-ONBOARD | Validates completeness of onboarding design |
| Prerequisite | QG-F1 | Foundation gate must pass first |

### 5. Prepare for Validation

Confirm readiness for validation:

| Readiness Check | Status |
|-----------------|--------|
| Document loaded | [ ] |
| Checklist loaded | [ ] |
| Quality gate identified | [ ] |
| Prerequisites verified | [ ] |

---

## SUCCESS METRICS

- ✅ Onboarding design artifact loaded successfully
- ✅ Document metadata extracted (version, model, tiers)
- ✅ Validation checklist loaded with all 7 categories
- ✅ Quality gate QG-ONBOARD identified
- ✅ Validation readiness confirmed with user

---

## FAILURE MODES

- ❌ **Artifact not found:** Redirect to Create mode
- ❌ **Missing checklist:** Cannot proceed without validation criteria
- ❌ **Incomplete document:** Required sections missing blocks validation
- ❌ **QG-F1 prerequisite not met:** Foundation gate must pass first

---

## Verification

- [ ] Artifact loaded successfully
- [ ] Document metadata captured
- [ ] Validation checklist loaded
- [ ] Quality gate identified
- [ ] Ready for validation checks

---

## Outputs

- Loaded artifact content summary
- Validation checklist with categories
- Quality gate mapping
- Validation readiness confirmation

---

## Next Step

Proceed to `step-21-v-validate.md` to run validation checks.
