# Step 05: Compile Observability Design

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Dashboard templates by tier, alerting strategy, SLO definitions, compile final artifact
- 💾 Track: `stepsCompleted: [1, 2, 3, 4, 5]` when complete
- 📖 Context: All observability pillars from Steps 01-04
- 🚫 Do NOT: Implement anything - output is a design document
- 🔍 Use web search: Verify SLO and alerting best practices
- ⚠️ Gate: QG-OC (Observability Completeness)

---

## Purpose

Compile the complete observability design by defining dashboard templates by tier, alerting strategy with tenant context, SLO definitions per tier, and generating the final output artifact.

---

## Prerequisites

- Step 04 complete: Distributed tracing designed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `observability`, `tenant-isolation`

---

## Inputs

- Metrics specification from Step 02
- Logging specification from Step 03
- Tracing specification from Step 04
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Template: `{project-root}/_bmad/bam/data/templates/observability-design.md`

---

## Actions

### 1. Define Dashboard Templates by Tier

Design tier-specific dashboard access:

```yaml
dashboards:
  # Platform dashboards (operators only)
  platform:
    platform_overview:
      access: "Platform operators"
      panels:
        - "Active tenants by tier and status"
        - "Total request rate across platform"
        - "Error rate by module"
        - "LLM token consumption by model"
        - "Top 10 tenants by request volume"
        
    tenant_health_matrix:
      access: "Platform operators"
      panels:
        - "Health grid by tenant (color-coded)"
        - "Quota utilization heatmap"
        - "Noisy neighbor detection"
        - "Tenant SLO compliance"
        
    capacity_planning:
      access: "Platform operators"
      panels:
        - "Resource utilization trends"
        - "Growth projections by tier"
        - "Infrastructure cost attribution"
        
  # Tenant dashboards (tier-specific access)
  tenant:
    tenant_overview:
      access: "Tenant users (filtered by tenant_id)"
      availability:
        FREE: "Basic panels only"
        PRO: "Full dashboard"
        ENTERPRISE: "Full + customization"
      panels:
        - "Request rate (my tenant)"
        - "Error rate (my tenant)"
        - "Active users (my tenant)"
        - "Agent invocations (my tenant)"
        - "Storage usage vs quota"
        
    agent_performance:
      access: "Tenant users (PRO and ENTERPRISE)"
      panels:
        - "Agent success rate"
        - "Average response time (P50, P95)"
        - "Token usage by agent"
        - "Tool execution breakdown"
        
    usage_billing:
      access: "Tenant admins"
      panels:
        - "Usage summary (current period)"
        - "Usage trends (historical)"
        - "Quota consumption"
        - "Projected costs (ENTERPRISE)"
```

### 2. Define Alerting Strategy with Tenant Context

Configure platform and tenant-level alerts:

```yaml
alerting:
  # Platform-level alerts (operators)
  platform_alerts:
    tenant_error_rate_high:
      expr: |
        sum by (tenant_id) (rate(tenant_api_requests_total{status_code=~"5.."}[5m]))
        / sum by (tenant_id) (rate(tenant_api_requests_total[5m])) > 0.05
      for: "5m"
      severity: "warning"
      labels:
        team: "platform"
      annotations:
        summary: "High error rate for tenant {{ $labels.tenant_id }}"
        
    tenant_quota_exceeded:
      expr: "tenant_storage_bytes / tenant_storage_quota_bytes > 0.95"
      for: "1h"
      severity: "warning"
      labels:
        team: "platform"
      annotations:
        summary: "Tenant {{ $labels.tenant_id }} approaching storage quota"
        
    noisy_neighbor_detected:
      expr: |
        sum by (tenant_id) (rate(tenant_api_requests_total[5m]))
        > 10 * avg(sum by (tenant_id) (rate(tenant_api_requests_total[5m])))
      for: "10m"
      severity: "warning"
      labels:
        team: "platform"
      annotations:
        summary: "Noisy neighbor detected: {{ $labels.tenant_id }}"
        
    llm_cost_spike:
      expr: |
        rate(tenant_llm_tokens_total[1h]) 
        > 2 * rate(tenant_llm_tokens_total[1h] offset 1d)
      for: "30m"
      severity: "warning"
      labels:
        team: "ai-platform"
        
  # Tenant-level alerts (per-tenant notification)
  tenant_alerts:
    agent_failure_rate:
      expr: |
        sum(rate(tenant_agent_invocations_total{outcome="failure"}[15m]))
        / sum(rate(tenant_agent_invocations_total[15m])) > 0.1
      for: "15m"
      tier_availability:
        FREE: false
        PRO: true
        ENTERPRISE: true
      notify: "tenant_admin"
      
    quota_warning:
      expr: "tenant_storage_bytes / tenant_storage_quota_bytes > 0.8"
      for: "1h"
      tier_availability:
        FREE: true
        PRO: true
        ENTERPRISE: true
      notify: "tenant_admin"
      
  # Alert routing
  routing:
    platform_alerts:
      receivers:
        - "pagerduty-platform"
        - "slack-platform-alerts"
    tenant_alerts:
      receivers:
        - "tenant_webhook (ENTERPRISE)"
        - "email_notification (PRO)"
        - "in_app_notification (FREE)"
```

### 3. Define SLO Definitions per Tier

Configure service level objectives:

