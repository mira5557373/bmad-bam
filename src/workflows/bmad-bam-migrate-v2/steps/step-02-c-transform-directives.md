# Step 02: Transform Knowledge Directives

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

Transform all knowledge fragment references to pattern registry references.

---

## Prerequisites

- Step 01 completed: Migration inventory generated
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Transform Knowledge References

For each file in inventory, transform:

**Before:**
```markdown
**Load knowledge:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: {file}.md`
```

**After:**
```markdown
**Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `{pattern_id}`
```

### 2. Update Multiple References

When multiple knowledge files are referenced, combine filters:
```markdown
**Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `pattern1,pattern2`
```

### 3. Track Transformation Progress

| File | Knowledge Refs | Transformed | Status |
|------|---------------|-------------|--------|
| | | | |

### 4. Verify Transformations

Confirm each transformation is correct and pattern IDs are valid.

**Verify current best practices with web search:**
Search the web: "transform knowledge directives best practices {date}"
Search the web: "transform knowledge directives enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After transforming directives, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into transformation details
- **P (Party Mode)**: Bring architect perspectives on pattern mapping
- **C (Continue)**: Accept transformations and proceed to step files
- **[Specific concerns]**: Describe concerns about transformations

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: transformation results, pattern mappings
- Process enhanced insights on mapping accuracy
- Ask user: "Accept these mappings? (y/n)"
- If yes, document confirmed mappings
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review knowledge to pattern transformation accuracy"
- Process architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Confirm transformations complete
- Proceed to next step: `step-03-c-update-steps.md`

---

## Verification

- [ ] All knowledge references transformed
- [ ] Pattern IDs are valid
- [ ] Multiple references combined correctly

---

## Outputs

- Transformed files
- Transformation log

---

## Next Step

Proceed to `step-03-c-update-steps.md` to update step file structure.
