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

This step loads the Data Protection artifacts for validation. These documents define the security controls including encryption at rest and in transit, tenant data isolation mechanisms, PII protection, and privacy controls that ensure data security for multi-tenant AI platforms.

---

## Prerequisites

- Previous step completed (workflow selection)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `data-protection`

---

## Inputs

- Artifact file path for validation
- Quality gate checklist: `{project-root}/_bmad/bam/checklists/`
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Artifacts

Load the existing data protection documents:
- `{output_folder}/planning-artifacts/data-protection-report.md`
- `{output_folder}/planning-artifacts/encryption-audit.md`
- `{output_folder}/planning-artifacts/privacy-assessment.md`

### 2. Validate Content

- Check all required sections are present
- Verify cross-references are valid
- Validate against quality gate checklist

### 3. Generate Findings

- Document any issues found
- Categorize by severity (Critical/High/Medium/Low)

---

## Artifact Locations

Load the existing data protection documents:
- `{output_folder}/planning-artifacts/data-protection-report.md`
- `{output_folder}/planning-artifacts/encryption-audit.md`
- `{output_folder}/planning-artifacts/privacy-assessment.md`

---

## Pre-Validation Checks

Before proceeding, verify the following conditions for each file:
- All three files exist at their specified paths
- Files are readable and contain valid markdown
- Cross-references between the documents are consistent
- Encryption controls and privacy requirements align across documents

---

## Expected Artifact Structure

The data-protection-report.md should contain:
- Encryption controls (at rest and in transit)
- Tenant data isolation verification
- PII protection mechanisms
- Privacy controls
- Quality gate QG-DR1 status

The encryption-audit.md should contain:
- Encryption at rest audit findings
- Encryption in transit audit findings
- Key management audit
- Cryptographic standards verification

The privacy-assessment.md should contain:
- PII identification and classification
- Data retention policies
- Data subject rights compliance
- Privacy impact assessment

---

## Error Handling Guidance

If the files do not exist, inform the user that there is no artifact to validate and suggest switching to Create mode.

If one or more files exist but others are missing, report which files are absent and advise that all documents are required for complete validation of the data protection architecture.

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
- Context: "Review data protection structure: {summary of sections and completeness}"
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

- [ ] Artifacts loaded successfully
- [ ] All required sections present
- [ ] Patterns align with pattern registry

---

## Outputs

- Loaded artifacts for validation
- Validation checklist

---

## Next Step

Proceed to `step-21-v-validate.md` for detailed validation checks.
