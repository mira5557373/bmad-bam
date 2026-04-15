# Step 21: Validate Tenant Data Export Design

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- **ALWAYS pause after presenting findings** and await user direction
- **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array

---

## Purpose

This step validates the completeness and quality of the tenant data export design, ensuring GDPR Article 20 compliance, proper data categories, formats, pipeline, audit trail, and verification mechanisms.

---

## Prerequisites

- Step 20: Load Artifact completed successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `compliance`
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`



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

## Verification

### Data Categories
- [ ] User data category defined
- [ ] Content data category defined
- [ ] Configuration data category defined
- [ ] Activity data category defined
- [ ] Exclusions documented with justification
- [ ] GDPR Article 20 requirements met

### Export Formats
- [ ] JSON schema defined
- [ ] CSV format specified
- [ ] File packaging structure documented
- [ ] Manifest schema complete
- [ ] Encryption options defined

### Export Pipeline
- [ ] Request initiation methods defined
- [ ] Pipeline stages documented with SLAs
- [ ] Queue processing configured
- [ ] Data collection strategy specified
- [ ] Delivery options defined
- [ ] Error handling complete

### Audit Trail
- [ ] Export request logging defined
- [ ] Status tracking implemented
- [ ] Download logging configured
- [ ] Retention policies specified
- [ ] Compliance reports defined

### Verification Mechanisms
- [ ] Pre-export inventory defined
- [ ] Checksum validation implemented
- [ ] Missing data detection designed
- [ ] Verification report specified
- [ ] User self-verification tools defined

### Cross-Cutting
- [ ] Consistent with tenant model design
- [ ] Consistent with compliance design
- [ ] GDPR Article 20 fully compliant
- [ ] Security measures adequate
- [ ] Patterns align with pattern registry
- [ ] **CRITICAL:** QG-S7 (Data Protection Gate) criteria verified

---

## Gate Decision

- **PASS**: All categories defined, formats specified, pipeline complete, audit ready
- **CONDITIONAL**: Minor gaps (e.g., specific retention values TBD) - document gaps and proceed
- **FAIL**: Missing categories, incomplete pipeline, or no verification - return to Create mode

Present validation results with specific findings for each section.

---

## COLLABORATION MENUS (A/P/C):

After completing validation checks, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation findings and edge cases
- **P (Party Mode)**: Bring analyst and architect perspectives for validation review
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
- Context: "Review data export validation: {summary of findings and gate decision}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation results
- Update frontmatter `stepsCompleted: [20, 21]`
- Proceed to next step: `step-22-v-generate-report.md`

---

## Outputs

- Validated tenant data export design
- Validation gate decision (PASS/CONDITIONAL/FAIL)
- Configuration gaps documented (if CONDITIONAL)
- Required fixes list (if FAIL)

---

## Next Step

If PASS: Data export design complete, ready for implementation sprint planning.
If CONDITIONAL: Document gaps with remediation timeline and proceed to implementation with noted limitations.
If FAIL: Return to Create mode to address missing categories, pipeline gaps, or verification issues.
