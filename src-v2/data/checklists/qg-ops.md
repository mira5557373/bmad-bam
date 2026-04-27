---
name: qg-ops-operations-continuous
description: Operations continuous gate - monitoring, alerting, runbooks, post-deployment verification, SRE practices
module: bam
tags: [operations, quality-gate, multi-tenant, monitoring, sre, post-deployment]
version: 2.0.0
---

# QG-OPS: Operations Continuous Gate

> **Gate ID:** QG-OPS (Operations Continuous)
> **Phase:** 6-operations
> **Workflow:** bmad-bam-tenant-aware-observability, bmad-bam-incident-response-operations
> **Prerequisites:** QG-P1 (Production Readiness), QG-AI2 (AI Observability)

Operations readiness MUST be verified continuously in production. Unlike pre-release gates, QG-OPS is evaluated continuously during production operations. This gate consolidates monitoring, alerting, runbooks, post-deployment verification, incident management, and SRE practices for multi-tenant AI platforms.

---

## Purpose

QG-OPS validates that operational excellence is maintained across multi-tenant AI platforms:

1. **Monitoring and alerting** provide comprehensive observability across all tenant tiers
2. **Incident response** procedures enable rapid detection and resolution
3. **Runbook management** ensures consistent operational procedures
4. **Post-deployment verification** validates successful releases
5. **AI/ML operations** maintain model health and performance
6. **Tenant operations** support lifecycle management and SLA compliance
7. **Capacity management** ensures resource availability
8. **Cost monitoring** enables budget tracking and optimization
9. **SRE practices** drive continuous improvement

---

## Monitoring and Alerting

### Infrastructure Monitoring

- [ ] **CRITICAL:** CPU, memory, disk, network metrics collected for all nodes
- [ ] **CRITICAL:** Database connection pool utilization tracked
- [ ] **CRITICAL:** Message queue depth and consumer lag monitored
- [ ] Container resource utilization tracked per tenant workload
- [ ] Network latency between services measured
- [ ] Storage IOPS and throughput monitored
- [ ] SSL/TLS certificate expiration alerts configured
- [ ] DNS resolution health checked

### Application Monitoring

- [ ] **CRITICAL:** Request latency (p50, p95, p99) tracked per endpoint
- [ ] **CRITICAL:** Error rates tracked by service and tenant
- [ ] **CRITICAL:** Request throughput measured per tenant tier
- [ ] Cache hit rates monitored
- [ ] Background job success/failure rates tracked
- [ ] Scheduled task completion monitored
- [ ] API response time budgets enforced
- [ ] Circuit breaker state changes logged

### Alerting Configuration

- [ ] **CRITICAL:** Alert thresholds defined for all SLIs
- [ ] **CRITICAL:** Alert severity levels mapped to response requirements
- [ ] **CRITICAL:** Escalation paths configured per severity
- [ ] Alert deduplication prevents notification fatigue
- [ ] Alert correlation groups related issues
- [ ] Business hours vs after-hours routing configured
- [ ] Tenant-specific alert routing available (Enterprise)
- [ ] Alert runbook links included in notifications

### SLO Monitoring

- [ ] **CRITICAL:** SLOs defined for availability, latency, error rate
- [ ] **CRITICAL:** Error budget tracking implemented
- [ ] **CRITICAL:** SLO breach alerts trigger within 5 minutes
- [ ] Burn rate alerts predict budget exhaustion
- [ ] SLO dashboards accessible to stakeholders
- [ ] Historical SLO compliance reports generated
- [ ] Per-tenant SLA tracking for premium tiers

---

## Incident Response

### Detection and Triage

- [ ] **CRITICAL:** Automated incident detection from monitoring alerts
- [ ] **CRITICAL:** Incident severity classification (P1-P4) documented
- [ ] **CRITICAL:** Tenant impact assessment automated
- [ ] Incident ticket auto-creation from critical alerts
- [ ] On-call rotation scheduling operational
- [ ] Escalation automation for unacknowledged incidents
- [ ] Cross-tenant impact correlation detected

### Response Procedures

- [ ] **CRITICAL:** Incident commander role defined and trained
- [ ] **CRITICAL:** Communication templates prepared for each severity
- [ ] **CRITICAL:** War room procedures documented
- [ ] Bridge call infrastructure available 24/7
- [ ] Status page update procedures documented
- [ ] Customer notification workflows configured
- [ ] Internal stakeholder notification automated

### Resolution and Recovery

