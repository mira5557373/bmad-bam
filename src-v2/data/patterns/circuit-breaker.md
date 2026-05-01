---
pattern_id: circuit-breaker
shortcode: ZCB
category: resilience
qg_ref: QG-M1
version: 1.0.0
last_reviewed: 2026-04-29
---

# Circuit Breaker - BAM Pattern

**Loaded by:** ZCB  
**Applies to:** Resilience and fault tolerance  
**See also:** [tool-resilience.md](tool-resilience.md) (applies circuit breaker in fallback chains)

---

## When to Use

- External service dependencies
- Failure isolation needed
- Cascading failure prevention
- Graceful degradation required

## When NOT to Use

- In-process calls only
- Failures must propagate
- Simple retry sufficient

## Architecture

```
┌─────────────────────────────────────┐
│         Circuit Breaker             │
│  ┌─────────┐  ┌─────────┐          │
│  │ CLOSED  │──│  OPEN   │          │
│  │ (pass)  │  │ (fail)  │          │
│  └────┬────┘  └────┬────┘          │
│       │            │               │
│       └─────┬──────┘               │
│             ▼                      │
│       ┌──────────┐                 │
│       │HALF-OPEN │                 │
│       │ (probe)  │                 │
│       └──────────┘                 │
└─────────────────────────────────────┘
```

## Trade-offs

| Benefit | Cost |
|---------|------|
| Failure isolation | Added complexity |
| Fast failure | State management |
| Recovery time | Configuration tuning |


## Quality Checks

- [ ] Circuit breaker states defined
- [ ] Retry policies configured
- [ ] Fallback endpoints available
- [ ] Health checks implemented
- [ ] **CRITICAL:** No single point of failure

## Web Research Queries

- "circuit breaker pattern {date}"
- "resilience patterns multi-tenant {date}"

---

## Kill Switch Registry (P1-01)

Emergency shutdown capability for AI agents:

### Kill Switch Levels

| Level | Scope | Activation | Recovery |
|-------|-------|------------|----------|
| Agent | Single agent instance | Immediate | Manual restart |
| Tenant | All tenant agents | Immediate | Admin approval |
| Model | Specific LLM provider | Immediate | Provider recovery |
| Global | All agents platform-wide | Immediate | Incident review |

### Kill Switch Schema

```yaml
kill_switch_registry:
  switches:
    - id: "agent_customer_support"
      level: "agent"
      status: "active"
      last_triggered: null
      
    - id: "tenant_abc123"
      level: "tenant"
      status: "active"
      kill_reason: null
      
    - id: "provider_openai"
      level: "model"
      status: "degraded"
      fallback: "anthropic"
      
  automation:
    cost_threshold_usd: 1000
    error_rate_threshold: 0.10
    auto_kill_enabled: true
    notification_channels: ["slack", "pagerduty"]
```

### Kill Switch Triggers

| Trigger | Threshold | Auto-Kill | Notification |
|---------|-----------|-----------|--------------|
| Cost overrun | > 200% budget | Yes | Immediate |
| Error spike | > 10% (5 min) | Yes | Immediate |
| Security alert | Any critical | Yes | Immediate |
| Manual request | Admin action | Yes | Logged |

---

## Fan-Out Circuit Breaker (P1-02)

Circuit breaker for parallel agent orchestration:

### Fan-Out Failure Modes

| Mode | Behavior | Use Case |
|------|----------|----------|
| Fail-fast | Stop all on first failure | Critical operations |
| Best-effort | Continue with partial results | Tolerant operations |
| Quorum | Require N of M success | Consensus operations |

### Fan-Out Configuration

```yaml
fan_out_breaker:
  max_parallel: 10
  failure_mode: "best-effort"
  quorum_threshold: 0.6
  
  per_branch_limits:
    timeout_ms: 5000
    max_retries: 2
    
  circuit_breaker:
    failure_threshold: 3
    reset_timeout_sec: 30
    half_open_requests: 1
```

## Additional Web Research Queries

- Search: "AI agent kill switch patterns {date}"
- Search: "fan-out circuit breaker distributed systems {date}"
- Search: "emergency shutdown AI systems {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-M1 | Pattern implementation verified |

## Related Patterns

- [circuit-breaker.md](circuit-breaker.md) - Fault tolerance
- [disaster-recovery.md](disaster-recovery.md) - Business continuity

