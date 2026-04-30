---
pattern_id: ai-observability
shortcode: ZOB
category: observability
qg_ref: QG-AI2
version: 1.0.0
last_reviewed: 2026-04-29
---

# AI Observability - BAM Pattern

**Loaded by:** ZAO  
**Applies to:** AI agent health monitoring, anomaly detection, invisible failure detection, output drift

---

## When to Use

- Monitoring AI agent health and performance in production
- Detecting anomalies in tenant usage patterns
- Identifying invisible failures in LLM responses (empty, refusals, hallucinations)
- Tracking MCP server availability for tool execution
- Monitoring output quality drift over time
- Building observability for multi-tenant AI platforms with SLA requirements

## When NOT to Use

- Development environments without production-like load
- Short-lived batch processes without SLA requirements
- Prototypes and proof-of-concepts
- Single-user internal tools without monitoring needs
- Agents running exclusively in synchronous debug mode

## Architecture

### LLM Provider Health Dashboard (P1-07)

Monitor provider availability and performance across all LLM providers:

| Metric | Normal | Warning | Critical | Alert Latency |
|--------|--------|---------|----------|---------------|
| Availability | > 99.9% | 99-99.9% | < 99% | Immediate |
| P50 latency | < 500ms | 500-1000ms | > 1000ms | 5 min window |
| P99 latency | < 2000ms | 2-5s | > 5s | 5 min window |
| Error rate | < 0.1% | 0.1-1% | > 1% | 1 min window |
| Token throughput | Baseline | -20% | -50% | 10 min window |

### Provider Health Schema

```yaml
provider_health:
  providers:
    - name: "openai"
      endpoints:
        - url: "api.openai.com"
          check_interval_sec: 30
          timeout_ms: 5000
      current_status: "healthy"  # healthy | degraded | unhealthy
      metrics:
        availability_30d: 99.95
        p50_latency_ms: 450
        p99_latency_ms: 1800
        error_rate_1h: 0.05
        tokens_per_second: 12500
      last_incident:
        timestamp: "2026-04-20T15:30:00Z"
        duration_minutes: 12
        impact: "degraded"
        
    - name: "anthropic"
      endpoints:
        - url: "api.anthropic.com"
          check_interval_sec: 30
          timeout_ms: 5000
      current_status: "healthy"
      metrics:
        availability_30d: 99.97
        p50_latency_ms: 380
        p99_latency_ms: 1500
        error_rate_1h: 0.02
        tokens_per_second: 15000
        
  dashboard:
    refresh_interval_sec: 10
    retention_days: 90
    comparison_baseline: "7d_rolling_avg"
    
  alerting:
    channels: ["slack", "pagerduty"]
    escalation:
      warning: "slack_only"
      critical: "slack_and_pagerduty"
    on_call_schedule: "platform_team"
```

### Tenant Usage Anomaly Detection (P1-08)

Detect unusual patterns per tenant to identify abuse, compromised accounts, or system issues:

| Anomaly Type | Detection Method | Threshold | Action |
|--------------|------------------|-----------|--------|
| Usage spike | > 3 std dev from baseline | 3 sigma | Alert + investigate |
| Off-hours activity | Outside tenant's normal hours | Historical pattern | Log + review |
| New tool usage | Tools not previously used by tenant | First occurrence | Monitor closely |
| Geographic anomaly | Request from unexpected location | IP geolocation | Alert + MFA prompt |
| Cost spike | > 200% of daily average | 2x baseline | Alert + throttle |
| Request pattern change | Significant shift in request types | ML model | Flag for review |

### Anomaly Detection Schema

```yaml
anomaly_detection:
  per_tenant:
    baseline_window_days: 30
    detection_sensitivity: "medium"  # low | medium | high
    min_data_points: 100  # Require N points before alerting
    
  rules:
    - name: "usage_spike"
      metric: "requests_per_hour"
      detection: "z_score"
      threshold: 3.0  # 3 standard deviations
      action: "alert"
      cooldown_minutes: 60
      
    - name: "cost_spike"
      metric: "daily_cost_usd"
      detection: "percentage_increase"
      threshold: 200  # 200% of baseline
      action: "alert_and_throttle"
      auto_throttle_percent: 50
      
    - name: "off_hours_activity"
      metric: "request_count"
      detection: "time_pattern"
      baseline_hours: "tenant_business_hours"
      action: "log_and_review"
      
    - name: "geographic_anomaly"
      metric: "request_origin_ip"
      detection: "geo_deviation"
      allowed_variance_km: 500
      action: "alert_and_mfa"
      
    - name: "tool_usage_change"
      metric: "tool_call_distribution"
      detection: "distribution_shift"
      threshold_kl_divergence: 0.5
      action: "flag_for_review"
      
  ml_models:
    enabled: true
    model_type: "isolation_forest"
    retrain_schedule: "weekly"
    feature_set: ["request_count", "token_usage", "error_rate", "response_time", "tool_distribution"]
```