- [ ] **CRITICAL:** Kill switch procedures documented and tested
- [ ] **CRITICAL:** Rollback procedures verified for all deployment types
- [ ] **CRITICAL:** Data recovery procedures tested quarterly
- [ ] Service degradation procedures documented
- [ ] Partial service restoration prioritized by tenant tier
- [ ] Incident timeline reconstruction automated
- [ ] Resolution confirmation checklist available

### Postmortem Process

- [ ] **CRITICAL:** Postmortem conducted within 5 business days for P1/P2
- [ ] **CRITICAL:** Root cause analysis completed (5 Whys or similar)
- [ ] **CRITICAL:** Blameless culture maintained in all discussions
- [ ] Incident timeline documented with timestamps
- [ ] Contributing factors identified beyond root cause
- [ ] Impact assessment quantified (tenants, duration, severity)
- [ ] Detection method documented (automated vs manual)
- [ ] Response timeline evaluated against SLOs
- [ ] Resolution steps documented in detail
- [ ] Lessons learned shared with relevant teams
- [ ] Action items tracked with owners and due dates
- [ ] Follow-up review scheduled for action items

---

## Runbook Management

### Runbook Coverage

- [ ] **CRITICAL:** Runbooks exist for all critical system components
- [ ] **CRITICAL:** Runbooks exist for common incident types
- [ ] **CRITICAL:** Runbooks include step-by-step remediation
- [ ] Runbook templates standardized across teams
- [ ] Runbooks link to monitoring dashboards
- [ ] Runbooks link to relevant architecture docs
- [ ] Escalation contacts included in runbooks

### Runbook Maintenance

- [ ] **CRITICAL:** Runbooks reviewed and updated quarterly
- [ ] Runbook accuracy validated during incidents
- [ ] Runbook gaps identified from postmortems
- [ ] New runbooks created for novel incident types
- [ ] Runbook version control maintained
- [ ] Runbook ownership assigned per service
- [ ] Outdated runbooks archived

### Playbook Automation

- [ ] Common remediation steps automated where safe
- [ ] Automation scripts version controlled
- [ ] Automation requires human confirmation for destructive actions
- [ ] Automation execution logged for audit
- [ ] Rollback automation tested regularly

---

## Post-Deployment Verification

### Smoke Test Verification

- [ ] **CRITICAL:** Health check endpoints returning 200 OK (all services)
- [ ] **CRITICAL:** Database connectivity verified
- [ ] **CRITICAL:** Cache layer responsive (Redis/Memcached)
- [ ] **CRITICAL:** Message queue connectivity verified
- [ ] Authentication flow completing successfully
- [ ] Critical API paths returning expected responses
- [ ] Background job processors running
- [ ] Scheduled tasks executing on schedule

### Deployment Monitoring

- [ ] **CRITICAL:** Alerting system receiving metrics post-deployment
- [ ] **CRITICAL:** Error rate within acceptable threshold (< baseline + 10%)
- [ ] **CRITICAL:** Latency metrics within SLA bounds
- [ ] Application dashboards populated with current data
- [ ] Log aggregation receiving entries from all services
- [ ] Distributed tracing capturing requests
- [ ] Cost tracking metrics updating

### Tenant Impact Assessment

- [ ] **CRITICAL:** No increase in tenant error rates
- [ ] **CRITICAL:** No cross-tenant data anomalies detected
- [ ] Tenant-specific SLAs being met
- [ ] No noisy-neighbor alerts triggered
- [ ] Tenant provisioning flow functional
- [ ] Tier entitlements enforced correctly
- [ ] Metering and billing data accurate

### Rollback Criteria

- [ ] **CRITICAL:** Rollback runbook accessible and verified
- [ ] **CRITICAL:** Rollback decision authority identified
- [ ] Rollback automation tested (if applicable)
- [ ] Database migration rollback scripts ready (if applicable)
- [ ] Feature flags configured for quick disable
- [ ] Rollback triggers documented with thresholds

### Post-Deployment Observation

- [ ] 15-minute observation window completed without alerts
- [ ] 30-minute checkpoint review completed
- [ ] Deployment marked as successful in deployment tracker
- [ ] On-call team aware of deployment
- [ ] Support team briefed on changes

---

## AI/ML Operations Monitoring

### Model Health

- [ ] **CRITICAL:** Model inference latency tracked per tenant
- [ ] **CRITICAL:** Model error rates monitored
- [ ] **CRITICAL:** Token usage per tenant tracked
- [ ] Model response quality metrics collected
- [ ] Hallucination detection alerts configured
- [ ] Model version drift detection active
- [ ] A/B test metrics collected where applicable

### Agent Operations

