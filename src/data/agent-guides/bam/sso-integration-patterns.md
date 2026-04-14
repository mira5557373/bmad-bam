# SSO Integration Patterns

**When to load:** When implementing SOC2 access control requirements, enterprise SSO integration, or identity federation for multi-tenant SaaS

**Integrates with:** Security agent, Architect (Atlas persona), Dev agent

---

## Core Concepts

### Identity Federation Protocols

Identity federation enables users to authenticate with external identity providers. Two primary protocols dominate enterprise SSO integration, each with distinct characteristics.

| Protocol | Token Format | Best For | Considerations |
|----------|--------------|----------|----------------|
| SAML 2.0 | XML assertions | Legacy enterprise IdPs, strict compliance | Verbose, complex, well-established |
| OIDC/OAuth 2.0 | JWT tokens | Modern applications, API access | Simpler, JSON-based, mobile-friendly |

### User Provisioning and Lifecycle

User provisioning automates account creation, updates, and deactivation based on identity provider changes. SCIM (System for Cross-domain Identity Management) is the standard protocol for this automation.

- **Just-in-Time (JIT)**: Create user account on first SSO login
- **SCIM Push**: IdP pushes user changes to application in real-time
- **SCIM Pull**: Application periodically syncs from IdP directory
- **Deprovisioning**: Automatic access revocation when user removed from IdP

### Per-Tenant SSO Configuration

Multi-tenant platforms must isolate SSO configurations per tenant while providing self-service management. Enterprise tenants expect to integrate their corporate identity providers without vendor assistance.

| Capability | Standard Tier | Enterprise Tier |
|------------|---------------|-----------------|
| SSO protocols | OIDC only | SAML + OIDC |
| IdP connections | 1 | Multiple |
| SCIM provisioning | Not available | Full support |
| MFA enforcement | Platform default | Tenant configurable |
| Session policies | Fixed | Custom timeouts |

## Overview

SSO integration patterns establish approaches for federated identity management in multi-tenant SaaS environments. These patterns enable enterprise tenants to use their existing identity providers while maintaining security controls, audit trails, and compliance with access management requirements across regulatory frameworks.

## Compliance Requirements

- **Authentication**: Secure authentication using industry standards (SAML, OIDC)
- **Authorization**: Role-based access control with tenant-scoped permissions
- **Session Management**: Secure session handling with appropriate timeouts
- **Audit Logging**: Complete audit trail of authentication and authorization events
- **MFA Support**: Multi-factor authentication integration

## Implementation Patterns

| Pattern | Description | Frameworks |
|---------|-------------|------------|
| SAML 2.0 Federation | Enterprise IdP integration using SAML protocol | SOC2, Enterprise |
| OIDC/OAuth 2.0 | Modern identity protocol support with JWT tokens | SOC2, All frameworks |
| Per-Tenant IdP Configuration | Self-service SSO configuration per tenant | Multi-tenant, Enterprise |
| SCIM Provisioning | Automated user provisioning and deprovisioning | SOC2, Enterprise |
| Just-in-Time Provisioning | Automatic account creation on first SSO login | Multi-tenant |
| MFA Enforcement | Tenant-configurable multi-factor authentication requirements | SOC2, HIPAA, PCI-DSS |

## Validation Checklist

- [ ] SAML and OIDC protocols are supported
- [ ] Per-tenant IdP configuration is functional
- [ ] User provisioning/deprovisioning is automated
- [ ] MFA can be enforced at tenant level
- [ ] Session management meets security requirements
- [ ] Authentication events are logged completely
- [ ] SSO failure scenarios are handled gracefully
- [ ] IdP metadata is validated and refreshed

## Application Guidelines

When implementing SSO integration:

1. **Support standard protocols**: Implement both SAML 2.0 and OIDC for broad IdP compatibility
2. **Design self-service configuration**: Allow tenant admins to configure SSO without support tickets
3. **Implement SCIM provisioning**: Enable automated user lifecycle management
4. **Enforce session policies**: Apply appropriate session timeouts and re-authentication requirements
5. **Handle SSO failures gracefully**: Provide clear error messages and fallback options

When building SSO for multi-tenant platforms:

1. **Isolate IdP configurations**: Store tenant IdP settings separately and securely
2. **Support multiple IdPs per tenant**: Allow enterprise tenants to configure multiple identity providers
3. **Enable MFA enforcement**: Let tenants mandate multi-factor authentication for their users
4. **Provide SSO analytics**: Give tenants visibility into authentication patterns and failures

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Security patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `security-*`
- **Compliance patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "enterprise SSO multi-tenant SaaS {date}"
- Search: "SCIM provisioning implementation {date}"
- Search: "SAML OIDC SaaS best practices {date}"

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Should we support both SAML and OIDC? | Yes, support both protocols | SAML for legacy enterprise IdPs; OIDC for modern implementations |
| When to require MFA at platform vs tenant level? | Platform enforces minimum, tenants can add stricter | Establishes security baseline while allowing enterprise customization |
| How to handle SSO failures for tenant users? | Fallback to platform login with notification to tenant admin | Maintains access during IdP outages; alerts admins to configuration issues |
| Should SCIM provisioning be real-time or batched? | Real-time with batch fallback for high-volume changes | Immediate provisioning for security; batch for efficiency during bulk operations |
| Per-tenant or shared SSO metadata storage? | Per-tenant isolated storage with encryption at rest | Prevents cross-tenant IdP configuration exposure |

---

## Related Workflows

- `bmad-bam-tenant-onboarding-design` - Configure SSO during tenant provisioning
- `bmad-bam-security-review` - Audit SSO implementation for compliance
- `bmad-bam-tenant-offboarding-design` - Revoke SSO access during offboarding

---

## References

- `compliance` - General compliance pattern from bam-patterns.csv
- `tenant-isolation` - Tenant separation from bam-patterns.csv
- `audit-logging-patterns` - Authentication event logging
- `all-security-patterns` - Comprehensive security controls
- `tenant-lifecycle` - User provisioning in tenant lifecycle
