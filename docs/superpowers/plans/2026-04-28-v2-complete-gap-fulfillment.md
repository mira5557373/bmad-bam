# V2 Complete Gap Fulfillment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fill all remaining gaps in BAM V2 by consolidating Phase 0+1 patterns (20 missing) and NEXUS 40-Layer Architecture into V2-compatible format.

**Architecture:** V2 consolidation approach - instead of 30+ individual pattern files, consolidate into domain-appropriate pattern groups. NEXUS concepts integrate into existing domains (ai-runtime, security, observability) rather than creating parallel structures.

**Tech Stack:** Markdown, TOML, V2 domain/pattern structure

---

## V2 Consolidation Strategy

### Pattern Consolidation Mapping

| Phase 0+1 Patterns | V2 Target File | Rationale |
|--------------------|----------------|-----------|
| P0-01, P0-02 (AGENTS.md, llms.txt) | patterns/ai-discovery.md | AI capability publishing |
| P0-03, P0-04 (Refusal, Canary) | patterns/ai-safety.md | Agent safety controls |
| P0-05, P0-06, P0-07 (Rollback, Warmup, Flags) | patterns/ai-deployment.md | Deployment patterns |
| P0-08, P0-09, P0-10 (Burst, Context, Limits) | patterns/tenant-quotas.md | Tenant resource limits |
| P0-11, P0-12 (Edges, Idempotency) | patterns/langgraph.md (enhance) | LangGraph specifics |
| P1-01, P1-02, P1-03 (Kill Switch, Circuit, Budget) | patterns/circuit-breaker.md (enhance) | Resilience patterns |
| P1-04, P1-05, P1-06 (Timeout, Fallback, Retry) | patterns/tool-resilience.md | Tool execution safety |
| P1-07, P1-08, P1-09, P1-10, P1-11 (Health, Anomaly, Failure, MCP, Drift) | patterns/ai-observability.md | AI monitoring |
| P1-12 (Provider Quota) | patterns/provider-management.md | LLM provider patterns |
| P1-13, P1-14, P1-15 (Checkpoint, State, Interrupt) | patterns/state-management.md | Agent state patterns |
| P1-16 (Memory Lifecycle) | domains/ai-runtime.md (enhance) | Memory governance |
| P1-17, P1-18 (Grounding, Attribution) | patterns/ai-verification.md | Output verification |

### NEXUS Consolidation Mapping

| NEXUS Component | V2 Target | Rationale |
|-----------------|-----------|-----------|
| 8-Field Action Contract | patterns/action-contract.md | Core safety pattern |
| PRG Gate | domains/security.md (enhance QG-PRG) | Quality gate integration |
| 5 Runtime Loops | patterns/runtime-loops.md | Single consolidated guide |
| Tier-H Federation | patterns/federation.md | Enterprise patterns |

---

## File Structure

### New Pattern Files (10 consolidated from 30+ specs)

```
src-v2/data/patterns/
├── ai-discovery.md          # AGENTS.md, llms.txt publishing
├── ai-safety.md             # Refusal headers, canary tokens
├── ai-deployment.md         # Rollback, warmup, feature flags
├── tenant-quotas.md         # Burst protection, context budget, instance limits
├── tool-resilience.md       # Timeout, fallback, retry patterns
├── ai-observability.md      # Health, anomaly, failure detection
├── provider-management.md   # Provider quotas, routing
├── state-management.md      # Checkpoint, serialization, interrupt/resume
├── ai-verification.md       # Grounding, attribution
├── action-contract.md       # NEXUS 8-field contract
├── runtime-loops.md         # NEXUS 5 runtime loops
└── federation.md            # Tier-H federation patterns
```

### Enhanced Domain Files (3 updates)

```
src-v2/data/domains/
├── ai-runtime.md            # Add memory lifecycle governance
├── security.md              # Add PRG gate section
└── observability.md         # Add AI-specific observability
```

### Enhanced Existing Patterns (2 updates)

```
src-v2/data/patterns/
├── langgraph.md             # Add conditional edges, idempotency
└── circuit-breaker.md       # Add kill switch, fan-out patterns
```

---

## Phase 1: Core Safety Patterns

### Task 1.1: Create action-contract.md (NEXUS 8-Field)

**Files:**
- Create: `src-v2/data/patterns/action-contract.md`

- [ ] **Step 1: Create the 8-Field Action Contract pattern file**

```markdown
# Action Contract - BAM Pattern

## When to Use

- Designing AI agent action execution
- Implementing multi-tenant agent safety
- Building audit trails for AI decisions
- Signals: action contracts, agent decisions, proof certificates, compliance audit

## When NOT to Use

- Simple read-only agents with no state mutation
- Single-tenant systems without compliance requirements
- Prototypes without production safety needs

## Architecture

### The 8-Field Action Contract

Every AI agent action in a multi-tenant system MUST include these 8 fields:

| Field | Type | Purpose | Multi-Tenant Impact |
|-------|------|---------|---------------------|
| `tenant_id` | string | Tenant scope identifier | Mandatory isolation boundary |
| `action_type` | enum | Action classification | Determines approval workflow |
| `confidence` | float | Model certainty (0.0-1.0) | Triggers human review threshold |
| `proof_certificate` | object | Formal verification proof | Enables audit trail |
| `resource_budget` | object | Compute/token limits | Per-tenant quota enforcement |
| `rollback_plan` | object | Reversal strategy | Enables safe recovery |
| `audit_metadata` | object | Compliance trail | Regulatory evidence |
| `loop_binding` | enum | Runtime loop assignment | Determines execution path |

### Action Types

| Type | Risk Level | Approval Required | Use Case |
|------|------------|-------------------|----------|
| READ_ONLY | Low | None | Data queries, reports |
| WRITE_INTERNAL | Medium | Soft review | Internal state changes |
| WRITE_EXTERNAL | High | Hard review | External API calls |
| FINANCIAL | Highest | MFA + approval | Money movement |
| PRIVILEGED | Highest | Admin + MFA | System administration |

### Confidence Thresholds

| Range | Action | Rationale |
|-------|--------|-----------|
| >= 0.95 | Auto-execute | High certainty, safe to proceed |
| 0.80-0.94 | Soft review | Flag for async human review |
| 0.50-0.79 | Hard review | Block until human approves |
| < 0.50 | Reject | Insufficient confidence |

### Contract Schema

```yaml
action_contract:
  tenant_id: "tenant_abc123"
  action_type: "WRITE_EXTERNAL"
  confidence: 0.87
  proof_certificate:
    verifier: "semantic-check-v2"
    timestamp: "2026-04-28T10:00:00Z"
    hash: "sha256:abc123..."
  resource_budget:
    max_tokens: 4000
    max_duration_ms: 30000
    max_cost_usd: 0.50
  rollback_plan:
    strategy: "compensating_action"
    steps: ["revert_api_call", "notify_user"]
  audit_metadata:
    user_id: "user_123"
    session_id: "sess_456"
    compliance_tags: ["SOC2", "GDPR"]
  loop_binding: "control_loop"
```

## Trade-offs

| Approach | Pros | Cons |
|----------|------|------|
| Full 8-field | Complete audit trail | Higher latency |
| Minimal (4-field) | Faster execution | Reduced compliance |
| Async verification | No blocking | Delayed detection |

## Web Research Queries

- Search: "AI agent action contract patterns {date}"
- Search: "multi-tenant AI safety controls {date}"
- Search: "formal verification AI decisions {date}"
```

- [ ] **Step 2: Verify file created correctly**

Run: `head -30 src-v2/data/patterns/action-contract.md`

- [ ] **Step 3: Commit**

```bash
git add src-v2/data/patterns/action-contract.md
git commit -m "feat(v2): add action-contract pattern (NEXUS 8-Field)

- 8 mandatory fields for AI agent actions
- Confidence thresholds for human review
- Action type classification with risk levels
- Proof certificate and rollback plan schemas

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 1.2: Create ai-safety.md (Refusal Headers, Canary Tokens)

**Files:**
- Create: `src-v2/data/patterns/ai-safety.md`

- [ ] **Step 1: Create the AI Safety pattern file**

```markdown
# AI Safety - BAM Pattern

