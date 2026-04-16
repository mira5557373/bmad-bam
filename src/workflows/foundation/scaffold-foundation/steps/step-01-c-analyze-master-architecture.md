# Step 1: Analyze Master Architecture

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

Analyze the master architecture to extract key decisions for foundation scaffolding.

## Prerequisites

- Master architecture created via `create-master-architecture`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries


---

## Inputs

- User requirements and constraints for foundation - scaffold foundation
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

Load the master architecture document from `{output_folder}/planning-artifacts/master-architecture.md`.

If the file does not exist, inform the user and suggest running `create-master-architecture` first.

Extract and validate the following key decisions:

## Technology Stack
- Primary language and framework (e.g., Python/FastAPI, TypeScript/NestJS)
- Database technology and version
- Cache layer technology
- Message queue / event bus technology
- AI runtime dependencies (LLM providers, embedding models)

## Tenant Model
- Isolation strategy (RLS / schema / database per tenant)
- TenantContext interface shape
- Tenant lifecycle states

## AI Runtime Requirements
- Agent registry design
- Tool registry structure
- Memory tier configuration
- Kill switch mechanisms

## Shared Kernel Interfaces
- BaseEntity requirements
- EventBus interface
- Common value objects and DTOs

Present a summary of extracted decisions and confirm with the user before proceeding.

**Validation:** All required sections must be present in the master architecture. If any are missing, report gaps and request the user to complete the master architecture first.

**Verify current best practices with web search:**
Search the web: "analyze master architecture best practices {date}"
Search the web: "analyze master architecture enterprise SaaS {date}"

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

- [ ] Master architecture loaded
- [ ] Technology stack extracted
- [ ] Tenant model analyzed
- [ ] AI runtime requirements identified
- [ ] Shared kernel interfaces documented
- [ ] Patterns align with pattern registry

## Outputs

- Extracted decisions summary
- Gap report (if any)

## Next Step

Proceed to `step-02-c-generate-directory-structure.md` to create the project structure.
