# Phase 0+1 Production Patterns - Consolidated Design

**Date:** 2026-04-24
**Status:** CONSOLIDATED DESIGN
**Approach:** AI-agent-friendly file structure
**Total New Files:** ~80 (reduced from ~370)

---

## Design Philosophy

### Why Consolidation?

AI coding agents work better with:
- **Fewer, richer files** - Less context switching
- **Themed groupings** - Related patterns together
- **Single source of truth** - Pattern registry as primary reference
- **Composite workflows** - One workflow covers multiple related patterns

### File Efficiency Target

| Component | Original | Consolidated | Reduction |
|-----------|----------|--------------|-----------|
| Agent guides | 30 | 6 | 80% |
| Workflows | 30 (330 files) | 10 (110 files) | 67% |
| Templates | 10 | 6 | 40% |
| **Total** | **~370** | **~80** | **78%** |

---

## Consolidated Structure

### 6 Themed Agent Guides

```
src/data/agent-guides/bam/
├── production-safety-patterns.md        # 6 patterns
├── production-observability-patterns.md # 5 patterns
├── production-reliability-patterns.md   # 6 patterns
├── production-governance-patterns.md    # 5 patterns
├── production-state-patterns.md         # 4 patterns
└── production-discovery-patterns.md     # 4 patterns
```

### 10 Composite Workflows

```
src/workflows/
├── bmad-bam-agent-safety-hardening/     # 6 safety patterns
├── bmad-bam-observability-setup/        # 5 observability patterns
├── bmad-bam-reliability-design/         # 6 reliability patterns
├── bmad-bam-tenant-governance/          # 5 governance patterns
├── bmad-bam-state-management/           # 4 state patterns
├── bmad-bam-ai-discovery-setup/         # 4 discovery patterns
├── bmad-bam-production-hardening/       # Meta-workflow: orchestrates all
└── (3 existing workflows updated)
```

### Pattern-to-Guide Mapping

| Guide | Patterns Covered |
|-------|------------------|
| **production-safety-patterns.md** | Kill Switch Registry, Agent Refusal Headers, Canary Token Inserter, Invisible Failure Detector, Grounding Verifier, Chunk-Level Attribution |
| **production-observability-patterns.md** | LLM Provider Health Dashboard, Tenant Usage Anomaly Detection, MCP Server Health Monitoring, Output Drift Monitor, Provider Quota Management |
| **production-reliability-patterns.md** | Fan-Out Circuit Breaker, Tool Timeout Management, Tool Fallback Chains, Retry Budget Engine, Tool Idempotency Guarantees, Tool Budget Guards |
| **production-governance-patterns.md** | Tenant Burst Protection, Per-Tenant Context Window Budget, Per-Tenant Agent Instance Limits, Memory Lifecycle Governance, Model Feature Flags |
| **production-state-patterns.md** | LangGraph Checkpoint Persistence, State Serialization Multi-Tenant, Interrupt/Resume Patterns, Conditional Edge Patterns |
| **production-discovery-patterns.md** | AGENTS.md Publishing, llms.txt Publishing, Prompt Rollback Automation, Model Warm-up Patterns |

---

## Agent Guide 1: Production Safety Patterns

**File:** `src/data/agent-guides/bam/production-safety-patterns.md`

```markdown
# Production Safety Patterns

**When to load:** When implementing agent safety controls, emergency shutdown mechanisms, output validation, or when user mentions kill switch, refusal handling, grounding, or data leakage detection.

**Integrates with:** Architect (Nova persona), Security agent, QA agent

---

## Overview

This guide covers 6 production safety patterns that ensure AI agents operate safely and transparently in multi-tenant environments.

| Pattern | Purpose | Quality Gate |
|---------|---------|--------------|
| Kill Switch Registry | Emergency agent shutdown | QG-I3 |
| Agent Refusal Headers | Transparent refusal logging | QG-I3 |
| Canary Token Inserter | Data leakage detection | QG-I2 |
| Invisible Failure Detector | Silent failure detection | QG-I3 |
| Grounding Verifier | Source-based output validation | QG-I3 |
| Chunk-Level Attribution | Output-to-source tracing | QG-I3 |

---

## Pattern 1: Kill Switch Registry

### Purpose
Centralized registry for immediate agent shutdown with sub-second propagation.

### Kill Switch Hierarchy

| Level | Scope | Trigger Authority | Use Case |
|-------|-------|-------------------|----------|
| Global | All agents, all tenants | Platform admin (2-person) | System-wide emergency |
| Per-tenant | Single tenant's agents | Tenant admin or platform | Tenant isolation breach |
| Per-agent | Single agent instance | Automated or manual | Agent misbehavior |
| Per-capability | Specific tool/action | Automated | Tool abuse |

### State Machine

| State | Behavior | Recovery |
|-------|----------|----------|
| Active | Normal operation | N/A |
| Triggered | Immediate halt, preserve state | Manual reset + review |
| Graceful | Complete current, reject new | Auto-resume after timeout |
| Quarantine | Isolated, no external calls | Security review required |

### Implementation Requirements

| Requirement | Target | Rationale |
|-------------|--------|-----------|
| Propagation latency | <1 second | Emergency response |
| State persistence | Durable | Survive restarts |
| Audit logging | All events | Compliance |
| Two-person rule | Global switch | Prevent accidents |

### Multi-Tenant Considerations

- Kill switches are tenant-scoped by default
- Global switches require elevated privileges
- Tenant admins can only affect their own agents
- Cross-tenant kill switch is a security incident

---

## Pattern 2: Agent Refusal Headers

### Purpose
HTTP headers indicating why an agent refused a request, enabling debugging and compliance.

### Header Schema

| Header | Purpose | Example |
|--------|---------|---------|
| `X-Agent-Refusal` | Refusal occurred | `true` |
| `X-Agent-Refusal-Code` | Category code | `GUARDRAIL_VIOLATION` |
| `X-Agent-Refusal-Detail` | Human-readable (redacted) | `Content policy triggered` |
| `X-Agent-Request-Id` | Correlation ID | `req_abc123xyz` |

### Refusal Categories

| Code | Meaning | Logged Detail | User Message |
|------|---------|---------------|--------------|
| `GUARDRAIL_VIOLATION` | Safety guardrail triggered | Full context | "Request couldn't be processed" |
| `BUDGET_EXCEEDED` | Token/cost limit hit | Usage stats | "Usage limit reached" |
| `POLICY_VIOLATION` | Tenant policy blocked | Policy ID | "Action not permitted" |
| `CAPABILITY_MISSING` | Agent can't perform | Capability gap | "I can't help with that" |
| `RATE_LIMITED` | Too many requests | Rate info | "Please slow down" |

### Implementation Requirements

- Always include correlation ID for debugging
- Redact sensitive details from header values (full context in server logs)
- Rate limit refusal logging to prevent log flooding
- Map codes to tenant-specific user-friendly messages

---

## Pattern 3: Canary Token Inserter

### Purpose
Insert traceable tokens in agent outputs to detect data leakage across tenant boundaries.

### Token Types

| Type | Scope | Format | Rotation |
|------|-------|--------|----------|
| Tenant token | Per-tenant | `CT-T-{tenant_id}-{hash}` | Daily |
| Session token | Per-session | `CT-S-{session_id}-{hash}` | Per session |
| Request token | Per-request | `CT-R-{request_id}` | Per request |

### Insertion Strategies

| Strategy | Visibility | Use Case |
|----------|------------|----------|
| HTML comment | Hidden | Web outputs |
| Whitespace encoding | Hidden | Text outputs |
| Metadata field | Structured | API responses |
| Visible watermark | Visible | High-security |

### Detection Mechanism

| Detection Point | Method | Alert Level |
|-----------------|--------|-------------|
| Cross-tenant API | Token mismatch check | Critical |
| External systems | Honeypot monitoring | Critical |
| Logs analysis | Pattern matching | Warning |
| Output sampling | Random verification | Info |

### Multi-Tenant Implementation

- Generate unique tokens per tenant
- Store token → tenant mapping securely
- Monitor for tokens appearing in wrong tenant context
- Immediate alert on cross-tenant token detection

---

## Pattern 4: Invisible Failure Detector

### Purpose
Detect failures that don't raise errors but produce incorrect or degraded outputs.

### Failure Types

| Type | Example | Detection Method |
|------|---------|------------------|
| Hallucination | Made-up facts | Cross-reference check |
| Quality degradation | Worse outputs over time | Baseline comparison |
| Semantic drift | Changed meaning | Embedding distance |
| Format corruption | Malformed structure | Schema validation |

### Detection Methods

| Method | Implementation | Coverage |
|--------|----------------|----------|
| Semantic validation | Compare output meaning to expected | Contradictions |
| Statistical monitoring | Track output distributions | Distribution shifts |
| Comparative validation | Cross-check with other models | Hallucinations |
| Confidence tracking | Monitor model uncertainty | Quality drops |

### Detection Signals

| Signal | Normal Range | Alert Threshold | Action |
|--------|--------------|-----------------|--------|
| Confidence score | >0.8 | <0.6 | Flag for review |
| Output length | ±20% baseline | ±50% baseline | Investigate |
| Semantic similarity | >0.85 to expected | <0.7 | Reject output |
| Factual consistency | 100% verifiable | <90% verifiable | Human review |

### Sampling Strategy

| Tier | Sample Rate | Validation Depth |
|------|-------------|------------------|
| Free | 1% | Basic |
| Pro | 5% | Standard |
| Enterprise | 10% | Comprehensive |

---

## Pattern 5: Grounding Verifier

### Purpose
Verify that agent outputs are grounded in source documents, not hallucinated.

### Grounding Levels

| Level | Requirement | Use Case |
|-------|-------------|----------|
| Strict | 100% claims grounded | Legal, medical, financial |
| Moderate | 80% claims grounded | General business |
| Loose | Best effort | Creative, exploratory |

### Verification Methods

| Method | Approach | Accuracy | Cost |
|--------|----------|----------|------|
| Citation check | Verify cited sources exist | High | Low |
| Semantic similarity | Compare to source embeddings | Medium | Medium |
| NLI entailment | Check if sources entail claims | High | High |
| Cross-reference | Multiple source verification | Highest | Highest |

### Implementation Flow

```
Agent Output
    │
    ├── Extract claims/statements
    │
    ├── For each claim:
    │   ├── Find supporting source chunks
    │   ├── Calculate grounding score
    │   └── Flag if below threshold
    │
    ├── Aggregate grounding score
    │
    └── Decision:
        ├── Score >= threshold → Pass
        ├── Score < threshold → Flag ungrounded claims
        └── Critical domain + low score → Reject
