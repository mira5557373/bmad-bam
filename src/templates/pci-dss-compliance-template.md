---
name: pci-dss-compliance-template
description: Template for PCI-DSS requirements mapping, control implementation, evidence locations, assessment scope, and self-assessment checklist in multi-tenant SaaS platforms
category: compliance
version: 1.0.0
type: template
---

# PCI-DSS Compliance Specification: {{project_name}}

> Project: {{project_name}}
> Version: {{version}}
> Date: {{date}}
> Author: {{author}}

---

## Purpose

This document defines the PCI-DSS compliance framework for {{project_name}}, establishing standardized procedures for requirements mapping, control implementation, evidence collection, assessment scope definition, and self-assessment workflows for payment card data handling in the multi-tenant SaaS platform.

---

## Document Metadata

| Field | Value |
|-------|-------|
| Document Type | PCI-DSS Compliance Specification |
| Project Name | {{project_name}} |
| Version | {{version}} |
| Created | {{date}} |
| Author | {{author}} |
| Status | {{document_status}} |
| PCI-DSS Version | {{pci_version}} |
| SAQ Type | {{saq_type}} |
| Last Assessment | {{last_assessment}} |
| Next Assessment | {{next_assessment}} |
| Compliance Officer | {{compliance_officer}} |
| QSA (if applicable) | {{qsa_name}} |
| Classification | {{document_classification}} |

---

## Table of Contents

