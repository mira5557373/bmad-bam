# Step 6: Events Published

## Purpose
Define the domain events this module publishes, including schemas, publishing rules, and consumer guidance.

## Actions

- Identify domain events:
  - What state changes are significant to other modules?
  - Use past-tense naming (AgentCreated, ExecutionCompleted)
  - One event per significant state transition

- Define event payload schemas:
  - ALL events must include `tenant_id` in payload
  - Include entity ID and relevant state
  - Add timestamp and correlation_id
  - Version the schema (v1, v2)

- Document publishing rules:
  - When is the event published (before/after commit)?
  - Ordering guarantees (if any)
  - Delivery semantics (at-least-once)
  - Retry and dead-letter policies

- Provide consumer guidance:
  - Expected use cases for each event
  - Fields that are stable vs. may change
  - Deprecation policy for event versions

## Outputs
- Event catalog with all published events
- JSON schema per event type
- Publishing configuration (topics, partitions)
- Consumer integration guide

## Questions to Consider
- Are you publishing too many or too few events?
- Should any events be combined or split?
- How do you handle event schema evolution?

**SIMPLE modules:** Skip if no domain events (CRUD-only module)
