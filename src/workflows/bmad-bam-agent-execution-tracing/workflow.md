# Agent Execution Tracing Workflow

## Mode Selection

| Mode | Description | Step Files |
|------|-------------|------------|
| **Create** | Design new agent execution tracing | `step-01-c-*` through `step-05-c-*` |
| **Edit** | Modify existing tracing configuration | `step-10-e-*` through `step-11-e-*` |
| **Validate** | Check design against QG-AI2 criteria | `step-20-v-*` through `step-22-v-*` |

Default: **Create** mode unless agent tracing configuration exists.

### Create Mode
Follow Create steps sequentially: step-01-c → step-02-c → step-03-c → step-04-c → step-05-c

### Edit Mode
Follow Edit steps: step-10-e-load → step-11-e-apply

### Validate Mode
Follow Validate steps: step-20-v-load → step-21-v-validate → step-22-v-report

---

## Step Overview

### Create Mode Steps

| Step | File | Purpose |
|------|------|---------|
| 1 | step-01-c-trace-hierarchy.md | Design span hierarchy and relationships |
| 2 | step-02-c-span-attributes.md | Define span attributes per span type |
| 3 | step-03-c-platform-integration.md | Configure OTEL/Langfuse integration |
| 4 | step-04-c-sampling-strategy.md | Design per-tier sampling strategy |
| 5 | step-05-c-debug-workflows.md | Create debugging runbooks |

### Edit Mode Steps

| Step | File | Purpose |
|------|------|---------|
| 10 | step-10-e-load-config.md | Load existing tracing configuration |
| 11 | step-11-e-apply-changes.md | Apply modifications to configuration |

### Validate Mode Steps

| Step | File | Purpose |
|------|------|---------|
| 20 | step-20-v-load-config.md | Load configuration for validation |
| 21 | step-21-v-validate.md | Validate against QG-AI2 criteria |
| 22 | step-22-v-report.md | Generate validation report |

---

## Related Resources

- **Pattern Registry:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `distributed-tracing`
- **Agent Guide:** `{project-root}/_bmad/bam/data/agent-guides/bam/agent-tracing.md`
- **Template:** `{project-root}/_bmad/bam/data/templates/agent-execution-trace-template.md`
- **Quality Gate:** `{project-root}/_bmad/bam/data/checklists/qg-ai-observability.md`
