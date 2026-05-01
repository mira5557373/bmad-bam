---
pattern_id: chain-of-thought
shortcode: ZCT
category: advanced-ai
qg_ref: QG-AI1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Chain of Thought - BAM Pattern

**Loaded by:** ZCT  
**Applies to:** Reasoning transparency, step-by-step thinking, audit trail

---

## When to Use

- Complex reasoning tasks requiring explainability
- Regulated environments needing decision audit trails
- Tasks where reasoning quality impacts outcomes
- Multi-tenant systems requiring per-tenant reasoning logs
- Debugging and improving agent decision quality

## When NOT to Use

- Simple factual retrieval
- Real-time responses where latency is critical
- Tasks where reasoning transparency is not required
- Token-constrained environments without budget for reasoning

## Architecture

### Reasoning Capture Model

```
┌─────────────────────────────────────────────────────────────────┐
│                  Chain of Thought Executor                       │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    Input Processing                       │    │
│  │  Question/Task ──► Context Assembly ──► Prompt Build     │    │
│  └─────────────────────────────────────────────────────────┘    │
│                              │                                   │
│                              ▼                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                  Reasoning Engine                         │    │
│  │  ┌─────────┐    ┌─────────┐    ┌─────────┐              │    │
│  │  │ Step 1  │───►│ Step 2  │───►│ Step N  │              │    │
│  │  │Think... │    │Think... │    │Think... │              │    │
│  │  └────┬────┘    └────┬────┘    └────┬────┘              │    │
│  │       │              │              │                    │    │
│  │       ▼              ▼              ▼                    │    │
│  │  ┌─────────────────────────────────────────────────┐    │    │
│  │  │           Reasoning Trace Collector              │    │    │
│  │  │  step_id │ thought │ confidence │ evidence       │    │    │
│  │  └─────────────────────────────────────────────────┘    │    │
│  └─────────────────────────────────────────────────────────┘    │
│                              │                                   │
│                              ▼                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                  Output & Audit                          │    │
│  │  Final Answer + Reasoning Trace + Confidence Score       │    │
│  │  Stored with tenant_id for audit compliance              │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

### Reasoning Step Structure

| Field | Type | Description |
|-------|------|-------------|
| step_id | int | Sequential step number |
| thought | string | Reasoning content for this step |
| conclusion | string | Intermediate conclusion reached |
| confidence | float | 0.0-1.0 confidence in this step |
| evidence | array | Supporting facts/references |
| alternatives | array | Other options considered |

### Multi-Tenant Isolation

```
┌──────────────────────────────────────────────────────────┐
│                    Tenant A Reasoning                     │
│  trace_id: tr_a_001                                       │
│  tenant_id: tenant_a                                      │
│  ┌────────────────────────────────────────────────────┐  │
│  │ Step 1: Analyzing customer data patterns...        │  │
│  │ Step 2: Comparing against historical trends...     │  │
│  │ Step 3: Generating recommendation...               │  │
│  └────────────────────────────────────────────────────┘  │
│                          ▲                                │
│                          │ ISOLATED                       │
│                          ▼                                │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│                    Tenant B Reasoning                     │
│  trace_id: tr_b_002                                       │
│  tenant_id: tenant_b                                      │
│  ┌────────────────────────────────────────────────────┐  │
│  │ Step 1: Evaluating risk factors...                 │  │
│  │ Step 2: Checking compliance requirements...        │  │
│  │ Step 3: Formulating response...                    │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

## Configuration Schema

