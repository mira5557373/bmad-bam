# Step 21: Validate RBAC/ABAC Architecture

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array

---

## Purpose

Validate the RBAC/ABAC architecture against security criteria, ensuring complete permission model, role hierarchy, attribute policies, and tenant scoping design.

---

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: security
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-security-continuous.md`

---

## Inputs

- Loaded artifact from validation step 20
- Quality gate criteria and checklist
- Pattern registry for validation rules
- Previous validation findings (if re-validating)

---

## Actions

### 1. Load Artifact

- Read the artifact from `{output_folder}/` specified location
- Parse and validate structure

### 2. Validate Content

- Check all required sections are present
- Verify cross-references are valid
- Validate against quality gate checklist

### 3. Generate Findings

- Document any issues found
- Categorize by severity (Critical/High/Medium/Low)

---

## Validation Checklist

### Permission Model
- [ ] Permission taxonomy defined with naming conventions
- [ ] Resource-action mappings documented
- [ ] Permission grouping established
- [ ] Cross-tenant boundaries defined
- [ ] Least privilege principle applied

### Role Hierarchy
- [ ] Platform vs tenant roles differentiated
- [ ] Role inheritance hierarchy documented
- [ ] Assignment rules configured
- [ ] Separation of duties enforced
- [ ] Role limits defined

### Attribute Policies
- [ ] Attribute categories defined with sources
- [ ] PDP/PEP architecture designed
- [ ] Condition evaluation syntax documented
- [ ] Dynamic resolution flow specified
- [ ] Performance budgets allocated

### Tenant Scoping
- [ ] Tenant isolation mechanisms defined
- [ ] Cross-tenant patterns controlled
- [ ] Tenant admin capabilities bounded
- [ ] Audit trail requirements documented
- [ ] Compliance alignment verified

### Cross-Cutting
- [ ] All components consistent with tenant model
- [ ] Security baseline requirements met
- [ ] Compliance requirements addressed

---

## Gate Decision Criteria

| Decision | Criteria |
|----------|----------|
| **PASS** | All 4 components defined, security baseline met, tenant isolation verified |
| **CONDITIONAL** | Minor gaps (e.g., audit retention not finalized, role limits not configured) - document gaps and proceed |
| **FAIL** | Missing permission model, undefined role hierarchy, or no tenant scoping - return to Create mode |

---

## COLLABORATION MENUS (A/P/C):

After completing the validation checklist, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific validation findings
- **P (Party Mode)**: Bring QA and security perspectives on validation results
- **C (Continue)**: Accept validation results and generate report
- **[Specific findings]**: Describe findings to investigate further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: validation findings, failed checks, gap analysis
- Process enhanced insights on security gaps
- Ask user: "Accept this detailed analysis of findings? (y/n)"
- If yes, document enhanced findings
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review RBAC/ABAC validation findings"
- Process QA and security perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document validation results with specific findings per component
- Determine preliminary gate decision
- Proceed to next step: `step-22-v-generate-report.md`

---

## Verification

- [ ] All checklist items evaluated
- [ ] Gate decision determined
- [ ] Findings documented per component

---

## Outputs

- Validation report
- Pass/Fail determination
- Specific findings per component

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate validation report.
