---
name: agent-safety
displayName: Agent Safety Validation
description: 'Validate AI agent safety controls including guardrails, budget enforcement, and kill switch functionality'
module: bam
web_bundle: false
tags: [ai-safety, validation, quality-gate]
---

# Agent Safety Validation

## Overview

This workflow validates that AI agents have proper safety controls in place, including input/output guardrails, budget enforcement, kill switch functionality, and adversarial attack resistance. Required for QG-I3 (Agent Safety) gate passage.

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate safety validation report | `step-01-c-*` to `step-05-c-*` |
| Edit | Update existing validation | `step-10-e-*` to `step-12-e-*` |
| Validate | Verify safety controls | `step-20-v-*` to `step-23-v-*` |

## Prerequisites

- Agent runtime architecture defined (`bmad-bam-agent-runtime-architecture`)
- AI guardrails implemented (`bmad-bam-ai-guardrails-implementation`)
- **Config required:** `ai_runtime`

## Outputs

- `agent-safety-report.md` in `{output_folder}/quality-gates/`
- `safety-test-results.md` in `{output_folder}/testing/`

## Related Workflows

- `bmad-bam-ai-eval-safety-design` - Safety evaluation criteria
- `bmad-bam-tenant-safety` - Tenant-level safety validation
- `bmad-bam-ai-security-testing` - Security testing for AI

## Quality Gate

This workflow is required for **QG-I3 (Agent Safety)** gate passage.
