---
name: event-streaming-design
displayName: Event Streaming Design
description: Design event streaming architecture with Kafka or EventBridge. Use when the user requests to 'design event streaming' or 'configure message bus'.
module: bam
tags: [integration, platform, events]
---

# Event Streaming Design

## Overview

This workflow designs the complete event streaming architecture including topic design, tenant isolation, schema registry, consumer groups, and dead letter handling. It supports both Kafka-based and cloud-native (EventBridge, SNS/SQS) streaming solutions.

Act as an Integration Architect designing event-driven architectures for multi-tenant platforms.

**Args:** Accepts streaming platform and event domains. Accepts `--headless` / `-H`.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

## When to Use

- Designing event-driven microservices architecture
- Implementing tenant-isolated event streaming
- Planning schema evolution strategy
- Configuring event replay and DLQ handling

## Mode

Select execution mode:

| Mode | Description |
|------|-------------|
| **Create** | Generate new streaming design from scratch |
| **Edit** | Load existing design and apply targeted modifications |
| **Validate** | Check existing design against quality criteria |

Default: **Create** mode. In headless mode, always use Create.

## Workflow

### Step 1: Define Event Domains

**Intent Check:** Confirm the user's intent before processing their input.

- Catalog event types and sources
- Map event consumers
- Define event schemas
- Identify tenant context requirements

### Step 2: Design Topic Architecture

- Create topic naming conventions
- Define partition strategies
- Plan tenant isolation
- Configure retention policies

### Step 3: Configure Schema Registry

- Design schema evolution rules
- Plan compatibility modes
- Set up schema validation
- Configure serialization

**Soft Gate:** Steps 1-3 complete the design phase. Present a summary and ask for confirmation.

### Step 4: Plan Consumer Strategy

- Design consumer groups
- Configure offset management
- Plan DLQ handling
- Design replay capabilities

## Quality Gates

This workflow contributes to:
- **QG-I1** (Convergence) - Event integration across modules
- **QG-P1** (Production) - Streaming infrastructure readiness

### Entry Gate
- Service boundaries defined
- Event catalog exists

### Exit Gate
- Topic architecture documented
- Schema registry configured
- Consumer strategy defined

## Output

- `{output_folder}/planning-artifacts/streaming/event-streaming-design.md` - Streaming architecture document
- `{output_folder}/planning-artifacts/streaming/schema-registry-config.md` - Schema registry configuration
- Topic and consumer configurations

## References

- Template: `{project-root}/_bmad/bam/data/templates/event-streaming-template.md`
- Internal Contract Design: `bmad-bam-internal-contract-design`
