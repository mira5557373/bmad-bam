# Step 1: Design Feature Flags

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 🔍 Use web search to verify current best practices when making technology decisions

---

## Purpose

Design feature flag infrastructure for per-tenant feature control.

---

## Prerequisites

- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: experimentation`

---

## Actions

### 1. Flag Types

| Type | Use Case | Granularity |
|------|----------|-------------|
| Release | New feature rollout | Tenant/user |
| Experiment | A/B testing | User segment |
| Ops | Operational controls | System-wide |
| Kill switch | Emergency disable | Global |
| Permission | Tier-based access | Tenant |

### 2. Flag Schema

| Field | Type | Description |
|-------|------|-------------|
| key | String | Unique identifier |
| name | String | Human-readable |
| type | Enum | release/experiment/ops/kill/permission |
| default | Boolean | Default state |
| targeting | JSON | Targeting rules |
| variants | Array | Multiple values |
| metadata | JSON | Description, owner, jira |

### 3. Targeting Rules

| Rule Type | Example | Use Case |
|-----------|---------|----------|
| Tenant ID | tenant_id in [abc, def] | Specific tenants |
| Tier | tier == "enterprise" | Tier-based |
| Percentage | random < 10% | Gradual rollout |
| Date | date > 2026-05-01 | Scheduled |
| Custom | attribute == value | Segment |

### 4. Flag Evaluation

| Context | Provided By | Example |
|---------|-------------|---------|
| Tenant ID | Authentication | tenant_123 |
| User ID | Authentication | user_456 |
| Tier | Tenant metadata | PRO |
| Region | Tenant config | us-east-1 |
| Custom | Application | plan_type |

**Verify current best practices with web search:**
Search the web: "feature flag best practices multi-tenant {date}"
Search the web: "feature flag architecture SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
- **C (Continue)**: Proceed to rollout strategy design
```

#### If 'C' (Continue):
- Update frontmatter `stepsCompleted: [1]`
- Proceed to: `step-02-c-design-rollout-strategy.md`

---

## Verification

- [ ] Flag types defined
- [ ] Schema documented
- [ ] Targeting rules specified
- [ ] Evaluation context established

---

## Outputs

- Feature flag type catalog with granularity specifications
- Flag schema definition with field descriptions
- Targeting rule specifications with examples
- Evaluation context requirements
- Design decisions documented in frontmatter
- **Load template:** `{project-root}/_bmad/bam/templates/feature-flags-template.md`

---

## Next Step

Proceed to `step-02-c-design-rollout-strategy.md`.
