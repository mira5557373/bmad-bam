# BAM Documentation Patterns Guide

**When to load:** During Phase 3-4 (Solutioning/Implementation) when designing API documentation, developer portals, AI system documentation, technical writing workflows, or when implementing documentation for multi-tenant SaaS platforms.

**Integrates with:** Tech Writer agent, Architect (Winston/Atlas/Nova personas), Dev agent (James), UX Designer (Emma), Compliance/Legal teams

---

## Core Concepts

### Multi-Tenant Documentation Architecture

Documentation for multi-tenant platforms requires careful consideration of audience segmentation, tier-based content visibility, and tenant context propagation throughout all artifacts.

| Documentation Layer | Single-Tenant Approach | Multi-Tenant Adaptation |
|---------------------|------------------------|-------------------------|
| API Reference | Single endpoint set | Tier-gated endpoints with tenant context |
| Getting Started | Generic onboarding | Tenant-specific quick starts per tier |
| Technical Guides | Uniform content | Tier-aware feature documentation |
| Compliance Docs | Standard policies | Per-tenant regulatory requirements |
| Admin Documentation | Single admin view | Role-based access per tenant tier |

### Documentation Audience Matrix

| Audience | Documentation Needs | Tier Visibility |
|----------|---------------------|-----------------|
| End Users | Feature guides, tutorials | Tier-appropriate content |
| Developers | API reference, SDKs, code samples | Based on API tier |
| Tenant Admins | Configuration, user management | Per-tenant admin docs |
| Platform Operators | Operations runbooks, monitoring | Internal only |
| Compliance Officers | Audit trails, certifications | Enterprise tier |

### Documentation Standards

| Standard | Use Case | Multi-Tenant Benefits |
|----------|----------|----------------------|
| OpenAPI 3.x | REST API specification | SDK generation, tier extensions |
| AsyncAPI | Event-driven APIs | Webhook, streaming documentation |
| GraphQL SDL | GraphQL APIs | Schema-first with tenant context |
| gRPC protobuf | Internal services | Strong typing, code generation |
| Model Cards | AI systems | Per-tenant model documentation |

---

## BAM Conventions

### Documentation Priority Matrix

| Documentation Type | Audience | Priority | Update Frequency |
|-------------------|----------|----------|------------------|
| API Reference | Developers | Critical | Every API change |
| Tenant Admin Guide | Admins | Critical | Per feature release |
| Getting Started | New users | High | Quarterly |
| Integration Guide | Partners | High | Per integration change |
| Security Documentation | Compliance | High | Per security change |
| AI Model Cards | Regulators | High | Per model update |
| Troubleshooting Guide | Support | Medium | Continuous |
| Best Practices | Power users | Medium | Quarterly |
| Release Notes | All users | Medium | Per release |

### Tier-Based Content Strategy

| Content Decision | Free Tier | Pro Tier | Enterprise Tier |
|-----------------|-----------|----------|-----------------|
| Detail Level | Essential | Comprehensive | Exhaustive + custom |
| Support References | Community | Chat/email links | Dedicated contact |
| Examples | Basic | Advanced | Industry-specific |
| Compliance Content | Minimal | Standard | Full compliance docs |
| API Docs | Public only | All standard | + private endpoints |
| AI Documentation | Summary | Full model cards | Custom assessments |

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Generate or hand-write docs? | Generate from OpenAPI + manual review | Keeps docs accurate with human quality |
| Public or authenticated docs? | Hybrid - public intro, auth for details | Balance discoverability with security |
| How to handle tier-gated content? | Show all, mark tier requirements | Transparency drives upgrades |
| Documentation versioning? | Match API version | Reduce confusion |
| Code sample languages? | cURL, Python, JavaScript, Go | Cover common use cases |
| AI system documentation detail? | Full for high-risk, summary for minimal | EU AI Act compliance |
| Build or buy portal? | Buy + customize | Portal is not core differentiator |
| SDK strategy? | Generate from OpenAPI + hand-tune | Balance currency with quality |

