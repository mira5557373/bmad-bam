# Step 2: Design Tenant Impact Assessment

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

Design comprehensive tenant impact assessment procedures.

---

## Prerequisites

- Step 1 completed successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: tenant

---

## Actions

### 1. Impact Assessment Criteria

| Criterion | Assessment Method | Weight |
|-----------|-------------------|--------|
| Service availability | Uptime impact analysis | 30% |
| Data integrity | Data change analysis | 25% |
| Performance | Latency/throughput impact | 20% |
| Feature access | Feature availability | 15% |
| User experience | UX disruption level | 10% |

### 2. Tenant Segmentation Analysis

| Segment | Considerations | Notification Lead Time |
|---------|----------------|------------------------|
| Enterprise | SLA commitments, dedicated support | 72 hours |
| Business | Standard SLA, priority support | 48 hours |
| Starter | Best effort, self-service | 24 hours |
| Trial | No SLA, minimal notice | 12 hours |

### 3. Impact Communication

| Impact Level | Communication Method | Audience |
|--------------|---------------------|----------|
| None | No notification | N/A |
| Low | Status page update | All users |
| Medium | Email + status page | Affected tenants |
| High | Email + in-app + call | Affected + at-risk |
| Critical | All channels + account manager | All tenants |

### 4. Rollback Assessment

| Factor | Assessment Question | Decision Criteria |
|--------|---------------------|-------------------|
| Data state | Can data be reverted? | Backup availability |
| Dependencies | What depends on this? | Dependency map |
| Partial rollback | Can we rollback per tenant? | Isolation level |
| Time window | How long to full rollback? | Complexity score |

**Verify current best practices with web search:**
Search the web: "tenant impact assessment change management {date}"
Search the web: "SaaS change notification best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing tenant impact design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into impact assessment criteria
- **P (Party Mode)**: Bring product and customer success perspectives
- **C (Continue)**: Accept tenant impact design and proceed to approval workflow
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Save tenant impact assessment to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-approval-workflow.md`

---

## Verification

- [ ] Impact assessment criteria defined
- [ ] Tenant segmentation analyzed
- [ ] Communication plan documented
- [ ] Rollback assessment established
- [ ] Patterns align with pattern registry

---

## Outputs

- Impact assessment criteria
- Tenant segmentation rules
- Communication templates

---

## Next Step

Proceed to `step-03-c-approval-workflow.md` to design approval workflows.
