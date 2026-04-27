# Encryption Patterns

**When to load:** When implementing data protection requirements for SOC2, HIPAA, PCI-DSS, GDPR, or other frameworks requiring encryption at rest and in transit

**Integrates with:** Security agent, Architect (Atlas persona), DevOps agent

---

## Core Concepts

### Encryption Layers

Encryption must be applied at multiple layers to protect data throughout its lifecycle, from storage to transmission to processing.

| Layer | Protection Scope | Common Implementation |
|-------|------------------|----------------------|
| At Rest | Stored data in databases, files, backups | AES-256, TDE, volume encryption |
| In Transit | Data moving between systems | TLS 1.3, mTLS for service-to-service |
| In Use | Data during processing | Confidential computing, secure enclaves |

### Key Management Hierarchy

A key management hierarchy organizes encryption keys into levels, enabling efficient rotation and limiting exposure if any single key is compromised.

- **Master Key (KEK)**: Protects other keys; stored in HSM or cloud KMS
- **Data Encryption Key (DEK)**: Encrypts actual data; rotatable without re-encrypting data
- **Tenant Key**: Per-tenant key enabling isolated key management and cryptographic deletion

### Customer-Managed Keys (CMK/BYOK)

Customer-managed keys allow enterprise tenants to maintain control over encryption keys used to protect their data, supporting compliance requirements and providing assurance of data sovereignty.

| CMK Feature | Tenant Benefit | Platform Requirement |
|-------------|----------------|---------------------|
| Key Ownership | Tenant controls key lifecycle | Support external key import |
| Key Rotation | Tenant schedules rotation | Seamless re-encryption capability |
| Key Revocation | Tenant can render data unreadable | Graceful handling of key unavailability |
| Audit Access | Tenant sees all key usage | Key usage logging and reporting |

## Overview

Encryption patterns establish systematic approaches to protecting data confidentiality through cryptographic controls in multi-tenant SaaS environments. These patterns cover encryption at rest, in transit, and in use, including key management strategies that support per-tenant encryption while maintaining operational efficiency.

## Compliance Requirements

- **Encryption at Rest**: All sensitive data encrypted when stored
- **Encryption in Transit**: TLS/HTTPS for all data transmission
- **Key Management**: Secure generation, storage, rotation, and destruction of encryption keys
- **Tenant Key Isolation**: Separation of encryption keys between tenants where required
- **Algorithm Standards**: Use of approved cryptographic algorithms and key lengths

## Implementation Patterns

| Pattern | Description | Frameworks |
|---------|-------------|------------|
| Transparent Data Encryption | Database-level encryption without application changes | SOC2, HIPAA, PCI-DSS |
| Application-Layer Encryption | Field-level encryption for sensitive data elements | HIPAA, PCI-DSS |
| Per-Tenant Key Encryption | Separate encryption keys per tenant for data isolation | Enterprise, HIPAA |
| Customer-Managed Keys (CMK) | Tenant-controlled keys with BYOK support | Enterprise, FedRAMP |
| Key Rotation Automation | Scheduled key rotation without service interruption | SOC2, PCI-DSS, HIPAA |
| HSM Integration | Hardware security module for key protection | PCI-DSS, FedRAMP |

## Validation Checklist

- [ ] All data at rest is encrypted
- [ ] All data in transit uses TLS 1.2+
- [ ] Key management procedures are documented
- [ ] Key rotation is automated and tested
- [ ] Per-tenant keys are isolated where required
- [ ] CMK support is available for enterprise tenants
- [ ] Cryptographic algorithms meet compliance standards
- [ ] Key backup and recovery procedures are tested

## Application Guidelines

When implementing encryption:

1. **Classify data sensitivity**: Identify which data requires encryption and at what level
2. **Select encryption approach**: Choose between transparent, application-layer, or field-level encryption
3. **Design key hierarchy**: Establish master keys, data encryption keys, and key encryption keys
4. **Implement key rotation**: Automate key rotation without service interruption
5. **Plan for disaster recovery**: Ensure key backup and recovery procedures are tested

When encrypting in multi-tenant environments:

1. **Isolate tenant keys**: Implement per-tenant encryption keys for enterprise customers
2. **Support BYOK**: Enable customer-managed keys for compliance requirements
3. **Document key ownership**: Clearly define who owns and controls encryption keys per tenant
4. **Handle tenant offboarding**: Ensure cryptographic deletion capability for tenant data

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Security patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `security-*`
- **Compliance patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "encryption at rest multi-tenant SaaS {date}"
- Search: "customer-managed keys BYOK implementation {date}"
- Search: "PCI-DSS encryption requirements {date}"

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Do you need PCI-DSS or HIPAA compliance? | Implement application-layer encryption for sensitive fields | Compliance frameworks require encryption of specific data elements with documented key management |
| Are enterprise tenants requesting BYOK? | Design customer-managed key (CMK) architecture from the start | BYOK is difficult to retrofit and is a common enterprise requirement |
| How do you handle tenant offboarding? | Implement cryptographic erasure with per-tenant keys | Deleting tenant keys renders data unrecoverable without needing to locate all data copies |
| Should you use HSM for key protection? | Required for PCI-DSS and FedRAMP; recommended for all production | HSMs provide hardware-backed key protection and tamper resistance |
| How often should keys rotate? | Automated rotation at least annually, more frequently for high-security | Regular rotation limits exposure from potential key compromise |

## Related Workflows

- `bmad-bam-security-review` - Review encryption implementation against compliance requirements
- `bmad-bam-compliance-design` - Design encryption controls for regulatory frameworks
- `bmad-bam-tenant-model-isolation` - Configure tenant-level encryption boundaries

## References

- `encryption-key-management` - Key management pattern from bam-patterns.csv
- `compliance` - General compliance pattern from bam-patterns.csv
- `tenant-isolation` - Tenant separation for encryption keys
- `audit-logging-patterns` - Logging of key usage events
- `all-security-patterns` - Comprehensive security controls