---

## §api-documentation

### Pattern: OpenAPI-First Documentation Pipeline

API documentation in multi-tenant systems requires systematic generation from code annotations with tier-aware filtering and tenant context injection.

| Stage | Tool | Output |
|-------|------|--------|
| Source | Code annotations | OpenAPI comments |
| Extract | swagger-jsdoc, springdoc | OpenAPI YAML |
| Validate | spectral, openapi-lint | Validation report |
| Enhance | Redocly CLI | Extended spec |
| Publish | Redoc, Stoplight | Developer portal |
| SDKs | openapi-generator | Language SDKs |

### OpenAPI Extensions for Multi-Tenant

| Extension | Purpose | Example |
|-----------|---------|---------|
| `x-tenant-required` | Mark tenant-scoped endpoints | `true/false` |
| `x-tier-availability` | Feature tier gating | `["pro", "enterprise"]` |
| `x-rate-limit` | Tier-specific rate limits | `{"free": 100, "pro": 1000}` |
| `x-quota-impact` | Resource consumption | `{"tokens": 10, "storage": "1MB"}` |

### Tenant-Aware Documentation Elements

| Element | Standard | Tenant Enhancement |
|---------|----------|-------------------|
| Base URL | `https://api.platform.com` | `https://api.platform.com/tenants/{tenant_id}` |
| Authentication | Bearer token | Tenant-scoped API key |
| Headers | Standard headers | `X-Tenant-ID` requirement |
| Errors | HTTP status codes | Tenant context in error responses |
| Examples | Generic data | Tenant-specific sample data |

### Tier-Gated Feature Documentation

| Feature | Free | Pro | Enterprise |
|---------|------|-----|------------|
| Basic CRUD | Documented | Documented | Documented |
| Bulk operations | Hidden | Documented | Documented |
| Webhooks | Hidden | Documented | Documented |
| Custom fields | Hidden | Hidden | Documented |
| Admin API | Hidden | Hidden | Documented |

### SDK Generation Strategy

| Language | Generator | Multi-Tenant Support |
|----------|-----------|---------------------|
| TypeScript | openapi-typescript | Tenant context in client config |
| Python | openapi-python-client | Tenant ID parameter |
| Go | oapi-codegen | Context-aware client |
| Java | openapi-generator | Tenant interceptor |

### Documentation Versioning

| Version Strategy | API Change | Doc Update |
|------------------|------------|------------|
| Major version | Breaking changes | New doc version |
| Minor version | New features | Section additions |
| Patch version | Bug fixes | Inline updates |
| Deprecation | Planned removal | Deprecation notices |

---

## §developer-portal

### Pattern: Self-Service Developer Portal

Developer portals for multi-tenant platforms must provide tier-appropriate experiences with isolated sandboxes and self-service capabilities.

### Portal Components

| Component | Purpose | Multi-Tenant Adaptation |
|-----------|---------|------------------------|
| API Reference | Endpoint documentation | Tier-gated content |
| Getting Started | Quick start guides | Tenant-specific onboarding |
| SDKs | Client libraries | Tenant configuration built-in |
| Sandbox | Test environment | Per-tenant isolated sandbox |
| Console | API key management | Tenant-scoped credentials |
| Status Page | API health | Per-tenant SLA dashboards |

### Portal Architecture

```
Developer Portal Architecture
-----------------------------
+------------------+------------------+------------------+
|      Docs        |     Console      |     Status       |
|    (Public)      |   (Auth Req)     |    (Public)      |
+--------+---------+--------+---------+--------+---------+
         |                  |                  |
         +--------+---------+---------+--------+
                  |                   |
         +--------v--------+  +-------v--------+
         | Identity &      |  | Tenant         |
         |   Access        |  | Context        |
         +-----------------+  +----------------+
```

