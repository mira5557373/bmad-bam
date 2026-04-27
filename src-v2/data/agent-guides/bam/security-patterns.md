# BAM Security Patterns Guide

**When to load:** During security architecture design, threat modeling, authentication/authorization design, or when implementing data protection for multi-tenant SaaS platforms.

**Integrates with:** Winston (Architect), James (Dev) with security-bam extension active, Security teams.

---

## Core Concepts

### Multi-Tenant Threat Model

Multi-tenant platforms face unique security challenges beyond traditional single-tenant applications. The threat model must account for tenant-to-tenant attack vectors.

| Threat Category | Single-Tenant Risk | Multi-Tenant Risk |
|-----------------|-------------------|-------------------|
| Data Exposure | Internal breach | Cross-tenant leakage |
| Privilege Escalation | Admin access | Tenant boundary bypass |
| Resource Abuse | Self-inflicted | Noisy neighbor / DoS |
| Injection Attacks | Application data | Tenant context manipulation |

#### Cross-Tenant Attack Vectors

1. **SQL Injection with Tenant Context** - Attackers attempt to manipulate tenant_id in queries
2. **IDOR (Insecure Direct Object Reference)** - Accessing resources by guessing IDs across tenants
3. **Session Hijacking** - Stealing tokens to access other tenant data
4. **Cache Poisoning** - Injecting data into shared caches without tenant isolation
5. **Memory Leakage** - AI agent memory crossing tenant boundaries

### Authentication Patterns

| Pattern | Use Case | Multi-Tenant Consideration |
|---------|----------|---------------------------|
| JWT with tenant claim | API access | Include `tenant_id` in token payload |
| OAuth 2.0 + OIDC | SSO integration | Map external identity to tenant |
| API Keys | Machine-to-machine | Scope keys to specific tenants |
| SAML | Enterprise SSO | Configure per-tenant IdP |

#### Tenant-Aware JWT Structure

```
{
  "sub": "user_123",
  "tenant_id": "tenant_abc",
  "tier": "pro",
  "roles": ["admin", "billing"],
  "exp": 1735689600
}
```

### Authorization Patterns

| Pattern | Description | Best For |
|---------|-------------|----------|
| RBAC | Role-based access control | Simple permission models |
| ABAC | Attribute-based access control | Complex, contextual rules |
| ReBAC | Relationship-based access control | Hierarchical organizations |
| Tenant-Scoped RBAC | RBAC with tenant isolation | Most multi-tenant apps |

### Data Encryption Strategies

| Data State | Strategy | Multi-Tenant Approach |
|------------|----------|----------------------|
| At Rest | AES-256 with KMS | Per-tenant encryption keys |
| In Transit | TLS 1.3 | Shared certificate, tenant SNI |
| In Use | Secure enclaves | Enterprise tier only |
| Backup | Encrypted snapshots | Tenant-isolated backups |

### Security Monitoring

Multi-tenant security monitoring requires tenant-aware logging and anomaly detection.

| Monitoring Type | Single-Tenant | Multi-Tenant |
|-----------------|--------------|--------------|
| Audit Logs | Centralized | Per-tenant + aggregate |
| Anomaly Detection | User behavior | Cross-tenant patterns |
| Alerting | Unified | Tier-based thresholds |
| Forensics | Single timeline | Tenant-isolated traces |

---

## Application Guidelines

When implementing security in a multi-tenant context:

1. **Never trust tenant_id from client** - Extract from authenticated session, never from request parameters
2. **Enforce RLS at database level** - Don't rely solely on application code for tenant isolation
3. **Use separate encryption keys per tenant** - Enables secure offboarding and compliance
4. **Implement defense in depth** - Multiple layers of tenant validation (API gateway, service, database)
5. **Audit all cross-tenant operations** - Platform admin actions affecting tenants require full audit trail
6. **Tier-appropriate security controls** - Enterprise tenants may require dedicated security features

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| How should we authenticate API requests? | JWT with tenant_id claim, validated at gateway | Stateless, scalable, carries tenant context |
| Should each tenant have separate encryption keys? | Yes, store in tenant-specific KMS paths | Enables secure deletion on offboarding, compliance |
| How to handle cross-tenant admin operations? | Require MFA + audit log + approval workflow | High-risk actions need elevated controls |
| What security monitoring per tenant? | Tier-based: Basic audit for Free, full SIEM for Enterprise | Balance cost with security requirements |
| How to implement API rate limiting? | Per-tenant quotas with tier multipliers | Prevent noisy neighbor, enable fair usage |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Security patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `security-*`
- **Tenant isolation:** `{project-root}/_bmad/bam/data/tenant-models.csv`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "multi-tenant security architecture patterns {date}"
- Search: "SaaS authentication best practices {date}"
- Search: "tenant isolation security controls {date}"

---

## Related Workflows

- `bmad-bam-ai-security` - Design AI/agent security controls
- `bmad-bam-continuous-security-setup` - Implement continuous security monitoring
- `bmad-bam-data-encryption-design` - Design encryption strategy
- `bmad-bam-secrets-management` - Configure secrets handling
- `bmad-bam-ddos-protection-design` - Implement DDoS protection
