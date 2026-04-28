# Step 02: Design Data Governance (Create Mode)

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📖 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current data governance practices

---


## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Gathering required inputs for this step
- Making design decisions within step scope
- Documenting decisions with rationale

**OUT OF SCOPE:**
- Decisions from other steps
- Implementation details
- Validation (separate mode)
## Purpose

Design data governance controls including data classification, PII handling, encryption requirements, and data retention policies aligned with identified compliance frameworks.

---

## Prerequisites

- Step 01 completed: Compliance frameworks identified
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `data-masking`, `data-anonymization`, `data-residency`, `compliance`
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv` -> filter: selected frameworks

**Web Research (Required):**

Search the web: "data classification multi-tenant SaaS best practices {date}"
Search the web: "GDPR right to erasure implementation patterns {date}"
Search the web: "PII encryption at rest and in transit {date}"

Document findings with citations: _Source: [URL]_

---

## Actions

### 1. Data Classification by Sensitivity

Define data classification tiers with handling requirements:

| Classification | Description | Examples | Encryption | Access | Retention |
|----------------|-------------|----------|------------|--------|-----------|
| **PUBLIC** | Non-sensitive, public data | Marketing content, public docs | Optional | Open | Per business need |
| **INTERNAL** | Internal business data | Employee info, internal docs | At rest | Role-based | 7 years |
| **CONFIDENTIAL** | Sensitive business data | Customer data, contracts | At rest + transit | Need-to-know | Per contract |
| **RESTRICTED** | Highly sensitive PII/PHI | SSN, health records, payment | Field-level + envelope | MFA + approval | Regulatory |

### 2. PII Handling and Encryption

Design PII handling controls per data type:

| PII Type | Classification | Encryption Method | Masking | Access Control |
|----------|----------------|-------------------|---------|----------------|
| Email | CONFIDENTIAL | AES-256 at rest | `u***@domain` | Role-based |
| Name | CONFIDENTIAL | AES-256 at rest | `J*** D***` | Role-based |
| Phone | CONFIDENTIAL | AES-256 at rest | `***-***-1234` | Role-based |
| SSN/TIN | RESTRICTED | Field-level + HSM | `***-**-1234` | MFA + audit |
| Payment Card | RESTRICTED | PCI-DSS tokenization | `****1234` | PCI scope only |
| Health Records | RESTRICTED | Field-level + BAA | Full redaction | HIPAA controls |
| Biometric | RESTRICTED | Envelope encryption | No display | Explicit consent |

### 3. Data Retention Policies by Jurisdiction

Design retention policies aligned with regulatory requirements:

| Jurisdiction | Framework | Minimum Retention | Maximum Retention | Deletion Method |
|--------------|-----------|-------------------|-------------------|-----------------|
| EU (GDPR) | GDPR Art. 5(1)(e) | Purpose-based | Not longer than necessary | Secure deletion + verification |
| US Healthcare | HIPAA | 6 years from creation | Per state law (may extend) | Certified destruction |
| US Finance | SOX | 7 years | 7 years | Secure archive then destroy |
| Payment | PCI-DSS | Per business need | Minimize storage | Secure deletion |
| California | CCPA | Purpose-based | Not longer than necessary | Verifiable deletion |

### 4. Right to Erasure (GDPR Article 17) Implementation

Design erasure workflow for tenant data:

| Phase | Action | Verification | Timeline |
|-------|--------|--------------|----------|
| 1. Request Receipt | Log request, verify identity | Authentication confirmed | Day 0 |
| 2. Scope Assessment | Identify all data locations | Data inventory complete | Day 1-3 |
| 3. Legal Review | Check exemptions | Legal sign-off | Day 3-7 |
| 4. Execution | Delete/anonymize data | Cryptographic verification | Day 7-25 |
| 5. Confirmation | Notify requestor | Written confirmation | Day 30 |

**Data Locations to Address:**
- Primary database (tenant rows/schema)
- Backup systems (mark for exclusion)
- Analytics/reporting systems
- Log aggregation (anonymize)
- AI/ML training data (remove or anonymize)
- Third-party processors (notify via DPA)

### 5. Cross-Border Data Transfer Controls

Design data residency and transfer controls:

| Transfer Scenario | Legal Basis | Controls Required |
|-------------------|-------------|-------------------|
| EU -> US | SCCs + DPF (if applicable) | Encryption, access logs, DPIA |
| EU -> UK | Adequacy decision | Standard encryption |
| Any -> Non-adequate country | SCCs + supplementary measures | Encryption, contractual |
| Intra-tenant transfer | Consent or contract | Per tenant policy |

---

## COLLABORATION MENUS (A/P/C):

After designing data governance, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific data handling requirements
- **P (Party Mode)**: Bring data protection and legal perspectives
- **C (Continue)**: Proceed to audit controls design
- **[Specific topic]**: Focus on encryption, retention, or erasure

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: data classification, PII types, retention requirements
- Process enhanced insights on data governance gaps
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review data governance design for compliance"
- Present synthesized recommendations from DPO, legal counsel, security architect
- Return to A/P/C menu

#### If 'C' (Continue):
- Document data governance decisions
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-design.md`

---

## Verification

- [ ] Data classification tiers defined
- [ ] PII handling requirements documented
- [ ] Encryption methods specified per data type
- [ ] Retention policies aligned with jurisdictions
- [ ] Right to erasure workflow designed
- [ ] Cross-border transfer controls specified
- [ ] Web research citations documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Data classification matrix with handling requirements
- PII handling specifications by data type
- Data retention policy matrix by jurisdiction
- Right to erasure implementation workflow
- Cross-border transfer control specifications

---


---

## SUCCESS METRICS:

- [ ] All required inputs gathered from user
- [ ] Design decisions documented with rationale
- [ ] User confirmed choices via A/P/C menu
- [ ] Output artifact updated with step content
- [ ] Frontmatter stepsCompleted updated

## FAILURE MODES:

- **Missing input:** Cannot proceed without required context - return to prerequisites
- **Unclear requirements:** Use Advanced Elicitation (A) to clarify
- **Conflicting constraints:** Use Party Mode (P) for multi-perspective analysis
- **User rejects output:** Iterate on design, do not force acceptance

## Next Step

Proceed to `step-03-c-design.md` for audit controls design.