- [ ] **CRITICAL:** Agent execution success rate tracked
- [ ] **CRITICAL:** Agent timeout rates monitored
- [ ] **CRITICAL:** Kill switch activation logged
- [ ] Agent memory usage per tenant tracked
- [ ] Tool execution success/failure rates monitored
- [ ] Human-in-the-loop intervention rates tracked
- [ ] Agent collaboration patterns analyzed

### LLM Provider Health

- [ ] **CRITICAL:** LLM provider availability monitored
- [ ] **CRITICAL:** Provider rate limit proximity alerted
- [ ] **CRITICAL:** Failover activation logged
- [ ] Provider latency compared against SLAs
- [ ] Provider cost per request tracked
- [ ] Provider error categorization automated
- [ ] Multi-provider routing effectiveness measured

### RAG System Operations

- [ ] **CRITICAL:** Vector store query latency monitored
- [ ] **CRITICAL:** Retrieval relevance scores tracked
- [ ] Index freshness monitored
- [ ] Embedding generation latency tracked
- [ ] Knowledge base update propagation verified
- [ ] Per-tenant vector store isolation verified

---

## Tenant Operations

### Tenant Lifecycle

- [ ] **CRITICAL:** Tenant provisioning automated and monitored
- [ ] **CRITICAL:** Tenant offboarding completes within SLA
- [ ] **CRITICAL:** Tenant data isolation verified continuously
- [ ] Tenant configuration changes audited
- [ ] Tenant tier upgrades/downgrades tracked
- [ ] Tenant feature flag management operational
- [ ] Trial-to-paid conversion tracked

### Tenant SLA Monitoring

- [ ] **CRITICAL:** Per-tenant SLA metrics collected
- [ ] **CRITICAL:** SLA breach alerts configured per tier
- [ ] **CRITICAL:** SLA reports generated monthly
- [ ] Premium tier priority verified in resource allocation
- [ ] Tenant health scores calculated
- [ ] Tenant risk indicators tracked
- [ ] Proactive tenant outreach for degraded performance

### Tenant Support

- [ ] Tenant support ticket volume tracked
- [ ] Ticket resolution time monitored
- [ ] Escalation patterns analyzed
- [ ] Self-service resolution rate measured
- [ ] Knowledge base effectiveness tracked
- [ ] Tenant satisfaction surveyed

---

## Capacity Management

### Resource Planning

- [ ] **CRITICAL:** Capacity forecasts generated monthly
- [ ] **CRITICAL:** Resource utilization thresholds defined
- [ ] **CRITICAL:** Auto-scaling policies validated
- [ ] Peak load patterns analyzed
- [ ] Growth projections incorporated
- [ ] Seasonal adjustments planned
- [ ] Reserve capacity maintained

### Scaling Operations

- [ ] **CRITICAL:** Horizontal scaling triggers configured
- [ ] **CRITICAL:** Scale-out time < 5 minutes
- [ ] **CRITICAL:** Scale-down policies prevent thrashing
- [ ] Database connection pool scaling operational
- [ ] Cache cluster scaling operational
- [ ] GPU/TPU scaling for AI workloads operational
- [ ] Cross-region capacity balancing available

### Resource Optimization

- [ ] Underutilized resources identified monthly
- [ ] Right-sizing recommendations generated
- [ ] Spot/preemptible instance utilization optimized
- [ ] Reserved capacity vs on-demand analyzed
- [ ] Resource waste reduction tracked

---

## Cost Monitoring

### Cost Tracking

- [ ] **CRITICAL:** Per-tenant cost attribution operational
- [ ] **CRITICAL:** AI/ML infrastructure costs tracked separately
- [ ] **CRITICAL:** Cost anomaly detection active
- [ ] Infrastructure costs by service tracked
- [ ] Third-party API costs tracked (LLM providers)
- [ ] Data transfer costs monitored
- [ ] Storage costs by tenant tier tracked

### Budget Management

- [ ] **CRITICAL:** Monthly budget thresholds defined
- [ ] **CRITICAL:** Budget alerts at 50%, 80%, 95%
- [ ] **CRITICAL:** Cost overrun escalation configured
- [ ] Cost forecasting based on growth trends
- [ ] Cost optimization recommendations generated
- [ ] Chargebacks to tenant configured (Enterprise)
- [ ] Cost allocation tags maintained

### Cost Optimization

- [ ] Unused resource identification automated
- [ ] Instance right-sizing recommendations actioned
- [ ] Reserved capacity optimization reviewed quarterly
- [ ] LLM token optimization strategies implemented
- [ ] Caching effectiveness for cost reduction measured
- [ ] Cost per transaction/request tracked

---

## SRE Practices

