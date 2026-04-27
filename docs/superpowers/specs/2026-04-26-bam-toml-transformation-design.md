# BAM TOML Transformation Design Spec

**Version:** 1.0.0  
**Date:** 2026-04-26  
**Status:** Ready for Implementation

## Summary

Transform BAM (BMAD Agentic Multi-tenant) from its current YAML-based extension system to BMAD v6.4.0's TOML customization framework while achieving an 88% file reduction (~955 → ~119 files) and maintaining 100% capability preservation.

## Problem Statement

BAM's current implementation has:
- **File bloat:** 955 files including 233 agent guides, 460 templates, 187 workflows
- **Incompatible format:** YAML extensions don't integrate with BMAD v6.4.0's native TOML customization
- **Context overload:** Default loading of too many files causes context window exhaustion
- **Menu collision risk:** Current codes (BP, MR, etc.) collide with BMM/WDS/CIS

## Solution Overview

The **C³ (Context-Conscious Consolidation)** approach:

1. **8 agent TOML files** extending BMM/WDS/CIS agents
2. **30 workflow skills** using CEV modes (Create/Edit/Validate)
3. **Tiered context loading:** Lean core by default, domains/patterns on demand
4. **Z-prefix menu codes:** Collision-free with existing BMAD ecosystem
5. **Platform-agnostic paths:** `{skills-path}/` and `{project-root}/` placeholders

## Architecture

### File Structure

```
src/
├── module.yaml                          # Module manifest
├── customize/                           # Agent TOML customizations
│   ├── bmad-agent-architect.toml        # Primary: Atlas/Nova/Kai personas
│   ├── bmad-agent-analyst.toml          # Analyst + tenant discovery
│   ├── bmad-agent-dev.toml              # Dev + tenant implementation
│   ├── bmad-agent-pm.toml               # PM + tenant planning
│   ├── bmad-agent-ux-designer.toml      # UX + tier experience
│   ├── wds-agent-saga-analyst.toml      # Saga + tenant personas
│   ├── wds-agent-freya-ux.toml          # Freya + tier UX
│   └── bmad-cis-agent-innovation-strategist.toml  # Innovation + scale
│
├── skills/                              # 30 workflow skills
│   ├── bmad-bam-master-architecture/    # Foundation (QG-F1)
│   ├── bmad-bam-module-architecture/    # Module (QG-M1)
│   ├── bmad-bam-tenant-isolation/       # Tenant (QG-M2)
│   ├── bmad-bam-agent-runtime/          # AI Runtime (QG-M3)
│   ├── bmad-bam-facade-contract/        # Integration (QG-I1)
│   ├── bmad-bam-convergence/            # Convergence (QG-I2/I3)
│   └── ... (24 more)
│
└── data/
    ├── context/
    │   └── bam-core.md                  # Lean core context (default load)
    │
    ├── personas/                        # 3 persona files
    │   ├── atlas.md                     # Platform Architect
    │   ├── nova.md                      # AI Runtime Architect
    │   └── kai.md                       # Integration Architect
    │
    ├── domains/                         # 12 domain files
    │   ├── tenant.md                    # Tenant isolation
    │   ├── ai-runtime.md                # AI agent orchestration
    │   ├── integration.md               # Module integration
    │   ├── security.md                  # Tenant security
    │   ├── observability.md             # Monitoring/logging
    │   ├── billing.md                   # Usage metering
    │   ├── onboarding.md                # Tenant lifecycle
    │   ├── compliance.md                # Regulatory
    │   ├── caching.md                   # Tenant-aware caching
    │   ├── storage.md                   # Tenant data storage
    │   ├── events.md                    # Event-driven patterns
    │   └── testing.md                   # Tenant testing (TEA)
    │
    ├── patterns/                        # 10 pattern files
    │   ├── rls.md                       # Row-Level Security
    │   ├── schema-per-tenant.md         # Schema isolation
    │   ├── database-per-tenant.md       # Database isolation
    │   ├── langgraph.md                 # LangGraph runtime
    │   ├── crewai.md                    # CrewAI runtime
    │   ├── autogen.md                   # AutoGen runtime
    │   ├── facade.md                    # Facade contract pattern
    │   ├── circuit-breaker.md           # Resilience patterns
    │   ├── saga.md                      # Distributed transactions
    │   └── cqrs.md                      # Command/Query separation
    │
    ├── checklists/                      # 8 quality gate checklists
    │   ├── qg-f1.md                     # Foundation gate
    │   ├── qg-m1.md                     # Module architecture
    │   ├── qg-m2.md                     # Tenant isolation
    │   ├── qg-m3.md                     # Agent runtime
    │   ├── qg-i1.md                     # Convergence
    │   ├── qg-i2.md                     # Tenant safety
    │   ├── qg-i3.md                     # Agent safety
    │   └── qg-p1.md                     # Production readiness
    │
    ├── templates/                       # 40 output templates
    │   ├── master-architecture.md
    │   ├── module-architecture.md
    │   ├── tenant-isolation.md
    │   ├── agent-runtime.md
    │   ├── facade-contract.md
    │   └── ... (35 more)
    │
    ├── tenant-models.csv                # Tenant isolation decision matrix
    ├── ai-runtimes.csv                  # AI runtime selection matrix
    └── quality-gates.csv                # Gate requirements matrix
```

### Total File Count: ~119 files (88% reduction)

| Category | Before | After | Reduction |
|----------|--------|-------|-----------|
| Agent extensions | 31 YAML | 8 TOML | 74% |
| Workflows | 187 | 30 | 84% |
| Agent guides | 233 | 15 (1 core + 3 personas + 12 domains) | 94% |
| Templates | 460 | 40 | 91% |
| Checklists | 38 | 8 | 79% |
| Pattern CSVs | 6 | 3 | 50% |
| Pattern files | 0 | 10 | +10 (new) |
| **Total** | ~955 | ~119 | **88%** |

## TOML Specifications

### Agent Customization: bmad-agent-architect.toml

```toml
# BAM Extensions for bmad-agent-architect
# Adds multi-tenant agentic AI SaaS capabilities

[agent]
# Activation announcement
activation_steps_append = [
  "BAM multi-tenant agentic AI capabilities available. Use ZA/ZN/ZK to activate personas.",
]

# Lean core context - only essential info loaded by default
persistent_facts = [
  "file:{project-root}/_bmad/bam/data/context/bam-core.md",
]

# BAM principles appended to architect's defaults
principles = [
  "BAM Domain: Multi-tenant agentic AI SaaS architecture.",
  "BAM Personas: Atlas (ZA) Platform, Nova (ZN) AI Runtime, Kai (ZK) Integration.",
  "BAM Rule: Tenant isolation in every architectural decision.",
  "BAM Rule: AI agents must be tenant-scoped and tier-aware.",
  "BAM Gates: QG-F1 → QG-M1/M2/M3 → QG-I1/I2/I3 → QG-P1.",
  "BAM Sidecar: Check _bmad/_memory/bam-architect/ for session continuity.",
]

# ═══════════════════════════════════════════════════════════════════════════════
# PERSONA ACTIVATORS (ZA, ZN, ZK)
# ═══════════════════════════════════════════════════════════════════════════════

[[agent.menu]]
code = "ZA"
description = "Atlas: Platform Architect persona - foundation, scaling, tenant isolation"
prompt = """
# Activating Atlas Persona

Read and internalize the Atlas persona:
`{project-root}/_bmad/bam/data/personas/atlas.md`

You are now Atlas, the Platform Architect. Your focus:
- Foundation architecture (QG-F1)
- Tenant isolation models (QG-M2)
- Platform scaling patterns
- Infrastructure decisions

Confirm persona loaded and ask how to help with platform architecture.
"""

[[agent.menu]]
code = "ZN"
description = "Nova: AI Runtime Architect persona - agent orchestration, LLM ops"
prompt = """
# Activating Nova Persona

Read and internalize the Nova persona:
`{project-root}/_bmad/bam/data/personas/nova.md`

You are now Nova, the AI Runtime Architect. Your focus:
- Agent runtime architecture (QG-M3)
- LangGraph/CrewAI/AutoGen selection
- Tenant-scoped agent execution
- LLM versioning and safety

Confirm persona loaded and ask how to help with AI runtime architecture.
"""

[[agent.menu]]
code = "ZK"
description = "Kai: Integration Architect persona - facades, contracts, convergence"
prompt = """
# Activating Kai Persona

Read and internalize the Kai persona:
`{project-root}/_bmad/bam/data/personas/kai.md`

You are now Kai, the Integration Architect. Your focus:
- Facade contracts (QG-I1)
- Module integration patterns
- Convergence verification (QG-I2/I3)
- API versioning

Confirm persona loaded and ask how to help with integration architecture.
"""

# ═══════════════════════════════════════════════════════════════════════════════
# CORE WORKFLOWS (ZM, ZT, ZR, ZB, ZF, ZC, ZP)
# ═══════════════════════════════════════════════════════════════════════════════

[[agent.menu]]
code = "ZM"
description = "Master Architecture: Foundation design with tenant model (QG-F1)"
skill = "bmad-bam-master-architecture"

[[agent.menu]]
code = "ZT"
description = "Tenant Isolation: Design isolation model - RLS/Schema/Database (QG-M2)"
skill = "bmad-bam-tenant-isolation"

[[agent.menu]]
code = "ZR"
description = "Agent Runtime: AI orchestration with LangGraph/CrewAI/AutoGen (QG-M3)"
skill = "bmad-bam-agent-runtime"

[[agent.menu]]
code = "ZB"
description = "Module Boundaries: Design module architecture (QG-M1)"
skill = "bmad-bam-module-architecture"

[[agent.menu]]
code = "ZF"
description = "Facade Contract: Define module integration contracts (QG-I1)"
skill = "bmad-bam-facade-contract"

[[agent.menu]]
code = "ZC"
description = "Convergence: Verify integration safety (QG-I2/I3)"
skill = "bmad-bam-convergence"

[[agent.menu]]
code = "ZP"
description = "Production Readiness: Final validation (QG-P1)"
skill = "bmad-bam-production-readiness"

# ═══════════════════════════════════════════════════════════════════════════════
# AD-HOC DOMAIN LOADERS (ZD*)
# ═══════════════════════════════════════════════════════════════════════════════

[[agent.menu]]
code = "ZDT"
description = "Load: Tenant domain context (isolation, lifecycle, routing)"
prompt = """
Loading tenant domain context:
`{project-root}/_bmad/bam/data/domains/tenant.md`
`{project-root}/_bmad/bam/data/tenant-models.csv`

Confirm loaded. Ready for tenant architecture questions.
"""

[[agent.menu]]
code = "ZDA"
description = "Load: AI Runtime domain context (agents, LLMs, orchestration)"
prompt = """
Loading AI runtime domain context:
`{project-root}/_bmad/bam/data/domains/ai-runtime.md`
`{project-root}/_bmad/bam/data/ai-runtimes.csv`

Confirm loaded. Ready for AI runtime architecture questions.
"""

[[agent.menu]]
code = "ZDI"
description = "Load: Integration domain context (facades, contracts, events)"
prompt = """
Loading integration domain context:
`{project-root}/_bmad/bam/data/domains/integration.md`
`{project-root}/_bmad/bam/data/domains/events.md`

Confirm loaded. Ready for integration architecture questions.
"""

[[agent.menu]]
code = "ZDS"
description = "Load: Security domain context (tenant security, compliance)"
prompt = """
Loading security domain context:
`{project-root}/_bmad/bam/data/domains/security.md`
`{project-root}/_bmad/bam/data/domains/compliance.md`

Confirm loaded. Ready for security architecture questions.
"""

[[agent.menu]]
code = "ZDO"
description = "Load: Observability domain context (monitoring, logging, tracing)"
prompt = """
Loading observability domain context:
`{project-root}/_bmad/bam/data/domains/observability.md`

Confirm loaded. Ready for observability architecture questions.
"""

[[agent.menu]]
code = "ZDB"
description = "Load: Billing domain context (metering, usage, tiers)"
prompt = """
Loading billing domain context:
`{project-root}/_bmad/bam/data/domains/billing.md`

Confirm loaded. Ready for billing architecture questions.
"""

# ═══════════════════════════════════════════════════════════════════════════════
# AD-HOC PATTERN LOADERS (ZP*)
# ═══════════════════════════════════════════════════════════════════════════════

[[agent.menu]]
code = "ZPR"
description = "Load: RLS (Row-Level Security) pattern details"
prompt = """
Loading RLS pattern:
`{project-root}/_bmad/bam/data/patterns/rls.md`

Confirm loaded. Ready for RLS implementation guidance.
"""

[[agent.menu]]
code = "ZPS"
description = "Load: Schema-per-tenant pattern details"
prompt = """
Loading schema-per-tenant pattern:
`{project-root}/_bmad/bam/data/patterns/schema-per-tenant.md`

Confirm loaded. Ready for schema isolation guidance.
"""

[[agent.menu]]
code = "ZPD"
description = "Load: Database-per-tenant pattern details"
prompt = """
Loading database-per-tenant pattern:
`{project-root}/_bmad/bam/data/patterns/database-per-tenant.md`

Confirm loaded. Ready for database isolation guidance.
"""

[[agent.menu]]
code = "ZPL"
description = "Load: LangGraph runtime pattern details"
prompt = """
Loading LangGraph pattern:
`{project-root}/_bmad/bam/data/patterns/langgraph.md`

Confirm loaded. Ready for LangGraph implementation guidance.
"""

[[agent.menu]]
code = "ZPC"
description = "Load: CrewAI runtime pattern details"
prompt = """
Loading CrewAI pattern:
`{project-root}/_bmad/bam/data/patterns/crewai.md`

Confirm loaded. Ready for CrewAI implementation guidance.
"""

# ═══════════════════════════════════════════════════════════════════════════════
# SECONDARY WORKFLOWS (ZW*)
# ═══════════════════════════════════════════════════════════════════════════════

[[agent.menu]]
code = "ZWO"
description = "Tenant Onboarding: Design onboarding flow"
skill = "bmad-bam-tenant-onboarding"

[[agent.menu]]
code = "ZWX"
description = "Tenant Offboarding: Design offboarding and data retention"
skill = "bmad-bam-tenant-offboarding"

[[agent.menu]]
code = "ZWS"
description = "Scaling Design: Horizontal/vertical scaling patterns"
skill = "bmad-bam-scaling"

[[agent.menu]]
code = "ZWE"
description = "Event Architecture: Design event-driven patterns"
skill = "bmad-bam-events"

[[agent.menu]]
code = "ZWA"
description = "Agent Debug: Troubleshoot tenant-scoped agent issues"
skill = "bmad-bam-agent-debug"
```

