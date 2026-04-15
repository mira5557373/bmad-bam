# Step 2: Design Automation Patterns

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

Design automation patterns and safety controls for runbook execution.

---

## Prerequisites

- Step 1 completed successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: automation

---

## Actions

### 1. Automation Triggers

| Trigger Type | Source | Use Case |
|--------------|--------|----------|
| Alert-based | Monitoring system | Auto-remediation |
| Scheduled | Cron/scheduler | Maintenance tasks |
| Event-based | System events | Provisioning, cleanup |
| Manual | Operator request | On-demand operations |
| Approval-gated | Workflow system | Change-controlled ops |

### 2. Execution Patterns

| Pattern | Description | When to Use |
|---------|-------------|-------------|
| Sequential | Steps in order | Standard procedures |
| Parallel | Concurrent execution | Independent tasks |
| Conditional | Branch based on state | Diagnostic flows |
| Retry | Auto-retry with backoff | Transient failures |
| Circuit breaker | Halt on threshold | Cascading failure |

### 3. Safety Controls

| Control | Implementation | Purpose |
|---------|----------------|---------|
| Dry run | Simulate without effect | Verify before execute |
| Confirmation | Human approval gate | Critical operations |
| Rollback | Automatic undo | Failed execution |
| Rate limiting | Execution throttle | Prevent overload |
| Scope limits | Maximum affected scope | Blast radius control |

### 4. Tenant-Safe Execution

| Requirement | Implementation | Verification |
|-------------|----------------|--------------|
| Context isolation | Tenant context injection | Unit tests |
| Resource limits | Per-tenant quotas | Quota checks |
| Data separation | Tenant-scoped queries | Data audit |
| Audit trail | Tenant-tagged logs | Log review |

**Verify current best practices with web search:**
Search the web: "runbook automation SRE patterns {date}"
Search the web: "self-healing infrastructure automation {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing automation patterns design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into safety controls
- **P (Party Mode)**: Bring DevOps and security perspectives
- **C (Continue)**: Accept automation patterns and proceed to assembly
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Save automation patterns to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-assembly.md`

---

## Verification

- [ ] Automation triggers defined
- [ ] Execution patterns documented
- [ ] Safety controls established
- [ ] Tenant-safe execution addressed
- [ ] Patterns align with pattern registry

---

## Outputs

- Automation trigger catalog
- Execution pattern specifications
- Safety control procedures

---

## Next Step

Proceed to `step-03-c-assembly.md` to assemble final document.
