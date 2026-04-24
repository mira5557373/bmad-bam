# Step 1: Assess Action Types

> **MANDATORY EXECUTION RULES:**
> 1. Read this ENTIRE file before acting
> 2. Follow steps in EXACT order
> 3. Use web search when directed
> 4. DO NOT skip verification

## Purpose

Inventory all AI agent action types and classify by risk level.

## Prerequisites

- Agent runtime architecture document loaded
- **Load guide:** `{project-root}/_bmad/bam/data/agent-guides/bam/8-field-action-contract-guide.md`

## Actions

### 1. Inventory Agent Actions

Review agent runtime architecture and list all actions agents can perform:

| Action | Description | State Mutation | External Call |
|--------|-------------|----------------|---------------|
| | | | |

### 2. Classify by Risk Level

Apply risk classification from guide:

| Action | Risk Level | Action Type | Rationale |
|--------|------------|-------------|-----------|
| | READ_ONLY / WRITE_INTERNAL / WRITE_EXTERNAL / FINANCIAL / PRIVILEGED | | |

### 3. Identify High-Risk Actions

**Verify current best practices with web search:**
Search the web: "AI agent action risk classification {date}"

Flag actions requiring enhanced controls:
- [ ] Any FINANCIAL actions?
- [ ] Any PRIVILEGED actions?
- [ ] Any actions calling external APIs with PII?

## Verification

- [ ] All agent actions inventoried
- [ ] Risk levels assigned to each action
- [ ] High-risk actions flagged

## Outputs

- Action inventory table
- Risk classification matrix

## Next Step

Proceed to `step-02-c-define-contract-schema.md` with classified actions.
