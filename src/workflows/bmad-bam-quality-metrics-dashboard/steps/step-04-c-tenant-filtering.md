# Step 4: Add Tenant-Specific Filtering

## Purpose

Add tenant-specific filtering capabilities to the quality dashboard for multi-tenant visibility.

## Prerequisites

- Dashboard designed
- Alerts configured
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`

## Actions

### 1. Design Tenant Filter Controls

| Filter | Scope | Options | Default |
|--------|-------|---------|---------|
| Tenant Selector | All panels | All tenants (admin) | All |
| Tier Filter | Metrics | Free/Pro/Enterprise | All |
| Time Range | Historical | 1h/24h/7d/30d/custom | 24h |

### 2. Configure Access Control

| User Role | Tenant Visibility | Metrics Access |
|-----------|-------------------|----------------|
| Platform Admin | All tenants | Full |
| Tenant Admin | Own tenant only | Full for tenant |
| Compliance Officer | All tenants | Compliance only |
| Developer | Own tenant | Test coverage |

### 3. Design Tenant Comparison View

For platform admins:

| Comparison | Metrics | Visualization |
|------------|---------|---------------|
| Cross-tenant quality | Score by tenant | Bar chart |
| Tier comparison | Score by tier | Grouped bar |
| Tenant trends | Score over time | Multi-line |

### 4. Configure Tenant Isolation

| Security Requirement | Implementation |
|----------------------|----------------|
| Data isolation | Query filter on tenant_id |
| URL security | Tenant in path, validated |
| Session binding | Tenant in JWT claim |
| Cross-tenant block | Deny if tenant mismatch |

## Web Research Verification

Search the web: "multi-tenant dashboard filtering patterns {date}"
Search the web: "RBAC dashboard access control {date}"

## Verification

- [ ] Tenant filters designed
- [ ] Access control configured
- [ ] Comparison view designed
- [ ] Isolation security verified

## Outputs

- Tenant filtering specification

## Next Step

Proceed to `step-05-c-generate-spec.md` with filtering config.
