# Step 1: Initialize Security Design

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 🚦 **HALT on CRITICAL failure** - Document and enter recovery protocol

## EXECUTION PROTOCOLS

- 🎯 Focus: Initialize security architecture design and gather requirements
- 💾 Track: `stepsCompleted: [1]` when complete
- 📖 Context: Load compliance frameworks and threat model baseline
- 🚫 Do NOT: Skip requirement gathering or assume security constraints
- 🔍 Use web search: Verify security patterns against OWASP best practices
- ⚠️ Gate: QG-S1-S10 (Security gates)

---

## Purpose

Initialize the security architecture design process by loading compliance requirements, threat model baseline, and identifying security domains for multi-tenant SaaS.

---

## Prerequisites

- Master architecture document available (QG-F1 passed)
- Tenant model selected (`{tenant_model}` configured)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: security-*
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

---

## Actions

### 1. Load Security Pattern Registry

Reference security patterns from pattern registry:

| Pattern ID | Category | When to Apply |
|------------|----------|---------------|
| security-authn | authentication | All multi-tenant systems |
| security-authz | authorization | RBAC with tenant scoping |
| security-encrypt | data-protection | PII and sensitive data |
| security-audit | compliance | Regulated industries |
| security-network | infrastructure | All production deployments |

### 2. Identify Compliance Requirements

| Framework | Applicability | Key Requirements |
|-----------|---------------|------------------|
| SOC 2 | SaaS platforms | Access control, encryption, logging |
| GDPR | EU data subjects | Data protection, consent, portability |
| HIPAA | Healthcare data | PHI protection, audit trails |
| PCI-DSS | Payment processing | Cardholder data protection |
| ISO 27001 | Enterprise clients | Information security management |

### 3. Define Security Domains

| Domain | Scope | Priority |
|--------|-------|----------|
| **AuthN** | Identity verification, MFA, SSO | CRITICAL |
| **AuthZ** | RBAC, permissions, tenant scoping | CRITICAL |
| **Encryption** | Data at rest, in transit, key management | CRITICAL |
| **Audit** | Logging, compliance, forensics | HIGH |
| **Network** | Segmentation, firewall, API gateway | HIGH |
| **Vulnerability** | Scanning, patching, pen testing | MEDIUM |

### 4. Establish Threat Model Baseline

| Threat Category | Multi-Tenant Concern | Mitigation Domain |
|-----------------|---------------------|-------------------|
| Cross-tenant data leakage | Tenant A accesses Tenant B data | AuthZ, Encryption |
| Session hijacking | Stolen token grants unauthorized access | AuthN |
| Privilege escalation | User gains admin capabilities | AuthZ |
| Data exfiltration | Bulk data export by malicious actor | Audit, Network |
| Injection attacks | SQL/NoSQL/Prompt injection | Input validation |
| Denial of service | Resource exhaustion affecting tenants | Rate limiting |

**Verify current best practices with web search:**
Search the web: "OWASP multi-tenant security best practices {date}"
Search the web: "SaaS security architecture patterns {date}"

_Source: [URL]_

---

## Soft Gate Checkpoint

**Step 1 initializes the security design process.**

Present the following to user:
- Applicable compliance frameworks
- Security domains to address
- Threat model baseline

⏸️ **PAUSE:** Await user confirmation before proceeding.

---

## Verification

- [ ] Security patterns loaded from pattern registry
- [ ] Compliance requirements identified for target market
- [ ] Security domains prioritized (AuthN, AuthZ, Encryption, Audit)
- [ ] Threat model baseline established with multi-tenant concerns
- [ ] Web research completed with source citations

---

## Outputs

- Security domain inventory
- Compliance framework applicability matrix
- Threat model baseline document

---

## Next Step

Proceed to `step-02-c-analyze.md` to design authentication architecture.
