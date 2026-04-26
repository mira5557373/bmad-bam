# Step 21: Execute Compliance Validation (Validate Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER skip CRITICAL checks** - All CRITICAL categories must be verified
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 🚦 **HALT on CRITICAL failure** - Document and enter recovery protocol
- 🔍 **Verify current compliance requirements** with web search before finalizing

## EXECUTION PROTOCOLS

- 🎯 Focus: Execute QG-CC and QG-P1 validation checks against compliance artifact
- 💾 Track: `stepsCompleted: [20, 21]` when complete
- 📖 Context: Each check produces PASS, CONDITIONAL, FAIL, or WAIVED
- 🚫 Do NOT: Skip any CRITICAL check; CRITICAL failures block progress
- 🔍 Use web search: Verify compliance patterns against current regulations
- ⚠️ Gate: QG-CC and QG-P1 - Any CRITICAL failure triggers recovery protocol

---

## YOUR TASK

Execute all QG-CC and QG-P1 validation checks against the loaded compliance design artifact. Document each check result with evidence. Calculate the final gate decision based on CRITICAL and non-critical check outcomes.

---

## Purpose

Execute systematic validation of the compliance design against quality gate criteria, framework requirements, and multi-tenant compliance best practices.

---

## Prerequisites

- Step 20 completed: Artifact and checklists loaded
- Validation criteria prepared
- **Loaded checklist:** Production Readiness (QG-P1)
- **Loaded checklist:** Continuous Compliance Verification (QG-CC)

---

## Actions

### 1. Validate Framework Coverage

Check coverage of each applicable framework:

| Framework | Required Elements | Present | Missing | Status |
|-----------|-------------------|---------|---------|--------|
| SOC2 | Trust criteria mapped | YES/NO | {list} | PASS/FAIL |
| GDPR | Data subject rights | YES/NO | {list} | PASS/FAIL |
| HIPAA | Safeguard categories | YES/NO | {list} | PASS/FAIL |
| PCI-DSS | 12 requirements | YES/NO | {list} | PASS/FAIL |

### 2. Validate Data Governance

Check data governance completeness:

| Requirement | Criteria | Status | Finding |
|-------------|----------|--------|---------|
| Data Classification | All data types classified | PASS/FAIL | {finding} |
| PII Handling | Encryption, masking defined | PASS/FAIL | {finding} |
| Retention Policies | Per jurisdiction defined | PASS/FAIL | {finding} |
| Right to Erasure | Workflow documented | PASS/FAIL | {finding} |
| Cross-Border Transfer | Controls specified | PASS/FAIL | {finding} |

**CRITICAL Checks:**
- [ ] **CRITICAL:** PII types identified with handling requirements
- [ ] **CRITICAL:** Encryption standards specified (AES-256 minimum)
- [ ] **CRITICAL:** GDPR Article 17 workflow complete

### 3. Validate Audit Controls

Check audit control completeness:

| Requirement | Criteria | Status | Finding |
|-------------|----------|--------|---------|
| Event Categories | All categories defined | PASS/FAIL | {finding} |
| Log Schema | Tenant context included | PASS/FAIL | {finding} |
| Immutability | Tamper protection specified | PASS/FAIL | {finding} |
| Evidence Collection | Automation defined | PASS/FAIL | {finding} |
| Retention | Per framework requirements | PASS/FAIL | {finding} |

**CRITICAL Checks:**
- [ ] **CRITICAL:** Audit log schema includes `tenant_id`
- [ ] **CRITICAL:** Immutability mechanism specified
- [ ] **CRITICAL:** Security events logged

### 4. Validate Compliance Monitoring

Check monitoring completeness:

| Requirement | Criteria | Status | Finding |
|-------------|----------|--------|---------|
| Continuous Checks | All check types defined | PASS/FAIL | {finding} |
| Alert Routing | By severity configured | PASS/FAIL | {finding} |
| Remediation Workflows | Documented | PASS/FAIL | {finding} |
| Report Generation | Automation specified | PASS/FAIL | {finding} |

**CRITICAL Checks:**
- [ ] **CRITICAL:** Cross-tenant access detection configured
- [ ] **CRITICAL:** Critical alert response time < 15 min
- [ ] **CRITICAL:** Remediation SLAs defined

### 5. Validate Tenant Isolation Alignment

Verify compliance controls align with tenant model:

