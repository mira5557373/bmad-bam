# Extend Project Context

**Goal:** Add BAM configuration section to project-context.md for multi-tenant AI SaaS projects.

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
| **Create** | Add new BAM section | `steps/step-01-c-*` |
| **Edit** | Update existing BAM section | `steps/step-10-e-*` |
| **Validate** | Check BAM section completeness | `steps/step-20-v-*` |

Default: **Create** mode.

### Create Mode
Follow steps with prefix `step-0X-c-` sequentially (01 through 04).

### Edit Mode
Load the existing project-context.md, then follow `step-1X-e-` (10 through 11).

### Validate Mode
Load the existing project-context.md, then follow `step-2X-v-` (20 through 22).

---

## Activation

1. **Load BMM config** from `{project-root}/_bmad/bmm/config.yaml` and resolve:
   - Use `{user_name}` for greeting
   - Use `{communication_language}` for all communications
   - Use `{document_output_language}` for output documents
   - Use `{planning_artifacts}` for output location
   - Use `{project_knowledge}` for additional context scanning

2. **Load BAM config** and resolve:
   - Use `{tenant_model}` for tenant isolation context
   - Use `{ai_runtime}` for agent runtime context
   - Use `{bam_artifacts}` for BAM-specific outputs

3. **Load project context** — Search for `**/project-context.md`.
   If found, load as foundational reference.

4. **EXECUTION**
   Read fully and follow: `./steps/step-01-c-locate-context.md` to begin.

---

## Prerequisites

- **Required artifacts:** Existing project-context.md from BMM
- **Config required:** `{tenant_model}`, `{ai_runtime}`

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv` filter: `tenant-isolation,agent-runtime`
- **Tenant Models:** Load from `{project-root}/_bmad/bam/data/tenant-models.csv`
- **AI Runtimes:** Load from `{project-root}/_bmad/bam/data/ai-runtimes.csv`
