# BAM Tool Execution Observability Guide

**When to load:** During agent tool design, tool performance debugging, or when user mentions tool traces, execution metrics, or sandbox monitoring.

**Integrates with:** DevOps (operations), Architect (design), AI Platform (implementation)

---

## Core Concepts

### Tool Execution Metrics Hierarchy

Tool execution observability tracks the complete lifecycle of agent tool invocations.

| Execution Phase | Key Metrics | Purpose |
|-----------------|-------------|---------|
| Tool Selection | tool_selection_latency, tool_selection_accuracy | LLM tool choice performance |
| Input Validation | input_validation_latency, validation_failures | Pre-execution safety |
| Execution | tool_execution_latency, success_rate | Core tool performance |
| Output Processing | output_processing_latency, output_sanitization | Post-execution handling |

### Per-Tenant Tool Isolation

Tool metrics must include tenant context for isolation and security auditing.

| Dimension | Labels | Purpose |
|-----------|--------|---------|
| Tenant | tenant_id, tenant_tier | Per-tenant usage tracking |
| Tool | tool_id, tool_category | Tool-specific performance |
| Agent | agent_id, session_id | Agent execution context |
| Sandbox | sandbox_id, isolation_level | Security monitoring |

---

## Application Guidelines

When implementing tool execution observability in multi-tenant systems:

1. **Track tool execution latency by tool and tenant**: Identify slow tools and per-tenant performance variance
2. **Monitor tool success/failure rates**: Alert on elevated failure rates indicating bugs or misuse
3. **Audit tool permissions**: Log all permission checks and denied executions
4. **Track sandbox resource usage**: Monitor CPU, memory, and network usage per tool execution
5. **Capture tool result quality**: Track output validation failures and downstream errors

---

## Tool Execution Metrics Specification

### Core Execution Metrics

| Metric Name | Type | Labels | Purpose |
|-------------|------|--------|---------|
| tool_execution_latency_seconds | Histogram | tenant_id, tool_id, agent_id | Time to execute tool |
| tool_execution_total | Counter | tenant_id, tool_id, status | Execution count by status |
| tool_execution_errors_total | Counter | tenant_id, tool_id, error_type | Error count by type |
| tool_execution_timeout_total | Counter | tenant_id, tool_id | Timeout events |
| tool_retry_attempts_total | Counter | tenant_id, tool_id | Retry attempts |

### Permission and Security Metrics

| Metric Name | Type | Labels | Purpose |
|-------------|------|--------|---------|
| tool_permission_checks_total | Counter | tenant_id, tool_id, result | Permission check outcomes |
| tool_permission_denied_total | Counter | tenant_id, tool_id, reason | Denied executions |
| tool_approval_required_total | Counter | tenant_id, tool_id | Human approval requests |
| tool_approval_latency_seconds | Histogram | tenant_id, tool_id | Time awaiting approval |

### Sandbox Resource Metrics

| Metric Name | Type | Labels | Purpose |
|-------------|------|--------|---------|
| tool_sandbox_cpu_seconds | Counter | tenant_id, sandbox_id, tool_id | CPU time consumed |
| tool_sandbox_memory_bytes_max | Gauge | tenant_id, sandbox_id, tool_id | Peak memory usage |
| tool_sandbox_network_bytes | Counter | tenant_id, sandbox_id, direction | Network I/O |
| tool_sandbox_filesystem_bytes | Counter | tenant_id, sandbox_id, operation | Filesystem I/O |
| tool_sandbox_violations_total | Counter | tenant_id, sandbox_id, violation_type | Security violations |

### Tool Selection Metrics

| Metric Name | Type | Labels | Purpose |
|-------------|------|--------|---------|
| tool_selection_latency_seconds | Histogram | tenant_id, agent_id | LLM tool selection time |
| tool_selection_accuracy | Gauge | tenant_id, agent_id | Correct tool selection rate |
| tool_selection_retries_total | Counter | tenant_id, agent_id | Selection retry attempts |
| tool_invalid_params_total | Counter | tenant_id, tool_id | Invalid parameter errors |

---

## Alerting Patterns

### Tool Execution Alerts

| Alert | Condition | Severity | For Duration |
|-------|-----------|----------|--------------|
| ToolExecutionLatencyHigh | tool_execution_latency_seconds:p95 > 5s | WARNING | 5m |
| ToolExecutionLatencyCritical | tool_execution_latency_seconds:p95 > 30s | CRITICAL | 2m |
| ToolFailureRateHigh | rate(tool_execution_errors_total[5m]) / rate(tool_execution_total[5m]) > 0.1 | WARNING | 5m |
| ToolTimeoutSpike | rate(tool_execution_timeout_total[5m]) > 0.05 | WARNING | 5m |
| ToolPermissionDeniedSpike | rate(tool_permission_denied_total[5m]) > 10 | WARNING | 5m |

