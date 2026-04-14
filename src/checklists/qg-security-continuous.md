# QG-SC: Continuous Security Monitoring Checklist

> Gate ID: QG-SC (Security Continuous)
> Security posture MUST be verified continuously in production.
> Gate definition: verifies automated security monitoring, compliance, and threat detection.
> Workflow integration: BAM security operations workflows feed into this gate.
> Executing workflow: `security-operations-verification`
>
> **Operational Gate:** Unlike pre-release gates, QG-SC is evaluated continuously
> during production operations. Failures trigger automated incident response.

## Automated Compliance Verification

### Continuous Compliance Scanning

- [ ] Configuration drift detection active (IaC vs actual state)
- [ ] Policy-as-code enforcement enabled (OPA/Rego policies)
- [ ] Automated compliance evidence collection running
- [ ] CIS benchmark scanning scheduled (weekly minimum)
- [ ] Cloud security posture management (CSPM) active
- [ ] Infrastructure vulnerability scanning continuous
- [ ] Container image scanning in CI/CD pipeline
- [ ] Secrets scanning in code repositories
- [ ] License compliance checking automated
- [ ] Data classification scanning active

### Framework-Specific Compliance Checks

- [ ] **GDPR:** Consent records verified, retention policies enforced, DSAR queue monitored
- [ ] **SOC 2:** Control effectiveness evidence collected, access reviews scheduled
- [ ] **HIPAA:** PHI access logging verified, BAA status tracked, encryption validated
- [ ] **ISO 27001:** ISMS controls assessed, risk register updated, audit evidence ready
- [ ] **EU AI Act:** Risk classification current, transparency logs active, human oversight verified
- [ ] **PCI DSS:** Cardholder data environment scoped, network segmentation verified
- [ ] **NIST CSF 2.0:** Govern function active, supply chain risks assessed

### Compliance Dashboard Requirements

- [ ] Real-time compliance score visible per framework
- [ ] Non-compliance items tracked with remediation deadlines
- [ ] Compliance trend analysis over 90-day window
- [ ] Automated compliance reports generated monthly
- [ ] Audit-ready evidence package exportable on demand
- [ ] Compliance exceptions documented with compensating controls

## Security Metrics Tracking

### Key Security Indicators (KSIs)

- [ ] Mean Time to Detect (MTTD) < 15 minutes for critical events
- [ ] Mean Time to Respond (MTTR) < 1 hour for P1 incidents
- [ ] Mean Time to Remediate (MTTRem) < 24 hours for critical vulnerabilities
- [ ] Patch compliance rate > 95% within SLA
- [ ] False positive rate for alerts < 20%
- [ ] Security training completion rate > 90%

### Vulnerability Metrics

- [ ] Critical vulnerability count tracked (target: 0 in production)
- [ ] High vulnerability remediation SLA: 7 days
- [ ] Medium vulnerability remediation SLA: 30 days
- [ ] Vulnerability aging report generated weekly
- [ ] Dependency vulnerability tracking active
- [ ] Container vulnerability metrics by tenant tier

### Access and Authentication Metrics

- [ ] Failed authentication rate monitored per tenant
- [ ] Privileged access usage tracked
- [ ] Service account activity audited
- [ ] MFA adoption rate > 99% for admin accounts
- [ ] Session anomaly detection active
- [ ] Credential age compliance tracked

### Tenant-Specific Security Metrics

- [ ] Per-tenant security score calculated
- [ ] Tenant isolation test results tracked
- [ ] Tenant-specific incident count monitored
- [ ] Enterprise tenant SLA compliance tracked
- [ ] Tenant security configuration drift detected

## Threat Intelligence Integration

### Threat Feed Integration

- [ ] Commercial threat feeds integrated (minimum 2 sources)
- [ ] Open source threat feeds active (AbuseIPDB, AlienVault OTX)
- [ ] Industry-specific threat feeds subscribed (ISAC membership)
- [ ] Threat feed freshness verified (< 1 hour latency)
- [ ] Indicator of Compromise (IOC) matching automated
- [ ] Threat actor tracking for relevant APT groups

### Threat Correlation

- [ ] IP reputation checking on all inbound connections
- [ ] Domain reputation checking for outbound connections
- [ ] File hash checking against known malware
- [ ] URL filtering with threat intelligence
- [ ] Email threat intelligence for phishing detection
- [ ] Certificate transparency monitoring active

### AI-Specific Threat Intelligence

- [ ] Prompt injection attack patterns updated weekly
- [ ] Model vulnerability disclosures monitored
- [ ] AI framework security advisories tracked
- [ ] Adversarial ML technique database updated
- [ ] AI supply chain threat monitoring active

### Threat Hunting

