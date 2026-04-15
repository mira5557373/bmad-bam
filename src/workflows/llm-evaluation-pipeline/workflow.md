# LLM Evaluation Pipeline

---

## When to Use This Workflow

**Use when:**
- Establishing automated LLM evaluation in CI/CD
- No llm-evaluation-pipeline.md exists
- Adding quality gates for AI releases
- Integrating human evaluation workflows

**Do NOT use when:**
- Evaluation pipeline already exists (use Edit mode)
- Only modifying existing benchmarks (use Edit mode)
- Running evaluations (use evaluation tools directly)
- Debugging specific model issues (use `ai-agent-debug` workflow)

**Prerequisites:**
- `agent-runtime-architecture.md` exists
- `{ai_runtime}` config variable set
- Understanding of evaluation requirements
- Test data available

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
| **Create** | Generate new LLM Evaluation Pipeline from scratch | `steps/step-01-c-*` |
| **Edit** | Modify existing LLM Evaluation Pipeline | `steps/step-10-e-*` |
| **Validate** | Check LLM Evaluation Pipeline against quality criteria | `steps/step-20-v-*` |

Default: **Create** mode. In headless mode, always use Create.

### Create Mode
Follow the steps in `steps/` sequentially:
- `step-01-c-metric-selection.md` - Define evaluation metrics
- `step-02-c-benchmark-suite.md` - Design benchmark infrastructure
- `step-03-c-ab-testing-setup.md` - Configure A/B testing
- `step-04-c-regression-tests.md` - Design regression testing
- `step-05-c-human-evaluation.md` - Integrate human evaluation

### Edit Mode
Load the existing output artifact, then follow:
- `step-10-e-load-existing.md` - Load existing evaluation pipeline
- `step-11-e-apply-changes.md` - Apply targeted modifications with ADR

### Validate Mode
Load the existing output artifact, then follow:
- `step-20-v-load-artifact.md` - Load evaluation pipeline artifacts
- `step-21-v-validate.md` - Run QG-I3 validation checks
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
  - `agent-runtime-architecture.md` (from agent-runtime-architecture)
  - `project-context.md` (if exists)
- **Required gates passed:** QG-M3 (Agent Runtime)

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv`

## Templates

- **Load template:** `{project-root}/_bmad/bam/data/templates/ai-eval-report-template.md`
