# Step 22: Generate Validation Report

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 💬 **Present validation results** before finalizing report

## EXECUTION PROTOCOLS

- 🎯 Focus: Generate validation report with quality gate decision
- 💾 Track: `stepsCompleted: [20, 21, 22]` when complete
- 📖 Context: Summarize findings and determine PASS/CONDITIONAL/FAIL
- 🚫 Do NOT: Re-execute validation checks; use findings from Step 21
- ⚠️ Gate: QG-M2 - Final gate decision documented

---


## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Loading artifact and checklist
- Evaluating against criteria
- Documenting evidence

**OUT OF SCOPE:**
- Modifying the artifact
- Creating new content
## Purpose

Generate a comprehensive validation report summarizing findings from the event architecture validation steps and determining the final gate outcome for QG-M2 (Tenant Isolation) as it relates to event-driven architecture.

---

## Prerequisites

- Step 20 completed: Artifacts loaded
- Step 21 completed: Validation executed
- **Load template:** `{project-root}/_bmad/bam/data/templates/validation-report.md`

---

## Inputs

- Validation results from Step 21
- Quality gate decisions (PASS/CONDITIONAL/FAIL)
- Specific findings per check
- Evidence assessment
- Recommendations for remediation (if applicable)

---

## YOUR TASK:

Generate the final validation report with gate decisions and recommendations.

---

## Validation Sequence

### 1. Compile Validation Results

Organize findings from Step 21:

| Category | Critical Checks | Standard Checks | Evidence Quality |
|----------|-----------------|-----------------|------------------|
| Event Envelope | {{pass}}/{{total}} | {{pass}}/{{total}} | {{quality}} |
| Event Routing | {{pass}}/{{total}} | {{pass}}/{{total}} | {{quality}} |
| Event Processing | {{pass}}/{{total}} | {{pass}}/{{total}} | {{quality}} |
| Saga Orchestration | {{pass}}/{{total}} | {{pass}}/{{total}} | {{quality}} |
| AI Runtime Events | {{pass}}/{{total}} | {{pass}}/{{total}} | {{quality}} |

### 2. Assign Severity to Findings

| ID | Finding | Severity | Category | Required Action |
|----|---------|----------|----------|-----------------|
| F-001 | {{finding}} | CRITICAL | {{category}} | Must fix before proceeding |
| F-002 | {{finding}} | WARNING | {{category}} | Should address |
| F-003 | {{finding}} | INFO | {{category}} | Consider for future |

**Severity Classification:**

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| CRITICAL | Tenant isolation violation | Must fix before proceeding |
| WARNING | Standard check failure | Should address |
| INFO | Suggested improvements | Consider for future |

### 3. Determine Gate Outcome

#### Tenant Isolation (QG-M2) Assessment

| Check Category | Critical Status | Standard Status |
|----------------|-----------------|-----------------|
| Event Envelope | {{pass}}/{{total}} | {{pass}}/{{total}} |
| Partition Strategy | {{pass}}/{{total}} | N/A |
| DLQ Configuration | {{pass}}/{{total}} | {{pass}}/{{total}} |
| Replay Capabilities | {{pass}}/{{total}} | {{pass}}/{{total}} |
| Tenant Propagation | {{pass}}/{{total}} | N/A |
| Saga Isolation | {{pass}}/{{total}} | N/A |

**QG-M2 (Event Architecture) Decision:**

| Outcome | Criteria Met |
|---------|--------------|
| **PASS** | All CRITICAL pass + 80% Standard |
| **CONDITIONAL** | All CRITICAL pass + <80% Standard + mitigation documented |
| **FAIL** | Any CRITICAL fails |

**QG-M2 Outcome:** {{outcome}}

| If CONDITIONAL, document mitigation plan: |
|-------------------------------------------|
| {{mitigation_plan}} |

#### Event Architecture Assessment

| Check Category | Status | Issues |
|----------------|--------|--------|
| CloudEvents Compliance | {{status}} | {{count}} |
| Schema Versioning | {{status}} | {{count}} |
| Topic Naming | {{status}} | {{count}} |
| Consumer Configuration | {{status}} | {{count}} |
| Idempotency Design | {{status}} | {{count}} |
| Ordering Guarantees | {{status}} | {{count}} |
| Saga Patterns | {{status}} | {{count}} |
| AI Runtime Events | {{status}} | {{count}} |

