---
pattern_id: agent-negotiation
shortcode: ZAN
category: agent-communication
qg_ref: QG-AI1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Agent Negotiation - BAM Pattern

**Loaded by:** ZAN  
**Applies to:** Multi-agent multi-tenant systems requiring consensus or agreement  
**See also:** [agent-handoff-protocol.md](agent-handoff-protocol.md), [agent-orchestration.md](agent-orchestration.md)

---

## When to Use

- Multiple agents must reach consensus on a decision
- Conflict resolution between competing agent recommendations
- Resource allocation across agent pools
- Multi-stakeholder approval workflows
- Auction or bidding scenarios in agent marketplaces

## When NOT to Use

- Single-agent deployments
- Deterministic workflows with no decision ambiguity
- Simple sequential task execution
- When a single orchestrator can make authoritative decisions

## Architecture

### Negotiation Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                    Agent Negotiation Protocol                        │
│                                                                      │
│  ┌───────────┐    ┌───────────┐    ┌───────────┐                   │
│  │  Agent A  │    │  Agent B  │    │  Agent C  │                   │
│  │ (Proposer)│    │ (Voter)   │    │ (Voter)   │                   │
│  └─────┬─────┘    └─────┬─────┘    └─────┬─────┘                   │
│        │                │                │                          │
│        ▼                ▼                ▼                          │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │            Negotiation Context (Tenant-Scoped)               │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │   │
│  │  │  Proposal   │  │   Votes     │  │  Decision   │         │   │
│  │  │  Registry   │  │   Ledger    │  │   Record    │         │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘         │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                              │                                      │
│                              ▼                                      │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │              Conflict Resolution Engine                      │   │
│  │  [Voting] [Weighted] [Arbitration] [Escalation]             │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                      │
│  Protocols: [Consensus] [Auction] [Mediation] [Veto-enabled]       │
└─────────────────────────────────────────────────────────────────────┘
```

### Tenant-Scoped Negotiation Context

```
┌─────────────────────────────────────────────────────────────────┐
│                    Tenant Boundary                               │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ tenant_id: acme_corp                                       │  │
│  │                                                            │  │
│  │ ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │  │
│  │ │ Negotiation  │  │ Negotiation  │  │ Negotiation  │     │  │
│  │ │ Session #1   │  │ Session #2   │  │ Session #3   │     │  │
│  │ │              │  │              │  │              │     │  │
│  │ │ Participants:│  │ Participants:│  │ Participants:│     │  │
│  │ │ - Agent A    │  │ - Agent D    │  │ - Agent G    │     │  │
│  │ │ - Agent B    │  │ - Agent E    │  │ - Agent H    │     │  │
│  │ │ - Agent C    │  │ - Agent F    │  │ - Arbiter    │     │  │
│  │ └──────────────┘  └──────────────┘  └──────────────┘     │  │
│  │                                                            │  │
│  │ Isolation: Sessions cannot access other tenant contexts   │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### Configuration Schema

```yaml
agent_negotiation:
  version: "1.0.0"
  bam_controlled: true
  tenant_scoped: true
  
  protocols:
    consensus:
      description: "All agents must agree"
      quorum_percentage: int  # 51-100
      timeout_seconds: int
      allow_abstention: bool
      
    weighted_voting:
      description: "Votes weighted by agent capability/trust"
      weight_factors:
        - capability_score: float
        - historical_accuracy: float
        - domain_expertise: float
      tie_breaker: enum[arbiter, highest_weight, random]
      
    auction:
      description: "Agents bid for task assignment"
      bid_criteria:
        - estimated_cost: float
        - estimated_duration: int
        - confidence_score: float
      winner_selection: enum[lowest_cost, best_fit, multi_winner]
      
    arbitration:
      description: "Designated arbiter resolves conflicts"
      arbiter_agent: string
      appeal_allowed: bool
      appeal_timeout_seconds: int
  
  conflict_resolution:
    deadlock_timeout_seconds: int
    escalation_path:
      - level: 1
        action: "extend_timeout"
        duration_multiplier: 2
      - level: 2
        action: "invoke_arbiter"
      - level: 3
        action: "escalate_to_human"
    
  tenant_isolation:
    cross_tenant_negotiation: enum[never, same_org, federated]
    context_isolation: bool
    audit_all_decisions: bool
    
  decision_record:
    store_proposals: bool
    store_votes: bool
    store_rationale: bool
    retention_days: int
```

### Negotiation Protocols

```
Protocol Selection Matrix:
┌────────────────────┬───────────┬──────────┬───────────┬───────────┐
│ Scenario           │ Consensus │ Weighted │ Auction   │ Arbitrate │
├────────────────────┼───────────┼──────────┼───────────┼───────────┤
│ Equal expertise    │ ✓         │          │           │           │
│ Varying capability │           │ ✓        │           │           │
│ Resource allocation│           │          │ ✓         │           │
│ Conflict deadlock  │           │          │           │ ✓         │
│ Time-critical      │           │ ✓        │           │ ✓         │
│ Audit-required     │ ✓         │ ✓        │ ✓         │ ✓         │
└────────────────────┴───────────┴──────────┴───────────┴───────────┘
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Full Consensus | Maximum agreement | Slow, deadlock risk | Critical decisions |
| Weighted Voting | Leverages expertise | Complexity in weighting | Specialized domains |
| Auction | Market-efficient | May favor speed over quality | Resource allocation |
| Arbitration | Fast resolution | Single point of authority | Conflict resolution |
| Hybrid | Flexible | Implementation complexity | Enterprise deployments |

## Implementation Patterns

### Proposal Lifecycle

```
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│ Draft   │───►│ Submit  │───►│ Voting  │───►│ Resolve │───►│ Execute │
└─────────┘    └─────────┘    └─────────┘    └─────────┘    └─────────┘
     │              │              │              │              │
     │              │              │              │              │
     ▼              ▼              ▼              ▼              ▼
 Proposer       Validate       Collect        Determine     Apply
 prepares       against        votes          outcome       decision
               constraints    + rationale
```

### Decision Record Schema

```yaml
decision_record:
  id: uuid
  tenant_id: string
  session_id: string
  created_at: timestamp
  
  proposal:
    proposer_agent: string
    content: object
    rationale: string
    
  votes:
    - agent_id: string
      vote: enum[approve, reject, abstain]
      weight: float
      rationale: string
      timestamp: timestamp
      
  resolution:
    outcome: enum[approved, rejected, deadlocked, escalated]
    method: enum[consensus, weighted, auction, arbitration]
    final_decision: object
    resolved_at: timestamp
    resolver: string  # agent or human
```


## Quality Checks

- [ ] Message schemas validated
- [ ] Tenant context propagated in all messages
- [ ] Timeout handling for agent responses
- [ ] Dead letter queue configured
- [ ] **CRITICAL:** No cross-tenant message routing

## Web Research Queries

- "multi-agent negotiation consensus patterns {date}"
- "distributed agent decision making protocols {date}"
- "AI agent conflict resolution strategies {date}"
- "multi-agent voting systems implementation {date}"
- "agent auction mechanism design {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-AI1 | Negotiation protocol tenant-isolated, decisions audited |
| QG-M3 | Agent coordination respects tier limits |
| QG-I2 | Cross-tenant negotiation blocked or explicitly consented |

## Related Patterns

- [agent-handoff-protocol.md](agent-handoff-protocol.md) - Task handoff between agents
- [agent-orchestration.md](agent-orchestration.md) - Multi-agent orchestration
- [agent-registry.md](agent-registry.md) - Agent catalog and discovery
- [cross-tenant-agent.md](cross-tenant-agent.md) - Cross-tenant federation