```

### Per-Tenant Configuration

| Setting | Options | Default |
|---------|---------|---------|
| Grounding level | strict/moderate/loose | moderate |
| Ungrounded action | reject/flag/allow | flag |
| Citation required | always/factual/never | factual |

---

## Pattern 6: Chunk-Level Attribution

### Purpose
Attribute each part of agent output to specific source document chunks.

### Attribution Data Model

| Field | Type | Purpose |
|-------|------|---------|
| `output_span` | (start, end) | Which output text |
| `chunk_id` | string | Source chunk identifier |
| `source_doc` | string | Original document |
| `relevance_score` | float | Match confidence |
| `text_snippet` | string | Relevant excerpt |

### Attribution Formats

| Format | UX | Implementation |
|--------|-----|----------------|
| Inline citations | `[1]` in text | Footnote numbers |
| Hover cards | Show source on hover | Interactive UI |
| Metadata API | Structured response | Programmatic access |
| Side panel | Sources alongside | Split view |

### Multi-Tenant Considerations

- Attribution sources are tenant-scoped
- Never expose cross-tenant source documents
- Attribution metadata respects tenant permissions
- Audit attribution access

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Kill switch granularity? | Start with per-agent, add global | Balance control and safety |
| Canary token visibility? | Hidden by default | UX preservation |
| Grounding level? | Moderate for most, strict for regulated | Match domain risk |
| Attribution format? | Footnote + API | Balance UX and programmatic access |
| Invisible failure sampling? | 5% baseline, increase on issues | Cost vs coverage |

---

## Related Patterns

Load from pattern registry:
- **Safety patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `kill-switch-*`, `agent-refusal-*`, `canary-*`, `invisible-*`, `grounding-*`, `chunk-*`

### Web Research

- Search: "AI agent kill switch patterns {date}"
- Search: "LLM output grounding verification {date}"
- Search: "canary tokens data leakage detection {date}"
- Search: "invisible failure detection AI {date}"

## Related Workflows

- `bmad-bam-agent-safety-hardening` - Implement all safety patterns
- `bmad-bam-agent-safety` - Validate safety controls (existing)
```

---

## Agent Guide 2: Production Observability Patterns

**File:** `src/data/agent-guides/bam/production-observability-patterns.md`

