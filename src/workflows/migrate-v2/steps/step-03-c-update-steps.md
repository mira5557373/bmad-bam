# Step 03: Update Step File Structure

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics

---

## Purpose

Update step files to include BMM-compatible structure including MANDATORY EXECUTION RULES and A/P/C collaboration menus.

---

## Prerequisites

- Step 02 completed: Knowledge directives transformed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Add MANDATORY EXECUTION RULES

Add to each step file header:

```markdown
## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
```

### 2. Add A/P/C Collaboration Menus

Add COLLABORATION MENUS section to each step file.

### 3. Add Protocol Integration

Add handlers for A (Advanced Elicitation), P (Party Mode), and C (Continue).

### 4. Track Update Progress

| Step File | Rules Added | A/P/C Added | Status |
|-----------|-------------|-------------|--------|
| | | | |

**Verify current best practices with web search:**
Search the web: "update step file structure best practices {date}"
Search the web: "update step file structure enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After updating step files, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into step file structure
- **P (Party Mode)**: Bring QA perspectives on structure consistency
- **C (Continue)**: Accept updates and proceed to template variables
- **[Specific concerns]**: Describe concerns about step file updates

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: step file updates, structure analysis
- Process enhanced insights on BMM compliance
- Ask user: "Accept this structure analysis? (y/n)"
- If yes, document compliance status
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review step file structure updates for BMM compliance"
- Process QA perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Confirm step files updated
- Proceed to next step: `step-04-c-fix-variables.md`

---

## Soft Gate Checkpoint

**Steps 1-3 complete the structural migration phase.**

Present summary of:
- Inventory of files migrated
- Directives transformed count
- Step files updated with BMM structure

Ask for confirmation before proceeding to template variable fixes.

---

## Verification

- [ ] MANDATORY EXECUTION RULES added to all steps
- [ ] A/P/C menus added to all steps
- [ ] Protocol integration complete

---

## Outputs

- Updated step files
- Update log

---

## Next Step

Proceed to `step-04-c-fix-variables.md` to fix template variables.
