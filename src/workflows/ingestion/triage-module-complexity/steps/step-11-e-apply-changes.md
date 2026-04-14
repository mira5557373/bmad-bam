# Step 11: Apply Targeted Modifications (Edit Mode)

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

This step applies the identified changes to the existing complexity assessment artifact. Changes are applied incrementally while preserving score history, recalculating classification when necessary, and maintaining consistency between question scores and overall complexity determination.

## Prerequisites

- Step 10 (Load Existing Artifact) completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: module-boundaries`


---

## Inputs

- Loaded artifact from previous edit step
- Identified modification targets
- User-confirmed changes to apply
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Based on the user's requested changes:

1. **Identify affected questions:**
   - Which of Q1-Q8 need re-evaluation
   - Whether new evidence affects existing scores
   - If classification change is required

2. **Re-assess specified questions:**
   - Apply the same assessment criteria from Steps 2-3
   - Document new evidence supporting score change
   - Note what changed since previous assessment

3. **Recalculate classification:**
   - Sum updated Q1-Q8 scores
   - Re-apply one-way upgrade rule
   - Compare new vs. previous classification

4. **Handle classification changes:**
   - If upgrading (SIMPLE→STANDARD or STANDARD→COMPLEX):
     - Document additional requirements triggered
     - Note impact on sprint planning
   - If downgrading (rare, requires explicit justification):
     - Document why previous assessment was incorrect
     - Confirm with user before applying

5. **Update artifacts:**
   - Write updated complexity-assessment.md
   - Update sprint-status.yaml with new scores
   - Add change history/rationale

6. **Validate consistency:**
   - Verify score breakdown matches total
   - Confirm upgrade rule correctly applied
   - Check classification aligns with score range

Present a diff summary showing:
- Previous scores vs. new scores
- Classification change (if any)
- Impact on implementation approach

Ask for confirmation before finalizing changes.

## Verification

- [ ] Changes identified correctly
- [ ] No unintended side effects
- [ ] Score breakdown matches total
- [ ] Upgrade rule correctly applied
- [ ] Patterns align with pattern registry

## Outputs

- Updated complexity-assessment.md
- Updated sprint-status.yaml (complexity section)

## Next Step

Edit mode complete. Return to workflow selection or proceed to validation.

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