### Continuous Improvement

- [ ] **CRITICAL:** Postmortem action item completion rate > 80%
- [ ] **CRITICAL:** Recurring incident rate < 10%
- [ ] **CRITICAL:** Runbooks updated based on incidents
- [ ] Automation opportunities identified and prioritized
- [ ] Training needs identified from incidents
- [ ] Documentation gaps addressed
- [ ] Process improvement initiatives tracked

### Operational Metrics

- [ ] **CRITICAL:** Mean Time to Detect (MTTD) tracked
- [ ] **CRITICAL:** Mean Time to Respond (MTTR) tracked
- [ ] **CRITICAL:** Mean Time to Resolve tracked
- [ ] Incident recurrence rate monitored
- [ ] Change failure rate tracked
- [ ] Deployment frequency measured
- [ ] Time to restore service tracked

### Knowledge Management

- [ ] Incident learnings added to knowledge base
- [ ] Playbooks created for new incident types
- [ ] Cross-team knowledge sharing sessions held
- [ ] On-call handoff documentation maintained
- [ ] Architecture decision records current
- [ ] Operational best practices documented

### Team Health

- [ ] On-call load balanced across team
- [ ] Toil reduction initiatives tracked
- [ ] Burnout indicators monitored
- [ ] Training and development opportunities provided
- [ ] Knowledge silos identified and addressed

---

## Critical vs Non-Critical Classification

| Category | Classification | CONDITIONAL Threshold | FAIL Threshold |
|----------|----------------|----------------------|----------------|
| Infrastructure Monitoring | CRITICAL | Metrics gaps | No monitoring |
| Application Monitoring | CRITICAL | Coverage incomplete | No APM |
| Alerting Configuration | CRITICAL | Thresholds missing | No alerting |
| SLO Monitoring | CRITICAL | Tracking gaps | No SLO defined |
| Detection and Triage | CRITICAL | Classification incomplete | No incident detection |
| Response Procedures | CRITICAL | Templates incomplete | No response process |
| Resolution and Recovery | CRITICAL | Procedures incomplete | No rollback capability |
| Postmortem Process | CRITICAL | Review delayed | No postmortems |
| Runbook Coverage | CRITICAL | Gaps identified | No runbooks |
| Runbook Maintenance | CRITICAL | Reviews overdue | No ownership |
| Smoke Test Verification | CRITICAL | Minor health warnings | Service unavailable |
| Deployment Monitoring | CRITICAL | Alerting delayed | No post-deploy monitoring |
| Tenant Impact Assessment | CRITICAL | Single tenant affected | Multiple tenants or data breach |
| Model Health | CRITICAL | Quality metrics missing | No model monitoring |
| Agent Operations | CRITICAL | Kill switch untested | No agent monitoring |
| Tenant Lifecycle | CRITICAL | Provisioning delays | Provisioning broken |
| Tenant SLA Monitoring | CRITICAL | Reports delayed | No SLA tracking |
| Resource Planning | CRITICAL | Forecasts outdated | No capacity planning |
| Cost Tracking | CRITICAL | Attribution incomplete | No cost tracking |
| Continuous Improvement | CRITICAL | Action items <60% | No improvement process |
| Operational Metrics | CRITICAL | Metrics incomplete | No MTTD/MTTR tracking |
| Playbook Automation | Non-critical | Automation gaps | N/A |
| Tenant Support | Non-critical | Resolution delays | N/A |
| Team Health | Non-critical | Load imbalanced | N/A |

---

## Gate Decision

| Classification | Criteria |
|----------------|----------|
| **PASS** | All CRITICAL items pass, operations excellence maintained |
| **CONDITIONAL** | All CRITICAL items pass, non-critical gaps documented, remediation within 5 business days |
| **FAIL** | Any CRITICAL item fails - trigger process improvement review, block release until resolved |
| **WAIVED** | Non-critical item explicitly waived with stakeholder sign-off and documented justification |

**Note:** Unlike pre-release gates, QG-OPS failures trigger process improvement reviews rather than blocking deployments (unless critical safety issues are detected).

---

## Waiver Process

For non-critical items that cannot be addressed:

1. Document the specific item and reason for waiver
2. Identify business justification
3. Obtain stakeholder sign-off (SRE Lead or Engineering Manager)
4. Record waiver in gate report with expiration date (if applicable)
5. Create follow-up ticket for future remediation

**Note:** CRITICAL items cannot be waived.

---

## Recovery Protocol

**If gate triggers CONDITIONAL or FAIL status:**

### Attempt 1: Immediate Remediation (target: 5 business days)

