# Tenant Data Migration

**Goal:** Design the tenant data migration strategy including cross-tenant isolation during migration, rollback procedures, and zero-downtime approaches.

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
| **Create** | Design new migration plan | `steps/step-01-c-*` |
| **Edit** | Update migration requirements | `steps/step-10-e-*` |
| **Validate** | Check migration readiness | `steps/step-20-v-*` |

Default: **Create** mode.

### Create Mode
Follow steps with prefix `step-0X-c-` sequentially (01 through 04).

### Edit Mode
Load the existing migration plan, then follow `step-1X-e-` (10 through 11).

### Validate Mode
Load the existing migration plan, then follow:
- `step-20-v-load-migration.md` - Load migration plan
- `step-21-v-validate-migration.md` - Validate migration readiness
- `step-22-v-generate-report.md` - Generate validation report

---

## Activation

1. **Load BMM config** from `{project-root}/_bmad/bmm/config.yaml` and resolve:
   - Use `{user_name}` for greeting
   - Use `{communication_language}` for all communications
   - Use `{document_output_language}` for output documents
   - Use `{planning_artifacts}` for output location
   - Use `{project_knowledge}` for additional context scanning

2. **Load BAM config** and resolve:
   - Use `{tenant_model}` for migration isolation approach
   - Use `{bam_artifacts}` for BAM-specific outputs

3. **Load project context** — Search for `**/project-context.md`.
   If found, load as foundational reference including BAM configuration section.

4. **Web Research Optional**
   Web search can help find migration best practices.
   Search queries: "multi-tenant data migration {date}", "zero-downtime migration patterns {date}"

5. **EXECUTION**
   Read fully and follow: `./steps/step-01-c-assess-migration-scope.md` to begin.

---

## Prerequisites

- **Required artifacts:** Master architecture document, tenant model design
- **Required gates passed:** QG-M2 (Tenant Isolation Gate)
- **Config required:** `{tenant_model}`

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv` filter: `tenant-lifecycle`
- **Templates:** `{project-root}/_bmad/bam/templates/data-migration-template.md`
