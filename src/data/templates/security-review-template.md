---
name: security-review-template
description: Document security review findings and recommendations for multi-tenant SaaS platforms
category: security
version: 1.0.0
type: template
web_research_enabled: true
source_verification: true
---

## Purpose

Document security review findings and recommendations for multi-tenant SaaS platforms

# Security Review: {{project_name}}

## Document Metadata

| Field | Value |
|-------|-------|
| Version | {{version}} |
| Date | {{date}} |
| Reviewer | {{reviewer}} |
| Review Type | {{review_type}} |
| Status | {{status}} |

## Executive Summary

{{executive_summary}}

## Review Scope

### Systems Reviewed

| System | Component | Version | Coverage |
|--------|-----------|---------|----------|
| {{system_name}} | {{component}} | {{version}} | {{coverage_percentage}} |

### Out of Scope

| Item | Reason | Future Review Date |
|------|--------|-------------------|
| {{out_of_scope_item}} | {{exclusion_reason}} | {{planned_review_date}} |

## Threat Model Assessment

### Threat Actors

| Actor | Motivation | Capability | Likelihood |
|-------|------------|------------|------------|
| External Attacker | {{external_motivation}} | {{external_capability}} | {{external_likelihood}} |
| Malicious Insider | {{insider_motivation}} | {{insider_capability}} | {{insider_likelihood}} |
| Compromised Tenant | {{tenant_motivation}} | {{tenant_capability}} | {{tenant_likelihood}} |
| Supply Chain | {{supply_motivation}} | {{supply_capability}} | {{supply_likelihood}} |

### Attack Surface Analysis

| Surface | Entry Points | Controls | Risk Level |
|---------|--------------|----------|------------|
| API Gateway | {{api_entry_points}} | {{api_controls}} | {{api_risk}} |
| Authentication | {{auth_entry_points}} | {{auth_controls}} | {{auth_risk}} |
| Data Storage | {{data_entry_points}} | {{data_controls}} | {{data_risk}} |
| Agent Runtime | {{agent_entry_points}} | {{agent_controls}} | {{agent_risk}} |

## Tenant Isolation Assessment

### Isolation Model Review

| Layer | Isolation Mechanism | Effectiveness | Gaps |
|-------|---------------------|---------------|------|
| Database | {{db_isolation}} | {{db_effectiveness}} | {{db_gaps}} |
| Application | {{app_isolation}} | {{app_effectiveness}} | {{app_gaps}} |
| Network | {{network_isolation}} | {{network_effectiveness}} | {{network_gaps}} |
| Cache | {{cache_isolation}} | {{cache_effectiveness}} | {{cache_gaps}} |

### Cross-Tenant Attack Vectors

| Vector | Description | Mitigation Status | Risk |
|--------|-------------|-------------------|------|
| Query Parameter Tampering | {{query_description}} | {{query_status}} | {{query_risk}} |
| Session Hijacking | {{session_description}} | {{session_status}} | {{session_risk}} |
| Cache Poisoning | {{cache_description}} | {{cache_status}} | {{cache_risk}} |
| API Key Leakage | {{api_key_description}} | {{api_key_status}} | {{api_key_risk}} |

## Authentication and Authorization

### Identity Provider Assessment

| Provider | Protocol | MFA Support | Session Management |
|----------|----------|-------------|-------------------|
| {{idp_name}} | {{idp_protocol}} | {{mfa_support}} | {{session_mgmt}} |

### RBAC/TBAC Review

| Role | Permissions | Scope | Issues Found |
|------|-------------|-------|--------------|
| Tenant User | {{user_permissions}} | {{user_scope}} | {{user_issues}} |
| Tenant Admin | {{admin_permissions}} | {{admin_scope}} | {{admin_issues}} |
| Platform Admin | {{platform_permissions}} | {{platform_scope}} | {{platform_issues}} |

### Token Security

| Token Type | Algorithm | Expiration | Refresh Policy |
|------------|-----------|------------|----------------|
| Access Token | {{access_algorithm}} | {{access_expiration}} | {{access_refresh}} |
| Refresh Token | {{refresh_algorithm}} | {{refresh_expiration}} | {{refresh_policy}} |
| API Key | {{api_algorithm}} | {{api_expiration}} | {{api_rotation}} |

## Data Protection

### Encryption Assessment

| Data State | Encryption Method | Key Management | Compliance |
|------------|-------------------|----------------|------------|
| At Rest | {{rest_encryption}} | {{rest_key_mgmt}} | {{rest_compliance}} |
| In Transit | {{transit_encryption}} | {{transit_key_mgmt}} | {{transit_compliance}} |
| In Processing | {{process_encryption}} | {{process_key_mgmt}} | {{process_compliance}} |

### Key Management Review

| Key Type | Rotation Period | Storage | Access Control |
|----------|-----------------|---------|----------------|
| Master Key | {{master_rotation}} | {{master_storage}} | {{master_access}} |
| Tenant Key | {{tenant_rotation}} | {{tenant_storage}} | {{tenant_access}} |
| Service Key | {{service_rotation}} | {{service_storage}} | {{service_access}} |

### Data Classification

