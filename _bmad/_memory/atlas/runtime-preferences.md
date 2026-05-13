# Atlas — Runtime Preferences

Project-specific defaults and preferences that override fragment-level recommendations. Persona refers to this whenever a workflow's default would conflict.

## Database

- Primary RDBMS: <postgres | mysql | other>
- Version: <e.g. 16>
- Pooler: <pgbouncer | rds proxy | none>

## Infrastructure

- Primary cloud: <aws | gcp | azure | hybrid | self-host>
- IaC: <terraform | pulumi | cdk | other>
- Deployment: <kubernetes | ecs | fargate | other>

## Observability stack

- Traces: <otel + jaeger | otel + tempo | datadog | honeycomb | other>
- Logs: <loki | elastic | cloudwatch | other>
- Metrics: <prometheus | datadog | other>

## Notes

Atlas reads this file at session start and adjusts recommendations accordingly. If unset, Atlas asks the user before making infra-specific suggestions.
