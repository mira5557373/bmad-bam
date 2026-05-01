---
pattern_id: agent-handoff-protocol
shortcode: ZAH
category: ai-runtime
qg_ref: QG-M3
version: 1.0.0
last_reviewed: 2026-04-30
---

# Agent Handoff Protocol - BAM Pattern

**Loaded by:** ZAH  
**Applies to:** Multi-agent systems requiring task handoff with context preservation  
**See also:** [agent-orchestration.md](agent-orchestration.md), [agent-orchestration.md](agent-orchestration.md)

---

## When to Use

- Multi-agent workflows
- Agent specialization with handoffs
- Escalation to more capable agents
- Complex orchestration scenarios

## When NOT to Use

- Single-agent deployments
- Simple linear workflows
- No agent specialization

## Architecture

### Handoff Flow

```
┌─────────────────────────────────────────────────────────────┐
│                Agent Handoff Protocol                        │
│                                                              │
│  Agent A                        Agent B                      │
│  ┌─────────┐                   ┌─────────┐                  │
│  │ Execute │    Handoff        │ Receive │                  │
│  │ Task    │──────────────────►│ Task    │                  │
│  └────┬────┘                   └────┬────┘                  │
│       │                             │                        │
│       │  ┌─────────────────────┐   │                        │
│       └─►│ Context Transfer    │◄──┘                        │
│          │ • Conversation      │                             │
│          │ • Working Memory    │                             │
│          │ • Tenant Context    │                             │
│          │ • Tool State        │                             │
│          └─────────────────────┘                             │
│                                                              │
│  Handoffs: [Sequential] [Parallel] [Escalation] [Delegate] │
│  Guarantees: [Ack] [Timeout] [Retry] [Fallback]            │
└─────────────────────────────────────────────────────────────┘
```

### Configuration Schema (P2-09)

```yaml
agent_handoff_protocol:
  version: "1.0.0"
  bam_controlled: true
  
  handoff_types:
    sequential:
      description: "Complete then hand off"
      preserve_full_context: bool
    parallel:
      description: "Fork to multiple agents"
      aggregation_strategy: enum[first, all, majority]
    escalation:
      description: "Escalate to more capable agent"
      escalation_criteria: list[string]
    delegation:
      description: "Delegate subtask and await"
      timeout_seconds: int
      
  context_transfer:
    include:
      conversation_history: bool
      working_memory: bool
      tool_state: bool
      tenant_context: bool
      
    serialization:
      format: enum[json, protobuf, msgpack]
      compression: bool
      max_size_bytes: int
      
  failure_handling:
    on_timeout: enum[retry, fallback, escalate, fail]
    on_rejection: enum[retry, reroute, fail]
    fallback_agent: string
    max_handoff_chain: int
    
  tenant_isolation:
    cross_tenant_handoff: enum[never, same_org, explicit_consent]
    context_sanitization: bool
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Full context transfer | Complete information | Large payloads | Complex tasks |
| Summary transfer | Efficient | Information loss | Simple handoffs |
| Stateless handoff | Simple | No context | Independent tasks |
| Checkpoint-based | Resumable | Storage overhead | Long-running tasks |


## Quality Checks

- [ ] Agent execution respects tenant boundaries
- [ ] State management includes tenant context
- [ ] Checkpointing configured for long-running workflows
- [ ] Timeout and retry policies defined
- [ ] **CRITICAL:** No cross-tenant state leakage

## Web Research Queries

- "multi-agent handoff protocol patterns {date}"
- "agent task delegation orchestration {date}"
- "LLM agent context transfer {date}"
- "agent-to-agent communication patterns {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-M3 | Handoff protocol implemented, context preserved |

## Related Patterns

- [agent-orchestration.md](agent-orchestration.md) - Orchestration patterns
- [agent-orchestration.md](agent-orchestration.md) - Multi-agent coordination
