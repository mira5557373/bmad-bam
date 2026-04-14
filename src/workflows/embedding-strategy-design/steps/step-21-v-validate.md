# Step 21: Validate Embedding Strategy

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

Validate the embedding strategy against quality criteria ensuring proper model selection, tenant isolation, cost optimization, and operational readiness.

---

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: embeddings
- **Load checklist:** `{project-root}/_bmad/bam/checklists/qg-m3-agent-runtime.md`

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

### Model Selection
- [ ] Primary model selected with justification
- [ ] Fallback model defined
- [ ] Tier-based model mapping documented
- [ ] Model versioning strategy defined

### Dimension Optimization
- [ ] Target dimensions defined per use case
- [ ] Reduction technique selected (if applicable)
- [ ] Quality/cost trade-offs documented
- [ ] Storage impact calculated

### Tenant Namespacing
- [ ] Namespace schema defined
- [ ] Query guards implemented
- [ ] Cross-tenant access prevented
- [ ] Isolation guarantees documented

### Batch Processing
- [ ] Optimal batch sizes determined
- [ ] Rate limiting configured per tier
- [ ] Queue architecture designed
- [ ] Error handling comprehensive

### Caching
- [ ] Cache key schema with tenant isolation
- [ ] Multi-tier cache configured
- [ ] Invalidation strategies defined
- [ ] Cache ROI calculated

### Quality Metrics
- [ ] Recall/quality metrics defined
- [ ] Evaluation datasets specified
- [ ] A/B testing framework designed
- [ ] Quality gates defined

### Cost Optimization
- [ ] Model costs analyzed
- [ ] Usage quotas defined
- [ ] Cost projections calculated
- [ ] Cost alerts configured

### Integration
- [ ] Service interface designed
- [ ] Async processing patterns defined
- [ ] Error handling documented
- [ ] RAG pipeline integration mapped

---

## Gate Decision Criteria

| Decision | Criteria |
|----------|----------|
| **PASS** | All components defined, tenant isolation verified, cost projections valid |
| **CONDITIONAL** | Minor gaps (e.g., quality thresholds not calibrated) with mitigation plan |
| **FAIL** | Missing tenant isolation, no model selection, or undefined integration |

---

## COLLABORATION MENUS (A/P/C):

After completing the validation checklist, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific validation findings
- **P (Party Mode)**: Bring QA and ML engineer perspectives on validation results
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
- Context: "Review embedding strategy validation findings"
- Process QA and ML engineer perspectives
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

- Validation report
- Pass/Fail determination
- Specific findings per component

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate validation report.
