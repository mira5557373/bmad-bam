# Step 3: Create User Stories

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 💬 **Present stories with A/P/C menu** for user confirmation
- 📋 **INCLUDE tenant context** in all story definitions

## EXECUTION PROTOCOLS

- 🎯 Focus: Create user stories with tenant context, estimate points, map dependencies
- 💾 Track: `stepsCompleted: [1, 2, 3]` when complete
- 📖 Context: Stories must include multi-tenant considerations
- 🚫 Do NOT: Proceed without explicit user confirmation via A/P/C
- 🔍 Use web search: Verify story writing best practices for multi-tenant SaaS
- ⚠️ Gate: Stories must reference tenant isolation requirements

---

## CONTEXT BOUNDARIES

### Input Context

- **From Step 01:** Module context, epic categories
- **From Step 02:** Epic scope, acceptance criteria, multi-tenant considerations
- **Pattern registry:** `{project-root}/_bmad/bam/data/bam-patterns.csv`

### Output

- User stories with tenant context
- Story point estimates
- Dependency mapping
- Sprint allocation suggestions

### Quality Gate

- All stories include tenant context
- Dependencies properly mapped
- Stories are estimatable

---

## YOUR TASK

Create user stories for each epic defined in Step 2. Include tenant context in story format, estimate story points, map dependencies between stories, and suggest sprint allocation. Present stories via A/P/C menu for user confirmation.

---

## Main Sequence

### Action 1: Story Format with Tenant Context

Use the multi-tenant user story format:

```markdown
## Story Template

**Story ID:** S-{module}-{epic}-{number}
**Epic:** E-{module}-{epic_number}
**Title:** {Descriptive title}

### User Story
As a **{user_role}** in tenant **{tenant_type}**,
I want to **{action}**
So that **{business_value}**

### Tenant Context
- **Tenant Scope:** {tenant-scoped/global}
- **Tier Availability:** {Free/Pro/Enterprise}
- **Data Isolation:** {RLS/Schema/Database}
- **Rate Limits:** {tier-specific limits}

### Acceptance Criteria
- [ ] Given {precondition}, when {action}, then {expected_result}
- [ ] Given {precondition}, when {action}, then {expected_result}
- [ ] **TENANT:** Data is scoped to requesting tenant only
- [ ] **TENANT:** Cross-tenant access is blocked

### Technical Notes
- Implementation considerations
- Dependencies on other stories/modules
- Agent/AI considerations (if applicable)

### Estimation
- **Story Points:** {1/2/3/5/8/13}
- **Complexity:** {Low/Medium/High}
- **Risk:** {Low/Medium/High}
```

### Action 2: Generate Stories per Epic

For each epic from Step 2, create stories:

**Epic: E-{module}-001 - {Epic Title}**

| Story ID | Title | Points | Priority | Dependencies |
|----------|-------|--------|----------|--------------|
| S-{module}-001-01 | {title} | 3 | Must Have | None |
| S-{module}-001-02 | {title} | 5 | Must Have | S-001-01 |
| S-{module}-001-03 | {title} | 2 | Should Have | S-001-01 |
| S-{module}-001-04 | {title} | 8 | Must Have | S-001-02, S-001-03 |

**Story Details:**

```markdown
### S-{module}-001-01: {Title}

**User Story:**
As a **tenant administrator**,
I want to **{action}**
So that **{business_value}**

**Tenant Context:**
- Tenant Scope: tenant-scoped
- Tier Availability: All tiers
- Data Isolation: RLS policy applied
- Rate Limits: Standard tier limits

**Acceptance Criteria:**
- [ ] Given a valid tenant context, when user performs action, then result is tenant-scoped
- [ ] Given an invalid tenant context, when user attempts action, then access is denied
- [ ] **TENANT:** All data operations filter by tenant_id
- [ ] **TENANT:** Audit log captures tenant context

**Story Points:** 3
**Priority:** Must Have
**Sprint:** Sprint 1
```

### Action 3: Story Point Estimation

Use Fibonacci estimation with multi-tenant complexity:

| Points | Effort | Complexity | Example |
|--------|--------|------------|---------|
| **1** | Hours | Trivial | Config change, simple query |
| **2** | < 1 day | Simple | Single endpoint, no tenant logic |
| **3** | 1-2 days | Standard | Tenant-scoped CRUD |
| **5** | 3-5 days | Complex | Multi-table tenant operations |
| **8** | 1 week | Very Complex | Cross-module integration |
| **13** | 1-2 weeks | Highly Complex | Agent workflow, complex isolation |

**Multi-Tenant Complexity Factors:**

| Factor | Points Modifier |
|--------|-----------------|
| RLS policy implementation | +2 |
| Cross-tenant prevention tests | +1 |
| Tier-specific behavior | +1 per tier |
| Agent tenant isolation | +3 |
| Data migration concerns | +2 |

### Action 4: Dependency Mapping

Map dependencies between stories:

```
┌─────────────────────────────────────────────────────────────────┐
│                    Story Dependency Graph                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   S-001-01 (Foundation)                                         │
│        │                                                        │
│        ├──────► S-001-02 (Build on 01)                         │
│        │                                                        │
│        └──────► S-001-03 (Parallel)                            │
│                      │                                          │
│                      └──────► S-001-04 (Needs 02 + 03)         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

| Story | Depends On | Blocks | Can Parallel |
|-------|------------|--------|--------------|
| S-001-01 | None | S-001-02, S-001-03 | None |
| S-001-02 | S-001-01 | S-001-04 | S-001-03 |
| S-001-03 | S-001-01 | S-001-04 | S-001-02 |
| S-001-04 | S-001-02, S-001-03 | None | None |

### Action 5: Sprint Allocation Suggestions

Allocate stories to sprints based on dependencies and capacity:

**Sprint Planning:**

| Sprint | Velocity | Stories | Total Points |
|--------|----------|---------|--------------|
| Sprint 1 | 20 | S-001-01, S-001-02, S-002-01 | 18 |
| Sprint 2 | 20 | S-001-03, S-001-04, S-002-02 | 21 |
| Sprint 3 | 20 | S-002-03, S-002-04, S-003-01 | 19 |

**Sprint 1 Detail:**

```markdown
## Sprint 1: Foundation

