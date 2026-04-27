# Freya Guide - BAM Extension

**When to load:** During Phase 3 (Solutioning) when designing tenant provisioning or tier-based UX, or when user mentions onboarding flows, tenant switching, or tier-based features.
**Integrates with:** Freya UX (wds-agent-freya-ux), tier-based UX design

This guide provides BAM-specific context for Freya (UX/design specialist) working on multi-tenant agentic AI platforms.

## Role Context

As Freya on a BAM project, you focus on:
- Designing tenant provisioning interfaces
- Creating intuitive multi-tenant user experiences
- Ensuring UI patterns scale across tenant tiers
- Building accessible tenant onboarding flows

## Core Concepts

### Tenant Context Awareness
Users must always understand which tenant context they are operating within. Clear visual indicators, consistent header placement of tenant identifiers, and explicit confirmation during context switches prevent costly cross-tenant mistakes and build user confidence in multi-tenant environments.

### Progressive Feature Disclosure
Tier-based feature gating should feel like natural progression rather than artificial restriction. Design experiences where lower-tier users see the value of advanced features without frustration, with clear upgrade paths that feel like unlocking potential rather than removing barriers.

### Provisioning as First Impression
The tenant onboarding experience sets expectations for the entire platform relationship. Each tier deserves a thoughtfully designed provisioning flow that matches its complexity needs - from sub-5-minute self-service for free tiers to white-glove enterprise experiences with dedicated support.

## Application Guidelines

When designing multi-tenant UX:
1. Always display current tenant context prominently in the interface header
2. Design feature gating to educate rather than frustrate - show what's possible
3. Create tier-appropriate onboarding flows that match user expectations and complexity tolerance
4. Test all critical flows with users from each tier to validate assumptions
5. Ensure context switches are explicit with clear state reset to prevent confusion

## Tier UX Decision Matrix

Use this matrix to guide UX decisions that vary across tenant tiers:

| UX Element | Free Tier | Pro Tier | Enterprise Tier |
|-----------|-----------|----------|-----------------|
| **Onboarding** | Self-service wizard (5 min) | Guided setup with templates | White-glove with dedicated CSM |
| **Dashboard** | Essential metrics only | Full analytics dashboard | Custom widgets + API access |
| **Navigation** | Simplified menu | Full menu with sections | Customizable workspace |
| **Branding** | Platform branding only | Logo customization | Full white-label |
| **Support Access** | Help docs + community | Chat + email support | Dedicated support portal |
| **Feature Gating** | Hard limits with upgrade prompts | Soft limits with overage alerts | No limits, custom quotas |
| **Notifications** | Email only | Email + in-app | Custom channels + webhooks |
| **Integrations** | Pre-built only | Webhooks + Zapier | Custom + API sandbox |

### Feature Gating Patterns

**Upgrade Prompt Strategy by Tier:**

| Scenario | Free User Experience | Pro User Experience |
|----------|---------------------|---------------------|
| Feature locked | Clear message + upgrade CTA | Unlock with add-on purchase |
| Usage limit near | Warning at 80% + upgrade suggestion | Alert at 90% + overage options |
| Limit exceeded | Graceful degradation + upgrade required | Soft limit + billing notification |
| New feature released | Preview only + waitlist | Early access + feedback channel |

## Actionable Guidance

### Designing Tenant Onboarding

1. **Define Tier-Specific Flows** - Map the ideal onboarding journey for each tier
2. **Identify Critical Setup Steps** - Determine mandatory vs optional configuration
3. **Design Progress Indicators** - Show clear progress through onboarding stages
4. **Create Success Milestones** - Define what "onboarded" means for each tier
5. **Build Recovery Paths** - Design flows for users who abandon onboarding
6. **Test Time-to-Value** - Measure how quickly users reach first value moment
7. **Implement Contextual Help** - Provide tier-appropriate guidance at each step

### Creating Tenant Switching UX

1. **Display Current Context** - Always show which tenant user is currently viewing
2. **Design Switcher Component** - Create accessible tenant selector interface
3. **Handle Permissions** - Show only tenants user has access to
4. **Manage State Transition** - Clear context cleanly when switching
5. **Preserve User Intent** - Return to similar location in new tenant context
6. **Add Recent Tenants** - Show recently accessed tenants for quick switching
7. **Indicate Tenant Type** - Visually distinguish tier or tenant characteristics