### Invisible Failure Detector (P1-09)

Detect failures that don't raise explicit errors but indicate degraded quality:

| Failure Type | Detection Method | Threshold | Example |
|--------------|------------------|-----------|---------|
| Empty response | Response length = 0 | Any occurrence | LLM returns nothing |
| Refusal pattern | Regex match on common refusals | Pattern match | "I cannot help with..." |
| Hallucination | Fact verification against sources | Confidence < 0.5 | Incorrect factual claims |
| Loop detection | Repetition analysis | 3+ similar responses | Same response repeated |
| Truncation | Response ends mid-sentence | Grammar analysis | Incomplete thoughts |
| Format violation | Expected structure not present | Schema validation | Missing JSON fields |
| Confidence collapse | Sudden drop in stated confidence | > 50% drop | Model uncertainty spike |

### Invisible Failure Schema

```yaml
invisible_failure_detector:
  enabled: true
  
  detectors:
    - name: "empty_response"
      check: "response_length == 0"
      severity: "high"
      action: "retry_with_different_prompt"
      max_retries: 2
      
    - name: "refusal_pattern"
      check: "regex_match"
      patterns:
        - "I cannot help with"
        - "I'm not able to"
        - "I don't have access to"
        - "As an AI"
        - "I apologize, but I"
      severity: "medium"
      action: "log_and_escalate"
      
    - name: "hallucination"
      check: "grounding_score < threshold"
      grounding_method: "entailment"
      threshold: 0.5
      severity: "high"
      action: "flag_and_require_review"
      
    - name: "loop_detection"
      check: "response_similarity"
      similarity_threshold: 0.95
      window_size: 5  # Last 5 responses
      min_occurrences: 3
      severity: "medium"
      action: "break_loop_and_reset"
      
    - name: "truncation"
      check: "sentence_completeness"
      method: "grammar_analysis"
      severity: "low"
      action: "request_continuation"
      
    - name: "format_violation"
      check: "schema_validation"
      expected_format: "from_tool_definition"
      severity: "medium"
      action: "retry_with_format_emphasis"
      
  aggregation:
    failure_rate_threshold: 0.05  # 5% failure rate triggers alert
    window_minutes: 15
    alert_on_threshold_breach: true
```

### MCP Server Health Monitoring (P1-10)

Monitor Model Context Protocol (MCP) tool server availability and performance:

```yaml
mcp_health:
  servers:
    - name: "database_tools"
      endpoint: "mcp://localhost:8080"
      transport: "stdio"  # stdio | sse | websocket
      tools: ["query", "insert", "update", "delete"]
      health_check:
        interval_sec: 60
        timeout_ms: 5000
        method: "list_tools"  # Verify tools are accessible
      thresholds:
        latency_p95_ms: 500
        error_rate: 0.01
        availability: 0.999
        
    - name: "external_api_tools"
      endpoint: "mcp://tools.example.com:443"
      transport: "websocket"
      tools: ["fetch_weather", "send_email", "create_ticket"]
      health_check:
        interval_sec: 30
        timeout_ms: 10000
        method: "ping_and_list"
      thresholds:
        latency_p95_ms: 2000
        error_rate: 0.05
        availability: 0.99
        
    - name: "file_system_tools"
      endpoint: "mcp://localhost:8081"
      transport: "stdio"
      tools: ["read_file", "write_file", "list_directory"]
      health_check:
        interval_sec: 120
        timeout_ms: 3000
        method: "tool_call_test"
        test_tool: "list_directory"
        test_args: {"path": "/tmp"}
      thresholds:
        latency_p95_ms: 100
        error_rate: 0.001
        availability: 0.9999
        
  monitoring:
    metrics_retention_days: 30
    log_all_tool_calls: true
    sample_rate: 1.0  # 100% sampling for MCP calls
    
  alerting:
    on_unavailable: "pagerduty"
    on_degraded: "slack"
    on_new_server: "slack"  # Alert when new MCP server discovered
    
  circuit_breaker:
    enabled: true
    failure_threshold: 5
    reset_timeout_sec: 60
    half_open_requests: 1
```

### Output Drift Monitor (P1-11)

Track changes in agent output characteristics over time to detect quality degradation:

