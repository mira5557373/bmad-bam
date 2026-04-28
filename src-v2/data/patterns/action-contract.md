# Action Contract - BAM Pattern

**Loaded by:** ZAL  
**Applies to:** AI agent action execution, multi-tenant safety, audit trails

---

## When to Use

- AI agents executing write operations in multi-tenant systems
- Financial or sensitive data modifications
- Audit trail requirements (SOC2, HIPAA, GDPR)
- Human-in-the-loop approval workflows
- Agent actions requiring rollback capability
- Cost/resource tracking per tenant

## When NOT to Use

- Simple read-only agents (no mutations)
- Single-tenant prototype applications
- Internal tools without audit requirements
- Batch processing with existing transaction management

## Architecture

### 8-Field Action Contract

Every AI agent action MUST include these 8 fields for multi-tenant safety:

| Field | Type | Purpose | Multi-Tenant Impact |
|-------|------|---------|---------------------|
| `tenant_id` | UUID | Identifies owning tenant | Prevents cross-tenant data access |
| `action_type` | Enum | Categorizes risk level | Determines approval workflow |
| `confidence` | Float (0-1) | AI certainty score | Triggers review thresholds |
| `proof_certificate` | Object | Evidence trail | Enables audit reconstruction |
| `resource_budget` | Object | Cost/token limits | Prevents tenant overuse |
| `rollback_plan` | Object | Undo instructions | Enables safe recovery |
| `audit_metadata` | Object | Who/what/when/why | Compliance evidence |
| `loop_binding` | String | Execution loop ID | Prevents duplicate execution |

### Action Types

| Type | Risk Level | Auto-Execute | Examples |
|------|------------|--------------|----------|
| `READ_ONLY` | Low | Yes (any confidence) | Query data, list items |
| `WRITE_INTERNAL` | Medium | If confidence >= 0.95 | Update records, create drafts |
| `WRITE_EXTERNAL` | High | Never auto | Send emails, API calls |
| `FINANCIAL` | Critical | Never auto | Payments, refunds, billing |
| `PRIVILEGED` | Critical | Never auto | User deletion, config changes |

### Confidence Thresholds

| Threshold | Range | Behavior | Rationale |
|-----------|-------|----------|-----------|
| Auto-execute | >= 0.95 | Execute immediately | High certainty, low risk |
| Soft review | 0.80 - 0.94 | Async human review | Moderate certainty |
| Hard review | 0.50 - 0.79 | Blocking human approval | Low certainty |
| Reject | < 0.50 | Reject with explanation | Insufficient confidence |

### Contract Schema

```yaml
action_contract:
  # Field 1: Tenant isolation
  tenant_id: "tenant_abc123"
  
  # Field 2: Action classification
  action_type: "WRITE_INTERNAL"  # READ_ONLY | WRITE_INTERNAL | WRITE_EXTERNAL | FINANCIAL | PRIVILEGED
  
  # Field 3: AI confidence score
  confidence: 0.87
  
  # Field 4: Evidence for audit trail
  proof_certificate:
    reasoning_chain: ["user requested update", "validated permissions", "confirmed data format"]
    source_documents: ["doc_123", "doc_456"]
    model_version: "claude-3-opus-20240229"
    prompt_hash: "sha256:abc123..."
  
  # Field 5: Resource constraints
  resource_budget:
    max_tokens: 10000
    max_cost_usd: 0.50
    max_duration_ms: 30000
    max_retries: 3
  
  # Field 6: Recovery instructions
  rollback_plan:
    strategy: "compensating_action"  # compensating_action | soft_delete | snapshot_restore
    steps:
      - action: "restore_previous_value"
        target: "orders.status"
        previous_value: "pending"
    timeout_ms: 60000
  
  # Field 7: Compliance metadata
  audit_metadata:
    initiated_by: "user_789"
    initiated_at: "2026-04-28T10:30:00Z"
    session_id: "sess_xyz"
    ip_address: "192.168.1.100"
    user_agent: "Mozilla/5.0..."
    business_justification: "Customer requested order cancellation"
  
  # Field 8: Idempotency binding
  loop_binding: "loop_exec_20260428_103000_abc123"
```

### Execution Flow

```
┌─────────────────────────────────────────────────────────────┐
│                   Action Contract Flow                       │
│                                                             │
│  ┌──────────┐    ┌──────────────┐    ┌─────────────────┐   │
│  │  Agent   │───►│  Validator   │───►│ Confidence      │   │
│  │  Action  │    │  (8 fields)  │    │ Router          │   │
│  └──────────┘    └──────────────┘    └────────┬────────┘   │
│                                               │             │
│                    ┌──────────────────────────┼─────┐       │
│                    │                          │     │       │
│              ┌─────▼─────┐  ┌─────────────┐ ┌─▼───────┐    │
│              │ >= 0.95   │  │ 0.80-0.94   │ │ < 0.80  │    │
│              │ Auto-exec │  │ Soft review │ │ Hard/   │    │
│              └─────┬─────┘  └──────┬──────┘ │ Reject  │    │
│                    │               │        └────┬────┘    │
│              ┌─────▼─────┐  ┌──────▼──────┐ ┌────▼────┐   │
│              │  Execute  │  │  Queue for  │ │  Block  │   │
│              │  + Audit  │  │  Review     │ │  + Log  │   │
│              └───────────┘  └─────────────┘ └─────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Trade-offs

| Approach | Benefit | Cost | When to Use |
|----------|---------|------|-------------|
| Full 8-field | Complete audit trail, max safety | Higher latency (~50ms), storage overhead | Production multi-tenant, regulated industries |
| Minimal (4-field) | Faster execution, simpler implementation | Limited rollback, partial audit | Internal tools, trusted environments |
| Async verification | Non-blocking, high throughput | Delayed anomaly detection | High-volume, low-risk actions |

## Web Research Queries

- "AI agent action contracts safety patterns {date}"
- "multi-tenant AI audit trail best practices {date}"
- "LLM confidence threshold production systems {date}"
- "agent rollback patterns distributed systems {date}"
