# Step 05: Compile Compliance Design (Create Mode)

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
- 🔍 Use web search to verify compliance design completeness

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

Compile the complete compliance design document, integrating all previous steps into a cohesive compliance architecture for the multi-tenant SaaS platform.

---

## Prerequisites

- Step 04 completed: Compliance monitoring designed
- All previous step outputs available
- **Load template:** `{project-root}/_bmad/bam/data/templates/compliance-mapping.md`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `compliance`

**Web Research (Required):**

Search the web: "compliance architecture documentation best practices {date}"
Search the web: "multi-tenant compliance design patterns {date}"

Document findings with citations: _Source: [URL]_

---

## Actions

### 1. Compile Document Frontmatter

Generate the compliance design document header:

```yaml
---
title: Compliance Design Document
project: {{project_name}}
version: 1.0.0
status: DRAFT
created: {{date}}
author: Platform Architect (Atlas persona)
tenant_model: {tenant_model}
frameworks:
  - SOC2
  - GDPR
  - [additional from Step 01]
quality_gate: QG-P1 (Production Readiness)
stepsCompleted: [1, 2, 3, 4, 5]
---
```

### 2. Assemble Document Sections

Compile outputs from all previous steps:

| Section | Source Step | Content |
|---------|-------------|---------|
| 1. Executive Summary | All | High-level compliance strategy |
| 2. Compliance Framework Analysis | Step 01 | Applicable frameworks, tenant model fit |
| 3. Data Governance | Step 02 | Classification, PII handling, retention, erasure |
| 4. Audit Controls | Step 03 | Logging, access tracking, evidence collection |
| 5. Compliance Monitoring | Step 04 | Continuous checks, alerts, remediation, reporting |
| 6. Implementation Roadmap | Step 05 | Phased rollout plan |
| 7. Risk Assessment | Step 05 | Compliance risk matrix |
| 8. Appendices | All | Supporting documentation |

### 3. Generate Implementation Roadmap

Create phased compliance implementation plan:

| Phase | Timeline | Focus Areas | Deliverables |
|-------|----------|-------------|--------------|
| **Phase 1: Foundation** | Months 1-2 | Data classification, audit logging, encryption | Baseline controls |
| **Phase 2: SOC2 Prep** | Months 2-4 | Trust criteria implementation, evidence collection | SOC2 Type I readiness |
| **Phase 3: Privacy** | Months 3-5 | GDPR/CCPA controls, consent management, DSR workflow | Privacy compliance |
| **Phase 4: Industry** | Months 4-6 | HIPAA/PCI-DSS (if applicable) | Industry certification readiness |
| **Phase 5: Continuous** | Ongoing | Monitoring, automation, continuous improvement | SOC2 Type II |

### 4. Create Compliance Risk Matrix

Document residual risks and mitigations:

| Risk | Likelihood | Impact | Current Controls | Residual Risk | Mitigation Plan |
|------|------------|--------|------------------|---------------|-----------------|
| Cross-tenant data exposure | Low | Critical | RLS, tenant context, audit | Low | Quarterly penetration tests |
| Audit log tampering | Very Low | High | Immutable storage, checksums | Very Low | Chain verification |
| Non-compliant data retention | Medium | Medium | Automated policies | Low | Retention monitoring |
| Failed erasure request | Low | High | Workflow automation | Low | Verification procedures |
| Third-party breach | Medium | High | Vendor assessment, DPAs | Medium | Continuous monitoring |

### 5. Document Control Mapping

Map controls to framework requirements:

| Control | SOC2 | GDPR | HIPAA | PCI-DSS | ISO27001 |
|---------|------|------|-------|---------|----------|
| Data classification | CC6.1 | Art. 5 | 164.312 | Req 3 | A.8 |
| Encryption at rest | CC6.1 | Art. 32 | 164.312(a) | Req 3.4 | A.10 |
| Access logging | CC7.2 | Art. 30 | 164.312(b) | Req 10 | A.12 |
| Change management | CC8.1 | - | 164.308(a) | Req 6 | A.14 |
| Incident response | CC7.3 | Art. 33 | 164.308(a) | Req 12 | A.16 |
| Vendor management | CC9.2 | Art. 28 | 164.308(b) | Req 12 | A.15 |

### 6. Generate Output Document

Write the complete compliance design to the output location:

**Output Path:** `{output_folder}/planning-artifacts/compliance-design.md`

**Document Structure:**

```markdown
# Compliance Design Document

## Executive Summary
[Summarize compliance strategy, key frameworks, tenant model alignment]

## 1. Compliance Framework Analysis
[From Step 01: Frameworks, requirements, tenant model fit]

## 2. Data Governance
[From Step 02: Classification, PII, retention, erasure, transfers]

## 3. Audit Controls
[From Step 03: Logging, tracking, evidence collection]

## 4. Compliance Monitoring
[From Step 04: Checks, alerts, remediation, reporting]

## 5. Implementation Roadmap
[From Step 05: Phased rollout plan]

## 6. Risk Assessment
[From Step 05: Risk matrix with mitigations]

## 7. Control Mapping
[From Step 05: Framework to control mapping]

## Appendices
- A. Data Classification Matrix
- B. Audit Event Catalog
- C. Compliance Check Specifications
- D. Report Templates
- E. Web Research Citations
```

---

## COLLABORATION MENUS (A/P/C):

After compiling the design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific sections before finalizing
- **P (Party Mode)**: Final review with compliance, legal, and security perspectives
- **C (Continue)**: Finalize and save compliance design document
- **[Specific section]**: Review or enhance specific section

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: complete design document, implementation roadmap
- Process enhanced insights on completeness
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Final review of compliance design before publication"
- Present synthesized recommendations from DPO, CISO, legal counsel, external auditor
- Return to A/P/C menu

#### If 'C' (Continue):
- Save complete compliance design document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Mark Create mode complete

---

## Verification

- [ ] All previous step outputs integrated
- [ ] Document frontmatter complete
- [ ] Executive summary captures key decisions
- [ ] Implementation roadmap is realistic
- [ ] Risk assessment identifies residual risks
- [ ] Control mapping covers all frameworks
- [ ] Output saved to correct location
- [ ] Web research citations documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Complete compliance design document at `{output_folder}/planning-artifacts/compliance-design.md`
- Implementation roadmap with milestones
- Compliance risk matrix
- Control-to-framework mapping

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

Create workflow complete. Run Validate mode (`step-20-v-*`) to verify compliance design meets quality criteria before implementation.

---

## Create Mode Complete

Compliance design document is complete. The design covers:
- Applicable compliance frameworks and requirements
- Data governance with classification, encryption, retention, and erasure
- Comprehensive audit controls with tenant context
- Continuous compliance monitoring with automated alerting
- Phased implementation roadmap

Proceed to validation to ensure quality gate requirements are met.
