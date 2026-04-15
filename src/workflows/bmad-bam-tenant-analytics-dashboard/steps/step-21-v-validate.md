# Step 2: Validate Tenant Analytics Dashboard

## MANDATORY EXECUTION RULES (READ FIRST)

- STOP **NEVER generate content without user input** - Wait for explicit direction
- READ **CRITICAL: ALWAYS read the complete step file** before taking any action
- LOAD **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- PAUSE **ALWAYS pause after presenting findings** and await user direction
- FOCUS **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- TARGET Show your analysis before taking any action
- SAVE Update document frontmatter after each section completion
- NOTES Maintain append-only document building
- CHECK Track progress in `stepsCompleted` array

---

## Purpose

Validate the tenant analytics dashboard specification against quality criteria ensuring tenant data isolation, proper access controls, visualization standards, and compliance with platform analytics patterns.

---

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: analytics,dashboard

---

## Inputs

- Loaded artifact from validation step 20
- Quality gate criteria and checklist
- Pattern registry for validation rules
- Previous validation findings (if re-validating)

---

## Actions

### 1. Load Artifact

- Read the artifact from `{output_folder}/planning-artifacts/analytics-dashboard-spec.md`
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

### Analytics Requirements
- [ ] Business analytics requirements defined
- [ ] Tenant-facing analytics identified
- [ ] Platform analytics specified
- [ ] KPIs defined with targets and thresholds
- [ ] Data sources mapped to requirements
- [ ] Refresh rate requirements documented

### Data Aggregation
- [ ] Pipeline architecture defined
- [ ] Aggregation levels specified (minute, hourly, daily, monthly)
- [ ] Pre-aggregation rules documented
- [ ] Data warehouse schema designed
- [ ] Tenant partitioning strategy selected
- [ ] Retention policies defined per tier

### Tenant Data Isolation
- [ ] Isolation layers defined (collection, storage, query, presentation)
- [ ] Data collection validation rules specified
- [ ] Storage isolation strategy documented
- [ ] Query layer isolation implemented
- [ ] Access control matrix defined
- [ ] Audit trail requirements specified
- [ ] Cross-tenant analytics rules established

### Dashboard Components
- [ ] Dashboard hierarchy defined
- [ ] Widget component library specified
- [ ] Component architecture documented
- [ ] Standard widget definitions created
- [ ] Dashboard templates established
- [ ] Widget interaction patterns defined

### Visualization Design
- [ ] Chart selection guide defined
- [ ] Visual design system documented
- [ ] Typography standards established
- [ ] Accessibility requirements specified (WCAG AA)
- [ ] Responsive design rules created
- [ ] Dark mode support configured

### Processing Architecture
- [ ] Real-time pipeline specified
- [ ] Batch pipeline configured
- [ ] Use case classification completed
- [ ] Hybrid query strategy documented
- [ ] Tier-based processing differentiated
- [ ] WebSocket updates configured

### Export Capabilities
- [ ] Export types defined (PDF, Excel, CSV, JSON)
- [ ] Format specifications documented
- [ ] Scheduled reports configured
- [ ] GDPR Article 20 compliance implemented
- [ ] Export audit trail specified
- [ ] Rate limits by tier established

### Access Control
- [ ] Role hierarchy defined
- [ ] RBAC matrix documented
- [ ] Permission definitions complete
- [ ] Row-level security configured
- [ ] Dashboard sharing rules established
- [ ] Authentication integration specified
- [ ] Audit logging requirements documented

### Cross-Cutting
- [ ] Tenant ID present in all data paths
- [ ] No cross-tenant data leakage possible
- [ ] Consistent with master architecture
- [ ] Consistent with tenant model isolation design
- [ ] GDPR and compliance requirements addressed

## Gate Decision

- **PASS**: All data paths include tenant context, isolation verified, access controls complete
- **CONDITIONAL**: Minor gaps (e.g., specific widget configurations, dashboard templates) - document gaps and proceed
- **FAIL**: Missing tenant isolation, no access control, or data leakage risks - return to Create mode

Present validation results with specific findings for each section.

---

## COLLABORATION MENUS (A/P/C):

After validation, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific validation gaps or findings
- **P (Party Mode)**: Bring data architect and security architect perspectives on validation results
- **C (Continue)**: Accept validation results and proceed to generate report
- **[Specific refinements]**: Describe specific areas to re-validate

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: validation checklist results, gaps identified, isolation verification
- Process enhanced insights on analytics quality
- Ask user: "Accept this detailed validation analysis? (y/n)"
- If yes, integrate into validation findings
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review validation results for tenant analytics dashboard"
- Process data architect and security architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation results
- Update frontmatter `stepsCompleted: [20, 21]`
- Proceed to next step: `step-22-v-generate-report.md`

---

## Verification

- [ ] All checklist items evaluated
- [ ] Gate decision determined
- [ ] Findings documented per section
- [ ] Patterns align with pattern registry

---

## Outputs

- Validation report
- Pass/Fail determination
- Specific findings per analytics domain

---

## Next Step

Generate validation report and return results to user.
