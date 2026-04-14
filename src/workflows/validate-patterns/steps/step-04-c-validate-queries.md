# Step 04: Validate Web Queries

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

### EXECUTION PROTOCOLS

- 🎯 **Output Delivery:** Present outputs clearly with headers
- 💾 **State Persistence:** Update document frontmatter after changes
- 📝 **Documentation:** Record decisions with rationale
- ✅ **Verification:** Confirm completion before proceeding
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics


---

## Purpose

Validate web query templates are well-formed.

---

## Prerequisites

- Step 03 completed: Dependencies validated
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Validate Query Format

For each web_queries value:
- Check for placeholder format `{variable}`
- Verify query is not empty for WEB_REQUIRED patterns

### 2. Test Query Resolution

Sample query resolution with test values:
- `{date}` → 2026
- `{ai_runtime}` → langgraph
- `{tenant_model}` → row-level-security

### 3. Document Query Issues

| Pattern ID | Query | Issue |
|------------|-------|-------|
| | | |

**Verify current best practices with web search:**
Search the web: "validate web queries best practices {date}"
Search the web: "validate web queries enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After validating queries:

```
Your options:
- **C (Continue)**: Proceed to cross-reference validation

Select an option:
```

---

## PROTOCOL INTEGRATION

### A/P/C Handler
- **[A] Response:** Deep-dive into requested topic, then return to current step
- **[P] Response:** Acknowledge party mode, continue with enhanced engagement
- **[C] Response:** Proceed to next logical step in workflow

---

## Verification

- [ ] Query format valid
- [ ] Placeholders resolvable
- [ ] WEB_REQUIRED patterns have queries

---

## Outputs

- Query validation results
- Query resolution test results
- Issue documentation

---

## Next Step

Proceed to `step-05-c-cross-reference.md` for cross-reference validation.
