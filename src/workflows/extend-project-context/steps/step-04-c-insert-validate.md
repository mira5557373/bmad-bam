# Step 04: Insert and Validate

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

Insert the generated BAM section into project-context.md and validate the result.

---

## Prerequisites

- Step 03 completed: BAM section generated
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-isolation

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Insert BAM Section

Insert the generated BAM section at the identified insertion point in project-context.md.

### 2. Validate Section Structure

Verify:
- Section header is properly formatted
- Subsections are complete
- Pattern references are valid
- No markdown formatting errors

### 3. Verify File Integrity

Check:
- File still parses as valid markdown
- Other sections unchanged
- No duplicate content

### 4. Present Final Result

Show the user the updated project-context.md with the new BAM section highlighted.

**Verify current best practices with web search:**
Search the web: "insert and validate best practices {date}"
Search the web: "insert and validate enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After inserting and validating, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation results
- **P (Party Mode)**: Bring QA perspectives on the update
- **C (Continue)**: Accept the update and complete workflow
- **[Specific concerns]**: Describe concerns about the update

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: updated project-context.md, validation results
- Process enhanced insights on update quality
- Ask user: "Accept this validation analysis? (y/n)"
- If yes, document validation results
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review project-context.md update for BAM configuration"
- Process QA and architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Confirm update is complete
- Document completion status
- Complete workflow

---

## Verification

- [ ] BAM section inserted correctly
- [ ] Section structure valid
- [ ] File integrity maintained
- [ ] User confirmed acceptance

---

## Outputs

- Updated project-context.md with BAM configuration section

---

## Next Step

**Workflow Complete.**

The Create mode workflow is finished. To modify the output, use Edit mode (`step-10-e-*`). To verify the output meets quality criteria, use Validate mode (`step-20-v-*`).

---

## Workflow Complete

Create mode complete for bam-extend-project-context workflow.
