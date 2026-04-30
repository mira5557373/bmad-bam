# Step 1: Authentication Requirements Analysis

## Purpose

Analyze enterprise authentication requirements and map the identity provider landscape for multi-tenant SaaS.

## Prerequisites

- [ ] Master architecture document exists (QG-F1 passed)
- [ ] Tenant model selected: `{tenant_model}`
- [ ] **Load pattern:** `{project-root}/_bmad/bam/data/patterns/sso-auth.md`

## Actions

### 1. Identify Authentication Requirements

Gather requirements across these dimensions:

| Dimension | Questions | Impact |
|-----------|-----------|--------|
| **Protocol** | SAML 2.0, OIDC, or both? | IdP compatibility |
| **IdP Landscape** | Which IdPs must be supported? | Integration scope |
| **User Types** | Admin, end-user, service account? | Auth flow design |
| **Compliance** | SOC 2, ISO 27001, FedRAMP? | Security controls |
| **Tier Variance** | Different auth per tier? | Complexity |

### 2. Map Identity Provider Landscape

Document IdP requirements per tenant tier:

| Tier | IdP Support | Protocols | JIT Provisioning | SCIM |
|------|-------------|-----------|------------------|------|
| Free | Platform IdP only | Password/OAuth | No | No |
| Pro | + Google, Microsoft | OIDC | Yes | No |
| Enterprise | + Okta, Azure AD, Ping, Custom | SAML 2.0, OIDC | Yes | Yes |

### 3. Analyze Multi-Tenant Requirements

**Tenant-Scoped Authentication:**

```
┌─────────────────────────────────────────────────────────┐
│                   Authentication Flow                    │
│                                                          │
│  User ──► Tenant Selection ──► IdP Redirect ──► Auth    │
│                   │                                │     │
│           tenant_id in state           tenant_id in      │
│                                        assertion/token   │
│                                                │         │
│                                       Session Created    │
│                                       (tenant-scoped)    │
└─────────────────────────────────────────────────────────┘
```

**Web Research (Required):**

Search the web: "multi-tenant SAML SSO best practices {date}"
Search the web: "tenant-aware OIDC authentication patterns {date}"

## Verification

- [ ] Protocol requirements documented (SAML/OIDC/both)
- [ ] IdP landscape mapped per tier
- [ ] User type matrix completed
- [ ] Compliance requirements identified
- [ ] Multi-tenant auth flow understood

## Outputs

- Authentication requirements document
- IdP landscape matrix
- Compliance checklist

## Next Step

Proceed to `step-02-c-sso-protocol.md` for SSO protocol design.
