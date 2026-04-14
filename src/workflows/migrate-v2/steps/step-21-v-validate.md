# Step 21: Validate Migration

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

### EXECUTION PROTOCOLS

- 🎯 **Output Delivery:** Present outputs clearly with headers
- 💾 **State Persistence:** Update document frontmatter after changes
- 📝 **Documentation:** Record decisions with rationale
- ✅ **Verification:** Confirm completion before proceeding

---

## Purpose

Validate migration completeness.

---

## Prerequisites

- Step 20 completed: Artifact loaded

---


## Inputs

- Loaded artifact from validation step 20
- Quality gate criteria and checklist
- Pattern registry for validation rules
- Previous validation findings (if re-validating)

---

## Actions

### 1. Load Artifact

- Read the migration artifact from `{output_folder}/planning-artifacts/migration-report.md`
- Parse and validate structure

### 2. Validate Content

Execute validation checklist against loaded artifact.

### 3. Generate Findings

Document any issues found:

| Finding | Severity | Category | Recommendation |
|---------|----------|----------|----------------|
| {issue} | CRITICAL/HIGH/MEDIUM/LOW | {category} | {action} |

---

## Validation Checklist

### v1 Artifacts Removed
- [ ] No `**Load knowledge:**` references
- [ ] No knowledge folder references
- [ ] No uppercase template variables

### v2 Artifacts Present
- [ ] Pattern references valid
- [ ] A/P/C menus in all step files
- [ ] MANDATORY EXECUTION RULES present

---

## Gate Decision Criteria

| Decision | Criteria |
|----------|----------|
| **PASS** | All v1 removed, all v2 present |
| **CONDITIONAL** | Minor cleanup needed |
| **FAIL** | Significant v1 artifacts remain |

---

## COLLABORATION MENUS (A/P/C):

After validation, present the user with:

```
Your options:
- **C (Continue)**: Generate validation report

Select an option:
```

---

## PROTOCOL INTEGRATION

### A/P/C Handler
- **[A] Response:** Deep-dive into requested topic, then return to current step
- **[P] Response:** Acknowledge party mode, continue with enhanced engagement
- **[C] Response:** Proceed to next logical step in workflow

---

## Verification

- [ ] Artifact loaded and parsed
- [ ] Validation checklist executed
- [ ] Findings documented
- [ ] Gate decision determined

---

## Outputs

- Validation checklist results
- Findings list with severity
- Gate decision (PASS/CONDITIONAL/FAIL)

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate report.
