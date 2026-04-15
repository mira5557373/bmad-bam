# Step 4: Create Runbook

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

Create an operational runbook for managing trial conversions, including manual intervention procedures, troubleshooting guides, and monitoring dashboards.

---

## Prerequisites

- Step 3 completed: Conversion workflow design
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: observability
- **Load template:** `{project-root}/_bmad/bam/data/templates/runbook-template.md`

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Define Conversion Monitoring Checklist

Document what to monitor for healthy conversions:

| Metric | Normal Range | Alert Threshold | Dashboard |
|--------|--------------|-----------------|-----------|
| Daily Conversion Rate | 3-8% | <2% or >15% | Growth Dashboard |
| Avg Time to Convert | 5-10 days | >14 days | Growth Dashboard |
| Payment Success Rate | >95% | <90% | Payments Dashboard |
| Cart Abandonment | <40% | >60% | Growth Dashboard |
| Nurture Email Open Rate | >25% | <15% | Marketing Dashboard |

### 2. Document Manual Intervention Procedures

Specify when and how to intervene:

| Scenario | Detection | Action | Owner |
|----------|-----------|--------|-------|
| Payment Failure | `conversion.failed` event | Contact user, offer retry | Support |
| Stuck Conversion | In-progress > 10min | Check payment gateway, manual complete | Ops |
| High-Value Trial | Score > 150, no conversion | Personal outreach | Sales |
| Churn Risk | Day 12, score < 20 | Executive sponsor email | CS |
| Mass Failure | >5% failure rate | Incident response | Engineering |

### 3. Create Troubleshooting Guide

Document common issues and resolutions:

| Issue | Symptoms | Root Cause | Resolution |
|-------|----------|------------|------------|
| Payment Declined | `conversion.failed` with payment error | Card issue | Retry with different card, offer alternative payment |
| Tier Not Updated | Payment success, features not enabled | Provisioning lag | Manual tier update, check event bus |
| Email Not Sent | Conversion complete, no confirmation | Email service failure | Resend via admin, check email logs |
| Score Not Updating | Events firing, score stale | Scoring pipeline issue | Restart scoring job, reprocess events |
| Duplicate Conversion | Multiple charges | Idempotency failure | Refund duplicate, fix idempotency key |

### 4. Define Escalation Procedures

Document escalation paths:

| Severity | Definition | Response Time | Escalation Path |
|----------|------------|---------------|-----------------|
| P1 | Mass conversion failure | 15 min | On-call → Engineering Lead → VP Eng |
| P2 | Payment gateway down | 30 min | On-call → Billing Team |
| P3 | Individual conversion stuck | 2 hours | Support → Ops |
| P4 | Reporting inaccuracy | 24 hours | Support → Analytics |

### 5. Create Operations Checklist

Daily/weekly operations tasks:

| Task | Frequency | Owner | Verification |
|------|-----------|-------|--------------|
| Review conversion funnel | Daily | Growth | Dashboard screenshot |
| Check payment failures | Daily | Support | Zero P1 failures |
| Review high-value trials | Weekly | Sales | All contacted |
| Analyze churn signals | Weekly | CS | Interventions logged |
| Review nurture performance | Weekly | Marketing | A/B test results |
| Audit conversion events | Monthly | Engineering | Event integrity |

**Verify current best practices with web search:**
Search the web: "SaaS conversion operations runbook {date}"
Search the web: "trial conversion monitoring best practices {date}"

_Source: [URL]_

---

## Quality Gates

- [ ] Monitoring checklist comprehensive
- [ ] Manual intervention procedures documented
- [ ] Troubleshooting guide covers common issues
- [ ] Escalation procedures defined
- [ ] Operations checklist created
- [ ] Runbook reviewed by operations team

---

## COLLABORATION MENUS (A/P/C):

After completing the runbook above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific operational procedures
- **P (Party Mode)**: Bring SRE and support perspectives on runbook completeness
- **C (Continue)**: Accept runbook and complete Create mode
- **[Specific refinements]**: Describe runbook concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: monitoring, intervention, troubleshooting procedures
- Process enhanced insights on operational completeness
- Ask user: "Accept these refined runbook procedures? (y/n)"
- If yes, integrate into runbook
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review trial conversion runbook for operational readiness"
- Process SRE and support perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save complete trial conversion design and runbook
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Complete Create mode workflow

---

## Verification

- [ ] Monitoring checklist defined
- [ ] Intervention procedures documented
- [ ] Troubleshooting guide complete
- [ ] Escalation paths defined
- [ ] Operations checklist created
- [ ] Patterns align with pattern registry

---

## Outputs

- Complete trial conversion design
- Engagement tracking specification
- Conversion workflow documentation
- Operational runbook
- **Output to:** `{output_folder}/planning-artifacts/operations/trial-conversion-design.md`
- **Output to:** `{output_folder}/planning-artifacts/operations/trial-engagement-tracking.md`

---

## Next Step

**Workflow Complete.**

The Create mode workflow is finished. To modify the output, use Edit mode (`step-10-e-*`). To verify the output meets quality criteria, use Validate mode (`step-20-v-*`).

---

## Workflow Complete (Create Mode)

Create mode complete for tenant-trial-conversion workflow. The following artifacts have been produced:

1. Trial model analysis with conversion triggers
2. Engagement tracking design with scoring model
3. Conversion workflow specifications
4. Operational runbook with monitoring and troubleshooting
