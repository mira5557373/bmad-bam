# Tech Writer Guide - BAM Extension

**When to load:** During any phase when creating tenant-aware documentation or API docs, or when user mentions workflow documentation, API versioning, or tenant configuration guides.
**Integrates with:** Tech Writer (bmad-agent-tech-writer), documentation, API docs

This guide provides BAM-specific context for technical writers working on multi-tenant agentic AI platforms.

## Role Context

As a technical writer on a BAM project, you focus on:
- Documenting workflows with tenant context
- Creating API documentation with versioning
- Writing tenant-appropriate documentation
- Maintaining consistency across module docs

## Core Concepts

### Tier-Aware Documentation
Documentation in multi-tenant systems must account for different experiences across tiers. Content should clearly indicate which tiers have access to features, provide tier-appropriate examples, and offer alternatives for lower tiers when documenting restricted features.

### API Version Documentation
APIs evolve over time, and tenants may use different versions based on their integration timeline. Documentation must cover all supported versions, provide clear migration guides, and communicate deprecation timelines with sufficient notice.

### Tenant Context in Procedures
Every procedural document must identify where tenant context matters. This includes authentication steps, configuration specific to tenant tiers, and any steps where behavior varies based on tenant settings or isolation requirements.

## Application Guidelines

When creating multi-tenant documentation:
1. Always indicate tier availability with clear visual badges
2. Test all procedures against each tier to verify accuracy
3. Include tenant context requirements in API documentation
4. Provide migration paths when documenting breaking changes
5. Maintain separate getting-started guides per tier to match user expectations

## Documentation Priority Matrix

Use this matrix to prioritize documentation efforts:

| Documentation Type | Audience | Priority | Update Frequency |
|-------------------|----------|----------|------------------|
| **API Reference** | Developers | Critical | Every API change |
| **Tenant Admin Guide** | Admins | Critical | Per feature release |
| **Getting Started** | New users | High | Quarterly |
| **Integration Guide** | Partners | High | Per integration change |
| **Security Documentation** | Compliance | High | Per security change |
| **Troubleshooting Guide** | Support | Medium | Continuous |
| **Best Practices** | Power users | Medium | Quarterly |
| **Release Notes** | All users | Medium | Per release |
| **Architecture Overview** | Technical leaders | Low | Major changes only |

### Tier-Based Documentation Decisions

| Content Decision | Free Tier | Pro Tier | Enterprise Tier |
|-----------------|-----------|----------|-----------------|
| Detail Level | Essential | Comprehensive | Exhaustive + custom |
| Support References | Community | Chat/email links | Dedicated contact |
| Examples | Basic | Advanced | Industry-specific |
| Compliance Content | Minimal | Standard | Full compliance docs |
| API Docs | Public only | All standard | + private endpoints |

## Actionable Guidance

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

## Key Considerations

### Workflow Documentation
- Clear step-by-step procedures
- Tenant context requirements noted
- Error handling documentation

### API Version Documentation
- Document all API versions
- Migration guides between versions
- Deprecation notices and timelines

### Tenant-Aware Docs
- Tier-specific feature documentation
- Admin vs user documentation
- Tenant configuration guides

## SaaS-Specific Considerations

### Multi-Tenant Documentation Structure

**Recommended Doc Site Organization:**
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

**Conditional Content:**
When documenting features that vary by tier:

1. **Tier Badge** - Visual indicator of which tier can access
2. **Upgrade Prompt** - Clear path for lower tiers to access
3. **Alternative Workaround** - What lower tiers can do instead
4. **Value Explanation** - Why feature is in higher tier

**Example Format:**
```
## Advanced Analytics [Pro]

This feature is available to Pro and Enterprise customers.
[Upgrade to Pro →]

Free tier users can access basic analytics in Settings > Dashboard.

[Feature documentation...]
```

### API Documentation Standards

**Per-Endpoint Documentation:**
- Method and path
- Authentication requirements
- Tenant context header requirements
- Request parameters with types
- Response schema with examples
- Error codes with tenant-specific errors
- Rate limit information per tier
- Version availability

**Tenant-Specific API Errors:**
| Error Code | Description | Resolution |
|------------|-------------|------------|
| `401` | Invalid tenant credentials | Verify API key and tenant ID |
| `403` | Feature not in tier | Upgrade or use alternative |
| `429` | Tenant rate limit exceeded | Wait or upgrade tier |
| `404` | Resource not found (or wrong tenant) | Verify resource ownership |

### Admin Documentation Scope

**Tenant Admin Guide Topics:**
- Tenant settings configuration
- User and role management
- Security settings (SSO, MFA)
- Billing and subscription management
- Usage monitoring and alerts
- Integration configuration
- Audit log access
- Data export and compliance

### Compliance Documentation

**Required Compliance Docs:**
- Security whitepaper
- Data processing agreement (DPA)
- Privacy policy
- Terms of service
- SOC 2 report summary
- GDPR compliance guide
- Data retention policy
- Incident response process

### Documentation Localization

**Multi-Tenant Localization Considerations:**
| Content Type | Localization Priority |
|-------------|----------------------|
| Core UI docs | High |
| API reference | Medium (code examples universal) |
| Admin guides | Medium |
| Compliance docs | By region (required) |
| Marketing content | High |

### Release Notes Best Practices

**Per-Release Content:**
- Summary of changes
- New features (with tier tags)
- Improvements
- Bug fixes
- Breaking changes
- Migration requirements
- Known issues

**Tenant Impact Callouts:**
- Changes affecting all tenants
- Changes affecting specific tiers
- Required actions for tenants
- Timeline for mandatory updates

### Documentation Testing

**Verification Checklist:**
- [ ] All procedures tested with each tier
- [ ] API examples return expected results
- [ ] Screenshots match current UI
- [ ] Links are not broken
- [ ] Tier badges are accurate
- [ ] Version information is current

## Decision Framework

| Situation | Recommendation | Rationale |
|-----------|---------------|-----------|
| New feature releases | Update docs before release, not after | Users expect docs at launch |
| API breaking change | Migration guide with 6+ month deprecation notice | Tenants need time to adapt |
| Tier-restricted feature | Document with badge and alternative for lower tiers | Reduce support tickets |
| Enterprise-only content | Separate section with access control | Protect competitive advantage |
| Procedure fails for one tier | Document tier-specific variations | Prevent user frustration |
| Compliance requirement changes | Update immediately, notify affected tiers | Compliance cannot wait |

## Related Workflows

- `bmad-bam-api-version-release` - Document API version releases and migrations
- `bmad-bam-define-facade-contract` - Document facade contracts for integration

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Documentation patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `doc-*`
- **SaaS patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `saas-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "SaaS API documentation best practices {date}"
- Search: "multi-tenant technical documentation {date}"
- Search: "B2B SaaS developer portal design {date}"
