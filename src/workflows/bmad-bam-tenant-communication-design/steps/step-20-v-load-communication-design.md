# Step 20-V: Load Communication Design for Validation

## Purpose

Load the tenant communication design document for validation against requirements.

## Prerequisites

- [ ] Communication design document exists
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: communication

## Actions

### 1. Load Communication Design Document

Read and parse all sections including notification types, templates, and preferences.

### 2. Prepare Validation Context

Load validation criteria from pattern registry and compliance requirements.

## Verification

- [ ] Document loaded successfully
- [ ] Validation criteria prepared

## Outputs

| Output | Location |
|--------|----------|
| Communication design loaded | In-memory context |

## Next Step

Proceed to `step-21-v-validate-communication-design.md` to execute validation.
