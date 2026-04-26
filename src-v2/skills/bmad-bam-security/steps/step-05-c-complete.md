# Step 5: Compile Security Design Document

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 🚦 **HALT on CRITICAL failure** - Document and enter recovery protocol

## EXECUTION PROTOCOLS

- 🎯 Focus: Compile security architecture, map threat mitigations, define pen test requirements
- 💾 Track: `stepsCompleted: [1, 2, 3, 4, 5]` when complete
- 📖 Context: All previous step outputs (authentication, authorization, data protection)
- 🚫 Do NOT: Add new design elements; only compile and verify completeness
- 🔍 Use web search: Verify security architecture completeness against industry frameworks
- ⚠️ Gate: QG-S1-S10 (All Security Gates)

---

## Purpose

Compile the complete security design document by synthesizing authentication, authorization, and data protection designs. Map threat mitigations, define penetration test requirements, and output to the planning artifacts folder.

---

## Prerequisites

- Steps 1-4 complete with all security domain designs
- **Load template:** `{project-root}/_bmad/bam/data/templates/security-architecture.md`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-s3-security-baseline.md`

---

## Actions

### 1. Compile Security Architecture Overview

**Document Structure:**

| Section | Source | Content |
|---------|--------|---------|
| Executive Summary | Step 1 | Security domains, compliance, threat model |
| Authentication | Step 2 | JWT, MFA, sessions, SSO |
| Authorization | Step 3 | RBAC, permissions, API keys |
| Data Protection | Step 4 | Encryption, keys, secrets, classification |
| Threat Mitigations | This step | Mapping to security controls |
| Testing Requirements | This step | Penetration test scope |

**Security Architecture Diagram Components:**

| Layer | Components | Security Controls |
|-------|------------|-------------------|
| Edge | CDN, WAF, DDoS protection | Rate limiting, geo-blocking |
| API Gateway | Authentication, rate limiting | JWT validation, quotas |
| Application | Business logic | Input validation, AuthZ |
| Data | Database, storage | Encryption, RLS |
| Infrastructure | Network, compute | mTLS, segmentation |

### 2. Map Threat Mitigations

| Threat | Risk Level | Mitigation | Control Location |
|--------|------------|------------|------------------|
| Cross-tenant data leakage | CRITICAL | RLS + tenant_id in all queries | Data Layer |
| JWT token theft | HIGH | Short expiry + refresh rotation | API Gateway |
| Session hijacking | HIGH | Session binding + secure cookies | Application |
| Privilege escalation | HIGH | RBAC + deny precedence | Application |
| SQL injection | HIGH | Parameterized queries + input validation | Application |
| Prompt injection | HIGH | Input sanitization + output filtering | AI Layer |
| Data exfiltration | MEDIUM | DLP + audit logging | Data Layer |
| Credential stuffing | MEDIUM | Rate limiting + MFA | Edge |
| API abuse | MEDIUM | Per-key quotas + anomaly detection | API Gateway |
| Insider threat | MEDIUM | Least privilege + audit trails | All Layers |

**Control Effectiveness Matrix:**

| Control | Threats Mitigated | Effectiveness | Residual Risk |
|---------|-------------------|---------------|---------------|
| Tenant-scoped RBAC | Cross-tenant access | High | Misconfiguration |
| Per-tenant encryption | Data leakage | High | Key compromise |
| MFA enforcement | Credential theft | High | Social engineering |
| Audit logging | All threats | Medium | Detection delay |
| Rate limiting | Abuse, DDoS | Medium | Sophisticated attacks |

### 3. Define Penetration Test Requirements

**Test Scope:**

| Area | Test Type | Frequency | Priority |
|------|-----------|-----------|----------|
| Authentication | Black box | Quarterly | CRITICAL |
| Authorization | White box | Quarterly | CRITICAL |
| Tenant isolation | White box | Quarterly | CRITICAL |
| API security | Gray box | Quarterly | HIGH |
| Data protection | White box | Semi-annual | HIGH |
| Infrastructure | Black box | Annual | MEDIUM |

**Required Test Scenarios:**

| Scenario | Description | Pass Criteria |
|----------|-------------|---------------|
| Tenant boundary crossing | Attempt to access Tenant B data as Tenant A | No data exposure |
| Privilege escalation | Attempt to gain admin from user role | Access denied |
| Token manipulation | Modify JWT claims | Token rejected |
| Session hijacking | Use stolen session token | Session invalidated |
| SQL injection | Inject malicious queries | Input sanitized |
| API rate limit bypass | Exceed quotas | Requests throttled |
| Key extraction | Attempt to retrieve encryption keys | Keys protected |

**Remediation SLAs:**

| Severity | Definition | SLA |
|----------|------------|-----|
| Critical | Tenant data exposure, auth bypass | 24 hours |
| High | Privilege escalation, injection | 7 days |
| Medium | Information disclosure, DoS | 30 days |
| Low | Best practice deviation | 90 days |

### 4. Generate Security Design Artifact

**Output Location:** `{output_folder}/planning-artifacts/security-design.md`

**Document Sections:**

```markdown
# Security Architecture Design

