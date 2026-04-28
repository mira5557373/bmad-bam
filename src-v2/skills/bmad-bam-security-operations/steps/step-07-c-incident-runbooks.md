# Step 07: Incident Runbooks Design (Create Mode - ZIR)

## MANDATORY EXECUTION RULES (READ FIRST):

- STOP NEVER generate content without user input
- READ CRITICAL: ALWAYS read the complete step file before taking any action
- LOOP CRITICAL: When loading next step with 'C', ensure entire file is read
- PAUSE ALWAYS pause after presenting findings and await user direction
- TARGET Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- TARGET Focus: Create incident response runbooks for common scenarios
- SAVE Track: Document step-by-step procedures, verification, rollback
- READ Context: Build on step-06 classification system
- STOP Do NOT: This is the final create step for ZIR
- SEARCH Use web search: Verify current runbook best practices

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Standard incident runbooks
- Rollback procedures
- Verification checklists
- Post-incident processes

**OUT OF SCOPE:**
- Classification changes (step-06)
- Secrets management (ZSR steps)
- Threat modeling (ZST steps)
- Validation (separate mode)

## YOUR TASK

Create incident response runbooks for common incident scenarios including service outages, security incidents, AI safety incidents, and tenant-specific issues. Include step-by-step procedures, verification steps, and rollback options.

---

## Purpose

Create actionable runbooks that enable rapid incident response with clear procedures, verification steps, and rollback options for common incident scenarios.

---

## Prerequisites

- Step 06 completed: Incident classification designed
- **Load patterns:** `{project-root}/_bmad/bam/data/patterns/incident-response.md`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-ir.md`

**Web Research (Required):**

Search the web: "incident response runbook templates SaaS {date}"
Search the web: "rollback procedures best practices {date}"
Search the web: "postmortem blameless culture {date}"

Document findings with citations: _Source: [URL]_

---

## Actions

### 1. Runbook Template Structure

Define standard runbook structure:

```
================================================================================
RUNBOOK: {Runbook Name}
================================================================================
ID: {RB-XXX}
Category: {Outage | Security | Performance | Data | AI Safety}
Severity: {P0 | P1 | P2 | P3}
Last Updated: {date}
Owner: {team}
================================================================================

1. SYMPTOMS
   - {Symptom 1}
   - {Symptom 2}

2. IMPACT
   - Tenants: {affected scope}
   - Features: {affected features}
   - Data: {data at risk}

3. QUICK CHECKS (5 min)
   [ ] {Check 1}
   [ ] {Check 2}
   [ ] {Check 3}

4. MITIGATION STEPS
   Step 1: {Action}
           Command: {command}
           Verify: {verification}
   
   Step 2: {Action}
           ...

5. ROLLBACK PROCEDURE
   [ ] {Rollback step 1}
   [ ] {Rollback step 2}

6. VERIFICATION
   [ ] {Verification step 1}
   [ ] {Verification step 2}

7. POST-INCIDENT
   [ ] Update status page
   [ ] Notify affected tenants
   [ ] Schedule postmortem

================================================================================
```

### 2. Service Outage Runbook

**RB-001: Complete Service Outage**

```
================================================================================
RUNBOOK: Complete Service Outage
================================================================================
ID: RB-001
Category: Outage
Severity: P0
================================================================================

1. SYMPTOMS
   - HTTP 5xx errors from all endpoints
   - Health checks failing across services
   - Customer reports of complete unavailability

2. IMPACT
   - Tenants: ALL
   - Features: ALL
   - Data: No data loss expected

3. QUICK CHECKS (5 min)
   [ ] Cloud provider status: {provider-status-url}
   [ ] Database connectivity: `pg_isready -h {db-host}`
   [ ] Redis connectivity: `redis-cli ping`
   [ ] Recent deployments: `git log --oneline -5`
   [ ] Error logs: `tail -f /var/log/app/error.log`

4. MITIGATION STEPS
   Step 1: Verify infrastructure
           Command: `kubectl get pods -n production`
           Verify: All pods Running

   Step 2: Check recent deployments
           Command: `helm history api-service`
           If recent: Proceed to Step 3 (Rollback)

   Step 3: Rollback if recent deployment
           Command: `helm rollback api-service {previous-version}`
           Verify: `curl -s https://api.example.com/health`

   Step 4: If not deployment-related
           - Check database: `psql -c "SELECT 1"`
           - Check external services: Review integration status
           - Scale services: `kubectl scale deployment api --replicas=5`

5. ROLLBACK PROCEDURE
   [ ] Identify last stable version: `helm history api-service`
   [ ] Execute rollback: `helm rollback api-service {version}`
   [ ] Verify rollback: Health checks passing
   [ ] Monitor for 15 minutes

6. VERIFICATION
   [ ] Health endpoints returning 200
   [ ] Database queries executing
   [ ] Sample tenant login successful
   [ ] No 5xx errors in logs