### Portal Tiers and Features

| Feature | Free | Pro | Enterprise |
|---------|------|-----|------------|
| API Documentation | Basic | Full | Full + Private |
| Sandbox Environments | Shared | Dedicated | Custom |
| Rate Limits Dashboard | View only | Detailed | Custom alerts |
| API Keys | 2 keys | 10 keys | Unlimited |
| SSO Integration | No | Yes | Yes + SCIM |
| Support Access | Community | Ticket | Dedicated |

### Self-Service Capabilities

| Capability | Description | Tier Availability |
|------------|-------------|-------------------|
| API Key Generation | Create/rotate keys | All tiers |
| Usage Analytics | View API usage | Pro+ |
| Webhook Management | Configure callbacks | Pro+ |
| Team Management | Add team members | Pro+ |
| Custom Domains | Branded API URLs | Enterprise |
| IP Allowlisting | Restrict access | Enterprise |

### Developer Onboarding Flow

```
Developer Onboarding Timeline
-----------------------------
Sign Up --> Verify Email --> Create API Key --> First API Call
 < 1 min     < 5 min          < 2 min          < 10 min

Target: First API call within 15 minutes
```

### Interactive Documentation Features

| Feature | Description | Multi-Tenant Adaptation |
|---------|-------------|------------------------|
| Try It Out | Test API in browser | Use tenant sandbox |
| Code Samples | Language examples | Include tenant headers |
| Mock Server | Offline testing | Per-tenant mock data |
| API Console | Full API access | Tenant-scoped tokens |

---

## §ai-documentation

### Pattern: AI System Documentation for Compliance

AI documentation patterns ensure compliance with regulations (particularly the EU AI Act) by establishing systematic approaches to documenting AI system design, capabilities, limitations, and risk assessments.

### AI System Inventory and Classification

| Classification | Description | Documentation Level |
|----------------|-------------|---------------------|
| High-Risk AI | Systems making consequential decisions | Full technical documentation, conformity assessment |
| Limited Risk AI | Systems with transparency obligations | Model cards, user notifications |
| Minimal Risk AI | Low-impact AI features | Basic documentation, version tracking |

### Model Card Requirements

Model cards provide standardized documentation for AI models:

| Component | Description |
|-----------|-------------|
| Intended Use | Documented purposes and valid deployment contexts |
| Limitations | Known constraints, failure modes, out-of-scope applications |
| Performance Metrics | Accuracy benchmarks, fairness evaluations, reliability |
| Training Data | Data sources, preprocessing methods, bias assessments |

### Tenant-Specific AI Documentation

| Aspect | Documentation Requirement |
|--------|---------------------------|
| Custom Prompts | Record tenant-specific prompt templates and modifications |
| Model Configurations | Document any tenant-specific model parameters or restrictions |
| Feature Flags | Track which AI features are enabled/disabled per tenant |
| Usage Restrictions | Note any tenant-imposed limitations on AI capabilities |

### Compliance Documentation Requirements

| Requirement | Description | Frameworks |
|-------------|-------------|------------|
| Technical Documentation | AI system design, methodology, testing | EU AI Act, ISO 42001 |
| Risk Documentation | Identified risks, mitigation measures, residual risk | EU AI Act, NIST AI RMF |
| Change Documentation | Version-controlled records of modifications | EU AI Act, ISO 27001 |
| Performance Documentation | Metrics, benchmarks, evaluation results | EU AI Act, SOC2 |

### AI Documentation Implementation Patterns

| Pattern | Description | Frameworks |
|---------|-------------|------------|
| AI System Inventory | Centralized registry of AI components | EU AI Act, ISO 42001 |
| Model Card Generation | Automated model documentation | EU AI Act, NIST AI RMF |
| Training Data Documentation | Data source records and bias assessments | EU AI Act, GDPR |
| Decision Logging | Structured logs of AI-assisted decisions | EU AI Act, SOC2 |
| Version History Tracking | Audit trail of AI system versions | EU AI Act, ISO 27001 |
| Tenant-Specific Documentation | Per-tenant AI feature records | EU AI Act, Multi-tenant |

