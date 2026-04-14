# Create Master Architecture

---

## When to Use This Workflow

**Use when:**
- Starting a new multi-tenant SaaS platform from scratch
- No master-architecture.md exists for the project
- Major architectural pivot requiring complete redesign
- Merging multiple existing systems into a unified platform

**Do NOT use when:**
- Master architecture already exists (use Edit mode instead)
- Making incremental changes to existing architecture (use `master-architecture-emergency-change` workflow)
- Only designing a single module (use `create-module-architecture` workflow)
- Validating existing architecture (use `validate-foundation` workflow)

**Prerequisites:**
- Product brief or PRD available (recommended but not required)
- Decision on tenant isolation strategy (`{tenant_model}` config)
- Decision on AI runtime framework (`{ai_runtime}` config)
- TSA tech-radar.yaml and tsa-versions.yaml (if TSA module installed)

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
| **Create** | Generate new Master Architecture from scratch | `steps/step-01-c-*` |
| **Edit** | Modify existing Master Architecture | `steps/step-10-e-*` |
| **Validate** | Check Master Architecture against quality criteria | `steps/step-20-v-*` |

Default: **Create** mode. In headless mode, always use Create.

### Create Mode
Follow the steps in `steps/` sequentially:
- `step-01-c-discovery.md` - Load inputs and identify gaps
- `step-02-c-tenant-model-decisions.md` - Define isolation strategy
- `step-03-c-ai-runtime-decisions.md` - Define agent registry and safety
- `step-04-c-module-boundary-rules.md` - Define facade and dependency patterns
- `step-05-c-shared-kernel-definition.md` - Define TenantContext and base contracts
- `step-06-c-technology-stack.md` - Extract TSA decisions and version pins
- `step-07-c-core-contracts.md` - Define template contracts
- `step-08-c-code-patterns.md` - Produce working examples
- `step-09-c-assembly.md` - Combine into master-architecture.md

### Edit Mode
Load the existing output artifact, then follow:
- `step-10-e-load-existing.md` - Load and parse existing master-architecture.md
- `step-11-e-apply-changes.md` - Apply targeted modifications with ADR

### Validate Mode
Load the existing output artifact, then follow:
- `step-20-v-load-artifact.md` - Load master-architecture.md
- `step-21-v-validate.md` - Run validation checks
- `step-22-v-report.md` - Generate validation report

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
  - Product brief / PRD (recommended)
  - TSA `tech-radar.yaml` and `tsa-versions.yaml` (if TSA module installed)
  - `project-context.md` (if exists)
- **Required gates passed:** None (this is a foundation entry point)

---

## Quality Gates

### Entry Gate
- None (this is a foundation entry point)

### Exit Gate: QG-F1 (Foundation Gate)
This workflow produces artifacts that must pass QG-F1 validation. Upon completion, the following patterns must be verified:

| Pattern | Description | Verification |
|---------|-------------|--------------|
| `tenant-isolation` | Tenant isolation strategy defined | Master architecture includes isolation model |
| `agent-runtime` | AI runtime architecture documented | Agent registry, tool registry, memory tiers |
| `module-boundaries` | Module dependency rules established | Facade patterns, forbidden dependencies |

**Required Verification Tests (from quality-gates.csv):**
- master-arch exists
- tenant model selected
- run-contract defined
- module boundaries documented

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-F1`

### Contributes to Downstream Gates
- **QG-M1** (Module Architecture) - Master architecture enables module design
- **QG-M2** (Tenant Isolation) - Tenant model enables isolation verification
- **QG-M3** (Agent Runtime) - AI runtime enables agent architecture

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv`
