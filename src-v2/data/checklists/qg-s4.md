---
name: qg-s4-security-continuous
description: Security continuous gate - vulnerability scanning, penetration testing, security monitoring, and threat intelligence for multi-tenant SaaS
module: bam
tags: [security, quality-gate, multi-tenant, continuous, monitoring, vulnerability, threat-intelligence]
version: 2.0.0
---

# QG-S4: Security Continuous Gate Checklist

> **Gate ID:** QG-S4 (Security Continuous)
> **Definition:** Security posture MUST be continuously verified in production operations.
> **Scope:** Covers vulnerability scanning, penetration testing, security monitoring, threat intelligence, and incident response.
> **Recovery:** Gate failure triggers automated incident response and remediation workflows.

**Workflow:** bmad-bam-security-operations-verification, bmad-bam-tenant-aware-observability
**Prerequisites:** QG-S3 (Security Baseline), QG-P1 (Production Readiness)

**Operational Gate:** Unlike pre-release gates, QG-S4 is evaluated continuously during production operations. Failures trigger automated incident response.

---

## Purpose

The Security Continuous Gate (QG-S4) validates that ongoing security controls are operational and effective. This gate ensures:

1. **Vulnerability management** processes are active with defined SLAs
2. **Penetration testing** is conducted regularly with findings addressed
3. **Security monitoring** detects and alerts on threats in real-time
4. **Threat intelligence** is integrated and current
5. **Incident response** automation is operational and tested

Passing QG-S4 confirms security operations are continuously protecting the platform.

---

## Vulnerability Management

### Continuous Vulnerability Scanning

- [ ] **CRITICAL:** Container image scanning in CI/CD pipeline active
- [ ] **CRITICAL:** Critical vulnerabilities remediated within 24 hours (zero tolerance in production)
- [ ] **CRITICAL:** Infrastructure vulnerability scanning scheduled (daily minimum)
- [ ] Dependency scanning (SCA) automated on every build
- [ ] High-severity vulnerability SLA: 7 days remediation
- [ ] Medium-severity vulnerability SLA: 30 days remediation
- [ ] Vulnerability aging report generated weekly
- [ ] Third-party component inventory maintained and current

### Vulnerability Tracking

- [ ] **CRITICAL:** Vulnerability tracking integrated with ticketing system
- [ ] **CRITICAL:** Vulnerability count dashboard visible to security team
- [ ] Critical/high count tracked per module and tenant tier
- [ ] Container vulnerability metrics by deployment
- [ ] Dependency vulnerability tracking active
- [ ] False positive management process documented
- [ ] Exception handling with risk acceptance documented

### Patch Management

- [ ] **CRITICAL:** Security patching process documented and tested
- [ ] **CRITICAL:** Patch compliance rate > 95% within SLA
- [ ] Emergency patching procedure tested quarterly
- [ ] Rollback capability for failed patches verified
- [ ] Patch testing in staging environment required
- [ ] Automated patch deployment for critical updates
- [ ] End-of-life component replacement tracked

---

## Penetration Testing

### Regular Testing Schedule

- [ ] **CRITICAL:** External penetration testing completed within last 90 days
- [ ] **CRITICAL:** Critical findings from pen tests remediated
- [ ] Internal penetration testing completed within last 180 days
- [ ] Application-level penetration testing completed
- [ ] API security testing completed
- [ ] Infrastructure penetration testing completed
- [ ] Social engineering testing conducted annually

### AI-Specific Security Testing

- [ ] **CRITICAL:** Prompt injection adversarial testing completed
- [ ] **CRITICAL:** Model extraction attack testing completed
- [ ] Jailbreak resistance verified with red team
- [ ] Agent safety boundary testing completed
- [ ] Tool sandbox escape testing completed
- [ ] Cross-tenant data leakage testing completed
- [ ] AI-specific incident response tested

### Red Team Exercises

- [ ] Red team exercises scheduled quarterly
- [ ] Red team findings tracked to remediation
- [ ] Purple team exercises for detection improvement
- [ ] Attack simulation for incident response training
- [ ] Tabletop exercises for major incident scenarios

---

## Security Monitoring

### Real-Time Monitoring

