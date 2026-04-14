# Usage Forecasting - Instructions

## Quick Start

1. Ensure usage metering design exists
2. Run workflow in Create mode for new design
3. Follow step files sequentially
4. Output saved to `{output_folder}/planning-artifacts/analytics/`

## Key Decisions

- **Forecast Horizon**: How far ahead to predict
- **Model Selection**: Statistical vs ML approaches
- **Granularity**: Per-tenant vs aggregate forecasts
- **Update Frequency**: How often to retrain models

## Common Customizations

- Add tenant-specific forecasting
- Include seasonal adjustments
- Configure confidence intervals
- Enable anomaly detection
