# Step 3: Generate Epic Stories

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

Create user stories for each epic following module-scoped patterns.

---

## Prerequisites

- Epic boundaries identified (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-isolation,tenant-context-propagation

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Story Generation Rules

#### Granularity by Complexity

| Complexity | Story Granularity |
|------------|-------------------|
| SIMPLE     | Coarse (CRUD operations grouped into single stories) |
| STANDARD   | Standard (one story per feature, clear scope) |
| COMPLEX    | Fine (split by risk, dependencies, implementation order) |

#### Story Scoping Constraints

All stories must adhere to:

1. **Module boundary**: Implementable entirely within module boundary
2. **Tenant context**: Must specify tenant context requirements
3. **Facade contracts**: Cross-module needs reference facade contracts, not internal implementations
4. **AI behavior specs**: Include agent/tool requirements if applicable

### 2. Story Template

For each story, generate:

```markdown
### Story: {ID} - {Title}

**Epic:** {Epic Name}
**Module:** {Module Name}
**Priority:** P1/P2/P3

**As a** {persona}
**I want** {capability}
**So that** {benefit}

**Module Scope:**
- Aggregate(s): {affected aggregates}
- Facade methods: {new or modified facade methods}
- Events: {events published or consumed}

**Tenant Context:**
- Tenant isolation: {how tenant_id is enforced}
- Data ownership: {module-owned entities touched}

**AI Behaviors (if applicable):**
- Agent: {agent name}
- Tools required: {tool list}
- Memory scope: {session/user/tenant}

**Technical Notes:**
- {implementation guidance}
- {dependency on other stories or facades}
```

### 3. Story Ordering

Within each epic, order stories by:

1. Foundation stories (entities, repositories) first
2. Core operations (CRUD) second
3. Business logic third
4. AI-enabled features last (depend on core operations)

### 4. Generate Complete Story List

Generate complete story list organized by epic.

**Verify current best practices with web search:**
Search the web: "user story generation module patterns {date}"
Search the web: "story scoping bounded context {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After generating the stories, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into story details and dependencies
- **P (Party Mode)**: Bring analyst and developer perspectives for story validation
- **C (Continue)**: Accept stories and proceed to acceptance criteria
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: generated stories, ordering, dependencies
- Process enhanced insights on story quality
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into story list
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review generated stories: {story summary by epic}"
- Process collaborative analysis from analyst and developer personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save story list to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-define-acceptance-criteria.md`

---

## Verification

- [ ] Story granularity matches complexity
- [ ] All stories respect module boundary
- [ ] Tenant context specified in each story
- [ ] Facade contracts referenced (not internals)
- [ ] Stories ordered correctly within epics
- [ ] Patterns align with pattern registry

---

## Outputs

- Complete story list organized by epic
- Story ordering document
- **Load template:** `{project-root}/_bmad/bam/templates/story-template.md`

---

## Next Step

Proceed to `step-04-c-define-acceptance-criteria.md` to add acceptance criteria.
