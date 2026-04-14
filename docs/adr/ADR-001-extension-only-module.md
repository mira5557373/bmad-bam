# ADR-001: Extension-Only Module Architecture

## Status

Accepted

## Date

2026-04-01

## Context

When designing BAM (BMAD Agentic Multi-tenant), we faced a fundamental architectural decision: should BAM define its own standalone agents (like Atlas, Nova, and Kai), or should it extend existing BMAD agents?

The original design included three standalone architect personas:
- **Atlas** - Platform Architect for foundation design
- **Nova** - AI Runtime Architect for agent orchestration
- **Kai** - Integration Architect for facade contracts

However, this approach had several issues:

1. **Agent Proliferation** - Adding standalone agents increases cognitive load for users who must choose between similar agents
2. **Ecosystem Fragmentation** - Standalone agents don't benefit from improvements to base BMAD agents
3. **BMB Installer Complexity** - The installer must handle agent conflicts and merging
4. **WDS Pattern Deviation** - Other modules (WDS, CIS) use extensions successfully without standalone agents

## Decision

BAM will be a **pure extension module** with 0 standalone agents. All capabilities will be delivered through extensions to existing BMAD agents.

Specifically:
- Atlas, Nova, and Kai personas are consolidated into `architect-bam.yaml`, which extends `bmad-agent-architect`
- QA and SM capabilities are merged into `dev-bam.yaml`, following BMM consolidation patterns
- All 25 extensions follow the WDS agent-guides pattern
- No `memories:` field is used - context is injected via agent guides

### Extension Distribution

| Target Module | Extensions |
|---------------|------------|
| BMM | 10 (analyst, architect, dev, pm, po, ux, tech-writer, devops, security, master-architect) |
| TEA | 1 |
| WDS | 2 |
| CIS | 12 |

### Persona Consolidation

The `architect-bam.yaml` extension has 24 menu items (intentionally above the 5-10 recommendation) because it consolidates three specialist personas:

```yaml
architect-bam.yaml
├── Atlas capabilities (platform architecture)
├── Nova capabilities (AI runtime)
└── Kai capabilities (integration)
```

This consolidation keeps related capabilities together while avoiding agent fragmentation.

## Consequences

### Positive

1. **Simpler Mental Model** - Users work with familiar BMAD agents enhanced with BAM capabilities
2. **Automatic Upgrades** - Improvements to base agents automatically benefit BAM users
3. **Consistent Patterns** - BAM follows the same extension pattern as WDS and CIS
4. **BMB Compatibility** - No special handling needed for agent conflicts
5. **Reduced Maintenance** - Fewer files to maintain, single source of truth for agent behavior

### Negative

1. **Dense Menu Items** - `architect-bam.yaml` has 24 menu items, which may be overwhelming
2. **Lost Personality** - Atlas, Nova, and Kai as distinct personas are less visible
3. **Discovery Challenge** - Users must know to load BAM context to access capabilities

### Mitigations

- Menu items are organized by persona (Atlas/Nova/Kai sections)
- Each persona has a dedicated context-loading menu item
- Agent guides provide detailed persona descriptions
- SKILL.md files reference the appropriate persona for each workflow

## Related Decisions

- ADR-002: Pattern Registry Design (replaced static knowledge fragments)
- ADR-003: Unified Steps Directory (simplified workflow structure)
