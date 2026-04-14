# Step 21: Validate

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

Validate the ETL Pipeline Design against QG-I2 (Tenant Safety) criteria and best practices.

---

## Prerequisites

- Step 20 completed (Load Artifact)
- **Load checklist:** `{project-root}/_bmad/bam/checklists/qg-i2-tenant-safety.md`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`

---

## Inputs

- Loaded artifact from Step 20
- QG-I2 checklist
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### QG-I2 Tenant Safety Validation Checklist

#### Pipeline Architecture Validation
- [ ] Orchestration strategy supports tenant isolation
- [ ] Extract sources have tenant context
- [ ] Transform processing is tenant-scoped
- [ ] Load destinations enforce isolation
- [ ] Resource allocation per tier defined

#### Tenant Isolation Validation (CRITICAL)
- [ ] **CRITICAL:** Tenant context injected at extraction
- [ ] **CRITICAL:** Context propagated through all stages
- [ ] **CRITICAL:** No cross-tenant data access possible
- [ ] Data partitioning enforces isolation
- [ ] Credentials are tenant-scoped
- [ ] Audit trail captures tenant context

#### Error Handling Validation
- [ ] **CRITICAL:** Fatal errors for tenant context violations
- [ ] DLQ records include tenant isolation
- [ ] Partial failures don't expose tenant data
- [ ] Reconciliation is tenant-scoped
- [ ] Alerting doesn't leak tenant info

#### Monitoring Validation
- [ ] Metrics are tenant-scoped
- [ ] Dashboards enforce tenant boundaries
- [ ] Cost attribution per tenant
- [ ] SLAs defined per tier
- [ ] No cross-tenant metric exposure

### Severity Classification

| Finding Type | Severity |
|-------------|----------|
| Cross-tenant data exposure risk | Critical |
| Missing tenant context | Critical |
| Incomplete isolation | High |
| Missing monitoring | Medium |
| Documentation gap | Low |

---

## COLLABORATION MENUS (A/P/C):

After completing validation above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation findings using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for validation analysis
- **C (Continue)**: Accept validation findings and proceed to report generation
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass validation context: findings, QG-I2 status
- Process enhanced insights from deep questioning
- Ask user: "Accept these validation findings? (y/n)"
- If yes, integrate into validation results
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review QG-I2 validation findings for ETL Pipeline Design: {summary of findings}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Compile validation results
- Update frontmatter `stepsCompleted: [20, 21]`
- Proceed to next step: `step-22-v-generate-report.md`

---

## Verification

- [ ] All QG-I2 checks performed
- [ ] Critical items verified
- [ ] Findings categorized by severity
- [ ] Recommendations documented
- [ ] Patterns align with pattern registry

---

## Outputs

- QG-I2 validation results
- Severity-categorized issues
- Recommendations for improvements

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate validation report.
