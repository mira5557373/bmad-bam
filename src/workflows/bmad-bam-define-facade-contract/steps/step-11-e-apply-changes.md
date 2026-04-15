# Step 11: Apply Targeted Modifications

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

This step applies the identified changes to the existing facade contract artifact. Changes are applied incrementally while preserving unchanged operations, maintaining DTO reference validity, ensuring tenant context handling consistency, and updating version metadata appropriately.

Apply the requested changes to the existing facade contract.

## Prerequisites

- Step 10 (Load Existing Artifact) completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: facade-contracts`


---

## Inputs

- Loaded artifact from previous edit step
- Identified modification targets
- User-confirmed changes to apply
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

1. **Identify Affected Sections**
   - Determine which contract sections are impacted by the requested changes
   - Check for ripple effects (e.g., DTO changes affect multiple operations)
   - Note any potential breaking changes

2. **Present Current Content**
   - Show the current state of each affected section
   - Highlight the specific elements that will change

3. **Apply Modifications**
   - Update interface definitions as requested
   - Modify DTO schemas if needed
   - Update error codes if applicable
   - Preserve unchanged sections exactly

4. **Verify Contract Consistency**
   - Ensure all DTO references are still valid
   - Verify error codes are still referenced correctly
   - Check tenant context handling remains consistent

5. **Update Contract Metadata**
   - Increment version if changes are significant
   - Update change history with modification summary
   - Update last modified timestamp

## Output

Write updated contract to its original location.

Present a diff summary showing:
- Changed operations
- Modified DTOs
- Updated error codes
- Version change (if any)

Ask for confirmation before finalizing.

## Verification

- [ ] Changes identified correctly
- [ ] No unintended side effects
- [ ] All DTO references remain valid
- [ ] Tenant context handling consistent
- [ ] Patterns align with pattern registry

## Outputs

- Updated facade contract specification

---

## COLLABORATION MENUS (A/P/C)

> **Quick Actions** - Type the letter + number:
>
> **[A] Assist Options:**
> - `A1` - Help identify affected contract sections
> - `A2` - Clarify ripple effect implications
> - `A3` - Explain breaking vs non-breaking changes
> - `A4` - Review contract consistency requirements
>
> **[P] Proactive Options:**
> - `P1` - Suggest minimal change approach
> - `P2` - Flag potential breaking changes for consumers
> - `P3` - Recommend version increment strategy
> - `P4` - Identify DTO reference consistency issues
>
> **[C] Completion Options:**
> - `C1` - Validate all changes applied correctly
> - `C2` - Generate diff summary for review
> - `C3` - Verify contract consistency maintained
> - `C4` - **Complete Edit Mode** (return to workflow selection)

---

## PROTOCOL INTEGRATION

### A/P/C Handler
- **[A] Response:** Deep-dive into requested topic, then return to current step
- **[P] Response:** Acknowledge party mode, continue with enhanced engagement
- **[C] Response:** Proceed to next logical step in workflow

---

## Next Step

Edit mode complete. Return to workflow selection or proceed to validation.
