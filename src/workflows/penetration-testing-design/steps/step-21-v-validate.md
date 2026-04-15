# Step 21: Validate Against Criteria

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array

---

## Purpose

Validate the penetration testing design against QG-I3 quality gate criteria, OWASP testing guidelines, and multi-tenant security requirements.

---

## Prerequisites

- Step 20 completed: Artifact loaded and parsed
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-i3-agent-safety.md`
- **Load quality gate:** `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-S10`
- **Entry gate verified:** QG-S4 (AI Security Gate) passed

---

## Actions

### 1. Test Coverage Validation

| Check | Criteria | Status | Finding |
|-------|----------|--------|---------|
| OWASP Top 10 | All categories covered | Pass/Fail | {detail} |
| Authentication | Auth test cases present | Pass/Fail | {detail} |
| Authorization | Access control tests present | Pass/Fail | {detail} |
| Input validation | Injection tests present | Pass/Fail | {detail} |
| API security | API tests present | Pass/Fail | {detail} |
| Data security | Data protection tests present | Pass/Fail | {detail} |

### 2. Tenant Isolation Validation

| Check | Criteria | Status | Finding |
|-------|----------|--------|---------|
| Cross-tenant tests | Direct access attempts | Pass/Fail | {detail} |
| Model-specific tests | Tests for {tenant_model} | Pass/Fail | {detail} |
| Shared resource tests | Resource isolation tested | Pass/Fail | {detail} |
| Tier boundary tests | Feature isolation tested | Pass/Fail | {detail} |

### 3. AI Agent Security Validation

| Check | Criteria | Status | Finding |
|-------|----------|--------|---------|
| Prompt injection | Direct and indirect tests | Pass/Fail | {detail} |
| Tool permission | Permission escalation tests | Pass/Fail | {detail} |
| Approval workflow | Bypass tests present | Pass/Fail | {detail} |
| Resource exhaustion | DoS tests present | Pass/Fail | {detail} |

### 4. QG-I3 Checklist Validation

| Check ID | Description | Status | Evidence |
|----------|-------------|--------|----------|
| I3-SEC-01 | Pentest scope defined | Pass/Fail | {evidence} |
| I3-SEC-02 | Tenant isolation tested | Pass/Fail | {evidence} |
| I3-SEC-03 | AI agent security tested | Pass/Fail | {evidence} |
| I3-SEC-04 | Reporting procedures defined | Pass/Fail | {evidence} |

### 5. QG-S10 Penetration Testing Gate Validation

| QG-S10 Pattern | Criteria | Status | Evidence |
|----------------|----------|--------|----------|
| `scope_defined` | Testing scope clearly documented | Pass/Fail | Step 1 scope document |
| `testing_completed` | All test categories executed | Pass/Fail | Steps 2-3 test execution |
| `findings_remediated` | Critical/high findings addressed | Pass/Fail | Remediation records |
| `retest_passed` | Remediated findings verified | Pass/Fail | Retest results |
| `report_delivered` | Final report delivered | Pass/Fail | Step 4 reporting |

**QG-S10 Exit Criteria:**
- All 5 required patterns must pass for QG-S10 gate approval
- Upon PASS, workflow exits to QG-P1 (Production Readiness)
- No critical or high severity findings may remain open

### 6. Calculate Validation Score

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Test coverage | 25% | {score}/100 | {weighted} |
| Tenant isolation | 25% | {score}/100 | {weighted} |
| AI agent security | 20% | {score}/100 | {weighted} |
| Reporting | 15% | {score}/100 | {weighted} |
| QG-S10 patterns | 15% | {score}/100 | {weighted} |
| **Total** | 100% | - | **{total}/100** |

**Pass threshold: 85/100**
**QG-S10 requirement: All 5 patterns must pass (no partial credit)**

---

## COLLABORATION MENUS (A/P/C):

After validation, present the user with options and proceed to `step-22-v-generate-report.md`.

---

## Outputs

- Validation check results
- Overall validation score

---

## Verification

- [ ] Test coverage validated against OWASP
- [ ] Tenant isolation tests verified
- [ ] AI agent security tests verified
- [ ] QG-I3 checklist completed
- [ ] QG-S10 patterns verified (scope_defined, testing_completed, findings_remediated, retest_passed, report_delivered)
- [ ] No critical/high findings open
- [ ] Patterns align with pattern registry

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate the validation report.
