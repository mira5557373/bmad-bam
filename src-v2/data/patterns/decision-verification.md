---
pattern_id: decision-verification
shortcode: ZDV
category: ai-runtime
qg_ref: QG-AI3
version: 1.0.0
last_reviewed: 2026-04-30
---

# Decision Verification - BAM Pattern

**Loaded by:** ZDV  
**Applies to:** Verifying agent decisions before execution, especially for high-impact actions  
**See also:** [action-contract.md](action-contract.md), [ai-safety.md](ai-safety.md)

---

## When to Use

- AI agents with tool execution capabilities
- Autonomous systems performing external actions
- Multi-step workflows with irreversible operations
- Financial, legal, or safety-critical AI applications
- Systems requiring audit trails for AI decisions

## When NOT to Use

- Read-only AI assistants
- Conversational AI without action capabilities
- Low-stakes recommendation systems
- Development environments

## Architecture

### Verification Gate Flow

```
┌─────────────────────────────────────────────────────────────┐
│                   Decision Verification                      │
│                                                              │
│  Agent Decision                                              │
│        │                                                     │
│        ▼                                                     │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              Impact Assessment                          │ │
│  │   LOW: read-only operations                             │ │
│  │   MEDIUM: reversible mutations                          │ │
│  │   HIGH: irreversible or external actions                │ │
│  └────────────────────────────────────────────────────────┘ │
│        │                                                     │
│        ├── LOW ──────────────────────► Auto-approve         │
│        │                                                     │
│        ├── MEDIUM ───► Automated Checks ───► Execute/Reject │
│        │                                                     │
│        └── HIGH ────► Human Approval Gate ───► Execute/Reject│
└─────────────────────────────────────────────────────────────┘
```

### Verification Configuration Schema (P1-01)

```yaml
decision_verification:
  version: "1.0.0"
  bam_controlled: true
  
  verification_gates:
    impact_assessment:
      enabled: bool
      classifications:
        low: string
        medium: string
        high: string
        
    human_approval:
      required_for: list[string]
      optional_for: list[string]
      timeout_minutes: int
      default_on_timeout: enum[approve, reject]
      
    automated_checks:
      enabled: bool
      checks: list[string]
        
  reversibility:
    track_undo_capability: bool
    require_compensation_action: bool
    
  audit:
    log_all_decisions: bool
    include_reasoning: bool
    retention_days: int
```

### Impact Classification Schema (P1-02)

```yaml
impact_rules:
  low:
    actions: list[string]
    
  medium:
    actions: list[string]
    reversible: bool
    
  high:
    actions: list[string]
    external_effect: bool
    irreversible: bool
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Auto-approve all | Fast | Risky | Dev/test only |
| Automated checks | Balanced | Misses edge cases | Standard |
| Human gate for high | Safe | Slow, expensive | Critical actions |
| Full HITL | Maximum safety | Not scalable | Regulated industries |

## Security Considerations

| Risk | Mitigation |
|------|------------|
| Approval bypass | Server-side enforcement, audit log |
| Timeout exploitation | Conservative default (reject) |
| Stale approvals | Time-bound approval tokens |
| Audit tampering | Immutable audit log |

## Web Research Queries

- "AI agent decision verification patterns {date}"
- "human-in-the-loop AI systems {date}"
- "impact assessment automated actions {date}"
- "reversible action design patterns {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-AI3 | Decision verification implemented |

## Related Patterns

- [action-contract.md](action-contract.md) - Action validation
- [ai-safety.md](ai-safety.md) - Safety controls
- [grounding-verifier.md](grounding-verifier.md) - Output verification
