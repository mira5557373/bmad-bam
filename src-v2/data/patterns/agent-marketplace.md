---
pattern_id: agent-marketplace
shortcode: ZAM
category: agent-communication
qg_ref: QG-AI1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Agent Marketplace - BAM Pattern

**Loaded by:** ZAM  
**Applies to:** Multi-tenant platforms with agent/skill discovery and distribution  
**See also:** [agent-registry.md](agent-registry.md), [ai-discovery.md](ai-discovery.md)

---

## When to Use

- Platform supports third-party or partner agent contributions
- Tenants need to discover and subscribe to agent capabilities
- Monetization of agent skills/capabilities
- Enterprise agent catalogs with governance
- Agent versioning and lifecycle management

## When NOT to Use

- Single-tenant with fixed agent set
- No external agent contributions
- Simple internal-only agent deployments
- When API marketplace patterns suffice

## Architecture

### Marketplace Topology

```
┌─────────────────────────────────────────────────────────────────────┐
│                     Agent Marketplace Platform                       │
│                                                                      │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                   Marketplace Registry                         │  │
│  │  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐  │  │
│  │  │ Agent A   │  │ Agent B   │  │ Skill X   │  │ Skill Y   │  │  │
│  │  │ v2.1.0    │  │ v1.4.2    │  │ v3.0.0    │  │ v1.0.0    │  │  │
│  │  │ Publisher:│  │ Publisher:│  │ Publisher:│  │ Publisher:│  │  │
│  │  │ VendorCo  │  │ PartnerInc│  │ Platform  │  │ TenantFoo │  │  │
│  │  └───────────┘  └───────────┘  └───────────┘  └───────────┘  │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                              │                                      │
│          ┌───────────────────┼───────────────────┐                 │
│          ▼                   ▼                   ▼                 │
│  ┌───────────────┐   ┌───────────────┐   ┌───────────────┐        │
│  │  Discovery    │   │  Governance   │   │  Billing      │        │
│  │  • Search     │   │  • Review     │   │  • Metering   │        │
│  │  • Filter     │   │  • Approve    │   │  • Pricing    │        │
│  │  • Recommend  │   │  • Audit      │   │  • Settlement │        │
│  └───────────────┘   └───────────────┘   └───────────────┘        │
│                                                                      │
│  Actors: [Publishers] [Subscribers] [Reviewers] [Platform]         │
└─────────────────────────────────────────────────────────────────────┘
```

### Tenant Subscription Model