## When to Use

- Implementing agent refusal mechanisms
- Detecting prompt injection attacks
- Building defense-in-depth for AI systems
- Signals: refusal headers, canary tokens, prompt injection, safety controls

## When NOT to Use

- Internal-only agents with trusted inputs
- Development/testing environments
- When performance is critical and inputs are pre-validated

## Architecture

### Agent Refusal Headers

HTTP headers that communicate agent refusal decisions:

| Header | Value | Purpose |
|--------|-------|---------|
| `X-Agent-Refusal` | `true/false` | Indicates refusal occurred |
| `X-Refusal-Reason` | string | Human-readable reason |
| `X-Refusal-Code` | enum | Machine-readable code |
| `X-Refusal-Confidence` | float | Confidence in refusal decision |

### Refusal Codes

| Code | Meaning | Action |
|------|---------|--------|
| `POLICY_VIOLATION` | Content policy breach | Log + reject |
| `INJECTION_DETECTED` | Prompt injection attempt | Alert + reject |
| `RESOURCE_EXCEEDED` | Quota/budget exceeded | Throttle + reject |
| `CONFIDENCE_LOW` | Model uncertainty | Review + reject |
| `TENANT_RESTRICTED` | Tenant-specific block | Log + reject |

### Canary Token System

Invisible markers injected into agent context to detect:
- Context window leakage between tenants
- Prompt injection attempts
- Unauthorized data exfiltration

| Token Type | Format | Detection |
|------------|--------|-----------|
| Tenant boundary | `[TENANT:{id}:BOUNDARY]` | Cross-tenant leak |
| System prompt | `[SYSTEM:CANARY:{hash}]` | Prompt extraction |
| Data classification | `[DATA:{level}:MARKER]` | Data exfiltration |

### Implementation Pattern

```yaml
canary_config:
  tenant_boundary:
    enabled: true
    format: "[TENANT:{tenant_id}:BOUNDARY:{nonce}]"
    injection_points:
      - system_prompt_start
      - context_window_start
      - tool_response_wrapper
  detection:
    webhook: "/api/security/canary-alert"
    alert_channels: ["slack", "pagerduty"]
    auto_terminate: true
```

## Trade-offs

| Approach | Pros | Cons |
|----------|------|------|
| Header-based refusal | Standard HTTP, cacheable | Headers can be stripped |
| Inline canary tokens | Hard to remove | Consumes context tokens |
| External validation | Centralized policy | Added latency |

## Web Research Queries

- Search: "AI agent refusal patterns {date}"
- Search: "prompt injection detection canary tokens {date}"
- Search: "LLM safety headers API design {date}"
```

- [ ] **Step 2: Verify file created correctly**

Run: `head -30 src-v2/data/patterns/ai-safety.md`

- [ ] **Step 3: Commit**

```bash
git add src-v2/data/patterns/ai-safety.md
git commit -m "feat(v2): add ai-safety pattern (P0-03, P0-04)

- Agent refusal headers with standard codes
- Canary token injection for leak detection
- Tenant boundary and data classification markers
- Detection webhook integration

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 1.3: Create tenant-quotas.md (Burst, Context, Instance Limits)

**Files:**
- Create: `src-v2/data/patterns/tenant-quotas.md`

- [ ] **Step 1: Create the Tenant Quotas pattern file**

```markdown
# Tenant Quotas - BAM Pattern

## When to Use

- Implementing per-tenant resource limits
- Preventing noisy neighbor problems
- Building fair usage policies for multi-tenant AI
- Signals: burst protection, context budget, instance limits, quota management

## When NOT to Use

- Single-tenant deployments
- Unlimited usage tiers (enterprise with dedicated resources)
- Development environments

## Architecture

### Quota Hierarchy

```
Platform Limits (hard caps)
    └── Tier Limits (plan-based)
        └── Tenant Limits (customizable)
            └── User Limits (optional)
```

### Burst Protection

Prevent sudden spikes from overwhelming shared resources:

| Parameter | Default | Enterprise | Description |
|-----------|---------|------------|-------------|
| `requests_per_second` | 10 | 100 | Max RPS per tenant |
| `burst_multiplier` | 2x | 5x | Temporary spike allowance |
| `burst_duration_sec` | 60 | 300 | Max burst window |
| `cooldown_sec` | 300 | 60 | Post-burst recovery |

### Per-Tenant Context Window Budget

Allocate context tokens fairly across tenants:

| Tier | Context Budget | Rollover | Overage |
|------|----------------|----------|---------|
| Free | 100K tokens/day | None | Hard block |
| Pro | 1M tokens/day | 24h | Throttle |
| Enterprise | 10M tokens/day | 7d | Alert only |

### Per-Tenant Agent Instance Limits

Control concurrent agent executions:

| Resource | Free | Pro | Enterprise |
|----------|------|-----|------------|
| Concurrent agents | 1 | 5 | 50 |
| Max execution time | 30s | 5min | 30min |
| Memory per agent | 256MB | 1GB | 4GB |
| Tool calls per run | 10 | 50 | 500 |

### Implementation Schema

```yaml
tenant_quotas:
  tenant_id: "tenant_abc"
  tier: "pro"
  
  burst_protection:
    rps_limit: 50
    burst_multiplier: 3
    current_rps: 12
    in_burst_mode: false
    
  context_budget:
    daily_limit: 1000000
    used_today: 450000
    rollover_balance: 200000
    
  instance_limits:
    max_concurrent: 5
    current_active: 2
    max_execution_sec: 300
    
  enforcement:
    on_exceed: "throttle"  # block | throttle | alert
    alert_at_percent: 80
    webhook: "/api/quotas/exceeded"
```

## Trade-offs

| Approach | Pros | Cons |
|----------|------|------|
| Hard limits | Predictable costs | Poor UX at limits |
| Soft limits + alerts | Better UX | Cost overruns possible |
| Token bucket | Smooth throttling | Complex implementation |

## Web Research Queries

- Search: "multi-tenant rate limiting patterns {date}"
- Search: "LLM token budget management {date}"
- Search: "SaaS quota enforcement best practices {date}"
```

- [ ] **Step 2: Verify file created correctly**

Run: `head -30 src-v2/data/patterns/tenant-quotas.md`

- [ ] **Step 3: Commit**

```bash
git add src-v2/data/patterns/tenant-quotas.md
git commit -m "feat(v2): add tenant-quotas pattern (P0-08, P0-09, P0-10)

- Burst protection with configurable RPS limits
- Per-tenant context window budget allocation
- Agent instance limits by tier
- Enforcement strategies (block/throttle/alert)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Phase 2: Discovery & Deployment Patterns

### Task 2.1: Create ai-discovery.md (AGENTS.md, llms.txt)

**Files:**
- Create: `src-v2/data/patterns/ai-discovery.md`

- [ ] **Step 1: Create the AI Discovery pattern file**

```markdown
# AI Discovery - BAM Pattern

## When to Use

- Publishing agent capabilities for AI-to-AI discovery
- Documenting LLM constraints and configurations
- Building federated agent networks
- Signals: AGENTS.md, llms.txt, capability advertisement, MCP discovery

## When NOT to Use

- Internal-only agents not exposed externally
- Agents without stable public interfaces
- Rapid prototyping phase

## Architecture

### AGENTS.md Format

Standard file describing agent capabilities for external discovery:

```markdown
# AGENTS.md

## Agent: customer-support-v2

### Capabilities
- answer_faq: Answer frequently asked questions
- create_ticket: Create support tickets
- check_status: Check order/ticket status

### Authentication
- Type: OAuth2
- Scopes: read:tickets, write:tickets

### Rate Limits
- Requests: 100/minute
- Tokens: 50000/hour

### Contact
- Escalation: support@example.com
- Documentation: https://docs.example.com/agents
```

### llms.txt Format

Configuration file for LLM-specific constraints:

```txt
# llms.txt

[models]
primary = gpt-4-turbo
fallback = claude-3-sonnet

[context_limits]
gpt-4-turbo = 128000
claude-3-sonnet = 200000

[rate_limits]
requests_per_minute = 60
tokens_per_hour = 100000

[prompt_templates]
system = /prompts/system-v2.txt
few_shot = /prompts/examples.txt

[tenant_overrides]
enterprise_tier = unlimited_context
```

