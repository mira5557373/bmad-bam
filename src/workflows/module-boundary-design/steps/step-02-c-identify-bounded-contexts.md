# Step 2: Identify Bounded Contexts

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

Define bounded contexts from event and aggregate groupings.

---

## Prerequisites

- Domain model analyzed (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: local-dev

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Context Boundary Principles

Apply DDD bounded context principles:

1. **Linguistic boundaries**: Same term means same thing within context
2. **Team boundaries**: Single team can own entire context
3. **Data ownership**: Each entity owned by exactly one context
4. **Cohesion**: Aggregates that change together belong together

### 2. Grouping Strategy

#### Step 2.1: Group by Business Capability

Identify high-level business capabilities:
- What business function does this aggregate serve?
- Who is the primary user persona?
- What business metric does it support?

#### Step 2.2: Analyze Event Flow

For each aggregate group:
- Which aggregates publish events to each other?
- Which aggregates respond to events from others?
- Where are the natural event boundaries?

#### Step 2.3: Identify Shared Kernel

Cross-cutting concerns that may be shared:
- User identity and authentication
- Tenant configuration
- Audit logging
- Common value objects (Money, Address, etc.)

### 3. Context Identification Template

For each potential bounded context:

```markdown
## Context: {Name}

**Business Capability:** {description}
**Primary Persona:** {user type}

**Aggregates Owned:**
- {Aggregate 1}
- {Aggregate 2}

**Events Published:**
- {Event 1}
- {Event 2}

**Events Consumed:**
- {Event from other context}

**Ubiquitous Language:**
- {Term 1}: {definition in this context}
- {Term 2}: {definition in this context}
```

### 4. Context Relationship Mapping

Identify relationships between contexts:

| Upstream Context | Downstream Context | Relationship Type |
|------------------|-------------------|-------------------|
| {provider} | {consumer} | Customer-Supplier / Conformist / ACL |

### 5. Anti-Corruption Layer Candidates

Flag where ACL may be needed:
- External system integrations
- Legacy system boundaries
- Third-party API consumption

### 6. Document Output

Document:
- List of bounded contexts with owned aggregates
- Context relationship map
- Shared kernel candidates
- ACL candidates

Present context map for confirmation before defining module boundaries.

**Verify current best practices with web search:**
Search the web: "identify bounded contexts best practices {date}"
Search the web: "identify bounded contexts enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the bounded context identification above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into context boundaries and relationships
- **P (Party Mode)**: Bring analyst and architect perspectives for context review
- **C (Continue)**: Accept context map and proceed to define module boundaries
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: bounded contexts identified, relationships mapped, ACL candidates
- Process enhanced insights on boundary definitions
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into context map
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review bounded context identification for module boundaries: {summary of contexts and relationships}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save bounded context map to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-define-module-boundaries.md`

---

## Soft Gate Checkpoint

**Steps 1-2 complete the context identification phase.**

Present summary of:
- Domain analysis findings
- Bounded contexts identified
- Context relationships and ACL candidates

Ask for confirmation before proceeding to module boundary definition.

---

## Verification

- [ ] Context boundary principles applied
- [ ] Aggregates grouped by business capability
- [ ] Event flow analyzed
- [ ] Shared kernel identified
- [ ] Context relationships mapped
- [ ] ACL candidates flagged
- [ ] Patterns align with pattern registry

---

## Outputs

- Bounded contexts list
- Context relationship map
- Shared kernel candidates
- ACL candidates

---

## Next Step

Proceed to `step-03-c-define-module-boundaries.md` to map contexts to modules.
