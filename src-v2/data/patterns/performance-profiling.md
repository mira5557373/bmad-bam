---
pattern_id: performance-profiling
shortcode: ZPP
category: observability
qg_ref: QG-OB2
version: 1.0.0
last_reviewed: 2026-05-01
---

# Performance Profiling - BAM Pattern

**Loaded by:** ZPP  
**Applies to:** Multi-tenant SaaS platforms requiring performance analysis and optimization

---

## When to Use

- Identifying performance bottlenecks in production
- Establishing tenant-specific performance baselines
- Continuous performance regression detection in CI/CD
- Root cause analysis for latency issues
- Capacity planning based on actual resource consumption
- Optimizing tenant-isolated workloads

## When NOT to Use

- Simple smoke tests (use basic health checks)
- Load testing without isolation (use dedicated load test environment)
- Real-time alerting only (use metrics/traces instead)
- When profiling overhead would impact production SLA

## Architecture

### Profiling Stack Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    Performance Profiling Stack                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ CPU Profiler │  │ Memory Prof  │  │ I/O Profiler │          │
│  │ (py-spy,     │  │ (memray,     │  │ (strace,     │          │
│  │  async-prof) │  │  heaptrack)  │  │  bpftrace)   │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
│         │                 │                 │                   │
│         └─────────────────┼─────────────────┘                   │
│                           │                                     │
│                    ┌──────▼──────┐                              │
│                    │  Profiler   │                              │
│                    │  Aggregator │                              │
│                    └──────┬──────┘                              │
│                           │                                     │
│         ┌─────────────────┼─────────────────┐                   │
│         │                 │                 │                   │
│  ┌──────▼──────┐  ┌───────▼───────┐  ┌──────▼──────┐           │
│  │ Flame Graph │  │ Timeline View │  │ Diff Report │           │
│  │ Generator   │  │ Generator     │  │ Generator   │           │
│  └─────────────┘  └───────────────┘  └─────────────┘           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Tenant-Isolated Profiling

```
┌─────────────────────────────────────────────────────────────────┐
│                 Tenant-Scoped Profiling Session                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Request: X-Tenant-ID: tenant_abc123                            │
│                                                                 │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                                                            │ │
│  │   ┌──────────┐    ┌──────────┐    ┌──────────┐            │ │
│  │   │ Profile  │───▶│ Filter   │───▶│ Store    │            │ │
│  │   │ Capture  │    │ by       │    │ Isolated │            │ │
│  │   │          │    │ tenant_id│    │ Results  │            │ │
│  │   └──────────┘    └──────────┘    └──────────┘            │ │
│  │                                                            │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  Storage: profiles/{tenant_id}/{timestamp}/                     │
│  Access: RLS enforced on profile data                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Flame Graph Generation

```
                        Flame Graph Structure
                        
                    ┌─────────────────────────────────────┐
                    │         main()                       │
                    │         (100% - 500ms)              │
                    └─────────────────────────────────────┘
                              │
          ┌───────────────────┴───────────────────┐
          │                                       │
┌─────────────────────┐                ┌─────────────────────┐
│  process_request()  │                │   db_query()        │
│  (60% - 300ms)      │                │   (40% - 200ms)     │
└─────────────────────┘                └─────────────────────┘
          │                                       │
    ┌─────┴─────┐                          ┌──────┴──────┐
    │           │                          │             │
