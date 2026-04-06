# Step 3: Generate Epic Stories

Create user stories for each epic following module-scoped patterns.

## Story Generation Rules

### Granularity by Complexity

| Complexity | Story Granularity |
|------------|-------------------|
| SIMPLE     | Coarse (CRUD operations grouped into single stories) |
| STANDARD   | Standard (one story per feature, clear scope) |
| COMPLEX    | Fine (split by risk, dependencies, implementation order) |

### Story Scoping Constraints

All stories must adhere to:

1. **Module boundary**: Implementable entirely within module boundary
2. **Tenant context**: Must specify tenant context requirements
3. **Facade contracts**: Cross-module needs reference facade contracts, not internal implementations
4. **AI behavior specs**: Include agent/tool requirements if applicable

## Story Template

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

## Story Ordering

Within each epic, order stories by:

1. Foundation stories (entities, repositories) first
2. Core operations (CRUD) second
3. Business logic third
4. AI-enabled features last (depend on core operations)

## Output

Generate complete story list organized by epic.
