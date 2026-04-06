---
name: bmad-bam-convergence-verification
displayName: Convergence Verification
description: Verify cross-module integration before release. Use when the user requests to 'run convergence verification' or 'validate release readiness'.
module: bam
web_bundle: true
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

## Output

- `{output_folder}/planning-artifacts/quality/convergence-report.md`
- Release recommendation (GO / NO-GO with specific blockers)

## References

- Checklist: `bam/checklists/qg-i1-convergence.md`, `bam/checklists/qg-i2-tenant-safety.md`, `bam/checklists/qg-i3-agent-safety.md`
- Agent Runtime Patterns: `bam/knowledge/agent-runtime-patterns.md`
- Multi-Tenant Patterns: `bam/knowledge/multi-tenant-patterns.md`
- Tenant Isolation Testing: `bam/knowledge/testing-tenant-isolation.md`
- Multi-Tenant Test Fixtures: `bam/knowledge/testing-multi-tenant-fixtures.md`
- Agent Safety Testing: `bam/knowledge/testing-agent-safety.md`
- Section Reference Map: `bam/knowledge/section-reference-map.md`
- Workflow Sequence: `bam/knowledge/workflow-sequence.md`
- Workflow Ownership: `bam/knowledge/workflow-ownership.md`

- Knowledge: `bam/knowledge/multi-tenant-patterns.md`, `bam/knowledge/agent-runtime-patterns.md`, `bam/knowledge/testing-tenant-isolation.md`, `bam/knowledge/testing-multi-tenant-fixtures.md`
- Template: `bam/templates/sprint-status-template.yaml`
- Agent Runtime Patterns: `bam/knowledge/agent-runtime-patterns.md`
- Multi-Tenant Patterns: `bam/knowledge/multi-tenant-patterns.md`
- Tenant Isolation Testing: `bam/knowledge/testing-tenant-isolation.md`
- Multi-Tenant Test Fixtures: `bam/knowledge/testing-multi-tenant-fixtures.md`
- Agent Safety Testing: `bam/knowledge/testing-agent-safety.md`
- Section Reference Map: `bam/knowledge/section-reference-map.md`
- Workflow Sequence: `bam/knowledge/workflow-sequence.md`
- Workflow Ownership: `bam/knowledge/workflow-ownership.md`
