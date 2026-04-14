# Feature Toggle Patterns

**When to load:** When designing feature flag systems, implementing gradual rollouts, or when user mentions feature flags, A/B testing, or tenant-specific features.

**Integrates with:** Architect (Atlas persona), Dev agent, PM agent

---

## Core Concepts

### What are Feature Toggles?

Feature toggles (flags) control feature availability at runtime without code deployment. In multi-tenant SaaS, toggles enable tier-based features, gradual rollouts, and tenant-specific customization.

### Toggle Categories

| Category | Lifespan | Purpose | Example |
|----------|----------|---------|---------|
| Release | Days-weeks | Gradual rollout | New UI |
| Experiment | Weeks | A/B testing | Pricing page |
| Ops | Permanent | Kill switch | Rate limiter |
| Permission | Permanent | Tier gating | Advanced analytics |

### Feature Toggle Architecture

```
Feature Evaluation Request
    │
    ├── Extract context (tenant, user, tier)
    │
    ├── Check evaluation hierarchy
    │   ├── User override?
    │   ├── Tenant override?
    │   ├── Tier default?
    │   ├── Percentage rollout?
    │   └── Global default
    │
    ├── Cache result (TTL based)
    │
    └── Return boolean/variant
```

---

## Key Patterns

### Pattern 1: Toggle Evaluation Hierarchy

| Priority | Level | Example |
|----------|-------|---------|
| 1 | User override | Beta tester access |
| 2 | Tenant override | Enterprise feature |
| 3 | Tier default | Pro features |
| 4 | Percentage rollout | 10% of free users |
| 5 | Global default | Feature off |

### Evaluation Logic Example

| Flag | User Override | Tenant Override | Tier Default | % Rollout | Global | Result |
|------|---------------|-----------------|--------------|-----------|--------|--------|
| new_ui | - | true | false | - | false | true |
| beta_x | false | true | - | - | - | false |
| exp_y | - | - | true | 50% (in) | false | true |

### Pattern 2: Toggle Context

| Context | Description | Use Case |
|---------|-------------|----------|
| Tenant ID | Per-tenant toggle | Custom features |
| User ID | Per-user toggle | Beta access |
| Tier | Subscription level | Tier gating |
| Environment | Dev/staging/prod | Testing |
| Percentage | Random sample | Gradual rollout |

### Context Requirements by Toggle Type

| Toggle Type | Required Context | Optional Context |
|-------------|------------------|------------------|
| Release | Environment | User ID (percentage) |
| Experiment | User ID | Tenant ID |
| Ops | None | Tenant ID |
| Permission | Tenant ID, Tier | User ID |

### Pattern 3: Toggle Lifecycle

| Phase | Actions | Duration |
|-------|---------|----------|
| Create | Define flag, default off | - |
| Rollout | Gradual enable | Days-weeks |
| Stabilize | Monitor metrics | 1-2 weeks |
| Cleanup | Remove flag, hardcode | Sprint end |

### Toggle Naming Convention

| Category | Pattern | Example |
|----------|---------|---------|
| Release | `release_<feature>` | `release_new_dashboard` |
| Experiment | `exp_<name>_<variant>` | `exp_pricing_v2` |
| Ops | `ops_<system>_<action>` | `ops_ai_circuit_breaker` |
| Permission | `tier_<feature>` | `tier_advanced_analytics` |

---

## Decision Criteria

### When to Use Feature Toggles

| Scenario | Use Toggle | Alternative |
|----------|------------|-------------|
| Gradual rollout | Yes | - |
| Tier gating | Yes | - |
| A/B testing | Yes | - |
| Configuration | Sometimes | Config service |
| Environment-specific | Sometimes | Env variables |
| Long-lived branches | No | Feature branches |

### Toggle System Selection

| Factor | Simple (Config) | Managed Service | Self-hosted |
|--------|-----------------|-----------------|-------------|
| Scale | Small | Large | Medium-Large |
| Cost | Free | Per-seat pricing | Infrastructure |
| Features | Basic | Full (A/B, analytics) | Customizable |
| Maintenance | Low | None | High |

