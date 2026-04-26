# Step 03: Verify Observability and Monitoring

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 📊 **VERIFY tenant attribution** in all observability data

## EXECUTION PROTOCOLS

- 🎯 Focus: Verify observability and monitoring readiness
- 💾 Track: `stepsCompleted: [1, 2, 3]` when complete
- 📖 Context: Metrics, alerting, logging, tracing, health checks
- 🚫 Do NOT: Assess security/compliance (that's Step 04)
- 🔍 Use web search: Verify observability patterns against current SRE best practices
- ⚠️ Gate: QG-P1 - Observability is CRITICAL category

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Metrics collection and dashboards
- Alerting thresholds and escalation paths
- Log aggregation and retention policies
- Distributed tracing for tenant attribution
- Health check endpoints and synthetic monitoring

**OUT OF SCOPE:**
- Security and compliance (Step 04)
- Final GO/NO-GO decision (Step 05)
- Infrastructure configuration (Step 02)

---

## Purpose

Verify that observability and monitoring infrastructure is production-ready, including metrics collection, alerting, logging, distributed tracing with tenant attribution, and health check endpoints. Observability is a CRITICAL category for QG-P1.

---

## Prerequisites

- Step 02 completed: Infrastructure analysis done
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: observability

---

## Inputs

- Infrastructure analysis from Step 02
- Observability configuration files
- Dashboard definitions
- Alert rules
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## YOUR TASK:

Verify observability readiness across all monitoring categories.

---

## Main Sequence

### 1. Metrics Collection and Dashboards

#### 1.1 Metrics Coverage

| Metric Category | Collected | Tool | Tenant-Aware |
|-----------------|-----------|------|--------------|
| Application metrics | YES/NO | {{tool}} | YES/NO |
| Business metrics | YES/NO | {{tool}} | YES/NO |
| Infrastructure metrics | YES/NO | {{tool}} | YES/NO |
| Database metrics | YES/NO | {{tool}} | YES/NO |
| AI/Agent metrics | YES/NO | {{tool}} | YES/NO |
| Cost/Usage metrics | YES/NO | {{tool}} | YES/NO |

**Criteria:**
- [ ] All critical application paths instrumented
- [ ] Metrics include tenant_id dimension
- [ ] Cardinality managed (not excessive labels)
- [ ] Retention period meets compliance needs

#### 1.2 Key Business Metrics

| Metric | Definition | SLI/SLO | Dashboard |
|--------|------------|---------|-----------|
| Request latency | P50/P95/P99 | {{slo}} | YES/NO |
| Error rate | 5xx / total | {{slo}} | YES/NO |
| Availability | Uptime % | {{slo}} | YES/NO |
| Tenant operations | CRUD counts | N/A | YES/NO |
| Agent executions | Success/failure | {{slo}} | YES/NO |
| Token usage | Per tenant | N/A | YES/NO |

#### 1.3 Dashboard Inventory

| Dashboard | Purpose | Audience | Tenant Filter |
|-----------|---------|----------|---------------|
| Executive Overview | Business health | Leadership | Aggregate |
| Operations | Real-time health | SRE/Ops | Per-tenant |
| Tenant Dashboard | Customer metrics | Customers | Single tenant |
| Agent Performance | AI agent health | AI Ops | Per-tenant |
| Cost Attribution | Usage billing | Finance | Per-tenant |

**Criteria:**
- [ ] Executive dashboard exists
- [ ] Operations dashboard with drill-down
- [ ] Tenant-facing dashboard (if applicable)
- [ ] All dashboards tested and functional

### 2. Alerting and Escalation

#### 2.1 Alert Coverage

| Alert Category | Rules Defined | Tested | Runbook |
|----------------|---------------|--------|---------|
| Availability | {{count}} | YES/NO | YES/NO |
| Latency | {{count}} | YES/NO | YES/NO |
| Error rate | {{count}} | YES/NO | YES/NO |
| Resource saturation | {{count}} | YES/NO | YES/NO |
| Tenant isolation breach | {{count}} | YES/NO | YES/NO |
| Agent failures | {{count}} | YES/NO | YES/NO |
| Security events | {{count}} | YES/NO | YES/NO |

**Criteria:**
- [ ] All SLOs have corresponding alerts
- [ ] Alert thresholds validated
- [ ] Each alert has a runbook
- [ ] Alerts tested (chaos engineering or simulation)

#### 2.2 Alert Severity and Routing

| Severity | Criteria | Notification Channel | Response Time |
|----------|----------|---------------------|---------------|
| P1 Critical | Customer impact | PagerDuty + Slack | 15 min |
| P2 High | Degraded service | PagerDuty + Slack | 1 hour |
| P3 Medium | Potential issue | Slack + Email | 4 hours |
| P4 Low | Informational | Email | 24 hours |

#### 2.3 Escalation Path

| Level | Responder | Timeout | Next Level |
|-------|-----------|---------|------------|
| L1 | On-call engineer | 15 min | L2 |
| L2 | Team lead | 30 min | L3 |
| L3 | Engineering manager | 1 hour | Incident commander |
| IC | Incident commander | - | Executive (if needed) |

**Criteria:**
- [ ] Escalation paths documented
- [ ] On-call rotation configured
- [ ] Escalation tested in drills

### 3. Log Aggregation and Retention

#### 3.1 Log Collection

| Log Source | Collected | Format | Tenant-Tagged |
|------------|-----------|--------|---------------|
| Application logs | YES/NO | JSON/Text | YES/NO |
| Access logs | YES/NO | JSON/Text | YES/NO |
| Error logs | YES/NO | JSON/Text | YES/NO |
| Audit logs | YES/NO | JSON/Text | YES/NO |
| Agent execution logs | YES/NO | JSON/Text | YES/NO |
| Infrastructure logs | YES/NO | JSON/Text | YES/NO |

**Criteria:**
- [ ] All log sources collected centrally
- [ ] Structured logging (JSON preferred)
- [ ] Tenant ID included in all log entries
- [ ] Correlation IDs for request tracing

#### 3.2 Log Retention Policy

| Log Type | Hot Storage | Warm Storage | Archive | Total |
|----------|-------------|--------------|---------|-------|
| Application | {{days}} days | {{days}} days | {{years}} years | {{total}} |
| Audit | {{days}} days | {{days}} days | {{years}} years | {{total}} |
| Security | {{days}} days | {{days}} days | {{years}} years | {{total}} |
| Access | {{days}} days | {{days}} days | {{years}} years | {{total}} |

**Criteria:**
- [ ] Retention meets compliance requirements
- [ ] Audit logs immutable
- [ ] Log deletion policies enforced
- [ ] Cost optimization (tiered storage)

#### 3.3 Log Security

| Check | Status |
|-------|--------|
| PII scrubbing/masking | YES/NO |
| Access control to logs | YES/NO |
| Log integrity verification | YES/NO |
| Encryption at rest | YES/NO |
| Encryption in transit | YES/NO |

### 4. Distributed Tracing

#### 4.1 Tracing Coverage

| Service/Component | Instrumented | Propagation | Tenant Context |
|-------------------|--------------|-------------|----------------|
| API Gateway | YES/NO | YES/NO | YES/NO |
| Backend Services | YES/NO | YES/NO | YES/NO |
| Database Queries | YES/NO | N/A | YES/NO |
| External API Calls | YES/NO | YES/NO | YES/NO |
| AI Agent Execution | YES/NO | YES/NO | YES/NO |
| Message Queue | YES/NO | YES/NO | YES/NO |

**Criteria:**
- [ ] All services instrumented
- [ ] Context propagation working
- [ ] Tenant ID in all spans
- [ ] Sampling rate appropriate

#### 4.2 Trace Analysis

| Capability | Available | Tool |
|------------|-----------|------|
| Service dependency map | YES/NO | {{tool}} |
| Latency breakdown | YES/NO | {{tool}} |
| Error trace analysis | YES/NO | {{tool}} |
| Cross-tenant isolation | YES/NO | {{tool}} |
| Agent execution traces | YES/NO | {{tool}} |

#### 4.3 Tenant Attribution

| Trace Attribute | Present | Verified |
|-----------------|---------|----------|
| tenant_id | YES/NO | YES/NO |
| user_id | YES/NO | YES/NO |
| request_id | YES/NO | YES/NO |
| agent_execution_id | YES/NO | YES/NO |
| session_id | YES/NO | YES/NO |

**Criteria:**
- [ ] Tenant attribution in all traces
- [ ] No cross-tenant data leakage in traces
- [ ] Trace data retention appropriate

### 5. Health Checks and Synthetic Monitoring

#### 5.1 Health Check Endpoints

| Endpoint | Purpose | Checks | Frequency |
|----------|---------|--------|-----------|
| /health/live | Liveness | Process alive | 10s |
| /health/ready | Readiness | Dependencies up | 30s |
| /health/deep | Deep check | Full system | 1min |

**Criteria:**
- [ ] Liveness probe configured (Kubernetes)
- [ ] Readiness probe configured
- [ ] Health endpoints unauthenticated
- [ ] Dependency health included

#### 5.2 Synthetic Monitoring

| Journey | Monitored | Frequency | Alert |
|---------|-----------|-----------|-------|
| User login | YES/NO | {{freq}} | YES/NO |
| Core workflow | YES/NO | {{freq}} | YES/NO |
| API availability | YES/NO | {{freq}} | YES/NO |
| Agent execution | YES/NO | {{freq}} | YES/NO |
| Payment flow | YES/NO | {{freq}} | YES/NO |

**Criteria:**
- [ ] Critical user journeys monitored
- [ ] External monitoring (outside infrastructure)
- [ ] Alerts on synthetic failures
- [ ] Geographic coverage (if global)

#### 5.3 SLO Monitoring

| SLO | Target | Current | Error Budget |
|-----|--------|---------|--------------|
| Availability | {{target}}% | {{current}}% | {{remaining}}% |
| Latency P99 | {{target}}ms | {{current}}ms | {{status}} |
| Error Rate | {{target}}% | {{current}}% | {{remaining}}% |

**Criteria:**
- [ ] SLOs defined and documented
- [ ] SLO dashboards available
- [ ] Error budget tracking
- [ ] SLO breach alerting

---

## COLLABORATION MENUS (A/P/C)

After completing observability analysis, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific observability concerns
- **P (Party Mode)**: Multi-persona review of monitoring readiness
- **C (Continue)**: Accept analysis and proceed to security validation
- **[Specific concerns]**: Describe concerns to investigate further

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: observability findings, alerting gaps, tracing issues
- Process enhanced insights on SRE patterns
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into analysis
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review observability readiness for production: {summary}"
- Process SRE Engineer and Platform Architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document observability analysis findings
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-document.md`

---

## SUCCESS METRICS:

- [ ] Metrics collection verified
- [ ] Alerting and escalation documented
- [ ] Log aggregation configured
- [ ] Distributed tracing with tenant attribution
- [ ] Health checks and synthetic monitoring
- [ ] SLOs defined and tracked

---

## FAILURE MODES:

| Failure | Recovery |
|---------|----------|
| Missing tenant attribution | Add tenant_id to all observability data |
| No alerting runbooks | Create runbooks before production |
| Incomplete tracing | Instrument missing services |
| No synthetic monitoring | Configure external monitoring |

---

## Verification

- [ ] All observability categories assessed
- [ ] CRITICAL issues identified
- [ ] Tenant attribution verified
- [ ] Patterns align with pattern registry

---

## Outputs

- Observability readiness assessment
- Metrics and dashboard inventory
- Alerting and escalation documentation
- Tracing coverage analysis
- Health check verification results

---

## NEXT STEP:

Proceed to `step-04-c-document.md` to validate security and compliance readiness.
