---
name: bmad-bam-create-master-architecture
displayName: Create Master Architecture
description: Create frozen master architecture for BAM platform. Use when the user requests to 'create master architecture' or 'start BAM foundation'.
module: bam
web_bundle: true
tags: [foundation]
---

# Create Master Architecture

## Overview

This workflow produces the frozen master architecture document for a BAM (BMad-for-Agentic-Monolith) platform. It guides the Platform Architect through 9 steps — from discovery through assembly — producing a comprehensive `master-architecture.md` that all modules inherit from. The document is frozen after the foundation validation gate passes; changes require a formal ADR and impact analysis.

Act as a senior Platform Architect specializing in modular-monolith, multi-tenant, agentic AI SaaS systems.

**Args:** Accepts `--headless` / `-H` for autonomous execution using defaults and available inputs.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). If config is missing, let the user know `bmad-bam-setup` can configure the module at any time. Resolve:

- `{user_name}` — address the user by name
- `{communication_language}` — all communications
- `{document_output_language}` — generated document content
- `{output_folder}` — default: `{project-root}/_bmad-output`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

Detect headless mode from args or user intent.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## Workflow

### Step 1: Discovery

Load available inputs:

- Product brief / PRD (if exists)
- TSA `tech-radar.yaml` and `tsa-versions.yaml` (if exists)
- Any existing architecture documents

Identify gaps. If not headless, confirm scope with the user.

### Step 2: Tenant Model Decisions

Define and document:

- Isolation strategy (RLS / schema / database per tenant)
- Tenant context structure (`TenantContext` class shape)
- Tenant lifecycle states (provisioning → active → suspended → archived → deleted)
- Isolation matrix — classify all asset types: data, cache, logs, memory, tools, jobs, vectors, analytics

### Step 3: AI Runtime Decisions

Define and document:

- Agent registry design (agent types, configurations, versioning)
- Tool registry with permission policies (role, tenant, approval-required)
- Memory tier rules (session, user, tenant, global scopes with retention)
- Safety requirements (guardrails, kill switches, fallback behavior)
- Evaluation requirements (golden tasks, metrics, thresholds)

### Step 4: Module Boundary Rules

Define and document:

- Facade requirements (public interface pattern, tenant-scoped methods)
- Forbidden dependency patterns (no circular deps, no internal imports)
- Event ownership rules (one publisher per event type)
- Database ownership rules (each table owned by exactly one module)

### Step 5: Shared Kernel Definition

Define and document:

- `TenantContext` interface
- `BaseEntity` requirements (tenant_id, audit fields)
- `EventBus` interface
- Common value objects and DTOs
- Shared exceptions and error types

### Step 6: Technology Stack

Load TSA tier documents if available. Extract:

- Technology decisions per layer (backend, DB, cache, events, AI, security, infra, clients)
- Version pins from `tsa-versions.yaml`
- Limp mode architecture (dependency criticality and fallback behavior)

If TSA docs unavailable, use the BAM default stack from the extension guide.

### Step 7: Core Contracts

Define template contracts:

- Tenant context interface contract
- AI runtime interface contract
- Event bus interface contract
- Module facade template

### Step 8: Code Patterns

Produce working examples for:

- Repository pattern (tenant-scoped queries with RLS)
- Facade pattern (public interface with DTOs)
- Domain event pattern (publish/subscribe with tenant context)
- Service pattern (business logic with tenant awareness)

Minimum 4 code pattern examples required.

**Soft Gate:** Steps 1-8 complete the analysis and design phases. Present a summary of decisions made so far and what comes next (assembly). Ask for confirmation before proceeding.

### Step 9: Assembly

1. Combine all sections into `master-architecture.md`
2. Add table of contents with section anchors for smart loading
3. Validate completeness:
   - [ ] All 7 required sections present (tenant model, AI runtime, module boundaries, shared kernel, tech stack, contracts, code patterns)
   - [ ] All TSA technologies have version pins
   - [ ] All isolation strategies defined
   - [ ] Shared kernel interfaces complete
   - [ ] At least 4 code pattern examples

Write to `{output_folder}/planning-artifacts/master-architecture.md`

### Master Architecture Rules

1. Created during foundation phase by Platform Architect
2. Frozen after foundation validation gate passes
3. Changes require formal ADR and impact analysis (see `bmad-bam-master-architecture-emergency-change`)
4. All modules inherit from master architecture
5. Contains NO module-specific decisions

## Output

- `{output_folder}/planning-artifacts/master-architecture.md` — the frozen master architecture document

Present summary of what was produced. If not headless, ask if adjustments are needed before proceeding to scaffold-foundation.

## References

- Template: `bam/templates/master-architecture-template.md`
- Independent Development: `bam/knowledge/independent-development.md`
- Shared Kernel Patterns: `bam/knowledge/shared-kernel-patterns.md`
- RLS Best Practices: `bam/knowledge/rls-best-practices.md`
- Workflow Sequence: `bam/knowledge/workflow-sequence.md`
- Workflow Ownership: `bam/knowledge/workflow-ownership.md`

- Knowledge: `bam/knowledge/multi-tenant-patterns.md`, `bam/knowledge/agent-runtime-patterns.md`, `bam/knowledge/shared-kernel-patterns.md`, `bam/knowledge/module-facade-patterns.md`, `bam/knowledge/rls-best-practices.md`, `bam/knowledge/workflow-sequence.md`, `bam/knowledge/workflow-ownership.md`
- Checklist: `bam/checklists/foundation-gate.md`
- Independent Development: `bam/knowledge/independent-development.md`
- Shared Kernel Patterns: `bam/knowledge/shared-kernel-patterns.md`
- RLS Best Practices: `bam/knowledge/rls-best-practices.md`
- Workflow Sequence: `bam/knowledge/workflow-sequence.md`
- Workflow Ownership: `bam/knowledge/workflow-ownership.md`
