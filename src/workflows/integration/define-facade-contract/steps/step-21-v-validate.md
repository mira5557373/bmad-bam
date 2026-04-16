# Step 21: Validate Facade Contract

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

Validate the facade contract against quality criteria, ensuring proper versioning, complete interface definitions with tenant context, well-defined DTOs, and comprehensive error handling aligned with master architecture boundary rules.

## Prerequisites

- Previous step completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: facade-contracts`

## Validation Checklist

### Contract Structure
- [ ] Contract has valid version (semver format)
- [ ] Provider module is identified
- [ ] Contract status is specified (draft/published/deprecated)
- [ ] Change history is documented

### Interface Definitions
- [ ] All operations have clear method signatures
- [ ] Operations include tenant context parameter
- [ ] Query operations return defined response types
- [ ] Command operations specify success/failure outcomes
- [ ] Operations are use-case-oriented (not CRUD)

### Data Transfer Objects
- [ ] All DTOs have complete schema definitions
- [ ] Required vs optional fields are marked
- [ ] Field-level validation rules are documented
- [ ] No internal domain objects exposed directly
- [ ] Pagination strategy defined for collections

### Tenant Context
- [ ] Tenant context propagation method specified
- [ ] All operations respect tenant boundaries
- [ ] Context validation rules documented
- [ ] Missing context handling defined

### Error Handling
- [ ] Error response schema defined
- [ ] Error codes enumerated with descriptions
- [ ] Retriable errors identified
- [ ] Partial failure handling documented (for batch operations)

### Cross-Cutting
- [ ] Contract consistent with master architecture boundary rules
- [ ] Shared kernel types used for common concepts
- [ ] No circular dependencies between modules

## Gate Decision

- **PASS**: All checklist items complete, no inconsistencies
- **CONDITIONAL**: Minor documentation gaps - note gaps and proceed
- **FAIL**: Missing interface definitions, undefined DTOs, or no tenant context handling - return to Create/Edit mode

Present validation results with specific findings for each category.

## Verification

- [ ] Artifact loaded successfully
- [ ] All required sections present
- [ ] Patterns align with pattern registry

## Outputs

- Loaded artifact for validation
- Validation checklist



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

> **Quick Actions** - Type the letter + number:
>
> **[A] Assist Options:**
> - `A1` - Help evaluate contract structure
> - `A2` - Clarify interface definition requirements
> - `A3` - Explain DTO validation criteria
> - `A4` - Review tenant context validation rules
>
> **[P] Proactive Options:**
> - `P1` - Suggest validation improvements
> - `P2` - Flag missing tenant context handling
> - `P3` - Recommend error handling enhancements
> - `P4` - Identify cross-cutting concerns
>
> **[C] Completion Options:**
> - `C1` - Complete validation checklist
> - `C2` - Determine gate decision (PASS/CONDITIONAL/FAIL)
> - `C3` - Document validation findings
> - `C4` - **Proceed to Step 22** (generate report)

---

## PROTOCOL INTEGRATION

### A/P/C Handler
- **[A] Response:** Deep-dive into requested topic, then return to current step
- **[P] Response:** Acknowledge party mode, continue with enhanced engagement
- **[C] Response:** Proceed to next logical step in workflow

---

## Next Step

Return to workflow selection.
