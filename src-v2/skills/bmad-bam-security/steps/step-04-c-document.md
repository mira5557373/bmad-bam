# Step 4: Design Data Protection Architecture

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 🚦 **HALT on CRITICAL failure** - Document and enter recovery protocol

## EXECUTION PROTOCOLS

- 🎯 Focus: Design encryption, key management, secret rotation, data classification
- 💾 Track: `stepsCompleted: [1, 2, 3, 4]` when complete
- 📖 Context: Authorization design from Step 3
- 🚫 Do NOT: Compile final document (Step 5) or skip per-tenant key management
- 🔍 Use web search: Verify encryption patterns against NIST and cloud provider guidance
- ⚠️ Gate: QG-S3 (Data Protection Security)

---

## Purpose

Design comprehensive data protection architecture including encryption at rest and in transit, per-tenant key management, secret rotation policies, and data classification handling for multi-tenant SaaS.

---

## Prerequisites

- Step 3 complete with authorization design
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: security-encrypt
- **Load guide:** `{project-root}/_bmad/bam/data/agent-guides/bam/security-guide.md`

---

## Actions

### 1. Design Encryption at Rest and In Transit

**Encryption at Rest:**

| Data Store | Algorithm | Key Size | Management |
|------------|-----------|----------|------------|
| Primary Database | AES-256-GCM | 256-bit | Cloud KMS |
| Object Storage | AES-256 | 256-bit | Cloud-native SSE |
| Search Index | AES-256 | 256-bit | Per-tenant keys |
| Backups | AES-256-GCM | 256-bit | Separate backup keys |
| Logs | AES-256 | 256-bit | Centralized logging key |

**Encryption in Transit:**

| Connection Type | Protocol | Minimum Version | Configuration |
|-----------------|----------|-----------------|---------------|
| Client to API | TLS | 1.3 | HTTPS enforced |
| Service to Service | mTLS | 1.2 | Certificate-based auth |
| Database | TLS | 1.2 | Require SSL |
| Object Storage | TLS | 1.2 | HTTPS endpoints only |
| External APIs | TLS | 1.2 | Certificate pinning (optional) |

**Cipher Suite Policy:**

| Priority | Cipher Suite | Use Case |
|----------|--------------|----------|
| 1 | TLS_AES_256_GCM_SHA384 | TLS 1.3 default |
| 2 | TLS_CHACHA20_POLY1305_SHA256 | Mobile clients |
| 3 | TLS_AES_128_GCM_SHA256 | Performance-sensitive |
| Disabled | CBC mode ciphers | Security vulnerability |
| Disabled | RSA key exchange | Forward secrecy required |

### 2. Design Per-Tenant Key Management

**Key Hierarchy:**

| Key Level | Scope | Rotation | Storage |
|-----------|-------|----------|---------|
| Master Key (MK) | Platform | Annual | HSM / Cloud KMS |
| Tenant Key (TK) | Per tenant | 90 days | KMS, wrapped by MK |
| Data Encryption Key (DEK) | Per record/field | On write | Encrypted by TK |
| Key Encryption Key (KEK) | Key wrapping | 180 days | KMS |

**Tenant Key Lifecycle:**

| Event | Action | Notification |
|-------|--------|--------------|
| Tenant Created | Generate TK, wrap with MK | System log |
| Key Rotation | Generate new TK, re-encrypt DEKs | Tenant admin |
| Tenant Suspended | Key access revoked | Tenant admin |
| Tenant Deleted | Key destroyed after retention | Compliance record |
| Key Compromise | Emergency rotation, audit | Security team |

**Multi-Tenant Isolation:**

| Tenant Model | Key Strategy | Isolation Level |
|--------------|--------------|-----------------|
| RLS | Per-tenant TK, shared infrastructure | Logical |
| Schema-per-tenant | Per-tenant TK, separate schema | Logical + schema |
| Database-per-tenant | Per-tenant KMS key | Physical |

### 3. Define Secret Rotation Policies

**Secret Categories:**

| Secret Type | Rotation Period | Method | Owner |
|-------------|-----------------|--------|-------|
| Database credentials | 30 days | Automated | Platform |
| API keys | 90 days | User-initiated | Tenant |
| Service account tokens | 7 days | Automated | Platform |
| Encryption keys | 90 days | Automated | Platform |
| SSL/TLS certificates | 90 days (auto-renew) | Automated | Platform |
| OAuth client secrets | 180 days | Manual with approval | Platform |

