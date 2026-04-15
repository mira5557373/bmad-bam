# Step 9: Assembly

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

Combine all design sections from Steps 1-8 into the final `master-architecture.md` document. This document becomes the frozen foundation that all modules inherit from.

---

## Prerequisites

- All Steps 1-8 completed and approved at soft gate
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: event-driven
- **Load template:** `{project-root}/_bmad/bam/data/templates/master-architecture-template.md`
- All section content available in working memory

**Verify current best practices with web search:**
Search the web: "architecture assembly best practices {date}"
Search the web: "architecture assembly multi-tenant SaaS {date}"

Reference web research findings in your analysis.
_Source: [URL]_ for key findings.

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Load Template

```markdown
# Master Architecture: {{project_name}}

## Document Control
| Field | Value |
|-------|-------|
| Version | 1.0.0 |
| Status | DRAFT → FROZEN after QG-F1 |
| Created | {{date}} |
| Author | Platform Architect |

## Table of Contents
<!-- Auto-generated with section anchors -->
```

### 2. Assemble Required Sections

Insert content from each step in order:

| Section | Source Step | Required |
|---------|-------------|----------|
| 1. Tenant Model | Step 1 | ✅ |
| 2. AI Runtime Architecture | Step 2 | ✅ |
| 3. Module Boundaries | Step 3 | ✅ |
| 4. Shared Kernel | Step 4 | ✅ |
| 5. Technology Stack | Step 5 | ✅ |
| 6. Control Plane | Step 6 | ✅ |
| 7. Contract Standards | Step 7 | ✅ |
| 8. Code Patterns | Step 8 | ✅ |

### 3. Generate Table of Contents

```markdown
1. [Tenant Model](#tenant-model)
   - [Hierarchy](#hierarchy)
   - [Isolation Strategy](#isolation-strategy)
2. [AI Runtime Architecture](#ai-runtime-architecture)
   - [Orchestration Model](#orchestration-model)
   - [Memory Tiers](#memory-tiers)
3. [Module Boundaries](#module-boundaries)
   - [Dependency Graph](#dependency-graph)
4. [Shared Kernel](#shared-kernel)
5. [Technology Stack](#technology-stack)
6. [Control Plane](#control-plane)
7. [Contract Standards](#contract-standards)
8. [Code Patterns](#code-patterns)
```

### 4. Completeness Validation

Run validation checklist before finalizing:

```yaml
validation:
  sections:
    - name: tenant_model
      required: true
      checks:
        - hierarchy_defined: true
        - isolation_strategy: true
        - sharing_rules: true
    - name: ai_runtime
      required: true
      checks:
        - orchestration_model: true
        - memory_tiers: true
        - tool_registry: true
    - name: module_boundaries
      required: true
      checks:
        - modules_identified: true
        - dependency_graph: true
        - complexity_scores: true
    # ... additional sections
```

### 5. Validate Cross-References

Ensure internal consistency:

- [ ] All referenced technologies have version pins
- [ ] All module names match dependency graph
- [ ] All isolation strategies are in matrix
- [ ] All code patterns use defined interfaces

### 6. Write Output File

```bash
output_path="{output_folder}/planning-artifacts/master-architecture.md"
```

---

## Master Architecture Rules

**CRITICAL - These rules are enforced after foundation gate:**

1. **Created Once:** During foundation phase by Platform Architect
2. **Frozen After QG-F1:** No modifications without formal process
3. **Change Protocol:** Requires ADR via `bmad-bam-master-architecture-emergency-change`
4. **Inheritance:** All modules MUST inherit from master architecture
5. **No Module-Specific:** Contains ONLY platform-level decisions

---

## COLLABORATION MENUS (A/P/C):

After completing the assembly above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into assembly concerns or gaps
- **P (Party Mode)**: Bring architect and QA perspectives on document completeness
- **C (Continue)**: Accept assembled document and submit for QG-F1 validation
- **[Specific refinements]**: Describe sections to refine before assembly

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: assembled document, completeness checklist, cross-references
- Process enhanced insights on document quality
- Ask user: "Accept these refinements to assembled document? (y/n)"
- If yes, integrate into final document
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review assembled master architecture for completeness and consistency"
- Process architect and QA perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save assembled master architecture to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8, 9]`
- Mark document status as DRAFT
- Submit for QG-F1 validation via `bmad-bam-validate-foundation`

---

## Completeness Checklist

- [ ] All 8 required sections present
- [ ] Table of contents with working anchors
- [ ] All TSA technologies have version pins
- [ ] All isolation strategies defined in matrix
- [ ] Shared kernel interfaces complete
- [ ] At least 4 code pattern examples
- [ ] Document metadata complete
- [ ] Written to correct output path

---

## Verification

- [ ] All 8 required sections present and complete
- [ ] Table of contents generated with working anchors
- [ ] All internal cross-references validated and consistent
- [ ] Document metadata complete (version, status, date, author)
- [ ] Written to correct output path (`{output_folder}/planning-artifacts/master-architecture.md`)
- [ ] Patterns align with pattern registry

---

## Outputs

- [ ] `master-architecture.md` written to output folder
- [ ] Completeness validation passed
- [ ] Ready for QG-F1 (Foundation Gate) validation
- **Load template:** `{project-root}/_bmad/bam/data/templates/adr-template.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/architecture-diagrams-template.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/architecture-evolution-template.md`

---

## Next Step

Submit for foundation gate validation via `bmad-bam-validate-foundation`.
