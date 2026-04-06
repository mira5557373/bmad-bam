# Step 1: Load Artifact

## Purpose

This step loads the Master Architecture Document artifact for validation. The master architecture serves as the foundational blueprint for the multi-tenant agentic AI platform, defining system-wide constraints, component relationships, and architectural decisions that all modules must conform to.

## Artifact Location

Load the existing master architecture document from `{output_folder}/planning-artifacts/master-architecture.md`.

## Pre-Validation Checks

Before proceeding, verify the following conditions:
- The file exists at the specified path
- The file is readable and well-formed markdown
- Section hierarchy follows expected conventions
- All architectural diagrams or references are intact

## Expected Artifact Structure

The master architecture should contain these required sections:
- System Overview with scope and objectives
- Architectural Principles and constraints
- Component Inventory with responsibilities
- Integration Patterns and communication flows
- Multi-Tenancy Strategy and isolation requirements
- Security Architecture baseline requirements
- Technology Stack decisions and rationale

## Error Handling Guidance

If the file does not exist, inform the user that there is no artifact to validate and suggest switching to Create mode.

If the file exists but is incomplete or missing critical sections, enumerate the missing elements and advise the user on whether validation can proceed with gaps or if the artifact requires completion first.

## Next Step

Once the artifact is successfully loaded and initial structure is confirmed, proceed to Step 2: Validate Artifact to perform detailed quality criteria checks.