### Workflow Customization: bmad-bam-tenant-isolation/customize.toml

```toml
# Workflow customization for bmad-bam-tenant-isolation
# Loaded when workflow is invoked

[workflow]
# Context loaded before workflow starts
activation_steps_prepend = [
  "Loading tenant isolation design context.",
]

# Domain-specific context for this workflow
persistent_facts = [
  "file:{project-root}/_bmad/bam/data/domains/tenant.md",
  "file:{project-root}/_bmad/bam/data/domains/security.md",
  "file:{project-root}/_bmad/bam/data/tenant-models.csv",
  "file:{project-root}/_bmad/bam/data/checklists/qg-m2.md",
]

# Workflow-specific configurables
isolation_template = "resources/tenant-isolation-template.md"

# Post-completion hook
on_complete = """
Tenant isolation design complete.

**Next steps:**
1. If new design: Run ZR (Agent Runtime) for QG-M3
2. If editing: Verify changes don't break existing tenants
3. Update sidecar: `_bmad/_memory/bam-architect/isolation-decisions.md`

**Quality Gate:** QG-M2 checklist should be attached to output.
"""
```

### Core Context: bam-core.md

```markdown
# BAM Core Context

**Module:** BMAD Agentic Multi-tenant (BAM)  
**Purpose:** Multi-tenant agentic AI SaaS architecture capabilities

## Personas

| Code | Persona | Focus | Workflows |
|------|---------|-------|-----------|
| ZA | Atlas | Platform architecture, tenant isolation, scaling | ZM, ZT, ZWS |
| ZN | Nova | AI runtime, agent orchestration, LLM ops | ZR, ZWA |
| ZK | Kai | Integration, facades, convergence | ZF, ZC, ZWE |

## Core Conventions

### Tenant Header
All requests: `X-Tenant-ID: {tenant_id}`

### Cache Keys
Pattern: `tenant:{tenant_id}:{resource}:{id}`

### Storage Paths
Pattern: `tenants/{tenant_id}/{resource}/`

### Agent Scoping
All agents execute within tenant context with tier-appropriate resources.

## Quality Gates

| Gate | Name | Trigger |
|------|------|---------|
| QG-F1 | Foundation | After ZM (Master Architecture) |
| QG-M1 | Module | After ZB (Module Boundaries) |
| QG-M2 | Tenant | After ZT (Tenant Isolation) |
| QG-M3 | AI Runtime | After ZR (Agent Runtime) |
| QG-I1 | Facade | After ZF (Facade Contract) |
| QG-I2 | Tenant Safety | After ZC (Convergence) |
| QG-I3 | Agent Safety | After ZC (Convergence) |
| QG-P1 | Production | After ZP (Production Readiness) |

## Menu Quick Reference

**Personas:** ZA (Atlas), ZN (Nova), ZK (Kai)  
**Core Workflows:** ZM, ZT, ZR, ZB, ZF, ZC, ZP  
**Domain Loaders:** ZDT, ZDA, ZDI, ZDS, ZDO, ZDB  
**Pattern Loaders:** ZPR, ZPS, ZPD, ZPL, ZPC  
**Secondary:** ZWO, ZWX, ZWS, ZWE, ZWA
```

### Module Manifest: module.yaml

```yaml
# BAM Module Manifest
name: bam
version: 2.0.0
displayName: BMAD Agentic Multi-tenant
description: Multi-tenant agentic AI SaaS architecture capabilities
author: BAM Team
license: MIT

requires:
  bmad: ">=6.4.0"

optional:
  tea: ">=1.0.0"
  wds: ">=1.0.0"
  cis: ">=1.0.0"

install:
  # Agent customizations - merge with existing
  customize:
    strategy: merge
    source: customize/
    target: "{project-root}/_bmad/custom/"
  
  # Workflow skills - copy to skills directory
  skills:
    source: skills/
    target: "{skills-path}/"
  
  # Data resources - copy to module data directory
  data:
    source: data/
    target: "{project-root}/_bmad/bam/data/"
  
  # Initialize sidecar memory structure
  sidecar:
    directories:
      - "{project-root}/_bmad/_memory/bam-architect/"
    files:
      - source: data/sidecar/architecture-decisions.md
        target: "{project-root}/_bmad/_memory/bam-architect/architecture-decisions.md"
      - source: data/sidecar/runtime-preferences.md
        target: "{project-root}/_bmad/_memory/bam-architect/runtime-preferences.md"
      - source: data/sidecar/integration-history.md
        target: "{project-root}/_bmad/_memory/bam-architect/integration-history.md"

verify:
  # Verification checks after install
  files_exist:
    - "{project-root}/_bmad/custom/bmad-agent-architect.toml"
    - "{project-root}/_bmad/bam/data/context/bam-core.md"
    - "{skills-path}/bmad-bam-master-architecture/SKILL.md"
  
  skills_registered:
    - bmad-bam-master-architecture
    - bmad-bam-tenant-isolation
    - bmad-bam-agent-runtime
    - bmad-bam-module-architecture
    - bmad-bam-facade-contract
    - bmad-bam-convergence
    - bmad-bam-production-readiness

migration:
  from_v1:
    description: "Migrate from YAML extensions to TOML customization"
    steps:
      - action: backup
        source: "{project-root}/_bmad/bam/"
        target: "{project-root}/_bmad/bam.v1.backup/"
      - action: remove
        paths:
          - "{project-root}/_bmad/custom/*.customize.yaml"
      - action: install
        run: true
```

## Menu Code Allocation

### Z-Prefix Collision-Free Codes

| Code | Purpose | Category |
|------|---------|----------|
| **ZA** | Atlas persona | Persona |
| **ZN** | Nova persona | Persona |
| **ZK** | Kai persona | Persona |
| **ZM** | Master Architecture | Core Workflow |
| **ZT** | Tenant Isolation | Core Workflow |
| **ZR** | Agent Runtime | Core Workflow |
| **ZB** | Module Boundaries | Core Workflow |
| **ZF** | Facade Contract | Core Workflow |
| **ZC** | Convergence | Core Workflow |
| **ZP** | Production Readiness | Core Workflow |
| **ZDT** | Load: Tenant domain | Domain Loader |
| **ZDA** | Load: AI Runtime domain | Domain Loader |
| **ZDI** | Load: Integration domain | Domain Loader |
| **ZDS** | Load: Security domain | Domain Loader |
| **ZDO** | Load: Observability domain | Domain Loader |
| **ZDB** | Load: Billing domain | Domain Loader |
| **ZPR** | Load: RLS pattern | Pattern Loader |
| **ZPS** | Load: Schema-per-tenant | Pattern Loader |
| **ZPD** | Load: Database-per-tenant | Pattern Loader |
| **ZPL** | Load: LangGraph | Pattern Loader |
| **ZPC** | Load: CrewAI | Pattern Loader |
| **ZWO** | Tenant Onboarding | Secondary Workflow |
| **ZWX** | Tenant Offboarding | Secondary Workflow |
| **ZWS** | Scaling Design | Secondary Workflow |
| **ZWE** | Event Architecture | Secondary Workflow |
| **ZWA** | Agent Debug | Secondary Workflow |

### Why Z-Prefix?

- BMM uses: A-M (agents), standard codes
- WDS uses: AS, PB, TM, SC, BP, RS, DP (Saga); various for Freya
- CIS uses: Various innovation codes
- **Z is unused** by any BMAD ecosystem module → guaranteed collision-free

## Workflow Consolidation

### CEV Mode Reduction

| Original Workflows | Consolidated To | Mode Usage |
|--------------------|-----------------|------------|
| create-master-architecture | bmad-bam-master-architecture | Create |
| edit-master-architecture | bmad-bam-master-architecture | Edit |
| validate-foundation | bmad-bam-master-architecture | Validate |
| tenant-model-isolation | bmad-bam-tenant-isolation | Create |
| edit-tenant-isolation | bmad-bam-tenant-isolation | Edit |
| validate-tenant-isolation | bmad-bam-tenant-isolation | Validate |
| agent-runtime-architecture | bmad-bam-agent-runtime | Create |
| edit-agent-runtime | bmad-bam-agent-runtime | Edit |
| validate-agent-runtime | bmad-bam-agent-runtime | Validate |
| ... | ... | ... |

### 30 Consolidated Workflows

**Foundation (3):**
1. bmad-bam-master-architecture (QG-F1)
2. bmad-bam-requirements
3. bmad-bam-triage

**Module (4):**
4. bmad-bam-module-architecture (QG-M1)
5. bmad-bam-tenant-isolation (QG-M2)
6. bmad-bam-agent-runtime (QG-M3)
7. bmad-bam-module-epics

**Integration (4):**
8. bmad-bam-facade-contract (QG-I1)
9. bmad-bam-convergence (QG-I2/I3)
10. bmad-bam-api-versioning
11. bmad-bam-cross-module-story

**Operations (6):**
12. bmad-bam-tenant-onboarding
13. bmad-bam-tenant-offboarding
14. bmad-bam-observability
15. bmad-bam-scaling
16. bmad-bam-events
17. bmad-bam-production-readiness (QG-P1)

**AI Runtime (5):**
18. bmad-bam-agent-debug
19. bmad-bam-agent-tracing
20. bmad-bam-tool-contracts
21. bmad-bam-memory-tiers
22. bmad-bam-llm-versioning

**Supporting (8):**
23. bmad-bam-caching
24. bmad-bam-security
25. bmad-bam-compliance
26. bmad-bam-data-residency
27. bmad-bam-white-labeling
28. bmad-bam-billing
29. bmad-bam-testing (TEA integration)
30. bmad-bam-research

## Context Loading Strategy

### Tier 1: Always Loaded (Lean)

- `bam-core.md` (~100 lines) - loaded via persistent_facts in agent TOML

### Tier 2: Persona-Activated

- `personas/atlas.md` - loaded when ZA invoked
- `personas/nova.md` - loaded when ZN invoked
- `personas/kai.md` - loaded when ZK invoked

### Tier 3: Workflow-Loaded

- Domain files loaded by workflow's customize.toml persistent_facts
- Checklists loaded by workflow for quality gates
- Templates loaded for output generation

### Tier 4: Ad-Hoc (User-Triggered)

- ZD* codes load specific domain files
- ZP* codes load specific pattern files

### Context Budget

| Scenario | Files Loaded | Est. Tokens |
|----------|--------------|-------------|
| Default (idle) | 1 (bam-core.md) | ~500 |
| Persona activated | 2 (core + persona) | ~1,500 |
| Workflow running | 5-7 (core + domains + checklist) | ~4,000 |
| Ad-hoc research | +1-2 per loader | +500-1,000 |

## Quality Gate Integration

### Gate Checklist Format

```markdown
# QG-M2: Tenant Isolation Gate

**Workflow:** bmad-bam-tenant-isolation  
**Prerequisites:** QG-F1 passed

## Critical Checks (All Must Pass)

- [ ] Tenant ID propagation verified in all layers
- [ ] RLS policies tested with cross-tenant queries
- [ ] No hardcoded tenant references in shared code
- [ ] Tenant context cleared after request completion

## Standard Checks

- [ ] Isolation model documented
- [ ] Migration path defined for model changes
- [ ] Performance impact assessed
- [ ] Rollback procedure documented

## Outcome

| Result | Criteria |
|--------|----------|
| PASS | All critical + 80% standard |
| CONDITIONAL | All critical, <80% standard + mitigation plan |
| FAIL | Any critical fails |
```

### Gate Flow

```
ZM (Master Architecture)
    │
    └── QG-F1 ─────┐
                   │
    ┌──────────────┴──────────────┐
    │                             │
    ▼                             ▼
ZB (Module)                   ZT (Tenant)
    │                             │
    └── QG-M1                     └── QG-M2
                                       │
                                       ▼
                                  ZR (Runtime)
                                       │
                                       └── QG-M3
                                            │
    ┌───────────────────────────────────────┘
    ▼
ZF (Facade)
    │
    └── QG-I1
           │
           ▼
    ZC (Convergence)
           │
           ├── QG-I2 (Tenant Safety)
           └── QG-I3 (Agent Safety)
                    │
                    ▼
             ZP (Production)
                    │
                    └── QG-P1
```

