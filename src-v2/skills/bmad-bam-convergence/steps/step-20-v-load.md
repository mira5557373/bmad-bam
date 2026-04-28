# Step 20: Load Artifacts for Validation (Validate Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 🔍 **LOAD QG-I1, QG-I2, QG-I3 checklists** - Required for validation

## EXECUTION PROTOCOLS

- 🎯 Focus: Load convergence report and quality gate checklists
- 💾 Track: `stepsCompleted: [20]` when complete
- 📖 Context: Validate mode verifies existing artifact against criteria
- 🚫 Do NOT: Generate new content; Edit mode handles modifications
- ⚠️ Gate: QG-I2 (Tenant Safety), QG-I3 (Agent Safety) - Primary focus

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

Load the convergence report and all quality gate checklists for formal validation. This step prepares all artifacts needed to execute QG-I2 (Tenant Safety) and QG-I3 (Agent Safety) validation checks.

---

## Prerequisites

- Existing convergence report to validate
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: convergence
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-i1.md`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-i2.md`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-i3.md`

---

## Inputs

- Convergence report: `{output_folder}/planning-artifacts/architecture/convergence-report.md`
- Quality gate checklists from `{project-root}/_bmad/bam/data/checklists/`
- Supporting architecture documents

---

## YOUR TASK:

Load all artifacts required for convergence validation.

---

## Validation Sequence

### 1. Load Convergence Report

Load the convergence report:
```
{output_folder}/planning-artifacts/architecture/convergence-report.md
```

If the file does not exist, inform the user and suggest switching to Create mode.

### 2. Load Quality Gate Checklists

Load all three quality gate checklists:

| Checklist | Path | Status |
|-----------|------|--------|
| QG-I1 | `checklists/qg-i1.md` | Loaded/Missing |
| QG-I2 | `checklists/qg-i2.md` | Loaded/Missing |
| QG-I3 | `checklists/qg-i3.md` | Loaded/Missing |

### 3. Load Supporting Documents

Load context documents for cross-reference:

| Document | Path | Status |
|----------|------|--------|
| Master Architecture | `architecture/master-architecture.md` | Loaded/Missing |
| Module Architectures | `modules/*/architecture.md` | {{count}} loaded |
| Facade Contracts | `facades/*.md` | {{count}} loaded |

### 4. Display Report Summary

| Attribute | Value |
|-----------|-------|
| Document Path | {{path}} |
| Version | {{version}} |
| Last Modified | {{date}} |
| Status | {{status}} |

#### Current Gate Decisions

| Gate | Status | Critical Issues | Standard Issues |
|------|--------|-----------------|-----------------|
| QG-I1 | {{status}} | {{count}} | {{count}} |
| QG-I2 | {{status}} | {{count}} | {{count}} |
| QG-I3 | {{status}} | {{count}} | {{count}} |

#### Current Release Decision

| Field | Value |
|-------|-------|
| Decision | GO / GO with Conditions / NO-GO |
| Conditions | {{list}} |

### 5. Identify Validation Scope

Determine which gates to validate:

- [ ] Validate QG-I1 (Cross-Module Convergence)
- [ ] Validate QG-I2 (Tenant Safety) - **Primary focus**
- [ ] Validate QG-I3 (Agent Safety) - **Primary focus**
- [ ] Full re-validation of all gates

Default: Validate QG-I2 and QG-I3 (primary convergence gates)

### 6. Prepare Validation Criteria

Extract critical checks from each checklist:

#### QG-I2 Critical Checks

- [ ] Cross-tenant access tests all pass
- [ ] Data isolation verified end-to-end
- [ ] Cache isolation verified
- [ ] Storage isolation verified

#### QG-I3 Critical Checks

- [ ] Agent tenant isolation verified
- [ ] Tool execution boundaries enforced
- [ ] Memory isolation between tenants
- [ ] Output sanitization in place

---

## SUCCESS METRICS:

- [ ] Convergence report loaded successfully
- [ ] All quality gate checklists loaded
- [ ] Supporting documents loaded
- [ ] Validation scope confirmed
- [ ] Ready for validation execution

---

## FAILURE MODES:

| Failure | Recovery |
|---------|----------|
| Report not found | Run Create mode first |
| Checklist missing | Check BAM installation |
| Supporting docs missing | Document as validation gap |

---

## Verification

- [ ] Convergence report loaded correctly
- [ ] Quality gate checklists available
- [ ] Validation criteria prepared
- [ ] User confirmed validation scope

---

## Outputs

- Loaded convergence report
- Quality gate checklists ready
- Validation scope confirmed
- Critical checks identified

---

## NEXT STEP:

Proceed to `step-21-v-validate.md` to execute convergence validation checks.
