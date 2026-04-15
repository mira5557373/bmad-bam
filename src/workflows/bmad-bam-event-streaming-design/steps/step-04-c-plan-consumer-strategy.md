# Step 4: Plan Consumer Strategy

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics


---

## Purpose

Design consumer groups, configure offset management, plan DLQ handling, and design replay capabilities.

## Prerequisites

- Steps 1-3 completed: Domains, topics, schema registry
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: consumer-patterns
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: error-handling

---

## Inputs

- Output from Steps 1-3
- Consumer SLA requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`

---

## Actions

**Verify current best practices with web search:**
Search the web: "Kafka consumer group patterns {date}"
Search the web: "dead letter queue best practices event streaming {date}"

_Source: [URL]_

### 1. Design Consumer Groups

| Consumer Group | Topics | Parallelism | Processing |
|----------------|--------|-------------|------------|
| notification-processor | user.created, order.placed | 4 | At-least-once |
| billing-processor | tenant.onboarded, usage.metered | 2 | Exactly-once |
| analytics-ingestion | *.*.* | 8 | At-most-once |
| audit-archiver | *.audit.* | 2 | At-least-once |

### 2. Configure Offset Management

| Strategy | Description | Use Case |
|----------|-------------|----------|
| Auto-commit | Periodic commit | High volume, tolerates duplicates |
| Manual commit | After processing | Exactly-once semantics |
| Transactional | With DB transaction | Data consistency required |
| Earliest | Start from beginning | New consumer, replay |
| Latest | Start from end | Skip historical |

### 3. Plan DLQ Handling

| Failure Type | DLQ Topic | Retry Strategy | Alert |
|--------------|-----------|----------------|-------|
| Deserialization | topic.dlq.deserialize | No retry | Immediate |
| Validation | topic.dlq.validation | No retry | Batch |
| Processing | topic.dlq.processing | 3x exponential | After max |
| Timeout | topic.dlq.timeout | 2x linear | After max |

### 4. Design Replay Capabilities

| Replay Type | Trigger | Implementation |
|-------------|---------|----------------|
| Full replay | Disaster recovery | Reset to earliest |
| Partial replay | Bug fix | Time-based offset |
| Selective replay | Tenant request | Filter + republish |
| DLQ replay | Issue resolved | DLQ consumer |

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

After completing the consumer strategy above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into consumer groups and DLQ strategies
- **P (Party Mode)**: Bring DevOps and architect perspectives for consumer review
- **C (Continue)**: Complete Create mode - workflow finished
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass consumer context: groups, offsets, DLQ, replay
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, finalize consumer strategy
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review consumer strategy: {summary of groups and DLQ}"
- Process collaborative analysis from DevOps and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save consumer strategy
- Create mode complete

---

## Verification

- [ ] Consumer groups designed
- [ ] Offset management configured
- [ ] DLQ handling planned
- [ ] Replay capabilities designed
- [ ] Patterns align with pattern registry

## Outputs

- Consumer strategy document
- DLQ configuration
- Replay procedures
- **Load template:** `{project-root}/_bmad/bam/data/templates/event-streaming-template.md`

## Next Step

Workflow complete. Present Event Streaming Design with consumer strategy to user for review and approval.
