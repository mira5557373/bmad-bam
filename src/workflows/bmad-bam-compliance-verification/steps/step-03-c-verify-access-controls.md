# Step 3: Verify Access Controls

## Purpose

Verify access control implementations meet compliance requirements for all frameworks.

## Prerequisites

- Steps 1-2 complete
- RBAC/ABAC configuration available
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `rbac`

## Actions

### 1. Authentication Compliance Check

| Control | SOC2 | GDPR | HIPAA | Implementation | Status |
|---------|------|------|-------|----------------|--------|
| MFA required | Yes | Recommended | Yes | TOTP/WebAuthn | |
| Password policy | Yes | Yes | Yes | Min 12 chars | |
| Session timeout | Yes | Yes | Yes | 30 min idle | |
| Account lockout | Yes | Yes | Yes | 5 attempts | |

### 2. Authorization Compliance Check

| Control | Requirement | Implementation | Status |
|---------|-------------|----------------|--------|
| Least privilege | All frameworks | RBAC default deny | |
| Role separation | SOC2/HIPAA | Distinct admin roles | |
| Tenant isolation | All | RLS + context | |
| Privilege escalation prevention | All | Approval workflow | |

### 3. Administrative Access Audit

| Admin Type | Access Scope | Logging | Approval Required | Status |
|------------|--------------|---------|-------------------|--------|
| Platform Admin | Full | All actions | Yes | |
| Tenant Admin | Tenant only | All actions | Yes | |
| Support | Read-only | All access | Yes | |
| Break-glass | Emergency | Enhanced | Dual approval | |

### 4. API Access Controls

| Control | Requirement | Implementation | Status |
|---------|-------------|----------------|--------|
| API authentication | All | JWT + API key | |
| Rate limiting | Platform | Per-tenant limits | |
| Scope restrictions | All | OAuth scopes | |
| Token expiration | All | Short-lived + refresh | |

**Verify access control compliance with web search:**
Search the web: "access control compliance verification {date}"
Search the web: "RBAC audit methodology {date}"

## Verification

- [ ] Authentication controls verified
- [ ] Authorization controls verified
- [ ] Administrative access audited
- [ ] API access controls verified

## Outputs

- Access control compliance findings

## Next Step

Proceed to `step-04-c-test-audit-logging.md`
