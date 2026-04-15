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

Create an operational runbook for executing tier migrations, including pre-flight checks, execution steps, rollback procedures, and post-migration verification.

---

## Prerequisites

- Step 3 completed: Feature transition design
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

### 1. Define Pre-Flight Checks

Document required checks before migration:

| Check | Command/Query | Expected Result | Blocking |
|-------|---------------|-----------------|----------|
| Tenant exists | `SELECT * FROM tenants WHERE id = ?` | 1 row | Yes |
| No active jobs | `SELECT * FROM jobs WHERE tenant_id = ? AND status = 'running'` | 0 rows | Yes |
| Billing current | `GET /billing/status/{tenant_id}` | `status: current` | Yes |
| Data backup | `POST /backup/tenant/{tenant_id}` | `status: complete` | Yes |
| Target tier valid | Validate tier transition allowed | `valid: true` | Yes |

### 2. Document Execution Steps

Create step-by-step execution procedure:

| Step | Action | Actor | Timeout | Rollback Step |
|------|--------|-------|---------|---------------|
| 1 | Create migration record | System | 1s | Delete record |
| 2 | Pause tenant workloads | System | 30s | Resume workloads |
| 3 | Update tier in database | System | 5s | Revert tier |
| 4 | Update entitlements | System | 5s | Revert entitlements |
| 5 | Toggle feature flags | System | 5s | Revert flags |
| 6 | Allocate/deallocate resources | System | 5m | Revert resources |
| 7 | Update billing | System | 10s | Manual billing fix |
| 8 | Resume tenant workloads | System | 30s | N/A |
| 9 | Send notification | System | 5s | N/A |
| 10 | Complete migration record | System | 1s | N/A |

### 3. Design Rollback Procedure

Document rollback triggers and procedure:

| Trigger | Automatic | Rollback Window | Procedure |
|---------|-----------|-----------------|-----------|
| Step failure | Yes | During migration | Execute rollback steps in reverse |
| User request | No | 24 hours | Support ticket → execute rollback |
| Billing failure | No | 48 hours | Billing fix or rollback |
| Critical error | Yes | Immediate | Emergency rollback, alert ops |

### 4. Create Monitoring Checklist

Define what to monitor during and after migration:

| Metric | Normal Range | Alert Threshold | Dashboard |
|--------|--------------|-----------------|-----------|
| Migration duration | <5 min | >10 min | Ops Dashboard |
| Error rate | 0% | >0% | Ops Dashboard |
| Tenant API latency | <200ms | >500ms | Tenant Dashboard |
| Feature flag sync | <1s | >5s | Feature Flags |

### 5. Document Post-Migration Verification

Define verification steps after migration:

| Check | Method | Success Criteria | SLA |
|-------|--------|------------------|-----|
| Tier updated | Database query | tier = target_tier | Immediate |
| Features accessible | API test | tier features work | <1 min |
| Billing correct | Billing API | plan = target_plan | <5 min |
| No errors | Log search | 0 migration errors | <5 min |
| User notified | Email delivery | email sent | <10 min |

---

## Quality Gates

- [ ] Pre-flight checks comprehensive
- [ ] Execution steps have rollback defined
- [ ] Rollback procedure documented
- [ ] Monitoring configured
- [ ] Post-migration verification defined
- [ ] Runbook tested in staging

**Verify current best practices with web search:**
Search the web: "create runbook best practices {date}"
Search the web: "create runbook enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the runbook above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific runbook procedures
- **P (Party Mode)**: Bring SRE and operations perspectives on runbook completeness
- **C (Continue)**: Accept runbook and complete Create mode
- **[Specific refinements]**: Describe runbook concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: pre-flight checks, execution steps, rollback procedures
- Process enhanced insights on operational completeness
- Ask user: "Accept these refined runbook procedures? (y/n)"
- If yes, integrate into runbook
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tier migration runbook for operational readiness"
- Process SRE and operations perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save complete tier migration plan and runbook
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Complete Create mode workflow

---

## Verification

- [ ] Pre-flight checks defined
- [ ] Execution steps complete with rollback
- [ ] Rollback procedure documented
- [ ] Monitoring checklist ready
- [ ] Post-migration verification defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Complete tier migration runbook
- Pre-flight checklist
- Monitoring configuration
- **Output to:** `{output_folder}/planning-artifacts/operations/tenant-tier-migration-plan.md`
- **Output to:** `{output_folder}/planning-artifacts/operations/tier-migration-runbook.md`

---

## Next Step

**Workflow Complete.**

The Create mode workflow is finished. To modify the output, use Edit mode (`step-10-e-*`). To verify the output meets quality criteria, use Validate mode (`step-20-v-*`).

---

## Workflow Complete (Create Mode)

Create mode complete for tenant-tier-migration workflow. The following artifacts have been produced:

1. Tier definitions and feature matrix
2. Migration paths with upgrade/downgrade strategies
3. Feature transition design with entitlements
4. Operational runbook with rollback procedures
