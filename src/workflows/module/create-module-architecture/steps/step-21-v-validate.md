# Step 21: Validate Module Architecture (Validate Mode)

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

This step validates the completeness and quality of the module architecture, ensuring proper domain model design, facade definitions, dependency management, and alignment with master architecture constraints.

---

## Prerequisites

- Step 20: Load Artifact completed successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: facade-contracts



---

## Inputs

- Loaded artifact from validation step 20
- Quality gate criteria and checklist
- Pattern registry for validation rules
- Previous validation findings (if re-validating)

---

## Actions

### 1. Load Artifact

- Read the artifact from `{output_folder}/` specified location
- Parse and validate structure

### 2. Validate Content

- Check all required sections are present
- Verify cross-references are valid
- Validate against quality gate checklist

### 3. Generate Findings

- Document any issues found
- Categorize by severity (Critical/High/Medium/Low)

---

---

## Verification

### Identity and Context
- [ ] Module bounded context clearly defined
- [ ] Business capability owned is documented
- [ ] Module owner/team identified
- [ ] Purpose statement present

### Master Architecture Inheritance
- [ ] Inheritance reference to master architecture present
- [ ] Relevant patterns from master architecture applied
- [ ] Inherited constraints documented
- [ ] Shared kernel interfaces identified for implementation

### Domain Model
- [ ] Aggregate roots defined
- [ ] All entities have `tenant_id`
- [ ] All entities follow `BaseEntity` from master architecture
- [ ] Entity relationships documented
- [ ] Lifecycle rules defined
- [ ] Invariants documented

### Public Facade
- [ ] Facade methods defined (all tenant-scoped)
- [ ] Input/output DTOs defined
- [ ] Error types follow master architecture error contract
- [ ] Facade follows template from master architecture

### Dependencies
- [ ] Consumed facades declared with version
- [ ] Consumed events declared
- [ ] Each dependency has a facade contract
- [ ] No circular dependencies
- [ ] SIMPLE modules: appropriately skipped if 0-1 dependencies

### Events Published
- [ ] Domain events defined with payload schemas
- [ ] All events include `tenant_id` in payload
- [ ] Publishing rules documented
- [ ] SIMPLE modules: appropriately skipped if CRUD-only

### Module-Specific Decisions
- [ ] Module ADRs documented where patterns deviate from master
- [ ] No unauthorized deviations from master architecture
- [ ] SIMPLE modules: appropriately skipped if all inherited

### AI Behaviors (if applicable)
- [ ] Agents defined for this module
- [ ] Tool permissions within policy bounds
- [ ] Memory scope correctly declared
- [ ] Appropriately skipped if module has no AI involvement

### Assembly Quality
- [ ] Module context summary (`module-context.md`) generated
- [ ] Module registered in sprint-status.yaml
- [ ] Document internally consistent
- [ ] Complexity classification matches actual module scope

---

## Gate Decision

- **PASS**: All applicable sections complete, master architecture constraints met, no circular dependencies
- **CONDITIONAL**: Minor gaps (e.g., AI behaviors TBD for future sprint) - document gaps and proceed
- **FAIL**: Missing domain model, undefined facade, circular dependencies, or entities without tenant_id - return to Create mode

Present validation results with specific findings for each section.

---

## COLLABORATION MENUS (A/P/C):

After completing validation, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific validation findings
- **P (Party Mode)**: Bring QA and architect perspectives on gate decision
- **C (Continue)**: Accept validation results and proceed to generate report
- **[Specific findings]**: Describe concerns about specific findings

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: validation findings, gate decision rationale
- Process enhanced insights on quality concerns
- Ask user: "Accept this enhanced validation analysis? (y/n)"
- If yes, incorporate into findings
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review module architecture validation: {findings summary and gate decision}"
- Process QA and architect perspectives on gate decision
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document validation findings
- Proceed to next step: `step-22-v-generate-report.md`

---

## Outputs

- Validated module architecture
- QG-M1 gate decision (PASS/CONDITIONAL/FAIL)
- Architecture gaps documented (if CONDITIONAL)
- Required fixes list (if FAIL)

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate the validation report with QG-M1 gate decision.
