# Step 2: Validate Foundation Scaffold

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

Validate the foundation scaffold against quality criteria, ensuring directory structure matches requirements, core components exist in FROZEN zones, shared kernel implements required interfaces, and master architecture alignment is maintained.

## Prerequisites

- Step 01 completed: Artifact loaded successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries

## Validation Checklist

### Directory Structure
- [ ] `src/core/` exists with required files
- [ ] `src/shared_kernel/` exists with required files
- [ ] `src/control_plane/` structure present
- [ ] `src/ai_runtime/` structure present
- [ ] `src/modules/` directory exists for future modules
- [ ] `tests/` mirrors src structure
- [ ] `alembic/` migration directory present

### Core Components (FROZEN Zone)
- [ ] `src/core/database.py` exists and exports `AsyncSession`, `async_sessionmaker`
- [ ] `src/core/tenant_context.py` exists and exports `TenantContext`, `get_tenant_id()`
- [ ] `src/core/base_entity.py` exists and exports `BaseEntity` with `tenant_id: UUID`
- [ ] `src/core/config.py` exists with environment configuration

### Shared Kernel (EXTEND ONLY Zone)
- [ ] `src/shared_kernel/events.py` exists and exports `EventBus`, `DomainEvent`, `publish()`
- [ ] `src/shared_kernel/dtos.py` exists with common DTOs
- [ ] `src/shared_kernel/exceptions.py` exists with base exception hierarchy
- [ ] `src/shared_kernel/value_objects.py` exists with common value objects

### Zone Boundaries
- [ ] `ZONE_BOUNDARIES.md` exists and documents all zones
- [ ] FROZEN zone files match scaffold originals (no unauthorized changes)
- [ ] EXTEND ONLY files have additions only (no removals)

### Master Architecture Alignment
- [ ] Technology stack matches master architecture decisions
- [ ] Tenant model implementation matches isolation strategy
- [ ] Shared kernel interfaces match defined contracts
- [ ] AI runtime structure matches requirements

### Foundation Epics
- [ ] `foundation-epics.md` exists
- [ ] Shared Kernel epic defined
- [ ] Control-Plane epic defined
- [ ] AI Runtime epic defined

## Gate Decision

- **PASS**: All scaffold components present, zone boundaries intact, master architecture aligned
- **CONDITIONAL**: Minor gaps (e.g., optional components missing) - document gaps and proceed
- **FAIL**: Missing core components, zone violations, or master architecture misalignment - return to Create mode

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

- [ ] All checklist items evaluated
- [ ] Gate decision determined
- [ ] Findings documented per category
- [ ] Patterns align with pattern registry

## Outputs

- Validation report
- Pass/Fail determination
- Specific findings per category

## Next Step

On PASS, foundation scaffold is ready for implementation. Proceed to implement foundation epics, then run `validate-foundation` for QG-F1.
