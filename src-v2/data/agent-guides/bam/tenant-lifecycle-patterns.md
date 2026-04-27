# BAM Tenant Lifecycle Patterns Guide

**When to load:** During tenant management design, onboarding/offboarding automation, tenant state management, or when implementing tenant lifecycle for multi-tenant SaaS platforms.

**Integrates with:** Winston (Architect), Chad (PM), Operations teams, pm-bam extension.

---

## Core Concepts

### Tenant Lifecycle Stages

| Stage | Description | Duration |
|-------|-------------|----------|
| Trial | Evaluation period | 14-30 days |
| Onboarding | Setup and configuration | 1-7 days |
| Active | Normal operation | Ongoing |
| Suspended | Payment or policy issues | Up to 30 days |
| Offboarding | Data export, cleanup | 30-90 days |
| Archived | Compliance retention | Per regulation |
| Deleted | Permanent removal | After retention |

### Tenant State Machine

```
┌─────────────────────────────────────────────────┐
│              Tenant State Machine                │
│                                                  │
│    ┌─────────┐         ┌─────────┐             │
│    │ Trial   │────────►│Onboarding│             │
│    └────┬────┘         └────┬────┘             │
│         │                   │                   │
│         │              ┌────▼────┐             │
│         └─────────────►│ Active  │◄────────┐   │
│                        └────┬────┘         │   │
│                             │              │   │
│                   ┌─────────┼─────────┐    │   │
│                   │         │         │    │   │
│              ┌────▼────┐    │    ┌────▼────┐   │
│              │Suspended│────┼───►│Upgraded │───┘
│              └────┬────┘    │    └─────────┘   │
│                   │         │                   │
│              ┌────▼────┐    │                   │
│              │Offboarding◄──┘                   │
│              └────┬────┘                        │
│                   │                             │
│              ┌────▼────┐    ┌─────────┐        │
│              │Archived │───►│ Deleted │        │
│              └─────────┘    └─────────┘        │
└─────────────────────────────────────────────────┘
```

### Onboarding Workflow

| Phase | Actions | Owner |
|-------|---------|-------|
| Signup | Create tenant record, initial user | Self-service |
| Provisioning | Allocate resources, create schemas | Automated |
| Configuration | Set preferences, integrations | Tenant admin |
| Data Migration | Import existing data | Support-assisted |
| Activation | Enable billing, start usage | Automated |

### Offboarding Workflow

| Phase | Actions | Timeline |
|-------|---------|----------|
| Notice | Tenant requests cancellation | Day 0 |
| Grace | Allow data export | 30 days |
| Suspension | Disable access, preserve data | 30-60 days |
| Archival | Move to cold storage | 60-90 days |
| Deletion | Permanent data removal | Post-retention |

### Tenant Data Handling by Stage

| Stage | Data Access | Data Storage | Billing |
|-------|-------------|--------------|---------|
| Trial | Full access | Standard | None |
| Active | Full access | Per tier | Active |
| Suspended | Read-only | Preserved | Paused |
| Offboarding | Export only | Preserved | Final |
| Archived | None | Cold storage | None |
| Deleted | None | Removed | None |

### Automation Points

| Event | Automation | Notification |
|-------|------------|--------------|
| Trial expiring | Send reminder, upgrade prompt | Email + in-app |
| Payment failed | Retry 3x, then suspend | Email |
| Upgrade request | Immediate provisioning | Confirmation |
| Downgrade request | End of billing cycle | Acknowledgment |
| Deletion request | Start offboarding | GDPR acknowledgment |

---

## Application Guidelines

When implementing tenant lifecycle in a multi-tenant context:

1. **Automate state transitions** - Manual processes don't scale
2. **Implement grace periods** - Give tenants time before destructive actions
3. **Track lifecycle events** - Full audit trail per tenant
4. **Support self-service** - Reduce support burden for common operations
5. **Handle tier changes gracefully** - No data loss on upgrade/downgrade
6. **Comply with data retention** - GDPR, SOX requirements per region

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Trial duration? | 14 days free, 30 days enterprise | Balance conversion with evaluation |
| Grace period before deletion? | 30 days minimum | Allow recovery from mistakes |
| Auto-suspend on payment failure? | Yes, after 3 retries | Reduce bad debt |
| Data retention post-deletion? | 90 days archived, then delete | Compliance + recovery |
| Allow reactivation after offboarding? | Yes, within 60 days | Win-back opportunity |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Tenant patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `tenant-*`
- **Lifecycle patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `lifecycle-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "SaaS tenant lifecycle management {date}"
- Search: "tenant onboarding automation patterns {date}"
- Search: "GDPR tenant offboarding requirements {date}"

---

## Related Workflows

- `bmad-bam-tenant-onboarding-design` - Design onboarding flow
- `bmad-bam-tenant-offboarding-design` - Design offboarding flow
- `bmad-bam-tenant-tier-migration` - Handle tier changes
