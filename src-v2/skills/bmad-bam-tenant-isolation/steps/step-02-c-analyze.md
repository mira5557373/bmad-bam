# Step 02: Analyze Isolation Dimensions

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 NEVER analyze dimensions without loading Step 01 requirements first
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ✅ CRITICAL: Analyze ALL 8 dimensions - do not skip any dimension
- 📋 Document isolation level (Low/Medium/High) per dimension with rationale
- 💬 Present dimension analysis with A/P/C menu for user confirmation
- 🌐 Use web search to verify current isolation best practices per dimension

---

## EXECUTION PROTOCOLS

- 🎯 Analyze each dimension independently with clear recommendation
- 💾 Record dimension decisions in working document for Step 03
- 📖 Reference `domains/tenant.md` for isolation matrix baseline
- 📖 Reference `tenant-models.csv` for model-specific isolation patterns
- 🚫 DO NOT proceed without explicit user confirmation via A/P/C
- ⚠️ Flag dimensions with conflicting requirements (cost vs compliance)
- 🔍 Use web search to verify dimension-specific isolation patterns

---

## CONTEXT BOUNDARIES

This step operates within these boundaries:

- **Input context:** Gathered requirements from Step 01 (tenant count, compliance, tiers, data sensitivity)
- **Domain file:** `{project-root}/_bmad/bam/data/domains/tenant.md`
- **Pattern registry:** `{project-root}/_bmad/bam/data/tenant-models.csv`
- **Output:** 8-dimension isolation analysis with recommendations
- **Quality gate:** Analysis informs QG-M2 (Tenant Isolation) checklist

---

## YOUR TASK

Analyze each of the 8 isolation dimensions against the requirements gathered in Step 01. For each dimension, recommend an isolation level (Low/Medium/High) with clear rationale, trade-offs, and compliance alignment. Present the complete analysis via A/P/C menu for user confirmation.

---

## Main Sequence

### 1. Analyze Data Isolation

Evaluate data separation requirements:

| Isolation Level | Implementation | When to Use |
|-----------------|----------------|-------------|
| Low | Row-Level Security (RLS) policies | <1000 tenants, basic compliance, cost-sensitive |
| Medium | Schema-per-tenant | Regulated industries, customization needs |
| High | Database-per-tenant | PCI/HIPAA, maximum isolation, enterprise tier |

**Analysis Template:**

```markdown
### Data Isolation

**Requirement from Step 01:** {tenant.data_sensitivity}, {tenant.compliance}

**Recommendation:** {Low/Medium/High}

**Rationale:**
- Tenant count: {tenant.count_launch} supports {recommended_level}
- Compliance: {tenant.compliance} requires {minimum_level}
- Data sensitivity: {tenant.data_sensitivity} suggests {level}

**Trade-offs:**
| Factor | Impact | Mitigation |
|--------|--------|------------|
| Cost | {impact} | {mitigation} |
| Complexity | {impact} | {mitigation} |
| Performance | {impact} | {mitigation} |
```

Search the web: "multi-tenant data isolation patterns {date}"

---

### 2. Analyze Compute Isolation

Evaluate resource allocation requirements:

| Isolation Level | Implementation | When to Use |
|-----------------|----------------|-------------|
| Low | Shared compute, fair scheduling | Cost-sensitive, similar workloads |
| Medium | Resource quotas, cgroups | Mixed tiers, predictable needs |
| High | Dedicated pods/VMs | Enterprise tier, SLA guarantees |

**Analysis Template:**

```markdown
### Compute Isolation

**Requirement from Step 01:** {tenant.tier_mix}, {technical.scale_requirements}

**Recommendation:** {Low/Medium/High}

**Rationale:**
- Tier mix: {tenant.tier_mix} - enterprise requires {level}
- SLA requirements: {sla_level} demands {compute_isolation}
- Noisy neighbor risk: {risk_level}

**Trade-offs:**
| Factor | Impact | Mitigation |
|--------|--------|------------|
| Infrastructure cost | {impact} | {mitigation} |
| Resource efficiency | {impact} | {mitigation} |
| Scaling complexity | {impact} | {mitigation} |
```

Search the web: "Kubernetes tenant compute isolation {date}"

---

### 3. Analyze Network Isolation

Evaluate network separation requirements:

| Isolation Level | Implementation | When to Use |
|-----------------|----------------|-------------|
| Low | Shared VPC, security groups | Basic SaaS, cost-sensitive |
| Medium | Network policies, service mesh | Compliance needs, API isolation |
| High | Dedicated VPC/subnets | FedRAMP, enterprise, data sovereignty |

**Analysis Template:**

