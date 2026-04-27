# BAM Multi-Agent Coordination Guide

**When to load:** During Phase 3 (Solutioning) when designing multi-agent systems, implementing agent collaboration patterns, or when user mentions swarm intelligence, agent teams, consensus, or agent-to-agent communication.

**Integrates with:** Architect (Nova persona), Dev agent, Platform architect

---

## Core Concepts

### What is Multi-Agent Coordination?

Multi-agent coordination refers to the patterns and protocols that enable multiple AI agents to work together toward a common goal. In a multi-tenant SaaS context, coordination must respect tenant boundaries while enabling sophisticated collaborative behaviors.

### Coordination Dimensions

| Dimension | Description | Multi-Tenant Impact |
|-----------|-------------|---------------------|
| Communication | How agents exchange information | Tenant-isolated channels |
| Task allocation | How work is distributed | Tenant-scoped task queues |
| Conflict resolution | How disagreements are handled | Per-tenant policies |
| State sharing | How agents share context | Tenant memory isolation |

---

## Application Guidelines

When implementing multi-agent coordination in multi-tenant systems:

1. **Isolate communication channels by tenant**: Agents from different tenants must never see each other's messages
2. **Include tenant_id in all messages**: Every inter-agent message must carry tenant context
3. **Bound coordination scope**: Run contracts should limit coordination complexity and duration
4. **Encrypt sensitive payloads**: Agent messages may contain tenant data requiring protection
5. **Implement timeouts and fallbacks**: Coordination failures should not block indefinitely

---

## Agent-to-Agent Communication Protocols

### Communication Patterns

| Pattern | Description | Use Case |
|---------|-------------|----------|
| Direct | Point-to-point messaging | Simple handoffs |
| Broadcast | One-to-many notification | Status updates |
| Publish-Subscribe | Topic-based messaging | Event-driven coordination |
| Request-Response | Synchronous query | Capability lookup |

### Message Structure

| Field | Purpose | Multi-Tenant Consideration |
|-------|---------|---------------------------|
| sender_id | Source agent | Tenant-bound agent |
| recipient_id | Target agent(s) | Same tenant only |
| tenant_id | Tenant context | Always required |
| message_type | Protocol message | Standard types |
| payload | Message content | Tenant-encrypted |
| correlation_id | Conversation tracking | Audit trail |

### Channel Isolation

```
┌─────────────────────────────────────────────────────────┐
│              Multi-Tenant Message Bus                    │
│                                                          │
│   ┌─────────────────┐   ┌─────────────────┐             │
│   │   Tenant A      │   │   Tenant B      │             │
│   │   Channel       │   │   Channel       │             │
│   │ ┌─────┬─────┐   │   │ ┌─────┬─────┐   │             │
│   │ │Agent│Agent│   │   │ │Agent│Agent│   │             │
│   │ │  1  │  2  │   │   │ │  1  │  2  │   │             │
│   │ └──┬──┴──┬──┘   │   │ └──┬──┴──┬──┘   │             │
│   │    │     │      │   │    │     │      │             │
│   │    └──┬──┘      │   │    └──┬──┘      │             │
│   └───────┼─────────┘   └───────┼─────────┘             │
│           │                     │                        │
│           └──────── X ──────────┘                        │
│                 (No cross-tenant)                        │
└─────────────────────────────────────────────────────────┘
```

---

## Swarm Intelligence Patterns

### Swarm Topologies

| Topology | Description | Coordination Style |
|----------|-------------|-------------------|
| Flat | All agents equal | Emergent behavior |
| Hierarchical | Manager-worker | Top-down control |
| Hybrid | Clusters with leads | Federated |

### Flat Swarm Pattern

```
┌─────────────────────────────────────────────────────────┐
│                    Flat Swarm                            │
│                                                          │
│      ┌───────┐     ┌───────┐     ┌───────┐              │
│      │Agent 1│◄───►│Agent 2│◄───►│Agent 3│              │
│      └───┬───┘     └───┬───┘     └───┬───┘              │
│          │             │             │                   │
│          └─────────────┼─────────────┘                   │
│                        │                                 │
│                  ┌─────▼─────┐                           │
│                  │ Consensus │                           │
│                  │  Protocol │                           │
│                  └───────────┘                           │
└─────────────────────────────────────────────────────────┘
```

