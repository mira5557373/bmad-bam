# Step 03: Validate Dependencies

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

Validate pattern dependencies and conflicts are resolvable.

---

## Prerequisites

- Step 02 completed: Structure validated
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Check Dependency References

For each pattern with dependencies:
- Verify referenced pattern_id exists
- Build dependency graph
- Check for circular dependencies

### 2. Check Conflict References

For each pattern with conflicts:
- Verify referenced pattern_id exists
- Document mutual exclusions

### 3. Validate Dependency Graph

- [ ] No circular dependencies
- [ ] All references resolve
- [ ] No orphaned patterns

**Verify current best practices with web search:**
Search the web: "validate dependencies best practices {date}"
Search the web: "validate dependencies enterprise SaaS {date}"

_Source: [URL]_

---

## Soft Gate Checkpoint

**Steps 1-3 complete the core pattern validation phase.**

Present summary of:
- Registry loading status
- Structure validation results
- Dependency graph and conflict analysis

Ask for confirmation before proceeding to query validation.

---

## COLLABORATION MENUS (A/P/C):

After validating dependencies:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into dependency graph
- **P (Party Mode)**: Bring architect perspectives on relationships
- **C (Continue)**: Proceed to validate web queries
- **[Specific concerns]**: Describe dependency concerns

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

- [ ] Dependencies resolve
- [ ] No circular references
- [ ] Conflicts documented

---

## Outputs

- Dependency validation results
- Dependency graph
- Conflict documentation

---

## Next Step

Proceed to `step-04-c-validate-queries.md` to validate web queries.
