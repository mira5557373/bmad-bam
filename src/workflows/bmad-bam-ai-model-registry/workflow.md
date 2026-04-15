# AI Model Registry

---

## When to Use This Workflow

**Use when:**
- Designing model registry for a new platform
- No ai-model-registry-design.md exists
- Adding model versioning to existing AI systems

**Do NOT use when:**
- Model registry already exists (use Edit mode)
- Only registering new models (use registry tools)

**Prerequisites:**
- `agent-runtime-architecture.md` with AI runtime decisions

---

## WORKFLOW ARCHITECTURE

This uses **micro-file architecture** for disciplined execution.

**Step Naming Convention:** `step-NN-mode-description.md`

---

## Mode Selection

| Mode | Description | Entry Point |
|------|-------------|-------------|
| **Create** | Generate new AI Model Registry from scratch | `steps/step-01-c-*` |
| **Edit** | Modify existing Model Registry | `steps/step-10-e-*` |
| **Validate** | Check Model Registry against criteria | `steps/step-20-v-*` |

### Create Mode
- `step-01-c-registry-schema-design.md` - Design model metadata schema
- `step-02-c-access-control-design.md` - Design permissions and sharing
- `step-03-c-deployment-integration.md` - Design deployment pipelines

### Edit Mode
- `step-10-e-load-existing.md` - Load existing registry
- `step-11-e-apply-changes.md` - Apply modifications

### Validate Mode
- `step-20-v-load-artifact.md` - Load registry artifacts
- `step-21-v-validate.md` - Run validation checks
- `step-22-v-generate-report.md` - Generate validation report

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv`
