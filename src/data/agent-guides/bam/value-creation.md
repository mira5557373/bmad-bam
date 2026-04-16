# BAM Value Creation Guide

**When to load:** During value proposition analysis, ROI discussions, pricing strategy,
or when user mentions business value, customer outcomes, or monetization.

**Integrates with:** CIS Value agent, PM, Analyst, Business stakeholders

---

## Core Concepts

### Multi-Tenant SaaS Value Framework

Value creation in multi-tenant SaaS requires understanding value across multiple dimensions:

1. **Customer Value**: Benefits delivered to each tenant (ROI, productivity, outcomes)
2. **Platform Value**: Network effects and ecosystem benefits
3. **Operational Value**: Efficiency gains from multi-tenancy
4. **Data Value**: Insights derived from aggregate tenant data

### Value Creation Matrix

| Value Type | Tenant Tier Impact | Measurement |
|------------|-------------------|-------------|
| Time Savings | Scales with usage | Hours saved per month |
| Cost Reduction | Higher for Enterprise | TCO comparison |
| Revenue Growth | AI-driven insights | Attribution models |
| Risk Mitigation | Compliance features | Incident reduction |

---

## Application Guidelines

When analyzing value creation for multi-tenant SaaS:

1. **Segment value by tier**: Different tiers have different value drivers
2. **Quantify where possible**: Use metrics and benchmarks
3. **Consider network effects**: Platform value grows with tenant count
4. **Balance extraction vs creation**: Sustainable pricing requires ongoing value delivery

### Value Proposition by Tenant Tier

| Tier | Primary Value Driver | Secondary Value | Pricing Anchor |
|------|---------------------|-----------------|----------------|
| Free | Product trial, education | Community access | Conversion rate |
| Pro | Productivity gains | Feature access | Per-seat pricing |
| Enterprise | Strategic outcomes | Custom integration | Value-based pricing |

### AI-Driven Value Creation

Agentic AI capabilities create unique value opportunities:

- **Automation value**: Time savings from agent-driven workflows
- **Intelligence value**: Insights from AI analysis unavailable otherwise
- **Scale value**: AI enables handling more work without proportional headcount
- **Quality value**: AI consistency reduces errors and rework

---

## Decision Framework

| Business Goal | Value Strategy | Module Affected |
|---------------|---------------|-----------------|
| Acquisition | Free tier value | Tenant Model |
| Conversion | Feature gating | Tier Management |
| Expansion | Usage-based value | Metering |
| Retention | Integration depth | Facade Contracts |

### Value Metrics by Module

| Module | Value Metric | Benchmark |
|--------|--------------|-----------|
| Agent Runtime | Tasks automated/month | 100+ |
| Tenant Model | Isolation incidents | <1/quarter |
| Integration | API calls processed | 10K+/tenant |
| Compliance | Audit time reduction | 50%+ |

---

## Related Workflows

- `bmad-bam-usage-metering-design` - Track value delivery
- `bmad-bam-tenant-tier-migration` - Move tenants to appropriate value tier
- `create-master-architecture` - Build value into architecture

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Value patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `value-*`
- **Pricing patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `pricing-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "SaaS value creation frameworks {date}"
- Search: "B2B SaaS pricing strategies {date}"
- Search: "multi-tenant SaaS ROI measurement {date}"
