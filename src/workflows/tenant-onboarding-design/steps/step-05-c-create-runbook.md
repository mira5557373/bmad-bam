# Step 5: Create Onboarding Runbook

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
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics


---

## Purpose

Generate the operational runbook for tenant onboarding.

---

## Prerequisites

- Isolation boundaries defined (Step 4)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: observability`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

Generate the operational runbook for tenant onboarding:

---

## Automated Onboarding Flow

```
1. Receive tenant registration request
2. Validate request against business rules
3. Create tenant record (status: PROVISIONING)
4. Execute provisioning stages (1-9)
5. Send welcome email with setup instructions
6. Transition to ACTIVE status
7. Log onboarding completion metrics
```

---

## Manual Intervention Scenarios

| Scenario | Detection | Resolution |
|----------|-----------|------------|
| Provisioning timeout | Stage stuck > 5 minutes | Retry stage or manual completion |
| Database setup failure | Schema creation error | Check quotas, manually create schema |
| Storage quota exceeded | S3 bucket limit | Expand storage allocation |
| Duplicate slug | Uniqueness constraint violation | Prompt for alternative slug |
| Payment verification failed | Billing API error | Manual verification, retry |

---

## Rollback Procedure

If provisioning fails after partial completion:

1. Identify last successful stage from state machine
2. Execute rollback for each completed stage in reverse order
3. Mark tenant as FAILED with error details
4. Notify operations team
5. Retain partial data for 24h for debugging
6. Clean up after retention period

---

## Monitoring and Alerting

- Alert on: provisioning duration > 5 minutes
- Alert on: provisioning failure rate > 5% in 1 hour
- Dashboard: provisioning funnel conversion
- Dashboard: average provisioning duration by stage

---

## Post-Onboarding Verification

Automated health check after onboarding:
- [ ] Tenant can authenticate
- [ ] Admin user can access dashboard
- [ ] Agent creation works
- [ ] Storage upload works
- [ ] Search queries return results

Generate verification report and attach to tenant record.

---

## Documentation Deliverables

Output files to generate:
- `{output_folder}/planning-artifacts/operations/tenant-onboarding-runbook.md`
- `{output_folder}/planning-artifacts/architecture/tenant-provisioning-flow.md`

**Verify current best practices with web search:**
Search the web: "tenant onboarding runbook tenant lifecycle {date}"
Search the web: "SaaS onboarding automation multi-tenant SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the onboarding runbook above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into runbook procedures and edge cases
- **P (Party Mode)**: Bring analyst and architect perspectives for runbook review
- **C (Continue)**: Accept runbook and finalize onboarding design
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass runbook context: flow, manual interventions, rollback, monitoring
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into onboarding runbook
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review onboarding runbook: {summary of flow and procedures}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save runbook to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Generate final onboarding documentation

---

## Verification

- [ ] Automated flow documented
- [ ] Manual intervention scenarios listed
- [ ] Rollback procedure defined
- [ ] Monitoring and alerting configured
- [ ] Post-onboarding verification complete
- [ ] Patterns align with pattern registry

---

## Outputs

- Tenant onboarding runbook
- Provisioning flow document
- **Load template:** `{project-root}/_bmad/bam/templates/onboarding-runbook-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/operational-runbook-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/onboarding-design-template.md`

---

## Next Step

Proceed to `bmad-bam-tenant-offboarding-design` to design the offboarding process.