## Migration Path

### Phase 1: Preparation

1. Backup current BAM installation
2. Document any custom extensions users have made
3. Map old menu codes to new Z-prefix codes

### Phase 2: Implementation

1. Create new directory structure
2. Implement agent TOML files
3. Implement workflow skills with CEV modes
4. Consolidate content into domain/pattern files
5. Create lean core context

### Phase 3: Testing

1. Verify TOML syntax
2. Test menu code invocation
3. Test workflow execution (all CEV modes)
4. Test context loading tiers
5. Verify quality gate integration

### Phase 4: Migration Tool

```bash
# Migration script for existing installations
bmad migrate bam --from v1 --to v2

# Steps performed:
# 1. Backup existing _bmad/bam/
# 2. Remove old customize.yaml files
# 3. Install new TOML customizations
# 4. Copy consolidated data files
# 5. Initialize sidecar structure
# 6. Run verification checks
```

## Test Specifications

### Unit Tests

```javascript
// test/toml-syntax.test.js
describe('TOML Customization Files', () => {
  test('all TOML files parse without errors', async () => {
    const tomlFiles = glob.sync('src/customize/*.toml');
    for (const file of tomlFiles) {
      expect(() => TOML.parse(await fs.readFile(file))).not.toThrow();
    }
  });
  
  test('agent TOML has required sections', async () => {
    const architect = TOML.parse(await fs.readFile('src/customize/bmad-agent-architect.toml'));
    expect(architect.agent).toBeDefined();
    expect(architect.agent.menu).toBeInstanceOf(Array);
    expect(architect.agent.persistent_facts).toBeInstanceOf(Array);
  });
  
  test('menu codes use Z-prefix', async () => {
    const architect = TOML.parse(await fs.readFile('src/customize/bmad-agent-architect.toml'));
    for (const item of architect.agent.menu) {
      expect(item.code).toMatch(/^Z[A-Z0-9]+$/);
    }
  });
});
```

### Integration Tests

```javascript
// test/workflow-cev.test.js
describe('Workflow CEV Modes', () => {
  const workflows = glob.sync('src/skills/bmad-bam-*/');
  
  test.each(workflows)('%s has all CEV mode steps', async (workflow) => {
    const steps = await fs.readdir(path.join(workflow, 'steps'));
    const hasCreate = steps.some(s => s.includes('-c-'));
    const hasEdit = steps.some(s => s.includes('-e-'));
    const hasValidate = steps.some(s => s.includes('-v-'));
    
    expect(hasCreate).toBe(true);
    expect(hasEdit).toBe(true);
    expect(hasValidate).toBe(true);
  });
});
```

### Compatibility Tests

```javascript
// test/bmad-compat.test.js
describe('BMAD v6.4.0 Compatibility', () => {
  test('no non-standard TOML fields', async () => {
    const standardFields = new Set([
      'agent', 'workflow', 'menu', 'prompts',
      'activation_steps_prepend', 'activation_steps_append',
      'persistent_facts', 'principles', 'on_complete',
      'code', 'description', 'skill', 'prompt'
    ]);
    
    const architect = TOML.parse(await fs.readFile('src/customize/bmad-agent-architect.toml'));
    const allKeys = getAllKeys(architect);
    
    for (const key of allKeys) {
      expect(standardFields.has(key)).toBe(true);
    }
  });
  
  test('persistent_facts use valid file references', async () => {
    const architect = TOML.parse(await fs.readFile('src/customize/bmad-agent-architect.toml'));
    for (const fact of architect.agent.persistent_facts) {
      if (fact.startsWith('file:')) {
        const path = fact.replace('file:{project-root}/', 'src/');
        expect(await fs.pathExists(path)).toBe(true);
      }
    }
  });
});
```

## Success Criteria

| Metric | Target | Verification |
|--------|--------|--------------|
| File count | ≤120 | `find src -type f \| wc -l` |
| TOML syntax | 100% valid | `npm test -- test/toml-syntax.test.js` |
| Menu collision | 0 | `npm test -- test/menu-codes.test.js` |
| CEV coverage | 100% workflows | `npm test -- test/workflow-cev.test.js` |
| BMAD compat | 100% | `npm test -- test/bmad-compat.test.js` |
| Context budget | ≤500 tokens default | Manual verification |

## Appendix A: Full Menu Code Table

| Code | Type | Description | Target |
|------|------|-------------|--------|
| ZA | Persona | Atlas - Platform Architect | prompt |
| ZN | Persona | Nova - AI Runtime Architect | prompt |
| ZK | Persona | Kai - Integration Architect | prompt |
| ZM | Workflow | Master Architecture (QG-F1) | skill |
| ZT | Workflow | Tenant Isolation (QG-M2) | skill |
| ZR | Workflow | Agent Runtime (QG-M3) | skill |
| ZB | Workflow | Module Boundaries (QG-M1) | skill |
| ZF | Workflow | Facade Contract (QG-I1) | skill |
| ZC | Workflow | Convergence (QG-I2/I3) | skill |
| ZP | Workflow | Production Readiness (QG-P1) | skill |
| ZDT | Loader | Tenant domain | prompt |
| ZDA | Loader | AI Runtime domain | prompt |
| ZDI | Loader | Integration domain | prompt |
| ZDS | Loader | Security domain | prompt |
| ZDO | Loader | Observability domain | prompt |
| ZDB | Loader | Billing domain | prompt |
| ZPR | Loader | RLS pattern | prompt |
| ZPS | Loader | Schema-per-tenant pattern | prompt |
| ZPD | Loader | Database-per-tenant pattern | prompt |
| ZPL | Loader | LangGraph pattern | prompt |
| ZPC | Loader | CrewAI pattern | prompt |
| ZWO | Workflow | Tenant Onboarding | skill |
| ZWX | Workflow | Tenant Offboarding | skill |
| ZWS | Workflow | Scaling Design | skill |
| ZWE | Workflow | Event Architecture | skill |
| ZWA | Workflow | Agent Debug | skill |

## Appendix B: Domain File Consolidation Map

| New Domain File | Consolidated From (Agent Guides) |
|-----------------|----------------------------------|
| tenant.md | tenant-isolation.md, tenant-lifecycle.md, tenant-routing.md, tenant-context.md |
| ai-runtime.md | ai-runtime.md, agent-orchestration.md, llm-patterns.md, agent-state.md |
| integration.md | facade-patterns.md, contract-design.md, api-versioning.md, module-boundaries.md |
| security.md | tenant-security.md, auth-patterns.md, encryption.md, rbac.md |
| observability.md | logging.md, monitoring.md, tracing.md, alerting.md |
| billing.md | metering.md, usage-tracking.md, tier-management.md |
| onboarding.md | tenant-onboarding.md, provisioning.md, migration.md |
| compliance.md | compliance.md, data-residency.md, audit.md, gdpr.md |
| caching.md | caching-strategies.md, cache-invalidation.md, distributed-cache.md |
| storage.md | tenant-storage.md, blob-patterns.md, data-isolation.md |
| events.md | event-driven-patterns.md, event-sourcing.md, saga-patterns.md |
| testing.md | tenant-testing.md, isolation-tests.md, tea-integration.md |

## Appendix C: Data Processing Methodology

This appendix details HOW existing BAM content is processed, consolidated, and transformed.

### Source Data Inventory

| Source Type | Count | Avg Lines | Structure |
|-------------|-------|-----------|-----------|
| Agent Guides | 233 | ~150 | Markdown: "When to load", "Core Concepts", "Patterns", "Decision Framework" |
| Extensions | 31 | ~200 | YAML: menu triggers + prompts referencing guides |
| Templates | 461 | ~80 | Markdown with `{{placeholders}}` |
| Checklists | 39 | ~100 | Markdown with `- [ ]` items |
| Workflows | 187 | ~5 files each | step-NN-mode-*.md files |
| Pattern CSVs | 6 | ~50 rows | Decision criteria + web_queries |

### Phase 1: Agent Guide → Domain Consolidation

**Clustering Algorithm:**

```
FOR each target domain (tenant, ai-runtime, integration, etc.):
    source_guides = MATCH guides by prefix pattern
    
    FOR each guide in source_guides:
        sections = EXTRACT ["Core Concepts", "Application Guidelines", 
                           "Decision Framework", "Related Patterns"]
        
        FOR each section:
            content_hash = HASH(normalize_whitespace(section))
            IF content_hash NOT IN seen_hashes:
                APPEND section to domain file
                ADD content_hash to seen_hashes
            ELSE:
                SKIP (duplicate)
        
        PRESERVE "When to load" triggers for routing metadata
```

**Explicit Mapping Table:**

| Domain File | Source Guide Patterns | Primary Extraction |
|-------------|----------------------|-------------------|
| `tenant.md` | `tenant-*.md`, `rls-*.md`, `isolation-*.md` | Isolation Matrix (8 dimensions), RLS Policy Pattern, Context Propagation |
| `ai-runtime.md` | `ai-runtime.md`, `agent-*.md`, `llm-*.md`, `memory-tiers.md`, `run-contracts.md` | Agent Topology, Memory Tiers, Run Contract Schema, Tool Governance |
| `integration.md` | `facade-*.md`, `contract-*.md`, `api-*.md`, `module-*.md`, `kai-guide.md` | Contract Evolution, Facade Versioning, Cross-Module Patterns |
| `security.md` | `security-*.md`, `auth-*.md`, `encryption-*.md`, `rbac-*.md` | Tenant Security, Key Management, Access Control |
| `observability.md` | `observability-*.md`, `logging-*.md`, `tracing-*.md`, `monitoring-*.md` | Tenant-Aware Metrics, Structured Logging, Distributed Tracing |
| `billing.md` | `billing-*.md`, `metering-*.md`, `usage-*.md`, `quota-*.md` | Usage Metering, Cost Attribution, Tier Limits |
| `onboarding.md` | `tenant-onboarding-*.md`, `provisioning-*.md`, `lifecycle-*.md` | Self-Service Flow, Enterprise Flow, Lifecycle States |
| `compliance.md` | `compliance-*.md`, `gdpr-*.md`, `audit-*.md`, `data-residency-*.md` | Compliance Matrix, Data Residency, Audit Logging |
| `caching.md` | `caching-*.md`, `cache-*.md` | Tenant Cache Isolation, Eviction Strategies |
| `storage.md` | `storage-*.md`, `blob-*.md`, `file-*.md` | Tenant Storage Paths, Blob Isolation |
| `events.md` | `event-*.md`, `saga-*.md`, `cqrs-*.md` | Event-Driven Patterns, Saga Orchestration, CQRS |
| `testing.md` | `testing-*.md`, `tea-*.md` | Isolation Tests, TEA Integration |

### Phase 2: Persona File Extraction

**Source:** `atlas-guide.md`, `nova-guide.md`, `kai-guide.md`

**Transformation:**

```markdown
# {Persona} - BAM Architect Persona

## Identity
{Extracted from "Role Context" section}

## Focus Areas
{Extracted from bullet list in intro}

## Decision Framework
{Preserved table from source}

## Related Workflows
{Mapped to new Z-prefix codes}

## Related Domains
{List of domain files this persona typically loads}

## Web Research Queries
{Extracted from "Web Research" section}
```

### Phase 3: Extension → TOML Transformation

**YAML to TOML Mapping:**

| YAML Structure | TOML Structure | Transformation Rule |
|----------------|----------------|---------------------|
| `menu[].trigger` | `[[agent.menu]].code` | Extract last segment, map to Z-prefix |
| `menu[].action` | `[[agent.menu]].skill` or `.prompt` | If `#prompt-id` → inline prompt; if workflow → skill reference |
| `menu[].description` | `[[agent.menu]].description` | Direct copy |
| `prompts[].id` | N/A | Embedded in menu item or removed |
| `prompts[].content` | `[[agent.menu]].prompt` | Inline if <20 lines; else file reference |

**Menu Code Migration Table:**

| Old Trigger | New Code | Category |
|-------------|----------|----------|
| `bam-platform-context` | ZA | Persona |
| `bam-ai-runtime-context` | ZN | Persona |
| `bam-integration-context` | ZK | Persona |
| `bam-arch-design-modules` | ZB | Workflow |
| `bam-arch-isolation-matrix` | ZT | Workflow |
| `bam-arch-agent-orchestration` | ZR | Workflow |
| `bam-arch-define-facades` | ZF | Workflow |
| `bam-arch-convergence-design` | ZC | Workflow |
| `bam-validate-gate` + QG-P1 | ZP | Workflow |
| `bam-{domain}-context` | ZD{X} | Domain Loader |
| `bam-{pattern}-context` | ZP{X} | Pattern Loader |

**Path Rewriting:**

```
OLD: {project-root}/_bmad/bam/data/agent-guides/bam/{guide}.md
NEW: {project-root}/_bmad/bam/data/domains/{domain}.md
     OR
NEW: {project-root}/_bmad/bam/data/personas/{persona}.md
```

### Phase 4: Workflow CEV Consolidation

**Step File Renumbering:**