```markdown
# Production Observability Patterns

**When to load:** When implementing monitoring dashboards, anomaly detection, health checks, or when user mentions observability, monitoring, drift detection, or quota management.

**Integrates with:** DevOps agent, Architect (Nova persona), Security agent

---

## Overview

This guide covers 5 production observability patterns for monitoring AI agent systems in multi-tenant environments.

| Pattern | Purpose | Quality Gate |
|---------|---------|--------------|
| LLM Provider Health Dashboard | Real-time provider monitoring | QG-P1 |
| Tenant Usage Anomaly Detection | Detect unusual usage patterns | QG-I2 |
| MCP Server Health Monitoring | Tool server availability | QG-P1 |
| Output Drift Monitor | Track output quality over time | QG-I3 |
| Provider Quota Management | API quota tracking and allocation | QG-P1 |

---

## Pattern 1: LLM Provider Health Dashboard

### Purpose
Real-time visibility into LLM provider status, latency, and availability.

### Key Metrics

| Metric | Unit | Collection | Alert Threshold |
|--------|------|------------|-----------------|
| Availability | % | Per-minute | <99.5% |
| P50 latency | ms | Per-request | >1000ms |
| P95 latency | ms | Per-request | >3000ms |
| P99 latency | ms | Per-request | >5000ms |
| Error rate | % | Per-minute | >1% |
| Token throughput | tokens/s | Per-minute | <50% expected |

### Dashboard Panels

| Panel | Content | Refresh | Audience |
|-------|---------|---------|----------|
| Status Overview | Provider up/down/degraded | 10s | Ops |
| Latency Trends | P50/P95/P99 over time | 1m | Ops/Dev |
| Error Breakdown | By error type and provider | 1m | Dev |
| Cost Tracking | $/hour by provider/tenant | 1h | Finance |
| Capacity Planning | Usage vs limits | 1h | Ops |

### Per-Provider Configuration

| Provider | Health Endpoint | Timeout | Retry |
|----------|-----------------|---------|-------|
| OpenAI | Status page API | 5s | 2 |
| Anthropic | Status page API | 5s | 2 |
| Azure OpenAI | Azure health API | 5s | 2 |
| Self-hosted | Custom healthcheck | 2s | 3 |

### Multi-Tenant Views

| View | Scope | Access |
|------|-------|--------|
| Platform | All providers, all tenants | Platform admin |
| Tenant | Tenant's usage only | Tenant admin |
| Cost center | By billing entity | Finance |

---

## Pattern 2: Tenant Usage Anomaly Detection

### Purpose
Detect unusual tenant usage patterns that may indicate abuse, compromise, or issues.

### Anomaly Signals

| Signal | Normal Baseline | Anomaly Indicator | Severity |
|--------|-----------------|-------------------|----------|
| Requests/hour | Tenant's 7-day avg | >3σ deviation | Warning |
| Token usage | Stable ratio | 10x spike | Critical |
| Error rate | <5% | >20% | Warning |
| New tool usage | Gradual adoption | Sudden burst | Info |
| Off-hours activity | Minimal | Significant | Warning |
| Geographic shift | Consistent | New region | Critical |

### Detection Methods

| Method | Implementation | Best For |
|--------|----------------|----------|
| Statistical (Z-score) | Compare to historical mean/std | Simple patterns |
| IQR-based | Interquartile range outliers | Robust to extremes |
| Isolation Forest | ML anomaly detection | Complex patterns |
| Rule-based | Explicit threshold rules | Known bad patterns |

### Response Actions

| Severity | Auto-Response | Notification |
|----------|---------------|--------------|
| Info | Log only | None |
| Warning | Log + flag | Tenant admin |
| Critical | Rate limit + flag | Tenant + platform admin |
| Emergency | Block + preserve | Security team |

### Per-Tier Sensitivity

| Tier | Baseline Window | Alert Sensitivity | Auto-Response |
|------|-----------------|-------------------|---------------|
| Free | 24 hours | High (catch abuse) | Aggressive |
| Pro | 7 days | Medium | Moderate |
| Enterprise | 30 days | Low (reduce noise) | Conservative |

---

## Pattern 3: MCP Server Health Monitoring

### Purpose
Monitor MCP (Model Context Protocol) server availability and performance.

### Health Check Types

| Check Type | Method | Frequency | Timeout |
|------------|--------|-----------|---------|
| Heartbeat | Ping /health endpoint | 10s | 2s |
| Synthetic | Execute test tool call | 1m | 10s |
| Traffic-based | Analyze real request success | Continuous | N/A |
| Deep health | Validate all tools available | 5m | 30s |

### Key Metrics

| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| Availability | 99.9% | <99.5% |
| Response time | <100ms | >500ms |
| Error rate | <0.1% | >1% |
| Tool count | Expected count | Mismatch |
| Connection pool | <80% utilized | >90% |

### Per-Server Configuration

| Server Type | Health Check | Failover | Priority |
|-------------|--------------|----------|----------|
| Primary tools | Heartbeat + synthetic | Auto | Critical |
| Secondary tools | Heartbeat | Manual | High |
| Optional tools | Traffic-based | None | Low |

### Failover Behavior

| Condition | Action | Recovery |
|-----------|--------|----------|
| Health check fail x3 | Mark unhealthy, route away | Auto-recover on success |
| All servers unhealthy | Queue requests, alert | Manual intervention |
| Partial degradation | Route to healthy, warn | Auto-balance on recovery |

---

## Pattern 4: Output Drift Monitor

### Purpose
Detect when agent outputs change quality or characteristics over time.

### Drift Types

| Type | Cause | Detection |
|------|-------|-----------|
| Statistical | Output distribution shifts | KS test, PSI |
| Semantic | Meaning/topic changes | Embedding distance |
| Quality | Accuracy degradation | Eval score drop |
| Format | Structure changes | Schema validation |

### Monitoring Metrics

| Metric | Baseline | Drift Threshold | Action |
|--------|----------|-----------------|--------|
| Output length | 7-day rolling avg | ±30% | Investigate |
| Sentiment score | Historical avg | ±0.3 | Alert |
| Topic distribution | Expected mix | KL divergence >0.2 | Alert |
| Embedding centroid | Historical | Cosine distance >0.15 | Investigate |
| Eval score | Established baseline | >5% drop | Critical alert |

### Correlation Analysis

| Drift Detected | Check Correlation With |
|----------------|------------------------|
| Any drift | Model version changes |
| Any drift | Prompt template changes |
| Quality drift | Input distribution changes |
| Format drift | Schema version changes |

### Response Protocol

| Drift Severity | Response | Escalation |
|----------------|----------|------------|
| Minor (<10%) | Log, continue monitoring | None |
| Moderate (10-20%) | Alert, investigate | Dev team |
| Severe (>20%) | Alert, consider rollback | On-call |
| Critical | Auto-rollback if enabled | Incident |

---

## Pattern 5: Provider Quota Management

### Purpose
Track and manage LLM provider API quotas across tenants.

### Quota Dimensions

| Dimension | Tracking | Typical Limits |
|-----------|----------|----------------|
| Requests/minute | Real-time counter | 3500 RPM |
| Tokens/minute | Token accumulator | 90000 TPM |
| Tokens/day | Daily rollup | 1M TPD |
| Concurrent requests | Active count | 100 |

### Allocation Strategies

| Strategy | Implementation | Use Case |
|----------|----------------|----------|
| Fair share | Equal per tenant | Simple, small tenants |
| Proportional | Based on tier/payment | Tier differentiation |
| Reservation | Pre-allocated buckets | Predictable workloads |
| Dynamic | Adjust based on demand | Burst handling |

### Per-Tier Allocation

| Tier | % of Quota | Burst Allowance | Priority |
|------|------------|-----------------|----------|
| Free | 10% shared | None | Low |
| Pro | 30% reserved | 1.5x for 1m | Medium |
| Enterprise | 60% reserved | 2x for 5m | High |

### Overflow Handling

| Situation | Action | User Experience |
|-----------|--------|-----------------|
| Tenant quota exhausted | Queue or reject | "Limit reached" |
| Provider quota near limit | Prioritize by tier | Graceful degradation |
| Provider quota exhausted | Route to backup provider | Seamless (if backup available) |

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Dashboard refresh rate? | 10s status, 1m metrics | Balance load and freshness |
| Anomaly sensitivity? | Start conservative, tune | Reduce false positives |
| MCP health check depth? | Synthetic for critical | Validate real functionality |
| Drift baseline window? | 7 days | Balance stability and adaptation |
| Quota reservation? | Yes for Pro+ | Guarantee capacity |

---

## Related Patterns

Load from pattern registry:
- **Observability patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `llm-provider-*`, `tenant-anomaly-*`, `mcp-*`, `output-drift-*`, `provider-quota-*`

### Web Research

- Search: "LLM provider monitoring dashboard {date}"
- Search: "tenant usage anomaly detection {date}"
- Search: "MCP server health monitoring {date}"
- Search: "LLM output drift detection {date}"

## Related Workflows

- `bmad-bam-observability-setup` - Implement all observability patterns
- `bmad-bam-tenant-aware-observability` - Tenant-scoped monitoring (existing)
```

---

## Agent Guide 3: Production Reliability Patterns

**File:** `src/data/agent-guides/bam/production-reliability-patterns.md`

```markdown
# Production Reliability Patterns

**When to load:** When implementing circuit breakers, retry logic, fallbacks, timeouts, or when user mentions reliability, resilience, fault tolerance, or idempotency.

**Integrates with:** Architect (Nova persona), Dev agent, DevOps agent

---

## Overview

This guide covers 6 production reliability patterns for building fault-tolerant AI agent systems.

| Pattern | Purpose | Quality Gate |
|---------|---------|--------------|
| Fan-Out Circuit Breaker | Protect parallel operations | QG-I3 |
| Tool Timeout Management | Manage execution timeouts | QG-M3 |
| Tool Fallback Chains | Define backup tools | QG-M3 |
| Retry Budget Engine | Manage retry limits | QG-M3 |
| Tool Idempotency Guarantees | Safe retries | QG-M3 |
| Tool Budget Guards | Enforce execution limits | QG-M3 |

---

## Pattern 1: Fan-Out Circuit Breaker

### Purpose
Protect system from cascading failures during parallel (fan-out) operations.

### Circuit Breaker States

| State | Behavior | Transition |
|-------|----------|------------|
| Closed | Normal operation, track failures | N failures in window → Open |
| Open | Fast-fail all requests | Timeout expires → Half-Open |
| Half-Open | Allow probe requests | Success → Closed, Fail → Open |

### Fan-Out Specific Configuration

| Operation Type | Failure Threshold | Open Duration | Partial Success |
|----------------|-------------------|---------------|-----------------|
| Multi-model query | 50% of targets fail | 30s | Yes, return partial |
| Batch notifications | 10% fail | 60s | Yes, retry failed |
| Consensus voting | 34% fail | 10s | No, need quorum |
| Data aggregation | 20% fail | 30s | Yes, with warnings |

### Per-Target Tracking

| Metric | Per-Target | Aggregate |
|--------|------------|-----------|
| Failure count | Yes | Sum |
| Success rate | Yes | Weighted avg |
| Latency | Yes | P95 |
| Circuit state | Yes | Worst state |

### Implementation Requirements

- Track failures per-target, not just aggregate
- Allow partial success when appropriate
- Implement bulkhead isolation per fan-out operation
- Alert when any target circuit opens

---

## Pattern 2: Tool Timeout Management

### Purpose
Manage tool execution timeouts to prevent hung operations.

### Timeout Configuration

| Tool Type | Default Timeout | Max Timeout | Retry on Timeout |
|-----------|-----------------|-------------|------------------|
| Database query | 5s | 30s | Yes, 1 retry |
| External API | 10s | 60s | Yes, 2 retries |
| LLM call | 30s | 120s | Yes, 1 retry |
| File operation | 5s | 30s | No |
| MCP tool | 15s | 60s | Yes, 1 retry |

### Timeout Strategies

| Strategy | Implementation | Use Case |
|----------|----------------|----------|
| Fixed | Same timeout always | Simple, predictable tools |
| Per-tool | Tool-specific timeouts | Mixed tool types |
| Adaptive | Adjust based on P95 history | Production optimization |
| Deadline-based | Remaining request time budget | Request-scoped |

### Timeout Hierarchy

```
Request deadline: 60s
    │
    ├── Agent execution: 50s (reserve 10s for response)
    │   │
    │   ├── Tool 1: 15s max
    │   ├── Tool 2: 15s max
    │   └── Tool 3: 15s max (may be cut short if deadline approaching)
    │
    └── Response formatting: 10s reserved
