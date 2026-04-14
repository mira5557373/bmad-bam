# BAM Market Analysis Guide

**When to load:** During CIS innovation phases, market research activities, competitive analysis,
or when user mentions market trends, disruption, or futures planning.

**Integrates with:** CIS agents (Market, Disruption, Futures), Analyst, PM

---

## Core Concepts

### Multi-Tenant SaaS Market Dynamics

Market analysis for multi-tenant SaaS platforms requires understanding:

1. **Tenant Segmentation**: How different customer segments (SMB, Mid-Market, Enterprise) value features differently
2. **Platform Effects**: Network effects and ecosystem dynamics in multi-tenant environments
3. **Pricing Elasticity**: How tenant tiers respond to pricing changes
4. **Feature Adoption**: Patterns in feature uptake across tenant cohorts

### Competitive Intelligence Framework

| Analysis Type | Focus | BAM Application |
|---------------|-------|-----------------|
| Feature Comparison | Capability gaps | Inform module priority |
| Pricing Analysis | Tier structure | Validate tier model |
| Architecture Analysis | Technical approach | Inform isolation decisions |
| Go-to-Market | Channel strategy | Inform tenant onboarding |

---

## Application Guidelines

When conducting market analysis for multi-tenant SaaS:

1. **Segment by tenant tier**: Free, Pro, Enterprise have different competitive landscapes
2. **Consider isolation implications**: Market positioning affects isolation requirements
3. **Analyze platform ecosystems**: Integration partnerships matter for multi-tenant platforms
4. **Track AI/agentic trends**: The agentic AI SaaS space is rapidly evolving

### Market Sizing for Multi-Tenant Platforms

When estimating market opportunity for multi-tenant SaaS:

- **TAM (Total Addressable Market)**: All potential customers across all tiers
- **SAM (Serviceable Addressable Market)**: Customers your platform can actually serve given isolation constraints
- **SOM (Serviceable Obtainable Market)**: Realistic capture rate considering competitive dynamics

Key considerations specific to multi-tenant architecture:
- Enterprise tier customers often require higher isolation, limiting pool size
- SMB customers drive volume but require efficient RLS implementation
- Platform stickiness increases with integration depth

### Competitive Positioning Matrix

| Position | Tenant Model | AI Capabilities | Target Segment |
|----------|--------------|-----------------|----------------|
| Cost Leader | Shared RLS | Basic agents | SMB, Startups |
| Differentiator | Schema isolation | Advanced agents | Mid-Market |
| Niche | Database isolation | Custom AI | Enterprise, Regulated |

When analyzing competitors, evaluate their isolation approach and AI sophistication to identify positioning opportunities

---

## Decision Framework

| Market Signal | Architectural Impact | Module Affected |
|---------------|---------------------|-----------------|
| Enterprise demand | Higher isolation | Tenant Model |
| SMB price sensitivity | Efficient RLS | Tenant Model |
| AI feature requests | Runtime expansion | Agent Runtime |
| Integration needs | Facade contracts | Integration |
| Compliance requirements | Data residency | Compliance |

---

## Related Workflows

- `bmad-bam-create-master-architecture` - Market position informs architecture
- `bmad-bam-tenant-model-isolation` - Competitive isolation requirements
- `bmad-bam-agent-runtime-architecture` - AI capability differentiation

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Market patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `market-*`
- **Competitive patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `competitive-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "multi-tenant SaaS market trends {date}"
- Search: "agentic AI platform competitive landscape {date}"
- Search: "B2B SaaS pricing models {date}"
