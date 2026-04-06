# Step 3: Configure Tier Defaults

Define the default configurations for each tenant tier that are applied during provisioning:

## Tier Configuration Matrix

| Configuration | FREE | PRO | ENTERPRISE |
|---------------|------|-----|------------|
| Max Users | 5 | 50 | Unlimited |
| Max Agents | 2 | 10 | Unlimited |
| Max Concurrent Sessions | 3 | 20 | Custom |
| API Rate Limit (req/min) | 60 | 600 | Custom |
| Storage Quota | 1 GB | 50 GB | Custom |
| Memory Retention | 7 days | 30 days | 365 days |
| Vector Storage Limit | 100k embeddings | 1M embeddings | Custom |
| Support SLA | Community | 24h response | 4h response |

## Feature Flags by Tier

```yaml
tier_features:
  FREE:
    - basic_agents
    - standard_tools
    - community_support
  PRO:
    - basic_agents
    - advanced_agents
    - standard_tools
    - premium_tools
    - email_support
    - analytics_dashboard
  ENTERPRISE:
    - all_agent_types
    - all_tools
    - custom_integrations
    - dedicated_support
    - sso_integration
    - audit_logs
    - data_residency_selection
```

## Custom Configuration Overrides

For ENTERPRISE tier, define the override mechanism:
- Custom quota negotiation stored in tenant settings
- Override validation (cannot exceed platform limits)
- Override audit trail

**Soft Gate:** Present tier configuration matrix for confirmation before proceeding to isolation boundaries.
