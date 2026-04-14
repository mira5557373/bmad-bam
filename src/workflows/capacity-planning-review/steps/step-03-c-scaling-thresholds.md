# Step 3: Scaling Threshold Definition

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array

---

## Purpose

Define auto-scaling trigger thresholds, manual scaling triggers, cost-based limits, and performance-based limits for capacity management.

---

## Prerequisites

- Growth projections completed (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: scaling

---

## Actions

### 1. Auto-Scaling Trigger Thresholds

| Resource | Scale Up Trigger | Scale Down Trigger | Min | Max | Cooldown |
|----------|------------------|-------------------|-----|-----|----------|
| Compute | > {%} CPU for {min}m | < {%} CPU for {min}m | {n} | {n} | {min}m |
| Memory | > {%} for {min}m | < {%} for {min}m | {n} | {n} | {min}m |
| Database replicas | > {connections} | < {connections} | {n} | {n} | {min}m |

### 2. Manual Scaling Triggers

| Trigger | Condition | Action Required | Escalation |
|---------|-----------|-----------------|------------|
| Projected capacity breach | < 30 days headroom | Scale up | Engineering lead |
| Cost threshold breach | > ${amount}/month | Review scaling | Finance |
| AI quota warning | > 80% of limit | Increase quota | AI team |

### 3. Cost-Based Limits

| Resource | Cost Cap | Current Spend | % of Cap | Action at Limit |
|----------|----------|---------------|----------|-----------------|
| Compute | ${value}/mo | ${value} | {%} | {action} |
| AI API | ${value}/mo | ${value} | {%} | {action} |
| Storage | ${value}/mo | ${value} | {%} | {action} |

### 4. Performance-Based Limits

| Metric | SLA Target | Current | Scale Trigger |
|--------|------------|---------|---------------|
| Latency p95 | < {ms}ms | {ms}ms | > {ms}ms |
| Error rate | < {%}% | {%}% | > {%}% |
| AI response time | < {ms}ms | {ms}ms | > {ms}ms |

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into threshold tuning
- **P (Party Mode)**: Bring SRE and finance perspectives
- **C (Continue)**: Accept thresholds and proceed to resource allocation
- **[Specific refinements]**: Describe concerns to address

Select an option:
```

#### If 'C' (Continue):
- Save scaling thresholds to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-resource-allocation.md`

---

**Verify current best practices with web search:**
Search the web: "scaling thresholds best practices {date}"
Search the web: "scaling thresholds multi-tenant SaaS {date}"

## Verification

- [ ] Auto-scaling thresholds defined
- [ ] Manual scaling triggers documented
- [ ] Cost-based limits established
- [ ] Performance-based limits defined

---

## Outputs

- Scaling threshold document

---

## Next Step

Proceed to `step-04-c-resource-allocation.md` to verify resource allocation.
