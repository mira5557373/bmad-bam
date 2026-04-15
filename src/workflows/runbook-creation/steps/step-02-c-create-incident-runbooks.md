# Step 2: Create Incident Response Runbooks

## Purpose

Create comprehensive incident response runbooks for platform operations.

## Prerequisites

- Step 1 complete
- Incident categories identified
- **Load template:** `{project-root}/_bmad/bam/data/templates/observability-template.md`

## Actions

### 1. Create Service Outage Runbook

| Section | Content |
|---------|---------|
| **Detection** | Alert sources, symptoms |
| **Assessment** | Severity matrix, impact scope |
| **Triage** | Initial diagnosis steps |
| **Resolution** | Common fixes by root cause |
| **Escalation** | When and who to escalate |
| **Communication** | Status page, stakeholders |
| **Post-incident** | RCA, follow-up |

### 2. Create Degradation Runbook

| Section | Content |
|---------|---------|
| **Detection** | Latency alerts, error rate spikes |
| **Assessment** | Affected services, tenants |
| **Diagnosis** | Performance debugging |
| **Mitigation** | Traffic management, scaling |
| **Resolution** | Root cause fixes |
| **Recovery** | Service restoration |

### 3. Create Database Incident Runbook

| Section | Content |
|---------|---------|
| **Detection** | Connection failures, replication lag |
| **Assessment** | Data integrity check |
| **Failover** | Replica promotion steps |
| **Recovery** | Point-in-time restore |
| **Verification** | Data consistency checks |

### 4. Create Third-Party Dependency Runbook

| Section | Content |
|---------|---------|
| **Detection** | External service failures |
| **Assessment** | Affected functionality |
| **Fallback** | Circuit breaker activation |
| **Communication** | Vendor contact, user notification |
| **Recovery** | Service restoration checks |

### 5. Runbook Template Structure

```markdown
# [Runbook Name]

## Overview
[Brief description of what this runbook covers]

## Severity Levels
| Level | Criteria | Response Time |
|-------|----------|---------------|

## Detection
[How to identify the issue]

## Triage
[Initial assessment steps]

## Resolution
[Step-by-step resolution]

## Escalation
[When and how to escalate]

## Communication
[Who to notify and how]

## Post-Incident
[Follow-up actions]
```

**Verify incident runbook best practices with web search:**
Search the web: "incident response runbook template {date}"
Search the web: "SRE incident runbook structure {date}"

## Verification

- [ ] Service outage runbook complete
- [ ] Degradation runbook complete
- [ ] Database runbook complete
- [ ] Dependency runbook complete

## Outputs

- Incident response runbooks

## Next Step

Proceed to `step-03-c-create-ai-runbooks.md`
