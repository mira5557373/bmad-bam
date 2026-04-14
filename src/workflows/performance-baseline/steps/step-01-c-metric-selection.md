# Step 1: Select Performance Metrics

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

Select performance metrics to establish baselines and benchmarks.

---

## Prerequisites

- Master architecture defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: observability

---

## Actions

### 1. Latency Metrics

| Metric | Description | Baseline Target | Collection |
|--------|-------------|-----------------|------------|
| P50 latency | Median response time | < 50ms | Real-time |
| P95 latency | 95th percentile | < 200ms | Real-time |
| P99 latency | 99th percentile | < 500ms | Real-time |
| TTFB | Time to first byte | < 100ms | Real-time |
| DB query time | Database response | < 50ms | Real-time |

### 2. Throughput Metrics

| Metric | Description | Baseline Target | Collection |
|--------|-------------|-----------------|------------|
| RPS | Requests per second | By tier | Real-time |
| Concurrent users | Active connections | By tier | Real-time |
| API call volume | Calls per minute | By endpoint | Aggregated |
| LLM tokens/min | Token throughput | By tenant | Real-time |

### 3. Resource Metrics

| Metric | Description | Baseline Target | Collection |
|--------|-------------|-----------------|------------|
| CPU utilization | Processor usage | < 70% | Real-time |
| Memory utilization | RAM usage | < 80% | Real-time |
| Disk I/O | Storage throughput | By workload | Real-time |
| Network I/O | Bandwidth usage | By traffic | Real-time |

### 4. Tenant-Specific Metrics

| Metric | Description | Segmentation | Collection |
|--------|-------------|--------------|------------|
| Per-tenant latency | Tenant response time | By tenant ID | Real-time |
| Per-tenant throughput | Tenant request volume | By tenant ID | Aggregated |
| Quota utilization | Usage vs limits | By tenant/tier | Real-time |
| Feature latency | Per-feature timing | By feature | Real-time |

**Verify current best practices with web search:**
Search the web: "SaaS performance metrics best practices {date}"
Search the web: "multi-tenant performance benchmarking {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing metric selection, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific metric categories
- **P (Party Mode)**: Bring SRE and product perspectives
- **C (Continue)**: Accept metric selection and proceed to baseline collection
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Save metric selection to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-baseline-collection.md`

---

## Verification

- [ ] Latency metrics defined
- [ ] Throughput metrics documented
- [ ] Resource metrics established
- [ ] Tenant-specific metrics addressed
- [ ] Patterns align with pattern registry

---

## Outputs

- Performance metrics catalog
- Baseline targets
- Collection strategy

---

## Next Step

Proceed to `step-02-c-baseline-collection.md` to design baseline collection.