## 1. Executive Summary
- Security posture overview
- Compliance alignment
- Risk summary

## 2. Authentication Architecture
- JWT configuration
- MFA policies
- Session management
- SSO integration

## 3. Authorization Architecture
- RBAC model
- Permission inheritance
- Cross-tenant admin
- API key management

## 4. Data Protection Architecture
- Encryption at rest/transit
- Key management
- Secret rotation
- Data classification

## 5. Threat Model & Mitigations
- Threat inventory
- Control mapping
- Residual risk

## 6. Security Testing Requirements
- Penetration test scope
- Test scenarios
- Remediation SLAs

## 7. Appendices
- Security control inventory
- Compliance mapping
- Decision log
```

**Verify current best practices with web search:**
Search the web: "SaaS security architecture checklist {date}"
Search the web: "multi-tenant penetration testing scope {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

After completing security design compilation, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific threat scenarios or compliance mappings
- **P (Party Mode)**: Bring security auditor, CISO, and engineering lead perspectives for final review
- **C (Continue)**: Accept compiled security design and generate artifact
- **[Specific concerns]**: Describe concerns to investigate further

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: Complete security design compilation including authentication, authorization, data protection, threat mitigations, and testing requirements
- Focus areas:
  - Are there specific compliance certifications required (SOC 2 Type II, ISO 27001)?
  - Do you need to include specific regulatory appendices (GDPR, HIPAA)?
  - What third-party penetration testing firms are approved?
  - Industry-specific security considerations
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into final security design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Final review of complete security architecture for multi-tenant SaaS including authentication, authorization, data protection, threat model, and penetration testing requirements"
- Process relevant personas:
  - **Security Auditor:** Validate control completeness
  - **CISO:** Approve security architecture
  - **Engineering Lead:** Confirm implementation feasibility
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Generate security design document to `{output_folder}/planning-artifacts/security-design.md`
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Workflow complete for Create mode

---

## Verification

- [ ] Security architecture overview compiled from all steps
- [ ] Threat mitigations mapped to security controls (CRITICAL)
- [ ] Penetration test requirements defined with SLAs
- [ ] Document generated to `{output_folder}/planning-artifacts/security-design.md`
- [ ] All CRITICAL controls documented (AuthN, AuthZ, Encryption)
- [ ] Web research completed with source citations

---

## Outputs

- **Primary:** `{output_folder}/planning-artifacts/security-design.md`
- Security architecture diagram
- Threat mitigation matrix
- Penetration test requirements

---

## Quality Gate

**QG-S3 Security Baseline Gate** applies to this output.

| Check Category | Requirement | This Design |
|----------------|-------------|-------------|
| Authentication | JWT with tenant claims, MFA | Covered in Section 2 |
| Authorization | RBAC with tenant scoping | Covered in Section 3 |
| Data Protection | AES-256, per-tenant keys | Covered in Section 4 |
| Threat Mitigations | Mapped to controls | Covered in Section 5 |
| Testing | Pen test scope defined | Covered in Section 6 |

---

## Next Step

**Create mode complete.** 

- Run **Validate mode** (`step-20-v-load.md`) to verify against QG-S3 checklist
- Proceed to implementation with security design as foundation
