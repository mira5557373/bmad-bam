# Step 3: Tenant Health Checks

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions


---

## Purpose

Execute per-tenant health verification to ensure all tenants are functioning correctly after deployment. This includes tenant-specific configuration, data integrity, and service availability checks.

---

## Prerequisites

- Step 2 completed (monitoring activation verified)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`

---

## Inputs

- List of active tenants
- Tenant tier configurations
- Expected tenant-specific features
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Enumerate Active Tenants

Retrieve list of all active tenants:
- Production tenants requiring verification
- Tier classification (FREE, PRO, ENTERPRISE)
- Priority order for health checks

### 2. Execute Per-Tenant Health Checks

For each tenant, verify:

| Check Category | Verification | Pass Criteria |
|----------------|--------------|---------------|
| Authentication | Tenant login flow | Auth successful |
| Data Access | Tenant-scoped queries | Data returned |
| Configuration | Tier features active | Config matches tier |
| AI Services | Agent availability | Agent responds |
| Quotas | Usage within limits | No quota violations |

### 3. Tier-Specific Verification

Validate tier-specific features:

| Tier | Features to Verify |
|------|-------------------|
| FREE | Basic API access, rate limits enforced |
| PRO | Extended features, higher limits, priority queue |
| ENTERPRISE | All features, custom limits, dedicated resources |

### 4. Generate Tenant Health Report

Compile health status per tenant:

| Tenant | Tier | Auth | Data | Config | AI | Quotas | Status |
|--------|------|------|------|--------|-----|--------|--------|
| tenant_a | PRO | PASS | PASS | PASS | PASS | PASS | HEALTHY |
| tenant_b | FREE | PASS | PASS | PASS | PASS | PASS | HEALTHY |

**Verify current best practices with web search:**
Search the web: "multi-tenant health check patterns SaaS {date}"
Search the web: "tenant-aware deployment verification {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing tenant health checks, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into tenant-specific issues or edge cases
- **P (Party Mode)**: Bring support and operations perspectives for health review
- **C (Continue)**: Accept tenant health status and proceed to rollback readiness
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass health context: tenant status, failures, anomalies
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into health report
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tenant health: {summary of per-tenant status}"
- Process collaborative analysis from support and operations personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save tenant health report to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-rollback-readiness.md`

---

## Verification

- [ ] All active tenants enumerated
- [ ] Per-tenant health checks executed
- [ ] Tier-specific features verified
- [ ] Health status documented per tenant
- [ ] Patterns align with pattern registry

---

## Outputs

- Tenant health status report
- Per-tenant verification results
- Tier feature verification matrix
- **Load template:** `{project-root}/_bmad/bam/templates/tenant-health-report-template.md`

---

## Next Step

Proceed to `step-04-c-rollback-readiness.md` to verify rollback capability.
