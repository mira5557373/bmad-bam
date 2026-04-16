# BAM Workflow Ownership Guide

**When to load:** During BAM workflow planning, agent assignment decisions, workflow customization, or when understanding which BMAD agents own which BAM workflows.

**Integrates with:** All BMAD agents with BAM extensions active.

---

## Core Concepts

### Agent-Workflow Ownership Matrix

| Agent | Role | Primary Workflows | Extension |
|-------|------|-------------------|-----------|
| Winston (Architect) | Platform architecture | create-master-architecture, module-boundary-design, tenant-model-isolation | architect-bam |
| James (Dev) | Implementation | convergence-verification, ai-agent-debug, facade-mismatch-recovery | dev-bam |
| Mary (Analyst) | Requirements | requirement-ingestion, triage-module-complexity | analyst-bam |
| Chad (PM) | Product management | create-module-epics, cross-module-story | pm-bam |
| Emma (UX) | User experience | tier-ux-design, provisioning-ui-design | ux-bam |

### Workflow Ownership Categories

```
┌─────────────────────────────────────────────────┐
│          Workflow Ownership Model                │
│                                                  │
│  ┌──────────────────────────────────────────┐   │
│  │       Architecture Workflows              │   │
│  │  Owner: Winston (Architect)               │   │
│  │  - Master architecture                    │   │
│  │  - Module design                          │   │
│  │  - Tenant isolation                       │   │
│  └──────────────────────────────────────────┘   │
│                                                  │
│  ┌──────────────────────────────────────────┐   │
│  │       Implementation Workflows            │   │
│  │  Owner: James (Dev)                       │   │
│  │  - Convergence verification               │   │
│  │  - Debug and recovery                     │   │
│  │  - CI/CD pipeline                         │   │
│  └──────────────────────────────────────────┘   │
│                                                  │
│  ┌──────────────────────────────────────────┐   │
│  │       Quality Workflows                   │   │
│  │  Owner: TEA (Test Engineering)            │   │
│  │  - Tenant safety verification             │   │
│  │  - Agent safety verification              │   │
│  │  - Test coverage gates                    │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

### Phase-Based Ownership

| Phase | Primary Owner | Supporting Agents |
|-------|---------------|-------------------|
| Discovery | Mary (Analyst) | Saga (WDS) |
| Planning | Chad (PM) | Mary, Winston |
| Solutioning | Winston (Architect) | James, Emma |
| Implementation | James (Dev) | Winston, TEA |
| Quality | TEA | James, Winston |
| Operations | SRE (via devops-bam) | James, Winston |

### Handoff Points

| From | To | Handoff Artifact | Quality Gate |
|------|-----|------------------|--------------|
| Mary | Winston | Requirements doc | QG-D1 |
| Winston | James | Architecture doc | QG-F1 |
| James | TEA | Implementation | QG-I1 |
| TEA | Operations | Verified system | QG-P1 |

### Extension Ownership

| Extension | Primary Agent | Backup Agent |
|-----------|---------------|--------------|
| architect-bam | Winston | Master Architect |
| dev-bam | James | - |
| analyst-bam | Mary | Saga |
| pm-bam | Chad | Mary |
| ux-bam | Emma | Freya |
| tea-bam | TEA | James |
| compliance-bam | Winston | Compliance team |
| security-bam | Winston | Security team |

---

## Application Guidelines

When determining workflow ownership in BAM:

1. **Follow phase ownership** - Agent owning the phase owns related workflows
2. **Respect handoffs** - Quality gates define transition points
3. **Enable collaboration** - Multiple agents can contribute to workflows
4. **Clear accountability** - Single owner per workflow for decisions
5. **Document exceptions** - When ownership deviates from standard
6. **Support customization** - Teams can reassign based on expertise

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Who owns cross-phase workflows? | Primary phase owner | Clear accountability |
| Can multiple agents run a workflow? | Yes, owner approves output | Flexibility with governance |
| Who handles conflicts? | Phase owner escalates to PM | PM owns prioritization |
| Custom workflow ownership? | Documented in CLAUDE.md | Team-specific needs |
| Who owns validation workflows? | Quality gate owner (usually TEA) | Separation of concerns |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Workflow patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `workflow-*`
- **Phase patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `phase-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "BMAD method agent responsibilities {date}"
- Search: "workflow ownership patterns {date}"
- Search: "RACI matrix software development {date}"

---

## Related Workflows

- `requirement-ingestion` - Discovery phase start
- `create-master-architecture` - Solutioning phase start
- `bmad-bam-convergence-verification` - Implementation phase gate
