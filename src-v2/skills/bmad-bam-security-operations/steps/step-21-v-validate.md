# Step 21: Validate Security Operations Design (Validate Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- STOP **NEVER skip validation checks** - Execute all applicable checks
- READ **CRITICAL: Document evidence** for each check
- LOOP **CRITICAL: Process all checklist items** systematically
- PAUSE **ALWAYS pause after presenting findings** and await user direction
- TARGET **Focus on QG-S3 and QG-IR** criteria
- CHECK **Mark each item** PASS, FAIL, or N/A with justification
- WARN **Flag CRITICAL items** that fail - these block progression

## EXECUTION PROTOCOLS

- TARGET Focus: Execute validation checks against QG-S3 and QG-IR
- SAVE Track: Document evidence for each check
- READ Context: Use loaded artifact and checklists from step-20
- STOP Do NOT: Modify the artifact during validation
- SEARCH Use web search: Verify current security standards
- WARN Gate: CRITICAL failures require remediation before passing

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Executing validation checks
- Documenting evidence
- Identifying gaps

**OUT OF SCOPE:**
- Fixing gaps (use Edit mode)
- Creating new content
- Report generation (step-22)

## YOUR TASK

Execute systematic validation of the security operations design against QG-S3 (Security Baseline) and QG-IR (Incident Response) quality gate criteria. Document evidence for each check and identify any gaps requiring remediation.

---

## Purpose

Systematically validate the security operations design against quality gate criteria to ensure readiness for production deployment.

---

## Prerequisites

- Step 20 completed: Artifact and checklists loaded
- Document completeness verified
- Validation context extracted

**Web Research (Verification):**

Search the web: "security operations validation checklist {date}"
Search the web: "incident response readiness assessment {date}"

---

## Actions

### 1. QG-S3 Validation: Secrets Management

Execute secrets management validation:

| Check | Criteria | Evidence | Status |
|-------|----------|----------|--------|
| **CRITICAL:** Secret encryption | AES-256 at rest | {evidence} | PASS/FAIL |
| **CRITICAL:** Tenant isolation | Namespace/path separation | {evidence} | PASS/FAIL |
| **CRITICAL:** No plaintext secrets | Code, logs, env checked | {evidence} | PASS/FAIL |
| Vault provider specified | Provider documented | {evidence} | PASS/FAIL |
| Rotation policies defined | All types covered | {evidence} | PASS/FAIL |
| Zero-downtime rotation | Dual-active designed | {evidence} | PASS/FAIL |
| Agent tokens short-lived | TTL < 1 hour | {evidence} | PASS/FAIL |
| Emergency rotation procedure | Documented | {evidence} | PASS/FAIL |

### 2. QG-S3 Validation: Threat Modeling

Execute threat modeling validation:

| Check | Criteria | Evidence | Status |
|-------|----------|----------|--------|
| **CRITICAL:** STRIDE coverage | All components analyzed | {evidence} | PASS/FAIL |
| **CRITICAL:** Multi-tenant threats | Cross-tenant documented | {evidence} | PASS/FAIL |
| Component matrix complete | All components listed | {evidence} | PASS/FAIL |
| Attack trees documented | Critical paths covered | {evidence} | PASS/FAIL |
| Mitigations mapped | All high/critical threats | {evidence} | PASS/FAIL |
| AI threats addressed | If AI present | {evidence} | PASS/FAIL/N/A |
| Defense-in-depth | Layered controls | {evidence} | PASS/FAIL |

### 3. QG-IR Validation: Incident Classification

Execute incident classification validation:

| Check | Criteria | Evidence | Status |
|-------|----------|----------|--------|
| **CRITICAL:** Severity matrix | P0-P3 defined | {evidence} | PASS/FAIL |
| **CRITICAL:** Response SLAs | Per severity documented | {evidence} | PASS/FAIL |
| Classification criteria | Decision tree/guide | {evidence} | PASS/FAIL |
| Impact assessment | Tenant/feature/data scope | {evidence} | PASS/FAIL |
| AI incident categories | If AI present | {evidence} | PASS/FAIL/N/A |

### 4. QG-IR Validation: Escalation and Response

Execute escalation validation:

| Check | Criteria | Evidence | Status |
|-------|----------|----------|--------|
| **CRITICAL:** Escalation matrix | Levels L1-L4 defined | {evidence} | PASS/FAIL |
| **CRITICAL:** On-call rotation | Configured and staffed | {evidence} | PASS/FAIL |
| Contact list current | Verified within 30 days | {evidence} | PASS/FAIL |
| Escalation triggers | Per severity documented | {evidence} | PASS/FAIL |

