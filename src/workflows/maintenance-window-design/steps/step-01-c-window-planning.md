# Step 1: Plan Maintenance Windows

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

Plan maintenance window schedules and zero-downtime strategies.

---

## Prerequisites

- Master architecture defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: operations

---

## Actions

### 1. Maintenance Types

| Type | Frequency | Impact | SLA Allowance |
|------|-----------|--------|---------------|
| Routine | Weekly | None | Within uptime SLA |
| Security | As needed | Minimal | Emergency exception |
| Major upgrade | Quarterly | Possible | Scheduled downtime |
| Emergency | As needed | Variable | SLA credit eligible |

### 2. Window Scheduling

| Window Type | Timing | Duration | Notification |
|-------------|--------|----------|--------------|
| Standard | Sunday 2-6 AM | 4 hours | 72 hours |
| Extended | Monthly | 8 hours | 1 week |
| Emergency | Any time | As needed | Immediate |
| Regional | By timezone | 2 hours | 24 hours |

### 3. Zero-Downtime Strategies

| Strategy | Mechanism | Use Case |
|----------|-----------|----------|
| Blue-green | Parallel environments | Major releases |
| Rolling | Gradual instance update | Minor updates |
| Canary | Percentage-based rollout | Feature releases |
| Hot swap | Live component replacement | Config changes |

### 4. SLA Impact Analysis

| Tier | Allowed Downtime/Month | Maintenance Allocation |
|------|------------------------|------------------------|
| Enterprise | 4.32 min (99.99%) | Zero planned downtime |
| Business | 43.2 min (99.9%) | 30 min scheduled |
| Starter | 7.2 hours (99%) | 4 hours scheduled |
| Trial | None specified | Best effort |

**Verify current best practices with web search:**
Search the web: "SaaS maintenance window best practices {date}"
Search the web: "zero-downtime deployment strategies {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing window planning, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into zero-downtime strategies
- **P (Party Mode)**: Bring SRE and customer success perspectives
- **C (Continue)**: Accept window planning and proceed to tenant coordination
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Save window planning to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-tenant-coordination.md`

---

## Verification

- [ ] Maintenance types defined
- [ ] Window scheduling documented
- [ ] Zero-downtime strategies established
- [ ] SLA impact analyzed
- [ ] Patterns align with pattern registry

---

## Outputs

- Maintenance type catalog
- Window schedule template
- Zero-downtime procedures

---

## Next Step

Proceed to `step-02-c-tenant-coordination.md` to design tenant coordination.
