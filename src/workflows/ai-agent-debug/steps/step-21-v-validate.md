# Step 21: Validate Debug Report

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

Validate the AI agent debug report for completeness, ensuring execution context is documented, failure points are identified with root causes, and actionable recommendations are provided while maintaining tenant isolation.

---

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: agent-runtime



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

---

## Validation Checklist

### Execution Context
- [ ] Agent type and ID documented
- [ ] Tenant context specified
- [ ] Time window and trace ID provided
- [ ] System prompt and tool configuration captured
- [ ] Memory tier state documented

### State History Analysis
- [ ] Execution trace parsed completely
- [ ] State transitions mapped
- [ ] Tool calls and results documented
- [ ] Memory operations tracked
- [ ] Anomalies identified and flagged

### Failure Identification
- [ ] Failure point clearly identified
- [ ] Failure type classified correctly
- [ ] Root cause distinguished from symptoms
- [ ] Severity and scope assessed
- [ ] Evidence from logs provided

### Recommendations
- [ ] Fix recommendations specific to failure type
- [ ] Recommendations are actionable
- [ ] Priority order established
- [ ] Impact of each fix estimated

### Cross-Cutting
- [ ] Report is reproducible (another engineer could verify)
- [ ] Tenant isolation not compromised during debug
- [ ] No sensitive data exposed in report

---

## Gate Decision Criteria

| Decision | Criteria |
|----------|----------|
| **PASS** | All sections complete, root cause identified, actionable recommendations provided |
| **CONDITIONAL** | Root cause uncertain but reasonable hypotheses documented |
| **FAIL** | Missing execution context, no failure identified, or recommendations not actionable |

---

## COLLABORATION MENUS (A/P/C):

After completing the validation checklist, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific validation findings
- **P (Party Mode)**: Bring QA and AI engineer perspectives on validation results
- **C (Continue)**: Accept validation results and generate report
- **[Specific findings]**: Describe findings to investigate further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: validation findings, failed checks, gap analysis
- Process enhanced insights on quality gaps
- Ask user: "Accept this detailed analysis of findings? (y/n)"
- If yes, document enhanced findings
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review AI agent debug report validation findings"
- Process QA and AI engineer perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document validation results with specific findings per section
- Determine preliminary gate decision
- Proceed to next step: `step-22-v-generate-report.md`

---

## Verification

- [ ] All checklist items evaluated
- [ ] Gate decision determined
- [ ] Findings documented per section

---

## Outputs

- Validation report
- Pass/Fail determination
- Specific findings per section

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate validation report.
