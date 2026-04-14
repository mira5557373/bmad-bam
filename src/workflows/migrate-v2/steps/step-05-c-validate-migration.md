# Step 05: Validate Migration

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

Validate the migration is complete and all artifacts are v2 compatible.

---

## Prerequisites

- Step 04 completed: Template variables fixed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Verify No Remaining v1 References

Search for:
- `**Load knowledge:**` - should return 0 results
- `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: ` - should return 0 results
- `{{[A-Z_]+}}` in templates - should return 0 results

### 2. Validate Pattern References

Confirm all pattern references resolve to valid pattern IDs.

### 3. Validate Step File Structure

Confirm all step files have:
- MANDATORY EXECUTION RULES
- A/P/C Collaboration Menus
- Protocol Integration

### 4. Generate Migration Report

| Metric | Before | After |
|--------|--------|-------|
| Knowledge references | X | 0 |
| Uppercase variables | X | 0 |
| Pattern references | 0 | X |
| A/P/C menus | 0 | X |

---

## Soft Gate Checkpoint

**Migration validation complete.**

Present summary and ask for confirmation before proceeding to cleanup.

**Verify current best practices with web search:**
Search the web: "validate migration best practices {date}"
Search the web: "validate migration enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After validation, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation results
- **P (Party Mode)**: Bring QA perspectives on migration completeness
- **C (Continue)**: Accept validation and proceed to optional cleanup
- **[Specific concerns]**: Describe concerns about migration results

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: validation results, migration metrics
- Process enhanced insights on migration quality
- Ask user: "Accept this quality assessment? (y/n)"
- If yes, document quality status
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review BAM v1 to v2 migration validation results"
- Process QA perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Confirm migration validated
- Proceed to next step: `step-06-c-cleanup.md`

---

## Verification

- [ ] No v1 references remaining
- [ ] Pattern references valid
- [ ] Step file structure complete
- [ ] Migration report generated

---

## Outputs

- Migration validation report
- Migration metrics

---

## Next Step

Proceed to `step-06-c-cleanup.md` for optional cleanup of v1 artifacts.
