# Create Module Architecture

---

## When to Use This Workflow

**Use when:**
- Designing a new module within an existing modular monolith
- Foundation gate (QG-F1) has passed and master architecture is frozen
- Breaking down a monolith into bounded contexts
- Adding a new business capability to the platform

**Do NOT use when:**
- Master architecture does not exist (use `create-master-architecture` first)
- Foundation gate (QG-F1) has not passed
- Modifying an existing module architecture (use Edit mode)
- Validating module design (use `validate-module` workflow)

**Prerequisites:**
- `master-architecture.md` exists and is approved
- QG-F1 (Foundation Gate) passed
- Module identified in the master architecture module catalog
- Clear understanding of the bounded context boundaries

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
- **Required gates passed:** QG-F1 (Foundation Gate)
- **Required artifacts:**
  - `master-architecture.md` - frozen master architecture
  - Module identified in master architecture module catalog

---

## Quality Gates

### Entry Gate: QG-F1 (Foundation Gate)
This workflow requires QG-F1 to pass before execution:
- Master architecture exists and is frozen
- Tenant model defined
- Module boundaries documented

### Exit Gate: QG-M1 (Module Architecture)
This workflow produces artifacts that must pass QG-M1 validation. Upon completion, the following patterns must be verified:

| Pattern | Description | Verification |
|---------|-------------|--------------|
| `module-boundaries` | Bounded context defined | Clear domain model, facade contract |
| `facade-contracts` | Facade contract exists | Versioned contract with DTOs |

**Required Verification Tests (from quality-gates.csv):**
- bounded context defined
- facade contract exists
- module dependencies mapped
- no circular dependencies

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-M1`

### Contributes to Downstream Gates
- **QG-I1** (Convergence) - Module facades enable integration testing
- **QG-S1** (Module Architecture Readiness) - Module ready for sprint
- **QG-S2** (Module Implementation Readiness) - Stories can be defined

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv`
