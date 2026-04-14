# BAM Tier UX Context

**When to load:** During UX design phase for tier-based experiences, upgrade flows, or entitlement UI.

**Integrates with:** Sally (UX Designer), Freya (WDS UX)

---

## Core Concepts for Tier UX

### Tier Differentiation Patterns

| Pattern | Usage | Example |
|---------|-------|---------|
| Soft gate | Show feature, disable with upgrade prompt | Grayed button with "Upgrade to Pro" |
| Hard gate | Hide feature entirely | Menu item not visible |
| Limit indicator | Show usage vs limit | "3 of 5 agents used" |
| Upgrade nudge | Contextual upsell | "Unlock unlimited agents" |

### Upgrade Flow UX

```
User hits limit
    ↓
Show contextual upgrade modal
    ↓
Display tier comparison
    ↓
One-click upgrade (Pro)
    or
Contact sales form (Enterprise)
    ↓
Confirmation + immediate access
```

### Tier-Specific Journeys

| Journey | Free | Pro | Enterprise |
|---------|------|-----|------------|
| Onboarding | Self-serve, minimal | Guided, templates | White-glove, custom |
| Support | Community | Email, 24h | Dedicated, SLA |
| Branding | Platform branding | Custom logo | Full white-label |
| Admin | Basic | Team admin | Org admin + audit |

---

## Design Principles

### Progressive Disclosure

Design tier experiences using progressive disclosure principles:

1. **Start Simple**: Free tier users see a clean, focused interface with core features prominently displayed. Advanced features are visible but clearly marked as premium.

2. **Reveal Value**: As users explore, show contextual previews of premium features. Use tooltips, previews, and sample outputs to demonstrate value before asking for upgrade.

3. **Reduce Friction**: Upgrade flows should be seamless. Pre-fill billing information where possible, offer trial periods, and provide immediate access upon upgrade completion.

### Tier-Specific Onboarding

Each tier requires different onboarding approaches:

**Free Tier Onboarding**:
- Quick start wizard (under 2 minutes)
- Template-based setup for immediate value
- In-app guides for self-service learning
- Community forum links for support

**Pro Tier Onboarding**:
- Guided setup with best practices
- Integration assistance (API keys, webhooks)
- Team invitation and collaboration setup
- Priority email support introduction

**Enterprise Tier Onboarding**:
- Dedicated onboarding specialist
- Custom configuration assistance
- SSO and compliance setup
- Training sessions for team leads

### Feature Gating Strategies

Choose appropriate gating strategies based on feature type:

| Strategy | When to Use | UX Pattern |
|----------|-------------|------------|
| Soft Gate | High-value features that drive upgrades | Show preview, disable with upgrade CTA |
| Hard Gate | Features requiring tier-specific infrastructure | Hide completely from lower tiers |
| Usage Gate | Consumption-based limits | Show usage meter with threshold warnings |
| Time Gate | Trial-based access | Countdown timer with conversion prompt |

---

## Application Guidelines

1. **Value demonstration** - Show what's possible before upgrade
2. **Frictionless upgrade** - One-click for self-serve tiers
3. **Clear comparison** - Feature matrix on upgrade pages
4. **Contextual nudges** - Upgrade prompts at limit points
5. **Graceful limits** - Soft limits before hard blocks

### UX Quality Checklist

- [ ] Upgrade flows complete in under 3 clicks
- [ ] Feature comparison clearly shows tier differences
- [ ] Limit warnings appear at 80% usage threshold
- [ ] Enterprise contact flow captures qualification data
- [ ] Downgrade flows include data retention options

---

## Integration with BAM Workflows

- WDS workflows with BAM extension
- UX design with tier considerations

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **UX patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `ux-*`
- **Tenant models:** `{project-root}/_bmad/bam/data/tenant-models.csv`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "SaaS tier-based UX patterns {date}"
- Search: "freemium to premium UX design {date}"
- Search: "B2B SaaS upgrade flow optimization {date}"

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|---------------|-----------|
| When to use soft gate vs hard gate for features? | Soft gate for features that demonstrate value; hard gate for infrastructure-dependent features | Soft gates drive upgrade interest; hard gates prevent support burden |
| At what usage percentage to show limit warnings? | Begin warnings at 80% of limit; urgent at 95% | Early warning enables planning; urgent prompts before hard block |
| How many clicks should upgrade flow take? | Maximum 3 clicks for self-serve tiers; form submission for enterprise | Friction reduces conversion; enterprise requires qualification |
| When to show tier comparison vs contextual upgrade? | Contextual at limit moments; comparison in settings/billing areas | Contextual converts in-moment; comparison supports research phase |
| How to handle downgrade UX? | Clear data retention policy, grace period options, easy re-upgrade path | Reduces churn anxiety; maintains relationship for future upgrade |

## Related Workflows

- `bmad-bam-tenant-tier-migration` - Implement upgrade and downgrade flows
- `bmad-bam-tenant-onboarding-design` - Design tier-specific onboarding UX
- `bmad-bam-tenant-billing-integration` - Integrate billing with upgrade flows
- `bmad-bam-define-facade-contract` - Define tier entitlement API contracts