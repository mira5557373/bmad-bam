---
name: ai-model-deprecation
displayName: AI Model Deprecation
description: Operations workflow for deprecating AI models in multi-tenant platforms. Covers tenant impact assessment, migration planning, model sunset communication, and safe decommissioning.
module: bam
phase: 6-operations
tags: [ai-runtime, migration, operations, deprecation]
---

# AI Model Deprecation

## Overview

This workflow executes the complete deprecation lifecycle for AI models in a multi-tenant agentic platform. It covers usage analysis, tenant impact assessment, replacement model evaluation, migration timeline planning, tenant communication, migration support, fallback routing, progress monitoring, safe decommissioning, and final documentation.

**Phase:** 6 (Operations) - Critical for Operations phase balance

Act as an AI Platform Architect specializing in model lifecycle management and tenant migration for multi-tenant systems.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- AI model vendor announces deprecation timeline
- Upgrading to newer model versions (e.g., GPT-4 to GPT-4o)
- Consolidating multiple model providers
- Cost optimization requiring model changes
- Regulatory compliance requiring model replacement
- Performance optimization through model upgrades

## Modes

| Mode | Purpose | Step Files |
|------|---------|------------|
| **Create** | Execute model deprecation lifecycle | `steps/step-01-c-*` through `step-10-c-*` |
| **Edit** | Modify existing deprecation plan | `steps/step-10-e-*` through `step-11-e-*` |
| **Validate** | Check deprecation completeness | `steps/step-20-v-*` through `step-22-v-*` |

## Workflow Steps (Create Mode)

| Step | File | Description |
|------|------|-------------|
| 1 | `step-01-c-assess-model-usage.md` | Analyze model usage across tenants |
| 2 | `step-02-c-identify-dependent-tenants.md` | Map tenant model dependencies |
| 3 | `step-03-c-evaluate-replacement-models.md` | Identify migration targets |
| 4 | `step-04-c-plan-migration-timeline.md` | Create deprecation schedule |
| 5 | `step-05-c-notify-affected-tenants.md` | Communicate deprecation |
| 6 | `step-06-c-provide-migration-support.md` | Assist tenant migrations |
| 7 | `step-07-c-implement-fallback-routing.md` | Route to replacement models |
| 8 | `step-08-c-monitor-migration-progress.md` | Track tenant migrations |
| 9 | `step-09-c-decommission-deprecated-model.md` | Safe model removal |
| 10 | `step-10-c-document-deprecation.md` | Final deprecation report |

## Prerequisites

- Master architecture document completed
- AI runtime configuration established
- Model usage telemetry available
- **Config required:** `{ai_runtime}`, `{tenant_model}`

## Workflow Phases

### Phase 1: Assessment (Steps 1-3)
- Assess model usage patterns
- Identify dependent tenants
- Evaluate replacement options

### Phase 2: Planning (Steps 4-5)
- Create migration timeline
- Notify affected tenants

### Phase 3: Execution (Steps 6-8)
- Provide migration support
- Implement fallback routing
- Monitor migration progress

### Phase 4: Completion (Steps 9-10)
- Decommission deprecated model
- Document deprecation process

## Quality Gates

This workflow contributes to:
- **QG-M3** (Agent Runtime) - Model changes affect agent runtime architecture
- **QG-I3** (Agent Safety) - Migration must maintain agent safety guarantees
- **QG-P1** (Production Readiness) - Model lifecycle management for production

### Entry Gate
- QG-F1 (Foundation) must pass before model deprecation planning
- AI runtime architecture must be documented

### Exit Gate
- All 10 steps completed with verification
- Deprecation plan document complete with migration milestones verified
- Tenant communication plan executed
- Migration progress targets achieved
- Model decommissioned safely
- Final documentation published

## Outputs

- `{output_folder}/planning-artifacts/ai-model-deprecation-plan.md`
- `{output_folder}/planning-artifacts/deprecation-final-report.md`
- Migration tracking dashboard
- Tenant communication logs
- Decommission verification report

## Related Workflows

| Workflow | Relationship | When to Use |
|----------|--------------|-------------|
| `bmad-bam-agent-runtime-architecture` | Context | AI runtime defines model integration patterns |
| `bmad-bam-tenant-communication-design` | Related | Communication templates for tenant notification |
| `bmad-bam-tenant-data-migration` | Related | Data migration may accompany model changes |
| `bmad-bam-ai-fallback-chains` | Related | Fallback routing implementation patterns |
| `bmad-bam-incident-response-operations` | Related | Handle migration issues |

## References

- Template: `bam/templates/ai-model-deprecation-plan-template.md`
- Template: `bam/templates/deprecation-report-template.md`
- Knowledge: `bam/knowledge/agent-runtime-patterns.md`
- Knowledge: `bam/knowledge/multi-tenant-patterns.md`
- Checklist: `bam/checklists/qg-m3-agent-runtime.md`

## Headless Mode

Accepts `--headless` / `-H` for autonomous execution using defaults and available inputs.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.
