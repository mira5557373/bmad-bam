# Tenant Model Isolation

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
| **Create** | Generate new Tenant Model from scratch | `steps/step-01-c-*` |
| **Edit** | Modify existing Tenant Model | `steps/step-10-e-*` |
| **Validate** | Check Tenant Model against quality criteria | `steps/step-20-v-*` |

Default: **Create** mode. In headless mode, always use Create.

### Create Mode
Follow the steps in `steps/` sequentially:
- `step-01-c-tenant-model-definition.md` - Define tenant entity and tier model
- `step-02-c-isolation-matrix-creation.md` - Classify all asset types by isolation
- `step-03-c-context-propagation-design.md` - Define context flow across boundaries
- `step-04-c-sharing-rules.md` - Define cross-tenant and shared data rules
- `step-05-c-compliance-mapping.md` - Map GDPR, audit, and data residency requirements

### Edit Mode
Load the existing output artifact, then follow:
- `step-10-e-load-existing.md` - Load existing tenant-model.md and isolation-matrix.md
- `step-11-e-apply-changes.md` - Apply targeted modifications

### Validate Mode
Load the existing output artifact, then follow:
- `step-20-v-load-artifact.md` - Load tenant model artifacts
- `step-21-v-validate.md` - Run QG-M2 validation checks
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
  - `master-architecture.md` (from create-master-architecture) - provides base isolation strategy
  - `project-context.md` (if exists)
- **Required gates passed:** None (runs in parallel with create-master-architecture or after)

---

## Quality Gates

### Entry Gate
- None (entry workflow for QG-S7)

### Exit Gate: QG-S7 (Data Protection Gate)
This workflow is the entry point for QG-S7. Upon completion, the following patterns must be verified:

| Pattern | Description | Verification |
|---------|-------------|--------------|
| `classification_implemented` | Data classification scheme applied to tenant data | Isolation matrix includes sensitivity levels |
| `dlp_policies_active` | Data loss prevention policies defined | Cross-tenant data sharing rules enforced |
| `encryption_verified` | Encryption requirements documented per data type | Isolation matrix specifies encryption at rest/transit |
| `access_logging_active` | Access logging for tenant data | Audit trail requirements in compliance mapping |
| `retention_enforced` | Data retention policies defined | Compliance mapping includes retention requirements |

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-S7`

### Contributes to: QG-DC1 (Data Classification)
This workflow contributes to QG-DC1 by establishing the data classification foundation:

| QG-DC1 Pattern | This Workflow's Contribution |
|----------------|------------------------------|
| `classification_scheme_defined` | Step 2 (Isolation Matrix) defines sensitivity levels per asset type |
| `data_inventory_complete` | Step 2 inventories all tenant data assets |
| `sensitivity_labels_applied` | Isolation matrix applies sensitivity labels (PUBLIC, INTERNAL, CONFIDENTIAL, RESTRICTED) |
| `handling_procedures_documented` | Step 4 (Sharing Rules) documents data handling procedures |

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-DC1`

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv`

## Templates

- **Load template:** `{project-root}/_bmad/bam/templates/customization-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/performance-isolation-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/tenant-model-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/tenant-routing-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/testing-isolation-template.md`
