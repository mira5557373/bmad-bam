# Facade Mismatch Recovery

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
Follow the steps in `steps/` sequentially (step-01-c through step-09-c).

### Edit Mode
Load the existing output artifact, then follow `steps/` for targeted modifications (step-10-e through step-19-e).

### Validate Mode
Load the existing output artifact, then follow `steps/` for validation against quality criteria (step-20-v through step-29-v).

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

### Entry Gate
- QG-M1 (Module Architecture) failure triggered this recovery workflow

### Recovery Gates: QG-M1-R, QG-R1
This is a recovery workflow that uses specialized recovery gates:

| Gate | Description | Verification |
|------|-------------|--------------|
| QG-M1-R | Module Architecture Recovery | Root cause identified, recovery path selected, locked categories preserved |
| QG-R1 | General Recovery Gate | Issue classified, salvage complete, recovery timeboxed |

### QG-M1-R (Module Architecture Recovery) Patterns

| Pattern | Description | Verification |
|---------|-------------|--------------|
| `root_cause_identified` | Cause of facade mismatch documented | Step 1 analysis complete |
| `recovery_path_selected` | Recovery strategy chosen (evolve, rollback, bridge) | Step 2 decision documented |
| `locked_categories` | Passing categories preserved during recovery | No regression in previously passing checks |

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-M1-R`

### QG-R1 (General Recovery Gate) Patterns

| Pattern | Description | Verification |
|---------|-------------|--------------|
| `issue_classified` | Issue severity and type classified | Step 1 classification complete |
| `salvage_complete` | Reusable artifacts identified and preserved | Salvageable work documented |
| `recovery_timeboxed` | Recovery effort has time limit | Timebox defined (max 2 recovery attempts) |

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-R1`

### Exit Gate
- Returns to QG-M1 validation after recovery complete
- Maximum 2 recovery attempts before mandatory course correction

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv`
