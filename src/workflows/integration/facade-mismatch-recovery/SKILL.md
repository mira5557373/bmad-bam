---
name: facade-mismatch-recovery
displayName: Facade Mismatch Recovery
description: Recover from unplanned facade contract divergence. Use when the user requests to 'fix facade mismatch' or 'recover contract divergence'.
module: bam
tags: [integration]
---

# Facade Contract Mismatch Recovery

## Overview

This workflow recovers from situations where a module's implementation has diverged from its documented facade contract. This can happen due to hotfixes, incomplete migrations, or development drift. It detects mismatches, assesses impact, and produces a recovery plan to realign implementation with contract (or update the contract to match reality).

Act as an Integration Architect diagnosing and resolving cross-module contract issues.

**Args:** Accepts module name or contract path. Accepts `--headless` / `-H`.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

**Intent Check:** Confirm the user's intent and the target module or contract path before processing. Verify the facade contract exists and the reported mismatch is the correct target for recovery.

## When to Use

- Recovering from facade contract mismatches
- Resolving module integration conflicts
- Repairing broken contract dependencies

## Mode

Select execution mode:

| Mode | Description |
|------|-------------|
| **Create** | Generate new artifact from scratch |
| **Edit** | Load existing artifact and apply targeted modifications |
| **Validate** | Check existing artifact against quality criteria |

Default: **Create** mode. In headless mode, always use Create.

## Workflow

### Step 1: Mismatch Detection

- Compare documented facade contract with actual implementation
- Identify: missing methods, changed signatures, new undocumented methods
- Identify: changed DTOs, new error types, modified event schemas

### Step 2: Impact Assessment

- Which consumers are affected?
- Are any consumers currently broken?
- What is the severity? (breaking vs additive vs cosmetic)

### Step 3: Recovery Decision

| Situation                                    | Action                                  |
| -------------------------------------------- | --------------------------------------- |
| Implementation is correct, contract is stale | Update contract to match implementation |
| Contract is correct, implementation drifted  | Fix implementation to match contract    |
| Both need changes                            | Create migration plan                   |

**Soft Gate:** Steps 1-3 complete the diagnosis and recovery decision. Present a summary of mismatches found, severity, and chosen recovery direction. Ask for confirmation before proceeding to recovery plan and verification.

### Step 4: Recovery Plan

- Document specific changes needed
- Create stories for implementation fixes or contract updates
- If breaking: follow `bmad-bam-evolve-facade-contract` process
- If additive: minor version bump on contract

### Step 5: Verification

- Run facade contract tests after recovery
- Verify all consumers still work
- Update sprint-status with recovery status

## Output

- `{output_folder}/planning-artifacts/contracts/{module}-mismatch-report.md` — mismatch report (what diverged, severity, affected consumers)
- Recovery plan with specific actions
- Updated contract or implementation stories

## Quality Gates

This workflow contributes to:
- **QG-I1** (Convergence) - Recovery workflow for contract alignment

### Entry Gate
- QG-M1 (Module Architecture) must pass for affected module
- Mismatch detected between contract and implementation

### Exit Gate
- Contract and implementation aligned
- All consumers verified working
- Recovery documented and sprint-status updated

## References

- Template: `{project-root}/_bmad/bam/data/templates/facade-contract-template.md`
- Module Facade Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/module-facade-patterns.md`

- Template: `{project-root}/_bmad/bam/data/templates/sprint-status-template.yaml`
- Knowledge: `{project-root}/_bmad/bam/data/agent-guides/bam/module-facade-patterns.md`
- Module Facade Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/module-facade-patterns.md`
