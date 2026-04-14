# Step 2: Audit Data Handling Practices

## Purpose

Audit data handling practices for compliance with identified regulatory requirements.

## Prerequisites

- Step 1 complete
- Data flow documentation available
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `data-protection`

## Actions

### 1. Data Classification Audit

| Data Type | Classification | Handling Requirements | Status |
|-----------|---------------|----------------------|--------|
| PII | Sensitive | Encrypted, access-logged | |
| PHI | Critical | HIPAA controls | |
| Payment | Critical | PCI-DSS scope | |
| AI Prompts | Confidential | Tenant-isolated | |
| Model outputs | Confidential | Retention policies | |

### 2. Data Flow Compliance Check

| Flow | Source | Destination | Encryption | Logging | Status |
|------|--------|-------------|------------|---------|--------|
| User input | Client | API | TLS 1.3 | Yes | |
| Model inference | API | LLM | TLS 1.3 | Yes | |
| Data storage | API | Database | AES-256 | Yes | |
| Cross-region | Region A | Region B | TLS 1.3 | Yes | |

### 3. Retention Policy Verification

| Data Type | Retention Period | Deletion Method | Verified |
|-----------|------------------|-----------------|----------|
| Chat history | Tenant config | Secure wipe | |
| Audit logs | 7 years | Archive then delete | |
| Model outputs | 30 days default | Secure wipe | |
| Training data | Project lifetime | Secure wipe | |

### 4. Cross-Border Transfer Compliance

| Transfer | Legal Basis | Safeguards | Status |
|----------|-------------|------------|--------|
| EU to US | SCCs | Encryption + access controls | |
| APAC to EU | SCCs | Data residency option | |
| Internal | Legitimate interest | Same controls | |

**Verify data handling audit with web search:**
Search the web: "data handling compliance audit {date}"
Search the web: "GDPR data flow verification {date}"

## Verification

- [ ] Data classification complete
- [ ] Data flows documented and compliant
- [ ] Retention policies verified
- [ ] Cross-border transfers compliant

## Outputs

- Data handling audit findings

## Next Step

Proceed to `step-03-c-verify-access-controls.md`
