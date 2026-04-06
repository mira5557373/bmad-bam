# Step 1: Identify Billable Resources

Define all resources that contribute to tenant billing:

## Resource Categories

### Compute Resources
| Resource | Unit | Measurement Method | Billing Frequency |
|----------|------|-------------------|-------------------|
| API Requests | count | Request counter | Monthly |
| Agent Invocations | count | Invocation counter | Monthly |
| Background Job Execution | seconds | Job duration | Monthly |
| WebSocket Connections | connection-hours | Connection time | Monthly |

### AI/ML Resources
| Resource | Unit | Measurement Method | Billing Frequency |
|----------|------|-------------------|-------------------|
| LLM Input Tokens | tokens | Token counter | Monthly |
| LLM Output Tokens | tokens | Token counter | Monthly |
| Vector Operations | count | Operation counter | Monthly |
| Embedding Generation | count | Embedding counter | Monthly |

### Storage Resources
| Resource | Unit | Measurement Method | Billing Frequency |
|----------|------|-------------------|-------------------|
| File Storage | GB-months | Daily snapshot average | Monthly |
| Vector Storage | vectors | Vector count | Monthly |
| Database Storage | GB-months | Daily snapshot average | Monthly |
| Cache Usage | GB-hours | Hourly sampling | Monthly |

### Network Resources
| Resource | Unit | Measurement Method | Billing Frequency |
|----------|------|-------------------|-------------------|
| Data Egress | GB | Transfer counter | Monthly |
| Webhook Calls | count | Call counter | Monthly |

## Tier-Based Inclusions

```yaml
tier_inclusions:
  FREE:
    api_requests: 10000/month
    agent_invocations: 100/month
    llm_tokens: 100000/month
    file_storage_gb: 1
    vector_storage: 100000
    
  PRO:
    api_requests: 100000/month
    agent_invocations: 1000/month
    llm_tokens: 1000000/month
    file_storage_gb: 50
    vector_storage: 1000000
    
  ENTERPRISE:
    # Custom negotiated limits
    api_requests: custom
    agent_invocations: custom
    llm_tokens: custom
    file_storage_gb: custom
    vector_storage: custom
```

## Overage Pricing (PRO Tier)

```yaml
overage_pricing:
  api_requests: $0.001/1000 requests
  agent_invocations: $0.01/invocation
  llm_input_tokens: $0.002/1000 tokens
  llm_output_tokens: $0.008/1000 tokens
  file_storage_gb: $0.10/GB-month
  vector_storage: $0.01/10000 vectors
  data_egress_gb: $0.05/GB
```

## Resource Attribution Rules

```yaml
attribution:
  # Primary attribution by tenant_id
  primary_key: tenant_id
  
  # Secondary attribution for cost allocation
  secondary_keys:
    - agent_id (for agent-level billing)
    - user_id (for user-level reporting)
    - project_id (if multi-project)
    
  # Shared resource allocation
  shared_resources:
    - platform_overhead: distributed by usage ratio
    - infrastructure_base: flat per-tenant fee
```

## Non-Billable Resources

Resources tracked but not billed:
- Platform health checks
- Admin API calls
- System-initiated background jobs
- Metrics/logs/traces collection
- Internal service-to-service calls
