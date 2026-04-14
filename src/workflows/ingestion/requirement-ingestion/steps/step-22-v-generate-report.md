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

Generate a comprehensive validation report summarizing findings from the requirement ingestion validation steps and determining the workflow completion status.

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- Step 21 completed: Requirement ingestion validation performed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-lifecycle`


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
| Requirement Coverage | | Unique IDs, no duplicates, traced to source |
| Domain Categorization | | All requirements classified, consistent language |
| Module Mapping | | Single module assignment, rationale documented |
| Cross-Cutting Concerns | | Security, observability, tenant isolation flagged |
| Dependency Graph | | Acyclic, allowed directions, reasonable depth |
| Matrix Completeness | | All fields present, index navigable |

### 2. Assign Severity to Findings

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| CRITICAL | Orphan requirements, circular dependencies, missing module assignments | Must fix before proceeding |
| WARNING | Some rationale missing, minor traceability gaps | Should address |
| INFO | Categorization refinements, priority adjustments | Consider for future |

### 3. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **PASS** | All requirements assigned, no circular dependencies, matrix complete, cross-cutting isolated |
| **CONDITIONAL** | Minor gaps (e.g., some rationale missing) - document gaps and proceed |
| **NEEDS REVISION** | Orphan requirements, circular dependencies, or missing module assignments |

### 4. Generate Report

Create validation report summarizing:
- Validation outcome (PASS/CONDITIONAL/FAIL)
- Findings by category (Coverage, Categorization, Mapping, Cross-Cutting, Dependencies, Matrix)
- Requirement statistics (total count, per domain, per module)
- Dependency graph analysis results
- Cross-cutting concerns summary
- Required fixes list (if FAIL)
- Next steps recommendation

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

- [ ] All findings from Step 21 documented
- [ ] Severity assigned to each finding
- [ ] Completion status determined
- [ ] Report generated with all required sections
- [ ] Patterns align with pattern registry

## Outputs

- Validation report document
- Gate decision (PASS/CONDITIONAL/FAIL)
- Requirement matrix quality assessment
- Required fixes list (if applicable)

## Next Step

Based on completion status:
- **PASS:** Requirement ingestion complete, proceed to triage-module-complexity workflow.
- **CONDITIONAL:** Document gaps and proceed with noted limitations.
- **NEEDS REVISION:** Return to Create/Edit mode to address orphan requirements, circular dependencies, or missing module assignments.

## Workflow Complete

Validation mode complete for requirement-ingestion workflow.