- [ ] Proactive threat hunting scheduled monthly
- [ ] Hypothesis-driven hunting documented
- [ ] Hunt findings fed back to detection rules
- [ ] Threat hunting metrics tracked (hunts/findings/improvements)
- [ ] Red team exercises scheduled quarterly

## Data Loss Prevention (DLP) Controls Verification

### Data Classification Enforcement

- [ ] Data classification labels applied automatically
- [ ] Unclassified data detection and alerting
- [ ] Classification accuracy validation checks
- [ ] Sensitive data discovery scanning active
- [ ] Shadow data store detection enabled

### Data Movement Controls

- [ ] Outbound data transfer monitoring active
- [ ] Large data export detection and alerting
- [ ] Cloud storage egress monitoring
- [ ] Email DLP scanning enabled
- [ ] Web upload DLP controls active
- [ ] USB/removable media controls (where applicable)
- [ ] Screenshot/screen recording detection (for sensitive apps)

### Tenant Data Isolation DLP

- [ ] Cross-tenant data transfer detection
- [ ] Tenant data boundary violations alerted
- [ ] Data export per-tenant audit trail
- [ ] API response data leakage detection
- [ ] Cache content isolation verified
- [ ] Log sanitization preventing tenant data leak

### AI-Specific DLP

- [ ] Prompt logging excludes PII/sensitive data
- [ ] Model response data classification verified
- [ ] Training data isolation confirmed
- [ ] Fine-tuning data segregation enforced
- [ ] Agent memory DLP scanning active
- [ ] Tool input/output DLP monitoring

### DLP Metrics

- [ ] DLP incident count tracked by severity
- [ ] False positive rate for DLP < 30%
- [ ] Policy exception requests tracked
- [ ] Data exposure risk score calculated

## Runtime Anomaly Detection

### Application Behavior Monitoring

- [ ] Baseline application behavior established
- [ ] API call pattern anomaly detection active
- [ ] Response time anomaly detection enabled
- [ ] Error rate anomaly alerting configured
- [ ] Resource usage anomaly detection active
- [ ] Code execution anomaly monitoring (for dynamic code)

### Network Anomaly Detection

- [ ] Network traffic baseline established
- [ ] Lateral movement detection active
- [ ] Unusual port usage detection enabled
- [ ] DNS anomaly detection (tunneling, DGA)
- [ ] Encrypted traffic analysis enabled
- [ ] Geographic anomaly detection for access

### User Behavior Analytics (UBA)

- [ ] User activity baselines established per role
- [ ] Impossible travel detection active
- [ ] Off-hours access monitoring enabled
- [ ] Privilege escalation detection active
- [ ] Data access pattern anomaly detection
- [ ] Account compromise indicators monitored

### AI Agent Anomaly Detection

- [ ] Agent behavior baseline established
- [ ] Tool usage anomaly detection active
- [ ] Prompt pattern anomaly detection
- [ ] Token consumption anomaly alerting
- [ ] Response quality anomaly detection
- [ ] Agent collaboration pattern monitoring
- [ ] Memory access pattern monitoring

### Infrastructure Anomaly Detection

- [ ] Container behavior baseline established
- [ ] Process execution anomaly detection
- [ ] File system change detection active
- [ ] Configuration change monitoring
- [ ] Secrets access anomaly detection
- [ ] Cloud resource creation anomaly alerting

## Incident Automation

### Automated Response Playbooks

- [ ] High-severity incident auto-containment enabled
- [ ] Compromised credential auto-revocation
- [ ] Malicious IP auto-blocking
- [ ] Anomalous agent auto-suspension
- [ ] DLP violation auto-quarantine
- [ ] Vulnerable container auto-isolation

### Incident Enrichment Automation

- [ ] Alert correlation across data sources
- [ ] Automatic threat intelligence enrichment
- [ ] User/asset context injection
- [ ] Historical incident correlation
- [ ] Impact assessment automation
- [ ] Related tenant identification

### Notification Automation

- [ ] Severity-based escalation rules active
- [ ] On-call rotation integration working
- [ ] Tenant notification automation (per SLA tier)
- [ ] Regulatory notification deadline tracking
- [ ] Executive briefing automation for P1s

### Recovery Automation

- [ ] Automated backup verification
- [ ] Failover automation tested
- [ ] Data restoration automation validated
- [ ] Service recovery orchestration active
- [ ] Post-incident evidence preservation automated

## Gate Decision

| Outcome | Criteria |
|---------|----------|
| **PASS** | All categories GREEN — Continue monitoring |
| **CONDITIONAL** | Any CRITICAL category YELLOW — Remediate within 24 hours, proceed with mitigation plan |
| **FAIL** | Any CRITICAL category RED — Trigger incident response immediately, block release |
| **WAIVED** | Non-critical item explicitly waived with stakeholder sign-off and documented justification |

