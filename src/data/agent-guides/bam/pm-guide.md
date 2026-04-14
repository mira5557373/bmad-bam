# Product Manager Guide - BAM Extension

**When to load:** During Phase 2-3 (Planning/Solutioning) when managing cross-module features or metering, or when user mentions sagas, usage metering, feature planning, or tier rollouts.
**Integrates with:** Project Manager (bmad-agent-pm), project planning, sprint management

This guide provides BAM-specific context for product managers working on multi-tenant agentic AI platforms.

## Core Concepts

### Multi-Tenant Project Planning

Multi-tenant project planning coordinates work across modules while respecting tenant isolation boundaries and tier differentiation. Projects must account for cross-module dependencies, saga orchestration for complex features, and tier-specific rollout strategies. Planning complexity increases with the number of modules and tiers affected.

### Module Coordination

Module coordination ensures that features spanning multiple modules are delivered cohesively. This requires clear facade contracts, synchronized releases, and end-to-end testing across module boundaries. Coordination failures result in partial features, broken integrations, or inconsistent tenant experiences across tiers.

### Usage Metering Strategy

Usage metering strategy defines what actions are measured, how usage translates to billing, and what limits apply per tier. Effective metering aligns cost with value delivered, provides transparency to tenants, and enables self-service upgrades. Poor metering creates billing disputes and churn.

---

## Role Context

As a product manager on a BAM project, you focus on:
- Managing cross-module feature delivery via sagas
- Defining usage metering strategies per tenant tier
- Prioritizing tenant-impacting features
- Balancing platform vs tenant-specific needs

## Tenant Lifecycle Planning Framework

Plan features and capabilities aligned with tenant journey stages:

### Tenant Lifecycle Stages

| Stage | Duration | Primary Goals | Key Features Needed |
|-------|----------|---------------|---------------------|
| **Acquisition** | 0-7 days | Convert trial to paid | Self-service signup, quick wins, value demo |
| **Onboarding** | 7-30 days | Setup complete, first value | Guided setup, templates, success milestones |
| **Activation** | 30-90 days | Regular usage patterns | Core features, integrations, team invites |
| **Expansion** | 90+ days | Increased usage/tier | Advanced features, upsell triggers, power tools |
| **Renewal** | Annual | Continue relationship | ROI reporting, success reviews, loyalty benefits |
| **Churn Risk** | Any | Prevent departure | Win-back campaigns, support escalation, feedback |

### Feature Prioritization by Lifecycle Impact

| Feature Type | Lifecycle Impact | Priority Weight |
|-------------|------------------|-----------------|
| Reduces churn | High (direct revenue) | 1.5x |
| Enables upsell | High (revenue growth) | 1.4x |
| Accelerates onboarding | Medium (time to value) | 1.3x |
| Improves activation | Medium (stickiness) | 1.2x |
| Acquisition support | Variable (funnel) | 1.1x |
| Maintenance/tech debt | Foundation | 1.0x |

## Decision Framework

| Decision Area | Free Tier Approach | Pro Tier Approach | Enterprise Approach |
|--------------|-------------------|-------------------|---------------------|
| Feature Rollout | After Pro validation | Beta then GA | Early access |
| Usage Limits | Hard limits, upgrade prompts | Soft limits, overage billing | Custom negotiated |
| Support SLA | Community only | 24hr response | 4hr response |
| Customization | None | Self-service config | Dedicated resources |
| Pricing Model | Freemium | Per-seat + usage | Custom contract |
| Feedback Channel | In-app surveys | Direct email | Advisory board |

## Actionable Guidance

### Planning Cross-Module Features

1. **Map Feature to Modules** - Identify all modules involved in delivering the feature
2. **Define Saga Steps** - Document the sequence of operations across modules
3. **Identify Dependencies** - Determine which steps must complete before others
4. **Plan Failure Handling** - Define compensation actions for partial failures
5. **Allocate to Teams** - Assign module-specific work to appropriate teams
6. **Coordinate Releases** - Schedule synchronized releases across modules
7. **Test End-to-End** - Plan integration testing across module boundaries

### Defining Usage Metering Strategy

1. **Identify Billable Actions** - List all actions that should affect billing
2. **Define Metrics** - Specify how usage is measured (API calls, storage, etc.)
3. **Set Tier Thresholds** - Determine limits for each tier
4. **Design Overage Model** - Plan handling when limits are exceeded
5. **Build Reporting** - Create tenant-visible usage dashboards
6. **Alert Strategy** - Define notifications for approaching limits
7. **Reconciliation Process** - Plan for usage disputes and corrections

