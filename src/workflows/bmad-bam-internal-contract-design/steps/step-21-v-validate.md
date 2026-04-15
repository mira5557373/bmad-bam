# Step 2: Validate Internal Contract Design

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

Validate the internal contract design artifacts against quality criteria and architectural standards.

## Prerequisites

- Previous step completed (step-20-v-load-artifact.md)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: facade-contracts`

## Validation Checklist

### Interface Identification
- [ ] All internal interfaces inventoried
- [ ] Interfaces properly classified (facade/service/data/integration)
- [ ] Provider and consumer components identified
- [ ] Criticality assessed for each interface

### Contract Definitions
- [ ] All contracts have formal definitions
- [ ] Method signatures complete with types
- [ ] Input/output schemas defined
- [ ] Error types documented
- [ ] Behavior contracts specified (pre/post conditions)

### Boundaries
- [ ] Access boundaries defined (auth, tenant scope)
- [ ] Performance boundaries specified (SLO, limits)
- [ ] Reliability boundaries documented (retry, fallback)
- [ ] Dependency boundaries clear (upstream/downstream)
- [ ] Boundary enforcement mechanisms defined

### Documentation
- [ ] Contract overview complete
- [ ] All methods documented with examples
- [ ] Test specifications defined
- [ ] Change history maintained
- [ ] Consumer migration guides (if breaking changes)

### Cross-Cutting
- [ ] Contracts follow master architecture patterns
- [ ] Tenant context required in all cross-boundary calls
- [ ] Versioning strategy consistent
- [ ] No circular dependencies between contracts

### Implementation Alignment
- [ ] Contracts match actual code interfaces
- [ ] Contract tests exist and pass
- [ ] No undocumented public interfaces

## Gate Decision

- **PASS**: All contracts defined, boundaries clear, documentation complete, tests specified
- **CONDITIONAL**: Minor gaps (e.g., some examples pending — include: 1) Successful facade call with tenant context propagation, 2) Error handling for unauthorized cross-tenant access, 3) Timeout/retry behavior for slow downstream services) - document and proceed
- **FAIL**: Missing contract definitions, undefined boundaries, or no test specifications

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

**[A]pprove** - Validation findings accepted, proceed to report generation
**[P]ause** - Review validation findings in detail
**[C]oncern** - Discuss specific validation failures or gate decision rationale

Select an option:

---

## Verification

- [ ] All validation checklist items evaluated
- [ ] Gate decision determined (PASS/CONDITIONAL/FAIL)
- [ ] Findings documented with specific details
- [ ] Patterns align with pattern registry

## Outputs

- Validation report with findings
- Gate decision with rationale
- Remediation recommendations (if CONDITIONAL or FAIL)

## Next Step

Return to workflow selection or proceed to remediation if validation failed.
