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

This step loads the Security Operations Verification artifacts for validation. These documents define the security operations readiness including security monitoring coverage, incident response capabilities, threat detection effectiveness, and security control assessments for the multi-tenant AI platform.

---

## Prerequisites

- Previous step completed (workflow selection)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `security`
- **Load checklists:** `{project-root}/_bmad/bam/data/checklists/qg-sec-checklist.md`

---

## Inputs

- Artifact file paths for validation
- Quality gate checklist: `{project-root}/_bmad/bam/data/checklists/qg-sec-checklist.md`
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Artifact

- Read the artifacts from `{output_folder}/security/` specified location
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

## Artifact Locations

Load the existing security operations verification documents:
- `{output_folder}/security/security-operations-report.md`
- `{output_folder}/security/incident-readiness-assessment.md`
- `{output_folder}/security/security-controls-audit.md`

---

## Pre-Validation Checks

Before proceeding, verify the following conditions for each file:
- All files exist at their specified paths
- Files are readable and contain valid markdown
- Cross-references between documents are consistent
- Security control identifiers align across documents

---

## Expected Artifact Structure

The security-operations-report.md should contain:
- Executive summary
- Security monitoring assessment
- Incident response readiness
- Threat detection capabilities
- Security control effectiveness
- Gap analysis
- Remediation roadmap
- Gate decision and rationale

The incident-readiness-assessment.md should contain:
- Incident response plan review
- Tabletop exercise results
- Response time assessment
- Tool readiness verification
- External coordination contacts

The security-controls-audit.md should contain:
- Preventive controls assessment
- Detective controls assessment
- Corrective controls assessment
- Control testing results
- Gap analysis

---

## Error Handling Guidance

If the files do not exist, inform the user that there is no artifact to validate and suggest switching to Create mode.

If some files exist but others are missing, report which files are absent and advise that all documents are required for complete validation of security operations readiness.

---

## COLLABORATION MENUS (A/P/C):

After loading the artifacts, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into document structure and completeness
- **P (Party Mode)**: Bring security and operations perspectives for initial review
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
- Context: "Review security operations structure: {summary of sections and completeness}"
- Process collaborative analysis from security and operations personas
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

- Loaded artifacts for validation
- Validation checklist

---

## Next Step

Proceed to `step-21-v-validate.md` for detailed validation checks.
