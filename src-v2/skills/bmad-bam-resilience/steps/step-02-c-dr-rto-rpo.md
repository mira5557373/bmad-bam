# Step 2: Define RTO/RPO Targets

## Purpose

Establish Recovery Time Objective (RTO) and Recovery Point Objective (RPO) targets for each tenant tier, ensuring appropriate service level differentiation.

## Prerequisites

- Resilience focus selected (Step 1 complete)
- Tenant tiers defined in master architecture
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `disaster-recovery`

## Execution Protocols

```
🔍 Use web search to verify current best practices
Search the web: "multi-tenant SaaS RTO RPO best practices {date}"
Search the web: "disaster recovery tier differentiation {date}"
📋 Reference pattern registry for decision criteria
🎯 Focus on tenant-aware resilience
```

## Actions

### 1. Define Tier-Based Targets

Establish RTO/RPO per tenant tier:

| Tier | RTO Target | RPO Target | Rationale |
|------|------------|------------|-----------|
| Free | 24 hours | 24 hours | Best-effort recovery |
| Pro | 4 hours | 1 hour | Business continuity |
| Enterprise | 15 minutes | 5 minutes | Mission-critical |

### 2. Identify Data Categories

Map data types to RPO requirements:

| Data Category | RPO Requirement | Backup Strategy |
|---------------|-----------------|-----------------|
| Tenant configuration | 1 hour | Continuous replication |
| Transactional data | Per-tier | Point-in-time recovery |
| Audit logs | 24 hours | Daily snapshots |
| AI model state | Per-tier | Checkpoint-based |

### 3. Define Recovery Priorities

Establish recovery sequence:

| Priority | Component | Dependency | Recovery Order |
|----------|-----------|------------|----------------|
| P1 | Authentication | None | First |
| P2 | Tenant routing | Authentication | Second |
| P3 | Core services | Tenant routing | Third |
| P4 | AI runtime | Core services | Fourth |

### 4. Document SLA Alignment

Map RTO/RPO to contractual SLAs:

| Tier | Uptime SLA | RTO Commitment | RPO Commitment |
|------|------------|----------------|----------------|
| Free | 95% | Best effort | Best effort |
| Pro | 99.5% | 4 hours | 1 hour |
| Enterprise | 99.9% | 15 minutes | 5 minutes |

## Verification

- [ ] RTO targets defined per tier
- [ ] RPO targets defined per tier
- [ ] Data categories mapped to RPO
- [ ] Recovery priorities established
- [ ] SLA alignment documented
- [ ] Tenant isolation maintained in recovery scenarios

## Outputs

- RTO/RPO specification document
- Recovery priority matrix
- SLA alignment mapping

## Next Step

Proceed to `step-03-c-dr-failover.md` to design failover procedures.
