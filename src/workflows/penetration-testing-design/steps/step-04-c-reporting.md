# Step 4: Reporting Procedures

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Design comprehensive reporting procedures for penetration testing findings, including severity classification, remediation guidance, and tracking processes.

---

## Prerequisites

- Step 3 completed: Tenant isolation and AI agent test cases defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: security
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-i3-agent-safety.md`

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- User feedback and refinements from previous steps

---

## Actions

### 1. Define Severity Classification

Establish vulnerability severity framework:

| Severity | CVSS Range | Definition | SLA |
|----------|------------|------------|-----|
| Critical | 9.0-10.0 | Immediate exploitation possible, full compromise | 24 hours |
| High | 7.0-8.9 | Significant impact, exploitation likely | 7 days |
| Medium | 4.0-6.9 | Moderate impact, exploitation requires effort | 30 days |
| Low | 0.1-3.9 | Minor impact, exploitation difficult | 90 days |
| Informational | N/A | Best practice recommendation | Next release |

**Severity Modifiers for Multi-Tenant:**

| Modifier | Impact | Adjustment |
|----------|--------|------------|
| Cross-tenant access | Any cross-tenant vulnerability | +2 severity levels |
| AI agent bypass | Agent permission violation | +1 severity level |
| Data exfiltration | Sensitive data exposure | +1 severity level |
| Authentication bypass | Auth mechanism failure | +1 severity level |
| Compliance violation | Regulatory requirement breach | +1 severity level |

### 2. Define Finding Report Format

Standard format for each finding:

| Section | Content | Required |
|---------|---------|----------|
| Finding ID | Unique identifier (e.g., PENTEST-2026-001) | Yes |
| Title | Concise vulnerability name | Yes |
| Severity | Critical/High/Medium/Low/Info | Yes |
| CVSS Score | Numeric score with vector | Yes |
| Affected Component | System/module affected | Yes |
| Description | Detailed vulnerability description | Yes |
| Impact | Business and technical impact | Yes |
| Proof of Concept | Steps to reproduce | Yes |
| Evidence | Screenshots, logs, requests | Yes |
| Remediation | Specific fix recommendations | Yes |
| References | CVEs, CWEs, OWASP | Yes |
| Tenant Impact | Cross-tenant implications | Yes |
| AI Impact | AI agent implications | If applicable |

### 3. Define Report Structure

Overall penetration test report structure:

| Section | Content | Audience |
|---------|---------|----------|
| Executive Summary | High-level findings, risk posture | Leadership |
| Methodology | Testing approach, tools used | Technical |
| Scope Confirmation | In-scope vs tested | All |
| Finding Summary | Table of all findings by severity | All |
| Detailed Findings | Full finding reports | Technical |
| Tenant Isolation Assessment | Specific isolation evaluation | Technical |
| AI Agent Security Assessment | Agent-specific evaluation | Technical |
| Compliance Mapping | Findings mapped to frameworks | Compliance |
| Remediation Roadmap | Prioritized fix timeline | Development |
| Appendices | Raw data, tool outputs | Technical |

### 4. Define Remediation Workflow

Establish remediation tracking process:

| Stage | Owner | Activities | Output |
|-------|-------|------------|--------|
| Triage | Security Team | Validate finding, confirm severity | Confirmed finding |
| Assignment | Security Lead | Assign to development team | JIRA ticket |
| Analysis | Dev Team | Root cause analysis | Technical approach |
| Fix Development | Dev Team | Implement remediation | Code changes |
| Review | Security Team | Validate fix | Approval |
| Deployment | DevOps | Deploy to staging | Staged fix |
| Verification | Pentest Team | Retest finding | Pass/fail |
| Closure | Security Lead | Close finding | Audit record |

**Escalation Procedures:**

| Condition | Escalation | Timeline |
|-----------|------------|----------|
| SLA breach approaching | Team Lead | 24h before SLA |
| SLA breached | Director | Immediately |
| Fix requires architecture change | Architecture Team | On discovery |
| Compliance impact | Compliance Officer | 24 hours |
| Customer notification required | Legal + PR | Per incident plan |

### 5. Define Metrics and KPIs

Track penetration testing program effectiveness:

| Metric | Description | Target |
|--------|-------------|--------|
| Mean Time to Detect (MTTD) | Time to find vulnerabilities | Continuous improvement |
| Mean Time to Remediate (MTTR) | Time from finding to fix | < SLA |
| Finding Density | Findings per KLOC/module | Decreasing trend |
| Retest Pass Rate | % fixes verified successful | > 95% |
| Critical Finding Count | Number of critical findings | 0 in production |
| Tenant Isolation Issues | Cross-tenant findings | 0 tolerance |
| AI Agent Findings | Agent security issues | Decreasing trend |
| Coverage | % systems tested | 100% critical |

### 6. Define Compliance Reporting

Map findings to compliance frameworks:

| Framework | Report Requirements | Frequency |
|-----------|---------------------|-----------|
| SOC 2 | Pentest attestation, remediation evidence | Annual |
| PCI DSS | Full report, quarterly scans | Annual + Quarterly |
| HIPAA | Security assessment documentation | Annual |
| ISO 27001 | Vulnerability assessment records | Per audit |
| GDPR | Data breach risk assessment | As needed |

**Evidence Retention:**

| Evidence Type | Retention Period | Storage |
|---------------|------------------|---------|
| Full pentest reports | 7 years | Secure archive |
| Finding evidence | 3 years | Encrypted storage |
| Remediation records | 7 years | JIRA/ticketing |
| Retest results | 3 years | Secure archive |

**Verify current best practices with web search:**
Search the web: "penetration test reporting best practices {date}"
Search the web: "vulnerability management program {date}"
Search the web: "security finding remediation tracking {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the reporting procedures above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific reporting requirements
- **P (Party Mode)**: Bring compliance and development perspectives
- **C (Continue)**: Finalize penetration testing design and generate artifacts
- **[Specific refinements]**: Describe reporting concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: severity framework, reporting structure, remediation workflow
- Process enhanced insights on reporting completeness
- Ask user: "Accept these refined reporting procedures? (y/n)"
- If yes, integrate into reporting design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review penetration testing reporting procedures"
- Process compliance officer and development team perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Generate final penetration testing design documents
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Save all outputs to `{output_folder}/planning-artifacts/security/`
- Present completion summary

---

## Final Gate Checkpoint

**Steps 1-4 complete the penetration testing design.**

Present final summary of:
- Testing scope with objectives and rules of engagement
- 6+ test categories with 70+ test cases
- Tenant-specific and AI agent isolation tests
- Reporting procedures with remediation workflow

Confirm QG-I3 checklist items for security testing are satisfied.

---

## Quality Gate: QG-S10 Penetration Testing Gate

This workflow produces artifacts for QG-S10. Verify the following patterns are addressed:

| QG-S10 Pattern | Addressed In | Status |
|----------------|--------------|--------|
| `scope_defined` | Step 1 - Scope Definition | Testing boundaries documented |
| `testing_completed` | Steps 2-3 - Test Categories | All test cases executed |
| `findings_remediated` | Step 4 - Remediation Workflow | Critical/high findings fixed |
| `retest_passed` | Step 4 - Verification Stage | Fixes verified |
| `report_delivered` | Step 4 - Report Structure | Final report delivered |

**Entry Gate:** QG-S4 (AI Security Gate) - must be passed before execution
**Exit Gate:** QG-P1 (Production Readiness) - requires QG-S10 to pass

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-S10`

