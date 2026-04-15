# Step 5: Create Offboarding Runbook

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

Generate the operational runbook for tenant offboarding.

---

## Prerequisites

- Cleanup isolation defined (Step 4)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: observability`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

Generate the operational runbook for tenant offboarding:

---

## Automated Offboarding Flow

```
1. Receive offboarding request (admin action or billing trigger)
2. Validate request authorization
3. Check for outstanding billing issues
4. Initiate grace period countdown
5. Send notification sequence to tenant
6. Generate data export package
7. Suspend tenant (SUSPENDED status)
8. Terminate active resources
9. Wait for retention period
10. Execute cleanup sequence
11. Generate deletion certificate
12. Archive audit records
```

---

## Trigger Types

| Trigger | Authorization | Grace Period | Auto-Export |
|---------|--------------|--------------|-------------|
| Admin request | Tenant admin | 7 days | Yes |
| Subscription expiry | System | 30 days | Yes |
| Payment failure | Billing system | 14 days | Yes |
| Terms violation | Platform admin | Immediate | No |
| GDPR deletion | Verified user | 30 days | Yes |

---

## Manual Intervention Scenarios

| Scenario | Detection | Resolution |
|----------|-----------|------------|
| Large tenant data export timeout | Export > 4 hours | Segment export, increase timeout |
| Active enterprise contract | Billing flag | Require manual authorization |
| Pending legal hold | Compliance flag | Block offboarding, notify legal |
| Data export download failure | User report | Regenerate export, extend link |
| Cleanup verification failure | Verification check | Manual cleanup, investigation |

---

## Rollback Procedure (Before Hard Delete)

If tenant requests reactivation during retention period:

1. Verify reactivation authorization
2. Check billing status is resolved
3. Restore tenant status to ACTIVE
4. Regenerate access tokens
5. Notify tenant of reactivation
6. Cancel scheduled cleanup jobs
7. Log reactivation in audit trail

---

## Emergency Offboarding (Terms Violation)

Expedited process for policy violations:

1. Platform admin authorization required
2. Immediate suspension (no grace period)
3. Preserve data for legal review
4. Block data export (pending review)
5. Legal team notification
6. Extended audit log retention

---

## Monitoring and Alerting

- Alert on: offboarding stuck > 24 hours
- Alert on: data export failure
- Alert on: cleanup verification failure
- Alert on: reactivation request during retention
- Dashboard: offboarding funnel metrics
- Dashboard: data retention compliance status

---

## Compliance Reporting

Generate monthly compliance report:
- Tenants offboarded this month
- Data exports generated
- Deletion certificates issued
- Average time to complete offboarding
- Reactivation rate

---

## Documentation Deliverables

Output files to generate:
- `{output_folder}/planning-artifacts/operations/tenant-offboarding-runbook.md`
- `{output_folder}/planning-artifacts/architecture/tenant-deprovisioning-flow.md`
- `{output_folder}/planning-artifacts/compliance/data-retention-policy.md`

**Verify current best practices with web search:**
Search the web: "tenant offboarding runbook tenant lifecycle {date}"
Search the web: "SaaS offboarding automation multi-tenant SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the offboarding runbook above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into runbook procedures and edge cases
- **P (Party Mode)**: Bring analyst and architect perspectives for runbook review
- **C (Continue)**: Accept runbook and finalize offboarding design
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass runbook context: flow, triggers, manual interventions, rollback
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into offboarding runbook
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review offboarding runbook: {summary of flow and procedures}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save runbook to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Generate final offboarding documentation

---

## Verification

- [ ] Automated flow documented
- [ ] Trigger types defined
- [ ] Manual intervention scenarios listed
- [ ] Rollback procedure specified
- [ ] Emergency procedure documented
- [ ] Monitoring and alerting configured
- [ ] Compliance reporting defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Tenant offboarding runbook
- Deprovisioning flow document
- Data retention policy
- **Load template:** `{project-root}/_bmad/bam/data/templates/offboarding-runbook-template.md`

---

## Next Step

Submit for production readiness validation via quality gate QG-P1.
