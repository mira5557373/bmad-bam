# Step 3: Map Controls to Frameworks

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics


---

## Purpose

Create a comprehensive control mapping matrix that maps platform controls to applicable compliance framework requirements.

## Prerequisites

- Compliance frameworks identified
- Audit logging architecture designed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance


---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Define Control Domains

Organize controls into logical domains:

| Domain | Description | Primary Frameworks |
|--------|-------------|-------------------|
| Access Control | Authentication, authorization, identity | SOC 2, HIPAA, GDPR |
| Data Protection | Encryption, masking, DLP | All |
| Audit & Accountability | Logging, monitoring, alerting | All |
| Incident Response | Detection, response, recovery | SOC 2, HIPAA |
| Change Management | Configuration control, deployment | SOC 2, SOX |
| Business Continuity | Backup, disaster recovery | SOC 2, HIPAA |
| Vendor Management | Third-party risk, contracts | SOC 2, GDPR |
| Privacy | Consent, data subject rights | GDPR, CCPA |

### 2. Create Control Inventory

Document each platform control:

| Control ID | Control Name | Description | Domain | Implementation |
|------------|--------------|-------------|--------|----------------|
| AC-001 | Multi-Factor Authentication | Require MFA for privileged access | Access Control | Auth service |
| AC-002 | Role-Based Access Control | Enforce RBAC with tenant isolation | Access Control | Authorization service |
| DP-001 | Encryption at Rest | AES-256 encryption for stored data | Data Protection | Database layer |
| DP-002 | Encryption in Transit | TLS 1.3 for all communications | Data Protection | Load balancer |
| AU-001 | Security Event Logging | Log all security-relevant events | Audit | Audit service |
| AU-002 | Audit Log Integrity | Immutable audit log storage | Audit | Storage service |
| IR-001 | Security Incident Detection | Automated threat detection | Incident Response | SIEM integration |
| IR-002 | Incident Response Procedures | Documented response playbooks | Incident Response | Runbooks |

### 3. Map Controls to Framework Requirements

Create the control-to-framework mapping matrix:

| Control ID | SOC 2 TSC | GDPR Article | HIPAA Requirement | PCI DSS | Evidence Type |
|------------|-----------|--------------|-------------------|---------|---------------|
| AC-001 | CC6.1 | Art. 32 | 164.312(d) | 8.3 | Config export |
| AC-002 | CC6.3 | Art. 32 | 164.312(a)(1) | 7.1 | Policy doc |
| DP-001 | CC6.7 | Art. 32 | 164.312(a)(2)(iv) | 3.4 | Encryption report |
| DP-002 | CC6.7 | Art. 32 | 164.312(e)(1) | 4.1 | TLS scan |
| AU-001 | CC7.2 | Art. 30 | 164.312(b) | 10.2 | Log samples |
| AU-002 | CC7.2 | Art. 30 | 164.312(b) | 10.5 | Integrity verification |
| IR-001 | CC7.3 | Art. 33 | 164.308(a)(6) | 12.10 | Alert configs |
| IR-002 | CC7.4 | Art. 33-34 | 164.308(a)(6) | 12.10 | Runbook docs |

### 4. Identify Control Gaps

Document gaps requiring remediation:

| Gap ID | Framework Requirement | Current State | Required State | Remediation |
|--------|----------------------|---------------|----------------|-------------|
| GAP-001 | {Requirement ID} | {Current implementation} | {Required implementation} | {Remediation action} |
| GAP-002 | {Requirement ID} | {Current implementation} | {Required implementation} | {Remediation action} |

### 5. Define Evidence Requirements

Specify evidence collection per control:

| Control ID | Evidence Type | Collection Method | Frequency | Retention |
|------------|---------------|-------------------|-----------|-----------|
| AC-001 | Configuration snapshot | Automated export | Weekly | 2 years |
| AC-002 | Access review results | Manual review | Quarterly | 2 years |
| AU-001 | Log integrity report | Automated hash | Daily | 7 years |
| IR-001 | Alert effectiveness metrics | Automated report | Monthly | 2 years |

### 6. Establish Control Ownership

Assign accountability for each control:

| Control Domain | Primary Owner | Backup Owner | Review Frequency |
|----------------|---------------|--------------|------------------|
| Access Control | Security Lead | Platform Lead | Quarterly |
| Data Protection | Security Lead | Data Lead | Quarterly |
| Audit | Compliance Lead | Security Lead | Monthly |
| Incident Response | Security Lead | SRE Lead | Monthly |

**Verify current best practices with web search:**
Search the web: "map controls to frameworks best practices {date}"
Search the web: "map controls to frameworks enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Conduct deeper analysis of the current step's domain
- Present additional options and trade-offs
- Return to checkpoint after elicitation

#### If 'P' (Party Mode):
- Enable collaborative exploration
- Generate creative alternatives
- Document insights before returning

#### If 'C' (Continue):
- Verify all outputs are complete
- Proceed to next step file

### Menu Options

### [A] Analyse - Control Mapping Analysis
- **A1**: Analyze SOC 2 Trust Services Criteria coverage completeness
- **A2**: Evaluate HIPAA Security Rule control mapping gaps
- **A3**: Assess GDPR Article 32 technical measures alignment
- **A4**: Review PCI DSS requirement coverage for payment processing

### [P] Propose - Control Recommendations
- **P1**: Propose consolidated control set for multi-framework compliance
- **P2**: Suggest evidence automation strategy for continuous compliance
- **P3**: Recommend control ownership RACI matrix
- **P4**: Propose gap remediation prioritization based on audit timeline

### [C] Continue - Workflow Navigation
- **C1**: Continue to Step 4 (Create Compliance Spec) - load `step-04-c-create-compliance-spec.md`
- **C2**: Return to Step 2 (Design Audit Logging)
- **C3**: Export control mapping matrix

---

## Verification

- [ ] All control domains defined
- [ ] Control inventory complete
- [ ] Controls mapped to all applicable frameworks
- [ ] Gaps identified and documented
- [ ] Evidence requirements specified
- [ ] Ownership assigned
- [ ] Patterns align with pattern registry

## Outputs

- Control inventory document
- Control-to-framework mapping matrix
- Gap analysis report
- Evidence collection requirements
- Control ownership matrix

## Next Step

Proceed to `step-04-c-create-compliance-spec.md` to create the compliance specification document.
