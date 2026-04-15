# Step 22: Generate Validation Report

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

Generate a comprehensive validation report summarizing findings from the module boundary validation steps and determining the workflow completion status.

---

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- Step 21 completed: Module boundary validation performed

---


## Inputs

- Validation results from previous steps
- Quality gate decision (PASS/CONDITIONAL/FAIL)
- Specific findings per component
- Recommendations for remediation (if applicable)

---

## Actions

### 1. Compile Validation Results

Organize findings from Step 21:

| Category | Status | Notes |
|----------|--------|-------|
| Data Ownership | | All entities owned by exactly one module |
| Dependency Integrity | | No circular dependencies, facade contracts used |
| Bounded Context Quality | | Clear business capabilities, explicit boundaries |
| Facade Completeness | | Public facades defined, tenant-scoped methods |
| Module Catalog Quality | | Owners assigned, complexity classified |
| Consistency Checks | | Module count matches context analysis |
| Business Alignment | | All capabilities covered, no redundant modules |

### 2. Assign Severity to Findings

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| CRITICAL | Circular dependencies, unowned data, missing facades | Must fix before proceeding |
| WARNING | Extraction scores pending (apply: complexity 1-5, coupling 1-5, team readiness 1-5), minor documentation gaps | Should address |
| INFO | Suggested improvements to module granularity | Consider for future |

### 3. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **PASS** | All data owned, no cycles, facades complete, aligned with business |
| **CONDITIONAL** | Minor gaps (e.g., some extraction scores pending — use scoring: complexity 1-5, coupling 1-5, team readiness 1-5, extraction threshold >= 12/15) - document and proceed |
| **NEEDS REVISION** | Circular dependencies, unowned data, or missing facades |

### 4. Generate Report

Create validation report summarizing:
- Validation outcome (PASS/CONDITIONAL/FAIL)
- Findings by category (Data Ownership, Dependencies, Contexts, Facades, Catalog, Consistency, Business)
- Boundary gaps documented (if CONDITIONAL)
- Required fixes list (if FAIL)
- Next steps recommendation

---

## COLLABORATION MENUS (A/P/C):

After generating the report, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific findings for remediation planning
- **P (Party Mode)**: Bring PM and architect perspectives on report findings
- **C (Continue)**: Accept report and complete validation workflow
- **[Specific findings]**: Describe findings to investigate further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: validation report, critical findings, remediation needs
- Process enhanced insights on remediation strategy
- Ask user: "Accept this remediation analysis? (y/n)"
- If yes, document remediation plan
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review module boundary validation report: {summary of outcome and findings}"
- Process PM and architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation report to output location
- Complete validation workflow

---

## Verification

- [ ] All findings from Step 21 documented
- [ ] Severity assigned to each finding
- [ ] Completion status determined
- [ ] Report generated with all required sections
- [ ] Patterns align with pattern registry

---

## Outputs

- Validation report document
- Gate decision (PASS/CONDITIONAL/FAIL)
- Required fixes list (if applicable)
- **Load template:** `{project-root}/_bmad/bam/data/templates/module-boundaries-template.md`

---

## Next Step

Based on completion status:
- **PASS:** Module boundaries validated, proceed to individual module architecture design (create-module-architecture).
- **CONDITIONAL:** Document gaps (extraction scores pending — apply scoring: complexity 1-5, coupling 1-5, team readiness 1-5) and proceed with noted limitations.
- **NEEDS REVISION:** Return to Create/Edit mode to address circular dependencies, unowned data, or missing facades.

## Workflow Complete

Validation mode complete for module-boundary-design workflow.
