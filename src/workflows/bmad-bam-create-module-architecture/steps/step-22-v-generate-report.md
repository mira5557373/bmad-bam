# Step 22: Generate Validation Report

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

Generate a comprehensive validation report summarizing findings from the module architecture validation (QG-M1) and determining the workflow completion status.

---

## Prerequisites

- Step 20 (`step-20-v-load-artifact.md`) completed: Artifact loaded successfully
- Step 21 (`step-21-v-validate.md`) completed: Module architecture validation performed

---


## Inputs

- Validation results from previous steps
- Quality gate decision (PASS/CONDITIONAL/FAIL)
- Specific findings per component
- Recommendations for remediation (if applicable)

---

## Actions

### 1. Compile Validation Results

Organize findings from Step 21 (`step-21-v-validate.md`):

| Category | Status | Notes |
|----------|--------|-------|
| Identity and Context | | Bounded context, capability, owner documented |
| Master Architecture Inheritance | | Patterns applied, constraints documented |
| Domain Model | | Aggregates, entities with tenant_id, invariants |
| Public Facade | | Methods defined, DTOs, error contract |
| Dependencies | | Facades declared, no circular dependencies |
| Events Published | | Domain events with tenant_id in payload |
| Module-Specific Decisions | | ADRs for deviations documented |
| AI Behaviors | | Agents defined, tool permissions, memory scope |
| Assembly Quality | | module-context.md generated, sprint-status updated |

### 2. Assign Severity to Findings

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| CRITICAL | Missing domain model, undefined facade, circular dependencies, or entities without tenant_id | Must fix before proceeding |
| WARNING | Minor gaps like AI behaviors TBD for future sprint | Should document and proceed |
| INFO | Optional improvements to ADR documentation or event naming | Consider for consistency |

### 3. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **COMPLETE** | All applicable sections complete, master architecture constraints met, no circular dependencies (QG-M1 PASS) |
| **NEEDS REVISION** | Missing domain model, undefined facade, circular dependencies, or tenant_id gaps (QG-M1 FAIL) |

### 4. Generate Report

Create validation report summarizing:
- QG-M1 gate decision (PASS/CONDITIONAL/FAIL)
- Domain model completeness
- Facade definition assessment
- Dependency graph validation
- Tenant isolation verification (all entities have tenant_id)
- Architecture gaps documented (if CONDITIONAL)
- Required fixes list (if FAIL)

---

## COLLABORATION MENUS (A/P/C):

After generating the report, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into report findings and recommendations
- **P (Party Mode)**: Bring QA and architect perspectives on report completeness
- **C (Continue)**: Accept report and complete validation workflow
- **[Specific items]**: Describe items to add or clarify in report

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: validation report, gate decision, recommendations
- Process enhanced insights on report quality
- Ask user: "Accept these enhanced recommendations? (y/n)"
- If yes, incorporate into report
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review validation report: {gate decision and key findings}"
- Process QA and architect perspectives on report completeness
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation report
- Mark validation workflow as complete

---

## Verification

- [ ] All findings from Step 21 documented
- [ ] Severity assigned to each finding
- [ ] Completion status determined
- [ ] Report generated with QG-M1 summary
- [ ] Patterns align with pattern registry

---

## Outputs

- Validation report document
- **Load template:** `{project-root}/_bmad/bam/data/templates/quality-gate-report-template.md`
- **Output to:** `{output_folder}/planning-artifacts/{module-name}-architecture-validation-report.md`

---

## Next Step

Based on completion status:
- **COMPLETE (QG-M1 PASS):** Module architecture validated. Proceed to `bmad-bam-create-module-epics` workflow.
- **CONDITIONAL:** Document gaps with remediation timeline. Proceed to epic creation with noted limitations.
- **NEEDS REVISION (QG-M1 FAIL):** Return to Edit mode to address domain model, facade, dependency, or tenant_id gaps.

## Workflow Complete

Validation mode complete for module architecture workflow. QG-M1 gate decision recorded.