| Tenant Model | Data Governance | Audit Controls | Monitoring | Status |
|--------------|-----------------|----------------|------------|--------|
| {tenant_model} | Compatible? | Compatible? | Compatible? | PASS/FAIL |

**Tenant-Specific Checks:**

For `row-level-security`:
- [ ] RLS policies include audit triggers
- [ ] Tenant context propagation for logging
- [ ] Cross-tenant query detection

For `schema-per-tenant`:
- [ ] Schema-level audit tables
- [ ] Tenant schema isolation verified
- [ ] Per-schema retention policies

For `database-per-tenant`:
- [ ] Separate audit databases
- [ ] Tenant database isolation verified
- [ ] Per-database compliance monitoring

### 6. Validate Implementation Roadmap

Check roadmap feasibility:

| Phase | Defined | Dependencies Mapped | Timeline Realistic | Status |
|-------|---------|---------------------|--------------------| -------|
| Foundation | YES/NO | YES/NO | YES/NO | PASS/FAIL |
| SOC2 Prep | YES/NO | YES/NO | YES/NO | PASS/FAIL |
| Privacy | YES/NO | YES/NO | YES/NO | PASS/FAIL |
| Industry | YES/NO | YES/NO | YES/NO | PASS/FAIL |
| Continuous | YES/NO | YES/NO | YES/NO | PASS/FAIL |

### 7. Validate Risk Assessment

Check risk documentation:

| Requirement | Criteria | Status | Finding |
|-------------|----------|--------|---------|
| Risk Identification | All compliance risks listed | PASS/FAIL | {finding} |
| Impact Assessment | Likelihood and impact rated | PASS/FAIL | {finding} |
| Current Controls | Controls mapped to risks | PASS/FAIL | {finding} |
| Residual Risk | Residual risk documented | PASS/FAIL | {finding} |
| Mitigation Plans | Plans for high risks | PASS/FAIL | {finding} |

### 8. Compile Validation Summary

Aggregate validation results:

| Category | Checks | Passed | Failed | Critical Failures |
|----------|--------|--------|--------|-------------------|
| Framework Coverage | {n} | {n} | {n} | {n} |
| Data Governance | {n} | {n} | {n} | {n} |
| Audit Controls | {n} | {n} | {n} | {n} |
| Compliance Monitoring | {n} | {n} | {n} | {n} |
| Tenant Isolation | {n} | {n} | {n} | {n} |
| Implementation Roadmap | {n} | {n} | {n} | {n} |
| Risk Assessment | {n} | {n} | {n} | {n} |
| **TOTAL** | {n} | {n} | {n} | {n} |

---

## COLLABORATION MENUS (A/P/C):

After validation execution, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific validation findings
- **P (Party Mode)**: Bring audit perspective on findings
- **C (Continue)**: Proceed to generate validation report
- **[Specific finding]**: Discuss specific validation result

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: validation results, critical failures, gaps identified
- Process enhanced understanding of failures
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review compliance validation findings"
- Present auditor perspective on findings
- Return to A/P/C menu

#### If 'C' (Continue):
- Document validation summary
- Proceed to next step: `step-22-v-report.md`

---

## SUCCESS METRICS

- ✅ All 7 QG-CC categories validated with evidence
- ✅ All QG-P1 compliance sections verified
- ✅ CRITICAL check results documented with evidence
- ✅ Non-critical check results documented
- ✅ Gate decision calculated correctly
- ✅ Framework coverage verified for all applicable frameworks
- ✅ Recovery protocol activated (if FAIL)

---

## FAILURE MODES

- ❌ **CRITICAL category fails:** Enter recovery protocol, document gaps
- ❌ **Missing evidence:** Cannot validate without audit evidence
- ❌ **Framework incomplete:** Required framework controls missing
- ❌ **Recovery attempt exhausted:** Escalate to mandatory course correction

---

## Verification

- [ ] All framework coverage validated
- [ ] Data governance requirements checked
- [ ] Audit control completeness verified
- [ ] Monitoring requirements validated
- [ ] Tenant isolation alignment confirmed
- [ ] Implementation roadmap feasibility assessed
- [ ] Risk assessment completeness verified
- [ ] Critical checks identified

---

## Outputs

- Framework coverage validation results
- Data governance validation results
- Audit control validation results
- Monitoring validation results
- Tenant isolation alignment results
- Validation summary with pass/fail counts

---

## Next Step

Proceed to `step-22-v-report.md` to generate the validation report.
