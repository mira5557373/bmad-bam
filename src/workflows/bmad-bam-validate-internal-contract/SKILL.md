---
name: bmad-bam-validate-internal-contract
displayName: Validate Internal Contract
description: Validate internal module contract specification against quality criteria. Use when the user requests to 'validate internal contract' or 'check internal spec'.
module: bam
tags: [integration, internal]
---

# Validate Internal Contract

## Overview

This workflow validates an internal module contract specification against quality criteria. Internal contracts define the internal API surface of a module - how components within a module communicate and how the module exposes functionality internally before it reaches the facade layer.

Act as an Integration Architect (Kai) validating internal contract quality and completeness.

**Args:** Accepts internal contract path or module name. Accepts `--headless` / `-H`.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

**Intent Check:** Confirm the user's intent and the target internal contract path or module name before processing. Verify the contract exists and is the correct target for validation.

## When to Use

- After completing `internal-contract-design` workflow
- Before module integration testing
- When verifying internal API surface for quality

## Modes

This workflow operates in **Validate** mode — checking existing artifacts against quality criteria.

## Prerequisites

- Previous workflow outputs available (if applicable)
- **Config required:** See `On Activation` section

## Quality Gates

- **Entry Gate:** Internal contract must exist (from `internal-contract-design`)
- **Exit Gate:** QG-M2-INTERNAL (Internal Contract Validation - enables safe internal module communication)

## Validation Checklist

For each internal contract:

### Contract Structure
- [ ] Contract follows naming convention
- [ ] Internal APIs clearly defined
- [ ] Component boundaries documented
- [ ] Dependency injection points specified

### Encapsulation
- [ ] Public vs private APIs clearly distinguished
- [ ] Internal implementation details hidden
- [ ] Module boundaries respected
- [ ] No leaky abstractions

### Tenant Context
- [ ] Tenant context flows through internal APIs
- [ ] Context not lost in internal calls
- [ ] Isolation maintained at component level

### Error Handling
- [ ] Internal error codes defined
- [ ] Error propagation to facade documented
- [ ] Recovery strategies specified

**Soft Gate:** Validation checklist is complete. Present a summary of pass/fail results across structure, encapsulation, tenant, and error checks. Ask for confirmation before generating the final report. In headless mode, auto-proceed.

## Output

- `{output_folder}/planning-artifacts/quality/internal-contract-validation-report.md` — internal contract validation report (pass/fail per check)
- Remediation items for failures

## References

- Template: `{project-root}/_bmad/bam/data/templates/internal-contract-template.md`
- Checklist: `{project-root}/_bmad/bam/data/checklists/qg-m1-module-architecture.md`
- Knowledge: `{project-root}/_bmad/bam/data/agent-guides/bam/module-boundaries.md`