7. POST-INCIDENT
   [ ] Update status page to "Resolved"
   [ ] Send resolution notification to all tenants
   [ ] Schedule postmortem within 24 hours
   [ ] Create follow-up tickets for permanent fix
================================================================================
```

### 3. Security Incident Runbook

**RB-002: Security Breach / Unauthorized Access**

```
================================================================================
RUNBOOK: Security Breach / Unauthorized Access
================================================================================
ID: RB-002
Category: Security
Severity: P0
================================================================================

1. SYMPTOMS
   - Unusual access patterns detected
   - Credentials exposed in public repository
   - Customer reports unauthorized access
   - Security scanning alert triggered

2. IMPACT
   - Tenants: Potentially ALL
   - Features: Authentication, Authorization
   - Data: Potentially at risk

3. QUICK CHECKS (5 min)
   [ ] Confirm incident: Review alert/report details
   [ ] Identify scope: Which tenants/data affected?
   [ ] Check access logs: `grep "suspicious_pattern" /var/log/access.log`
   [ ] Verify credential status: Check for exposed secrets

4. MITIGATION STEPS
   Step 1: CONTAIN - Isolate compromised components
           Command: `kubectl cordon {affected-node}`
           Or: Disable affected user accounts

   Step 2: PRESERVE - Capture evidence
           Command: `kubectl logs {pod} > incident-{id}-logs.txt`
           Screenshot: Capture relevant dashboards

   Step 3: ROTATE - Emergency credential rotation
           Command: `./scripts/rotate-all-secrets.sh --emergency`
           Verify: Old credentials rejected

   Step 4: NOTIFY - Alert security team and leadership
           Contact: security@example.com, legal@example.com
           If data breach: Notify compliance officer

   Step 5: BLOCK - Prevent further access
           Command: Block IP ranges if identified
           Action: Disable compromised API keys

5. ROLLBACK PROCEDURE
   [ ] Revert unauthorized changes from audit log
   [ ] Restore data from backup if corrupted
   [ ] Re-enable legitimate access after rotation

6. VERIFICATION
   [ ] Compromised credentials no longer work
   [ ] Access logs show normal patterns
   [ ] Security scan clean
   [ ] Affected tenants notified

7. POST-INCIDENT
   [ ] Legal review for notification requirements
   [ ] Tenant breach notification if required
   [ ] Detailed forensic analysis
   [ ] Postmortem with security focus
   [ ] Update security controls
================================================================================
```

### 4. AI Safety Incident Runbook

**RB-003: AI Model Misbehavior / Safety Incident**

```
================================================================================
RUNBOOK: AI Safety Incident
================================================================================
ID: RB-003
Category: AI Safety
Severity: P1 (P0 if data leak)
================================================================================

1. SYMPTOMS
   - Harmful/inappropriate model output reported
   - Prompt injection bypassed filters
   - PII detected in model response
   - Agent executing unauthorized actions

2. IMPACT
   - Tenants: Affected user(s) / potentially all
   - Features: AI/Agent functionality
   - Data: Potential PII exposure

3. QUICK CHECKS (5 min)
   [ ] Review flagged interaction logs
   [ ] Check if kill switch activated
   [ ] Verify guardrails status
   [ ] Identify affected tenant(s)

4. MITIGATION STEPS
   Step 1: KILL SWITCH - Halt AI operations if severe
           Command: `./scripts/ai-kill-switch.sh enable`
           Verify: AI endpoints returning 503

   Step 2: BLOCK USER - If malicious input detected
           Command: Block user ID from AI services
           Log: Preserve attack input for analysis

   Step 3: REVIEW OUTPUT - If data leak suspected
           Action: Review all outputs to affected user
           Check: PII detection logs

   Step 4: STRENGTHEN GUARDRAILS
           Update: Prompt injection filter rules
           Test: Validate with known attack patterns

   Step 5: RESTORE - Gradually re-enable
           Command: `./scripts/ai-kill-switch.sh disable --tenant={id}`
           Monitor: Watch for recurrence

5. ROLLBACK PROCEDURE
   [ ] Revert guardrail changes if too restrictive
   [ ] Re-enable AI for unaffected tenants
   [ ] Restore user access after review

6. VERIFICATION
   [ ] Attack pattern blocked
   [ ] Normal operations restored
   [ ] No PII in affected outputs (manual review)
   [ ] Guardrails passing test suite

7. POST-INCIDENT
   [ ] Add attack pattern to test suite
   [ ] Update prompt injection classifier
   [ ] Notify affected tenant (if data leak)
   [ ] AI safety review meeting
================================================================================
```

### 5. Tenant-Specific Incident Runbook

**RB-004: Single Tenant Service Degradation**

```
================================================================================
RUNBOOK: Single Tenant Service Degradation
================================================================================
ID: RB-004
Category: Tenant-Specific
Severity: P2
================================================================================

