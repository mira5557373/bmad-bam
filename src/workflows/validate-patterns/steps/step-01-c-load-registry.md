# Step 01: Load Pattern Registry

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

Load all pattern registry CSV files for validation.

---

## Prerequisites

- BAM module installed with pattern registry
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv`

---


## Inputs

- User requirements and constraints for bam validate patterns
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Load Pattern Files

Load from `{project-root}/_bmad/bam/data/`:
- bam-patterns.csv
- tenant-models.csv
- ai-runtimes.csv
- quality-gates.csv
- compliance-frameworks.csv
- section-pattern-map.csv (if present)

### 2. Verify File Structure

| File | Exists | Rows | Headers Valid |
|------|--------|------|---------------|
| bam-patterns.csv | | | |
| tenant-models.csv | | | |
| ai-runtimes.csv | | | |
| quality-gates.csv | | | |
| compliance-frameworks.csv | | | |

### 3. Report Loading Results

Present summary of loaded files and any loading errors.

**Verify current best practices with web search:**
Search the web: "load pattern registry best practices {date}"
Search the web: "load pattern registry enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After loading files, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into file structure
- **P (Party Mode)**: Bring data architect perspectives
- **C (Continue)**: Proceed to validate pattern structure
- **[Specific concerns]**: Describe loading issues

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: loaded files, structure analysis
- Process enhanced insights on registry structure
- Ask user: "Accept this structure analysis? (y/n)"
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review pattern registry file structure"
- Process data architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Confirm files loaded
- Proceed to next step: `step-02-c-validate-structure.md`

---

## Verification

- [ ] All registry files loaded
- [ ] File headers verified
- [ ] Loading errors documented

---

## Outputs

- Loaded registry data
- Loading status summary

---

## Next Step

Proceed to `step-02-c-validate-structure.md` to validate pattern structure.