---

## §tech-writing

### Pattern: Multi-Tenant Technical Writing Workflow

Technical writing for multi-tenant platforms requires systematic processes for creating tenant-aware documentation with proper tier segmentation and version management.

### Writing Tenant-Aware Documentation

1. **Identify Audience Tier** - Determine which tier(s) the document serves
2. **Note Tenant Context** - Specify where tenant identification is required
3. **Include Tier Variations** - Document differences between tiers
4. **Add Tenant-Specific Examples** - Show real scenarios per tier
5. **Link to Related Docs** - Cross-reference tier-appropriate content
6. **Test Procedures** - Verify steps work for each documented tier
7. **Review with Tier Experts** - Validate accuracy with tier SMEs

### Documenting API Versioning

1. **Version Inventory** - List all supported API versions
2. **Changelog per Version** - Document changes in each version
3. **Migration Guides** - Step-by-step upgrade instructions
4. **Deprecation Notices** - Clear timeline and alternatives
5. **Compatibility Matrix** - Show feature availability per version
6. **Code Examples per Version** - Version-specific sample code
7. **Update Schedule** - Communicate versioning policy

### Creating Workflow Documentation

1. **Define Prerequisites** - List what must be in place before starting
2. **Include Tenant Context** - Note where tenant affects the workflow
3. **Number Steps Clearly** - Sequential, unambiguous instructions
4. **Add Screenshots** - Visual aids for complex steps
5. **Include Error Handling** - What to do when things go wrong
6. **Provide Verification** - How to confirm workflow succeeded
7. **Link Next Steps** - Guide to related workflows

### Multi-Tenant Documentation Site Structure

```
/docs
  /getting-started
    /free-tier
    /pro-tier
    /enterprise
  /user-guide
    /features (tier-aware tags)
    /integrations
    /workflows
  /admin-guide
    /tenant-settings
    /user-management
    /security
    /billing
  /api
    /v1
    /v2
    /authentication
    /rate-limits
  /compliance
    /security
    /privacy
    /data-residency
  /release-notes
```

### Tier-Sensitive Content Patterns

When documenting features that vary by tier:

| Element | Purpose |
|---------|---------|
| Tier Badge | Visual indicator of tier access |
| Upgrade Prompt | Clear path for lower tiers |
| Alternative Workaround | What lower tiers can do instead |
| Value Explanation | Why feature is in higher tier |

### Tenant-Specific API Error Documentation

| Error Code | Description | Resolution |
|------------|-------------|------------|
| `401` | Invalid tenant credentials | Verify API key and tenant ID |
| `403` | Feature not in tier | Upgrade or use alternative |
| `429` | Tenant rate limit exceeded | Wait or upgrade tier |
| `404` | Resource not found (or wrong tenant) | Verify resource ownership |

### Required Compliance Documentation

| Document | Description |
|----------|-------------|
| Security whitepaper | Platform security overview |
| Data processing agreement | DPA for data handling |
| Privacy policy | Data collection and use |
| Terms of service | Usage terms |
| SOC 2 report summary | Compliance attestation |
| GDPR compliance guide | EU data protection |
| Data retention policy | Retention schedules |
| Incident response process | Security incident handling |

### Release Notes Best Practices

| Component | Description |
|-----------|-------------|
| Summary | Overview of changes |
| New features | With tier tags |
| Improvements | Enhancements |
| Bug fixes | Resolved issues |
| Breaking changes | Migration requirements |
| Known issues | Current limitations |
| Tenant Impact Callouts | Tier-specific changes |

---

## §tenant-docs

### Pattern: Tenant-Specific Documentation Management

