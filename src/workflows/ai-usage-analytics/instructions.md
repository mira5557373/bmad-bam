# AI Usage Analytics - Instructions

## Quick Start

1. Ensure agent runtime architecture exists
2. Run workflow in Create mode for new design
3. Follow step files sequentially
4. Output saved to `{output_folder}/planning-artifacts/analytics/`

## Key Decisions

- **Metric Granularity**: Per-call vs aggregated tracking
- **Cost Model**: Token-based vs time-based attribution
- **Latency SLOs**: What response times are acceptable
- **Dashboard Scope**: Tenant-facing vs internal

## Common Customizations

- Add model-specific metrics
- Configure per-tier cost limits
- Enable real-time alerting
- Include quality metrics
