# Step 22: Generate QG-M3 Validation Report

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER finalize report without user confirmation** - Wait for explicit approval
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting report** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 📋 **INCLUDE all validation evidence** in final report
- 💾 **SAVE report to validation folder** with timestamp

## EXECUTION PROTOCOLS

- 🎯 Focus: Generate comprehensive QG-M3 validation report
- 💾 Track: `stepsCompleted: [20, 21, 22]` when complete
- 📖 Context: Report documents all findings and gate decision
- 🚫 Do NOT: Change validation results; report findings as-is
- 📎 Reference: Include remediation recommendations if CONDITIONAL/FAIL
- ✅ Complete: Validate mode workflow finishes with this step

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

Generate a formal QG-M3 validation report documenting all agent runtime validation findings, the gate decision, and recommended next steps based on the outcome.

---

## Prerequisites

- Step 21 completed: All validation checks run
- Gate decision calculated (PASS/CONDITIONAL/FAIL)
- **Load template:** `{project-root}/_bmad/bam/data/templates/validation-report.md`

---

## YOUR TASK

Compile all validation results into a formal QG-M3 report. Document the gate decision with rationale, list all findings with evidence, and provide recommendations based on the outcome. Save the report to the validation folder.

---

## Validation Sequence

### Action 1: Compile Executive Summary

Generate executive summary with gate decision:

```markdown
## QG-M3 Validation Report: Agent Runtime Readiness

**Gate:** QG-M3 (Agent Runtime Readiness)
**Artifact:** agent-runtime-architecture.md
**AI Runtime:** {ai_runtime}
**Date:** {current_date}
**Decision:** {PASS / CONDITIONAL / FAIL}

### Summary

{1-2 sentence summary of validation outcome}

### Key Findings

- CRITICAL checks passed: {X}/20+
- Non-critical checks passed: {Y}/7
- Agent tenant isolation: {verified/gaps_found}
```

### Action 2: Document CRITICAL Category Results

Compile detailed results for each CRITICAL category:

```markdown
## CRITICAL Checks

### Orchestration: {PASS/FAIL}

| Check | Status | Evidence |
|-------|--------|----------|
| Pattern documented | {status} | {evidence} |
| Pattern justified | {status} | {evidence} |
| Topology defined | {status} | {evidence} |
| Patterns verified current | {status} | {evidence} |

### Tool Registry: {PASS/FAIL}

| Check | Status | Evidence |
|-------|--------|----------|
| Catalog structure implemented | {status} | {evidence} |
| Tools registered with schemas | {status} | {evidence} |
| Permission model implemented | {status} | {evidence} |
| Policy engine operational | {status} | {evidence} |
| Tools tenant-scoped | {status} | {evidence} |
| Cross-tenant access blocked | {status} | {evidence} |

### Memory Tiers: {PASS/FAIL}

| Check | Status | Evidence |
|-------|--------|----------|
| Session memory configured | {status} | {evidence} |
| User memory configured | {status} | {evidence} |
| Tenant memory configured | {status} | {evidence} |
| Global memory configured | {status} | {evidence} |
| Scope enforcement implemented | {status} | {evidence} |
| No cross-tenant access | {status} | {evidence} |

### Kill Switch: {PASS/FAIL}

| Check | Status | Evidence |
|-------|--------|----------|
| Feature flag integration | {status} | {evidence} |
| Circuit breaker configured | {status} | {evidence} |
| Manual override available | {status} | {evidence} |
| All agents covered | {status} | {evidence} |
```

### Action 3: Document Non-Critical Category Results

```markdown
## Non-Critical Checks

### Approval Workflow: {PASS/CONDITIONAL}

| Check | Status | Evidence |
|-------|--------|----------|
| Approval triggers defined | {status} | {evidence} |
| Queue implementation | {status} | {evidence} |
| Timeout handling | {status} | {evidence} |
| Escalation rules | {status} | {evidence} |

### Evaluation Foundation: {PASS/CONDITIONAL}

| Check | Status | Evidence |
|-------|--------|----------|
| Metric definitions | {status} | {evidence} |
| Threshold configuration | {status} | {evidence} |
| Golden task template | {status} | {evidence} |
```

### Action 4: Document Agent Tenant Isolation Results

```markdown
## Agent Tenant Isolation

| Agent | Operations Scoped | Memory Isolated | Tools Filtered | Verified |
|-------|-------------------|-----------------|----------------|----------|
| {agent1} | {yes/no} | {yes/no} | {yes/no} | {yes/no} |
| {agent2} | {yes/no} | {yes/no} | {yes/no} | {yes/no} |

**Isolation Status:** {All agents tenant-isolated / Gaps found}
```

### Action 5: Generate Recommendations

Based on gate decision, provide recommendations:

**If PASS:**
```markdown
## Recommendations

QG-M3 validation passed. Proceed to:

1. **Next Workflows:**
   - `bmad-bam-convergence` (QG-F1 validation) - Run QG-F1 validation
   - `bmad-bam-module-architecture` - Design individual modules
   - `bmad-bam-convergence` - QG-I3 (Agent Safety) verification

2. **Maintenance:**
   - Schedule periodic agent runtime audits
   - Include agent isolation tests in CI/CD
   - Document any future runtime changes
```

