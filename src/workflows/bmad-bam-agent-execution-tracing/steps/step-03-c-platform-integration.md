# Step 3: Platform Integration

## Purpose

Configure tracing platform integration (OpenTelemetry, Langfuse, or LangSmith).

## Prerequisites

- Step 2 complete (span attributes defined)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `distributed-tracing`

## Actions

### 1. Select Tracing Platform

| Platform | Use Case | Tenant Isolation | Cost Model |
|----------|----------|------------------|------------|
| Langfuse | OSS, full control | Project-based | Self-hosted/Cloud |
| LangSmith | LangChain ecosystem | Project-based | Usage-based |
| OpenTelemetry | Custom + OTEL backend | Custom | Backend dependent |
| Phoenix | Local development | N/A | Free |

### 2. Configure OpenTelemetry

| Component | Configuration | Purpose |
|-----------|---------------|---------|
| TracerProvider | Service name, tenant sampler | Trace creation |
| SpanProcessor | BatchSpanProcessor | Efficient export |
| Exporter | OTLP/Langfuse/Custom | Backend delivery |
| Propagator | W3CTraceContext | Cross-service |

### 3. Configure Tenant Isolation

| Aspect | Langfuse | LangSmith | OTEL |
|--------|----------|-----------|------|
| Project per tenant | Optional | Optional | N/A |
| User attribution | user_id parameter | metadata | span attribute |
| Data retention | Per project | Per org | Backend config |

### 4. Configure Data Export

| Setting | Development | Production |
|---------|-------------|------------|
| Export interval | 1s | 5s |
| Max batch size | 100 | 512 |
| Retry policy | 3 attempts | 5 attempts |
| Compression | None | gzip |

## Soft Gate Checkpoint

**Steps 1-4 complete the platform integration configuration.**

Present platform integration summary and ask for confirmation before proceeding.

## Web Research Verification

Search the web: "Langfuse multi-tenant configuration {date}"
Search the web: "OpenTelemetry LLM tracing {date}"

## Verification

- [ ] Tracing platform selected with rationale
- [ ] OpenTelemetry configuration documented
- [ ] Tenant isolation strategy defined
- [ ] Export settings configured

## Outputs

- Platform selection decision document
- OpenTelemetry configuration specification
- Tenant isolation configuration

## Next Step

Proceed to `step-04-c-sampling-strategy.md` with platform integration configured.
