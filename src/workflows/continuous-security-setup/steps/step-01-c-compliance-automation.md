# Step 1: Compliance Automation Activation

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Use web search to verify current best practices

---

## Purpose

Configure compliance policy automation, automated checks, evidence collection, and compliance reporting for continuous compliance verification.

---

## Prerequisites

- Compliance requirements documented
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: compliance

---

## Actions

### 1. Compliance Policy Configuration

| Framework | Policies | Automation Status | Coverage |
|-----------|----------|-------------------|----------|
| SOC 2 | {count} | Automated/Manual | {%} |
| GDPR | {count} | Automated/Manual | {%} |
| HIPAA | {count} | Automated/Manual | {%} |
| PCI DSS | {count} | Automated/Manual | {%} |

### 2. Automated Compliance Checks

| Check Category | Frequency | Tool | Status |
|----------------|-----------|------|--------|
| Access control | Continuous | {tool} | Active/Pending |
| Data encryption | Daily | {tool} | Active/Pending |
| Audit logging | Continuous | {tool} | Active/Pending |
| Network security | Hourly | {tool} | Active/Pending |
| AI model governance | Daily | {tool} | Active/Pending |

### 3. Evidence Collection Automation

| Evidence Type | Collection Method | Storage | Retention |
|---------------|-------------------|---------|-----------|
| Access logs | Automated export | S3 | 7 years |
| Config changes | Event-driven | S3 | 7 years |
| Security scans | Scheduled | S3 | 3 years |
| AI audit logs | Continuous | S3 | 7 years |

### 4. Compliance Reporting Setup

| Report | Frequency | Recipients | Format |
|--------|-----------|------------|--------|
| Compliance dashboard | Real-time | Security team | Web |
| SOC 2 evidence | Monthly | Auditors | PDF |
| Executive summary | Weekly | Leadership | Email |

**Verify current best practices with web search:**
Search the web: "compliance automation SaaS best practices {date}"
Search the web: "SOC 2 continuous compliance {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into compliance requirements
- **P (Party Mode)**: Bring compliance and security perspectives
- **C (Continue)**: Accept configuration and proceed to threat monitoring
- **[Specific refinements]**: Describe concerns to address

Select an option:
```

#### If 'C' (Continue):
- Save compliance automation to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-threat-monitoring.md`

---

## Verification

- [ ] Compliance policies configured
- [ ] Automated checks enabled
- [ ] Evidence collection active
- [ ] Reporting set up

---

## Outputs

- Compliance automation configuration
- **Load template:** `{project-root}/_bmad/bam/templates/security-config-template.md`

---

## Next Step

Proceed to `step-02-c-threat-monitoring.md` to set up threat monitoring.
