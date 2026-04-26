# Step 05: Compile Convergence Report

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 💬 **Present QG-I1/I2/I3 soft gate checkpoint** before completion

## EXECUTION PROTOCOLS

- 🎯 Focus: Compile convergence report with gate decisions
- 💾 Track: `stepsCompleted: [1, 2, 3, 4, 5]` when complete
- 📖 Context: All verification findings from Steps 02-04
- 🚫 Do NOT: Re-run verification checks (use existing findings)
- 🔍 Use web search: Verify release decision criteria against industry practices
- ⚠️ Gate: QG-I1, QG-I2, QG-I3 - All gates evaluated for GO/NO-GO decision

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Compiling all verification findings into convergence report
- Making QG-I1, QG-I2, QG-I3 gate decisions
- Documenting risk assessment and recommendations
- Finalizing release recommendation

**OUT OF SCOPE:**
- Re-running verification checks (Steps 02-04)
- Applying remediation actions
- Production deployment decisions

---

## Purpose

Compile the final convergence verification report with QG-I1 (Cross-Module Convergence), QG-I2 (Tenant Safety), and QG-I3 (Agent Safety) gate decisions. This step synthesizes all verification findings and produces a release recommendation.

---

## Prerequisites

- Step 04 completed: Agent safety verified
- All verification data from Steps 02-04 available
- **Load template:** `{project-root}/_bmad/bam/data/templates/convergence-report.md`
- **Load checklists:** QG-I1, QG-I2, QG-I3 from `{project-root}/_bmad/bam/data/checklists/`

---

## Inputs

- Integration analysis from Step 02
- Tenant isolation verification from Step 03
- Agent safety verification from Step 04
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## YOUR TASK:

Compile the convergence verification report and make quality gate decisions.

---

## Main Sequence

### 1. Executive Summary

Compile high-level status across all quality gates:

| Quality Gate | Status | Critical Issues | Standard Issues |
|--------------|--------|-----------------|-----------------|
| QG-I1: Cross-Module Integration | PASS/CONDITIONAL/FAIL | {{count}} | {{count}} |
| QG-I2: Tenant Safety | PASS/CONDITIONAL/FAIL | {{count}} | {{count}} |
| QG-I3: Agent Safety | PASS/CONDITIONAL/FAIL | {{count}} | {{count}} |

**Overall Convergence Status:** {{status}}

**Release Recommendation:** {{recommendation}}

### 2. QG-I1 Gate Decision

#### 2.1 Critical Checks Summary

| Check | Status | Evidence |
|-------|--------|----------|
| Facade contracts stable | PASS/FAIL | {{evidence}} |
| No circular dependencies | PASS/FAIL | {{evidence}} |
| Event schemas compatible | PASS/FAIL | {{evidence}} |
| Integration tests pass | PASS/FAIL | {{evidence}} |

#### 2.2 Standard Checks Summary

| Check | Status | Notes |
|-------|--------|-------|
| Contract tests coverage | {{percentage}}% | Target: 80% |
| Cross-module journey tests | {{percentage}}% | Target: 80% |
| Event ordering documented | YES/NO | |

#### 2.3 QG-I1 Decision

| Decision | Criteria |
|----------|----------|
| **PASS** | All critical checks pass, >80% standard checks |
| **CONDITIONAL** | All critical pass, <80% standard + mitigation plan |
| **FAIL** | Any critical check fails |

**QG-I1 Outcome:** {{outcome}}

### 3. QG-I2 Gate Decision

#### 3.1 Critical Checks Summary

| Check | Status | Evidence |
|-------|--------|----------|
| Cross-tenant access blocked | PASS/FAIL | {{evidence}} |
| Data isolation verified | PASS/FAIL | {{evidence}} |
| Cache isolation verified | PASS/FAIL | {{evidence}} |
| Storage isolation verified | PASS/FAIL | {{evidence}} |

#### 3.2 Standard Checks Summary

| Check | Status | Notes |
|-------|--------|-------|
| Tenant deletion tested | YES/NO | |
| Tenant migration tested | YES/NO | |
| Quota enforcement verified | YES/NO | |
| Isolation monitoring in place | YES/NO | |

#### 3.3 QG-I2 Decision

| Decision | Criteria |
|----------|----------|
| **PASS** | All critical checks pass, >80% standard checks |
| **CONDITIONAL** | All critical pass, <80% standard + mitigation plan |
| **FAIL** | Any critical check fails |

**QG-I2 Outcome:** {{outcome}}

### 4. QG-I3 Gate Decision

#### 4.1 Critical Checks Summary

| Check | Status | Evidence |
|-------|--------|----------|
| Agent tenant isolation verified | PASS/FAIL | {{evidence}} |
| Tool execution boundaries enforced | PASS/FAIL | {{evidence}} |
| Memory isolation between tenants | PASS/FAIL | {{evidence}} |
| Output sanitization in place | PASS/FAIL | {{evidence}} |

