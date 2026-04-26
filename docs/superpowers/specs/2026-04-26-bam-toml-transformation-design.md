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

---

**End of Specification**

*Generated with Claude Code*
