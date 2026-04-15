---
name: compliance-design-template
description: Template for documenting compliance design decisions and requirements
category: compliance
version: 1.0.0
type: "compliance"
web_research_enabled: true
source_verification: true
---

## Purpose

Template for documenting compliance design decisions and requirements

# Compliance Design Document

## Document Information

| Field | Value |
|-------|-------|
| Project | {{project_name}} |
| Version | {{version}} |
| Date | {{date}} |
| Author | {{author}} |
| Status | Draft |

---

## Executive Summary

Brief overview of the compliance requirements and how the system addresses them.

---

## Applicable Regulations

### Primary Regulations

| Regulation | Scope | Applicability |
|------------|-------|---------------|
| GDPR | EU data protection | All EU tenants |
| SOC 2 | Security controls | All tenants |
| HIPAA | Healthcare data | Healthcare tenants |
| PCI-DSS | Payment data | Tenants processing payments |

### Regulatory Requirements Matrix

| Requirement ID | Regulation | Description | Implementation Status |
|---------------|------------|-------------|----------------------|
| | | | |

---

## Data Classification

### Classification Levels

| Level | Description | Examples | Handling Requirements |
|-------|-------------|----------|----------------------|
| Public | Non-sensitive | Marketing content | No restrictions |
| Internal | Business sensitive | Analytics data | Access controls |
| Confidential | Tenant data | User PII | Encryption, RLS |
| Restricted | Highly sensitive | Payment data | Encryption, audit, MFA |

### Data Inventory

| Data Type | Classification | Storage Location | Retention Period | Deletion Method |
|-----------|---------------|------------------|-----------------|-----------------|
| | | | | |

---

## Tenant Data Isolation

### Isolation Strategy

**Selected Model:** {{tenant_model}}

**Justification:**

- Requirement 1: 
- Requirement 2:
- Requirement 3:

### Isolation Controls

| Control | Implementation | Verification Method |
|---------|---------------|---------------------|
| Data isolation | Row-level security / Schema separation | Penetration testing |
| Network isolation | VPC / Security groups | Network scan |
| Access control | RBAC with tenant context | Access audit |

---

## Data Residency

### Regional Requirements

| Region | Tenants | Data Center | Compliance |
|--------|---------|-------------|------------|
| EU | EU-based | eu-west-1 | GDPR |
| US | US-based | us-east-1 | SOC 2 |
| APAC | APAC-based | ap-southeast-1 | Local laws |

### Cross-Border Transfer Rules

- EU to US: Standard Contractual Clauses (SCCs)
- Data never leaves region of origin without explicit consent
- Metadata may be aggregated globally (anonymized)

---

## Encryption

### Encryption at Rest

| Data Type | Encryption Method | Key Management |
|-----------|------------------|----------------|
| Database | AES-256 | AWS KMS |
| File storage | AES-256 | AWS KMS |
| Backups | AES-256 | AWS KMS |

### Encryption in Transit

| Channel | Protocol | Certificate |
|---------|----------|-------------|
| API traffic | TLS 1.3 | Let's Encrypt |
| Internal services | mTLS | Internal CA |
| Database connections | TLS 1.2+ | RDS certificates |

### Key Management

- **Key rotation:** Every 90 days
- **Key hierarchy:** Master key → Data encryption keys
- **Customer-managed keys:** Enterprise tier option

---

## Audit Logging

### Audit Events

| Event Category | Events Logged | Retention |
|---------------|---------------|-----------|
| Authentication | Login, logout, MFA | 2 years |
| Authorization | Access grants, denials | 2 years |
| Data access | Read, write, delete | 1 year |
| Admin actions | Config changes | 5 years |

### Audit Log Format

```json
{
  "timestamp": "ISO8601",
  "tenant_id": "uuid",
  "user_id": "uuid",
  "action": "string",
  "resource": "string",
  "result": "success|failure",
  "ip_address": "string",
  "user_agent": "string",
  "details": {}
}
```

---

## Access Control

### Authentication

- **Method:** OAuth 2.0 / OIDC
- **MFA:** Required for admin roles, optional for users
- **Session timeout:** 30 minutes idle, 8 hours maximum
- **Enterprise SSO:** SAML 2.0 integration

### Authorization

- **Model:** Role-Based Access Control (RBAC)
- **Tenant isolation:** All operations scoped to tenant context
- **Admin access:** Requires approval workflow, fully audited

### Role Hierarchy

| Role | Permissions | Tenant Scope |
|------|-------------|--------------|
| Platform Admin | Full platform access | All tenants |
| Tenant Admin | Full tenant access | Single tenant |
| Tenant User | Feature access | Single tenant |
| Viewer | Read-only access | Single tenant |

---

## Incident Response

### Classification

| Severity | Definition | Response Time | Escalation |
|----------|------------|---------------|------------|
| Critical | Data breach confirmed | 15 minutes | Executive |
| High | Potential data exposure | 1 hour | Security lead |
| Medium | Policy violation | 4 hours | Team lead |
| Low | Minor issue | 24 hours | On-call |

### Response Procedures

1. **Detection:** Automated alerts + manual reports
2. **Containment:** Isolate affected systems
3. **Investigation:** Determine scope and impact
4. **Notification:** Affected tenants within 72 hours (GDPR)
5. **Remediation:** Fix root cause
6. **Post-mortem:** Document lessons learned

---

## Compliance Verification

### Automated Checks

| Check | Frequency | Tool |
|-------|-----------|------|
| Access control audit | Daily | Custom script |
| Encryption verification | Weekly | AWS Config |
| Configuration drift | Continuous | Terraform |
| Vulnerability scan | Weekly | Trivy |

### Manual Reviews

| Review | Frequency | Reviewer |
|--------|-----------|----------|
| Access rights review | Quarterly | Security team |
| Policy review | Annually | Compliance officer |
| Penetration test | Annually | External vendor |

---

## Certifications and Attestations

### Current Certifications

| Certification | Status | Expiry | Scope |
|--------------|--------|--------|-------|
| SOC 2 Type II | Active | {{date}} | Full platform |
| ISO 27001 | In progress | - | Full platform |

### Attestation Schedule

| Activity | Q1 | Q2 | Q3 | Q4 |
|----------|----|----|----|----|
| SOC 2 audit | | X | | |
| Penetration test | X | | | |
| Access review | X | | X | |

---

## Appendix

### A. Regulation Reference Links

- GDPR: https://gdpr.eu/
- SOC 2: https://www.aicpa.org/soc2
- HIPAA: https://www.hhs.gov/hipaa

### B. Related Documents

- Security Architecture Document
- Data Retention Policy
- Incident Response Playbook
- Access Control Policy

---

## Verification Checklist

- [ ] All applicable regulations identified with requirements mapped
- [ ] Data classification levels defined with handling requirements
- [ ] Tenant isolation strategy documented with justification
- [ ] Data residency requirements specified by region
- [ ] Encryption methods defined for data at rest and in transit
- [ ] Key management and rotation policies documented
- [ ] Audit events defined with appropriate retention periods
- [ ] Authentication and authorization mechanisms specified
- [ ] Incident response procedures documented with SLAs
- [ ] Compliance verification methods (automated and manual) defined
- [ ] Certification status and schedule documented
- [ ] Multi-tenant considerations addressed for all controls

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "compliance design best practices {date}"
- "compliance architecture multi-tenant SaaS patterns {date}"
- "regulatory compliance enterprise implementation {date}"

Incorporate relevant findings into the document sections above.

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial template creation |
