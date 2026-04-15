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

This step loads the Notification System artifacts for validation. These documents define the notification infrastructure, channel configurations, template management, and delivery system for the multi-tenant platform.

---

## Prerequisites

- Notification system design has been executed (Create mode completed)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `event-driven`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `tenant-isolation`



---

## Inputs

- Artifact file path for validation
- Quality gate checklist: `{project-root}/_bmad/bam/data/checklists/`
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

Load the existing notification system documents:
- `{output_folder}/planning-artifacts/notification-system-spec.md`

---

## Pre-Validation Checks

Before proceeding, verify the following conditions:
- File exists at the specified path
- File is readable and contains valid markdown
- All major sections are present
- No placeholder content remaining

---

## Expected Artifact Structure

The notification-system-spec.md should contain:
- Notification Requirements (categories, triggers, compliance)
- Channel Architecture (email, SMS, push, in-app)
- Template Management (schema, variables, localization)
- Tenant Preferences (settings, overrides, consent)
- Delivery Infrastructure (queues, retry, rate limiting)
- Tracking and Analytics (metrics, A/B testing)
- Escalation Rules (triggers, paths, acknowledgment)
- Tenant Branding (assets, customization, approval)
- Documentation Index (architecture, integration, runbooks)

---

## Error Handling Guidance

If the file does not exist, inform the user that there is no artifact to validate and suggest switching to Create mode.

If the file exists but is incomplete, note which sections are missing and recommend Edit mode to complete them before validation.

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
- Context: "Review notification system structure: {summary of sections and completeness}"
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
- [ ] Document structure matches expected format
- [ ] No placeholder content remaining
- [ ] Patterns align with pattern registry

---

## Outputs

- Loaded artifact ready for validation

---

## Next Step

Once artifact is successfully loaded and initial structure is confirmed, proceed to Step 21: Validate Artifact to perform detailed quality criteria checks.
