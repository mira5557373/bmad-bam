# Tenant Lifecycle Management

**When to load:** When designing tenant onboarding, offboarding, or when user mentions tenant provisioning, tenant deprovisioning, or tenant state management.

**Integrates with:** Architect (Atlas persona), Dev agent, Product manager

---

## Core Concepts

### What is Tenant Lifecycle Management?

Tenant lifecycle management encompasses all phases of a tenant's relationship with the platform, from initial signup through active usage to eventual offboarding, including provisioning, upgrades, and decommissioning.

### Lifecycle Phase Comparison

| Phase | Description | Key Activities |
|-------|-------------|----------------|
| Onboarding | New tenant setup | Provisioning, configuration |
| Active | Normal operation | Usage, billing, support |
| Upgrade/Downgrade | Tier changes | Migration, feature flags |
| Suspended | Temporary hold | Access restriction |
| Offboarding | Tenant exit | Data export, deletion |

---

## Key Patterns

### Pattern 1: Self-Service Onboarding

Automated tenant provisioning.

| Component | Purpose | Implementation |
|-----------|---------|----------------|
| Signup Flow | Collect info | Web form |
| Validation | Verify tenant | Email, domain |
| Provisioning | Create resources | Automated jobs |
| Welcome | Initial guidance | Onboarding wizard |

### Self-Service Flow

```
Signup Request
      │
      ├── Validate email/domain
      │
      ├── Create tenant record
      │
      ├── Provision resources
      │   ├── Database schema/RLS
      │   ├── Storage bucket
      │   ├── Search index
      │   └── Default configuration
      │
      ├── Create admin user
      │
      └── Send welcome email
```

### Pattern 2: Enterprise Onboarding

Assisted onboarding for complex tenants.

| Component | Purpose | Implementation |
|-----------|---------|----------------|
| Sales Handoff | Requirements transfer | CRM integration |
| Custom Config | Tenant-specific setup | Configuration templates |
| Data Migration | Import existing data | Migration tools |
| Training | User enablement | Scheduled sessions |
| Go-Live | Cutover coordination | Checklist driven |

### Enterprise Flow

```
Contract Signed
      │
      ├── Sales handoff to CS
      │
      ├── Discovery call
      │
      ├── Custom provisioning
      │   ├── Dedicated resources
      │   ├── SSO configuration
      │   ├── Custom integrations
      │   └── Data migration
      │
      ├── UAT period
      │
      └── Go-live
```

### Pattern 3: Tier Migration

Handle subscription tier changes.

| Migration Type | Complexity | Considerations |
|----------------|------------|----------------|
| Upgrade | Low | Enable features |
| Downgrade | Medium | Disable features, data limits |
| Enterprise | High | Resource migration |

### Migration Flow

```
Tier Change Request
        │
        ├── Validate eligibility
        │
        ├── Plan migration
        │   ├── Feature changes
        │   ├── Resource changes
        │   └── Data implications
        │
        ├── Execute migration
        │   ├── Update config
        │   ├── Migrate resources
        │   └── Update billing
        │
        └── Notify tenant
```

### Pattern 4: Offboarding

Controlled tenant exit.

| Phase | Activities | Compliance |
|-------|------------|------------|
| Notice | Grace period | Per contract |
| Export | Data extraction | Tenant request |
| Deletion | Remove data | Retention policy |
| Archive | Compliance copy | Regulatory |
| Cleanup | Release resources | Complete removal |

### Offboarding Flow

```
Offboarding Request
        │
        ├── Initiate grace period
        │
        ├── Disable new activity
        │
        ├── Data export (if requested)
        │
        ├── Archive for compliance
        │   └── Retained per policy
        │
        ├── Delete active data
        │   ├── Database records
        │   ├── Storage files
        │   ├── Search indices
        │   └── Cache entries
        │
        └── Release resources
```

---

## Application Guidelines

When implementing lifecycle management:

1. **Automate where possible** - Self-service reduces manual work
2. **Provide visibility** - Show provisioning status
3. **Handle failures gracefully** - Rollback on errors
4. **Respect data ownership** - Enable export before deletion
5. **Document compliance** - Audit trail for all changes

---

## Per-Tier Lifecycle Configuration

| Tier | Onboarding | Support | Offboarding Notice |
|------|------------|---------|-------------------|
| Free | Self-service | Community | 7 days |
| Pro | Self-service | Email | 30 days |
| Enterprise | Assisted | Dedicated | 90 days |

---

## Tenant State Machine

| State | Transitions | Actions |
|-------|-------------|---------|
| Pending | -> Active | Complete provisioning |
| Active | -> Suspended, Offboarding | Normal operation |
| Suspended | -> Active, Offboarding | Restricted access |
| Offboarding | -> Archived | Grace period, export |
| Archived | -> Deleted | Compliance retention |

### State Diagram

```
┌─────────┐    provision    ┌────────┐
│ Pending │ ─────────────> │ Active │
└─────────┘                └────┬───┘
                                │
                    ┌───────────┼───────────┐
                    │           │           │
                    v           │           v
              ┌───────────┐    │    ┌──────────────┐
              │ Suspended │<───┘    │ Offboarding  │
              └─────┬─────┘         └──────┬───────┘
                    │                      │
                    └──────────────────────┘
                               │
                               v
                        ┌──────────┐
                        │ Archived │
                        └────┬─────┘
                             │
                             v
                        ┌──────────┐
                        │ Deleted  │
                        └──────────┘
```

---

## Provisioning Checklist

| Resource | Free | Pro | Enterprise |
|----------|------|-----|------------|
| Database schema/RLS | Yes | Yes | Yes |
| Storage bucket | Yes | Yes | Dedicated |
| Search index | Shared | Shared | Dedicated |
| Cache namespace | Shared | Shared | Dedicated |
| MCP server | Shared | Shared | Dedicated |

---

## Common Pitfalls and Anti-Patterns

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| Manual provisioning | Slow, error-prone | Automate |
| No rollback | Partial failures | Transaction-like |
| Immediate deletion | Data loss | Grace period |
| No audit trail | Compliance gaps | Log all changes |
| Hard-coded limits | Inflexible | Configurable per tier |

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Self-service vs assisted? | Based on tier complexity | Self-service for simple, assisted for enterprise |
| Grace period length? | Based on tier and contract | Balance UX vs resource costs |
| Data retention post-offboard? | Per compliance requirements | Meet regulatory obligations |
| Tier migration complexity? | Plan for all transitions | Avoid surprises |

---

## Related Workflows

- `bmad-bam-tenant-onboarding-design` - Design onboarding flow
- `bmad-bam-tenant-offboarding-design` - Design offboarding flow
- `bmad-bam-tenant-tier-migration` - Handle tier changes

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Tenant lifecycle:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-lifecycle`
- **Tenant onboarding:** `{project-root}/_bmad/bam/data/agent-guides/bam/tenant-onboarding-patterns.md`
- **Tenant offboarding:** `{project-root}/_bmad/bam/data/agent-guides/bam/tenant-offboarding-patterns.md`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "tenant lifecycle management {date}"
- Search: "SaaS onboarding patterns {date}"
- Search: "tenant offboarding compliance {date}"
