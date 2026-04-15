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

Generate a comprehensive validation report summarizing findings from the AI agent debug report validation and determining the workflow completion status.

---

## Prerequisites

- Step 20 completed: Debug report artifact loaded successfully
- Step 21 completed: Validation performed against debug report criteria
- **Load template:** `{project-root}/_bmad/bam/data/templates/quality-gate-report-template.md`

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
| Execution Context | | Agent type/ID, tenant context, trace ID |
| State History Analysis | | Execution trace, state transitions, tool calls |
| Failure Identification | | Failure point, type classification, root cause |
| Recommendations | | Fix specificity, actionability, priority |
| Cross-Cutting | | Reproducibility, tenant isolation, data sensitivity |

### 2. Assign Severity to Findings

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| CRITICAL | Blocks debug resolution | Must fix before proceeding |
| WARNING | Incomplete analysis | Should address for thoroughness |
| INFO | Enhancement opportunity | Consider for future debug sessions |

**Critical Failure Examples:**
- Missing execution context (agent ID, tenant)
- No failure point identified
- Recommendations not actionable
- Tenant isolation compromised during debug

### 3. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **COMPLETE** | All sections complete, root cause identified, actionable recommendations provided |
| **CONDITIONAL** | Root cause uncertain but reasonable hypotheses documented |
| **NEEDS REVISION** | Missing execution context, no failure identified, or recommendations not actionable |

### 4. Generate Report

Create validation report summarizing:
- Validation outcome (PASS/CONDITIONAL/FAIL)
- Findings by debug report section
- Required actions for each critical/warning item
- Next steps based on outcome

---

## COLLABORATION MENUS (A/P/C):

After generating the report, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into report findings or remediation approach
- **P (Party Mode)**: Bring AI engineer and QA perspectives on next steps
- **C (Continue)**: Accept report and complete validation workflow
- **[Specific concerns]**: Describe concerns about report or next steps

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: validation report, completion status, next steps
- Process enhanced insights on remediation strategy
- Ask user: "Accept this remediation approach? (y/n)"
- If yes, finalize next steps
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review AI agent debug validation report and recommend next steps"
- Process AI engineer and QA perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation report to output location
- Complete validation workflow
- Provide completion status guidance

---

## Verification

- [ ] All findings from Step 21 documented
- [ ] Severity assigned to each finding
- [ ] Completion status determined
- [ ] Report generated with actionable next steps

---

## Outputs

- AI Agent Debug Validation Report
- Section-level findings summary
- Debug resolution readiness assessment
- **Load template:** `{project-root}/_bmad/bam/data/templates/debug-session-template.md`
- **Output to:** `{output_folder}/planning-artifacts/debug/agent-debug-validation-report.md`

---

## Next Step

Based on completion status:
- **COMPLETE:** Workflow finished. Debug report ready for implementation of fixes.
- **CONDITIONAL:** Document uncertainties and proceed with hypothesis testing.
- **NEEDS REVISION:** Return to Edit mode (`step-10-e-load-existing.md`) to address findings.

---

## Workflow Complete

Validation mode complete for ai-agent-debug workflow.