Each tenant may require customized documentation based on their tier, configuration, and compliance requirements.

### Tenant Documentation Categories

| Category | Description | Generation |
|----------|-------------|------------|
| Configuration Guides | Tenant-specific setup | Auto-generated from config |
| Custom Feature Docs | Tenant customizations | Manual with templates |
| SLA Documentation | Service level agreements | Per-tier templates |
| Compliance Exports | Regulatory documentation | On-demand generation |
| Usage Reports | Consumption documentation | Automated reports |

### Documentation Personalization

| Personalization Level | Content Adaptation |
|----------------------|-------------------|
| Tier-based | Feature availability, limits |
| Region-based | Compliance, data residency |
| Industry-based | Terminology, use cases |
| Role-based | Admin vs user content |

### Tenant Documentation Delivery

| Channel | Use Case | Multi-Tenant Support |
|---------|----------|---------------------|
| In-app Help | Contextual assistance | Tenant-aware content |
| Knowledge Base | Self-service | Tier-filtered articles |
| PDF Export | Offline access | Tenant-branded |
| API | Programmatic access | Tenant-scoped |

---

## Quality Gates

### Documentation Quality Checklist

- [ ] All API endpoints documented with examples
- [ ] Tier availability clearly marked
- [ ] Tenant context requirements specified
- [ ] Authentication/authorization documented
- [ ] Error codes and resolution steps provided
- [ ] Rate limits documented per tier
- [ ] SDKs match API version
- [ ] Migration guides for breaking changes
- [ ] AI system model cards complete
- [ ] Compliance documentation current

### Documentation Accuracy Verification

| Verification | Method | Frequency |
|--------------|--------|-----------|
| Schema accuracy | Contract testing | Every PR |
| Example validity | Example execution | Daily |
| Link integrity | Link checker | Weekly |
| SDK compatibility | SDK test suite | Every release |
| Tier accuracy | Manual review | Per release |

### AI Documentation Validation

- [ ] AI system inventory is complete and current
- [ ] Each AI component has a standardized model card
- [ ] Training data sources and characteristics documented
- [ ] Risk assessments documented and reviewed
- [ ] Change history maintained with justifications
- [ ] Performance metrics documented and benchmarked
- [ ] Tenant-specific configurations recorded
- [ ] Documentation supports conformity assessment

---

## Web Research

| Topic | Query |
|-------|-------|
| API Documentation | "OpenAPI multi-tenant documentation patterns {date}" |
| Developer Portal | "developer portal multi-tenant SaaS {date}" |
| SDK Generation | "SDK generation multi-tenant best practices {date}" |
| AI Documentation | "EU AI Act documentation requirements {date}" |
| Model Cards | "AI model card generation standards {date}" |
| Technical Writing | "multi-tenant technical documentation {date}" |
| Documentation Automation | "developer documentation generation automation {date}" |
| Compliance Documentation | "SaaS compliance documentation requirements {date}" |

---

## Related Patterns

> **Note:** Use the `web_queries` column from pattern registry CSVs for current best practices searches.

Load decision criteria and web search queries from pattern registry:

- **API patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` - filter by category: `api-*`
- **Documentation patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` - filter by category: `docs-*`
- **Developer experience patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` - filter by category: `dx-*`
- **Compliance patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

---

## Related Workflows

- `bmad-bam-api-version-release` - API versioning documentation
- `define-facade-contract` - Contract-first API design
- `evolve-facade-contract` - API evolution documentation
- `bmad-bam-tenant-portal-design` - Design portal architecture
- `bmad-bam-api-documentation-automation` - Generate API docs
- `bmad-bam-ai-eval-safety-design` - Document AI evaluation and safety
- `bmad-bam-agent-runtime-architecture` - Document agent runtime configurations
- `bmad-bam-compliance-design` - Design compliance documentation

---

## Change Log

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | {date} | Initial consolidated guide from 5 source files |
