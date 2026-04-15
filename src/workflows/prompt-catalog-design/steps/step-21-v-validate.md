# Step 21: Validate Prompt Catalog Architecture

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

Validate the prompt catalog architecture against QG-M3 quality gate criteria, ensuring complete catalog design, tenant isolation, testing framework, and access control.

---

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: prompt-management
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-m3-agent-runtime.md`

---

## Inputs

- Loaded artifact from validation step 20
- Quality gate criteria and checklist
- Pattern registry for validation rules

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

### Catalog Requirements
- [ ] Organizational structure defined
- [ ] Metadata standards documented
- [ ] Search and discovery capabilities specified
- [ ] Integration points identified
- [ ] Tenant-specific requirements captured

### Prompt Taxonomy
- [ ] Category hierarchy complete
- [ ] Use case classification covers platform needs
- [ ] Model compatibility tagging specified
- [ ] Risk and compliance classification defined
- [ ] Language and locale support documented

### Tenant Isolation
- [ ] Ownership model covers all scenarios
- [ ] Visibility controls comprehensive
- [ ] Permission inheritance documented
- [ ] Cross-tenant sharing mechanism defined
- [ ] Audit trail requirements specified

### Versioning Strategy
- [ ] Semantic versioning strategy defined
- [ ] Deprecation policy documented with timelines
- [ ] Breaking change management procedures established
- [ ] Backward compatibility guarantees specified
- [ ] Version resolution strategy defined

### Testing Framework
- [ ] Unit testing structure defined
- [ ] Integration testing approach documented
- [ ] Regression testing mechanisms established
- [ ] Golden dataset management specified
- [ ] Test coverage metrics defined

### A/B Testing
- [ ] Experiment configuration structure defined
- [ ] Traffic splitting per tenant documented
- [ ] Metric collection comprehensive
- [ ] Statistical framework rigorous
- [ ] Winner promotion workflow established

### Performance Tracking
- [ ] Effectiveness metrics comprehensive
- [ ] Latency and token tracking defined
- [ ] Cost attribution model established
- [ ] Quality score aggregation documented
- [ ] Alerting thresholds configured

### Access Control
- [ ] Role-based permissions comprehensive
- [ ] Tenant admin capabilities defined
- [ ] Platform admin overrides documented
- [ ] API key scoping established
- [ ] Audit logging requirements specified

### Documentation
- [ ] Prompt documentation template defined
- [ ] Usage guidelines comprehensive
- [ ] Best practices library structured
- [ ] Change log requirements specified
- [ ] Training materials outlined

### Cross-Cutting
- [ ] All components consistent with agent runtime architecture
- [ ] Tenant isolation maintained across all components
- [ ] Aligned with prompt-versioning-management workflow outputs

---

## Gate Decision Criteria

| Decision | Criteria |
|----------|----------|
| **PASS** | All 9 components defined, quality gates met, access control verified |
| **CONDITIONAL** | Minor gaps (e.g., training materials not finalized) - document gaps and proceed |
| **FAIL** | Missing catalog requirements, undefined access control, or no testing framework - return to Create mode |

---

## COLLABORATION MENUS (A/P/C):

After completing the validation checklist, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific validation findings
- **P (Party Mode)**: Bring QA and DevOps perspectives on validation results
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
- Context: "Review QG-M3 validation findings for prompt catalog architecture"
- Process QA and DevOps perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document validation results with specific findings per component
- Determine preliminary gate decision
- Proceed to next step: `step-22-v-generate-report.md`

---

## Verification

- [ ] All checklist items evaluated
- [ ] Gate decision determined
- [ ] Findings documented per component

---

## Outputs

- Validation results
- Pass/Fail determination
- Specific findings per component

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate validation report.
