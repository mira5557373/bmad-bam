# Tenant Quotas - BAM Pattern

**Loaded by:** ZTQ  
**Applies to:** Per-tenant resource limits, fair usage policies  
**See also:** [runtime-loops.md](runtime-loops.md) (Economic Loop integration)

---

## When to Use

- Multi-tenant SaaS with tiered pricing
- Noisy neighbor prevention required
- Fair usage enforcement across tenants
- AI/LLM cost management per tenant
- Agent execution resource governance
- Burst protection during traffic spikes

## When NOT to Use

- Single-tenant deployments
- Unlimited tier offerings (no resource caps)
- Development/testing environments
- Tenants with dedicated infrastructure (use infra limits instead)

## Architecture

### Quota Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                     PLATFORM LIMITS                         │
│              (Global ceiling, infrastructure)               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                    TIER LIMITS                        │  │
│  │           (Free / Pro / Enterprise caps)              │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │              TENANT QUOTAS                      │  │  │
│  │  │        (Per-tenant allocation)                  │  │  │
│  │  │  ┌───────────────────────────────────────────┐  │  │  │
│  │  │  │           USER QUOTAS                     │  │  │  │
│  │  │  │     (Optional per-user subdivision)       │  │  │  │
│  │  │  └───────────────────────────────────────────┘  │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Burst Protection (P0-08)

Prevents tenants from overwhelming shared resources during traffic spikes.

| Tier | requests_per_second | burst_multiplier | burst_duration_sec | cooldown_sec |
|------|---------------------|------------------|-------------------|--------------|
| Free | 10 | 1.5x | 30 | 60 |
| Pro | 100 | 2.0x | 60 | 30 |
| Enterprise | 1000 | 3.0x | 120 | 15 |

**Enforcement Flow:**

```
Request ──► Check Rate ──► Under Limit? ──► Allow
                │                │
                │          Within Burst?
                │                │
                │         ┌──────┴──────┐
                │        YES           NO
                │         │             │
                │    Allow + Track   Reject 429
                │         │
                │    Burst Exceeded?
                │         │
                │    Start Cooldown
                │         │
                └────► Reduce to Base Rate
```

### Per-Tenant Context Window Budget (P0-09)

Limits LLM token consumption to control AI costs per tenant.

| Tier | tokens_per_day | tokens_per_request | rollover | overage_action |
|------|----------------|-------------------|----------|----------------|
| Free | 50,000 | 4,096 | No | Hard block |
| Pro | 500,000 | 16,384 | 20% | Soft warning at 80%, block at 100% |
| Enterprise | 5,000,000 | 32,768 | 50% | Alert at 90%, negotiate overage |

**Token Tracking:**

```
┌─────────────────────────────────────────────┐
│           Token Budget Tracker              │
│                                             │
│  Tenant: acme-corp     Tier: Pro            │
│  ─────────────────────────────────────────  │
│  Daily Budget:    500,000 tokens            │
│  Used Today:      347,892 tokens (69.6%)    │
│  Remaining:       152,108 tokens            │
│  ─────────────────────────────────────────  │
│  ████████████████████░░░░░░░░  69.6%        │
│  ─────────────────────────────────────────  │
│  Reset: 2026-04-29 00:00:00 UTC             │
└─────────────────────────────────────────────┘
```

### Per-Tenant Agent Instance Limits (P0-10)

Controls concurrent agent executions and resource consumption.

| Tier | concurrent_agents | max_execution_sec | memory_mb | tool_calls_per_run | queue_depth |
|------|-------------------|-------------------|-----------|-------------------|-------------|
| Free | 1 | 60 | 256 | 10 | 5 |
| Pro | 5 | 300 | 1024 | 50 | 25 |
| Enterprise | 25 | 900 | 4096 | 200 | 100 |

**Agent Lifecycle with Quotas:**

```
Agent Request ──► Check Concurrent ──► Slot Available?
                         │                    │
                    ┌────┴────┐          ┌────┴────┐
                    │  YES    │          │   NO    │
                    ▼         │          ▼         │
               Allocate       │     Queue Depth    │
               Resources      │        OK?         │
                    │         │          │         │
                    │         │    ┌─────┴─────┐   │
                    │         │   YES         NO   │
                    │         │    │           │   │
                    │         │  Queue      Reject │
                    ▼         │    │       503     │
               Start Agent    │    │               │
                    │         │    └───────────────┘
                    ▼         │
               Monitor ◄──────┘
               Limits
                    │
            ┌───────┴───────┐
            │               │
       Time/Memory     Tool Limit
       Exceeded?       Exceeded?
            │               │
            ▼               ▼
       Graceful         Block +
       Terminate        Log
```

### Implementation Schema

```yaml
tenant_quotas:
  tenant_id: uuid
  tier: enum[free, pro, enterprise]
  
  burst_protection:
    base_rps: int
    burst_multiplier: float
    burst_duration_sec: int
    cooldown_sec: int
    current_rps: int
    burst_active: bool
    cooldown_until: timestamp
  
  context_budget:
    tokens_per_day: int
    tokens_per_request: int
    tokens_used_today: int
    rollover_percent: int
    rollover_balance: int
    reset_at: timestamp
    overage_action: enum[block, warn, negotiate]
  
  agent_limits:
    concurrent_max: int
    concurrent_active: int
    max_execution_sec: int
    memory_mb: int
    tool_calls_per_run: int
    queue_depth: int
    queued_count: int
  
  enforcement:
    enabled: bool
    soft_limit_percent: int  # Warning threshold
    hard_limit_action: enum[block, throttle, alert]
    alert_channels: string[]
  
  metadata:
    created_at: timestamp
    updated_at: timestamp
    last_enforcement: timestamp
```

### Quota Enforcement Points

```
┌─────────────────────────────────────────────────────────────────┐
│                      Request Flow                               │
│                                                                 │
│  API Gateway ──► Rate Limiter ──► Auth ──► Quota Check ──► App  │
│       │              │                         │                │
│       │         Burst Check              Token/Agent            │
│       │              │                    Budget Check          │
│       │              ▼                         │                │
│       │         Redis/Memory                   ▼                │
│       │         Counter                   PostgreSQL            │
│       │                                   Quota Table           │
│       │                                        │                │
│       └────────────────────────────────────────┘                │
│                         │                                       │
│                    Metrics ──► Prometheus ──► Alerting          │
└─────────────────────────────────────────────────────────────────┘
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Hard limits | Predictable costs, simple | Poor UX at limits | Free tier, strict budgets |
| Soft limits | Better UX, flexible | Overage tracking complexity | Pro tier, trusted tenants |
| Token bucket | Smooth bursts, fair | Complex implementation | High-traffic APIs |
| Sliding window | Accurate rate limiting | Memory overhead | Precise burst control |
| Leaky bucket | Consistent output rate | Can reject valid bursts | Queue-based systems |

## Web Research Queries

- "multi-tenant rate limiting patterns {date}"
- "token bucket vs sliding window rate limiting {date}"
- "LLM token budget management SaaS {date}"
- "kubernetes resource quotas per namespace {date}"
- "noisy neighbor prevention cloud {date}"
- "agent concurrency limits distributed systems {date}"
