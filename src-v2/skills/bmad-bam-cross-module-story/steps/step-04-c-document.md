# Step 4: Coordinate Dependencies

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


## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Gathering required inputs for this step
- Making design decisions within step scope
- Documenting decisions with rationale

**OUT OF SCOPE:**
- Decisions from other steps
- Implementation details
- Validation (separate mode)
## Purpose

Document and coordinate cross-team dependencies, blocking relationships, integration milestones, and communication plans for synchronized cross-module delivery.

---

## Prerequisites

- Step 3 completed: Integration stories defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: facade-contracts

---

## Inputs

- Module-scoped story list from Step 3
- Contract alignment report
- Rollout coordination plan
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Cross-Team Dependencies

Document dependencies between teams owning different modules:

| Story | Owner Team | Depends On | Blocking Team | Type | Status |
|-------|------------|------------|---------------|------|--------|
| {story_id} | {team_a} | {story_id} | {team_b} | Contract/Data/Event | Pending/Resolved |

**Dependency Types:**
- **Contract:** Requires facade contract definition
- **Data:** Requires data schema or migration
- **Event:** Requires event schema or handler
- **Infrastructure:** Requires shared infrastructure changes

### 2. Blocking Relationships

Identify and visualize blocking chains:

```
[Story A] ─blocks─► [Story B] ─blocks─► [Story C]
    │
    └─blocks─► [Story D]
```

| Blocker | Blocked Stories | Critical Path | Estimated Delay Risk |
|---------|-----------------|---------------|---------------------|
| {story} | {stories} | Yes/No | {days} |

### 3. Integration Milestone Definition

Define milestones for coordinated delivery:

| Milestone | Description | Date | Criteria | Owner |
|-----------|-------------|------|----------|-------|
| M1 | Contract Review | {date} | All contracts defined and reviewed | {team} |
| M2 | Provider Ready | {date} | Provider implementations complete | {teams} |
| M3 | Consumer Ready | {date} | Consumer integrations complete | {teams} |
| M4 | Integration Test | {date} | All integration tests passing | QA |
| M5 | Release Ready | {date} | Production deployment approved | Release |

### 4. Communication Plan

Define communication channels and cadence:

| Channel | Purpose | Participants | Frequency |
|---------|---------|--------------|-----------|
| Standup | Daily sync on blockers | All teams | Daily |
| Integration Review | Contract/schema review | Tech leads | Weekly |
| Milestone Demo | Progress demonstration | All stakeholders | Per milestone |
| Escalation | Blocker resolution | Management | As needed |

**Escalation Matrix:**

| Issue Type | First Contact | Escalation | Final Escalation |
|------------|---------------|------------|------------------|
| Blocker | Team lead | Engineering Manager | VP Engineering |
| Contract dispute | Architect | Principal Architect | CTO |
| Resource conflict | PM | Program Manager | VP Product |

**Verify current best practices with web search:**
Search the web: "cross-team dependency management agile {date}"
Search the web: "integration milestone planning enterprise {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into dependency resolution
- **[P] Party Mode**: Collaborative problem-solving on blockers
- **[C] Continue**: Proceed to epic compilation

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Analyze critical path dependencies
- Identify hidden blocking relationships
- Explore parallel work opportunities
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Brainstorm dependency reduction strategies
- Generate creative milestone definitions
- Explore communication improvements
- Return to A/P/C menu

#### If 'C' (Continue):
- Verify dependency coordination complete
- Proceed to `step-05-c-complete.md`

### Menu Options

**[A]nalyze** - Dependency Analysis:
- A1: Analyze critical path for bottlenecks
- A2: Review blocking chain implications
- A3: Assess milestone feasibility
- A4: Evaluate communication plan effectiveness

**[P]ropose** - Coordination Proposals:
- P1: Propose dependency reduction strategies
- P2: Suggest blocking relationship mitigations
- P3: Recommend milestone adjustments
- P4: Propose communication enhancements

**[C]ontinue** - Proceed to next step:
- C1: Continue to Step 5 (Compile Cross-Module Epic)
- C2: Save current dependency coordination and pause

Select an option or provide feedback:

---

## Verification

- [ ] All cross-team dependencies documented
- [ ] Blocking relationships identified and visualized
- [ ] Integration milestones defined with dates
- [ ] Communication plan established
- [ ] Escalation matrix defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Cross-team dependency matrix
- Blocking relationship diagram
- Integration milestone schedule
- Communication plan document
- Escalation matrix

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

Proceed to `step-05-c-complete.md` to compile the final cross-module epic.
