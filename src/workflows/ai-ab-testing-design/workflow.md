# AI A/B Testing Design

---

## When to Use This Workflow

**Use when:**
- Designing AI experimentation framework for a new platform
- No ai-ab-testing-design.md exists
- Adding A/B testing to existing AI agents
- Implementing per-tenant experiment isolation

**Do NOT use when:**
- A/B testing framework already exists (use Edit mode)
- Only creating new experiments (use experiment creation workflow)
- Analyzing existing experiments (use analysis tools)

**Prerequisites:**
- `agent-runtime-architecture.md` with AI runtime decisions documented
- `{ai_runtime}` config variable set
- Understanding of experimentation requirements
- `tenant-model.md` for tenant-scoped experiment isolation

---

## WORKFLOW ARCHITECTURE

This uses **micro-file architecture** for disciplined execution:

- Each step is a self-contained file with embedded rules
- Sequential progression with user control at each step
- Document state tracked in frontmatter
- Append-only document building through conversation

**Step Naming Convention:** `step-NN-mode-description.md`
- `01-09`: Create mode (`step-0N-c-*`)
- `10-19`: Edit mode (`step-1N-e-*`)
- `20-29`: Validate mode (`step-2N-v-*`)

---

## Mode Selection

| Mode | Description | Entry Point |
|------|-------------|-------------|
| **Create** | Generate new AI A/B Testing Architecture from scratch | `steps/step-01-c-*` |
| **Edit** | Modify existing A/B Testing Architecture | `steps/step-10-e-*` |
| **Validate** | Check A/B Testing against quality criteria | `steps/step-20-v-*` |

Default: **Create** mode. In headless mode, always use Create.

### Create Mode
Follow the steps in `steps/` sequentially:
- `step-01-c-experiment-framework-design.md` - Design core experimentation infrastructure
- `step-02-c-model-variant-management.md` - Design model variant system
- `step-03-c-metrics-collection-design.md` - Design experiment metrics pipeline
- `step-04-c-analysis-decision-engine.md` - Design experiment analysis system

### Edit Mode
- `step-10-e-load-existing.md` - Load existing ai-ab-testing-design.md
- `step-11-e-apply-changes.md` - Apply targeted modifications

### Validate Mode
- `step-20-v-load-artifact.md` - Load A/B testing artifacts
- `step-21-v-validate.md` - Run experimentation validation checks
- `step-22-v-generate-report.md` - Generate validation report

---

## Activation

1. **Load BMM config** from `{project-root}/_bmad/bmm/config.yaml` and resolve standard variables.
2. **Load BAM config** and resolve tenant and AI runtime context.
3. **Load project context** - Search for `**/project-context.md`.
4. **EXECUTION** - Read fully and follow the first step file to begin.

---

## Prerequisites

- **Config required:** `{tenant_model}`, `{ai_runtime}`
- **Required artifacts:**
  - `agent-runtime-architecture.md`
  - `tenant-model.md`

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv`

## Templates

- **Load template:** `{project-root}/_bmad/bam/data/templates/ai-ab-testing-template.md`
