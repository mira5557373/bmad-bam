# Step 06: Cleanup (Optional)

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

Optionally remove v1 knowledge fragments after migration is validated.

---

## Prerequisites

- Step 05 completed: Migration validated
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Confirm Cleanup Decision

Ask user:
- Remove knowledge fragments now?
- Create backup before removal?
- Skip cleanup (keep v1 artifacts as reference)?

### 2. Create Backup (if requested)

Archive `src/knowledge/` to `src/knowledge-v1-backup/` or external location.

### 3. Remove Knowledge Fragments (if confirmed)

Delete `src/knowledge/` directory with all 79 files.

### 4. Update Documentation

Update CLAUDE.md and other documentation to reflect v2 architecture.

**Verify current best practices with web search:**
Search the web: "cleanup (optional) best practices {date}"
Search the web: "cleanup (optional) enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After presenting cleanup options, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into cleanup implications
- **P (Party Mode)**: Bring DevOps perspectives on artifact management
- **C (Continue)**: Proceed with cleanup decision and complete migration
- **[Skip]**: Skip cleanup and complete migration

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: cleanup options, backup status
- Process enhanced insights on cleanup implications
- Ask user: "Accept this cleanup assessment? (y/n)"
- If yes, document cleanup decision
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review v1 artifact cleanup options"
- Process DevOps perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Execute cleanup decision
- Complete migration workflow

---

## Verification

- [ ] Cleanup decision confirmed
- [ ] Backup created (if requested)
- [ ] Knowledge fragments removed (if confirmed)
- [ ] Documentation updated

---

## Outputs

- Migration completion report at `{output_folder}/planning-artifacts/migration-report.md`
- Optional: v1 backup archive

---

## Next Step

**Workflow Complete.**

The Create mode workflow is finished. To modify the output, use Edit mode (`step-10-e-*`). To verify the output meets quality criteria, use Validate mode (`step-20-v-*`).

---

## Workflow Complete

Create mode complete for bam-migrate-v2 workflow.
