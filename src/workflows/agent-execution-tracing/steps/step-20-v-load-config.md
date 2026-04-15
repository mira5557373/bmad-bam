# Step 20: Load Configuration for Validation (Validate Mode)

## Purpose

Load agent execution tracing configuration for QG-AI2 validation.

## Prerequisites

- Configuration exists at `{output_folder}/operations/ai/agent-tracing-config.md`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-ai-observability.md`

## Actions

### 1. Load Configuration Files

Read and parse:
- `{output_folder}/operations/ai/agent-tracing-config.md`
- `{output_folder}/operations/ai/agent-debug-runbook.md`

### 2. Load Validation Criteria

Load QG-AI2 related checklist items for agent tracing.

### 3. Prepare Validation Checklist

Create validation checklist based on:
- Trace hierarchy requirements
- Span attribute completeness
- Platform integration configuration
- Sampling strategy documentation
- Debug workflow availability

## Verification

- [ ] Configuration loaded
- [ ] Validation criteria loaded
- [ ] Checklist prepared

## Next Step

Proceed to `step-21-v-validate.md` with configuration and criteria loaded.
