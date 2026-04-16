# BAM Provisioning UI Patterns Guide

**When to load:** During tenant provisioning design, self-service setup flows, resource allocation UI, or when implementing provisioning experiences for multi-tenant SaaS platforms.

**Integrates with:** Emma (UX Designer), Chad (PM), DevOps teams, ux-bam extension.

---

## Core Concepts

### Provisioning Flow Stages

| Stage | User Action | System Action |
|-------|-------------|---------------|
| Initiate | Click "Create Workspace" | Validate request |
| Configure | Select options | Prepare resources |
| Provision | Wait/progress bar | Allocate resources |
| Verify | Review setup | Run health checks |
| Activate | Start using | Enable access |

### Provisioning UI Components

```
┌─────────────────────────────────────────────────┐
│           Provisioning Interface                 │
│                                                  │
│  ┌──────────────────────────────────────────┐   │
│  │  Progress Stepper                         │   │
│  │  [1. Config] → [2. Provision] → [3. Done] │   │
│  └──────────────────────────────────────────┘   │
│                                                  │
│  ┌──────────────────────────────────────────┐   │
│  │  Configuration Panel                      │   │
│  │  • Workspace name                         │   │
│  │  • Region selection                       │   │
│  │  • Tier selection                         │   │
│  │  • Initial settings                       │   │
│  └──────────────────────────────────────────┘   │
│                                                  │
│  ┌──────────────────────────────────────────┐   │
│  │  Status Panel                             │   │
│  │  ⏳ Creating database...                  │   │
│  │  ✓ Setting up storage                    │   │
│  │  ○ Configuring access                    │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

### Configuration Options by Tier

| Option | Free | Pro | Enterprise |
|--------|------|-----|------------|
| Workspace name | Yes | Yes | Yes |
| Region | Default only | Single select | Multi-region |
| Data residency | No | No | Yes |
| SSO setup | No | Optional | Required |
| Custom domain | No | Optional | Optional |
| Initial users | 3 max | 25 max | Unlimited |

### Progress Indication Patterns

| Pattern | Use Case | Implementation |
|---------|----------|----------------|
| Determinate | Known steps | Percentage bar |
| Indeterminate | Unknown duration | Spinner/pulse |
| Step-based | Multi-stage | Stepper with status |
| Real-time log | Technical users | Live provisioning log |

### Error Handling in Provisioning

| Error Type | User Message | Recovery Action |
|------------|--------------|-----------------|
| Validation | "Please fix the highlighted fields" | Inline correction |
| Resource limit | "Upgrade required for this configuration" | Show upgrade option |
| Timeout | "Taking longer than expected" | Retry or contact support |
| System error | "Something went wrong" | Retry with support link |
| Region unavailable | "Region temporarily unavailable" | Suggest alternative |

### Self-Service vs Assisted Provisioning

| Aspect | Self-Service | Assisted (Enterprise) |
|--------|--------------|----------------------|
| Configuration | Wizard-based | White-glove setup |
| Timeline | Minutes | Days |
| Customization | Standard options | Fully custom |
| Support | In-app guidance | Dedicated CSM |
| Pricing | Fixed | Negotiated |

---

## Application Guidelines

When implementing provisioning UI in a multi-tenant context:

1. **Keep it simple** - Minimize required fields for quick start
2. **Show progress** - Users need feedback during provisioning
3. **Handle errors gracefully** - Clear messages with recovery options
4. **Allow customization for enterprise** - Different needs, different flows
5. **Provide onboarding after provisioning** - Guide first steps
6. **Enable re-provisioning** - Allow starting over if needed

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| How many config options? | 3-5 for self-service, unlimited for enterprise | Reduce friction for SMB |
| Show provisioning details? | Optional "technical details" toggle | Satisfy curious users |
| How long should provisioning take? | < 60 seconds for basic, longer for enterprise | Meet expectations |
| What happens on failure? | Automatic cleanup + clear retry option | No orphaned resources |
| Post-provisioning? | Onboarding checklist | Guide to first value |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Provisioning patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `provisioning-*`
- **Onboarding patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `onboarding-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "SaaS tenant provisioning UX {date}"
- Search: "workspace setup wizard patterns {date}"
- Search: "self-service onboarding best practices {date}"

---

## Related Workflows

- `bmad-bam-tenant-onboarding-design` - Design onboarding flow
- `bmad-bam-tenant-self-service-upgrade` - Self-service portal design
- `bmad-bam-pricing-tier-configuration` - Tier-based provisioning options
