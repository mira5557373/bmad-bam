# Step 2: Define Contract Interface

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics

## Purpose

Design the facade interface that will be exposed by the provider module.

## Prerequisites

- Integration points identified (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: facade-contracts`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: facade-contracts`


---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

**Verify current best practices with web search:**
Search the web: "facade interface API integration patterns {date}"
Search the web: "API contract design best practices {date}"

_Source: [URL]_

### 1. Define Operation Signatures

For each integration point from Step 1:
- Define method signature following facade patterns from knowledge
- Use shared kernel types for common concepts (TenantId, UserId, etc.)
- Ensure ALL operations include TenantContext as first parameter

### 2. Apply Facade Design Principles

Reference principles from `module-facade-patterns.md`:
- Expose use-case-oriented methods, not CRUD operations
- Keep facade surface area minimal (coarse-grained operations)
- Never expose internal domain entities directly
- Return DTOs specific to the contract

### 3. Design Request/Response Objects

For each operation, define:

| Aspect | Specification |
|--------|---------------|
| Request DTO | Fields needed by operation |
| Response DTO | Data returned to consumer |
| Versioning | Include contract version in type names |
| Validation | Specify required vs optional fields |

### 4. Document Preconditions and Postconditions

For each operation:

| Condition Type | Examples |
|----------------|----------|
| Preconditions | Required permissions, valid tenant context, input validation |
| Postconditions | State changes, events emitted, audit logged |
| Invariants | What must remain unchanged |

### 5. Define Error Contracts

Using patterns from knowledge:
- Define typed error responses
- Specify error codes and their meanings
- Document retry guidance for each error type

## Interface Documentation Template

For each facade method, document:
- Operation name and purpose
- Input parameters with types
- Return type
- Possible errors
- Example usage scenario

## Soft Gate Checkpoint

**Steps 1-2 complete the interface definition phase.**

Present summary of:
- Operation signatures with tenant context requirements
- Request/Response DTO structures defined
- Error contracts and retry semantics specified

Ask for confirmation before proceeding to data transfer specification.

---

## Verification

- [ ] All integration points have method signatures
- [ ] TenantContext is first parameter on all methods
- [ ] DTOs defined for all requests and responses
- [ ] Preconditions/postconditions documented
- [ ] Error contracts specified
- [ ] Patterns align with pattern registry

## Outputs

- Facade interface specification
- Request/Response DTO definitions
- Error contract documentation
- **Load template:** `{project-root}/_bmad/bam/data/templates/facade-contract-template.md`

---

## COLLABORATION MENUS (A/P/C)

> **Quick Actions** - Type the letter + number:
>
> **[A] Assist Options:**
> - `A1` - Help define operation signatures with tenant context
> - `A2` - Clarify facade design principles application
> - `A3` - Explain request/response DTO structure
> - `A4` - Review preconditions and postconditions format
>
> **[P] Proactive Options:**
> - `P1` - Suggest coarse-grained operation consolidation
> - `P2` - Flag operations missing tenant context
> - `P3` - Recommend DTO versioning strategy
> - `P4` - Identify operations that should be async
>
> **[C] Completion Options:**
> - `C1` - Validate interface specification completeness
> - `C2` - Generate DTO definitions summary
> - `C3` - Verify all facade design principles applied
> - `C4` - **Proceed to Step 3** (specify data transfer)

---

## PROTOCOL INTEGRATION

### A/P/C Handler
- **[A] Response:** Deep-dive into requested topic, then return to current step
- **[P] Response:** Acknowledge party mode, continue with enhanced engagement
- **[C] Response:** Proceed to next logical step in workflow

---

## Next Step

Proceed to `step-03-c-specify-data-transfer.md` to plan contract evolution.
