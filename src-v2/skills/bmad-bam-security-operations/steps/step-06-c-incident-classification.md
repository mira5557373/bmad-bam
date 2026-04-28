# Step 06: Incident Classification Design (Create Mode - ZIR)

## MANDATORY EXECUTION RULES (READ FIRST):

- STOP NEVER generate content without user input
- READ CRITICAL: ALWAYS read the complete step file before taking any action
- LOOP CRITICAL: When loading next step with 'C', ensure entire file is read
- PAUSE ALWAYS pause after presenting findings and await user direction
- TARGET Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- TARGET Focus: Design incident classification and escalation matrix
- SAVE Track: Document severity levels, response times, escalation paths
- READ Context: Load incident-response pattern
- STOP Do NOT: Create runbooks yet (step-07)
- SEARCH Use web search: Verify current incident response best practices

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Severity classification matrix
- Response time targets
- Escalation procedures
- Tenant notification requirements

**OUT OF SCOPE:**
- Detailed runbooks (step-07)
- Secrets management (ZSR steps)
- Threat modeling (ZST steps)
- Validation (separate mode)

## YOUR TASK

Design the incident classification system including severity matrix, response time targets, escalation procedures, and tenant notification requirements for the multi-tenant SaaS platform.

---

## Purpose

Design incident classification system to ensure consistent incident handling with appropriate response times, escalation paths, and tenant communication based on severity and impact.

---

## Prerequisites

- Step 01 completed: ZIR focus selected (or ALL)
- **Load patterns:** `{project-root}/_bmad/bam/data/patterns/incident-response.md`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-ir.md`

**Web Research (Required):**

Search the web: "incident severity classification SaaS {date}"
Search the web: "incident response SLAs multi-tenant {date}"
Search the web: "tenant notification during outage best practices {date}"

Document findings with citations: _Source: [URL]_

---

## Actions

### 1. Severity Classification Matrix

Define incident severity levels:

| Severity | Code | Definition | Business Impact |
|----------|------|------------|-----------------|
| **Critical** | P0 | Complete service outage, data breach, security compromise | All tenants affected, data at risk |
| **High** | P1 | Major feature unavailable, multiple tenants severely impacted | Significant revenue/productivity loss |
| **Medium** | P2 | Degraded performance, workaround available, single tenant impacted | Moderate impact with workaround |
| **Low** | P3 | Minor issue, minimal impact, cosmetic defects | Minimal user impact |

**Classification Decision Tree:**

```
Is service completely unavailable?
    |
    +-- YES --> Is it a security incident?
    |               |
    |               +-- YES --> P0 (Critical)
    |               +-- NO  --> P0 (Critical)
    |
    +-- NO  --> Is a major feature broken?
                    |
                    +-- YES --> Multiple tenants?
                    |               |
                    |               +-- YES --> P1 (High)
                    |               +-- NO  --> P2 (Medium)
                    |
                    +-- NO  --> Performance degraded?
                                    |
                                    +-- YES --> P2 (Medium)
                                    +-- NO  --> P3 (Low)
```

### 2. Response Time Targets

Define response and resolution targets:

| Severity | Acknowledge | First Response | Status Update | Resolution Target |
|----------|-------------|----------------|---------------|-------------------|
| P0 | 5 min | 15 min | Every 30 min | 4 hours |
| P1 | 15 min | 30 min | Every 1 hour | 8 hours |
| P2 | 1 hour | 2 hours | Every 4 hours | 24 hours |
| P3 | 4 hours | 8 hours | Daily | 72 hours |

**Response Time SLA by Tenant Tier:**

| Severity | Free Tier | Pro Tier | Enterprise Tier |
|----------|-----------|----------|-----------------|
| P0 | 15 min ACK | 10 min ACK | 5 min ACK + call |
| P1 | 30 min ACK | 20 min ACK | 15 min ACK + call |
| P2 | 2 hour ACK | 1 hour ACK | 1 hour ACK |
| P3 | 8 hour ACK | 4 hour ACK | 4 hour ACK |

### 3. Escalation Matrix

Define escalation paths:

| Level | Trigger | Contacts | Authority |
|-------|---------|----------|-----------|
| L1 | Initial response | On-call engineer | Triage, initial mitigation |
| L2 | P0 immediate, P1 after 1 hour | Engineering manager, SRE lead | Resource allocation, coordination |
| L3 | P0 after 1 hour, P1 after 2 hours | VP Engineering, CTO | Cross-team mobilization |
| L4 | Data breach, legal impact | Executive team, Legal, CISO | External communication, legal |

**Escalation Flow:**

```
Incident Detected
       |
       v
+------------------+
| On-Call Engineer |  <-- L1
| (5-15 min ACK)   |
+------------------+
       |
       +-- P0 Immediate --+
       |                   |
       +-- P1 > 1 hour ----+
       |                   v
       |         +------------------+
       |         | Eng Manager +    |  <-- L2
       |         | SRE Lead         |
       |         +------------------+
       |                   |
       +-- P0 > 1 hour ----+
       |                   |
       +-- P1 > 2 hours ---+
       |                   v
       |         +------------------+
       |         | VP Eng + CTO     |  <-- L3
       |         +------------------+
       |                   |
       +-- Data breach ----+
       |                   |
       +-- Legal impact ---+
                           v
                 +------------------+
                 | Exec + Legal +   |  <-- L4
                 | CISO             |
                 +------------------+