### 5. QG-IR Validation: Runbooks

Execute runbook validation:

| Check | Criteria | Evidence | Status |
|-------|----------|----------|--------|
| **CRITICAL:** P0 runbook exists | Service outage covered | {evidence} | PASS/FAIL |
| **CRITICAL:** Security runbook exists | Breach procedure | {evidence} | PASS/FAIL |
| Runbook structure | Standard template used | {evidence} | PASS/FAIL |
| Rollback procedures | Included in runbooks | {evidence} | PASS/FAIL |
| Verification steps | Included in runbooks | {evidence} | PASS/FAIL |
| AI safety runbook | If AI present | {evidence} | PASS/FAIL/N/A |

### 6. QG-IR Validation: Tenant Notification

Execute notification validation:

| Check | Criteria | Evidence | Status |
|-------|----------|----------|--------|
| **CRITICAL:** P0 notification | All affected tenants | {evidence} | PASS/FAIL |
| Notification SLAs | Per severity documented | {evidence} | PASS/FAIL |
| Notification templates | Initial, update, resolution | {evidence} | PASS/FAIL |
| Per-tier requirements | Tier-specific handling | {evidence} | PASS/FAIL |
| Status page integration | Configured | {evidence} | PASS/FAIL |

### 7. QG-IR Validation: Post-Incident

Execute post-incident validation:

| Check | Criteria | Evidence | Status |
|-------|----------|----------|--------|
| **CRITICAL:** Postmortem required | P0/P1 mandatory | {evidence} | PASS/FAIL |
| Postmortem template | Blameless format | {evidence} | PASS/FAIL |
| Action item tracking | Process defined | {evidence} | PASS/FAIL |
| Timeline requirements | Per severity | {evidence} | PASS/FAIL |

---

## Validation Summary

Compile validation results:

```
================================================================================
SECURITY OPERATIONS - VALIDATION RESULTS
================================================================================

QG-S3: SECURITY BASELINE
------------------------
Secrets Management:    {pass_count}/{total_count} checks passed
Threat Modeling:       {pass_count}/{total_count} checks passed
Critical Items:        {critical_pass}/{critical_total}
Overall QG-S3:         {PASS/CONDITIONAL/FAIL}

QG-IR: INCIDENT RESPONSE
------------------------
Classification:        {pass_count}/{total_count} checks passed
Escalation:           {pass_count}/{total_count} checks passed
Runbooks:             {pass_count}/{total_count} checks passed
Notification:         {pass_count}/{total_count} checks passed
Post-Incident:        {pass_count}/{total_count} checks passed
Critical Items:        {critical_pass}/{critical_total}
Overall QG-IR:         {PASS/CONDITIONAL/FAIL}

================================================================================
OVERALL STATUS: {PASS/CONDITIONAL/FAIL}
================================================================================

{If FAIL, list critical items that failed}
{If CONDITIONAL, list non-critical gaps with remediation plan}
```

---

## COLLABORATION MENUS (A/P/C):

After validation execution, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific failed checks
- **P (Party Mode)**: Bring security audit perspective on validation results
- **C (Continue)**: Proceed to validation report
- **E (Edit)**: Return to Edit mode to address gaps

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: failed checks, evidence gaps
- Clarify remediation approach
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review security operations validation results"
- Present security audit perspective
- Return to A/P/C menu

#### If 'C' (Continue):
- Proceed to report generation
- Next step: `step-22-v-report.md`

#### If 'E' (Edit):
- Return to Edit mode for remediation
- Next step: `step-10-e-load.md`

---

## SUCCESS METRICS

- CHECK All applicable checks executed
- CHECK Evidence documented for each check
- CHECK Critical items clearly identified
- CHECK Overall gate status determined
- CHECK Gaps identified for remediation

---

## FAILURE MODES

- X **Missing evidence:** Flag check as incomplete, not failed
- X **Ambiguous criteria:** Use best judgment, document assumption
- X **Document incomplete:** Return to Create/Edit mode

---

## Verification

- [ ] QG-S3 checks completed
- [ ] QG-IR checks completed
- [ ] All critical items evaluated
- [ ] Evidence documented
- [ ] Overall status determined

---

## Outputs

- Detailed validation results per check
- Evidence documentation
- Gap identification
- Overall gate status

---

## Next Step

Proceed to `step-22-v-report.md` to generate validation report.