| Original Workflow | Original Steps | Target Steps |
|-------------------|----------------|--------------|
| `create-tenant-isolation/` | `step-01-*.md` to `step-05-*.md` | `step-01-c-*.md` to `step-05-c-*.md` |
| `edit-tenant-isolation/` | `step-01-*.md` to `step-02-*.md` | `step-10-e-*.md` to `step-11-e-*.md` |
| `validate-tenant-isolation/` | `step-01-*.md` to `step-03-*.md` | `step-20-v-*.md` to `step-22-v-*.md` |

**Merged Workflow Structure:**

```
bmad-bam-tenant-isolation/
├── bmad-skill-manifest.yaml   # Combined metadata
├── SKILL.md                   # Combined description
├── workflow.md                # Mode router
├── customize.toml             # Context loading
└── steps/
    ├── step-01-c-define-model.md
    ├── step-02-c-isolation-matrix.md
    ├── step-03-c-context-propagation.md
    ├── step-04-c-sharing-rules.md
    ├── step-05-c-compliance-mapping.md
    ├── step-10-e-load-existing.md
    ├── step-11-e-apply-changes.md
    ├── step-20-v-load-artifact.md
    ├── step-21-v-run-checklist.md
    └── step-22-v-generate-report.md
```

### Phase 5: Template Consolidation

**Consolidation Rules:**

| Rule | Criteria | Action |
|------|----------|--------|
| **Merge related** | Same output artifact, different sections | Combine into single template |
| **Keep unique** | Distinct output type | Preserve as separate file |
| **Embed small** | <50 lines, single workflow | Move to workflow's `resources/` |
| **Deduplicate** | >80% content similarity | Keep primary, delete duplicate |

**Template Consolidation Map:**

| Target Template | Source Templates |
|-----------------|------------------|
| `master-architecture.md` | `master-architecture-template.md` |
| `tenant-isolation.md` | `tenant-model-template.md`, `rls-policy-template.md`, `tenant-context-template.md`, `cache-isolation-template.md`, `memory-isolation-template.md` |
| `agent-runtime.md` | `agent-runtime-template.md`, `run-contract-template.md`, `memory-tier-template.md`, `action-gateway-template.md` |
| `facade-contract.md` | `facade-contract-template.md`, `contract-evolution-template.md` |
| `module-architecture.md` | `module-architecture-template.md`, `module-catalog-template.md` |

### Phase 6: Checklist Consolidation

**Gate ID → Checklist Mapping:**

| Gate | Source Checklists | Target |
|------|-------------------|--------|
| QG-F1 | `qg-f1-foundation.md`, `foundation-gate.md` | `qg-f1.md` |
| QG-M1 | `qg-m1-module-architecture.md`, `module-architecture.md` | `qg-m1.md` |
| QG-M2 | `qg-m2-tenant-isolation.md`, `tenant-isolation.md` | `qg-m2.md` |
| QG-M3 | `qg-m3-agent-runtime.md` | `qg-m3.md` |
| QG-I1 | `qg-i1-convergence.md` | `qg-i1.md` |
| QG-I2 | `qg-i2-tenant-safety.md` | `qg-i2.md` |
| QG-I3 | `qg-i3-agent-safety.md` | `qg-i3.md` |
| QG-P1 | `qg-p1-production-readiness.md`, `production-readiness.md` | `qg-p1.md` |

**Checklist Section Merge:**

```
FOR each target gate checklist:
    critical_checks = UNION(source.critical_checks)
    standard_checks = UNION(source.standard_checks)
    recovery_protocol = KEEP(most_detailed_source)
    web_research = UNION(source.web_queries)
    
    DEDUPLICATE by check text similarity
    PRESERVE category classification (CRITICAL vs standard)
```

### Phase 7: CSV Pattern Registry

**Retained CSVs:**

| CSV | Columns Preserved | Transformation |
|-----|-------------------|----------------|
| `tenant-models.csv` | model, signals, when_to_use, web_queries | Keep as-is |
| `ai-runtimes.csv` | runtime, use_case, strengths, web_queries | Keep as-is |
| `quality-gates.csv` | gate_id, checks, critical_checks | Keep as-is |

**Removed CSVs (content moved to domain files):**

| CSV | Content Destination |
|-----|---------------------|
| `bam-patterns.csv` | Embedded in relevant domain files |
| `section-pattern-map.csv` | Embedded in workflow customize.toml |
| `compliance-frameworks.csv` | Merged into `domains/compliance.md` |

### Content Preservation Checklist

| Content Type | Preservation Rule | Validation |
|--------------|-------------------|------------|
| Decision tables | MUST preserve all rows | Row count match |
| Code examples (SQL, TypeScript) | Extract to pattern files | Syntax check |
| Web queries with `{date}` | Keep in domain files | Placeholder present |
| Checklist items `- [ ]` | Union all items | No critical item lost |
| Template `{{placeholders}}` | Preserve exactly | Placeholder count match |
| Cross-references | Rewrite paths | Link validation |
| Diagrams (ASCII art) | Preserve exactly | Visual inspection |

### Validation Script

```bash
#!/bin/bash
# validate-consolidation.sh

# Check file counts
echo "=== File Count Validation ==="
DOMAIN_COUNT=$(ls src-v2/data/domains/*.md | wc -l)
PATTERN_COUNT=$(ls src-v2/data/patterns/*.md | wc -l)
CHECKLIST_COUNT=$(ls src-v2/data/checklists/*.md | wc -l)

[ "$DOMAIN_COUNT" -eq 12 ] && echo "✓ Domains: 12" || echo "✗ Domains: $DOMAIN_COUNT (expected 12)"
[ "$PATTERN_COUNT" -eq 10 ] && echo "✓ Patterns: 10" || echo "✗ Patterns: $PATTERN_COUNT (expected 10)"
[ "$CHECKLIST_COUNT" -eq 8 ] && echo "✓ Checklists: 8" || echo "✗ Checklists: $CHECKLIST_COUNT (expected 8)"

# Check critical content preserved
echo "=== Critical Content Validation ==="
grep -l "Isolation Matrix" src-v2/data/domains/tenant.md && echo "✓ Isolation Matrix preserved"
grep -l "Memory Tier" src-v2/data/domains/ai-runtime.md && echo "✓ Memory Tiers preserved"
grep -l "Run Contract" src-v2/data/domains/ai-runtime.md && echo "✓ Run Contracts preserved"
grep -l "CRITICAL" src-v2/data/checklists/*.md | wc -l | xargs -I{} echo "✓ {} checklists have CRITICAL items"

# Check TOML syntax
echo "=== TOML Syntax Validation ==="
for f in src-v2/customize/*.toml; do
    toml-cli check "$f" && echo "✓ $f" || echo "✗ $f"
done

# Check path references
echo "=== Path Reference Validation ==="
grep -r "agent-guides/bam" src-v2/ && echo "✗ Old path references found" || echo "✓ No old path references"
```

## Appendix D: Other Agent TOML Specifications

### bmad-agent-analyst.toml

```toml
# BAM Extensions for bmad-agent-analyst
# Adds tenant discovery and requirements analysis capabilities

[agent]
activation_steps_append = [
  "BAM tenant analysis capabilities available. Use YA* codes for tenant-focused analysis.",
]

persistent_facts = [
  "file:{project-root}/_bmad/bam/data/context/bam-core.md",
]

principles = [
  "BAM Domain: Tenant discovery and requirements analysis.",
  "BAM Rule: All requirements must consider tenant isolation implications.",
  "BAM Rule: Identify tier-specific feature variations early.",
  "BAM Rule: Document cross-tenant vs tenant-specific requirements.",
]

# ═══════════════════════════════════════════════════════════════════════════════
# TENANT ANALYSIS WORKFLOWS
# ═══════════════════════════════════════════════════════════════════════════════

[[agent.menu]]
code = "YAR"
description = "Requirements: Analyze requirements for tenant implications"
skill = "bmad-bam-requirements"

[[agent.menu]]
code = "YAT"
description = "Triage: Classify requirements by tenant impact"
skill = "bmad-bam-triage"

[[agent.menu]]
code = "YAD"
description = "Discovery: Tenant requirements discovery session"
prompt = """
# Tenant Requirements Discovery

Load tenant analysis context:
`{project-root}/_bmad/bam/data/domains/tenant.md`

For each requirement, identify:
1. **Tenant Scope:** Single-tenant, multi-tenant, or system-wide?
2. **Isolation Impact:** Data isolation, compute isolation, or none?
3. **Tier Variation:** Different behavior per pricing tier?
4. **Compliance:** Data residency, privacy, audit implications?

Begin discovery conversation.
"""

# ═══════════════════════════════════════════════════════════════════════════════
# DOMAIN LOADERS
# ═══════════════════════════════════════════════════════════════════════════════

[[agent.menu]]
code = "YAL"
description = "Load: Compliance analysis context"
prompt = """
Loading compliance analysis context:
`{project-root}/_bmad/bam/data/domains/compliance.md`

Confirm loaded. Ready for compliance requirement analysis.
"""
```

### bmad-agent-dev.toml

```toml
# BAM Extensions for bmad-agent-dev
# Adds tenant-aware implementation patterns

[agent]
activation_steps_append = [
  "BAM implementation patterns available. Use YD* codes for tenant-aware development.",
]

persistent_facts = [
  "file:{project-root}/_bmad/bam/data/context/bam-core.md",
]

principles = [
  "BAM Domain: Tenant-aware implementation patterns.",
  "BAM Rule: Every database query must include tenant context.",
  "BAM Rule: Cache keys must include tenant ID prefix.",
  "BAM Rule: Agent execution must be tenant-scoped.",
  "BAM Rule: Never access data outside current tenant context.",
]

# ═══════════════════════════════════════════════════════════════════════════════
# IMPLEMENTATION WORKFLOWS
# ═══════════════════════════════════════════════════════════════════════════════

[[agent.menu]]
code = "YDI"
description = "Implement: Tenant isolation in code"
prompt = """
# Tenant Implementation Guidance

Load implementation patterns:
`{project-root}/_bmad/bam/data/patterns/rls.md`
`{project-root}/_bmad/bam/data/domains/tenant.md`

Implementation checklist:
- [ ] TenantContext middleware applied
- [ ] RLS policies in all queries
- [ ] Cache keys prefixed with tenant_id
- [ ] Storage paths include tenant segment
- [ ] Agent scope limited to tenant

Show me the code you're implementing.
"""

[[agent.menu]]
code = "YDA"
description = "Implement: Agent runtime integration"
skill = "bmad-bam-agent-tracing"

[[agent.menu]]
code = "YDT"
description = "Implement: TEA tenant testing"
skill = "bmad-bam-testing"

[[agent.menu]]
code = "YDD"
description = "Debug: Tenant isolation issues"
skill = "bmad-bam-agent-debug"

# ═══════════════════════════════════════════════════════════════════════════════
# PATTERN LOADERS
# ═══════════════════════════════════════════════════════════════════════════════

[[agent.menu]]
code = "YDP"
description = "Load: RLS implementation patterns"
prompt = """
Loading RLS implementation details:
`{project-root}/_bmad/bam/data/patterns/rls.md`

Confirm loaded. Ready for RLS implementation guidance.
"""

[[agent.menu]]
code = "YDL"
description = "Load: LangGraph implementation patterns"
prompt = """
Loading LangGraph implementation details:
`{project-root}/_bmad/bam/data/patterns/langgraph.md`

Confirm loaded. Ready for agent implementation guidance.
"""
```

### bmad-agent-pm.toml

```toml
# BAM Extensions for bmad-agent-pm
# Adds tenant planning and epic management

[agent]
activation_steps_append = [
  "BAM planning capabilities available. Use YP* codes for tenant-aware planning.",
]

persistent_facts = [
  "file:{project-root}/_bmad/bam/data/context/bam-core.md",
]

principles = [
  "BAM Domain: Tenant-aware project planning.",
  "BAM Rule: Epics must include tenant isolation tasks.",
  "BAM Rule: Stories must specify tenant scope.",
  "BAM Rule: Quality gates are mandatory milestones.",
]

# ═══════════════════════════════════════════════════════════════════════════════
# PLANNING WORKFLOWS
# ═══════════════════════════════════════════════════════════════════════════════

[[agent.menu]]
code = "YPE"
description = "Epics: Create tenant-aware module epics"
skill = "bmad-bam-module-epics"

[[agent.menu]]
code = "YPS"
description = "Story: Create cross-module tenant story"
skill = "bmad-bam-cross-module-story"

[[agent.menu]]
code = "YPG"
description = "Gates: Plan quality gate milestones"
prompt = """
# Quality Gate Planning

Load gate definitions:
`{project-root}/_bmad/bam/data/quality-gates.csv`

Plan milestones for:
- QG-F1: Foundation (after master architecture)
- QG-M1/M2/M3: Module gates (after module design)
- QG-I1/I2/I3: Integration gates (after convergence)
- QG-P1: Production (before go-live)

Each gate requires:
1. Sprint allocation
2. Team assignments
3. Dependency mapping
4. Rollback plan

Begin planning.
"""

[[agent.menu]]
code = "YPO"
description = "Onboarding: Plan tenant onboarding rollout"
skill = "bmad-bam-tenant-onboarding"

[[agent.menu]]
code = "YPB"
description = "Billing: Plan billing/metering implementation"
skill = "bmad-bam-billing"
```

### bmad-agent-ux-designer.toml

