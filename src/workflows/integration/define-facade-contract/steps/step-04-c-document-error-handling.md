# Step 4: Document Error Handling

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

Define the error handling contract between provider and consumer modules.

## Prerequisites

- Data transfer specified (Step 3)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: facade-contracts`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: agent-runtime`


---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

**Verify current best practices with web search:**
Search the web: "error handling API integration patterns {date}"
Search the web: "API error contract design {date}"

_Source: [URL]_

1. **Define Error Categories**
   - Validation errors (client can fix)
   - Business rule violations (expected domain errors)
   - Authorization errors (tenant/permission failures)
   - System errors (infrastructure failures)

2. **Specify Error Response Format**
   - Use consistent error envelope structure
   - Include error code, message, and optional details
   - Support localization of error messages

3. **Document Error Codes**
   - Create enumeration of all possible error codes
   - Document when each error occurs
   - Specify whether errors are retriable

4. **Define Retry Semantics**
   - Identify idempotent operations
   - Specify retry-safe error codes
   - Document backoff recommendations

5. **Handle Partial Failures**
   - Define behavior for batch operations
   - Specify transaction boundaries
   - Document rollback semantics

## Soft Gate Checkpoint

**Steps 1-4 complete the contract specification phase.**

Present summary of:
- Complete facade interface with error handling
- Error categories, codes, and retry semantics
- Partial failure handling for batch operations

Ask for confirmation before proceeding to contract spec generation.

---

## Verification

- [ ] Error categories defined
- [ ] Error response format specified
- [ ] Error codes documented
- [ ] Retry semantics established
- [ ] Partial failure handling documented
- [ ] Patterns align with pattern registry

## Outputs

- Error response schema
- Error code enumeration
- Retry policy recommendations

---

## COLLABORATION MENUS (A/P/C)

> **Quick Actions** - Type the letter + number:
>
> **[A] Assist Options:**
> - `A1` - Help define error categories and codes
> - `A2` - Clarify error response format structure
> - `A3` - Explain retry semantics best practices
> - `A4` - Review partial failure handling patterns
>
> **[P] Proactive Options:**
> - `P1` - Suggest comprehensive error code enumeration
> - `P2` - Flag missing tenant-specific error handling
> - `P3` - Recommend idempotency key patterns
> - `P4` - Identify operations needing rollback semantics
>
> **[C] Completion Options:**
> - `C1` - Validate error handling completeness
> - `C2` - Generate error code reference document
> - `C3` - Verify retry policy specifications
> - `C4` - **Proceed to Step 5** (generate contract spec)

---

## PROTOCOL INTEGRATION

### A/P/C Handler
- **[A] Response:** Deep-dive into requested topic, then return to current step
- **[P] Response:** Acknowledge party mode, continue with enhanced engagement
- **[C] Response:** Proceed to next logical step in workflow

---

## Next Step

Proceed to `step-05-c-generate-contract-spec.md` to assemble the complete specification.