```
┌─────────────────────────────────────────────────────────────────────┐
│                  Tenant Agent Subscription                           │
│                                                                      │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                     Tenant: Acme Corp                          │  │
│  │                                                                │  │
│  │  Subscribed Agents:                                           │  │
│  │  ┌─────────────────────────────────────────────────────────┐  │  │
│  │  │ Agent A (VendorCo)      │ Status: Active                │  │  │
│  │  │ Version: 2.1.0          │ Tier: Pro                     │  │  │
│  │  │ Capabilities: [analyze] │ Usage: 1,250/month            │  │  │
│  │  │ Config: tenant-specific │ Cost: $0.02/call              │  │  │
│  │  └─────────────────────────────────────────────────────────┘  │  │
│  │                                                                │  │
│  │  ┌─────────────────────────────────────────────────────────┐  │  │
│  │  │ Skill X (Platform)      │ Status: Active                │  │  │
│  │  │ Version: 3.0.0          │ Tier: Enterprise              │  │  │
│  │  │ Capabilities: [extract] │ Usage: Unlimited              │  │  │
│  │  │ Config: default         │ Cost: Included                │  │  │
│  │  └─────────────────────────────────────────────────────────┘  │  │
│  │                                                                │  │
│  │  Available (Not Subscribed):                                  │  │
│  │  • Agent B (PartnerInc) - v1.4.2 - $0.05/call               │  │
│  │  • Skill Y (TenantFoo) - v1.0.0 - Free (community)          │  │
│  │                                                                │  │
│  └───────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

### Configuration Schema

```yaml
agent_marketplace:
  version: "1.0.0"
  bam_controlled: true
  
  registry:
    backend: enum[postgresql, mongodb, dynamodb]
    
    listing_schema:
      required_fields:
        - listing_id: uuid
        - name: string
        - version: semver
        - publisher_id: string
        - type: enum[agent, skill, tool]
        - capabilities: list[string]
        - description: string
        
      optional_fields:
        - icon_url: string
        - documentation_url: string
        - source_repository: string
        - demo_url: string
        - tags: list[string]
        
    versioning:
      strategy: enum[semver, calver, sequential]
      deprecation_policy:
        notice_days: int
        sunset_days: int
        force_upgrade: bool
        
  discovery:
    search:
      engine: enum[elasticsearch, algolia, meilisearch]
      facets: [type, category, publisher, tier, rating]
      
    recommendations:
      enabled: bool
      algorithm: enum[collaborative, content_based, hybrid]
      personalization: bool
      
    filtering:
      by_tier: bool
      by_compliance: list[string]  # HIPAA, SOC2, GDPR
      by_region: bool
      
  governance:
    submission:
      review_required: bool
      automated_checks:
        - security_scan: bool
        - performance_benchmark: bool
        - compatibility_check: bool
        - documentation_validation: bool
        
    approval_workflow:
      reviewers: list[string]
      min_approvals: int
      auto_approve_trusted: bool
      
    certification:
      levels: [basic, verified, certified]
      certification_criteria:
        basic:
          - passes_security_scan
        verified:
          - passes_security_scan
          - has_documentation
          - has_tests
        certified:
          - passes_security_scan
          - has_documentation
          - has_tests
          - manual_review_passed
          
  tenant_customization:
    enabled: bool
    
    customization_types:
      configuration:
        description: "Tenant-specific configuration"
        schema_override: bool
        
      prompt_templates:
        description: "Custom prompt templates"
        validation: bool
        
      tool_permissions:
        description: "Tool access restrictions"
        default: deny
        
  pricing:
    models:
      - type: "free"
        
      - type: "per_call"
        price_per_call: float
        bulk_discounts:
          - threshold: int
            discount_percent: float
            
      - type: "subscription"
        monthly_price: float
        included_calls: int
        overage_price: float
        
      - type: "revenue_share"
        publisher_percent: float
        platform_percent: float
        
    billing:
      cycle: enum[monthly, annual]
      settlement_delay_days: int
      
  audit:
    track_subscriptions: bool
    track_usage: bool
    track_reviews: bool
    retention_days: int
```

### Publishing Workflow

```
┌─────────────────────────────────────────────────────────────────────┐
│                    Agent Publishing Workflow                         │
│                                                                      │
│  Publisher                    Platform                    Reviewers  │
│                                                                      │
│  ┌────────────┐       ┌────────────────────┐                       │
│  │ 1. Submit  │──────►│ 2. Automated       │                       │
│  │    Package │       │    Checks          │                       │
│  └────────────┘       │    • Security scan │                       │
│                       │    • Compatibility │                       │
│                       │    • Documentation │                       │
│                       └─────────┬──────────┘                       │
│                                 │                                   │
│                       ┌─────────▼──────────┐       ┌────────────┐  │
│                       │ 3. Queue for       │──────►│ 4. Manual  │  │
│                       │    Review          │       │    Review  │  │
│                       └────────────────────┘       └──────┬─────┘  │
│                                                           │        │
│         ┌─────────────────────────────────────────────────┘        │
│         ▼                                                          │
│  ┌──────────────┐                                                  │
│  │ 5. Decision  │                                                  │
│  │    ┌───┬───┐ │                                                  │
│  │    │ ✓ │ ✗ │ │                                                  │
│  │    └───┴───┘ │                                                  │
│  └──────┬───────┘                                                  │
│         │                                                          │
│    ┌────┴────┐                                                     │
│    ▼         ▼                                                     │
│  ┌─────┐  ┌─────────┐                                              │
│  │Publish│  │ Feedback │                                            │
│  │to     │  │ to       │                                            │
│  │Registry│ │ Publisher│                                            │
│  └─────┘  └─────────┘                                              │
└─────────────────────────────────────────────────────────────────────┘
```

### Version Compatibility Matrix

```
┌─────────────────────────────────────────────────────────────────────┐
│                   Version Compatibility                              │
│                                                                      │
│  Agent: MyAnalyzer                                                  │
│  Publisher: VendorCo                                                │
│                                                                      │
│  ┌─────────┬─────────┬─────────┬─────────┬─────────┐               │
│  │ Version │ Status  │ Platform│ Breaking│ Tenants │               │
│  ├─────────┼─────────┼─────────┼─────────┼─────────┤               │
│  │ 3.0.0   │ Current │ >=2.0   │ Yes     │ 45      │               │
│  │ 2.2.1   │ Active  │ >=1.5   │ No      │ 312     │               │
│  │ 2.2.0   │ Active  │ >=1.5   │ No      │ 89      │               │
│  │ 2.1.0   │ Deprecated│ >=1.5 │ No      │ 23      │               │
│  │ 2.0.0   │ Sunset  │ >=1.0   │ Yes     │ 0       │               │
│  │ 1.x     │ Removed │ <1.0    │ -       │ -       │               │
│  └─────────┴─────────┴─────────┴─────────┴─────────┘               │
│                                                                      │
│  Deprecation: 30-day notice → 90-day sunset → removal              │
└─────────────────────────────────────────────────────────────────────┘
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Open Marketplace | Maximum choice | Security risk, quality variance | Developer platforms |
| Curated Marketplace | Quality assured | Limited selection | Enterprise |
| Internal Only | Full control | No external innovation | Regulated industries |
| Hybrid | Balanced | Complex governance | Growth-stage platforms |

