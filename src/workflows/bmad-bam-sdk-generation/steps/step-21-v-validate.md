# Step 21: Validate SDK Generation

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

Validate the SDK generation configuration against quality criteria ensuring complete language coverage, proper authentication, and tenant context handling.

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: sdk-patterns
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-p1-production-readiness.md`

## Validation Checklist

### OpenAPI Analysis
- [ ] OpenAPI specification parsed completely
- [ ] All endpoints cataloged
- [ ] Authentication schemes identified
- [ ] Tenant context requirements mapped

### Generator Configuration
- [ ] All target languages have configured generators
- [ ] Generator versions are current and supported
- [ ] Template customizations documented
- [ ] Build scripts defined

### Authentication Handling
- [ ] All auth schemes have SDK helpers
- [ ] Token refresh implemented where needed
- [ ] API key rotation supported
- [ ] Secure credential storage patterns defined

### Tenant Context
- [ ] Tenant ID injection implemented
- [ ] Correlation ID propagation configured
- [ ] Multi-tenant scenarios documented
- [ ] Tenant isolation verified

### Documentation
- [ ] API reference generated
- [ ] Quick start guide complete
- [ ] Code examples for all operations
- [ ] Changelog template defined

### Cross-Cutting
- [ ] Consistent with API versioning strategy
- [ ] Error handling standardized across languages
- [ ] Retry logic implemented consistently

## Gate Decision

- **PASS**: All languages covered, auth complete, documentation ready
- **CONDITIONAL**: Minor gaps (e.g., some examples pending) - document and proceed
- **FAIL**: Missing language support, no auth handling, or critical documentation gaps

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
- Context: "Review validation results for SDK generation: {summary of findings and gate decision}"
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
