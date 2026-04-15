# Step 1: Load Artifact

## MANDATORY EXECUTION RULES (READ FIRST)

- STOP **NEVER generate content without user input** - Wait for explicit direction
- READ **CRITICAL: ALWAYS read the complete step file** before taking any action
- LOAD **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- PAUSE **ALWAYS pause after presenting findings** and await user direction
- FOCUS **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- TARGET Show your analysis before taking any action
- SAVE Update document frontmatter after each section completion
- NOTES Maintain append-only document building
- CHECK Track progress in `stepsCompleted` array

---

## Purpose

This step loads the Tenant Analytics Dashboard artifact for validation. The analytics dashboard specification documents tenant-scoped analytics, data aggregation, visualization design, and access control for multi-tenant SaaS platforms.

---

## Prerequisites

- Tenant Analytics Dashboard specification artifact exists to validate
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: analytics,dashboard

---

## Inputs

- Artifact file path for validation
- Quality gate checklist: `{project-root}/_bmad/bam/data/checklists/`
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Artifact

- Read the artifact from `{output_folder}/planning-artifacts/analytics-dashboard-spec.md`
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

## Artifact Location

Load the existing tenant analytics dashboard documents:
- `{output_folder}/planning-artifacts/analytics-dashboard-spec.md`

## Pre-Validation Checks

Before proceeding, verify the following conditions:
- All required files exist at specified paths
- Files contain valid markdown with proper section headers
- Analytics requirements are defined
- Tenant data isolation is specified
- Access control matrix is present

## Error Handling Guidance

If the files do not exist, inform the user that there is no artifact to validate and suggest switching to Create mode.

If files exist but lack required sections (analytics requirements, data architecture, access control), document the gaps and prompt for guidance on partial validation.

---

## COLLABORATION MENUS (A/P/C):

After loading artifact, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into artifact structure or pre-validation findings
- **P (Party Mode)**: Bring data architect and security architect perspectives on analytics design
- **C (Continue)**: Accept loaded artifact and proceed to validation
- **[Specific refinements]**: Describe specific areas to examine

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: artifact structure, analytics requirements, data architecture
- Process enhanced insights on artifact completeness
- Ask user: "Accept this detailed artifact analysis? (y/n)"
- If yes, integrate into validation context
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tenant analytics dashboard artifact for validation"
- Process data architect and security architect perspectives
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

Proceed to `step-21-v-validate.md` to run validation checks against analytics dashboard quality criteria.
