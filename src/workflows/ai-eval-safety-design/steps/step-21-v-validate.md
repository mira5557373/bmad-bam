# Step 21: Validate AI Eval Safety Design

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

Validate the AI evaluation and safety design against QG-I3 quality gate criteria, ensuring all safety dimensions are defined with measurable thresholds, golden tasks cover OWASP attack vectors, guardrails are properly configured, and monitoring is comprehensive.

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: testing-agent-safety
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-i3-agent-safety.md`

## Validation Checklist

### Safety Criteria
- [ ] All four safety dimensions defined (content, behavioral, system, operational)
- [ ] Measurable thresholds for each criterion
- [ ] Tier-specific criteria documented
- [ ] Criteria aligned with compliance requirements

### Golden Tasks
- [ ] Minimum 50 golden tasks defined
- [ ] Positive, negative, and edge cases covered
- [ ] All safety dimensions have corresponding tasks
- [ ] OWASP LLM Top 10 attack vectors covered
- [ ] All tenant tiers represented
- [ ] Task structure follows template

### Guardrails
- [ ] Input, output, and execution guardrails defined
- [ ] Trigger conditions and actions specified
- [ ] Guardrail hierarchy documented
- [ ] Tenant tier overrides configured
- [ ] No conflicts between guardrail rules

### Eval Pipeline
- [ ] All pipeline components defined
- [ ] Evaluation metrics specified
- [ ] Pipeline stages documented (pre-deploy, canary, prod, regression)
- [ ] CI/CD integration points identified
- [ ] Human review process defined

### Monitoring
- [ ] Safety, quality, and operational metrics defined
- [ ] Alert thresholds and escalation configured
- [ ] Dashboards specified
- [ ] Audit logging requirements documented

### Cross-Cutting
- [ ] Tenant isolation maintained in all components
- [ ] Design consistent with master architecture
- [ ] Coverage matrix shows no gaps
- [ ] All components implementable with current tech stack

## Gate Decision

- **PASS**: All components defined, coverage complete, thresholds reasonable
- **CONDITIONAL**: Minor gaps (e.g., tier-specific thresholds: FREE tier max 100 req/min, PRO tier max 1000 req/min, ENTERPRISE tier max 10000 req/min; safety score thresholds: content safety > 0.95, behavioral safety > 0.90, system safety > 0.99) — document and proceed
- **FAIL**: Missing safety dimension, inadequate golden task coverage, or no monitoring — return to Create mode

Present validation results with specific findings for each component.



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

## COLLABORATION MENUS (A/P/C):

After completing the validation above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation findings and remediation strategies
- **P (Party Mode)**: Bring Security Auditor, Quality Gate Reviewer, and Compliance Expert perspectives
- **C (Continue)**: Accept validation results and proceed to Step 22: Generate Report
- **Dispute finding**: Describe specific validation results to challenge or clarify

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: validation findings, gate decision, remediation options
- Process enhanced insights
- Ask user: "Accept these refined validation findings? (y/n)"
- If yes, integrate into validation report
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review QG-I3 validation results for AI eval safety design"
- Process Security Auditor, Quality Gate Reviewer, Compliance Expert perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation results to session
- Update frontmatter `stepsCompleted: [20, 21]`
- Proceed to next step: `step-22-v-generate-report.md`

---

## Verification

- [ ] All checklist items evaluated
- [ ] Gate decision determined
- [ ] Findings documented per component
- [ ] Patterns align with pattern registry

## Outputs

- Validation report
- Pass/Fail determination
- Specific findings per component

## Next Step

Generate validation report and return results to user.
