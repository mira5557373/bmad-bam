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

Load and review existing master architecture document to identify sections requiring modification.

---

## Prerequisites

- Existing master architecture document to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-isolation,module-boundaries

---


## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Existing Document

Load the existing master architecture document from `{output_folder}/planning-artifacts/master-architecture.md`.

If the file does not exist, inform the user and suggest switching to Create mode.

### 2. Parse Document Structure

Parse and display a summary of the current document structure:
- Sections present
- Key decisions documented
- Last modification date (if available)

### 3. Present Current State

Display summary table:

| Section | Present | Status | Key Decisions |
|---------|---------|--------|---------------|
| Tenant Model | ✅/❌ | {status} | {summary} |
| AI Runtime | ✅/❌ | {status} | {summary} |
| Module Boundaries | ✅/❌ | {status} | {summary} |
| Shared Kernel | ✅/❌ | {status} | {summary} |
| Technology Stack | ✅/❌ | {status} | {summary} |
| Core Contracts | ✅/❌ | {status} | {summary} |
| Code Patterns | ✅/❌ | {status} | {summary} |

### 4. Identify Modification Targets

Confirm with the user which sections or decisions need modification.

---

## COLLABORATION MENUS (A/P/C):

After loading and presenting the existing document, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific sections before editing
- **P (Party Mode)**: Bring architect perspectives on proposed changes
- **C (Continue)**: Proceed to apply modifications
- **[Specific sections]**: Describe which sections to modify

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: current document state, proposed modifications
- Process enhanced insights on change impact
- Ask user: "Accept this analysis of proposed changes? (y/n)"
- If yes, document change impact assessment
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review proposed modifications to frozen master architecture"
- Process architect and security perspectives on change impact
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document identified modification targets
- Proceed to next step: `step-11-e-apply-changes.md`

---

## Verification

- [ ] Master architecture document loaded successfully
- [ ] Document structure understood
- [ ] Sections for modification identified
- [ ] Patterns align with pattern registry

---

## Outputs

- Summary of current master architecture state
- List of sections to modify

---

## Next Step

Proceed to `step-11-e-apply-changes.md` with identified modifications.
