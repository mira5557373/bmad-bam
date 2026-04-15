# Vector Database Design

---

## When to Use This Workflow

**Use when:**
- Designing vector storage infrastructure for RAG systems
- No vector-database-design.md exists
- Adding semantic search capabilities to a multi-tenant platform
- Migrating from one vector database to another

**Do NOT use when:**
- Vector database architecture already exists (use Edit mode)
- Only tuning existing indexes (use Edit mode)
- Debugging vector search issues (use `ai-agent-debug` workflow)
- Designing embeddings (use `embedding-strategy-design` workflow first)

**Prerequisites:**
- `rag-pipeline-design.md` with RAG architecture decisions documented
- `{ai_runtime}` config variable set
- Understanding of embedding dimensions and expected scale
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
| **Create** | Generate new Vector Database Design from scratch | `steps/step-01-c-*` |
| **Edit** | Modify existing Vector Database Design | `steps/step-10-e-*` |
| **Validate** | Check Vector Database Design against quality criteria | `steps/step-20-v-*` |

Default: **Create** mode. In headless mode, always use Create.

### Create Mode
Follow the steps in `steps/` sequentially:
- `step-01-c-requirements.md` - Gather vector storage requirements
- `step-02-c-index-strategy.md` - Select indexing strategy
- `step-03-c-tenant-isolation.md` - Design tenant isolation
- `step-04-c-query-optimization.md` - Optimize query performance
- `step-05-c-scaling.md` - Plan scaling strategy
- `step-06-c-backup.md` - Design backup and recovery
- `step-07-c-monitoring.md` - Define monitoring requirements
- `step-08-c-security.md` - Implement security controls
- `step-09-c-documentation.md` - Generate documentation

### Edit Mode
Load the existing output artifact, then follow:
- `step-10-e-load-existing.md` - Load existing vector-database-design.md
- `step-11-e-apply-changes.md` - Apply targeted modifications

### Validate Mode
Load the existing output artifact, then follow:
- `step-20-v-load-artifact.md` - Load vector database artifacts
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
  - `rag-pipeline-design.md` (from rag-pipeline-design) - provides embedding dimensions and chunking strategy
  - `tenant-model.md` (from tenant-model-isolation) - provides tenant isolation rules
  - `project-context.md` (if exists)
- **Required gates passed:** None (runs after rag-pipeline-design)

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv`

## Templates

- **Load template:** `{project-root}/_bmad/bam/data/templates/vector-database-template.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/operational-runbook-template.md`
