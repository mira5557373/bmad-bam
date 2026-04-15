# Validate Module

---

## When to Use This Workflow

**Use when:**
- Module architecture is complete and needs QG-M1/M2/M3 validation
- Before starting module implementation
- After significant changes to module bounded context or facade
- Verifying module artifacts meet quality criteria

**Do NOT use when:**
- Module architecture does not exist (use `create-module-architecture` first)
- Foundation gate has not passed (complete `validate-foundation` first)
- Validating cross-module integration (use `convergence-verification` workflow)
- Creating new module artifacts (use `create-module-architecture` workflow)

**Prerequisites:**
- QG-F1 (Foundation Gate) passed
- Module architecture document exists
- Bounded context and facade contract defined
- Tenant isolation requirements documented

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
Follow the steps in `steps/` sequentially.

### Edit Mode
Load the existing output artifact, then follow `steps/` for targeted modifications.

### Validate Mode
Load the existing output artifact, then follow `steps/` for validation against quality criteria.

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

## Quality Gates

### Entry Gates
- **QG-F1** (Foundation Gate) - Must be passed before module validation
- **QG-M1** (Module Architecture) - Module architecture must exist

### Exit Gates: QG-S1 and QG-S2

This workflow validates two quality gates for module sprint readiness:

#### QG-S1 (Module Architecture Readiness)

| Pattern | Description | Verification |
|---------|-------------|--------------|
| `architecture_complete` | Module architecture document exists and is complete | All required sections present |
| `dependencies_mapped` | All module dependencies documented | Dependency graph complete |
| `facades_defined` | Facade contracts defined for all external interfaces | Facade contract exists |

#### QG-S2 (Module Implementation Readiness)

| Pattern | Description | Verification |
|---------|-------------|--------------|
| `stories_defined` | User stories exist for all module capabilities | Stories mapped to architecture |
| `acceptance_criteria` | All stories have acceptance criteria | Given/When/Then format |
| `test_plan` | Test plan documented | Test coverage mapped |

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-S1,QG-S2`

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv`