1. SYMPTOMS
   - Single tenant reports issues
   - Other tenants unaffected
   - Errors specific to tenant context

2. IMPACT
   - Tenants: Single tenant
   - Features: Varies
   - Data: Tenant data only

3. QUICK CHECKS (5 min)
   [ ] Verify tenant ID: {tenant_id}
   [ ] Check tenant status: `SELECT * FROM tenants WHERE id = '{tenant_id}'`
   [ ] Review tenant quota: Usage vs limits
   [ ] Check tenant-specific config

4. MITIGATION STEPS
   Step 1: VERIFY ISOLATION
           Confirm issue is tenant-specific
           Query: `SELECT tenant_id, error_count FROM logs WHERE ...`

   Step 2: CHECK TENANT RESOURCES
           Database: Tenant data corruption?
           Cache: Tenant cache poisoning?
           Storage: Tenant file access?

   Step 3: TEMPORARY WORKAROUND
           Option: Increase tenant quota temporarily
           Option: Reset tenant cache
           Option: Re-run tenant data migration

   Step 4: COMMUNICATE
           Contact tenant admin directly
           Provide workaround if available

5. ROLLBACK PROCEDURE
   [ ] Revert tenant configuration changes
   [ ] Restore tenant data from backup if needed

6. VERIFICATION
   [ ] Tenant operations successful
   [ ] Tenant admin confirms resolution
   [ ] No impact to other tenants

7. POST-INCIDENT
   [ ] Document root cause
   [ ] Update tenant onboarding if systemic
   [ ] No platform-wide postmortem unless systemic
================================================================================
```

### 6. Post-Incident Process

Define post-incident requirements:

| Severity | Postmortem Required | Timeline | Participants |
|----------|---------------------|----------|--------------|
| P0 | Yes (mandatory) | Within 48 hours | All responders, leadership |
| P1 | Yes (mandatory) | Within 5 days | Responders, manager |
| P2 | Optional | Within 7 days | Responders |
| P3 | No | N/A | N/A |

**Postmortem Template:**

```
## Incident Postmortem: {Incident ID}

### Summary
- **Date/Time:** {start} - {end}
- **Duration:** {duration}
- **Severity:** {P0/P1/P2}
- **Impact:** {tenants affected, features impacted}

### Timeline
- {time}: {event}
- {time}: {event}
- ...

### Root Cause
{Description of root cause - blameless language}

### What Went Well
- {Positive 1}
- {Positive 2}

### What Could Be Improved
- {Improvement 1}
- {Improvement 2}

### Action Items
| ID | Action | Owner | Due Date | Priority |
|----|--------|-------|----------|----------|
| 1 | {action} | {owner} | {date} | P1 |
| 2 | {action} | {owner} | {date} | P2 |

### Lessons Learned
- {Lesson 1}
- {Lesson 2}
```

---

## COLLABORATION MENUS (A/P/C):

After designing runbooks, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific runbook scenarios
- **P (Party Mode)**: Bring SRE, security, operations perspectives for review
- **C (Continue)**: Complete ZIR section
- **[Specific runbook]**: Focus on security, AI, or tenant runbooks

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: runbook templates, specific scenarios
- Clarify edge cases and alternative procedures
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review incident runbooks for operational completeness"
- Present perspectives from SRE, Security, Operations
- Return to A/P/C menu

#### If 'C' (Continue):
- Document runbooks
- Update frontmatter `stepsCompleted`
- ZIR section complete
- If ALL: Security operations design complete

---

## Verification

- [ ] Runbook template structure defined
- [ ] Service outage runbook complete
- [ ] Security incident runbook complete
- [ ] AI safety incident runbook complete
- [ ] Tenant-specific runbook complete
- [ ] Post-incident process documented
- [ ] Web research citations documented

---

## Outputs

- Runbook template structure
- Service outage runbook (RB-001)
- Security incident runbook (RB-002)
- AI safety incident runbook (RB-003)
- Tenant-specific runbook (RB-004)
- Postmortem template

---

## SUCCESS METRICS:

- [ ] Runbooks are actionable (clear commands, verifications)
- [ ] Rollback procedures included
- [ ] Post-incident process defined
- [ ] User confirmed via A/P/C menu
- [ ] Output artifact updated with step content
- [ ] Frontmatter stepsCompleted updated

## FAILURE MODES:

- **Runbook too vague:** Add specific commands and checks
- **Missing scenarios:** Use Advanced Elicitation (A) to identify
- **Procedures untested:** Schedule tabletop exercise

## Next Step

Based on focus:
- **ZIR only:** ZIR section complete - run validation mode
- **ALL:** Security operations design complete - run validation mode
- Proceed to validation: `step-20-v-load.md`
