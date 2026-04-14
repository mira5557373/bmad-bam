# Step 2: Threat Monitoring Setup

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

---

## Purpose

Configure security event collection, SIEM integration, threat detection rules, and AI-specific threat monitoring for comprehensive threat visibility.

---

## Prerequisites

- Compliance automation activated (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: security

---

## Actions

### 1. Security Event Collection

| Event Source | Events/Day | Retention | Status |
|--------------|------------|-----------|--------|
| Application logs | {count} | 90 days | Collecting |
| Infrastructure logs | {count} | 90 days | Collecting |
| Authentication events | {count} | 365 days | Collecting |
| API access logs | {count} | 90 days | Collecting |
| AI runtime events | {count} | 90 days | Collecting |

### 2. SIEM Integration

| SIEM Component | Configuration | Status |
|----------------|---------------|--------|
| Log ingestion | {sources configured} | Active |
| Correlation rules | {count} rules | Active |
| Dashboards | {count} dashboards | Created |
| Alerting | {channels} | Configured |

### 3. Threat Detection Rules

| Rule Category | Rules | Priority | Auto-Response |
|---------------|-------|----------|---------------|
| Brute force | {count} | High | Block IP |
| Injection attacks | {count} | Critical | Alert + Block |
| Data exfiltration | {count} | Critical | Alert + Isolate |
| Privilege escalation | {count} | High | Alert |
| Suspicious AI usage | {count} | Medium | Alert |

### 4. AI-Specific Threat Monitoring

| Threat Type | Detection Method | Response |
|-------------|------------------|----------|
| Prompt injection | Pattern matching | Block + Alert |
| Data extraction via AI | Output monitoring | Alert |
| Model abuse | Rate anomaly | Throttle |
| Token budget attack | Budget monitoring | Suspend |

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into threat detection
- **P (Party Mode)**: Bring security and AI perspectives
- **C (Continue)**: Accept monitoring and proceed to DLP
- **[Specific refinements]**: Describe concerns to address

Select an option:
```

#### If 'C' (Continue):
- Save threat monitoring to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-dlp-controls.md`

---

**Verify current best practices with web search:**
Search the web: "threat monitoring best practices {date}"
Search the web: "threat monitoring multi-tenant SaaS {date}"

## Verification

- [ ] Event collection configured
- [ ] SIEM integrated
- [ ] Detection rules active
- [ ] AI threats monitored

---

## Outputs

- Threat monitoring configuration

---

## Next Step

Proceed to `step-03-c-dlp-controls.md` to verify DLP controls.
