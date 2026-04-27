# Tenant Customization Patterns

**When to load:** When designing tenant-specific configurations, implementing theming, or when user mentions branding, tenant settings, or custom workflows.

**Integrates with:** UX agent, Architect (Atlas persona), Dev agent

---

## Core Concepts

### What is Tenant Customization?

Tenant customization enables each tenant to personalize their experience within the platform, including branding, feature configuration, workflow customization, and integration settings while maintaining a single codebase.

### Customization Dimensions

| Dimension | Description | Example |
|-----------|-------------|---------|
| Visual | Branding, theming | Logo, colors |
| Functional | Feature toggles | Enable/disable modules |
| Workflow | Process customization | Approval steps |
| Integration | External connections | Webhooks, APIs |
| Data | Field customization | Custom attributes |

### Customization Architecture

```
Customization Request
    │
    ├── Resolve tenant tier capabilities
    │
    ├── Apply configuration hierarchy
    │   ├── Platform defaults
    │   ├── Tier defaults
    │   ├── Tenant overrides
    │   └── User preferences
    │
    ├── Validate against schema
    │
    ├── Check security constraints
    │
    └── Cache resolved configuration
```

---

## Key Patterns

### Pattern 1: Configuration Hierarchy

| Level | Scope | Override Priority |
|-------|-------|-------------------|
| Platform default | All tenants | Lowest |
| Tier default | Subscription level | Medium |
| Tenant override | Specific tenant | High |
| User preference | Individual user | Highest |

### Configuration Resolution Example

| Setting | Platform | Tier (Pro) | Tenant Override | Resolved |
|---------|----------|------------|-----------------|----------|
| max_users | 5 | 50 | 75 | 75 |
| theme_color | #007bff | #007bff | #ff5733 | #ff5733 |
| feature_x | false | true | - | true |
| custom_domain | false | false | true | true |

### Pattern 2: Customization Storage

| Type | Storage | Access Pattern |
|------|---------|----------------|
| Theme | Database + CDN | Cached at edge |
| Features | Database | Request-time lookup |
| Workflows | Database + runtime | Lazy loaded |
| Integrations | Encrypted store | On-demand |

### Pattern 3: Customization Scopes

| Scope | Description | Tenant Control |
|-------|-------------|----------------|
| Global | Affects all users | Admin only |
| Workspace | Team-level settings | Workspace admin |
| Personal | User preferences | Individual user |

### Pattern 4: Custom Field System

| Field Type | Storage Strategy | Use Case |
|------------|------------------|----------|
| Simple attributes | JSON column | Text, numbers, dates |
| Structured data | Separate table | Complex objects |
| Computed fields | Derived at runtime | Calculated values |
| Relationship fields | Junction table | Custom associations |

---

## Decision Criteria

### When to Allow Customization

| Scenario | Allow | Rationale |
|----------|-------|-----------|
| Visual branding | Yes | No system impact |
| Feature availability | Tier-gated | Revenue alignment |
| Workflow modification | Enterprise only | Support complexity |
| Data schema changes | Carefully | Migration complexity |
| Security settings | Limited | Compliance requirements |

### Customization vs Configuration

| Aspect | Configuration | Customization |
|--------|---------------|---------------|
| Changed by | Platform admin | Tenant admin |
| Scope | System-wide | Per-tenant |
| Frequency | Rare | Common |
| Rollback | Complex | Self-service |
| Testing | Required | Tenant responsibility |

---

## Application Guidelines

- Implementing white-label features
- Designing tenant settings pages
- Building custom workflow engine
- Supporting enterprise branding requirements
- Creating extensible integration framework

---

## Per-Tier Customization

| Tier | Visual | Functional | Workflow | Integration |
|------|--------|------------|----------|-------------|
| Free | Colors only | None | None | None |
| Pro | Full branding | Feature toggles | Basic | Webhooks |
| Enterprise | White-label | Custom modules | Full | Custom APIs |

---

## Customization Validation

| Check | Description | Failure Action |
|-------|-------------|----------------|
| Schema validation | Config matches schema | Reject |
| Tier eligibility | Feature allowed for tier | Ignore setting |
| Security review | No dangerous configs | Sanitize |
| Performance impact | No expensive options | Warn + limit |

---

## Common Pitfalls and Anti-Patterns

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| Unlimited custom fields | Query performance degradation | Cap per tier, index critical fields |
| No versioning | Breaking changes on update | Version customization schemas |
| Sync validation only | Slow user experience | Async validation + preview |
| Flat configuration | Hard to manage at scale | Hierarchical with inheritance |
| No defaults | Empty state confusion | Sensible defaults at every level |
| Ignoring tenant tier | Feature leakage | Enforce tier checks at resolution |

### Customization Testing Checklist

- [ ] Verify tier restrictions enforced
- [ ] Test configuration inheritance
- [ ] Validate schema enforcement
- [ ] Check performance with max custom fields
- [ ] Test cache invalidation on updates
- [ ] Verify security constraint enforcement

---

## Integration with BAM Patterns

| Pattern | Integration Point | Purpose |
|---------|-------------------|---------|
| Feature Toggles | Feature customization | Dynamic capability |
| White-Labeling | Visual customization | Branding support |
| Tenant Context | Resolution scope | Correct tenant config |
| Caching Strategies | Configuration caching | Performance |
| Event-Driven | Config change events | Real-time updates |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Customization patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `customization`
- **Related guides:** `white-labeling-guide`, `feature-toggle-patterns`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "multi-tenant customization architecture {date}"
- Search: "SaaS tenant branding patterns {date}"
- Search: "tenant configuration management {date}"
- Search: "custom fields database design {date}"

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|---------------|-----------|
| Which customizations to allow per tier? | Free: colors only; Pro: full branding + feature toggles; Enterprise: white-label + custom modules | Progressive value unlocks drive tier upgrades while managing support complexity |
| How to handle configuration hierarchy conflicts? | Higher priority level wins (user > tenant > tier > platform defaults) | Predictable resolution enables self-service management; respects tenant autonomy |
| When to store customization in DB vs CDN? | DB for feature/workflow configs; CDN for static assets like logos and themes | DB for dynamic resolution; CDN for performance-critical static content |
| How many custom fields to allow per tier? | Free: 5; Pro: 25; Enterprise: 100+ | Prevents query performance degradation; increases with tier investment |
| When to version customization schemas? | Always version; migrate on schema changes with dual-write during transition | Prevents breaking changes; enables safe rollback if issues arise |

## Related Workflows

- `bmad-bam-tenant-model-isolation` - Design customization isolation strategy
- `bmad-bam-tenant-onboarding-design` - Configure default tenant customizations
- `bmad-bam-tenant-tier-migration` - Handle customization changes during tier migration
- `define-facade-contract` - Define customization API contracts
