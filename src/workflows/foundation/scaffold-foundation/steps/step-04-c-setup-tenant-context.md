# Step 4: Setup Tenant Context

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

Configure tenant context propagation and isolation mechanisms.

## Prerequisites

- Shared kernel created (Step 3)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries


---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

Configure tenant context propagation and isolation mechanisms.

## Database Integration

Configure tenant-scoped database access:

1. Create `src/core/database.py`:
   - Async database session factory
   - Automatic tenant_id injection into queries
   - RLS policy activation (if using RLS isolation)
   - Connection pool configuration

2. Create Alembic migration for RLS:
   - Enable RLS on all tenant-scoped tables
   - Create RLS policies for tenant isolation
   - Set up tenant_id column defaults

## Middleware Configuration

Create `src/core/middleware/tenant_middleware.py`:

- Extract tenant_id from JWT claims or X-Tenant-ID header
- Validate tenant exists and is active
- Inject TenantContext into request scope
- Set database session tenant filter

## Request Context Propagation

Implement context propagation across:

- HTTP request handlers
- Background task execution
- Event handler processing
- Scheduled job execution

## Tenant Lifecycle Support

Create `src/control_plane/tenant_provisioning/`:

- `TenantService` with CRUD operations
- Tenant state machine (provisioning → active → suspended → archived → deleted)
- Tenant provisioning workflow hooks
- Tenant decommissioning workflow hooks

## Test Fixtures

Create `tests/conftest.py` with:

- Multi-tenant test fixtures
- Test tenant factory
- Tenant context injection for tests
- Isolation verification helpers

## Foundation Epics Creation

Create `{output_folder}/planning-artifacts/foundation-epics.md`:

1. **Shared Kernel Epic** - TenantContext, BaseEntity, EventBus, common DTOs
2. **Control-Plane Epic** - tenant provisioning, admin operations, billing integration
3. **AI Runtime Epic** - agent registry, tool registry, memory manager, kill switches

## Summary

Present what was scaffolded:

- Directory structure created
- Foundation files generated
- Zone boundaries established
- Foundation epics ready for implementation

**Next Steps:** After foundation stories are implemented, run `bmad-bam-validate-foundation` to pass QG-F1.

**CRITICAL:** `create-tenant-service` scaffold is used ONCE (this workflow only). After foundation, all module code is generated from architecture documents, not scaffolding tools.

**Verify current best practices with web search:**
Search the web: "setup tenant context best practices {date}"
Search the web: "setup tenant context enterprise SaaS {date}"

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

- [ ] Database integration configured
- [ ] Middleware created
- [ ] Context propagation implemented
- [ ] Tenant lifecycle supported
- [ ] Test fixtures created
- [ ] Foundation epics generated
- [ ] Patterns align with pattern registry

## Outputs

- Tenant context configuration
- Middleware implementation
- Test fixtures
- Foundation epics document
- **Load template:** `{project-root}/_bmad/bam/templates/foundation-scaffold-template.md`

## Next Step

Implement foundation epics, then run `bmad-bam-validate-foundation` to pass QG-F1.
