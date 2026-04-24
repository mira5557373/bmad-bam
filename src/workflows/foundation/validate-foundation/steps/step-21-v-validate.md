# Step 21: Validate Foundation Gate Report

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

Validate the foundation gate report structure and consistency against QG-F1 criteria, ensuring required sections are present, category results align with the gate decision, and sprint status reflects the documented outcome.

---

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-isolation
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: testing-isolation
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-f1-foundation.md`

---


## Inputs

- Loaded artifact from validation step 20
- Quality gate criteria and checklist
- Pattern registry for validation rules
- Previous validation findings (if re-validating)

---

## Actions

### Report Structure Validation

#### Required Sections
- [ ] Gate Decision clearly stated (PASS / CONDITIONAL / FAIL)
- [ ] Summary section with date, validator, duration
- [ ] Category Results section with all 7 categories
- [ ] Critical Items list with status
- [ ] Gaps Identified with severity and remediation
- [ ] Next Steps section

#### Conditional Pass Requirements
If gate decision is CONDITIONAL:
- [ ] Mitigation plan present
- [ ] Deadline specified
- [ ] Responsible owner assigned
- [ ] Non-critical gaps documented

#### Fail Requirements
If gate decision is FAIL:
- [ ] Root cause classification present (SCOPE / SKILL / TECH / DESIGN / QUALITY)
- [ ] Locked categories listed
- [ ] Recovery path recommendation provided
- [ ] Recovery attempt count tracked

### Consistency Validation

#### Category Coverage
- [ ] Master Architecture category assessed
- [ ] Tenant Model category assessed
- [ ] Shared Kernel category assessed
- [ ] Control Plane category assessed
- [ ] AI Runtime category assessed
- [ ] Tests category assessed
- [ ] Documentation category assessed

#### Gate Decision Consistency
- [ ] Gate decision matches category results
- [ ] If any critical category FAIL, overall should be FAIL
- [ ] If all critical pass but minor gaps, should be CONDITIONAL
- [ ] If all categories pass, should be PASS

#### Sprint Status Alignment
- [ ] `sprint-status.yaml` foundation section exists
- [ ] `gate_passed` matches report decision
- [ ] `gate_date` matches report date
- [ ] `gate_report` path is correct

---

## Gap Analysis

For report quality issues found:

1. Classify severity: CRITICAL / MAJOR / MINOR
2. Document the issue with specific section reference
3. Recommend correction action

---

## Meta-Validation Outcome

- **PASS**: Report complete, consistent, and properly formatted
- **CONDITIONAL**: Minor formatting issues, content complete
- **FAIL**: Missing required sections or inconsistent gate decision

Present validation results with specific findings.

**On PASS:** Foundation gate report is valid and can be used for project governance decisions.

**On FAIL:** Report requires corrections before it can be accepted as official gate record.

---

## COLLABORATION MENUS (A/P/C):

After completing the validation checks above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation findings using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for findings analysis
- **C (Continue)**: Accept validation results and proceed to generate report
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: validation findings, structure completeness, consistency issues
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into validation results
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review QG-F1 foundation gate report meta-validation findings: {summary of structure and consistency checks}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation findings
- Update frontmatter `stepsCompleted: [20, 21]`
- Proceed to next step: `step-22-v-generate-report.md`

---

## Verification

- [ ] All checklist items evaluated
- [ ] Gate decision determined
- [ ] Findings documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Validation report
- Pass/Fail determination
- Specific findings

---

## Next Step

Generate validation report and return results to user.
