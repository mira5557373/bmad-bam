# Step 21: Validate

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

Validate the OpenAPI Spec Management design against quality criteria and best practices.

---

## Prerequisites

- Step 20 completed (Load Artifact)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `api-design`

---

## Inputs

- Loaded artifact from Step 20
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### Validation Checklist

#### Structure Standards Validation
- [ ] OpenAPI version explicitly specified
- [ ] File organization strategy defined
- [ ] Naming conventions documented
- [ ] Tenant-aware patterns included
- [ ] Security schemes defined
- [ ] Common response schemas specified

#### Version Control Validation
- [ ] Semantic versioning strategy documented
- [ ] Breaking change classification defined
- [ ] Branch strategy established
- [ ] Review process documented
- [ ] Changelog format specified
- [ ] Deprecation policy created

#### Validation Rules Validation
- [ ] Structural validation configured
- [ ] Linting rules established
- [ ] Security validation included
- [ ] Tenant isolation checks present
- [ ] Breaking change detection set up
- [ ] Custom platform rules documented

#### Publishing Pipeline Validation
- [ ] Build pipeline defined
- [ ] Documentation generation configured
- [ ] SDK generation set up
- [ ] Multi-environment publishing planned
- [ ] Version hosting structured
- [ ] API portal integration designed

### Severity Classification

| Finding Type | Severity |
|-------------|----------|
| Missing required section | Critical |
| Incomplete configuration | High |
| Missing best practice | Medium |
| Documentation gap | Low |

---

## COLLABORATION MENUS (A/P/C):

After completing validation above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation findings using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for validation analysis
- **C (Continue)**: Accept validation findings and proceed to report generation
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass validation context: findings, severity levels
- Process enhanced insights from deep questioning
- Ask user: "Accept these validation findings? (y/n)"
- If yes, integrate into validation results
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review validation findings for OpenAPI Spec Management: {summary of findings}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Compile validation results
- Update frontmatter `stepsCompleted: [20, 21]`
- Proceed to next step: `step-22-v-generate-report.md`

---

## Verification

- [ ] All validation checks performed
- [ ] Findings categorized by severity
- [ ] Recommendations documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Validation findings list
- Severity-categorized issues
- Recommendations for improvements

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate validation report.
