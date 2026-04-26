# Step 10: Load Existing White-Labeling Design (Edit Mode)

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

Load and review existing white-labeling design documents to identify sections requiring modification.

---

## Prerequisites

- Existing white-labeling design document to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `customization`

---

## Actions

### 1. Load Existing Document

Load the existing white-labeling design:
- `{output_folder}/planning-artifacts/white-labeling-design.md`

If the file does not exist, inform the user and suggest switching to Create mode.

### 2. Parse Document Structure

Parse and display a summary of the current document:

| Section | Status | Last Modified |
|---------|--------|---------------|
| Branding Customization | {Present/Missing} | {date} |
| Domain Customization | {Present/Missing} | {date} |
| Feature Customization | {Present/Missing} | {date} |
| Tier Matrix | {Present/Missing} | {date} |
| Implementation Architecture | {Present/Missing} | {date} |
| Implementation Roadmap | {Present/Missing} | {date} |

### 3. Display Current Tier Matrix

Show current tier feature configuration:

| Feature | Free | Pro | Enterprise | OEM |
|---------|------|-----|------------|-----|
| Logo upload | {value} | {value} | {value} | {value} |
| Color theme | {value} | {value} | {value} | {value} |
| Custom domain | {value} | {value} | {value} | {value} |
| Feature toggles | {value} | {value} | {value} | {value} |

### 4. Identify Modification Targets

Ask user which sections need modification:

| Section | Current State | Modification Needed |
|---------|---------------|---------------------|
| Branding | {summary} | {Yes/No} |
| Domain | {summary} | {Yes/No} |
| Features | {summary} | {Yes/No} |
| Tiers | {summary} | {Yes/No} |
| Architecture | {summary} | {Yes/No} |
| Roadmap | {summary} | {Yes/No} |

---

## COLLABORATION MENUS (A/P/C):

After loading and presenting the existing document, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific sections before editing
- **P (Party Mode)**: Bring perspectives on proposed modifications
- **C (Continue)**: Proceed to apply modifications
- **[Specific sections]**: Describe which sections to modify

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: current document state, proposed modifications
- Process enhanced insights on modification impact
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review proposed modifications to white-labeling design"
- Present synthesized recommendations from multiple perspectives
- Return to A/P/C menu

#### If 'C' (Continue):
- Document identified modification targets
- Proceed to next step: `step-11-e-apply.md`

---

## Verification

- [ ] Existing document loaded successfully
- [ ] Document structure understood
- [ ] Current tier matrix captured
- [ ] Sections for modification identified
- [ ] User confirmed modification targets

---

## Outputs

- Document structure summary
- Current configuration overview
- Modification target list

---

## Next Step

Proceed to `step-11-e-apply.md` to apply requested modifications.
