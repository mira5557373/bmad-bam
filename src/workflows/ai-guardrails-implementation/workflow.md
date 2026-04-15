# AI Guardrails Implementation

---

## When to Use This Workflow

**Use when:**
- Designing AI content filtering for a new platform
- No ai-guardrails-design.md exists
- Adding safety guardrails to existing AI agents
- Implementing per-tenant content policies

**Do NOT use when:**
- Guardrails architecture already exists (use Edit mode)
- Only updating policy rules (use Edit mode)
- Debugging guardrail behavior (use `ai-agent-debug` workflow)
- Validating existing guardrails (use Validate mode)

**Prerequisites:**
- `agent-runtime-architecture.md` with AI runtime decisions documented
- `{ai_runtime}` config variable set
- Understanding of content safety requirements
- `tenant-model.md` for tenant-scoped policy isolation (recommended)

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
| **Create** | Generate new AI Guardrails Architecture from scratch | `steps/step-01-c-*` |
| **Edit** | Modify existing AI Guardrails Architecture | `steps/step-10-e-*` |
| **Validate** | Check AI Guardrails against quality criteria | `steps/step-20-v-*` |

Default: **Create** mode. In headless mode, always use Create.

### Create Mode
Follow the steps in `steps/` sequentially:
- `step-01-c-input-filtering-design.md` - Design input validation and prompt injection prevention
- `step-02-c-output-validation-design.md` - Design output validation pipeline
- `step-03-c-guardrail-framework-selection.md` - Select and configure guardrail frameworks
- `step-04-c-policy-engine-design.md` - Design tenant-configurable policy engine

### Edit Mode
Load the existing output artifact, then follow:
- `step-10-e-load-existing.md` - Load existing ai-guardrails-design.md
- `step-11-e-apply-changes.md` - Apply targeted modifications

### Validate Mode
Load the existing output artifact, then follow:
- `step-20-v-load-artifact.md` - Load guardrails artifacts
- `step-21-v-validate.md` - Run safety validation checks
- `step-22-v-generate-report.md` - Generate validation report

---

## Activation

1. **Load BMM config** from `{project-root}/_bmad/bmm/config.yaml` and resolve standard variables.

2. **Load BAM config** and resolve:
   - Use `{tenant_model}` for tenant isolation context
   - Use `{ai_runtime}` for agent runtime context

3. **Load project context** - Search for `**/project-context.md`. If found, load as foundational reference.

4. **EXECUTION** - Read fully and follow the first step file to begin.

---

## Prerequisites

- **Config required:** `{tenant_model}`, `{ai_runtime}`
- **Required artifacts:**
  - `agent-runtime-architecture.md` (from agent-runtime-architecture) - provides AI runtime base decisions
  - `tenant-model.md` (from tenant-model-isolation) - provides tenant-scoped policy isolation rules
  - `project-context.md` (if exists)
- **Required gates passed:** None (runs after agent-runtime-architecture)

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv`

## Templates

- **Load template:** `{project-root}/_bmad/bam/data/templates/ai-guardrails-template.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/content-policy-template.md`
