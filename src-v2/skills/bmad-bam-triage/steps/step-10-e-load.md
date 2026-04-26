# Step 10: Load Existing Triage Report (Edit Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 📋 **VERIFY artifact exists** before proceeding to modifications

## EXECUTION PROTOCOLS

- 🎯 Focus: Load existing triage report for modification
- 💾 Track: `stepsCompleted: [10]` when complete
- 📖 Context: Edit mode modifies existing artifact without full recreation
- 🚫 Do NOT: Generate new content; load existing content for editing

---

## Purpose

Load the existing triage report for modification. Edit mode allows updating complexity scores, adjusting priorities, modifying phase assignments, or refreshing timeline estimates without recreating the entire triage analysis from scratch.

---

## Prerequisites

- Existing triage report to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: triage
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-pl1.md`

---

## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## YOUR TASK:

Load the existing triage report and identify modification scope.

---

## Load Sequence

### 1. Load Triage Report

Load the existing triage report:

```
{output_folder}/planning-artifacts/triage-report.md
```

If the file does not exist, inform the user and suggest switching to Create mode.

### 2. Load Context Documents

Also load for reference:
- Requirements: `{output_folder}/planning-artifacts/requirements/*.md`
- Master architecture (if exists): `{output_folder}/planning-artifacts/architecture/master-architecture.md`

### 3. Parse and Display Summary

Extract and present current state:

#### 3.1 Module Summary

| Module | Current Score | Current Priority | Current Phase |
|--------|---------------|------------------|---------------|
| {{module}} | {{score}} | {{priority}} | Phase {{n}} |

#### 3.2 Timeline Summary

| Phase | Modules | Current Duration | Start | End |
|-------|---------|------------------|-------|-----|
| Phase 1 | {{count}} | {{weeks}}w | Week {{n}} | Week {{n}} |
| Phase 2 | {{count}} | {{weeks}}w | Week {{n}} | Week {{n}} |
| Phase 3 | {{count}} | {{weeks}}w | Week {{n}} | Week {{n}} |
| Phase 4 | {{count}} | {{weeks}}w | Week {{n}} | Week {{n}} |

#### 3.3 Resource Summary

- Total duration: {{weeks}} weeks
- Team size: {{size}} engineers
- High-risk modules: {{count}}

### 4. Identify Modification Scope

Present modification options:

```
Available modification types:
1. [SCORE] - Update complexity scores for specific modules
2. [PRIORITY] - Adjust module priorities
3. [PHASE] - Reassign modules to different phases
4. [TIMELINE] - Update duration estimates
5. [RESOURCE] - Modify resource allocation
6. [RISK] - Update risk assessment
7. [ADD] - Add new modules to triage
8. [REMOVE] - Remove modules from triage
9. [FULL] - Major restructuring (multiple sections)

Enter modification type or describe changes:
```

### 5. Confirm Edit Scope

Based on user input, confirm:

| Section | Action | Modules Affected |
|---------|--------|------------------|
| {{section}} | {{action}} | {{modules}} |

**Edit scope confirmed. Proceed to apply changes?**

---

## Verification

- [ ] Existing triage report loaded
- [ ] Current state summarized
- [ ] Modification scope identified
- [ ] User confirmed edit targets

---

## Outputs

- Loaded artifact content
- Current state summary
- Confirmed modification scope

---

## Next Step

Proceed to `step-11-e-apply.md` to apply the requested modifications.
