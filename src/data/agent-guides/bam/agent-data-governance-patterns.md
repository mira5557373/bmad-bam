# BAM Agent Data Governance Patterns Guide

**When to load:** During AI agent data governance design, agent access control, training data management, or when implementing data governance for AI agents in multi-tenant SaaS platforms.

**Integrates with:** Winston (Architect), Nova (AI Runtime), Data governance teams, ml-bam extension.

---

## Core Concepts

### AI Agent Data Access Tiers

| Tier | Data Access | Example Use |
|------|-------------|-------------|
| Tenant-Scoped | Only tenant's data | Customer support agent |
| Cross-Tenant Read | Aggregated/anonymized | Analytics agent |
| Platform-Wide | Administrative data | System monitoring agent |
| External | Third-party APIs | Integration agent |

### Agent Data Governance Framework

```
┌─────────────────────────────────────────────────┐
│          Agent Data Governance                   │
│                                                  │
│  ┌──────────────────────────────────────────┐   │
│  │           Policy Layer                    │   │
│  │  - Data classification                    │   │
│  │  - Access policies per agent type         │   │
│  │  - Retention rules                        │   │
│  └────────────────────┬─────────────────────┘   │
│                       │                          │
│  ┌────────────────────▼─────────────────────┐   │
│  │         Enforcement Layer                 │   │
│  │  - Runtime access control                 │   │
│  │  - Query filtering                        │   │
│  │  - Output sanitization                    │   │
│  └────────────────────┬─────────────────────┘   │
│                       │                          │
│  ┌────────────────────▼─────────────────────┐   │
│  │          Audit Layer                      │   │
│  │  - Data access logging                    │   │
│  │  - Lineage tracking                       │   │
│  │  - Compliance reporting                   │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

### Data Classification for Agents

| Classification | Description | Agent Access |
|----------------|-------------|--------------|
| Public | Non-sensitive, shareable | All agents |
| Internal | Business confidential | Authorized agents only |
| Confidential | PII, financial data | Tenant-scoped agents only |
| Restricted | Highly sensitive | Human approval required |

### Training Data Governance

| Aspect | Consideration | Multi-Tenant Approach |
|--------|---------------|----------------------|
| Consent | Explicit opt-in for training | Per-tenant training consent |
| Separation | Training vs inference data | Tenant data never in shared training |
| Quality | Training data standards | Quality gates before training |
| Lineage | Data provenance tracking | Full audit trail |
| Expiration | Training data lifecycle | Automatic purge after use |

### Agent Output Governance

| Control | Purpose | Implementation |
|---------|---------|----------------|
| PII Filtering | Remove personal data from outputs | Pattern matching + ML detection |
| Tenant Boundary | Prevent cross-tenant leakage | Output scope validation |
| Confidence Thresholds | Flag uncertain responses | Configurable per agent |
| Human-in-Loop | Require approval for actions | Risk-based workflow |

### Data Lineage for AI Agents

| Element | Tracked Information | Retention |
|---------|---------------------|-----------|
| Input | Source, timestamp, tenant | 90 days |
| Processing | Agent ID, model version | 90 days |
| Output | Generated content, recipients | 90 days |
| Decisions | Logic path, confidence score | 1 year |

---

## Application Guidelines

When implementing agent data governance in a multi-tenant context:

1. **Default to tenant-scoped access** - Agents should only see their tenant's data
2. **Implement data access auditing** - Log all agent data access with tenant context
3. **Require explicit consent for training** - Tenants must opt-in to AI training use
4. **Filter outputs for PII** - Prevent accidental PII disclosure in agent responses
5. **Track data lineage end-to-end** - Know where data came from and where it went
6. **Enable tenant-specific agent policies** - Allow custom governance rules per tenant

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Can agents access cross-tenant data? | Only aggregated/anonymized | Prevent data leakage |
| Should training use tenant data? | Only with explicit consent | GDPR/privacy compliance |
| How to handle PII in prompts? | Filter before processing | Minimize PII exposure |
| Who approves agent data access? | Tenant admin + platform review | Shared responsibility |
| How long to retain agent logs? | 90 days operational, 1 year compliance | Balance utility with storage |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **AI governance patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `ai-governance-*`
- **Data classification:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `data-classification-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "AI agent data governance multi-tenant {date}"
- Search: "LLM data access control patterns {date}"
- Search: "AI training data governance SaaS {date}"

---

## Related Workflows

- `bmad-bam-agent-runtime-architecture` - Design agent runtime
- `bmad-bam-ai-security` - Secure AI agents
- `bmad-bam-compliance-design` - Compliance integration