---

## Application Guidelines

- Implementing tiered feature access
- Designing gradual rollout strategy
- Building A/B testing infrastructure
- Creating operational kill switches
- Supporting tenant-specific customization

---

## Per-Tier Feature Access

| Toggle Type | Free | Pro | Enterprise |
|-------------|------|-----|------------|
| Core features | All | All | All |
| Advanced features | None | All | All |
| Beta features | None | Opt-in | Opt-in |
| Custom features | None | None | Configurable |

---

## Toggle Technical Implementation

| Approach | Pros | Cons |
|----------|------|------|
| Config file | Simple | Requires deploy |
| Database | Dynamic | Query overhead |
| Feature service | Full-featured | Infrastructure |
| CDN edge | Low latency | Complexity |

---

## Common Pitfalls and Anti-Patterns

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| Toggle debt | Too many stale flags | Scheduled cleanup |
| Nested toggles | Testing nightmare | Flatten, reduce combinations |
| No default | Undefined behavior | Always set global default |
| Long-lived toggles | Permanent complexity | Lifecycle management |
| No audit trail | Unclear history | Log toggle changes |
| Missing metrics | Unknown impact | Track toggle-correlated metrics |

### Toggle Cleanup Checklist

- [ ] Verify feature fully rolled out
- [ ] Check no dependent toggles
- [ ] Remove toggle evaluation code
- [ ] Update tests to not mock toggle
- [ ] Delete toggle from system
- [ ] Update documentation

### Toggle Testing Strategy

| Test Type | Approach | Coverage |
|-----------|----------|----------|
| Unit tests | Mock toggle values | All combinations |
| Integration | Test key scenarios | Critical paths |
| E2E | Test default state | Happy path |
| Experiment | Statistical validation | A/B significance |

---

## Integration with BAM Patterns

| Pattern | Integration Point | Purpose |
|---------|-------------------|---------|
| Tenant Customization | Tier-based toggles | Feature gating |
| API Gateway | Toggle header injection | Edge evaluation |
| Context Propagation | Toggle context passing | Consistent evaluation |
| Observability | Toggle-aware metrics | Impact measurement |
| Experimentation | A/B test toggles | Variant assignment |

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Should I use feature toggles for tier-based feature gating? | Yes, use permission toggles with tenant tier in evaluation context | Enables dynamic feature access without code deployment; supports immediate tier upgrades/downgrades |
| How should I handle toggle evaluation performance in multi-tenant systems? | Cache toggle decisions per tenant with TTL-based refresh | Avoids per-request toggle evaluation overhead while maintaining reasonable freshness for tier changes |
| When should feature toggles be cleaned up? | Within 2 sprints after 100% rollout or experiment conclusion | Toggle debt creates testing complexity and cognitive overhead; scheduled cleanup prevents accumulation |
| Should I allow tenant-specific toggle overrides? | Yes, but limit to Enterprise tier and require audit logging | Provides customization flexibility for key accounts while maintaining platform coherence for standard tiers |
| How should A/B experiments respect tenant boundaries? | Assign variants at tenant or user level, never split within tenant | Prevents inconsistent experience for users in same organization; ensures valid experiment results |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Feature patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `experimentation`, `deployment`, `customization`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "feature flag multi-tenant SaaS {date}"
- Search: "LaunchDarkly Flagsmith comparison {date}"
- Search: "feature toggle best practices {date}"
- Search: "feature flag testing strategies {date}"

## Related Workflows

- `bmad-bam-tenant-tier-migration` - Manage feature access during tier transitions
- `bmad-bam-tenant-onboarding-design` - Configure feature flags for new tenant provisioning
- `bmad-bam-create-module-architecture` - Design toggle evaluation as cross-cutting concern
- `bmad-bam-chaos-engineering-design` - Test feature flag combinations across tenant tiers
