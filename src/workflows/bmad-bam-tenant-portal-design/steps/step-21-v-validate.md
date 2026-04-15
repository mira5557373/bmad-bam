# Step 21: Validate Tenant Portal Design

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

This step validates the completeness and quality of the tenant portal design, ensuring proper self-service capabilities, admin features, tier options, and billing integration.

---

## Prerequisites

- Step 20: Load Artifact completed successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `customization`



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

### Self-Service Capabilities
- [ ] Profile management defined
- [ ] Workspace management defined
- [ ] API key management with limits
- [ ] Notification preferences complete
- [ ] Usage dashboard metrics specified

### Admin Features
- [ ] User management features complete
- [ ] Billing management features defined
- [ ] Security settings documented
- [ ] Audit logs access specified
- [ ] Integration management covered
- [ ] All features have tier availability

### Tier Options
- [ ] All tiers have explicit feature mapping
- [ ] Customization options defined per tier
- [ ] Security options mapped to tiers
- [ ] Support options documented
- [ ] Upgrade prompts designed

### Billing Integration
- [ ] Usage display with Orb integration
- [ ] Invoice management with Stripe
- [ ] Payment method management defined
- [ ] Plan change flows documented
- [ ] Billing alerts configured

### Information Architecture
- [ ] Navigation structure defined
- [ ] Dashboard layout specified
- [ ] Settings organization complete
- [ ] Mobile responsiveness addressed
- [ ] Key wireframes described

### Cross-Cutting
- [ ] Consistent with tenant model design
- [ ] Consistent with tier definitions
- [ ] GDPR/privacy considerations
- [ ] Accessibility requirements
- [ ] Patterns align with pattern registry

---

## Gate Decision

- **PASS**: All features defined, tiers mapped, billing integrated, IA complete
- **CONDITIONAL**: Minor gaps (e.g., specific wireframe details TBD) - document gaps and proceed
- **FAIL**: Missing features, undefined tiers, or incomplete billing - return to Create mode

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
- Context: "Review portal validation: {summary of findings and gate decision}"
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

- Validated tenant portal design
- Validation gate decision (PASS/CONDITIONAL/FAIL)
- Configuration gaps documented (if CONDITIONAL)
- Required fixes list (if FAIL)

---

## Next Step

If PASS: Portal design complete, ready for implementation sprint planning.
If CONDITIONAL: Document gaps with remediation timeline and proceed to implementation with noted limitations.
If FAIL: Return to Create mode to address missing features, tier mapping, or billing integration.
