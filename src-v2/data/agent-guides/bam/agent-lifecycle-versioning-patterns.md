# BAM Agent Lifecycle Versioning Patterns Guide

**When to load:** During agent deployment planning, version management design, rollback strategy, or when implementing agent lifecycle management for multi-tenant SaaS platforms.

**Integrates with:** Winston (Architect), Nova (AI Runtime), DevOps teams, ml-bam extension.

---

## Core Concepts

### Agent Lifecycle Stages

| Stage | Description | Multi-Tenant Consideration |
|-------|-------------|---------------------------|
| Development | Building and testing | Per-tenant test environments |
| Staging | Pre-production validation | Tenant-representative data |
| Canary | Limited production rollout | Select tenants first |
| Production | Full deployment | All tenants |
| Deprecated | Sunset in progress | Migration support |
| Retired | Fully removed | Archive for compliance |

### Agent Version Components

```
Agent Version Identifier: agent-name@v2.3.1-rc1
                          │        │ │ │  │
                          │        │ │ │  └── Pre-release tag
                          │        │ │ └───── Patch (bug fixes)
                          │        │ └─────── Minor (new features)
                          │        └───────── Major (breaking changes)
                          └────────────────── Agent identifier
```

### Version Management Matrix

| Component | Versioned Separately | Deployment Impact |
|-----------|---------------------|-------------------|
| Agent code | Yes | Code rollout |
| Prompt templates | Yes | Hot-swappable |
| LLM model version | Yes | Model routing |
| Tool definitions | Yes | API contracts |
| Evaluation datasets | Yes | Quality gates |

### Multi-Tenant Version Strategies

| Strategy | Description | Use Case |
|----------|-------------|----------|
| Global Version | Same version for all tenants | Standard deployments |
| Tenant Pinning | Tenant locked to specific version | Enterprise stability |
| Tier-Based | Different versions per tier | Feature differentiation |
| Opt-In Beta | Tenants choose to test new versions | Early adopter programs |

### Agent Deployment Flow

```
┌─────────────────────────────────────────────────┐
│           Agent Deployment Pipeline              │
│                                                  │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐  │
│  │  Build   │───►│  Test    │───►│  Stage   │  │
│  │ (CI/CD)  │    │ (Evals)  │    │(Internal)│  │
│  └──────────┘    └──────────┘    └────┬─────┘  │
│                                       │         │
│                              ┌────────▼────────┐│
│                              │  Canary Deploy  ││
│                              │  (5% tenants)   ││
│                              └────────┬────────┘│
│                                       │         │
│                              ┌────────▼────────┐│
│                              │  Full Rollout   ││
│                              │ (All tenants)   ││
│                              └─────────────────┘│
└─────────────────────────────────────────────────┘
```

### Rollback Strategies

| Strategy | Speed | Data Impact | Use Case |
|----------|-------|-------------|----------|
| Instant Rollback | < 1 min | None | Feature flags |
| Container Rollback | < 5 min | None | Kubernetes |
| Database Rollback | 15-30 min | Risk | Schema changes |
| Full State Restore | 1+ hour | High risk | Disaster recovery |

### Version Compatibility Matrix

| Version Pair | Compatible? | Action Required |
|--------------|-------------|-----------------|
| v2.x → v2.y | Yes | Direct upgrade |
| v1.x → v2.x | With migration | Run migration script |
| v2.x → v1.x | No | Restore from backup |

---

## Application Guidelines

When implementing agent lifecycle versioning in a multi-tenant context:

1. **Version all components** - Agent code, prompts, models, and tools
2. **Implement canary deployments** - Test on subset of tenants first
3. **Support tenant version pinning** - Enterprise needs stability guarantees
4. **Maintain backward compatibility** - Tool APIs should support N-1 versions
5. **Track version per tenant** - Know which version each tenant runs
6. **Automate rollback** - Quick recovery when issues detected

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Version prompts separately? | Yes, enables hot-swapping | Faster iteration without code deploy |
| How long to support old versions? | 6 months minimum | Enterprise planning cycles |
| When to force upgrade? | Security issues only | Minimize tenant disruption |
| Canary percentage? | 5-10% of tenants | Balance feedback with risk |
| Version storage? | Git + artifact registry | Reproducibility + rollback |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Agent patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `agent-*`
- **Deployment patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `deployment-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "AI agent versioning patterns {date}"
- Search: "LLM deployment canary strategies {date}"
- Search: "prompt versioning best practices {date}"

---

## Related Workflows

- `bmad-bam-agent-runtime-architecture` - Design agent runtime
- `bmad-bam-model-deployment-pipeline` - Deploy AI models
- `bmad-bam-cicd-pipeline-design` - Set up CI/CD
