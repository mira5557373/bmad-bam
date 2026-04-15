# Step 21: Validate Convergence Verification

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array

---

## Purpose

Validate the convergence verification report against QG-I1 quality gate criteria, ensuring cross-module integration tests pass, tenant safety is verified under load, agent safety evaluations complete, and performance SLOs are met.

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-isolation
- **Load quality gate:** `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-I1,QG-I2,QG-I3`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-i1-convergence.md`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-i2-tenant-safety.md`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-i3-agent-safety.md`

## Validation Checklist

### Cross-Module Integration
- [ ] All cross-module test suites executed
- [ ] Event flows verified (published events consumed correctly)
- [ ] Contract compliance validated (all facades match documented contracts)
- [ ] No contract version mismatches detected

### Tenant Safety
- [ ] Tenant isolation tests run under concurrent load
- [ ] Context propagation verified across all boundaries
- [ ] No data leakage detected (tenant A data not visible to tenant B)
- [ ] RLS policies verified active on all queries

### Agent Safety
- [ ] Full eval suite run against all agent types
- [ ] Fallback behavior verified (graceful degradation on dependency failure)
- [ ] Kill switches tested (agent disabled, fallback activates)
- [ ] Safety test cases passed (injection, PII, harmful content)

### Performance
- [ ] Load tests run with multi-tenant traffic patterns
- [ ] No noisy-neighbor behavior detected
- [ ] Latency SLOs met per tier
- [ ] Cost projections validated per tier

### Report Completeness
- [ ] All 4 verification phases have results documented
- [ ] Release recommendation present (GO / NO-GO)
- [ ] Specific blockers listed if NO-GO
- [ ] Test priority matrix followed (P0 tests all pass)

### Convergence Test Priority Compliance
- [ ] P0: Cross-module journey tests pass (if user flows span ≥2 modules)
- [ ] P0: Tenant isolation under load tests pass
- [ ] P1: Agent eval regression tests pass (if AI features changed)
- [ ] P1: Performance SLO tests pass (if infrastructure changed)
- [ ] P2: Contract compliance tests pass (if facade versions bumped)

### QG-I1 Convergence Gate Verification
**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-I1`

| QG-I1 Pattern | Status | Evidence |
|---------------|--------|----------|
| `facade-contracts` | [ ] Pass / [ ] Fail | All facade versions stable, contracts compatible |
| `event-driven` | [ ] Pass / [ ] Fail | Event schemas aligned, no breaking changes |

**QG-I1 verification_tests:** contracts compatible across modules; no breaking changes; integration tests pass

**QG-I1 Convergence:** [ ] SATISFIED / [ ] NOT SATISFIED

### QG-I2 Tenant Safety Gate Verification
**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-I2`

| QG-I2 Pattern | Status | Evidence |
|---------------|--------|----------|
| `tenant-isolation` | [ ] Pass / [ ] Fail | Cross-module tenant context propagates correctly |
| `testing-isolation` | [ ] Pass / [ ] Fail | Isolation tests pass under concurrent load |

**QG-I2 verification_tests:** integration isolation tests pass; cross-module tenant context verified; audit trail complete

**QG-I2 Tenant Safety:** [ ] SATISFIED / [ ] NOT SATISFIED

### QG-I3 Agent Safety Gate Verification
**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-I3`

| QG-I3 Pattern | Status | Evidence |
|---------------|--------|----------|
| `run-contracts` | [ ] Pass / [ ] Fail | Budget limits enforced under load |
| `testing-agent-safety` | [ ] Pass / [ ] Fail | Safety tests pass, adversarial tests pass |

**QG-I3 verification_tests:** safety tests pass; budget enforcement works; kill switch responsive; adversarial tests pass

**QG-I3 Agent Safety:** [ ] SATISFIED / [ ] NOT SATISFIED

## Gate Decision

- **PASS**: All P0 tests pass, all P1 tests pass or justified, release recommendation is GO
- **CONDITIONAL**: P0 tests pass, some P1 tests have documented exceptions — GO with conditions
- **FAIL**: Any P0 test fails, or critical P1 test fails without justification — NO-GO

