# Step 5: Generate Runbook Collection

## Purpose

Compile all runbooks into an organized collection with index and cross-references.

## Prerequisites

- Steps 1-4 complete
- All runbooks created
- **Load checklists:** `{project-root}/_bmad/bam/data/checklists/qg-prod-checklist.md`

## Actions

### 1. Compile Runbook Index

| Category | Runbook | Description | Owner | Last Updated |
|----------|---------|-------------|-------|--------------|
| Incident Response | service-outage | Full service outage | | |
| Incident Response | degradation | Performance degradation | | |
| Incident Response | database-incident | Database failures | | |
| AI Operations | model-operations | Model deployment/rollback | | |
| AI Operations | kill-switch | Emergency stop | | |
| AI Operations | ai-safety-incident | Safety violations | | |
| Routine | deployment | Release procedure | | |
| Routine | scaling | Capacity management | | |
| Routine | maintenance | Scheduled maintenance | | |

### 2. Create Cross-Reference Matrix

| Scenario | Primary Runbook | Related Runbooks |
|----------|-----------------|------------------|
| Full outage | service-outage | database-incident, escalation |
| AI model failure | model-operations | kill-switch, ai-safety |
| Cost spike | budget-runbook | scaling, tenant-ops |
| Security breach | security-incident | kill-switch, communication |

### 3. Define Review Cadence

| Runbook Category | Review Frequency | Next Review | Owner |
|------------------|------------------|-------------|-------|
| Incident Response | Quarterly | | |
| AI Operations | Monthly | | |
| Routine Operations | Semi-annual | | |
| Security | Quarterly | | |

### 4. Establish Accessibility

| Access Method | URL/Location | Who Can Access |
|---------------|--------------|----------------|
| Wiki/Confluence | | All ops team |
| Git repository | | All engineers |
| On-call dashboard | | On-call team |
| Emergency binder | | Site reliability |

### 5. Generate Collection Report

Create master document including:
- Runbook inventory
- Category organization
- Cross-reference matrix
- Review schedule
- Access information
- Version history

**Verify runbook collection organization with web search:**
Search the web: "runbook documentation organization {date}"
Search the web: "operational documentation standards {date}"

## Verification

- [ ] All runbooks indexed
- [ ] Cross-references created
- [ ] Review cadence defined
- [ ] Accessibility verified
- [ ] Collection report generated

## Outputs

- `runbook-collection.md` in `{output_folder}/operations/`
- `incident-response-runbook.md` in `{output_folder}/operations/`
- `ai-operations-runbook.md` in `{output_folder}/operations/`

## Next Step

Submit for QG-OC gate verification