**If CONDITIONAL:**
```markdown
## Recommendations

QG-M3 validation passed with conditions. Required actions:

1. **Remediation Items:**
   {List non-critical items that need addressing}

2. **Timeline:**
   - Address within: {recommended timeframe}
   - Create tickets for tracking

3. **Proceed With:**
   - Can proceed to next workflows
   - Monitor remediation progress
   - Re-validate after remediation complete
```

**If FAIL:**
```markdown
## Recommendations

QG-M3 validation failed. CRITICAL issues require resolution:

1. **Failed CRITICAL Categories:**
   {List categories that failed}

2. **Recovery Protocol:**
   - **Attempt {N}:** {Current attempt status}
   - Fix identified issues
   - Re-run validation (Validate mode)
   - Contact: AI Runtime Architect (Nova), Platform Architect

3. **Blocked Actions:**
   - Cannot proceed to module design
   - Cannot proceed to integration
   - Cannot deploy agents to production

4. **Escalation (if Attempt 3):**
   - Mandatory course correction required
   - Architecture review with AI Runtime team
   - Consider AI runtime change if fundamentally incompatible
```

### Action 6: Save Report

Save validation report to:
- **Output to:** `{output_folder}/planning-artifacts/validation/agent-runtime-qg-m3-report.md`

Include in frontmatter:
```yaml
---
gate: QG-M3
artifact: agent-runtime-architecture.md
decision: {PASS/CONDITIONAL/FAIL}
date: {current_date}
validated_by: {agent}
---
```

---

## Quality Gate Integration

### Gate Decision Summary

Present final gate outcome:

```
================================================================================
QG-M3 AGENT RUNTIME READINESS VALIDATION COMPLETE
================================================================================
Gate Decision: {PASS / CONDITIONAL / FAIL}
================================================================================

CRITICAL Categories (4):
- Orchestration:         {PASS/FAIL}
- Tool Registry:         {PASS/FAIL}
- Memory Tiers:          {PASS/FAIL}
- Kill Switch:           {PASS/FAIL}

Non-Critical Categories (2):
- Approval Workflow:     {PASS/CONDITIONAL}
- Evaluation Foundation: {PASS/CONDITIONAL}

Agent Tenant Isolation:  {VERIFIED/GAPS}

================================================================================
Report saved to: {output_folder}/planning-artifacts/validation/
================================================================================
```

### Recovery Protocol Status (If FAIL)

Document recovery attempt status:

| Attempt | Status | Actions Taken | Categories Locked |
|---------|--------|---------------|-------------------|
| 1 | {Pending/Complete/Failed} | {actions} | {locked categories} |
| 2 | {Pending/Complete/Failed} | {actions} | {locked categories} |
| 3 | {Pending/Mandatory Course Correction} | {actions} | N/A |

---

## COLLABORATION MENUS (A/P/C)

After generating report, present options:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into report findings
- **P (Party Mode)**: AI runtime and security review of next steps
- **C (Continue)**: Complete validation workflow
- **[Specific concerns]**: Describe concerns about report or next steps

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: report contents, gate decision, recommendations
- Explore additional context for failed items
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review QG-M3 validation report and recommended next steps"
- Present AI runtime and security perspectives
- Return to A/P/C menu

#### If 'C' (Continue):
- Mark Validate mode complete
- Workflow finished

---

## SUCCESS METRICS

- ✅ Executive summary generated with gate decision
- ✅ All CRITICAL category results documented with evidence
- ✅ All non-critical category results documented
- ✅ Agent tenant isolation results documented
- ✅ Recommendations provided based on gate outcome
- ✅ Report saved to validation folder
- ✅ Recovery protocol status documented (if applicable)

---

## FAILURE MODES

- ❌ **Report generation failed:** Verify all Step 21 results available
- ❌ **Save failed:** Check output folder permissions
- ❌ **Missing evidence:** Cannot generate complete report
- ❌ **Template not found:** Verify BAM installation

---

## Verification

- [ ] Executive summary complete
- [ ] CRITICAL categories documented
- [ ] Non-critical categories documented
- [ ] Agent tenant isolation documented
- [ ] Recommendations generated
- [ ] Report saved to correct location
- [ ] Gate decision clearly stated

---

## Outputs

- **Validation Report:** `{output_folder}/planning-artifacts/validation/agent-runtime-qg-m3-report.md`
- Gate decision summary
- Recommendations for next steps

---

## WORKFLOW COMPLETE

Validate mode is complete. Based on gate decision:

| Decision | Next Steps |
|----------|------------|
| **PASS** | Proceed to next workflow (`validate-foundation`, `create-module-architecture`) |
| **CONDITIONAL** | Proceed with documented remediation plan and timeline |
| **FAIL** | Return to Create/Edit mode to address CRITICAL issues; follow recovery protocol |

---

## Related Workflows

Based on validation outcome, consider:

- `bmad-bam-agent-runtime` Edit mode - Modify existing design
- `bmad-bam-convergence` (QG-F1 validation) - QG-F1 validation
- `bmad-bam-module-architecture` - Module design
- `bmad-bam-convergence` - QG-I3 (Agent Safety)

---

## NEXT STEP

Validation workflow complete. Proceed based on gate decision:

- **PASS:** Continue to next planning workflow
- **CONDITIONAL:** Address documented gaps, then continue
- **FAIL:** Enter recovery protocol, fix CRITICAL issues, re-validate