## Governance Considerations

### Security Requirements

```
┌─────────────────────────────────────────────────────────────────────┐
│                  Marketplace Security                                │
│                                                                      │
│  SUBMISSION REQUIREMENTS:                                           │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ 1. Code/Package Signing                                      │   │
│  │    - Publisher identity verification                         │   │
│  │    - Package integrity (checksum/signature)                  │   │
│  │                                                              │   │
│  │ 2. Security Scanning                                         │   │
│  │    - Vulnerability detection (CVE check)                     │   │
│  │    - Secrets detection (no embedded credentials)             │   │
│  │    - Dependency audit                                        │   │
│  │                                                              │   │
│  │ 3. Permission Declaration                                    │   │
│  │    - Required tools/capabilities                             │   │
│  │    - Data access scope                                       │   │
│  │    - Network requirements                                    │   │
│  │                                                              │   │
│  │ 4. Isolation Guarantee                                       │   │
│  │    - Cannot access other tenants' data                       │   │
│  │    - Sandboxed execution environment                         │   │
│  │    - Resource limits enforced                                │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                      │
│  RUNTIME ENFORCEMENT:                                               │
│  • Tenant isolation: Agent runs in subscriber's tenant context     │
│  • Permission scoping: Only declared permissions available          │
│  • Usage metering: All calls tracked per tenant                    │
│  • Kill switch: Platform can disable any agent instantly           │
└─────────────────────────────────────────────────────────────────────┘
```

### Compliance Badges

| Badge | Requirement | Verification |
|-------|-------------|--------------|
| SOC2 Ready | Audit logging, encryption | Automated check |
| HIPAA Compatible | BAA, PHI handling | Manual review |
| GDPR Compliant | Data residency, deletion | Automated + manual |
| PCI-DSS | No CHD storage | Security scan |

## Web Research Queries

- "AI agent marketplace architecture patterns {date}"
- "agent skill registry design patterns {date}"
- "multi-tenant SaaS marketplace governance {date}"
- "AI model marketplace security {date}"
- "developer marketplace monetization models {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-AI1 | Marketplace agents respect tenant boundaries |
| QG-M3 | Agent versions tracked, deprecation enforced |
| QG-S3 | Security scanning for all submissions |
| QG-I1 | Marketplace integrations follow facade contracts |

## Related Patterns

- [agent-registry.md](agent-registry.md) - Agent catalog fundamentals
- [ai-discovery.md](ai-discovery.md) - Agent capability discovery
- [tool-sbom-registry.md](tool-sbom-registry.md) - Tool software bill of materials
- [cross-tenant-agent.md](cross-tenant-agent.md) - Cross-tenant federation
