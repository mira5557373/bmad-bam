---
name: runbook-template
description: Template for operational runbooks and procedures
category: operations
version: 1.0.0
type: "operations"
---

# Runbook: {{title}}

## Runbook Information

| Field | Value |
|-------|-------|
| Runbook ID | RB-{{version}} |
| Service | {{project_name}} |
| Category | Operations / Incident / Maintenance |
| Last Updated | {{date}} |
| Author | {{author}} |
| Reviewers | |

---

## Overview

### Purpose

Brief description of what this runbook addresses and when to use it.

### Scope

| In Scope | Out of Scope |
|----------|--------------|
| | |

### When to Use This Runbook

- Trigger condition 1
- Trigger condition 2
- Alert: `alert_name`

---

## Prerequisites

### Access Requirements

| System | Access Level | How to Obtain |
|--------|--------------|---------------|
| AWS Console | Admin | Request via IT |
| Database | Read/Write | DBA approval |
| Kubernetes | cluster-admin | Platform team |

### Tools Required

- [ ] AWS CLI configured
- [ ] kubectl configured
- [ ] Database client
- [ ] VPN connected

### Knowledge Requirements

- Understanding of multi-tenant architecture
- Familiarity with {{project_name}} services
- Basic SQL knowledge

---

## Quick Reference

### Key Commands

```bash
# Check service health
kubectl get pods -n production

# View recent logs
kubectl logs -f deployment/main-service -n production --tail=100

# Database connection
psql -h $DB_HOST -U $DB_USER -d $DB_NAME
```

### Key Metrics

| Metric | Normal Range | Alert Threshold |
|--------|--------------|-----------------|
| Response time (p99) | < 500ms | > 1000ms |
| Error rate | < 0.1% | > 1% |
| CPU utilization | < 70% | > 85% |

### Quick Links

- Grafana Dashboard: [Link]
- PagerDuty Service: [Link]
- Status Page: [Link]

---

## Procedure

### Step 1: Initial Assessment

**Objective:** Understand the current state and impact

**Actions:**

1. Check the alert details in PagerDuty/Slack
   ```bash
   # View alert history
   pd incident list --service-id=$SERVICE_ID --since=1h
   ```

2. Verify the issue is real (not false positive)
   ```bash
   # Check service health
   curl -s https://api.example.com/health | jq .
   ```

3. Assess tenant impact
   ```sql
   -- Check affected tenants
   SELECT tenant_id, COUNT(*) as error_count
   FROM error_logs
   WHERE timestamp > NOW() - INTERVAL '1 hour'
   GROUP BY tenant_id
   ORDER BY error_count DESC;
   ```

**Expected Output:**
- List of affected tenants
- Scope of the issue
- Initial severity assessment

**If unsuccessful:** Escalate to Step 5 (Escalation)

---

### Step 2: Containment

**Objective:** Prevent the issue from spreading

**Actions:**

1. If needed, enable maintenance mode for affected tenants
   ```bash
   # Enable maintenance mode for specific tenant
   ./scripts/maintenance-mode.sh enable --tenant-id=$TENANT_ID
   ```

2. If needed, scale down problematic service
   ```bash
   # Reduce replicas to contain issue
   kubectl scale deployment/affected-service --replicas=1 -n production
   ```

3. Notify stakeholders
   - Update status page
   - Post in #incidents Slack channel

**Verification:**
- [ ] Issue contained
- [ ] No new tenants affected
- [ ] Stakeholders notified

---

### Step 3: Investigation

**Objective:** Identify root cause

**Actions:**

1. Check application logs
   ```bash
   # Search for errors in logs
   kubectl logs deployment/main-service -n production --since=1h | grep -i error
   ```

2. Check database performance
   ```sql
   -- Check slow queries
   SELECT query, calls, mean_time, total_time
   FROM pg_stat_statements
   WHERE mean_time > 1000
   ORDER BY total_time DESC
   LIMIT 10;
   ```

3. Check recent deployments
   ```bash
   # List recent deployments
   kubectl rollout history deployment/main-service -n production
   ```

4. Check infrastructure metrics
   - CPU, Memory, Disk in Grafana
   - Network latency
   - Database connections

**Common Root Causes:**

| Symptom | Likely Cause | Solution Reference |
|---------|--------------|-------------------|
| High latency | Database slow queries | Step 4a |
| 5xx errors | Application crash | Step 4b |
| Connection timeout | Network issue | Step 4c |

---

### Step 4: Resolution

#### Step 4a: Database Performance Issue

```bash
# Identify and kill long-running queries
psql -c "SELECT pg_terminate_backend(pid) FROM pg_stat_activity 
WHERE duration > interval '5 minutes' AND state = 'active';"

# Analyze and vacuum affected tables
psql -c "ANALYZE VERBOSE affected_table;"
```

#### Step 4b: Application Crash/Restart

```bash
# Rollback to previous version
kubectl rollout undo deployment/main-service -n production

# Or restart pods
kubectl rollout restart deployment/main-service -n production
```

