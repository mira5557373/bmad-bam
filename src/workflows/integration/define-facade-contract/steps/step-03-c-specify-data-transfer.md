# Step 3: Specify Data Transfer

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

Define the data transfer objects and serialization rules for the facade contract.

## Prerequisites

- Contract interface defined (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: facade-contracts`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-context-propagation`


---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

**Verify current best practices with web search:**
Search the web: "DTO API integration patterns {date}"
Search the web: "data transfer contract design {date}"

_Source: [URL]_

1. **Define DTO Schemas**
   - Create JSON Schema or TypeScript types for each DTO
   - Document field-level validation rules
   - Mark required vs optional fields explicitly

2. **Specify Tenant Context Propagation**
   - Define how tenant context is passed (header, parameter, envelope)
   - Document context extraction and validation
   - Specify fallback behavior for missing context

3. **Handle Collections and Pagination**
   - Define pagination strategy (cursor-based recommended)
   - Specify maximum page sizes
   - Document sorting and filtering capabilities

4. **Define Serialization Rules**
   - Specify date/time formats (ISO 8601)
   - Define decimal/money handling
   - Document null vs undefined semantics

## Verification

- [ ] DTO schemas defined
- [ ] Tenant context propagation specified
- [ ] Pagination strategy documented
- [ ] Serialization rules established
- [ ] Patterns align with pattern registry

## Outputs

- DTO schemas
- Context propagation rules
- Pagination specifications

---

## COLLABORATION MENUS (A/P/C)

> **Quick Actions** - Type the letter + number:
>
> **[A] Assist Options:**
> - `A1` - Help define DTO schemas with validation rules
> - `A2` - Clarify tenant context propagation methods
> - `A3` - Explain pagination strategy options
> - `A4` - Review serialization rule conventions
>
> **[P] Proactive Options:**
> - `P1` - Suggest DTO structure optimizations
> - `P2` - Flag missing tenant context handling
> - `P3` - Recommend cursor-based pagination implementation
> - `P4` - Identify serialization consistency issues
>
> **[C] Completion Options:**
> - `C1` - Validate DTO schema completeness
> - `C2` - Generate context propagation summary
> - `C3` - Verify pagination specifications
> - `C4` - **Proceed to Step 4** (document error handling)

---

## PROTOCOL INTEGRATION

### A/P/C Handler
- **[A] Response:** Deep-dive into requested topic, then return to current step
- **[P] Response:** Acknowledge party mode, continue with enhanced engagement
- **[C] Response:** Proceed to next logical step in workflow

---

## Next Step

Proceed to `step-04-c-document-error-handling.md` to define error contracts.
