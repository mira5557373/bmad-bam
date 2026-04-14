# Step 20: Load Artifact

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

This step loads the Tenant Model and Isolation artifacts for validation. These documents define the multi-tenancy architecture including tenant boundaries, isolation mechanisms, resource partitioning strategies, and the security controls that ensure tenant data and operations remain separated.

---

## Prerequisites

- Previous step completed (workflow selection)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-isolation`



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

## Artifact Locations

Load the existing tenant model and isolation documents:
- `{output_folder}/planning-artifacts/architecture/tenant-model.md`
- `{output_folder}/planning-artifacts/architecture/tenant-isolation-matrix.md`

---

## Pre-Validation Checks

Before proceeding, verify the following conditions for each file:
- Both files exist at their specified paths
- Files are readable and contain valid markdown
- Cross-references between the two documents are consistent
- Tenant identifiers and isolation levels align across documents

---

## Expected Artifact Structure

The tenant-model.md should contain:
- Tenant Definition and lifecycle states
- Tenant Hierarchy and organizational structure
- Resource Allocation policies per tenant tier
- Tenant Configuration parameters and defaults

The tenant-isolation-matrix.md should contain:
- Isolation Dimensions (data, compute, network, etc.)
- Isolation Levels with enforcement mechanisms
- Cross-Tenant Interaction policies
- Compliance Mapping to regulatory requirements

---

## Error Handling Guidance

If the files do not exist, inform the user that there is no artifact to validate and suggest switching to Create mode.

If one file exists but the other is missing, report which file is absent and advise that both documents are required for complete validation of the tenant isolation architecture.

---

## COLLABORATION MENUS (A/P/C):

After loading the artifacts, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into document structure and completeness
- **P (Party Mode)**: Bring analyst and architect perspectives for initial review
- **C (Continue)**: Proceed to detailed validation checks
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass document context: sections present, initial structure assessment
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into validation preparation
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tenant model structure: {summary of sections and completeness}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Confirm documents loaded successfully
- Update frontmatter `stepsCompleted: [20]`
- Proceed to next step: `step-21-v-validate.md`

---

## Verification

- [ ] Artifact loaded successfully
- [ ] All required sections present
- [ ] Patterns align with pattern registry

---

## Outputs

- Loaded artifact for validation
- Validation checklist

---

## Next Step

Proceed to `step-21-v-validate.md` for detailed validation checks.
