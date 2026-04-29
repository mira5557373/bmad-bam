# State Management - BAM Pattern

**Loaded by:** ZSS  
**Applies to:** Checkpoint persistence, multi-tenant state serialization, interrupt/resume  
**See also:** [runtime-loops.md](runtime-loops.md) (Control Loop checkpoint usage)

---

## When to Use

- Implementing durable checkpoints for long-running agent workflows
- Serializing state in multi-tenant environments with isolation requirements
- Enabling interrupt/resume for human-in-the-loop patterns
- Recovery from failures without losing workflow progress
- Audit trail requirements for agent execution history
- Cross-session workflow continuation

## When NOT to Use

- Stateless agents with no recovery requirements
- Short-lived operations completing in seconds
- Single-request/response patterns without workflow state
- Development/testing with ephemeral state acceptable
- Real-time streaming where latency from persistence is unacceptable

## Architecture

### LangGraph Checkpoint Persistence (P1-13)

Durable state storage for long-running agent workflows with configurable backends.

#### Storage Backends

| Backend | Latency | Durability | Multi-Tenant | Best For |
|---------|---------|------------|--------------|----------|
| Redis | ~1ms | Configurable (AOF/RDB) | Via key prefix | Low-latency, short-lived workflows |
| PostgreSQL | ~5-10ms | ACID guaranteed | RLS policies | Compliance, audit requirements |
| DynamoDB | ~5ms | Multi-AZ durable | Partition key | Serverless, auto-scaling |
| SQLite | ~1ms | File-based | Separate files | Local development, testing |
| Custom | Varies | Implementation-dependent | Custom | Specialized requirements |

#### Checkpoint Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    Checkpoint Lifecycle                          │
│                                                                  │
│  Agent Step ──► State Change ──► Serialize ──► Persist          │
│       │                              │             │             │
│       │                         Tenant ID      Backend           │
│       │                         Injected       Selected          │
│       │                              │             │             │
│       ▼                              ▼             ▼             │
│  Next Step ◄── Deserialize ◄─── Load from ◄── Query by          │
│       │                         Storage      Thread ID           │
│       │                              │                           │
│       └──────────────────────────────┴──────────────────────────┤
│                                                                  │
│  On Failure: Resume from last checkpoint                         │
└─────────────────────────────────────────────────────────────────┘
```

#### Checkpoint Schema

```yaml
checkpoint_config:
  backend: enum[redis, postgresql, dynamodb, sqlite, custom]
  
  storage:
    redis:
      host: string
      port: int
      db: int
      key_prefix: "tenant:{tenant_id}:checkpoint:"
      ttl_seconds: int  # Optional expiration
    
    postgresql:
      connection_string: string
      schema: string  # Optional, for schema-per-tenant
      table: "checkpoints"
      use_rls: bool  # Enable row-level security
    
    dynamodb:
      table_name: string
      partition_key: "tenant_id"
      sort_key: "thread_id"
      region: string
  
  serialization:
    format: enum[json, msgpack, pickle]
    compression: enum[none, gzip, lz4]
    max_size_bytes: int
    encryption:
      enabled: bool
      key_id: string  # KMS key reference
  
  retention:
    max_checkpoints_per_thread: int
    ttl_days: int
    archive_to: string  # Optional cold storage
    cleanup_strategy: enum[fifo, lru, time_based]
  
  metadata:
    include_timestamps: bool
    include_step_name: bool
    include_parent_id: bool  # For branching workflows
