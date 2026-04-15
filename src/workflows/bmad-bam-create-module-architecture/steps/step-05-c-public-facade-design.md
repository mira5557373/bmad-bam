# Step 5: Public Facade Design

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

---

## Purpose

Design the module's public facade that serves as the only entry point for other modules, enforcing encapsulation and tenant-scoping.

---

## Prerequisites

- Domain model designed (Step 4)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: facade-contracts
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: facade-contracts

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Define Facade Methods

- All methods must accept TenantContext as first parameter
- Use verb-noun naming (create_agent, get_execution)
- Group related operations logically
- Document method contracts with pre/post conditions

### 2. Design Input DTOs

- Separate DTO per operation (CreateAgentInput, UpdateAgentInput)
- Validate at facade boundary
- Never expose internal entity structure
- Include only fields needed for operation

### 3. Design Output DTOs

- Separate DTO per operation or shared read DTOs
- Include computed/derived fields as needed
- Pagination wrapper for list operations
- Never expose sensitive internal state

### 4. Define Error Types

- Follow master architecture error contract
- Module-specific error codes with prefix
- Include error context for debugging
- Map to appropriate HTTP status codes

### 5. Apply Facade Template

- Inherit from base facade class
- Implement required lifecycle hooks
- Add observability decorators (logging, metrics)

**Verify current best practices with web search:**
Search the web: "facade pattern module patterns {date}"
Search the web: "public API bounded context {date}"

_Source: [URL]_

---

## Questions to Consider

- Are there operations that should be async?
- How do you handle bulk operations efficiently?
- What operations need idempotency keys?

---

## COLLABORATION MENUS (A/P/C):

After completing the facade design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into API design and contract details
- **P (Party Mode)**: Bring architect and developer perspectives for facade validation
- **C (Continue)**: Accept facade design and proceed to dependencies declaration
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: facade methods, DTOs, error types
- Process enhanced insights on API design
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into facade design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review public facade design: {methods, DTOs, error types summary}"
- Process collaborative analysis from architect and developer personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save facade design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Proceed to next step: `step-06-c-dependencies.md`

---

## Verification

- [ ] Facade methods defined with TenantContext
- [ ] Input DTOs designed with validation
- [ ] Output DTOs defined (no entity leakage)
- [ ] Error types follow master contract
- [ ] Facade template applied
- [ ] Patterns align with pattern registry

---

## Outputs

- Facade interface definition
- DTO schemas
- Error type enumeration
- **Load template:** `{project-root}/_bmad/bam/data/templates/facade-contract-template.md`

---

## Next Step

Proceed to `step-06-c-dependencies.md` to declare module dependencies.