```

### Timeout Handling

| Timeout Type | Action | User Feedback |
|--------------|--------|---------------|
| Tool timeout | Cancel, retry or fallback | "Taking longer than expected" |
| Agent timeout | Checkpoint, return partial | "Partial results available" |
| Request timeout | Return best effort | "Request timed out" |

---

## Pattern 3: Tool Fallback Chains

### Purpose
Define fallback tools when primary tools fail.

### Fallback Chain Structure

| Level | Action | Degradation |
|-------|--------|-------------|
| Primary | Use preferred tool | None |
| Fallback 1 | First alternative | Minor |
| Fallback 2 | Second alternative | Moderate |
| Graceful failure | Return cached/default | Maximum |

### Example Chains

| Primary Tool | Fallback 1 | Fallback 2 | Final Fallback |
|--------------|------------|------------|----------------|
| Google Search | Bing Search | DuckDuckGo | Cached results |
| OpenAI GPT-4 | Anthropic Claude | GPT-3.5-turbo | Error message |
| Live database | Read replica | Cache | Stale data warning |
| Real-time API | Cached response | Default value | "Data unavailable" |

### Selection Criteria

| Criterion | Consideration |
|-----------|---------------|
| Capability match | Can fallback do the same thing? |
| Quality tradeoff | How much quality loss? |
| Cost impact | Is fallback more/less expensive? |
| Latency impact | Is fallback faster/slower? |
| Tenant eligibility | Is fallback available for this tier? |

### Chain Configuration

| Setting | Options | Default |
|---------|---------|---------|
| Max chain depth | 1-3 | 2 |
| Selection mode | sequential/health-based | sequential |
| Quality threshold | 0-1 | 0.8 |
| Per-tenant chains | yes/no | yes for enterprise |

---

## Pattern 4: Retry Budget Engine

### Purpose
Manage retry budgets to prevent retry storms and ensure fair resource allocation.

### Budget Scopes

| Scope | Budget | Reset |
|-------|--------|-------|
| Per-operation | 3 retries | Per call |
| Per-request | 10 total retries | Per user request |
| Per-tenant | 100/minute | Per minute |
| System-wide | 10000/minute | Per minute |

### Backoff Strategies

| Strategy | Sequence | Use Case |
|----------|----------|----------|
| Fixed | 1s, 1s, 1s | Simple, fast ops |
| Exponential | 1s, 2s, 4s, 8s | Standard |
| Exponential + jitter | 1s±0.3s, 2s±0.6s... | Prevent thundering herd |
| Linear | 1s, 2s, 3s, 4s | Gradual backoff |

### Retry Prioritization

| Priority | Retry Budget Share | Use Case |
|----------|-------------------|----------|
| Critical | 50% | User-facing, real-time |
| High | 30% | Important background |
| Normal | 15% | Standard operations |
| Low | 5% | Best-effort |

### Budget Exhaustion Handling

| Budget Level | Action |
|--------------|--------|
| 80% consumed | Log warning |
| 100% consumed | Stop retrying, fail fast |
| Sustained exhaustion | Alert, investigate |

---

## Pattern 5: Tool Idempotency Guarantees

### Purpose
Ensure tool executions are safe to retry without duplicate effects.

### Tool Classification

| Tool Type | Natural Idempotency | Strategy Needed |
|-----------|---------------------|-----------------|
| Read/GET | Yes | None |
| Create/POST | No | Idempotency key |
| Update/PUT | Usually | Version check |
| Delete | Yes | None |
| External API | Varies | Provider-specific |

### Idempotency Key Generation

| Method | Implementation | Uniqueness |
|--------|----------------|------------|
| Request hash | Hash of request body | Content-based |
| Client-generated | UUID from caller | Caller-controlled |
| Deterministic | Hash of (tenant, action, params) | Reproducible |

### Deduplication Storage

| Storage | TTL | Lookup Speed | Durability |
|---------|-----|--------------|------------|
| In-memory | 1 hour | <1ms | None (lost on restart) |
| Redis | 24 hours | <5ms | Configurable |
| PostgreSQL | 7 days | <20ms | High |

### Implementation Pattern

```
Tool Execution with Idempotency:
    │
    ├── Generate idempotency key from request
    │
    ├── Check: key exists in dedup store?
    │   ├── Yes → Return cached result
    │   └── No → Continue
    │
    ├── Execute tool
    │
    ├── Store (key → result) with TTL
    │
    └── Return result
```

---

## Pattern 6: Tool Budget Guards

### Purpose
Enforce execution budgets to prevent runaway tool usage.

### Budget Dimensions

| Dimension | Unit | Tracking | Per-Tier Limits |
|-----------|------|----------|-----------------|
| Invocation count | calls | Counter | Free: 10, Pro: 100, Ent: 1000 |
| Execution time | seconds | Accumulator | Free: 5s, Pro: 30s, Ent: 300s |
| Token usage | tokens | Counter | Free: 1K, Pro: 10K, Ent: 100K |
| Cost | dollars | Accumulator | Free: $0.01, Pro: $0.10, Ent: $1.00 |

### Budget Enforcement

| Threshold | Action | User Feedback |
|-----------|--------|---------------|
| 80% | Warn, continue | "Approaching limit" |
| 100% | Block new tools | "Limit reached" |
| Per-tool override | Allow critical tools | Tool-specific |

### Budget Scope

| Scope | Reset | Use Case |
|-------|-------|----------|
| Per-request | End of request | Request isolation |
| Per-session | Session end | Conversation context |
| Per-day | Midnight UTC | Daily limits |
| Per-billing-period | Month end | Subscription limits |

### Critical Tool Exemptions

| Tool Category | Budget Exempt | Rationale |
|---------------|---------------|-----------|
| Safety checks | Yes | Never skip safety |
| Authentication | Yes | Required for operation |
| Audit logging | Yes | Compliance requirement |
| Error handling | Yes | Graceful failure |

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Circuit breaker threshold? | 50% for fan-out | Allow partial success |
| Default timeout? | 15s for most tools | Balance responsiveness and completion |
| Fallback chain depth? | 2 levels | Diminishing returns after |
| Retry budget scope? | Per-request | Clear boundary |
| Idempotency TTL? | 24 hours | Balance storage and coverage |
| Budget enforcement? | Warn at 80%, block at 100% | User awareness |

---

## Related Patterns

Load from pattern registry:
- **Reliability patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `fanout-*`, `tool-timeout-*`, `tool-fallback-*`, `retry-*`, `tool-idempotency-*`, `tool-budget-*`

### Web Research

- Search: "fan-out circuit breaker patterns {date}"
- Search: "tool timeout management distributed systems {date}"
- Search: "idempotency patterns AI agents {date}"
- Search: "retry budget management {date}"

## Related Workflows

- `bmad-bam-reliability-design` - Implement all reliability patterns
- `bmad-bam-agent-resilience-design` - Agent-level resilience (existing)
```

---

## Agent Guide 4: Production Governance Patterns

**File:** `src/data/agent-guides/bam/production-governance-patterns.md`

