# Step 7: Events Published

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

Define the domain events this module publishes, including schemas, publishing rules, and consumer guidance.

---

## Prerequisites

- Dependencies declared (Step 6)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: facade-contracts,event-driven
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-context-propagation,event-driven

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Identify Domain Events

- What state changes are significant to other modules?
- Use past-tense naming (AgentCreated, ExecutionCompleted)
- One event per significant state transition

### 2. Define Event Payload Schemas

- ALL events must include `tenant_id` in payload
- Include entity ID and relevant state
- Add timestamp and correlation_id
- Version the schema (v1, v2)

### 3. Document Publishing Rules

- When is the event published (before/after commit)?
- Ordering guarantees (if any)
- Delivery semantics (at-least-once)
- Retry and dead-letter policies

### 4. Provide Consumer Guidance

- Expected use cases for each event
- Fields that are stable vs. may change
- Deprecation policy for event versions

**Verify current best practices with web search:**
Search the web: "domain events module patterns {date}"
Search the web: "event-driven bounded context {date}"

_Source: [URL]_

---

## Questions to Consider

- Are you publishing too many or too few events?
- Should any events be combined or split?
- How do you handle event schema evolution?

**SIMPLE modules:** Skip if no domain events (CRUD-only module)

---

## COLLABORATION MENUS (A/P/C):

After completing the events definition above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into event design and consumer needs
- **P (Party Mode)**: Bring architect and integration perspectives for event validation
- **C (Continue)**: Accept event catalog and proceed to module-specific decisions
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: domain events, payload schemas, publishing rules
- Process enhanced insights on event design
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into event catalog
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review published events: {event names, schemas, consumer guidance}"
- Process collaborative analysis from architect and integration personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save event catalog to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6, 7]`
- Proceed to next step: `step-08-c-module-specific-decisions.md`

---

## Soft Gate Checkpoint

**Steps 1-7 complete the integration design.**

Present summary of:
- Domain model and facade design
- Module dependencies
- Domain events and schemas

Ask for confirmation before proceeding to module-specific decisions.

---

## Verification

- [ ] Domain events identified (past-tense naming)
- [ ] All event payloads include tenant_id
- [ ] Event schemas defined and versioned
- [ ] Publishing rules documented
- [ ] Consumer guidance provided
- [ ] Patterns align with pattern registry

---

## Outputs

- Event catalog
- JSON schemas per event type
- Consumer integration guide

---

## Next Step

Proceed to `step-08-c-module-specific-decisions.md` to document ADRs.