```toml
# BAM Extensions for bmad-agent-ux-designer
# Adds tier-aware UX patterns

[agent]
activation_steps_append = [
  "BAM UX capabilities available. Use YU* codes for tier-aware design.",
]

persistent_facts = [
  "file:{project-root}/_bmad/bam/data/context/bam-core.md",
]

principles = [
  "BAM Domain: Tier-aware user experience design.",
  "BAM Rule: Design must support feature gating by tier.",
  "BAM Rule: Enterprise tier needs white-label support.",
  "BAM Rule: Tenant context must be visible to users.",
]

# ═══════════════════════════════════════════════════════════════════════════════
# UX WORKFLOWS
# ═══════════════════════════════════════════════════════════════════════════════

[[agent.menu]]
code = "YUT"
description = "Tiers: Design tier-differentiated UX"
prompt = """
# Tier-Aware UX Design

Load tier patterns:
`{project-root}/_bmad/bam/data/domains/billing.md`

Design considerations per tier:

| Tier | Branding | Features | Support |
|------|----------|----------|---------|
| Free | Platform branding | Core only | Community |
| Pro | Minimal customization | Core + Pro | Email |
| Enterprise | White-label | All features | Dedicated |

Discuss the feature you're designing.
"""

[[agent.menu]]
code = "YUW"
description = "White-Label: Design white-labeling system"
skill = "bmad-bam-white-labeling"

[[agent.menu]]
code = "YUO"
description = "Onboarding: Design tenant onboarding UX"
prompt = """
# Tenant Onboarding UX

Load onboarding context:
`{project-root}/_bmad/bam/data/domains/onboarding.md`

Key UX decisions:
1. Self-service vs. sales-assisted
2. Trial period visibility
3. Tier upgrade prompts
4. Team invitation flow
5. Data import wizard

Which flow are you designing?
"""
```

### wds-agent-saga-analyst.toml

```toml
# BAM Extensions for wds-agent-saga-analyst
# Adds tenant persona and trigger mapping

[agent]
activation_steps_append = [
  "BAM persona mapping available. Use YS* codes for tenant-aware personas.",
]

persistent_facts = [
  "file:{project-root}/_bmad/bam/data/context/bam-core.md",
]

principles = [
  "BAM Domain: Tenant-aware persona and trigger mapping.",
  "BAM Rule: Personas must reflect tenant tier context.",
  "BAM Rule: Triggers must consider tenant onboarding stage.",
  "BAM Rule: B2B personas include tenant admin roles.",
]

# ═══════════════════════════════════════════════════════════════════════════════
# PERSONA WORKFLOWS
# ═══════════════════════════════════════════════════════════════════════════════

[[agent.menu]]
code = "YSP"
description = "Personas: Create tier-aware user personas"
prompt = """
# Tier-Aware Persona Mapping

For multi-tenant SaaS, personas must include:

**Tier Context:**
- Free tier: Cost-sensitive, self-service oriented
- Pro tier: Growing teams, need integrations
- Enterprise: Compliance-focused, need admin controls

**Tenant Roles:**
- Tenant Admin: Manages users, billing, settings
- Tenant User: Day-to-day usage
- Platform Admin: Multi-tenant oversight

Create persona with tier and role context.
"""

[[agent.menu]]
code = "YST"
description = "Triggers: Map tenant lifecycle triggers"
prompt = """
# Tenant Lifecycle Triggers

Map triggers to tenant lifecycle stages:

| Stage | Triggers | Persona Focus |
|-------|----------|---------------|
| Trial | Value discovery | Free user |
| Active | Feature adoption | Pro user |
| Growth | Team expansion | Tenant Admin |
| Enterprise | Compliance, SLA | Enterprise Admin |
| Churn Risk | Re-engagement | At-risk user |

Which lifecycle stage are you mapping?
"""
```

### wds-agent-freya-ux.toml

```toml
# BAM Extensions for wds-agent-freya-ux
# Adds tier-aware UX scenarios

[agent]
activation_steps_append = [
  "BAM scenario design available. Use YF* codes for tier-aware scenarios.",
]

persistent_facts = [
  "file:{project-root}/_bmad/bam/data/context/bam-core.md",
]

principles = [
  "BAM Domain: Tier-aware UX scenario design.",
  "BAM Rule: Scenarios must show tier-specific variations.",
  "BAM Rule: Include upgrade prompts in scenarios.",
  "BAM Rule: Enterprise scenarios include white-label considerations.",
]

# ═══════════════════════════════════════════════════════════════════════════════
# SCENARIO WORKFLOWS
# ═══════════════════════════════════════════════════════════════════════════════

[[agent.menu]]
code = "YFS"
description = "Scenarios: Create tier-variant scenarios"
prompt = """
# Tier-Variant Scenario Design

Each scenario needs tier variations:

**Free Tier:**
- Feature limitations visible
- Upgrade prompts contextual
- Self-service only

**Pro Tier:**
- Full feature access
- Team collaboration
- Email support

**Enterprise:**
- White-label branding
- SSO integration
- Admin oversight

Describe the scenario you're designing.
"""

[[agent.menu]]
code = "YFO"
description = "Onboarding: Create onboarding scenarios by tier"
prompt = """
# Tier-Specific Onboarding Scenarios

Design onboarding flows:

| Tier | Flow Type | Duration | Success Metric |
|------|-----------|----------|----------------|
| Free | Self-serve | 5 min | First value moment |
| Pro | Guided + integrations | 30 min | Team setup complete |
| Enterprise | White-glove | 1 week | Go-live success |

Which tier's onboarding are you designing?
"""
```

### bmad-cis-agent-innovation-strategist.toml

```toml
# BAM Extensions for bmad-cis-agent-innovation-strategist
# Adds multi-tenant innovation lenses

[agent]
activation_steps_append = [
  "BAM innovation lenses available. Use YI* codes for platform-scale innovation.",
]

persistent_facts = [
  "file:{project-root}/_bmad/bam/data/context/bam-core.md",
]

principles = [
  "BAM Domain: Platform-scale innovation strategy.",
  "BAM Rule: Innovations must scale across tenant base.",
  "BAM Rule: Consider tenant ecosystem effects.",
  "BAM Rule: Balance platform vs. tenant customization.",
]

# ═══════════════════════════════════════════════════════════════════════════════
# INNOVATION WORKFLOWS
# ═══════════════════════════════════════════════════════════════════════════════

[[agent.menu]]
code = "YIP"
description = "Platform: Platform-scale innovation analysis"
prompt = """
# Platform Innovation Analysis

Load platform context:
`{project-root}/_bmad/bam/data/domains/tenant.md`

Innovation at scale considerations:
1. **Network Effects:** Does it benefit from more tenants?
2. **Economies of Scale:** Cost reduction at scale?
3. **Customization:** Tenant-specific or platform-wide?
4. **Data Leverage:** Cross-tenant insights possible?
5. **Ecosystem:** Third-party integrations enabled?

Describe the innovation you're analyzing.
"""

[[agent.menu]]
code = "YIT"
description = "Tiers: Innovation-to-tier feature mapping"
prompt = """
# Feature-to-Tier Mapping

Analyze which tier gets the innovation:

| Criteria | Free | Pro | Enterprise |
|----------|------|-----|------------|
| Acquisition driver | ✓ | - | - |
| Revenue driver | - | ✓ | - |
| Enterprise requirement | - | - | ✓ |
| Competitive parity | ✓ | ✓ | ✓ |
| Differentiator | - | ✓ | ✓ |

Which feature are you mapping?
"""

[[agent.menu]]
code = "YIM"
description = "Marketplace: Multi-tenant marketplace innovation"
prompt = """
# Marketplace Innovation

For multi-tenant marketplaces:
1. **Tenant as Seller:** Each tenant can sell
2. **Tenant as Buyer:** Each tenant can buy
3. **Platform as Marketplace:** Connect tenants
4. **Revenue Share:** Commission models

Which marketplace model are you exploring?
"""
```

## Appendix E: Complete Workflow Mapping (187 → 30)

### Workflow Consolidation Matrix

| # | New Workflow | Original Workflows Consolidated | Mode Mapping |
|---|--------------|--------------------------------|--------------|
| **Foundation (3)** ||||
| 1 | `bmad-bam-master-architecture` | `create-master-architecture`, `scaffold-foundation`, `validate-foundation` | C: create+scaffold, E: edit, V: validate |
| 2 | `bmad-bam-requirements` | `requirement-ingestion`, `cross-module-requirements`, `tenant-requirements-analysis` | C: ingestion, E: update, V: validate |
| 3 | `bmad-bam-triage` | `triage-module-complexity`, `complexity-assessment`, `priority-triage` | C: triage, E: re-triage, V: validate |
| **Module (4)** ||||
| 4 | `bmad-bam-module-architecture` | `create-module-architecture`, `module-boundary-design`, `validate-module` | C: create+boundary, E: edit, V: validate |
| 5 | `bmad-bam-tenant-isolation` | `tenant-model-isolation`, `rls-policy-design`, `cache-isolation-design`, `memory-isolation-design`, `tenant-context-propagation` | C: all isolation, E: edit, V: validate |
| 6 | `bmad-bam-agent-runtime` | `agent-runtime-architecture`, `agent-topology-design`, `run-contract-definition`, `memory-tier-architecture`, `action-gateway-design` | C: all runtime, E: edit, V: validate |
| 7 | `bmad-bam-module-epics` | `create-module-epics`, `epic-decomposition`, `story-mapping` | C: create, E: edit, V: validate |
| **Integration (4)** ||||
| 8 | `bmad-bam-facade-contract` | `define-facade-contract`, `evolve-facade-contract`, `facade-mismatch-recovery`, `validate-tool-contract` | C: define, E: evolve+recovery, V: validate |
| 9 | `bmad-bam-convergence` | `convergence-verification`, `integration-testing`, `cross-module-validation` | C: verify, E: re-verify, V: validate |
| 10 | `bmad-bam-api-versioning` | `api-version-release`, `breaking-change-management`, `deprecation-workflow` | C: release, E: manage, V: validate |
| 11 | `bmad-bam-cross-module-story` | `cross-module-story`, `module-dependency-mapping`, `integration-story` | C: create, E: edit, V: validate |
| **Operations (6)** ||||
| 12 | `bmad-bam-tenant-onboarding` | `tenant-onboarding-design`, `self-service-onboarding`, `enterprise-onboarding`, `provisioning-workflow` | C: design all, E: edit, V: validate |
| 13 | `bmad-bam-tenant-offboarding` | `tenant-offboarding-design`, `data-retention-policy`, `tenant-data-export` | C: design, E: edit, V: validate |
| 14 | `bmad-bam-observability` | `tenant-aware-observability`, `logging-design`, `monitoring-design`, `tracing-design`, `alerting-design` | C: design all, E: edit, V: validate |
| 15 | `bmad-bam-scaling` | `scaling-architecture`, `horizontal-scaling`, `vertical-scaling`, `auto-scaling-policy` | C: design, E: edit, V: validate |
| 16 | `bmad-bam-events` | `event-driven-architecture`, `event-sourcing-design`, `saga-orchestration`, `cqrs-design` | C: design, E: edit, V: validate |
| 17 | `bmad-bam-production-readiness` | `production-readiness-validation`, `go-live-checklist`, `cutover-plan` | C: prepare, E: update, V: validate |
| **AI Runtime (5)** ||||
| 18 | `bmad-bam-agent-debug` | `ai-agent-debug`, `agent-troubleshooting`, `llm-error-diagnosis` | C: diagnose, E: re-diagnose, V: validate |
| 19 | `bmad-bam-agent-tracing` | `agent-execution-tracing`, `trace-analysis`, `performance-profiling` | C: setup, E: edit, V: validate |
| 20 | `bmad-bam-tool-contracts` | `tool-contract-definition`, `mcp-tool-design`, `tool-versioning` | C: define, E: evolve, V: validate |
| 21 | `bmad-bam-memory-tiers` | `memory-tier-design`, `context-management`, `memory-optimization` | C: design, E: edit, V: validate |
| 22 | `bmad-bam-llm-versioning` | `llm-versioning`, `model-deployment`, `prompt-versioning` | C: design, E: edit, V: validate |
| **Supporting (8)** ||||
| 23 | `bmad-bam-caching` | `caching-strategy`, `cache-invalidation`, `distributed-cache`, `tenant-cache-isolation` | C: design, E: edit, V: validate |
| 24 | `bmad-bam-security` | `security-architecture`, `tenant-security`, `encryption-design`, `key-management` | C: design, E: edit, V: validate |
| 25 | `bmad-bam-compliance` | `compliance-mapping`, `gdpr-compliance`, `audit-logging`, `regulatory-assessment` | C: map, E: edit, V: validate |
| 26 | `bmad-bam-data-residency` | `data-residency-design`, `regional-deployment`, `data-sovereignty` | C: design, E: edit, V: validate |
| 27 | `bmad-bam-white-labeling` | `white-labeling-design`, `branding-configuration`, `tenant-customization` | C: design, E: edit, V: validate |
| 28 | `bmad-bam-billing` | `billing-architecture`, `metering-design`, `usage-tracking`, `quota-management` | C: design, E: edit, V: validate |
| 29 | `bmad-bam-testing` | `tenant-testing-design`, `isolation-testing`, `tea-integration`, `performance-testing` | C: design, E: edit, V: validate |
| 30 | `bmad-bam-research` | `market-research`, `competitive-analysis`, `technology-research` | C: research, E: update, V: validate |

