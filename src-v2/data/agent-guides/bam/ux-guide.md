# UX Guide - BAM Extension

**When to load:** During Phase 3 (Solutioning) when designing tenant provisioning or multi-tenant interfaces, or when user mentions tenant onboarding, tier selection, or tenant context UI.
**Integrates with:** UX Designer (bmad-agent-ux-designer), user experience design

This guide provides BAM-specific context for UX designers working on multi-tenant agentic AI platforms.

## Role Context

As a UX designer on a BAM project, you focus on:
- Designing provisioning user interfaces
- Creating multi-tenant user experiences
- Ensuring consistent UX across tenant tiers
- Building intuitive tenant management interfaces

## Core Concepts

### Tenant Context Visibility
Users must always know which tenant context they are operating within. Clear visual indicators in the header, explicit confirmation during context switches, and consistent placement of tenant identifiers prevent costly mistakes in multi-tenant environments.

### Tier-Appropriate Complexity
Each tier deserves UX complexity appropriate to its audience. Free tiers need minimal, guided experiences that get users to value quickly. Pro tiers balance power with usability. Enterprise tiers provide maximum customization and control for power users.

### Progressive Feature Disclosure
Feature gating should educate rather than frustrate. Use soft gates to show what's possible, hard gates only when necessary, and always provide clear paths to upgrade. Lower-tier users should understand the value of higher tiers without feeling blocked.

## Application Guidelines

When designing multi-tenant experiences:
1. Display current tenant context prominently in the interface header
2. Design tier-appropriate onboarding flows that match user expectations
3. Implement feature gating that educates users about upgrade value
4. Build accessible tenant switching for users with multiple organizations
5. Test all flows with users from each tier to validate complexity assumptions

## Tier Experience Guidelines

Design consistent yet differentiated experiences across tiers:

### Experience Differentiation Matrix

| UX Element | Free Tier | Pro Tier | Enterprise Tier |
|-----------|-----------|----------|-----------------|
| **Complexity** | Minimal, guided | Flexible, discoverable | Customizable, powerful |
| **Defaults** | Opinionated | Smart defaults | Admin-configured |
| **Customization** | None | User preferences | Full branding + layout |
| **Help System** | Inline tips, docs | Contextual help + chat | Dedicated support widget |
| **Error Messages** | Simple, actionable | Detailed + suggestions | Technical + escalation |
| **Data Density** | Low (essential only) | Medium (scannable) | High (power user) |

### Feature Visibility by Tier

| Visibility Pattern | When to Use | Example |
|-------------------|-------------|---------|
| **Hidden** | Feature unavailable and irrelevant | Enterprise compliance in Free |
| **Disabled with Hint** | Feature unavailable but relevant | Greyed button with upgrade tooltip |
| **Preview Mode** | Feature available in limited form | 3 free API calls then upgrade |
| **Full Access** | Feature fully available | Core features for all tiers |

## Actionable Guidance

### Designing Tenant Provisioning Flows

1. **Map the Journey** - Document steps from signup to first value
2. **Identify Tier Differences** - Note where flows differ by tier
3. **Design for Speed** - Minimize time to first value
4. **Include Progress Indicators** - Show users where they are
5. **Plan Recovery Paths** - Design for abandonment and return
6. **Test with Real Users** - Validate with actual tenant personas
7. **Measure Success** - Track completion rates and time to value

### Creating Tenant Context UI

1. **Design Context Header** - Clear display of current tenant
2. **Build Tenant Switcher** - Easy navigation between tenants
3. **Add Visual Differentiation** - Distinguish tenants visually
4. **Include Role Context** - Show user's role in current tenant
5. **Handle Single Tenant** - Simplify UI for single-tenant users
6. **Plan for Scale** - Design for users with many tenants
7. **Test Context Switches** - Verify clean state transitions

### Building Upgrade/Downgrade Flows

1. **Show Value Clearly** - Articulate what changes with tier
2. **Provide Comparison** - Side-by-side tier comparison
3. **Handle Billing** - Clear pricing and billing changes
4. **Communicate Impact** - What happens to existing data/settings
5. **Confirm Actions** - Require explicit confirmation for downgrades
6. **Provide Transition** - Grace period and data preservation
7. **Follow Up** - Post-transition guidance and support

## Key Considerations

### Provisioning UI
- Tenant onboarding flow design
- Self-service provisioning interfaces
- Tier selection and upgrade flows

### Multi-Tenant UX
- Tenant context indicators
- Switching between tenants
- Tenant-specific theming/branding

### Tier-Based UX
- Feature availability by tier
- Graceful feature gating
- Upgrade prompts and flows

## SaaS-Specific Considerations

### Onboarding Flow Design by Tier