### Publishing Strategies

| Strategy | Use Case | Implementation |
|----------|----------|----------------|
| Static | Simple agents | File in repo root |
| Dynamic | Complex agents | Generated at deploy |
| Federated | Multi-tenant | Per-tenant generation |
| MCP Server | Tool discovery | MCP manifest format |

### Multi-Tenant Publishing

```yaml
publishing_config:
  strategy: "federated"
  base_path: "/.well-known/"
  
  files:
    - path: "agents.md"
      template: "agents-template.md"
      tenant_aware: true
      
    - path: "llms.txt"
      template: "llms-template.txt"
      tenant_aware: false
      
  caching:
    ttl_seconds: 3600
    invalidate_on: ["capability_change", "config_update"]
```

## Trade-offs

| Approach | Pros | Cons |
|----------|------|------|
| Static files | Simple, cacheable | Manual updates |
| Dynamic generation | Always current | Performance cost |
| MCP integration | Standard protocol | Limited adoption |

## Web Research Queries

- Search: "AGENTS.md specification AI discovery {date}"
- Search: "llms.txt LLM configuration standard {date}"
- Search: "AI agent capability advertisement {date}"
```

- [ ] **Step 2: Verify file created correctly**

Run: `head -30 src-v2/data/patterns/ai-discovery.md`

- [ ] **Step 3: Commit**

```bash
git add src-v2/data/patterns/ai-discovery.md
git commit -m "feat(v2): add ai-discovery pattern (P0-01, P0-02)

- AGENTS.md format for capability publishing
- llms.txt for LLM configuration constraints
- Federated publishing for multi-tenant
- MCP server integration option

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 2.2: Create ai-deployment.md (Rollback, Warmup, Feature Flags)

**Files:**
- Create: `src-v2/data/patterns/ai-deployment.md`

- [ ] **Step 1: Create the AI Deployment pattern file**

```markdown
# AI Deployment - BAM Pattern

## When to Use

- Deploying AI agents to production
- Managing prompt/model version rollbacks
- Implementing gradual rollouts with feature flags
- Signals: prompt rollback, model warmup, feature flags, canary deployment

## When NOT to Use

- Development environments
- Single-use batch agents
- Agents without version requirements

## Architecture

### Prompt Rollback Automation

Version control and instant rollback for prompts:

| Component | Storage | Rollback Time | Retention |
|-----------|---------|---------------|-----------|
| System prompts | Git + DB | < 1 second | 30 versions |
| Few-shot examples | Vector DB | < 5 seconds | 10 versions |
| Tool schemas | Config DB | < 1 second | 20 versions |

### Rollback Triggers

| Trigger | Threshold | Action |
|---------|-----------|--------|
| Error rate spike | > 5% (5 min window) | Auto-rollback |
| Latency increase | > 2x baseline | Alert + manual |
| User feedback | > 10 negative/hour | Alert + review |
| Cost spike | > 150% budget | Auto-rollback |

### Model Warm-up Patterns

Pre-warm models to reduce cold start latency:

```yaml
warmup_config:
  strategies:
    - name: "periodic_ping"
      interval_seconds: 300
      prompt: "Respond with 'ready'"
      
    - name: "traffic_prediction"
      model: "usage_forecast"
      pre_warm_minutes: 15
      
    - name: "geographic_distribution"
      regions: ["us-east", "eu-west", "ap-south"]
      replicas_per_region: 2
```

### Model Feature Flags

Control model behavior per tenant/segment:

| Flag | Type | Use Case |
|------|------|----------|
| `use_gpt4_turbo` | boolean | Model selection |
| `max_tool_calls` | integer | Capability limit |
| `enable_streaming` | boolean | Response format |
| `temperature_override` | float | Creativity control |

### Feature Flag Schema

```yaml
feature_flags:
  - key: "use_gpt4_turbo"
    default: false
    rules:
      - condition: "tenant.tier == 'enterprise'"
        value: true
      - condition: "tenant.id in ['beta_testers']"
        value: true
        
  - key: "enable_vision"
    default: false
    rollout:
      percentage: 25
      sticky: true  # Same user always gets same value
```

## Trade-offs

| Approach | Pros | Cons |
|----------|------|------|
| Auto-rollback | Fast recovery | False positives |
| Manual rollback | Controlled | Slower response |
| A/B testing | Data-driven | Complexity |

## Web Research Queries

- Search: "AI prompt version control rollback {date}"
- Search: "LLM model warm-up cold start {date}"
- Search: "feature flags AI agents {date}"
```

- [ ] **Step 2: Verify file created correctly**

Run: `head -30 src-v2/data/patterns/ai-deployment.md`

- [ ] **Step 3: Commit**

```bash
git add src-v2/data/patterns/ai-deployment.md
git commit -m "feat(v2): add ai-deployment pattern (P0-05, P0-06, P0-07)

- Prompt rollback automation with triggers
- Model warm-up strategies for cold start
- Feature flags for gradual rollout
- Per-tenant flag overrides

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Phase 3: Resilience Patterns

### Task 3.1: Enhance circuit-breaker.md (Add Kill Switch, Fan-Out)

**Files:**
- Modify: `src-v2/data/patterns/circuit-breaker.md`

- [ ] **Step 1: Read existing file**

Run: `cat src-v2/data/patterns/circuit-breaker.md`

- [ ] **Step 2: Enhance with Kill Switch and Fan-Out patterns**

Add the following sections after the existing content:

```markdown

---

## Kill Switch Registry (P1-01)

Emergency shutdown capability for AI agents:

### Kill Switch Levels

| Level | Scope | Activation | Recovery |
|-------|-------|------------|----------|
| Agent | Single agent instance | Immediate | Manual restart |
| Tenant | All tenant agents | Immediate | Admin approval |
| Model | Specific LLM provider | Immediate | Provider recovery |
| Global | All agents platform-wide | Immediate | Incident review |

### Kill Switch Schema

```yaml
kill_switch_registry:
  switches:
    - id: "agent_customer_support"
      level: "agent"
      status: "active"  # active | killed | degraded
      last_triggered: null
      
    - id: "tenant_abc123"
      level: "tenant"
      status: "active"
      kill_reason: null
      
    - id: "provider_openai"
      level: "model"
      status: "degraded"
      fallback: "anthropic"
      
  automation:
    cost_threshold_usd: 1000
    error_rate_threshold: 0.10
    auto_kill_enabled: true
    notification_channels: ["slack", "pagerduty"]
```

### Kill Switch Triggers

| Trigger | Threshold | Auto-Kill | Notification |
|---------|-----------|-----------|--------------|
| Cost overrun | > 200% budget | Yes | Immediate |
| Error spike | > 10% (5 min) | Yes | Immediate |
| Security alert | Any critical | Yes | Immediate |
| Manual request | Admin action | Yes | Logged |

---

## Fan-Out Circuit Breaker (P1-02)

Circuit breaker for parallel agent orchestration:

### Fan-Out Failure Modes

| Mode | Behavior | Use Case |
|------|----------|----------|
| Fail-fast | Stop all on first failure | Critical operations |
| Best-effort | Continue with partial results | Tolerant operations |
| Quorum | Require N of M success | Consensus operations |

### Fan-Out Configuration

```yaml
fan_out_breaker:
  max_parallel: 10
  failure_mode: "best-effort"
  quorum_threshold: 0.6  # 60% must succeed
  
  per_branch_limits:
    timeout_ms: 5000
    max_retries: 2
    
  circuit_breaker:
    failure_threshold: 3
    reset_timeout_sec: 30
    half_open_requests: 1
```

## Web Research Queries

- Search: "AI agent kill switch patterns {date}"
- Search: "fan-out circuit breaker distributed systems {date}"
- Search: "emergency shutdown AI systems {date}"
```

- [ ] **Step 3: Commit**

```bash
git add src-v2/data/patterns/circuit-breaker.md
git commit -m "feat(v2): enhance circuit-breaker with kill switch and fan-out (P1-01, P1-02)

