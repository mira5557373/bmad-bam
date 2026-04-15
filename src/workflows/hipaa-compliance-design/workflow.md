# HIPAA Compliance Design

**Goal:** Design the HIPAA compliance framework including PHI protection, safeguard controls, BAA management, and breach notification procedures.

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
| **Create** | Design new HIPAA compliance framework | `steps/step-01-c-*` |
| **Edit** | Update HIPAA compliance requirements | `steps/step-10-e-*` |
| **Validate** | Check against HIPAA checklist | `steps/step-20-v-*` |

Default: **Create** mode.

### Create Mode
Follow steps with prefix `step-0X-c-` sequentially (01 through 04).

### Edit Mode
Load the existing hipaa-compliance-spec.md, then follow `step-1X-e-` (10 through 11).

### Validate Mode
Load the existing hipaa-compliance-spec.md, then follow `step-2X-v-` (20 through 22).

---

## Activation

1. **Load BMM config** from `{project-root}/_bmad/bmm/config.yaml` and resolve:
   - Use `{user_name}` for greeting
   - Use `{communication_language}` for all communications
   - Use `{document_output_language}` for output documents
   - Use `{planning_artifacts}` for output location
   - Use `{project_knowledge}` for additional context scanning

2. **Load BAM config** and resolve:
   - Use `{tenant_model}` for tenant isolation decisions (critical for PHI segregation)
   - Use `{ai_runtime}` for AI-specific compliance (EU AI Act)
   - Use `{bam_artifacts}` for BAM-specific outputs

3. **Load project context** -- Search for `**/project-context.md`.
   If found, load as foundational reference including BAM configuration section.

4. **Web Research Required**
   This workflow requires web search for current HIPAA requirements.
   Search queries from `compliance-frameworks.csv` based on HIPAA regulations.

5. **EXECUTION**
   Read fully and follow: `./steps/step-01-c-analyze-phi-data.md` to begin.

---

## Prerequisites

- **Required artifacts:** Master architecture document with tenant model
- **Required gates passed:** QG-F1 (Foundation Gate)
- **Config required:** `{tenant_model}`

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv` filter: `compliance`
- **Compliance:** Load from `{project-root}/_bmad/bam/data/compliance-frameworks.csv`
- **Templates:** `{project-root}/_bmad/bam/data/templates/hipaa-compliance-template.md`
- **Checklists:** `{project-root}/_bmad/bam/data/checklists/production-readiness.md`

## Templates

- **Load template:** `{project-root}/_bmad/bam/data/templates/hipaa-compliance-template.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/baa-management-template.md`
