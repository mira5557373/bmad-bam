# Step 22: Generate Validation Report

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

Generate a comprehensive validation report summarizing findings from the master architecture emergency change validation and determining the workflow completion status.

---

## Prerequisites

- Step 20 completed: Emergency change artifact loaded successfully
- Step 21 completed: Validation performed against emergency change criteria

---


## Inputs

- Validation results from previous steps
- Quality gate decision (PASS/CONDITIONAL/FAIL)
- Specific findings per component
- Recommendations for remediation (if applicable)

---

## Actions

### 1. Compile Validation Results

Organize findings from Step 21 validation:

| Category | Status | Notes |
|----------|--------|-------|
| Emergency Documentation | | Justification, urgency, business impact |
| Impact Assessment | | Affected modules, downstream dependencies |
| Approval Process | | Required approvers, sign-off obtained |
| Change Application | | Master architecture updated, versioned |
| Dependent Updates | | All affected artifacts updated, notified |

### 2. Assign Severity to Findings

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| CRITICAL | Emergency change not properly authorized or documented | Must fix before proceeding |
| WARNING | Non-critical gap in change process | Should address for audit trail |
| INFO | Process improvement opportunity | Consider for future emergencies |

**Critical Failure Examples:**
- Missing emergency justification
- Required approvals not obtained
- Impact assessment incomplete
- Dependent modules not notified of change

### 3. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **COMPLETE** | Emergency documented, approved, applied, dependents updated |
| **CONDITIONAL** | Minor documentation gaps with completion timeline |
| **NEEDS REVISION** | Critical approval gaps or incomplete impact assessment |

### 4. Generate Report

Create validation report summarizing:
- Validation outcome (PASS/CONDITIONAL/FAIL)
- Findings by emergency change category
- Required actions for each critical/warning item
- Next steps based on outcome

---

## COLLABORATION MENUS (A/P/C):

After generating the report, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific findings for remediation planning
- **P (Party Mode)**: Bring PM and architect perspectives on report findings
- **C (Continue)**: Accept report and complete validation workflow
- **[Specific findings]**: Describe findings to investigate further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: validation report, critical findings, remediation needs
- Process enhanced insights on remediation strategy
- Ask user: "Accept this remediation analysis? (y/n)"
- If yes, document remediation plan
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review emergency change validation report: {summary of outcome and findings}"
- Process PM and architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation report to output location
- Complete validation workflow

---

## Verification

- [ ] All findings from Step 21 documented
- [ ] Severity assigned to each finding
- [ ] Completion status determined
- [ ] Report generated with emergency change audit trail
- [ ] Patterns align with pattern registry

---

## Outputs

- Master Architecture Emergency Change Validation Report
- Category-level findings summary
- Audit trail documentation
- Post-emergency review recommendations

---

## Next Step

Based on completion status:
- **COMPLETE:** Workflow finished. Emergency change properly documented for audit.
- **CONDITIONAL:** Document gaps and schedule post-emergency review.
- **NEEDS REVISION:** Return to Edit mode (step-10-e-load-existing.md) to address documentation gaps.

## Workflow Complete

Validation mode complete for master-architecture-emergency-change workflow.