### Implementing Feature Gating UX

1. **Inventory Gated Features** - List all features that vary by tier
2. **Design Lock States** - Create consistent visual language for locked features
3. **Write Upgrade Copy** - Craft compelling tier upgrade messaging
4. **Position Upgrade CTAs** - Place upgrade prompts strategically
5. **Track Engagement** - Measure interaction with gated features
6. **Test Upgrade Flows** - Ensure smooth tier transition experience
7. **Handle Downgrades** - Design graceful experience when tier decreases

## Key Considerations

### Provisioning UI
- Design clear tenant onboarding wizards
- Show tenant-tier-appropriate features
- Handle provisioning state transitions gracefully

### Multi-Tenant UX
- Context switching between tenants should be seamless
- Visual indicators for current tenant context
- Tenant-specific branding and customization options

### Tier-Based Design
- Graceful degradation for lower tiers
- Upsell opportunities without friction
- Feature discovery appropriate to tier

## SaaS-Specific Considerations

### Tenant Context Visibility

Users must always know their current context. Implement these patterns:

**Header Context Bar:**
- Display tenant name/logo prominently
- Show current tier with subtle indicator
- Include quick-access tenant switcher
- Add environment indicator (production/sandbox)

**Visual Differentiation:**
- Use color coding for tenant tiers (subtle, accessible)
- Show tenant-specific branding where enabled
- Indicate sandbox/test environments clearly
- Differentiate admin vs user context

### Multi-Organization User Experience

Many users belong to multiple tenants. Design for:

**Organization Selection:**
- Present clear organization list at login
- Remember last-used organization
- Show role/permissions per organization
- Enable favorites for frequent access

**Cross-Tenant Workflows:**
- Never show data from other tenants
- Clear confirmation when switching contexts
- Reset filters and views on context switch
- Maintain user preferences per-tenant

### Responsive Tier Experience

**Free Tier UX Principles:**
- Focus on core value, remove distractions
- Make upgrade path visible but not intrusive
- Ensure full functionality within limits
- Provide clear understanding of limitations

**Pro Tier UX Principles:**
- Unlock power features progressively
- Provide customization without complexity
- Offer advanced options in accessible way
- Balance feature richness with usability

**Enterprise Tier UX Principles:**
- Support complex organizational structures
- Enable admin customization of user experience
- Provide white-label/embedded options
- Support SSO and enterprise authentication flows

### Tenant Admin Experience

Design dedicated experiences for tenant administrators:

| Admin Capability | UX Approach |
|-----------------|-------------|
| User Management | Table with search, bulk actions, role assignment |
| Billing/Usage | Dashboard with charts, invoices, usage breakdown |
| Settings | Organized panels with save confirmation |
| Integrations | Card-based catalog with status indicators |
| Audit Logs | Searchable table with export capability |
| Security | Toggle-based controls with impact explanations |

### Accessibility in Multi-Tenant Context

- Tenant switcher must be keyboard accessible
- Context changes announced to screen readers
- Color coding must not be sole differentiator
- All gating messages must be accessible

## Decision Framework

| Situation | Recommendation | Rationale |
|-----------|---------------|-----------|
| User belongs to multiple tenants | Implement tenant switcher with recent/favorites | Quick access reduces friction for multi-org users |
| Free user hits feature limit | Show value with upgrade path, not just error | Frustration-free gating improves conversion |
| Enterprise requires custom branding | Full white-label with admin controls | Enterprise tier expects complete customization |
| Complex admin configuration needed | Wizard-based progressive setup | Reduces cognitive load for infrequent tasks |
| User role varies by tenant | Show role context in switcher | Prevents permission confusion across contexts |
| Onboarding abandonment is high | Add progress save and email recovery | Respects user time investment in setup |

## Related Workflows

- `bmad-bam-tenant-onboarding-design` - Design tenant onboarding flows and experiences
- `bmad-bam-usage-metering-design` - Design usage metering and tier-based billing UX

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **UX patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `ux-*`
- **Tier patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "SaaS tier-based UX design patterns {date}"
- Search: "multi-tenant feature gating UX {date}"
- Search: "B2B SaaS onboarding experience design {date}"
