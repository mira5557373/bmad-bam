# Embedding Strategy Design

---

## When to Use This Workflow

**Use when:**
- Designing embedding infrastructure for RAG systems
- No embedding-strategy-design.md exists
- Selecting embedding models for multi-tenant platforms
- Migrating from one embedding model to another

**Do NOT use when:**
- Embedding strategy already exists (use Edit mode)
- Only tuning batch sizes (use Edit mode)
- Debugging embedding quality (use `ai-agent-debug` workflow)
- Designing vector storage (use `vector-database-design` workflow first)

**Prerequisites:**
- `vector-database-design.md` with storage architecture decisions
- `{ai_runtime}` config variable set
- Understanding of embedding use cases and quality requirements
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
| **Create** | Generate new Embedding Strategy from scratch | `steps/step-01-c-*` |
| **Edit** | Modify existing Embedding Strategy | `steps/step-10-e-*` |
| **Validate** | Check Embedding Strategy against quality criteria | `steps/step-20-v-*` |

Default: **Create** mode. In headless mode, always use Create.

### Create Mode
Follow the steps in `steps/` sequentially:
- `step-01-c-model-selection.md` - Select embedding models
- `step-02-c-dimension-optimization.md` - Optimize embedding dimensions
- `step-03-c-tenant-namespacing.md` - Design tenant isolation
- `step-04-c-batch-processing.md` - Configure batch embedding
- `step-05-c-caching.md` - Design caching strategy
- `step-06-c-quality-metrics.md` - Define quality metrics
- `step-07-c-cost-optimization.md` - Optimize costs
- `step-08-c-integration.md` - Design integration patterns
- `step-09-c-documentation.md` - Generate documentation

### Edit Mode
Load the existing output artifact, then follow:
- `step-10-e-load-existing.md` - Load existing embedding-strategy-design.md
- `step-11-e-apply-changes.md` - Apply targeted modifications

### Validate Mode
Load the existing output artifact, then follow:
- `step-20-v-load-artifact.md` - Load embedding strategy artifacts
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
  - `vector-database-design.md` (from vector-database-design) - provides storage architecture
  - `rag-pipeline-design.md` (from rag-pipeline-design) - provides RAG context
  - `project-context.md` (if exists)
- **Required gates passed:** None (runs after vector-database-design)

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv`

## Templates

- **Load template:** `{project-root}/_bmad/bam/templates/embedding-strategy-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/operational-runbook-template.md`
