# Step 10: Load Existing Artifact (Edit Mode)

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

Load and review existing security assessment documents to identify sections requiring modification or findings requiring update.

---

## Prerequisites

- Existing security assessment documents to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance

---


## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Existing Documents

Load the existing security assessment documents:
- `{output_folder}/planning-artifacts/security/security-assessment-report.md`
- `{output_folder}/planning-artifacts/security/threat-model.md`
- `{output_folder}/planning-artifacts/security/security-findings.md`

If the files do not exist, inform the user and suggest switching to Create mode.

### 2. Parse Document Structure

Parse and display a summary of the current documents:

| Component | Status | Key Content |
|-----------|--------|-------------|
| Scope assessment | Yes/No | {components in scope} |
| Threat model | Yes/No | {threat count} |
| Tenant isolation review | Yes/No | {findings count} |
| AI safety review | Yes/No | {findings count} |
| Findings report | Yes/No | {total findings} |
| Remediation roadmap | Yes/No | {priorities defined} |

### 3. Summarize Current Findings

| Severity | Count | Status |
|----------|-------|--------|
| Critical | {count} | Open/Closed |
| High | {count} | Open/Closed |
| Medium | {count} | Open/Closed |
| Low | {count} | Open/Closed |

### 4. Identify Modification Targets

Confirm with the user which sections need modification:
- Update existing findings status
- Add new findings
- Update threat model
- Revise remediation roadmap

---

## COLLABORATION MENUS (A/P/C):

After loading and presenting the existing documents, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific findings or sections before editing
- **P (Party Mode)**: Bring security perspectives on proposed changes
- **C (Continue)**: Proceed to apply modifications
- **[Specific components]**: Describe which components to modify

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: current document state, findings summary, proposed modifications
- Process enhanced insights on change impact
- Ask user: "Accept this analysis of proposed changes? (y/n)"
- If yes, document change impact assessment
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review proposed modifications to security assessment"
- Process security and engineering perspectives on change impact
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document identified modification targets
- Proceed to next step: `step-11-e-apply-changes.md`

---

## Verification

- [ ] All existing documents loaded successfully
- [ ] Document structure understood
- [ ] Current findings status known
- [ ] Sections for modification identified
- [ ] Patterns align with pattern registry

---

## Outputs

- Summary of current security assessment state
- List of sections to modify
- Findings status summary

---

## Next Step

Proceed to `step-11-e-apply-changes.md` with identified modifications.
