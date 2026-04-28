# Step 5: Compile Cross-Module Epic

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
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics

---

## Purpose

Compile all cross-module story artifacts into a comprehensive epic document, generating the final output to `{output_folder}/planning-artifacts/cross-module-stories.md`.

---

## Prerequisites

- Steps 1-4 completed
- All module touchpoints mapped
- Integration stories defined
- Dependencies coordinated
- **Load template:** `{project-root}/_bmad/bam/data/templates/cross-module-story.md`

---

## Inputs

- Module architecture inventory (Step 1)
- Journey sequence diagrams (Step 2)
- Module-scoped story list (Step 3)
- Dependency matrix and milestones (Step 4)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Compile Epic Document

Generate comprehensive cross-module epic using template:

```markdown
# Cross-Module Epic: {Feature Name}

## Executive Summary
{One paragraph describing the cross-module feature and coordination approach}

## Modules Involved

| Module | Role | Owner | Contact |
|--------|------|-------|---------|
| {module} | Primary/Supporting/Observing | {team} | {contact} |

## User Journeys

### Journey 1: {Journey Name}
{Journey description and module sequence diagram}

## Module Stories

### {Module A} Stories
- [ ] {Story ID}: {Title} ({points} pts)
  - Dependencies: {deps}
  - Acceptance Criteria: {criteria}

### {Module B} Stories
- [ ] {Story ID}: {Title} ({points} pts)
  - Dependencies: {deps}
  - Acceptance Criteria: {criteria}

## Integration Stories
- [ ] INT-{id}: {Integration test description}

## Dependency Graph
{Visual dependency representation}

## Milestones
| Milestone | Date | Criteria |
|-----------|------|----------|
| M1 | {date} | {criteria} |

## Communication Plan
{Communication channels and escalation matrix}

## Risks and Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| {risk} | {impact} | {mitigation} |
```

### 2. Generate Output File

Write compiled epic to:
`{output_folder}/planning-artifacts/cross-module-stories.md`

### 3. Generate Supporting Artifacts

Create supporting files:
- `{output_folder}/planning-artifacts/stories/dependency-graph.md`
- `{output_folder}/planning-artifacts/stories/module-stories/{module}.md` (per module)
- `{output_folder}/planning-artifacts/stories/integration-tests.md`

### 4. Verify Completeness

Final verification checklist:

| Component | Status | Notes |
|-----------|--------|-------|
| Module inventory | Complete | {count} modules |
| Journey mapping | Complete | {count} journeys |
| Story splitting | Complete | {count} stories |
| Dependencies | Documented | {count} dependencies |
| Milestones | Defined | {count} milestones |

**Verify current best practices with web search:**
Search the web: "epic documentation best practices agile {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into epic completeness
- **[P] Party Mode**: Collaborative review of final artifact
- **[C] Continue**: Complete Create mode workflow

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Review epic completeness
- Identify missing elements
- Validate alignment with master architecture
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Collaborative epic review
- Generate enhancement suggestions
- Validate stakeholder acceptance
- Return to A/P/C menu

#### If 'C' (Continue):
- Save all artifacts
- Mark Create mode complete

### Menu Options

**[A]nalyze** - Epic Analysis:
- A1: Analyze epic document completeness
- A2: Review story coverage across modules
- A3: Assess dependency graph accuracy
- A4: Evaluate milestone timeline feasibility

**[P]ropose** - Epic Enhancements:
- P1: Propose additional stories for coverage gaps
- P2: Suggest dependency optimizations
- P3: Recommend milestone adjustments
- P4: Propose risk mitigation additions

**[C]ontinue** - Complete Create mode:
- C1: Finalize epic and complete workflow
- C2: Save current epic draft and pause for review

Select an option or provide feedback:

---

## Verification

- [ ] Epic document compiled with all sections
- [ ] Output written to `{output_folder}/planning-artifacts/cross-module-stories.md`
- [ ] Supporting artifacts generated
- [ ] All modules represented in story breakdown
- [ ] Dependencies accurately reflected
- [ ] Milestones include realistic dates
- [ ] Patterns align with pattern registry

---

## Outputs

- `{output_folder}/planning-artifacts/cross-module-stories.md` - Main epic document
- `{output_folder}/planning-artifacts/stories/dependency-graph.md` - Dependency visualization
- `{output_folder}/planning-artifacts/stories/module-stories/*.md` - Per-module story files
- `{output_folder}/planning-artifacts/stories/integration-tests.md` - Integration test plan

---


---

## SUCCESS METRICS:

- [ ] All required inputs gathered from user
- [ ] Design decisions documented with rationale
- [ ] User confirmed choices via A/P/C menu
- [ ] Output artifact updated with step content
- [ ] Frontmatter stepsCompleted updated

## FAILURE MODES:

- **Missing input:** Cannot proceed without required context - return to prerequisites
- **Unclear requirements:** Use Advanced Elicitation (A) to clarify
- **Conflicting constraints:** Use Party Mode (P) for multi-perspective analysis
- **User rejects output:** Iterate on design, do not force acceptance

## Next Step

Create mode complete. Run validation mode (`step-20-v-load.md`) to verify epic quality.

---

## Workflow Complete

Create mode is complete for cross-module-story workflow. The epic document and supporting artifacts have been generated. Consider running validation to verify completeness before sprint planning.
