# Agent Negotiation Protocols

**When to load:** When implementing multi-agent consensus, conflict resolution, or when user mentions agent voting, auctions, or contract-net protocols.

**Integrates with:** Architect (Nova persona), Dev agent, Platform architect

---

## Core Concepts

### What is Agent Negotiation?

Agent negotiation enables multiple AI agents to reach agreements, resolve conflicts, and make collective decisions in a multi-tenant SaaS environment. This is essential when agents have different perspectives or competing objectives.

### Negotiation Protocol Comparison

| Protocol | Use Case | Complexity | Tenant Isolation |
|----------|----------|------------|------------------|
| Voting | Simple majority decisions | Low | Per-decision |
| Auction | Resource allocation | Medium | Per-auction |
| Contract-Net | Task delegation | High | Per-contract |
| Consensus | Agreement on state | Very High | Per-consensus-group |

---

## Key Patterns

### Pattern 1: Voting Protocols

Agents vote on proposals to reach decisions.

| Voting Type | Description | Threshold |
|-------------|-------------|-----------|
| Simple Majority | >50% agreement | n/2 + 1 |
| Supermajority | >66% agreement | 2n/3 |
| Unanimous | 100% agreement | n |
| Weighted | Votes by authority | Configurable |

### Voting Flow

```
Proposal ──> Agents Vote ──> Tally ──> Decision
                │              │
         Tenant Context    Tenant Rules
```

### Voting Implementation

| Component | Purpose | Tenant Consideration |
|-----------|---------|---------------------|
| Proposal Registry | Track active votes | Tenant-scoped |
| Ballot Collection | Gather votes | Tenant-only agents |
| Tally Calculator | Count and weight | Tenant voting rules |
| Decision Publisher | Announce result | Tenant event bus |

### Pattern 2: Auction Protocols

Agents bid for resources or tasks.

| Auction Type | Flow | Use Case |
|--------------|------|----------|
| English | Ascending bids | Resource allocation |
| Dutch | Descending price | Quick assignment |
| Sealed-Bid | Hidden bids | Fair competition |
| Vickrey | Second-price | Truthful bidding |

### Auction Architecture

```
Auctioneer
    │
    ├── Announce Item
    │       │
    ├── Collect Bids ←── Bidder Agents
    │       │
    ├── Determine Winner
    │       │
    └── Notify All
            │
      Tenant Scope
```

### Pattern 3: Contract-Net Protocol

Task delegation through proposal and bidding.

| Phase | Description | Tenant Consideration |
|-------|-------------|---------------------|
| Announcement | Manager broadcasts task | Tenant worker pool |
| Bidding | Workers submit proposals | Tenant capability match |
| Awarding | Manager selects winner | Tenant selection criteria |
| Execution | Winner performs task | Tenant resource limits |

### Contract-Net Flow

```
Manager: Task Announcement
         │
    ┌────┴────┐
    v         v
Worker A   Worker B  (Tenant Workers)
    │         │
    └────┬────┘
         │
    Bid Evaluation
         │
    Contract Award
         │
    Task Execution
```

### Pattern 4: Consensus Protocols

Agents agree on shared state or decisions.

| Protocol | Fault Tolerance | Latency |
|----------|-----------------|---------|
| Paxos | f < n/2 failures | Multiple rounds |
| Raft | f < n/2 failures | Leader-based |
| PBFT | f < n/3 Byzantine | Higher overhead |

---

## Application Guidelines

When implementing negotiation:

1. **Choose appropriate protocol** - Match complexity to requirements
2. **Define clear rules** - Explicit voting thresholds and tie-breakers
3. **Handle timeouts** - Agents may not respond in time
4. **Audit decisions** - Log all negotiation steps for compliance
5. **Isolate tenants** - Negotiations must not cross tenant boundaries

---

## Per-Tier Negotiation Limits

| Tier | Voting Participants | Auction Budget | Consensus Nodes |
|------|--------------------|--------------------|-----------------|
| Free | 3 | Limited | N/A |
| Pro | 10 | Tier-based | 5 |
| Enterprise | 50 | Custom | 20 |

---

## Conflict Resolution Strategies

| Strategy | When to Use | Implementation |
|----------|-------------|----------------|
| Priority-based | Clear hierarchy exists | Highest priority wins |
| Round-robin | Fair distribution | Rotate winner |
| Random | No clear preference | Cryptographic random |
| Escalation | Can't resolve locally | Human-in-the-loop |

---

## Negotiation Metrics

| Metric | Description | Target |
|--------|-------------|--------|
| Agreement Rate | Successful negotiations | >95% |
| Round Count | Iterations to decision | <5 |
| Timeout Rate | Failed negotiations | <5% |
| Fairness Score | Winner distribution | Balanced |

---

## Common Pitfalls and Anti-Patterns

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| No timeout | Endless negotiation | Set max rounds/time |
| Cross-tenant voting | Data leakage | Enforce tenant boundaries |
| Missing audit | Can't explain decisions | Log all votes/bids |
| Single point of failure | Auctioneer crash | Replicated coordinators |
| Gaming | Agents exploit rules | Randomization, penalties |

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| When to use voting vs auction? | Voting for binary decisions; auction for resource allocation | Voting is simpler; auctions handle value-based allocation |
| How to handle ties? | Random selection or escalation to human | Avoids deadlock while maintaining fairness |
| When is consensus overkill? | Single decision-maker scenarios | Consensus adds latency; use only when agreement is required |
| How to prevent collusion? | Sealed bids and random timing | Reduces ability for agents to coordinate unfairly |

---

## Related Workflows

- `bmad-bam-agent-runtime-architecture` - Configure negotiation framework
- `bmad-bam-ai-eval-safety-design` - Validate negotiation safety
- `create-master-architecture` - Integrate negotiation into platform

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Negotiation patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `agent-negotiation`
- **Coordination patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `agent-coordination`
- **Multi-agent:** `{project-root}/_bmad/bam/data/agent-guides/bam/multi-agent-coordination.md`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "agent negotiation protocols {date}"
- Search: "multi-agent consensus {date}"
- Search: "contract-net protocol AI agents {date}"
