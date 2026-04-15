---
name: penetration-testing-template
description: Plan and document penetration testing for multi-tenant SaaS platforms
category: security
version: 1.0.0
type: template
web_research_enabled: true
source_verification: true
---

## Purpose

Plan and document penetration testing for multi-tenant SaaS platforms

# Penetration Testing Plan: {{project_name}}

## Document Metadata

| Field | Value |
|-------|-------|
| Version | {{version}} |
| Date | {{date}} |
| Author | {{author}} |
| Test Lead | {{test_lead}} |
| Status | {{status}} |

## Executive Summary

{{executive_summary}}

## Test Scope

### In-Scope Systems

| System | Component | Environment | Access Level |
|--------|-----------|-------------|--------------|
| {{system_name}} | {{component}} | {{environment}} | {{access_level}} |

### Out-of-Scope

| System | Reason | Alternative Testing |
|--------|--------|---------------------|
| {{excluded_system}} | {{exclusion_reason}} | {{alternative}} |

### Testing Window

| Phase | Start Date | End Date | Hours |
|-------|------------|----------|-------|
| Reconnaissance | {{recon_start}} | {{recon_end}} | {{recon_hours}} |
| Active Testing | {{active_start}} | {{active_end}} | {{active_hours}} |
| Exploitation | {{exploit_start}} | {{exploit_end}} | {{exploit_hours}} |
| Reporting | {{report_start}} | {{report_end}} | {{report_hours}} |

## Test Objectives

### Primary Objectives

| Objective | Priority | Success Criteria |
|-----------|----------|------------------|
| Tenant Isolation Bypass | {{isolation_priority}} | {{isolation_criteria}} |
| Authentication Bypass | {{auth_priority}} | {{auth_criteria}} |
| Authorization Escalation | {{authz_priority}} | {{authz_criteria}} |
| Data Exfiltration | {{exfil_priority}} | {{exfil_criteria}} |

### Multi-Tenant Specific Objectives

| Test Area | Description | Expected Outcome |
|-----------|-------------|------------------|
| Cross-Tenant Data Access | {{cross_tenant_desc}} | {{cross_tenant_outcome}} |
| Tenant ID Manipulation | {{tenant_id_desc}} | {{tenant_id_outcome}} |
| Shared Resource Abuse | {{shared_resource_desc}} | {{shared_resource_outcome}} |
| Privilege Escalation | {{privilege_desc}} | {{privilege_outcome}} |

### AI/Agent Specific Objectives

| Test Area | Description | Expected Outcome |
|-----------|-------------|------------------|
| Prompt Injection | {{prompt_injection_desc}} | {{prompt_injection_outcome}} |
| Agent Tool Abuse | {{tool_abuse_desc}} | {{tool_abuse_outcome}} |
| Memory Extraction | {{memory_extract_desc}} | {{memory_extract_outcome}} |
| Context Leakage | {{context_leak_desc}} | {{context_leak_outcome}} |

## Test Methodology

### Testing Standards

| Standard | Version | Applicability |
|----------|---------|---------------|
| OWASP Testing Guide | {{owasp_version}} | {{owasp_applicability}} |
| PTES | {{ptes_version}} | {{ptes_applicability}} |
| NIST SP 800-115 | {{nist_version}} | {{nist_applicability}} |
| OWASP LLM Top 10 | {{llm_version}} | {{llm_applicability}} |

### Testing Phases

| Phase | Activities | Deliverables |
|-------|------------|--------------|
| 1. Reconnaissance | {{recon_activities}} | {{recon_deliverables}} |
| 2. Vulnerability Analysis | {{vuln_activities}} | {{vuln_deliverables}} |
| 3. Exploitation | {{exploit_activities}} | {{exploit_deliverables}} |
| 4. Post-Exploitation | {{post_activities}} | {{post_deliverables}} |
| 5. Reporting | {{report_activities}} | {{report_deliverables}} |

## Test Cases

### Authentication Testing

| ID | Test Case | Attack Vector | Expected Result |
|----|-----------|---------------|-----------------|
| AUTH-001 | Credential Stuffing | {{cred_stuff_vector}} | {{cred_stuff_result}} |
| AUTH-002 | Session Hijacking | {{session_hijack_vector}} | {{session_hijack_result}} |
| AUTH-003 | Token Forgery | {{token_forge_vector}} | {{token_forge_result}} |
| AUTH-004 | MFA Bypass | {{mfa_bypass_vector}} | {{mfa_bypass_result}} |

### Authorization Testing

| ID | Test Case | Attack Vector | Expected Result |
|----|-----------|---------------|-----------------|
| AUTHZ-001 | Horizontal Privilege Escalation | {{hpe_vector}} | {{hpe_result}} |
| AUTHZ-002 | Vertical Privilege Escalation | {{vpe_vector}} | {{vpe_result}} |
| AUTHZ-003 | IDOR (Tenant Context) | {{idor_vector}} | {{idor_result}} |
| AUTHZ-004 | API Permission Bypass | {{api_perm_vector}} | {{api_perm_result}} |

### Tenant Isolation Testing

| ID | Test Case | Attack Vector | Expected Result |
|----|-----------|---------------|-----------------|
| TENANT-001 | Cross-Tenant Query | {{cross_query_vector}} | {{cross_query_result}} |
| TENANT-002 | Tenant Header Manipulation | {{header_manip_vector}} | {{header_manip_result}} |
| TENANT-003 | Cache Poisoning | {{cache_poison_vector}} | {{cache_poison_result}} |
| TENANT-004 | Shared Resource Access | {{shared_access_vector}} | {{shared_access_result}} |

