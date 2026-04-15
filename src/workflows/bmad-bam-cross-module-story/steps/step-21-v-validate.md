# Step 2: Validate Cross-Module Story

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

Validate the cross-module story against quality criteria ensuring proper module identification, dependency mapping, integration point specification, and coordinated story structure.

## Prerequisites

- Step 01 completed: Artifact loaded successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: facade-contracts

## Validation Checklist

### Module Identification
- [ ] All necessary modules identified
- [ ] Module roles classified (primary/supporting/observing)
- [ ] Module owners identified and available
- [ ] No module boundary violations

### Dependencies
- [ ] All dependencies mapped (data/functional/temporal)
- [ ] Critical path identified
- [ ] No circular dependencies
- [ ] New contracts required are documented

### Integration Points
- [ ] All cross-module interactions specified
- [ ] Facade calls fully documented
- [ ] Event schemas defined
- [ ] Contract tests planned
- [ ] Tenant context propagation verified

### Coordinated Stories
- [ ] Story for each primary module created
- [ ] Dependencies between stories linked
- [ ] Acceptance criteria include integration requirements
- [ ] Coordination schedule realistic
- [ ] Sync points defined

### Cross-Cutting
- [ ] Feature aligns with master architecture
- [ ] Tenant isolation maintained across modules
- [ ] No single module creates bottleneck
- [ ] Risk mitigation strategies documented

### Story Quality
- [ ] Stories follow standard template
- [ ] Acceptance criteria are testable
- [ ] Estimates reasonable given dependencies
- [ ] Module owners have reviewed their stories

## Gate Decision

- **PASS**: All modules identified, dependencies clear, stories coordinated, integration planned
- **CONDITIONAL**: Minor gaps (e.g., some contracts pending — reference `{project-root}/_bmad/bam/data/templates/facade-contract-template.md` for contract definitions including method signatures, DTOs, error types, and tenant context requirements) -- document and proceed with risk awareness
- **FAIL**: Missing module identification, circular dependencies, or no integration strategy

Present validation results with specific findings for each component.



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

### Menu Options

**[A]nalyze** - Validation Analysis:
- A1: Analyze validation results by category
- A2: Review critical failures requiring immediate attention
- A3: Assess conditional items and their risk levels
- A4: Evaluate cross-module coordination completeness

**[P]ropose** - Validation Resolution Proposals:
- P1: Propose remediation for failed validation items
- P2: Suggest priority order for addressing gaps
- P3: Recommend conditional pass conditions
- P4: Propose follow-up validation scope

**[C]ontinue** - Proceed to report generation:
- C1: Continue to Step 22 (Generate Report) with validation results
- C2: Save current validation findings and pause

Select an option or provide feedback:

---

## Verification

- [ ] All checklist items evaluated
- [ ] Gate decision determined
- [ ] Findings documented per component
- [ ] Patterns align with pattern registry

## Outputs

- Validation report
- Pass/Fail determination
- Specific findings per component

## Next Step

Generate validation report and return results to user.
