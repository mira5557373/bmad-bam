# Step 3: Create Shared Kernel

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

Generate the shared kernel components based on master architecture specifications.

## Prerequisites

- Directory structure created (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries


---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

Generate the shared kernel components based on master architecture specifications.

## TenantContext Implementation

Create `src/core/tenant_context.py`:

- `TenantContext` class with tenant_id, user_id, correlation_id
- Context propagation via contextvars
- Middleware integration for automatic context injection
- Thread-safe context management

## BaseEntity Implementation

Create `src/core/base_entity.py`:

- `BaseEntity` base class for all domain entities
- Required fields: `id`, `tenant_id`, `created_at`, `updated_at`, `created_by`, `updated_by`
- Automatic tenant_id injection from context
- Audit field auto-population

## EventBus Implementation

Create `src/shared_kernel/events.py`:

- `DomainEvent` base class with event_id, tenant_id, timestamp, correlation_id
- `EventBus` interface with publish/subscribe methods
- Event handler registration mechanism
- Async event dispatch support

## Common Value Objects

Create `src/shared_kernel/value_objects.py`:

- `TenantId` value object with validation
- `UserId` value object
- `Email` value object with format validation
- `Money` value object (if applicable)

## Shared Exceptions

Create `src/shared_kernel/exceptions.py`:

- `DomainException` base class
- `TenantNotFoundError`
- `TenantAccessDeniedError`
- `EntityNotFoundError`
- `ValidationError`
- `ConcurrencyError`

## Common DTOs

Create `src/shared_kernel/dtos.py`:

- `PaginationRequest` / `PaginationResponse`
- `AuditInfo` DTO
- `TenantInfo` DTO
- Standard API response wrappers

## Integrity Checks

Verify all shared kernel files contain required exports:

- `src/core/database.py` must export `AsyncSession`, `async_sessionmaker`
- `src/core/tenant_context.py` must export `TenantContext`, `get_tenant_id()`
- `src/core/base_entity.py` must export `BaseEntity` with `tenant_id: UUID`
- `src/shared_kernel/events.py` must export `EventBus`, `DomainEvent`, `publish()`

**Output:** Complete shared kernel implementation with all required interfaces.

**Verify current best practices with web search:**
Search the web: "create shared kernel best practices {date}"
Search the web: "create shared kernel enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Conduct deeper analysis of the current step's domain
- Present additional options and trade-offs
- Return to checkpoint after elicitation

#### If 'P' (Party Mode):
- Enable collaborative exploration
- Generate creative alternatives
- Document insights before returning

#### If 'C' (Continue):
- Verify all outputs are complete
- Proceed to next step file

---

## Verification

- [ ] TenantContext implemented
- [ ] BaseEntity created
- [ ] EventBus defined
- [ ] Value objects created
- [ ] Exceptions defined
- [ ] Common DTOs specified
- [ ] Integrity checks pass
- [ ] Patterns align with pattern registry

## Outputs

- Shared kernel implementation files
- Interface documentation

## Next Step

Proceed to `step-04-c-setup-tenant-context.md` to configure tenant context propagation.