```markdown
### Network Isolation

**Requirement from Step 01:** {tenant.compliance}, {tenant.geographic}

**Recommendation:** {Low/Medium/High}

**Rationale:**
- Compliance: {tenant.compliance} requires {network_isolation}
- Geographic requirements: {tenant.geographic} suggests {level}
- Data residency: {data_residency_requirements}

**Trade-offs:**
| Factor | Impact | Mitigation |
|--------|--------|------------|
| Network complexity | {impact} | {mitigation} |
| Latency | {impact} | {mitigation} |
| Cost | {impact} | {mitigation} |
```

Search the web: "multi-tenant network isolation VPC {date}"

---

### 4. Analyze Identity Isolation

Evaluate identity and access requirements:

| Isolation Level | Implementation | When to Use |
|-----------------|----------------|-------------|
| Low | Shared IdP, tenant claim in JWT | Small tenants, simple auth |
| Medium | Tenant-specific realms, RBAC | Enterprise SSO needs |
| High | Dedicated IdP per tenant | Maximum isolation, compliance |

**Analysis Template:**

```markdown
### Identity Isolation

**Requirement from Step 01:** {tenant.customization_level}, {tenant.compliance}

**Recommendation:** {Low/Medium/High}

**Rationale:**
- SSO requirements: {sso_needs} requires {level}
- RBAC complexity: {rbac_complexity} suggests {level}
- Compliance: {tenant.compliance} mandates {minimum_level}

**Trade-offs:**
| Factor | Impact | Mitigation |
|--------|--------|------------|
| User experience | {impact} | {mitigation} |
| Integration effort | {impact} | {mitigation} |
| Management overhead | {impact} | {mitigation} |
```

Search the web: "multi-tenant identity isolation RBAC {date}"

---

### 5. Analyze Billing Isolation

Evaluate metering and invoicing requirements:

| Isolation Level | Implementation | When to Use |
|-----------------|----------------|-------------|
| Low | Shared metering, aggregated billing | Uniform pricing, simple plans |
| Medium | Per-tenant metering, consolidated invoice | Usage-based, tier pricing |
| High | Dedicated billing entities, separate contracts | Enterprise, reseller, complex pricing |

**Analysis Template:**

```markdown
### Billing Isolation

**Requirement from Step 01:** {tenant.tier_mix}, {business_model}

**Recommendation:** {Low/Medium/High}

**Rationale:**
- Pricing model: {pricing_model} requires {level}
- Tier mix: {tenant.tier_mix} suggests {level}
- Revenue recognition: {rev_rec_needs} demands {level}

**Trade-offs:**
| Factor | Impact | Mitigation |
|--------|--------|------------|
| Billing complexity | {impact} | {mitigation} |
| Invoice clarity | {impact} | {mitigation} |
| Revenue tracking | {impact} | {mitigation} |
```

Search the web: "SaaS multi-tenant billing metering patterns {date}"

---

### 6. Analyze Limits Isolation

Evaluate quotas and rate limiting requirements:

| Isolation Level | Implementation | When to Use |
|-----------------|----------------|-------------|
| Low | Shared limits, global rate limiting | Simple tiers, uniform usage |
| Medium | Per-tenant quotas, tier-based limits | Differentiated tiers, fair use |
| High | Dynamic limits, dedicated capacity | Enterprise SLA, guaranteed resources |

**Analysis Template:**

```markdown
### Limits Isolation

**Requirement from Step 01:** {tenant.tier_mix}, {technical.scale_requirements}

**Recommendation:** {Low/Medium/High}

**Rationale:**
- Tier differentiation: {tenant.tier_mix} requires {level}
- Abuse prevention: {abuse_risk} suggests {level}
- SLA guarantees: {sla_requirements} demands {level}

**Trade-offs:**
| Factor | Impact | Mitigation |
|--------|--------|------------|
| Flexibility | {impact} | {mitigation} |
| User experience | {impact} | {mitigation} |
| Enforcement complexity | {impact} | {mitigation} |
```

Search the web: "multi-tenant rate limiting quotas {date}"

---

### 7. Analyze Audit Isolation

Evaluate logging and compliance requirements:

| Isolation Level | Implementation | When to Use |
|-----------------|----------------|-------------|
| Low | Shared logs, tenant field filtering | Basic SaaS, cost-sensitive |
| Medium | Log partitioning, tenant-specific retention | Compliance needs, audit trails |
| High | Dedicated log streams, separate storage | HIPAA, FedRAMP, legal requirements |

**Analysis Template:**

```markdown
### Audit Isolation

**Requirement from Step 01:** {tenant.compliance}, {tenant.data_sensitivity}

**Recommendation:** {Low/Medium/High}

**Rationale:**
- Compliance: {tenant.compliance} requires {audit_level}
- Retention requirements: {retention_needs} suggests {level}
- Legal discovery: {legal_needs} demands {level}

**Trade-offs:**
| Factor | Impact | Mitigation |
|--------|--------|------------|
| Storage cost | {impact} | {mitigation} |
| Query complexity | {impact} | {mitigation} |
| Compliance risk | {impact} | {mitigation} |
```