**Free Tier Onboarding:**
- Goal: Immediate value, minimal friction
- Duration: < 5 minutes
- Steps: Sign up > Quick setup > First success
- Collect: Minimal info, progressive profiling

**Pro Tier Onboarding:**
- Goal: Team setup, integration success
- Duration: < 30 minutes
- Steps: Sign up > Team invite > Integration > First workflow
- Collect: Team info, use case, integrations

**Enterprise Tier Onboarding:**
- Goal: Org-wide deployment, compliance
- Duration: Days/weeks with CSM
- Steps: Kickoff > SSO > Pilot > Rollout
- Collect: Org structure, compliance needs, success criteria

### Tenant Admin Interface Design

**Admin Dashboard Sections:**

| Section | Purpose | Key Actions |
|---------|---------|-------------|
| Overview | Quick status | View health metrics |
| Users | Team management | Invite, edit roles, remove |
| Settings | Configuration | Update tenant settings |
| Security | Protection | SSO, MFA, session policies |
| Billing | Subscription | View usage, manage plan |
| Integrations | Connections | Add, configure, remove |
| Audit Log | Compliance | Search, export, alerts |

### Feature Gating UX Patterns

**Soft Gate (Awareness):**
- Show feature, indicate unavailability
- Tooltip explains what tier unlocks it
- Single click to learn more

**Hard Gate (Enforcement):**
- Attempt shows modal
- Clear value proposition
- Direct path to upgrade
- Alternative suggestion if available

**Usage Gate (Limits):**
- Show current usage vs limit
- Warning at 80% threshold
- Block at 100% with clear message
- Overage option for Pro+ tiers

### Multi-Organization User Experience

**User with Multiple Tenants:**
- Default to last-used tenant
- Provide easy tenant switcher
- Show role per tenant in switcher
- Support favorites/pinning
- Recent tenants for quick access

**Tenant Switcher Best Practices:**
- Keyboard accessible
- Search for many tenants
- Visual tenant identification
- Confirmation for destructive context changes

### Branding and White-Label

**Tier-Based Branding:**

| Branding Element | Free | Pro | Enterprise |
|-----------------|------|-----|------------|
| Logo in header | Platform | Platform | Tenant |
| Color scheme | Platform | Limited custom | Full custom |
| Email templates | Platform | Co-branded | White-label |
| Domain | Platform subdomain | Custom subdomain | Custom domain |
| Login page | Platform | Platform | Custom |

### Responsive Design for Multi-Tenant

**Mobile Considerations:**
- Simplified tenant switcher
- Essential admin functions
- Touch-friendly tier comparisons
- Mobile-appropriate onboarding

### Accessibility in Multi-Tenant

**Key Requirements:**
- Tenant context announced to screen readers
- Color not sole indicator of tier
- Keyboard navigation for all flows
- Focus management on context switch
- WCAG 2.1 AA compliance minimum

### Error States and Recovery

**Tenant-Related Errors:**

| Error Scenario | User Message | Recovery Action |
|----------------|--------------|-----------------|
| Tenant not found | "Unable to access this workspace" | Return to tenant list |
| No permission | "You don't have access" | Request access or switch |
| Tier limit reached | "You've reached your plan limit" | View usage, upgrade option |
| Feature unavailable | "This feature requires [tier]" | Learn more, upgrade |
| Session expired | "Please sign in again" | Redirect to login |

### Analytics for UX Improvement

**Track These Metrics:**
- Time to first value by tier
- Onboarding completion rate
- Feature adoption by tier
- Upgrade flow conversion
- Tenant switch frequency
- Admin action completion

## Decision Framework

| Situation | Recommendation | Rationale |
|-----------|---------------|-----------|
| Free user hitting limits | Soft gate with value education | Frustration-free gating converts better |
| Enterprise needs custom branding | Full white-label with admin controls | Enterprise tier expects complete customization |
| User belongs to many tenants | Search + favorites in switcher | Quick access scales better than scrolling |
| Onboarding abandonment is high | Save progress and email recovery | Respect user time investment |
| Feature only for higher tier | Show disabled with clear upgrade path | Users should see what's possible |
| Mobile admin needed | Essential functions only | Focus on most common admin tasks |

## Related Workflows

- `bmad-bam-tenant-onboarding-design` - Design tenant onboarding flows and experiences
- `bmad-bam-usage-metering-design` - Design usage metering and tier-based UX

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **UX patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `ux-*`
- **Tenant models:** `{project-root}/_bmad/bam/data/tenant-models.csv`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "multi-tenant UX design patterns {date}"
- Search: "B2B SaaS user experience {date}"
- Search: "tenant-aware feature gating UX {date}"
