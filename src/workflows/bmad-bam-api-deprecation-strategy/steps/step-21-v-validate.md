# Step 21: Validate Deprecation Strategy

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array

---

## Purpose

Validate the deprecation strategy against quality criteria ensuring complete lifecycle coverage, proper consumer communication, and rollback readiness.

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: api-lifecycle
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-p1-production-readiness.md`

## Validation Checklist

### Deprecation Candidates
- [ ] All deprecated endpoints cataloged
- [ ] Usage patterns analyzed
- [ ] Affected consumers identified
- [ ] Migration complexity assessed

### Timeline
- [ ] Sunset dates set for all endpoints
- [ ] Grace periods defined by tier
- [ ] Notification schedule planned
- [ ] Milestone checkpoints created

### Deprecation Signals
- [ ] HTTP headers configured per RFC standards
- [ ] Warning responses designed
- [ ] Usage monitoring configured
- [ ] Alerting thresholds set

### Migration Support
- [ ] Migration paths documented
- [ ] Code examples for all languages
- [ ] Support resources planned
- [ ] Rollback procedures designed

### Cross-Cutting
- [ ] Consistent with API versioning strategy
- [ ] Tenant tier considerations addressed
- [ ] Enterprise customer communication planned

## Gate Decision

- **PASS**: Complete lifecycle, communication ready, monitoring active
- **CONDITIONAL**: Minor gaps (e.g., some examples pending) - document and proceed
- **FAIL**: Missing timeline, no migration support, or no rollback plan

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

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

After completing validation, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation findings and gate criteria
- **P (Party Mode)**: Bring QA and architect perspectives for validation review
- **C (Continue)**: Accept validation results and proceed to report generation
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass validation context: findings, gate decision, remediation needs
- Process enhanced insights from deep questioning
- Ask user: "Accept these findings? (y/n)"
- If yes, finalize validation results
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review validation results for deprecation strategy: {summary of findings and gate decision}"
- Process collaborative analysis from QA and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation results
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
