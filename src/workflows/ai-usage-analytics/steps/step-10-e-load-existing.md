# Step 10: Load Existing Artifact

## Purpose

Load existing AI usage analytics design for modification.

## MANDATORY EXECUTION RULES

**FOLLOW THESE RULES WITHOUT EXCEPTION:**

1. **COMPLETE EVERY STEP** - Execute all actions in sequence
2. **NO PARTIAL COMPLETIONS** - Finish what you start
3. **VERIFY OUTPUTS** - Confirm each action produces expected results
4. **DOCUMENT DECISIONS** - Record all choices made

---

## Prerequisites

- AI usage analytics design artifact exists at output location
- Edit mode selected for modification workflow
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `analytics`

---

## Actions

### 1. Load Artifacts

Load: `{output_folder}/planning-artifacts/analytics/ai-usage-analytics-design.md`

### 2. Parse and Confirm

Display summary and confirm modification targets.

---

## Verification

- [ ] Artifact loaded successfully
- [ ] Current content parsed and displayed
- [ ] Modification targets identified and confirmed

---

## Outputs

- Loaded AI analytics design content
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
