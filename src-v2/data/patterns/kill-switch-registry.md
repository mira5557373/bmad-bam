---
pattern_id: kill-switch-registry
shortcode: ZKS
category: operations
qg_ref: QG-IR1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Kill Switch Registry - BAM Pattern

**Loaded by:** ZKS  
**Applies to:** Emergency shutdown controls for AI agents and tenant operations  
**See also:** [incident-response.md](incident-response.md), [circuit-breaker.md](circuit-breaker.md)

---

## When to Use

- Production AI systems requiring emergency controls
- Multi-tenant platforms with per-tenant shutdown needs
- Systems with budget or rate limit enforcement
- Compliance requirements for immediate termination capability
- High-risk AI agent deployments

## When NOT to Use

- Development/staging environments (simplified controls sufficient)
- Single-tenant deployments with simpler shutdown needs
- Stateless services without persistent agent sessions

## Architecture

### Kill Switch Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                    Kill Switch Registry                      │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                 PLATFORM LEVEL                        │   │
│  │   EMERGENCY_HALT_ALL                                  │   │
│  │       Requires: 2 approvers (admin + oncall)         │   │
│  │       Effect: All agents, all tenants                │   │
│  └──────────────────────────────────────────────────────┘   │
│                           │                                  │
│                           ▼ cascade                          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                 TENANT LEVEL                          │   │
│  │   TENANT_AGENT_HALT                                   │   │
│  │       Auto-trigger: budget_exceeded, safety_violation│   │
│  │       Effect: All agents for tenant                  │   │
│  └──────────────────────────────────────────────────────┘   │
│                           │                                  │
│                           ▼ cascade                          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                 AGENT LEVEL                           │   │
│  │   AGENT_SUSPEND                                       │   │
│  │       Auto-trigger: tool_abuse, infinite_loop        │   │
│  │       Effect: Single agent instance                  │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Registry Schema (P1-01)

```yaml
kill_switch_registry:
  version: "1.0.0"
  bam_controlled: true
  
  switches:
    global:
      id: string
      scope: enum[platform]
      requires_approval: bool
      approvers: list[string]
      cooldown_seconds: int
        
    tenant_scoped:
      id: string
      scope: enum[tenant]
      auto_trigger_on: list[string]
      manual_trigger: bool
        
    agent_scoped:
      id: string
      scope: enum[agent]
      auto_trigger_on: list[string]
        
  propagation:
    cascade_down: bool
    notify_upstream: bool
    notification_channels: list[string]
    
  recovery:
    requires_manual_reset: enum[always, on_safety, never]
    cooldown_seconds: int
    post_recovery_verification: bool
    
  audit:
    log_all_activations: bool
    log_all_recoveries: bool
    alert_channel: string
    retention_days: int
```

### Auto-Trigger Configuration (P1-02)

```yaml
auto_triggers:
  budget_exceeded:
    condition: string
    switch: string
    grace_period_seconds: int
    
  safety_violation:
    condition: string
    switch: string
    grace_period_seconds: int
    
  tool_abuse:
    condition: string
    switch: string
    grace_period_seconds: int
    
  infinite_loop:
    condition: string
    switch: string
    grace_period_seconds: int
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Manual only | Full control | Slow response | Low-risk systems |
| Auto-trigger only | Fast response | Risk of false positives | Budget enforcement |
| Hybrid (manual + auto) | Balanced | Complexity | Production SaaS |
| Multi-approval | Safety | Slow for emergencies | High-stakes |

## Security Considerations

| Risk | Mitigation |
|------|------------|
| Unauthorized activation | Multi-approver for global switches |
| Denial of service | Rate limit switch activations |
| Failed recovery | Post-recovery verification checks |
| Audit gap | Immutable audit log, 365-day retention |

## Web Research Queries

- "AI agent kill switch patterns {date}"
- "emergency shutdown multi-tenant systems {date}"
- "circuit breaker vs kill switch patterns {date}"
- "agent safety automatic shutdown {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-IR1 | Kill switch registry implemented |

## Related Patterns

- [incident-response.md](incident-response.md) - Incident handling
- [circuit-breaker.md](circuit-breaker.md) - Graceful degradation
- [runtime-loops.md](runtime-loops.md) - Recovery loop
