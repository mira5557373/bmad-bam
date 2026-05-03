# Step 10: Load Existing Decision Log

## MANDATORY EXECUTION RULES

- NEVER modify the decision log during this step - load only
- Load governance patterns before proceeding
- Pause after presenting findings and await user direction

---

## YOUR TASK

Locate, load, and parse the existing decision log. Extract current ADRs and present a structured summary for the user to identify what needs modification.

---

## Load Sequence

### 1. Locate Document

Search in priority order:

| Priority | Location |
|----------|----------|
| 1 | `{output_folder}/planning-artifacts/decision-log.md` |
| 2 | `{project-root}/docs/architecture/decision-log.md` |
| 3 | `{project-root}/**/decision-log.md` (fallback) |

**If not found:** Suggest Create mode (step-01-c-start.md) or request path.

### 2. Parse Decision Log

Extract current ADRs:

```yaml
decision_log:
  adr_count: [number]
  statuses:
    proposed: [count]
    accepted: [count]
    deprecated: [count]
    superseded: [count]
  categories: [list]
```

### 3. Present Edit Menu

Display decision log summary:

```
================================================================================
ARCHITECTURE DECISION LOG - EDIT MODE
================================================================================
Document: decision-log.md
ADR Count: {count}
================================================================================

CURRENT ADRs:
| ADR # | Title | Status | Date |
|-------|-------|--------|------|
| ADR-001 | ... | Accepted | ... |

EDIT OPTIONS:
[1] Add New ADR - Create new decision record
[2] Update ADR Status - Change status of existing ADR
[3] Supersede ADR - Mark ADR as superseded
[4] Edit ADR Content - Modify existing ADR details
[5] Update Decision Index - Refresh index table

================================================================================
Select option or 'C' to cancel:
```

---

## SUCCESS METRICS

- Decision log document located
- Current ADRs extracted and displayed
- Edit menu presented
- User has selected option to edit

---

## NEXT STEP

After user identifies modifications, proceed to `step-11-e-apply.md`.
