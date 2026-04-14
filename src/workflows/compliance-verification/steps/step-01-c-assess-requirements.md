# Step 1: Assess Compliance Requirements

## Purpose

Identify applicable compliance frameworks and requirements for the multi-tenant AI platform.

## Prerequisites

- Tenant compliance requirements documented
- Industry/regulatory context known
- **Load template:** `{project-root}/_bmad/bam/templates/compliance-framework-template.md`

## Actions

### 1. Identify Applicable Frameworks

| Framework | Applicability | Tenant Types | Priority |
|-----------|---------------|--------------|----------|
| SOC2 Type II | Required | Enterprise | High |
| GDPR | EU tenants | All EU | High |
| HIPAA | Healthcare | Healthcare | Critical |
| PCI-DSS | Payment data | Financial | Critical |
| ISO 27001 | Enterprise | Enterprise | Medium |

### 2. Map Requirements to Platform Features

| Requirement Area | Platform Component | Controls Needed |
|------------------|-------------------|-----------------|
| Data encryption | Storage, Transit | AES-256, TLS 1.3 |
| Access control | IAM, RBAC | MFA, least privilege |
| Audit logging | Observability | Immutable logs |
| Data residency | Infrastructure | Regional deployment |
| Retention | Data lifecycle | Configurable policies |

### 3. Document Tenant-Specific Requirements

| Tenant Tier | Additional Requirements | SLA Impact |
|-------------|------------------------|------------|
| Free | Base compliance | Standard |
| Pro | SOC2 attestation | Enhanced |
| Enterprise | Custom frameworks | Premium |

### 4. Create Compliance Matrix

| Control ID | Description | Framework(s) | Implementation |
|------------|-------------|--------------|----------------|
| CC-001 | Access control | SOC2, ISO | RBAC + MFA |
| CC-002 | Encryption at rest | All | AES-256 |
| CC-003 | Audit logging | All | Immutable logs |
| CC-004 | Incident response | SOC2 | Runbook |

**Verify current requirements with web search:**
Search the web: "SOC2 Type II AI platform requirements {date}"
Search the web: "GDPR AI system compliance requirements {date}"

## Verification

- [ ] All applicable frameworks identified
- [ ] Requirements mapped to components
- [ ] Tenant requirements documented
- [ ] Compliance matrix created

## Outputs

- Compliance requirements assessment

## Next Step

Proceed to `step-02-c-audit-data-handling.md`
