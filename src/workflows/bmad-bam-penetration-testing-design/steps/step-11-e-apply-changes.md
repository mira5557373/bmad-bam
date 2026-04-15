# Step 11: Apply Changes (Edit Mode)

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array

---

## Purpose

Apply the identified modifications to the penetration testing design documents, ensuring test coverage completeness and methodology consistency.

---

## Prerequisites

- Step 10 completed: Existing artifacts loaded with modification targets identified
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: security

---

## Actions

### 1. Apply Scope Modifications

For scope changes:

| Change Type | Action | Validation |
|-------------|--------|------------|
| Add system | Document new in-scope system | Coverage check |
| Remove system | Mark out-of-scope with rationale | Risk assessment |
| Update rules | Revise engagement rules | Approval required |

### 2. Apply Test Case Modifications

For test case changes:

| Change Type | Action | Validation |
|-------------|--------|------------|
| Add test case | Create with full format | Coverage verification |
| Modify test | Update methodology/expected outcome | Consistency check |
| Remove test | Archive with rationale | Coverage gap analysis |

### 3. Apply Reporting Modifications

For reporting changes:

| Change Type | Action | Validation |
|-------------|--------|------------|
| Update severity | Revise classification | Alignment with standards |
| Update workflow | Modify remediation process | Stakeholder approval |
| Add compliance | Map new framework | Requirement verification |

### 4. Generate Change Summary

| Section | Change | Before | After | Impact |
|---------|--------|--------|-------|--------|
| {section} | {description} | {old} | {new} | {impact} |

---

## COLLABORATION MENUS (A/P/C):

After applying changes, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into change implications
- **P (Party Mode)**: Bring perspectives on change validation
- **C (Continue)**: Finalize changes and save documents
- **[Specific adjustments]**: Describe additional changes needed

Select an option:
```

#### If 'C' (Continue):
- Save updated documents
- Generate change log entry
- Present completion summary

---

## Verification

- [ ] All identified changes applied
- [ ] Test coverage maintained
- [ ] Methodology consistency verified
- [ ] Patterns align with pattern registry

---

## Outputs

- Updated penetration testing design documents
- Change summary log

---

## Next Step

Edit workflow complete. Run Validate mode (`step-20-v-*`) to verify changes.

---

## Workflow Complete

Edit mode complete. Updated documents saved.