- Kill switch registry with 4 levels (agent/tenant/model/global)
- Automated kill triggers for cost/error/security
- Fan-out circuit breaker for parallel orchestration
- Quorum-based failure modes

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 3.2: Create tool-resilience.md (Timeout, Fallback, Retry, Budget)

**Files:**
- Create: `src-v2/data/patterns/tool-resilience.md`

- [ ] **Step 1: Create the Tool Resilience pattern file**

```markdown
# Tool Resilience - BAM Pattern

## When to Use

- Implementing robust tool execution in AI agents
- Managing external API failures gracefully
- Building retry and fallback strategies
- Signals: tool timeout, fallback chains, retry budget, tool execution

## When NOT to Use

- Tools with guaranteed SLAs
- Synchronous-only operations
- Development/testing environments

## Architecture

### Tool Timeout Management (P1-04)

Configure timeouts per tool based on expected behavior:

| Tool Category | Default Timeout | Max Timeout | Retry on Timeout |
|---------------|-----------------|-------------|------------------|
| Database query | 5s | 30s | Yes (2x) |
| External API | 10s | 60s | Yes (1x) |
| LLM call | 30s | 120s | Yes (1x) |
| File operation | 5s | 30s | No |

### Timeout Configuration

```yaml
tool_timeouts:
  defaults:
    timeout_ms: 10000
    connect_timeout_ms: 3000
    
  per_tool:
    - tool: "search_database"
      timeout_ms: 5000
      retry_on_timeout: true
      
    - tool: "call_external_api"
      timeout_ms: 15000
      circuit_breaker: true
      
    - tool: "generate_report"
      timeout_ms: 60000
      async_fallback: true
```

### Tool Fallback Chains (P1-05)

Define fallback sequences when primary tools fail:

| Primary Tool | Fallback 1 | Fallback 2 | Final Fallback |
|--------------|------------|------------|----------------|
| GPT-4 | Claude-3 | GPT-3.5 | Cached response |
| Live API | Cached data | Degraded mode | Error message |
| Vector search | Keyword search | LLM-based | Empty results |

### Fallback Chain Schema

```yaml
fallback_chains:
  - name: "llm_generation"
    chain:
      - tool: "openai_gpt4"
        timeout_ms: 30000
      - tool: "anthropic_claude"
        timeout_ms: 30000
      - tool: "cached_response"
        condition: "cache_exists"
      - tool: "graceful_error"
        always: true
        
  - name: "data_retrieval"
    chain:
      - tool: "primary_database"
      - tool: "read_replica"
      - tool: "cached_data"
        max_age_seconds: 3600
```

### Retry Budget Engine (P1-06)

Manage retry attempts across the agent lifecycle:

| Resource | Budget | Refill Rate | Scope |
|----------|--------|-------------|-------|
| Tool retries | 10 | 1/minute | Per agent run |
| LLM retries | 5 | 1/minute | Per agent run |
| API retries | 20 | 5/minute | Per tenant |

### Retry Budget Schema

```yaml
retry_budget:
  per_agent_run:
    tool_retries: 10
    llm_retries: 5
    total_retries: 15
    
  per_tenant:
    api_retries: 100
    refill_rate: 10  # per minute
    
  retry_strategy:
    backoff: "exponential"
    base_delay_ms: 100
    max_delay_ms: 10000
    jitter: true
```

### Tool Budget Guards (P1-03)

Prevent runaway tool execution costs:

| Guard | Threshold | Action |
|-------|-----------|--------|
| Token budget | 10000 tokens/run | Warn at 80%, block at 100% |
| Cost budget | $1.00/run | Alert at 80%, block at 100% |
| Call count | 50 calls/run | Block at limit |
| Time budget | 5 minutes | Terminate at limit |

## Trade-offs

| Approach | Pros | Cons |
|----------|------|------|
| Aggressive retries | Higher success rate | Cost/latency increase |
| Fast fallback | Quick recovery | May miss transient issues |
| Budget guards | Cost control | May interrupt valid operations |

## Web Research Queries

- Search: "AI agent tool timeout patterns {date}"
- Search: "fallback chain design patterns {date}"
- Search: "retry budget distributed systems {date}"
```

- [ ] **Step 2: Verify file created correctly**

Run: `head -30 src-v2/data/patterns/tool-resilience.md`

- [ ] **Step 3: Commit**

```bash
git add src-v2/data/patterns/tool-resilience.md
git commit -m "feat(v2): add tool-resilience pattern (P1-03, P1-04, P1-05, P1-06)

- Tool timeout management per category
- Fallback chains with degraded modes
- Retry budget engine with refill rates
- Tool budget guards for cost control

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Phase 4: Observability Patterns

### Task 4.1: Create ai-observability.md (Health, Anomaly, Failure, MCP, Drift)

**Files:**
- Create: `src-v2/data/patterns/ai-observability.md`

- [ ] **Step 1: Create the AI Observability pattern file**

```markdown
# AI Observability - BAM Pattern

## When to Use

- Monitoring AI agent health and performance
- Detecting anomalies in tenant usage
- Identifying invisible failures in LLM responses
- Signals: health monitoring, anomaly detection, failure detection, output drift

## When NOT to Use

- Development environments without production load
- Short-lived batch processes
- Agents without SLA requirements

## Architecture

### LLM Provider Health Dashboard (P1-07)

Monitor provider availability and performance:

| Metric | Normal | Warning | Critical |
|--------|--------|---------|----------|
| Availability | > 99.9% | 99-99.9% | < 99% |
| P50 latency | < 500ms | 500-1000ms | > 1000ms |
| P99 latency | < 2000ms | 2-5s | > 5s |
| Error rate | < 0.1% | 0.1-1% | > 1% |

### Provider Health Schema

```yaml
provider_health:
  providers:
    - name: "openai"
      endpoints:
        - url: "api.openai.com"
          check_interval_sec: 30
      current_status: "healthy"
      metrics:
        availability_30d: 99.95
        p50_latency_ms: 450
        error_rate: 0.05
        
    - name: "anthropic"
      endpoints:
        - url: "api.anthropic.com"
          check_interval_sec: 30
      current_status: "healthy"
```

### Tenant Usage Anomaly Detection (P1-08)

Detect unusual patterns per tenant:

| Anomaly Type | Detection Method | Action |
|--------------|------------------|--------|
| Usage spike | > 3 std dev from baseline | Alert |
| Off-hours activity | Outside normal patterns | Log + review |
| New tool usage | Tools not previously used | Monitor |
| Geographic anomaly | Unexpected location | Alert + review |

### Anomaly Detection Schema

```yaml
anomaly_detection:
  per_tenant:
    baseline_window_days: 30
    detection_sensitivity: "medium"  # low | medium | high
    
  rules:
    - name: "usage_spike"
      metric: "requests_per_hour"
      threshold: "3_std_dev"
      action: "alert"
      
    - name: "cost_spike"
      metric: "daily_cost_usd"
      threshold: "200_percent_baseline"
      action: "alert_and_throttle"
```

### Invisible Failure Detector (P1-09)

Detect failures that don't raise errors:

| Failure Type | Detection | Example |
|--------------|-----------|---------|
| Empty response | Response length = 0 | LLM returns nothing |
| Refusal pattern | Regex match | "I cannot help with..." |
| Hallucination | Fact verification | Incorrect claims |
| Loop detection | Repetition analysis | Same response 3x |

### MCP Server Health Monitoring (P1-10)

Monitor MCP tool server availability:

```yaml
mcp_health:
  servers:
    - name: "database_tools"
      endpoint: "mcp://localhost:8080"
      tools: ["query", "insert", "update"]
      health_check:
        interval_sec: 60
        timeout_ms: 5000
        
  alerting:
    on_unavailable: "pagerduty"
    on_degraded: "slack"
```

### Output Drift Monitor (P1-11)

Track changes in agent output characteristics:

| Metric | Baseline | Drift Threshold |
|--------|----------|-----------------|
| Avg response length | 500 chars | ±30% |
| Sentiment score | 0.65 | ±0.2 |
| Tool usage rate | 40% | ±20% |
| Confidence distribution | Normal | KL divergence > 0.1 |

## Trade-offs

