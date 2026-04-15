# Step 2: Tenant Rollout Planning

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices


---

## Purpose

Plan tenant-specific model rollout strategy. This includes defining rollout phases, tenant segmentation, and feature flag configuration.

---

## Prerequisites

- Step 1 completed (model quality validated)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `feature-rollout`
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`

---

## Actions

### 1. Define Rollout Strategy

Document rollout approach:

| Strategy | Description | Risk Level |
|----------|-------------|------------|
| Big Bang | All tenants at once | High |
| Canary | Small % first | Low |
| Staged | Tier by tier | Medium |
| Opt-in | Tenant chooses | Low |

Recommended: **Staged** for multi-tenant AI platforms

### 2. Segment Tenants

Group tenants for rollout:

| Phase | Tenant Segment | % of Traffic | Duration |
|-------|----------------|--------------|----------|
| 1 | Internal/test tenants | 0.5% | 1 day |
| 2 | FREE tier tenants | 10% | 3 days |
| 3 | PRO tier tenants | 40% | 5 days |
| 4 | ENTERPRISE tenants | 100% | Complete |

### 3. Configure Feature Flags

Define feature flag structure:

| Flag | Description | Default |
|------|-------------|---------|
| `model_v3_enabled` | Enable new model | false |
| `model_v3_rollout_pct` | Rollout percentage | 0 |
| `model_v3_enterprise_override` | Enterprise opt-in | false |

### 4. Define Success Criteria

Per-phase success criteria:

| Phase | Metric | Threshold | Action if Fail |
|-------|--------|-----------|----------------|
| 1 | Error rate | <1% | Halt rollout |
| 2 | Latency P95 | <600ms | Reduce traffic |
| 3 | Safety score | >0.95 | Rollback |
| 4 | Satisfaction | >4.0 | Monitor |

**Verify current best practices with web search:**
Search the web: "AI model rollout strategy multi-tenant {date}"
Search the web: "feature flag LLM deployment {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing rollout planning, if 'C' (Continue):
- Save rollout plan to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-rollback-testing.md`

---

## Verification

- [ ] Rollout strategy defined
- [ ] Tenants segmented
- [ ] Feature flags configured
- [ ] Success criteria defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Tenant rollout plan
- Feature flag configuration
- Success criteria matrix
- **Load template:** `{project-root}/_bmad/bam/data/templates/model-rollout-plan-template.md`

---

## Next Step

Proceed to `step-03-c-rollback-testing.md` to test model rollback procedures.
