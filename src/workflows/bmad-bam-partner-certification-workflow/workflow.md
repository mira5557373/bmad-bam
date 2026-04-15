# Partner Certification Workflow

**Goal:** Design the ISV/partner certification program including tier definitions, technical and business requirements, assessment processes, and renewal procedures.

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
| **Create** | Design new certification program | `steps/step-01-c-*` |
| **Edit** | Update certification requirements | `steps/step-10-e-*` |
| **Validate** | Check against completeness criteria | `steps/step-20-v-*` |

Default: **Create** mode.

### Create Mode
Follow steps with prefix `step-0X-c-` sequentially (01 through 04).

### Edit Mode
Load the existing certification program, then follow `step-1X-e-` (10 through 11).

### Validate Mode
Load the existing certification program, then follow `step-2X-v-` (20 through 22).

---

## Activation

1. **Load BMM config** from `{project-root}/_bmad/bmm/config.yaml` and resolve:
   - Use `{user_name}` for greeting
   - Use `{communication_language}` for all communications
   - Use `{document_output_language}` for output documents
   - Use `{planning_artifacts}` for output location
   - Use `{project_knowledge}` for additional context scanning

2. **Load BAM config** and resolve:
   - Use `{tenant_model}` for tenant-specific partner considerations
   - Use `{ai_runtime}` for AI partner integration requirements
   - Use `{bam_artifacts}` for BAM-specific outputs

3. **Load project context** — Search for `**/project-context.md`.
   If found, load as foundational reference including BAM configuration section.

4. **Web Research Optional**
   Web search can help find current partner program best practices.
   Search queries: "SaaS partner certification program {date}", "ISV partner tier design {date}"

5. **EXECUTION**
   Read fully and follow: `./steps/step-01-c-define-certification-tiers.md` to begin.

---

## Prerequisites

- **Required artifacts:** Master architecture document, API documentation
- **Required gates passed:** QG-F1 (Foundation Gate)
- **Config required:** `{tenant_model}`, `{ai_runtime}`

---

## Quality Gates

### Entry Gate
- QG-F1 (Foundation Gate) must pass before entering this workflow

### Exit Gate: QG-PC1 (Partner Certification)
This workflow produces artifacts that satisfy QG-PC1. Upon completion, the following patterns must be verified:

| Pattern | Description | Verification |
|---------|-------------|--------------|
| `tiers_defined` | Certification tiers with clear differentiation | Tier definitions with benefits |
| `requirements_documented` | Technical and business requirements per tier | Requirements matrix complete |
| `assessment_process` | Assessment criteria and scoring methodology | Assessment process documented |
| `renewal_designed` | Renewal and maintenance requirements | Renewal procedures defined |

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-PC1`

### Contributes to: QG-P1 (Production Readiness)
This workflow contributes to QG-P1 by establishing partner ecosystem governance:

| QG-P1 Pattern | This Workflow's Contribution |
|---------------|------------------------------|
| `partner_program` | Complete certification program with tiers |
| `marketplace_ready` | Partner assessment process defined |
| `ecosystem_governance` | Renewal and maintenance procedures |

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-P1`

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv` filter: `partner-ecosystem`
- **Templates:** `{project-root}/_bmad/bam/data/templates/partner-certification-template.md`
- **Checklists:** `{project-root}/_bmad/bam/data/checklists/production-readiness.md`
