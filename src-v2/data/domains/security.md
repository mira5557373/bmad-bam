# Security - BAM Domain Context

**Loaded by:** ZSA, ZST  
**Related Workflows:** bmad-bam-security-threat-model, bmad-bam-security-baseline

---

## Overview

Security in multi-tenant SaaS requires defense in depth with tenant isolation as the primary security boundary.

## Core Concepts

### Defense in Depth

```
┌─────────────────────────────────────┐
│ Edge (WAF, DDoS)                    │
├─────────────────────────────────────┤
│ Gateway (AuthN, Rate Limit)         │
├─────────────────────────────────────┤
│ Service (AuthZ, Tenant Check)       │
├─────────────────────────────────────┤
│ Data (RLS, Encryption)              │
└─────────────────────────────────────┘
```

### Tenant Security Boundaries

| Layer | Control | Enforcement |
|-------|---------|-------------|
| Network | VPC/Subnet | Per-tier |
| Application | JWT claims | Every request |
| Database | RLS policies | Every query |
| Storage | Path prefixes | Every access |

### Secret Management

| Secret Type | Storage | Rotation |
|-------------|---------|----------|
| Platform | Vault | 90 days |
| Tenant API keys | Encrypted DB | On-demand |
| Customer-managed | External KMS | Customer-controlled |

## Decision Matrix

| Security Requirement | Implementation | Tenant Impact |
|----------------------|----------------|---------------|
| Authentication | OAuth 2.0 / OIDC | Per-tenant IdP |
| Authorization | RBAC + tenant check | Scoped permissions |
| Encryption at rest | AES-256 | Tenant key option |
| Encryption in transit | TLS 1.3 | All traffic |

## Quality Checks

- [ ] Authentication enforced at all entry points
- [ ] Authorization checks include tenant validation
- [ ] Secrets management uses tenant-scoped vaults
- [ ] **CRITICAL:** No privilege escalation across tenants

## Web Research Queries

- "multi-tenant security patterns {date}"
- "SaaS security best practices {date}"
