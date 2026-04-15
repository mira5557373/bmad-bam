# Step 1: Analyze Domain Model

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

Perform domain event discovery and aggregate identification as the foundation for boundary design.

---

## Prerequisites

- Product brief or PRD exists
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries,event-driven
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: facade-contracts

---


## Inputs

- User requirements and constraints for module boundary design
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Input Collection

Load available context:

1. **Product Brief** (if exists)
   - `{output_folder}/planning-artifacts/product-brief.md`

2. **PRD** (if exists)
   - `{output_folder}/planning-artifacts/prd.md`

3. **Existing Architecture** (if exists)
   - `{output_folder}/planning-artifacts/architecture/master-architecture.md`

4. **Project Context**
   - `{project-root}/**/project-context.md`

### 2. Domain Event Discovery

Identify all significant domain events using past-tense verbs:

#### Event Categories

1. **Lifecycle Events** (creation, modification, deletion)
   - Examples: UserRegistered, AccountActivated, ProfileUpdated, AccountDeleted

2. **State Transition Events**
   - Examples: OrderPlaced, OrderShipped, OrderDelivered, PaymentProcessed

3. **Business Rule Events**
   - Examples: CreditLimitExceeded, SubscriptionExpired, QuotaReached

4. **Integration Events**
   - Examples: ExternalDataReceived, WebhookProcessed, SyncCompleted

#### Event Discovery Template

For each event identified:

```markdown
| Event Name | Description | Aggregate | Data Changed |
|------------|-------------|-----------|--------------|
| {PastTenseVerb} | {what happened} | {owner} | {fields affected} |
```

### 3. Aggregate Identification

From the events, identify aggregate roots:

#### Aggregate Criteria

An entity is an aggregate root if:
- It owns a cluster of related entities
- It enforces consistency boundaries
- Events reference it as the primary subject
- It has its own lifecycle independent of other aggregates

#### Aggregate Template

For each aggregate identified:

```markdown
| Aggregate | Root Entity | Child Entities | Key Events |
|-----------|-------------|----------------|------------|
| {name} | {root} | {list} | {events owned} |
```

### 4. Document Output

Document:
- Complete event catalog (20-50 events typical)
- Aggregate map with event ownership
- Initial grouping hypothesis for module boundaries

Present discovery summary before proceeding to boundary identification.

**Verify current best practices with web search:**
Search the web: "analyze domain model best practices {date}"
Search the web: "analyze domain model enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the domain analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into event discovery and aggregate identification
- **P (Party Mode)**: Bring analyst and architect perspectives for domain model review
- **C (Continue)**: Accept domain analysis and proceed to bounded context identification
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass domain context: events discovered, aggregates identified, gaps noted
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into domain analysis
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review domain model analysis for module boundary design: {summary of events and aggregates}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save domain analysis to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-identify-bounded-contexts.md`

---

## Verification

- [ ] Input context loaded
- [ ] Domain events discovered (20-50 events)
- [ ] Aggregate roots identified
- [ ] Event ownership mapped
- [ ] Initial grouping hypothesis documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Event catalog
- Aggregate map
- Initial module grouping hypothesis

---

## Next Step

Proceed to `step-02-c-identify-bounded-contexts.md` to define context boundaries.