---

## Verification

- [ ] Severity classification defined
- [ ] Finding report format specified
- [ ] Report structure documented
- [ ] Remediation workflow established
- [ ] Metrics and KPIs defined
- [ ] Compliance reporting mapped
- [ ] QG-I3 security testing items verified
- [ ] Patterns align with pattern registry

---

## Outputs

- Severity classification framework
- Finding report template
- Report structure specification
- Remediation workflow
- Metrics and KPIs
- Compliance reporting requirements
- **Output to:** `{output_folder}/planning-artifacts/security/penetration-testing-plan.md`
- **Output to:** `{output_folder}/planning-artifacts/security/test-cases.md`
- **Output to:** `{output_folder}/planning-artifacts/security/reporting-procedures.md`

---

## Next Step

Create workflow complete. Penetration testing design ready for validation using Validate mode (`step-20-v-*`).

---

## Workflow Complete

The penetration testing design workflow is complete. The following artifacts have been generated:
- `penetration-testing-plan.md` - Complete testing methodology
- `test-cases.md` - All test cases by category
- `reporting-procedures.md` - Reporting and remediation processes

**Related Next Steps:**
- Execute penetration testing per the designed plan
- Run `bmad-bam-security-review` to incorporate findings
- Update `bmad-bam-soc2-evidence-collection` with pentest evidence
