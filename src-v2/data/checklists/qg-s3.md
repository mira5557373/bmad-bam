---
name: qg-s3-security-baseline
description: Security baseline gate - OWASP controls, encryption standards, access control, authentication patterns for multi-tenant SaaS
module: bam
tags: [security, quality-gate, multi-tenant, owasp, encryption, authentication, access-control]
version: 2.0.0
---

# QG-S3: Security Baseline Gate Checklist

> **Gate ID:** QG-S3 (Security Baseline)
> **Definition:** Security baseline MUST be validated before module deployment.
> **Scope:** Covers OWASP Top 10 controls, encryption at rest/transit, access control, and authentication patterns.
> **Recovery:** Gate failure requires security remediation before deployment proceeds.

**Workflow:** bmad-bam-security-operations-verification, bmad-bam-validate-module
**Prerequisites:** QG-M1 (Module Architecture), QG-M2 (Tenant Isolation)

---

## Purpose

The Security Baseline Gate (QG-S3) validates that foundational security controls are properly implemented before module deployment. This gate ensures:

1. **Authentication and authorization** controls are properly configured for multi-tenant access
2. **OWASP Top 10** vulnerabilities are addressed with appropriate mitigations
3. **Encryption standards** meet compliance requirements (AES-256, TLS 1.3)
4. **Access control** mechanisms enforce tenant isolation and least privilege
5. **Network security** follows defense-in-depth principles

Passing QG-S3 confirms the security baseline is ready for production deployment.

---

## Authentication and Authorization

### Authentication Controls

- [ ] **CRITICAL:** Tenant SSO integration configured and tested
- [ ] **CRITICAL:** API key rotation mechanism implemented (90-day maximum)
- [ ] **CRITICAL:** Service account credentials secured in vault (HashiCorp Vault, AWS Secrets Manager)
- [ ] **CRITICAL:** Session management with secure token expiration (short-lived tokens < 1 hour)
- [ ] Multi-factor authentication enforced for admin accounts
- [ ] OAuth 2.0/OIDC flows validated with identity provider
- [ ] Token refresh mechanism tested for long-running sessions
- [ ] Password policy meets complexity requirements (min 12 chars, special chars)
- [ ] Account lockout policy configured (5 attempts, 15-minute lockout)
- [ ] Federated identity provider integration verified

### Authorization Controls

- [ ] **CRITICAL:** RBAC policies defined per tenant tier
- [ ] **CRITICAL:** JWT tenant_id claim validation enforced
- [ ] **CRITICAL:** API key scoping prevents cross-tenant access
- [ ] Permission inheritance model documented and tested
- [ ] Admin privilege escalation prevention verified
- [ ] Resource quotas enforced per tenant tier
- [ ] Feature flag access controlled per tenant
- [ ] Bulk operation limits per tenant enforced

---

## OWASP Top 10 Controls

### A01: Broken Access Control

- [ ] **CRITICAL:** Tenant context validated in every request
- [ ] **CRITICAL:** Row-Level Security (RLS) enforced on all tenant data
- [ ] **CRITICAL:** Cross-tenant access attempts logged and alerted
- [ ] Deny-by-default access control policy implemented
- [ ] CORS policies properly configured
- [ ] Directory traversal prevention verified
- [ ] Metadata manipulation prevention (JWT claims, cookies)

### A02: Cryptographic Failures

- [ ] **CRITICAL:** Encryption at rest enabled (AES-256 minimum)
- [ ] **CRITICAL:** Encryption in transit enforced (TLS 1.3)
- [ ] **CRITICAL:** Key management system (KMS) configured
- [ ] No sensitive data in URLs or logs
- [ ] Deprecated cryptographic algorithms removed (MD5, SHA1, DES)
- [ ] Certificate management automated with renewal alerts
- [ ] Secure random number generation verified

### A03: Injection

