# Step 2: Map Module Touchpoints

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

Analyze and map the touchpoints where modules interact for each cross-cutting user journey, documenting the sequence of facade invocations, event flows, and data transformation points.

---

## Prerequisites

- Step 1 completed: Module architectures and journeys identified
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: facade-contracts
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-context-propagation

---

## Inputs

- Cross-cutting journey list from Step 1
- Module architectures and facade contracts
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Journey Sequence Mapping

For each cross-cutting journey, document the module sequence:

```
User Action → Module A → Module B → Module C → Response
     │            │           │           │
     └── Step 1 ──┴── Step 2 ─┴── Step 3 ─┘
```

| Step | From | To | Interaction Type | Data Flow |
|------|------|----|------------------|-----------|
| 1 | User/API | Module A | Request | {input_data} |
| 2 | Module A | Module B | Facade Call | {transformed_data} |
| 3 | Module B | Module C | Event | {event_payload} |
| 4 | Module C | Module A | Callback | {result_data} |

### 2. Facade Invocation Order

Document the precise order of facade calls:

| Order | Caller | Facade | Method | Async | Tenant Context |
|-------|--------|--------|--------|-------|----------------|
| 1 | {module} | {facade_name} | {method} | Yes/No | Propagated/Required |

### 3. Event Flow Mapping

Map asynchronous event flows between modules:

| Event | Publisher | Subscriber(s) | Trigger Condition | Delivery |
|-------|-----------|---------------|-------------------|----------|
| {event_name} | {module} | {modules} | {condition} | At-least-once |

### 4. Data Transformation Points

Identify where data transforms between module boundaries:

| Boundary | Source Schema | Target Schema | Transformation |
|----------|--------------|---------------|----------------|
| A → B | {dto_a} | {dto_b} | {mapping_logic} |

### 5. Tenant Context Flow

Verify tenant context propagation across all touchpoints:

| Touchpoint | Context Source | Propagation Method | Verification |
|------------|----------------|-------------------|--------------|
| {touchpoint} | {source} | Header/Parameter/Event | RLS/Check |

**Verify current best practices with web search:**
Search the web: "module interaction mapping enterprise architecture {date}"
Search the web: "event flow diagramming distributed systems {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into touchpoint analysis
- **[P] Party Mode**: Collaborative exploration of interaction patterns
- **[C] Continue**: Proceed to integration story design

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Analyze complex interaction chains
- Identify hidden dependencies
- Explore failure scenarios at touchpoints
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Brainstorm alternative interaction patterns
- Evaluate event vs sync trade-offs
- Generate creative coordination approaches
- Return to A/P/C menu

#### If 'C' (Continue):
- Verify touchpoint mapping complete
- Proceed to `step-03-c-design.md`

### Menu Options

**[A]nalyze** - Touchpoint Deep Analysis:
- A1: Analyze interaction chain completeness
- A2: Review data transformation accuracy
- A3: Assess tenant context propagation gaps
- A4: Evaluate failure modes at each touchpoint

**[P]ropose** - Interaction Pattern Proposals:
- P1: Propose alternative interaction sequences
- P2: Suggest event-driven refactoring opportunities
- P3: Recommend context propagation improvements
- P4: Propose caching strategies at boundaries

**[C]ontinue** - Proceed to next step:
- C1: Continue to Step 3 (Design Integration Stories)
- C2: Save current touchpoint mapping and pause

Select an option or provide feedback:

---

## Verification

- [ ] All journey sequences mapped end-to-end
- [ ] Facade invocation order documented
- [ ] Event flows mapped with delivery guarantees
- [ ] Data transformations identified at boundaries
- [ ] Tenant context propagation verified
- [ ] Patterns align with pattern registry

---

## Outputs

- Journey sequence diagrams
- Facade invocation order matrix
- Event flow map
- Data transformation specifications
- Tenant context flow verification

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

Proceed to `step-03-c-design.md` to define integration stories based on mapped touchpoints.
