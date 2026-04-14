# How to Add a New Workflow

This guide covers creating a new workflow in BAM, including the directory structure, step files, and integration with the module help system.

## Prerequisites

- BAM module installed
- Understanding of CEV (Create/Edit/Validate) mode pattern
- Access to `src/workflows/` directory

## Steps

### 1. Create Workflow Directory Structure

```bash
mkdir -p src/workflows/{workflow-name}/steps
```

Create the required files:

| File | Purpose |
|------|---------|
| `bmad-skill-manifest.yaml` | Workflow metadata and configuration |
| `SKILL.md` | Documentation for agent selection |
| `workflow.md` | Mode routing table |
| `steps/` | Step files for all modes |

### 2. Create bmad-skill-manifest.yaml

```yaml
type: workflow
name: {workflow-name}                    # MUST match directory name exactly
displayName: {Display Name}
description: "{One-line description for agent selection}"
module: bam
config_variables:
  - tenant_model
  - ai_runtime
step_naming_convention: "step-NN-mode-description"
```

> **CRITICAL BMB Requirement:** The `name` field MUST exactly match the directory name (e.g., `tenant-model-isolation`). BMB uses the directory name as the canonical ID. BMB installer will skip skills where `name` doesn't match directory.

### 3. Create SKILL.md

```markdown
---
name: {workflow-name}                    # MUST match directory name exactly
description: '{Description for agent selection}'
module: bam
web_bundle: false
tags: [category]
---

# {Workflow Display Name}

## Overview

{What this workflow produces and why}

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new artifact | `step-01-c-*` to `step-09-c-*` |
| Edit | Modify existing artifact | `step-10-e-*` to `step-19-e-*` |
| Validate | Check against criteria | `step-20-v-*` to `step-29-v-*` |

## Prerequisites

- {What must exist before running}

## Outputs

- `{output-file}.md` in `{output_folder}/planning-artifacts/`

## Related Workflows

- `bmad-bam-{related}` - {Relationship}
```

### 4. Create workflow.md (Mode Router)

```markdown
# {Workflow Name}

## Mode Selection

| Mode | Description | Step Files |
|------|-------------|------------|
| **Create** | Generate new {artifact} | `step-01-c-*` through `step-09-c-*` |
| **Edit** | Modify existing {artifact} | `step-10-e-*` through `step-19-e-*` |
| **Validate** | Check {artifact} against {criteria} | `step-20-v-*` through `step-29-v-*` |

Default: **Create** mode unless artifact exists.

### Create Mode
Follow Create steps sequentially: step-01-c -> step-02-c -> ... -> step-09-c

### Edit Mode
Follow Edit steps: step-10-e-load -> step-11-e-apply

### Validate Mode
Follow Validate steps: step-20-v-load -> step-21-v-validate -> step-22-v-report
```

### 5. Create Step Files

Step files follow the naming convention: `step-NN-mode-description.md`

| Mode | Step Range | Example |
|------|------------|---------|
| Create | 01-09 | `step-01-c-first-action.md` |
| Edit | 10-19 | `step-10-e-load-existing.md` |
| Validate | 20-29 | `step-20-v-load-artifact.md` |

**Required Sections in Each Step File:**

```markdown
# Step N: {Title}

## Purpose

{One sentence describing the goal of this step}

## Prerequisites

- {Previous step completed}
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `{pattern_id}`

## Actions

### 1. {First Action}

{Description of what to do}

### 2. {Second Action}

| Column1 | Column2 | Column3 |
|---------|---------|---------|
| Data    | Data    | Data    |

## Verification

- [ ] {Checklist item 1}
- [ ] {Checklist item 2}
- [ ] Patterns align with pattern registry

## Outputs

- {Artifact 1}
- **Load template:** `{project-root}/_bmad/bam/templates/{template}.md`

## Next Step

Proceed to `{next-step}.md` {with context}.
```

### 6. Add Web Search Directives to Create-Mode Steps

Create-mode steps should include web search directives for current best practices:

```markdown
## Actions

### 1. {Action Name}

**Verify current best practices with web search:**
Search the web: "{topic} best practices {date}"
Search the web: "{technology} patterns {date}"

Reference patterns from pattern registry and incorporate updated guidance from web research.

_Source: [URL]_
```

The `{date}` placeholder is resolved at runtime to the current year.

### 7. Add to module-help.csv

Add a row to `src/workflows/module-help.csv` with all 14 columns:

```csv
bam,bmad-bam-{workflow-name},{Display Name},{MENU-CODE},{Description},run,,{phase},{after},{before},{required},{output-location},{outputs},{keywords}
```

| Column | Description |
|--------|-------------|
| module | Always `bam` |
| skill | Full workflow name |
| display-name | Human-readable name |
| menu-code | Short code (e.g., `CMAR`) |
| description | One-line description |
| action | Usually `run` |
| args | Additional arguments (optional) |
| phase | BMAD phase (e.g., `3-solutioning`) |
| after | Prerequisite workflow(s) |
| before | Workflows this enables |
| required | `true` or `false` |
| output-location | Where output goes |
| outputs | Output filename(s) |
| keywords | Comma-separated search terms (3-5) |

### 8. Create bmad-manifest.json for Dependencies

If your workflow has dependencies on other workflows:

```json
{
  "name": "bmad-bam-{workflow-name}",
  "version": "1.0.0",
  "dependencies": {
    "bmad-bam-prerequisite-workflow": ">=1.0.0"
  },
  "outputs": [
    "{output-folder}/planning-artifacts/{artifact}.md"
  ]
}
```

### 9. Run Tests to Validate

```bash
npm test
```

Tests verify:
- Manifest file exists and is valid YAML
- SKILL.md has required frontmatter
- Step files follow naming convention
- All step files have required sections
- module-help.csv entry exists

## Best Practices

1. **Keep steps focused** - Each step should accomplish one clear objective
2. **Reference patterns, not code** - Step files describe WHAT, not HOW
3. **Use web search in Create mode** - Verify current best practices
4. **Include verification checklists** - Ensure step completion can be validated
5. **Document prerequisites clearly** - List what must exist before running

## Common Mistakes

| Mistake | Correction |
|---------|------------|
| Code in step files | Reference pattern registry instead |
| Missing web search in Create steps | Add `Search the web:` directives |
| Hardcoded year in search | Use `{date}` placeholder |
| Missing module-help entry | Add CSV row for workflow |
| Missing step modes | Include all CEV modes |

## Related

- [Test Module](test-module.md) - Testing strategies
- [Use Web Research](use-web-research.md) - Web search integration
- [CLAUDE.md](../../CLAUDE.md) - Full reference documentation