### Original Workflow Count Verification

| Category | Original Count | Consolidated Count |
|----------|----------------|-------------------|
| Foundation/Planning | 15 | 3 |
| Module Design | 28 | 4 |
| Integration | 22 | 4 |
| Operations | 31 | 6 |
| AI Runtime | 26 | 5 |
| Supporting | 65 | 8 |
| **Total** | **187** | **30** |

## Appendix F: Persona File Content Specifications

### atlas.md

```markdown
# Atlas - Platform Architect Persona

**Activation:** ZA menu code  
**Focus:** Foundation, scaling, tenant isolation

---

## Identity

Atlas is the Platform Architect persona within BAM. Named after the Titan who holds up the sky, Atlas focuses on the foundational architecture that supports all tenants and agents.

## Focus Areas

| Area | Description | Quality Gates |
|------|-------------|---------------|
| Foundation Design | Master architecture, system boundaries | QG-F1 |
| Tenant Isolation | RLS, schema, database isolation | QG-M2 |
| Platform Scaling | Horizontal, vertical, auto-scaling | - |
| Infrastructure | Cloud patterns, deployment topology | QG-P1 |

## Decision Framework

| Question | Atlas Perspective |
|----------|-------------------|
| Single vs Multi-tenant? | Multi-tenant unless compliance prohibits |
| RLS vs Schema isolation? | RLS for <1000 tenants, schema for regulated |
| Monolith vs Microservices? | Modular monolith first, extract later |
| Cloud vs On-prem? | Cloud-native, on-prem for enterprise tier |

## Core Workflows

- **ZM** - Master Architecture (owns QG-F1)
- **ZT** - Tenant Isolation (owns QG-M2)
- **ZWS** - Scaling Design

## Domain Dependencies

Atlas typically loads:
- `domains/tenant.md` - Tenant isolation patterns
- `domains/security.md` - Platform security
- `domains/storage.md` - Data architecture
- `patterns/rls.md` - When designing isolation

## Handoff Triggers

| Trigger | Hand To | Context |
|---------|---------|---------|
| "Agent orchestration needed" | Nova (ZN) | Runtime architecture |
| "Module integration required" | Kai (ZK) | Facade contracts |
| "Implementation details" | Dev (YD*) | Coding patterns |

## Web Research Queries

Search for current practices:
- "multi-tenant architecture patterns {date}"
- "PostgreSQL RLS performance {date}"
- "cloud-native SaaS architecture {date}"
```

### nova.md

```markdown
# Nova - AI Runtime Architect Persona

**Activation:** ZN menu code  
**Focus:** Agent orchestration, LLM operations, AI safety

---

## Identity

Nova is the AI Runtime Architect persona within BAM. Named after stellar explosions that birth new elements, Nova focuses on the AI agent systems that power tenant-specific intelligence.

## Focus Areas

| Area | Description | Quality Gates |
|------|-------------|---------------|
| Agent Runtime | LangGraph, CrewAI, AutoGen selection | QG-M3 |
| LLM Operations | Model versioning, prompt management | - |
| Memory Tiers | Session, working, persistent memory | - |
| Agent Safety | Tenant scoping, resource limits | QG-I3 |

## Decision Framework

| Question | Nova Perspective |
|----------|------------------|
| LangGraph vs CrewAI? | LangGraph for state machines, CrewAI for crews |
| Shared vs Per-tenant models? | Shared models, tenant-specific prompts |
| Memory persistence? | 3-tier: session, working, persistent |
| Agent execution limits? | Tier-based resource quotas |

## Core Workflows

- **ZR** - Agent Runtime (owns QG-M3)
- **ZWA** - Agent Debug

## Domain Dependencies

Nova typically loads:
- `domains/ai-runtime.md` - Agent patterns
- `patterns/langgraph.md` - LangGraph specifics
- `patterns/crewai.md` - CrewAI specifics

## Agent Runtime Selection

| Runtime | Use When | Avoid When |
|---------|----------|------------|
| LangGraph | Complex state machines, conditional flows | Simple sequential tasks |
| CrewAI | Role-based collaboration, hierarchies | Single-agent systems |
| AutoGen | Multi-agent debate, consensus | Deterministic workflows |
| DSPy | Prompt optimization, structured output | Real-time chat |
| Instructor | Type-safe LLM outputs, validation | Unstructured responses |

## Handoff Triggers

| Trigger | Hand To | Context |
|---------|---------|---------|
| "Platform infrastructure" | Atlas (ZA) | Foundation design |
| "Tool contracts" | Kai (ZK) | MCP integration |
| "Agent implementation" | Dev (YDA) | Coding guidance |

## Web Research Queries

Search for current practices:
- "LangGraph agent patterns {date}"
- "LLM multi-tenant architecture {date}"
- "AI agent memory management {date}"
```

### kai.md

```markdown
# Kai - Integration Architect Persona

**Activation:** ZK menu code  
**Focus:** Facades, contracts, convergence

---

## Identity

Kai is the Integration Architect persona within BAM. Named for "connection" in multiple languages, Kai focuses on how modules connect through facades and how external tools integrate via contracts.

## Focus Areas

| Area | Description | Quality Gates |
|------|-------------|---------------|
| Facade Design | Module boundaries, contracts | QG-I1 |
| Contract Evolution | Versioning, backward compatibility | - |
| Convergence | Integration testing, safety | QG-I2, QG-I3 |
| API Design | Versioning, deprecation | - |

## Decision Framework

| Question | Kai Perspective |
|----------|-----------------|
| Direct calls vs Facades? | Always facades between modules |
| Sync vs Async? | Async for cross-module, sync within |
| Breaking changes? | Deprecate, version, migrate, remove |
| Tool contracts? | MCP-standard with tenant context |

## Core Workflows

- **ZF** - Facade Contract (owns QG-I1)
- **ZC** - Convergence (owns QG-I2, QG-I3)
- **ZWE** - Event Architecture

## Domain Dependencies

Kai typically loads:
- `domains/integration.md` - Facade patterns
- `domains/events.md` - Event-driven patterns
- `patterns/facade.md` - Contract templates

## Contract Evolution Rules

| Change Type | Action Required | Example |
|-------------|-----------------|---------|
| Additive | None | New optional field |
| Compatible | Document | Response shape change |
| Breaking | Version bump | Required field removal |
| Deprecation | Sunset period | Old endpoint removal |

## Handoff Triggers

| Trigger | Hand To | Context |
|---------|---------|---------|
| "Platform boundaries" | Atlas (ZA) | Module scope |
| "Agent tool contracts" | Nova (ZN) | MCP tools |
| "API implementation" | Dev (YD*) | Coding |

## Web Research Queries

Search for current practices:
- "API versioning best practices {date}"
- "modular monolith integration {date}"
- "MCP tool patterns {date}"
```

## Appendix G: Domain File Content Specifications

### Domain File Template

Each domain file follows this structure:

```markdown
# {Domain Name} - BAM Domain Context

**Loaded by:** {Menu codes that load this}  
**Related Workflows:** {Workflow list}

---

## Overview

{2-3 sentence domain description}

## Core Concepts

### {Concept 1}

{Explanation with diagrams/tables}

### {Concept 2}

{Explanation with diagrams/tables}

## Decision Matrix

| Scenario | Recommendation | Rationale |
|----------|----------------|-----------|
| {Case 1} | {Action} | {Why} |
| {Case 2} | {Action} | {Why} |

## Implementation Patterns

### Pattern 1: {Name}

**When:** {Conditions}  
**How:** {Steps}

```{language}
{Code example if needed}
```

### Pattern 2: {Name}

{...}

## Quality Checks

- [ ] {Check 1}
- [ ] {Check 2}
- [ ] **CRITICAL:** {Critical check}

## Web Research Queries

- "{domain} multi-tenant patterns {date}"
- "{domain} SaaS best practices {date}"

## Related Domains

- `{related1}.md` - {Relationship}
- `{related2}.md` - {Relationship}
```

### tenant.md (Example Implementation)

```markdown
# Tenant - BAM Domain Context

**Loaded by:** ZDT, ZT, YAD  
**Related Workflows:** bmad-bam-tenant-isolation, bmad-bam-tenant-onboarding

---

## Overview

Tenant isolation is the foundation of multi-tenant SaaS. Every data access, cache operation, and agent execution must respect tenant boundaries.

## Core Concepts

### Isolation Matrix (8 Dimensions)

| Dimension | RLS | Schema | Database |
|-----------|-----|--------|----------|
| Data | Row-level | Schema-level | DB-level |
| Compute | Shared | Shared | Dedicated |
| Network | Shared | Shared | VPC |
| Storage | Prefixed | Schemed | Separated |
| Cache | Keyed | Schemed | Dedicated |
| Memory | Scoped | Scoped | Isolated |
| Agents | Scoped | Scoped | Isolated |
| Backups | Tagged | Separate | Separate |

### Tenant Context Propagation

```
Request → Middleware → TenantContext → All Services
                           ↓
              ┌────────────┴────────────┐
              ↓            ↓            ↓
           Database      Cache       Storage
           (RLS)      (Prefixed)   (Pathed)
```

## Decision Matrix

| Tenants | Compliance | Tier | Recommendation |
|---------|------------|------|----------------|
| <1000 | Low | All | RLS |
| <1000 | High | Pro/Enterprise | Schema |
| Any | PCI/HIPAA | Enterprise | Database |
| >10000 | Low | All | RLS + Sharding |

## Implementation Patterns

### Pattern 1: Tenant Context Middleware

**When:** Every HTTP request  
**How:**
1. Extract X-Tenant-ID header
2. Validate tenant exists and active
3. Set context for request lifetime
4. Clear context after response

### Pattern 2: RLS Policy

**When:** Every database query  
**How:**
1. Enable RLS on all tenant tables
2. Create policy using tenant_id
3. Set session variable from context

```sql
CREATE POLICY tenant_isolation ON orders
  USING (tenant_id = current_setting('app.tenant_id')::uuid);
```

## Quality Checks

- [ ] Tenant ID in all request logs
- [ ] RLS policies on all tenant tables
- [ ] Cache keys include tenant prefix
- [ ] Storage paths include tenant segment
- [ ] **CRITICAL:** No cross-tenant data access possible

## Web Research Queries

- "PostgreSQL RLS multi-tenant {date}"
- "tenant isolation patterns SaaS {date}"
- "multi-tenant cache isolation {date}"

## Related Domains

- `security.md` - Tenant security boundaries
- `compliance.md` - Data residency requirements
- `caching.md` - Tenant-aware caching
```

## Appendix H: Pattern File Content Specifications

### Pattern File Template

```markdown
# {Pattern Name} - BAM Pattern

**Loaded by:** {ZP* menu codes}  
**Applies to:** {Scenarios}

---

## When to Use

{Clear conditions when this pattern applies}

## When NOT to Use

{Anti-patterns and inappropriate scenarios}

## Architecture

{ASCII diagram of pattern structure}

## Implementation

### Step 1: {Step Name}

{Detailed instructions}

### Step 2: {Step Name}

{Detailed instructions}

## Code Examples

### {Language/Framework}

```{language}
{Working code example}
```

## Configuration

| Setting | Value | Description |
|---------|-------|-------------|
| {key} | {value} | {purpose} |

## Trade-offs

| Benefit | Cost |
|---------|------|
| {Pro 1} | {Con 1} |
| {Pro 2} | {Con 2} |

## Migration Path

**From {other pattern}:**
1. {Step 1}
2. {Step 2}

## Web Research Queries

- "{pattern} implementation {date}"
- "{pattern} performance {date}"
```

### rls.md (Example Implementation)

```markdown
# Row-Level Security (RLS) - BAM Pattern

**Loaded by:** ZPR  
**Applies to:** Multi-tenant data isolation

---

## When to Use

- <1000 tenants
- Cost efficiency is priority
- Shared infrastructure acceptable
- Low-medium compliance requirements

## When NOT to Use

- Tenants require dedicated resources
- Strict compliance (PCI-DSS, HIPAA)
- Complex per-tenant schema variations
- Enterprise-tier dedicated isolation

## Architecture

```
┌─────────────────────────────────────────┐
│           Shared Database               │
│  ┌───────────────────────────────────┐  │
│  │         Shared Tables             │  │
│  │  ┌─────────┬─────────┬─────────┐  │  │
│  │  │Tenant A │Tenant B │Tenant C │  │  │
│  │  │ (rows)  │ (rows)  │ (rows)  │  │  │
│  │  └─────────┴─────────┴─────────┘  │  │
│  │                                   │  │
│  │     ┌─────────────────────┐      │  │
│  │     │   RLS Policy        │      │  │
│  │     │  tenant_id = ctx    │      │  │
│  │     └─────────────────────┘      │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

## Implementation

### Step 1: Add Tenant Column

Every tenant table needs a `tenant_id` column:

```sql
ALTER TABLE orders ADD COLUMN tenant_id UUID NOT NULL;
CREATE INDEX idx_orders_tenant ON orders(tenant_id);
```

### Step 2: Enable RLS

```sql
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders FORCE ROW LEVEL SECURITY;
```

### Step 3: Create Policy

```sql
CREATE POLICY tenant_isolation_policy ON orders
  FOR ALL
  USING (tenant_id = current_setting('app.tenant_id')::uuid)
  WITH CHECK (tenant_id = current_setting('app.tenant_id')::uuid);
```

