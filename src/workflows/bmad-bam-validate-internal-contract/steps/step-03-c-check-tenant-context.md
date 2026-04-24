# Step 3: Check Tenant Context

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- ⏸️ **ALWAYS pause after presenting findings** and await user direction

## Purpose

Validate tenant context flow through internal APIs.

## Prerequisites

- Step 2: Verify Encapsulation completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `tenant-isolation`

---

## Actions

**Verify current best practices with web search:**
Search the web: "tenant context propagation internal APIs {date}"

_Source: [URL]_

1. **Validate Context Flow**
   - Check tenant context in internal APIs
   - Verify context not lost in internal calls

2. **Validate Isolation**
   - Check component-level isolation
   - Verify no context shortcuts

---

## Verification

- [ ] Tenant context flows through APIs
- [ ] Context not lost in calls
- [ ] Isolation maintained

## Outputs

- Tenant context validation results

## Next Step

Proceed to Step 4: Validate Error Handling to check internal error handling.
