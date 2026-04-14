---
name: ai-model-security
displayName: AI Model Security
description: Design security controls for AI model lifecycle including poisoning prevention and supply chain security. Use when the user requests 'design model security' or 'AI model supply chain'.
module: bam
tags: [ai-safety, security, mlops]
---

# AI Model Security

## Overview

This workflow designs comprehensive security controls for the AI model lifecycle, including model provenance tracking, integrity verification, access control, and audit logging. It addresses model poisoning prevention, supply chain security, and ensures tenant isolation for model assets. Run after runtime architecture is defined.

Act as an AI Security Architect designing model security controls.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing AI model supply chain security
- Creating model provenance and integrity verification
- Building access control for model assets
- Defining audit logging for model operations
- Preventing model poisoning and theft

## Mode

Select execution mode:

| Mode | Description |
|------|-------------|
| **Create** | Generate new artifact from scratch |
| **Edit** | Load existing artifact and apply targeted modifications |
| **Validate** | Check existing artifact against quality criteria |

Default: **Create** mode. In headless mode, always use Create.

## Workflow

### Step 1: Model Provenance Tracking

Design model provenance system:

- Model origin verification (signed artifacts, trusted registries)
- Version lineage and ancestry tracking
- Training data provenance and attestation
- Fine-tuning history per tenant
- Third-party model dependency auditing

### Step 2: Model Integrity Verification

Define integrity verification controls:

- Cryptographic hash verification for model weights
- Model signature validation workflow
- Tampering detection mechanisms
- Runtime integrity monitoring
- Model extraction attempt detection

### Step 3: Access Control Design

Design access control for model assets:

- Tenant-scoped model access
- Role-based model permissions
- API authentication (short-lived tokens)
- Model endpoint protection
- Fine-tuned model access restriction

### Step 4: Audit Logging

Define comprehensive audit logging:

- Model access logging
- Inference request logging
- Model update audit trail
- Tenant model usage tracking
- Anomaly detection alerts

**Soft Gate:** Steps 1-4 complete the model security design. Present a summary of provenance, integrity, access control, and audit logging. Ask for confirmation.

### Quality Gates

- [ ] Model provenance tracking implemented
- [ ] Integrity verification controls defined
- [ ] Access control enforces tenant boundaries
- [ ] Audit logging captures all model operations

## Quality Gates

This workflow contributes to:
- **QG-S4** (AI Security) - Defines model security controls
- **QG-M3** (Agent Runtime) - Model access within agent runtime

### Entry Gate
- QG-M3 (Agent Runtime) must pass before designing model security
- Agent runtime architecture must be defined

### Exit Gate
- QG-S4 checklist items from `qg-s4-ai-security.md` verified
- Model provenance and integrity documented
- Access control and audit logging specified

## Output

- `{output_folder}/planning-artifacts/security/model-security.md`
- Model provenance design
- Access control matrix
- Audit logging configuration

## References

- Knowledge: `bam/knowledge/llm-versioning.md`, `bam/knowledge/agent-runtime-patterns.md`
- Patterns: `bam/data/bam-patterns.csv` (model-versioning, ai-safety, model-deployment)
- Checklist: `bam/checklists/qg-s4-ai-security.md`
