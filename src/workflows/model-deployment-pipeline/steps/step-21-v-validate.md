# Step 21: Validate Model Deployment Pipeline

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

This step validates the completeness and quality of the model deployment pipeline design, ensuring proper deployment strategy, tenant rollout procedures, canary configuration, validation gates, rollback mechanisms, and operational readiness.

---

## Prerequisites

- Step 20: Load Artifact completed successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `model-deployment`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `ai-lifecycle`

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

## Verification

### Deployment Strategy
- [ ] Deployment pattern selected (blue-green, canary, rolling, shadow)
- [ ] Pattern justification documented
- [ ] Model versioning strategy defined
- [ ] Artifact storage locations specified
- [ ] Infrastructure targets per tier defined
- [ ] Resource requirements documented

### Tenant Rollout
- [ ] Tier-based rollout sequence defined
- [ ] Opt-in/opt-out mechanisms configured
- [ ] Rollout scheduling windows established
- [ ] Communication triggers documented
- [ ] Rollout velocity specified
- [ ] Blackout periods identified

### Canary Deployment
- [ ] Traffic progression stages defined
- [ ] Metrics collection configured
- [ ] Automatic rollback triggers established
- [ ] Manual promotion gates documented
- [ ] Baseline comparison methodology defined
- [ ] Stage durations specified

### Model Validation
- [ ] Pre-deployment validation checks defined
- [ ] Performance benchmarking configured
- [ ] Safety evaluation criteria established
- [ ] Regression testing thresholds documented
- [ ] Bypass procedures documented (emergency only)
- [ ] Validation timeout periods specified

### Rollback Procedures
- [ ] Automatic rollback triggers configured
- [ ] Manual rollback procedures documented
- [ ] Data consistency strategies defined
- [ ] Tenant notification workflow established
- [ ] Rollback tested in staging environment
- [ ] Recovery time objectives defined

### A/B Testing
- [ ] Experiment framework configured
- [ ] Tenant assignment strategies defined
- [ ] Metrics collection specified
- [ ] Statistical requirements established
- [ ] Tenant isolation in experiments verified
- [ ] Experiment duration minimums defined

### Monitoring Integration
- [ ] Model performance metrics defined
- [ ] Tenant-scoped dashboards designed
- [ ] Alerting thresholds configured
- [ ] SLO tracking established per version
- [ ] Alert routing documented
- [ ] Dashboard refresh rates specified

### Tenant Notifications
- [ ] Pre-deployment notifications configured
- [ ] Rollout progress updates designed
- [ ] Rollback notifications established
- [ ] Change log distribution defined
- [ ] Templates created for all scenarios
- [ ] Notification timing documented

### Documentation
- [ ] Operator runbook created
- [ ] Release notes template defined
- [ ] Incident response procedures established
- [ ] Post-deployment verification checklist created
- [ ] All documentation reviewed
- [ ] Escalation contacts documented

### Cross-Cutting
- [ ] Consistent with agent runtime architecture
- [ ] Consistent with tenant model isolation design
- [ ] Consistent with master architecture
- [ ] All components version-compatible
- [ ] Patterns align with pattern registry
- [ ] **CRITICAL:** QG-AI1 (AI Model Release Gate) criteria met

---

## Gate Decision

- **PASS**: All deployment components defined, all procedures documented, monitoring configured, notifications established
- **CONDITIONAL**: Minor gaps (e.g., specific timeout values, template details) - document gaps and proceed
- **FAIL**: Missing deployment strategy, undefined rollback procedures, incomplete validation gates, or no monitoring - return to Create mode

Present validation results with specific findings for each section.

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
- Context: "Review deployment validation: {summary of findings and gate decision}"
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

- Validated model deployment pipeline design
- Validation gate decision (PASS/CONDITIONAL/FAIL)
- Configuration gaps documented (if CONDITIONAL)
- Required fixes list (if FAIL)

---

## Next Step

If PASS: Deployment pipeline complete, ready for implementation sprint planning.
If CONDITIONAL: Document gaps with remediation timeline and proceed to implementation with noted limitations.
If FAIL: Return to Create mode to address missing deployment strategy, rollback procedures, or validation gates.