Search the web: "multi-tenant audit logging compliance {date}"

---

### 8. Analyze Config Isolation

Evaluate tenant customization requirements:

| Isolation Level | Implementation | When to Use |
|-----------------|----------------|-------------|
| Low | Feature flags, shared config | Uniform product, simple customization |
| Medium | Per-tenant config store, override hierarchy | White-labeling, tier features |
| High | Dedicated config instances, full customization | Enterprise, bespoke deployments |

**Analysis Template:**

```markdown
### Config Isolation

**Requirement from Step 01:** {tenant.customization_level}, {tenant.tier_mix}

**Recommendation:** {Low/Medium/High}

**Rationale:**
- Customization needs: {tenant.customization_level} requires {level}
- White-label requirements: {white_label_needs} suggests {level}
- Feature gating: {feature_gating_complexity} demands {level}

**Trade-offs:**
| Factor | Impact | Mitigation |
|--------|--------|------------|
| Maintenance burden | {impact} | {mitigation} |
| Testing complexity | {impact} | {mitigation} |
| Release velocity | {impact} | {mitigation} |
```

Search the web: "multi-tenant configuration management {date}"

---

## COLLABORATION MENUS (A/P/C):

After presenting complete 8-dimension analysis:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific dimension requirements
- **P (Party Mode)**: Bring security, compliance, and ops perspectives
- **C (Continue)**: Accept analysis and proceed to design step

Select an option:
```

### If 'A' (Advanced Elicitation):

Invoke `bmad-advanced-elicitation` skill to explore:

- **Dimension conflicts:** Where do cost and compliance requirements conflict?
- **Tier differentiation:** How should isolation vary by tenant tier?
- **Migration path:** How will tenants upgrade isolation levels?
- **Compliance gaps:** Are there dimensions not meeting regulatory requirements?
- **Cost optimization:** Which dimensions can use lower isolation safely?

Pass context: Step 01 requirements, current dimension analysis, specific concerns.

**After processing enhanced insights, return to A/P/C menu.**

### If 'P' (Party Mode):

Invoke `bmad-party-mode` skill with context:

```
Review 8-dimension isolation analysis for {tenant_count} tenants
with compliance requirements: {compliance_list}
```

Gather perspectives from:

| Persona | Focus Area | Key Questions |
|---------|------------|---------------|
| Security | Isolation adequacy | Does each dimension meet security requirements? |
| Compliance | Regulatory fit | Do isolation levels satisfy compliance mandates? |
| DevOps | Operational complexity | Can team operate all isolation levels effectively? |
| Finance | Cost impact | What is the infrastructure cost per dimension? |

Process multi-perspective analysis and synthesize into refined recommendations.

**After processing perspectives, return to A/P/C menu.**

### If 'C' (Continue):

1. Record the dimension analysis in working document:

```yaml
# Add to tenant-isolation-analysis.md
isolation_dimensions:
  data: {level}
  compute: {level}
  network: {level}
  identity: {level}
  billing: {level}
  limits: {level}
  audit: {level}
  config: {level}
analysis_completed_at: {timestamp}
```

2. Update workflow state:

```yaml
stepsCompleted:
  - step-01-c-start
  - step-02-c-analyze  # Add this
currentStep: step-03-c-design
```

3. Proceed to NEXT STEP.

---

## SUCCESS METRICS

- ✅ All 8 isolation dimensions analyzed
- ✅ Each dimension has clear Low/Medium/High recommendation
- ✅ Trade-offs documented for each dimension
- ✅ Web search performed for dimension-specific best practices
- ✅ Step 01 requirements referenced in each analysis
- ✅ Compliance alignment verified per dimension
- ✅ User confirmed analysis via A/P/C menu
- ✅ Dimension decisions recorded in working document

---

## FAILURE MODES

- ❌ Skipping dimensions - incomplete isolation analysis
- ❌ Analyzing without Step 01 context - recommendations not grounded in requirements
- ❌ Ignoring compliance requirements - may select levels that fail audits
- ❌ Not documenting trade-offs - user cannot make informed decisions
- ❌ Missing cost analysis - may recommend unaffordable isolation
- ❌ Proceeding without A/P/C confirmation - user not engaged in decisions
- ❌ Skipping web search - may miss current isolation best practices

---

## NEXT STEP

After user confirms dimension analysis with 'C':

1. Record the 8-dimension analysis in working document
2. Proceed to `step-03-c-design.md` to design isolation implementation
3. The dimension analysis informs:
   - Implementation patterns per dimension
   - Technology selection (RLS vs schema vs database)
   - Quality gate QG-M2 checklist items

**Transition to Step 03 with:**
- Dimension levels: `{data: X, compute: Y, network: Z, ...}`
- Critical dimensions: `{dimensions_requiring_high_isolation}`
- Trade-off summary: `{key_trade_offs_accepted}`
