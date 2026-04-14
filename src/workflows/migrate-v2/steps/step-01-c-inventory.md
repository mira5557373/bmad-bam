# Step 01: Inventory v1 Artifacts

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

Inventory all BAM v1 artifacts including knowledge fragment references, affected step files, and template variable usages.

---

## Prerequisites

- BAM v1 project installed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv`

---


## Inputs

- User requirements and constraints for bam migrate v2
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Scan for Knowledge References

Search for all occurrences of:
- `**Load knowledge:**`
- `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: `

### 2. Map Knowledge to Pattern IDs

| Knowledge Fragment | Pattern ID |
|-------------------|------------|
| multi-tenant-patterns.md | tenant-isolation |
| agent-runtime-patterns.md | agent-runtime |
| memory-tiers.md | memory-tiers |
| module-facade-patterns.md | facade-contracts |
| ddd-module-patterns.md | module-boundaries |
| run-contracts.md | run-contracts |
| rls-best-practices.md | tenant-isolation |

### 3. Inventory Template Variables

Search for uppercase template variables: `{{[A-Z_]+}}`

### 4. Generate Migration Inventory

Document:
- Files requiring knowledge directive transformation
- Files requiring template variable transformation
- Total migration scope

**Verify current best practices with web search:**
Search the web: "inventory v1 artifacts best practices {date}"
Search the web: "inventory v1 artifacts enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After generating inventory, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into migration scope
- **P (Party Mode)**: Bring architect perspectives on migration approach
- **C (Continue)**: Accept inventory and proceed to transform directives
- **[Specific concerns]**: Describe concerns about migration scope

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: inventory results, migration scope
- Process enhanced insights on migration complexity
- Ask user: "Accept this scope assessment? (y/n)"
- If yes, document migration plan
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review BAM v1 to v2 migration inventory"
- Process architect and DevOps perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Confirm inventory complete
- Proceed to next step: `step-02-c-transform-directives.md`

---

## Verification

- [ ] Knowledge references scanned
- [ ] Knowledge-to-pattern mapping complete
- [ ] Template variables inventoried
- [ ] Migration inventory generated

---

## Outputs

- Migration inventory document
- Knowledge-to-pattern mapping table
- Files requiring transformation

---

## Next Step

Proceed to `step-02-c-transform-directives.md` to transform knowledge directives.