| Approach | Pros | Cons |
|----------|------|------|
| Real-time monitoring | Instant detection | Higher resource cost |
| Batch analysis | Lower cost | Delayed detection |
| ML-based anomaly | Adaptive | Requires training data |

## Web Research Queries

- Search: "LLM provider health monitoring {date}"
- Search: "AI agent anomaly detection patterns {date}"
- Search: "invisible failure detection LLM {date}"
- Search: "output drift monitoring AI systems {date}"
```

- [ ] **Step 2: Verify file created correctly**

Run: `head -30 src-v2/data/patterns/ai-observability.md`

- [ ] **Step 3: Commit**

```bash
git add src-v2/data/patterns/ai-observability.md
git commit -m "feat(v2): add ai-observability pattern (P1-07 through P1-11)

- LLM provider health dashboard metrics
- Tenant usage anomaly detection
- Invisible failure detector for silent errors
- MCP server health monitoring
- Output drift monitor for quality tracking

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Phase 5: State & Provider Management

### Task 5.1: Create provider-management.md (P1-12)

**Files:**
- Create: `src-v2/data/patterns/provider-management.md`

- [ ] **Step 1: Create the Provider Management pattern file**

```markdown
# Provider Management - BAM Pattern

## When to Use

- Managing multiple LLM provider quotas
- Implementing intelligent routing between providers
- Optimizing cost across providers
- Signals: provider quota, model routing, cost optimization, multi-provider

## When NOT to Use

- Single provider deployments
- Fixed provider requirements
- Cost-insensitive applications

## Architecture

### Provider Quota Management

Track and manage quotas across LLM providers:

| Provider | Quota Type | Limit | Reset Period |
|----------|------------|-------|--------------|
| OpenAI | Tokens | 1M/day | Daily |
| OpenAI | Requests | 10K/min | Per minute |
| Anthropic | Tokens | 500K/day | Daily |
| Azure OpenAI | Tokens | 2M/day | Daily |

### Quota Tracking Schema

```yaml
provider_quotas:
  providers:
    - name: "openai"
      quotas:
        - type: "tokens"
          limit: 1000000
          period: "daily"
          current_usage: 450000
          reset_at: "2026-04-29T00:00:00Z"
          
        - type: "requests"
          limit: 10000
          period: "minute"
          current_usage: 45
          
    - name: "anthropic"
      quotas:
        - type: "tokens"
          limit: 500000
          period: "daily"
          current_usage: 200000
          
  routing_strategy:
    primary: "openai"
    overflow: "anthropic"
    overflow_threshold: 0.8  # 80% of quota
```

### Intelligent Routing

Route requests based on cost, latency, and availability:

| Factor | Weight | Description |
|--------|--------|-------------|
| Cost | 0.4 | Price per token |
| Latency | 0.3 | P50 response time |
| Availability | 0.2 | Current health status |
| Quota headroom | 0.1 | Remaining quota % |

### Routing Decision Schema

```yaml
routing_config:
  strategy: "weighted_score"
  
  weights:
    cost: 0.4
    latency: 0.3
    availability: 0.2
    quota_headroom: 0.1
    
  constraints:
    - "availability > 0.95"
    - "quota_headroom > 0.1"
    
  fallback_order:
    - "openai"
    - "anthropic"
    - "azure_openai"
```

### Cost Optimization

| Strategy | Description | Savings |
|----------|-------------|---------|
| Prompt caching | Cache common prompt prefixes | 20-40% |
| Model tiering | Use smaller models for simple tasks | 30-50% |
| Batch requests | Combine multiple requests | 10-20% |
| Off-peak routing | Use cheaper providers at off-peak | 15-25% |

## Trade-offs

| Approach | Pros | Cons |
|----------|------|------|
| Cost-first routing | Lowest cost | Higher latency |
| Latency-first | Best UX | Higher cost |
| Single provider | Simpler | No redundancy |

## Web Research Queries

- Search: "LLM provider quota management {date}"
- Search: "multi-provider AI routing patterns {date}"
- Search: "LLM cost optimization strategies {date}"
```

- [ ] **Step 2: Verify file created correctly**

Run: `head -30 src-v2/data/patterns/provider-management.md`

- [ ] **Step 3: Commit**

```bash
git add src-v2/data/patterns/provider-management.md
git commit -m "feat(v2): add provider-management pattern (P1-12)

- Provider quota tracking and management
- Intelligent routing with weighted scoring
- Cost optimization strategies
- Multi-provider fallback configuration

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 5.2: Create state-management.md (Checkpoint, Serialization, Interrupt)

**Files:**
- Create: `src-v2/data/patterns/state-management.md`

- [ ] **Step 1: Create the State Management pattern file**

```markdown
# State Management - BAM Pattern

## When to Use

- Implementing checkpoints in long-running agents
- Serializing state for multi-tenant isolation
- Building interrupt/resume capabilities
- Signals: checkpoint, state serialization, interrupt, resume, persistence

## When NOT to Use

- Stateless agents
- Short-lived operations (< 30 seconds)
- Agents without recovery requirements

## Architecture

### LangGraph Checkpoint Persistence (P1-13)

Store graph state for resumption:

| Storage Backend | Latency | Durability | Multi-Tenant |
|-----------------|---------|------------|--------------|
| Redis | < 5ms | Low | Yes (key prefix) |
| PostgreSQL | < 20ms | High | Yes (RLS) |
| DynamoDB | < 10ms | High | Yes (partition key) |

### Checkpoint Schema

```yaml
checkpoint_config:
  backend: "postgresql"
  
  storage:
    table: "agent_checkpoints"
    partition_key: "tenant_id"
    sort_key: "checkpoint_id"
    
  serialization:
    format: "json"
    compression: "gzip"
    encryption: "aes-256-gcm"
    
  retention:
    max_checkpoints_per_run: 100
    max_age_hours: 168  # 7 days
    cleanup_schedule: "0 2 * * *"  # 2 AM daily
```

### State Serialization Multi-Tenant (P1-14)

Ensure tenant isolation in serialized state:

| Requirement | Implementation |
|-------------|----------------|
| Tenant isolation | Encrypt with tenant-specific key |
| Cross-tenant prevention | Validate tenant_id on deserialize |
| Audit trail | Log all state access |
| Data residency | Store in tenant's region |

### Serialization Schema

```yaml
state_serialization:
  format: "json"
  
  tenant_isolation:
    encryption_key_source: "tenant_kms_key"
    validate_on_deserialize: true
    
  schema:
    version: 1
    fields:
      - name: "tenant_id"
        required: true
        indexed: true
      - name: "agent_state"
        encrypted: true
      - name: "metadata"
        encrypted: false
        
  validation:
    max_state_size_bytes: 10485760  # 10MB
    schema_validation: true
```

### Interrupt/Resume Patterns (P1-15)

Handle agent interruption gracefully:

| Interrupt Type | Trigger | Resume Behavior |
|----------------|---------|-----------------|
| User-initiated | Cancel button | Resume from last checkpoint |
| Timeout | Max execution time | Resume or abort based on config |
| System | Deployment/scaling | Auto-resume from checkpoint |
| Error | Unrecoverable error | Abort with notification |

### Interrupt Handler Schema

```yaml
interrupt_handling:
  on_user_cancel:
    save_checkpoint: true
    cleanup_resources: true
    notify_user: true
    
  on_timeout:
    action: "checkpoint_and_abort"
    max_execution_sec: 300
    warning_at_sec: 240
    
  on_system_interrupt:
    action: "checkpoint_and_queue_resume"
    resume_delay_sec: 30
    max_resume_attempts: 3
    
  resume_config:
    validate_checkpoint: true
    replay_last_action: false
    notify_on_resume: true
```

## Trade-offs

| Approach | Pros | Cons |
|----------|------|------|
| Frequent checkpoints | Fine-grained recovery | Storage/latency cost |
| End-only checkpoints | Low overhead | Loses progress on failure |
| Async checkpoints | No latency impact | May lose recent state |

## Web Research Queries

- Search: "LangGraph checkpoint persistence patterns {date}"
- Search: "multi-tenant state serialization {date}"
- Search: "AI agent interrupt resume patterns {date}"
```

- [ ] **Step 2: Verify file created correctly**

Run: `head -30 src-v2/data/patterns/state-management.md`

- [ ] **Step 3: Commit**

```bash
git add src-v2/data/patterns/state-management.md
git commit -m "feat(v2): add state-management pattern (P1-13, P1-14, P1-15)