### Step 4: Set Context in Application

```typescript
// Middleware sets tenant context
async function setTenantContext(tenantId: string) {
  await db.query(`SET app.tenant_id = '${tenantId}'`);
}

// All subsequent queries are filtered
const orders = await db.query('SELECT * FROM orders'); // Auto-filtered
```

## Configuration

| Setting | Value | Description |
|---------|-------|-------------|
| `app.tenant_id` | UUID | Session-level tenant context |
| `row_security` | on | PostgreSQL parameter |
| `force_row_security` | on | Apply to table owner too |

## Trade-offs

| Benefit | Cost |
|---------|------|
| Simple schema | Query overhead (minor) |
| Cost efficient | Index bloat from tenant_id |
| Easy backup/restore | All tenants in same backup |
| Standard SQL | PostgreSQL-specific |

## Migration Path

**From shared tables (no isolation):**
1. Add tenant_id column
2. Backfill tenant_id for existing rows
3. Create indexes
4. Enable RLS
5. Create policies
6. Update application to set context

**To Schema-per-tenant:**
1. Export tenant data
2. Create tenant schema
3. Import data
4. Update connection routing

## Web Research Queries

- "PostgreSQL RLS performance {date}"
- "row level security multi-tenant {date}"
- "RLS vs schema isolation {date}"
```

## Appendix I: Workflow Skill File Specifications

### SKILL.md Template

```markdown
---
name: bmad-bam-{workflow}
description: '{One-line description for agent selection}'
module: bam
web_bundle: false
tags: [{category}, {subcategory}]
---

# {Workflow Display Name}

## Overview

{What this workflow produces and why it matters}

## Modes

| Mode | Purpose | Step Range | Trigger |
|------|---------|------------|---------|
| Create | Generate new artifact | step-01-c to step-0N-c | New design needed |
| Edit | Modify existing artifact | step-10-e to step-1N-e | Artifact exists |
| Validate | Check against criteria | step-20-v to step-2N-v | Quality gate check |

## Prerequisites

- {What must exist before running}
- **Config required:** `{config_variable}`
- **Quality Gate:** {Prior QG that must pass}

## Context Loading

This workflow loads:
- `{project-root}/_bmad/bam/data/domains/{domain}.md`
- `{project-root}/_bmad/bam/data/checklists/{qg}.md`
- `{project-root}/_bmad/bam/data/templates/{template}.md`

## Outputs

| Mode | Output | Location |
|------|--------|----------|
| Create | {artifact}.md | {output_folder}/planning-artifacts/ |
| Edit | Updated {artifact}.md | Same location |
| Validate | {artifact}-validation.md | Same location |

## Quality Gate

**Gate:** {QG-XX}  
**Checklist:** `data/checklists/{qg}.md`  
**Outcome:** PASS / CONDITIONAL / FAIL

## Related Workflows

| Workflow | Relationship |
|----------|--------------|
| {prior} | Must run before |
| {next} | Run after success |
| {related} | Related domain |

## Web Research

Before starting Create mode:
- "{topic} best practices {date}"
- "{topic} multi-tenant {date}"
```

### workflow.md Template

```markdown
# {Workflow Name}

## Mode Selection

| Mode | Description | Step Files |
|------|-------------|------------|
| **Create** | Generate new {artifact} | step-01-c-* through step-0N-c-* |
| **Edit** | Modify existing {artifact} | step-10-e-* through step-1N-e-* |
| **Validate** | Check {artifact} against {criteria} | step-20-v-* through step-2N-v-* |

**Default:** Create mode unless artifact exists at `{output_folder}/planning-artifacts/{artifact}.md`

---

## Create Mode

**Trigger:** User requests new {artifact} or no existing artifact found

### Steps

1. `step-01-c-{first}` - {Description}
2. `step-02-c-{second}` - {Description}
3. `step-0N-c-{last}` - {Description}

### Soft Gates

- After step-{N}: Present summary, confirm before proceeding

### Output

`{artifact}.md` written to `{output_folder}/planning-artifacts/`

---

## Edit Mode

**Trigger:** User requests changes to existing {artifact}

### Prerequisites

- Existing artifact at expected location
- User specifies changes needed

### Steps

1. `step-10-e-load` - Load existing artifact
2. `step-11-e-apply` - Apply requested changes

### Output

Updated `{artifact}.md` at same location

---

## Validate Mode

**Trigger:** Quality gate check requested (QG-{XX})

### Prerequisites

- Artifact exists
- Ready for quality gate

### Steps

1. `step-20-v-load` - Load artifact and checklist
2. `step-21-v-validate` - Run all checks
3. `step-22-v-report` - Generate validation report

### Output

`{artifact}-validation.md` with PASS/CONDITIONAL/FAIL result

---

## Post-Completion

After any mode completes:
1. Update sidecar: `_bmad/_memory/bam-architect/{relevant}.md`
2. Announce next recommended workflow
3. If Validate mode passed: Ready for dependent workflows
```

## Appendix J: Sidecar Template Specifications

### architecture-decisions.md

```markdown
# BAM Architecture Decisions Sidecar

**Session Continuity:** This file persists architectural decisions across conversations.

---

## Tenant Model

**Selected:** {Not yet selected}  
**Decided:** {Date}  
**Rationale:** {Why this model}

| Dimension | Decision |
|-----------|----------|
| Isolation | {RLS/Schema/Database} |
| Tier differentiation | {How tiers differ} |
| Data residency | {Regions} |

## AI Runtime

**Selected:** {Not yet selected}  
**Decided:** {Date}  
**Rationale:** {Why this runtime}

| Component | Choice |
|-----------|--------|
| Framework | {LangGraph/CrewAI/etc.} |
| Memory strategy | {3-tier/custom} |
| Tool integration | {MCP/custom} |

## Module Boundaries

| Module | Responsibility | Status |
|--------|---------------|--------|
| {module1} | {description} | {Designed/Implemented} |
| {module2} | {description} | {status} |

## Quality Gate Progress

| Gate | Status | Date | Notes |
|------|--------|------|-------|
| QG-F1 | {Pending/Pass/Conditional} | {date} | {notes} |
| QG-M1 | {status} | {date} | {notes} |
| QG-M2 | {status} | {date} | {notes} |
| QG-M3 | {status} | {date} | {notes} |

## Open Decisions

1. {Decision needed}
2. {Decision needed}

## Session Log

| Date | Persona | Activity | Outcome |
|------|---------|----------|---------|
| {date} | Atlas | Master architecture | QG-F1 pending |

---

*Updated by BAM agent sessions. Do not edit manually.*
```

### runtime-preferences.md

```markdown
# BAM Runtime Preferences Sidecar

**Session Continuity:** AI runtime decisions and configurations.

---

## Selected Runtime

**Framework:** {Not yet selected}  
**Version:** {version}

## Agent Topology

```
{Diagram will be populated after agent runtime design}
```

## Memory Configuration

| Tier | Purpose | Storage | TTL |
|------|---------|---------|-----|
| Session | Conversation context | Memory | Request |
| Working | Task progress | Redis | 1 hour |
| Persistent | Long-term | Database | Permanent |

## Tool Contracts

| Tool | Version | Status |
|------|---------|--------|
| {tool1} | {version} | {Active/Deprecated} |

## LLM Configuration

| Setting | Value |
|---------|-------|
| Primary model | {model} |
| Fallback model | {model} |
| Temperature | {value} |
| Max tokens | {value} |

## Tenant Resource Limits

| Tier | Agents/Request | Memory | Timeout |
|------|----------------|--------|---------|
| Free | 1 | 512MB | 30s |
| Pro | 5 | 2GB | 120s |
| Enterprise | 20 | 8GB | 300s |

---

*Updated by BAM agent sessions. Do not edit manually.*
```

### integration-history.md

```markdown
# BAM Integration History Sidecar

**Session Continuity:** Facade contracts and integration decisions.

---

## Facade Contracts

| Module | Version | Status | Last Updated |
|--------|---------|--------|--------------|
| {module1} | v1 | Active | {date} |

## Contract Evolution Log

| Date | Contract | Change | Breaking |
|------|----------|--------|----------|
| {date} | {name} | {description} | {Yes/No} |

## Integration Tests

| Test Suite | Last Run | Result |
|------------|----------|--------|
| Convergence | {date} | {Pass/Fail} |
| Tenant Safety | {date} | {result} |
| Agent Safety | {date} | {result} |

## API Versions

| API | Current | Deprecated | Sunset |
|-----|---------|------------|--------|
| {api1} | v2 | v1 | {date} |

## Open Integration Issues

1. {Issue description}
2. {Issue description}

---

*Updated by BAM agent sessions. Do not edit manually.*
```

## Appendix K: Error Handling and Rollback Procedures

### Migration Error Categories

| Category | Severity | Example | Recovery |
|----------|----------|---------|----------|
| **TOML Syntax** | Critical | Invalid TOML format | Fix syntax, retry |
| **Path Reference** | Critical | File not found | Update path, retry |
| **Menu Collision** | Warning | Duplicate code | Rename code |
| **Content Loss** | Critical | Data not migrated | Restore from backup |
| **Partial Migration** | Warning | Some files failed | Retry failed files |

### Pre-Migration Checklist

```bash
#!/bin/bash
# pre-migration-check.sh

echo "=== Pre-Migration Validation ==="

# 1. Backup exists
if [ -d "_bmad/bam.v1.backup" ]; then
  echo "✗ Backup already exists - previous migration failed?"
  exit 1
fi

# 2. Source files exist
if [ ! -d "src/data/extensions" ]; then
  echo "✗ Source extensions not found"
  exit 1
fi

# 3. Disk space
REQUIRED_MB=100
AVAILABLE_MB=$(df -m . | tail -1 | awk '{print $4}')
if [ "$AVAILABLE_MB" -lt "$REQUIRED_MB" ]; then
  echo "✗ Insufficient disk space: ${AVAILABLE_MB}MB < ${REQUIRED_MB}MB"
  exit 1
fi

# 4. No uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
  echo "⚠ Uncommitted changes - recommend committing first"
fi

echo "✓ Pre-migration checks passed"
```

### Rollback Procedure

```bash
#!/bin/bash
# rollback-migration.sh

echo "=== Rolling Back BAM Migration ==="

# 1. Verify backup exists
if [ ! -d "_bmad/bam.v1.backup" ]; then
  echo "✗ No backup found at _bmad/bam.v1.backup"
  echo "  Cannot rollback without backup"
  exit 1
fi

# 2. Remove new files
echo "Removing v2 files..."
rm -rf _bmad/bam/
rm -f _bmad/custom/*.toml

# 3. Restore backup
echo "Restoring v1 backup..."
mv _bmad/bam.v1.backup _bmad/bam

# 4. Restore customize.yaml files
if [ -d "_bmad/bam.v1.customize.backup" ]; then
  mv _bmad/bam.v1.customize.backup/*.yaml _bmad/custom/
fi

# 5. Verify restoration
echo "Verifying restoration..."
if [ -f "_bmad/bam/data/extensions/architect-bam.yaml" ]; then
  echo "✓ Extensions restored"
else
  echo "✗ Extensions not found after restore"
  exit 1
fi

echo "✓ Rollback complete"
echo "  Run 'npm test' to verify v1 functionality"
```

### Error Recovery Procedures

#### TOML Syntax Error

```
Error: Invalid TOML at line 45
  → Expected ']' but found EOF
```

**Recovery:**
1. Open failing file in TOML-aware editor
2. Run `toml-cli check {file}` for detailed error
3. Fix syntax error
4. Re-run migration for that file only: `bmad migrate bam --file {file}`

#### Path Reference Error

```
Error: File not found
  → {project-root}/_bmad/bam/data/domains/tenant.md
```

**Recovery:**
1. Verify file exists: `ls -la src/data/domains/`
2. Check path resolution: `{project-root}` should resolve
3. If file genuinely missing, create from template
4. Re-run migration

#### Content Loss Detection

```
Error: Content validation failed
  → Isolation Matrix not found in consolidated tenant.md
  → Expected patterns: 8, Found: 6
```

**Recovery:**
1. Check source files for original content
2. Re-run consolidation with verbose logging: `bmad consolidate --verbose`
3. Manually verify critical content preserved
4. If content lost, restore from git: `git checkout HEAD -- {file}`

### Migration State File

Track migration progress in `.bmad-migration-state.json`:

```json
{
  "version": "1.0.0",
  "started": "2026-04-26T10:00:00Z",
  "status": "in_progress",
  "phases": {
    "backup": { "status": "complete", "timestamp": "..." },
    "toml_conversion": { "status": "complete", "files": 8 },
    "workflow_consolidation": { "status": "in_progress", "completed": 15, "total": 30 },
    "content_consolidation": { "status": "pending" },
    "verification": { "status": "pending" }
  },
  "errors": [],
  "warnings": [
    { "type": "menu_collision", "code": "BP", "resolution": "renamed to ZBP" }
  ]
}
```

### Partial Migration Recovery

If migration fails mid-way:

```bash
#!/bin/bash
# resume-migration.sh

STATE_FILE=".bmad-migration-state.json"

if [ ! -f "$STATE_FILE" ]; then
  echo "No migration state found - start fresh with 'bmad migrate bam'"
  exit 1
fi

# Read last completed phase
LAST_PHASE=$(jq -r '.phases | to_entries | map(select(.value.status == "complete")) | last | .key' "$STATE_FILE")

echo "Last completed phase: $LAST_PHASE"
echo "Resuming from next phase..."

case "$LAST_PHASE" in
  "backup")
    bmad migrate bam --start-from toml_conversion
    ;;
  "toml_conversion")
    bmad migrate bam --start-from workflow_consolidation
    ;;
  "workflow_consolidation")
    bmad migrate bam --start-from content_consolidation
    ;;
  "content_consolidation")
    bmad migrate bam --start-from verification
    ;;
  *)
    echo "Unknown phase: $LAST_PHASE"
    exit 1
    ;;
esac
```

## Appendix L: End-to-End Test Specifications

### E2E Test Suite Structure

```
test/
├── e2e/
│   ├── migration.e2e.test.js      # Full migration flow
│   ├── workflow-execution.e2e.test.js  # Workflow CEV modes
│   ├── context-loading.e2e.test.js     # Tiered context loading
│   ├── menu-invocation.e2e.test.js     # Z-prefix menu codes
│   └── quality-gates.e2e.test.js       # QG flow testing
```

### migration.e2e.test.js

```javascript
/**
 * End-to-end migration tests
 * These tests run the full migration and verify results
 */