| Metric | Baseline Method | Drift Threshold | Alert Trigger |
|--------|-----------------|-----------------|---------------|
| Avg response length | 7-day rolling mean | +/- 30% | Sustained 1hr |
| Sentiment score | Historical median | +/- 0.2 | Sustained 30min |
| Tool usage rate | 7-day rolling avg | +/- 20% | Sustained 2hr |
| Confidence distribution | KL divergence | > 0.1 | Immediate |
| Response time | 7-day P95 | +50% | Sustained 15min |
| Token efficiency | Tokens per successful task | +/- 25% | Sustained 1hr |
| Error vocabulary | Unique error types | > 5 new | Immediate |

### Output Drift Schema

```yaml
output_drift_monitor:
  enabled: true
  
  metrics:
    - name: "response_length"
      calculation: "avg_char_count"
      baseline: "7d_rolling_mean"
      drift_threshold_percent: 30
      alert_after_minutes: 60
      per_tenant: true
      
    - name: "sentiment_score"
      calculation: "sentiment_analysis"
      model: "vader"  # or custom model
      baseline: "historical_median"
      drift_threshold_absolute: 0.2
      alert_after_minutes: 30
      per_tenant: true
      
    - name: "tool_usage_rate"
      calculation: "tool_calls_per_request"
      baseline: "7d_rolling_avg"
      drift_threshold_percent: 20
      alert_after_minutes: 120
      per_tenant: false  # Platform-wide metric
      
    - name: "confidence_distribution"
      calculation: "histogram_of_confidence_scores"
      baseline: "30d_reference_distribution"
      drift_detection: "kl_divergence"
      threshold: 0.1
      alert_immediate: true
      per_tenant: false
      
    - name: "token_efficiency"
      calculation: "tokens_per_successful_task"
      baseline: "7d_rolling_mean"
      drift_threshold_percent: 25
      alert_after_minutes: 60
      per_tenant: true
      
  storage:
    metrics_retention_days: 90
    baseline_update_frequency: "daily"
    
  alerting:
    channels: ["slack"]
    include_comparison_chart: true
    recommended_actions: true
    
  auto_remediation:
    enabled: false  # Manual review first
    suggestions:
      - condition: "response_length_drift > 30%"
        suggestion: "Review recent prompt changes"
      - condition: "confidence_drift > threshold"
        suggestion: "Check for model version changes"
      - condition: "tool_usage_drift > 20%"
        suggestion: "Verify tool availability and performance"
```

### Unified Observability Dashboard

```yaml
observability_dashboard:
  name: "AI Platform Health"
  refresh_interval_sec: 30
  
  panels:
    - name: "Provider Health Overview"
      type: "status_grid"
      data_source: "provider_health"
      metrics: ["availability", "latency_p50", "error_rate"]
      
    - name: "Tenant Anomalies (24h)"
      type: "alert_list"
      data_source: "anomaly_detection"
      filter: "severity >= medium"
      
    - name: "Invisible Failure Rate"
      type: "time_series"
      data_source: "invisible_failure_detector"
      metrics: ["failure_rate", "by_type"]
      
    - name: "MCP Server Status"
      type: "status_table"
      data_source: "mcp_health"
      columns: ["server", "status", "latency_p95", "last_check"]
      
    - name: "Output Drift Indicators"
      type: "gauge_array"
      data_source: "output_drift_monitor"
      metrics: ["response_length", "sentiment", "tool_usage", "confidence"]
      thresholds: ["green", "yellow", "red"]
      
  drill_down:
    enabled: true
    tenant_filter: true
    time_range_selector: true
    export_csv: true
```

## Trade-offs

| Approach | Benefit | Cost | Best For |
|----------|---------|------|----------|
| Real-time monitoring | Instant detection (<1min) | Higher compute/storage cost, more alerts | Production systems with strict SLAs |
| Batch analysis (hourly) | Lower cost, aggregated insights | Delayed detection (up to 1hr) | Cost-sensitive deployments, trend analysis |
| ML-based anomaly | Adaptive thresholds, fewer false positives | Requires training data, complex setup | Mature platforms with historical data |
| Rule-based detection | Simple, predictable, easy to debug | May miss novel anomalies, tuning required | Early-stage platforms, compliance needs |
| Full sampling (100%) | Complete visibility | High storage cost | Debugging, compliance, small scale |
| Statistical sampling | Cost-effective at scale | May miss rare events | High-volume production |

## Web Research Queries

- "LLM provider health monitoring best practices {date}"
- "AI agent anomaly detection multi-tenant {date}"
- "invisible failure detection LLM responses {date}"
- "MCP server monitoring observability {date}"
- "output drift monitoring AI systems {date}"
- "OpenTelemetry LLM tracing patterns {date}"
- "AI observability cost optimization {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-AI2 | Pattern implementation verified |

## Related Patterns

- See bam-patterns.csv for related patterns

