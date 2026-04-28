# Step 3: Define Integration Stories

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

Design integration stories by splitting work along module boundaries, verifying contract alignment, creating integration test stories, and defining rollout coordination plans.

---

## Prerequisites

- Step 2 completed: Module touchpoints mapped
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: facade-contracts
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-isolation

---

## Inputs

- Journey sequence diagrams from Step 2
- Facade invocation order matrix
- Event flow map
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- **Load template:** `{project-root}/_bmad/bam/data/templates/cross-module-story.md`

---

## Actions

### 1. Story Splitting by Module Boundary

For each cross-cutting journey, split into module-scoped stories:

| Epic | Module Story | Scope | Dependencies | Points |
|------|--------------|-------|--------------|--------|
| {epic_id} | {module}-{feature} | {boundary_scope} | {story_deps} | {estimate} |

**Splitting Criteria:**
- Each story stays within one module boundary
- Stories produce testable increments
- Integration points are explicit acceptance criteria
- No shared code changes across modules in single story

### 2. Contract Alignment Verification

Verify existing contracts support the integration:

| Contract | Required By | Supports Journey | Gap Analysis |
|----------|-------------|------------------|--------------|
| {contract} | {stories} | Yes/Partial/No | {gaps} |

**New Contracts Required:**

| Contract Name | Provider | Consumer | Schema | Priority |
|---------------|----------|----------|--------|----------|
| {new_contract} | {module} | {modules} | {schema_ref} | P1/P2/P3 |

### 3. Integration Test Stories

Define test stories for cross-module verification:

| Test Story | Tests | Modules | Test Type | Automation |
|------------|-------|---------|-----------|------------|
| INT-{id} | {journey} | {modules} | Contract/E2E | Yes/Manual |

**Test Categories:**
- Contract tests (provider/consumer)
- Integration tests (happy path)
- Failure injection tests
- Performance tests under load
- Tenant isolation verification

### 4. Rollout Coordination

Define coordination points for synchronized deployment:

| Phase | Stories | Gate | Teams | Duration |
|-------|---------|------|-------|----------|
| 1 | Contract definitions | Review | {teams} | {days} |
| 2 | Provider implementation | Test | {teams} | {days} |
| 3 | Consumer implementation | Integrate | {teams} | {days} |
| 4 | Integration testing | Validate | All | {days} |

**Verify current best practices with web search:**
Search the web: "user story splitting microservices {date}"
Search the web: "integration testing multi-module SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into story design decisions
- **[P] Party Mode**: Collaborative brainstorming on coordination
- **[C] Continue**: Proceed to dependency documentation

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Analyze story splitting alternatives
- Review contract gap remediation options
- Explore test coverage trade-offs
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Brainstorm story prioritization approaches
- Generate creative rollout strategies
- Explore parallel development opportunities
- Return to A/P/C menu

#### If 'C' (Continue):
- Verify integration stories defined
- Proceed to `step-04-c-document.md`

### Menu Options

**[A]nalyze** - Integration Story Analysis:
- A1: Analyze story splitting for completeness
- A2: Review contract alignment gaps
- A3: Assess test coverage adequacy
- A4: Evaluate rollout coordination risks

**[P]ropose** - Story Design Proposals:
- P1: Propose story splitting adjustments
- P2: Suggest contract consolidation opportunities
- P3: Recommend test automation priorities
- P4: Propose rollout phase optimizations

**[C]ontinue** - Proceed to next step:
- C1: Continue to Step 4 (Coordinate Dependencies)
- C2: Save current integration story design and pause

Select an option or provide feedback:

---

## Soft Gate Checkpoint

**Steps 1-3 complete the analysis and design phase.**

Present summary of:
- Stories split by module boundary
- Contract alignment status
- Integration test plan
- Rollout coordination phases

Ask for confirmation before proceeding to dependency documentation.

---

## Verification

- [ ] Stories split along module boundaries
- [ ] No single story crosses module boundaries
- [ ] Contract alignment verified or gaps documented
- [ ] Integration test stories defined
- [ ] Rollout coordination plan created
- [ ] Patterns align with pattern registry

---

## Outputs

- Module-scoped story list
- Contract alignment report
- Integration test story definitions
- Rollout coordination plan

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

Proceed to `step-04-c-document.md` to coordinate cross-team dependencies.
