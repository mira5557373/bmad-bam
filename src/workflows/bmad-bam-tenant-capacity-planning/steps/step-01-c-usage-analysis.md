# Step 1: Usage Analysis

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
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Analyze current tenant usage patterns to establish baselines for capacity planning and identify key metrics driving resource consumption.

---

## Prerequisites

- Master architecture document loaded
- Observability platform data available
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: operations
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`

---

## Actions

### 1. Define Resource Categories

Identify resources requiring capacity planning:

| Category | Resources | Unit | Criticality |
|----------|-----------|------|-------------|
| Compute | CPU, Memory | vCPU, GB | Critical |
| Storage | Database, Object, Cache | GB, IOPS | Critical |
| Network | Bandwidth, Connections | Mbps, count | High |
| AI/LLM | Token usage, API calls | tokens, calls | Critical |
| Background | Job queue, workers | jobs/min | High |
| Real-time | WebSocket, events | connections | Medium |

### 2. Define Tenant Usage Metrics

Document metrics for capacity analysis:

| Metric | Description | Query | Granularity |
|--------|-------------|-------|-------------|
| `tenant_cpu_usage` | CPU consumption per tenant | PromQL by tenant_id | 1 minute |
| `tenant_memory_usage` | Memory consumption per tenant | PromQL by tenant_id | 1 minute |
| `tenant_storage_bytes` | Storage used per tenant | Database query | Daily |
| `tenant_api_requests` | API requests per tenant | Counter metric | 1 minute |
| `tenant_llm_tokens` | LLM tokens consumed | Metering data | Per request |
| `tenant_agent_runs` | AI agent executions | Run logs | Per run |
| `tenant_concurrent_users` | Active users per tenant | Session data | 5 minutes |

### 3. Establish Usage Baselines

Calculate baseline usage per tenant tier:

| Tier | CPU (p95) | Memory (p95) | Storage | API req/min | LLM tokens/day |
|------|-----------|--------------|---------|-------------|----------------|
| Free | 0.1 vCPU | 256 MB | 1 GB | 10 | 10,000 |
| Pro | 0.5 vCPU | 1 GB | 10 GB | 100 | 100,000 |
| Enterprise | 2 vCPU | 4 GB | 100 GB | 1,000 | 1,000,000 |

### 4. Identify Usage Patterns

Document usage patterns by time and activity:

| Pattern | Description | Peak Times | Scaling Factor |
|---------|-------------|------------|----------------|
| Diurnal | Business hours usage | 9am-5pm local | 3x baseline |
| Weekly | Weekday vs weekend | Mon-Fri | 2x weekend |
| Monthly | End-of-month spikes | Last 3 days | 1.5x baseline |
| Seasonal | Industry-specific | Q4 for retail | 4x baseline |
| Event-driven | Launch, campaign | Unpredictable | 10x baseline |

### 5. Analyze Noisy Neighbor Impact

Assess cross-tenant resource impact:

| Resource | Isolation Level | Noisy Neighbor Risk | Mitigation |
|----------|----------------|---------------------|------------|
| CPU | Container limits | Medium | cgroups, quotas |
| Memory | Container limits | Medium | OOM limits |
| Database | RLS/Schema | High | Connection pools |
| Cache | Shared Redis | High | Key prefixing, eviction |
| Network | Shared ingress | Medium | Rate limiting |
| LLM API | Shared quotas | High | Per-tenant rate limits |

### 6. Document Current Capacity

Capture current infrastructure capacity:

| Resource | Current Capacity | Current Usage | Headroom |
|----------|-----------------|---------------|----------|
| CPU cores | {total} vCPU | {used}% | {available} |
| Memory | {total} GB | {used}% | {available} |
| Storage | {total} TB | {used}% | {available} |
| Database connections | {max} | {used}% | {available} |
| API rate limit | {limit}/sec | {used}% | {available} |

**Verify current best practices with web search:**
Search the web: "multi-tenant capacity planning metrics {date}"
Search the web: "SaaS usage analysis best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the usage analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific usage patterns
- **P (Party Mode)**: Bring SRE and finance perspectives
- **C (Continue)**: Accept analysis and proceed to growth projection
- **[Specific refinements]**: Describe analysis concerns

Select an option:
```

#### If 'C' (Continue):
- Save usage analysis to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-growth-projection.md`

---

## Verification

- [ ] Resource categories defined
- [ ] Usage metrics documented
- [ ] Baselines established per tier
- [ ] Usage patterns identified
- [ ] Noisy neighbor risks assessed
- [ ] Current capacity documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Resource category catalog
- Usage metric definitions
- Tier baseline calculations
- Usage pattern analysis
- Current capacity snapshot
- **Load template:** `{project-root}/_bmad/bam/data/templates/tenant-capacity-planning-template.md`

---

## Next Step

Proceed to `step-02-c-growth-projection.md` to forecast growth.
