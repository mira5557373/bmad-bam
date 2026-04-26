# Step 04: Validate Security and Compliance

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 🔐 **VERIFY all CRITICAL security checks** pass before proceeding

## EXECUTION PROTOCOLS

- 🎯 Focus: Validate security hardening and compliance readiness
- 💾 Track: `stepsCompleted: [1, 2, 3, 4]` when complete
- 📖 Context: Security hardening, compliance, pen test, secrets, network
- 🚫 Do NOT: Make GO/NO-GO decision (that's Step 05)
- 🔍 Use web search: Verify security patterns against current OWASP/CIS best practices
- ⚠️ Gate: QG-P1 - Security is CRITICAL category (blocking)

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Security hardening checklist
- Compliance requirements verification
- Penetration test results review
- Secret management and rotation policies
- Network security and firewall rules

**OUT OF SCOPE:**
- Final GO/NO-GO decision (Step 05)
- Infrastructure configuration (Step 02)
- Observability setup (Step 03)

---

## Purpose

Validate security hardening measures and compliance readiness for production deployment. This includes reviewing penetration test results, verifying secret management, and confirming network security controls. Security is a CRITICAL blocking category for QG-P1.

---

## Prerequisites

- Step 03 completed: Observability analysis done
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: security
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-security-continuous.md`

---

## Inputs

- Security assessment reports
- Penetration test results
- Compliance documentation
- Network architecture diagrams
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## YOUR TASK:

Validate security and compliance readiness across all CRITICAL categories.

---

## Main Sequence

### 1. Security Hardening Checklist

#### 1.1 Authentication & Authorization

| Check | Status | Evidence |
|-------|--------|----------|
| MFA enabled for admin access | YES/NO | {{evidence}} |
| JWT/OAuth properly configured | YES/NO | {{evidence}} |
| Session management secure | YES/NO | {{evidence}} |
| Password policy enforced | YES/NO | {{evidence}} |
| API key rotation implemented | YES/NO | {{evidence}} |
| RBAC/ABAC configured | YES/NO | {{evidence}} |

**CRITICAL Criteria:**
- [ ] **CRITICAL:** No hardcoded credentials in code
- [ ] **CRITICAL:** MFA for all admin/privileged access
- [ ] **CRITICAL:** Token expiration properly configured
- [ ] Session hijacking protections in place

#### 1.2 Data Protection

| Check | Status | Evidence |
|-------|--------|----------|
| Encryption at rest | YES/NO | {{algorithm}} |
| Encryption in transit (TLS 1.3) | YES/NO | {{evidence}} |
| PII data identified and protected | YES/NO | {{evidence}} |
| Data masking in logs | YES/NO | {{evidence}} |
| Backup encryption | YES/NO | {{evidence}} |

**CRITICAL Criteria:**
- [ ] **CRITICAL:** All data encrypted at rest
- [ ] **CRITICAL:** TLS 1.2+ for all connections
- [ ] **CRITICAL:** PII handling compliant
- [ ] Tenant data isolation verified

#### 1.3 Application Security

| Check | Status | Last Scan |
|-------|--------|-----------|
| SAST (Static Analysis) | PASS/FAIL | {{date}} |
| DAST (Dynamic Analysis) | PASS/FAIL | {{date}} |
| Dependency vulnerability scan | PASS/FAIL | {{date}} |
| Container image scan | PASS/FAIL | {{date}} |
| OWASP Top 10 mitigated | PASS/FAIL | {{date}} |

**CRITICAL Criteria:**
- [ ] **CRITICAL:** No critical/high SAST findings
- [ ] **CRITICAL:** No critical/high dependency vulnerabilities
- [ ] **CRITICAL:** OWASP Top 10 addressed
- [ ] Security headers configured (CSP, HSTS, etc.)

### 2. Compliance Requirements Verification

#### 2.1 Compliance Framework Matrix

| Framework | Required | Status | Gap Count |
|-----------|----------|--------|-----------|
| SOC 2 Type II | YES/NO | In Progress/Complete | {{count}} |
| GDPR | YES/NO | In Progress/Complete | {{count}} |
| HIPAA | YES/NO | In Progress/Complete | {{count}} |
| PCI-DSS | YES/NO | In Progress/Complete | {{count}} |
| ISO 27001 | YES/NO | In Progress/Complete | {{count}} |

#### 2.2 Data Residency and Privacy

| Requirement | Implementation | Status |
|-------------|----------------|--------|
| Data residency controls | {{approach}} | YES/NO |
| Right to erasure | {{approach}} | YES/NO |
| Data portability | {{approach}} | YES/NO |
| Consent management | {{approach}} | YES/NO |
| Privacy policy published | {{url}} | YES/NO |

#### 2.3 Tenant-Specific Compliance

| Check | Status | Evidence |
|-------|--------|----------|
| Tenant data segregation documented | YES/NO | {{evidence}} |
| Tenant audit logs isolated | YES/NO | {{evidence}} |
| Tenant deletion process compliant | YES/NO | {{evidence}} |
| Cross-tenant access controls | YES/NO | {{evidence}} |

**CRITICAL Criteria:**
- [ ] **CRITICAL:** Tenant data isolation verified
- [ ] **CRITICAL:** Audit trail for compliance
- [ ] **CRITICAL:** Data deletion verifiable

### 3. Penetration Test Results Review

#### 3.1 Penetration Test Summary

| Test Type | Date | Firm | Status |
|-----------|------|------|--------|
| External penetration test | {{date}} | {{firm}} | Complete/Pending |
| Internal penetration test | {{date}} | {{firm}} | Complete/Pending |
| Web application test | {{date}} | {{firm}} | Complete/Pending |
| API security test | {{date}} | {{firm}} | Complete/Pending |
| Social engineering test | {{date}} | {{firm}} | Complete/Pending |

#### 3.2 Findings Summary

| Severity | Count | Remediated | Open |
|----------|-------|------------|------|
| Critical | {{count}} | {{count}} | {{count}} |
| High | {{count}} | {{count}} | {{count}} |
| Medium | {{count}} | {{count}} | {{count}} |
| Low | {{count}} | {{count}} | {{count}} |
| Informational | {{count}} | {{count}} | {{count}} |

#### 3.3 Open Critical/High Findings

| ID | Finding | Severity | Remediation Status | Target Date |
|----|---------|----------|-------------------|-------------|
| {{id}} | {{finding}} | {{severity}} | {{status}} | {{date}} |

**CRITICAL Criteria:**
- [ ] **CRITICAL:** Zero open critical findings
- [ ] **CRITICAL:** Zero open high findings (or accepted risk)
- [ ] Remediation plan for medium findings
- [ ] Pen test within last 12 months

### 4. Secret Management and Rotation

#### 4.1 Secrets Inventory

| Secret Type | Storage | Rotation Policy | Last Rotated |
|-------------|---------|-----------------|--------------|
| Database credentials | {{vault}} | {{days}} days | {{date}} |
| API keys | {{vault}} | {{days}} days | {{date}} |
| Encryption keys | {{vault}} | {{days}} days | {{date}} |
| JWT signing keys | {{vault}} | {{days}} days | {{date}} |
| Third-party tokens | {{vault}} | {{days}} days | {{date}} |
| Service account keys | {{vault}} | {{days}} days | {{date}} |

#### 4.2 Secret Management Controls

| Control | Status | Evidence |
|---------|--------|----------|
| Secrets in vault (not env vars) | YES/NO | {{evidence}} |
| Access audit logging | YES/NO | {{evidence}} |
| Break-glass procedures | YES/NO | {{evidence}} |
| Rotation automation | YES/NO | {{evidence}} |
| Least privilege access | YES/NO | {{evidence}} |

**CRITICAL Criteria:**
- [ ] **CRITICAL:** No secrets in source code
- [ ] **CRITICAL:** No secrets in logs
- [ ] **CRITICAL:** Secrets in approved vault
- [ ] Rotation policy documented and tested

#### 4.3 Key Rotation Testing

| Key Type | Rotation Tested | Zero Downtime | Last Test |
|----------|-----------------|---------------|-----------|
| Database credentials | YES/NO | YES/NO | {{date}} |
| API keys | YES/NO | YES/NO | {{date}} |
| JWT signing keys | YES/NO | YES/NO | {{date}} |

### 5. Network Security and Firewall Rules

#### 5.1 Network Segmentation

| Zone | Purpose | Access Rules | Verified |
|------|---------|--------------|----------|
| Public | Load balancer, CDN | Internet → LB only | YES/NO |
| DMZ | API Gateway | LB → API GW | YES/NO |
| Application | Backend services | API GW → Services | YES/NO |
| Data | Databases, caches | Services → Data only | YES/NO |
| Management | Admin, monitoring | VPN only | YES/NO |

#### 5.2 Firewall Rules Review

| Rule | Source | Destination | Ports | Status |
|------|--------|-------------|-------|--------|
| Ingress HTTPS | Internet | Load Balancer | 443 | Required |
| Database | App Servers | Database | 5432 | Required |
| Cache | App Servers | Redis | 6379 | Required |
| SSH | VPN | All | 22 | Emergency |

**Criteria:**
- [ ] Default deny all inbound
- [ ] Minimal required ports open
- [ ] No direct database access from internet
- [ ] Firewall rules documented

#### 5.3 DDoS Protection

| Layer | Protection | Tool |
|-------|------------|------|
| Layer 3/4 | Rate limiting | {{tool}} |
| Layer 7 | WAF | {{tool}} |
| DNS | DNS protection | {{tool}} |

#### 5.4 VPN and Bastion Access

| Access Type | Implementation | MFA | Logging |
|-------------|----------------|-----|---------|
| Admin VPN | {{tool}} | YES/NO | YES/NO |
| Bastion host | {{tool}} | YES/NO | YES/NO |
| Emergency access | {{procedure}} | YES/NO | YES/NO |

**CRITICAL Criteria:**
- [ ] **CRITICAL:** No direct admin access without VPN
- [ ] **CRITICAL:** All admin access MFA protected
- [ ] **CRITICAL:** All access logged
- [ ] Emergency access procedures documented

---

## COLLABORATION MENUS (A/P/C)

After completing security analysis, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific security concerns
- **P (Party Mode)**: Multi-persona review of security readiness
- **C (Continue)**: Accept analysis and proceed to production readiness report
- **[Specific concerns]**: Describe concerns to investigate further

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: security findings, compliance gaps, pen test issues
- Process enhanced insights on security patterns
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into analysis
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review security and compliance readiness for production: {summary}"
- Process Security Architect and Compliance Officer perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document security analysis findings
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-complete.md`

---

## SUCCESS METRICS:

- [ ] Security hardening checklist complete
- [ ] Compliance requirements verified
- [ ] Penetration test results reviewed
- [ ] Secret management validated
- [ ] Network security verified
- [ ] All CRITICAL checks pass

---

## FAILURE MODES:

| Failure | Recovery |
|---------|----------|
| Open critical pen test finding | Remediate before production (blocking) |
| Secrets in code/logs | Remove and rotate all affected secrets |
| Compliance gap | Document gap and remediation timeline |
| Network misconfiguration | Fix firewall rules immediately |

---

## Verification

- [ ] All security categories assessed
- [ ] CRITICAL issues blocking (if any)
- [ ] Compliance gaps documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Security hardening assessment
- Compliance verification results
- Penetration test review summary
- Secret management audit
- Network security verification

---

## NEXT STEP:

Proceed to `step-05-c-complete.md` to compile the production readiness report and make GO/NO-GO decision.
