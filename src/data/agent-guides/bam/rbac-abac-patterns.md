# BAM RBAC/ABAC Patterns Guide

**When to load:** During Phase 3 (Solutioning) when designing access control systems,
or when user mentions RBAC, ABAC, permissions, authorization, roles, policies, access control.

**Integrates with:** Architect (Atlas persona), Security agent, Dev agent

---

## Core Concepts

### Role-Based Access Control (RBAC)

RBAC assigns permissions to roles, and users inherit permissions through role membership. In multi-tenant systems, roles exist at both platform and tenant levels.

| Scope | Example Roles | Permission Assignment |
|-------|---------------|----------------------|
| Platform | SuperAdmin, Support, Billing | Global operations |
| Tenant | TenantAdmin, Manager, User | Tenant-scoped operations |
| Resource | ProjectOwner, Viewer | Resource-specific access |

### Attribute-Based Access Control (ABAC)

ABAC evaluates access decisions based on attributes of the subject, resource, action, and environment. This enables fine-grained, context-aware authorization.

| Attribute Type | Examples | Use Case |
|----------------|----------|----------|
| Subject | role, department, clearance_level | User context |
| Resource | owner, classification, tenant_id | Data context |
| Action | read, write, delete, export | Operation type |
| Environment | time, location, device_type | Contextual factors |

### RBAC vs ABAC Decision Matrix

| Factor | RBAC | ABAC | Hybrid |
|--------|------|------|--------|
| Simplicity | High | Low | Medium |
| Flexibility | Low | High | High |
| Audit complexity | Low | High | Medium |
| Performance | Fast | Variable | Balanced |
| Multi-tenant fit | Good | Excellent | Excellent |

## Application Guidelines

When implementing access control in multi-tenant systems:

1. **Enforce tenant boundary first**: All access decisions must validate tenant context before role/attribute checks
2. **Separate platform and tenant roles**: Platform admins should not automatically inherit tenant permissions
3. **Use hierarchical roles within tenants**: TenantAdmin > Manager > User reduces complexity
4. **Apply ABAC for cross-cutting concerns**: Data classification, time-based access, geographic restrictions
5. **Cache permission decisions carefully**: Invalidate on role changes, respect tenant isolation in cache keys

## Decision Framework

| Situation | Recommendation | Rationale |
|-----------|---------------|-----------|
| Simple tenant authorization | RBAC with tenant-scoped roles | Easier to understand, audit, and manage for most SaaS scenarios |
| Data classification requirements | ABAC with classification attributes | Enables dynamic access based on data sensitivity labels |
| Regulatory compliance (HIPAA, SOC2) | Hybrid RBAC+ABAC with audit logging | RBAC for baseline, ABAC for compliance-specific rules |
| Enterprise tenant customization | Tenant-configurable RBAC with platform guardrails | Allows flexibility while maintaining security boundaries |
| Cross-tenant data sharing | ABAC policies with explicit consent attributes | Fine-grained control over shared resources |
| Time-sensitive access | ABAC with temporal attributes | Automatic expiration without manual revocation |

## Implementation Patterns

### Pattern 1: Tenant-Scoped RBAC

| Component | Implementation | Multi-Tenant Consideration |
|-----------|---------------|---------------------------|
| Role definition | Platform + tenant-specific | Tenant can extend but not override platform roles |
| Permission assignment | Role-permission mapping table | Scoped by tenant_id |
| Role hierarchy | Parent-child role inheritance | Hierarchy is tenant-local |
| Default roles | Platform-defined templates | Cloned to tenant on onboarding |

### Pattern 2: ABAC Policy Engine

| Policy Element | Description | Example |
|----------------|-------------|---------|
| Subject attributes | User context | `{role: "analyst", department: "finance", tenant_id: "t123"}` |
| Resource attributes | Data context | `{classification: "confidential", owner: "u456", tenant_id: "t123"}` |
| Action | Operation | `read`, `export`, `delete` |
| Condition | Boolean expression | `subject.department == resource.department AND resource.classification != "secret"` |

### Pattern 3: Hybrid Authorization Flow

| Step | Check | Fail Action |
|------|-------|-------------|
| 1 | Tenant context valid | Reject (401) |
| 2 | User belongs to tenant | Reject (403) |
| 3 | RBAC permission check | Continue to ABAC |
| 4 | ABAC policy evaluation | Reject (403) if denied |
| 5 | Audit log | Log decision |

## Multi-Tenant Authorization Patterns

### Tenant Role Isolation

| Scenario | Pattern | Implementation |
|----------|---------|----------------|
| User in multiple tenants | Per-tenant role assignment | roles table: (user_id, tenant_id, role_id) |
| Cross-tenant admin | Platform role + tenant membership | Separate platform_roles and tenant_roles tables |
| Tenant admin delegation | Hierarchical tenant roles | TenantAdmin can assign roles up to their level |

### Permission Caching Strategy

| Cache Key Pattern | TTL | Invalidation Trigger |
|-------------------|-----|---------------------|
| `perm:{tenant_id}:{user_id}` | 5 min | Role change, permission update |
| `role:{tenant_id}:{role_id}` | 15 min | Role definition change |
| `policy:{tenant_id}:{policy_id}` | 15 min | ABAC policy update |

## Security Considerations

| Risk | Mitigation | Verification |
|------|------------|--------------|
| Privilege escalation | Role assignment validation | Cannot assign roles above own level |
| Tenant boundary bypass | Mandatory tenant context | All queries include tenant_id |
| Stale permissions | Short cache TTL + invalidation | Permission change triggers cache clear |
| Policy bypass | Centralized policy enforcement | All access through policy engine |

## Related Workflows

- `bmad-bam-tenant-model-isolation` - Design tenant-aware authorization
- `bmad-bam-security-review` - Validate access control implementation
- `validate-foundation` - Verify authorization patterns

## Related Patterns

Load decision criteria from pattern registry:
- **Patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `security`, `tenant-isolation`
- **Compliance:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv` → access control requirements

### Web Research

Use `web_queries` from pattern registry:
- Search: "RBAC ABAC multi-tenant SaaS patterns {date}"
- Search: "tenant-aware authorization best practices {date}"
- Search: "policy-based access control microservices {date}"