- [ ] **CRITICAL:** Input validation on all user inputs
- [ ] **CRITICAL:** Parameterized queries for database access
- [ ] **CRITICAL:** Output encoding for all rendered content
- [ ] ORM/safe API usage verified
- [ ] Command injection prevention in system calls
- [ ] LDAP injection prevention verified
- [ ] XPath injection prevention verified

### A04: Insecure Design

- [ ] **CRITICAL:** Threat modeling completed for tenant isolation
- [ ] **CRITICAL:** Security requirements defined in user stories
- [ ] Secure design patterns documented and followed
- [ ] Defense-in-depth architecture implemented
- [ ] Plausibility checks for user input
- [ ] Rate limiting per tenant configured

### A05: Security Misconfiguration

- [ ] **CRITICAL:** Security headers configured (CSP, X-Frame-Options, HSTS)
- [ ] **CRITICAL:** Default credentials changed/disabled
- [ ] **CRITICAL:** Error handling does not expose stack traces
- [ ] Unnecessary features and services disabled
- [ ] Cloud storage permissions secured (no public access)
- [ ] XML external entity processing disabled
- [ ] Debug endpoints disabled in production

### A06: Vulnerable Components

- [ ] **CRITICAL:** Container image scanning in CI/CD pipeline
- [ ] **CRITICAL:** Critical vulnerabilities remediated (zero tolerance)
- [ ] **CRITICAL:** Dependency scanning (SCA) automated
- [ ] Component inventory maintained
- [ ] Third-party component versions tracked
- [ ] Security patching process documented
- [ ] End-of-life components replaced

### A07: Authentication Failures

- [ ] **CRITICAL:** Credential stuffing protection enabled
- [ ] **CRITICAL:** Brute force protection implemented
- [ ] Session fixation prevention verified
- [ ] Secure session storage implemented
- [ ] Logout functionality properly invalidates sessions
- [ ] Password recovery process secure (token-based)
- [ ] Multi-factor authentication available

### A08: Integrity Failures

- [ ] **CRITICAL:** Code signing for deployments verified
- [ ] **CRITICAL:** CI/CD pipeline security validated
- [ ] Software provenance verified (SBOM)
- [ ] Deserialization attacks prevented
- [ ] Artifact checksums verified on deployment
- [ ] Auto-update mechanisms secure
- [ ] Third-party code review process exists

### A09: Logging and Monitoring Failures

- [ ] **CRITICAL:** Audit logging enabled for all security events
- [ ] **CRITICAL:** Security alerts configured for critical events
- [ ] Log aggregation to centralized SIEM operational
- [ ] Log retention meets compliance requirements (minimum 1 year)
- [ ] Log tampering protection (immutable logs)
- [ ] Failed login attempts logged and alerted
- [ ] Privileged action logging with user attribution

### A10: Server-Side Request Forgery (SSRF)

- [ ] **CRITICAL:** URL validation for all external requests
- [ ] **CRITICAL:** Allowlist for external service calls
- [ ] Internal metadata endpoints blocked
- [ ] DNS rebinding prevention implemented
- [ ] HTTP redirects limited and validated
- [ ] Response filtering prevents data exfiltration

---

## Network Security

### Network Perimeter

- [ ] **CRITICAL:** Firewall rules configured with deny-by-default
- [ ] **CRITICAL:** VPN/private link configured for inter-service communication
- [ ] **CRITICAL:** Network segmentation isolates tenant workloads
- [ ] Web Application Firewall (WAF) rules deployed
- [ ] DDoS protection enabled at network edge
- [ ] API gateway rate limiting configured per tenant
- [ ] Egress filtering prevents unauthorized outbound connections

### Service Mesh Security

- [ ] **CRITICAL:** mTLS for service-to-service communication
- [ ] Service mesh security (Istio/Linkerd) configured
- [ ] Internal service authentication required
- [ ] Network policies per namespace
- [ ] DNS security (DNSSEC) validated

---

## Data Protection

### Encryption at Rest