Present validation results with specific findings for each verification phase.



---

## Inputs

- Loaded artifact from validation step 20
- Quality gate criteria and checklist
- Pattern registry for validation rules
- Previous validation findings (if re-validating)

---

## Actions

### 1. Load Artifact

- Read the artifact from `{output_folder}/` specified location
- Parse and validate structure

### 2. Validate Content

- Check all required sections are present
- Verify cross-references are valid
- Validate against quality gate checklist

### 3. Generate Findings

- Document any issues found
- Categorize by severity (Critical/High/Medium/Low)

---

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Conduct deeper analysis of the current step's domain
- Present additional options and trade-offs
- Return to checkpoint after elicitation

#### If 'P' (Party Mode):
- Enable collaborative exploration
- Generate creative alternatives
- Document insights before returning

#### If 'C' (Continue):
- Verify all outputs are complete
- Proceed to next step file

### Menu Options

### [A]nalyze - Deep Dive Options
| Code | Action | Description |
|------|--------|-------------|
| A1 | Analyze QG-I1 results | Review cross-module integration findings |
| A2 | Analyze QG-I2 results | Review tenant safety verification findings |
| A3 | Analyze QG-I3 results | Review agent safety evaluation findings |
| A4 | Analyze test priority | Check P0/P1/P2 test compliance |

### [P]roceed - Action Options
| Code | Action | Description |
|------|--------|-------------|
| P1 | Validate cross-module | Check QG-I1 criteria against report |
| P2 | Validate tenant safety | Check QG-I2 criteria against report |
| P3 | Validate agent safety | Check QG-I3 criteria against report |
| P4 | Determine gate decision | Assign PASS/CONDITIONAL/FAIL status |

### [C]ontinue - Navigation Options
| Code | Action | Description |
|------|--------|-------------|
| C1 | Continue to Step 22 | Proceed to generate validation report |
| C2 | Return to Step 20 | Go back to artifact loading |
| C3 | Switch to Edit mode | Go to step-10-e-load-existing.md to fix issues |

**Convergence Gate Context:** This step validates QG-I1/I2/I3 compliance. FAIL triggers incident response for security/safety violations.

---

## FAIL Outcome: Incident Response Activation

### When FAIL is due to security/safety violations

If validation fails due to detected data leakage, AI safety violation, or security breach, activate incident response immediately:

**Immediate Triage (within 15 minutes):**
1. Determine incident type:
   - **Data Leakage**: Cross-tenant data access confirmed
   - **AI Safety**: Agent safety test failures with actual violations
   - **Security Breach**: Unauthorized access or system compromise
2. Escalate to incident commander
3. Begin incident documentation

**Incident Response by Type:**

| Failure Type | Response Protocol | Reference |
|--------------|-------------------|-----------|
| Tenant isolation test FAIL with data leak | Data Leak Protocol | `steps/step-02-c-tenant-safety-verification.md` |
| Agent safety test FAIL with harmful output | AI Safety Protocol | `steps/step-03-c-agent-safety-verification.md` |
| RLS bypass detected | Emergency Lockdown | `steps/step-02-c-tenant-safety-verification.md` |
| Prompt injection success | Kill Switch + Investigation | `steps/step-03-c-agent-safety-verification.md` |

**Documentation Requirements for FAIL:**
1. Exact test(s) that failed with full output
2. Timestamp and environment details
3. Affected components/modules
4. Initial impact assessment
5. Immediate containment actions taken

**Recovery Path:**
1. Follow relevant incident response protocol
2. Implement fix
3. Re-run ONLY failed test categories (locked categories remain valid)
4. If second FAIL: mandatory course correction with leadership
5. Document lessons learned

**FAIL does NOT mean:**
- Abandon the release entirely (fix and retry)
- Skip incident documentation (always document)
- Ignore near-misses (investigate suspicious patterns)

## Verification

- [ ] All checklist items evaluated
- [ ] Gate decision determined
- [ ] Findings documented per verification phase
- [ ] Patterns align with pattern registry

## Outputs

- Validation report
- Pass/Fail determination
- Specific findings per verification phase

## Next Step

Generate validation report and return results to user.
