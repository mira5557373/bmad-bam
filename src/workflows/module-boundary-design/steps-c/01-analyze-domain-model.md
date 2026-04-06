# Step 1: Analyze Domain Model

Perform domain event discovery and aggregate identification as the foundation for boundary design.

## Input Collection

Load available context:

1. **Product Brief** (if exists)
   - `{output_folder}/planning-artifacts/product-brief.md`

2. **PRD** (if exists)
   - `{output_folder}/planning-artifacts/prd.md`

3. **Existing Architecture** (if exists)
   - `{output_folder}/planning-artifacts/architecture/master-architecture.md`

4. **Project Context**
   - `{project-root}/**/project-context.md`

## Domain Event Discovery

Identify all significant domain events using past-tense verbs:

### Event Categories

1. **Lifecycle Events** (creation, modification, deletion)
   - Examples: UserRegistered, AccountActivated, ProfileUpdated, AccountDeleted

2. **State Transition Events**
   - Examples: OrderPlaced, OrderShipped, OrderDelivered, PaymentProcessed

3. **Business Rule Events**
   - Examples: CreditLimitExceeded, SubscriptionExpired, QuotaReached

4. **Integration Events**
   - Examples: ExternalDataReceived, WebhookProcessed, SyncCompleted

### Event Discovery Template

For each event identified:

```markdown
| Event Name | Description | Aggregate | Data Changed |
|------------|-------------|-----------|--------------|
| {PastTenseVerb} | {what happened} | {owner} | {fields affected} |
```

## Aggregate Identification

From the events, identify aggregate roots:

### Aggregate Criteria

An entity is an aggregate root if:
- It owns a cluster of related entities
- It enforces consistency boundaries
- Events reference it as the primary subject
- It has its own lifecycle independent of other aggregates

### Aggregate Template

For each aggregate identified:

```markdown
| Aggregate | Root Entity | Child Entities | Key Events |
|-----------|-------------|----------------|------------|
| {name} | {root} | {list} | {events owned} |
```

## Output

Document:
- Complete event catalog (20-50 events typical)
- Aggregate map with event ownership
- Initial grouping hypothesis for module boundaries

Present discovery summary before proceeding to boundary identification.
