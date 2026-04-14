# Step 02: Validate Pattern Structure

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics

---

## Purpose

Validate the structure of each pattern in the registry.

---

## Prerequisites

- Step 01 completed: Registry files loaded
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Validate Required Columns

For bam-patterns.csv, verify columns:
- pattern_id (required, unique)
- category (required)
- signals (required)
- intent (required)
- variants (optional)
- decision_questions (required)
- web_queries (required for WEB_REQUIRED categories)
- verification_gate (optional)
- dependencies (optional)
- conflicts (optional)

### 2. Validate Pattern IDs

- [ ] All pattern_id values unique
- [ ] Pattern IDs follow naming convention (lowercase, hyphenated)
- [ ] No empty pattern_id values

### 3. Validate Categories

Valid categories:
- tenant-isolation
- ai-runtime
- module-architecture
- integration
- observability
- compliance
- lifecycle

### 4. Document Findings

| Pattern ID | Issue | Severity |
|------------|-------|----------|
| | | |

**Verify current best practices with web search:**
Search the web: "validate pattern structure best practices {date}"
Search the web: "validate pattern structure enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After validating structure, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into structure issues
- **P (Party Mode)**: Bring data quality perspectives
- **C (Continue)**: Proceed to validate dependencies
- **[Specific findings]**: Describe specific structure issues

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: structure validation results
- Process enhanced insights on data quality
- Ask user: "Accept this quality analysis? (y/n)"
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review pattern structure validation results"
- Process data quality perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document structure findings
- Proceed to next step: `step-03-c-validate-dependencies.md`

---

## Verification

- [ ] Required columns present
- [ ] Pattern IDs unique
- [ ] Categories valid
- [ ] Findings documented

---

## Outputs

- Structure validation results
- Issue list by severity

---

## Next Step

Proceed to `step-03-c-validate-dependencies.md` to validate dependencies.
