# Stakeholder Discovery

**Goal:** Discover and document key stakeholders for multi-tenant SaaS platform initiatives, including interest mapping, communication plans, and RACI matrix creation.

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
| **Create** | Discover and document new stakeholders | `steps/step-01-c-*` |
| **Edit** | Update stakeholder documentation | `steps/step-10-e-*` |
| **Validate** | Check against completeness criteria | `steps/step-20-v-*` |

Default: **Create** mode.

### Create Mode
Follow steps with prefix `step-0X-c-` sequentially (01 through 04).

### Edit Mode
Load the existing stakeholder map, then follow `step-1X-e-` (10 through 11).

### Validate Mode
Load the existing stakeholder map, then follow `step-2X-v-` (20 through 22).

---

## Activation

1. **Load BMM config** from `{project-root}/_bmad/bmm/config.yaml` and resolve:
   - Use `{user_name}` for greeting
   - Use `{communication_language}` for all communications
   - Use `{document_output_language}` for output documents
   - Use `{planning_artifacts}` for output location
   - Use `{project_knowledge}` for additional context scanning

2. **Load BAM config** and resolve:
   - Use `{tenant_model}` for tenant-specific stakeholder considerations
   - Use `{bam_artifacts}` for BAM-specific outputs

3. **Load project context** — Search for `**/project-context.md`.
   If found, load as foundational reference including BAM configuration section.

4. **Web Research Optional**
   Web search can help find current stakeholder management best practices.
   Search queries: "SaaS stakeholder management {date}", "multi-tenant platform governance {date}"

5. **EXECUTION**
   Read fully and follow: `./steps/step-01-c-identify-stakeholders.md` to begin.

---

## Prerequisites

- **Required artifacts:** Project context or initiative brief
- **Required gates passed:** None (Discovery phase)
- **Config required:** `{tenant_model}`

---

## Quality Gates

### Entry Gate
- Project context or initiative must be defined

### Exit Gate: QG-SD1 (Stakeholder Discovery)
This workflow produces artifacts that satisfy stakeholder identification requirements. Upon completion, the following patterns must be verified:

| Pattern | Description | Verification |
|---------|-------------|--------------|
| `stakeholders_identified` | All key stakeholder groups documented | Stakeholder map exists with all groups |
| `interests_mapped` | Stakeholder interests and influence documented | Interest mapping complete |
| `communication_planned` | Communication cadence and channels defined | Communication plan documented |
| `raci_defined` | RACI matrix for key decisions | RACI covers architecture decisions |

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-SD1`

### Contributes to: QG-F1 (Foundation)
This workflow contributes to QG-F1 by establishing stakeholder alignment:

| QG-F1 Pattern | This Workflow's Contribution |
|---------------|------------------------------|
| `stakeholder_alignment` | Complete stakeholder map with RACI |
| `governance_defined` | Decision-making process documented |
| `communication_established` | Communication plan with touchpoints |

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-F1`

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv` filter: `governance`
- **Templates:** `{project-root}/_bmad/bam/data/templates/stakeholder-map-template.md`
- **Checklists:** `{project-root}/_bmad/bam/data/checklists/foundation-gate.md`
