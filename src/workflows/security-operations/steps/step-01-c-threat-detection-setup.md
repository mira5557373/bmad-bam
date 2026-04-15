# Step 1: Threat Detection Setup

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

Configure threat detection rules for the multi-tenant AI platform. This includes setting up detection for authentication attacks, authorization violations, data exfiltration, and tenant isolation breaches.

---

## Prerequisites

- Security baseline established
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `security`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `threat-detection`

---

## Actions

### 1. Define Detection Categories

Document threat categories to monitor:

| Category | Threat Types | Priority |
|----------|--------------|----------|
| Authentication | Brute force, credential stuffing, MFA bypass | Critical |
| Authorization | Privilege escalation, unauthorized access | Critical |
| Tenant Isolation | Cross-tenant access attempts | Critical |
| Data Exfiltration | Bulk data access, API abuse | High |
| AI Abuse | Prompt injection, model manipulation | High |
| Infrastructure | Port scanning, lateral movement | Medium |

### 2. Configure Detection Rules

For each category, define detection rules:

| Rule ID | Category | Condition | Threshold | Action |
|---------|----------|-----------|-----------|--------|
| AUTH-001 | Authentication | Failed logins | >5 in 5 min | Alert |
| AUTH-002 | Authentication | MFA failures | >3 in 1 min | Block |
| TENANT-001 | Tenant Isolation | Cross-tenant query | Any | Alert+Block |
| AI-001 | AI Abuse | Prompt injection pattern | Any | Alert |

### 3. Data Sources

Map data sources for detection:

| Source | Data Type | Integration |
|--------|-----------|-------------|
| Application logs | Auth events, API calls | Loki/ELK |
| Database audit | Query logs, RLS violations | PostgreSQL audit |
| AI runtime | Agent invocations, prompts | Custom logging |
| Network | Traffic patterns | VPC flow logs |

### 4. Alert Configuration

Configure alert routing:

| Severity | Response Time | Channel | Escalation |
|----------|---------------|---------|------------|
| Critical | <5 min | PagerDuty | On-call |
| High | <30 min | Slack #security | Security team |
| Medium | <4 hours | Email | Review queue |

**Verify current best practices with web search:**
Search the web: "threat detection rules SaaS platforms {date}"
Search the web: "multi-tenant security monitoring SIEM {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing threat detection setup, present options:

#### If 'C' (Continue):
- Save detection configuration to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-correlation-rules.md`

---

## Verification

- [ ] Detection categories defined
- [ ] Detection rules configured
- [ ] Data sources mapped
- [ ] Alert routing configured
- [ ] Patterns align with pattern registry

---

## Outputs

- Threat detection configuration
- Detection rules inventory
- Alert routing matrix
- **Load template:** `{project-root}/_bmad/bam/data/templates/threat-detection-config-template.md`

---

## Next Step

Proceed to `step-02-c-correlation-rules.md` to configure SIEM correlation rules.
