# Step 21: Validate Against Quality Criteria

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

---

## Purpose

Validate the incident report against QG-IR1 quality gate criteria to ensure incident response completeness and quality.

---

## Prerequisites

- Artifact loaded (Step 20)
- **Load checklist:** `{project-root}/_bmad/bam/checklists/qg-incident-response.md`

---

## Inputs

- Loaded artifact from Step 20
- Quality gate criteria

---

## Actions

### 1. QG-IR1 Validation Checks

Execute validation against QG-IR1 criteria:

#### Classification Checks
- [ ] **CRITICAL:** Severity level assigned (P1-P4)
- [ ] Impact scope documented
- [ ] Tenant impact assessed
- [ ] AI workload impact evaluated (if applicable)

#### Response Checks
- [ ] **CRITICAL:** Response team assembled
- [ ] Communication channels established
- [ ] Stakeholders notified per severity SLA
- [ ] Incident tracking record created

#### Investigation Checks
- [ ] **CRITICAL:** Root cause identified or hypothesis documented
- [ ] Timeline of events documented
- [ ] Affected components mapped
- [ ] Logs and telemetry collected

#### Mitigation Checks
- [ ] **CRITICAL:** Mitigation strategy documented
- [ ] Mitigation executed and logged
- [ ] Workarounds documented (if applicable)
- [ ] Stakeholders updated on progress

#### Resolution Checks
- [ ] **CRITICAL:** Resolution verified
- [ ] Tenant impact confirmed resolved
- [ ] Service restoration confirmed
- [ ] Incident status closed

#### Postmortem Checks
- [ ] Postmortem scheduled within SLA
- [ ] Action items identified with owners
- [ ] Lessons learned documented
- [ ] Runbook updates identified

### 2. Calculate Validation Score

| Category | Critical | Passed | Failed | Score |
|----------|----------|--------|--------|-------|
| Classification | 1 | {n} | {n} | {%} |
| Response | 1 | {n} | {n} | {%} |
| Investigation | 1 | {n} | {n} | {%} |
| Mitigation | 1 | {n} | {n} | {%} |
| Resolution | 1 | {n} | {n} | {%} |
| Postmortem | 0 | {n} | {n} | {%} |
| **Total** | 5 | {n} | {n} | {%} |

### 3. Determine Gate Outcome

| Outcome | Criteria |
|---------|----------|
| **PASS** | All critical checks pass, overall score >= 80% |
| **CONDITIONAL** | All critical checks pass, overall score >= 60% |
| **FAIL** | Any critical check fails |

**Gate Outcome:** {PASS/CONDITIONAL/FAIL}

---

## COLLABORATION MENUS (A/P/C):

After completing validation, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation failures
- **P (Party Mode)**: Get SRE and QA perspectives on validation results
- **C (Continue)**: Accept validation and generate report
- **[Specific issues]**: Describe validation concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: validation results, failures, scores
- Process enhanced insights on remediation priorities
- Ask user: "Accept this validation analysis? (y/n)"
- If yes, document remediation plan
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review QG-IR1 validation results for incident report"
- Process SRE and QA perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation results
- Proceed to next step: `step-22-v-generate-report.md`

---

## Verification

- [ ] All validation checks executed
- [ ] Scores calculated
- [ ] Gate outcome determined

---

## Outputs

- Validation results
- Gate outcome

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate validation report.
