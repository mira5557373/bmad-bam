# Step 5: Setup Monitoring

Configure real-time monitoring for safety in production:

## Monitoring Dimensions

**Safety Metrics:**
- Guardrail activation rate by type
- Content filter trigger frequency
- Prompt injection detection rate
- Kill switch activation events

**Quality Metrics:**
- Task success rate by agent type
- User satisfaction scores
- Hallucination reports
- Escalation frequency

**Operational Metrics:**
- Response latency percentiles
- Token usage by tenant
- Cost per task
- Error rates by category

## Alerting Configuration

Define alert thresholds and escalation:

| Metric | Warning | Critical | Escalation |
|--------|---------|----------|------------|
| Safety test failure rate | >5% | >10% | Oncall + Engineering Lead |
| Guardrail bypass attempts | >10/hour | >50/hour | Security Team |
| Kill switch activations | >1/day | >5/day | Platform Team |
| Tenant isolation violations | Any | - | Immediate page |

## Dashboards

Create dashboards for:
- Real-time safety status
- Trend analysis (hourly, daily, weekly)
- Per-tenant safety metrics
- Agent performance comparison
- Incident investigation

## Audit Logging

Configure comprehensive audit trails:
- All guardrail decisions
- Tool execution with inputs/outputs
- Memory access patterns
- Admin configuration changes
- Safety incident investigations

Output: Monitoring and alerting configuration with dashboard specifications.
