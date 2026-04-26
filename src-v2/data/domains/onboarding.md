# Onboarding - BAM Domain Context

**Loaded by:** ZTO, ZTL  
**Related Workflows:** bmad-bam-tenant-onboarding-design, bmad-bam-tenant-lifecycle

---

## Overview

Tenant onboarding provisions isolated resources and configures tenant-specific settings during initial setup.

## Core Concepts

### Onboarding Pipeline

```
Signup → Provision → Configure → Activate
   │         │           │          │
   └── Create tenant record         │
             └── Initialize storage  │
                       └── Apply defaults
                                  └── Enable access
```

### Provisioning by Tier

| Tier | Isolation | Resources | SLA |
|------|-----------|-----------|-----|
| Free | RLS | Shared pool | Best-effort |
| Pro | RLS | Reserved | 99.9% |
| Enterprise | Schema/DB | Dedicated | 99.99% |

### Onboarding Checklist

| Step | Auto/Manual | Rollback |
|------|-------------|----------|
| Tenant record | Auto | Delete |
| Storage paths | Auto | Remove |
| RLS policies | Auto | Drop |
| Initial users | Manual | Deactivate |

## Decision Matrix

| Tenant Tier | Onboarding Time | Automation Level |
|-------------|-----------------|------------------|
| Free | < 30 seconds | Fully automated |
| Pro | < 5 minutes | Mostly automated |
| Enterprise | < 24 hours | Guided + custom |

## Quality Checks

- [ ] Onboarding workflow is idempotent
- [ ] Tenant resources provisioned atomically
- [ ] Rollback available on partial failure
- [ ] **CRITICAL:** Tenant isolation established before first access

## Web Research Queries

- "SaaS tenant onboarding patterns {date}"
- "tenant provisioning automation {date}"
