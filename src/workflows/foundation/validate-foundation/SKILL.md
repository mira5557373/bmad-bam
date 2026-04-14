---
name: validate-foundation
displayName: Validate Foundation
description: Validate BAM foundation gate readiness. Use when the user requests to 'validate foundation' or 'check foundation gate'.
module: bam
tags: [foundation]
---

# Validate Foundation

## Overview

This workflow validates that the BAM platform foundation is complete and ready for module development. It runs the comprehensive Foundation Validation Gate checklist (S13.5) covering master architecture, shared kernel, control plane, AI runtime, tenant isolation tests, and documentation. The gate decision blocks all module development until passed. Supports category-level assessment (PASS / CONDITIONAL / FAIL) per S13.7.1.

Act as a Platform Architect performing foundation readiness assessment.

**Args:** Accepts `--headless` / `-H` for autonomous validation with pass/fail report.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). If config is missing, let the user know they can configure BAM settings in `{project-root}/_bmad/config.yaml` under the `bam` section, or re-run `npx bmad-method install` to reconfigure. Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Validating foundation architecture against QG-F1
- Checking master architecture completeness
- Verifying foundation quality gate requirements

## Mode

This workflow operates in **Validate** mode — checking existing artifacts against quality criteria.

## Quality Gates

- **Entry Gate:** QG-M1, QG-M2, QG-M3 (sub-gates must pass before running composite Foundation Gate)
- **Exit Gate:** QG-F1 (Foundation Gate - enables module development)

## Gate Hierarchy Context

The Foundation Gate is composite — it requires QG-M1, QG-M2, and QG-M3 to have passed:

| Sub-Gate | Focus                         | Prerequisite                           |
| -------- | ----------------------------- | -------------------------------------- |
| QG-M1    | Master Architecture Readiness | After `bam-create-master-architecture` |
| QG-M2    | Tenant Isolation Complete     | After `bam-tenant-model-isolation`     |
| QG-M3    | Agent Runtime Readiness       | After `bam-agent-runtime-architecture` |

Verify all three sub-gates passed before running the full Foundation Gate.

## Validation Checklist

Load the foundation gate checklist from `bam/checklists/foundation-gate.md` — this is the single source of truth for all gate items. Run each check and record pass/fail per category as defined in that checklist.

The checklist covers 6 categories: Artifacts, Shared Kernel Implementation, Control Plane Implementation, AI Runtime Implementation, Tests Passing, and Documentation. See the checklist file for the complete item list and critical vs non-critical classification.

### Partial Foundation Proceed (QG-M3 Failure)

If QG-M3 fails but QG-M1 + QG-M2 pass, evaluate per-module:

| Module AI Dependency    | Decision                                |
| ----------------------- | --------------------------------------- |
| None (pure CRUD)        | ⚠️ May proceed                          |
| Optional (AI-enhanced)  | ⚠️ May proceed with AI stories deferred |
| Required (agent-native) | ❌ Blocked until QG-M3 recovery         |

**Soft Gate:** Validation checklist is complete. Present a summary of per-category results and what comes next (gate decision). Ask for confirmation before proceeding.

## Gate Decision

| Outcome        | Definition                           | Action                                  |
| -------------- | ------------------------------------ | --------------------------------------- |
| ✅ PASS        | All categories pass                  | Module development enabled              |
| ⚠️ CONDITIONAL | Non-critical gaps, all critical pass | Proceed with mitigation plan + deadline |
| ❌ FAIL        | Any critical category fails          | Enter recovery protocol (S13.7)         |

## On FAIL: Recovery Guidance

1. Classify root cause: SCOPE / SKILL / TECH / DESIGN / QUALITY
2. Lock passed categories (do not re-test)
3. Generate salvage report with session context
4. Select recovery path from decision matrix
5. Time-box recovery sprint
6. Re-gate only failed categories
7. Max 2 recovery attempts — 3 failures triggers mandatory correct-course

## Output

Write foundation gate report to `{output_folder}/planning-artifacts/foundation-gate-report.md`

Include:

- Per-category pass/fail status with individual item results
- Overall gate decision (PASS / CONDITIONAL PASS / FAIL)
- For CONDITIONAL: mitigation plan with deadlines for non-critical items
- For FAIL: root cause classification, locked categories, recovery path recommendation
- Timestamp and validator identity

Update sprint-status.yaml:

```yaml
foundation:
  status: complete  # or in-progress if FAIL
  gate_passed: true  # Only true when PASS or CONDITIONAL with all critical passing
  gate_date: {date}
  gate_report: {output_folder}/planning-artifacts/foundation-gate-report.md
```

## References

- Checklist: `bam/checklists/foundation-gate.md`
- Run Contract Patterns: `bam/knowledge/run-contracts.md`
- Context Compiler Patterns: `bam/knowledge/context-compiler-patterns.md`
- Action Gateway Patterns: `bam/knowledge/action-gateway-patterns.md`
- Tenant Isolation Testing: `bam/knowledge/testing-tenant-isolation.md`
- Multi-Tenant Test Fixtures: `bam/knowledge/testing-multi-tenant-fixtures.md`
- Section Reference Map: `bam/knowledge/section-reference-map.md`
- Workflow Ownership: `bam/knowledge/workflow-ownership.md`

- Template: `bam/templates/sprint-status-template.yaml`
- Knowledge: `bam/knowledge/run-contracts.md`, `bam/knowledge/action-gateway-patterns.md`, `bam/knowledge/context-compiler-patterns.md`, `bam/knowledge/section-reference-map.md`
- Run Contract Patterns: `bam/knowledge/run-contracts.md`
- Context Compiler Patterns: `bam/knowledge/context-compiler-patterns.md`
- Action Gateway Patterns: `bam/knowledge/action-gateway-patterns.md`
- Tenant Isolation Testing: `bam/knowledge/testing-tenant-isolation.md`
- Multi-Tenant Test Fixtures: `bam/knowledge/testing-multi-tenant-fixtures.md`
- Section Reference Map: `bam/knowledge/section-reference-map.md`
- Workflow Ownership: `bam/knowledge/workflow-ownership.md`