```

### 4. Incident Categories

Define incident categories for classification:

| Category | Examples | Default Severity | Special Handling |
|----------|----------|------------------|------------------|
| **Outage** | Service down, feature broken | P0-P1 | Status page update |
| **Security** | Breach, vulnerability exploited | P0 | Security team, legal |
| **Performance** | Slow response, timeouts | P1-P2 | Capacity review |
| **Data** | Data loss, corruption | P0-P1 | DBA + backup team |
| **AI Safety** | Model misbehavior, harmful output | P1 | AI safety team |
| **Integration** | Third-party failure | P1-P2 | Vendor contact |
| **Tenant-Specific** | Single tenant issue | P2-P3 | Direct contact |

### 5. Tenant Notification Requirements

Define tenant communication requirements:

| Severity | Notification Required | Timeline | Channel |
|----------|----------------------|----------|---------|
| P0 | All affected tenants | Within 30 min | Status page + email + in-app |
| P1 | Enterprise tier only | Within 1 hour | Status page + email |
| P2 | Upon request | Within 4 hours | Email to requester |
| P3 | Not required | N/A | N/A |

**Per-Tier Notification Matrix:**

| Incident Impact | Free Tier | Pro Tier | Enterprise Tier |
|-----------------|-----------|----------|-----------------|
| P0 - All tenants | Status page | Status page + email | Status page + email + phone |
| P0 - Single tenant | N/A | Email | Email + phone |
| P1 | Status page | Status page + email | Status page + email |
| P2 | Dashboard | Dashboard + email | Dashboard + email |
| P3 | N/A | N/A | N/A |

**Notification Templates:**

**P0 Initial Notification:**
```
Subject: [P0 INCIDENT] {Service} - Service Disruption

SEVERITY: P0 - Critical
STATUS: Investigating
IMPACT: {description of affected features/tenants}

We are aware of an issue affecting {service description}.
Our team is actively investigating and working on resolution.

Next update in 30 minutes.

For enterprise customers, contact your account manager for direct updates.
```

**Resolution Notification:**
```
Subject: [RESOLVED] {Service} - Service Restored

SEVERITY: P0 - Critical (Resolved)
DURATION: {duration}
STATUS: Resolved

The issue has been resolved. Full service restored at {time}.

Root Cause Summary: {brief summary}

A detailed post-incident report will be available within 48 hours.

Enterprise customers will receive SLA credit review notification.
```

### 6. AI-Specific Incident Categories

Define AI/Agent-specific incident types:

| Category | Examples | Severity | Response |
|----------|----------|----------|----------|
| Prompt injection detected | Malicious input bypassed filters | P1 | Block user, review guardrails |
| Model output harmful | Inappropriate, biased, or dangerous | P1 | Kill switch, output review |
| Data leak via output | PII exposed in response | P0 | Immediate block, audit |
| Runaway agent | Agent exceeding boundaries | P1 | Kill switch, budget freeze |
| Budget exhaustion | Token limits exceeded | P2 | Alert, throttle |
| Tool misuse | Unauthorized tool execution | P1 | Revoke permissions, audit |

---

## COLLABORATION MENUS (A/P/C):

After designing classification system, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific incident categories
- **P (Party Mode)**: Bring SRE, security, customer success perspectives
- **C (Continue)**: Proceed to runbook design
- **[Specific category]**: Focus on AI incidents, security incidents, etc.

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: severity matrix, escalation paths
- Clarify edge cases and classification challenges
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review incident classification for operational readiness"
- Present perspectives from SRE, Security, Customer Success
- Return to A/P/C menu

#### If 'C' (Continue):
- Document classification system
- Update frontmatter `stepsCompleted`
- Proceed to `step-07-c-incident-runbooks.md`

---

## Verification

- [ ] Severity levels defined with clear criteria
- [ ] Response time targets set per severity
- [ ] Escalation matrix complete with contacts
- [ ] Incident categories documented
- [ ] Tenant notification requirements per tier
- [ ] AI-specific incidents addressed
- [ ] Web research citations documented

---

## Outputs

- Severity classification matrix
- Response time SLA table
- Escalation matrix with contacts
- Incident category definitions
- Tenant notification requirements
- Notification templates

---

## SUCCESS METRICS:

- [ ] Clear severity definitions (no ambiguity)
- [ ] Response times achievable with current staffing
- [ ] Escalation contacts identified
- [ ] User confirmed via A/P/C menu
- [ ] Output artifact updated with step content
- [ ] Frontmatter stepsCompleted updated

## FAILURE MODES:

- **Ambiguous classification:** Add decision tree or examples
- **Unrealistic SLAs:** Adjust based on team capacity
- **Missing categories:** Use Advanced Elicitation (A) to discover

## Next Step

Proceed to `step-07-c-incident-runbooks.md` for runbook design.
