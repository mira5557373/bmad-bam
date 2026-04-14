# Step 5: Incident Automation Readiness

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

---

## Purpose

Configure automated response playbooks, escalation automation, containment procedures, and recovery automation for security incidents.

---

## Prerequisites

- Anomaly detection activated (Step 4)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: incident

---

## Actions

### 1. Automated Response Playbooks

| Incident Type | Playbook | Auto-Actions | Manual Gates |
|---------------|----------|--------------|--------------|
| Brute force | auto-block-ip | Block IP, Alert | Unblock |
| Data exfiltration | auto-isolate | Isolate user, Alert | Investigation |
| Prompt injection | auto-block-prompt | Block, Log | Review |
| Account compromise | auto-suspend | Suspend, Reset | Restore |

### 2. Escalation Automation

| Trigger | Escalation Path | Timeline | Method |
|---------|-----------------|----------|--------|
| Critical alert | Security Lead > CISO | 5 min | PagerDuty |
| High alert (no ack) | Security Team | 15 min | Slack + Phone |
| AI incident | AI Team + Security | 5 min | PagerDuty |
| Data breach | Legal + CISO | Immediate | Phone |

### 3. Containment Procedures

| Threat | Containment Action | Automation Level |
|--------|-------------------|------------------|
| Compromised account | Session termination, password reset | Full auto |
| Malicious tenant | Tenant suspension | Semi-auto (approval) |
| AI abuse | Agent kill switch | Full auto |
| Network intrusion | Segment isolation | Semi-auto |

### 4. Recovery Automation

| Recovery Type | Procedure | Automation | RTO |
|---------------|-----------|------------|-----|
| Account recovery | Reset + Verify | Guided | < 1 hour |
| Tenant restoration | Backup restore | Semi-auto | < 4 hours |
| AI service recovery | Rollback + Restart | Auto | < 15 min |
| System recovery | DR activation | Guided | < 1 hour |

**Verify current best practices with web search:**
Search the web: "security incident automation SOAR best practices {date}"
Search the web: "AI security incident response {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into playbook design
- **P (Party Mode)**: Bring security and SRE perspectives
- **C (Continue)**: Finalize continuous security setup
- **[Specific refinements]**: Describe automation concerns

Select an option:
```

#### If 'C' (Continue):
- Save incident automation to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Mark workflow as complete

---

## Verification

- [ ] Playbooks configured
- [ ] Escalation automated
- [ ] Containment ready
- [ ] Recovery automated

---

## Outputs

- Incident automation configuration
- Security runbooks
- **Load template:** `{project-root}/_bmad/bam/templates/security-config-template.md`

---

## Workflow Complete

The continuous security setup workflow is complete. Key artifacts produced:
- Security configuration: `{output_folder}/operations/security/continuous-security-config.md`
- Security runbooks: `{output_folder}/operations/security/security-runbooks.md`

Next steps:
- Test incident response playbooks
- Schedule regular security reviews
- Consider running `validate` mode to verify QG-S5 compliance