- [ ] **CRITICAL:** Database encryption enabled (AES-256)
- [ ] **CRITICAL:** Backup encryption verified
- [ ] **CRITICAL:** Key rotation schedule established (90-day maximum)
- [ ] Vector store encryption verified
- [ ] Object storage encryption enabled
- [ ] Encryption key per tenant (if compliance requires)
- [ ] Log storage encryption enabled

### Encryption in Transit

- [ ] **CRITICAL:** TLS 1.3 enforced for all external connections
- [ ] **CRITICAL:** Certificate management automated
- [ ] HSTS headers configured with preload
- [ ] Certificate pinning (mobile apps) verified
- [ ] Internal traffic encryption enabled
- [ ] WebSocket connections secured (WSS)

### Secrets Management

- [ ] **CRITICAL:** Secrets manager operational (HashiCorp Vault, AWS Secrets Manager)
- [ ] **CRITICAL:** No secrets in code repositories
- [ ] **CRITICAL:** Secret rotation policies defined
- [ ] Dynamic secrets generation configured
- [ ] Secret access auditing enabled
- [ ] Database credential rotation automated

---

## Multi-Tenant Security

### Tenant Isolation

- [ ] **CRITICAL:** Tenant isolation verified in authentication layer
- [ ] **CRITICAL:** Per-tenant encryption keys configured (if required)
- [ ] **CRITICAL:** Cross-tenant access explicitly denied and tested
- [ ] Tenant-specific RBAC policies isolated
- [ ] Tenant session isolation verified (no session leakage)
- [ ] Per-tenant audit log segregation enabled
- [ ] Tenant data residency requirements configurable

### Tenant API Security

- [ ] **CRITICAL:** API rate limiting per tenant tier
- [ ] **CRITICAL:** Tenant-scoped API keys
- [ ] API quota enforcement per tenant
- [ ] Tenant-specific IP allowlisting (enterprise tier)
- [ ] Cross-tenant API call prevention verified

---

## AI-Specific Security (if applicable)

### Model Access Control

- [ ] **CRITICAL:** Model access control per tenant configured
- [ ] **CRITICAL:** Prompt injection defenses enabled
- [ ] AI service authentication uses short-lived tokens
- [ ] Model API rate limiting per tenant
- [ ] AI request logging captures tenant context
- [ ] Prompt templates secured (no credential injection)
- [ ] AI response sanitization prevents data leakage

### Agent Security Baseline

- [ ] **CRITICAL:** Tool permissions enforce least privilege
- [ ] **CRITICAL:** Agent memory scoped to tenant context
- [ ] Kill switch mechanism verified
- [ ] Human-in-the-loop for high-risk operations
- [ ] Agent collaboration limited to same-tenant

---

## Gate Decision

| Classification | Criteria |
|----------------|----------|
| **PASS** | All CRITICAL items pass, >=90% of non-critical items pass |
| **CONDITIONAL** | All CRITICAL items pass, 75-89% non-critical pass - remediation plan required with 14-day deadline |
| **FAIL** | Any CRITICAL item fails - block deployment until resolved |
| **WAIVED** | Non-critical item explicitly waived with stakeholder sign-off and documented justification |

---

## Critical vs Non-Critical Classification

| Category | Classification | CONDITIONAL Threshold | FAIL Threshold |
|----------|----------------|----------------------|----------------|
| Authentication & Authorization | CRITICAL | Minor policy gaps | No auth configured |
| OWASP A01-A03 (Access, Crypto, Injection) | CRITICAL | Partial implementation | Any vulnerability exploitable |
| OWASP A04-A06 (Design, Config, Components) | CRITICAL | Minor gaps documented | Critical vulnerability open |
| OWASP A07-A10 (Auth, Integrity, Log, SSRF) | CRITICAL | Partial coverage | Security event unlogged |
| Network Security | CRITICAL | WAF partial | No firewall/TLS |
| Data Protection | CRITICAL | Key rotation pending | No encryption |
| Multi-Tenant Isolation | CRITICAL | Cross-tenant test gaps | No isolation |
| AI-Specific Security | CRITICAL | Rate limiting gaps | No prompt defense |

