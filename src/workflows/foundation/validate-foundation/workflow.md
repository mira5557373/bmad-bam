# Validate Foundation

---

## When to Use This Workflow

**Use when:**
- Master architecture is complete and needs QG-F1 validation
- Before starting any module development
- After significant changes to tenant model or shared kernel
- Verifying foundation artifacts meet quality criteria

**Do NOT use when:**
- Master architecture does not exist (use `create-master-architecture` first)
- Creating new foundation artifacts (use `create-master-architecture` workflow)
- Validating individual modules (use `validate-module` workflow)
- Making emergency architecture changes (use `master-architecture-emergency-change` workflow)

**Prerequisites:**
- `master-architecture.md` exists (from `create-master-architecture`)
- `tenant-model.md` and `tenant-isolation-matrix.md` exist (from `tenant-model-isolation`)
- `agent-runtime-architecture.md` exists (from `agent-runtime-architecture`)
- `module-boundaries.md` exists (from `module-boundary-design`)

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
| **Create** | Generate new Foundation Gate Report from scratch | `steps/step-01-c-*` |
| **Edit** | Modify existing Foundation Gate Report | `steps/step-10-e-*` |
| **Validate** | Check Foundation Gate Report against quality criteria | `steps/step-20-v-*` |

Default: **Create** mode. In headless mode, always use Create.

### Create Mode
Follow the steps in `steps/` sequentially:
- `step-01-c-load-foundation-artifacts.md` - Load all foundation documents
- `step-02-c-check-master-architecture.md` - Validate master architecture (QG-M1)
- `step-03-c-verify-tenant-model.md` - Validate tenant isolation (QG-M2)
- `step-04-c-validate-quality-gate.md` - Run full QG-F1 gate checklist

### Edit Mode
Load the existing output artifact, then follow:
- `step-10-e-load-existing.md` - Load existing foundation-gate-report.md
- `step-11-e-apply-changes.md` - Apply targeted modifications

### Validate Mode
Load the existing output artifact, then follow:
- `step-20-v-load-artifact.md` - Load foundation-gate-report.md
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
  - `master-architecture.md` (from create-master-architecture)
  - `tenant-model.md` and `tenant-isolation-matrix.md` (from tenant-model-isolation)
  - `agent-runtime-architecture.md` (from agent-runtime-architecture)
  - `module-boundaries.md` (from module-boundary-design)
- **Required gates passed:**
  - QG-M1 (Master Architecture Readiness)
  - QG-M2 (Tenant Isolation Complete)
  - QG-M3 (Agent Runtime Readiness)

---

## Quality Gates

### Entry Gates (Sub-Gates)
The Foundation Gate is composite - it requires these sub-gates to pass:

| Gate | Name | Source Workflow |
|------|------|-----------------|
| QG-M1 | Master Architecture Readiness | `create-master-architecture` |
| QG-M2 | Tenant Isolation Complete | `tenant-model-isolation` |
| QG-M3 | Agent Runtime Readiness | `agent-runtime-architecture` |

### Exit Gate: QG-F1 (Foundation Gate)
This workflow validates and produces the QG-F1 (Foundation Gate) report. Upon PASS, the following is verified:

| Pattern | Description | Verification |
|---------|-------------|--------------|
| `tenant-isolation` | Tenant isolation strategy complete | All asset types covered |
| `agent-runtime` | Agent runtime architecture complete | Orchestration, tools, memory, safety |
| `module-boundaries` | Module boundary rules documented | Facades, dependencies, events |

**Required Verification Tests (from quality-gates.csv):**
- All foundation artifacts exist
- Tenant model decision documented
- Agent runtime selected
- Module boundaries documented

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-F1`

### Enables Downstream Workflows
Upon QG-F1 PASS:
- `create-module-architecture` - Module development can begin
- `define-facade-contract` - Facade contracts can be defined
- `convergence-verification` - Integration testing can proceed (after modules complete)

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv`
