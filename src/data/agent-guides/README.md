# BAM Agent Guides

## Overview

166+ agent guides providing context injection for multi-tenant AI SaaS development.

## Guide Structure

Each guide includes:
- `**When to load:**` section specifying activation triggers
- Domain-specific context and patterns
- Decision framework tables
- Application guidelines
- Related workflows and web research queries

## Guide Categories

### Role Guides (18)
- `analyst-guide.md` - Business analysis for SaaS
- `architect-guide.md` - Architecture patterns
- `dev-guide.md` - Development practices
- `devops-guide.md` - DevOps patterns
- `pm-guide.md` - Project management
- `po-guide.md` - Product ownership
- `qa-guide.md` - Quality assurance
- `security-guide.md` - Security patterns
- `sm-guide.md` - Scrum master guide
- `tech-writer-guide.md` - Technical writing
- `ux-guide.md` - UX patterns
- `storyteller-guide.md` - SaaS storytelling
- `tenant-admin-guide.md` - **NEW** Tenant administrator self-service
- `support-engineer-guide.md` - **NEW** Support engineer multi-tenant debugging
- `sre-guide.md` - **NEW** Site reliability engineering for multi-tenant
- `customer-success-guide.md` - **NEW** Customer success and tenant health
- `compliance-officer-guide.md` - **NEW** Compliance and data protection
- `platform-operator-guide.md` - **NEW** Day-2 platform operations

### Persona Guides (3)
- `atlas-guide.md` - Foundation architect persona
- `nova-guide.md` - Innovation architect persona
- `kai-guide.md` - Integration architect persona

### Domain Guides (9)
- `multi-tenant-context.md` - Multi-tenancy patterns
- `tenant-isolation.md` - Tenant isolation techniques
- `tenant-testing.md` - Tenant testing patterns
- `ai-runtime.md` - AI runtime patterns
- `module-architecture.md` - Module architecture
- `platform-architecture.md` - Platform architecture
- `integration-patterns.md` - Integration patterns
- `rls-documentation.md` - RLS documentation
- `saas-lifecycle.md` - SaaS lifecycle

### Integration Guides (3)
- `saga-guide.md` - Saga orchestration
- `freya-guide.md` - Freya integration
- `tea-guide.md` - Test engineering

### Innovation Guides (7)
- `innovation-guide.md` - Innovation patterns
- `saas-ideation.md` - SaaS ideation
- `saas-design-thinking.md` - Design thinking
- `saas-innovation.md` - SaaS innovation
- `saas-narrative.md` - SaaS narrative
- `saas-presentation.md` - Presentation patterns
- `saas-problem-solving.md` - Problem solving

### UX Guide (1)
- `tier-ux.md` - Tier-based UX patterns

### Pattern Guides (100+)
Comprehensive pattern guides covering:
- Tenant lifecycle patterns (onboarding, offboarding, migration)
- AI/ML patterns (RAG, embeddings, model management, prompt engineering)
- Security patterns (encryption, audit, compliance, incident response)
- Integration patterns (API, webhooks, MCP, event-driven)
- Operations patterns (observability, disaster recovery, caching)
- Data patterns (governance, retention, archival, sovereignty)

## Directory Structure

```
src/data/agent-guides/
  bam/
    analyst-guide.md
    architect-guide.md
    atlas-guide.md
    ...
```

## Usage

Extensions reference guides in prompts:
```yaml
prompts:
  command:
    - |
      Read and internalize the BAM guide:
      `{project-root}/_bmad/bam/data/agent-guides/bam/{guide}.md`
```

## Guide Loading Pattern

Guides are loaded dynamically based on:
1. Agent extension being used
2. Workflow step being executed
3. User command invoked

The `**When to load:**` section in each guide specifies the exact triggers.

## Example Guide Structure

```markdown
# Guide Name

**When to load:** Trigger conditions

## Context
Domain-specific background information.

## Patterns
Key patterns and practices.

## Application
How to apply the patterns.

## References
Related guides and knowledge fragments.
```
