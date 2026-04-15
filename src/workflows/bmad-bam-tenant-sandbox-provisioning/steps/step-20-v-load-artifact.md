# Step 20: Load Artifact (Validate Mode)

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

Load the tenant sandbox provisioning design artifact for validation against quality criteria.

---

## Prerequisites

- Existing sandbox provisioning design to validate
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: sandbox-management

---

## Actions

### 1. Load Artifact

Load the sandbox provisioning design:
- `{output_folder}/planning-artifacts/operations/tenant-sandbox-provisioning.md`

If the file does not exist, inform the user and suggest switching to Create mode.

### 2. Display Summary

Present artifact overview:

| Attribute | Value |
|-----------|-------|
| Document Path | {path} |
| Version | {version} |
| Last Modified | {date} |
| Status | {status} |

### 3. Prepare for Validation

Confirm the artifact is ready for validation checks.

---

## COLLABORATION MENUS (A/P/C):

After loading the artifact, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into artifact before validation
- **P (Party Mode)**: Bring perspectives on validation approach
- **C (Continue)**: Proceed to validation
- **[Specific concerns]**: Describe concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: artifact contents, validation scope
- Process enhanced insights
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review sandbox provisioning design before validation"
- Present synthesized recommendations
- Return to A/P/C menu

#### If 'C' (Continue):
- Proceed to next step: `step-21-v-validate.md`

---

## Verification

- [ ] Artifact loaded successfully
- [ ] Document metadata captured
- [ ] Ready for validation checks

---

## Outputs

- Loaded artifact content
- Validation readiness confirmation

---

## Next Step

Proceed to `step-21-v-validate.md` to run validation checks.
