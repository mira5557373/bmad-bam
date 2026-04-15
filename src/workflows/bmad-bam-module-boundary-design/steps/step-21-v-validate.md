# Step 21: Validate Module Boundaries

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

This step validates the completeness and quality of the module boundaries design, ensuring proper data ownership, dependency integrity, bounded context quality, and facade completeness across the modular monolith.

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

### Validation Checklist

#### Data Ownership

- [ ] Every entity is owned by exactly one module
- [ ] No orphaned entities (entities without module ownership)
- [ ] No dual ownership (entity owned by multiple modules)
- [ ] All entities have `tenant_id` requirement documented
- [ ] Shared kernel entities explicitly identified and justified

#### Dependency Integrity

- [ ] No circular dependencies (direct or indirect)
- [ ] Dependency graph is documented
- [ ] Mermaid diagram present and accurate
- [ ] All dependencies use facade contracts (no internal imports)
- [ ] Dependency direction follows business capability hierarchy

#### Bounded Context Quality

- [ ] Each bounded context has clear business capability
- [ ] Ubiquitous language defined per context
- [ ] Context boundaries are explicit (IN scope, OUT of scope)
- [ ] Context-to-module mapping is documented

#### Facade Completeness

- [ ] Every module has a public facade defined
- [ ] All facade methods are tenant-scoped
- [ ] DTOs defined for inputs and outputs
- [ ] Error types specified per method
- [ ] Consumer list documented for each facade

#### Module Catalog Quality

- [ ] Every module has an owner assigned
- [ ] Purpose statement present for each module
- [ ] Complexity classification assigned (SIMPLE/STANDARD/COMPLEX)
- [ ] Extraction readiness scored

#### Consistency Checks

- [ ] Module count matches bounded context analysis
- [ ] Dependencies match facade method usage
- [ ] Data ownership matches entity definitions
- [ ] No modules without defined boundaries

#### Business Alignment

- [ ] All business capabilities from PRD/brief are covered
- [ ] No redundant modules (overlapping capabilities)
- [ ] Module granularity appropriate for team size

### Validation Results

| Check | Status | Finding |
|-------|--------|---------|
| Data ownership | PASS/FAIL | {detail} |
| Dependency integrity | PASS/FAIL | {detail} |
| Bounded contexts | PASS/FAIL | {detail} |
| Facade completeness | PASS/FAIL | {detail} |
| Module catalog | PASS/FAIL | {detail} |
| Consistency | PASS/FAIL | {detail} |
| Business alignment | PASS/FAIL | {detail} |

### Gate Decision

- **PASS**: All data owned, no cycles, facades complete, aligned with business
- **CONDITIONAL**: Minor gaps (e.g., some extraction scores pending — use scoring criteria: complexity 1-5, coupling 1-5, team readiness 1-5, with extraction threshold >= 12/15 for recommended extraction) - document and proceed
- **FAIL**: Circular dependencies, unowned data, missing facades - return to Create/Edit mode

Present validation results with specific findings and recommendations.

---

## COLLABORATION MENUS (A/P/C):

After completing validation, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation findings and remediation
- **P (Party Mode)**: Bring QA and architect perspectives on validation results
- **C (Continue)**: Accept validation results and proceed to generate report
- **[Specific findings]**: Describe findings to investigate further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: validation results, critical failures, remediation options
- Process enhanced insights on boundary quality gaps
- Ask user: "Accept this validation analysis? (y/n)"
- If yes, document enhanced findings
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review module boundary validation results: {summary of findings}"
- Process QA and architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document validation results
- Proceed to next step: `step-22-v-generate-report.md`

---

## Verification

- [ ] All validation checks completed
- [ ] Gate decision determined
- [ ] Findings documented with specifics
- [ ] Recommendations provided
- [ ] Patterns align with pattern registry

---

## Outputs

- Validated module boundaries document
- Validation gate decision (PASS/CONDITIONAL/FAIL)
- Boundary gaps documented (if CONDITIONAL)
- Required fixes list (if FAIL)

---

## Next Step

If PASS: Module boundaries validated, proceed to individual module architecture design (create-module-architecture).
If CONDITIONAL: Document gaps (extraction scores pending — apply scoring: complexity 1-5, coupling 1-5, team readiness 1-5) and proceed with noted limitations.
If FAIL: Return to Create/Edit mode to address circular dependencies, unowned data, or missing facades.
