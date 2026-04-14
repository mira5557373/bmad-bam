# Step 2: Design Rollout Strategy

## Purpose

Design progressive rollout strategies for safe feature releases.

## MANDATORY EXECUTION RULES

**FOLLOW THESE RULES WITHOUT EXCEPTION:**

1. **COMPLETE EVERY STEP** - Execute all steps in sequence
2. **NO PARTIAL COMPLETIONS** - Finish what you start
3. **VERIFY OUTPUTS** - Confirm each step produces expected results
4. **DOCUMENT DECISIONS** - Record all choices made

---

## Prerequisites

- Step 1 completed

**Web Research (Required):**

Search the web: "progressive feature rollout best practices {date}"
Search the web: "feature flag strategies multi-tenant SaaS patterns {date}"

Document findings with citations: _Source: [URL]_

---

## Actions

### 1. Rollout Stages

| Stage | Coverage | Duration | Gate |
|-------|----------|----------|------|
| Internal | Employees only | 1 week | Manual |
| Alpha | 1% tenants | 1 week | Metrics |
| Beta | 10% tenants | 2 weeks | Metrics |
| GA | 100% tenants | N/A | Stable |

### 2. Tenant Selection Criteria

| Criteria | Alpha | Beta |
|----------|-------|------|
| Tier | Any | PRO + Enterprise |
| Size | Small | Mixed |
| Risk tolerance | High | Medium |
| Support relationship | Strong | Any |
| Opt-in | Required | Optional |

### 3. Rollout Templates

| Template | Stages | Use Case |
|----------|--------|----------|
| Cautious | Internal → 1% → 5% → 25% → 100% | High-risk |
| Standard | Internal → 10% → 50% → 100% | Medium-risk |
| Fast | Internal → 50% → 100% | Low-risk |
| Instant | 100% immediately | Hot fixes |

### 4. Gate Criteria

| Metric | Threshold | Action if Failed |
|--------|-----------|------------------|
| Error rate | < 0.1% increase | Pause rollout |
| Latency | < 10% increase | Investigate |
| Adoption | > 50% of target | Continue |
| Support tickets | < 2x baseline | Review |

**Soft Gate:** Steps 1-2 complete flags and strategy. Confirm before proceeding to monitoring.

---

## COLLABORATION MENUS (A/P/C):

```
- **C (Continue)**: Proceed to monitoring design
```

#### If 'C' (Continue):
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to: `step-03-c-design-monitoring.md`

---

## Verification

- [ ] Rollout stages defined
- [ ] Tenant selection criteria specified
- [ ] Templates documented
- [ ] Gate criteria established

---

## Outputs

- Rollout stage definitions with duration and gates
- Tenant selection criteria for alpha and beta
- Rollout template specifications by risk level
- Gate criteria with failure actions
- Design decisions documented in frontmatter
- **Load template:** `{project-root}/_bmad/bam/templates/feature-rollout-template.md`

---

## Next Step

Proceed to `step-03-c-design-monitoring.md`.
