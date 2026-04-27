# Step 22: Generate Tool Contract Validation Report

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 💬 **Present validation results** before finalizing report

## EXECUTION PROTOCOLS

- 🎯 Focus: Generate validation report with gate decision
- 💾 Track: `stepsCompleted: [20, 21, 22]` when complete
- 📖 Context: Summarize findings and determine PASS/CONDITIONAL/FAIL
- 🚫 Do NOT: Re-execute validation checks; use findings from Step 21
- ⚠️ Gate: QG-M3 (Agent Runtime) - Final gate decision documented

---

## Purpose

Generate a comprehensive validation report summarizing findings from the tool contract validation steps and determining the final gate outcome for QG-M3 (Agent Runtime) tool contract criteria.

---

## Prerequisites

- Step 20 completed: Artifacts loaded
- Step 21 completed: Validation executed
- **Load template:** `{project-root}/_bmad/bam/data/templates/validation-report.md`

---

## Inputs

- Validation results from Step 21
- Quality gate decision (PASS/CONDITIONAL/FAIL)
- Specific findings per check
- Evidence assessment
- Recommendations for remediation (if applicable)

---

## YOUR TASK:

Generate the final validation report with gate decision and recommendations.

---

## Report Generation Sequence

### 1. Compile Validation Results

Organize findings from Step 21:

| Category | Status | Critical Issues | Standard Issues |
|----------|--------|-----------------|-----------------|
| Tool Schemas | {{status}} | {{count}} | {{count}} |
| TenantContext | {{status}} | {{count}} | {{count}} |
| Permissions | {{status}} | {{count}} | {{count}} |
| Rate Limits | {{status}} | {{count}} | {{count}} |
| Execution Sandbox | {{status}} | {{count}} | {{count}} |
| Error Responses | {{status}} | {{count}} | {{count}} |
| Monitoring | {{status}} | {{count}} | {{count}} |

### 2. Assign Severity to Findings

| ID | Finding | Severity | Category | Required Action |
|----|---------|----------|----------|-----------------|
| TC-001 | {{finding}} | CRITICAL | Schemas | Must fix before release |
| TC-002 | {{finding}} | WARNING | Permissions | Should address |
| TC-003 | {{finding}} | INFO | Monitoring | Consider for future |

**Severity Classification:**

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| CRITICAL | CRITICAL check failure | Must fix before proceeding |
| WARNING | Standard check failure | Should address |
| INFO | Suggested improvement | Consider for future |

### 3. Determine Gate Outcome

#### QG-M3 Tool Contract Decision

| Outcome | Criteria Met |
|---------|--------------|
| **PASS** | All CRITICAL pass + 80% standard |
| **CONDITIONAL** | All CRITICAL pass + <80% standard + mitigation documented |
| **FAIL** | Any CRITICAL fails |

**Evaluation:**

| Criteria | Result |
|----------|--------|
| CRITICAL Checks (All must pass) | {{count}}/{{total}} |
| Standard Checks (80% threshold) | {{count}}/{{total}} ({{percent}}%) |

**QG-M3 Tool Contract Outcome:** {{outcome}}

| If CONDITIONAL, document mitigation plan: |
|-------------------------------------------|
| {{mitigation_plan}} |

### 4. Generate Validation Report

Create validation report with sections:

#### 4.1 Executive Summary

```markdown
## Tool Contract Validation Summary

**Validation Date:** {{date}}
**Validator:** {{author}}
**Document Version:** {{version}}

| Metric | Value |
|--------|-------|
| Total Tools Validated | {{count}} |
| Tools Passing | {{count}} |
| Tools with Issues | {{count}} |

**QG-M3 Result:** {{result}}
**Recommendation:** {{recommendation}}
```

#### 4.2 Critical Check Results

| Check | Result | Evidence | Notes |
|-------|--------|----------|-------|
| All tools have input schemas | {{result}} | {{evidence}} | {{notes}} |
| All tools have output schemas | {{result}} | {{evidence}} | {{notes}} |
| TenantContext first parameter | {{result}} | {{evidence}} | {{notes}} |
| Permissions documented | {{result}} | {{evidence}} | {{notes}} |
| Sandbox isolation documented | {{result}} | {{evidence}} | {{notes}} |

