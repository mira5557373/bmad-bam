# Step 4: Design Facade Interfaces

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

Define the public facade for each module as the contract for cross-module communication.

---

## Prerequisites

- Module boundaries defined (Step 3)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: facade-contracts
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: facade-contracts

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Facade Design Principles

1. **Tenant-scoped**: Every public method accepts tenant context
2. **DTO-based**: Input and output are DTOs, never entities
3. **Minimal surface**: Expose only what other modules need
4. **Stable contracts**: Changes require versioning strategy

### 2. Facade Template

For each module, define facade methods using this specification format:

#### Method Specification Table

| Field | Value | Description |
|-------|-------|-------------|
| Facade Name | {ModuleName}Facade | Single facade per module |
| Method Name | {methodName} | Verb-noun naming convention |
| Purpose | {description} | What the method accomplishes |
| Async | Yes/No | Whether method is asynchronous |
| Tenant-Scoped | Yes | Always required |

#### Method Signature Specification

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| tenantContext | TenantContext | Yes | First parameter always |
| input | {InputDTO} | Yes | Operation-specific input |
| **Returns** | Result<{OutputDTO}, {ErrorType}> | - | Success or typed error |

#### Input DTO Specification

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| field1 | {type} | Yes | {validation rules} |
| field2 | {type} | No | {validation rules} |

#### Output DTO Specification

| Field | Type | Description |
|-------|------|-------------|
| field1 | {type} | {what it represents} |
| field2 | {type} | {what it represents} |

#### Error Types

| Error Type | Condition | HTTP Status |
|------------|-----------|-------------|
| {ErrorType1} | {when thrown} | {status code} |
| {ErrorType2} | {when thrown} | {status code} |

#### Consumer Mapping

| Consumer Module | Usage | Rationale |
|-----------------|-------|-----------|
| {ModuleA} | {operation} | {why they need this} |
| {ModuleB} | {operation} | {why they need this} |

### 3. Cross-Module Communication Patterns

Define how modules communicate:

#### Synchronous (Facade Calls)
- Use for: queries, commands requiring immediate response
- Contract: facade method signature
- Failure: caller handles error types

#### Asynchronous (Events)
- Use for: notifications, eventual consistency, fan-out
- Contract: event schema
- Failure: retry with dead-letter queue

### 4. Facade Method Categories

#### Query Methods
- Return data, no side effects
- Examples: `getById`, `list`, `search`
- Always tenant-scoped

#### Command Methods
- Mutate state, may return result
- Examples: `create`, `update`, `delete`, `execute`
- Always tenant-scoped

#### Saga Participant Methods
- Part of distributed transaction
- Examples: `reserve`, `confirm`, `compensate`
- Include correlation ID

### 5. Document Output

Document for each module:
- Complete facade interface
- Method signatures with DTOs
- Error types
- Consumer list

Present facade designs for confirmation.

**Verify current best practices with web search:**
Search the web: "design facade interfaces best practices {date}"
Search the web: "design facade interfaces enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the facade designs above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into contract design and error handling
- **P (Party Mode)**: Bring architect and dev perspectives for facade review
- **C (Continue)**: Accept facade designs and proceed to document dependencies
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: facade definitions, DTOs, error types, consumers
- Process enhanced insights on contract quality
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into facade designs
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review facade interface designs: {summary of facades and methods}"
- Process collaborative analysis from architect and dev personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save facade designs to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-document-dependencies.md`

---

## Soft Gate Checkpoint

**Steps 1-4 complete the boundary and facade design phase.**

Present summary of:
- Module boundaries defined
- Facade interfaces for each module
- Cross-module communication patterns

Ask for confirmation before proceeding to dependency documentation.

---

## Verification

- [ ] Facade design principles applied
- [ ] All methods tenant-scoped
- [ ] DTOs defined for input/output
- [ ] Error types documented
- [ ] Communication patterns defined
- [ ] Consumer list documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Facade interface definitions
- Method signatures with DTOs
- Error types
- Consumer mapping
- **Load template:** `{project-root}/_bmad/bam/templates/facade-contract-template.md`

---

## Next Step

Proceed to `step-05-c-document-dependencies.md` to create dependency graph.