- [ ] **CRITICAL:** Security Information and Event Management (SIEM) operational
- [ ] **CRITICAL:** Real-time alerting for authentication failures (>10 per minute)
- [ ] **CRITICAL:** Cross-tenant access attempt detection and alerting
- [ ] Log aggregation from all services active
- [ ] Security dashboard with key metrics visible
- [ ] Alert severity classification operational
- [ ] On-call rotation integration working

### Key Security Indicators (KSIs)

- [ ] **CRITICAL:** Mean Time to Detect (MTTD) < 15 minutes for critical events
- [ ] **CRITICAL:** Mean Time to Respond (MTTR) < 1 hour for P1 incidents
- [ ] Mean Time to Remediate (MTTRem) < 24 hours for critical vulnerabilities
- [ ] False positive rate for alerts < 20%
- [ ] Alert fatigue metrics tracked
- [ ] Security training completion rate > 90%

### Behavioral Monitoring

- [ ] **CRITICAL:** User behavior analytics (UBA) active for admin accounts
- [ ] Impossible travel detection operational
- [ ] Off-hours access monitoring enabled
- [ ] Privilege escalation detection active
- [ ] Data access pattern anomaly detection
- [ ] Account compromise indicators monitored
- [ ] Session anomaly detection active

### AI Agent Monitoring

- [ ] **CRITICAL:** Agent behavior baseline established
- [ ] **CRITICAL:** Tool usage anomaly detection active
- [ ] Prompt pattern anomaly detection
- [ ] Token consumption anomaly alerting
- [ ] Response quality anomaly detection
- [ ] Agent collaboration pattern monitoring
- [ ] Memory access pattern monitoring

---

## Threat Intelligence

### Threat Feed Integration

- [ ] **CRITICAL:** Commercial threat feeds integrated (minimum 2 sources)
- [ ] **CRITICAL:** Indicator of Compromise (IOC) matching automated
- [ ] Open source threat feeds active (AbuseIPDB, AlienVault OTX)
- [ ] Industry-specific threat feeds subscribed (ISAC membership)
- [ ] Threat feed freshness verified (< 1 hour latency)
- [ ] Threat actor tracking for relevant APT groups

### Threat Correlation

- [ ] **CRITICAL:** IP reputation checking on all inbound connections
- [ ] Domain reputation checking for outbound connections
- [ ] File hash checking against known malware
- [ ] URL filtering with threat intelligence
- [ ] Email threat intelligence for phishing detection
- [ ] Certificate transparency monitoring active

### AI-Specific Threat Intelligence

- [ ] **CRITICAL:** Prompt injection attack patterns updated weekly
- [ ] Model vulnerability disclosures monitored
- [ ] AI framework security advisories tracked
- [ ] Adversarial ML technique database updated
- [ ] AI supply chain threat monitoring active
- [ ] LLM security vulnerability feed subscribed

### Proactive Threat Hunting

- [ ] Proactive threat hunting scheduled monthly
- [ ] Hypothesis-driven hunting documented
- [ ] Hunt findings fed back to detection rules
- [ ] Threat hunting metrics tracked (hunts/findings/improvements)
- [ ] External threat hunting resources available

---

## Data Loss Prevention (DLP)

### DLP Controls Active

- [ ] **CRITICAL:** Cross-tenant data transfer detection active
- [ ] **CRITICAL:** Large data export detection and alerting
- [ ] Outbound data transfer monitoring operational
- [ ] Cloud storage egress monitoring
- [ ] API response data leakage detection
- [ ] Cache content isolation verified
- [ ] Log sanitization preventing tenant data leak

### AI-Specific DLP

- [ ] **CRITICAL:** Prompt logging excludes PII/sensitive data
- [ ] **CRITICAL:** Model response data classification verified
- [ ] Training data isolation confirmed
- [ ] Fine-tuning data segregation enforced
- [ ] Agent memory DLP scanning active
- [ ] Tool input/output DLP monitoring

### DLP Metrics

- [ ] DLP incident count tracked by severity
- [ ] False positive rate for DLP < 30%
- [ ] Policy exception requests tracked
- [ ] Data exposure risk score calculated

---

## Compliance Monitoring

### Continuous Compliance Scanning

