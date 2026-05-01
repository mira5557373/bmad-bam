---
pattern_id: prompt-chaining
shortcode: ZPC
category: advanced-ai
qg_ref: QG-AI1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Prompt Chaining - BAM Pattern

**Loaded by:** ZPC  
**Applies to:** Sequential prompt orchestration, multi-step reasoning, context passing

---

## When to Use

- Multi-step task decomposition requiring sequential LLM calls
- Complex reasoning that exceeds single-prompt context limits
- Workflows requiring intermediate validation between steps
- Tenant-scoped chain execution with step-level cost tracking
- Building reusable prompt pipelines for common operations

## When NOT to Use

- Simple single-prompt tasks
- Real-time responses where latency is critical
- Tasks without clear step boundaries
- When chain state persistence is not required

## Architecture

### Chain Execution Model

```
┌─────────────────────────────────────────────────────────────────┐
│                    Prompt Chain Orchestrator                     │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    Chain Definition                        │   │
│  │  step_1 ──► step_2 ──► step_3 ──► ... ──► step_n         │   │
│  └──────────────────────────────────────────────────────────┘   │
│                              │                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                  Tenant Context Layer                      │   │
│  │  tenant_id │ tier │ rate_limits │ cost_budget              │   │
│  └──────────────────────────────────────────────────────────┘   │
│                              │                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                   Step Execution                           │   │
│  │  ┌─────────┐    ┌─────────┐    ┌─────────┐               │   │
│  │  │ Input   │───►│ Prompt  │───►│ Output  │               │   │
│  │  │ Context │    │ Execute │    │ Validate│               │   │
│  │  └─────────┘    └────┬────┘    └────┬────┘               │   │
│  │                      │              │                      │   │
│  │               ┌──────▼──────────────▼──────┐              │   │
│  │               │    Chain State Manager     │              │   │
│  │               │  - Step outputs            │              │   │
│  │               │  - Accumulated context     │              │   │
│  │               │  - Cost tracking           │              │   │
│  │               └────────────────────────────┘              │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### Context Passing Strategies

| Strategy | Description | Use Case |
|----------|-------------|----------|
| Full Forward | Pass all previous outputs to next step | Small chains, full context needed |
| Selective Forward | Pass only relevant outputs | Large chains, context window limits |
| Summarized Forward | Summarize previous outputs | Long chains, token optimization |
| Reference Forward | Pass references, retrieve on demand | Very large contexts, RAG-backed |

### Chain State Schema

```yaml
chain_state:
  chain_id: "chain_uuid"
  tenant_id: "tenant_123"
  created_at: "2026-04-30T10:00:00Z"
  status: "running"
  current_step: 2
  
  steps:
    - step_id: 1
      name: "analyze_input"
      status: "completed"
      input_tokens: 1500
      output_tokens: 800
      cost_usd: 0.023
      output:
        summary: "..."
        entities: [...]
        
    - step_id: 2
      name: "generate_plan"
      status: "running"
      started_at: "2026-04-30T10:00:15Z"
      
  context:
    accumulated_tokens: 2300
    total_cost_usd: 0.023
    budget_remaining_usd: 0.977
    
  config:
    max_steps: 10
    step_timeout_seconds: 30
    retry_policy: "exponential_backoff"
    on_error: "pause_and_notify"
```

## Configuration Schema

```yaml
bam_controlled: true

prompt_chaining:
  chain_definitions:
    - name: "document_analysis"
      description: "Multi-step document processing"
      steps:
        - id: 1
          name: "extract_structure"
          prompt_template: "templates/extract_structure.md"
          validation:
            required_fields: ["sections", "headings"]
            max_output_tokens: 2000
            
        - id: 2
          name: "analyze_content"
          prompt_template: "templates/analyze_content.md"
          context_from: [1]
          context_strategy: "selective"
          select_fields: ["sections"]
          
        - id: 3
          name: "generate_summary"
          prompt_template: "templates/generate_summary.md"
          context_from: [1, 2]
          context_strategy: "summarized"
          
  tenant_config:
    tier_limits:
      free:
        max_chain_length: 3
        max_concurrent_chains: 1
        step_timeout_seconds: 15
        
      pro:
        max_chain_length: 10
        max_concurrent_chains: 5
        step_timeout_seconds: 30
        
      enterprise:
        max_chain_length: 50
        max_concurrent_chains: 20
        step_timeout_seconds: 60
        
  error_handling:
    retry_policy:
      max_retries: 3
      backoff_multiplier: 2
      initial_delay_ms: 1000
      
    on_step_failure:
      - log_error
      - save_state
      - notify_tenant
      - optional: rollback_to_checkpoint
      
  cost_tracking:
    enabled: true
    per_step: true
    budget_enforcement: true
    alert_threshold_percent: 80
```

## Trade-offs

| Approach | Benefit | Cost |
|----------|---------|------|
| Full context forwarding | Complete information | Higher token costs |
| Selective forwarding | Token efficiency | May lose relevant context |
| Checkpoint-based | Recovery capability | Storage overhead |
| Parallel step execution | Faster completion | Complex dependency management |
| Sequential execution | Simple, predictable | Slower overall |

## Error Handling Patterns

| Error Type | Detection | Recovery |
|------------|-----------|----------|
| Step timeout | Deadline exceeded | Retry with extended timeout or skip |
| Output validation failure | Schema mismatch | Retry with refined prompt |
| Context overflow | Token limit exceeded | Truncate or summarize context |
| Budget exceeded | Cost tracking | Pause and notify, request approval |
| LLM provider error | API error codes | Fallback provider or retry |


## Quality Checks

- [ ] Prompt templates versioned and tested
- [ ] Output quality metrics defined
- [ ] Fallback strategies configured
- [ ] Token usage tracked per tenant
- [ ] **CRITICAL:** No hallucination in critical outputs

## Web Research Queries

- "prompt chaining orchestration patterns {date}"
- "LangChain prompt pipeline patterns {date}"
- "sequential LLM prompt patterns {date}"
- "multi-step reasoning prompt engineering {date}"
- "context passing prompt chains {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-AI1 | Chain execution respects tenant isolation |
| QG-AI1 | Step outputs validated before context passing |
| QG-AI1 | Cost tracking per tenant per chain step |

## Related Patterns

- [chain-of-thought.md](chain-of-thought.md) - Reasoning chain patterns
- [agent-orchestration.md](agent-orchestration.md) - Multi-agent coordination
- [state-management.md](state-management.md) - State persistence
- [cost-attribution-engine.md](cost-attribution-engine.md) - Cost tracking
