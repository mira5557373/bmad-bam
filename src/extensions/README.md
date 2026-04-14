# BAM Agent Extensions

## Overview

BAM is a pure extension module with 19 extensions that add multi-tenant capabilities to existing BMAD agents.

## Extension Pattern

All extensions follow the WDS agent-guides pattern:
- NO `memories:` field (context via agent-guides)
- `menu:` items with trigger, action, description
- `prompts:` referencing agent-guides for context injection

## Extensions List

### BMM Extensions (10)
- `analyst-bam.yaml` - Business analysis for multi-tenant SaaS
- `architect-bam.yaml` - Architecture with Atlas/Nova/Kai personas
- `dev-bam.yaml` - Development patterns for tenant isolation
- `devops-bam.yaml` - Multi-tenant DevOps practices
- `pm-bam.yaml` - Project management for SaaS
- `po-bam.yaml` - Product ownership for multi-tenant
- `security-bam.yaml` - Security patterns and compliance
- `tech-writer-bam.yaml` - Technical documentation
- `ux-bam.yaml` - UX patterns for tenant customization
- `master-architect-bam.yaml` - Master architecture oversight

### TEA Extension (1)
- `tea-bam.yaml` - Test engineering for tenant isolation

### WDS Extensions (2)
- `wds-saga-bam.yaml` - Saga orchestration patterns
- `wds-freya-bam.yaml` - Freya integration patterns

### CIS Extensions (6)
- `cis-brainstorming-bam.yaml` - SaaS brainstorming
- `cis-design-thinking-bam.yaml` - Design thinking for SaaS
- `cis-innovation-bam.yaml` - Innovation patterns
- `cis-presentation-bam.yaml` - SaaS presentation design
- `cis-problem-solver-bam.yaml` - Problem solving for multi-tenant
- `cis-storyteller-bam.yaml` - SaaS storytelling

## Architect Personas

Atlas, Nova, and Kai are conceptual personas consolidated into `architect-bam.yaml`, not standalone agents.

### Atlas Persona
Foundation-focused architect emphasizing:
- Master architecture integrity
- Quality gate enforcement
- Cross-module convergence

### Nova Persona
Innovation-focused architect emphasizing:
- AI runtime patterns
- Agent orchestration
- Emerging patterns

### Kai Persona
Integration-focused architect emphasizing:
- Facade contract design
- Cross-module stories
- Event-driven patterns

## Extension Structure

```yaml
name: extension-name
extends: base-agent-name

menu:
  - trigger: "/command"
    action: "Action description"
    description: "Help text"

prompts:
  command:
    - |
      Read and internalize the BAM guide:
      `{project-root}/_bmad/bam/data/agent-guides/bam/{guide}.md`
```

## Usage

Extensions are loaded by the BMAD framework when the base agent is invoked. The extension adds multi-tenant specific menu items and prompts while preserving all base agent capabilities.
