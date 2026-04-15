---
name: bmad-bam-ai-security
displayName: AI Security Audit
description: 'Execute comprehensive AI security audit covering model security, inference protection, and data leakage prevention'
module: bam
web_bundle: false
tags: [ai-security, audit, quality-gate]
---

# AI Security Audit

## Overview

This workflow executes a comprehensive security audit for AI/LLM systems, covering model security, inference endpoint protection, prompt injection defenses, and data leakage prevention. Required for QG-S4 (AI Security) gate passage.

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate security audit report | `step-01-c-*` to `step-06-c-*` |
| Edit | Update existing audit | `step-10-e-*` to `step-12-e-*` |
| Validate | Verify security controls | `step-20-v-*` to `step-23-v-*` |

## Prerequisites

- Agent runtime architecture defined
- AI model deployment configured
- **Config required:** `ai_runtime`

## Outputs

- `ai-security-audit-report.md` in `{output_folder}/security/`
- `ai-vulnerability-findings.md` in `{output_folder}/security/`

## Related Workflows

- `bmad-bam-ai-security-testing` - Security test execution
- `bmad-bam-ai-model-security` - Model-specific security
- `bmad-bam-agent-safety` - Agent safety validation

## Quality Gate

This workflow is required for **QG-S4 (AI Security Gate)** passage.