#### Step 4c: Network/Connectivity Issue

```bash
# Check network policies
kubectl get networkpolicies -n production

# Verify DNS resolution
kubectl run -it --rm debug --image=busybox -- nslookup service-name
```

**Verification:**
- [ ] Root cause addressed
- [ ] Service health restored
- [ ] Metrics returning to normal

---

### Step 5: Escalation

**When to Escalate:**

- Issue not resolved within 30 minutes
- Multiple tenants affected
- Data integrity concerns
- Security implications

**Escalation Path:**

| Level | Contact | When |
|-------|---------|------|
| L1 | On-call engineer | Initial response |
| L2 | Team lead | > 30 min, multiple tenants |
| L3 | Engineering manager | > 1 hour, critical impact |
| L4 | VP Engineering | > 2 hours, major incident |

**Escalation Template:**

```
ESCALATION: [Service Name] - [Brief Issue]

Impact: X tenants affected, Y% error rate
Duration: Started at HH:MM UTC (X minutes ago)
Actions Taken: [List what's been tried]
Current Status: [Where we are now]
Next Steps: [What we need help with]
```

---

### Step 6: Recovery Verification

**Objective:** Confirm full recovery

**Actions:**

1. Verify service health
   ```bash
   # Run health check suite
   ./scripts/health-check.sh --full
   ```

2. Verify tenant access
   ```bash
   # Test tenant API access
   curl -H "X-Tenant-ID: $TENANT_ID" https://api.example.com/v1/test
   ```

3. Check error rates returning to baseline
   - Grafana error rate panel
   - PagerDuty alert resolved

4. Disable maintenance mode if enabled
   ```bash
   ./scripts/maintenance-mode.sh disable --tenant-id=$TENANT_ID
   ```

**Verification Checklist:**
- [ ] All health checks passing
- [ ] Error rate < 0.1%
- [ ] Response time < 500ms (p99)
- [ ] No new alerts triggered
- [ ] Affected tenants can access service

---

### Step 7: Post-Incident

**Actions:**

1. Update status page to resolved
2. Send tenant notification (if applicable)
3. Create incident ticket for tracking
4. Schedule post-mortem (if severity >= High)

**Documentation:**

```markdown
## Incident Summary

- **Duration:** HH:MM - HH:MM UTC
- **Impact:** X tenants, Y% error rate
- **Root Cause:** [Brief description]
- **Resolution:** [What fixed it]
- **Follow-up Actions:** [List action items]
```

---

## Troubleshooting

### Common Issues

| Issue | Symptoms | Solution |
|-------|----------|----------|
| Pod crash loop | CrashLoopBackOff status | Check logs, memory limits |
| Database connection pool exhausted | Connection timeout errors | Restart app, check for leaks |
| High memory usage | OOMKilled events | Increase limits, check for leaks |
| Tenant isolation failure | Cross-tenant data in logs | Immediate escalation, security review |

### Diagnostic Commands

```bash
# Check pod status
kubectl get pods -n production -o wide

# Check pod events
kubectl describe pod $POD_NAME -n production

# Check resource usage
kubectl top pods -n production

# Check tenant context
kubectl logs $POD_NAME -n production | grep "tenant_id"
```

---

## Rollback Procedures

### Application Rollback

```bash
# List rollout history
kubectl rollout history deployment/main-service -n production

# Rollback to previous version
kubectl rollout undo deployment/main-service -n production

# Rollback to specific revision
kubectl rollout undo deployment/main-service -n production --to-revision=X
```

### Database Rollback

**Note:** Database rollbacks require DBA approval

```bash
# Contact DBA with:
# - Rollback point (timestamp or transaction ID)
# - Affected tables
# - Tenant scope (all or specific tenant_ids)
```

---

## Related Runbooks

- [RB-001: Service Deployment](./rb-001-deployment.md)
- [RB-002: Database Maintenance](./rb-002-database.md)
- [RB-003: Tenant Onboarding](./rb-003-onboarding.md)

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "operational runbook best practices {date}"
- "incident response runbook multi-tenant {date}"
- "SRE playbook patterns enterprise SaaS {date}"

Incorporate relevant findings. _Source: [URL]_

---

## Verification Checklist

- [ ] Runbook purpose and scope are clearly defined
- [ ] Prerequisites include all necessary access levels and tools
- [ ] Quick reference commands are tested and working
- [ ] Procedure steps are numbered and follow logical order
- [ ] Each step includes expected output and failure handling
- [ ] Escalation path includes current contacts and criteria
- [ ] Multi-tenant considerations are addressed in diagnostic steps
- [ ] Tenant isolation verification is included in recovery steps
- [ ] Rollback procedures are documented and tested
- [ ] Related runbooks are linked and up to date
- [ ] Key metrics and alert thresholds are accurate
- [ ] Runbook has been dry-run tested within the last quarter

---

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | {{date}} | {{author}} | Initial version |

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial document |

