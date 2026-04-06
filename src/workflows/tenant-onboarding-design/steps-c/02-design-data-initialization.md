# Step 2: Design Data Initialization

Define the initial data that must be seeded for each new tenant:

## System Configuration Data
- Default feature flags for tenant tier
- Rate limit configurations
- Quota allocations per tier
- Default notification preferences

## Reference Data
- Available agent templates for tier
- Tool catalog visibility based on tier
- Integration connectors enabled by default
- Default workflow templates

## User Data
- Admin user with tenant_admin role
- Default team structure (if applicable)
- Initial API key generation rules

## AI Runtime Data
- Default agent configurations
- Initial system prompt templates
- Memory tier initialization (empty tenant memory bucket)
- Default safety guardrails

## Initialization Script Pattern

```
initialization_manifest:
  tier_overrides:
    FREE:
      agents_limit: 2
      tools_enabled: [basic_tools]
      memory_retention_days: 7
    PRO:
      agents_limit: 10
      tools_enabled: [basic_tools, advanced_tools]
      memory_retention_days: 30
    ENTERPRISE:
      agents_limit: unlimited
      tools_enabled: [all]
      memory_retention_days: 365
```

Ensure all initialization is idempotent and can be re-run without creating duplicates.
