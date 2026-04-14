# Step 21: Validate Tenant Onboarding Design

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

This step validates the completeness and quality of the tenant onboarding design, ensuring proper provisioning stages, tier configurations, isolation boundaries, and runbook completeness.

---

## Prerequisites

- Step 20: Load Artifact completed successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: event-driven`



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

### Provisioning Stages
- [ ] All provisioning stages defined with clear names and descriptions
- [ ] Stage ordering is explicit with dependencies documented
- [ ] Each stage has a rollback strategy defined
- [ ] Timeout and retry configurations present for each stage
- [ ] Idempotency guarantees documented for each stage
- [ ] State machine for tracking progress defined

### Data Initialization
- [ ] System configuration data seeding defined
- [ ] Reference data initialization defined
- [ ] Admin user creation process defined
- [ ] AI runtime initialization defined
- [ ] Initialization is idempotent (no duplicates on re-run)
- [ ] Tier-specific overrides documented

### Tier Configuration
- [ ] All tiers (FREE/PRO/ENTERPRISE) have explicit configurations
- [ ] Quota limits defined for each tier (users, agents, storage, etc.)
- [ ] Feature flags defined for each tier
- [ ] Custom override mechanism defined for ENTERPRISE
- [ ] Upgrade/downgrade implications documented

### Isolation Boundaries
- [ ] Database isolation (RLS policies) defined
- [ ] Cache isolation (namespace prefixing) defined
- [ ] Storage isolation (bucket/prefix) defined
- [ ] Search index isolation defined
- [ ] Vector store isolation defined
- [ ] Isolation verification procedure defined

### Runbook Completeness
- [ ] Automated onboarding flow documented
- [ ] Manual intervention scenarios listed
- [ ] Rollback procedure complete
- [ ] Monitoring and alerting defined
- [ ] Post-onboarding verification checklist present

### Cross-Cutting
- [ ] Consistent with tenant model isolation design
- [ ] Consistent with master architecture tenant section
- [ ] All provisioned resources are trackable for cleanup
- [ ] No orphaned resources possible on failure
- [ ] Patterns align with pattern registry

---

## Gate Decision

- **PASS**: All stages defined, all tiers configured, isolation complete, runbook operational
- **CONDITIONAL**: Minor gaps (e.g., specific timeout values: 30s API calls, 5m batch operations, 15m total provisioning, 60s health checks, 2m database migrations) - document gaps and proceed
- **FAIL**: Missing provisioning stages, undefined tier configurations, or incomplete isolation - return to Create mode

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
- Context: "Review onboarding validation: {summary of findings and gate decision}"
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

- Validated tenant onboarding design
- Validation gate decision (PASS/CONDITIONAL/FAIL)
- Configuration gaps documented (if CONDITIONAL)
- Required fixes list (if FAIL)

---

## Next Step

If PASS: Onboarding design complete, ready for implementation sprint planning.
If CONDITIONAL: Document gaps with remediation timeline and proceed to implementation with noted limitations.
If FAIL: Return to Create mode to address missing provisioning stages, tier configurations, or isolation boundaries.
