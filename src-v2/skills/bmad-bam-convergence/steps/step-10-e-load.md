# Step 10: Load Existing Convergence Report (Edit Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 📋 **VERIFY artifact exists** before proceeding to modifications

## EXECUTION PROTOCOLS

- 🎯 Focus: Load existing convergence report for modification
- 💾 Track: `stepsCompleted: [10]` when complete
- 📖 Context: Edit mode modifies existing artifact without full recreation
- 🚫 Do NOT: Generate new content; load existing content for editing

---


## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Loading existing artifact
- Applying user-requested changes
- Preserving existing content

**OUT OF SCOPE:**
- Creating new artifacts (use Create mode)
- Validation (use Validate mode)
## Purpose

Load the existing convergence report for modification. Edit mode allows updating gate decisions, adding new verification findings, refreshing risk assessments, or modifying release recommendations without recreating the entire convergence verification from scratch.

---

## Prerequisites

- Existing convergence report to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: convergence
- **Load checklists:** QG-I1, QG-I2, QG-I3

---

## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## YOUR TASK:

Load the existing convergence report and identify modification scope.

---

## Load Sequence

### 1. Load Convergence Report

Load the existing convergence report:
```
{output_folder}/planning-artifacts/architecture/convergence-report.md
```

If the file does not exist, inform the user and suggest switching to Create mode.

### 2. Load Context Documents

Also load for reference:
- Master architecture: `{output_folder}/planning-artifacts/architecture/master-architecture.md`
- Module architectures: `{output_folder}/planning-artifacts/modules/*/architecture.md`
- Facade contracts: `{output_folder}/planning-artifacts/facades/*.md`

### 3. Parse and Display Summary

Extract and present current state:

#### 3.1 Gate Status Summary

| Quality Gate | Current Status | Last Verified | Issues |
|--------------|----------------|---------------|--------|
| QG-I1 (Convergence) | {{status}} | {{date}} | {{count}} |
| QG-I2 (Tenant Safety) | {{status}} | {{date}} | {{count}} |
| QG-I3 (Agent Safety) | {{status}} | {{date}} | {{count}} |

#### 3.2 Release Recommendation

| Field | Value |
|-------|-------|
| Current Decision | GO / GO with Conditions / NO-GO |
| Last Updated | {{date}} |
| Conditions | {{list}} |

#### 3.3 Document Metadata

| Attribute | Value |
|-----------|-------|
| Document Path | {{path}} |
| Version | {{version}} |
| Last Modified | {{date}} |
| Author | {{author}} |

### 4. Identify Modification Scope

Ask the user which sections need modification:

- [ ] Update QG-I1 (Cross-Module Convergence) findings
- [ ] Update QG-I2 (Tenant Safety) findings
- [ ] Update QG-I3 (Agent Safety) findings
- [ ] Modify risk assessment
- [ ] Update release recommendation
- [ ] Add new verification findings
- [ ] Refresh integration test results
- [ ] Update module readiness matrix

Capture the specific changes requested before proceeding.

### 5. Validate Current State

Before editing, verify:

| Check | Status |
|-------|--------|
| Report format valid | YES/NO |
| All gate sections present | YES/NO |
| Risk assessment exists | YES/NO |
| Release recommendation documented | YES/NO |

---

## SUCCESS METRICS:

- [ ] Convergence report loaded successfully
- [ ] Current gate statuses extracted
- [ ] Modification scope identified
- [ ] User confirmed changes to make

---

## FAILURE MODES:

| Failure | Recovery |
|---------|----------|
| Report not found | Switch to Create mode |
| Report format invalid | Regenerate from template |
| Missing gate sections | Add missing sections during edit |

---

## Verification

- [ ] Convergence report loaded correctly
- [ ] Summary accurately reflects current state
- [ ] Modification scope clearly identified
- [ ] Patterns align with pattern registry

---

## Outputs

- Summary of current convergence report
- Confirmed modification scope from user

---

## NEXT STEP:

Proceed to `step-11-e-apply.md` with confirmed modification scope.
