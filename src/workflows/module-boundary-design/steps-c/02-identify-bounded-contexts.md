# Step 2: Identify Bounded Contexts

Define bounded contexts from event and aggregate groupings.

## Context Boundary Principles

Apply DDD bounded context principles:

1. **Linguistic boundaries**: Same term means same thing within context
2. **Team boundaries**: Single team can own entire context
3. **Data ownership**: Each entity owned by exactly one context
4. **Cohesion**: Aggregates that change together belong together

## Grouping Strategy

### Step 2.1: Group by Business Capability

Identify high-level business capabilities:
- What business function does this aggregate serve?
- Who is the primary user persona?
- What business metric does it support?

### Step 2.2: Analyze Event Flow

For each aggregate group:
- Which aggregates publish events to each other?
- Which aggregates respond to events from others?
- Where are the natural event boundaries?

### Step 2.3: Identify Shared Kernel

Cross-cutting concerns that may be shared:
- User identity and authentication
- Tenant configuration
- Audit logging
- Common value objects (Money, Address, etc.)

## Context Identification Template

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

## Context Relationship Mapping

Identify relationships between contexts:

| Upstream Context | Downstream Context | Relationship Type |
|------------------|-------------------|-------------------|
| {provider} | {consumer} | Customer-Supplier / Conformist / ACL |

## Anti-Corruption Layer Candidates

Flag where ACL may be needed:
- External system integrations
- Legacy system boundaries
- Third-party API consumption

## Output

Document:
- List of bounded contexts with owned aggregates
- Context relationship map
- Shared kernel candidates
- ACL candidates

Present context map for confirmation before defining module boundaries.
