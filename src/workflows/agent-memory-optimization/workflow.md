# Agent Memory Optimization

---

## When to Use This Workflow

**Use when:**
- Optimizing agent memory across multiple tiers
- No agent-memory-optimization.md exists
- Implementing memory quotas and eviction policies
- Tuning memory performance for cost efficiency

**Do NOT use when:**
- Memory optimization already exists (use Edit mode)
- Only adjusting quotas (use Edit mode)
- Debugging memory issues (use `ai-agent-debug` workflow)
- Designing initial memory tiers (use `agent-runtime-architecture` first)

**Prerequisites:**
- `agent-runtime-architecture.md` with memory tier design
- `{ai_runtime}` config variable set
- Understanding of memory usage patterns
- `tenant-model.md` for tenant isolation context (recommended)

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
| **Create** | Generate new Agent Memory Optimization from scratch | `steps/step-01-c-*` |
| **Edit** | Modify existing Agent Memory Optimization | `steps/step-10-e-*` |
| **Validate** | Check Agent Memory Optimization against quality criteria | `steps/step-20-v-*` |

Default: **Create** mode. In headless mode, always use Create.

### Create Mode
Follow the steps in `steps/` sequentially:
- `step-01-c-memory-audit.md` - Audit current memory usage
- `step-02-c-tier-allocation.md` - Design tier allocation
- `step-03-c-eviction-policies.md` - Define eviction policies
- `step-04-c-tenant-quotas.md` - Design quota system
- `step-05-c-performance-tuning.md` - Optimize performance
- `step-06-c-cost-controls.md` - Implement cost controls
- `step-07-c-monitoring.md` - Design monitoring
- `step-08-c-testing.md` - Plan testing strategy
- `step-09-c-documentation.md` - Generate documentation

### Edit Mode
Load the existing output artifact, then follow:
- `step-10-e-load-existing.md` - Load existing agent-memory-optimization.md
- `step-11-e-apply-changes.md` - Apply targeted modifications

### Validate Mode
Load the existing output artifact, then follow:
- `step-20-v-load-artifact.md` - Load memory optimization artifacts
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
  - `agent-runtime-architecture.md` (from agent-runtime-architecture) - provides memory tier baseline
  - `tenant-model.md` (from tenant-model-isolation) - provides tenant isolation rules
  - `project-context.md` (if exists)
- **Required gates passed:** None (runs after agent-runtime-architecture)

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv`

## Templates

- **Load template:** `{project-root}/_bmad/bam/templates/memory-tiers-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/operational-runbook-template.md`
