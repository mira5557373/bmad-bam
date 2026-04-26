# Step 21: Validate Onboarding Design Completeness

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- ✅ **Run all validation checks systematically**

## EXECUTION PROTOCOLS

- 🎯 Focus: Execute all validation checks against design
- 💾 Track: `stepsCompleted: [20, 21]` when complete
- 📖 Context: Loaded artifact and checklist from Step 20
- 🚫 Do NOT: Skip critical checks or proceed without gate decision
- 🔍 Use web search: Not required for validation execution
- ⚠️ Gate: Tenant lifecycle patterns

---

## Purpose

Validate completeness and quality of the tenant onboarding design against established criteria.

---

## Prerequisites

- Step 20 completed: Artifact and checklist loaded
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-lifecycle

---

## Inputs

- Output from Step 20: Loaded artifact and checklist
- Quality gate criteria from quality-gates.csv

---

## Actions

### 1. Validate Registration Flow

| Check | Criteria | Status | Notes |
|-------|----------|--------|-------|
| Signup steps defined | All steps documented | [ ] | |
| Input validation | Validation rules specified | [ ] | |
| Email verification | Verification flow defined | [ ] | |
| **CRITICAL:** Terms acceptance | Legal acceptance captured | [ ] | |
| Tier selection | Tier options clear | [ ] | |
| Admin account creation | Password requirements set | [ ] | |

### 2. Validate Provisioning Saga

| Check | Criteria | Status | Notes |
|-------|----------|--------|-------|
| **CRITICAL:** Saga steps defined | All steps documented | [ ] | |
| **CRITICAL:** Step order specified | Sequential execution clear | [ ] | |
| **CRITICAL:** Timeout per step | Timeouts defined | [ ] | |
| Retry strategy | Retry counts specified | [ ] | |
| **CRITICAL:** Critical vs non-critical | Steps categorized | [ ] | |
| Idempotency | Steps are idempotent | [ ] | |

### 3. Validate Resource Initialization

| Check | Criteria | Status | Notes |
|-------|----------|--------|-------|
| **CRITICAL:** Database provisioning | Matches tenant model | [ ] | |
| Storage provisioning | Path/bucket strategy | [ ] | |
| Cache namespace | Isolation pattern | [ ] | |
| Event subscriptions | Topics defined | [ ] | |
| AI context | Initialization steps | [ ] | |
| **CRITICAL:** Secret management | Keys and secrets secured | [ ] | |

### 4. Validate Onboarding Validation Design

| Check | Criteria | Status | Notes |
|-------|----------|--------|-------|
| **CRITICAL:** Health checks | All resources covered | [ ] | |
| **CRITICAL:** Isolation tests | Cross-tenant blocked | [ ] | |
| Billing verification | Integration checked | [ ] | |
| Welcome notifications | Triggers defined | [ ] | |
| Success metrics | KPIs specified | [ ] | |

### 5. Validate Rollback Procedures

| Check | Criteria | Status | Notes |
|-------|----------|--------|-------|
| **CRITICAL:** Compensating actions | All saga steps have rollback | [ ] | |
| Rollback order | Reverse of provisioning | [ ] | |
| Orphan cleanup | Job defined | [ ] | |
| Partial failure handling | Clear recovery path | [ ] | |
| **CRITICAL:** Data preservation | No data loss on rollback | [ ] | |

### 6. Validate Monitoring and Alerting

| Check | Criteria | Status | Notes |
|-------|----------|--------|-------|
| Failure rate alerts | Threshold defined | [ ] | |
| Duration alerts | P99 threshold set | [ ] | |
| **CRITICAL:** Isolation failure alerts | Immediate notification | [ ] | |
| Dashboard panels | Key metrics visible | [ ] | |
| Runbooks | Alert response documented | [ ] | |

### 7. Validate Security Controls

| Check | Criteria | Status | Notes |
|-------|----------|--------|-------|
| **CRITICAL:** Input sanitization | All inputs validated | [ ] | |
| **CRITICAL:** Authentication | Admin auth before activation | [ ] | |
| Rate limiting | Signup rate limits | [ ] | |
| Audit logging | Onboarding events logged | [ ] | |
| **CRITICAL:** Secret storage | Secrets in vault, not DB | [ ] | |

### 8. Calculate Gate Decision

Tally results:

| Category | Total | Passed | Failed | Critical Failed |
|----------|-------|--------|--------|-----------------|
| Registration Flow | | | | |
| Provisioning Saga | | | | |
| Resource Init | | | | |
| Validation Design | | | | |
| Rollback Procedures | | | | |
| Monitoring | | | | |
| Security Controls | | | | |
| **TOTAL** | | | | |

#### Gate Decision Matrix

| Outcome | Criteria | Action |
|---------|----------|--------|
| **PASS** | All critical pass, >90% non-critical pass | Proceed to implementation |
| **CONDITIONAL** | All critical pass, 70-90% non-critical pass | Proceed with remediation plan |
| **FAIL** | Any critical fails OR <70% non-critical pass | Return to Create/Edit mode |

---

## COLLABORATION MENUS (A/P/C):

After completing validation checks, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific validation findings
- **P (Party Mode)**: Bring QA and security perspectives on gate decision
- **C (Continue)**: Accept validation results and proceed to report
- **[Specific concerns]**: Describe validation concerns to explore

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: validation results, failed checks, gate decision
- Process enhanced insights on remediation priority
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tenant onboarding design validation results"
- Present synthesized recommendations on gate decision
- Return to A/P/C menu

#### If 'C' (Continue):
- Document gate decision
- Update frontmatter `stepsCompleted: [20, 21]`
- Proceed to next step: `step-22-v-report.md`

---

## Verification

- [ ] All validation categories checked
- [ ] Critical checks highlighted
- [ ] Gate decision calculated
- [ ] Failed items documented with notes
- [ ] Remediation priority identified

---

## Outputs

- Completed validation checklist
- Gate decision (PASS/CONDITIONAL/FAIL)
- List of failed checks with notes
- Remediation priorities (if CONDITIONAL or FAIL)

---

## Next Step

Proceed to `step-22-v-report.md` to generate the validation report.
