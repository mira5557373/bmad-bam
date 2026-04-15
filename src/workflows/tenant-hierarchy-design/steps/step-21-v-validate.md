# Step 21: Validate Tenant Hierarchy Design

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array

---

## Purpose

This step validates the completeness and quality of the tenant hierarchy design, ensuring proper hierarchy levels, permission inheritance, billing rollup, and quota distribution.

---

## Prerequisites

- Step 20: Load Artifact completed successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-isolation`

---

## Verification

### Hierarchy Structure
- [ ] All hierarchy levels (Root, BU, Department, Team, Project) defined
- [ ] Level attributes specified (name, slug, metadata)
- [ ] Maximum nesting depth defined
- [ ] Cross-hierarchy relationships documented
- [ ] Naming constraints specified

### Permission Inheritance
- [ ] Inheritance model defined for all levels
- [ ] Override direction (restrict only) enforced
- [ ] Permission categories (Feature, Quota, Data, Admin, Compliance) documented
- [ ] Resolution algorithm specified
- [ ] Special patterns (Break Glass, Delegation) addressed

### Billing Rollup
- [ ] Charge-back model selected and justified
- [ ] Cost center mapping complete
- [ ] Budget enforcement rules specified
- [ ] Usage reporting aggregation defined
- [ ] Invoice consolidation options documented

### Quota Distribution
- [ ] Quota pool allocation model defined
- [ ] Limit types (Hard, Soft, Reserved, Burst) specified
- [ ] Distribution rules per hierarchy level
- [ ] Burst capacity sharing rules
- [ ] Rebalancing procedures documented

### Operational Runbook
- [ ] Creation procedures for all hierarchy levels
- [ ] Modification procedures complete
- [ ] Deletion procedures with safety checks
- [ ] Troubleshooting guide included
- [ ] Monitoring metrics defined

### Cross-Cutting
- [ ] Consistent with master architecture
- [ ] Consistent with tenant isolation design
- [ ] No orphaned hierarchy levels possible
- [ ] Patterns align with pattern registry

---

## Gate Decision

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-M2`

**Load Checklist:** `{project-root}/_bmad/bam/data/checklists/tenant-isolation.md`

- **PASS**: All hierarchy levels defined, permission inheritance complete, billing and quota rules operational
- **CONDITIONAL**: Minor gaps (e.g., specific timeout values, edge case handling) - document gaps and proceed
- **FAIL**: Missing hierarchy levels, incomplete permission inheritance, or invalid billing/quota rules - return to Create mode

Present validation results with specific findings for each section.

---

## Actions

1. Load the relevant documents
2. Apply modifications as specified
3. Generate summary of changes

---

## COLLABORATION MENUS (A/P/C):

After completing validation checks, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation findings and edge cases
- **P (Party Mode)**: Bring analyst and architect perspectives for validation review
- **C (Continue)**: Accept validation results and proceed to generate report
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass validation context: findings, gate decision, gaps identified
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into validation results
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review hierarchy validation: {summary of findings and gate decision}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation results
- Update frontmatter `stepsCompleted: [20, 21]`
- Proceed to next step: `step-22-v-generate-report.md`

---

## Outputs

- Validated tenant hierarchy design
- Validation gate decision (PASS/CONDITIONAL/FAIL)
- Configuration gaps documented (if CONDITIONAL)
- Required fixes list (if FAIL)

---

## Next Step

If PASS: Hierarchy design complete, ready for implementation sprint planning.
If CONDITIONAL: Document gaps with remediation timeline and proceed.
If FAIL: Return to Create mode to address missing hierarchy levels or incomplete rules.
