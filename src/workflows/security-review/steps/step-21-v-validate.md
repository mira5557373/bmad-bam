# Step 21: Validate Security Assessment

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

Validate the security assessment against quality criteria, ensuring complete scope coverage, accurate threat modeling, thorough tenant isolation review, and actionable findings.

---

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance



---

## Inputs

- Loaded artifact from validation step 20
- Quality gate criteria and checklist
- Pattern registry for validation rules
- Previous validation findings (if re-validating)

---

## Actions

### 1. Load Artifact

- Read the artifact from `{output_folder}/` specified location
- Parse and validate structure

### 2. Validate Content

- Check all required sections are present
- Verify cross-references are valid
- Validate against quality gate checklist

### 3. Generate Findings

- Document any issues found
- Categorize by severity (Critical/High/Medium/Low)

---

---

## Validation Checklist

### Scope Assessment
- [ ] All major components identified and in scope
- [ ] Trust boundaries documented with controls
- [ ] Threat actors identified with capability assessment
- [ ] Assessment criteria defined with severity levels
- [ ] Compliance requirements documented

### Threat Model
- [ ] STRIDE applied to all trust boundaries
- [ ] **CRITICAL:** Attack trees documented for critical threats
- [ ] Risk assessment with likelihood and impact
- [ ] Existing controls mapped to threats
- [ ] Gaps in controls identified

### Tenant Isolation Review
- [ ] **CRITICAL:** Tenant model security evaluated (RLS/Schema/DB)
- [ ] **CRITICAL:** Data access patterns audited
- [ ] Shared resources analyzed for isolation risks
- [ ] API isolation verified
- [ ] Background job isolation verified

### AI Safety Review
- [ ] **CRITICAL:** Prompt injection defenses evaluated
- [ ] **CRITICAL:** Tool permission model reviewed
- [ ] Approval workflow security verified
- [ ] **CRITICAL:** Kill switch mechanisms evaluated
- [ ] AI memory isolation verified
- [ ] AI output safety reviewed

### Findings Report
- [ ] All findings have required fields (ID, title, severity, description, remediation)
- [ ] Severity accurately assigned based on risk
- [ ] **CRITICAL:** Remediation recommendations are actionable
- [ ] Finding status accurately reflects current state
- [ ] No duplicate findings

### Remediation Roadmap
- [ ] **CRITICAL:** P0 (Critical) findings have immediate timeline
- [ ] Owners assigned to all findings
- [ ] Timeline realistic for effort required
- [ ] Compensating controls documented for deferred fixes
- [ ] Executive summary accurate

### Cross-Cutting
- [ ] Assessment date current
- [ ] Architecture changes since last review captured
- [ ] New threat landscape considered
- [ ] Compliance requirements still met
- [ ] **CRITICAL:** QG-S3 (Security Baseline Gate) criteria verified

---

## Gate Decision Criteria

| Decision | Criteria |
|----------|----------|
| **PASS** | All sections complete, critical checks pass, remediation roadmap actionable |
| **CONDITIONAL** | Minor gaps (e.g., low-priority findings missing details) with mitigation plan |
| **FAIL** | Missing threat model, incomplete isolation review, or no remediation roadmap |

---

## COLLABORATION MENUS (A/P/C):

After completing the validation checklist, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific validation findings
- **P (Party Mode)**: Bring QA and security perspectives on validation results
- **C (Continue)**: Accept validation results and generate report
- **[Specific findings]**: Describe findings to investigate further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: validation findings, failed checks, gap analysis
- Process enhanced insights on quality gaps
- Ask user: "Accept this detailed analysis of findings? (y/n)"
- If yes, document enhanced findings
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review security assessment validation findings"
- Process QA and security perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document validation results with specific findings per component
- Determine preliminary gate decision
- Proceed to next step: `step-22-v-generate-report.md`

---

## Verification

- [ ] All checklist items evaluated
- [ ] Gate decision determined
- [ ] Findings documented per component

---

## Outputs

- Validation report
- Pass/Fail determination
- Specific findings per component

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate validation report.
