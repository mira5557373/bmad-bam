# Step 2: Design Metering Events

Define the metering event structure and collection strategy:

## Metering Event Schema

```json
{
  "event_id": "evt_abc123xyz",
  "event_type": "resource_usage",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "tenant_id": "tenant_def456",
  "resource": {
    "type": "llm_tokens",
    "subtype": "output",
    "quantity": 1500,
    "unit": "tokens"
  },
  "context": {
    "agent_id": "agent_ghi789",
    "conversation_id": "conv_jkl012",
    "user_id": "user_mno345",
    "request_id": "req_pqr678"
  },
  "metadata": {
    "model": "claude-3-sonnet",
    "duration_ms": 2500
  },
  "idempotency_key": "tenant_def456:req_pqr678:llm_tokens:output"
}
```

## Event Types

### Instant Events (Real-time)
```yaml
instant_events:
  - api_request_completed
  - agent_invocation_completed
  - tool_execution_completed
  - webhook_delivered
  - llm_call_completed
  - embedding_generated
```

### Periodic Events (Sampled)
```yaml
periodic_events:
  - storage_usage_snapshot (hourly)
  - active_connections_count (every 5 minutes)
  - cache_usage_snapshot (hourly)
  - vector_count_snapshot (daily)
```

## Event Collection Pipeline

```
Application Code
    │
    ├── Instant Events ──► Event Queue (Redis/Kafka) ──► Event Processor
    │                                                          │
    └── Periodic Events ──► Scheduled Job ─────────────────────┘
                                                               │
                                                               ▼
                                                    Usage Aggregation Store
                                                         (ClickHouse)
                                                               │
                                                               ▼
                                                    Billing System Integration
```

## Event Emission Patterns

### Synchronous Emission (Critical Events)
```python
# For billing-critical events, emit synchronously with retry
def emit_metering_event(event: MeteringEvent):
    try:
        meter_service.emit(event, retries=3)
    except MeteringError:
        # Queue for retry, don't fail the request
        dead_letter_queue.enqueue(event)
        log.error("Metering event failed, queued for retry")
```

### Asynchronous Emission (High-Volume Events)
```python
# For high-volume events, buffer and batch emit
async def emit_metering_event_async(event: MeteringEvent):
    await event_buffer.add(event)
    if event_buffer.should_flush():
        await meter_service.emit_batch(event_buffer.flush())
```

## Idempotency Handling

```yaml
idempotency:
  # Key format for deduplication
  key_format: "{tenant_id}:{request_id}:{resource_type}:{subtype}"
  
  # Deduplication window
  window: 24_hours
  
  # Storage for idempotency keys
  storage: Redis SET with TTL
  
  # On duplicate detection
  action: skip_and_log
```

## Event Validation Rules

```yaml
validation:
  required_fields:
    - event_id
    - event_type
    - timestamp
    - tenant_id
    - resource.type
    - resource.quantity
    - resource.unit
    
  quantity_bounds:
    llm_tokens: [1, 100000]
    api_requests: [1, 1]
    storage_bytes: [0, 1099511627776]  # 1TB max
    
  timestamp_drift:
    max_future: 5_minutes
    max_past: 24_hours
```

## Event Enrichment

```yaml
enrichment:
  # Add billing period
  - field: billing_period
    source: timestamp -> YYYY-MM
    
  # Add tier at time of event
  - field: tenant_tier_at_event
    source: lookup(tenant_id)
    
  # Add pricing version
  - field: pricing_version
    source: current_pricing_version()
```
