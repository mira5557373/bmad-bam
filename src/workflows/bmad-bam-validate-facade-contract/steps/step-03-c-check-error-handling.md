# Step 3: Check Error Handling

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## Purpose

Validate error handling specifications in the facade contract.

## Prerequisites

- Step 2: Verify Contract Schema completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `facade-contracts`

---

## Actions

**Verify current best practices with web search:**
Search the web: "API error handling patterns multi-tenant {date}"

_Source: [URL]_

1. **Validate Error Codes**
   - Check error code standardization
   - Verify error categorization

2. **Validate Retry Policies**
   - Check retry policy documentation
   - Verify backoff strategies

3. **Validate Circuit Breakers**
   - Check circuit breaker configuration
   - Verify fallback behaviors

---

## Verification

- [ ] Error codes standardized
- [ ] Retry policies documented
- [ ] Circuit breakers configured

## Outputs

- Error handling validation results

## Next Step

Proceed to Step 4: Validate Versioning to check versioning strategy compliance.
