# Step 10: Load Existing Cross-Module Epic (Edit Mode)

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

Load and review existing cross-module story documents to identify sections requiring modification in Edit mode.

---

## Prerequisites

- Existing cross-module story artifact to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: facade-contracts

---

## Inputs

- Existing artifact file paths
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Existing Documents

Load the cross-module story artifact and supporting files:
- `{output_folder}/planning-artifacts/cross-module-stories.md`
- `{output_folder}/planning-artifacts/stories/dependency-graph.md`
- `{output_folder}/planning-artifacts/stories/module-stories/*.md`
- `{output_folder}/planning-artifacts/stories/integration-tests.md`

If the files do not exist, inform the user and suggest switching to Create mode.

### 2. Parse Document Structure

Parse and display a summary of the current epic:

| Component | Status | Key Details |
|-----------|--------|-------------|
| Modules Involved | {count} modules | {module_list} |
| User Journeys | {count} journeys | {journey_list} |
| Module Stories | {count} stories | {status_summary} |
| Dependencies | {count} deps | {critical_path} |
| Milestones | {count} milestones | {next_milestone} |

### 3. Display Current State

Present summary by category:

**Module Coverage:**
| Module | Stories | Completed | In Progress | Blocked |
|--------|---------|-----------|-------------|---------|
| {module} | {count} | {count} | {count} | {count} |

**Dependency Status:**
| Dependency Type | Total | Resolved | Pending |
|-----------------|-------|----------|---------|
| Contract | {count} | {count} | {count} |
| Data | {count} | {count} | {count} |
| Event | {count} | {count} | {count} |

### 4. Identify Modification Targets

Confirm with the user which sections need modification:
- [ ] Module involvement changes
- [ ] Story additions or removals
- [ ] Dependency updates
- [ ] Milestone adjustments
- [ ] Communication plan changes

---

## COLLABORATION MENUS (A/P/C)

After loading and presenting the existing documents, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific components before editing
- **P (Party Mode)**: Bring architect perspectives on proposed changes
- **C (Continue)**: Proceed to apply modifications
- **[Specific components]**: Describe which components to modify

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: current document state, proposed modifications
- Process enhanced insights on change impact
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review proposed modifications to cross-module epic"
- Present synthesized recommendations
- Return to A/P/C menu

#### If 'C' (Continue):
- Document identified modification targets
- Proceed to `step-11-e-apply.md`

### Menu Options

**[A]nalyze** - Existing Artifact Analysis:
- A1: Analyze current module involvement completeness
- A2: Review existing dependency structure for gaps
- A3: Assess story coverage across modules
- A4: Evaluate milestone progress status

**[P]ropose** - Edit Mode Proposals:
- P1: Propose sections requiring modification
- P2: Suggest priority order for edits
- P3: Recommend scope of changes needed
- P4: Propose validation approach after edits

**[C]ontinue** - Proceed to apply changes:
- C1: Continue to Step 11 (Apply Changes) with identified modifications
- C2: Save current analysis and pause

Select an option or provide feedback:

---

## Verification

- [ ] All epic documents loaded successfully
- [ ] Document structure understood
- [ ] Current state summarized
- [ ] Sections for modification identified
- [ ] Patterns align with pattern registry

---

## Outputs

- Summary of current cross-module epic state
- List of sections to modify
- Change scope confirmation

---

## Next Step

Proceed to `step-11-e-apply.md` with identified modifications.