#### 4.2 Standard Checks Summary

| Check | Status | Notes |
|-------|--------|-------|
| Agent timeout handling tested | YES/NO | |
| Token limits enforced | YES/NO | |
| Agent tracing functional | YES/NO | |
| Cost attribution accurate | YES/NO | |

#### 4.3 QG-I3 Decision

| Decision | Criteria |
|----------|----------|
| **PASS** | All critical checks pass, >80% standard checks |
| **CONDITIONAL** | All critical pass, <80% standard + mitigation plan |
| **FAIL** | Any critical check fails |

**QG-I3 Outcome:** {{outcome}}

### 5. Risk Assessment

#### 5.1 Identified Risks

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|------------|--------|------------|
| R-001 | {{risk}} | HIGH/MED/LOW | HIGH/MED/LOW | {{mitigation}} |

#### 5.2 Technical Debt

| Item | Module | Priority | Effort |
|------|--------|----------|--------|
| TD-001 | {{module}} | {{priority}} | {{effort}} |

#### 5.3 Known Issues

| Issue | Severity | Workaround | Fix ETA |
|-------|----------|------------|---------|
| {{issue}} | {{severity}} | {{workaround}} | {{eta}} |

### 6. Release Recommendation

#### 6.1 Overall Decision

| Outcome | Criteria |
|---------|----------|
| **GO** | All gates PASS |
| **GO with Conditions** | All gates PASS or CONDITIONAL, mitigation plans documented |
| **NO-GO** | Any gate FAIL |

**Decision:** {{decision}}

**Rationale:** {{rationale}}

#### 6.2 Conditions (if Conditional)

1. {{condition_1}}
2. {{condition_2}}

#### 6.3 Post-Release Monitoring

- Monitor {{metric}} for {{duration}}
- Alert threshold: {{threshold}}
- Rollback trigger: {{trigger}}

### 7. Generate Report Artifact

Output convergence report to:
```
{output_folder}/planning-artifacts/architecture/convergence-report.md
```

Include:
- Executive summary
- All gate decisions with evidence
- Risk assessment
- Release recommendation
- Approval signatures section

---

## COLLABORATION MENUS (A/P/C):

After compiling the convergence report, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific findings or risk areas
- **P (Party Mode)**: Bring leadership perspectives on release decision
- **C (Continue)**: Accept report and complete workflow
- **[Specific concerns]**: Describe areas to review further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: gate decisions, risk assessment, release recommendation
- Process enhanced insights on release readiness
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, update report
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review convergence report and release recommendation: {summary}"
- Process Platform Architect, Engineering Lead, and QA Lead perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save convergence report to output location
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Workflow complete

---

## Soft Gate Checkpoint

**Steps 1-5 complete the convergence verification workflow.**

Present summary of:
- Overall convergence status
- Gate decisions (QG-I1, QG-I2, QG-I3)
- Release recommendation
- Key risks and mitigations

Ask for confirmation before finalizing report.

---

## SUCCESS METRICS:

- [ ] All verification findings compiled
- [ ] QG-I1, QG-I2, QG-I3 decisions documented
- [ ] Risk assessment complete
- [ ] Release recommendation provided
- [ ] Convergence report generated

---

## FAILURE MODES:

| Failure | Recovery |
|---------|----------|
| Gate fails with critical issues | Document blockers, enter recovery protocol |
| Missing verification data | Return to relevant step to complete verification |
| Conflicting findings | Review with architect perspectives |

---

## Verification

- [ ] Executive summary accurate
- [ ] All gate decisions documented with evidence
- [ ] Risk assessment complete
- [ ] Release recommendation justified
- [ ] Report artifact generated

---

## Outputs

- `{output_folder}/planning-artifacts/architecture/convergence-report.md`
- Gate decisions: QG-I1, QG-I2, QG-I3
- Release recommendation: GO / GO with Conditions / NO-GO
- **Load template:** `{project-root}/_bmad/bam/data/templates/convergence-report.md`

---

## Recovery Protocol (If Gate Fails)

If any gate triggers FAIL status:

### Attempt 1: Targeted Fix (1-2 days)
1. Review failed critical checks
2. Identify root cause
3. Apply targeted fix
4. Re-run validation for failed gate only
5. Lock passed categories

### Attempt 2: Deep Investigation (1 week)
1. Engage relevant architect (Kai for integration, Atlas for platform, Nova for AI)
2. Review architectural decisions
3. Apply corrective measures
4. Re-run full validation
5. Preserve locked categories

### Mandatory Course Correction
1. Escalate to project leadership
2. Document blockers in ADR
3. Consider staged rollout with feature flags
4. Reassess release timeline

---

## NEXT STEP:

Based on outcome:
- **GO:** Proceed to production readiness (QG-P1)
- **GO with Conditions:** Document conditions, proceed with monitoring
- **NO-GO:** Enter recovery protocol, address blockers

## Workflow Complete

Convergence verification workflow complete. See report for gate decisions and next steps.
