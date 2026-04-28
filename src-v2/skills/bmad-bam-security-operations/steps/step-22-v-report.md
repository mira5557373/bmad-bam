# Step 22: Generate Validation Report (Validate Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- STOP **NEVER generate report without completed validation**
- READ **CRITICAL: Include all validation results** from step-21
- LOOP **CRITICAL: Document all evidence** and gaps
- PAUSE **ALWAYS pause after presenting report** and await user direction
- TARGET **Generate actionable report** with clear next steps
- CHECK **Include recovery protocol** if FAIL status
- WARN **Flag deadline requirements** for CONDITIONAL status

## EXECUTION PROTOCOLS

- TARGET Focus: Generate comprehensive validation report
- SAVE Track: `stepsCompleted: [20, 21, 22]` when complete
- READ Context: Compile results from step-21 validation
- STOP Do NOT: Re-execute validation checks
- SEARCH Use web search: N/A - report generation only
- WARN Gate: Report documents path forward based on outcome

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Compiling validation results
- Generating formal report
- Documenting next steps

**OUT OF SCOPE:**
- Re-executing validation
- Fixing gaps
- Modifying artifact

## YOUR TASK

Generate a comprehensive validation report documenting QG-S3 and QG-IR results, evidence, gaps, and required next steps based on the validation outcome.

---

## Purpose

Generate a formal validation report that documents quality gate results, provides evidence for compliance, and defines the path forward based on validation outcome.

---

## Prerequisites

- Step 21 completed: Validation executed
- All checks have status (PASS/FAIL/N/A)
- Evidence documented
- Overall gate status determined

---

## Actions

### 1. Compile Executive Summary

Generate executive summary:

```
================================================================================
SECURITY OPERATIONS VALIDATION REPORT
================================================================================
Document: security-operations.md
Validation Date: {date}
Validator: {name/system}
================================================================================

EXECUTIVE SUMMARY
-----------------
Quality Gate QG-S3 (Security Baseline): {PASS/CONDITIONAL/FAIL}
Quality Gate QG-IR (Incident Response):  {PASS/CONDITIONAL/FAIL}

Overall Validation Status: {PASS/CONDITIONAL/FAIL}

Key Findings:
- {Critical finding 1}
- {Critical finding 2}
- {Notable strength}

Recommendation: {Proceed to deployment / Remediate gaps / Escalate}
================================================================================
```

### 2. Detail QG-S3 Results

Document Security Baseline results:

```
QG-S3: SECURITY BASELINE RESULTS
================================

SECRETS MANAGEMENT (ZSR)
------------------------
| Check | Status | Evidence |
|-------|--------|----------|
| Secret encryption (AES-256) | {PASS/FAIL} | {evidence} |
| Tenant isolation | {PASS/FAIL} | {evidence} |
| No plaintext secrets | {PASS/FAIL} | {evidence} |
| Vault provider | {PASS/FAIL} | {evidence} |
| Rotation policies | {PASS/FAIL} | {evidence} |
| Zero-downtime rotation | {PASS/FAIL} | {evidence} |
| Agent tokens | {PASS/FAIL} | {evidence} |

Subtotal: {pass}/{total} PASS

THREAT MODELING (ZST)
---------------------
| Check | Status | Evidence |
|-------|--------|----------|
| STRIDE coverage | {PASS/FAIL} | {evidence} |
| Multi-tenant threats | {PASS/FAIL} | {evidence} |
| Attack trees | {PASS/FAIL} | {evidence} |
| Mitigations mapped | {PASS/FAIL} | {evidence} |
| AI threats | {PASS/FAIL/N/A} | {evidence} |
| Defense-in-depth | {PASS/FAIL} | {evidence} |

Subtotal: {pass}/{total} PASS

QG-S3 OVERALL: {PASS/CONDITIONAL/FAIL}
- Critical items: {pass}/{total}
- Non-critical items: {pass}/{total}
```

### 3. Detail QG-IR Results

Document Incident Response results:

```
QG-IR: INCIDENT RESPONSE RESULTS
================================

CLASSIFICATION
--------------
| Check | Status | Evidence |
|-------|--------|----------|
| Severity matrix | {PASS/FAIL} | {evidence} |
| Response SLAs | {PASS/FAIL} | {evidence} |
| Classification criteria | {PASS/FAIL} | {evidence} |

ESCALATION
----------
| Check | Status | Evidence |
|-------|--------|----------|
| Escalation matrix | {PASS/FAIL} | {evidence} |
| On-call rotation | {PASS/FAIL} | {evidence} |
| Contact list | {PASS/FAIL} | {evidence} |

RUNBOOKS
--------
| Check | Status | Evidence |
|-------|--------|----------|
| P0 runbook | {PASS/FAIL} | {evidence} |
| Security runbook | {PASS/FAIL} | {evidence} |
| AI safety runbook | {PASS/FAIL/N/A} | {evidence} |
| Rollback procedures | {PASS/FAIL} | {evidence} |

NOTIFICATION
------------
| Check | Status | Evidence |
|-------|--------|----------|
| P0 notification | {PASS/FAIL} | {evidence} |
| Notification SLAs | {PASS/FAIL} | {evidence} |
| Templates | {PASS/FAIL} | {evidence} |

POST-INCIDENT
-------------
| Check | Status | Evidence |
|-------|--------|----------|
| Postmortem required | {PASS/FAIL} | {evidence} |
| Postmortem template | {PASS/FAIL} | {evidence} |
| Action tracking | {PASS/FAIL} | {evidence} |

QG-IR OVERALL: {PASS/CONDITIONAL/FAIL}
- Critical items: {pass}/{total}
- Non-critical items: {pass}/{total}
```

