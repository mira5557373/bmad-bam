# RAG Pipeline Design

---

## When to Use This Workflow

**Use when:**
- Designing knowledge retrieval infrastructure for AI agents
- No rag-pipeline-architecture.md exists
- Adding RAG capabilities to an existing AI platform
- Optimizing retrieval quality and performance

**Do NOT use when:**
- RAG pipeline architecture already exists (use Edit mode)
- Only modifying existing chunking strategy (use Edit mode)
- Debugging retrieval issues (use `ai-agent-debug` workflow)
- Evaluating retrieval quality (use `llm-evaluation-pipeline` workflow)

**Prerequisites:**
- `master-architecture.md` with AI runtime decisions documented
- `agent-runtime-architecture.md` exists (recommended)
- `{ai_runtime}` config variable set
- Understanding of knowledge retrieval requirements

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
| **Create** | Generate new RAG Pipeline Architecture from scratch | `steps/step-01-c-*` |
| **Edit** | Modify existing RAG Pipeline Architecture | `steps/step-10-e-*` |
| **Validate** | Check RAG Pipeline Architecture against quality criteria | `steps/step-20-v-*` |

Default: **Create** mode. In headless mode, always use Create.

### Create Mode
Follow the steps in `steps/` sequentially:
- `step-01-c-ingestion-design.md` - Design data ingestion pipeline
- `step-02-c-chunking-strategy.md` - Define chunking approach
- `step-03-c-embedding-management.md` - Configure embedding pipeline
- `step-04-c-retrieval-optimization.md` - Design retrieval strategy
- `step-05-c-hybrid-search.md` - Implement hybrid search

### Edit Mode
Load the existing output artifact, then follow:
- `step-10-e-load-existing.md` - Load existing rag-pipeline-architecture.md
- `step-11-e-apply-changes.md` - Apply targeted modifications with ADR

### Validate Mode
Load the existing output artifact, then follow:
- `step-20-v-load-artifact.md` - Load RAG pipeline artifacts
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

- **Load template:** `{project-root}/_bmad/bam/templates/rag-architecture-template.md`
