# Step 3: Design Price Versioning

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- **ALWAYS pause after presenting findings** and await user direction
- **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Configure pricing version management including grandfathering and migration.

---

## Prerequisites

- Feature gating configured (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: billing-integration

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- User feedback and refinements from previous steps

---

## Actions

### 1. Define Price Version Schema

| Attribute | Type | Description |
|-----------|------|-------------|
| version_id | string | Unique version identifier |
| effective_date | ISO8601 | When version becomes active |
| tiers | array | Tier configurations |
| status | enum | draft/active/deprecated |
| created_by | string | Creator audit |

### 2. Configure Grandfathering Policies

| Policy | Description | Duration |
|--------|-------------|----------|
| Price lock | Keep old price | 12 months |
| Feature lock | Keep old features | 6 months |
| Full grandfather | Keep everything | Indefinite |
| No grandfather | Immediate migration | 30 days notice |

### 3. Design Migration Automation

| Trigger | Action | Communication |
|---------|--------|---------------|
| New version active | Evaluate tenant eligibility | Email announcement |
| Grace period end | Apply new pricing | 30-day reminder |
| Forced migration | Execute migration | Final notice |
| Tenant opt-in | Immediate migration | Confirmation |

### 4. Configure Rollback Procedures

| Scenario | Rollback Action | Approval |
|----------|-----------------|----------|
| Bug in new version | Revert to previous | Engineering |
| Customer complaint | Individual revert | Support manager |
| Mass issues | Full rollback | Finance |

### 5. Define Version History

| Component | Retention | Access |
|-----------|-----------|--------|
| Price versions | Indefinite | Read-only |
| Migration logs | 7 years | Audit |
| Customer history | 7 years | Billing |

**Verify current best practices with web search:**
Search the web: "SaaS pricing versioning grandfathering {date}"
Search the web: "price migration best practices subscription {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the price versioning design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into versioning using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for versioning analysis
- **C (Continue)**: Accept versioning design and complete Create mode
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

---

## Soft Gate Checkpoint

**Steps 1-3 complete the pricing tier configuration design.**

Present summary of:
- Tier hierarchy and entitlements
- Feature gating system
- Price versioning and migration

Ask for confirmation before proceeding to Edit or Validate modes.

---

## Verification

- [ ] Price version schema defined
- [ ] Grandfathering policies documented
- [ ] Migration automation designed
- [ ] Rollback procedures specified
- [ ] Version history retention configured
- [ ] Patterns align with pattern registry

---

## Outputs

- Price versioning specification
- Grandfathering policy documentation
- Migration procedures
- **Load template:** `{project-root}/_bmad/bam/templates/pricing-tier-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/subscription-lifecycle-template.md`

---

## Next Step

Create mode complete. Proceed to Edit mode (`step-10-e-load-existing.md`) for modifications or Validate mode (`step-20-v-load-artifact.md`) for quality checks.
