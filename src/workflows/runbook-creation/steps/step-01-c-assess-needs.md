# Step 1: Assess Operational Needs

## Purpose

Assess operational needs and identify required runbooks for the multi-tenant AI platform.

## Prerequisites

- Architecture documentation available
- Operational context understood
- **Load checklists:** `{project-root}/_bmad/bam/checklists/production-checklist.md`

## Actions

### 1. Identify Critical Operations

| Operation Category | Operations | Priority | Runbook Required |
|--------------------|------------|----------|------------------|
| Incident Response | Service outage, degradation | Critical | Yes |
| Security | Security incidents, breaches | Critical | Yes |
| AI Operations | Model issues, inference failures | High | Yes |
| Deployment | Releases, rollbacks | High | Yes |
| Scaling | Manual scaling, capacity | Medium | Yes |
| Maintenance | Routine maintenance | Medium | Yes |

### 2. Review Incident History

| Incident Type | Frequency | Impact | Runbook Exists | Status |
|---------------|-----------|--------|----------------|--------|
| API outage | | | | |
| Database issues | | | | |
| LLM provider issues | | | | |
| Tenant isolation breach | | | | |
| Cost overrun | | | | |

### 3. Identify AI-Specific Operations

| Operation | Description | Frequency | Criticality |
|-----------|-------------|-----------|-------------|
| Model deployment | New model versions | Weekly | High |
| Model rollback | Revert model | As needed | Critical |
| Kill switch | Emergency stop | Emergency | Critical |
| Budget adjustment | Cost limits | Monthly | Medium |
| Guardrail update | Safety rules | As needed | High |

### 4. Map Operations to Runbooks

| Runbook | Operations Covered | Priority | Owner |
|---------|-------------------|----------|-------|
| incident-response-runbook | Outages, degradation | Critical | |
| ai-operations-runbook | Model ops, kill switch | Critical | |
| deployment-runbook | Releases, rollbacks | High | |
| security-incident-runbook | Security events | Critical | |
| routine-operations-runbook | Maintenance, scaling | Medium | |

**Verify runbook best practices with web search:**
Search the web: "SRE runbook best practices AI platforms {date}"

## Verification

- [ ] All critical operations identified
- [ ] Incident history reviewed
- [ ] AI operations mapped
- [ ] Runbook plan created

## Outputs

- Operational needs assessment

## Next Step

Proceed to `step-02-c-create-incident-runbooks.md`