```

### State Serialization Multi-Tenant (P1-14)

Ensures tenant data isolation during state serialization and deserialization.

#### Multi-Tenant Requirements

| Requirement | Implementation | Verification |
|-------------|----------------|--------------|
| Tenant isolation | Tenant ID in all state keys | Query audit logs |
| Cross-tenant prevention | Validation layer on load | Integration tests |
| Audit trail | Timestamp + actor on all writes | Compliance reports |
| Data residency | Region-aware storage routing | Infrastructure config |
| Encryption at rest | Per-tenant keys (optional) | Security audit |

#### Tenant-Aware Serialization Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                 Multi-Tenant Serialization                       │
│                                                                  │
│  ┌──────────┐    ┌──────────────┐    ┌──────────────┐           │
│  │  Agent   │───►│   Serialize  │───►│   Encrypt    │           │
│  │  State   │    │   + Tenant   │    │  (Optional)  │           │
│  └──────────┘    │     ID       │    └──────┬───────┘           │
│                  └──────────────┘           │                    │
│                                             ▼                    │
│                               ┌──────────────────────┐          │
│                               │   Tenant-Partitioned │          │
│                               │       Storage        │          │
│                               │  ┌───┐ ┌───┐ ┌───┐  │          │
│                               │  │ A │ │ B │ │ C │  │          │
│                               │  └───┘ └───┘ └───┘  │          │
│                               └──────────────────────┘          │
│                                             │                    │
│  ┌──────────┐    ┌──────────────┐    ┌──────┴───────┐           │
│  │  Agent   │◄───│  Deserialize │◄───│   Decrypt    │           │
│  │  State   │    │  + Validate  │    │  + Verify    │           │
│  └──────────┘    │   Tenant     │    │   Tenant     │           │
│                  └──────────────┘    └──────────────┘           │
│                                                                  │
│  CRITICAL: Tenant ID validation on EVERY deserialization         │
└─────────────────────────────────────────────────────────────────┘
```

#### Serialization Schema

```yaml
tenant_serialization:
  tenant_isolation:
    strategy: enum[key_prefix, schema, database]
    tenant_id_field: "tenant_id"
    validate_on_load: true  # REQUIRED for security
    reject_cross_tenant: true  # REQUIRED for security
  
  schema:
    version: string
    migrations:
      auto_migrate: bool
      migration_path: string
    compatibility:
      forward: bool  # Can new code read old state?
      backward: bool  # Can old code read new state?
  
  validation:
    schema_validation: bool
    tenant_boundary_check: bool
    max_state_size_bytes: int
    allowed_types: string[]  # Whitelist serializable types
  
  audit:
    log_serialization: bool
    log_deserialization: bool
    include_state_hash: bool  # For integrity verification
    retention_days: int
```

### Interrupt/Resume Patterns (P1-15)

Enables graceful workflow interruption and resumption for various scenarios.

#### Interrupt Types

| Type | Trigger | Behavior | Resume Strategy |
|------|---------|----------|-----------------|
| User-initiated | User requests pause/cancel | Checkpoint + acknowledge | Manual resume command |
| Timeout | Execution exceeds limit | Checkpoint + timeout state | Auto-retry with backoff |
| System | Deployment, scaling event | Checkpoint + drain | Auto-resume on new instance |
| Error | Recoverable failure | Checkpoint + error state | Retry from checkpoint |
| Human-in-loop | Approval/input required | Checkpoint + wait state | Resume on input received |