#### 4.3 Standard Check Results

| Check | Result | Evidence | Notes |
|-------|--------|----------|-------|
| Rate limits per tier | {{result}} | {{evidence}} | {{notes}} |
| Error codes standardized | {{result}} | {{evidence}} | {{notes}} |
| Metrics defined | {{result}} | {{evidence}} | {{notes}} |
| Versioning strategy | {{result}} | {{evidence}} | {{notes}} |
| Deprecation policy | {{result}} | {{evidence}} | {{notes}} |

#### 4.4 Detailed Findings

For each finding, document:

```markdown
### Finding TC-XXX: {{title}}

**Severity:** CRITICAL / WARNING / INFO
**Category:** {{category}}
**Tool(s) Affected:** {{tools}}

**Description:**
{{description}}

**Expected:**
{{expected}}

**Actual:**
{{actual}}

**Evidence:**
{{evidence}}

**Recommended Fix:**
{{fix}}

**Effort:** {{effort}}
```

#### 4.5 Gate Decision Justification

Document the rationale for the gate decision with evidence references:

```markdown
## Gate Decision: {{outcome}}

### Justification

{{justification}}

### Evidence Summary

| Criterion | Evidence |
|-----------|----------|
| {{criterion}} | {{evidence}} |

### Conditions (if CONDITIONAL)

| Condition | Owner | Deadline |
|-----------|-------|----------|
| {{condition}} | {{owner}} | {{date}} |
```

#### 4.6 Recommendations

| Priority | Recommendation | Category | Effort |
|----------|----------------|----------|--------|
| HIGH | {{recommendation}} | CRITICAL fix | {{effort}} |
| MEDIUM | {{recommendation}} | Standard gap | {{effort}} |
| LOW | {{recommendation}} | Enhancement | {{effort}} |

### 5. Recovery Protocol (If FAIL)

If validation triggers FAIL status:

#### Attempt 1: Targeted Fix (1-2 days)
1. Review failed CRITICAL checks
2. Identify missing schemas or TenantContext issues
3. Apply targeted fixes to tool contract design
4. Re-run validation for failed checks only
5. Lock passed checks

#### Attempt 2: Design Review (1 week)
1. Engage AI Runtime Architect (Nova)
2. Review tool contract patterns
3. Apply corrective measures
4. Re-run full validation

#### Mandatory Course Correction
1. Escalate to project leadership
2. Document blockers in ADR
3. Consider phased tool rollout
4. Reassess timeline

### 6. Output Report

Write validation report to:

```
{output_folder}/planning-artifacts/tool-contracts-validation-report.md
```

Include:
- Validation outcome
- Gate decision with justification
- Findings by severity
- Required fixes (if FAIL)
- Recommended improvements
- Recovery protocol status (if applicable)

---

## SUCCESS METRICS:

- [ ] All findings documented with severity
- [ ] Gate decision justified with evidence
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
- [ ] Gate outcome determined
- [ ] Report generated with all required sections
- [ ] Patterns align with pattern registry

---

## Outputs

- Validation report document
- Gate decision (QG-M3 Tool Contracts)
- Required fixes list (if applicable)
- Improvement recommendations

---

## NEXT STEP:

Based on validation outcome:

| Outcome | Next Step |
|---------|-----------|
| **PASS** | Tool contracts validated. Proceed to implementation or convergence (QG-I1) |
| **CONDITIONAL** | Document gaps and proceed with noted limitations. Monitor implementation |
| **FAIL** | Enter recovery protocol. Address CRITICAL issues before re-validation |

## Workflow Complete

Validation mode complete for tool contracts workflow.

If FAIL outcome:
- Return to Create/Edit mode to address issues
- Re-run validation after fixes applied

If PASS/CONDITIONAL:
- Tool contracts verified
- Ready for implementation
- Feeds QG-I3 (Agent Safety) at convergence
