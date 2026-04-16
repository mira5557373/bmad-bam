---
name: bmad-bam-master-architecture-emergency-change
displayName: Master Architecture Emergency Change
description: Emergency protocol for changing frozen master architecture. Use when the user requests to 'change master architecture' or 'emergency architecture update'.
module: bam
tags: [foundation]
---

# Master Architecture Emergency Change

## Overview

This workflow handles emergency changes to the frozen master architecture document. The master architecture is frozen after the foundation gate passes — changes require formal justification, impact analysis across all modules, an ADR, and revalidation of affected modules. This is intentionally heavyweight to prevent casual changes to the platform foundation.

Act as a Platform Architect managing high-impact architectural changes with full traceability.

**Args:** Accepts change description. Accepts `--headless` / `-H`.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Making emergency changes to frozen master architecture
- Creating ADRs for architecture exceptions
- Managing critical architecture updates

## Mode

Select execution mode:

| Mode | Description |
|------|-------------|
| **Create** | Generate new artifact from scratch |
| **Edit** | Load existing artifact and apply targeted modifications |
| **Validate** | Check existing artifact against quality criteria |

Default: **Create** mode. In headless mode, always use Create.

## Workflow

### Step 1: Justification

**Intent Check:** Confirm the user's intent before processing their input.

Document why this change is necessary:

- What problem does it solve?
- Why can't it be handled at the module level?
- What is the risk of NOT making this change?
- Classification: TECH_REFRESH, MAJOR_EVOLUTION, or DEPRECATION

### Step 2: Impact Analysis

For each existing module:

- Does this change affect the module's architecture?
- Does it break any facade contracts?
- Does it require code changes?
- Estimate effort to adapt

### Step 3: ADR Creation

Write an Architecture Decision Record:

- Context (why the change is needed)
- Decision (what is changing)
- Consequences (impact on modules, timeline, risks)
- Alternatives considered

**Soft Gate:** Steps 1-3 complete the justification, impact analysis, and ADR. Present a summary of the proposed change, its impact, and the ADR. Ask for confirmation before proceeding to apply the change.

### Step 4: Apply Change

- Update master-architecture.md with the change
- Update version and changelog
- Mark affected sections

### Step 5: Revalidation Tracking

- Create revalidation tasks for each affected module
- Track revalidation status in sprint-status
- Modules must re-pass validation after adapting to the change

## Output

- `{output_folder}/planning-artifacts/architecture/adrs/{change-name}-adr.md` — ADR document
- Updated `{output_folder}/planning-artifacts/master-architecture.md`
- `{output_folder}/planning-artifacts/architecture/adrs/{change-name}-impact-report.md` — impact report with per-module assessment
- Revalidation tracking entries in sprint-status

## Quality Gates

This workflow contributes to:
- **QG-F1** (Foundation) - Changes to master architecture require re-validation of foundation gate
- **QG-I1** (Convergence) - Emergency changes may affect module convergence

### Entry Gate
- QG-F1 (Foundation) must have previously passed before changes can be considered

### Exit Gate
- ADR approved with full impact analysis
- Affected modules identified for revalidation
- QG-F1 checklist items from `foundation-gate.md` scheduled for re-verification

## Related Workflows

- `create-master-architecture` - Original architecture creation
- `validate-foundation` - Foundation revalidation after changes

## References

- Template: `{project-root}/_bmad/bam/data/templates/evolution-backlog-template.md`, `{project-root}/_bmad/bam/data/templates/sprint-status-template.yaml`
- Knowledge: `{project-root}/_bmad/bam/data/agent-guides/bam/independent-development.md`
