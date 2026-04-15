# Tenant Self-Service Reporting

**Phase:** 6 (Operations) - Balances Operations phase coverage

**Goal:** Design the tenant self-service reporting capability for enabling tenant self-service reporting capabilities in multi-tenant AI platforms. Covers report builder design, data access controls, AI usage analytics, and export capabilities.

---

## WORKFLOW ARCHITECTURE

This uses **micro-file architecture** for disciplined execution:

- Each step is a self-contained file with embedded rules
- Sequential progression with user control at each step
- Document state tracked in frontmatter
- Append-only document building through conversation
- You NEVER proceed to a step file if the current step file indicates the user must approve

**Step Naming Convention:** `step-NN-mode-description.md`
- `step-0N-c-*`: Create mode (01-04)
- `step-1N-e-*`: Edit mode (10-11)
- `step-2N-v-*`: Validate mode (20-22)

---

## Mode Selection

| Mode | Description | Entry Point |
|------|-------------|-------------|
| **Create** | Design new reporting capabilities | `steps/step-01-c-*` |
| **Edit** | Update reporting requirements | `steps/step-10-e-*` |
| **Validate** | Check against production readiness | `steps/step-20-v-*` |

Default: **Create** mode.

### Create Mode
Follow Create steps sequentially:

| Step | File | Purpose |
|------|------|---------|
| 01 | `step-01-c-define-report-types.md` | Define report types and requirements |
| 02 | `step-02-c-design-builder.md` | Design self-service report builder |
| 03 | `step-03-c-configure-scheduling.md` | Configure report scheduling |
| 04 | `step-04-c-design-export.md` | Design export capabilities |

### Edit Mode
Load the existing reporting design, then follow `step-1X-e-` (10 through 11).

### Validate Mode
Load the existing reporting design, then follow `step-2X-v-` (20 through 22).

---

## Activation

1. **Load BMM config** from `{project-root}/_bmad/bmm/config.yaml` and resolve:
   - Use `{user_name}` for greeting
   - Use `{communication_language}` for all communications
   - Use `{document_output_language}` for output documents
   - Use `{planning_artifacts}` for output location
   - Use `{project_knowledge}` for additional context scanning

2. **Load BAM config** and resolve:
   - Use `{tenant_model}` for tenant-specific reporting considerations
   - Use `{bam_artifacts}` for BAM-specific outputs

3. **Load project context** — Search for `**/project-context.md`.
   If found, load as foundational reference including BAM configuration section.

4. **Web Research Optional**
   Web search can help find current self-service reporting best practices.
   Search queries: "SaaS self-service reporting {date}", "multi-tenant report builder patterns {date}"

5. **EXECUTION**
   Read fully and follow: `./steps/step-01-c-define-report-types.md` to begin.

---

## Prerequisites

- **Required artifacts:** Master architecture document
- **Required gates passed:** QG-I1 (Convergence Gate)
- **Config required:** `{tenant_model}`

---

## Quality Gates

### Entry Gate
- QG-I1 (Convergence Gate) must pass before entering this workflow

### Exit Gate: QG-SSR1 (Self-Service Reporting)
This workflow produces artifacts that satisfy self-service reporting requirements. Upon completion, the following patterns must be verified:

| Pattern | Description | Verification |
|---------|-------------|--------------|
| `report_types_defined` | Report types defined per tenant tier | Tier-specific report catalog documented |
| `report_builder_designed` | Report builder interface specified | Builder capabilities with tier features |
| `scheduling_configured` | Report scheduling options defined | Schedule frequency and quotas per tier |
| `export_channels_defined` | Export formats and delivery documented | Format options and delivery methods |
| `data_isolation_verified` | Tenant data isolation in reports | RLS/schema isolation verification |

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-SSR1`

### Contributes to: QG-P1 (Production Readiness)
This workflow contributes to QG-P1 by establishing self-service reporting capabilities:

| QG-P1 Pattern | This Workflow's Contribution |
|---------------|------------------------------|
| `tenant-features` | Complete self-service reporting per tier |
| `data-access` | Report data access with tenant isolation |
| `delivery-channels` | Multiple export and delivery options |
| `quotas-defined` | Tier-specific reporting quotas and limits |

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-P1`

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv` filter: `reporting`
- **Templates:** `{project-root}/_bmad/bam/data/templates/tenant-self-service-reporting-template.md`
- **Checklists:** `{project-root}/_bmad/bam/data/checklists/production-readiness.md`
