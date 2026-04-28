# Step 20: Load Artifact and Checklist (Validate Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 📋 **LOAD both artifact and checklist** before validation

## EXECUTION PROTOCOLS

- 🎯 Focus: Load triage report and QG-PL1 checklist
- 💾 Track: `stepsCompleted: [20]` when complete
- 📖 Context: Prepare for QG-PL1 validation
- 🚫 Do NOT: Execute validation (that's Step 21)

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

Load the triage report artifact and QG-PL1 quality gate checklist in preparation for validation. This step ensures all required materials are available before executing validation checks.

---

## Prerequisites

- Triage report exists at expected location
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-pl1.md`
- **Load patterns:** `{project-root}/_bmad/bam/data/quality-gates.csv` → filter: QG-PL1

---

## Inputs

- Triage report: `{output_folder}/planning-artifacts/triage-report.md`
- QG-PL1 checklist: `{project-root}/_bmad/bam/data/checklists/qg-pl1.md`
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## YOUR TASK

Load the triage report artifact and QG-PL1 quality gate checklist, verify the document structure contains all required sections (module coverage, complexity scoring, prioritization, dependencies, phases, timeline, resources, risks), and present the validation scope to the user before executing checks.

---

## Load Sequence

### 1. Load Triage Report

Load the triage report from:

```
{output_folder}/planning-artifacts/triage-report.md
```

If file does not exist:
- Inform user: "Triage report not found. Run Create mode first."
- Exit validation mode

### 2. Parse Report Structure

Verify expected sections exist:

| Section | Present | Notes |
|---------|---------|-------|
| Executive Summary | YES/NO | {{note}} |
| Module Complexity Summary | YES/NO | {{note}} |
| Dependency Analysis | YES/NO | {{note}} |
| Implementation Roadmap | YES/NO | {{note}} |
| Resource Requirements | YES/NO | {{note}} |
| Risk Assessment | YES/NO | {{note}} |

### 3. Load QG-PL1 Checklist

Load the QG-PL1 planning gate checklist:

```
{project-root}/_bmad/bam/data/checklists/qg-pl1.md
```

Extract validation criteria:

| Category | Check ID | Description | Critical |
|----------|----------|-------------|----------|
| Module Coverage | PL1-01 | All modules identified | YES |
| Complexity Scoring | PL1-02 | All dimensions scored | YES |
| Prioritization | PL1-03 | Priorities assigned | YES |
| Dependencies | PL1-04 | Dependencies mapped | YES |
| Phases | PL1-05 | Phases defined | NO |
| Timeline | PL1-06 | Duration estimated | NO |
| Resources | PL1-07 | Team size estimated | NO |
| Risks | PL1-08 | Risks documented | NO |

### 4. Load Supporting Context

Load additional context for validation:

- Requirements: `{output_folder}/planning-artifacts/requirements/*.md`
- Master architecture (if exists): `{output_folder}/planning-artifacts/architecture/master-architecture.md`

### 5. Present Validation Scope

Present validation scope to user:

```
VALIDATION SCOPE:

Artifact: triage-report.md
Quality Gate: QG-PL1 (Planning)
Critical Checks: 4
Standard Checks: 4
Total Checks: 8

Ready to execute validation? (y/n)
```

---

## SUCCESS METRICS

- ✅ Triage report artifact located and loaded successfully
- ✅ All 6 required sections identified in document structure
- ✅ QG-PL1 checklist loaded with 8 validation criteria
- ✅ Critical vs standard checks clearly identified
- ✅ Supporting context documents loaded (requirements, architecture)
- ✅ Validation scope summary presented to user
- ✅ User confirmed ready to execute validation

---

## FAILURE MODES

- ❌ **Artifact not found:** Exit validation, direct user to Create mode
- ❌ **Missing sections:** Document structure check fails, list missing sections
- ❌ **Checklist not found:** Cannot validate without criteria, abort with error
- ❌ **Corrupted metadata:** Flag parsing errors, attempt partial load

---

## Verification

- [ ] Triage report loaded
- [ ] Report structure verified
- [ ] QG-PL1 checklist loaded
- [ ] Validation criteria extracted
- [ ] User confirmed ready

---

## Outputs

- Loaded triage report content
- QG-PL1 checklist criteria
- Validation scope summary

---

## Next Step

Proceed to `step-21-v-validate.md` to execute validation checks.
