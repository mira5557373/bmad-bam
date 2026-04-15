# AI Observability Setup

---

## When to Use This Workflow

**Use when:**
- Setting up AI/LLM observability infrastructure
- Configuring per-tenant token usage tracking
- Establishing AI latency monitoring
- Defining AI quality metrics and SLOs

**Do NOT use when:**
- Designing AI runtime architecture (use `agent-runtime-architecture` workflow)
- Evaluating AI quality (use `llm-evaluation-pipeline` workflow)
- Setting up general observability (use `tenant-aware-observability` workflow)

**Prerequisites:**
- AI runtime architecture defined
- Monitoring infrastructure in place
- LLM providers configured

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
| **Create** | Set up new AI observability | `steps/step-01-c-*` |
| **Edit** | Modify existing setup | `steps/step-10-e-*` |
| **Validate** | Verify setup completeness | `steps/step-20-v-*` |

Default: **Create** mode. In headless mode, always use Create.

### Create Mode
Follow the steps in `steps/` sequentially:
- `step-01-c-llm-metrics-collection.md` - Set up LLM metrics collection
- `step-02-c-token-usage-tracking.md` - Configure token tracking per tenant
- `step-03-c-latency-monitoring.md` - Set up latency monitoring
- `step-04-c-cost-calculation.md` - Configure cost per request
- `step-05-c-quality-metrics.md` - Define quality metrics

### Edit Mode
Load the existing setup, then follow:
- `step-10-e-load-existing.md` - Load existing AI observability configuration
- `step-11-e-apply-changes.md` - Apply updates to configuration

### Validate Mode
Load the existing setup, then follow:
- `step-20-v-load-artifact.md` - Load observability artifacts
- `step-21-v-validate.md` - Run QG-AI2 validation checks
- `step-22-v-generate-report.md` - Generate validation report

---

## Activation

1. **Load BMM config** from `{project-root}/_bmad/bmm/config.yaml` and resolve standard variables.

2. **Load BAM config** and resolve:
   - Use `{tenant_model}` for tenant attribution context
   - Use `{ai_runtime}` for AI runtime context
   - Use `{output_folder}` for artifact output location

3. **Load project context** — Search for `**/project-context.md`. If found, load as foundational reference.

4. **EXECUTION** — Read fully and follow the first step file to begin.

---

## Prerequisites

- **Config required:** `{tenant_model}`, `{ai_runtime}`
- **Required artifacts:**
  - AI runtime architecture
  - Monitoring infrastructure
  - `project-context.md` (if exists)
- **Required gates passed:** QG-M3 (Agent Runtime) recommended

---

## Quality Gates

### Entry Gate
- AI runtime architecture defined
- Monitoring infrastructure in place

### Exit Gate: QG-AI2 (AI Observability)
This workflow produces artifacts that must pass QG-AI2 validation. Upon completion, the following patterns must be verified:

| Pattern | Description | Verification |
|---------|-------------|--------------|
| `llm_metrics_collected` | LLM traces and metrics collected | Collection active |
| `token_usage_tracked` | Per-tenant token tracking | Attribution working |
| `latency_monitored` | AI latency SLOs defined | Dashboards active |
| `cost_per_request_calculated` | Request cost attribution | Calculation implemented |
| `quality_metrics_defined` | AI quality metrics defined | Metrics collecting |

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-AI2`

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv`

## Templates

- **Load template:** `{project-root}/_bmad/bam/data/templates/ai-observability-template.md`
