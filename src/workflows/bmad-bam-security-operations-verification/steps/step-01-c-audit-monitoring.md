# Step 1: Audit Security Monitoring

## Purpose

Audit security monitoring capabilities for comprehensive threat visibility.

## Prerequisites

- Security architecture documented
- Monitoring infrastructure deployed
- **Load template:** `{project-root}/_bmad/bam/data/templates/observability-template.md`

## Actions

### 1. Security Event Coverage

| Event Category | Sources | Collection | Alert | Status |
|----------------|---------|------------|-------|--------|
| Authentication | IAM, API Gateway | SIEM | Yes | |
| Authorization | RBAC, RLS | SIEM | Yes | |
| Network | WAF, Firewall | SIEM | Yes | |
| Application | API, Services | SIEM | Yes | |
| AI Operations | LLM, Agents | SIEM | Yes | |
| Data Access | Database, Storage | SIEM | Yes | |

### 2. SIEM Integration Audit

| Integration | Status | Data Flow | Alert Rules |
|-------------|--------|-----------|-------------|
| Cloud provider logs | | | |
| Application logs | | | |
| Network flow logs | | | |
| WAF logs | | | |
| Container logs | | | |

### 3. Security Dashboard Verification

| Dashboard | Metrics Shown | Refresh Rate | Access |
|-----------|---------------|--------------|--------|
| Threat overview | Threats, severity | Real-time | SecOps |
| Authentication | Logins, failures | Real-time | SecOps |
| AI security | Guardrail events | Real-time | SecOps |
| Compliance | Control status | Hourly | Compliance |

### 4. Security Alert Configuration

| Alert Type | Threshold | Priority | Response Time |
|------------|-----------|----------|---------------|
| Brute force | 5 attempts/min | Critical | Immediate |
| Injection attempt | Any detected | High | 5 min |
| Data exfiltration | Anomaly | Critical | Immediate |
| Privilege escalation | Any attempt | Critical | Immediate |
| AI guardrail violation | Severity-based | Variable | Based on severity |

**Verify monitoring best practices with web search:**
Search the web: "security monitoring AI platforms best practices {date}"

## Verification

- [ ] All security events collected
- [ ] SIEM integration verified
- [ ] Dashboards operational
- [ ] Alerts configured

## Outputs

- Security monitoring audit findings

## Next Step

Proceed to `step-02-c-test-incident-response.md`
