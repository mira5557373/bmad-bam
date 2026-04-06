# Step 3: Identify Failure Point

Pinpoint the exact location and cause of the agent failure:

- Correlate anomalies from state analysis with specific execution steps
- Classify the failure type:
  - **Tool failure**: Tool returned error or unexpected result
  - **Prompt failure**: Agent misinterpreted instructions or context
  - **Memory failure**: Incorrect or missing context from memory tiers
  - **Integration failure**: External service unavailable or returned error
  - **Safety trigger**: Guardrail or kill switch activated
  - **Resource limit**: Token, time, or cost limit exceeded
- Identify root cause vs. symptoms
- Check if failure is reproducible

Failure classification:
- Severity: Critical / High / Medium / Low
- Scope: Single execution / Pattern across executions
- Tenant impact: Single tenant / Multi-tenant / Platform-wide

Document the failure point with evidence from logs and traces.
