---
name: bmad-bam-convergence-verification
displayName: Convergence Verification
description: Verify cross-module integration before release. Use when the user requests to 'run convergence verification' or 'validate release readiness'.
module: bam
tags: [integration]
---

# Convergence Verification

## Overview

This workflow validates cross-module journeys, tenant safety, agent safety, and performance before a release milestone. It runs integration test suites, verifies tenant isolation under load, confirms agent eval thresholds, and checks performance SLOs. The output is a release recommendation.

Act as an Integration Architect performing pre-release integration verification.

**Args:** Accepts `--headless` / `-H` for autonomous verification.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Before any release milestone
- When verifying cross-module integration
- When validating tenant safety under load
- When confirming agent eval thresholds

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new convergence verification report | `step-01-c-*` to `step-04-c-*` |
| Edit | Modify existing verification | `step-10-e-*` to `step-11-e-*` |
| Validate | Re-run verification checks | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Previous workflow outputs available (if applicable)
- **Config required:** See `On Activation` section

## Workflow

### Step 1: Cross-Module Integration Verification

- Run cross-module test suites (facade contract tests)
- Verify event flows (published events consumed correctly)
- Validate contract compliance (all facades match documented contracts)
- Check for contract version mismatches

### Step 2: Tenant Safety Verification

- Run tenant isolation tests under concurrent load
- Verify context propagation across all boundaries
- Check for data leakage (tenant A data visible to tenant B)
- Verify RLS policies active on all queries

### Step 3: Agent Safety Verification

- Run full eval suite (golden tasks) against all agent types
- Verify fallback behavior (disable dependencies, confirm graceful degradation)
- Test kill switches (disable agent, verify fallback activates)
- Run safety test cases (injection, PII, harmful content)

### Step 4: Performance Verification

- Run load tests with multi-tenant traffic patterns
- Check noisy-neighbor behavior (one tenant's load doesn't degrade others)
- Validate latency SLOs per tier
- Validate cost projections per tier

**Soft Gate:** Steps 1-4 complete all verification phases. Present a summary of cross-module, tenant safety, agent safety, and performance results. Ask for confirmation before proceeding to the release recommendation.

### Convergence Test Priority

| Test Type                   | Priority | When                                            |
| --------------------------- | -------- | ----------------------------------------------- |
| Cross-module journey        | P0       | User flows span ≥2 modules                      |
| Tenant isolation under load | P0       | Always                                          |
| Agent eval regression       | P1       | Any AI feature changed                          |
| Performance SLO             | P1       | Any infrastructure or high-traffic path changed |
| Contract compliance         | P2       | Any facade version bumped                       |

### Quality Gates

- [ ] All integration tests pass
- [ ] Tenant isolation verified under load
- [ ] Agent evals pass thresholds
- [ ] Performance within SLOs

## Quality Gates

This workflow contributes to:
- **QG-I1** (Convergence) - Primary gate for cross-module integration
- **QG-I2** (Tenant Safety) - Verifies tenant isolation under load
- **QG-I3** (Agent Safety) - Validates agent eval thresholds and kill switches

### Entry Gate
- QG-M1 (Module Arch), QG-M2 (Tenant Isolation), QG-M3 (Agent Runtime) must all pass
- All modules must have defined facades and contracts

### Exit Gate
- QG-I1, QG-I2, QG-I3 checklist items from respective checklist files verified
- Release recommendation (GO/NO-GO) documented with evidence
- Performance SLOs validated per tier

## Output

- `{output_folder}/planning-artifacts/quality/convergence-report.md`
- Release recommendation (GO / NO-GO with specific blockers)

## References

- Checklist: `{project-root}/_bmad/bam/data/checklists/qg-i1-convergence.md`, `{project-root}/_bmad/bam/data/checklists/qg-i2-tenant-safety.md`, `{project-root}/_bmad/bam/data/checklists/qg-i3-agent-safety.md`
- Agent Runtime Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/agent-runtime-patterns.md`
- Multi-Tenant Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/multi-tenant-patterns.md`
- Tenant Isolation Testing: `{project-root}/_bmad/bam/data/agent-guides/bam/testing-tenant-isolation.md`
- Multi-Tenant Test Fixtures: `{project-root}/_bmad/bam/data/agent-guides/bam/testing-multi-tenant-fixtures.md`
- Agent Safety Testing: `{project-root}/_bmad/bam/data/agent-guides/bam/testing-agent-safety.md`
- Section Reference Map: `{project-root}/_bmad/bam/data/agent-guides/bam/section-reference-map.md`
- Workflow Sequence: `{project-root}/_bmad/bam/data/agent-guides/bam/workflow-sequence.md`
- Workflow Ownership: `{project-root}/_bmad/bam/data/agent-guides/bam/workflow-ownership.md`

- Knowledge: `{project-root}/_bmad/bam/data/agent-guides/bam/multi-tenant-patterns.md`, `{project-root}/_bmad/bam/data/agent-guides/bam/agent-runtime-patterns.md`, `{project-root}/_bmad/bam/data/agent-guides/bam/testing-tenant-isolation.md`, `{project-root}/_bmad/bam/data/agent-guides/bam/testing-multi-tenant-fixtures.md`
- Template: `{project-root}/_bmad/bam/data/templates/sprint-status-template.yaml`
- Agent Runtime Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/agent-runtime-patterns.md`
- Multi-Tenant Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/multi-tenant-patterns.md`
- Tenant Isolation Testing: `{project-root}/_bmad/bam/data/agent-guides/bam/testing-tenant-isolation.md`
- Multi-Tenant Test Fixtures: `{project-root}/_bmad/bam/data/agent-guides/bam/testing-multi-tenant-fixtures.md`
- Agent Safety Testing: `{project-root}/_bmad/bam/data/agent-guides/bam/testing-agent-safety.md`
- Section Reference Map: `{project-root}/_bmad/bam/data/agent-guides/bam/section-reference-map.md`
- Workflow Sequence: `{project-root}/_bmad/bam/data/agent-guides/bam/workflow-sequence.md`
- Workflow Ownership: `{project-root}/_bmad/bam/data/agent-guides/bam/workflow-ownership.md`