### Prioritizing Tenant Features

1. **Gather Inputs** - Collect feature requests, support tickets, analytics
2. **Segment by Tier** - Organize requests by tenant tier
3. **Assess Revenue Impact** - Estimate revenue potential per feature
4. **Evaluate Effort** - Get engineering estimates for implementation
5. **Calculate ROI** - Compare value delivered vs effort required
6. **Consider Strategic Fit** - Align with platform roadmap
7. **Communicate Decisions** - Share prioritization rationale with stakeholders

## Key Considerations

### Saga Orchestration
- Complex features span multiple modules
- Track saga state across tenant boundaries
- Handle partial failures gracefully

### Usage Metering
- Define metering events for billable actions
- Tier-based usage limits and quotas
- Usage reporting and analytics per tenant

### Feature Planning
- Consider tenant isolation impact
- Plan rollout strategies per tier
- Coordinate cross-module releases

## SaaS-Specific Considerations

### Tier-Based Product Strategy

**Free Tier Strategy:**
- Purpose: Lead generation, product-led growth
- Focus: Core value demonstration
- Limits: Designed to hit upgrade triggers
- Features: Must be valuable but leave room for growth

**Pro Tier Strategy:**
- Purpose: Primary revenue driver
- Focus: Team productivity and collaboration
- Limits: Generous but metered
- Features: Full product capability

**Enterprise Tier Strategy:**
- Purpose: High-value accounts
- Focus: Scale, security, compliance
- Limits: Custom agreements
- Features: Platform + customization + support

### Metering Best Practices

**What to Meter:**
- API calls (requests per time period)
- Compute time (agent execution seconds)
- Storage (data stored per tenant)
- Seats (team members)
- Features (premium capability usage)

**Metering Implementation Considerations:**
- Real-time vs batch metering tradeoffs
- Handling meter failures gracefully
- Providing usage visibility to tenants
- Supporting usage alerts and projections

### Multi-Tenant Roadmap Planning

| Planning Horizon | Focus | Tenant Input |
|-----------------|-------|--------------|
| Now-Next (0-3 months) | Committed features | Support tickets, bug reports |
| Later (3-6 months) | Planned features | Feature requests, interviews |
| Future (6-12 months) | Exploratory | Advisory board, market research |

### Cross-Tenant Analytics

**Product Metrics to Track:**
- Activation rate by tier
- Feature adoption by cohort
- Time to value by onboarding path
- Churn predictors by behavior
- Expansion triggers by usage pattern
- NPS/satisfaction by segment

### Balancing Platform vs Custom

| Request Type | Response Strategy |
|-------------|-------------------|
| Single tenant, low effort | Consider if generalizable |
| Single tenant, high effort | Enterprise custom work |
| Multiple tenants, low effort | Platform feature candidate |
| Multiple tenants, high effort | Roadmap evaluation |
| Compliance requirement | Must-do for segment |
| Competitive pressure | Strategic evaluation |

### Release Communication

**Tier-Specific Communications:**
- Free: In-app announcements, blog posts
- Pro: Email updates, changelog, webinars
- Enterprise: Account manager briefings, early notice

## Application Guidelines

When planning cross-module features:
1. Map all modules involved before starting development
2. Define saga steps with clear compensation actions for failures
3. Allocate work to teams with explicit cross-module dependencies
4. Coordinate release timing across all involved modules
5. Plan end-to-end testing that spans module boundaries

When defining metering strategy:
1. Identify all billable actions before implementation
2. Define clear metrics for how usage is measured
3. Set tier thresholds based on actual cost-to-serve data
4. Design overage handling that is transparent and fair
5. Build tenant-visible usage dashboards from day one

---

**Content by Audience:**
- End users: Feature benefits, how to use
- Admins: Configuration, impact on existing
- Developers: API changes, migration guides

## Related Workflows

- `bmad-bam-create-module-epics` - Create epics for module development
- `bmad-bam-cross-module-story` - Create stories that span multiple modules
- `bmad-bam-triage-module-complexity` - Triage and assess module complexity

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Planning patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `planning-*`
- **Quality gates:** `{project-root}/_bmad/bam/data/quality-gates.csv`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "SaaS product management multi-tenant {date}"
- Search: "B2B SaaS roadmap planning tenant tiers {date}"
- Search: "feature prioritization multi-tenant platforms {date}"
