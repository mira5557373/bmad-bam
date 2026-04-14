# Step 3: Create Runbook

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics

---

## Purpose

Create an operational runbook for contract renewals, including monitoring dashboards, troubleshooting guides, and escalation procedures.

---

## Prerequisites

- Step 2 completed: Notification workflow design
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: observability
- **Load template:** `{project-root}/_bmad/bam/templates/runbook-template.md`

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Define Renewal Monitoring

Document what to monitor for healthy renewals:

| Metric | Normal Range | Alert Threshold | Dashboard |
|--------|--------------|-----------------|-----------|
| Renewal rate | >85% | <80% | Revenue Dashboard |
| Payment success rate | >95% | <90% | Payments Dashboard |
| Avg renewal value | Stable +/-10% | Drop >15% | Revenue Dashboard |
| Renegotiation rate | <20% | >30% | Sales Dashboard |
| Churn at renewal | <10% | >15% | Retention Dashboard |
| Notification delivery | >99% | <95% | Ops Dashboard |

### 2. Document Troubleshooting Guide

Specify common issues and resolutions:

| Issue | Symptoms | Root Cause | Resolution |
|-------|----------|------------|------------|
| Payment failure | Renewal blocked | Expired/declined card | Payment update flow |
| Notification not sent | No pre-renewal email | Email service issue | Manual send, check queue |
| Wrong price charged | Customer complaint | Pricing sync issue | Refund delta, fix config |
| Auto-renew despite cancel | Unexpected charge | Cancel not processed | Refund, investigate logs |
| Enterprise renewal missed | No sales follow-up | Assignment failure | Manual assignment, SLA credit |

### 3. Define Manual Intervention Procedures

Specify when and how to intervene:

| Scenario | Detection | Action | Owner |
|----------|-----------|--------|-------|
| VIP renewal at risk | Churn signals | Executive outreach | CS Lead |
| Bulk renewal failure | >5% failure spike | Payment system check | Ops |
| Price increase complaints | Support tickets | Offer concessions | CS |
| Renegotiation stuck | >7 days no progress | Escalate to manager | Sales Ops |
| Compliance violation | Audit finding | Immediate remediation | Legal |

### 4. Create Escalation Procedures

Document escalation paths:

| Severity | Definition | Response Time | Escalation Path |
|----------|------------|---------------|-----------------|
| P1 | Mass renewal failure | 1 hour | On-call → Billing Lead → VP Eng |
| P2 | VIP renewal at risk | 4 hours | CS → CS Lead → VP CS |
| P3 | Individual renewal issue | 24 hours | Support → Billing team |
| P4 | Process improvement | 1 week | Team lead → Product |

### 5. Define Operations Checklist

Daily/weekly operations tasks:

| Task | Frequency | Owner | Verification |
|------|-----------|-------|--------------|
| Review upcoming renewals | Daily | CS | Pipeline updated |
| Check failed payments | Daily | Support | All contacted |
| Review renegotiations | Weekly | Sales Ops | Progress tracked |
| Audit renewal notifications | Weekly | Ops | Delivery confirmed |
| Review churn at renewal | Weekly | CS | Reasons documented |
| Compliance check | Monthly | Legal | All notices compliant |

**Verify current best practices with web search:**
Search the web: "subscription renewal operations runbook {date}"
Search the web: "SaaS renewal management best practices {date}"

_Source: [URL]_

---

## Quality Gates

- [ ] Monitoring metrics comprehensive
- [ ] Troubleshooting guide covers common issues
- [ ] Manual intervention procedures documented
- [ ] Escalation procedures defined
- [ ] Operations checklist created
- [ ] Compliance requirements addressed

---

## COLLABORATION MENUS (A/P/C):

After completing the runbook above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific operational procedures
- **P (Party Mode)**: Bring SRE and CS perspectives on runbook completeness
- **C (Continue)**: Accept runbook and complete Create mode
- **[Specific refinements]**: Describe runbook concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: monitoring, troubleshooting, escalation procedures
- Process enhanced insights on operational completeness
- Ask user: "Accept these refined runbook procedures? (y/n)"
- If yes, integrate into runbook
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review contract renewal runbook for operational readiness"
- Process SRE and CS perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save complete contract renewal design and runbook
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Complete Create mode workflow

---

## Verification

- [ ] Monitoring metrics defined
- [ ] Troubleshooting guide complete
- [ ] Manual intervention procedures documented
- [ ] Escalation paths defined
- [ ] Operations checklist created
- [ ] Patterns align with pattern registry

---

## Outputs

- Complete contract renewal design
- Notification workflow specifications
- Operational runbook
- **Output to:** `{output_folder}/planning-artifacts/operations/contract-renewal-design.md`
- **Output to:** `{output_folder}/planning-artifacts/operations/renewal-runbook.md`

---

## Next Step

**Workflow Complete.**

The Create mode workflow is finished. To modify the output, use Edit mode (`step-10-e-*`). To verify the output meets quality criteria, use Validate mode (`step-20-v-*`).

---

## Workflow Complete (Create Mode)

Create mode complete for tenant-contract-renewal workflow. The following artifacts have been produced:

1. Contract type and renewal model analysis
2. Notification workflow specifications
3. Renegotiation procedures
4. Operational runbook with monitoring and escalation
