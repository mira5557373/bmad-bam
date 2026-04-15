---
name: bmad-bam-triage-module-complexity
displayName: Module Complexity Triage
description: Classify module complexity using 8-question assessment. Use when the user requests to 'triage module complexity' or 'classify module difficulty'.
module: bam
tags: [platform]
---

# Triage Module Complexity

## Overview

This workflow classifies each module's complexity as SIMPLE, STANDARD, or COMPLEX using an 8-question assessment. The classification drives workflow depth — SIMPLE modules skip unnecessary phases, COMPLEX modules get extended analysis with spike stories. Results are stored in sprint-status.yaml.

Act as a Platform Architect assessing module implementation complexity.

**Args:** Accepts module name or "all" for batch assessment. Accepts `--headless` / `-H`.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

**Intent Check:** Confirm the user's intent and the target module name (or "all" for batch mode) before processing. Verify the module exists in the project context.

## When to Use

- Assessing module complexity for planning
- Classifying modules as SIMPLE/STANDARD/COMPLEX
- Identifying module risk factors

## Mode

Select execution mode:

| Mode | Description |
|------|-------------|
| **Create** | Generate new artifact from scratch |
| **Edit** | Load existing artifact and apply targeted modifications |
| **Validate** | Check existing artifact against quality criteria |

Default: **Create** mode. In headless mode, always use Create.

## 8-Question Assessment

For each module, evaluate:

1. **Entity count**: How many aggregate roots / entities? (1-3: simple, 4-7: standard, 8+: complex)
2. **Dependency count**: How many facade dependencies? (0-1: simple, 2-3: standard, 4+: complex)
3. **Event complexity**: How many domain events published? (0: simple, 1-5: standard, 6+: complex)
4. **AI involvement**: Does this module have AI behaviors? (none: simple, basic: standard, multi-agent: complex)
5. **Business rules**: How complex are the domain invariants? (CRUD: simple, moderate logic: standard, complex rules: complex)
6. **External integrations**: Any third-party API integrations? (none: simple, 1: standard, 2+: complex)
7. **Data volume**: Expected data scale? (low: simple, moderate: standard, high with partitioning needs: complex)
8. **Compliance requirements**: Any regulatory constraints? (none: simple, basic: standard, GDPR/SOC2/HIPAA: complex)

### Scoring

- Each question scores 0 (simple), 1 (standard), or 2 (complex)
- Total: 0-4 = SIMPLE, 5-10 = STANDARD, 11-16 = COMPLEX
- One-way upgrade: if any single question scores 2 AND total ≥5, upgrade to COMPLEX

### Classification Impact

| Complexity | Architecture Phases           | Epic Granularity      | Special Requirements   |
| ---------- | ----------------------------- | --------------------- | ---------------------- |
| SIMPLE     | Skip phases 5-8 if not needed | 1-2 coarse epics      | None                   |
| STANDARD   | All phases                    | 3-5 standard epics    | None                   |
| COMPLEX    | All phases + extensions       | 5+ fine-grained epics | Spike stories required |

**Soft Gate:** Assessment questions and scoring are complete. Present a summary of each module's scores and proposed classification (SIMPLE/STANDARD/COMPLEX). Ask for confirmation before finalizing classifications and updating sprint-status. In headless mode, auto-proceed.

## Output

- `{output_folder}/planning-artifacts/modules/{module-name}/complexity-assessment.md` — complexity classification per module
- Updated sprint-status.yaml with `complexity: SIMPLE|STANDARD|COMPLEX` per module
- Assessment rationale for each classification

## Quality Gates

This workflow contributes to:
- **QG-F1** (Foundation) - Complexity classification informs architecture depth
- **QG-M1** (Module Architecture) - Determines phase depth for each module

### Entry Gate
- Modules identified via requirement-ingestion or existing module list
- Module feature files or documentation available

### Exit Gate
- All targeted modules classified as SIMPLE/STANDARD/COMPLEX
- Classifications recorded in sprint-status.yaml
- Assessment rationale documented per module

## References

- Template: `{project-root}/_bmad/bam/data/templates/sprint-status-template.yaml`
- Knowledge: `{project-root}/_bmad/bam/data/agent-guides/bam/independent-development.md`
