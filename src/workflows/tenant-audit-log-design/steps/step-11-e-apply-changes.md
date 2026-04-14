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

Apply the identified modifications to the audit log design documents, ensuring consistency and compliance integrity.

---

## Prerequisites

- Step 10 completed: Existing artifacts loaded with modification targets identified
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: audit

---

## Inputs

- Modification targets from Step 10
- User specifications for changes
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Apply Schema Modifications

For schema changes:

| Change Type | Action | Validation |
|-------------|--------|------------|
| Add field | Insert with type and constraints | Type compatibility |
| Modify field | Update definition | Migration impact |
| Remove field | Mark deprecated, plan removal | Data retention check |
| Add index | Define index specification | Performance validation |

### 2. Apply Retention Policy Changes

For retention changes:

| Change Type | Action | Validation |
|-------------|--------|------------|
| Extend retention | Update policy duration | Compliance check |
| Reduce retention | Validate against minimums | Regulatory approval |
| Add tier | Define new storage tier | Cost analysis |
| Modify lifecycle | Update automation rules | Transition testing |

### 3. Apply Query Pattern Changes

For query pattern changes:

| Change Type | Action | Validation |
|-------------|--------|------------|
| Add pattern | Document new query template | Performance test |
| Modify access | Update access control matrix | Security review |
| Add format | Define new output format | Consumer compatibility |

### 4. Apply Compliance Mapping Changes

For compliance mapping changes:

| Change Type | Action | Validation |
|-------------|--------|------------|
| Add framework | Map all requirements | Gap analysis |
| Update mapping | Revise control coverage | Audit review |
| Add evidence | Define collection method | Automation test |

### 5. Generate Change Summary

Document all changes made:

| Section | Change | Before | After | Impact |
|---------|--------|--------|-------|--------|
| {section} | {description} | {old} | {new} | {impact} |

---

## COLLABORATION MENUS (A/P/C):

After applying the changes above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into change implications
- **P (Party Mode)**: Bring perspectives on change validation
- **C (Continue)**: Finalize changes and save documents
- **[Specific adjustments]**: Describe additional changes needed

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: changes made, impact assessment
- Process enhanced insights on change completeness
- Ask user: "Accept these change assessments? (y/n)"
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Validate changes to audit log design"
- Process validation perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save updated documents
- Generate change log entry
- Present completion summary

---

## Verification

- [ ] All identified changes applied
- [ ] Schema consistency maintained
- [ ] Compliance mappings valid
- [ ] No regression in coverage
- [ ] Patterns align with pattern registry

---

## Outputs

- Updated audit log design documents
- Change summary log
- Impact assessment

---

## Next Step

Edit workflow complete. Run Validate mode (`step-20-v-*`) to verify changes.

---

## Workflow Complete

Edit mode complete. Updated documents saved to:
- `{output_folder}/planning-artifacts/compliance/audit-log-design.md`
- `{output_folder}/planning-artifacts/compliance/audit-schema.md`
- `{output_folder}/planning-artifacts/compliance/retention-policy.md`
