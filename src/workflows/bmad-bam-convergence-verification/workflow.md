# Convergence Verification

---

## When to Use This Workflow

**Use when:**
- Multiple modules are complete and ready for integration testing
- Preparing for release candidate verification (before QG-I1, QG-I2, QG-I3)
- After major facade contract changes across modules
- Validating cross-module user journeys work end-to-end

**Do NOT use when:**
- Individual modules are not yet complete (complete module development first)
- Only validating a single module (use `validate-module` workflow)
- Foundation gate has not passed (complete foundation first)
- Only checking tenant isolation (use TEA `tea-trace` workflow)

**Prerequisites:**
- QG-F1 (Foundation Gate) passed
- QG-M1, QG-M2, QG-M3 passed for all modules being integrated
- All facade contracts at stable versions (no draft/RC)
- Cross-module stories decomposed and documented

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

### Entry Gates
This workflow requires the following gates to pass before execution:
- **QG-F1** (Foundation Gate) - Master architecture frozen
- **QG-M1** (Module Architecture) - All modules have defined boundaries
- **QG-M2** (Tenant Isolation) - Tenant isolation verified per module
- **QG-M3** (Agent Runtime) - Agent architecture verified (if AI-enabled)

### Exit Gates: QG-I1, QG-I2, QG-I3 (Integration Gates)
This workflow validates all three integration gates:

#### QG-I1 (Convergence)
| Pattern | Description | Verification |
|---------|-------------|--------------|
| `facade-contracts` | Cross-module contract compatibility | All facade versions stable |
| `event-driven` | Event schema alignment | No breaking changes |

**Tests:** contracts compatible across modules; no breaking changes; integration tests pass

#### QG-I2 (Tenant Safety)
| Pattern | Description | Verification |
|---------|-------------|--------------|
| `tenant-isolation` | Cross-module tenant context | Tenant context propagates correctly |
| `testing-isolation` | Isolation tests pass | No cross-tenant data leakage |

**Tests:** integration isolation tests pass; cross-module tenant context verified; audit trail complete

#### QG-I3 (Agent Safety)
| Pattern | Description | Verification |
|---------|-------------|--------------|
| `run-contracts` | Budget enforcement | Budget limits enforced under load |
| `testing-agent-safety` | Kill switch responsive | Kill switch < 100ms response |

**Tests:** safety tests pass; budget enforcement works; kill switch responsive; adversarial tests pass

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-I1,QG-I2,QG-I3`

### Contributes to Downstream Gates
- **QG-P1** (Production Readiness) - All integration gates must pass before production

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv`

## Templates

- **Load template:** `{project-root}/_bmad/bam/data/templates/performance-baseline-template.md`
