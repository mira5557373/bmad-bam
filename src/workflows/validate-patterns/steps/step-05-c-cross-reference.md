# Step 05: Cross-Reference Validation

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

Validate pattern references across step files and extensions.

---

## Prerequisites

- Step 04 completed: Web queries validated

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Scan Step Files

Search all step files for pattern references:
- `**Load patterns:**` directives
- Filter values (pattern IDs)

### 2. Validate References

For each pattern reference found:
- Verify pattern_id exists in bam-patterns.csv
- Document orphaned references

### 3. Check Extension References

Validate pattern references in extension YAML files.

### 4. Identify Orphaned Patterns

Patterns in registry but never referenced in step files.

**Verify current best practices with web search:**
Search the web: "cross reference validation best practices {date}"
Search the web: "cross reference validation enterprise SaaS {date}"

_Source: [URL]_

---

## Soft Gate Checkpoint

**Steps 1-5 complete the full pattern validation phase.**

Present summary of:
- Pattern reference validation results
- Extension reference validation results
- Orphaned patterns identified

Ask for confirmation before proceeding to report generation.

---

## COLLABORATION MENUS (A/P/C):

After cross-reference validation:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into coverage analysis
- **P (Party Mode)**: Bring architect perspectives on pattern usage
- **C (Continue)**: Generate validation report
- **[Specific concerns]**: Describe reference concerns

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

- [ ] Step file references valid
- [ ] Extension references valid
- [ ] Orphaned patterns documented

---

## Outputs

- Cross-reference validation results
- Reference inventory
- Orphaned pattern list

---

## Next Step

Proceed to `step-06-c-generate-report.md` to generate validation report.