- LangGraph checkpoint persistence backends
- Multi-tenant state serialization with encryption
- Interrupt/resume handling patterns
- Retention and cleanup policies

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Phase 6: Verification Patterns

### Task 6.1: Create ai-verification.md (Grounding, Attribution)

**Files:**
- Create: `src-v2/data/patterns/ai-verification.md`

- [ ] **Step 1: Create the AI Verification pattern file**

```markdown
# AI Verification - BAM Pattern

## When to Use

- Verifying LLM outputs against source data
- Implementing attribution for generated content
- Building fact-checking pipelines
- Signals: grounding verification, attribution, fact-checking, source tracking

## When NOT to Use

- Creative content generation without factual requirements
- Chat applications without accuracy requirements
- Development/testing environments

## Architecture

### Grounding Verifier (P1-17)

Verify LLM claims against source documents:

| Verification Level | Method | Latency | Accuracy |
|--------------------|--------|---------|----------|
| Lexical | String matching | < 10ms | Low |
| Semantic | Embedding similarity | < 100ms | Medium |
| Entailment | NLI model | < 500ms | High |
| Hybrid | All methods combined | < 700ms | Highest |

### Grounding Schema

```yaml
grounding_config:
  enabled: true
  
  verification_levels:
    - level: "lexical"
      min_overlap: 0.3
      
    - level: "semantic"
      model: "text-embedding-3-small"
      similarity_threshold: 0.85
      
    - level: "entailment"
      model: "nli-deberta-v3"
      confidence_threshold: 0.9
      
  on_ungrounded:
    action: "flag_and_continue"  # flag_and_continue | block | request_source
    require_human_review: true
    
  sources:
    - type: "vector_store"
      collection: "knowledge_base"
    - type: "database"
      table: "verified_facts"
```

### Chunk-Level Attribution (P1-18)

Track source attribution at the chunk level:

| Attribution Type | Granularity | Storage |
|------------------|-------------|---------|
| Document-level | Whole document | Document ID |
| Page-level | Page within document | Document ID + Page |
| Chunk-level | Specific text chunk | Chunk ID + offset |
| Sentence-level | Individual sentences | Chunk ID + sentence index |

### Attribution Schema

```yaml
attribution_config:
  granularity: "chunk"
  
  tracking:
    store_embeddings: true
    store_original_text: true
    max_sources_per_claim: 5
    
  output_format:
    include_inline: true  # [1], [2] style citations
    include_footer: true  # Full source list at end
    
  schema:
    attribution:
      claim: "string"
      sources:
        - source_id: "string"
          chunk_id: "string"
          text_snippet: "string"
          confidence: "float"
          page_number: "int"
```

### Verification Pipeline

```yaml
verification_pipeline:
  steps:
    - name: "extract_claims"
      model: "gpt-4"
      prompt: "Extract factual claims from this text"
      
    - name: "retrieve_sources"
      method: "hybrid_search"
      top_k: 10
      
    - name: "verify_grounding"
      method: "entailment"
      threshold: 0.9
      
    - name: "generate_attribution"
      format: "inline_and_footer"
      
  on_failure:
    ungrounded_threshold: 0.3  # Max 30% ungrounded claims
    action: "reject_with_feedback"
```

## Trade-offs

| Approach | Pros | Cons |
|----------|------|------|
| Real-time verification | Immediate feedback | Latency cost |
| Post-hoc verification | No latency impact | Delayed detection |
| Strict grounding | High accuracy | May over-reject |

## Web Research Queries

- Search: "LLM grounding verification patterns {date}"
- Search: "RAG attribution chunk-level tracking {date}"
- Search: "AI fact-checking pipelines {date}"
```

- [ ] **Step 2: Verify file created correctly**

Run: `head -30 src-v2/data/patterns/ai-verification.md`

- [ ] **Step 3: Commit**

```bash
git add src-v2/data/patterns/ai-verification.md
git commit -m "feat(v2): add ai-verification pattern (P1-17, P1-18)

- Grounding verifier with multiple verification levels
- Chunk-level attribution tracking
- Verification pipeline configuration
- Source confidence scoring

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Phase 7: NEXUS Runtime Patterns

### Task 7.1: Create runtime-loops.md (NEXUS 5 Loops)

**Files:**
- Create: `src-v2/data/patterns/runtime-loops.md`

- [ ] **Step 1: Create the Runtime Loops pattern file**

```markdown
# Runtime Loops - BAM Pattern

## When to Use

- Implementing NEXUS 40-Layer Architecture
- Building production-grade agent orchestration
- Designing multi-tenant agent lifecycle management
- Signals: runtime loops, request loop, control loop, learning loop, agent lifecycle

## When NOT to Use

- Simple single-shot agents
- Prototypes without production requirements
- Agents without learning/adaptation needs

## Architecture

### The 5 Runtime Loops

NEXUS defines 5 concurrent runtime loops for production AI agents:

| Loop | Purpose | Frequency | Tenant Scope |
|------|---------|-----------|--------------|
| Request | Handle user requests | Per request | Per-tenant |
| Control | Monitor and adjust | 1-10 Hz | Global + per-tenant |
| Learning | Adapt and improve | Batch | Global |
| Economic | Manage costs/quotas | 1-60 Hz | Per-tenant |
| Recovery | Handle failures | Event-driven | Global + per-tenant |

### Request Loop

Handles individual agent requests:

```yaml
request_loop:
  stages:
    - name: "validate"
      actions: ["auth", "rate_limit", "input_validation"]
      timeout_ms: 100
      
    - name: "enrich"
      actions: ["load_context", "retrieve_memory", "apply_tenant_config"]
      timeout_ms: 500
      
    - name: "execute"
      actions: ["run_agent", "tool_calls", "generate_response"]
      timeout_ms: 30000
      
    - name: "finalize"
      actions: ["save_memory", "emit_metrics", "audit_log"]
      timeout_ms: 200
```

### Control Loop

Monitors and adjusts agent behavior:

```yaml
control_loop:
  frequency_hz: 1
  
  monitors:
    - name: "error_rate"
      threshold: 0.05
      action: "reduce_traffic"
      
    - name: "latency_p99"
      threshold_ms: 5000
      action: "scale_out"
      
    - name: "cost_rate"
      threshold_usd_per_min: 10
      action: "enable_caching"
      
  adjustments:
    - trigger: "high_load"
      actions: ["increase_concurrency", "enable_queue"]
    - trigger: "degraded_provider"
      actions: ["switch_provider", "enable_fallback"]
```

### Learning Loop

Adapts agent behavior over time:

```yaml
learning_loop:
  schedule: "0 2 * * *"  # 2 AM daily
  
  tasks:
    - name: "prompt_optimization"
      method: "dspy_compile"
      metric: "task_success_rate"
      
    - name: "few_shot_selection"
      method: "embedding_cluster"
      source: "successful_interactions"
      
    - name: "tool_usage_analysis"
      method: "usage_pattern_mining"
      output: "tool_recommendations"
      
  deployment:
    strategy: "canary"
    canary_percent: 10
    validation_period_hours: 24
```

### Economic Loop

Manages costs and quotas:

```yaml
economic_loop:
  frequency_hz: 0.1  # Every 10 seconds
  
  tracking:
    - metric: "token_usage"
      scope: "per_tenant"
      budget: "from_tier_config"
      
    - metric: "api_cost"
      scope: "platform"
      budget: 10000  # USD per day
      
  actions:
    on_budget_warning:  # 80%
      - "enable_caching"
      - "prefer_cheaper_model"
      
    on_budget_exceeded:  # 100%
      - "throttle_requests"
      - "queue_non_critical"
```

### Recovery Loop

Handles failures and recovery:

```yaml
recovery_loop:
  triggers:
    - event: "agent_failure"
      action: "retry_with_backoff"
      max_attempts: 3
      
    - event: "provider_outage"
      action: "failover_to_backup"
      automatic: true
      
    - event: "data_corruption"
      action: "restore_from_checkpoint"
      notify: true
      
  health_checks:
    - name: "agent_heartbeat"
      interval_sec: 30
      timeout_sec: 5
      
    - name: "provider_health"
      interval_sec: 60
      endpoints: ["openai", "anthropic"]
```

## Trade-offs

| Loop Configuration | Pros | Cons |
|--------------------|------|------|
| High frequency control | Fast response | CPU overhead |
| Aggressive learning | Rapid improvement | Risk of regression |
| Strict economic limits | Cost control | User impact |

## Web Research Queries

- Search: "AI agent runtime loop architecture {date}"
- Search: "production agent orchestration patterns {date}"
- Search: "multi-tenant agent lifecycle management {date}"
```

- [ ] **Step 2: Verify file created correctly**

Run: `head -30 src-v2/data/patterns/runtime-loops.md`

- [ ] **Step 3: Commit**

```bash
git add src-v2/data/patterns/runtime-loops.md
git commit -m "feat(v2): add runtime-loops pattern (NEXUS 5 Loops)

- Request loop with validation/enrich/execute/finalize stages
- Control loop for monitoring and adjustment
- Learning loop for continuous improvement
- Economic loop for cost management
- Recovery loop for failure handling

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 7.2: Create federation.md (Tier-H)

**Files:**
- Create: `src-v2/data/patterns/federation.md`

- [ ] **Step 1: Create the Federation pattern file**

```markdown
# Federation - BAM Pattern

## When to Use

- Building enterprise-tier multi-region deployments
- Implementing agent federation across organizations
- Designing cross-tenant agent collaboration
- Signals: federation, tier-h, multi-region, cross-organization, agent mesh

## When NOT to Use

- Single-region deployments
- Single-organization use cases
- Agents without external collaboration needs

## Architecture

### Tier-H Federation Model

Enterprise tier enabling cross-organization agent collaboration:

| Capability | Standard | Enterprise | Tier-H (Federation) |
|------------|----------|------------|---------------------|
| Regions | 1 | 3 | Unlimited |
| Data residency | Shared | Dedicated | Per-tenant region |
| Agent sharing | None | Internal | Cross-org federation |
| Custom models | No | Limited | Full |

### Federation Architecture

```
┌─────────────────────────────────────────────────────────┐
│                 Federation Control Plane                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │  Policy  │  │  Route   │  │  Audit   │              │
│  │  Engine  │  │  Mesh    │  │  Logger  │              │
│  └──────────┘  └──────────┘  └──────────┘              │
└─────────────────────────────────────────────────────────┘
        │                │                │
        ▼                ▼                ▼
┌───────────────┐ ┌───────────────┐ ┌───────────────┐
│   Org A       │ │   Org B       │ │   Org C       │
│  ┌─────────┐  │ │  ┌─────────┐  │ │  ┌─────────┐  │
│  │ Agent 1 │  │ │  │ Agent 2 │  │ │  │ Agent 3 │  │
│  └─────────┘  │ │  └─────────┘  │ │  └─────────┘  │
│  Region: US   │ │  Region: EU   │ │  Region: APAC │
└───────────────┘ └───────────────┘ └───────────────┘
```

### Federation Configuration

```yaml
federation_config:
  enabled: true
  tier: "tier-h"
  
  control_plane:
    endpoint: "federation.example.com"
    auth: "mtls"
    
  policies:
    - name: "data_residency"
      rules:
        - org: "org_eu"
          allowed_regions: ["eu-west-1", "eu-central-1"]
        - org: "org_us"
          allowed_regions: ["us-east-1", "us-west-2"]
          
    - name: "agent_sharing"
      rules:
        - from_org: "org_a"
          to_org: "org_b"
          agents: ["support_agent"]
          permissions: ["invoke", "read_status"]
          
  routing:
    strategy: "latency_aware"
    fallback: "home_region"
```

### Cross-Organization Agent Invocation

```yaml
cross_org_invocation:
  protocol: "grpc"
  
  authentication:
    method: "jwt_with_org_claims"
    token_issuer: "federation.example.com"
    
  authorization:
    check_policy: true
    audit_all_calls: true
    
  request_schema:
    from_org: "string"
    to_org: "string"
    agent_id: "string"
    action: "string"
    payload: "object"
    trace_context: "object"
    
  response_schema:
    status: "success | error | pending"
    result: "object"
    audit_id: "string"
```

### Data Residency Enforcement

| Requirement | Implementation |
|-------------|----------------|
| Data stays in region | Encrypt with region-specific keys |
| Cross-region queries | Federated query with result aggregation |
| Audit logging | Log to tenant's region |
| Backup/DR | Cross-region replication with encryption |

## Trade-offs

| Approach | Pros | Cons |
|----------|------|------|
| Full federation | Maximum flexibility | Complexity, latency |
| Hub-and-spoke | Simpler management | Single point of failure |
| Isolated regions | Strongest isolation | No cross-region features |

## Web Research Queries

- Search: "multi-tenant federation patterns {date}"
- Search: "cross-organization AI agent collaboration {date}"
- Search: "data residency multi-region architecture {date}"
```

- [ ] **Step 2: Verify file created correctly**

Run: `head -30 src-v2/data/patterns/federation.md`

- [ ] **Step 3: Commit**

```bash
git add src-v2/data/patterns/federation.md
git commit -m "feat(v2): add federation pattern (NEXUS Tier-H)

- Tier-H enterprise federation model
- Cross-organization agent invocation
- Data residency enforcement
- Federation control plane architecture

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Phase 8: Enhance Existing Files

### Task 8.1: Enhance langgraph.md (Add Conditional Edges, Idempotency)

**Files:**
- Modify: `src-v2/data/patterns/langgraph.md`

- [ ] **Step 1: Read existing file**

Run: `cat src-v2/data/patterns/langgraph.md`

- [ ] **Step 2: Add Conditional Edges and Idempotency sections**

Append the following content:

```markdown

---

## Conditional Edge Patterns (P0-11)

Advanced routing in LangGraph graphs:

### Edge Types

| Type | Use Case | Example |
|------|----------|---------|
| Static | Fixed routing | `node_a -> node_b` |
| Conditional | Based on state | `if error: retry else: continue` |
| Map-reduce | Parallel processing | Fan-out to N nodes, collect results |
| Cycle | Iterative refinement | Loop until condition met |

### Conditional Edge Schema

```python
def route_based_on_confidence(state):
    if state["confidence"] >= 0.95:
        return "execute"
    elif state["confidence"] >= 0.8:
        return "review"
    else:
        return "reject"

graph.add_conditional_edges(
    "evaluate",
    route_based_on_confidence,
    {
        "execute": "execute_node",
        "review": "human_review_node",
        "reject": "rejection_node"
    }
)
```

### Multi-Tenant Conditional Routing

```yaml
tenant_routing:
  conditions:
    - name: "tier_based_model"
      check: "tenant.tier"
      routes:
        enterprise: "gpt4_node"
        pro: "gpt35_node"
        free: "cached_node"
        
    - name: "feature_flag"
      check: "tenant.features.advanced_tools"
      routes:
        true: "advanced_tools_node"
        false: "basic_tools_node"
```

---

## Tool Idempotency Guarantees (P0-12)

Ensure tool calls can be safely retried:

### Idempotency Strategies

| Strategy | Implementation | Use Case |
|----------|----------------|----------|
| Idempotency key | Client-generated UUID | Writes, payments |
| Conditional update | Version/etag check | Database updates |
| Deduplication window | Time-based check | Event processing |

### Idempotency Schema

```yaml
idempotency_config:
  enabled: true
  
  key_generation:
    method: "uuid_v4"
    include_in_header: "X-Idempotency-Key"
    
  storage:
    backend: "redis"
    ttl_seconds: 86400  # 24 hours
    
  per_tool:
    - tool: "create_order"
      idempotent: true
      key_source: "request.order_id"
      
    - tool: "send_notification"
      idempotent: true
      dedup_window_sec: 60
      
    - tool: "read_data"
      idempotent: false  # Naturally idempotent
```

## Web Research Queries

