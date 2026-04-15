---
name: bmad-bam-ai-security-testing
displayName: AI Security Testing
description: 'Design and execute security testing for AI agents including prompt injection, data leakage, and adversarial attacks'
module: bam
tags: [ai-runtime, security, testing]
---

# AI Security Testing

## Overview

This workflow provides security testing patterns for AI agents in multi-tenant environments. It covers prompt injection testing, data leakage detection, adversarial attack simulation, and tenant isolation verification for AI components.

Act as an AI Security Engineer specializing in LLM security and multi-tenant AI platform testing.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

## When to Use

- Designing security tests for AI agents and LLM integrations
- Creating prompt injection and jailbreak test cases
- Validating AI guardrails and safety controls
- Testing tenant isolation in AI components

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new AI security test plan | `step-01-c-*` to `step-05-c-*` |
| Edit | Modify existing test plan | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Agent runtime architecture document
- Tenant isolation matrix
- **Config required:** `{ai_runtime}`, `{tenant_model}`

## Outputs

- `{output_folder}/planning-artifacts/testing/ai-security-test-plan.md`
- `{output_folder}/planning-artifacts/testing/ai-threat-scenarios.md`

## Quality Gates

This workflow contributes to:
- **QG-M3** (Agent Runtime) - Validates AI runtime security
- **QG-I3** (Agent Safety) - Validates AI agent security controls
- **QG-P1** (Production) - AI security testing required before production

### Entry Gate
- QG-M3 (Agent Runtime) must pass (agent runtime architecture defined)

### Exit Gate
- QG-I3 checklist items from `qg-i3-agent-safety.md` verified
- AI security test scenarios documented

## Related Workflows

- `bmad-bam-agent-runtime-architecture` - Agent runtime design
- `bmad-bam-ai-agent-debug` - AI agent debugging
- `bmad-bam-security-review` - Comprehensive security assessment