### Hierarchical Pattern

```
┌─────────────────────────────────────────────────────────┐
│                 Hierarchical Swarm                       │
│                                                          │
│                  ┌───────────┐                           │
│                  │ Supervisor│                           │
│                  └─────┬─────┘                           │
│                        │                                 │
│          ┌─────────────┼─────────────┐                   │
│          │             │             │                   │
│     ┌────▼────┐  ┌─────▼────┐  ┌────▼────┐              │
│     │ Manager │  │ Manager  │  │ Manager │              │
│     │ (Team A)│  │ (Team B) │  │ (Team C)│              │
│     └────┬────┘  └────┬─────┘  └────┬────┘              │
│          │            │             │                    │
│     ┌────▼────┐  ┌────▼────┐  ┌────▼────┐               │
│     │Workers  │  │Workers  │  │Workers  │               │
│     └─────────┘  └─────────┘  └─────────┘               │
└─────────────────────────────────────────────────────────┘
```

---

## Voting and Consensus Protocols

### Voting Mechanisms

| Mechanism | Description | Use Case |
|-----------|-------------|----------|
| Majority | >50% agreement | Simple decisions |
| Supermajority | >66% agreement | Important decisions |
| Unanimous | 100% agreement | Critical decisions |
| Weighted | Vote by expertise | Domain-specific |

### Consensus Protocol Selection

| Protocol | Fault Tolerance | Latency | Complexity |
|----------|-----------------|---------|------------|
| Simple majority | Low | Low | Low |
| Raft-inspired | Medium | Medium | Medium |
| PBFT-inspired | High | High | High |

### Voting Flow

```
┌─────────────────────────────────────────────────────────┐
│                   Voting Protocol                        │
│                                                          │
│   ┌─────────┐    ┌──────────┐    ┌───────────┐          │
│   │ Propose │───►│ Collect  │───►│ Tally     │          │
│   │ Option  │    │  Votes   │    │  Results  │          │
│   └─────────┘    └──────────┘    └─────┬─────┘          │
│                                        │                 │
│                        ┌───────────────┼───────────────┐ │
│                        │               │               │ │
│                  ┌─────▼─────┐   ┌─────▼─────┐         │ │
│                  │ Consensus │   │ No        │         │ │
│                  │ Reached   │   │ Consensus │         │ │
│                  └─────┬─────┘   └─────┬─────┘         │ │
│                        │               │               │ │
│                  ┌─────▼─────┐   ┌─────▼─────┐         │ │
│                  │ Execute   │   │ Escalate/ │         │ │
│                  │ Decision  │   │ Re-vote   │         │ │
│                  └───────────┘   └───────────┘         │ │
│                                                         │ │
└─────────────────────────────────────────────────────────┘
```

### Conflict Resolution Strategies

| Strategy | Description | When to Use |
|----------|-------------|-------------|
| Priority-based | Higher priority agent wins | Clear hierarchy |
| Expertise-based | Domain expert decides | Specialized decisions |
| Random selection | Tie-breaker | Equal validity |
| Human escalation | User decides | High-stakes |

---

## Team Composition Patterns

### Role-Based Teams

| Role | Responsibility | Multi-Tenant |
|------|----------------|--------------|
| Coordinator | Task allocation | Per-tenant instance |
| Specialist | Domain expertise | Shared or tenant-specific |
| Validator | Quality assurance | Shared with tenant context |
| Reporter | Output synthesis | Per-tenant formatting |

### Team Templates by Tier

| Tier | Team Size | Composition | Coordination |
|------|-----------|-------------|--------------|
| Free | 2-3 agents | Generalist | Sequential |
| Pro | 5-7 agents | Mixed roles | Parallel |
| Enterprise | 10+ agents | Specialized | Hierarchical |

### Dynamic Team Formation