#### Interrupt/Resume Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    Interrupt/Resume Flow                         │
│                                                                  │
│  Running ──► Interrupt Signal ──► Checkpoint State               │
│     │              │                     │                       │
│     │        ┌─────┴─────┐               │                       │
│     │        │   Type?   │               │                       │
│     │        └─────┬─────┘               │                       │
│     │    ┌─────────┼─────────┐           │                       │
│     │    ▼         ▼         ▼           │                       │
│     │  User     Timeout    System        │                       │
│     │    │         │         │           │                       │
│     │    ▼         ▼         ▼           ▼                       │
│     │  Await    Schedule   Mark for    Store in                  │
│     │  Resume   Retry      Drain       Backend                   │
│     │    │         │         │           │                       │
│     │    └─────────┼─────────┘           │                       │
│     │              ▼                     │                       │
│     │        Wait for Resume ◄───────────┘                       │
│     │              │                                             │
│     │              ▼                                             │
│     │    ┌─────────────────┐                                     │
│     │    │  Resume Signal  │                                     │
│     │    └────────┬────────┘                                     │
│     │             ▼                                              │
│     │    Load Checkpoint ──► Validate State ──► Continue         │
│     │             │                                              │
│     └─────────────┴──────────────────────────────────────────────┤
│                                                                  │
│  All interrupts create durable checkpoints                       │
└─────────────────────────────────────────────────────────────────┘
```

#### Interrupt Handler Schema

```yaml
interrupt_config:
  on_user_cancel:
    checkpoint: true
    cleanup_resources: true
    notify_channels: string[]
    final_state: enum[cancelled, paused, abandoned]
    retention_days: int  # How long to keep cancelled state
  
  on_timeout:
    checkpoint: true
    timeout_seconds: int
    retry:
      enabled: bool
      max_attempts: int
      backoff: enum[linear, exponential]
      backoff_base_seconds: int
    escalation:
      notify_after_attempts: int
      channels: string[]
  
  on_system_interrupt:
    checkpoint: true
    drain_timeout_seconds: int
    graceful_shutdown: bool
    requeue_incomplete: bool
    signal_handlers:
      - SIGTERM
      - SIGINT
  
  on_error:
    checkpoint_on_error: bool
    error_categories:
      retryable:
        - "rate_limit"
        - "timeout"
        - "connection_error"
      fatal:
        - "validation_error"
        - "authentication_error"
    retry_config:
      max_attempts: int
      backoff_multiplier: float
  
  resume_config:
    auto_resume: bool
    resume_timeout_seconds: int
    validation_on_resume: bool
    state_version_check: bool
    notify_on_resume: bool
    resume_hooks:
      pre_resume: string  # Function/endpoint to call
      post_resume: string

  human_in_loop:
    checkpoint_on_wait: true
    wait_timeout_hours: int
    reminder_intervals: int[]  # Hours between reminders
    escalation_after_hours: int
    default_action_on_timeout: enum[cancel, approve, escalate]
```

### Combined State Management Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                 Unified State Management                         │
│                                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │   Agent     │  │  Interrupt  │  │   Resume    │              │
│  │  Execution  │  │   Handler   │  │   Handler   │              │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘              │
│         │                │                │                      │
│         ▼                ▼                ▼                      │
│  ┌─────────────────────────────────────────────────┐            │
│  │           State Serialization Layer             │            │
│  │  ┌─────────────────────────────────────────┐   │            │
│  │  │  Tenant Isolation + Schema Validation   │   │            │
│  │  └─────────────────────────────────────────┘   │            │
│  └──────────────────────┬──────────────────────────┘            │
│                         │                                        │
│                         ▼                                        │
│  ┌─────────────────────────────────────────────────┐            │
│  │           Checkpoint Persistence Layer          │            │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────────┐     │            │
│  │  │  Redis  │  │ Postgres│  │  DynamoDB   │     │            │
│  │  └─────────┘  └─────────┘  └─────────────┘     │            │
│  └─────────────────────────────────────────────────┘            │
│                         │                                        │
│                         ▼                                        │
│  ┌─────────────────────────────────────────────────┐            │
│  │              Audit + Metrics                    │            │
│  │   Checkpoint count, resume rate, failure rate   │            │
│  └─────────────────────────────────────────────────┘            │
└─────────────────────────────────────────────────────────────────┘
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Frequent checkpoints | Fast recovery, minimal lost work | Storage cost, latency overhead | Critical workflows, long-running |
| End-only checkpoints | Low overhead, simple | More lost work on failure | Short workflows, low-risk |
| Async checkpoints | No latency impact on main path | Eventual consistency, complexity | High-throughput, latency-sensitive |
| Per-tenant encryption | Maximum isolation, compliance | Key management overhead, latency | Regulated industries, enterprise |
| Shared encryption | Simpler key management | Reduced tenant isolation | Cost-sensitive, trusted tenants |
| Eager resume | Fast recovery | Resource spike on restart | Small state, few interrupted |
| Lazy resume | Smooth resource usage | Slower individual recovery | Large state, many interrupted |

## Web Research Queries

- "LangGraph checkpoint persistence production patterns {date}"
- "multi-tenant state serialization isolation {date}"
- "agent workflow interrupt resume patterns {date}"
- "durable execution frameworks comparison {date}"
- "temporal vs langgraph state management {date}"
- "human in the loop agent checkpoint patterns {date}"
- "distributed state management multi-tenant SaaS {date}"