┌───────┐ ┌───────┐                  ┌───────┐    ┌───────┐
│validate│ │ transform│             │execute │    │ parse │
│(20%)  │ │(40%)     │              │(30%)  │    │(10%)  │
└───────┘ └───────┘                  └───────┘    └───────┘
```

### Configuration Schema

```yaml
performance_profiling:
  tenant_id: uuid
  bam_controlled: true
  
  profiling_config:
    enabled: bool
    mode: enum[continuous, on_demand, scheduled]
    sampling_rate_hz: int  # default: 100
    max_duration_seconds: int  # default: 60
    
  profiler_types:
    cpu:
      enabled: bool
      tool: enum[py_spy, async_profiler, perf]
      native_frames: bool
    memory:
      enabled: bool
      tool: enum[memray, heaptrack, tracemalloc]
      allocation_tracking: bool
    io:
      enabled: bool
      tool: enum[strace, bpftrace, custom]
      
  tenant_isolation:
    filter_by_tenant: bool  # default: true
    storage_per_tenant: bool
    access_control: rls
    
  baseline_config:
    collection_window_hours: 24
    percentiles: [50, 90, 95, 99]
    deviation_threshold_percent: 20
    
  ci_cd_integration:
    enabled: bool
    fail_on_regression: bool
    regression_threshold_percent: 15
    comparison_baseline: enum[last_release, rolling_average]
    
  output_formats:
    - flame_graph_svg
    - flame_graph_html
    - timeline_json
    - summary_report
```

### Performance Baseline Tracking

| Metric | Baseline Method | Alert Threshold |
|--------|-----------------|-----------------|
| P50 Latency | 7-day rolling average | +10% deviation |
| P99 Latency | 7-day rolling P99 | +20% deviation |
| Memory Peak | Daily max average | +25% deviation |
| CPU Time | Per-request average | +15% deviation |
| GC Pause | Cumulative daily | +30% deviation |

### CI/CD Regression Detection

```
┌─────────────────────────────────────────────────────────────────┐
│              CI/CD Performance Regression Check                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. Run benchmark suite                                         │
│     └── Profile critical paths                                  │
│                                                                 │
│  2. Compare to baseline                                         │
│     ┌─────────────────────────────────────────────────────┐    │
│     │ Metric        │ Baseline │ Current │ Delta │ Status│    │
│     ├───────────────┼──────────┼─────────┼───────┼───────┤    │
│     │ P99 latency   │ 120ms    │ 125ms   │ +4.2% │  OK   │    │
│     │ Memory peak   │ 512MB    │ 650MB   │ +27%  │ WARN  │    │
│     │ CPU time      │ 45ms     │ 48ms    │ +6.7% │  OK   │    │
│     └─────────────────────────────────────────────────────┘    │
│                                                                 │
│  3. Gate decision                                               │
│     └── Block merge if regression > threshold                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Bottleneck Identification Flow

```
Performance Issue
       │
       ▼
┌──────────────┐
│ Capture      │
│ Profile      │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Generate     │
│ Flame Graph  │
└──────┬───────┘
       │
       ▼
┌──────────────┐     ┌──────────────┐
│ Identify     │────▶│ Drill Down   │
│ Hot Spots    │     │ Stack Traces │
└──────────────┘     └──────┬───────┘
                            │
                            ▼
                     ┌──────────────┐
                     │ Root Cause   │
                     │ Identified   │
                     └──────────────┘
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Continuous profiling | Always-on visibility | 2-5% overhead | Production monitoring |
| On-demand profiling | No overhead | Requires reproduction | Specific investigations |
| CI/CD only | Gates regressions | Misses prod-only issues | Regression prevention |
| Sampling (100 Hz) | Low overhead | May miss short events | General profiling |
| High-fidelity (1000 Hz) | Detailed view | Higher overhead | Deep investigations |

## Quality Checks

- [ ] Profiler overhead measured and within budget (<5%)
- [ ] Tenant isolation enforced on profile data
- [ ] Flame graph generation automated
- [ ] Baselines established for critical paths
- [ ] CI/CD integration configured
- [ ] **CRITICAL:** No sensitive data captured in profiles

## Web Research Queries

- "continuous profiling production best practices {date}"
- "flame graph analysis techniques {date}"
- "py-spy async-profiler production usage {date}"
- "performance regression detection CI/CD {date}"
- "multi-tenant performance isolation profiling {date}"
- "memory profiling Python Go production {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-OB2 | Performance profiling pattern implementation verified |

## Related Patterns

- [ai-observability.md](ai-observability.md) - AI/LLM observability metrics
- [performance-isolation.md](performance-isolation.md) - Noisy neighbor prevention
- [usage-analytics.md](usage-analytics.md) - Tenant usage tracking