**Goal:** Establish core tenant-scoped functionality

**Stories:**
1. S-001-01 (3 pts) - {title} - Must Have
2. S-001-02 (5 pts) - {title} - Must Have
3. S-002-01 (5 pts) - {title} - Must Have

**Total Points:** 13
**Capacity:** 20
**Buffer:** 7 points

**Dependencies Resolved:**
- S-001-01 completes before S-001-02
- No external module dependencies

**Tenant Milestones:**
- RLS policies implemented
- Tenant context propagation working
```

### Action 6: Web Research Verification

**Verify current best practices with web search:**

Search the web: "user story best practices multi-tenant {date}"
Search the web: "story point estimation agile {date}"
Search the web: "sprint planning dependencies {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

After presenting stories:

```
================================================================================
USER STORIES CREATED
================================================================================

MODULE: {module_name}
TOTAL STORIES: {story_count}
TOTAL POINTS: {total_points}

EPIC BREAKDOWN:
- E-{module}-001: {count} stories ({points} pts)
- E-{module}-002: {count} stories ({points} pts)
- E-{module}-003: {count} stories ({points} pts)

SPRINT ALLOCATION:
- Sprint 1: {sprint1_points} pts
- Sprint 2: {sprint2_points} pts
- Sprint 3: {sprint3_points} pts

TENANT CONTEXT: All stories include tenant isolation requirements

================================================================================
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific stories or estimates
- **P (Party Mode)**: Gather Dev Team and Product Owner perspectives
- **C (Continue)**: Accept stories and proceed to done criteria

Select an option:
================================================================================
```

### If 'A' (Advanced Elicitation)

Invoke `bmad-advanced-elicitation` skill to explore:

| Topic | Questions to Explore |
|-------|---------------------|
| **Story Granularity** | Are stories too large? Should we split? |
| **Estimates** | Are point estimates accurate? |
| **Dependencies** | Are all dependencies captured? |
| **Tenant Context** | Is tenant isolation properly addressed? |
| **Sprint Allocation** | Is the allocation realistic? |

Pass context: Stories, estimates, dependencies, sprint plan, specific concerns.

**After processing enhanced insights, return to A/P/C menu.**

### If 'P' (Party Mode)

Invoke `bmad-party-mode` skill with context:

```
Review user stories for module {module_name}:
- Stories: {story_count} totaling {total_points} pts
- Sprints: {sprint_count} sprints planned
- Tenant Model: {tenant_model}
```

Gather perspectives from:

| Persona | Focus Area | Key Questions |
|---------|------------|---------------|
| **Dev Team** | Feasibility | Are estimates realistic? |
| **Product Owner** | Value | Are stories delivering user value? |
| **Scrum Master** | Process | Is sprint allocation achievable? |
| **QA** | Testability | Are acceptance criteria testable? |

Process multi-perspective analysis and synthesize into refined stories.

**After processing perspectives, return to A/P/C menu.**

### If 'C' (Continue)

1. Record the stories in working document:

```yaml
# Add to module epics document
stories:
  total_count: {story_count}
  total_points: {total_points}
  by_epic:
    E-{module}-001:
      count: {count}
      points: {points}
      stories:
        - id: S-{module}-001-01
          title: {title}
          points: 3
          sprint: 1
  sprint_allocation:
    sprint_1: {points}
    sprint_2: {points}
    sprint_3: {points}
stories_completed_at: {timestamp}
```

2. Update workflow state:

```yaml
stepsCompleted:
  - step-01-c-start
  - step-02-c-analyze
  - step-03-c-design  # Add this
currentStep: step-04-c-document
```

3. Proceed to NEXT STEP.

---

## SUCCESS METRICS

- ✅ All epics have user stories
- ✅ Stories include tenant context
- ✅ Story points estimated
- ✅ Dependencies mapped
- ✅ Sprint allocation suggested
- ✅ Web research completed
- ✅ User confirmed stories via A/P/C menu

---

## FAILURE MODES

- ❌ **Stories without tenant context:** Add tenant isolation requirements
- ❌ **Unrealistic estimates:** Re-estimate with team input
- ❌ **Missing dependencies:** Map all story relationships
- ❌ **Overloaded sprints:** Rebalance sprint allocation
- ❌ **Proceeding without A/P/C:** User not engaged in story decisions

---

## Verification

- [ ] All epics have stories
- [ ] Stories include tenant context
- [ ] Points estimated for all stories
- [ ] Dependencies mapped
- [ ] Sprint allocation completed
- [ ] Web research completed
- [ ] Patterns align with pattern registry

---

## Outputs

- User stories with tenant context
- Story point estimates
- Dependency mapping
- Sprint allocation suggestions
- Web research findings

---

## NEXT STEP

After user confirms stories with 'C':

1. Record the stories in working document
2. Proceed to `step-04-c-document.md` to define done criteria
3. The stories inform:
   - Quality gate requirements per story
   - Test coverage expectations
   - Review checkpoints

**Transition to Step 04 with:**
- Stories: `{story_count}` stories defined
- Points: `{total_points}` total
- Sprints: `{sprint_count}` sprints allocated
