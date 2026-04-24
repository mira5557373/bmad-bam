# QG-S3: Security Baseline Gate Checklist

**Gate ID:** QG-S3
**Phase:** 3-solutioning (Pre-Deployment)
**Dependencies:** QG-M1 (Module Architecture), QG-M2 (Tenant Isolation)

---

## Purpose

Verify security baseline configuration is complete and properly configured before module deployment. This gate ensures foundational security controls are in place across authentication, network, data protection, logging, and vulnerability management domains.

---

## Critical vs Non-Critical Classification

| Category | Classification | CONDITIONAL Threshold | FAIL Threshold |
|----------|----------------|----------------------|----------------|
| Authentication & Authorization | CRITICAL | Minor policy gaps | No auth configured |
| Network Security | CRITICAL | WAF partial | No firewall/TLS |
| Data Protection | CRITICAL | Key rotation pending | No encryption |
| Logging & Monitoring | Non-critical | 75% coverage | <50% coverage |
| Vulnerability Management | Non-critical | 75% compliance | Critical vulns open |
| Multi-Tenant Isolation | CRITICAL | Cross-tenant test gaps | No isolation |
| AI-Specific Security | CRITICAL | Rate limiting gaps | No prompt defense |

---

## Authentication & Authorization Checks

- [ ] **CRITICAL:** Tenant SSO integration configured and tested
- [ ] **CRITICAL:** API key rotation mechanism implemented
- [ ] **CRITICAL:** RBAC policies defined per tenant tier
- [ ] **CRITICAL:** Service account credentials secured in vault
- [ ] **CRITICAL:** Session management with secure token expiration
- [ ] Multi-factor authentication enforced for admin accounts
- [ ] OAuth 2.0/OIDC flows validated with identity provider
- [ ] Token refresh mechanism tested for long-running sessions
- [ ] Password policy meets complexity requirements (min 12 chars, special chars)
- [ ] Account lockout policy configured (5 attempts, 15-minute lockout)

## Network Security Checks

- [ ] **CRITICAL:** Firewall rules configured with deny-by-default
- [ ] **CRITICAL:** TLS 1.3 enforced for all external connections
- [ ] **CRITICAL:** VPN/private link configured for inter-service communication
- [ ] **CRITICAL:** Network segmentation isolates tenant workloads
- [ ] Web Application Firewall (WAF) rules deployed
- [ ] DDoS protection enabled at network edge
- [ ] API gateway rate limiting configured per tenant
- [ ] Internal service mesh mTLS enabled
- [ ] DNS security (DNSSEC) validated
- [ ] Egress filtering prevents unauthorized outbound connections

## Data Protection Checks

- [ ] **CRITICAL:** Encryption at rest enabled (AES-256 minimum)
- [ ] **CRITICAL:** Encryption in transit enforced (TLS 1.2+)
- [ ] **CRITICAL:** Key management system (KMS) configured
- [ ] **CRITICAL:** Key rotation schedule established (90-day maximum)
- [ ] **CRITICAL:** Backup encryption verified
- [ ] Data masking configured for sensitive fields
- [ ] PII detection and classification automated
- [ ] Secure key storage (HSM or cloud KMS)
- [ ] Certificate management automated with renewal alerts
- [ ] Data retention policies implemented per compliance requirements

## Logging & Monitoring Checks

- [ ] **CRITICAL:** Audit logging enabled for all security events
- [ ] **CRITICAL:** Security alerts configured for critical events
- [ ] Log aggregation to centralized SIEM operational
- [ ] Log retention meets compliance requirements (minimum 1 year)
- [ ] Real-time alerting for authentication failures
- [ ] Privileged action logging with user attribution
- [ ] Log integrity protection (tamper-evident)
- [ ] Security dashboard with key metrics visible
- [ ] Incident response playbooks linked to alert types
- [ ] Log access restricted to authorized security personnel

## Vulnerability Management Checks

- [ ] **CRITICAL:** Container image scanning in CI/CD pipeline
- [ ] **CRITICAL:** Critical vulnerabilities remediated (zero tolerance)
- [ ] Dependency scanning (SCA) automated
- [ ] Infrastructure vulnerability scanning scheduled weekly
- [ ] Penetration testing completed within last 90 days
- [ ] High-severity vulnerability SLA: 7 days
- [ ] Medium-severity vulnerability SLA: 30 days
- [ ] Vulnerability tracking integrated with ticketing system
- [ ] Third-party component inventory maintained
- [ ] Security patching process documented and tested

