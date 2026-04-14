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

This step loads the Module Boundaries artifact for validation. The boundaries document defines the module catalog, data ownership mapping, dependency graph, facade definitions, and bounded context assignments for the modular monolith architecture.

---

## Prerequisites

- Module boundary design has been completed (Create mode completed)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: facade-contracts

---


## Inputs

- Artifact file path for validation
- Quality gate checklist: `{project-root}/_bmad/bam/checklists/`
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Artifact

Load the module boundaries document:
- `{output_folder}/planning-artifacts/architecture/module-boundaries.md`

If the file does not exist, inform the user that there is no artifact to validate and suggest switching to Create mode.

### 2. Also Load Context for Validation

- Master architecture: `{output_folder}/planning-artifacts/architecture/master-architecture.md`
- Product brief/PRD: for business capability alignment
- Individual module architectures: `{output_folder}/planning-artifacts/modules/*/architecture.md`

### 3. Parse Document Structure

Extract for validation:

1. **Module Catalog**
   - Module count and names
   - Owner assignments
   - Complexity classifications

2. **Data Ownership**
   - Entity-to-module mapping
   - Shared kernel entities

3. **Dependencies**
   - Dependency matrix
   - Mermaid diagram presence

4. **Facades**
   - Facade definitions per module
   - Method signatures

5. **Bounded Contexts**
   - Context definitions
   - Context-to-module mapping

Prepare document structure for validation against quality criteria in Step 21.

---

## COLLABORATION MENUS (A/P/C):

After loading the artifact, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into artifact structure concerns
- **P (Party Mode)**: Bring QA and architect perspectives on validation approach
- **C (Continue)**: Proceed to detailed validation against module boundary criteria
- **[Specific concerns]**: Describe pre-validation concerns

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: loaded artifact structure, missing sections, pre-validation status
- Process enhanced insights on validation readiness
- Ask user: "Accept this validation readiness assessment? (y/n)"
- If yes, document any caveats for validation
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review module boundaries artifact readiness for validation"
- Process QA and architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Confirm artifact loaded successfully
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

Confirm successful loading with:
- Module count and names with owners
- Entity-to-module ownership mapping
- Dependency graph status (cycle detection)
- Facade definition completeness

---

## Next Step

Once all artifacts are successfully loaded and structure is confirmed, proceed to `step-21-v-validate.md` to perform detailed quality criteria checks.
