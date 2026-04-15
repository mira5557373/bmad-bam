# Step 4: Test Audit Logging

## Purpose

Verify audit logging meets compliance requirements for traceability and forensics.

## Prerequisites

- Steps 1-3 complete
- Audit logging infrastructure deployed
- **Load template:** `{project-root}/_bmad/bam/data/templates/audit-logging-template.md`

## Actions

### 1. Audit Event Coverage

| Event Category | Events Logged | Compliance Req | Status |
|----------------|---------------|----------------|--------|
| Authentication | Login, logout, MFA | SOC2, HIPAA | |
| Authorization | Access granted/denied | All | |
| Data access | Read, write, delete | GDPR, HIPAA | |
| Admin actions | Config changes | SOC2 | |
| AI operations | Inference, training | Platform | |

### 2. Log Integrity Verification

| Control | Requirement | Implementation | Status |
|---------|-------------|----------------|--------|
| Immutability | Logs cannot be modified | Append-only storage | |
| Tamper detection | Changes detected | Cryptographic hash | |
| Secure transport | Logs encrypted in transit | TLS 1.3 | |
| Access control | Log access restricted | RBAC | |

### 3. Log Retention Compliance

| Framework | Minimum Retention | Implementation | Status |
|-----------|-------------------|----------------|--------|
| SOC2 | 1 year | 7 years | |
| GDPR | As needed | Configurable | |
| HIPAA | 6 years | 7 years | |
| PCI-DSS | 1 year | 7 years | |

### 4. Audit Trail Testing

| Test | Procedure | Expected | Result |
|------|-----------|----------|--------|
| Event capture | Perform action | Log entry created | |
| Timestamp accuracy | Compare with NTP | Within 1 second | |
| User attribution | Check actor field | Correct user ID | |
| Tenant isolation | Query other tenant | Access denied | |

**Verify audit logging compliance with web search:**
Search the web: "audit logging compliance requirements {date}"
Search the web: "SOC2 audit trail verification {date}"

## Verification

- [ ] All required events logged
- [ ] Log integrity verified
- [ ] Retention compliance confirmed
- [ ] Audit trail tested

## Outputs

- Audit logging test results

## Next Step

Proceed to `step-05-c-generate-report.md`
