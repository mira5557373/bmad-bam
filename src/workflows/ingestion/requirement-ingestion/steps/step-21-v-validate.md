# Step 21: Validate Requirement Ingestion

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

Validate the requirement ingestion artifacts against quality criteria, ensuring complete coverage, proper domain categorization, single-module assignments, isolated cross-cutting concerns, and an acyclic dependency graph.

## Prerequisites

- Previous step completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-lifecycle`

## Validation Checklist

### Requirement Coverage
- [ ] All source requirements have unique IDs
- [ ] No duplicate requirement entries
- [ ] All requirements traced to source document location
- [ ] No orphan requirements (unassigned to modules)

### Domain Categorization
- [ ] Every requirement has domain classification
- [ ] Domain boundaries are coherent (related requirements grouped)
- [ ] Ubiquitous language consistent within each domain
- [ ] Ambiguous requirements documented with rationale

### Module Mapping
- [ ] Each requirement assigned to exactly one module
- [ ] Module assignments follow single-responsibility principle
- [ ] Mapping rationale documented for non-obvious assignments
- [ ] No requirements split across modules without coordination pattern

### Cross-Cutting Concerns
- [ ] Cross-cutting requirements identified and flagged
- [ ] Security concerns isolated to appropriate module/aspect
- [ ] Observability requirements not duplicated across modules
- [ ] Tenant isolation requirements explicitly addressed

### Dependency Graph
- [ ] Dependency graph is acyclic (no circular dependencies)
- [ ] Dependencies follow allowed directions (no forbidden couplings)
- [ ] Shared kernel candidates documented
- [ ] Dependency depth reasonable (no deep chains)

### Matrix Completeness
- [ ] Requirement matrix contains all fields (ID, description, domain, module, cross-cutting, dependencies, priority)
- [ ] Index navigable and accurate
- [ ] sprint-status.yaml updated with all modules

## Gate Decision

- **PASS**: All requirements assigned, no circular dependencies, matrix complete, cross-cutting isolated
- **CONDITIONAL**: Minor gaps (e.g., some rationale missing) - document gaps and proceed
- **FAIL**: Orphan requirements, circular dependencies, or missing module assignments - return to Create/Edit mode

Present validation results with specific findings for each category.



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

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Conduct deeper analysis of the current step's domain
- Present additional options and trade-offs
- Return to checkpoint after elicitation

#### If 'P' (Party Mode):
- Enable collaborative exploration
- Generate creative alternatives
- Document insights before returning

#### If 'C' (Continue):
- Verify all outputs are complete
- Proceed to next step file

---

## Verification

- [ ] Artifact loaded successfully
- [ ] All required sections present
- [ ] Patterns align with pattern registry

## Outputs

- Loaded artifact for validation
- Validation checklist

## Next Step

Proceed to `step-22-v-generate-report.md`
