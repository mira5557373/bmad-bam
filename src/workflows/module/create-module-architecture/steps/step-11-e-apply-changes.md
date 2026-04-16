# Step 11: Apply Targeted Modifications (Edit Mode)

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

This step applies the identified changes to the existing module architecture artifact. Changes are applied incrementally while preserving document structure, master architecture inheritance, module context consistency, and ensuring all entities maintain tenant-scoped patterns.

---

## Prerequisites

- Step 10 completed with identified changes
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries

---


## Inputs

- Loaded artifact from previous edit step
- Identified modification targets
- User-confirmed changes to apply
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Based on the user's requested changes:

### 1. Identify Affected Sections

Determine which sections in the module architecture document will be modified.

### 2. Present Current Content

Display the current content of each affected section.

### 3. Apply Modifications

Apply the requested modifications while preserving:
- Document structure and inheritance reference to master architecture
- Unaffected sections (no unnecessary changes)
- Module context summary consistency

### 4. Verify Tenant-Scoped Patterns

If modifying the domain model or facade, verify:
- All entities still have `tenant_id`
- All entities still follow `BaseEntity` from master architecture
- Facade methods remain tenant-scoped
- No circular dependencies introduced

### 5. Validate Against Master Architecture

Validate the modified document against master architecture constraints.

### 6. Update Module Context

Update `module-context.md` if the changes affect the compact summary.

### 7. Write Updated Documents

Write updated documents back to their original locations.

Present a diff summary of changes made and ask for confirmation.

---

## COLLABORATION MENUS (A/P/C):

After applying modifications, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into change impact and validation
- **P (Party Mode)**: Bring architect perspectives on applied changes
- **C (Continue)**: Accept changes and complete edit workflow
- **[Specific concerns]**: Describe concerns about the changes

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: changes applied, constraint validation results
- Process enhanced insights on change quality
- Ask user: "Accept this validation of applied changes? (y/n)"
- If yes, finalize changes
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review applied modifications to module architecture: {diff summary}"
- Process architect and domain expert perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Confirm changes are saved
- Mark edit workflow as complete

---

## Verification

- [ ] Changes identified correctly
- [ ] No unintended side effects
- [ ] Patterns align with pattern registry
- [ ] All entities still follow tenant-scoped patterns
- [ ] Module context consistency maintained

---

## Outputs

- Updated module architecture document
- Updated module-context.md (if affected)

---

## Next Step

Run `validate-module` workflow to verify changes against quality gates.