### AI/Agent Testing

| ID | Test Case | Attack Vector | Expected Result |
|----|-----------|---------------|-----------------|
| AI-001 | Direct Prompt Injection | {{direct_inject_vector}} | {{direct_inject_result}} |
| AI-002 | Indirect Prompt Injection | {{indirect_inject_vector}} | {{indirect_inject_result}} |
| AI-003 | Jailbreak Attempt | {{jailbreak_vector}} | {{jailbreak_result}} |
| AI-004 | Tool Permission Bypass | {{tool_bypass_vector}} | {{tool_bypass_result}} |
| AI-005 | Cross-Tenant Context Leakage | {{context_leak_vector}} | {{context_leak_result}} |

### API Security Testing

| ID | Test Case | Attack Vector | Expected Result |
|----|-----------|---------------|-----------------|
| API-001 | Rate Limit Bypass | {{rate_limit_vector}} | {{rate_limit_result}} |
| API-002 | Input Validation | {{input_valid_vector}} | {{input_valid_result}} |
| API-003 | Mass Assignment | {{mass_assign_vector}} | {{mass_assign_result}} |
| API-004 | GraphQL Introspection | {{graphql_vector}} | {{graphql_result}} |

## Tools and Environment

### Testing Tools

| Tool | Purpose | Version |
|------|---------|---------|
| {{tool_name}} | {{tool_purpose}} | {{tool_version}} |

### Test Accounts

| Account Type | Tenant | Tier | Permissions |
|--------------|--------|------|-------------|
| {{account_type}} | {{account_tenant}} | {{account_tier}} | {{account_permissions}} |

### Test Data

| Data Type | Source | Sensitivity | Handling |
|-----------|--------|-------------|----------|
| {{data_type}} | {{data_source}} | {{data_sensitivity}} | {{data_handling}} |

## Communication Plan

### Contacts

| Role | Name | Phone | Email |
|------|------|-------|-------|
| Test Lead | {{lead_name}} | {{lead_phone}} | {{lead_email}} |
| Emergency Contact | {{emergency_name}} | {{emergency_phone}} | {{emergency_email}} |
| Client POC | {{client_name}} | {{client_phone}} | {{client_email}} |

### Escalation Criteria

| Severity | Criteria | Notification |
|----------|----------|--------------|
| Critical | {{critical_criteria}} | {{critical_notification}} |
| High | {{high_criteria}} | {{high_notification}} |
| Medium | {{medium_criteria}} | {{medium_notification}} |

### Progress Reporting

| Report Type | Frequency | Format | Recipient |
|-------------|-----------|--------|-----------|
| Status Update | {{status_freq}} | {{status_format}} | {{status_recipient}} |
| Finding Alert | {{finding_freq}} | {{finding_format}} | {{finding_recipient}} |
| Final Report | {{final_freq}} | {{final_format}} | {{final_recipient}} |

## Test Results

### Finding Summary

| Severity | Count | Remediated | Remaining |
|----------|-------|------------|-----------|
| Critical | {{critical_count}} | {{critical_remediated}} | {{critical_remaining}} |
| High | {{high_count}} | {{high_remediated}} | {{high_remaining}} |
| Medium | {{medium_count}} | {{medium_remediated}} | {{medium_remaining}} |
| Low | {{low_count}} | {{low_remediated}} | {{low_remaining}} |
| Info | {{info_count}} | {{info_remediated}} | {{info_remaining}} |

### Detailed Findings

#### Finding: {{finding_title}}

| Attribute | Value |
|-----------|-------|
| ID | {{finding_id}} |
| Severity | {{finding_severity}} |
| CVSS Score | {{finding_cvss}} |
| CWE | {{finding_cwe}} |
| Affected Component | {{finding_component}} |
| Discovery Date | {{finding_date}} |

**Description:**
{{finding_description}}

**Proof of Concept:**
{{finding_poc}}

**Impact:**
{{finding_impact}}

**Recommendation:**
{{finding_recommendation}}

**Remediation Status:** {{finding_status}}

---

## Verification Checklist

### Pre-Test

- [ ] Scope document signed
- [ ] Test accounts provisioned
- [ ] Emergency contacts confirmed
- [ ] Tools validated
- [ ] Test environment verified

### During Test

- [ ] Daily status updates sent
- [ ] Critical findings reported immediately
- [ ] Testing logs maintained
- [ ] Evidence captured for all findings

### Post-Test

- [ ] All findings documented
- [ ] Severity ratings confirmed
- [ ] Recommendations provided
- [ ] Remediation verification scheduled
- [ ] Final report delivered

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "multi-tenant SaaS penetration testing methodology {date}"
- "OWASP LLM Top 10 testing techniques {date}"
- "tenant isolation security testing approaches {date}"
- "AI agent security penetration testing {date}"

Incorporate relevant findings. _Source: [URL]_

---

## Appendix

### Rules of Engagement

{{rules_of_engagement}}

### Legal Authorization

{{legal_authorization}}

### Related Documents

- Security Review: `{{security_review_link}}`
- Compliance Checklist: `{{compliance_link}}`
- Incident Response Plan: `{{incident_response_link}}`

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial test plan |
