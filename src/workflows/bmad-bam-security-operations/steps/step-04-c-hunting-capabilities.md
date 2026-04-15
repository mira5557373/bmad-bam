# Step 4: Hunting Capability Setup

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices


---

## Purpose

Establish threat hunting processes and playbooks for proactive security monitoring. This completes security operations setup with active hunting capabilities.

---

## Prerequisites

- Step 3 completed (AI threat detection active)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `security`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `threat-hunting`

---

## Actions

### 1. Define Hunting Hypotheses

Document hunting hypotheses:

| Hypothesis | Indicators | Data Sources | Frequency |
|------------|------------|--------------|-----------|
| Account compromise | Unusual login patterns | Auth logs | Weekly |
| Insider threat | Bulk data access | Audit logs | Weekly |
| Tenant isolation bypass | Cross-tenant queries | DB audit | Daily |
| AI agent abuse | Unusual agent patterns | AI logs | Daily |
| API key misuse | Anomalous API calls | API logs | Weekly |

### 2. Create Hunting Playbooks

Document hunting procedures:

| Playbook | Hypothesis | Steps | Tools |
|----------|------------|-------|-------|
| HP-001 | Account compromise | 1. Query failed logins 2. Check MFA 3. Review sessions | SIEM, IAM |
| HP-002 | Tenant bypass | 1. Query cross-tenant 2. Check RLS 3. Review users | SIEM, DB |
| HP-003 | AI abuse | 1. Token anomalies 2. Prompt patterns 3. Tool access | AI logs |

### 3. Hunting Infrastructure

Configure hunting tools:
- [ ] Query templates created
- [ ] Dashboards for hunting
- [ ] Data retention adequate (90+ days)
- [ ] Access for hunters configured

### 4. Hunting Schedule

| Hunt Type | Frequency | Owner | Duration |
|-----------|-----------|-------|----------|
| Scheduled hunts | Weekly | SecOps | 2 hours |
| IOC-driven hunts | On intel | SecOps | As needed |
| Ad-hoc hunts | On suspicion | Security | As needed |

**Soft Gate Checkpoint**

**Steps 1-4 complete security operations setup.** Present a summary of detection, correlation, AI monitoring, and hunting capabilities. Ask for confirmation before finalizing.

**Verify current best practices with web search:**
Search the web: "threat hunting playbooks enterprise {date}"
Search the web: "proactive threat hunting SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing hunting setup, if 'C' (Continue):
- Save hunting configuration to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Generate final security operations report

---

## Verification

- [ ] Hunting hypotheses defined
- [ ] Hunting playbooks created
- [ ] Hunting infrastructure configured
- [ ] Hunting schedule established
- [ ] Patterns align with pattern registry

---

## Outputs

- Hunting playbooks
- Hunting schedule
- Security operations configuration (complete)
- **Load template:** `{project-root}/_bmad/bam/data/templates/hunting-playbook-template.md`

---

## Next Step

Security operations setup complete. Recommend running validation mode to verify against QG-S8 criteria if formal gate passage required.