### 4. Gap Analysis

Document gaps requiring remediation:

```
GAP ANALYSIS
============

CRITICAL GAPS (Must fix before deployment):
-------------------------------------------
| Gap | Check | Impact | Remediation |
|-----|-------|--------|-------------|
| {gap 1} | {check} | {impact} | {action} |
| {gap 2} | {check} | {impact} | {action} |

NON-CRITICAL GAPS (Fix within deadline):
----------------------------------------
| Gap | Check | Deadline | Owner |
|-----|-------|----------|-------|
| {gap 1} | {check} | {date} | {owner} |
| {gap 2} | {check} | {date} | {owner} |

WAIVED ITEMS (With justification):
----------------------------------
| Item | Justification | Approver | Expiry |
|------|---------------|----------|--------|
| {item} | {reason} | {name} | {date} |
```

### 5. Outcome-Specific Content

#### If PASS:

```
VALIDATION OUTCOME: PASS
========================

All quality gate criteria met. Security operations design is approved for
production deployment.

NEXT STEPS:
1. Archive validation report
2. Proceed to implementation
3. Schedule periodic review (90 days)

APPROVERS:
- Security Architecture: {name} {date}
- Platform Engineering: {name} {date}
- Compliance: {name} {date}
```

#### If CONDITIONAL:

```
VALIDATION OUTCOME: CONDITIONAL
===============================

All critical criteria met. Non-critical gaps require remediation within
specified timeline.

REMEDIATION PLAN:
| Gap | Action | Owner | Due Date | Priority |
|-----|--------|-------|----------|----------|
| {gap 1} | {action} | {owner} | {date} | P1 |
| {gap 2} | {action} | {owner} | {date} | P2 |

CONDITIONAL APPROVAL:
- Deployment approved with remediation commitment
- Review scheduled: {date}
- Escalation if not remediated: {contact}

APPROVERS:
- Security Architecture: {name} {date}
- Platform Engineering: {name} {date}
```

#### If FAIL:

```
VALIDATION OUTCOME: FAIL
========================

Critical criteria not met. Deployment blocked until remediation complete.

CRITICAL FAILURES:
| Item | Reason | Required Action |
|------|--------|-----------------|
| {item 1} | {reason} | {action} |
| {item 2} | {reason} | {action} |

RECOVERY PROTOCOL:
------------------
Attempt 1: Immediate remediation (target: 1-2 days)
- Fix critical items listed above
- Re-run validation
- Lock passed categories

Attempt 2: Deep review (target: 1 week)
- Engage Security Architecture team
- Review against QG-S3/QG-IR in detail
- Re-run validation

Attempt 3: Mandatory escalation
- Escalate to CISO and security leadership
- Document blockers
- Reassess timeline

NEXT STEPS:
1. Address critical failures
2. Return to Edit mode for remediation
3. Re-run validation
4. Escalate if Attempt 2 fails
```

### 6. Signatures and Approval

```
================================================================================
APPROVAL SIGNATURES
================================================================================

For PASS/CONDITIONAL outcomes, the following approvals are required:

Security Architecture Lead: _____________________ Date: _________
Platform Engineering Lead:  _____________________ Date: _________
Compliance Officer:         _____________________ Date: _________

For FAIL outcomes, acknowledgment required:

Engineering Manager:        _____________________ Date: _________
Remediation Owner:          _____________________ Date: _________

================================================================================
Report Generated: {timestamp}
Report Version: 1.0
================================================================================
```

---

## COLLABORATION MENUS (F/E/R):

After generating report, present the user with:

```
Validation report generated.

Your options:
- **F (Finalize)**: Save report and complete validation
- **E (Edit)**: Return to Edit mode to address gaps
- **R (Re-validate)**: Re-run validation from step-20

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'F' (Finalize):
- Save validation report
- Update document frontmatter with validation status
- Complete validation workflow
- Output report location

#### If 'E' (Edit):
- Return to Edit mode for remediation
- Next step: `step-10-e-load.md`

#### If 'R' (Re-validate):
- Re-run validation
- Next step: `step-20-v-load.md`

---

## SUCCESS METRICS

- CHECK Executive summary generated
- CHECK QG-S3 results documented
- CHECK QG-IR results documented
- CHECK Gap analysis complete
- CHECK Outcome-specific content included
- CHECK Report saved to output folder

---

## FAILURE MODES

- X **Incomplete validation:** Return to step-21
- X **Missing evidence:** Flag in report, don't block
- X **User rejects report:** Allow revision

---

## Verification

- [ ] All validation results included
- [ ] Evidence documented
- [ ] Gaps identified with remediation
- [ ] Outcome-appropriate content
- [ ] Report saved

---

## Outputs

- Validation report at `{output_folder}/planning-artifacts/security-operations-validation.md`
- Updated document frontmatter with validation status
- Gap remediation tickets (if CONDITIONAL/FAIL)

---

## Workflow Complete

Security Operations validation workflow complete.

Based on outcome:
- **PASS:** Proceed to implementation
- **CONDITIONAL:** Proceed with remediation plan
- **FAIL:** Return to Edit mode, follow recovery protocol
