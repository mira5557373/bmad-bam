# Step 1: Design Chaos Experiments

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

Design chaos experiments with hypotheses and success criteria.

---

## Prerequisites

- Master architecture defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: resilience

---

## Actions

### 1. Experiment Categories

| Category | Focus | Example Experiments |
|----------|-------|---------------------|
| Infrastructure | Compute, storage, network | Node failure, disk fill, network partition |
| Application | Services, APIs, dependencies | Service crash, timeout, memory leak |
| Data | Database, cache, queue | DB failover, cache eviction, queue backlog |
| AI/ML | Models, inference, pipelines | LLM timeout, embedding failure, model unavailable |

### 2. Multi-Tenant Experiments

| Experiment | Hypothesis | Validation |
|------------|------------|------------|
| Tenant isolation | One tenant failure doesn't affect others | Monitor other tenant SLIs |
| Noisy neighbor | High-load tenant doesn't degrade others | Measure cross-tenant latency |
| Resource exhaustion | Quota limits prevent cascade | Verify tenant quota enforcement |
| Data isolation | Tenant data stays isolated under stress | Audit data access logs |

### 3. Experiment Design Template

| Element | Description | Example |
|---------|-------------|---------|
| Name | Descriptive experiment name | `node-failure-zone-a` |
| Hypothesis | Expected system behavior | "System maintains 99.9% availability" |
| Steady state | Normal metrics baseline | P99 latency < 200ms |
| Injection | Fault to introduce | Kill random node in zone-a |
| Blast radius | Affected scope | Zone-a compute only |
| Abort criteria | When to stop | Error rate > 5% |
| Rollback | How to restore | Auto-healing or manual restart |

### 4. Experiment Priority Matrix

| Risk Level | Environment | Frequency | Approval |
|------------|-------------|-----------|----------|
| Low | Production | Weekly | Auto-approved |
| Medium | Production | Monthly | Team lead |
| High | Production | Quarterly | CAB |
| Any | Staging | Daily | Auto-approved |
| Critical | Production | Never auto | Executive |

**Verify current best practices with web search:**
Search the web: "chaos engineering multi-tenant best practices {date}"
Search the web: "chaos monkey Gremlin experiments {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing experiment design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific experiment categories
- **P (Party Mode)**: Bring SRE and security perspectives for review
- **C (Continue)**: Accept experiment design and proceed to blast radius
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Save experiment design to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-blast-radius.md`

---

## Verification

- [ ] Experiment categories defined
- [ ] Multi-tenant experiments specified
- [ ] Template documented
- [ ] Priority matrix established
- [ ] Patterns align with pattern registry

---

## Outputs

- Experiment catalog
- Hypothesis definitions
- Priority matrix
- **Load template:** `{project-root}/_bmad/bam/data/templates/chaos-test-plan-template.md`

---

## Next Step

Proceed to `step-02-c-blast-radius.md` to design blast radius controls.