- [ ] **CRITICAL:** Configuration drift detection active (IaC vs actual state)
- [ ] **CRITICAL:** Cloud security posture management (CSPM) active
- [ ] Policy-as-code enforcement enabled (OPA/Rego policies)
- [ ] Automated compliance evidence collection running
- [ ] CIS benchmark scanning scheduled (weekly minimum)
- [ ] Secrets scanning in code repositories active
- [ ] License compliance checking automated

### Framework Compliance Verification

- [ ] **CRITICAL:** SOC 2 control effectiveness evidence collected
- [ ] GDPR: Consent records verified, retention policies enforced
- [ ] HIPAA: PHI access logging verified, encryption validated (if applicable)
- [ ] ISO 27001: ISMS controls assessed, risk register updated
- [ ] EU AI Act: Risk classification current, transparency logs active (if applicable)
- [ ] PCI DSS: Cardholder data environment scoped (if applicable)

### Compliance Dashboard

- [ ] Real-time compliance score visible per framework
- [ ] Non-compliance items tracked with remediation deadlines
- [ ] Compliance trend analysis over 90-day window
- [ ] Automated compliance reports generated monthly
- [ ] Audit-ready evidence package exportable on demand

---

## Incident Response Automation

### Automated Response Playbooks

- [ ] **CRITICAL:** High-severity incident auto-containment enabled
- [ ] **CRITICAL:** Compromised credential auto-revocation
- [ ] **CRITICAL:** Anomalous agent auto-suspension
- [ ] Malicious IP auto-blocking
- [ ] DLP violation auto-quarantine
- [ ] Vulnerable container auto-isolation
- [ ] Tenant isolation on breach detection

### Incident Enrichment

- [ ] **CRITICAL:** Alert correlation across data sources
- [ ] Automatic threat intelligence enrichment
- [ ] User/asset context injection
- [ ] Historical incident correlation
- [ ] Impact assessment automation
- [ ] Related tenant identification

### Notification and Escalation

- [ ] **CRITICAL:** Severity-based escalation rules active
- [ ] **CRITICAL:** On-call rotation integration working
- [ ] Tenant notification automation (per SLA tier)
- [ ] Regulatory notification deadline tracking
- [ ] Executive briefing automation for P1s
- [ ] Communication templates prepared

### Recovery Automation

- [ ] **CRITICAL:** Automated backup verification
- [ ] Failover automation tested
- [ ] Data restoration automation validated
- [ ] Service recovery orchestration active
- [ ] Post-incident evidence preservation automated
- [ ] Lessons learned integration process

---

## Gate Decision

| Classification | Criteria |
|----------------|----------|
| **PASS** | All categories GREEN - Continue monitoring |
| **CONDITIONAL** | Any CRITICAL category YELLOW - Remediate within 24 hours, proceed with mitigation plan |
| **FAIL** | Any CRITICAL category RED - Trigger incident response immediately |
| **WAIVED** | Non-critical item explicitly waived with stakeholder sign-off and documented justification |

---

## Critical vs Non-Critical Classification

| Category | Classification | CONDITIONAL Threshold | FAIL Threshold |
|----------|----------------|----------------------|----------------|
| Vulnerability Management | CRITICAL | High vuln > SLA | Critical vuln unpatched > 24h |
| Penetration Testing | CRITICAL | Testing > 90 days old | Critical finding unremediated |
| Security Monitoring | CRITICAL | MTTD > 30 minutes | MTTD > 1 hour |
| Threat Intelligence | Non-critical | Feeds > 4hr stale | Feeds > 24hr stale |
| DLP Controls | CRITICAL | 1+ violation/day | Confirmed data breach |
| Compliance Monitoring | CRITICAL | Framework < 90% | Framework < 70% |
| Incident Response | CRITICAL | Playbook failure | Response delay > SLA |

---

## Continuous Monitoring Schedule

| Check Type | Frequency | Automated | Dashboard |
|------------|-----------|-----------|-----------|
| Vulnerability scanning | Daily | Yes | Real-time |
| Compliance drift | Every 15 min | Yes | Real-time |
| Threat intelligence update | Every 1 hour | Yes | Real-time |
| DLP policy evaluation | Real-time | Yes | Real-time |
| Anomaly detection | Real-time | Yes | Real-time |
| Security metrics calculation | Every 1 hour | Yes | Hourly |
| Incident playbook validation | Weekly | Partial | Weekly |
| Penetration testing | Quarterly | No | Quarterly |
| Threat hunting | Monthly | No | Monthly |

