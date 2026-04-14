# Step 21: Validate Security Operations

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

---

## Purpose

Validate the security operations verification artifacts against quality criteria and security operations standards for multi-tenant AI platforms.

---

## Prerequisites

- Previous step completed (step-20-v-load-artifact.md)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `security`
- **Load quality gate:** `{project-root}/_bmad/bam/data/quality-gates.csv` → filter: `QG-S4`
- **Load checklist:** `{project-root}/_bmad/bam/checklists/security-checklist.md`

---

## Inputs

- Loaded artifacts from validation step 20
- Quality gate criteria and checklist
- Pattern registry for validation rules
- Previous validation findings (if re-validating)

---

## Actions

### 1. Load Artifact

- Read the artifacts from `{output_folder}/security/` specified location
- Parse and validate structure

### 2. Validate Content

- Check all required sections are present
- Verify cross-references are valid
- Validate against quality gate checklist

### 3. Generate Findings

- Document any issues found
- Categorize by severity (Critical/High/Medium/Low)

---

## Validation Checklist

### Security Monitoring Coverage
- [ ] All critical security events collected (authentication, authorization, network, application, AI operations, data access)
- [ ] SIEM integration verified (cloud provider logs, application logs, network flow logs, WAF logs, container logs)
- [ ] Security dashboards operational with appropriate refresh rates
- [ ] Alert configuration complete with defined thresholds and priorities
- [ ] 100% coverage of critical event categories

### Incident Response Readiness
- [ ] Incident response plan documented and current
- [ ] Roles and responsibilities defined
- [ ] Escalation procedures documented
- [ ] Communication templates available
- [ ] Containment procedures defined
- [ ] Evidence preservation procedures documented
- [ ] Recovery procedures defined
- [ ] Tabletop exercise completed within last 12 months
- [ ] Response times validated against SLA targets

### Threat Detection Capabilities
- [ ] Traditional threat detection verified (SQL injection, XSS, CSRF, brute force, DDoS, path traversal)
- [ ] AI-specific threat detection verified (prompt injection, model extraction, data poisoning, adversarial inputs, jailbreaking, cross-tenant attacks)
- [ ] Behavioral detection established with baselines
- [ ] Threat intelligence integrated
- [ ] Detection validation tests completed (red team, penetration testing, purple team, AI adversarial)

### Security Control Effectiveness
- [ ] Preventive controls assessed (authentication, authorization, encryption, input validation, network segmentation, WAF, AI guardrails)
- [ ] Detective controls assessed (security monitoring, audit logging, anomaly detection, vulnerability scanning, file integrity monitoring, AI output monitoring)
- [ ] Corrective controls assessed (auto-blocking, session termination, account lockout, kill switch, rollback capability, isolation procedures)
- [ ] Control testing completed with >90% effectiveness
- [ ] Gap analysis documented

### AI-Specific Security Operations
- [ ] AI guardrail monitoring in place
- [ ] LLM audit logging enabled
- [ ] Prompt injection detection active
- [ ] Model output monitoring enabled
- [ ] Cross-tenant AI isolation verified