| Classification | Examples | Handling Requirements | Review Finding |
|----------------|----------|----------------------|----------------|
| Public | {{public_examples}} | {{public_handling}} | {{public_finding}} |
| Internal | {{internal_examples}} | {{internal_handling}} | {{internal_finding}} |
| Confidential | {{confidential_examples}} | {{confidential_handling}} | {{confidential_finding}} |
| Restricted | {{restricted_examples}} | {{restricted_handling}} | {{restricted_finding}} |

## AI/Agent Security

### Prompt Injection Assessment

| Attack Vector | Test Results | Mitigations | Status |
|---------------|--------------|-------------|--------|
| Direct Injection | {{direct_results}} | {{direct_mitigations}} | {{direct_status}} |
| Indirect Injection | {{indirect_results}} | {{indirect_mitigations}} | {{indirect_status}} |
| Jailbreak Attempts | {{jailbreak_results}} | {{jailbreak_mitigations}} | {{jailbreak_status}} |

### Agent Tool Security

| Tool | Permission Model | Sandbox Status | Risk Level |
|------|------------------|----------------|------------|
| {{tool_name}} | {{tool_permissions}} | {{tool_sandbox}} | {{tool_risk}} |

### LLM Data Leakage

| Scenario | Test Approach | Finding | Severity |
|----------|---------------|---------|----------|
| Training Data Extraction | {{extraction_approach}} | {{extraction_finding}} | {{extraction_severity}} |
| Cross-Tenant Context | {{context_approach}} | {{context_finding}} | {{context_severity}} |
| Prompt Leakage | {{prompt_approach}} | {{prompt_finding}} | {{prompt_severity}} |

## Findings Summary

### Critical Findings

| ID | Finding | Impact | Recommendation | Target Date |
|----|---------|--------|----------------|-------------|
| {{critical_id}} | {{critical_finding}} | {{critical_impact}} | {{critical_recommendation}} | {{critical_date}} |

### High Severity Findings

| ID | Finding | Impact | Recommendation | Target Date |
|----|---------|--------|----------------|-------------|
| {{high_id}} | {{high_finding}} | {{high_impact}} | {{high_recommendation}} | {{high_date}} |

### Medium Severity Findings

| ID | Finding | Impact | Recommendation | Target Date |
|----|---------|--------|----------------|-------------|
| {{medium_id}} | {{medium_finding}} | {{medium_impact}} | {{medium_recommendation}} | {{medium_date}} |

### Low Severity Findings

| ID | Finding | Impact | Recommendation | Target Date |
|----|---------|--------|----------------|-------------|
| {{low_id}} | {{low_finding}} | {{low_impact}} | {{low_recommendation}} | {{low_date}} |

## Compliance Status

### Framework Alignment

| Framework | Requirement | Status | Evidence |
|-----------|-------------|--------|----------|
| SOC 2 | {{soc2_requirement}} | {{soc2_status}} | {{soc2_evidence}} |
| GDPR | {{gdpr_requirement}} | {{gdpr_status}} | {{gdpr_evidence}} |
| HIPAA | {{hipaa_requirement}} | {{hipaa_status}} | {{hipaa_evidence}} |
| ISO 27001 | {{iso_requirement}} | {{iso_status}} | {{iso_evidence}} |

## Remediation Roadmap

### Immediate Actions (0-7 days)

| Action | Owner | Dependencies | Status |
|--------|-------|--------------|--------|
| {{immediate_action}} | {{immediate_owner}} | {{immediate_deps}} | {{immediate_status}} |

### Short-Term Actions (7-30 days)

| Action | Owner | Dependencies | Status |
|--------|-------|--------------|--------|
| {{short_action}} | {{short_owner}} | {{short_deps}} | {{short_status}} |

### Long-Term Actions (30-90 days)

| Action | Owner | Dependencies | Status |
|--------|-------|--------------|--------|
| {{long_action}} | {{long_owner}} | {{long_deps}} | {{long_status}} |

---

## Verification Checklist

### Review Completeness

- [ ] All in-scope systems reviewed
- [ ] Threat model updated
- [ ] Tenant isolation tested
- [ ] Authentication mechanisms verified
- [ ] Data encryption validated
- [ ] AI/Agent security assessed
- [ ] Findings documented with evidence
- [ ] Remediation timeline agreed

### Documentation

- [ ] All findings have reproduction steps
- [ ] Screenshots/logs captured
- [ ] Risk ratings justified
- [ ] Compliance gaps identified
- [ ] Previous review findings addressed

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "multi-tenant SaaS security review best practices {date}"
- "tenant isolation security testing patterns {date}"
- "LLM agent security assessment methodology {date}"
- "cross-tenant attack prevention techniques {date}"

Incorporate relevant findings. _Source: [URL]_

---

## Appendix

### Testing Methodology

{{testing_methodology_description}}

### Tools Used

| Tool | Purpose | Version |
|------|---------|---------|
| {{tool_name}} | {{tool_purpose}} | {{tool_version}} |

### Related Documents

- Master Architecture: `{{master_architecture_link}}`
- Compliance Checklist: `{{compliance_checklist_link}}`
- Penetration Test Report: `{{pentest_link}}`

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{reviewer}} | Initial security review |
