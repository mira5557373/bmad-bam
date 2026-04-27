# Step 4: Design Trace Analysis

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

Design trace analysis capabilities including tenant-scoped search/filtering, latency analysis dashboards, error rate tracking, and agent performance comparison.

---

## Prerequisites

- Step 3 completed: Trace propagation designed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-analytics`, `apm-integration`
- **Load guide:** `{project-root}/_bmad/bam/data/domains/observability.md`

---

## Inputs

- Trace propagation design from Step 3
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Tenant tier requirements
- SLO definitions

---

## Actions

### 1. Design Trace Search and Filtering by Tenant

Define tenant-scoped trace query capabilities:

| Query Type | Scope | Tenant Isolation | Use Case |
|------------|-------|------------------|----------|
| Trace lookup | Single trace | Required | Debug specific request |
| Session traces | Session | Required | User journey analysis |
| Error search | Tenant | Required | Error investigation |
| Pattern search | Tenant | Required | Anomaly detection |
| Aggregate query | Tenant | Required | Performance metrics |

Query Filters:

| Filter | Type | Indexed | Description |
|--------|------|---------|-------------|
| `tenant_id` | string | CRITICAL | Tenant isolation filter |
| `trace_id` | string | YES | Specific trace lookup |
| `span_name` | string | YES | Span type filter |
| `time_range` | range | YES | Time-based queries |
| `agent_id` | string | YES | Agent filter |
| `error` | boolean | YES | Error spans only |
| `duration_ms` | range | YES | Latency filter |
| `model` | string | YES | LLM model filter |

Tenant Query Enforcement:

| Access Level | Query Scope | Enforcement |
|--------------|-------------|-------------|
| Tenant user | Own tenant only | Query rewrite |
| Tenant admin | Own tenant only | Query rewrite |
| Platform admin | All tenants | Audit logging |
| System | All tenants | Service account |

Query Result Limits:

| Tenant Tier | Max Results | Retention | Query Rate |
|-------------|-------------|-----------|------------|
| Free | 1,000 | 7 days | 10/min |
| Pro | 10,000 | 30 days | 100/min |
| Enterprise | 100,000 | 90 days | 1000/min |

### 2. Design Latency Analysis Dashboards

Define latency metrics and visualizations:

| Metric | Calculation | Breakdown | Alert Threshold |
|--------|-------------|-----------|-----------------|
| P50 latency | 50th percentile | By agent, tool, model | - |
| P95 latency | 95th percentile | By agent, tool, model | SLO-defined |
| P99 latency | 99th percentile | By agent, tool, model | 2x P95 |
| Max latency | Maximum observed | By agent, tool, model | - |
| Latency trend | Rolling average | Hourly/daily | Deviation |

Dashboard Panels:

| Panel | Visualization | Dimensions | Tenant Scope |
|-------|---------------|------------|--------------|
| Agent latency heatmap | Heatmap | agent x time | Per-tenant |
| Tool latency distribution | Histogram | tool type | Per-tenant |
| LLM response times | Time series | model x time | Per-tenant |
| Slow trace list | Table | trace_id, duration | Per-tenant |
| Latency comparison | Bar chart | agent comparison | Per-tenant |

Latency Breakdown Analysis:

| Component | Metric | Attribution |
|-----------|--------|-------------|
| LLM inference | `llm.latency_ms` | Model + prompt size |
| Tool execution | `tool.latency_ms` | Tool type |
| Memory access | `memory.latency_ms` | Store type |
| Network | `http.latency_ms` | Service |
| Queue wait | `queue.wait_ms` | Concurrency |

### 3. Design Error Rate Tracking

Define error tracking and alerting:

| Error Category | Detection | Severity | Alert |
|----------------|-----------|----------|-------|
| Agent failure | span.status = ERROR | HIGH | Immediate |
| Tool timeout | tool.timeout event | MEDIUM | Threshold |
| LLM error | llm.error event | HIGH | Immediate |
| Memory failure | memory.error event | HIGH | Immediate |
| Rate limit | http.status = 429 | LOW | Threshold |
| Circuit break | circuit.open event | MEDIUM | Immediate |

Error Metrics:

| Metric | Calculation | Alert Condition |
|--------|-------------|-----------------|
| Error rate | errors / total * 100 | > 1% sustained |
| Error count | Sum of errors | > N in window |
| Error trend | Rate of change | Significant increase |
| MTTR | Time to resolution | > SLO target |

Error Drill-down Attributes:

| Attribute | Type | Purpose |
|-----------|------|---------|
| `error.type` | string | Error classification |
| `error.message` | string | Error description |
| `error.stack_trace` | string | Debug context |
| `error.retry_count` | int | Retry attempts |
| `error.recovered` | boolean | Recovery status |
| `error.impact` | string | User impact level |

Error Alert Rules:

| Rule | Condition | Action | Tenant Scope |
|------|-----------|--------|--------------|
| High error rate | > 5% for 5 min | Page on-call | Platform |
| Agent down | 100% errors | Page on-call | Platform |
| Tenant degradation | > 10% errors | Notify tenant | Per-tenant |
| New error type | First occurrence | Log + investigate | Platform |

### 4. Design Agent Performance Comparison

Define agent performance benchmarking:

| Metric | Definition | Comparison Basis |
|--------|------------|------------------|
| Throughput | Completions/minute | Agent vs agent |
| Efficiency | Tokens per completion | Agent vs agent |
| Success rate | Successful/total | Agent vs baseline |
| Cost efficiency | Cost per completion | Agent vs agent |
| Latency | Average completion time | Agent vs SLO |

Performance Comparison Dimensions:

| Dimension | Comparison | Visualization |
|-----------|------------|---------------|
| Agent type | Planner vs Executor | Bar chart |
| Model version | GPT-4 vs Claude | Side-by-side |
| Time period | This week vs last | Trend line |
| Tenant tier | Free vs Pro vs Ent | Grouped bars |
| Task type | Research vs Writing | Heatmap |

Performance Scorecard:

| Category | Weight | Metrics |
|----------|--------|---------|
| Reliability | 30% | Success rate, error rate |
| Performance | 30% | P95 latency, throughput |
| Efficiency | 20% | Token usage, cost |
| Quality | 20% | User ratings, retries |

A/B Testing Support:

| Capability | Implementation | Trace Attribute |
|------------|----------------|-----------------|
| Model comparison | Traffic split | `experiment.variant` |
| Prompt comparison | Variant tracking | `prompt.version` |
| Agent comparison | Feature flags | `agent.variant` |
| Results correlation | Outcome tracking | `experiment.outcome` |

**Verify current best practices with web search:**
Search the web: "AI agent performance monitoring dashboards {date}"
Search the web: "LLM observability error tracking {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the trace analysis design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into alerting strategies and SLO design
- **P (Party Mode)**: Bring SRE and data analyst perspectives
- **C (Continue)**: Accept analysis design and proceed to compile tracing spec
- **[Specific refinements]**: Describe analysis concerns to address

Select an option:
```

#### If 'C' (Continue):
- Save trace analysis design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-complete.md`

---

## Verification

- [ ] Tenant-scoped search and filtering designed
- [ ] Latency analysis dashboards specified
- [ ] Error rate tracking defined
- [ ] Agent performance comparison designed
- [ ] Alert rules documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Trace query specification
- Latency dashboard design
- Error tracking schema
- Performance comparison framework

---

## Next Step

Proceed to `step-05-c-complete.md` to compile the complete tracing design.