- Search: "LangGraph conditional edge patterns {date}"
- Search: "AI tool idempotency patterns {date}"
```

- [ ] **Step 3: Commit**

```bash
git add src-v2/data/patterns/langgraph.md
git commit -m "feat(v2): enhance langgraph with conditional edges and idempotency (P0-11, P0-12)

- Conditional edge routing patterns
- Multi-tenant routing based on tier/features
- Tool idempotency guarantees
- Deduplication strategies

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 8.2: Enhance ai-runtime domain (Add Memory Lifecycle)

**Files:**
- Modify: `src-v2/data/domains/ai-runtime.md`

- [ ] **Step 1: Read existing file**

Run: `cat src-v2/data/domains/ai-runtime.md`

- [ ] **Step 2: Add Memory Lifecycle Governance section**

Append the following content:

```markdown

---

## Memory Lifecycle Governance (P1-16)

Manage agent memory across its lifecycle:

### Memory Types

| Type | Scope | Persistence | Multi-Tenant |
|------|-------|-------------|--------------|
| Working | Single run | None | Isolated |
| Short-term | Session | Session duration | Isolated |
| Long-term | Cross-session | Persistent | Isolated + shared |
| Episodic | Event-based | Selective | Isolated |

### Lifecycle Stages

```
Create → Populate → Query → Update → Archive → Delete
```

| Stage | Trigger | Tenant Considerations |
|-------|---------|----------------------|
| Create | Agent start | Initialize with tenant context |
| Populate | Tool results, user input | Tag with tenant_id |
| Query | Context retrieval | RLS filtering |
| Update | Learning, correction | Audit logging |
| Archive | Retention policy | Tenant-specific rules |
| Delete | GDPR, offboarding | Cascade to all stores |

### Memory Governance Schema

```yaml
memory_governance:
  policies:
    - tier: "free"
      working_memory_limit: "10MB"
      long_term_retention_days: 30
      
    - tier: "pro"
      working_memory_limit: "100MB"
      long_term_retention_days: 365
      
    - tier: "enterprise"
      working_memory_limit: "1GB"
      long_term_retention_days: "custom"
      
  lifecycle:
    auto_archive_after_days: 90
    auto_delete_after_days: 365
    gdpr_delete_on_request: true
    
  isolation:
    method: "tenant_id_prefix"
    cross_tenant_sharing: false
    audit_all_access: true
```

### Memory Quality Management

| Check | Frequency | Action on Failure |
|-------|-----------|-------------------|
| Relevance decay | Daily | Archive stale memories |
| Contradiction detection | On update | Flag for review |
| Embedding drift | Weekly | Re-embed if threshold exceeded |
| Size monitoring | Hourly | Alert if approaching limit |

## Web Research Queries

- Search: "AI agent memory lifecycle management {date}"
- Search: "multi-tenant memory isolation patterns {date}"
- Search: "LLM context management best practices {date}"
```

- [ ] **Step 3: Commit**

```bash
git add src-v2/data/domains/ai-runtime.md
git commit -m "feat(v2): enhance ai-runtime with memory lifecycle governance (P1-16)

- Memory types (working, short-term, long-term, episodic)
- Lifecycle stages with tenant considerations
- Tier-based retention policies
- Memory quality management checks

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 8.3: Enhance security domain (Add PRG Gate)

**Files:**
- Modify: `src-v2/data/domains/security.md`

- [ ] **Step 1: Read existing file**

Run: `cat src-v2/data/domains/security.md`

- [ ] **Step 2: Add PRG Gate section**

Append the following content:

```markdown

---

## Production Readiness Gate (PRG)

Final gate before production deployment:

### PRG Check Categories

| Category | Weight | Critical | Description |
|----------|--------|----------|-------------|
| Security | 25% | Yes | Auth, encryption, audit |
| Reliability | 25% | Yes | Failover, recovery, monitoring |
| Performance | 20% | No | Latency, throughput, scaling |
| Compliance | 20% | Yes | Regulatory, data residency |
| Operations | 10% | No | Runbooks, alerts, on-call |

### PRG Checklist

```yaml
prg_gate:
  version: "1.0"
  
  security:
    - check: "auth_implemented"
      critical: true
      evidence: "auth_test_results"
      
    - check: "encryption_at_rest"
      critical: true
      evidence: "encryption_config"
      
    - check: "audit_logging"
      critical: true
      evidence: "audit_log_sample"
      
  reliability:
    - check: "failover_tested"
      critical: true
      evidence: "failover_runbook_execution"
      
    - check: "recovery_time_met"
      critical: true
      threshold: "< 15 minutes"
      
    - check: "monitoring_configured"
      critical: true
      evidence: "dashboard_screenshots"
      
  performance:
    - check: "latency_slo_met"
      critical: false
      threshold: "p99 < 2s"
      
    - check: "throughput_tested"
      critical: false
      threshold: "> 100 rps"
      
  compliance:
    - check: "data_residency_verified"
      critical: true
      evidence: "region_config"
      
    - check: "gdpr_compliance"
      critical: true
      evidence: "dpa_signed"
      
  operations:
    - check: "runbooks_complete"
      critical: false
      evidence: "runbook_links"
      
    - check: "on_call_configured"
      critical: false
      evidence: "pagerduty_schedule"
```

### PRG Outcome Matrix

| Score | Outcome | Action |
|-------|---------|--------|
| 100% critical + >80% total | PASS | Deploy to production |
| 100% critical + 60-80% total | CONDITIONAL | Deploy with remediation plan |
| <100% critical | FAIL | Block deployment |

### PRG Automation

```yaml
prg_automation:
  ci_integration:
    pipeline_stage: "pre-production"
    block_on_fail: true
    
  evidence_collection:
    auto_collect: ["test_results", "config_files"]
    require_manual: ["runbook_review", "compliance_sign_off"]
    
  reporting:
    generate_report: true
    notify_stakeholders: ["security", "ops", "compliance"]
```

## Web Research Queries

- Search: "production readiness checklist AI systems {date}"
- Search: "deployment gate best practices {date}"
- Search: "AI compliance production requirements {date}"
```

- [ ] **Step 3: Commit**

```bash
git add src-v2/data/domains/security.md
git commit -m "feat(v2): enhance security with PRG gate (NEXUS)

- Production Readiness Gate checklist
- 5 check categories with weights
- Critical vs non-critical checks
- PRG automation in CI/CD

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Phase 9: Final Validation

### Task 9.1: Validate all new pattern files

**Files:**
- Validate: All new pattern files

- [ ] **Step 1: Count pattern files**

Run: `ls -la src-v2/data/patterns/*.md | wc -l`

Expected: 22 files (10 original + 12 new)

- [ ] **Step 2: Verify all patterns have required sections**

Run: `for f in src-v2/data/patterns/*.md; do echo "=== $f ==="; grep -c "## When to Use\|## Architecture\|## Trade-offs\|## Web Research" "$f"; done`

Expected: Each file should have 4+ matches

- [ ] **Step 3: Verify no empty files**

Run: `find src-v2/data/patterns -name "*.md" -empty`

Expected: No output (no empty files)

- [ ] **Step 4: Commit validation results**

```bash
git add .
git commit -m "chore(v2): validate pattern file completeness

- 22 pattern files present
- All have required sections
- No empty files

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Summary

| Phase | Tasks | Files | Patterns Covered |
|-------|-------|-------|------------------|
| 1 | 1.1-1.3 | 3 new | Action contract, AI safety, tenant quotas |
| 2 | 2.1-2.2 | 2 new | AI discovery, AI deployment |
| 3 | 3.1-3.2 | 1 enhanced, 1 new | Circuit breaker+, tool resilience |
| 4 | 4.1 | 1 new | AI observability |
| 5 | 5.1-5.2 | 2 new | Provider mgmt, state mgmt |
| 6 | 6.1 | 1 new | AI verification |
| 7 | 7.1-7.2 | 2 new | Runtime loops, federation |
| 8 | 8.1-8.3 | 3 enhanced | LangGraph+, ai-runtime+, security+ |
| 9 | 9.1 | validation | All patterns |

**Total: 12 new pattern files + 4 enhanced files = 16 file operations**

**Patterns covered: All 30 Phase 0+1 patterns + NEXUS 40-Layer components**
