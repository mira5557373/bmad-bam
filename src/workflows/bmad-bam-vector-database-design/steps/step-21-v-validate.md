# Step 21: Validate Vector Database Design

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

Validate the vector database design against quality criteria ensuring proper tenant isolation, performance requirements, security controls, and operational readiness.

---

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: vector-database
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-m3-agent-runtime.md`

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

### Requirements
- [ ] Embedding dimensions documented
- [ ] Scale requirements per tier defined
- [ ] Latency SLAs specified
- [ ] Query patterns analyzed

### Index Strategy
- [ ] Index algorithm selected with justification
- [ ] Index parameters configured appropriately
- [ ] Maintenance strategy defined
- [ ] Trade-offs documented in ADR

### Tenant Isolation
- [ ] Isolation pattern selected and justified
- [ ] Namespace schema designed
- [ ] Query guards implemented
- [ ] No cross-tenant data access possible
- [ ] Access control matrix defined

### Query Optimization
- [ ] Filtering strategy defined
- [ ] Caching layers designed
- [ ] Batch optimization configured
- [ ] Hybrid search weights specified (if applicable)

### Scaling
- [ ] Sharding strategy selected
- [ ] Replica configuration defined
- [ ] Auto-scaling policies configured
- [ ] Capacity limits per tier documented

### Backup/Recovery
- [ ] RPO/RTO requirements defined per tier
- [ ] Backup schedule and retention configured
- [ ] Cross-region replication designed (if required)
- [ ] Tenant-specific restore procedures documented

### Monitoring
- [ ] Core metrics defined with thresholds
- [ ] Tenant-scoped metrics configured
- [ ] Alerting rules defined
- [ ] Dashboards specified

### Security
- [ ] Encryption at rest and in transit
- [ ] Authentication methods defined
- [ ] Authorization model implemented
- [ ] Audit logging configured
- [ ] Data residency controls in place

---

## Gate Decision Criteria

| Decision | Criteria |
|----------|----------|
| **PASS** | All components defined, tenant isolation verified, security controls complete |
| **CONDITIONAL** | Minor gaps (e.g., monitoring thresholds not calibrated) with mitigation plan |
| **FAIL** | Missing tenant isolation, no security controls, or undefined scaling strategy |

---

## COLLABORATION MENUS (A/P/C):

After completing the validation checklist, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific validation findings
- **P (Party Mode)**: Bring QA and security perspectives on validation results
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
- Context: "Review vector database validation findings"
- Process QA and security perspectives
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
