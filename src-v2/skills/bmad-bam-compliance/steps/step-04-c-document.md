# Step 04: Design Compliance Monitoring (Create Mode)

## MANDATORY EXECUTION RULES (READ FIRST):

- :stop_sign: NEVER generate content without user input
- :book: CRITICAL: ALWAYS read the complete step file before taking any action
- :arrows_counterclockwise: CRITICAL: When loading next step with 'C', ensure entire file is read
- :pause_button: ALWAYS pause after presenting findings and await user direction
- :dart: Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- :dart: Show your analysis before taking any action
- :floppy_disk: Update document frontmatter after each section completion
- :pencil: Maintain append-only document building
- :white_check_mark: Track progress in `stepsCompleted` array
- :mag: Use web search to verify current compliance monitoring practices

---

## Purpose

Design continuous compliance monitoring including automated compliance checks, violation detection and alerting, remediation workflows, and auditor report generation.

---

## Prerequisites

- Step 03 completed: Audit controls designed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `compliance`, `compliance-continuous-verification`, `monitoring`
- **Load patterns:** `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: compliance gates

**Web Research (Required):**

Search the web: "continuous compliance monitoring SaaS platforms {date}"
Search the web: "automated compliance violation detection patterns {date}"
Search the web: "SOC2 continuous assurance best practices {date}"

Document findings with citations: _Source: [URL]_

---

## Actions

### 1. Continuous Compliance Checks

Design automated compliance check framework:

| Check Category | Check Type | Frequency | Framework Mapping |
|----------------|------------|-----------|-------------------|
| **Access Control** | Orphan accounts | Daily | SOC2 CC6, ISO27001 A.9 |
| **Access Control** | Excessive privileges | Weekly | All frameworks |
| **Access Control** | MFA enforcement | Real-time | SOC2 CC6, PCI-DSS 8.3 |
| **Encryption** | Data at rest encryption | Daily | HIPAA 164.312(a), PCI-DSS 3 |
| **Encryption** | TLS certificate expiry | Daily | PCI-DSS 4, SOC2 |
| **Encryption** | Key rotation compliance | Weekly | All frameworks |
| **Data Handling** | PII exposure scan | Daily | GDPR, CCPA |
| **Data Handling** | Retention policy compliance | Weekly | All frameworks |
| **Data Handling** | Cross-border transfer audit | Daily | GDPR, data residency |
| **Configuration** | Security baseline drift | Hourly | CIS Controls, SOC2 CC8 |
| **Configuration** | Firewall rule audit | Daily | PCI-DSS 1, NIS2 |
| **Logging** | Audit log integrity | Hourly | SOC2 CC7, HIPAA 164.312(b) |
| **Logging** | Log retention compliance | Daily | All frameworks |
| **Tenant Isolation** | Cross-tenant access attempt | Real-time | All frameworks |
| **Tenant Isolation** | RLS policy verification | Daily | Multi-tenant security |

### 2. Violation Detection and Alerting

Design violation detection rules and alert routing:

| Severity | Detection Criteria | Response Time | Alert Recipients | Escalation |
|----------|---------------------|---------------|------------------|------------|
| **CRITICAL** | Cross-tenant data breach, PII exposure | < 15 min | Security team, CISO | Incident response |
| **HIGH** | Failed compliance check (critical control) | < 1 hour | Compliance team, CTO | Management review |
| **MEDIUM** | Configuration drift, policy violation | < 4 hours | DevOps, security | Team lead |
| **LOW** | Minor policy deviation, documentation gap | < 24 hours | Compliance team | Normal workflow |
| **INFORMATIONAL** | Audit trail update, evidence collection | Weekly digest | Compliance team | None |

**Alert Content Requirements:**

| Field | Description | Required |
|-------|-------------|----------|
| `violation_id` | Unique identifier | Yes |
| `severity` | CRITICAL/HIGH/MEDIUM/LOW | Yes |
| `framework` | Affected compliance framework | Yes |
| `control_id` | Specific control violated | Yes |
| `tenant_id` | Affected tenant (if applicable) | Conditional |
| `description` | Human-readable violation description | Yes |
| `evidence` | Supporting data/logs | Yes |
| `recommended_action` | Remediation guidance | Yes |
| `sla_deadline` | Required resolution time | Yes |

### 3. Remediation Workflows

Design remediation workflow by violation type:

| Violation Type | Auto-Remediate | Workflow | Approval Required |
|----------------|----------------|----------|-------------------|
| Orphan account | Yes | Disable immediately | No (audit only) |
| Expired certificate | Yes | Auto-renew if configured | No |
| Configuration drift | Partial | Revert to baseline | Team lead |
| Excessive privilege | No | Access review workflow | Manager + Security |
| PII exposure | Partial | Mask/encrypt + alert | Security team |
| Cross-tenant attempt | Yes | Block + alert | Immediate |
| Missing encryption | No | Engineering ticket | Security + CTO |
| Retention violation | Partial | Archive/delete workflow | Legal + Compliance |

**Remediation Tracking:**

| Phase | Action | SLA | Verification |
|-------|--------|-----|--------------|
| 1. Detection | Automated alert | Immediate | Alert delivered |
| 2. Triage | Assess severity, assign owner | 15 min - 4 hrs | Owner assigned |
| 3. Investigation | Root cause analysis | 1 - 24 hrs | RCA documented |
| 4. Remediation | Apply fix | Per severity SLA | Fix deployed |
| 5. Verification | Confirm resolution | 1 hour | Check passes |
| 6. Documentation | Update evidence | 24 hours | Evidence stored |
| 7. Post-mortem | Prevent recurrence | 1 week | Action items |

### 4. Report Generation for Auditors

Design automated report generation:

| Report Type | Audience | Frequency | Content |
|-------------|----------|-----------|---------|
| **Compliance Dashboard** | Internal teams | Real-time | Current compliance posture |
| **Executive Summary** | Leadership | Monthly | KPIs, trends, risk summary |
| **Control Assessment** | Auditors | Quarterly | Control testing results |
| **Evidence Package** | Auditors | On-demand | Control evidence bundle |
| **Incident Report** | Auditors, regulators | Per incident | Timeline, impact, response |
| **Tenant Compliance** | Enterprise customers | Monthly | Their data compliance status |

**SOC2 Report Automation:**

| Report Section | Automated Content |
|----------------|-------------------|
| System Description | Infrastructure inventory, architecture diagram |
| Control Activities | Control test results, exceptions |
| Complementary User Entity Controls | Customer responsibility matrix |
| Subservice Organizations | Third-party attestations |
| Testing Results | Automated test evidence |

**GDPR Report Automation:**

| Report Type | Content | Trigger |
|-------------|---------|---------|
| Processing Activities (Art. 30) | Data inventory, purposes, recipients | Quarterly |
| DPIA (Art. 35) | Risk assessment, mitigations | New processing |
| Breach Notification (Art. 33) | Timeline, impact, measures | Per incident |
| Data Subject Request Log | Request type, response time, outcome | Monthly |

### 5. Compliance Posture Dashboard

Design real-time compliance dashboard:

| Metric | Visualization | Alert Threshold |
|--------|---------------|-----------------|
| Overall compliance score | Gauge (0-100%) | < 95% |
| Controls by status | Pie chart (Pass/Fail/In Progress) | Any fail |
| Open violations | Bar chart by severity | > 0 critical |
| Remediation SLA | Timeline burndown | Any overdue |
| Audit readiness | Framework heatmap | < 90% per framework |
| Evidence freshness | Calendar view | > 30 days stale |

---

## COLLABORATION MENUS (A/P/C):

After designing compliance monitoring, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific monitoring requirements
- **P (Party Mode)**: Bring compliance and audit perspectives
- **C (Continue)**: Proceed to compile compliance design
- **[Specific topic]**: Focus on alerts, reports, or dashboards

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: monitoring requirements, reporting needs, automation level
- Process enhanced insights on monitoring gaps
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review compliance monitoring design for audit readiness"
- Present synthesized recommendations from external auditor, compliance officer, CISO
- Return to A/P/C menu

#### If 'C' (Continue):
- Document monitoring decisions
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-complete.md`

---

## Verification

- [ ] Continuous compliance checks defined with frequencies
- [ ] Violation detection rules designed with severity levels
- [ ] Alert routing configured by severity
- [ ] Remediation workflows documented
- [ ] Report types defined with automation level
- [ ] Compliance dashboard metrics specified
- [ ] Web research citations documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Continuous compliance check specifications
- Violation detection and alerting rules
- Remediation workflow definitions
- Auditor report specifications
- Compliance dashboard design

---

## Next Step

Proceed to `step-05-c-complete.md` to compile the complete compliance design.