## Waiver Process

For non-critical items that cannot be addressed:
1. Document the specific item and reason for waiver
2. Identify business justification
3. Obtain stakeholder sign-off (Product Owner or Technical Lead)
4. Record waiver in gate report with expiration date (if applicable)
5. Create follow-up ticket for future remediation

**Note:** CRITICAL items cannot be waived.

## Critical vs Non-Critical Classification

| Category                          | Classification | CONDITIONAL Threshold | FAIL Threshold |
| --------------------------------- | -------------- | ------------------ | ------------------ |
| Automated Compliance Verification | CRITICAL       | 1+ framework < 90% | 1+ framework < 70% |
| Security Metrics Tracking         | CRITICAL       | MTTD > 30 min      | MTTD > 1 hour      |
| Threat Intelligence Integration   | Non-critical   | Feeds > 4hr stale  | Feeds > 24hr stale |
| DLP Controls Verification         | CRITICAL       | 1+ violation/day   | Data breach        |
| Runtime Anomaly Detection         | CRITICAL       | Detection gaps     | Active threat      |
| Incident Automation               | Non-critical   | Playbook failure   | Response delay     |

## Continuous Monitoring Schedule

| Check Type                    | Frequency      | Automated | Dashboard |
| ----------------------------- | -------------- | --------- | --------- |
| Compliance drift              | Every 15 min   | Yes       | Real-time |
| Vulnerability scanning        | Daily          | Yes       | Daily     |
| Threat intelligence update    | Every 1 hour   | Yes       | Real-time |
| DLP policy evaluation         | Real-time      | Yes       | Real-time |
| Anomaly detection             | Real-time      | Yes       | Real-time |
| Security metrics calculation  | Every 1 hour   | Yes       | Hourly    |
| Incident playbook validation  | Weekly         | Partial   | Weekly    |
| Threat hunting                | Monthly        | No        | Monthly   |

## Recovery Protocol

**If gate triggers CONDITIONAL or FAIL status:**

1. **Attempt 1:** Immediate containment and assessment (target: 24 hours)
   - Activate incident response playbook for affected category
   - Isolate affected systems/tenants if data breach suspected
   - Review security metrics dashboard for scope assessment
   - Execute automated containment for known threat patterns
   - Re-evaluate gate status after initial response
   - **Lock passed categories**

2. **Attempt 2:** Deep investigation and remediation (target: 1 week)
   - Engage Security Operations (SecOps) and relevant domain experts
   - Conduct forensic analysis of affected systems
   - Review threat intelligence for related indicators of compromise
   - Update DLP policies and anomaly detection baselines
   - Patch identified vulnerabilities within SLA timeframes
   - Re-evaluate gate status after remediation
   - **Preserve locked categories**

3. **Mandatory Course Correction:**
   - Escalate to CISO and executive leadership
   - Activate breach notification procedures if required by compliance frameworks
   - Document incident in security incident register
   - Conduct post-incident review within 72 hours
   - Update threat hunting hypotheses based on findings
   - Implement additional controls to prevent recurrence

**Category-Specific Recovery:**

| Category | Immediate Action | Escalation Trigger |
|----------|------------------|-------------------|
| Compliance Verification | Re-run compliance scans, review policy drift | Framework score < 70% |
| Security Metrics | Investigate MTTD/MTTR degradation, tune alerting | MTTD > 1 hour |
| Threat Intelligence | Refresh threat feeds, verify IOC matching | Feeds > 24hr stale |
| DLP Controls | Quarantine affected data, audit export logs | Any confirmed data breach |
| Anomaly Detection | Update baselines, investigate detection gaps | Active threat undetected |
| Incident Automation | Test playbooks, verify notification routing | Response delay > SLA |

## Related Workflows

- `bmad-bam-tenant-aware-observability` - Security monitoring setup
- `bmad-bam-security-operations-verification` - Full security audit
- `bmad-bam-incident-response-operations` - Incident handling procedures

## Web Research Verification

- [ ] Search the web: "continuous security monitoring SaaS best practices {date}" - Verify monitoring patterns
- [ ] Search the web: "AI-specific threat intelligence patterns {date}" - Confirm AI threat detection is current
- [ ] Search the web: "DLP multi-tenant cloud platforms {date}" - Verify data loss prevention approaches
- [ ] _Source: [URL]_ citations documented for key security monitoring decisions

**PASS CRITERIA:** All automated checks running, all critical categories GREEN
**OWNER:** Security Operations (SecOps)
**REVIEWERS:** CISO, Platform Engineering, Compliance
