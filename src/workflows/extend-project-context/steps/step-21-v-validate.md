# Step 21: Validate BAM Section

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

Validate the BAM configuration section for completeness and correctness.

---

## Prerequisites

- Step 20 completed: Artifact loaded
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-isolation,agent-runtime



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

### Section Structure
- [ ] BAM section header present
- [ ] Tenant model subsection complete
- [ ] AI runtime subsection complete
- [ ] Tier structure subsection complete
- [ ] Pattern references included

### Configuration Validity
- [ ] Tenant model is valid option
- [ ] AI runtime is valid option
- [ ] Tier structure is consistent
- [ ] No conflicting configurations

### Pattern References
- [ ] Pattern IDs exist in registry
- [ ] Pattern categories are appropriate
- [ ] Web query templates are valid

---

## Gate Decision Criteria

| Decision | Criteria |
|----------|----------|
| **PASS** | All sections complete, valid configurations, pattern references valid |
| **CONDITIONAL** | Minor gaps but core configuration valid |
| **FAIL** | Missing required sections or invalid configurations |

---

## COLLABORATION MENUS (A/P/C):

After completing validation, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation findings
- **P (Party Mode)**: Bring QA and architect perspectives on findings
- **C (Continue)**: Accept validation and generate report
- **[Specific findings]**: Describe findings to investigate

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: validation findings, gap analysis
- Process enhanced insights on quality gaps
- Ask user: "Accept this analysis? (y/n)"
- If yes, document enhanced findings
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review BAM section validation findings"
- Process QA and architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document validation results
- Determine gate decision
- Proceed to next step: `step-22-v-generate-report.md`

---

## Verification

- [ ] All checklist items evaluated
- [ ] Gate decision determined
- [ ] Findings documented

---

## Outputs

- Validation results
- Pass/Fail determination
- Specific findings

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate validation report.
