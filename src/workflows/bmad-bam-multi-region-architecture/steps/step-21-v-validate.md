# Step 21: Validate Multi-Region Architecture

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- **ALWAYS pause after presenting findings** and await user direction
- **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array

---

## Purpose

This step validates the completeness and quality of the multi-region architecture design, ensuring proper regional topology, data residency compliance, sync strategy, routing, and failover procedures.

---

## Prerequisites

- Step 20: Load Artifact completed successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `compliance`
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`



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

## Verification

### Regional Topology
- [ ] Primary regions defined with selection criteria
- [ ] Edge locations specified with purpose
- [ ] Region pairing established for DR
- [ ] All regions have documented justification
- [ ] No single points of failure in topology

### Data Residency
- [ ] GDPR requirements mapped to EU regions
- [ ] US compliance requirements documented
- [ ] APAC requirements addressed (if applicable)
- [ ] Data classification scheme defined
- [ ] Transfer rules specified for each category
- [ ] No compliance gaps in data flow

### Cross-Region Sync
- [ ] Sync classification complete (global vs. local)
- [ ] Global data sync mechanism defined
- [ ] Regional data boundaries documented
- [ ] Sync patterns specified (eventual vs. strong)
- [ ] Conflict resolution strategies defined
- [ ] Latency budgets specified

### Regional Routing
- [ ] Tenant region assignment method defined
- [ ] DNS routing configuration documented
- [ ] API gateway routing specified
- [ ] CDN configuration complete
- [ ] Cross-region request handling defined

### Failover Design
- [ ] Failover architecture pattern selected
- [ ] RTO/RPO targets defined per tier
- [ ] Failover triggers documented
- [ ] Failover procedures complete
- [ ] Data recovery strategy defined
- [ ] Failback procedure documented

### Cross-Cutting
- [ ] Consistent with master architecture
- [ ] Consistent with tenant model design
- [ ] Monitoring and alerting covered
- [ ] Cost implications documented
- [ ] Patterns align with pattern registry

---

## Gate Decision

- **PASS**: All regions defined, compliance complete, failover ready
- **CONDITIONAL**: Minor gaps (e.g., APAC expansion TBD) - document gaps and proceed
- **FAIL**: Missing regions, compliance gaps, or incomplete failover - return to Create mode

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
- Context: "Review multi-region validation: {summary of findings and gate decision}"
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

- Validated multi-region architecture
- Validation gate decision (PASS/CONDITIONAL/FAIL)
- Configuration gaps documented (if CONDITIONAL)
- Required fixes list (if FAIL)

---

## Next Step

If PASS: Multi-region architecture complete, ready for implementation sprint planning.
If CONDITIONAL: Document gaps with remediation timeline and proceed to implementation with noted limitations.
If FAIL: Return to Create mode to address missing regions, compliance gaps, or failover issues.