```markdown
# Production Governance Patterns

**When to load:** When implementing tenant limits, resource allocation, memory policies, or when user mentions governance, quotas, budgets, or lifecycle management.

**Integrates with:** Architect (Atlas persona), PM agent, Security agent

---

## Overview

This guide covers 5 production governance patterns for managing multi-tenant AI agent resources.

| Pattern | Purpose | Quality Gate |
|---------|---------|--------------|
| Tenant Burst Protection | Rate limiting for burst traffic | QG-I2 |
| Per-Tenant Context Window Budget | Context token limits | QG-M3 |
| Per-Tenant Agent Instance Limits | Concurrency limits | QG-I2 |
| Memory Lifecycle Governance | Memory retention policies | QG-M3 |
| Model Feature Flags | Gradual model rollout | QG-M3 |

---

## Pattern 1: Tenant Burst Protection

### Purpose
Protect system from tenant request bursts using rate limiting.

### Rate Limiting Algorithms

| Algorithm | Behavior | Use Case |
|-----------|----------|----------|
| Token bucket | Allows bursts up to bucket size | General use |
| Sliding window | Smooth distribution | Strict limits |
| Leaky bucket | Steady outflow rate | Smoothing |
| Adaptive | Adjusts to system load | High availability |

### Per-Tier Configuration

| Tier | Requests/min | Burst Allowance | Overflow Handling |
|------|--------------|-----------------|-------------------|
| Free | 60 | 1.5x (90) for 10s | Queue (5s timeout) |
| Pro | 600 | 2x (1200) for 30s | Queue (30s timeout) |
| Enterprise | 6000 | 3x (18000) for 60s | Priority queue |

### Burst Detection

| Signal | Detection | Response |
|--------|-----------|----------|
| Sudden spike | >5x normal in 1s | Activate burst protection |
| Sustained high | >2x normal for 1m | Warn, consider upgrade |
| Repeated bursts | >3 bursts per hour | Review tenant behavior |

### Multi-Tenant Isolation

| Isolation Type | Implementation | Use Case |
|----------------|----------------|----------|
| Per-tenant bucket | Separate rate limiters | Fair sharing |
| Per-tier pool | Shared within tier | Resource pooling |
| Global backstop | System-wide limit | Protection |

---

## Pattern 2: Per-Tenant Context Window Budget

### Purpose
Enforce context window token limits per tenant.

### Budget Configuration

| Tier | Context Budget | Overflow Strategy |
|------|----------------|-------------------|
| Free | 8K tokens | Hard reject |
| Pro | 32K tokens | Warn + compress |
| Enterprise | 128K tokens | Adaptive |

### Context Management Strategies

| Strategy | Implementation | Quality Impact |
|----------|----------------|----------------|
| Hard limit | Reject if over budget | None (blocked) |
| Truncation | Remove oldest context | Medium |
| Summarization | LLM-compress context | Low |
| Prioritization | Keep high-value context | Minimal |

### Budget Tracking

| Metric | Tracking | Alert |
|--------|----------|-------|
| Context usage | Per-request | >80% budget |
| Average usage | Rolling 1h | Trend up |
| Peak usage | Daily max | >90% budget |

### Overflow Handling Flow

```
Request with context
    │
    ├── Calculate context tokens
    │
    ├── Compare to budget
    │   ├── Under budget → Proceed
    │   ├── Over budget (soft limit):
    │   │   ├── Attempt compression
    │   │   └── Proceed with warning
    │   └── Over budget (hard limit):
    │       └── Reject with error
    │
    └── Log usage for billing/analytics
```

---

## Pattern 3: Per-Tenant Agent Instance Limits

### Purpose
Limit concurrent agent instances per tenant to ensure fair resource sharing.

### Limit Configuration

| Tier | Concurrent Agents | Burst | Queue Depth |
|------|-------------------|-------|-------------|
| Free | 2 | None | 5 |
| Pro | 10 | 2x for 1m | 50 |
| Enterprise | 100 | Elastic | Unlimited |

### Limit Enforcement

| Limit Type | Behavior | Recovery |
|------------|----------|----------|
| Hard limit | Queue new requests | Auto-dequeue on completion |
| Soft limit | Allow with warning | Log, alert at threshold |
| Elastic | Scale up to max | Auto-scale down |

### Queue Management

| Queue Type | Ordering | Timeout |
|------------|----------|---------|
| FIFO | First-in-first-out | 60s default |
| Priority | By request priority | Priority-based |
| Fair | Round-robin by tenant | 60s per tenant |

### Resource Isolation

| Resource | Per-Tenant Limit | Monitoring |
|----------|------------------|------------|
| CPU | Proportional to tier | Utilization % |
| Memory | Fixed per tier | Usage tracking |
| Connections | Pool per tenant | Connection count |

---

## Pattern 4: Memory Lifecycle Governance

### Purpose
Govern agent memory creation, retention, and deletion.

### Memory Classification

| Type | Description | Default Retention |
|------|-------------|-------------------|
| Working | Current session context | Session end |
| Episodic | Conversation history | 30 days |
| Semantic | Learned knowledge | Indefinite |
| Procedural | Task patterns | 90 days |
| Audit | Compliance records | 7 years |

### Retention Policies

| Policy | Implementation | Override |
|--------|----------------|----------|
| TTL-based | Auto-expire after duration | Tenant can extend |
| Usage-based | Expire if unused for N days | Tenant can disable |
| Capacity-based | LRU eviction at limit | Tier-based limits |
| Compliance | Minimum retention required | Cannot shorten |

### Lifecycle Events

| Event | Trigger | Actions |
|-------|---------|---------|
| Creation | Memory stored | Classify, set TTL, log |
| Access | Memory retrieved | Update last-access, log |
| Update | Memory modified | Version, log |
| Expiration | TTL reached | Archive or delete, log |
| Deletion | Explicit or expired | Purge, audit log |

### Per-Tenant Configuration

| Setting | Options | Default |
|---------|---------|---------|
| Retention override | Extend/shorten | Tier default |
| Auto-archive | Enable/disable | Enabled |
| Export on delete | Yes/no | Yes |
| Audit level | Minimal/full | Full for enterprise |

### Compliance Considerations

| Requirement | Implementation |
|-------------|----------------|
| GDPR right to deletion | Immediate delete on request |
| Data retention laws | Minimum retention periods |
| Audit requirements | Immutable audit logs |
| Cross-border | Data residency controls |

---

## Pattern 5: Model Feature Flags

### Purpose
Control model and prompt rollout with feature flags.

### Flag Types

| Type | Implementation | Use Case |
|------|----------------|----------|
| Boolean | On/off | Simple feature toggle |
| Percentage | 0-100% rollout | Gradual rollout |
| Tenant-targeted | List of tenant IDs | Beta testing |
| Tier-based | By subscription tier | Tier differentiation |

### Flag Lifecycle

| Phase | Flag State | Duration | Metrics |
|-------|------------|----------|---------|
| Experiment | 5% rollout | 1-2 weeks | Quality, latency |
| Validation | 25% rollout | 1 week | Error rate, cost |
| Rollout | 50-100% | 1-2 weeks | All metrics |
| GA | Remove flag | N/A | Cleanup |

### Flag Configuration

| Flag | Type | Default | Description |
|------|------|---------|-------------|
| `model_gpt4o_v2` | percentage | 0 | GPT-4o v2 rollout |
| `prompt_v3_enabled` | boolean | false | New prompt template |
| `streaming_beta` | tenant_list | [] | Streaming responses |
| `advanced_reasoning` | tier | enterprise | Premium feature |

### Rollout Safety

| Check | Before Rollout | During Rollout |
|-------|----------------|----------------|
| Quality | Baseline established | Compare to baseline |
| Latency | P95 baseline | <20% increase |
| Error rate | Baseline | <1% increase |
| Cost | Budget approved | Within budget |

### Rollback Triggers

| Trigger | Auto-Rollback | Manual Review |
|---------|---------------|---------------|
| Error rate >5% | Yes | Notify |
| Latency >2x | Yes | Notify |
| Quality drop >10% | No | Required |
| Cost >1.5x budget | No | Required |

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Burst protection algorithm? | Token bucket | Allows legitimate bursts |
| Context overflow handling? | Summarization for Pro+ | Preserve quality |
| Agent limit enforcement? | Queue with timeout | Better UX than reject |
| Memory retention default? | 30 days | Balance utility and cost |
| Feature flag rollout speed? | 5% → 25% → 100% | Safe gradual rollout |

---

## Related Patterns

Load from pattern registry:
- **Governance patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `tenant-burst-*`, `tenant-context-*`, `tenant-agent-*`, `memory-lifecycle-*`, `model-feature-*`

### Web Research

- Search: "tenant burst protection multi-tenant {date}"
- Search: "context window budget management {date}"
- Search: "AI memory lifecycle governance {date}"
- Search: "model feature flags LLM {date}"

## Related Workflows

- `bmad-bam-tenant-governance` - Implement all governance patterns
- `bmad-bam-tenant-model-isolation` - Tenant isolation (existing)
```

