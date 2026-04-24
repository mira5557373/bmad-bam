# Step 4: Create Routine Operations Runbooks

## Purpose

Create runbooks for routine operations, maintenance, and administrative tasks.

## Prerequisites

- Steps 1-3 complete
- Operational procedures identified
- **Load checklists:** `{project-root}/_bmad/bam/data/checklists/qg-prod-checklist.md`

## Actions

### 1. Create Deployment Runbook

| Section | Content |
|---------|---------|
| **Pre-deployment** | Checklist, approvals |
| **Deployment Steps** | Step-by-step procedure |
| **Validation** | Health checks, smoke tests |
| **Rollback** | Revert procedure |
| **Communication** | Deployment notifications |

### 2. Create Scaling Runbook

| Section | Content |
|---------|---------|
| **Scale Up Triggers** | When to scale |
| **Scale Up Procedure** | Manual scaling steps |
| **Scale Down** | Capacity reduction |
| **Auto-scaling Adjustment** | Policy modifications |
| **Verification** | Capacity validation |

### 3. Create Maintenance Runbook

| Section | Content |
|---------|---------|
| **Scheduled Maintenance** | Planning, scheduling |
| **Database Maintenance** | Vacuuming, index optimization |
| **Cache Maintenance** | Cache warming, invalidation |
| **Log Rotation** | Log management |
| **Certificate Renewal** | SSL/TLS cert rotation |

### 4. Create Tenant Operations Runbook

| Section | Content |
|---------|---------|
| **Tenant Onboarding** | New tenant setup |
| **Tenant Offboarding** | Data deletion, cleanup |
| **Tier Changes** | Upgrade/downgrade |
| **Quota Adjustment** | Limit modifications |
| **Tenant Isolation Verification** | Periodic checks |

### 5. Create Security Operations Runbook

| Section | Content |
|---------|---------|
| **Access Review** | Periodic access audit |
| **Key Rotation** | API key, secret rotation |
| **Security Patching** | Vulnerability remediation |
| **Penetration Testing** | Test coordination |
| **Compliance Audit** | Audit support |

**Verify routine operations runbook patterns with web search:**
Search the web: "deployment runbook best practices {date}"
Search the web: "maintenance runbook template {date}"

## Verification

- [ ] Deployment runbook complete
- [ ] Scaling runbook complete
- [ ] Maintenance runbook complete
- [ ] Tenant operations runbook complete
- [ ] Security operations runbook complete

## Outputs

- Routine operations runbooks

## Next Step

Proceed to `step-05-c-generate-collection.md`
