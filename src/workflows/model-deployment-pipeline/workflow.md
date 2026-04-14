# Model Deployment Pipeline

---

## When to Use This Workflow

**Use when:**
- Designing model deployment infrastructure for a new AI platform
- No model deployment pipeline exists
- Adding deployment capabilities to an existing multi-tenant platform
- Migrating from one deployment strategy to another

**Do NOT use when:**
- Model deployment pipeline already exists (use Edit mode)
- Only updating rollout percentages (use Edit mode)
- Debugging model behavior (use `ai-agent-debug` workflow)
- Designing model fine-tuning (use `model-fine-tuning-design` workflow)

**Prerequisites:**
- `master-architecture.md` with AI runtime decisions documented
- `{ai_runtime}` config variable set (langgraph, crewai, autogen, dspy, instructor)
- Understanding of model versioning requirements
- `tenant-model.md` for tenant-scoped deployment rules (recommended)

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
| **Create** | Generate new Model Deployment Pipeline from scratch | `steps/step-01-c-*` |
| **Edit** | Modify existing Model Deployment Pipeline | `steps/step-10-e-*` |
| **Validate** | Check Model Deployment Pipeline against quality criteria | `steps/step-20-v-*` |

Default: **Create** mode. In headless mode, always use Create.

### Create Mode
Follow the steps in `steps/` sequentially:
- `step-01-c-deployment-strategy.md` - Define deployment strategy and infrastructure
- `step-02-c-tenant-rollout.md` - Design tenant-specific rollout procedures
- `step-03-c-canary-deployment.md` - Configure canary release process
- `step-04-c-model-validation.md` - Establish model validation gates
- `step-05-c-rollback-procedures.md` - Define rollback mechanisms
- `step-06-c-ab-testing.md` - Design A/B testing framework
- `step-07-c-monitoring-integration.md` - Configure monitoring and alerting
- `step-08-c-tenant-notifications.md` - Design tenant communication
- `step-09-c-documentation.md` - Create deployment documentation

### Edit Mode
Load the existing output artifact, then follow:
- `step-10-e-load-existing.md` - Load existing model-deployment-spec.md
- `step-11-e-apply-changes.md` - Apply targeted modifications with ADR

### Validate Mode
Load the existing output artifact, then follow:
- `step-20-v-load-artifact.md` - Load model deployment artifacts
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
  - `master-architecture.md` (from create-master-architecture) - provides AI runtime base decisions
  - `agent-runtime-architecture.md` (from agent-runtime-architecture) - provides agent deployment context
  - `tenant-model.md` (from tenant-model-isolation) - provides tenant-scoped deployment rules
  - `project-context.md` (if exists)
- **Required gates passed:** None (runs after agent-runtime-architecture recommended)

---

## Quality Gates

### Entry Gate
- None (runs after agent-runtime-architecture recommended)

### Exit Gate: QG-AI1 (AI Model Release Gate)
This workflow produces artifacts that satisfy QG-AI1. Upon completion, the following patterns must be verified:

| Pattern | Description | Verification |
|---------|-------------|--------------|
| `model_validated` | Model passes validation tests | Validation gates defined in step 4 |
| `tenant_rollout_planned` | Tenant-specific rollout procedures | Canary, percentage-based, and A/B testing configured |
| `rollback_tested` | Rollback mechanisms tested | Rollback procedures defined in step 5 |
| `monitoring_configured` | Model monitoring and alerting active | Monitoring integration in step 7 |

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-AI1`

### Contributes to: QG-M3 (Agent Runtime)
This workflow contributes to QG-M3 by establishing model deployment capabilities:

| QG-M3 Pattern | This Workflow's Contribution |
|---------------|------------------------------|
| `agent-runtime` | Model deployment infrastructure |
| `run-contracts` | Model versioning and validation contracts |

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-M3`

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv`

## Templates

- **Load template:** `{project-root}/_bmad/bam/templates/model-deployment-template.md`
