# Step 2: Correlation Rules Configuration

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

Configure SIEM correlation rules to detect complex attack patterns by correlating events across multiple data sources.

---

## Prerequisites

- Step 1 completed (threat detection setup)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `security`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `correlation`

---

## Actions

### 1. Define Correlation Scenarios

Document attack scenarios requiring correlation:

| Scenario | Events to Correlate | Time Window |
|----------|---------------------|-------------|
| Account Takeover | Failed auth + successful login + profile change | 1 hour |
| Insider Threat | Privilege change + bulk data access + data export | 24 hours |
| API Key Compromise | Key creation + API abuse + data exfil | 4 hours |
| Tenant Breach | Recon + tenant switch attempt + data access | 1 hour |
| AI Attack Chain | Prompt injection + agent escalation + action | 30 min |

### 2. Build Correlation Rules

For each scenario, define correlation logic:

| Rule ID | Scenario | Event 1 | Event 2 | Event 3 | Action |
|---------|----------|---------|---------|---------|--------|
| CORR-001 | Account Takeover | AUTH:FAIL>3 | AUTH:SUCCESS | PROFILE:CHANGE | Critical Alert |
| CORR-002 | Insider Threat | PRIV:ELEVATED | DATA:BULK_READ | DATA:EXPORT | Critical Alert |
| CORR-003 | Tenant Breach | API:ENUM | TENANT:SWITCH_FAIL | DATA:ACCESS | Critical Alert + Block |

### 3. Tenant-Aware Correlation

Ensure correlation includes tenant context:
- [ ] All events include tenant_id
- [ ] Correlation scoped per tenant
- [ ] Cross-tenant correlation for platform-wide threats
- [ ] Admin actions tracked separately

### 4. Tuning and False Positive Reduction

Document tuning parameters:

| Rule | Baseline | Threshold | Tuning Notes |
|------|----------|-----------|--------------|
| CORR-001 | 0.5/day | 3 events | Exclude known IPs |
| CORR-002 | 1/week | 2 events | Exclude admin users |

**Verify current best practices with web search:**
Search the web: "SIEM correlation rules best practices {date}"
Search the web: "attack chain detection correlation {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing correlation rules, if 'C' (Continue):
- Save correlation configuration to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-ai-threat-detection.md`

---

## Verification

- [ ] Correlation scenarios defined
- [ ] Correlation rules built
- [ ] Tenant-aware correlation configured
- [ ] Tuning parameters documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Correlation rules configuration
- Scenario documentation
- Tuning guidelines
- **Load template:** `{project-root}/_bmad/bam/templates/correlation-rules-template.md`

---

## Next Step

Proceed to `step-03-c-ai-threat-detection.md` to configure AI-specific threat detection.
