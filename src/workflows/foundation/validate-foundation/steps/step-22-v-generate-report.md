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

Generate a comprehensive validation report summarizing findings from the foundation gate validation steps and determining the workflow completion status for QG-F1.

---

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- Step 21 completed: Foundation gate report validation performed

---


## Inputs

- Validation results from previous steps
- Quality gate decision (PASS/CONDITIONAL/FAIL)
- Specific findings per component
- Recommendations for remediation (if applicable)

---

## Actions

### 1. Compile Validation Results

Organize findings from Step 21:

| Category | Status | Notes |
|----------|--------|-------|
| Report Structure | | All required sections present |
| Conditional Pass Requirements | | Mitigation plan, deadline, owner (if applicable) |
| Fail Requirements | | Root cause, locked categories, recovery path (if applicable) |
| Category Coverage | | All 7 categories assessed |
| Gate Decision Consistency | | Decision matches category results |
| Sprint Status Alignment | | sprint-status.yaml matches report |

### 2. Assign Severity to Findings

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| CRITICAL | Missing required sections, inconsistent gate decision | Must fix before proceeding |
| WARNING | Minor formatting issues, incomplete remediation details | Should address |
| INFO | Report presentation improvements | Consider for future |

### 3. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **PASS** | Report complete, consistent, and properly formatted |
| **CONDITIONAL** | Minor formatting issues, content complete |
| **NEEDS REVISION** | Missing required sections or inconsistent gate decision |

### 4. Generate Meta-Validation Report

Create validation report summarizing:
- Meta-validation outcome (PASS/CONDITIONAL/FAIL)
- Report structure completeness
- Gate decision consistency verification
- Category coverage verification (Master Arch, Tenant Model, Shared Kernel, Control Plane, AI Runtime, Tests, Documentation)
- Sprint status alignment verification
- Required corrections (if FAIL)
- Next steps recommendation

---

## COLLABORATION MENUS (A/P/C):

After generating the validation report above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into report findings using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for final review
- **C (Continue)**: Accept validation report and finalize Validate mode
- **[Specific refinements]**: Describe what you'd like to adjust

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: meta-validation outcome, findings summary, next steps
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into final report
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review QG-F1 foundation gate meta-validation report: {summary of outcome and recommendations}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation report
- Update frontmatter `stepsCompleted: [20, 21, 22]`
- Mark Validate mode complete

---

## Verification

- [ ] All findings from Step 21 documented
- [ ] Severity assigned to each finding
- [ ] Completion status determined
- [ ] Report generated with all required sections
- [ ] Patterns align with pattern registry

---

## Outputs

- Validation report document
- Meta-validation decision (PASS/CONDITIONAL/FAIL)
- Report quality assessment
- Required corrections (if applicable)
- **Load template:** `{project-root}/_bmad/bam/templates/dev-gate-report-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/gate-status-dashboard-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/gate-validation-report-template.md`

---

## Next Step

Based on completion status:
- **PASS:** Foundation gate report is valid and can be used for project governance decisions.
- **CONDITIONAL:** Minor corrections needed but report is acceptable for governance.
- **NEEDS REVISION:** Report requires corrections before it can be accepted as official gate record.

---

## Governance Note

The foundation gate report (QG-F1) is a critical governance artifact. On PASS:
- Foundation phase is complete
- Module design phase can begin
- sprint-status.yaml should reflect gate passage

---

## Workflow Complete

Validation mode complete for validate-foundation workflow.
