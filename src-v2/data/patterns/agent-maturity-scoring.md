---
pattern_id: agent-maturity-scoring
shortcode: ZMS
category: lifecycle
qg_ref: QG-P1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Agent Maturity Scoring - BAM Pattern

**Loaded by:** ZMS  
**Applies to:** AI systems requiring agent readiness assessment for production deployment  
**See also:** [agent-registry.md](agent-registry.md), [ai-deployment.md](ai-deployment.md)

---

## When to Use

- Evaluating agent readiness for production
- Progressive rollout decisions
- Agent lifecycle governance
- Risk assessment for deployments

## When NOT to Use

- All agents at same maturity level
- No governance requirements
- Rapid prototyping phase

## Architecture

### Multi-Dimensional Assessment

```
┌─────────────────────────────────────────────────────────────┐
│                  Agent Maturity Scoring                      │
│                                                              │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                 Maturity Dimensions                      ││
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐    ││
│  │  │Testing  │  │Security │  │Ops      │  │Document │    ││
│  │  │Coverage │  │Posture  │  │Readiness│  │ation    │    ││
│  │  │ 4/5     │  │ 3/5     │  │ 5/5     │  │ 2/5     │    ││
│  │  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘    ││
│  └───────┼────────────┼────────────┼────────────┼──────────┘│
│          │            │            │            │            │
│          └────────────┴────────────┴────────────┘            │
│                            │                                 │
│                   ┌────────▼────────┐                        │
│                   │ Overall: 3.5/5  │                        │
│                   │ Level: Managed  │                        │
│                   └─────────────────┘                        │
│                                                              │
│  Levels: [1-Initial] [2-Basic] [3-Managed] [4-Advanced] [5] │
└─────────────────────────────────────────────────────────────┘
```

### Configuration Schema (P3-09)

```yaml
agent_maturity_scoring:
  version: "1.0.0"
  bam_controlled: true
  
  dimensions:
    testing:
      weight: float
      criteria:
        - unit_test_coverage
        - integration_tests
        - e2e_tests
        - chaos_tests
        
    security:
      weight: float
      criteria:
        - vulnerability_scan
        - secret_scan
        - rbac_configured
        - audit_logging
        
    operations:
      weight: float
      criteria:
        - monitoring_configured
        - alerting_configured
        - runbooks_exist
        - on_call_defined
        
    documentation:
      weight: float
      criteria:
        - api_documented
        - architecture_documented
        - deployment_documented
        
  scoring:
    scale: enum[1-5, 1-10, percentage]
    aggregation: enum[weighted_average, minimum, geometric_mean]
    
  levels:
    - name: "Initial"
      min_score: 0
      allowed_environments: [development]
      
    - name: "Basic"
      min_score: 2
      allowed_environments: [development, staging]
      
    - name: "Managed"
      min_score: 3
      allowed_environments: [development, staging, production_limited]
      
    - name: "Advanced"
      min_score: 4
      allowed_environments: [all]
      
    - name: "Optimized"
      min_score: 4.5
      allowed_environments: [all]
      
  enforcement:
    block_deployment_below: int
    require_approval_below: int
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Checklist-based | Simple | Subjective | Early adoption |
| Automated scoring | Objective | Setup effort | Mature orgs |
| Hybrid | Balanced | Complexity | Enterprise |


## Quality Checks

- [ ] Maturity criteria defined
- [ ] Scoring algorithm documented
- [ ] Progression thresholds set
- [ ] Review process established
- [ ] **CRITICAL:** No premature production promotion

## Web Research Queries

- "AI agent maturity model {date}"
- "agent readiness scoring framework {date}"
- "MLOps maturity assessment {date}"
- "production readiness checklist AI {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-P1 | Agent maturity score meets deployment threshold |

## Related Patterns

- [agent-registry.md](agent-registry.md) - Agent inventory
- [ai-deployment.md](ai-deployment.md) - Deployment patterns