### QG-S4 Security Gate Verification
**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` → filter: `QG-S4`

- [ ] **monitoring_complete** (REQUIRED): Security monitoring covers 100% of critical events
- [ ] **incident_response_tested** (REQUIRED): IR plan tested via tabletop exercise
- [ ] **threat_detection_verified** (REQUIRED): All threat vectors have detection coverage
- [ ] **controls_effective** (REQUIRED): Security controls >90% effective

**QG-S4 Required Patterns:**
| Pattern | Required | Status | Evidence |
|---------|----------|--------|----------|
| monitoring_complete | **YES** | [ ] Pass / [ ] Fail | Security monitoring audit |
| incident_response_tested | **YES** | [ ] Pass / [ ] Fail | Tabletop exercise results |
| threat_detection_verified | **YES** | [ ] Pass / [ ] Fail | Threat detection assessment |
| controls_effective | **YES** | [ ] Pass / [ ] Fail | Control effectiveness scores |

**QG-S4 Security Gate:** [ ] SATISFIED / [ ] NOT SATISFIED

---

## Gate Decision

- **PASS**: All security operations verified, monitoring complete, IR tested, threat detection validated, controls effective
- **CONDITIONAL**: Minor gaps (e.g., some low-priority controls not fully tested) - document gaps, proceed with remediation plan
- **FAIL**: Missing critical security monitoring, untested IR procedures, gaps in threat detection, or controls below 90% effectiveness - return to Create mode

### QG-S4 Exit Criteria
This workflow validates QG-S4 (Security Gate). Upon PASS:
- Security operations are verified for production readiness
- Workflow exits to production readiness verification

Present validation results with specific findings for each section.

---

## Error Handling

### FAIL Outcome Recovery Steps

#### Step 1: Categorize the Failure
Identify which category caused the FAIL:

| Failure Category | Severity | Recovery Path |
|------------------|----------|---------------|
| Missing security monitoring | CRITICAL | Return to step-01-c-audit-monitoring.md |
| Untested incident response | CRITICAL | Return to step-02-c-test-incident-response.md |
| Threat detection gaps | CRITICAL | Return to step-03-c-verify-threat-detection.md |
| Control effectiveness below threshold | HIGH | Return to step-04-c-assess-controls.md |

#### Step 2: Critical Failure Remediation

**For Missing Security Monitoring:**
1. Identify the unmonitored event categories
2. Return to `steps/step-01-c-audit-monitoring.md`
3. Configure SIEM integration for missing sources
4. Verify alert rules are in place
5. Re-run validation

**For Untested Incident Response:**
1. Schedule tabletop exercise
2. Return to `steps/step-02-c-test-incident-response.md`
3. Execute IR drill with all stakeholders
4. Document lessons learned
5. Re-run validation

**For Threat Detection Gaps:**
1. Identify missing threat vectors
2. Return to `steps/step-03-c-verify-threat-detection.md`
3. Implement detection for missing vectors
4. Validate with controlled tests
5. Re-run validation

**For Control Effectiveness Below Threshold:**
1. Identify failing controls
2. Return to `steps/step-04-c-assess-controls.md`
3. Implement remediation for failing controls
4. Re-test control effectiveness
5. Re-run validation

#### Step 3: Re-Validation Protocol
After remediation:
1. Document what was fixed and why
2. Return to `steps/step-20-v-load-artifact.md` to reload artifacts
3. Re-run this validation step
4. If FAIL persists after 2 attempts, escalate to mandatory course correction

### Recovery Attempt Tracking

| Attempt | Max Allowed | Action on Exceed |
|---------|-------------|------------------|
| 1 | - | Fix and retry |
| 2 | - | Fix and retry with peer review |
| 3+ | EXCEEDED | Mandatory course correction - escalate to project leadership |

### Escalation Contacts
When escalation is required:
1. Security Architect - for security operations design issues
2. SecOps Lead - for operational readiness issues
3. Project Leadership - for mandatory course correction after 2 failed attempts

---

## COLLABORATION MENUS (A/P/C):

After completing validation checks, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation findings and edge cases
- **P (Party Mode)**: Bring security and operations perspectives for validation review
- **C (Continue)**: Accept validation results and proceed to generate report
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass validation context: findings, gate decision, gaps identified
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into validation results
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review security operations validation: {summary of findings and gate decision}"
- Process collaborative analysis from security and operations personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation results
- Update frontmatter `stepsCompleted: [20, 21]`
- Proceed to next step: `step-22-v-generate-report.md`

---

## Verification

- [ ] All validation checklist items evaluated
- [ ] Gate decision determined (PASS/CONDITIONAL/FAIL)
- [ ] Findings documented with specific details

---

## Outputs

- Validation report with findings
- Gate decision with rationale
- Remediation recommendations (if CONDITIONAL or FAIL)

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate the final validation report.
