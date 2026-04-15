---
name: cost-tracking-template
description: Documents cost tracking design for attributing infrastructure and AI usage costs to tenants for billing and optimization
category: billing
version: "1.0.0"
---

# Cost Tracking Design Template

## Document Information

| Field | Value |
|-------|-------|
| **Project** | {{project_name}} |
| **Module** | {{module_name}} |
| **Version** | {{version}} |
| **Last Updated** | {{date}} |
| **Author** | {{author}} |
| **Status** | Draft |

## Purpose

This template documents the cost tracking design for attributing infrastructure and AI usage costs to tenants, enabling accurate billing, budget enforcement, and cost optimization.

## Cost Categories

### Resource Cost Types

| Category | Description | Tracking Method | Allocation |
|----------|-------------|-----------------|------------|
| Compute | CPU, memory usage | Time-based | Per tenant |
| Storage | Database, object storage | Size-based | Per tenant |
| Network | Egress, API calls | Volume-based | Per tenant |
| AI/LLM | Token usage, model calls | Per-request | Per tenant |
| Third-party | External APIs | Per-call | Per tenant |

## AI Cost Model

### Token-Based Pricing

| Model | Input Cost | Output Cost | Unit |
|-------|------------|-------------|------|
| GPT-4 | $0.03 | $0.06 | per 1K tokens |
| GPT-4 Turbo | $0.01 | $0.03 | per 1K tokens |
| Claude 3 Opus | $0.015 | $0.075 | per 1K tokens |
| Claude 3 Sonnet | $0.003 | $0.015 | per 1K tokens |
| Embeddings | $0.0001 | N/A | per 1K tokens |

### Cost Event Schema

```json
{
  "event_id": "{{uuid}}",
  "timestamp": "{{iso8601}}",
  "tenant_id": "{{tenant_id}}",
  "user_id": "{{user_id}}",
  "agent_id": "{{agent_id}}",
  
  "resource": {
    "type": "llm|embedding|tool|compute|storage",
    "provider": "{{provider}}",
    "model": "{{model_name}}"
  },
  
  "usage": {
    "input_tokens": {{input_tokens}},
    "output_tokens": {{output_tokens}},
    "total_tokens": {{total_tokens}},
    "duration_ms": {{duration}},
    "requests": {{request_count}}
  },
  
  "cost": {
    "amount": {{cost_amount}},
    "currency": "USD",
    "breakdown": {
      "input": {{input_cost}},
      "output": {{output_cost}},
      "base": {{base_cost}}
    }
  },
  
  "context": {
    "conversation_id": "{{conversation_id}}",
    "run_id": "{{run_id}}",
    "workflow": "{{workflow_name}}"
  }
}
```

## Budget Management

### Tenant Budget Configuration

```yaml
budgets:
  tenant_123:
    monthly_limit: 1000.00
    currency: USD
    
    alerts:
      - threshold: 50%
        action: notify
        recipients: [admin@tenant.com]
      - threshold: 80%
        action: notify
        recipients: [admin@tenant.com, finance@tenant.com]
      - threshold: 95%
        action: throttle
        reduction: 50%
      - threshold: 100%
        action: block
        allow_override: true
        
    breakdown:
      llm: 70%      # $700 max
      embedding: 15% # $150 max
      compute: 10%   # $100 max
      storage: 5%    # $50 max
```

### Tier-Based Limits

| Tier | Monthly Budget | Overage Allowed | Rate |
|------|---------------|-----------------|------|
| Free | $10 | No | N/A |
| Pro | $500 | Yes | 1.2x |
| Enterprise | Custom | Yes | 1.0x |

## Cost Attribution

### Attribution Hierarchy

```
Tenant
  └── User
        └── Agent
              └── Conversation
                    └── Run
                          └── Tool Call
```

### Attribution Rules

| Scenario | Attribution | Notes |
|----------|-------------|-------|
| User chat | User → Tenant | Direct usage |
| Background job | System → Tenant | No user context |
| Shared agent | Pro-rated → Tenants | Multi-tenant agent |
| Admin action | Admin → Platform | Not billed to tenant |

## Reporting

### Cost Dashboard Metrics

| Metric | Granularity | Retention |
|--------|-------------|-----------|
| Daily cost | Per tenant | 90 days |
| Token usage | Per model | 90 days |
| Cost per user | Per tenant | 30 days |
| Budget utilization | Per tenant | Real-time |

### Report Templates

```sql
-- Daily cost by tenant
SELECT 
  tenant_id,
  DATE(timestamp) as date,
  resource_type,
  SUM(cost_amount) as total_cost,
  SUM(total_tokens) as total_tokens
FROM cost_events
WHERE timestamp >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY tenant_id, DATE(timestamp), resource_type
ORDER BY date DESC, total_cost DESC;

-- Cost per conversation
SELECT
  conversation_id,
  COUNT(*) as events,
  SUM(cost_amount) as total_cost,
  SUM(total_tokens) as total_tokens
FROM cost_events
WHERE tenant_id = '{{tenant_id}}'
GROUP BY conversation_id
ORDER BY total_cost DESC
LIMIT 100;
```

## Cost Optimization

### Optimization Recommendations

| Signal | Recommendation | Savings Potential |
|--------|---------------|-------------------|
| High token/request | Enable response caching | 20-40% |
| Repeated queries | Implement semantic cache | 30-50% |
| Large contexts | Use context compression | 15-25% |
| Model mismatch | Route to appropriate model | 40-60% |

## Verification Checklist

- [ ] All AI calls tracked with cost events
- [ ] Tenant attribution accurate
- [ ] Budget alerts configured
- [ ] Overage handling implemented
- [ ] Cost dashboards available
- [ ] Reports exportable
- [ ] Optimization signals captured
- [ ] Billing integration tested

## Web Research Queries

- Search: "LLM cost tracking multi-tenant {date}"
- Search: "AI usage billing SaaS {date}"
- Search: "token budget management patterns {date}"

## Change Log

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | {{date}} | Initial template | Platform Team |
