# Analyst Guide - BAM Extension

**When to load:** During Phase 2 (Discovery) when analyzing multi-tenant SaaS requirements, or when user mentions tenants, personas, or bounded contexts.
**Integrates with:** Analyst (bmad-agent-analyst), requirement analysis, stakeholder discovery

This guide provides BAM-specific context for analysts working on multi-tenant agentic AI platforms.

## Core Concepts

### Tenant Requirements

Tenant requirements capture needs that vary by tenant tier, isolation level, and compliance context. Unlike single-tenant systems, requirements must specify which tiers are affected, what isolation constraints apply, and how the requirement interacts with the multi-tenant architecture. Requirements that seem simple may have complex multi-tenant implications.

### Isolation Analysis

Isolation analysis identifies data, resource, and configuration boundaries that must be maintained between tenants. Every requirement must be evaluated for isolation impact: does it require cross-tenant data access, shared resources, or tenant-specific configuration? Isolation failures create security vulnerabilities and compliance violations.

### Bounded Context Mapping

Bounded context mapping in multi-tenant systems identifies how domain boundaries align with module boundaries and tenant isolation. Each bounded context should have clear tenant awareness, and cross-context communication must propagate tenant context correctly. Mapping helps identify where isolation enforcement is required.

---

## Role Context

As an analyst on a BAM project, you focus on:
- Understanding tenant requirements and constraints
- Analyzing multi-tenant patterns and their implications
- Documenting requirements with tenant isolation in mind
- Identifying cross-cutting concerns across tenant boundaries

## Tenant Persona Discovery Framework

Understanding tenant personas is critical for multi-tenant SaaS platforms. Use this systematic approach to discover and document tenant personas across all tiers.

### Persona Discovery Steps

1. **Identify Tenant Tiers** - Map your platform's tier structure (Free, Pro, Enterprise) and understand the business model behind each tier
2. **Conduct Stakeholder Interviews** - Interview representatives from each tier to understand their unique needs, pain points, and workflows
3. **Analyze Usage Patterns** - Review analytics data to identify behavioral differences between tenant segments
4. **Document Persona Cards** - Create detailed persona cards capturing goals, frustrations, technical context, and success metrics
5. **Validate with Tenant Advisory Board** - Review personas with actual tenants to ensure accuracy and completeness
6. **Map Personas to Features** - Connect each persona to the features and capabilities they require

### Persona Template

For each tenant persona, document:
- **Name and Tier:** Descriptive name and associated tier
- **Role:** Job title and responsibilities within their organization
- **Goals:** What they want to achieve with the platform
- **Pain Points:** Current frustrations or challenges
- **Technical Context:** Their technical sophistication and infrastructure
- **Success Metrics:** How they measure value from the platform

## Decision Framework

Use this matrix when making requirement analysis decisions in multi-tenant contexts:

| Decision Area | Free Tier Approach | Pro Tier Approach | Enterprise Approach |
|--------------|-------------------|-------------------|---------------------|
| Data Isolation | Shared tables with RLS | Schema-based or RLS | Dedicated database option |
| Feature Scope | Core features only | Extended features | Full platform + custom |
| Support Level | Self-service docs | Email + chat support | Dedicated support + SLA |
| Customization | None | Configuration only | Custom development |
| Integration | Public APIs only | Webhooks + APIs | Custom integrations |
| Compliance | Standard security | SOC2 ready | Full compliance suite |

## Actionable Guidance

### Conducting Tenant Requirement Analysis

1. **Gather Context** - Collect existing documentation, support tickets, and feature requests from tenants across all tiers
2. **Segment by Tier** - Organize requirements by tenant tier to understand tier-specific needs
3. **Identify Patterns** - Look for common themes that span multiple tiers versus tier-specific requirements
4. **Assess Isolation Impact** - For each requirement, determine if it affects tenant isolation or data boundaries
5. **Map to Bounded Contexts** - Assign requirements to appropriate bounded contexts within the modular monolith
6. **Document Dependencies** - Identify cross-module dependencies and integration requirements
7. **Prioritize by Value** - Rank requirements by business value considering tenant tier revenue impact
8. **Validate Feasibility** - Review with architects to confirm technical feasibility within isolation constraints

### Documenting Multi-Tenant Requirements

1. **Use Structured Templates** - Always include tenant context fields in requirement documents
2. **Specify Tier Applicability** - Clearly state which tiers each requirement applies to
3. **Define Isolation Requirements** - Explicitly document data isolation and access control needs
4. **Include Compliance Context** - Note any regulatory or compliance implications
5. **Add Test Criteria** - Define acceptance criteria that include multi-tenant verification

## Key Considerations

### Tenant-Aware Requirements
- Always capture which tenant tiers a requirement applies to
- Document isolation requirements explicitly
- Consider data residency and compliance needs per tenant

### Analysis Patterns
- Use structured requirement templates that include tenant context
- Map requirements to bounded contexts within the modular monolith
- Identify shared vs tenant-specific functionality

## SaaS-Specific Considerations

When analyzing requirements for multi-tenant SaaS platforms, keep these factors in mind:

### Scalability Planning
- Requirements should specify expected scale per tenant tier
- Consider how features will perform at 10x, 100x current tenant count
- Document resource consumption expectations per feature

### Billing Integration
- Identify which features are metered and billable
- Document usage events that trigger billing
- Consider feature gating requirements per tier

### Tenant Lifecycle
- Map requirements to tenant lifecycle stages (onboarding, active, churning, offboarding)
- Consider how features support tenant success metrics
- Document data retention requirements across lifecycle

### Compliance and Security
- Identify compliance requirements (SOC2, HIPAA, GDPR) per tenant segment
- Document audit trail requirements for tenant actions
- Consider data residency requirements for international tenants

## Application Guidelines

When gathering multi-tenant requirements:
1. Always ask which tenant tiers the requirement applies to
2. Document isolation requirements explicitly in every requirement
3. Capture compliance context including regulatory and data residency needs
4. Identify shared vs tenant-specific functionality clearly
5. Note cross-tenant scenarios that require special handling

When analyzing requirements for SaaS platforms:
1. Segment requirements by tier before assessing impact
2. Map each requirement to bounded contexts within the modular monolith
3. Identify metering and billing implications for billable actions
4. Consider tenant lifecycle stage relevance for each requirement
5. Validate feasibility with architects before committing to isolation constraints

---

## Outputs

| Deliverable | Format | Template |
|-------------|--------|----------|
| Tenant Persona Cards | Markdown | `persona-template.md` |
| Requirements Document | Markdown | `requirements-template.md` |
| Tier Feature Matrix | Table | N/A |
| Compliance Requirements | Markdown | N/A |

## Related Workflows

- `requirement-ingestion` - Ingest and structure tenant requirements from various sources
- `tenant-requirements-analysis` - Analyze tenant-specific requirements across tiers

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Requirement patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `requirement-*`
- **Tenant patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "multi-tenant SaaS requirements analysis patterns {date}"
- Search: "tenant persona discovery frameworks B2B SaaS {date}"
- Search: "bounded context mapping multi-tenant architecture {date}"
