# BAM Per-Tenant Customization Guide

**When to load:** During Phase 3 (Solutioning) when designing tenant branding, feature toggles, or white-label capabilities.

**Integrates with:** Architect (Atlas persona), UX agent, Dev agent

---

## Core Concepts

### Customization Layers

| Layer | Scope | Examples |
|-------|-------|----------|
| Visual | UI/UX | Themes, logos, colors |
| Functional | Features | Module toggles, limits |
| Behavioral | Logic | Workflows, defaults |
| Integration | External | APIs, webhooks, SSO |
| Data | Content | Templates, reports |
| Locale | Regional | Language, timezone, currency |

### Customization Philosophy

Effective multi-tenant customization balances flexibility with maintainability. Each customization layer should be independent, allowing tenants to configure visual appearance without affecting functional behavior, and vice versa. The customization system must support inheritance hierarchies where tenant-specific settings override tier defaults, which in turn override platform defaults.

Customization should be declarative rather than imperative. Tenants define desired states through configuration rather than custom code. This approach ensures that platform upgrades do not break tenant customizations and simplifies the validation and testing of customization combinations.

### Customization Architecture

```
+-----------------------------------------------------------+
|  +----------+  +----------+  +----------+  +----------+   |
|  | Theming  |  | Feature  |  | Config   |  | Extension|   |
|  | Engine   |  | Flags    |  | Store    |  | Points   |   |
|  +----------+  +----------+  +----------+  +----------+   |
|                      |                                     |
|                      v                                     |
|               Tenant Context Resolver                      |
|                      |                                     |
|                      v                                     |
|               Caching Layer (Redis)                        |
+-----------------------------------------------------------+
```

### Configuration Inheritance

The customization system implements a hierarchical resolution pattern. When resolving a configuration value, the system checks tenant-specific settings first, then tier defaults, and finally platform defaults. This cascade ensures that tenants always have sensible defaults while retaining full control over their experience.

---

## Application Guidelines

When implementing tenant customization:

1. **Use declarative configuration**: Tenants define desired states, not custom code
2. **Implement inheritance hierarchies**: Tenant settings override tier defaults which override platform defaults
3. **Separate customization layers**: Visual, functional, and behavioral customizations should be independent
4. **Cache resolved configurations**: Customization lookups should be fast with tenant-aware caching
5. **Validate customization combinations**: Ensure custom settings do not break platform functionality

---

## Theming System

| Component | Free Tier | Pro Tier | Enterprise |
|-----------|-----------|----------|------------|
| Primary color | Default only | Full palette | Full |
| Logo | Platform | Custom | Custom |
| Email templates | Standard | Branded | Fully custom |
| Login page | Standard | Logo + colors | Fully custom |
| Favicon | Platform | Custom | Custom |
| Typography | Default | Limited | Custom fonts |
| Dark mode | System default | Toggleable | Full control |

### Theme Validation

All custom themes undergo validation to ensure accessibility compliance (WCAG 2.1 AA minimum), proper contrast ratios, and rendering consistency across supported browsers and devices.

---

## Feature Flags

| Level | Priority | Use Case |
|-------|----------|----------|
| Global | Lowest | Platform-wide defaults |
| Tier | Medium | Tier-based features |
| Tenant | High | Tenant-specific overrides |
| User | Highest | User-level toggles |
| Session | Temporary | A/B testing variants |

### Flag Evaluation

Feature flags are evaluated at request time using the tenant context. Flags support percentage rollouts, user targeting, and time-based activation. All flag evaluations are logged for audit and analytics purposes.

---

## Extension Points

| Type | Scope | Example |
|------|-------|---------|
| Webhook | Event notification | "on_task_complete" |
| Custom action | UI integration | "Export to CRM" |
| Data transform | Pipeline hook | "Post-process results" |
| Custom tool | Agent capability | "Query internal API" |
| Auth provider | SSO integration | "SAML, OIDC" |
| Storage adapter | File handling | "Custom S3 bucket" |

### Extension Security

All extension points are sandboxed and execute with tenant-scoped permissions only. Extensions cannot access data from other tenants and are subject to rate limiting and resource quotas.

---

## White-Labeling

| Capability | Pro | Enterprise | White-Label |
|------------|-----|------------|-------------|
| Custom domain | No | Yes | Yes |
| Remove branding | No | Partial | Full |
| Custom emails | Header | Full | Full |
| Reseller support | No | No | Yes |

---

## Related Workflows

- `bmad-bam-tenant-onboarding-design` - Configure tenant customizations during onboarding
- `bmad-bam-tenant-model-isolation` - Implement tenant-scoped customization boundaries
- `bmad-bam-create-master-architecture` - Design customization architecture foundation

## Related Patterns

- `customization` pattern in `bam-patterns.csv`
- `tenant-isolation.md` guide for tenant context resolution
- `tier-ux.md` guide for tier-based feature differentiation
- `saas-lifecycle.md` guide for tenant lifecycle management
- `tenant-model-template.md` for output documentation

Load from pattern registry:
- `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `customization`
- `{project-root}/_bmad/bam/data/tenant-models.csv` → tier configurations

### Web Research

For current best practices, use the `web_queries` column from the pattern registry:

| Pattern | Web Search Query |
|---------|------------------|
| `customization` | `SaaS customization patterns multi-tenant SaaS {date}` |
| `customization` | `white-label architecture multi-tenant SaaS {date}` |

**Note:** Replace `{date}` with the current year for up-to-date results.

---

## Decision Framework

| Question | Recommendation |
|----------|----------------|
| Visual customization only? | Theming system sufficient |
| Behavior varies by tenant? | Feature flags + config |
| Third-party integrations? | Extension points |
| Full rebrand required? | White-label tier |
| Multi-language support? | Locale customization layer |
| Custom reporting needs? | Data layer customization |
| Compliance requirements? | Enterprise + audit trail |

---

## Configuration Management

| Aspect | Approach | Storage |
|--------|----------|---------|
| Version control | Git-based configs | Repository |
| Runtime updates | API + webhook | Database |
| Validation | Schema enforcement | On write |
| Rollback | Point-in-time restore | Snapshots |
