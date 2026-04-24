# CI/CD Pipeline Design

---

## When to Use This Workflow

**Use when:**
- Designing CI/CD pipeline for a new multi-tenant platform
- No cicd-pipeline-design.md exists
- Adding tenant-aware deployment capabilities
- Implementing production deployment strategies

**Do NOT use when:**
- CI/CD pipeline already exists (use Edit mode)
- Only updating pipeline stages (use Edit mode)
- Debugging deployment issues (use deployment troubleshooting)
- Validating existing pipeline (use Validate mode)

**Prerequisites:**
- `master-architecture.md` with platform architecture documented
- `qg-m1-module-architecture.md` with module structure documented
- Understanding of deployment requirements
- `tenant-model.md` for tenant-aware deployments (recommended)

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
| **Create** | Generate new CI/CD Pipeline Architecture from scratch | `steps/step-01-c-*` |
| **Edit** | Modify existing CI/CD Pipeline Architecture | `steps/step-10-e-*` |
| **Validate** | Check CI/CD Pipeline against production readiness criteria | `steps/step-20-v-*` |

Default: **Create** mode. In headless mode, always use Create.

### Create Mode
Follow the steps in `steps/` sequentially:
- `step-01-c-pipeline-architecture.md` - Design CI/CD pipeline architecture
- `step-02-c-testing-stages.md` - Design comprehensive testing stages
- `step-03-c-deployment-strategies.md` - Design deployment approaches
- `step-04-c-tenant-aware-releases.md` - Design tenant-specific release management

### Edit Mode
Load the existing output artifact, then follow:
- `step-10-e-load-existing.md` - Load existing cicd-pipeline-design.md
- `step-11-e-apply-changes.md` - Apply targeted modifications

### Validate Mode
Load the existing output artifact, then follow:
- `step-20-v-load-artifact.md` - Load CI/CD pipeline artifacts
- `step-21-v-validate.md` - Run production readiness validation checks
- `step-22-v-generate-report.md` - Generate validation report

---

## Activation

1. **Load BMM config** from `{project-root}/_bmad/bmm/config.yaml` and resolve standard variables.

2. **Load BAM config** and resolve:
   - Use `{tenant_model}` for tenant isolation context
   - Use `{ai_runtime}` for agent runtime context

3. **Load project context** - Search for `**/project-context.md`. If found, load as foundational reference.

4. **EXECUTION** - Read fully and follow the first step file to begin.

---

## Prerequisites

- **Config required:** `{tenant_model}`
- **Required artifacts:**
  - `master-architecture.md` (from create-master-architecture) - provides platform context
  - `qg-m1-module-architecture.md` (from create-module-architecture) - provides module structure
  - `project-context.md` (if exists)
- **Required gates passed:** None (runs after module architecture)

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv`

## Templates

- **Load template:** `{project-root}/_bmad/bam/data/templates/cicd-pipeline-template.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/deployment-strategy-template.md`
