# Step 1: Identify Integration Points

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

Analyze the modules that need to integrate and identify all facade integration points.

## Prerequisites

- Module architectures defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: facade-contracts`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-context-propagation`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: event-driven`


---

## Inputs

- User requirements and constraints for integration - define facade contract
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

**Verify current best practices with web search:**
Search the web: "facade API integration patterns {date}"
Search the web: "module integration contract design {date}"

_Source: [URL]_

1. **Load Module Architectures**
   - Read the module architecture documents for both the provider and consumer modules
   - Identify the bounded contexts involved
   - Note any existing facade contracts in `{output_folder}/planning-artifacts/contracts/`

2. **Map Integration Points**
   - List all operations the consumer module needs from the provider
   - Identify synchronous vs asynchronous integration needs
   - Document query vs command operations

3. **Verify Module Boundaries**
   - Confirm integration respects module boundary rules from master architecture
   - Check that no internal domain objects leak across boundaries
   - Validate tenant context propagation requirements

## Verification

- [ ] Provider and consumer modules identified
- [ ] All required operations listed
- [ ] Sync/async needs documented
- [ ] Tenant context requirements specified
- [ ] Patterns align with pattern registry

## Outputs

- Integration points document
- Operations inventory

---

## COLLABORATION MENUS (A/P/C)

> **Quick Actions** - Type the letter + number:
>
> **[A] Assist Options:**
> - `A1` - Help identify integration points between modules
> - `A2` - Clarify sync vs async integration patterns
> - `A3` - Explain tenant context propagation requirements
> - `A4` - Review operation categorization (query vs command)
>
> **[P] Proactive Options:**
> - `P1` - Suggest additional integration points based on module patterns
> - `P2` - Flag potential boundary violations
> - `P3` - Recommend tenant isolation considerations
> - `P4` - Identify cross-cutting concerns for facade design
>
> **[C] Completion Options:**
> - `C1` - Validate integration points document completeness
> - `C2` - Generate operations inventory summary
> - `C3` - Verify all prerequisites met for next step
> - `C4` - **Proceed to Step 2** (define contract interface)

---

## PROTOCOL INTEGRATION

### A/P/C Handler
- **[A] Response:** Deep-dive into requested topic, then return to current step
- **[P] Response:** Acknowledge party mode, continue with enhanced engagement
- **[C] Response:** Proceed to next logical step in workflow

---

## Next Step

Proceed to `step-02-c-define-contract-interface.md` to define the interface.
