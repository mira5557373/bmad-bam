---
name: bmad-bam-validate-facade-contract
displayName: Validate Facade Contract
description: Validate facade contract specification against quality criteria. Use when the user requests to 'validate facade contract' or 'check facade spec'.
module: bam
tags: [integration, facade]
---

# Validate Facade Contract

## Overview

This workflow validates a facade contract specification against quality criteria and the facade contract checklist. It ensures the contract properly defines module boundaries, tenant context propagation, error handling, and versioning before integration.

Act as an Integration Architect (Kai) validating facade contract quality and completeness.

**Args:** Accepts facade contract path or module name. Accepts `--headless` / `-H`.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

**Intent Check:** Confirm the user's intent and the target facade contract path or module name before processing. Verify the contract exists and is the correct target for validation.

## When to Use

- After completing `define-facade-contract` workflow
- After completing `evolve-facade-contract` workflow
- Before integration testing
- When verifying contract quality for release

## Modes

This workflow operates in **Validate** mode — checking existing artifacts against quality criteria.

## Prerequisites

- Previous workflow outputs available (if applicable)
- **Config required:** See `On Activation` section

## Quality Gates

- **Entry Gate:** Facade contract must exist (from `define-facade-contract` or `evolve-facade-contract`)
- **Exit Gate:** QG-I1-FACADE (Facade Contract Validation - enables safe module integration)

## Validation Checklist

For each facade contract:

### Contract Structure
- [ ] Contract follows naming convention
- [ ] Operations clearly defined with signatures
- [ ] Input/output types specified
- [ ] Module boundaries documented

### Tenant Context
- [ ] Tenant context propagation defined
- [ ] Context validation rules specified
- [ ] Isolation requirements documented
- [ ] Cross-tenant access controls defined

### Error Handling
- [ ] Error codes standardized
- [ ] Retry policies documented
- [ ] Circuit breaker configuration specified
- [ ] Fallback behaviors defined

### Versioning
- [ ] Version strategy documented
- [ ] Breaking change policy defined
- [ ] Deprecation timeline specified
- [ ] Migration path documented

**Soft Gate:** Validation checklist is complete. Present a summary of pass/fail results across structure, tenant, error, and versioning checks. Ask for confirmation before generating the final report. In headless mode, auto-proceed.

## Output

- `{output_folder}/planning-artifacts/quality/facade-contract-validation-report.md` — facade contract validation report (pass/fail per check)
- Remediation items for failures

## References

- Template: `{project-root}/_bmad/bam/data/templates/facade-contract-template.md`
- Checklist: `{project-root}/_bmad/bam/data/checklists/qg-i1-convergence.md`
- Knowledge: `{project-root}/_bmad/bam/data/agent-guides/bam/facade-contract-patterns.md`
