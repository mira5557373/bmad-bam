# Step 1: Design Runbook Structure

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- **ALWAYS pause after presenting findings** and await user direction
- **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Design runbook structure, templates, and categorization.

---

## Prerequisites

- Master architecture defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: operations

---

## Actions

### 1. Runbook Categories

| Category | Purpose | Examples |
|----------|---------|----------|
| Incident | Respond to incidents | Service restart, failover |
| Maintenance | Scheduled maintenance | Patching, upgrades |
| Diagnostic | Troubleshooting | Log analysis, health checks |
| Recovery | Disaster recovery | Data restore, DR failover |
| Tenant | Tenant operations | Provisioning, tier migration |

### 2. Runbook Template Structure

| Section | Content | Required |
|---------|---------|----------|
| Metadata | Name, category, owner, version | Yes |
| Overview | Purpose and scope | Yes |
| Prerequisites | Required access, tools, state | Yes |
| Tenant Impact | Affected tenants, notification | Yes |
| Steps | Numbered procedural steps | Yes |
| Verification | Success criteria, checks | Yes |
| Rollback | Undo procedures | If applicable |
| Escalation | When to escalate | Yes |

### 3. Runbook Maturity Levels

| Level | Characteristics | Automation |
|-------|-----------------|------------|
| L1 - Manual | Written procedures | None |
| L2 - Assisted | Scripts and tools | Partial |
| L3 - Semi-auto | Human approval gates | Mostly automated |
| L4 - Fully auto | Self-healing | Complete |

### 4. Tenant-Aware Considerations

| Aspect | Consideration | Implementation |
|--------|---------------|----------------|
| Scope | Single vs multi-tenant | Tenant selector parameter |
| Isolation | Prevent cross-tenant impact | Tenant context validation |
| Notification | Tenant-specific alerts | Notification routing |
| Audit | Tenant-scoped logging | Tenant ID in all logs |

**Verify current best practices with web search:**
Search the web: "runbook engineering best practices {date}"
Search the web: "SRE runbook templates multi-tenant {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing runbook structure design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into runbook templates
- **P (Party Mode)**: Bring SRE and operations perspectives
- **C (Continue)**: Accept runbook structure and proceed to automation patterns
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Save runbook structure to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-automation-patterns.md`

---

## Verification

- [ ] Runbook categories defined
- [ ] Template structure documented
- [ ] Maturity levels established
- [ ] Tenant-aware considerations addressed
- [ ] Patterns align with pattern registry

---

## Outputs

- Runbook category taxonomy
- Template structure specification
- Maturity model

---

## Next Step

Proceed to `step-02-c-automation-patterns.md` to design automation patterns.
