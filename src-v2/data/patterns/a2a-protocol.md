---
pattern_id: a2a-protocol
shortcode: ZA2
category: mcp
qg_ref: QG-MCP1
version: 1.0.0
last_reviewed: 2026-04-30
---

# A2A Protocol - BAM Pattern

**Loaded by:** ZA2  
**Applies to:** Agent-to-agent communication in multi-tenant systems  
**See also:** [agent-orchestration.md](agent-orchestration.md), [mcp-federation.md](mcp-federation.md)

---

## When to Use

- Direct communication between AI agents
- Delegating subtasks to specialized agents
- Multi-agent collaboration workflows
- Cross-tenant agent federation (with controls)

## When NOT to Use

- Single-agent systems
- Human-in-the-loop required for all decisions
- No agent interoperability requirements

## Architecture

### A2A Communication

```
┌─────────────────────────────────────────┐
│           A2A Message Bus                │
├─────────────────────────────────────────┤
│  Agent A ─────────────► Agent B         │
│  (Tenant X)   message   (Tenant X)      │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │     Tenant Boundary Check       │    │
│  │     - Same tenant: allow        │    │
│  │     - Cross-tenant: policy      │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

### Configuration Schema

```yaml
a2a_protocol:
  version: "1.0.0"
  bam_controlled: true
  
  messaging:
    transport: enum[direct, queue, pubsub]
    serialization: enum[json, protobuf]
    encryption: required
    
  tenant_policy:
    same_tenant: allow
    cross_tenant: enum[deny, policy_check, federated]
    
  message_schema:
    request_id: required
    source_agent: required
    target_agent: required
    tenant_id: required
    payload: any
```

## Trade-offs

| Approach | Latency | Decoupling | Complexity |
|----------|---------|------------|------------|
| Direct | Low | Low | Low |
| Queue | Medium | High | Medium |
| Pub/Sub | Variable | Highest | High |


## Quality Checks

- [ ] MCP server registration validated
- [ ] Tenant isolation enforced on all tool calls
- [ ] Rate limiting configured per tenant tier
- [ ] Schema validation enabled for all tools
- [ ] **CRITICAL:** No cross-tenant tool access possible

## Web Research Queries

- "agent to agent communication patterns {date}"
- "A2A protocol AI agents {date}"
- "multi-agent messaging {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-MCP1 | A2A respects tenant boundaries |

## Related Patterns

- [agent-orchestration.md](agent-orchestration.md) - Multi-agent patterns
- [mcp-federation.md](mcp-federation.md) - Cross-server federation