---

## Multi-Tenant Considerations

- [ ] **CRITICAL:** Tenant isolation verified in authentication layer
- [ ] **CRITICAL:** Per-tenant encryption keys configured
- [ ] Tenant-specific RBAC policies isolated
- [ ] Cross-tenant access explicitly denied and tested
- [ ] Tenant API key scoping prevents cross-tenant access
- [ ] Tenant session isolation verified (no session leakage)
- [ ] Per-tenant audit log segregation enabled
- [ ] Tenant-specific security policies enforceable
- [ ] Tenant data residency requirements configurable

---

## AI-Specific Checks

- [ ] **CRITICAL:** Model access control per tenant configured
- [ ] **CRITICAL:** Prompt injection defenses enabled
- [ ] AI service authentication uses short-lived tokens
- [ ] Model API rate limiting per tenant
- [ ] AI request logging captures tenant context
- [ ] Prompt templates secured (no credential injection)
- [ ] AI response sanitization prevents data leakage
- [ ] Model versioning with security audit trail

---

## Web Research Verification

- [ ] Search the web: "multi-tenant security baseline best practices {date}"
- [ ] Search the web: "API key management security patterns {date}"
- [ ] Search the web: "zero trust architecture implementation {date}"
- [ ] _Source: [URL]_ citations documented for all research findings

---

## Recovery Protocol

**If gate triggers CONDITIONAL or FAIL status:**

1. **Attempt 1:** Address identified security gaps (target: 1-2 days)
   - Review failed checks and identify root cause
   - Prioritize CRITICAL items for immediate remediation
   - Implement targeted fixes with security team review
   - Re-run QG-S3 validation
   - **Lock passed categories**

2. **Attempt 2:** Deeper security investigation (target: 1 week)
   - Engage Security Architecture team
   - Review threat model for missed attack vectors
   - Audit security configurations against baseline
   - Apply corrective measures with peer review
   - Re-run validation
   - **Preserve locked categories**

3. **Mandatory Course Correction:**
   - Escalate to CISO and security leadership
   - Document blockers in security risk register
   - Implement compensating controls if baseline cannot be met
   - Reassess deployment timeline with stakeholders

**Category-Specific Recovery:**

| Category | Immediate Action | Escalation Trigger |
|----------|------------------|-------------------|
| Authentication & Authorization | Configure tenant SSO; implement API key rotation; secure service credentials | No auth configured or credentials exposed |
| Network Security | Configure firewall deny-by-default; enforce TLS 1.3; enable network segmentation | No firewall or TLS not enforced |
| Data Protection | Enable AES-256 encryption at rest; configure KMS; establish key rotation schedule | No encryption or KMS not configured |
| Logging & Monitoring | Enable audit logging; configure security alerts; deploy log aggregation | Audit logging disabled or no security alerts |
| Vulnerability Management | Enable container image scanning; remediate critical vulnerabilities | Critical vulnerabilities remain open |
| Multi-Tenant Isolation | Verify tenant isolation in auth layer; configure per-tenant encryption keys | Cross-tenant access possible or no isolation |
| AI-Specific Security | Configure model access control per tenant; enable prompt injection defenses | No model access control or prompt injection possible |

---

## Related Workflows

- `bmad-bam-security-operations-verification` - Full security audit
- `bmad-bam-tenant-model-isolation` - Tenant isolation design
- `validate-module` - Module security validation

---

## Gate Decision

| Outcome | Criteria |
|---------|----------|
| **PASS** | All CRITICAL checks pass, Required categories achieve 90%+ |
| **CONDITIONAL** | All CRITICAL checks pass, Required categories achieve 75%+ with documented remediation plan and 14-day deadline |
| **FAIL** | Any CRITICAL check fails |
| **WAIVED** | Non-critical item explicitly waived with stakeholder sign-off and documented justification |

## Waiver Process

For non-critical items that cannot be addressed:
1. Document the specific item and reason for waiver
2. Identify business justification
3. Obtain stakeholder sign-off (Product Owner or Technical Lead)
4. Record waiver in gate report with expiration date (if applicable)
5. Create follow-up ticket for future remediation

**Note:** CRITICAL items cannot be waived.

---

**PASS CRITERIA:** All CRITICAL checkboxes completed, Required categories at threshold
**OWNER:** Security Architecture
**REVIEWERS:** CISO, Platform Engineering, Compliance
