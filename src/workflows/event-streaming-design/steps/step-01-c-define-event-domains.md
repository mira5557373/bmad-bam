# Step 1: Define Event Domains

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

Catalog event types and sources, map event consumers, define event schemas, and identify tenant context requirements for event streaming.

## Prerequisites

- Service boundaries defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: event-driven
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: internal-contracts

---

## Inputs

- Service topology and module boundaries
- Existing integration contracts
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

**Verify current best practices with web search:**
Search the web: "event-driven architecture patterns {date}"
Search the web: "Kafka vs EventBridge multi-tenant comparison {date}"

_Source: [URL]_

### 1. Catalog Event Types and Sources

| Event Type | Source Service | Domain | Frequency |
|------------|----------------|--------|-----------|
| UserCreated | user-service | Identity | Medium |
| TenantOnboarded | tenant-service | Lifecycle | Low |
| OrderPlaced | order-service | Commerce | High |
| AITaskCompleted | ai-runtime | AI | High |

### 2. Map Event Consumers

| Event | Consumers | Consumption Pattern | SLA |
|-------|-----------|---------------------|-----|
| UserCreated | notification, billing, analytics | Fan-out | Real-time |
| TenantOnboarded | provisioning, billing, audit | Sequential | Near real-time |
| OrderPlaced | fulfillment, analytics | Competing | Real-time |

### 3. Define Event Schemas

| Event | Schema Format | Key Fields | Versioning |
|-------|---------------|------------|------------|
| UserCreated | Avro | user_id, tenant_id, email | v1.0 |
| TenantOnboarded | Avro | tenant_id, tier, config | v1.0 |
| OrderPlaced | Avro | order_id, tenant_id, items | v1.0 |

### 4. Identify Tenant Context Requirements

| Requirement | Implementation | Validation |
|-------------|----------------|------------|
| Tenant ID in payload | Required field | Schema validation |
| Tenant routing | Partition key | Topic design |
| Tenant isolation | Topic per tenant OR filtering | Consumer config |

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

After completing the event domain analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into event types and consumer requirements
- **P (Party Mode)**: Bring analyst and architect perspectives for domain review
- **C (Continue)**: Accept event domains and proceed to topic architecture
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass domain context: events, consumers, schemas, tenant requirements
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into domain catalog
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review event domains: {summary of events and consumers}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save event domain catalog
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-design-topic-architecture.md`

---

## Verification

- [ ] Event types and sources cataloged
- [ ] Event consumers mapped
- [ ] Event schemas defined
- [ ] Tenant context requirements identified
- [ ] Patterns align with pattern registry

## Outputs

- Event domain catalog
- Consumer mapping
- Schema definitions
- **Load template:** `{project-root}/_bmad/bam/templates/event-driven-design-template.md`

## Next Step

Proceed to `step-02-c-design-topic-architecture.md` to design topic architecture.
