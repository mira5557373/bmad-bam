# Step 21: Validate API Documentation Pipeline

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

Validate the API documentation pipeline artifact for completeness and implementation readiness. This is a utility workflow validation without quality gate requirements.

---

## Prerequisites

- Previous step completed (step-20-v-load-artifact.md)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv -> filter: documentation`

---

## Inputs

- Loaded artifact from validation step 20
- Pattern registry for validation rules
- Previous validation findings (if re-validating)

---

## Actions

### 1. Load Artifact

- Read the artifact from `{output_folder}/` specified location
- Parse and validate structure

### 2. Validate Content

- Check all required sections are present
- Verify tool configurations are complete
- Validate workflow integrations

### 3. Generate Findings

- Document any issues found
- Categorize by severity (Critical/High/Medium/Low)

---

## Validation Checklist

### Doc Generation Strategy
- [ ] Documentation tool selected
- [ ] Documentation structure defined
- [ ] Code-to-docs flow designed
- [ ] Static site configuration complete
- [ ] Search integration configured

### OpenAPI Integration
- [ ] Spec source strategy defined (code-first/spec-first/hybrid)
- [ ] Validation tools configured
- [ ] Example enrichment approach documented
- [ ] Code generation tools selected
- [ ] Spec organization structure defined

### Versioning Approach
- [ ] Version labeling strategy defined
- [ ] Deprecation workflow documented
- [ ] Version selector configured
- [ ] Breaking change process established
- [ ] Changelog automation set up

### Developer Portal Sync
- [ ] Publishing workflow defined
- [ ] API explorer integration configured
- [ ] Try-it-out authentication set up
- [ ] Feedback collection mechanism designed
- [ ] Analytics tracking configured

### Cross-Cutting Validation
- [ ] All tools are compatible with each other
- [ ] CI/CD integration points defined
- [ ] Publishing workflow covers all versions
- [ ] Feedback loops to code documented

### Implementation Readiness
- [ ] All required tools identified
- [ ] Integration points documented
- [ ] CI/CD pipeline steps defined
- [ ] Hosting/deployment configured
- [ ] Authentication integration complete

---

## Validation Decision

**Note:** This is a utility workflow without quality gate requirements.

- **COMPLETE**: All sections documented, ready for implementation
- **PARTIAL**: Some sections need additional detail, can proceed with notes
- **INCOMPLETE**: Major sections missing, return to Create mode

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
- Pass validation context: findings, decision, gaps identified
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into validation results
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review documentation pipeline validation: {summary of findings and decision}"
- Process collaborative analysis from analyst and architect personas
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
- [ ] Decision determined (COMPLETE/PARTIAL/INCOMPLETE)
- [ ] Findings documented with specific details

---

## Outputs

- Validation report with findings
- Decision with rationale
- Recommendations (if PARTIAL or INCOMPLETE)

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate the validation report.