**Rotation Workflow:**

| Phase | Action | Validation |
|-------|--------|------------|
| Pre-rotation | Generate new secret | Format validation |
| Dual-active | Both secrets valid | Integration tests |
| Migration | Update consumers | Health checks |
| Deprecation | Warn on old secret use | Log analysis |
| Revocation | Old secret invalid | Access denied confirmation |

**Secret Storage:**

| Storage System | Use Case | Access Pattern |
|----------------|----------|----------------|
| HashiCorp Vault | Production secrets | Dynamic secrets |
| AWS Secrets Manager | AWS-native | SDK integration |
| Azure Key Vault | Azure-native | SDK integration |
| GCP Secret Manager | GCP-native | SDK integration |
| Environment variables | Local development only | Never in production |

### 4. Design Data Classification and Handling

**Classification Levels:**

| Level | Description | Examples | Handling Requirements |
|-------|-------------|----------|----------------------|
| Public | No restrictions | Marketing content | Standard encryption |
| Internal | Business use | Feature flags | Encryption + access control |
| Confidential | Sensitive business | Financial data | Encryption + audit + DLP |
| Restricted | Highest protection | PII, PHI, credentials | Per-tenant keys + masking + audit |

**Handling Requirements by Classification:**

| Requirement | Public | Internal | Confidential | Restricted |
|-------------|--------|----------|--------------|------------|
| Encryption at rest | Required | Required | Required | Per-tenant keys |
| Encryption in transit | Required | Required | Required | Required + mTLS |
| Access logging | Optional | Required | Required | Required + alerts |
| Data masking | No | No | Yes (non-prod) | Yes (always) |
| Retention policy | Standard | Standard | Compliance-defined | Compliance-defined |
| Cross-border transfer | Allowed | Allowed | Restricted | Prohibited |

**PII/PHI Detection and Handling:**

| Data Type | Detection Method | Auto-Classification | Treatment |
|-----------|------------------|---------------------|-----------|
| Email addresses | Regex + ML | Confidential | Masking in logs |
| Phone numbers | Pattern matching | Confidential | Masking in exports |
| SSN/National ID | Strict regex | Restricted | Field-level encryption |
| Credit card | Luhn + pattern | Restricted | Tokenization |
| Health records | Field name + ML | Restricted | Compartmentalized access |

**Verify current best practices with web search:**
Search the web: "multi-tenant encryption key management best practices {date}"
Search the web: "data classification SaaS GDPR compliance {date}"
Search the web: "secret rotation automation patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

After completing data protection architecture design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into key hierarchy, specific compliance requirements, or HSM integration
- **P (Party Mode)**: Bring security architect, compliance officer, and data engineer perspectives
- **C (Continue)**: Accept data protection design and proceed to final compilation
- **[Specific concerns]**: Describe concerns to investigate further

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: Data protection architecture design including encryption, key management, secret rotation, and data classification
- Focus areas:
  - What cloud provider(s) will host the KMS?
  - Are there specific data residency requirements (EU, US, etc.)?
  - Do you need hardware security modules (HSM) for key storage?
  - Compliance-specific encryption requirements
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into data protection design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review data protection architecture for multi-tenant SaaS including encryption at rest/transit, per-tenant key management, secret rotation policies, and data classification handling"
- Process relevant personas:
  - **Security Architect:** Evaluate key hierarchy and rotation policies
  - **Compliance Officer:** Validate against GDPR/HIPAA/PCI requirements
  - **Data Engineer:** Assess performance impact of encryption
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document data protection design to output artifact
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-complete.md`

---

## Verification

- [ ] Encryption at rest uses AES-256 or equivalent (CRITICAL)
- [ ] Encryption in transit enforces TLS 1.2+ (CRITICAL)
- [ ] Per-tenant key management defined with key hierarchy
- [ ] Secret rotation policies cover all secret types
- [ ] Data classification levels defined with handling requirements
- [ ] PII/PHI detection and handling documented
- [ ] Web research completed with source citations

---

## Outputs

- Encryption architecture specification
- Per-tenant key management design
- Secret rotation policies
- Data classification and handling guidelines

---

## Next Step

Proceed to `step-05-c-complete.md` to compile the complete security design document.
