# Product Owner Guide - BAM Extension

**When to load:** During Phase 2-3 (Planning/Solutioning) when defining tier strategies, prioritizing features across tiers, or planning tenant-aware roadmaps. Load when user mentions pricing tiers, feature gating, upgrade paths, or product roadmap for multi-tenant platforms.
**Integrates with:** PM (bmad-agent-pm), backlog management, feature prioritization

This guide provides BAM-specific context for product owners responsible for strategic decisions in multi-tenant agentic AI platforms.

## Core Concepts

### Multi-Tenant Backlog

Multi-tenant backlog management requires organizing work items by their impact across tenant tiers and platform infrastructure. Unlike single-tenant products, each backlog item must be evaluated for tier applicability, isolation implications, and cost-to-serve alignment. The backlog structure should make tier impact visible and support tier-aware prioritization decisions.

### Tier Prioritization

Tier prioritization weighs feature value differently based on which tiers are affected and the revenue impact of each tier. Enterprise features may have higher absolute value per customer while Free tier features drive funnel volume. Effective prioritization balances immediate revenue impact with long-term growth and platform health considerations.

### Feature Gating Strategy

Feature gating strategy defines how capabilities are distributed across pricing tiers to maximize both customer value and revenue. Gates should feel natural rather than artificial, creating genuine upgrade desire through value demonstration rather than frustration. The strategy must be consistently enforced across UI, API, and backend to maintain trust.

---

## Role Context

As a product owner on a BAM project, you focus on:
- Defining tier strategies that maximize conversion and retention
- Deciding feature placement across FREE, PRO, and ENTERPRISE tiers
- Building upgrade paths that align value delivery with pricing
- Planning roadmaps that balance platform stability with tier-specific features
- Managing the tension between viral growth (FREE) and revenue (paid tiers)

## Key Considerations

### Tier Strategy Design

Each pricing tier represents a distinct product offering with its own value proposition, target persona, and success metrics. The tier structure must create clear upgrade incentives while delivering genuine value at each level.

Key questions to answer:
- What is the primary job-to-be-done for each tier persona?
- What friction or limit naturally drives upgrades?
- What value keeps tenants retained at each tier?
- How does cost-to-serve vary by tier?

### Feature Gating Decisions

Every feature requires a tier placement decision. Consider:
- **Cost sensitivity**: Features with high infrastructure cost should be gated
- **Competitive necessity**: Table-stakes features should be widely available
- **Adoption driving**: Features that help users discover value consider for FREE
- **Enterprise requirements**: Compliance, audit, SSO are ENTERPRISE gates

### Roadmap Planning

Multi-tenant roadmaps must consider impact on different tenant segments:
- Platform track (40%): Infrastructure and stability benefits all tiers
- Tier features track (35%): Conversion and retention driving features
- Cross-cutting track (25%): General improvements for all tenants

## Decision Framework

Use this framework to make tier placement and feature gating decisions:

| Situation | Recommendation | Rationale |
|-----------|---------------|-----------|
| Feature has high infrastructure cost | Gate to PRO or ENTERPRISE | Cost-to-serve alignment |
| Feature is table-stakes in market | Include in FREE tier | Competitive necessity |
| Feature drives user activation | Include in FREE tier | Increases conversion funnel |
| Feature requires compliance/audit | Gate to ENTERPRISE | Only enterprise needs this |
| Feature enables team collaboration | Gate to PRO or ENTERPRISE | Natural upgrade trigger |
| Feature has security implications | Gate to ENTERPRISE | Higher accountability |
| Feature is viral/shareable | Include in FREE tier | Organic growth driver |
| Feature requires dedicated support | Gate to ENTERPRISE | Support cost alignment |

## Common Pitfalls

- **Overloading FREE tier:** Too many features in FREE reduces upgrade incentive. Focus on core value that creates desire for more.
- **Unclear upgrade triggers:** Users should naturally hit limits that prompt upgrades. Design friction points that align with value received.
- **Ignoring cost-to-serve:** Features with high infrastructure cost in FREE tier will hurt unit economics as you scale.
- **Tier complexity:** More than 3-4 tiers creates decision paralysis. Keep tier structure simple and differentiation clear.
- **Inconsistent enforcement:** Feature gates must be consistently enforced across UI, API, and backend. Partial enforcement damages trust.
- **Missing usage analytics:** Without data on feature usage by tier, you cannot optimize placement. Instrument everything from day one.

## Application Guidelines

When managing the multi-tenant product backlog:
1. Always assign tier applicability during backlog grooming, not after development
2. Calculate cost-to-serve impact for every feature before prioritization
3. Validate tier placement decisions with usage data quarterly
4. Include multi-tenant isolation requirements in acceptance criteria
5. Maintain clear upgrade triggers that align with value delivery

When making feature gating decisions:
1. Involve cross-functional input from engineering, sales, and support
2. Test gate effectiveness with A/B experiments where possible
3. Document exceptions process for temporary or special access
4. Plan migration path before moving features between tiers
5. Monitor gate impact on conversion and retention metrics

---

## Actionable Guidance

### Designing Tier Strategy

1. **Define tier personas** - Create detailed profiles for FREE, PRO, and ENTERPRISE users
2. **Map jobs-to-be-done** - Identify primary use cases for each tier
3. **Set value metrics** - Define what success looks like at each tier (active users, data processed, etc.)
4. **Design upgrade triggers** - Identify natural friction points that prompt upgrades
5. **Calculate cost-to-serve** - Estimate infrastructure cost per user at each tier
6. **Validate with customers** - Test tier structure with representative users from each segment
7. **Plan iteration cycle** - Schedule quarterly tier strategy reviews

### Prioritizing the Multi-Tenant Backlog

1. **Categorize by track** - Assign each item to Platform (40%), Tier Features (35%), or Cross-cutting (25%)
2. **Score impact by tier** - Rate impact on FREE conversion, PRO retention, ENTERPRISE expansion
3. **Estimate development cost** - Include multi-tenant complexity factors
4. **Calculate ROI score** - Combine impact and cost for prioritization
5. **Consider dependencies** - Platform work often unblocks tier features
6. **Balance short and long term** - Mix quick wins with foundational investments
7. **Review with stakeholders** - Align with sales, support, and engineering leadership

### Managing Feature Gating Decisions

1. **Document decision criteria** - Create transparent framework for tier placement
2. **Involve cross-functional input** - Include engineering, sales, and support perspectives
3. **Test with usage data** - Use analytics to validate or adjust placement
4. **Plan migration path** - When moving features between tiers, communicate clearly
5. **Monitor gate effectiveness** - Track conversion and retention impact
6. **Handle edge cases** - Define process for exceptions and temporary access
7. **Update regularly** - Revisit gate decisions as product and market evolve

## Related Workflows

- `bmad-bam-create-module-epics` - Create tier-aware epic structure for modules
- `bmad-bam-cross-module-story` - Write stories that span tier boundaries
- `bmad-bam-requirement-ingestion` - Capture tier requirements from stakeholders

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Product patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `product-*`
- **Tenant models:** `{project-root}/_bmad/bam/data/tenant-models.csv`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "B2B SaaS product ownership patterns {date}"
- Search: "multi-tenant feature tier management {date}"
- Search: "SaaS backlog management tenant priorities {date}"