---

## Agent Guide 5: Production State Patterns

**File:** `src/data/agent-guides/bam/production-state-patterns.md`

```markdown
# Production State Patterns

**When to load:** When implementing state persistence, checkpointing, workflow interrupts, or when user mentions state management, LangGraph persistence, or human-in-the-loop.

**Integrates with:** Dev agent, Architect (Nova persona)

---

## Overview

This guide covers 4 production state patterns for managing AI agent state in multi-tenant environments.

| Pattern | Purpose | Quality Gate |
|---------|---------|--------------|
| LangGraph Checkpoint Persistence | Persist workflow state | QG-M3 |
| State Serialization Multi-Tenant | Tenant-isolated state storage | QG-M3 |
| Interrupt/Resume Patterns | Human-in-the-loop support | QG-M3 |
| Conditional Edge Patterns | LangGraph branching logic | QG-M3 |

---

## Pattern 1: LangGraph Checkpoint Persistence

### Purpose
Persist LangGraph workflow checkpoints with multi-tenant isolation.

### Storage Backends

| Backend | Use Case | Multi-Tenant | Durability |
|---------|----------|--------------|------------|
| MemorySaver | Development, testing | No isolation | None |
| RedisSaver | Session-based, fast | Key prefix | Configurable |
| PostgresSaver | Production, durable | RLS isolation | High |
| SQLiteSaver | Single-tenant, simple | File per tenant | Medium |

### Checkpoint Schema

| Field | Type | Purpose |
|-------|------|---------|
| thread_id | UUID | Workflow instance identifier |
| checkpoint_id | UUID | Checkpoint version |
| tenant_id | UUID | Tenant isolation (required) |
| parent_checkpoint_id | UUID | Previous checkpoint |
| state | JSONB | Serialized workflow state |
| metadata | JSONB | Additional context |
| created_at | timestamp | Creation time |

### PostgreSQL with RLS

```sql
-- Table with tenant isolation
CREATE TABLE langgraph_checkpoints (
    thread_id UUID NOT NULL,
    checkpoint_id UUID NOT NULL,
    tenant_id UUID NOT NULL,
    parent_checkpoint_id UUID,
    state JSONB NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (thread_id, checkpoint_id)
);

-- Row-level security
ALTER TABLE langgraph_checkpoints ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation ON langgraph_checkpoints
    USING (tenant_id = current_setting('app.tenant_id')::UUID);

-- Indexes
CREATE INDEX idx_checkpoints_tenant_thread 
    ON langgraph_checkpoints(tenant_id, thread_id);
```

### Retention Configuration

| Tier | Retention | Cleanup |
|------|-----------|---------|
| Free | 24 hours | Aggressive |
| Pro | 7 days | Daily |
| Enterprise | 30 days | Weekly |

---

## Pattern 2: State Serialization Multi-Tenant

### Purpose
Serialize agent state with tenant isolation and security.

### Serialization Formats

| Format | Size | Speed | Schema Evolution |
|--------|------|-------|------------------|
| JSON | Large | Moderate | Flexible |
| MessagePack | Medium | Fast | Flexible |
| Protobuf | Small | Fast | Required schema |
| Pickle | Varies | Fast | Python only, security risk |

### State Structure

| Field | Purpose | Encryption |
|-------|---------|------------|
| tenant_id | Isolation | No (used for lookup) |
| version | Schema version | No |
| state_data | Core state | Yes (sensitive) |
| metadata | Non-sensitive context | No |
| checksum | Integrity verification | No |

### Tenant Isolation Strategies

| Strategy | Implementation | Verification |
|----------|----------------|--------------|
| Key prefix | `{tenant_id}:{state_key}` | Key parsing |
| Encryption | Per-tenant encryption keys | Key management |
| Namespace | Separate storage namespace | Access control |
| RLS | Database row-level security | Policy enforcement |

### Security Requirements

| Requirement | Implementation |
|-------------|----------------|
| Encryption at rest | AES-256 per-tenant keys |
| Tenant validation | Always verify tenant_id on read |
| Schema validation | Validate before deserialize |
| Integrity check | Checksum verification |

---

## Pattern 3: Interrupt/Resume Patterns

### Purpose
Support human-in-the-loop workflows with interrupts and resumption.

### Interrupt Types

| Type | Trigger | Use Case |
|------|---------|----------|
| Approval | Requires human OK | Sensitive actions |
| Information | Needs user input | Missing data |
| Review | Quality checkpoint | High-stakes output |
| Timeout | Time limit reached | Resource protection |
| External | Waiting for external event | Async dependencies |

### Interrupt Flow

```
Workflow Execution
    │
    ├── Reach interrupt point
    │
    ├── Save checkpoint (full state)
    │
    ├── Create interrupt record:
    │   ├── interrupt_id
    │   ├── thread_id
    │   ├── interrupt_type
    │   ├── prompt/question
    │   ├── timeout
    │   └── created_at
    │
    ├── Notify user (webhook, email, UI)
    │
    └── Return "awaiting_input" status

Resume Flow:
    │
    ├── Receive user input
    │
    ├── Validate input
    │
    ├── Load checkpoint
    │
    ├── Inject user input into state
    │
    └── Continue workflow from checkpoint
```

### Interrupt Configuration

| Setting | Options | Default |
|---------|---------|---------|
| Timeout | Duration | 24 hours |
| Notification channels | webhook, email, ui | ui |
| Reminder frequency | Duration | 4 hours |
| Max reminders | Count | 3 |
| Expiry action | cancel, escalate, default | cancel |

### Resume Strategies

| Strategy | Implementation | Use Case |
|----------|----------------|----------|
| Sync resume | Immediate continuation | Real-time UI |
| Async resume | Queue for processing | Background workflows |
| Webhook resume | External system triggers | Integration |
| Scheduled resume | Resume at specific time | Delayed actions |

---

## Pattern 4: Conditional Edge Patterns

### Purpose
Implement branching logic in LangGraph workflows.

### Edge Types

| Type | Implementation | Use Case |
|------|----------------|----------|
| Binary | `if condition: A else: B` | Simple yes/no |
| Multi-way | `switch(category)` | Categorical routing |
| Weighted | Probability-based selection | A/B testing |
| Dynamic | LLM decides next node | Complex reasoning |

### Routing Patterns

| Pattern | Implementation | When to Use |
|---------|----------------|-------------|
| Guard condition | Check state before proceed | Validation gates |
| Intent router | LLM classifies intent | NLU workflows |
| Confidence threshold | Route by confidence score | Quality control |
| Tenant policy | Route by tenant config | Multi-tenant customization |
| Load balancer | Distribute across nodes | Parallel processing |

### Implementation Examples

| Scenario | Edge Logic |
|----------|------------|
| Approval required | `if action.requires_approval: goto approval_node` |
| Quality check | `if confidence < 0.8: goto review_node` |
| Tier routing | `if tenant.tier == 'enterprise': goto premium_node` |
| Error handling | `if error_count > 3: goto fallback_node` |

### Best Practices

| Practice | Rationale |
|----------|-----------|
| Always define default path | Prevent workflow stuck |
| Log routing decisions | Debugging, analytics |
| Test edge cases | Ensure all paths covered |
| Prefer deterministic | LLM routing adds latency/cost |
| Limit branch depth | Maintainability |

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Checkpoint backend? | PostgreSQL for production | Durability + RLS |
| Serialization format? | JSON for flexibility, Protobuf for performance | Match requirements |
| Interrupt timeout? | 24 hours for approvals | Balance urgency and flexibility |
| Edge routing? | Deterministic when possible | Predictability |
| State encryption? | Yes for sensitive data | Security |

---

## Related Patterns

Load from pattern registry:
- **State patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `langgraph-checkpoint-*`, `state-serialization-*`, `interrupt-*`, `conditional-edge-*`

### Web Research

- Search: "LangGraph checkpoint persistence {date}"
- Search: "state serialization multi-tenant {date}"
- Search: "human-in-the-loop AI workflows {date}"
- Search: "LangGraph conditional edges {date}"

## Related Workflows

- `bmad-bam-state-management` - Implement all state patterns
- `bmad-bam-agent-runtime-architecture` - Runtime design (existing)
```

