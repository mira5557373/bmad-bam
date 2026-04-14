# Step 7: Core Contracts

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

Define the foundational interface contracts that all modules must implement. These contracts establish the standard patterns for tenant context handling, AI runtime integration, event-driven communication, and module facades. They serve as the backbone for cross-module interoperability and consistent behavior across the platform.

---

## Prerequisites

- Technology stack complete (Step 6)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: facade-contracts,event-driven

**Verify current best practices with web search:**
Search the web: "core contracts best practices {date}"
Search the web: "core contracts multi-tenant SaaS {date}"

Reference web research findings in your analysis.
_Source: [URL]_ for key findings.

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Define Tenant Context Interface Contract

- Specify TenantContext structure (tenant_id, org_id, user_id, roles, permissions)
- Define context propagation requirements (HTTP headers, message metadata)
- Document context validation rules and error handling
- Specify context serialization format for cross-service communication
- Define context enrichment patterns (lazy loading of tenant details)

### 2. Define AI Runtime Interface Contract

- Specify agent invocation interface (input schema, output schema, options)
- Document tool registration and permission contract
- Define memory access interface (read, write, scope parameters)
- Specify streaming response contract for real-time outputs
- Document error and fallback response formats
- Define evaluation hook interface for monitoring

### 3. Define Event Bus Interface Contract

- Specify event envelope structure (metadata, payload, tenant context)
- Document publish interface (topic, event, options)
- Define subscribe interface (topic, handler, filters)
- Specify delivery guarantees per event type
- Document dead letter handling contract
- Define event versioning and schema evolution rules

### 4. Define Module Facade Template

- Create standard facade interface pattern
- Document required methods (health, metrics, version)
- Specify authentication and authorization requirements
- Define pagination, filtering, and sorting contracts
- Document error response contract
- Specify versioning and deprecation policies

---

## COLLABORATION MENUS (A/P/C):

After completing the core contracts analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific contract concerns
- **P (Party Mode)**: Bring integration and API architect perspectives
- **C (Continue)**: Accept core contracts and proceed to code patterns
- **[Specific refinements]**: Describe contracts to refine

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: contract interfaces, integration requirements
- Process enhanced insights on contract design
- Ask user: "Accept these refined contracts? (y/n)"
- If yes, integrate into contract specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review core contracts for cross-module integration"
- Process integration and API architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save core contracts to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6, 7]`
- Proceed to next step: `step-08-c-code-patterns.md`

---

## Soft Gate Checkpoint

**Steps 1-7 complete the core interface contracts design.**

Present summary of:
- TenantContext and AI Runtime interface contracts
- EventBus interface and delivery guarantees
- Module facade template with standard methods

Ask for confirmation before proceeding to code patterns.

---

## Verification

- [ ] All contracts have complete type definitions
- [ ] Error handling documented for each contract method
- [ ] Contracts include versioning strategy
- [ ] Example implementations provided for each contract
- [ ] Contract tests defined for compliance verification
- [ ] Patterns align with pattern registry

---

## Outputs

- TenantContext interface specification
- AIRuntime interface specification
- EventBus interface specification
- ModuleFacade template with documentation
- Contract validation utilities/schemas
- **Load template:** `{project-root}/_bmad/bam/templates/facade-contract-template.md`

---

## Next Step

Proceed to `step-08-c-code-patterns.md` to define code patterns and conventions.
