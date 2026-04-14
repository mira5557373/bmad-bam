# Model Fine-tuning Design

---

## When to Use This Workflow

**Use when:**
- Designing tenant-specific LLM model fine-tuning capabilities
- Creating fine-tuning data pipelines with tenant isolation
- No model-fine-tuning-spec.md exists
- Adding custom model training to an existing multi-tenant AI platform

**Do NOT use when:**
- Fine-tuning design already exists (use Edit mode)
- Only updating quotas or limits (use Edit mode)
- Debugging fine-tuning jobs (use `ai-agent-debug` workflow)
- Validating model safety (use `ai-eval-safety-design` workflow)

**Prerequisites:**
- `master-architecture.md` with AI runtime decisions documented
- `agent-runtime-architecture.md` (recommended but not required)
- Understanding of tenant fine-tuning requirements
- `tenant-model.md` for tenant-scoped data isolation rules (recommended)

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
| **Create** | Generate new Model Fine-tuning Design from scratch | `steps/step-01-c-*` |
| **Edit** | Modify existing Model Fine-tuning Design | `steps/step-10-e-*` |
| **Validate** | Check Model Fine-tuning Design against quality criteria | `steps/step-20-v-*` |

Default: **Create** mode. In headless mode, always use Create.

### Create Mode
Follow the steps in `steps/` sequentially:
- `step-01-c-requirements-analysis.md` - Analyze fine-tuning requirements
- `step-02-c-data-isolation-design.md` - Design tenant data isolation
- `step-03-c-training-config-design.md` - Configure training infrastructure
- `step-04-c-tenant-quota-management.md` - Define quota systems
- `step-05-c-model-registry-design.md` - Design model registry
- `step-06-c-versioning-strategy.md` - Define versioning approach
- `step-07-c-rollback-strategy.md` - Design rollback mechanisms
- `step-08-c-monitoring-design.md` - Define monitoring infrastructure
- `step-09-c-documentation.md` - Complete documentation

### Edit Mode
Load the existing output artifact, then follow:
- `step-10-e-load-existing.md` - Load existing model-fine-tuning-spec.md
- `step-11-e-apply-changes.md` - Apply targeted modifications with ADR

### Validate Mode
Load the existing output artifact, then follow:
- `step-20-v-load-artifact.md` - Load fine-tuning artifacts
- `step-21-v-validate.md` - Run validation checks
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
  - `master-architecture.md` (from create-master-architecture) - provides AI runtime base decisions
  - `tenant-model.md` (from tenant-model-isolation) - provides tenant-scoped data isolation rules
  - `project-context.md` (if exists)
- **Recommended artifacts:**
  - `agent-runtime-architecture.md` (from agent-runtime-architecture) - provides AI runtime patterns

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv`

## Templates

- **Load template:** `{project-root}/_bmad/bam/templates/model-fine-tuning-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/model-card-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/model-governance-template.md`
