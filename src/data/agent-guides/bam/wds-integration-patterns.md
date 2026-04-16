# BAM WDS Integration Patterns Guide

**When to load:** During WDS (Workflow Design System) integration, persona-driven design, UX research integration, or when combining WDS agents with multi-tenant SaaS workflows.

**Integrates with:** Saga (WDS Analyst), Freya (WDS UX), Winston (Architect), wds-saga-bam extension, wds-freya-bam extension.

---

## Core Concepts

### WDS Agent Coexistence Model

| BMM Agent | WDS Agent | Coexistence | BAM Extension |
|-----------|-----------|-------------|---------------|
| Mary (Analyst) | Saga (Analyst) | Both active | analyst-bam + wds-saga-bam |
| Emma (UX) | Freya (UX) | Both active | ux-bam + wds-freya-bam |

### Integration Points

```
┌─────────────────────────────────────────────────┐
│         BMM + WDS + BAM Integration              │
│                                                  │
│  ┌──────────┐         ┌──────────┐             │
│  │   BMM    │◄───────►│   WDS    │             │
│  │  Agents  │         │  Agents  │             │
│  │ (Mary,   │         │ (Saga,   │             │
│  │  Emma)   │         │  Freya)  │             │
│  └────┬─────┘         └────┬─────┘             │
│       │                    │                    │
│       └────────┬───────────┘                    │
│                │                                │
│         ┌──────▼──────┐                        │
│         │    BAM      │                        │
│         │ Extensions  │                        │
│         │ (31 total)  │                        │
│         └──────┬──────┘                        │
│                │                                │
│         ┌──────▼──────┐                        │
│         │ Multi-Tenant│                        │
│         │ Capabilities│                        │
│         └─────────────┘                        │
└─────────────────────────────────────────────────┘
```

### WDS Workflow Integration

| WDS Workflow | BAM Enhancement | Multi-Tenant Aspect |
|--------------|-----------------|---------------------|
| Persona Research | Tier-based personas | Persona per tier |
| Journey Mapping | Tenant journeys | Onboarding/offboarding paths |
| UX Audit | Tier UX comparison | Feature gating UX |
| Design System | Multi-tenant theming | White-labeling support |

### Persona-Tier Mapping

| Persona Type | Tier Mapping | Design Considerations |
|--------------|--------------|----------------------|
| Free User | Basic features | Upgrade prompts, limits visible |
| Pro User | Standard features | Full functionality, support access |
| Enterprise Admin | All features | Admin console, SSO, audit |
| Platform Admin | Internal tools | Multi-tenant management |

### WDS Data in Multi-Tenant Context

| WDS Artifact | Tenant Scope | Sharing |
|--------------|--------------|---------|
| Personas | Per-tenant customizable | Platform defaults |
| Journeys | Tier-specific defaults | Tenant can override |
| Design Tokens | Tenant-branded | Inherit from tier |
| Research Data | Never shared | Tenant-isolated |

### Integration Workflow Order

| Phase | BMM/WDS Activity | BAM Enhancement |
|-------|-----------------|-----------------|
| Discovery | Saga persona research | Add tier dimension |
| Planning | Mary requirements | Add multi-tenant requirements |
| Design | Freya UX design | Add tier UX differentiation |
| Architecture | Winston design | Add tenant isolation |
| Development | James implementation | Add tenant context |
| Testing | TEA testing | Add tenant test fixtures |

---

## Application Guidelines

When integrating WDS with BAM in a multi-tenant context:

1. **Use both BMM and WDS agents** - They coexist, not replace
2. **Add tier dimension to personas** - Each tier has distinct user types
3. **Map journeys to tenant lifecycle** - Include onboarding/offboarding
4. **Apply tenant context to UX research** - Segment findings by tier
5. **Enable white-labeling in design system** - Support tenant customization
6. **Isolate research data** - Tenant feedback never leaks

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Which analyst for multi-tenant? | Both Mary (BMM) + Saga (WDS) with BAM extensions | Complementary capabilities |
| How to handle tier personas? | Create tier variants of core personas | Clear tier differentiation |
| Should UX research be per-tenant? | Yes, with platform aggregation | Tenant-specific insights |
| White-label design system? | Use design tokens with tenant overrides | Maintainable customization |
| When to use Freya vs Emma? | Freya for tier UX, Emma for general UX | Specialized expertise |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **WDS patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `wds-*`
- **UX patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `ux-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "multi-tenant UX research patterns {date}"
- Search: "persona-driven SaaS design {date}"
- Search: "design system multi-tenant theming {date}"

---

## Related Workflows

- `bmad-bam-pricing-tier-configuration` - Map personas to tiers
- `bmad-bam-pricing-tier-configuration` - Define tier UX differences
- `bmad-bam-tenant-white-labeling-design` - Design white-label capabilities
