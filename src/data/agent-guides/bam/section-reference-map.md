# BAM Section Reference Map Guide

**When to load:** During template creation, document section planning, cross-reference verification, or when mapping document sections to patterns and resources in BAM.

**Integrates with:** All BMAD agents producing documentation artifacts.

---

## Core Concepts

### Architecture Document Sections

| Section | Patterns Source | Templates | Checklists |
|---------|-----------------|-----------|------------|
| Executive Summary | - | master-architecture-template.md | - |
| System Overview | platform-architecture.md | master-architecture-template.md | foundation-gate.md |
| Tenant Model | tenant-models.csv | tenant-model-template.md | tenant-isolation.md |
| Module Design | module-*.csv | module-architecture-template.md | module-architecture.md |
| AI Runtime | ai-runtimes.csv | agent-runtime-template.md | qg-m3-agent-runtime.md |
| Security | security-patterns.md | security-architecture-template.md | qg-security-continuous.md |
| Compliance | compliance-frameworks.csv | compliance-matrix-template.md | compliance-checklist.md |

### Section-to-Pattern Mapping

```
┌─────────────────────────────────────────────────┐
│        Section → Pattern → Resource              │
│                                                  │
│  Document Section                                │
│       │                                          │
│       ▼                                          │
│  ┌─────────────────┐                            │
│  │ Pattern Registry│ (bam-patterns.csv)         │
│  │ - pattern_id    │                            │
│  │ - category      │                            │
│  │ - web_queries   │                            │
│  └────────┬────────┘                            │
│           │                                      │
│           ▼                                      │
│  ┌─────────────────┐  ┌─────────────────┐      │
│  │  Agent Guide    │  │    Template     │      │
│  │  (context)      │  │  (output format)│      │
│  └────────┬────────┘  └────────┬────────┘      │
│           │                    │                │
│           └────────┬───────────┘                │
│                    ▼                            │
│           ┌─────────────────┐                   │
│           │   Checklist     │                   │
│           │ (verification)  │                   │
│           └─────────────────┘                   │
└─────────────────────────────────────────────────┘
```

### Template Section Requirements

| Template | Required Sections | Optional Sections |
|----------|-------------------|-------------------|
| master-architecture | Executive Summary, System Overview, Tenant Model, Module Overview, Quality Gates | AI Runtime, Compliance Matrix |
| module-architecture | Module Purpose, Domain Model, Interfaces, Dependencies | AI Components, Security |
| facade-contract | Contract Definition, Operations, Events | Versioning, Migration |
| tenant-isolation | Isolation Strategy, RLS Policies, Testing | Performance, Monitoring |

### Cross-Reference Categories

| Category | Source Files | Target Sections |
|----------|--------------|-----------------|
| Patterns | bam-patterns.csv | Decision rationale |
| Tenant Models | tenant-models.csv | Isolation design |
| AI Runtimes | ai-runtimes.csv | Agent architecture |
| Quality Gates | quality-gates.csv | Verification checklists |
| Compliance | compliance-frameworks.csv | Compliance matrix |

### Section-Pattern CSV Mapping

The `section-pattern-map.csv` contains mappings:

| section_name | patterns | guides | templates | checklists |
|--------------|----------|--------|-----------|------------|
| tenant_isolation | tenant-rls,tenant-schema | tenant-isolation.md | tenant-model-template.md | tenant-isolation.md |
| ai_runtime | agent-langgraph,agent-crewai | ai-runtime.md | agent-runtime-template.md | qg-m3-agent-runtime.md |
| module_design | module-boundary,facade | module-boundaries.md | module-architecture-template.md | module-architecture.md |

### Web Research per Section

| Section | Web Query Template |
|---------|-------------------|
| Tenant Isolation | "multi-tenant {tenant_model} best practices {date}" |
| AI Runtime | "{ai_runtime} agent orchestration patterns {date}" |
| Security | "SaaS security architecture patterns {date}" |
| Compliance | "{framework} compliance SaaS requirements {date}" |
| Module Design | "modular monolith patterns {date}" |

---

## Application Guidelines

When using section reference maps in BAM:

1. **Start with template** - Template defines required sections
2. **Load relevant patterns** - Use section-pattern mapping
3. **Reference agent guides** - Guides provide context
4. **Apply checklist** - Verify section completeness
5. **Include web research** - Current best practices
6. **Document sources** - Cite patterns and guides used

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Which patterns for a section? | Check section-pattern-map.csv | Curated mappings |
| Missing section in template? | Add with rationale | Extend, don't break |
| Conflicting pattern guidance? | Defer to web research | Current practices win |
| Optional vs required sections? | Check checklist | Gate requirements |
| How to cite patterns? | Link to pattern CSV row | Traceability |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Reference patterns:** `{project-root}/_bmad/bam/data/section-pattern-map.csv`
- **All patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "architecture documentation sections {date}"
- Search: "software design document templates {date}"
- Search: "technical documentation best practices {date}"

---

## Related Workflows

- `create-master-architecture` - Uses section mapping
- `create-module-architecture` - Uses section mapping
- `validate-foundation` - Verifies section completeness
