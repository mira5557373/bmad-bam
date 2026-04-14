# Prompt Catalog Design

---

## When to Use This Workflow

**Use when:**
- Designing prompt library architecture for a new AI platform
- No prompt-catalog-spec.md exists
- Adding catalog management capabilities for prompts
- Establishing tenant isolation for prompt libraries

**Do NOT use when:**
- Prompt catalog architecture already exists (use Edit mode)
- Only modifying existing catalog entries (use Edit mode)
- Designing prompt versioning specifically (use `prompt-versioning-management` workflow)
- Debugging prompt behavior (use `ai-agent-debug` workflow)

**Prerequisites:**
- `master-architecture.md` with AI runtime decisions documented
- `agent-runtime-architecture.md` exists (recommended)
- `{ai_runtime}` config variable set
- Understanding of prompt management requirements

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
| **Create** | Generate new Prompt Catalog Architecture from scratch | `steps/step-01-c-*` |
| **Edit** | Modify existing Prompt Catalog Architecture | `steps/step-10-e-*` |
| **Validate** | Check Prompt Catalog Architecture against quality criteria | `steps/step-20-v-*` |

Default: **Create** mode. In headless mode, always use Create.

### Create Mode
Follow the steps in `steps/` sequentially:
- `step-01-c-catalog-requirements.md` - Define prompt catalog requirements
- `step-02-c-prompt-taxonomy.md` - Design prompt classification system
- `step-03-c-tenant-isolation.md` - Design tenant isolation for prompts
- `step-04-c-versioning-strategy.md` - Define catalog versioning approach
- `step-05-c-prompt-testing-framework.md` - Design prompt testing infrastructure
- `step-06-c-ab-testing.md` - Design A/B testing for catalog prompts
- `step-07-c-performance-tracking.md` - Define performance monitoring
- `step-08-c-access-control.md` - Design access control model
- `step-09-c-documentation.md` - Create documentation standards

### Edit Mode
Load the existing output artifact, then follow:
- `step-10-e-load-existing.md` - Load existing prompt-catalog-spec.md
- `step-11-e-apply-changes.md` - Apply targeted modifications with ADR

### Validate Mode
Load the existing output artifact, then follow:
- `step-20-v-load-artifact.md` - Load prompt catalog artifacts
- `step-21-v-validate.md` - Run QG-M3 validation checks
- `step-22-v-generate-report.md` - Generate validation report

---

## Activation

1. **Load BMM config** from `{project-root}/_bmad/bmm/config.yaml` and resolve standard variables.

2. **Load BAM config** and resolve:
   - Use `{tenant_model}` for tenant isolation context
   - Use `{ai_runtime}` for agent runtime context

3. **Load project context** — Search for `**/project-context.md`. If found, load as foundational reference.

4. **EXECUTION** — Read fully and follow the first step file to begin.

---

## Prerequisites

- **Config required:** `{tenant_model}`, `{ai_runtime}`
- **Required artifacts:**
  - `master-architecture.md` (from create-master-architecture)
  - `agent-runtime-architecture.md` (recommended)
  - `project-context.md` (if exists)
- **Required gates passed:** QG-F1 (Foundation)

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv`

## Templates

- **Load template:** `{project-root}/_bmad/bam/templates/prompt-catalog-template.md`
