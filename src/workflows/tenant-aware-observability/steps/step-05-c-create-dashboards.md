# Step 5: Create Dashboards

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics


---

## Purpose

Define tenant-aware observability dashboards for operators and tenant users.

---

## Prerequisites

- Trace propagation configured (Step 4)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: observability,tenant-isolation

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

Define tenant-aware observability dashboards:

## Dashboard Hierarchy

```
Platform Dashboards (Operators Only)
├── Platform Overview
├── Tenant Health Matrix
├── Capacity Planning
└── Cost Attribution

Tenant Dashboards (Per-Tenant Access)
├── Tenant Overview
├── Agent Performance
├── Usage & Quotas
└── Error Analysis
```

## Platform Overview Dashboard

```yaml
dashboard: platform_overview
access: platform_operators
panels:
  - title: "Active Tenants"
    type: stat
    query: count(tenant_status{status="ACTIVE"})
    
  - title: "Requests by Tier"
    type: timeseries
    query: sum by (tenant_tier) (rate(tenant_api_requests_total[5m]))
    
  - title: "Error Rate by Module"
    type: timeseries
    query: |
      sum by (module) (rate(tenant_api_requests_total{status_code=~"5.."}[5m]))
      / sum by (module) (rate(tenant_api_requests_total[5m]))
      
  - title: "LLM Token Consumption"
    type: timeseries
    query: sum by (model) (rate(tenant_llm_tokens_total[5m]))
    
  - title: "Top Tenants by Request Volume"
    type: table
    query: topk(10, sum by (tenant_id) (rate(tenant_api_requests_total[1h])))
```

## Tenant Health Matrix Dashboard

```yaml
dashboard: tenant_health_matrix
access: platform_operators
panels:
  - title: "Tenant Health Grid"
    type: state_timeline
    query: |
      (
        1 - (sum by (tenant_id) (rate(tenant_api_requests_total{status_code=~"5.."}[5m]))
        / sum by (tenant_id) (rate(tenant_api_requests_total[5m])))
      ) * 100
    thresholds:
      - value: 99
        color: green
      - value: 95
        color: yellow
      - value: 0
        color: red
        
  - title: "Quota Utilization"
    type: gauge
    query: |
      sum by (tenant_id) (tenant_storage_bytes)
      / sum by (tenant_id) (tenant_storage_quota_bytes) * 100
```

## Tenant Overview Dashboard (Per-Tenant)

```yaml
dashboard: tenant_overview
access: tenant_users
variables:
  - name: tenant_id
    type: constant
    value: "${current_user_tenant_id}"  # Auto-set from user context
    
panels:
  - title: "Request Rate"
    type: timeseries
    query: sum(rate(tenant_api_requests_total{tenant_id="$tenant_id"}[5m]))
    
  - title: "Error Rate"
    type: stat
    query: |
      sum(rate(tenant_api_requests_total{tenant_id="$tenant_id",status_code=~"5.."}[5m]))
      / sum(rate(tenant_api_requests_total{tenant_id="$tenant_id"}[5m])) * 100
      
  - title: "Active Users"
    type: stat
    query: tenant_active_users{tenant_id="$tenant_id"}
    
  - title: "Agent Invocations"
    type: timeseries
    query: sum by (agent_id) (rate(tenant_agent_invocations_total{tenant_id="$tenant_id"}[5m]))
    
  - title: "Storage Usage"
    type: gauge
    query: tenant_storage_bytes{tenant_id="$tenant_id"} / tenant_storage_quota_bytes{tenant_id="$tenant_id"} * 100
```

## Agent Performance Dashboard (Per-Tenant)

```yaml
dashboard: agent_performance
access: tenant_users
panels:
  - title: "Agent Success Rate"
    type: stat
    query: |
      sum(rate(tenant_agent_invocations_total{tenant_id="$tenant_id",outcome="success"}[1h]))
      / sum(rate(tenant_agent_invocations_total{tenant_id="$tenant_id"}[1h])) * 100
      
  - title: "Average Response Time"
    type: timeseries
    query: |
      histogram_quantile(0.95, sum by (le) (
        rate(tenant_agent_response_duration_seconds_bucket{tenant_id="$tenant_id"}[5m])
      ))
      
  - title: "Token Usage by Agent"
    type: piechart
    query: sum by (agent_id) (tenant_llm_tokens_total{tenant_id="$tenant_id"})
    
  - title: "Tool Execution Breakdown"
    type: timeseries
    query: sum by (tool_name) (rate(tenant_tool_executions_total{tenant_id="$tenant_id"}[5m]))
```

## Alert Rules

```yaml
alerts:
  platform_level:
    - name: TenantErrorRateHigh
      expr: |
        sum by (tenant_id) (rate(tenant_api_requests_total{status_code=~"5.."}[5m]))
        / sum by (tenant_id) (rate(tenant_api_requests_total[5m])) > 0.05
      for: 5m
      severity: warning
      
    - name: TenantQuotaExceeded
      expr: tenant_storage_bytes / tenant_storage_quota_bytes > 0.95
      for: 1h
      severity: warning
      
  tenant_level:
    - name: AgentFailureRate
      expr: |
        sum(rate(tenant_agent_invocations_total{outcome="failure"}[15m]))
        / sum(rate(tenant_agent_invocations_total[15m])) > 0.1
      for: 15m
      notify: tenant_admin
```

## Documentation Deliverables

Output files to generate:
- `{output_folder}/planning-artifacts/observability/tenant-observability-design.md`
- `{output_folder}/planning-artifacts/observability/dashboard-specifications.md`
- `{output_folder}/planning-artifacts/observability/alert-rules.md`

**Verify current best practices with web search:**
Search the web: "tenant observability dashboards tenant lifecycle {date}"
Search the web: "multi-tenant monitoring dashboards multi-tenant SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After creating dashboards, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific dashboards, alert rules, or access controls
- **P (Party Mode)**: Bring SRE and product manager perspectives on dashboard design
- **C (Continue)**: Accept dashboard designs and finalize observability workflow
- **[Specific refinements]**: Describe specific dashboards or alerts to refine

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: dashboard hierarchy, panel configurations, alert rules
- Process enhanced insights on dashboard design
- Ask user: "Accept this detailed dashboard analysis? (y/n)"
- If yes, integrate into dashboard specifications
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review dashboard designs for tenant-aware observability"
- Process SRE and product manager perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save all observability documents to output locations
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Create mode complete

---

## Verification

- [ ] Dashboard hierarchy defined
- [ ] Platform dashboards specified
- [ ] Tenant dashboards designed
- [ ] Agent performance dashboard created
- [ ] Alert rules configured
- [ ] Access control established
- [ ] Patterns align with pattern registry

---

## Outputs

- Dashboard specifications
- Alert rules configuration
- Tenant observability design
- **Load template:** `{project-root}/_bmad/bam/templates/logging-spec.md`
- **Load template:** `{project-root}/_bmad/bam/templates/observability-runbook-template.md`

---

## Next Step

Submit observability design for validation via quality gate QG-I2.