```yaml
slo_definitions:
  # Availability SLO
  availability:
    metric: |
      1 - (sum(rate(tenant_api_requests_total{status_code=~"5.."}[30d]))
      / sum(rate(tenant_api_requests_total[30d])))
    targets:
      FREE: 99.0%
      PRO: 99.5%
      ENTERPRISE: 99.9%
    burn_rate_alerts:
      fast_burn: "5% error budget consumed in 1 hour"
      slow_burn: "20% error budget consumed in 6 hours"
      
  # Latency SLO
  latency:
    metric: |
      histogram_quantile(0.95, sum by (le) (
        rate(tenant_api_request_duration_seconds_bucket[30d])
      ))
    targets:
      FREE: "P95 < 2s"
      PRO: "P95 < 1s"
      ENTERPRISE: "P95 < 500ms"
    burn_rate_alerts:
      threshold_breach: "P95 exceeds target for 5 minutes"
      
  # Agent response SLO
  agent_response:
    metric: |
      histogram_quantile(0.95, sum by (le) (
        rate(tenant_agent_response_duration_seconds_bucket[30d])
      ))
    targets:
      FREE: "P95 < 30s"
      PRO: "P95 < 15s"
      ENTERPRISE: "P95 < 10s"
    burn_rate_alerts:
      threshold_breach: "Agent P95 exceeds target for 10 minutes"
      
  # SLO dashboard
  slo_dashboard:
    panels:
      - "SLO compliance by tier"
      - "Error budget remaining"
      - "Burn rate trends"
      - "SLO breach history"
```

### 4. Compile Final Observability Design

Generate the output artifact:

```yaml
output_artifact:
  location: "{output_folder}/planning-artifacts/observability-design.md"
  
  sections:
    - title: "Executive Summary"
      content: "Overview of observability strategy"
      
    - title: "Tenant Dimensions"
      source: "Step 01"
      content: "Dimension catalog and propagation rules"
      
    - title: "Metrics Collection"
      source: "Step 02"
      content: "Tenant, quota, business, and infrastructure metrics"
      
    - title: "Logging Strategy"
      source: "Step 03"
      content: "Log format, retention, PII handling"
      
    - title: "Distributed Tracing"
      source: "Step 04"
      content: "Trace context, sampling, agent tracing"
      
    - title: "Dashboards"
      source: "Step 05"
      content: "Platform and tenant dashboard specifications"
      
    - title: "Alerting"
      source: "Step 05"
      content: "Alert rules and routing configuration"
      
    - title: "SLO Definitions"
      source: "Step 05"
      content: "Service level objectives per tier"
      
    - title: "Implementation Checklist"
      content: "Phased implementation plan"
```

**Verify current best practices with web search:**
Search the web: "SLO multi-tenant SaaS best practices {date}"
Search the web: "tenant observability dashboards Grafana {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After compiling observability design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific dashboards, alert rules, or SLO definitions
- **P (Party Mode)**: Bring SRE and product manager perspectives on observability design
- **C (Continue)**: Accept complete observability design and finalize workflow
- **[Specific refinements]**: Describe specific sections to refine

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: dashboards, alerting strategy, SLO definitions
- Process enhanced insights on observability design
- Ask user: "Accept this detailed design analysis? (y/n)"
- If yes, integrate into final artifact
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review complete observability design for multi-tenant platform"
- Process SRE and product manager perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Generate final observability design artifact
- Save to `{output_folder}/planning-artifacts/observability-design.md`
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Create mode complete

---

## Final Gate Checkpoint

**All Create mode steps complete.**

Present comprehensive summary of observability design:
- Tenant dimension catalog with propagation rules
- Metrics: tenant-scoped, quota, business, infrastructure
- Logging: structured format, retention by tier, PII handling
- Tracing: W3C context, tier-based sampling, agent tracing
- Dashboards: platform and tenant views by tier
- Alerting: platform and tenant alert rules
- SLOs: availability, latency, agent response per tier

Confirm artifact generation.

---

## Verification

- [ ] Dashboard templates defined by tier
- [ ] Alerting strategy covers platform and tenant levels
- [ ] SLO definitions complete per tier
- [ ] All observability pillars (metrics, logs, traces) documented
- [ ] Tenant isolation maintained across all signals
- [ ] Output artifact generated at correct location
- [ ] Patterns align with pattern registry

---

## Outputs

- Complete observability design document
- Dashboard specifications
- Alert rules configuration
- SLO definitions
- **Output to:** `{output_folder}/planning-artifacts/observability-design.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/observability-design.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/runbook.md`

---


---

## SUCCESS METRICS:

- [ ] All required inputs gathered from user
- [ ] Design decisions documented with rationale
- [ ] User confirmed choices via A/P/C menu
- [ ] Output artifact updated with step content
- [ ] Frontmatter stepsCompleted updated

## FAILURE MODES:

- **Missing input:** Cannot proceed without required context - return to prerequisites
- **Unclear requirements:** Use Advanced Elicitation (A) to clarify
- **Conflicting constraints:** Use Party Mode (P) for multi-perspective analysis
- **User rejects output:** Iterate on design, do not force acceptance

## Next Step

Create mode complete.

For quality gate validation, run: `bmad-bam-observability` in Validate mode.

Related workflows:
- `bmad-bam-agent-tracing` - Detailed agent tracing design
- `bmad-bam-billing` - Cost attribution from observability data
- `bmad-bam-observability` - Advanced SLO management
