---
pattern_id: fanout-circuit-breaker
shortcode: ZFC
category: safety
qg_ref: QG-AI1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Fanout Circuit Breaker - BAM Pattern

**Loaded by:** ZFC  
**Applies to:** Multi-agent systems with sub-agent spawning and parallel task execution  
**See also:** [agent-orchestration.md](agent-orchestration.md), [cost-attribution-engine.md](cost-attribution-engine.md)

---

## When to Use

- Agents can spawn sub-agents or parallel tasks
- Risk of runaway token consumption
- Cost budget enforcement needed
- Prevent recursive agent loops

## When NOT to Use

- Single-agent linear workflows
- No sub-agent spawning
- Unlimited budget scenarios

## Architecture

### Depth/Width/Budget Protection

```
┌─────────────────────────────────────────────────────────────┐
│                  Fanout Circuit Breaker                      │
│                                                              │
│  Agent Request                                               │
│       │                                                      │
│       ▼                                                      │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐      │
│  │ Depth       │───►│ Width       │───►│ Budget      │      │
│  │ Counter     │    │ Counter     │    │ Check       │      │
│  └─────────────┘    └─────────────┘    └──────┬──────┘      │
│                                               │              │
│                     ┌─────────────────────────┘              │
│                     ▼                                        │
│            ┌─────────────────┐                               │
│            │ ALLOW │ THROTTLE │ BREAK                       │
│            └─────────────────┘                               │
│                                                              │
│  Limits: [Max Depth] [Max Width] [Max Tokens] [Max Cost]    │
└─────────────────────────────────────────────────────────────┘
```

### Configuration Schema (P3-02)

```yaml
fanout_circuit_breaker:
  version: "1.0.0"
  bam_controlled: true
  
  limits:
    max_depth: int
    max_width: int
    max_total_agents: int
    max_tokens_per_request: int
    max_cost_per_request: float
    
  tracking:
    counter_storage: enum[memory, redis, database]
    ttl_seconds: int
    
  actions:
    on_depth_exceeded: enum[block, warn, throttle]
    on_width_exceeded: enum[block, warn, throttle]
    on_budget_exceeded: enum[block, warn, complete_current]
    
  tenant_configuration:
    per_tenant_limits: bool
    tier_limits:
      free:
        max_depth: int
        max_width: int
      pro:
        max_depth: int
        max_width: int
      enterprise:
        max_depth: int
        max_width: int
        
  recovery:
    cooldown_seconds: int
    half_open_requests: int
    reset_on_success: bool
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Hard limits | Predictable costs | May truncate work | Budget-constrained |
| Soft limits + alerts | Flexibility | Risk of overrun | Trusted workloads |
| Adaptive limits | Learns patterns | Complexity | Mature systems |


## Quality Checks

- [ ] Circuit breaker thresholds configured
- [ ] Fallback behavior defined
- [ ] Recovery procedures documented
- [ ] Blast radius contained
- [ ] **CRITICAL:** No cascading failures across tenants

## Web Research Queries

- "agent fanout circuit breaker patterns {date}"
- "LLM runaway loop prevention {date}"
- "multi-agent cost limiting {date}"
- "recursive agent depth limiting {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-AI1 | Fanout limits configured and tested |

## Related Patterns

- [agent-orchestration.md](agent-orchestration.md) - Multi-agent execution
- [cost-attribution-engine.md](cost-attribution-engine.md) - Cost tracking
- [kill-switch-registry.md](kill-switch-registry.md) - Emergency shutdown
