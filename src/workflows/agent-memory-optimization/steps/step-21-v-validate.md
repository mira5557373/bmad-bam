# Step 21: Validate Agent Memory Optimization

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

Validate the memory optimization design against quality criteria ensuring proper tier allocation, eviction policies, quota enforcement, and operational readiness.

---

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: memory-tier
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

### Memory Audit
- [ ] Baseline metrics established
- [ ] Usage patterns analyzed
- [ ] Bottlenecks identified
- [ ] Hot spots documented

### Tier Allocation
- [ ] All tiers defined with storage
- [ ] Memory boundaries configured
- [ ] Promotion/demotion designed
- [ ] Isolation guarantees documented

### Eviction Policies
- [ ] Algorithms selected per tier
- [ ] TTL settings configured
- [ ] Importance scoring designed
- [ ] Archive strategy documented

### Tenant Quotas
- [ ] Tier-based quotas defined
- [ ] Soft vs hard limits configured
- [ ] Overage handling designed
- [ ] Self-service management planned

### Performance Tuning
- [ ] Hot paths identified
- [ ] Cache warming designed
- [ ] Compression configured
- [ ] Connection pooling set up

### Cost Controls
- [ ] Storage tiering designed
- [ ] Automatic tiering configured
- [ ] Cleanup schedules defined
- [ ] Cost alerts implemented

### Monitoring
- [ ] Core metrics defined
- [ ] Alerting rules configured
- [ ] Dashboards planned
- [ ] Anomaly detection designed

### Testing
- [ ] Load tests planned
- [ ] Eviction tests designed
- [ ] Failover tests planned
- [ ] Benchmarks established

---

## Gate Decision Criteria

| Decision | Criteria |
|----------|----------|
| **PASS** | All components defined, isolation verified, testing planned |
| **CONDITIONAL** | Minor gaps (e.g., benchmarks not yet calibrated) with mitigation plan |
| **FAIL** | Missing tier allocation, no eviction policy, or undefined quotas |

---

## COLLABORATION MENUS (A/P/C):

After completing the validation checklist, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific validation findings
- **P (Party Mode)**: Bring QA and SRE perspectives on validation results
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
- Context: "Review memory optimization validation findings"
- Process QA and SRE perspectives
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
