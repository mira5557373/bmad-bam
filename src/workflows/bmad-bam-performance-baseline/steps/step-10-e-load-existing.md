# Step 10: Load Existing Artifact

## Purpose

Load existing performance baseline design for modification.

## MANDATORY EXECUTION RULES

**FOLLOW THESE RULES WITHOUT EXCEPTION:**

1. **COMPLETE EVERY STEP** - Execute all actions in sequence
2. **NO PARTIAL COMPLETIONS** - Finish what you start
3. **VERIFY OUTPUTS** - Confirm each action produces expected results
4. **DOCUMENT DECISIONS** - Record all choices made

---

## Prerequisites

- Performance baseline design artifact exists at output location
- Edit mode selected for modification workflow
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: observability

---

## Actions

### 1. Load Artifacts

| Action | Path |
|--------|------|
| Load | `{output_folder}/planning-artifacts/operations/performance-baseline-design.md` |

### 2. Parse and Confirm

| Action | Description |
|--------|-------------|
| Display summary | Show current document structure |
| Identify targets | Confirm modification targets with user |

---

## Verification

- [ ] Artifact loaded successfully
- [ ] Current content parsed and displayed
- [ ] Modification targets identified and confirmed

---

## Outputs

- Loaded performance baseline design content
- Summary of current state for modification

---

## COLLABORATION MENUS (A/P/C):

```
- **C (Continue)**: Proceed to apply modifications
```

#### If 'C' (Continue):
- Update frontmatter `stepsCompleted: [10]`
- Proceed to: `step-11-e-apply-changes.md`

---

## Next Step

Proceed to `step-11-e-apply-changes.md`.