---

## Agent Guide 6: Production Discovery Patterns

**File:** `src/data/agent-guides/bam/production-discovery-patterns.md`

```markdown
# Production Discovery Patterns

**When to load:** When implementing agent capability exposure, model configuration publishing, or when user mentions AGENTS.md, llms.txt, prompt management, or model warm-up.

**Integrates with:** DevOps agent, Architect (Nova persona), Dev agent

---

## Overview

This guide covers 4 production discovery and deployment patterns for AI agent systems.

| Pattern | Purpose | Quality Gate |
|---------|---------|--------------|
| AGENTS.md Publishing | Expose agent capabilities | QG-P1 |
| llms.txt Publishing | Document model constraints | QG-P1 |
| Prompt Rollback Automation | Auto-rollback bad prompts | QG-P1 |
| Model Warm-up Patterns | Reduce cold start latency | QG-P1 |

---

## Pattern 1: AGENTS.md Publishing

### Purpose
Publish agent capabilities in a standard format for AI-to-AI discovery.

### File Format

```markdown
# AGENTS.md

## Agent: customer-support-agent

### Capabilities
- answer_faq: Answer frequently asked questions
- create_ticket: Create support tickets
- check_order_status: Look up order information

### Authentication
- type: bearer_token
- header: Authorization

### Rate Limits
- requests_per_minute: 100
- tokens_per_minute: 50000

### Contact
- escalation: support@example.com
```

### Content Structure

| Section | Purpose | Required |
|---------|---------|----------|
| Agent identifier | Unique name | Yes |
| Capabilities | What agent can do | Yes |
| Authentication | How to authenticate | Yes |
| Rate limits | Usage constraints | Yes |
| Contact | Escalation path | No |
| Versioning | API version | Recommended |

### Publishing Strategies

| Strategy | Implementation | Update Frequency |
|----------|----------------|------------------|
| Static file | Generated at deploy | Per release |
| Dynamic endpoint | Generated on request | Real-time |
| Registry service | Central capability registry | On change |

### Multi-Tenant Considerations

| Approach | Implementation | Use Case |
|----------|----------------|----------|
| Shared AGENTS.md | Same for all tenants | Standard capabilities |
| Tenant-specific | Per-tenant generation | Custom agents |
| Tier-filtered | Show tier-available only | Differentiation |

---

## Pattern 2: llms.txt Publishing

### Purpose
Document LLM-specific constraints and configurations.

### File Format

```yaml
# llms.txt (YAML format)

models:
  - id: gpt-4o
    provider: openai
    context_window: 128000
    max_output: 4096
    status: production
    
  - id: claude-3-opus
    provider: anthropic
    context_window: 200000
    max_output: 4096
    status: production

rate_limits:
  free:
    requests_per_minute: 10
    tokens_per_minute: 10000
  pro:
    requests_per_minute: 100
    tokens_per_minute: 100000

prompt_templates:
  - name: customer_support_v2
    path: /prompts/customer_support_v2.txt
    model_compatibility: [gpt-4o, claude-3-opus]
```

### Content Sections

| Section | Purpose | Update Trigger |
|---------|---------|----------------|
| Models | Available models | Model changes |
| Rate limits | Per-tier constraints | Policy changes |
| Prompt templates | Template references | Template updates |
| Deprecations | Sunset notices | Lifecycle events |

### Per-Tenant Overrides

| Override | Scope | Example |
|----------|-------|---------|
| Model access | Tenant-specific | Enterprise-only models |
| Rate limits | Tier or tenant | Custom limits |
| Prompt templates | Tenant branding | Customized prompts |

---

## Pattern 3: Prompt Rollback Automation

### Purpose
Automatically rollback prompts when quality degrades.

### Rollback Triggers

| Trigger | Metric | Threshold | Action |
|---------|--------|-----------|--------|
| Quality drop | Eval score | <90% of baseline | Rollback |
| Error spike | Error rate | >5% increase | Rollback |
| Latency increase | P95 latency | >2x baseline | Investigate |
| User feedback | Thumbs down | >10% increase | Alert |

### Rollback Strategies

| Strategy | Speed | Risk | Use Case |
|----------|-------|------|----------|
| Immediate | <1 min | May overreact | Critical issues |
| Canary | 5-15 min | Slower detection | Standard |
| Gradual | 30+ min | Slowest | Uncertain issues |

### Prompt Versioning

| Version Type | Format | Use Case |
|--------------|--------|----------|
| Semantic | v1.2.3 | Major/minor/patch |
| Timestamp | 2026-04-24-001 | Date-based |
| Git-based | commit hash | Source-controlled |

### Rollback Flow

```
Quality Metrics Monitoring
    │
    ├── Metric drops below threshold
    │
    ├── Confirm: sustained (not transient)?
    │   ├── No → Continue monitoring
    │   └── Yes → Proceed
    │
    ├── Identify: rollback target
    │   ├── Previous version (N-1)
    │   └── Known-good tag
    │
    ├── Execute rollback
    │   ├── Update prompt registry
    │   ├── Invalidate caches
    │   └── Log rollback event
    │
    ├── Verify: metrics recovering?
    │   ├── Yes → Complete
    │   └── No → Escalate, try N-2
    │
    └── Alert team for investigation
```

### Configuration

| Setting | Options | Default |
|---------|---------|---------|
| Auto-rollback | enabled/disabled | disabled |
| Threshold sensitivity | low/medium/high | medium |
| Rollback target | previous/known-good | known-good |
| Cooldown period | Duration | 1 hour |

---

## Pattern 4: Model Warm-up Patterns

### Purpose
Pre-warm models to reduce first-request latency.

### Warm-up Strategies

| Strategy | Trigger | Pros | Cons |
|----------|---------|------|------|
| Scheduled | Cron/interval | Predictable | May waste resources |
| Traffic-predicted | ML prediction | Efficient | Prediction may fail |
| Keep-alive | Continuous pings | Always warm | Higher cost |
| On-demand | First request | No waste | Cold start on first |

### Warm-up Configuration

| Tier | Strategy | Frequency | Cost Impact |
|------|----------|-----------|-------------|
| Free | On-demand | N/A | None |
| Pro | Scheduled | Every 5 min | Low |
| Enterprise | Keep-alive | Continuous | Medium |

### Warm-up Request Design

| Characteristic | Requirement | Rationale |
|----------------|-------------|-----------|
| Minimal tokens | <10 input, <10 output | Low cost |
| No side effects | Read-only | Safety |
| Representative | Similar to real requests | Effective warm-up |
| Identifiable | Tagged as warm-up | Exclude from metrics |

### Provider-Specific Considerations

| Provider | Keep-alive Duration | Warm-up Approach |
|----------|---------------------|------------------|
| OpenAI | ~60s | Every 30-45s |
| Anthropic | ~60s | Every 30-45s |
| Azure OpenAI | ~300s | Every 4 min |
| Self-hosted | Model-dependent | Custom |

### Multi-Model Warm-up

| Priority | Models | Warm-up Order |
|----------|--------|---------------|
| Critical | Primary production | First, always |
| High | Fallback models | After primary |
| Medium | Secondary features | Best effort |
| Low | Experimental | Skip warm-up |

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| AGENTS.md format? | Markdown with YAML frontmatter | Human and machine readable |
| llms.txt updates? | On deploy + manual trigger | Balance freshness and stability |
| Auto-rollback? | Disabled initially | Gain confidence first |
| Warm-up strategy? | Scheduled for Pro+ | Cost-effective |
| Warm-up frequency? | 30-45s for cloud providers | Match keep-alive |

---

## Related Patterns

Load from pattern registry:
- **Discovery patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `agents-md-*`, `llms-txt-*`, `prompt-rollback-*`, `model-warmup-*`

### Web Research

- Search: "AGENTS.md specification AI {date}"
- Search: "llms.txt LLM configuration {date}"
- Search: "prompt versioning rollback {date}"
- Search: "model warm-up cold start LLM {date}"

## Related Workflows

- `bmad-bam-ai-discovery-setup` - Implement all discovery patterns
- `bmad-bam-llmops` - LLM operations (existing)
```

