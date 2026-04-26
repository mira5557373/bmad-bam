# Step 21: Validate Security Design Against Criteria

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 🚦 **HALT on CRITICAL failure** - Document and enter recovery protocol

## EXECUTION PROTOCOLS

- 🎯 Focus: Execute QG-S3 validation against security design artifact
- 💾 Track: `validateMode: true, stepsCompleted: [20, 21]` when complete
- 📖 Context: Loaded artifact and checklist from Step 20
- 🚫 Do NOT: Generate report yet; only perform validation
- 🔍 Use web search: Verify compliance with current security standards
- ⚠️ Gate: QG-S3 (Security Baseline) - execution

---

## Purpose

Execute comprehensive validation of the security design artifact against the QG-S3 security baseline checklist. Evaluate each check category and determine pass/fail status.

---

## Prerequisites

- Step 20 complete with artifact and checklist loaded
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-s3-security-baseline.md`

---

## Actions

### 1. Validate Authentication & Authorization (CRITICAL)

| Check | Artifact Evidence | Status |
|-------|-------------------|--------|
| **CRITICAL:** Tenant SSO integration configured | SSO section present | Pass/Fail |
| **CRITICAL:** API key rotation mechanism | API key management section | Pass/Fail |
| **CRITICAL:** RBAC policies per tenant tier | RBAC model section | Pass/Fail |
| **CRITICAL:** Service account credentials secured | Secret rotation section | Pass/Fail |
| **CRITICAL:** Session management with secure expiration | Session management section | Pass/Fail |
| MFA enforced for admin accounts | MFA enforcement section | Pass/Fail |
| OAuth 2.0/OIDC flows validated | SSO integration section | Pass/Fail |
| Token refresh mechanism | Token lifecycle section | Pass/Fail |
| Password policy documented | Authentication section | Pass/Fail |
| Account lockout policy configured | Authentication section | Pass/Fail |

**Category Result:** Pass / Fail / Conditional

### 2. Validate Network Security (CRITICAL)

| Check | Artifact Evidence | Status |
|-------|-------------------|--------|
| **CRITICAL:** Firewall rules with deny-by-default | Architecture diagram | Pass/Fail |
| **CRITICAL:** TLS 1.3 enforced | Encryption in transit | Pass/Fail |
| **CRITICAL:** VPN/private link for services | Network section | Pass/Fail |
| **CRITICAL:** Network segmentation | Architecture diagram | Pass/Fail |
| WAF rules deployed | Edge security | Pass/Fail |
| DDoS protection enabled | Edge security | Pass/Fail |
| API gateway rate limiting | Authorization section | Pass/Fail |
| Internal mTLS enabled | Encryption in transit | Pass/Fail |
| DNSSEC validated | Network section | Pass/Fail |
| Egress filtering | Network section | Pass/Fail |

**Category Result:** Pass / Fail / Conditional

### 3. Validate Data Protection (CRITICAL)

| Check | Artifact Evidence | Status |
|-------|-------------------|--------|
| **CRITICAL:** Encryption at rest (AES-256) | Encryption at rest section | Pass/Fail |
| **CRITICAL:** Encryption in transit (TLS 1.2+) | Encryption in transit section | Pass/Fail |
| **CRITICAL:** KMS configured | Key management section | Pass/Fail |
| **CRITICAL:** Key rotation schedule (90-day max) | Key management section | Pass/Fail |
| **CRITICAL:** Backup encryption verified | Data protection section | Pass/Fail |
| Data masking for sensitive fields | Data classification section | Pass/Fail |
| PII detection automated | Data classification section | Pass/Fail |
| Secure key storage (HSM/KMS) | Key management section | Pass/Fail |
| Certificate management automated | Secret rotation section | Pass/Fail |
| Data retention policies | Data classification section | Pass/Fail |

**Category Result:** Pass / Fail / Conditional

### 4. Validate Logging & Monitoring (Non-critical)

| Check | Artifact Evidence | Status |
|-------|-------------------|--------|
| **CRITICAL:** Audit logging for security events | Threat mitigations section | Pass/Fail |
| **CRITICAL:** Security alerts configured | Threat mitigations section | Pass/Fail |
| Log aggregation to SIEM | Logging section | Pass/Fail |
| Log retention meets compliance | Logging section | Pass/Fail |
| Real-time alerting for auth failures | Logging section | Pass/Fail |
| Privileged action logging | Audit section | Pass/Fail |
| Log integrity protection | Audit section | Pass/Fail |
| Security dashboard | Monitoring section | Pass/Fail |
| Incident response playbooks | Testing section | Pass/Fail |
| Log access restricted | Authorization section | Pass/Fail |

**Category Result:** Pass / Fail / Conditional

### 5. Validate Vulnerability Management (Non-critical)

| Check | Artifact Evidence | Status |
|-------|-------------------|--------|
| **CRITICAL:** Container image scanning | Testing requirements | Pass/Fail |
| **CRITICAL:** Critical vulns remediated | Remediation SLAs | Pass/Fail |
| Dependency scanning automated | Testing requirements | Pass/Fail |
| Infrastructure scanning scheduled | Testing requirements | Pass/Fail |
| Penetration testing (90-day) | Pen test scope | Pass/Fail |
| High-severity SLA: 7 days | Remediation SLAs | Pass/Fail |
| Medium-severity SLA: 30 days | Remediation SLAs | Pass/Fail |
| Vulnerability tracking integrated | Testing requirements | Pass/Fail |
| Third-party inventory maintained | Testing requirements | Pass/Fail |
| Patching process documented | Testing requirements | Pass/Fail |

**Category Result:** Pass / Fail / Conditional

### 6. Validate Multi-Tenant Isolation (CRITICAL)

| Check | Artifact Evidence | Status |
|-------|-------------------|--------|
| **CRITICAL:** Tenant isolation in auth layer | Authorization section | Pass/Fail |
| **CRITICAL:** Per-tenant encryption keys | Key management section | Pass/Fail |
| Tenant-specific RBAC isolated | RBAC model section | Pass/Fail |
| Cross-tenant access denied | Threat mitigations | Pass/Fail |
| Tenant API key scoping | API key management | Pass/Fail |
| Tenant session isolation | Session management | Pass/Fail |
| Per-tenant audit logs | Logging section | Pass/Fail |
| Tenant-specific policies | Authorization section | Pass/Fail |
| Data residency configurable | Data classification | Pass/Fail |

**Category Result:** Pass / Fail / Conditional

### 7. Validate AI-Specific Security (CRITICAL - if applicable)

| Check | Artifact Evidence | Status |
|-------|-------------------|--------|
| **CRITICAL:** Model access control per tenant | Authorization section | Pass/Fail/N/A |
| **CRITICAL:** Prompt injection defenses | Threat mitigations | Pass/Fail/N/A |
| AI service authentication | Authentication section | Pass/Fail/N/A |
| Model API rate limiting per tenant | Authorization section | Pass/Fail/N/A |
| AI request logging with tenant context | Logging section | Pass/Fail/N/A |
| Prompt templates secured | Data protection | Pass/Fail/N/A |
| AI response sanitization | Threat mitigations | Pass/Fail/N/A |
| Model versioning audit trail | Testing requirements | Pass/Fail/N/A |

**Category Result:** Pass / Fail / Conditional / N/A

### 8. Web Research Verification

**Verify current security standards:**
Search the web: "OWASP ASVS security checklist {date}"
Search the web: "multi-tenant security validation best practices {date}"
Search the web: "SaaS security compliance checklist {date}"

_Source: [URL]_

---

## Validation Summary

| Category | Classification | Checks | Passed | Result |
|----------|----------------|--------|--------|--------|
| Authentication & Authorization | CRITICAL | 10 | /10 | |
| Network Security | CRITICAL | 10 | /10 | |
| Data Protection | CRITICAL | 10 | /10 | |
| Logging & Monitoring | Non-critical | 10 | /10 | |
| Vulnerability Management | Non-critical | 10 | /10 | |
| Multi-Tenant Isolation | CRITICAL | 9 | /9 | |
| AI-Specific Security | CRITICAL | 8 | /8 | |
| **Total** | | 67 | /67 | |

⏸️ **PAUSE:** Present validation results and await confirmation before generating report.

---

## Verification

- [ ] All CRITICAL checks evaluated
- [ ] All Non-critical checks evaluated
- [ ] Multi-tenant specific checks validated
- [ ] AI-specific checks validated (if applicable)
- [ ] Web research verification completed
- [ ] Category results determined

---

## Outputs

- Validation results per category
- Check-by-check status
- Evidence mapping

---

## Next Step

Proceed to `step-22-v-report.md` to generate validation report with gate decision.
