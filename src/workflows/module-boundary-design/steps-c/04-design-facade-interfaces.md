# Step 4: Design Facade Interfaces

Define the public facade for each module as the contract for cross-module communication.

## Facade Design Principles

1. **Tenant-scoped**: Every public method accepts tenant context
2. **DTO-based**: Input and output are DTOs, never entities
3. **Minimal surface**: Expose only what other modules need
4. **Stable contracts**: Changes require versioning strategy

## Facade Template

For each module, define:

```markdown
## {ModuleName}Facade

### Methods

#### {methodName}

**Purpose:** {what this method does}

**Signature:**
\`\`\`typescript
async {methodName}(
  tenantContext: TenantContext,
  input: {InputDTO}
): Promise<Result<{OutputDTO}, {ErrorType}>>
\`\`\`

**Input DTO:**
\`\`\`typescript
interface {InputDTO} {
  field1: type;
  field2?: type;  // optional
}
\`\`\`

**Output DTO:**
\`\`\`typescript
interface {OutputDTO} {
  field1: type;
  field2: type;
}
\`\`\`

**Errors:**
- {ErrorType1}: {when thrown}
- {ErrorType2}: {when thrown}

**Consumers:**
- {ModuleA}: {why they need this}
- {ModuleB}: {why they need this}
```

## Cross-Module Communication Patterns

Define how modules communicate:

### Synchronous (Facade Calls)
- Use for: queries, commands requiring immediate response
- Contract: facade method signature
- Failure: caller handles error types

### Asynchronous (Events)
- Use for: notifications, eventual consistency, fan-out
- Contract: event schema
- Failure: retry with dead-letter queue

## Facade Method Categories

### Query Methods
- Return data, no side effects
- Examples: `getById`, `list`, `search`
- Always tenant-scoped

### Command Methods
- Mutate state, may return result
- Examples: `create`, `update`, `delete`, `execute`
- Always tenant-scoped

### Saga Participant Methods
- Part of distributed transaction
- Examples: `reserve`, `confirm`, `compensate`
- Include correlation ID

## Output

Document for each module:
- Complete facade interface
- Method signatures with DTOs
- Error types
- Consumer list

Present facade designs for confirmation.
