# Step 21: Validate

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array

---

## Purpose

Validate the AI model security document against QG-S4 (AI Security) quality gate criteria.

## Prerequisites

- Artifact loaded (Step 20)
- **Load checklist:** `{project-root}/_bmad/bam/checklists/qg-s4-ai-security.md`
- **Load checklist:** `{project-root}/_bmad/bam/checklists/qg-m3-agent-runtime.md`

---

## Inputs

- Loaded artifact from Step 20
- Quality gate checklists
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### QG-S4 AI Security Validation

Validate against Model Security criteria from `qg-s4-ai-security.md`:

**Model Security Checks:**
- [ ] Model access control enforces tenant boundaries
- [ ] Model theft prevention controls active
- [ ] Model API authentication uses short-lived tokens
- [ ] Model endpoints not publicly accessible
- [ ] Model versioning with immutable audit trail
- [ ] Model weights stored in encrypted storage

**Provenance Checks:**
- [ ] Model provenance verified (signed artifacts)
- [ ] Third-party model dependencies audited
- [ ] Model update process includes security review
- [ ] Rollback capability for compromised models

**Access Control Checks:**
- [ ] Tenant-scoped model access enforced
- [ ] Role-based model permissions implemented
- [ ] Fine-tuned model access restricted
- [ ] Model download/export blocked for unauthorized users

**Audit Logging Checks:**
- [ ] Model access logging implemented
- [ ] Model update audit trail complete
- [ ] Anomaly detection alerts configured
- [ ] Retention policies meet compliance requirements

### QG-M3 Agent Runtime Validation

Validate model integration with agent runtime:
- [ ] Model registry integration complete
- [ ] Model selection respects tenant context
- [ ] Model version pinning available

### Findings Summary

| Category | Status | Critical Issues | Non-Critical Issues |
|----------|--------|-----------------|---------------------|
| Model Security | PASS/FAIL | N | N |
| Provenance | PASS/FAIL | N | N |
| Access Control | PASS/FAIL | N | N |
| Audit Logging | PASS/FAIL | N | N |

---

## COLLABORATION MENUS (A/P/C):

After completing the validation above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation findings and remediation options
- **P (Party Mode)**: Bring Security Architect, Compliance Auditor, and MLOps Engineer perspectives
- **C (Continue)**: Accept validation results and proceed to Step 22: Generate Report
- **Re-validate section**: Describe specific section to re-validate

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: validation findings, QG-S4 criteria, gap analysis
- Process enhanced insights
- Ask user: "Accept these remediation recommendations? (y/n)"
- If yes, document remediation plan
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review AI model security validation findings for QG-S4 compliance"
- Process Security Architect, Compliance Auditor, MLOps Engineer perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation results to session
- Update frontmatter `stepsCompleted: [20, 21]`
- Proceed to next step: `step-22-v-generate-report.md`

---

## Verification

- [ ] All QG-S4 model security checks validated
- [ ] QG-M3 integration checks validated
- [ ] Findings categorized by severity
- [ ] Patterns align with pattern registry

## Outputs

- Validation results per category
- List of findings with severity

## Next Step

Proceed to `step-22-v-generate-report.md` to generate the validation report.
