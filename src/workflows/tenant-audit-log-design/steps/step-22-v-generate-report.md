# Step 22: Generate Validation Report

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

Generate a comprehensive validation report documenting the audit log design validation results, findings, and recommendations.

---

## Prerequisites

- Step 21 completed: Validation checks executed with scores
- **Load template:** `{project-root}/_bmad/bam/templates/validation-report-template.md`

---

## Inputs

- Validation results from Step 21
- Quality gate checklist results
- Compliance coverage analysis

---

## Actions

### 1. Generate Executive Summary

| Metric | Value |
|--------|-------|
| Validation Date | {date} |
| Artifact Version | {version} |
| Overall Score | {score}/100 |
| Pass/Fail Status | **{status}** |
| Critical Issues | {count} |
| Recommendations | {count} |

### 2. Document Detailed Findings

**Critical Findings (Must Fix):**

| ID | Category | Finding | Impact | Remediation |
|----|----------|---------|--------|-------------|
| {id} | {category} | {description} | {impact} | {action} |

**High Priority Findings:**

| ID | Category | Finding | Impact | Remediation |
|----|----------|---------|--------|-------------|
| {id} | {category} | {description} | {impact} | {action} |

**Medium/Low Priority Findings:**

| ID | Category | Finding | Impact | Remediation |
|----|----------|---------|--------|-------------|
| {id} | {category} | {description} | {impact} | {action} |

### 3. Compliance Certification Status

| Framework | Coverage | Status | Notes |
|-----------|----------|--------|-------|
| SOC 2 | {%}% | Ready/Not Ready | {notes} |
| GDPR | {%}% | Ready/Not Ready | {notes} |
| HIPAA | {%}% | Ready/Not Ready | {notes} |
| PCI DSS | {%}% | Ready/Not Ready | {notes} |

### 4. QG-I2 Gate Status

| Status | Description |
|--------|-------------|
| **{PASS/CONDITIONAL/FAIL}** | {Summary of QG-I2 audit items} |

**If CONDITIONAL:**
- Conditions that must be met: {list}
- Deadline for remediation: {date}

**If FAIL:**
- Critical items requiring remediation: {list}
- Recovery protocol: Enter edit mode and address critical findings

### 5. Recommendations

**Immediate Actions:**

| Priority | Recommendation | Owner | Target Date |
|----------|---------------|-------|-------------|
| Critical | {recommendation} | {owner} | {date} |

**Future Improvements:**

| Priority | Recommendation | Benefit |
|----------|---------------|---------|
| Medium | {recommendation} | {benefit} |
| Low | {recommendation} | {benefit} |

---

## COLLABORATION MENUS (A/P/C):

After generating the report above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific recommendations
- **P (Party Mode)**: Bring stakeholder perspectives on findings
- **C (Continue)**: Finalize and save validation report
- **[Specific adjustments]**: Modify report content

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: validation findings, recommendations, gate status
- Process enhanced insights on prioritization
- Ask user: "Accept this report refinement? (y/n)"
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review audit log design validation report"
- Process stakeholder perspectives on findings
- Present synthesized feedback
- Ask user: "Accept this feedback? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation report
- Present completion summary with gate status

---

## Verification

- [ ] Executive summary complete
- [ ] All findings documented
- [ ] Compliance status determined
- [ ] QG-I2 gate status clear
- [ ] Recommendations prioritized
- [ ] Patterns align with pattern registry

---

## Outputs

- Validation report
- QG-I2 gate status
- Remediation roadmap (if applicable)
- **Output to:** `{output_folder}/planning-artifacts/compliance/audit-log-validation-report.md`

---

## Workflow Complete

Validation mode complete. Report saved to:
- `{output_folder}/planning-artifacts/compliance/audit-log-validation-report.md`

**Gate Status: {PASS/CONDITIONAL/FAIL}**

---

## Next Step

Validate workflow complete. Proceed based on gate decision (PASS/CONDITIONAL/FAIL).

**Next Steps Based on Status:**
- **PASS**: Proceed to `bmad-bam-soc2-evidence-collection` for evidence automation
- **CONDITIONAL**: Address conditions within deadline, then re-validate
- **FAIL**: Enter edit mode to address critical findings, then re-validate