| Trigger | Action | Tenant Consideration |
|---------|--------|---------------------|
| Task complexity | Scale team up | Within tier limits |
| Specialization | Add expert agent | Tenant-available agents |
| Deadline pressure | Parallelize | Rate limit respect |
| Quality issue | Add validator | Tenant quality settings |

---

## Multi-Tenant Coordination Constraints

### Resource Limits by Tier

| Tier | Max Agents | Max Concurrent | Message Rate |
|------|------------|----------------|--------------|
| Free | 3 | 2 | 10/sec |
| Pro | 10 | 5 | 100/sec |
| Enterprise | Unlimited | 20 | 1000/sec |

### Isolation Requirements

| Requirement | Implementation | Enforcement |
|-------------|----------------|-------------|
| Agent isolation | Tenant-bound agents | Runtime check |
| State isolation | Tenant-scoped memory | Storage layer |
| Message isolation | Tenant channels | Message bus |
| Audit isolation | Per-tenant logs | Logging layer |

---

## Decision Framework

| Question | Recommendation |
|----------|----------------|
| Simple task handoff? | Direct communication |
| Complex collaboration? | Hierarchical swarm |
| Need consensus? | Voting protocol |
| Emergent behavior? | Flat swarm |
| Quality critical? | Add validator role |

---

## Implementation Example

### Multi-Agent Coordinator with Tenant Isolation

```python
# Example: Multi-agent coordinator with tenant boundaries
from dataclasses import dataclass
from typing import List, Dict, Any
import asyncio

@dataclass
class AgentMessage:
    sender_id: str
    recipient_id: str
    tenant_id: str
    message_type: str
    payload: Dict[str, Any]
    correlation_id: str

class TenantAgentCoordinator:
    """Coordinates multi-agent collaboration within tenant boundaries"""
    
    def __init__(self, tenant_id: str):
        self.tenant_id = tenant_id
        self.agents: Dict[str, 'Agent'] = {}
        self.message_queue: asyncio.Queue = asyncio.Queue()
    
    async def register_agent(self, agent_id: str, agent: 'Agent'):
        """Register agent to this tenant's coordination space"""
        if agent.tenant_id != self.tenant_id:
            raise ValueError("Cannot register agent from different tenant")
        self.agents[agent_id] = agent
    
    async def broadcast(self, sender_id: str, message: Dict[str, Any]):
        """Broadcast message to all agents in tenant"""
        for agent_id in self.agents:
            if agent_id != sender_id:
                await self.send_message(sender_id, agent_id, message)
    
    async def send_message(self, sender_id: str, recipient_id: str, payload: Dict):
        """Send tenant-isolated message between agents"""
        message = AgentMessage(
            sender_id=sender_id,
            recipient_id=recipient_id,
            tenant_id=self.tenant_id,  # Always enforce tenant boundary
            message_type="agent_message",
            payload=payload,
            correlation_id=generate_correlation_id()
        )
        await self.message_queue.put(message)
    
    async def vote(self, proposal: str, voters: List[str]) -> bool:
        """Simple majority voting within tenant agents"""
        votes = await asyncio.gather(*[
            self.agents[agent_id].cast_vote(proposal)
            for agent_id in voters
        ])
        return sum(votes) > len(voters) / 2
```

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Coordination patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `agent-coordination`, `agent-negotiation`
- **Runtime patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `agent-runtime`, `event-driven`

### Web Research

For current best practices, use the `web_queries` column from the pattern registry:

| Pattern | Web Search Query |
|---------|------------------|
| `agent-coordination` | `multi-agent coordination patterns {date}` |
| `agent-negotiation` | `agent negotiation protocols {date}` |
| Swarm patterns | `agent swarm orchestration {date}` |
| Consensus | `multi-agent consensus mechanisms {date}` |

**Note:** Replace `{date}` with the current year for up-to-date results.

## Related Workflows

- `bmad-bam-agent-runtime-architecture` - Design multi-agent coordination architecture
- `bmad-bam-tenant-model-isolation` - Configure tenant-scoped agent boundaries
- `bmad-bam-ai-eval-safety-design` - Design safety controls for agent collaboration
