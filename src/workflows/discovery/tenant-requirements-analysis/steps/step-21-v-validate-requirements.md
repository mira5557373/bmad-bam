# Step 21: Validate Requirements

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

Validate the tenant requirements analysis against BAM patterns and best practices.

## Prerequisites

- Step 20 complete (artifact loaded)
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-m2-tenant-isolation.md`


---

## Inputs

- Loaded artifact from validation step 20
- Quality gate criteria and checklist
- Pattern registry for validation rules
- Previous validation findings (if re-validating)

---

## Actions

### 1. Validate Completeness

Check that analysis includes:
- [ ] Tenant segments defined
- [ ] Personas with tenant attributes
- [ ] Compliance requirements mapped
- [ ] Scaling assumptions documented

### 2. Validate Consistency

Check for internal consistency:
- [ ] Segment isolation matches compliance needs
- [ ] Scaling assumptions align with segments
- [ ] Personas cover all tenant types

### 3. Validate BAM Alignment

Check alignment with BAM patterns:
- [ ] Selected `{tenant_model}` supported by requirements
- [ ] Compliance requirements achievable with chosen isolation
- [ ] Scaling assumptions realistic for architecture

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

After completing validation, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation findings
- **P (Party Mode)**: Bring QA and architect perspectives for validation review
- **C (Continue)**: Accept validation results and proceed to report generation
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass validation context: findings, consistency checks, alignment
- Process enhanced insights from deep questioning
- Ask user: "Accept these findings? (y/n)"
- If yes, finalize validation results
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review validation results for tenant requirements: {summary of findings}"
- Process collaborative analysis from QA and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation results
- Proceed to next step: `step-22-v-generate-report.md`

---

## Verification

- [ ] All completeness checks pass
- [ ] All consistency checks pass
- [ ] All alignment checks pass
- [ ] Patterns align with pattern registry

## Outputs

- Validation findings list

## Next Step

Proceed to `step-22-v-generate-report.md` with validation findings.
