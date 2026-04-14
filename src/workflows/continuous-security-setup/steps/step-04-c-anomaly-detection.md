# Step 4: Anomaly Detection Activation

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

---

## Purpose

Establish behavioral baselines, configure anomaly detection rules, set up AI usage anomaly detection, and define alert thresholds.

---

## Prerequisites

- DLP controls verified (Step 3)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: anomaly

---

## Actions

### 1. Behavioral Baseline Establishment

| Behavior | Baseline Period | Current Baseline | Status |
|----------|-----------------|------------------|--------|
| Login patterns | 30 days | {metrics} | Established |
| API usage patterns | 30 days | {metrics} | Established |
| Data access patterns | 30 days | {metrics} | Established |
| AI usage patterns | 30 days | {metrics} | Established |

### 2. Anomaly Detection Rules

| Anomaly Type | Detection Method | Threshold | Response |
|--------------|------------------|-----------|----------|
| Unusual login time | Time-based | > 2 std dev | Alert |
| High API rate | Rate-based | > 3x baseline | Throttle + Alert |
| Mass data access | Volume-based | > 5x baseline | Alert + Review |
| Privilege anomaly | Role-based | Unexpected access | Alert |

### 3. AI Usage Anomaly Detection

| Anomaly | Detection | Threshold | Response |
|---------|-----------|-----------|----------|
| Token burst | Rate anomaly | > 5x baseline | Throttle |
| Unusual prompts | Pattern matching | Suspicious patterns | Alert |
| Context manipulation | Sequence analysis | Injection attempts | Block |
| Cost spike | Budget monitoring | > 2x daily avg | Alert |

### 4. Alert Thresholds

| Alert Level | Threshold | Notification | Response Time |
|-------------|-----------|--------------|---------------|
| Critical | Confirmed breach | PagerDuty | Immediate |
| High | High confidence anomaly | Slack + Email | < 15 min |
| Medium | Moderate anomaly | Slack | < 1 hour |
| Low | Minor deviation | Dashboard | < 24 hours |

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into detection tuning
- **P (Party Mode)**: Bring security and ML perspectives
- **C (Continue)**: Accept detection and proceed to incident automation
- **[Specific refinements]**: Describe concerns to address

Select an option:
```

#### If 'C' (Continue):
- Save anomaly detection to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-incident-automation.md`

---

**Verify current best practices with web search:**
Search the web: "anomaly detection best practices {date}"
Search the web: "anomaly detection multi-tenant SaaS {date}"

## Verification

- [ ] Behavioral baselines established
- [ ] Detection rules configured
- [ ] AI anomalies monitored
- [ ] Alert thresholds set

---

## Outputs

- Anomaly detection configuration

---

## Next Step

Proceed to `step-05-c-incident-automation.md` to configure incident automation.