1. [PCI-DSS Requirements Mapping](#pci-dss-requirements-mapping)
2. [Control Implementation](#control-implementation)
3. [Evidence Locations](#evidence-locations)
4. [Assessment Scope](#assessment-scope)
5. [Self-Assessment Checklist](#self-assessment-checklist)
6. [Cardholder Data Environment](#cardholder-data-environment)
7. [Tenant Considerations](#tenant-considerations)
8. [Compensating Controls](#compensating-controls)
9. [Web Research Queries](#web-research-queries)
10. [Verification Checklist](#verification-checklist)
11. [Change Log](#change-log)

---

## PCI-DSS Requirements Mapping

### 1.1 Requirements Overview

| Requirement | Category | Applicable | Compliance Status |
|-------------|----------|------------|-------------------|
| Req 1 | Install and Maintain Network Security Controls | {{req1_applicable}} | {{req1_status}} |
| Req 2 | Apply Secure Configurations | {{req2_applicable}} | {{req2_status}} |
| Req 3 | Protect Stored Account Data | {{req3_applicable}} | {{req3_status}} |
| Req 4 | Protect CHD with Strong Cryptography | {{req4_applicable}} | {{req4_status}} |
| Req 5 | Protect Systems from Malicious Software | {{req5_applicable}} | {{req5_status}} |
| Req 6 | Develop and Maintain Secure Systems | {{req6_applicable}} | {{req6_status}} |
| Req 7 | Restrict Access by Business Need | {{req7_applicable}} | {{req7_status}} |
| Req 8 | Identify Users and Authenticate Access | {{req8_applicable}} | {{req8_status}} |
| Req 9 | Restrict Physical Access | {{req9_applicable}} | {{req9_status}} |
| Req 10 | Log and Monitor All Access | {{req10_applicable}} | {{req10_status}} |
| Req 11 | Test Security Systems and Networks | {{req11_applicable}} | {{req11_status}} |
| Req 12 | Support Information Security with Policies | {{req12_applicable}} | {{req12_status}} |

### 1.2 Detailed Requirements Mapping

| Sub-Requirement | Description | Implementation | Status |
|-----------------|-------------|----------------|--------|
| 1.1.1 | {{req_1_1_1_desc}} | {{req_1_1_1_impl}} | {{req_1_1_1_status}} |
| 1.1.2 | {{req_1_1_2_desc}} | {{req_1_1_2_impl}} | {{req_1_1_2_status}} |
| 2.1.1 | {{req_2_1_1_desc}} | {{req_2_1_1_impl}} | {{req_2_1_1_status}} |
| 2.2.1 | {{req_2_2_1_desc}} | {{req_2_2_1_impl}} | {{req_2_2_1_status}} |
| 3.1.1 | {{req_3_1_1_desc}} | {{req_3_1_1_impl}} | {{req_3_1_1_status}} |
| 3.2.1 | {{req_3_2_1_desc}} | {{req_3_2_1_impl}} | {{req_3_2_1_status}} |
| 4.1.1 | {{req_4_1_1_desc}} | {{req_4_1_1_impl}} | {{req_4_1_1_status}} |
| 4.2.1 | {{req_4_2_1_desc}} | {{req_4_2_1_impl}} | {{req_4_2_1_status}} |

### 1.3 Requirements Schema

```yaml
pci_requirement:
  requirement_id: string              # e.g., "3.2.1"
  requirement_number: integer         # Main requirement (1-12)
  category: string                    # Requirement category
  description: string                 # Requirement description
  guidance: string                    # PCI-DSS guidance
  applicability:
    applicable: boolean               # Applies to our environment
    justification: string             # Why applicable/not
    saq_section: string               # SAQ section reference
  implementation:
    status: enum                      # in_place, partial, not_in_place, n/a
    method: string                    # How implemented
    responsible_party: string         # Who owns this
    last_validated: iso8601           # Last validation date
  evidence:
    evidence_ids: array               # Related evidence
    location: string                  # Evidence storage path
  risk:
    severity_if_missing: enum         # critical, high, medium, low
    compensating_control: boolean     # Has compensating control
  tenant_isolation:
    per_tenant: boolean               # Tenant-specific implementation
    shared: boolean                   # Shared infrastructure
```

### 1.4 Compliance by Requirement Category

```
┌─────────────────────────────────────────────────────────────────┐
│               PCI-DSS Compliance by Category                     │
│                                                                  │
│  Category                    │ Controls │ Compliant │ Partial   │
│  ────────────────────────────┼──────────┼───────────┼──────────│
│  Build & Maintain Secure     │    {{build_total}}    │    {{build_compliant}}    │   {{build_partial}}    │
│  Network (Req 1-2)           │          │           │          │
│  ────────────────────────────┼──────────┼───────────┼──────────│
│  Protect Cardholder Data     │    {{protect_total}}    │    {{protect_compliant}}    │   {{protect_partial}}    │
│  (Req 3-4)                   │          │           │          │
│  ────────────────────────────┼──────────┼───────────┼──────────│
│  Maintain Vulnerability      │    {{vuln_total}}    │    {{vuln_compliant}}    │   {{vuln_partial}}    │
│  Management (Req 5-6)        │          │           │          │
│  ────────────────────────────┼──────────┼───────────┼──────────│
│  Implement Strong Access     │    {{access_total}}    │    {{access_compliant}}    │   {{access_partial}}    │
│  Control (Req 7-9)           │          │           │          │
│  ────────────────────────────┼──────────┼───────────┼──────────│
│  Monitor & Test Networks     │    {{monitor_total}}    │    {{monitor_compliant}}    │   {{monitor_partial}}    │
│  (Req 10-11)                 │          │           │          │
│  ────────────────────────────┼──────────┼───────────┼──────────│
│  Maintain Security Policy    │    {{policy_total}}    │    {{policy_compliant}}    │   {{policy_partial}}    │
│  (Req 12)                    │          │           │          │
└─────────────────────────────────────────────────────────────────┘
```

---

## Control Implementation

### 2.1 Network Security Controls (Req 1)

| Control | Implementation | Technology | Status |
|---------|----------------|------------|--------|
| Network Segmentation | {{net_seg_impl}} | {{net_seg_tech}} | {{net_seg_status}} |
| Firewall Configuration | {{firewall_impl}} | {{firewall_tech}} | {{firewall_status}} |
| Inbound Traffic Rules | {{inbound_impl}} | {{inbound_tech}} | {{inbound_status}} |
| Outbound Traffic Rules | {{outbound_impl}} | {{outbound_tech}} | {{outbound_status}} |
| DMZ Configuration | {{dmz_impl}} | {{dmz_tech}} | {{dmz_status}} |

### 2.2 Secure Configuration Controls (Req 2)

| Control | Implementation | Technology | Status |
|---------|----------------|------------|--------|
| Default Credential Removal | {{default_cred_impl}} | {{default_cred_tech}} | {{default_cred_status}} |
| Unnecessary Service Removal | {{service_impl}} | {{service_tech}} | {{service_status}} |
| Security Parameter Configuration | {{param_impl}} | {{param_tech}} | {{param_status}} |
| Encryption Standards | {{encrypt_impl}} | {{encrypt_tech}} | {{encrypt_status}} |

### 2.3 Cardholder Data Protection (Req 3-4)

| Control | Implementation | Technology | Status |
|---------|----------------|------------|--------|
| Data Retention Policy | {{retention_impl}} | {{retention_tech}} | {{retention_status}} |
| Data Masking | {{masking_impl}} | {{masking_tech}} | {{masking_status}} |
| Encryption at Rest | {{rest_encrypt_impl}} | {{rest_encrypt_tech}} | {{rest_encrypt_status}} |
| Encryption in Transit | {{transit_encrypt_impl}} | {{transit_encrypt_tech}} | {{transit_encrypt_status}} |
| Key Management | {{key_mgmt_impl}} | {{key_mgmt_tech}} | {{key_mgmt_status}} |
| Tokenization | {{token_impl}} | {{token_tech}} | {{token_status}} |

### 2.4 Vulnerability Management (Req 5-6)

| Control | Implementation | Technology | Status |
|---------|----------------|------------|--------|
| Anti-Malware | {{antimalware_impl}} | {{antimalware_tech}} | {{antimalware_status}} |
| Vulnerability Scanning | {{vuln_scan_impl}} | {{vuln_scan_tech}} | {{vuln_scan_status}} |
| Patch Management | {{patch_impl}} | {{patch_tech}} | {{patch_status}} |
| Secure Development | {{secure_dev_impl}} | {{secure_dev_tech}} | {{secure_dev_status}} |
| Code Review | {{code_review_impl}} | {{code_review_tech}} | {{code_review_status}} |

### 2.5 Access Control (Req 7-9)

| Control | Implementation | Technology | Status |
|---------|----------------|------------|--------|
| Role-Based Access | {{rbac_impl}} | {{rbac_tech}} | {{rbac_status}} |
| Unique User IDs | {{unique_id_impl}} | {{unique_id_tech}} | {{unique_id_status}} |
| MFA Implementation | {{mfa_impl}} | {{mfa_tech}} | {{mfa_status}} |
| Password Policy | {{password_impl}} | {{password_tech}} | {{password_status}} |
| Session Management | {{session_impl}} | {{session_tech}} | {{session_status}} |
| Physical Access Control | {{physical_impl}} | {{physical_tech}} | {{physical_status}} |

### 2.6 Monitoring & Testing (Req 10-11)

| Control | Implementation | Technology | Status |
|---------|----------------|------------|--------|
| Audit Logging | {{audit_log_impl}} | {{audit_log_tech}} | {{audit_log_status}} |
| Log Monitoring | {{log_mon_impl}} | {{log_mon_tech}} | {{log_mon_status}} |
| Time Synchronization | {{ntp_impl}} | {{ntp_tech}} | {{ntp_status}} |
| Penetration Testing | {{pentest_impl}} | {{pentest_tech}} | {{pentest_status}} |
| IDS/IPS | {{ids_impl}} | {{ids_tech}} | {{ids_status}} |
| File Integrity Monitoring | {{fim_impl}} | {{fim_tech}} | {{fim_status}} |

### 2.7 Control Implementation Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                 Control Implementation Flow                      │
│                                                                  │
│  REQUIREMENT ──► DESIGN_CONTROL ──► IMPLEMENT                   │
│       │               │                  │                       │
│       │               │                  ▼                       │
│       │               │           CONFIGURE                      │
│       │               │                  │                       │
│       │               │                  ▼                       │
│       │               │           TEST_CONTROL                   │
│       │               │                  │                       │
│       │               │           ┌──────┴──────┐               │
│       │               │           ▼             ▼               │
│       │               │         PASS          FAIL              │
│       │               │           │             │               │
│       │               │           ▼             ▼               │
│       │               │       DOCUMENT      REMEDIATE           │
│       │               │           │             │               │
│       │               │           ▼             └──► RETEST     │
│       │               │       VALIDATE                          │
│       │               │           │                             │
│       │               │           ▼                             │
│       │               │       EVIDENCE_COLLECT                  │
│       │               │           │                             │
│       │               │           ▼                             │
│       │               │       ONGOING_MONITOR                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Evidence Locations

### 3.1 Evidence Matrix by Requirement

| Requirement | Evidence Type | Location | Retention | Last Updated |
|-------------|---------------|----------|-----------|--------------|
| Req 1 | {{req1_evidence_type}} | {{req1_evidence_loc}} | {{req1_retention}} | {{req1_updated}} |
| Req 2 | {{req2_evidence_type}} | {{req2_evidence_loc}} | {{req2_retention}} | {{req2_updated}} |
| Req 3 | {{req3_evidence_type}} | {{req3_evidence_loc}} | {{req3_retention}} | {{req3_updated}} |
| Req 4 | {{req4_evidence_type}} | {{req4_evidence_loc}} | {{req4_retention}} | {{req4_updated}} |
| Req 5 | {{req5_evidence_type}} | {{req5_evidence_loc}} | {{req5_retention}} | {{req5_updated}} |
| Req 6 | {{req6_evidence_type}} | {{req6_evidence_loc}} | {{req6_retention}} | {{req6_updated}} |
| Req 7 | {{req7_evidence_type}} | {{req7_evidence_loc}} | {{req7_retention}} | {{req7_updated}} |
| Req 8 | {{req8_evidence_type}} | {{req8_evidence_loc}} | {{req8_retention}} | {{req8_updated}} |
| Req 9 | {{req9_evidence_type}} | {{req9_evidence_loc}} | {{req9_retention}} | {{req9_updated}} |
| Req 10 | {{req10_evidence_type}} | {{req10_evidence_loc}} | {{req10_retention}} | {{req10_updated}} |
| Req 11 | {{req11_evidence_type}} | {{req11_evidence_loc}} | {{req11_retention}} | {{req11_updated}} |
| Req 12 | {{req12_evidence_type}} | {{req12_evidence_loc}} | {{req12_retention}} | {{req12_updated}} |

### 3.2 Evidence Categories

| Category | Description | Examples | Storage |
|----------|-------------|----------|---------|
| Policies | {{policy_desc}} | {{policy_examples}} | {{policy_storage}} |
| Procedures | {{procedure_desc}} | {{procedure_examples}} | {{procedure_storage}} |
| Technical | {{technical_desc}} | {{technical_examples}} | {{technical_storage}} |
| Logs | {{logs_desc}} | {{logs_examples}} | {{logs_storage}} |
| Scans | {{scans_desc}} | {{scans_examples}} | {{scans_storage}} |
| Training | {{training_desc}} | {{training_examples}} | {{training_storage}} |

### 3.3 Evidence Schema

```yaml
pci_evidence:
  evidence_id: uuid                   # Unique evidence identifier
  requirement_ids: array              # Related PCI requirements
  type: enum                          # policy, procedure, technical, log
  name: string                        # Evidence name
  description: string                 # Evidence description
  location:
    path: string                      # Storage path
    repository: string                # Repository name
    version: string                   # Document version
  collection:
    method: string                    # How collected
    frequency: string                 # Collection frequency
    automated: boolean                # Automated collection
  validity:
    created_at: iso8601
    valid_from: iso8601
    valid_until: iso8601
    review_date: iso8601
  chain_of_custody:
    - actor: string
      action: string
      timestamp: iso8601
  metadata:
    classification: string            # Confidentiality level
    tenant_specific: boolean          # Per-tenant evidence
    {{custom_field}}: {{custom_type}}
```

### 3.4 Evidence Collection Schedule

| Evidence Type | Collection Frequency | Automation | Owner |
|---------------|---------------------|------------|-------|
| Firewall Rules | {{firewall_freq}} | {{firewall_auto}} | {{firewall_owner}} |
| User Access Reviews | {{access_freq}} | {{access_auto}} | {{access_owner}} |
| Vulnerability Scans | {{vuln_freq}} | {{vuln_auto}} | {{vuln_owner}} |
| Penetration Tests | {{pentest_freq}} | {{pentest_auto}} | {{pentest_owner}} |
| Audit Logs | {{audit_freq}} | {{audit_auto}} | {{audit_owner}} |
| Training Records | {{training_freq}} | {{training_auto}} | {{training_owner}} |

---

## Assessment Scope

### 4.1 Cardholder Data Environment (CDE) Boundary

| System/Component | In Scope | Justification | Segmentation |
|------------------|----------|---------------|--------------|
| {{system_1}} | {{scope_1}} | {{justification_1}} | {{segmentation_1}} |
| {{system_2}} | {{scope_2}} | {{justification_2}} | {{segmentation_2}} |
| {{system_3}} | {{scope_3}} | {{justification_3}} | {{segmentation_3}} |
| {{system_4}} | {{scope_4}} | {{justification_4}} | {{segmentation_4}} |
| {{system_5}} | {{scope_5}} | {{justification_5}} | {{segmentation_5}} |

### 4.2 Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    Cardholder Data Flow                          │
│                                                                  │
│  CUSTOMER ──► WEB_APP ──► PAYMENT_PAGE ──► TOKENIZATION         │
│      │           │             │               │                 │
│      │           │             │               ▼                 │
│      │           │             │         PAYMENT_GATEWAY         │
│      │           │             │               │                 │
│      │           │             │        ┌──────┴──────┐         │
│      │           │             │        ▼             ▼         │
│      │           │             │    SUCCESS       FAILURE       │
│      │           │             │        │             │         │
│      │           │             │        └──────┬──────┘         │
│      │           │             │               ▼                 │
│      │           │             │         WEBHOOK_NOTIFY          │
│      │           │             │               │                 │
│      │           │             │               ▼                 │
│      │           │             └───────► ORDER_UPDATE           │
│      │           │                                               │
│      │           └──► NO_CHD_STORED                             │
│      │                                                           │
│      └──► TOKEN_ONLY (No PAN, CVV stored)                       │
└─────────────────────────────────────────────────────────────────┘
```

### 4.3 Connected Systems

| System | Connection Type | Data Transmitted | In Scope |
|--------|-----------------|------------------|----------|
| {{connected_1}} | {{conn_type_1}} | {{data_1}} | {{in_scope_1}} |
| {{connected_2}} | {{conn_type_2}} | {{data_2}} | {{in_scope_2}} |
| {{connected_3}} | {{conn_type_3}} | {{data_3}} | {{in_scope_3}} |

### 4.4 Third-Party Service Providers

| Provider | Service | PCI Level | AOC Status | Last Reviewed |
|----------|---------|-----------|------------|---------------|
| {{provider_1}} | {{service_1}} | {{level_1}} | {{aoc_1}} | {{reviewed_1}} |
| {{provider_2}} | {{service_2}} | {{level_2}} | {{aoc_2}} | {{reviewed_2}} |
| {{provider_3}} | {{service_3}} | {{level_3}} | {{aoc_3}} | {{reviewed_3}} |

### 4.5 Scope Reduction Measures

| Measure | Description | Impact | Verification |
|---------|-------------|--------|--------------|
| Tokenization | {{tokenization_desc}} | {{tokenization_impact}} | {{tokenization_verify}} |
| P2PE | {{p2pe_desc}} | {{p2pe_impact}} | {{p2pe_verify}} |
| Network Segmentation | {{segmentation_desc}} | {{segmentation_impact}} | {{segmentation_verify}} |
| Outsourcing | {{outsource_desc}} | {{outsource_impact}} | {{outsource_verify}} |

---

## Self-Assessment Checklist

### 5.1 SAQ Type Determination

| Factor | Value | SAQ Implication |
|--------|-------|-----------------|
| E-commerce Presence | {{ecom_value}} | {{ecom_implication}} |
| Card Present Transactions | {{cp_value}} | {{cp_implication}} |
| CHD Storage | {{chd_storage_value}} | {{chd_storage_implication}} |
| Processing Method | {{processing_value}} | {{processing_implication}} |
| **Determined SAQ Type** | **{{saq_type}}** | |

### 5.2 Requirement 1: Network Security

- [ ] 1.1 Processes and mechanisms for network security controls are defined and documented
- [ ] 1.2 Network security controls are configured and maintained
- [ ] 1.3 Network access to and from the CDE is restricted
- [ ] 1.4 Network connections between trusted and untrusted networks are controlled
- [ ] 1.5 Risks from insecure ports, protocols, and services are mitigated

### 5.3 Requirement 2: Secure Configuration

- [ ] 2.1 Processes and mechanisms for secure configurations are defined and documented
- [ ] 2.2 System components are configured securely
- [ ] 2.3 Wireless environments are configured securely

### 5.4 Requirement 3: Protect Stored Account Data

- [ ] 3.1 Processes for protecting stored account data are defined and documented
- [ ] 3.2 Storage of account data is kept to a minimum
- [ ] 3.3 Sensitive authentication data (SAD) is not stored after authorization
- [ ] 3.4 Access to displays of full PAN is restricted
- [ ] 3.5 Primary account number (PAN) is secured wherever stored
- [ ] 3.6 Cryptographic keys used to protect stored account data are secured
- [ ] 3.7 Cryptographic key management practices are documented and implemented

### 5.5 Requirement 4: Protect Cardholder Data in Transit

- [ ] 4.1 Processes for encrypting CHD in transit are defined and documented
- [ ] 4.2 PAN is protected with strong cryptography during transmission

### 5.6 Requirement 5: Protect from Malicious Software

- [ ] 5.1 Processes for protecting against malware are defined and documented
- [ ] 5.2 Malware is prevented or detected and addressed
- [ ] 5.3 Anti-malware mechanisms and processes are active and maintained
- [ ] 5.4 Anti-phishing mechanisms protect users against phishing attacks

### 5.7 Requirement 6: Develop and Maintain Secure Systems

- [ ] 6.1 Processes for secure development and software security are defined
- [ ] 6.2 Bespoke and custom software is developed securely
- [ ] 6.3 Security vulnerabilities are identified and addressed
- [ ] 6.4 Public-facing web applications are protected against attacks
- [ ] 6.5 Changes to systems are managed securely

### 5.8 Requirement 7: Restrict Access

- [ ] 7.1 Processes for restricting access are defined and documented
- [ ] 7.2 Access to system components and data is appropriately defined
- [ ] 7.3 Access to system components and data is managed via access control

### 5.9 Requirement 8: Identify and Authenticate Access

- [ ] 8.1 Processes for identification and authentication are defined
- [ ] 8.2 User identification and accounts are strictly managed
- [ ] 8.3 Strong authentication for users and administrators is established
- [ ] 8.4 MFA is implemented for access to the CDE
- [ ] 8.5 MFA systems are configured to prevent misuse
- [ ] 8.6 Authentication factors are secured

### 5.10 Requirement 9: Restrict Physical Access

- [ ] 9.1 Processes for restricting physical access are defined
- [ ] 9.2 Physical access controls manage entry into facilities
- [ ] 9.3 Physical access for personnel and visitors is authorized
- [ ] 9.4 Media with CHD is securely stored, accessed, and destroyed
- [ ] 9.5 POI devices are protected from tampering and substitution

### 5.11 Requirement 10: Log and Monitor Access

- [ ] 10.1 Processes for logging and monitoring are defined
- [ ] 10.2 Audit logs are implemented to detect anomalies
- [ ] 10.3 Audit logs are protected from destruction and modification
- [ ] 10.4 Audit logs are reviewed to identify anomalies
- [ ] 10.5 Audit log history is retained and available for analysis
- [ ] 10.6 Time-synchronization technology supports consistent time
- [ ] 10.7 Failures of critical security systems are detected and responded to

### 5.12 Requirement 11: Test Security

- [ ] 11.1 Processes for testing security are defined
- [ ] 11.2 Wireless access points are identified and monitored
- [ ] 11.3 External and internal vulnerabilities are identified and addressed
- [ ] 11.4 External and internal penetration testing is performed
- [ ] 11.5 Network intrusions and changes are detected and responded to
- [ ] 11.6 Unauthorized changes on payment pages are detected and responded to

### 5.13 Requirement 12: Organizational Policies

- [ ] 12.1 Information security policy is established and maintained
- [ ] 12.2 Acceptable use policies are established and implemented
- [ ] 12.3 Risks to the CDE are formally identified and managed
- [ ] 12.4 PCI DSS compliance is managed throughout the year
- [ ] 12.5 PCI DSS scope is documented and validated
- [ ] 12.6 Security awareness education is an ongoing activity
- [ ] 12.7 Personnel are screened to reduce insider threat
- [ ] 12.8 Risk to CHD from third party service providers is managed
- [ ] 12.9 Third party service providers acknowledge compliance
- [ ] 12.10 Incidents are detected and responded to

---

## Cardholder Data Environment

### 6.1 CHD Elements

| Data Element | Stored | Storage Location | Protection Method |
|--------------|--------|------------------|-------------------|
| PAN | {{pan_stored}} | {{pan_location}} | {{pan_protection}} |
| Cardholder Name | {{name_stored}} | {{name_location}} | {{name_protection}} |
| Service Code | {{service_stored}} | {{service_location}} | {{service_protection}} |
| Expiration Date | {{exp_stored}} | {{exp_location}} | {{exp_protection}} |
| CVV/CVC | {{cvv_stored}} | {{cvv_location}} | {{cvv_protection}} |
| PIN | {{pin_stored}} | {{pin_location}} | {{pin_protection}} |
| Track Data | {{track_stored}} | {{track_location}} | {{track_protection}} |

### 6.2 CDE Inventory

| Asset Type | Count | Classification | Location |
|------------|-------|----------------|----------|
| Servers | {{server_count}} | {{server_class}} | {{server_location}} |
| Databases | {{db_count}} | {{db_class}} | {{db_location}} |
| Applications | {{app_count}} | {{app_class}} | {{app_location}} |
| Network Devices | {{network_count}} | {{network_class}} | {{network_location}} |

---

## Tenant Considerations

### 7.1 Tenant Isolation for PCI

| Aspect | Isolation Method | Verification | Evidence |
|--------|------------------|--------------|----------|
| Data Isolation | {{data_isolation}} | {{data_verify}} | {{data_evidence}} |
| Network Isolation | {{network_isolation}} | {{network_verify}} | {{network_evidence}} |
| Key Management | {{key_isolation}} | {{key_verify}} | {{key_evidence}} |
| Logging | {{log_isolation}} | {{log_verify}} | {{log_evidence}} |

### 7.2 Tenant PCI Requirements by Tier

| Tier | PCI Support | Shared Responsibility | Documentation |
|------|-------------|----------------------|---------------|
| Free | {{free_pci}} | {{free_responsibility}} | {{free_docs}} |
| Pro | {{pro_pci}} | {{pro_responsibility}} | {{pro_docs}} |
| Enterprise | {{enterprise_pci}} | {{enterprise_responsibility}} | {{enterprise_docs}} |

---

## Compensating Controls

### 8.1 Compensating Control Register

| Requirement | Standard Control | Compensating Control | Justification |
|-------------|------------------|---------------------|---------------|
| {{comp_req_1}} | {{standard_1}} | {{compensating_1}} | {{justification_1}} |
| {{comp_req_2}} | {{standard_2}} | {{compensating_2}} | {{justification_2}} |

### 8.2 Compensating Control Worksheet

| Element | Description |
|---------|-------------|
| Requirement | {{cc_requirement}} |
| Original Control | {{cc_original}} |
| Constraint | {{cc_constraint}} |
| Compensating Control | {{cc_control}} |
| Validation | {{cc_validation}} |
| Risk Addressed | {{cc_risk}} |

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "PCI-DSS 4.0 compliance requirements SaaS {date}"
- "multi-tenant PCI compliance isolation patterns {date}"
- "payment tokenization best practices PCI scope reduction {date}"

Incorporate relevant findings. _Source: [URL]_

---

## Verification Checklist

### PCI-DSS Compliance Checklist

- [ ] All 12 requirements mapped with implementation status
- [ ] Control implementation documented with technologies
- [ ] Evidence locations identified for all requirements
- [ ] Assessment scope clearly defined with CDE boundaries
- [ ] Self-assessment checklist completed
- [ ] Cardholder data elements inventoried
- [ ] Tenant isolation for PCI documented
- [ ] Compensating controls documented where applicable
- [ ] All placeholders replaced with actual values
- [ ] Third-party service provider compliance verified

### Assessment Readiness Checklist

- [ ] All evidence current and accessible
- [ ] Policies and procedures up to date
- [ ] Vulnerability scans within 90 days
- [ ] Penetration test within 12 months
- [ ] Training records current

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial specification |
