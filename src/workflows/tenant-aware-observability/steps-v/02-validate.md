# Step 2: Validate Tenant-Aware Observability

## Validation Checklist

### Tenant Dimensions
- [ ] Core tenant dimensions defined (tenant_id, tenant_slug, tenant_tier)
- [ ] Request context dimensions defined (user_id, session_id, request_id)
- [ ] Resource attribution dimensions defined
- [ ] Dimension propagation rules documented
- [ ] Cardinality management strategy defined
- [ ] High-cardinality dimensions restricted to logs/traces only

### Metric Aggregation
- [ ] Platform metrics defined (control plane visibility)
- [ ] Tenant metrics defined (per-tenant visibility)
- [ ] Resource consumption metrics defined (billing attribution)
- [ ] Aggregation levels defined (request -> tenant -> tier -> platform)
- [ ] Pre-aggregation rules documented
- [ ] Retention policies per aggregation level defined
- [ ] Tenant-scoped query patterns documented

### Log Context
- [ ] Structured log format defined with tenant fields
- [ ] Log context injection mechanism defined
- [ ] Log levels by context documented
- [ ] Tenant log isolation rules defined
- [ ] Sensitive data handling rules defined
- [ ] Log retention by tier documented
- [ ] Audit log requirements documented

### Trace Propagation
- [ ] Trace context structure defined (W3C + baggage)
- [ ] Required span attributes defined
- [ ] Resource attributes defined
- [ ] Sampling strategy by tier documented
- [ ] Cross-service propagation configured
- [ ] Tenant trace isolation rules defined
- [ ] Agent execution tracing defined
- [ ] Export configuration defined

### Dashboards
- [ ] Dashboard hierarchy defined (platform vs tenant)
- [ ] Platform dashboards have operator-only access
- [ ] Tenant dashboards are filtered by tenant_id
- [ ] All dashboards have appropriate access controls
- [ ] Alert rules defined for both platform and tenant level
- [ ] Alert notification routing is tenant-aware

### Cross-Cutting
- [ ] All signals (metrics, logs, traces) include tenant_id
- [ ] Tenant isolation is maintained across all signals
- [ ] No cross-tenant data leakage possible in dashboards
- [ ] Consistent with tenant model isolation design
- [ ] Consistent with master architecture observability section

## Gate Decision

- **PASS**: All signals include tenant context, isolation verified, dashboards access-controlled
- **CONDITIONAL**: Minor gaps (e.g., specific alert thresholds TBD) - document gaps and proceed
- **FAIL**: Missing tenant dimensions, no isolation in dashboards, or cardinality issues - return to Create mode

Present validation results with specific findings for each section.