import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';

describe('BAM Migration E2E', () => {
  const testDir = path.join(__dirname, 'fixtures', 'migration-test');
  
  beforeAll(async () => {
    // Set up test directory with v1 BAM structure
    await fs.copy(path.join(__dirname, 'fixtures', 'bam-v1'), testDir);
  });
  
  afterAll(async () => {
    // Clean up test directory
    await fs.remove(testDir);
  });

  test('full migration completes without errors', () => {
    const result = execSync('bmad migrate bam --from v1 --to v2', {
      cwd: testDir,
      encoding: 'utf-8'
    });
    
    expect(result).toContain('Migration complete');
    expect(result).not.toContain('Error');
  });

  test('backup created before migration', async () => {
    const backupExists = await fs.pathExists(
      path.join(testDir, '_bmad', 'bam.v1.backup')
    );
    expect(backupExists).toBe(true);
  });

  test('TOML files created for all agents', async () => {
    const expectedFiles = [
      'bmad-agent-architect.toml',
      'bmad-agent-analyst.toml',
      'bmad-agent-dev.toml',
      'bmad-agent-pm.toml',
      'bmad-agent-ux-designer.toml',
      'wds-agent-saga-analyst.toml',
      'wds-agent-freya-ux.toml',
      'bmad-cis-agent-innovation-strategist.toml'
    ];
    
    for (const file of expectedFiles) {
      const exists = await fs.pathExists(
        path.join(testDir, '_bmad', 'custom', file)
      );
      expect(exists).toBe(true);
    }
  });

  test('30 consolidated workflows created', async () => {
    const skillsDir = path.join(testDir, '.claude', 'skills');
    const skills = await fs.readdir(skillsDir);
    const bamSkills = skills.filter(s => s.startsWith('bmad-bam-'));
    
    expect(bamSkills.length).toBe(30);
  });

  test('critical content preserved after migration', async () => {
    const tenantDomain = await fs.readFile(
      path.join(testDir, '_bmad', 'bam', 'data', 'domains', 'tenant.md'),
      'utf-8'
    );
    
    // Verify critical content preserved
    expect(tenantDomain).toContain('Isolation Matrix');
    expect(tenantDomain).toContain('Tenant Context Propagation');
    expect(tenantDomain).toContain('RLS');
  });

  test('rollback restores v1 state', async () => {
    // Run rollback
    execSync('./scripts/rollback-migration.sh', {
      cwd: testDir,
      encoding: 'utf-8'
    });
    
    // Verify v1 files restored
    const extensionExists = await fs.pathExists(
      path.join(testDir, '_bmad', 'bam', 'data', 'extensions', 'architect-bam.yaml')
    );
    expect(extensionExists).toBe(true);
    
    // Verify v2 files removed
    const tomlExists = await fs.pathExists(
      path.join(testDir, '_bmad', 'custom', 'bmad-agent-architect.toml')
    );
    expect(tomlExists).toBe(false);
  });
});
```

### workflow-execution.e2e.test.js

```javascript
/**
 * Workflow execution E2E tests
 * Tests all CEV modes for consolidated workflows
 */
import { AgentRunner } from './helpers/agent-runner';

describe('Workflow CEV Execution', () => {
  let runner;
  
  beforeAll(() => {
    runner = new AgentRunner({ cwd: process.cwd() });
  });

  describe('bmad-bam-tenant-isolation', () => {
    test('Create mode generates new tenant isolation design', async () => {
      const result = await runner.invokeSkill('bmad-bam-tenant-isolation', {
        mode: 'create',
        inputs: {
          tenant_model: 'row-level-security',
          tenants_expected: 500
        }
      });
      
      expect(result.status).toBe('success');
      expect(result.output).toContain('tenant-isolation.md');
      expect(result.checklist).toContain('QG-M2');
    });

    test('Edit mode updates existing design', async () => {
      // First create
      await runner.invokeSkill('bmad-bam-tenant-isolation', {
        mode: 'create',
        inputs: { tenant_model: 'row-level-security' }
      });
      
      // Then edit
      const result = await runner.invokeSkill('bmad-bam-tenant-isolation', {
        mode: 'edit',
        inputs: {
          change: 'Add enterprise tier with schema isolation'
        }
      });
      
      expect(result.status).toBe('success');
      expect(result.output).toContain('schema isolation');
    });

    test('Validate mode runs QG-M2 checklist', async () => {
      const result = await runner.invokeSkill('bmad-bam-tenant-isolation', {
        mode: 'validate'
      });
      
      expect(result.status).toBe('success');
      expect(result.gate).toBe('QG-M2');
      expect(['PASS', 'CONDITIONAL', 'FAIL']).toContain(result.outcome);
    });
  });

  describe('Quality Gate Sequence', () => {
    test('QG-F1 → QG-M1 → QG-M2 → QG-M3 sequence', async () => {
      // QG-F1
      await runner.invokeSkill('bmad-bam-master-architecture', { mode: 'create' });
      const f1 = await runner.invokeSkill('bmad-bam-master-architecture', { mode: 'validate' });
      expect(f1.outcome).toBe('PASS');
      
      // QG-M1
      await runner.invokeSkill('bmad-bam-module-architecture', { mode: 'create' });
      const m1 = await runner.invokeSkill('bmad-bam-module-architecture', { mode: 'validate' });
      expect(m1.outcome).toBe('PASS');
      
      // QG-M2
      await runner.invokeSkill('bmad-bam-tenant-isolation', { mode: 'create' });
      const m2 = await runner.invokeSkill('bmad-bam-tenant-isolation', { mode: 'validate' });
      expect(m2.outcome).toBe('PASS');
      
      // QG-M3
      await runner.invokeSkill('bmad-bam-agent-runtime', { mode: 'create' });
      const m3 = await runner.invokeSkill('bmad-bam-agent-runtime', { mode: 'validate' });
      expect(m3.outcome).toBe('PASS');
    });
  });
});
```

### context-loading.e2e.test.js

```javascript
/**
 * Context loading E2E tests
 * Verifies tiered context loading behavior
 */
import { AgentRunner } from './helpers/agent-runner';

describe('Tiered Context Loading', () => {
  let runner;
  
  beforeAll(() => {
    runner = new AgentRunner({ cwd: process.cwd() });
  });

  test('Tier 1: Only bam-core.md loaded on activation', async () => {
    const context = await runner.getLoadedContext('bmad-agent-architect');
    
    expect(context.files).toContain('bam-core.md');
    expect(context.files).not.toContain('atlas.md');
    expect(context.files).not.toContain('tenant.md');
    expect(context.estimatedTokens).toBeLessThan(600);
  });

  test('Tier 2: Persona loaded on ZA invocation', async () => {
    await runner.invokeMenu('ZA');
    const context = await runner.getLoadedContext('bmad-agent-architect');
    
    expect(context.files).toContain('bam-core.md');
    expect(context.files).toContain('atlas.md');
    expect(context.estimatedTokens).toBeLessThan(2000);
  });

  test('Tier 3: Domain loaded by workflow', async () => {
    await runner.invokeSkill('bmad-bam-tenant-isolation', { mode: 'create' });
    const context = await runner.getLoadedContext('bmad-agent-architect');
    
    expect(context.files).toContain('tenant.md');
    expect(context.files).toContain('security.md');
    expect(context.files).toContain('qg-m2.md');
    expect(context.estimatedTokens).toBeLessThan(5000);
  });

  test('Tier 4: Ad-hoc domain loaded on ZDT', async () => {
    await runner.invokeMenu('ZDT');
    const context = await runner.getLoadedContext('bmad-agent-architect');
    
    expect(context.files).toContain('tenant.md');
    expect(context.files).toContain('tenant-models.csv');
  });

  test('Context cleared between sessions', async () => {
    await runner.invokeMenu('ZA');  // Load Atlas
    await runner.newSession();
    const context = await runner.getLoadedContext('bmad-agent-architect');
    
    // Only core should remain
    expect(context.files).toContain('bam-core.md');
    expect(context.files).not.toContain('atlas.md');
  });
});
```

### menu-invocation.e2e.test.js

```javascript
/**
 * Menu invocation E2E tests
 * Tests Z-prefix menu codes work correctly
 */
import { AgentRunner } from './helpers/agent-runner';

describe('Z-Prefix Menu Invocation', () => {
  let runner;
  
  beforeAll(() => {
    runner = new AgentRunner({ cwd: process.cwd() });
  });

  describe('Persona Codes (ZA, ZN, ZK)', () => {
    test.each([
      ['ZA', 'Atlas', 'Platform Architect'],
      ['ZN', 'Nova', 'AI Runtime Architect'],
      ['ZK', 'Kai', 'Integration Architect']
    ])('%s activates %s persona', async (code, name, role) => {
      const result = await runner.invokeMenu(code);
      
      expect(result.response).toContain(name);
      expect(result.response).toContain(role);
      expect(result.filesLoaded).toContain(`${name.toLowerCase()}.md`);
    });
  });

  describe('Workflow Codes (ZM, ZT, ZR, ZB, ZF, ZC, ZP)', () => {
    test.each([
      ['ZM', 'bmad-bam-master-architecture'],
      ['ZT', 'bmad-bam-tenant-isolation'],
      ['ZR', 'bmad-bam-agent-runtime'],
      ['ZB', 'bmad-bam-module-architecture'],
      ['ZF', 'bmad-bam-facade-contract'],
      ['ZC', 'bmad-bam-convergence'],
      ['ZP', 'bmad-bam-production-readiness']
    ])('%s invokes %s skill', async (code, skill) => {
      const result = await runner.invokeMenu(code);
      
      expect(result.skillInvoked).toBe(skill);
    });
  });

  describe('Domain Loaders (ZD*)', () => {
    test.each([
      ['ZDT', 'tenant.md'],
      ['ZDA', 'ai-runtime.md'],
      ['ZDI', 'integration.md'],
      ['ZDS', 'security.md'],
      ['ZDO', 'observability.md'],
      ['ZDB', 'billing.md']
    ])('%s loads %s', async (code, file) => {
      const result = await runner.invokeMenu(code);
      
      expect(result.filesLoaded).toContain(file);
    });
  });

  describe('Pattern Loaders (ZP*)', () => {
    test.each([
      ['ZPR', 'rls.md'],
      ['ZPS', 'schema-per-tenant.md'],
      ['ZPD', 'database-per-tenant.md'],
      ['ZPL', 'langgraph.md'],
      ['ZPC', 'crewai.md']
    ])('%s loads %s', async (code, file) => {
      const result = await runner.invokeMenu(code);
      
      expect(result.filesLoaded).toContain(file);
    });
  });

  test('No collision with BMM/WDS/CIS codes', async () => {
    const bamCodes = ['ZA', 'ZN', 'ZK', 'ZM', 'ZT', 'ZR', 'ZB', 'ZF', 'ZC', 'ZP'];
    const bmmCodes = ['A', 'M', 'W', 'J', 'C', 'E']; // Sample BMM codes
    const wdsCodes = ['AS', 'PB', 'TM', 'SC', 'BP', 'RS', 'DP'];
    
    for (const bamCode of bamCodes) {
      expect(bmmCodes).not.toContain(bamCode);
      expect(wdsCodes).not.toContain(bamCode);
    }
  });
});
```

### Test Fixtures Directory Structure

```
test/
├── fixtures/
│   ├── bam-v1/                    # V1 BAM installation for migration tests
│   │   ├── _bmad/
│   │   │   └── bam/
│   │   │       ├── data/
│   │   │       │   ├── extensions/
│   │   │       │   ├── agent-guides/
│   │   │       │   ├── templates/
│   │   │       │   └── checklists/
│   │   │       └── config.yaml
│   │   └── custom/
│   │       └── *.customize.yaml
│   │
│   └── expected-v2/               # Expected V2 output for validation
│       ├── customize/
│       │   └── *.toml
│       ├── skills/
│       │   └── bmad-bam-*/
│       └── data/
│           ├── context/
│           ├── personas/
│           ├── domains/
│           └── patterns/
```

---

**End of Specification**

*Generated with Claude Code*
