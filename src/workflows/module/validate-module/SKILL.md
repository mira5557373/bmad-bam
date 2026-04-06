---
name: bmad-bam-validate-module
displayName: Validate Module
description: Validate module architecture against master constraints. Use when the user requests to 'validate module' or 'check module readiness'.
module: bam
web_bundle: true
tags: [module]
---

# Validate Module

## Overview

This workflow validates that a module's architecture conforms to master architecture constraints and is ready for implementation. It checks master conformance, facade completeness, dependency integrity, event schemas, and AI behavior declarations. The gate decision determines whether the module can proceed to sprint planning.

Act as a Platform Architect validating module readiness.

**Args:** Accepts module name as argument. Accepts `--headless` / `-H` for autonomous validation.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

**Intent Check:** Confirm the user's intent and the target module name before processing. Verify the module architecture exists and is the correct target for validation.

## Mode

This workflow operates in **Validate** mode — checking existing artifacts against quality criteria.

## Validation Steps

### Step 1: Load Context

Load `master-architecture.md` and `modules/{module}/architecture.md`.

### Step 2: Master Conformance Check

- [ ] Module inherits all master architecture patterns
- [ ] No contradictions to master ADRs
- [ ] `BaseEntity` used for all entities with `tenant_id`
- [ ] Code patterns follow master examples

### Step 3: Facade Validation

- [ ] Public facade fully defined
- [ ] All methods are tenant-scoped
- [ ] DTOs and error types specified
- [ ] Facade follows master template

### Step 4: Dependency Analysis

- [ ] All consumed facades have contracts
- [ ] No circular dependencies
- [ ] No forbidden imports declared

### Step 5: Event Validation

- [ ] All events include `tenant_id` in payload
- [ ] Event schemas documented
- [ ] Event naming follows conventions

**Soft Gate:** Steps 1-5 complete the core validation checks. Present a summary of conformance, facade, dependency, and event validation results. Ask for confirmation before proceeding to AI validation and report generation.

### Step 6: AI Validation (if applicable)

- [ ] Tool permissions within policy bounds
- [ ] Memory scope correctly declared
- [ ] Agent topology justified

### Step 7: Report Generation

| Result | Action                               |
| ------ | ------------------------------------ |
| PASS   | Module ready for sprint planning     |
| FAIL   | Block sprint, fix architecture first |

## Output

- `{output_folder}/planning-artifacts/modules/{module-name}/validation-report.md`
- Sprint-status update: module status → 'validated' or 'validation-failed'

## References

- Checklist: `bam/checklists/module-readiness.md`
- Template: `bam/templates/sprint-status-template.yaml`
- Knowledge: `bam/knowledge/module-facade-patterns.md`, `bam/knowledge/ddd-module-patterns.md`
