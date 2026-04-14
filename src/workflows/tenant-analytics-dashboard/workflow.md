# Tenant Analytics Dashboard

---

## When to Use This Workflow

**Use when:**
- Designing analytics dashboards for a multi-tenant platform
- No tenant analytics specification exists
- Adding tenant-facing reporting and visualization
- Preparing for production readiness (QG-P1 requires analytics)

**Do NOT use when:**
- Analytics spec already exists (use Edit mode)
- Designing observability specifically (use `tenant-aware-observability` workflow)
- Only configuring operational dashboards (use operational procedures)
- Foundation is not complete (complete `create-master-architecture` first)

**Prerequisites:**
- `master-architecture.md` with tenant model defined
- Understanding of analytics stack (data warehouse, BI tools, etc.)
- List of analytics KPIs and metrics requirements
- Tenant tier definitions for access control

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
| **Create** | Generate new artifact from scratch | `steps/` |
| **Edit** | Load existing artifact and apply targeted modifications | `steps/` |
| **Validate** | Check existing artifact against quality criteria | `steps/` |

Default: **Create** mode. In headless mode, always use Create.

### Create Mode
Follow the steps in `steps/` sequentially:
- step-01-c-analytics-requirements.md
- step-02-c-data-aggregation-strategy.md
- step-03-c-tenant-data-isolation.md
- step-04-c-dashboard-components.md
- step-05-c-visualization-design.md
- step-06-c-realtime-vs-batch.md
- step-07-c-export-capabilities.md
- step-08-c-access-control.md
- step-09-c-documentation.md

### Edit Mode
Load the existing output artifact, then follow `steps/` for targeted modifications:
- step-10-e-load-existing.md
- step-11-e-apply-changes.md

### Validate Mode
Load the existing output artifact, then follow `steps/` for validation against quality criteria:
- step-20-v-load-artifact.md
- step-21-v-validate.md
- step-22-v-generate-report.md

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

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv`

## Templates

- **Load template:** `{project-root}/_bmad/bam/templates/analytics-dashboard-template.md`