### Sandbox Security Alerts

| Alert | Condition | Severity | For Duration |
|-------|-----------|----------|--------------|
| SandboxViolationDetected | increase(tool_sandbox_violations_total[1m]) > 0 | CRITICAL | immediate |
| SandboxMemoryExceeded | tool_sandbox_memory_bytes_max > 512MB | WARNING | 1m |
| SandboxCPUExceeded | rate(tool_sandbox_cpu_seconds[1m]) > 0.8 | WARNING | 5m |
| SandboxNetworkAnomaly | rate(tool_sandbox_network_bytes[1m]) > 10MB | WARNING | 5m |

### Per-Tier SLA Alerts

| Tier | Execution p95 SLA | Failure Rate SLA | Alert Threshold |
|------|-------------------|------------------|-----------------|
| Enterprise | < 5s | < 1% | Immediate |
| Pro | < 15s | < 5% | 5m |
| Free | < 30s | < 10% | 15m |

---

## Dashboard Components

### Tool Execution Dashboard

| Panel | Metrics | Visualization |
|-------|---------|---------------|
| Execution Latency Distribution | tool_execution_latency_seconds | Heatmap by tool_id |
| Success/Failure Rate | tool_execution_total by status | Stacked bar |
| Top Errors by Type | tool_execution_errors_total | Table |
| Timeout Rate | tool_execution_timeout_total | Time series |
| Permission Denials | tool_permission_denied_total | Table with reasons |

### Sandbox Monitoring Dashboard

| Panel | Metrics | Visualization |
|-------|---------|---------------|
| CPU Usage by Tool | tool_sandbox_cpu_seconds | Time series by tool_id |
| Memory Usage by Tool | tool_sandbox_memory_bytes_max | Gauge per sandbox |
| Network I/O | tool_sandbox_network_bytes | Time series |
| Security Violations | tool_sandbox_violations_total | Alert table |

### Per-Tenant Tool Dashboard

| Panel | Metrics | Tenant Filter |
|-------|---------|---------------|
| Tool Usage Volume | sum(tool_execution_total) | By tenant_id |
| Most Used Tools | topk(tool_execution_total) | By tenant_id |
| Failure Rate by Tool | tool_execution_errors_total / tool_execution_total | By tenant_id |
| Resource Consumption | tool_sandbox_cpu_seconds + memory | By tenant_id |

---

## Implementation Checklist

### Instrumentation

- [ ] All tool executions emit latency histograms with status
- [ ] Permission checks are logged with outcomes
- [ ] Sandbox resource metrics are captured per execution
- [ ] Tool selection accuracy is tracked per agent
- [ ] Timeout and retry events are counted
- [ ] Security violations trigger immediate alerts

### Dashboards

- [ ] Tool execution performance dashboard deployed
- [ ] Sandbox monitoring dashboard available
- [ ] Per-tenant tool usage dashboard enabled
- [ ] Security violations dashboard with drill-down

### Alerting

- [ ] Execution latency SLO alerts configured per tier
- [ ] Failure rate alerts active
- [ ] Sandbox violation alerts with immediate notification
- [ ] Permission denial spike detection enabled

---

## Related Patterns

**Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `tool-execution`
- **agent-identity-tbac-patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `agent-identity-tbac`
- **action-gateway-patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `action-gateway`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "AI agent tool execution monitoring {date}"
- Search: "LLM function calling observability {date}"
- Search: "agent sandbox monitoring patterns {date}"
- Search: "MCP tool tracing best practices {date}"

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| What tool execution latency is acceptable? | < 5s for interactive, < 60s for background | Users expect interactive responsiveness |
| Should all tool executions be traced? | Yes for security audit, sample for performance | Security requires complete audit trail |
| How to detect tool misuse? | Monitor permission denials and sandbox violations | Patterns indicate potential security issues |
| When to alert on failures? | > 10% failure rate sustained for 5 minutes | Transient failures are normal, sustained are not |

---

## Related Workflows

- `bmad-bam-agent-runtime-architecture` - Tool registry and execution design
- `bmad-bam-validate-tool-contract` - Tool contract validation
- `bmad-bam-ai-agent-debug` - Tool execution debugging
