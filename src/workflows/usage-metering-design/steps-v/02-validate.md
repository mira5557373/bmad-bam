# Step 2: Validate Usage Metering Design

## Validation Checklist

### Billable Resources
- [ ] All resource categories defined (compute, AI/ML, storage, network)
- [ ] Each resource has unit and measurement method
- [ ] Billing frequency defined for each resource
- [ ] Tier inclusions defined for all tiers
- [ ] Overage pricing defined for PRO tier
- [ ] Resource attribution rules documented
- [ ] Non-billable resources explicitly listed

### Metering Events
- [ ] Metering event schema defined with all required fields
- [ ] Event types classified (instant vs periodic)
- [ ] Event collection pipeline documented
- [ ] Synchronous vs asynchronous emission patterns defined
- [ ] Idempotency handling documented
- [ ] Event validation rules defined
- [ ] Event enrichment rules defined

### Aggregation Configuration
- [ ] All aggregation levels defined (raw -> hourly -> daily -> billing period)
- [ ] Aggregation schemas defined (SQL/schema)
- [ ] Aggregation pipeline jobs documented
- [ ] Late event handling strategy defined
- [ ] Storage-based aggregation (for snapshots) defined
- [ ] Quota tracking mechanism defined
- [ ] Data retention policies defined for each level

### Billing Integration
- [ ] Billing provider/system identified
- [ ] API endpoints documented
- [ ] Usage report schema defined
- [ ] Real-time quota enforcement defined
- [ ] Daily usage sync process defined
- [ ] End-of-period finalization process defined
- [ ] Error handling strategy defined
- [ ] Reconciliation process defined
- [ ] Tenant portal data requirements defined

### Accuracy Validation
- [ ] Accuracy requirements defined with targets
- [ ] Event validation (Layer 1) defined
- [ ] Pipeline validation (Layer 2) defined
- [ ] Aggregation validation (Layer 3) defined
- [ ] Billing reconciliation (Layer 4) defined
- [ ] Audit trail requirements defined
- [ ] Discrepancy handling process defined
- [ ] Testing strategy defined (unit, integration, load, chaos)

### Cross-Cutting
- [ ] Consistent with tenant model isolation design
- [ ] Consistent with observability design (metrics reuse)
- [ ] Tenant isolation maintained in all billing data
- [ ] No cross-tenant usage leakage possible
- [ ] Regulatory compliance for billing records (retention)

## Gate Decision

- **PASS**: All resources identified, metering pipeline complete, billing integration defined, accuracy validated
- **CONDITIONAL**: Minor gaps (e.g., specific pricing values TBD) - document gaps and proceed
- **FAIL**: Missing billable resources, undefined aggregation, or no billing integration - return to Create mode

Present validation results with specific findings for each section.
