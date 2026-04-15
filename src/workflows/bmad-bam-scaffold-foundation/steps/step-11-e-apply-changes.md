# Step 2: Apply Targeted Modifications

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

Apply requested modifications to foundation scaffold while respecting zone boundary rules.

## Prerequisites

- Step 1 completed with identified modifications
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries


---

## Inputs

- Loaded artifact from previous edit step
- Identified modification targets
- User-confirmed changes to apply
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Based on the user's requested changes:

1. Identify the affected scaffold components
2. Verify zone boundary compliance:
   - FROZEN zone changes require explicit override confirmation and ADR justification
   - EXTEND ONLY changes must be additions, not replacements
   - AUTONOMOUS zone changes are unrestricted

3. Present the current content of each affected file
4. Apply the requested modifications while preserving:
   - Zone boundary rules
   - Existing shared kernel contracts
   - Cross-references between components
   - Test fixture compatibility

5. If modifying core components, verify:
   - TenantContext interface unchanged (or migration plan provided)
   - BaseEntity contract preserved
   - EventBus interface compatibility maintained
   - Database session factory still functional

6. If modifying shared kernel, ensure:
   - Existing DTOs not removed (only deprecated)
   - Event contracts backward compatible
   - Exception hierarchy intact

7. Update zone boundary documentation if structure changed

8. Validate the modified scaffold against integrity checks:
   - `src/core/database.py` exports `AsyncSession`, `async_sessionmaker`
   - `src/core/tenant_context.py` exports `TenantContext`, `get_tenant_id()`
   - `src/core/base_entity.py` exports `BaseEntity` with `tenant_id: UUID`
   - `src/shared_kernel/events.py` exports `EventBus`, `DomainEvent`, `publish()`

9. Update foundation epics if new work identified

Present a diff summary of changes made and ask for confirmation.

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

- [ ] Changes applied correctly
- [ ] No unintended side effects
- [ ] Zone boundaries respected
- [ ] Patterns align with pattern registry

## Outputs

- Modified scaffold files with updated zone documentation

## Next Step

Return to workflow for validation or completion.
