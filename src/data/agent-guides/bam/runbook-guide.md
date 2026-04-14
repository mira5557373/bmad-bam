# BAM Runbook Creation Guide

**When to load:** During Phase 6 (Operations) when creating operational runbooks,
or when user mentions runbooks, incident procedures, or operations documentation.

**Integrates with:** SRE, DevOps Engineer, Platform Architect, Security Operations

---

## Core Concepts

### Runbook Categories

Multi-tenant AI platforms require runbooks across categories:

1. **Incident Response** - Outages, degradation, security incidents
2. **AI Operations** - Model deployment, kill switch, LLM provider issues
3. **Routine Operations** - Deployment, scaling, maintenance
4. **Tenant Operations** - Onboarding, offboarding, tier changes
5. **Security Operations** - Access review, key rotation, patching

### Runbook Structure

Every runbook should follow this structure:

| Section | Purpose |
|---------|---------|
| Overview | What the runbook covers |
| Severity Levels | Criteria and response times |
| Detection | How to identify the issue |
| Triage | Initial assessment steps |
| Resolution | Step-by-step fixes |
| Escalation | When and how to escalate |
| Communication | Who to notify |
| Post-Incident | Follow-up actions |

### AI-Specific Runbooks

Critical runbooks for AI operations:

| Runbook | Purpose | Priority |
|---------|---------|----------|
| Kill Switch | Emergency AI shutdown | Critical |
| Model Rollback | Revert to previous version | Critical |
| LLM Provider Failover | Switch providers | High |
| Budget Enforcement | Cost limit response | High |
| Guardrail Violation | Safety incident | Critical |

## Application Guidelines

When creating runbooks:

1. **Start with critical paths** - Incident response and kill switch first
2. **Make them executable** - Step-by-step, no ambiguity
3. **Test regularly** - Untested runbooks fail when needed
4. **Keep accessible** - Available to on-call, searchable

## Decision Framework

| Situation | Recommendation | Rationale |
|-----------|---------------|-----------|
| New service | Full runbook suite | No operational history |
| Major change | Update affected runbooks | Procedures may change |
| Post-incident | Create/update runbook | Learn from experience |
| Quarterly | Review all runbooks | Prevent drift |

## Related Workflows

- `bmad-bam-runbook-creation` - Create operational runbooks
- `bmad-bam-tenant-incident-response` - Incident handling design
- `bmad-bam-production-readiness` - Operational readiness

## Related Patterns

Load decision criteria and `web_queries` column from pattern registry:

- **Operations patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `operations`
- **Observability patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `observability`

Use the `web_queries` column from pattern registry for current best practices.

### Web Research

Use these queries for current best practices:

- Search: "SRE runbook best practices {date}"
- Search: "incident response runbook template {date}"
- Search: "AI operations runbook {date}"
- Search: "multi-tenant SaaS operational procedures {date}"
