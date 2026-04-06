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

## Application Guidelines

1. **Value demonstration** - Show what's possible before upgrade
2. **Frictionless upgrade** - One-click for self-serve tiers
3. **Clear comparison** - Feature matrix on upgrade pages
4. **Contextual nudges** - Upgrade prompts at limit points
5. **Graceful limits** - Soft limits before hard blocks

---

## Integration with BAM Workflows

- WDS workflows with BAM extension
- UX design with tier considerations
