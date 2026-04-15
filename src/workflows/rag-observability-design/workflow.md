# RAG Observability Design Workflow

## Mode Selection

| Mode | Description | Step Files |
|------|-------------|------------|
| **Create** | Design new RAG observability configuration | `step-01-c-*` through `step-05-c-*` |
| **Edit** | Modify existing RAG observability design | `step-10-e-*` through `step-11-e-*` |
| **Validate** | Check design against QG-AI2 criteria | `step-20-v-*` through `step-22-v-*` |

Default: **Create** mode unless RAG observability configuration exists.

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
| 1 | step-01-c-retrieval-metrics.md | Design retrieval latency and volume metrics |
| 2 | step-02-c-relevance-monitoring.md | Configure chunk relevance score tracking |
| 3 | step-03-c-embedding-observability.md | Set up embedding generation monitoring |
| 4 | step-04-c-quality-baselines.md | Define RAG quality baselines |
| 5 | step-05-c-tenant-dashboards.md | Design per-tenant RAG dashboards |

### Edit Mode Steps

| Step | File | Purpose |
|------|------|---------|
| 10 | step-10-e-load-config.md | Load existing RAG observability configuration |
| 11 | step-11-e-apply-changes.md | Apply modifications to configuration |

### Validate Mode Steps

| Step | File | Purpose |
|------|------|---------|
| 20 | step-20-v-load-config.md | Load configuration for validation |
| 21 | step-21-v-validate.md | Validate against QG-AI2 RAG criteria |
| 22 | step-22-v-report.md | Generate validation report |

---

## Related Resources

- **Pattern Registry:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `rag-observability`
- **Agent Guide:** `{project-root}/_bmad/bam/data/agent-guides/bam/rag-observability.md`
- **Template:** `{project-root}/_bmad/bam/data/templates/rag-observability-template.md`
- **Quality Gate:** `{project-root}/_bmad/bam/data/checklists/qg-ai-observability.md` → RAG Pipeline Observability section
