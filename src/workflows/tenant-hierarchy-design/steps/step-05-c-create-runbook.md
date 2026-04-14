# Step 5: Create Runbook

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

Create operational runbook for managing tenant hierarchy operations.

---

## Prerequisites

- Steps 1-4 completed
- **Load template:** `{project-root}/_bmad/bam/templates/tenant-lifecycle-template.md`

---

## Actions

### 1. Hierarchy Creation Procedures

Document procedures for:

| Operation | Steps | Approval Required |
|-----------|-------|-------------------|
| Create Root Tenant | Contract, provision, configure | Sales + Ops |
| Create BU | Parent admin request, quota allocation | Root admin |
| Create Department | BU admin request, inheritance setup | BU admin |
| Create Team | Dept admin request, minimal config | Dept admin |
| Create Project | Team lead request, auto-provision | Team admin |

### 2. Hierarchy Modification Procedures

| Operation | Impact | Procedure |
|-----------|--------|-----------|
| Move tenant to new parent | Permission recalc, billing update | Maintenance window |
| Merge tenants | Data migration, user consolidation | Full audit trail |
| Split tenant | Data partitioning, new hierarchy | Staged rollout |
| Rename tenant | Slug update, reference updates | Coordinated change |

### 3. Hierarchy Deletion Procedures

| Scenario | Requirements | Process |
|----------|--------------|---------|
| Delete leaf tenant | No children, data exported | Standard deletion |
| Delete with children | Children must move or delete first | Cascading approval |
| Archive hierarchy branch | Preserve data, remove access | Archive workflow |
| Force delete | Emergency only, audit required | Break glass |

### 4. Troubleshooting Guide

| Issue | Symptoms | Resolution |
|-------|----------|------------|
| Permission not inherited | Child lacks expected access | Check override flags |
| Quota exceeded | Usage blocked | Rebalance or increase parent |
| Billing mismatch | Costs not rolling up | Verify cost center mapping |
| Hierarchy corruption | Orphaned tenants | Run integrity check |

### 5. Monitoring and Alerting

Define operational metrics:

- Hierarchy depth utilization
- Quota consumption by level
- Permission inheritance latency
- Billing rollup accuracy
- Cross-hierarchy access patterns

**Verify current best practices with web search:**
Search the web: "tenant hierarchy operations runbook SaaS {date}"
Search the web: "multi-tenant management best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the runbook, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into edge cases and disaster recovery
- **P (Party Mode)**: Bring analyst and architect perspectives for runbook review
- **C (Continue)**: Accept runbook and complete Create mode
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass runbook context: procedures, troubleshooting, monitoring
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into runbook
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review hierarchy runbook: {summary of procedures and monitoring}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save complete runbook to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Output to: `{output_folder}/planning-artifacts/architecture/tenant-hierarchy-design.md`
- Create mode complete

---

## Verification

- [ ] All creation procedures documented
- [ ] Modification procedures complete
- [ ] Deletion procedures with safety checks
- [ ] Troubleshooting guide comprehensive
- [ ] Monitoring metrics defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Complete tenant hierarchy design document
- Operational runbook
- Monitoring specification

---

## Next Step

Create workflow complete. Tenant hierarchy design ready for validation using Validate mode (`step-20-v-*`).

---

## Create Mode Complete

Tenant hierarchy design is complete. The artifact is ready for validation or implementation.