**Event Architecture Outcome:** {{outcome}}

### 4. Overall Validation Decision

| Gate | Outcome |
|------|---------|
| QG-M2 (Tenant Isolation) | {{outcome}} |
| Event Architecture Quality | {{outcome}} |

**Overall Status:** {{status}}

| Overall | Criteria |
|---------|----------|
| **PASS** | All gates PASS |
| **CONDITIONAL** | All gates PASS or CONDITIONAL |
| **FAIL** | Any gate FAIL |

### 5. Generate Validation Report

Create validation report with sections:

#### 5.1 Executive Summary

```markdown
## Event Architecture Validation Summary

**Validation Date:** {{date}}
**Validator:** {{author}}

| Category | Result | Critical Issues | Standard Issues |
|----------|--------|-----------------|-----------------|
| Tenant Isolation | {{result}} | {{count}} | {{count}} |
| Event Architecture | {{result}} | {{count}} | {{count}} |

**Overall:** {{status}}
**Recommendation:** {{recommendation}}
```

#### 5.2 Detailed Findings

For each finding, document:
- Check that failed
- Expected vs. actual
- Evidence reviewed
- Impact assessment
- Recommended fix

#### 5.3 Gate Decision Justification

Document the rationale for each gate decision with evidence references.

#### 5.4 Recommendations

| Priority | Recommendation | Target | Effort |
|----------|----------------|--------|--------|
| HIGH | {{recommendation}} | {{target}} | {{effort}} |
| MEDIUM | {{recommendation}} | {{target}} | {{effort}} |
| LOW | {{recommendation}} | {{target}} | {{effort}} |

### 6. Recovery Protocol (If FAIL)

If validation triggers FAIL status:

#### Attempt 1: Targeted Fix (1-2 days)
1. Review failed CRITICAL checks
2. Identify root cause (missing tenant_id, wrong partition key, etc.)
3. Apply targeted fix to event architecture
4. Re-run validation for failed checks only
5. Lock passed checks

#### Attempt 2: Architecture Review (1 week)
1. Engage Integration Architect (Kai)
2. Review event architecture decisions
3. Apply corrective measures
4. Re-run full validation

#### Mandatory Course Correction
1. Escalate to project leadership
2. Document blockers in ADR
3. Consider event architecture redesign
4. Reassess timeline

### 7. Output Report

Write validation report to:
```
{output_folder}/planning-artifacts/event-architecture-validation-report.md
```

Include:
- Validation outcome
- Gate decisions with justification
- Findings by severity
- Required fixes (if FAIL)
- Recommended improvements
- Recovery protocol status (if applicable)

---

## SUCCESS METRICS:

- [ ] All findings documented with severity
- [ ] Gate decisions justified with evidence
- [ ] Recommendations prioritized
- [ ] Validation report generated
- [ ] Next steps clearly defined

---

## FAILURE MODES:

| Failure | Recovery |
|---------|----------|
| Gate FAIL with CRITICAL issues | Document blockers, enter recovery protocol |
| Missing evidence | Request evidence, document gap |
| Conflicting findings | Escalate for architect review |

---

## Verification

- [ ] All findings from Step 21 documented
- [ ] Severity assigned to each finding
- [ ] Gate outcomes determined
- [ ] Report generated with all required sections
- [ ] Patterns align with pattern registry

---

## Outputs

- Validation report document
- Gate decision (QG-M2 for events)
- Required fixes list (if applicable)
- Improvement recommendations

---

## NEXT STEP:

Based on validation outcome:

| Outcome | Next Step |
|---------|-----------|
| **PASS** | Event architecture validated. Proceed to implementation |
| **CONDITIONAL** | Document gaps and proceed with noted limitations |
| **FAIL** | Enter recovery protocol. Address CRITICAL issues before re-validation |

## Workflow Complete

Validation mode complete for event architecture workflow.

If FAIL outcome:
- Return to Edit mode to address issues
- Re-run validation after fixes applied

If PASS/CONDITIONAL:
- Event architecture validated
- Ready for implementation
- Consider integration with convergence verification (QG-I1)