---

## Waiver Process

For non-critical items that cannot be addressed:

1. **Document** the specific item and reason for waiver request
2. **Justify** the business rationale and compensating controls
3. **Obtain** stakeholder sign-off (CISO, Product Owner)
4. **Record** waiver in gate report with expiration date
5. **Create** follow-up ticket for future remediation with priority

**Note:** CRITICAL items cannot be waived. CRITICAL failures trigger immediate incident response.

---

## Recovery Protocol

**If QG-S4 fails:**

### Attempt 1: Immediate Containment (target: 24 hours)

1. Activate incident response playbook for affected category
2. Isolate affected systems/tenants if data breach suspected
3. Review security metrics dashboard for scope assessment
4. Execute automated containment for known threat patterns
5. Re-evaluate gate status after initial response
6. **Lock passed categories** - do not re-test locked items

### Attempt 2: Deep Investigation and Remediation (target: 1 week)

1. Engage Security Operations (SecOps) and relevant domain experts
2. Conduct forensic analysis of affected systems
3. Review threat intelligence for related indicators of compromise
4. Update DLP policies and anomaly detection baselines
5. Patch identified vulnerabilities within SLA timeframes
6. Re-evaluate gate status after remediation
7. **Preserve locked categories** from Attempt 1

### Attempt 3: Mandatory Course Correction

1. Escalate to CISO and executive leadership
2. Activate breach notification procedures if required
3. Document incident in security incident register
4. Conduct post-incident review within 72 hours
5. Update threat hunting hypotheses based on findings
6. Implement additional controls to prevent recurrence
7. Consider bug bounty program activation

### Category-Specific Recovery

| Category | Immediate Action | Escalation Trigger |
|----------|------------------|-------------------|
| Vulnerability Management | Patch critical vulnerabilities, isolate affected systems | Critical vuln > 24h |
| Penetration Testing | Schedule emergency pen test, address critical findings | Critical finding > 7 days |
| Security Monitoring | Investigate MTTD/MTTR degradation, tune alerting | MTTD > 1 hour |
| Threat Intelligence | Refresh threat feeds, verify IOC matching | Feeds > 24hr stale |
| DLP Controls | Quarantine affected data, audit export logs | Any confirmed data breach |
| Compliance Monitoring | Re-run compliance scans, review policy drift | Framework score < 70% |
| Incident Response | Test playbooks, verify notification routing | Response delay > SLA |

---

## Related Workflows

- `bmad-bam-tenant-aware-observability` - Security monitoring setup
- `bmad-bam-security-operations-verification` - Full security audit
- `bmad-bam-incident-response-operations` - Incident handling procedures
- `bmad-bam-ai-agent-debug` - Agent security debugging

---

## Required Templates

| Template | Purpose | Location |
|----------|---------|----------|
| `security-monitoring-template.md` | Security monitoring configuration | `{output_folder}/operations/` |
| `incident-response-template.md` | Security incident procedures | `{output_folder}/operations/` |
| `penetration-test-report-template.md` | Pen test documentation | `{output_folder}/security/` |
| `vulnerability-management-template.md` | Vulnerability tracking | `{output_folder}/security/` |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Security monitoring patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` - filter: `security-monitoring-*`
- **Threat intelligence patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` - filter: `threat-*`
- **Compliance frameworks:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

### Web Research

- Search: "continuous security monitoring SaaS best practices {date}"
- Search: "vulnerability management SLA enterprise {date}"
- Search: "AI-specific threat intelligence patterns {date}"
- Search: "DLP multi-tenant cloud platforms {date}"

---

## Web Research Verification

- [ ] Search the web: "continuous security monitoring SaaS best practices {date}" - Verify monitoring patterns
- [ ] Search the web: "penetration testing frequency enterprise {date}" - Confirm testing schedule
- [ ] Search the web: "AI-specific threat intelligence patterns {date}" - Validate AI threat detection
- [ ] Search the web: "security incident response automation {date}" - Verify response automation
- [ ] _Source: [URL]_ citations documented for key security monitoring decisions

---

**PASS CRITERIA:** All automated checks running, all critical categories GREEN
**OWNER:** Security Operations (SecOps)
**REVIEWERS:** CISO, Platform Engineering, Compliance
