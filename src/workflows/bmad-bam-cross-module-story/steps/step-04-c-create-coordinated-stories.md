# Step 4: Create Coordinated Stories

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

Generate individual module stories that together deliver the feature.

## Prerequisites

- Integration points defined (Step 3)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-isolation


---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

## Story Structure

For each primary module, create:

**Epic Story:**
```markdown
# [Module Name]: [Feature Name]

## Summary
Brief description of this module's contribution to the feature.

## Dependencies
- Depends on: [list of blocking stories]
- Blocks: [list of stories waiting on this]

## Acceptance Criteria
- [ ] Criteria 1
- [ ] Criteria 2

## Integration Points
- Facade: [facade being exposed/consumed]
- Events: [events being published/consumed]

## Tenant Isolation
- [ ] Tenant context propagated
- [ ] RLS enforced
- [ ] No cross-tenant data access
```

**Sub-Stories:**
- Implementation tasks
- Contract definition tasks
- Test creation tasks
- Documentation tasks

## Coordination Schedule

| Phase | Module | Story | Duration | Dependencies |
|-------|--------|-------|----------|--------------|
| 1 | ... | Contract definition | 2d | None |
| 2 | ... | Core implementation | 5d | Phase 1 |
| 3 | ... | Integration | 3d | Phase 2 |

## Sync Points

Define coordination checkpoints:
- Contract review milestone
- Integration testing milestone
- End-to-end validation milestone
- Release readiness milestone

## Risk Mitigation

For each risk identified:
- Mitigation strategy
- Fallback plan
- Owner responsible

## Story Linking

- Link all stories to parent epic
- Set up dependency relationships
- Configure notifications for blockers
- Establish progress tracking dashboard

**Verify current best practices with web search:**
Search the web: "create coordinated stories best practices {date}"
Search the web: "create coordinated stories enterprise SaaS {date}"

_Source: [URL]_

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

### Menu Options

**[A]nalyze** - Cross-Module Story Analysis:
- A1: Analyze story dependency chain completeness
- A2: Review coordination schedule feasibility
- A3: Assess sync point alignment across modules
- A4: Evaluate risk mitigation coverage

**[P]ropose** - Story Coordination Proposals:
- P1: Propose story prioritization adjustments
- P2: Suggest coordination schedule optimizations
- P3: Recommend additional sync points for cross-module alignment
- P4: Propose risk mitigation enhancements

**[C]ontinue** - Complete Create mode:
- C1: Finalize coordinated stories and complete workflow
- C2: Save current story coordination and pause

Select an option or provide feedback:

---

## Verification

- [ ] Epic story for each primary module
- [ ] Sub-stories created
- [ ] Coordination schedule defined
- [ ] Sync points established
- [ ] Risks mitigated
- [ ] Stories linked
- [ ] Patterns align with pattern registry

## Outputs

- Coordinated module stories
- Dependency relationships
- Schedule

## Next Step

Begin implementation following coordination schedule.
