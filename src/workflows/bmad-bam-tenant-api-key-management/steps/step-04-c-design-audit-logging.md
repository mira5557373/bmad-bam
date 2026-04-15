# Step 4: Design Audit Logging

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics


---

## Purpose

Design comprehensive audit logging for API key lifecycle and usage tracking.

---

## Prerequisites

- Step 3 completed (Key revocation design)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: observability`
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

---

## Actions

### 1. Define Audit Event Categories

| Category | Events | Severity |
|----------|--------|----------|
| Lifecycle | create, rotate, revoke, expire | Info/Warning |
| Usage | authenticate, authorize, rate_limit | Info |
| Security | failed_auth, scope_violation, anomaly | Warning/Critical |
| Admin | permission_change, policy_update | Info |

### 2. Audit Event Schema

Define event structure:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| event_id | UUID | Yes | Unique event ID |
| event_type | String | Yes | Event category.action |
| timestamp | DateTime | Yes | ISO 8601 UTC |
| tenant_id | UUID | Yes | Tenant context |
| key_id | UUID | Yes | Key identifier |
| actor_type | Enum | Yes | user/system/key |
| actor_id | UUID | Yes | Who performed action |
| ip_address | String | No | Source IP |
| user_agent | String | No | Client identifier |
| result | Enum | Yes | success/failure |
| details | JSON | No | Event-specific data |

### 3. Usage Pattern Tracking

Track usage metrics:

| Metric | Aggregation | Alert Threshold |
|--------|-------------|-----------------|
| Requests/minute | Rolling window | 2x normal |
| Error rate | Percentage | >5% |
| Unique IPs | Count | >10 new in 1 hour |
| Off-hours usage | Boolean | After 3 consecutive |
| Geographic anomaly | Distance | >1000km in <1hr |

### 4. Anomaly Detection

Define detection rules:

| Pattern | Detection | Response |
|---------|-----------|----------|
| Brute force | >10 failed auths in 5 min | Temporary block |
| Credential stuffing | Many keys, same IP | IP block + alert |
| Exfiltration | Unusual data volume | Alert + rate limit |
| Scope abuse | Repeated scope violations | Alert + review |

### 5. Compliance Reporting

Define report templates:

| Report | Frequency | Content |
|--------|-----------|---------|
| Key inventory | Daily | All active keys by tenant |
| Access summary | Weekly | Usage statistics |
| Security events | Real-time | Alerts and incidents |
| Compliance audit | Monthly | Full lifecycle events |
| Retention cleanup | Quarterly | Expired data removal |

### 6. Retention Policies

| Data Type | Hot Storage | Warm Storage | Cold/Archive | Delete |
|-----------|-------------|--------------|--------------|--------|
| Lifecycle events | 90 days | 1 year | 7 years | After 7y |
| Usage events | 30 days | 90 days | 1 year | After 1y |
| Security events | 1 year | 3 years | 7 years | After 7y |
| Aggregated metrics | 1 year | 3 years | Indefinite | Never |

**Verify current best practices with web search:**
Search the web: "API audit logging best practices {date}"
Search the web: "security event monitoring patterns SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the audit logging design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into compliance requirements and retention policies
- **P (Party Mode)**: Bring security and compliance perspectives for audit design review
- **C (Continue)**: Accept audit design and proceed to runbook creation
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass audit context: event schema, anomaly detection, compliance
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into audit design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review audit logging: {summary of events and compliance}"
- Process collaborative analysis from security and compliance personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save audit logging design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-create-runbook.md`

---

## Verification

- [ ] Event categories defined
- [ ] Event schema complete
- [ ] Usage tracking specified
- [ ] Anomaly detection rules documented
- [ ] Compliance reports defined
- [ ] Retention policies established
- [ ] Patterns align with pattern registry

---

## Outputs

- Audit event catalog
- Event schema specification
- Anomaly detection rules
- Compliance report templates
- Retention policy matrix

---

## Next Step

Proceed to `step-05-c-create-runbook.md` to create operational runbook.
