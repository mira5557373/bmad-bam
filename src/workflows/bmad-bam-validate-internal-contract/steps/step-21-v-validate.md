# Step 21: Validate Internal Contract

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

## Purpose

This step performs validation of the internal contract against quality criteria, ensuring that module boundaries, encapsulation, tenant context flow, and error handling are properly defined.

## Prerequisites

- Step 20: Load Artifact completed successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `module-boundaries`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `tenant-isolation`

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

## Verification

### Contract Structure
- [ ] Contract follows naming convention
- [ ] Internal APIs clearly defined with signatures
- [ ] Component boundaries documented
- [ ] Dependency injection points specified
- [ ] Module responsibilities clear

### Encapsulation
- [ ] Public vs private APIs clearly distinguished
- [ ] Internal implementation details hidden
- [ ] Module boundaries respected
- [ ] No leaky abstractions
- [ ] Interface segregation principle followed

### Tenant Context Flow
- [ ] Tenant context flows through internal APIs
- [ ] Context not lost in internal calls
- [ ] Isolation maintained at component level
- [ ] No tenant context shortcuts or bypasses
- [ ] Context propagation documented

### Error Handling
- [ ] Internal error codes defined
- [ ] Error propagation to facade documented
- [ ] Recovery strategies specified
- [ ] Error boundaries defined
- [ ] Graceful degradation patterns

### Cross-Cutting
- [ ] All internal APIs maintain tenant context
- [ ] Error handling is consistent
- [ ] Encapsulation rules are followed
- [ ] Patterns align with pattern registry

#### Checkpoint: Validation Complete

Before proceeding, confirm:
- [ ] All verification sections reviewed
- [ ] Gate decision determined
- [ ] Gaps documented (if any)

**STOP: Present the A/P/C menu to the user**

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

## Gate Decision

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` → filter: `QG-M2`

**Load Checklist:** `{project-root}/_bmad/bam/data/checklists/qg-m1-module-architecture.md`

- **PASS**: All validation areas covered, no critical failures, encapsulation maintained
- **CONDITIONAL**: Minor gaps in documentation - note gaps for remediation
- **FAIL**: Critical encapsulation violations, tenant context leakage, or error handling incomplete - return to design workflow

Present validation results with specific findings for each category.

## Outputs

- Validated internal contract assessment
- Validation gate decision (PASS/CONDITIONAL/FAIL)
- Coverage gaps documented (if CONDITIONAL)
- Re-design requirements (if FAIL)

## Next Step

Proceed to Step 22: Generate Validation Report to compile final validation report and determine workflow completion status.