- Identify failed check categories
- Prioritize tenant-impacting issues
- Update monitoring coverage gaps
- Fix alerting configuration issues
- Complete missing runbook sections
- Update postmortem documentation
- Re-evaluate gate status after corrections
- **Lock passed categories** - focus on remaining gaps

### Attempt 2: Deep Investigation (target: 1-2 weeks)

- Engage SRE and Engineering leads
- Analyze recurring incident patterns
- Review action item completion blockers
- Implement automation for metric collection
- Create training for operational procedures
- Update runbook templates for missing sections
- Re-evaluate gate status after improvements
- **Preserve locked categories** from Attempt 1

### Attempt 3: Mandatory Course Correction

- Escalate to VP Engineering and SRE leadership
- Document systemic process failures
- Conduct retrospective on operations culture
- Consider external operations maturity assessment
- Create organizational improvement plan
- Define operations excellence OKRs
- Schedule follow-up review within 30 days

### Category-Specific Recovery

| Category | Immediate Action | Escalation Trigger |
|----------|------------------|-------------------|
| Monitoring | Add missing metrics, fix collection | Critical blind spots |
| Alerting | Configure thresholds, fix routing | No alerting active |
| Incident Response | Update procedures, train team | No response process |
| Postmortem | Complete missing sections, schedule reviews | No postmortem >5 days |
| Runbooks | Fill gaps, assign ownership | Critical gaps |
| Post-Deployment | Fix smoke tests, verify monitoring | Deployment validation broken |
| AI/ML Ops | Add model monitoring, verify kill switches | Model health unknown |
| Tenant Ops | Fix provisioning, update SLA tracking | Provisioning broken |
| Capacity | Update forecasts, verify scaling | Capacity at risk |
| Cost | Fix attribution, configure alerts | Cost tracking broken |
| SRE Practices | Complete action items, update metrics | MTTD/MTTR not tracked |

---

## Rollback Triggers (Post-Deployment)

| Trigger | Threshold | Action |
|---------|-----------|--------|
| Error rate spike | > 5% increase from baseline | Immediate rollback |
| P1 incidents | Any P1 incident post-deploy | Evaluate rollback within 15 min |
| Tenant data isolation breach | Any detection | Immediate rollback |
| Core service unavailable | > 2 minutes | Immediate rollback |
| SLA breach | Any tier | Evaluate rollback within 30 min |
| Agent safety trigger | Kill switch activated | Evaluate rollback |

---

## Automated Validation Script

```bash
# Run as part of QG-OPS continuous validation
./scripts/validate-operations.sh

# Validates:
# - Monitoring coverage and health
# - Alerting configuration
# - Runbook completeness
# - Postmortem compliance
# - SLO tracking
# - Cost attribution
```

---

## Related Workflows

- `bmad-bam-tenant-aware-observability` - Observability setup
- `bmad-bam-incident-response-operations` - Incident handling
- `bmad-bam-disaster-recovery-design` - DR planning
- `bmad-bam-api-version-release` - Release management
- `bmad-bam-postmortem-process` - Postmortem creation

## Related Templates

- `runbook-template.md` - Operational procedures
- `incident-response-template.md` - Incident response
- `postmortem-template.md` - Post-incident review
- `slo-dashboard-template.md` - SLO tracking
- `cost-report-template.md` - Cost analysis

## Related Patterns

- `tenant-aware-observability.md` - Multi-tenant monitoring
- `incident-response-patterns.md` - Incident management
- `sre-practices.md` - SRE operational guidance
- `cost-attribution.md` - Cost tracking patterns

---

## Web Research Verification

- [ ] Search the web: "SRE operational excellence best practices {date}" - Verify operational patterns
- [ ] Search the web: "multi-tenant monitoring alerting patterns {date}" - Confirm monitoring approaches
- [ ] Search the web: "post-deployment verification SaaS best practices {date}" - Verify deployment validation
- [ ] Search the web: "incident response postmortem practices {date}" - Confirm incident management
- [ ] Search the web: "AI/ML operations monitoring LLMOps {date}" - Verify AI operations patterns
- [ ] _Source: [URL]_ citations documented for key operational decisions

---

**PASS CRITERIA:** All CRITICAL checkboxes completed, operations excellence maintained, continuous improvement active
**OWNER:** SRE Lead
**REVIEWERS:** Engineering Manager, VP Engineering, AI Runtime Architect

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 2.0.0 | 2026-04-27 | BAM | Mega-merge of V1 operations checklists; consolidates qg-operations-continuous, qg-post-deployment, qg-prod-checklist post-deploy sections into comprehensive operations gate |
