# BAM Tier UX Patterns Guide

**When to load:** During tier differentiation design, upgrade flow optimization, feature gating UX, or when implementing tier-based user experiences for multi-tenant SaaS platforms.

**Integrates with:** Emma (UX Designer), Freya (WDS UX), Chad (PM), ux-bam extension, wds-freya-bam extension.

---

## Core Concepts

### Tier Presentation Strategies

| Strategy | Description | Use Case |
|----------|-------------|----------|
| Feature Comparison | Side-by-side tier comparison | Pricing page |
| Progressive Disclosure | Show features as needed | In-product |
| Upgrade Prompts | Contextual upgrade CTAs | Feature discovery |
| Usage Indicators | Show limits and usage | Dashboard |
| Graceful Degradation | Basic version of locked features | Trial experience |

### Tier Feature States

| State | Visual Treatment | Behavior |
|-------|------------------|----------|
| Available | Normal | Full functionality |
| Limit Warning | Yellow indicator | Usage approaching limit |
| Limit Reached | Orange indicator | Blocked until upgrade/reset |
| Locked | Grayed + lock icon | Show upgrade path |
| Coming Soon | Badge | Teaser for future tier |
| Beta | Beta badge | Opt-in access |

### Upgrade Flow UX

```
┌─────────────────────────────────────────────────┐
│              Upgrade Flow                        │
│                                                  │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐  │
│  │  Trigger │───►│ Compare  │───►│ Confirm  │  │
│  │ (CTA)    │    │  Plans   │    │ Upgrade  │  │
│  └──────────┘    └──────────┘    └────┬─────┘  │
│                                       │         │
│                              ┌────────▼────────┐│
│                              │    Payment      ││
│                              │  (if needed)    ││
│                              └────────┬────────┘│
│                                       │         │
│                              ┌────────▼────────┐│
│                              │  Provisioning   ││
│                              │  + Onboarding   ││
│                              └─────────────────┘│
└─────────────────────────────────────────────────┘
```

### Feature Gating Patterns

| Pattern | Implementation | User Experience |
|---------|----------------|-----------------|
| Hard Gate | Feature hidden entirely | Clean but may frustrate |
| Soft Gate | Feature visible, locked | Drives curiosity |
| Trial Gate | Full access during trial | Try before buy |
| Usage Gate | Available until limit hit | Usage-based discovery |
| Time Gate | Available for limited time | Urgency driver |

### Upgrade Trigger Points

| Trigger | Location | Message Type |
|---------|----------|--------------|
| Feature click | In-app feature | Inline upgrade CTA |
| Limit reached | Dashboard/modal | Usage-based prompt |
| Trial ending | Email + in-app | Urgency + value prop |
| New feature launch | Announcement | Excitement |
| Competitor comparison | Marketing | Competitive positioning |

### Downgrade Considerations

| Aspect | Handling | UX Impact |
|--------|----------|-----------|
| Data over limit | Grace period + warning | Allow export first |
| Lost features | Graceful degradation | Show what's lost |
| User count | Block new, keep existing | No forced removal |
| Integrations | Disable, don't delete | Preserve config |

---

## Application Guidelines

When implementing tier UX in a multi-tenant context:

1. **Make value visible** - Show what higher tiers enable
2. **Don't punish free users** - Respect the relationship
3. **Time upgrades contextually** - Prompt when value is clear
4. **Enable self-service tier changes** - Reduce friction
5. **Handle downgrades gracefully** - Don't lose customer trust
6. **A/B test upgrade flows** - Optimize conversion without annoyance

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Show locked features? | Yes, with clear upgrade path | Drives discovery and upgrades |
| How often to prompt upgrade? | Once per session per feature | Avoid annoyance |
| Free tier limitations visible? | Yes, on pricing and in-app | Transparency builds trust |
| Downgrade confirmation? | Multi-step with data warning | Prevent accidental loss |
| Upgrade takes effect when? | Immediate for self-service | Meet expectation |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **UX patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `ux-*`
- **Tier patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `tier-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "SaaS tier upgrade UX patterns {date}"
- Search: "feature gating user experience {date}"
- Search: "pricing page conversion optimization {date}"

---

## Related Workflows

- `bmad-bam-pricing-tier-configuration` - Define tier features
- `bmad-bam-tenant-self-service-upgrade` - Design upgrade experience
- `bmad-bam-pricing-tier-configuration` - Map personas to tiers
