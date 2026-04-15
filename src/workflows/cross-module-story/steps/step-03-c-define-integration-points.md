# Step 3: Define Integration Points

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

Specify how modules will interact for this feature.

## Prerequisites

- Dependencies mapped (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: facade-contracts
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-context-propagation
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-isolation


---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

## Integration Mechanisms

For each cross-module interaction, define:

**Facade Calls:**
- Target facade and method
- Input parameters with types
- Expected response schema
- Error handling strategy
- Timeout and retry configuration

**Event Publishing:**
- Event type and schema
- Publishing module
- Consuming modules
- Delivery guarantees (at-least-once, exactly-once)
- Event versioning approach

**Shared Data:**
- Data entity and location
- Access pattern (read/write/both)
- Tenant isolation requirements
- Caching strategy

## Integration Contracts

For each integration point, document:
- Contract name and version
- Owner module
- Consumer modules
- Schema definition
- Validation rules
- Backward compatibility commitment

## Testing Strategy

**Contract Tests:**
- Provider contract tests (module provides what it promises)
- Consumer contract tests (module handles responses correctly)

**Integration Tests:**
- End-to-end scenarios across modules
- Failure injection tests
- Performance tests under load

## Tenant Context Propagation

Ensure tenant isolation across integration points:
- Tenant ID included in all calls
- RLS enforced at data access
- No cross-tenant data leakage
- Audit logging at boundaries

**Verify current best practices with web search:**
Search the web: "define integration points best practices {date}"
Search the web: "define integration points enterprise SaaS {date}"

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

### Menu Options

**[A]nalyze** - Cross-Module Integration Analysis:
- A1: Analyze integration point completeness across modules
- A2: Review tenant context propagation paths
- A3: Assess contract version compatibility
- A4: Evaluate testing coverage for integration scenarios

**[P]ropose** - Integration Coordination Proposals:
- P1: Propose integration contract specifications
- P2: Suggest event schema standardization
- P3: Recommend tenant isolation verification approach
- P4: Propose integration testing strategy

**[C]ontinue** - Proceed to next step:
- C1: Continue to Step 4 (Create Coordinated Stories) with defined integration points
- C2: Save current integration point definitions and pause

Select an option or provide feedback:

---

## Verification

- [ ] Integration mechanisms defined
- [ ] Integration contracts documented
- [ ] Testing strategy defined
- [ ] Tenant context propagation verified
- [ ] Patterns align with pattern registry

## Outputs

- Integration specification document
- Contract definitions
- Test strategy

## Next Step

Proceed to `step-04-c-create-coordinated-stories.md` to generate module stories.
