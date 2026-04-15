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

Load the API Key Management artifacts for validation.

---

## Prerequisites

- API key management design has been executed (Create mode completed)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: encryption-key-management`

---

## Actions

### 1. Load Artifact

- Read the artifact from `{output_folder}/planning-artifacts/security/tenant-api-key-management.md`
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

## Expected Artifact Structure

The tenant-api-key-management.md should contain:
- Key Creation Design (format, crypto, storage, metadata, scopes)
- Key Rotation Policies (triggers, process, notifications)
- Key Revocation Procedures (types, triggers, cascade, recovery)
- Audit Logging (events, schema, anomaly detection, compliance)
- Operational Runbook

---

## COLLABORATION MENUS (A/P/C):

After loading the artifacts, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into document structure
- **P (Party Mode)**: Bring security perspectives for initial review
- **C (Continue)**: Proceed to detailed validation checks
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Confirm documents loaded successfully
- Update frontmatter `stepsCompleted: [20]`
- Proceed to next step: `step-21-v-validate.md`

---

## Verification

- [ ] Artifact loaded successfully
- [ ] All required sections present
- [ ] Document structure matches expected format

---

## Outputs

- Loaded artifact ready for validation

---

## Next Step

Proceed to `step-21-v-validate.md` for detailed quality criteria checks.