---

## Consolidated Workflow Specifications

### Workflow 1: Agent Safety Hardening

**Directory:** `src/workflows/bmad-bam-agent-safety-hardening/`

**Patterns Covered:** Kill Switch Registry, Agent Refusal Headers, Canary Token Inserter, Invisible Failure Detector, Grounding Verifier, Chunk-Level Attribution

**Structure:**
```
bmad-bam-agent-safety-hardening/
├── bmad-skill-manifest.yaml
├── SKILL.md
├── workflow.md
└── steps/
    ├── step-01-c-design-kill-switch.md
    ├── step-02-c-implement-refusal-headers.md
    ├── step-03-c-setup-canary-tokens.md
    ├── step-04-c-configure-invisible-failure.md
    ├── step-05-c-implement-grounding.md
    ├── step-06-c-setup-attribution.md
    ├── step-07-c-integration-test.md
    ├── step-10-e-load-existing.md
    ├── step-11-e-update-patterns.md
    ├── step-20-v-validate-safety.md
    ├── step-21-v-test-kill-switch.md
    └── step-22-v-generate-report.md
```

### Workflow 2: Observability Setup

**Directory:** `src/workflows/bmad-bam-observability-setup/`

**Patterns Covered:** LLM Provider Health Dashboard, Tenant Usage Anomaly Detection, MCP Server Health Monitoring, Output Drift Monitor, Provider Quota Management

**Structure:**
```
bmad-bam-observability-setup/
├── bmad-skill-manifest.yaml
├── SKILL.md
├── workflow.md
└── steps/
    ├── step-01-c-design-provider-dashboard.md
    ├── step-02-c-setup-anomaly-detection.md
    ├── step-03-c-configure-mcp-monitoring.md
    ├── step-04-c-implement-drift-monitor.md
    ├── step-05-c-setup-quota-management.md
    ├── step-06-c-create-alerts.md
    ├── step-10-e-load-existing.md
    ├── step-11-e-update-dashboards.md
    ├── step-20-v-validate-metrics.md
    └── step-21-v-generate-report.md
```

### Workflow 3: Reliability Design

**Directory:** `src/workflows/bmad-bam-reliability-design/`

**Patterns Covered:** Fan-Out Circuit Breaker, Tool Timeout Management, Tool Fallback Chains, Retry Budget Engine, Tool Idempotency Guarantees, Tool Budget Guards

**Structure:**
```
bmad-bam-reliability-design/
├── bmad-skill-manifest.yaml
├── SKILL.md
├── workflow.md
└── steps/
    ├── step-01-c-design-circuit-breakers.md
    ├── step-02-c-configure-timeouts.md
    ├── step-03-c-define-fallback-chains.md
    ├── step-04-c-setup-retry-budgets.md
    ├── step-05-c-implement-idempotency.md
    ├── step-06-c-configure-tool-budgets.md
    ├── step-07-c-integration-test.md
    ├── step-10-e-load-existing.md
    ├── step-11-e-update-reliability.md
    ├── step-20-v-validate-resilience.md
    └── step-21-v-generate-report.md
```

### Workflow 4: Tenant Governance

**Directory:** `src/workflows/bmad-bam-tenant-governance/`

**Patterns Covered:** Tenant Burst Protection, Per-Tenant Context Window Budget, Per-Tenant Agent Instance Limits, Memory Lifecycle Governance, Model Feature Flags

**Structure:**
```
bmad-bam-tenant-governance/
├── bmad-skill-manifest.yaml
├── SKILL.md
├── workflow.md
└── steps/
    ├── step-01-c-design-burst-protection.md
    ├── step-02-c-configure-context-budgets.md
    ├── step-03-c-setup-agent-limits.md
    ├── step-04-c-implement-memory-governance.md
    ├── step-05-c-setup-feature-flags.md
    ├── step-06-c-integration-test.md
    ├── step-10-e-load-existing.md
    ├── step-11-e-update-governance.md
    ├── step-20-v-validate-limits.md
    └── step-21-v-generate-report.md
```

### Workflow 5: State Management

**Directory:** `src/workflows/bmad-bam-state-management/`

**Patterns Covered:** LangGraph Checkpoint Persistence, State Serialization Multi-Tenant, Interrupt/Resume Patterns, Conditional Edge Patterns

**Structure:**
```
bmad-bam-state-management/
├── bmad-skill-manifest.yaml
├── SKILL.md
├── workflow.md
└── steps/
    ├── step-01-c-design-checkpointing.md
    ├── step-02-c-implement-serialization.md
    ├── step-03-c-setup-interrupt-resume.md
    ├── step-04-c-design-conditional-edges.md
    ├── step-05-c-integration-test.md
    ├── step-10-e-load-existing.md
    ├── step-11-e-update-state-config.md
    ├── step-20-v-validate-persistence.md
    └── step-21-v-generate-report.md
```

### Workflow 6: AI Discovery Setup

**Directory:** `src/workflows/bmad-bam-ai-discovery-setup/`

**Patterns Covered:** AGENTS.md Publishing, llms.txt Publishing, Prompt Rollback Automation, Model Warm-up Patterns

**Structure:**
```
bmad-bam-ai-discovery-setup/
├── bmad-skill-manifest.yaml
├── SKILL.md
├── workflow.md
└── steps/
    ├── step-01-c-generate-agents-md.md
    ├── step-02-c-create-llms-txt.md
    ├── step-03-c-setup-prompt-rollback.md
    ├── step-04-c-configure-model-warmup.md
    ├── step-05-c-integration-test.md
    ├── step-10-e-load-existing.md
    ├── step-11-e-update-discovery.md
    ├── step-20-v-validate-discovery.md
    └── step-21-v-generate-report.md
```

---

## Final File Count

| Component | Count | Files per | Total Files |
|-----------|-------|-----------|-------------|
| Agent guides | 6 | 1 | 6 |
| Workflows | 6 | | |
| - Manifest | 6 | 1 | 6 |
| - SKILL.md | 6 | 1 | 6 |
| - workflow.md | 6 | 1 | 6 |
| - Step files | 6 | ~11 avg | 66 |
| Templates | 6 | 1 | 6 |
| **Total New Files** | | | **~96** |
| **Files Modified** | | | **5** |

**Reduction: 370 → 96 files (74% reduction)**

---

## Pattern Registry CSV Update

Add these 30 rows to `bam-patterns.csv` (patterns remain the same, just organized differently in guides):

[Same CSV entries as original design - all 30 patterns]

---

## Quality Gate Updates

[Same quality gate updates as original design]

---

## Implementation Checklist

### Phase 0 (Weeks 1-2)
- [ ] Create `production-discovery-patterns.md` agent guide
- [ ] Create `production-governance-patterns.md` agent guide (partial - 4 patterns)
- [ ] Create `bmad-bam-ai-discovery-setup` workflow
- [ ] Update `bam-patterns.csv` with 12 Phase 0 patterns
- [ ] Update quality gate checklists

### Phase 1 (Weeks 3-8)
- [ ] Create `production-safety-patterns.md` agent guide
- [ ] Create `production-observability-patterns.md` agent guide
- [ ] Create `production-reliability-patterns.md` agent guide
- [ ] Complete `production-governance-patterns.md` agent guide
- [ ] Create `production-state-patterns.md` agent guide
- [ ] Create remaining 5 workflows
- [ ] Update `bam-patterns.csv` with 18 Phase 1 patterns
- [ ] Update quality gate checklists
- [ ] Run `npm test` to verify

---

## Summary

This consolidated design provides:

1. **6 themed agent guides** instead of 30 separate files
2. **6 composite workflows** instead of 30 separate workflows
3. **~96 total files** instead of ~370 (74% reduction)
4. **Better AI agent usability** - related patterns together, less context switching
5. **Full BMM/BAM compatibility** - same patterns, better organization

**Next Step:** Approve to create actual files
