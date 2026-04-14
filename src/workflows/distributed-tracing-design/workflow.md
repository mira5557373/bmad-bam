# Distributed Tracing Design

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
| **Create** | Generate new Distributed Tracing Design from scratch | `steps/step-01-c-*` |
| **Edit** | Modify existing Distributed Tracing Design | `steps/step-10-e-*` |
| **Validate** | Check Distributed Tracing Design against quality criteria | `steps/step-20-v-*` |

Default: **Create** mode. In headless mode, always use Create.

### Create Mode
Follow the steps in `steps/` sequentially:
- `step-01-c-tracing-architecture.md` - Define OpenTelemetry SDK and exporter configuration
- `step-02-c-context-propagation.md` - Design trace context propagation across boundaries
- `step-03-c-tenant-correlation.md` - Add tenant_id correlation to all traces
- `step-04-c-sampling-strategies.md` - Define tier-based sampling policies

### Edit Mode
Load the existing output artifact, then follow:
- `step-10-e-load-existing.md` - Load existing distributed-tracing-design.md
- `step-11-e-apply-changes.md` - Apply targeted modifications

### Validate Mode
Load the existing output artifact, then follow:
- `step-20-v-load-artifact.md` - Load distributed tracing artifacts
- `step-21-v-validate.md` - Run QG-P1 validation checks
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
  - `master-architecture.md` (from create-master-architecture) - provides base architecture
  - `tenant-model.md` (from tenant-model-isolation) - provides tenant context design
  - `project-context.md` (if exists)
- **Required gates passed:** QG-F1 (Foundation), QG-M2 (Tenant Isolation) recommended

---

## Quality Gates

### Entry Gate
- QG-F1 (Foundation) must pass
- QG-M2 (Tenant Isolation) recommended

### Exit Gate: QG-P1 (Production Readiness)
This workflow contributes to QG-P1. Upon completion, the following patterns must be verified:

| Pattern | Description | Verification |
|---------|-------------|--------------|
| `tracing_configured` | OpenTelemetry SDK configured | Exporter and SDK config documented |
| `context_propagation_complete` | All boundaries have trace propagation | HTTP, gRPC, queues, jobs covered |
| `tenant_correlation_active` | Tenant ID in all spans | Middleware injection verified |
| `sampling_policy_defined` | Tier-based sampling rates | Enterprise/Pro/Free rates documented |

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-P1`

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv`

## Templates

- **Load template:** `{project-root}/_bmad/bam/templates/distributed-tracing-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/observability-design-template.md`
