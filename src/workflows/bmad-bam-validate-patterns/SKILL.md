---
name: bmad-bam-validate-patterns
displayName: Validate Pattern Registry
description: Validate BAM pattern registry completeness and consistency. Use to verify pattern configuration.
module: bam
tags: [validation, patterns]
---

# Validate Pattern Registry

## Overview

This workflow validates the BAM pattern registry CSV files for completeness, consistency, and correctness. It ensures all required patterns are defined, dependencies are resolvable, and web queries are well-formed.

Act as a Platform Architect validating pattern registry configuration.

**Args:** Accepts pattern registry path. Accepts `--headless` / `-H`.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

## When to Use

- Validating pattern registry integrity
- Checking workflow/pattern alignment
- Auditing BAM module configuration

## Modes

Select execution mode:

| Mode | Description |
|------|-------------|
| **Create** | Generate new validation report |
| **Edit** | Update existing validation findings |
| **Validate** | Re-run validation checks |

Default: **Create** mode. In headless mode, always use Create.

## Prerequisites

- Pattern registry CSV files present
- BAM module installed

## Workflow

### Step 1: Load Pattern Registry

- Load bam-patterns.csv
- Load tenant-models.csv
- Load ai-runtimes.csv
- Load quality-gates.csv
- Load compliance-frameworks.csv
- Verify file structure and headers

### Step 2: Validate Pattern Structure

For each pattern:
- Verify required columns present
- Check pattern_id uniqueness
- Validate category values
- Check signal keywords format

### Step 3: Validate Dependencies

- Check dependency references resolve
- Detect circular dependencies
- Verify conflict declarations
- Map pattern relationships

### Step 4: Validate Web Queries

- Check web_queries format
- Verify query templates have placeholders
- Test query resolution with sample values

### Step 5: Cross-Reference Validation

- Check step files reference valid patterns
- Verify extension pattern references
- Check agent guide pattern references
- Identify orphaned patterns

### Step 6: Generate Report

- Compile validation findings
- Categorize by severity (critical, warning, info)
- Recommend fixes for issues
- Generate coverage metrics

## Outputs

- Validation report at `{output_folder}/planning-artifacts/pattern-validation-report.md`
- Pattern coverage matrix
- Dependency graph (optional)

## Quality Gates

| Gate | Contribution | Description |
|------|--------------|-------------|
| **QG-F1** | Validates | Pattern registry foundation completeness |
| **QG-M1** | Validates | Module architecture pattern references |
| **QG-M2** | Validates | Tenant isolation pattern definitions |
| **QG-M3** | Validates | Agent runtime pattern definitions |

- **Entry Gate:** None - Validation can run at any time
- **Exit Gate:** All gates - Validates pattern registry supports all quality gates

## Related Workflows

| Workflow | Relationship | When to Use |
|----------|--------------|-------------|
| `bmad-bam-migrate-v2` | Pre-requisite | Run validation after migration |
| `bmad-bam-extend-project-context` | Related | Validate after configuration changes |

## References

- Patterns: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Tenant Models: `{project-root}/_bmad/bam/data/tenant-models.csv`
- AI Runtimes: `{project-root}/_bmad/bam/data/ai-runtimes.csv`
- Quality Gates: `{project-root}/_bmad/bam/data/quality-gates.csv`

## Headless Mode

Accepts `--headless` / `-H` for autonomous execution using defaults and available inputs.
