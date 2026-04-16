# Tenant Requirements Analysis

**Goal:** Analyze tenant requirements from BMM discovery outputs to extract multi-tenancy patterns, compliance needs, and scaling assumptions.

---

## WORKFLOW ARCHITECTURE

This uses **micro-file architecture** for disciplined execution:

- Each step is a self-contained file with embedded rules
- Sequential progression with user control at each step
- Document state tracked in frontmatter
- Append-only document building through conversation
- You NEVER proceed to a step file if the current step file indicates the user must approve

**Step Naming Convention:** `step-NN-mode-description.md`
- `01-09`: Create mode (`step-0N-c-*`)
- `10-19`: Edit mode (`step-1N-e-*`)
- `20-29`: Validate mode (`step-2N-v-*`)

---

## Mode Selection

| Mode | Description | Entry Point |
|------|-------------|-------------|
| **Create** | Analyze tenant requirements from discovery | `steps/step-01-c-*` |
| **Edit** | Update requirements analysis | `steps/step-10-e-*` |
| **Validate** | Check against BAM patterns | `steps/step-20-v-*` |

Default: **Create** mode unless artifact exists.

### Create Mode
Follow steps with `-c-` prefix sequentially:
- step-01-c-tenant-discovery.md
- step-02-c-tenant-personas.md
- step-03-c-compliance-requirements.md
- step-04-c-scaling-assumptions.md

### Edit Mode
Follow steps with `-e-` prefix (10-11).

### Validate Mode
Follow steps with `-v-` prefix (20-22).

---

## Activation

1. **Load BMM config** from `{project-root}/_bmad/bmm/config.yaml` and resolve:
   - Use `{user_name}` for greeting
   - Use `{communication_language}` for all communications
   - Use `{document_output_language}` for output documents
   - Use `{planning_artifacts}` for output location
   - Use `{project_knowledge}` for additional context scanning

2. **Load BAM config** and resolve:
   - Use `{bam_artifacts}` for BAM-specific outputs

3. **Load project context** — Search for `**/project-context.md`.
   If found, load as foundational reference including BAM configuration section.

4. **EXECUTION**
   Read fully and follow: `./steps/step-01-c-tenant-discovery.md` to begin.

---

## Prerequisites

- **Required artifacts:** BMM discovery outputs (PRD, user research)
- **Required gates passed:** None (discovery phase)
- **Config required:** None

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv` filter: `tenant-isolation,tenant-lifecycle`
- **Tenant Models:** Load from `{project-root}/_bmad/bam/data/tenant-models.csv`
- **Templates:** `{project-root}/_bmad/bam/data/templates/tenant-requirements-template.md`
