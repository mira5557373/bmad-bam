# Step 1: Load Artifact

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

This step loads the Tenant-Aware Observability artifact for validation. The observability design documents tenant-specific metrics, logs, traces, and dashboards that enable monitoring while maintaining strict tenant isolation.

---

## Prerequisites

- Tenant-Aware Observability design artifact exists to validate
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: observability



---

## Inputs

- Artifact file path for validation
- Quality gate checklist: `{project-root}/_bmad/bam/checklists/`
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Artifact

- Read the artifact from `{output_folder}/` specified location
- Parse and validate structure
- Verify document integrity

### 2. Validate Content

- Check all required sections are present
- Verify cross-references are valid
- Validate against quality gate checklist

### 3. Generate Findings

- Document any issues found
- Categorize by severity (Critical/High/Medium/Low)

---

---

## Artifact Location

Load the existing tenant-aware observability documents:
- `{output_folder}/planning-artifacts/observability/tenant-observability-design.md`
- `{output_folder}/planning-artifacts/observability/dashboard-specifications.md`
- `{output_folder}/planning-artifacts/observability/alert-rules.md`

## Pre-Validation Checks

Before proceeding, verify the following conditions:
- All required files exist at specified paths
- Files contain valid markdown with proper section headers
- Tenant dimensions are defined in the design
- Cross-references to tenant model are present

## Error Handling Guidance

If the files do not exist, inform the user that there is no artifact to validate and suggest switching to Create mode.

If files exist but lack required sections (tenant dimensions, metric definitions, dashboard specs), document the gaps and prompt for guidance on partial validation.

---

## COLLABORATION MENUS (A/P/C):

After loading artifact, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into artifact structure or pre-validation findings
- **P (Party Mode)**: Bring SRE and security architect perspectives on observability design
- **C (Continue)**: Accept loaded artifact and proceed to validation
- **[Specific refinements]**: Describe specific areas to examine

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: artifact structure, tenant dimensions, metric definitions
- Process enhanced insights on artifact completeness
- Ask user: "Accept this detailed artifact analysis? (y/n)"
- If yes, integrate into validation context
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tenant-aware observability artifact for validation"
- Process SRE and security architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation context
- Update frontmatter `stepsCompleted: [20]`
- Proceed to next step: `step-21-v-validate.md`

---

## Verification

- [ ] Artifact loaded successfully
- [ ] Validation criteria defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Validation context prepared
- Document structure parsed

---

## Next Step

Proceed to `step-21-v-validate.md` to run validation checks against observability quality criteria.
