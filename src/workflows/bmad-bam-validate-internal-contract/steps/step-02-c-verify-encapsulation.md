# Step 2: Verify Encapsulation

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- ⏸️ **ALWAYS pause after presenting findings** and await user direction

## Purpose

Validate encapsulation and module boundaries in the internal contract.

## Prerequisites

- Step 1: Load Contract Definition completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `module-boundaries`

---

## Actions

**Verify current best practices with web search:**
Search the web: "module encapsulation patterns modular monolith {date}"

_Source: [URL]_

1. **Validate Public/Private APIs**
   - Check API visibility rules
   - Verify no leaky abstractions

2. **Validate Component Boundaries**
   - Check dependency injection points
   - Verify component isolation

---

## Verification

- [ ] Public/private APIs clearly defined
- [ ] No leaky abstractions
- [ ] Component boundaries respected

## Outputs

- Encapsulation validation results

## Next Step

Proceed to Step 3: Check Tenant Context to validate tenant context flow through internal APIs.
