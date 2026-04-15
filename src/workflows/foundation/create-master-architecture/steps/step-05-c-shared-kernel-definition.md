# Step 5: Shared Kernel Definition

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

Define the common code and contracts that all modules depend on. The shared kernel provides consistent primitives for tenant context, entity modeling, event handling, and error management. This ensures uniformity across the platform and prevents duplication.

---

## Prerequisites

- Module boundary rules complete (Step 4)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: event-driven

**Verify current best practices with web search:**
Search the web: "shared kernel best practices {date}"
Search the web: "shared kernel multi-tenant SaaS {date}"

Reference web research findings in your analysis.
_Source: [URL]_ for key findings.

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Define TenantContext Interface

- Specify required fields (tenant_id, organization_id, user_id)
- Define optional enrichment fields (subscription tier, feature flags)
- Document context creation and validation rules
- Specify serialization format for cross-boundary passing
- Define null/anonymous context handling
- Establish context immutability requirements

### 2. Define BaseEntity Requirements

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | UUID/ULID | Yes | Primary identifier |
| tenant_id | UUID | Yes | Tenant ownership |
| created_at | Timestamp | Yes | Creation time (UTC) |
| updated_at | Timestamp | Yes | Last update (UTC) |
| created_by | UUID | No | Creator user ID |
| updated_by | UUID | No | Last updater ID |
| deleted_at | Timestamp | No | Soft delete marker |
| version | Integer | No | Optimistic lock |

### 3. Define EventBus Interface

- Specify publish method signature and options
- Define subscribe method signature and handler contract
- Document event envelope structure
- Establish event ordering guarantees
- Define acknowledgment patterns
- Specify error handling and retry behavior

### 4. Define Common Value Objects and DTOs

- Standard pagination DTO (page, limit, cursor)
- Common response wrapper (data, meta, errors)
- Money/currency value object
- Date range value object
- Standard filter/sort DTOs

### 5. Define Shared Exceptions and Error Types

- Establish exception hierarchy (base, domain, infrastructure)
- Define standard error codes and messages
- Create tenant-specific exceptions (TenantNotFound, TenantSuspended)
- Define authorization exceptions (Forbidden, InsufficientPermissions)

---

## COLLABORATION MENUS (A/P/C):

After completing the shared kernel analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific shared kernel concerns
- **P (Party Mode)**: Bring architect and dev perspectives on shared components
- **C (Continue)**: Accept shared kernel definition and proceed to tech stack
- **[Specific refinements]**: Describe components to refine

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: shared kernel components, cross-cutting concerns
- Process enhanced insights on common infrastructure
- Ask user: "Accept these refined definitions? (y/n)"
- If yes, integrate into shared kernel specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review shared kernel design for modular monolith"
- Process architect and developer perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save shared kernel definition to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Proceed to next step: `step-06-c-technology-stack.md`

---

## Soft Gate Checkpoint

**Steps 1-5 complete the foundation infrastructure design.**

Present summary of:
- TenantContext interface and BaseEntity requirements
- EventBus interface and common value objects
- Shared exception hierarchy

Ask for confirmation before proceeding to technology stack.

---

## Verification

- [ ] All modules can import shared kernel without circular dependencies
- [ ] TenantContext provides all fields needed by downstream modules
- [ ] BaseEntity covers all common persistence patterns
- [ ] Error types map to HTTP status codes consistently
- [ ] Value objects are immutable and validatable
- [ ] Patterns align with pattern registry

---

## Outputs

- TenantContext interface specification with types
- BaseEntity abstract class/interface
- EventBus interface with message types
- Value object library specification
- Exception hierarchy documentation
- Shared kernel package structure
- **Load template:** `{project-root}/_bmad/bam/data/templates/platform-governance-template.md`

---

## Next Step

Proceed to `step-06-c-technology-stack.md` to document technology choices.