---

## Waiver Process

For non-critical items that cannot be addressed:

1. **Document** the specific item and reason for waiver request
2. **Justify** the business rationale and compensating controls
3. **Obtain** stakeholder sign-off (Security Lead, Product Owner)
4. **Record** waiver in gate report with expiration date
5. **Create** follow-up ticket for future remediation with priority

**Note:** CRITICAL items cannot be waived. All CRITICAL items must pass for gate approval.

---

## Recovery Protocol

**If QG-S3 fails:**

### Attempt 1: Immediate Remediation (target: 1-2 days)

1. Review failed checks and identify root cause
2. Prioritize CRITICAL items for immediate remediation
3. Implement targeted fixes with security team review
4. Execute security-focused testing after fixes
5. Re-run QG-S3 validation
6. **Lock passed categories** - do not re-test locked items

### Attempt 2: Deep Security Investigation (target: 1 week)

1. Engage Security Architecture team
2. Review threat model for missed attack vectors
3. Audit security configurations against OWASP ASVS
4. Apply corrective measures with peer review
5. Conduct targeted penetration testing
6. Re-run validation
7. **Preserve locked categories** from Attempt 1

### Attempt 3: Mandatory Course Correction

1. Escalate to CISO and security leadership
2. Document blockers in security risk register
3. Implement compensating controls if baseline cannot be met
4. Conduct security architecture review session
5. Reassess deployment timeline with stakeholders
6. Schedule security audit within 30 days

### Category-Specific Recovery

| Category | Immediate Action | Escalation Trigger |
|----------|------------------|-------------------|
| Authentication & Authorization | Configure tenant SSO; implement API key rotation | No auth configured after 2 attempts |
| OWASP Controls | Address specific vulnerability; implement mitigation | Any A01-A03 vulnerability exploitable |
| Network Security | Configure firewall deny-by-default; enforce TLS 1.3 | No firewall or TLS not enforced |
| Data Protection | Enable AES-256 encryption; configure KMS | No encryption or KMS not configured |
| Multi-Tenant Isolation | Verify tenant isolation in auth layer | Cross-tenant access possible |
| AI-Specific Security | Configure model access control per tenant | No model access control |

---

## Related Workflows

- `bmad-bam-security-operations-verification` - Full security audit
- `bmad-bam-tenant-model-isolation` - Tenant isolation design
- `bmad-bam-validate-module` - Module security validation
- `bmad-bam-convergence-verification` - Integration security checks

---

## Required Templates

| Template | Purpose | Location |
|----------|---------|----------|
| `security-architecture-template.md` | Security architecture document | `{output_folder}/planning-artifacts/` |
| `threat-model-template.md` | Threat modeling documentation | `{output_folder}/planning-artifacts/` |
| `security-baseline-template.md` | Security baseline configuration | `{output_folder}/planning-artifacts/` |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Security patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` - filter: `security-*`
- **Tenant isolation patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`
- **Compliance frameworks:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

### Web Research

- Search: "OWASP Top 10 mitigation patterns SaaS {date}"
- Search: "multi-tenant security baseline best practices {date}"
- Search: "API key management security patterns {date}"
- Search: "zero trust architecture implementation {date}"

---

## Web Research Verification

- [ ] Search the web: "OWASP ASVS security verification checklist {date}" - Verify control coverage
- [ ] Search the web: "multi-tenant security baseline best practices {date}" - Confirm tenant isolation patterns
- [ ] Search the web: "encryption at rest best practices cloud {date}" - Validate encryption standards
- [ ] _Source: [URL]_ citations documented for key security decisions

---

**PASS CRITERIA:** All CRITICAL checkboxes completed, required categories at threshold
**OWNER:** Security Architecture
**REVIEWERS:** CISO, Platform Engineering, Compliance
