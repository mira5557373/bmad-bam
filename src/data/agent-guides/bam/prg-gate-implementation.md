# BAM Production-Readiness Gate (PRG) Implementation Guide

**When to load:** During Phase 4 (Implementation) when preparing for production release,
or when user mentions PRG, production readiness, or go-live checklist.

**Integrates with:** Winston (Architect), Chad (PM), convergence-verification workflow

---

## Core Concepts

### PRG 10-Check Framework

The Production-Readiness Gate (PRG) requires ALL 10 checks to pass before any component enters production:

| # | Check | Category | Automation Level |
|---|-------|----------|------------------|
| 1 | Tenant isolation verified | Security | Automated |
| 2 | Action contracts validated | AI Safety | Automated |
| 3 | Rollback tested | Operations | Semi-auto |
| 4 | Audit trail complete | Compliance | Automated |
| 5 | Resource budgets configured | Cost | Automated |
| 6 | Confidence thresholds set | AI Safety | Manual |
| 7 | Loop bindings verified | Runtime | Automated |
| 8 | Observability instrumented | Operations | Automated |
| 9 | Chaos test passed | Resilience | Semi-auto |
| 10 | Human review sign-off | Governance | Manual |

### Check Categories

```
PRG Checks
├── Security (1)
│   └── Tenant isolation proof
├── AI Safety (2, 6)
│   ├── Contract validation
│   └── Threshold configuration
├── Operations (3, 8)
│   ├── Rollback verification
│   └── Observability check
├── Compliance (4)
│   └── Audit completeness
├── Cost (5)
│   └── Budget enforcement
├── Runtime (7)
│   └── Loop binding proof
├── Resilience (9)
│   └── Chaos engineering
└── Governance (10)
    └── Human approval
```

### PRG Outcomes

| Outcome | Criteria | Action |
|---------|----------|--------|
| **PASS** | All 10 checks green | Deploy to production |
| **CONDITIONAL** | 8-9 checks pass, no critical failures | Deploy with monitoring plan |
| **FAIL** | Any critical check fails | Block deployment, remediate |

### Critical vs Non-Critical Checks

| Critical (Block on Fail) | Non-Critical (Warn Only) |
|-------------------------|-------------------------|
| 1. Tenant isolation | 8. Observability |
| 2. Action contracts | 9. Chaos test |
| 4. Audit trail | |
| 6. Confidence thresholds | |
| 10. Human sign-off | |

## Application Guidelines

When implementing PRG:

1. **Automate what you can** - 6 of 10 checks can be fully automated
2. **Define clear ownership** - Each check has a responsible team
3. **Set SLAs for manual checks** - Human review within 4 hours
4. **Document exceptions** - Every CONDITIONAL needs justification

## Decision Framework

| Scenario | PRG Path | Timeline |
|----------|----------|----------|
| New agent | Full PRG (all 10) | 2-5 days |
| Agent update (minor) | Partial PRG (1,2,4,7) | 4-8 hours |
| Hotfix | Emergency PRG (1,2,10) | 1-2 hours |
| Config change | Mini PRG (1,7) | 30 minutes |

## Related Workflows

- `bmad-bam-prg-gate-setup` - Configure PRG automation
- `bmad-bam-convergence-verification` - Integration checks
- `bmad-bam-action-contract-design` - Contract validation

## Related Patterns

Load from pattern registry:

- **PRG patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `prg-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "production readiness gate AI systems {date}"
- Search: "multi-tenant deployment checklist {date}"
- Search: "AI agent go-live safety verification {date}"
