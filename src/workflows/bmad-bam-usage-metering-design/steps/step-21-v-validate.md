# Step 21: Validate Usage Metering Design

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array

---

## Purpose

This step validates the completeness and quality of the usage metering design, ensuring accurate resource tracking, proper tenant isolation in billing data, and reliable billing integration.

---

## Prerequisites

- Step 20: Load Artifact completed successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: usage-metering`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-isolation`



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

### Billable Resources
- [ ] All resource categories defined (compute, AI/ML, storage, network)
- [ ] Each resource has unit and measurement method
- [ ] Billing frequency defined for each resource
- [ ] Tier inclusions defined for all tiers
- [ ] Overage pricing defined for PRO tier
- [ ] Resource attribution rules documented
- [ ] Non-billable resources explicitly listed

### Metering Events
- [ ] Metering event schema defined with all required fields
- [ ] Event types classified (instant vs periodic)
- [ ] Event collection pipeline documented
- [ ] Synchronous vs asynchronous emission patterns defined
- [ ] Idempotency handling documented
- [ ] Event validation rules defined
- [ ] Event enrichment rules defined

### Aggregation Configuration
- [ ] All aggregation levels defined (raw → hourly → daily → billing period)
- [ ] Aggregation schemas defined (SQL/schema)
- [ ] Aggregation pipeline jobs documented
- [ ] Late event handling strategy defined
- [ ] Storage-based aggregation (for snapshots) defined
- [ ] Quota tracking mechanism defined
- [ ] Data retention policies defined for each level

### Billing Integration
- [ ] Billing provider/system identified
- [ ] API endpoints documented
- [ ] Usage report schema defined
- [ ] Real-time quota enforcement defined
- [ ] Daily usage sync process defined
- [ ] End-of-period finalization process defined
- [ ] Error handling strategy defined
- [ ] Reconciliation process defined
- [ ] Tenant portal data requirements defined

### Accuracy Validation
- [ ] Accuracy requirements defined with targets
- [ ] Event validation (Layer 1) defined
- [ ] Pipeline validation (Layer 2) defined
- [ ] Aggregation validation (Layer 3) defined
- [ ] Billing reconciliation (Layer 4) defined
- [ ] Audit trail requirements defined
- [ ] Discrepancy handling process defined
- [ ] Testing strategy defined (unit, integration, load, chaos)

### Cross-Cutting
- [ ] Consistent with tenant model isolation design
- [ ] Consistent with observability design (metrics reuse)
- [ ] Tenant isolation maintained in all billing data
- [ ] No cross-tenant usage leakage possible
- [ ] Regulatory compliance for billing records (retention)
- [ ] Patterns align with pattern registry

## Gate Decision

- **PASS**: All resources identified, metering pipeline complete, billing integration defined, accuracy validated
- **CONDITIONAL**: Minor gaps (e.g., specific pricing values: FREE tier $0 with limits, PRO tier $49-199/mo based on usage, ENTERPRISE custom pricing; overage rates: compute $0.10/unit, AI tokens $0.002/1K, storage $0.023/GB/mo) - document gaps and proceed
- **FAIL**: Missing billable resources, undefined aggregation, or no billing integration - return to Create mode

Present validation results with specific findings for each section.

---

## COLLABORATION MENUS (A/P/C):

After completing the validation above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation findings using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for validation review
- **C (Continue)**: Accept validation results and proceed to report generation
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass validation context: findings, gate decision
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into validation results
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review validation findings for usage metering: {summary of gate decision}"
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

- Validated usage metering design
- Validation gate decision (PASS/CONDITIONAL/FAIL)
- Accuracy gaps documented (if CONDITIONAL)
- Required fixes list (if FAIL)

---

## Next Step

If PASS: Metering design complete, ready for implementation sprint planning.
If CONDITIONAL: Document gaps (pricing values: FREE $0, PRO $49-199/mo, ENTERPRISE custom; overage: compute $0.10/unit, AI $0.002/1K tokens, storage $0.023/GB/mo) and proceed to implementation with noted limitations.
If FAIL: Return to Create mode to address missing billable resources, aggregation gaps, or billing integration issues.
