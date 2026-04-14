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

Create an operational runbook for tenant reactivation, including troubleshooting guides, escalation procedures, and monitoring dashboards.

---

## Prerequisites

- Step 3 completed: Data restoration design
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

### 1. Define Reactivation Monitoring

Document what to monitor during reactivation:

| Metric | Normal Range | Alert Threshold | Dashboard |
|--------|--------------|-----------------|-----------|
| Reactivation success rate | >95% | <90% | Lifecycle Dashboard |
| Avg restoration time | <2 hours | >6 hours | Ops Dashboard |
| Payment recovery rate | >80% | <70% | Revenue Dashboard |
| Data integrity score | 100% | <99% | Data Dashboard |
| Win-back conversion | >5% | <2% | Marketing Dashboard |

### 2. Document Troubleshooting Guide

Specify common issues and resolutions:

| Issue | Symptoms | Root Cause | Resolution |
|-------|----------|------------|------------|
| Restoration timeout | >24h in progress | Large dataset, slow retrieval | Increase timeout, parallelize |
| Integrity failure | Checksum mismatch | Corrupted archive | Retry from backup, manual verify |
| Payment decline | Reactivation blocked | Card expired | Guide to update payment |
| Missing data | User reports gaps | Incomplete archive | Restore from additional backup |
| Login failure | Can't authenticate | Credential sync issue | Reset credentials, verify account |

### 3. Define Manual Intervention Procedures

Specify when and how to intervene:

| Scenario | Detection | Action | Owner |
|----------|-----------|--------|-------|
| Stuck restoration | >6h in progress | Check pipeline, retry phase | Ops |
| Partial restoration | Verification fails | Manual reconciliation | Data team |
| VIP reactivation | High-value tenant | Dedicated support, prioritize | CS Lead |
| Bulk reactivation | >10 tenants | Batch processing, monitoring | Ops |
| Emergency restore | Critical business need | Skip queue, immediate action | On-call |

### 4. Create Escalation Procedures

Document escalation paths:

| Severity | Definition | Response Time | Escalation Path |
|----------|------------|---------------|-----------------|
| P1 | VIP tenant, data loss risk | 1 hour | On-call → Data Lead → VP Eng |
| P2 | Standard restoration failure | 4 hours | Support → Ops |
| P3 | Delayed restoration | 24 hours | Support ticket |
| P4 | Informational | 48 hours | FAQ, self-service |

### 5. Define Operations Checklist

Daily/weekly operations tasks:

| Task | Frequency | Owner | Verification |
|------|-----------|-------|--------------|
| Review pending reactivations | Daily | Support | Queue cleared |
| Check restoration failures | Daily | Ops | All resolved |
| Audit win-back campaigns | Weekly | Marketing | Performance report |
| Verify archive integrity | Weekly | Data team | Random sampling |
| Review grace period expiries | Daily | Support | Warnings sent |
| Clean up completed restorations | Weekly | Ops | Resources released |

**Verify current best practices with web search:**
Search the web: "tenant reactivation runbook SaaS {date}"
Search the web: "data restoration operations best practices {date}"

_Source: [URL]_

---

## Quality Gates

- [ ] Monitoring checklist comprehensive
- [ ] Troubleshooting guide covers common issues
- [ ] Manual intervention procedures documented
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
- Pass context: monitoring, troubleshooting, escalation procedures
- Process enhanced insights on operational completeness
- Ask user: "Accept these refined runbook procedures? (y/n)"
- If yes, integrate into runbook
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review reactivation runbook for operational readiness"
- Process SRE and support perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save complete reactivation design and runbook
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
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

- Complete reactivation design
- Data restoration specifications
- Operational runbook
- **Output to:** `{output_folder}/planning-artifacts/operations/tenant-reactivation-design.md`
- **Output to:** `{output_folder}/planning-artifacts/operations/reactivation-runbook.md`

---

## Next Step

**Workflow Complete.**

The Create mode workflow is finished. To modify the output, use Edit mode (`step-10-e-*`). To verify the output meets quality criteria, use Validate mode (`step-20-v-*`).

---

## Workflow Complete (Create Mode)

Create mode complete for tenant-reactivation-design workflow. The following artifacts have been produced:

1. Suspension state analysis
2. Reactivation flow designs
3. Data restoration specifications
4. Operational runbook with troubleshooting and escalation
