# Step 21: Validate Data Synchronization Design

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array

---

## Purpose

Validate the data synchronization design against data architecture criteria, ensuring complete sync patterns, conflict resolution, tenant isolation, and monitoring configuration.

---

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: data-sync
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-m2-tenant-isolation.md`

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

## Validation Checklist

### Sync Patterns
- [ ] Sync patterns selected with rationale
- [ ] Pattern-to-data mapping defined
- [ ] Replication topology documented
- [ ] SLAs specified per data type

### Conflict Resolution
- [ ] Conflict detection methods defined
- [ ] Resolution strategies specified per data type
- [ ] Merge strategies for complex objects documented
- [ ] Manual resolution workflow designed

### Tenant Isolation
- [ ] Tenant-scoped change streams configured
- [ ] Isolated sync queues designed
- [ ] Cross-tenant prevention implemented
- [ ] Tenant-aware idempotency specified

### Monitoring
- [ ] Sync lag metrics defined
- [ ] Conflict rate tracking configured
- [ ] Data consistency verification specified
- [ ] Tenant-level dashboards designed
- [ ] Alert configuration documented

### Cross-Cutting
- [ ] All components consistent with tenant model
- [ ] Data integrity requirements met
- [ ] Performance requirements addressed

---

## Gate Decision Criteria

| Decision | Criteria |
|----------|----------|
| **PASS** | All 4 components defined, tenant isolation verified, monitoring configured |
| **CONDITIONAL** | Minor gaps (e.g., alert thresholds not finalized, dashboard layout pending) - document gaps and proceed |
| **FAIL** | Missing sync patterns, undefined conflict resolution, or no tenant isolation - return to Create mode |

---

## COLLABORATION MENUS (A/P/C):

After completing the validation checklist, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific validation findings
- **P (Party Mode)**: Bring QA and data architecture perspectives on validation results
- **C (Continue)**: Accept validation results and generate report
- **[Specific findings]**: Describe findings to investigate further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: validation findings, failed checks, gap analysis
- Process enhanced insights on data synchronization gaps
- Ask user: "Accept this detailed analysis of findings? (y/n)"
- If yes, document enhanced findings
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review data synchronization design validation findings"
- Process QA and data architecture perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document validation results with specific findings per component
- Determine preliminary gate decision
- Update frontmatter `stepsCompleted: [20, 21]`
- Proceed to next step: `step-22-v-generate-report.md`

---

## Verification

- [ ] All checklist items evaluated
- [ ] Gate decision determined
- [ ] Findings documented per component

---

## Outputs

- Validation report
- Pass/Fail determination
- Specific findings per component

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate validation report.