```yaml
bam_controlled: true

chain_of_thought:
  prompting:
    # CoT trigger phrases
    think_prefix: "Let me think through this step by step:"
    step_prefix: "Step {n}:"
    conclusion_prefix: "Therefore,"
    
    # Structured output format
    output_format:
      include_reasoning: true
      include_confidence: true
      include_alternatives: true
      max_steps: 10
      
  tenant_config:
    tier_reasoning_limits:
      free:
        max_reasoning_steps: 3
        store_traces: false
        audit_retention_days: 0
        
      pro:
        max_reasoning_steps: 7
        store_traces: true
        audit_retention_days: 30
        
      enterprise:
        max_reasoning_steps: 15
        store_traces: true
        audit_retention_days: 365
        compliance_export: true
        
  trace_storage:
    backend: "postgres"  # or "elasticsearch", "s3"
    table: "reasoning_traces"
    partition_by: "tenant_id"
    index_fields: ["tenant_id", "created_at", "task_type"]
    
  audit_compliance:
    enabled: true
    immutable_traces: true
    hash_verification: true
    export_formats: ["json", "csv", "pdf"]
    
  quality_scoring:
    enabled: true
    metrics:
      - step_coherence
      - evidence_support
      - conclusion_validity
      - confidence_calibration
```

### Reasoning Trace Schema

```yaml
reasoning_trace:
  trace_id: "tr_uuid_001"
  tenant_id: "tenant_123"
  request_id: "req_abc"
  created_at: "2026-04-30T10:30:00Z"
  
  input:
    task: "Analyze customer churn risk"
    context_tokens: 1500
    
  reasoning:
    steps:
      - step_id: 1
        thought: "First, I'll examine the customer's engagement metrics..."
        conclusion: "Engagement has declined 40% over 3 months"
        confidence: 0.92
        evidence:
          - "Login frequency: 12/month to 5/month"
          - "Feature usage: 8 features to 2 features"
        alternatives: []
        
      - step_id: 2
        thought: "Next, I'll compare against churn indicators..."
        conclusion: "Pattern matches high-risk churn profile"
        confidence: 0.87
        evidence:
          - "Historical data: 78% of similar patterns churned"
          - "Support tickets increased 3x"
        alternatives:
          - "Could be seasonal variation (confidence: 0.15)"
          
      - step_id: 3
        thought: "Finally, I'll formulate a recommendation..."
        conclusion: "Recommend proactive outreach intervention"
        confidence: 0.85
        evidence:
          - "Intervention success rate: 45% retention"
          
  output:
    final_answer: "High churn risk - recommend proactive outreach"
    overall_confidence: 0.88
    reasoning_quality_score: 0.91
    
  metadata:
    model: "claude-3-5-sonnet"
    total_tokens: 2800
    latency_ms: 3200
    cost_usd: 0.042
```

## Trade-offs

| Approach | Benefit | Cost |
|----------|---------|------|
| Verbose reasoning | Full transparency | Higher token usage |
| Compressed reasoning | Token efficiency | Less explainability |
| Stored traces | Audit compliance | Storage costs |
| Real-time display | User engagement | Latency perception |
| Batch reasoning | Cost efficiency | Delayed insights |

## Prompt Engineering Techniques

| Technique | Description | When to Use |
|-----------|-------------|-------------|
| Zero-shot CoT | "Let's think step by step" | Simple reasoning |
| Few-shot CoT | Examples with reasoning | Complex domains |
| Self-consistency | Multiple reasoning paths | High-stakes decisions |
| Tree of Thought | Branching reasoning | Exploratory problems |
| Plan-and-Solve | Decompose then solve | Multi-part problems |


## Quality Checks

- [ ] Prompt templates versioned and tested
- [ ] Output quality metrics defined
- [ ] Fallback strategies configured
- [ ] Token usage tracked per tenant
- [ ] **CRITICAL:** No hallucination in critical outputs

## Web Research Queries

- "chain of thought prompting patterns {date}"
- "LLM reasoning transparency audit {date}"
- "step by step reasoning LLM best practices {date}"
- "explainable AI chain of thought {date}"
- "multi-tenant reasoning trace storage {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-AI1 | Reasoning traces isolated by tenant |
| QG-AI1 | Audit trails meet compliance requirements |
| QG-AI1 | Confidence scores calibrated and accurate |

## Related Patterns

- [prompt-chaining.md](prompt-chaining.md) - Sequential prompt orchestration
- [reasoning-trace-collector.md](reasoning-trace-collector.md) - Trace collection
- [decision-verification.md](decision-verification.md) - Pre-execution gates
- [ai-observability.md](ai-observability.md) - AI telemetry
