# Step 22: Generate QG-I1 Validation Report

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER finalize report without user confirmation** - Wait for explicit approval
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting report** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 📋 **INCLUDE all validation evidence** in final report
- 💾 **SAVE report to validation folder** with timestamp

## EXECUTION PROTOCOLS

- 🎯 Focus: Generate comprehensive QG-I1 validation report
- 💾 Track: `stepsCompleted: [20, 21, 22]` when complete
- 📖 Context: Report documents all findings and gate decision
- 🚫 Do NOT: Change validation results; report findings as-is
- 📎 Reference: Include remediation recommendations if CONDITIONAL/FAIL
- ✅ Complete: Validate mode workflow finishes with this step

---

## Purpose

Generate a formal QG-I1 validation report documenting all facade contract validation findings, the gate decision, and recommended next steps based on the outcome.

---

## Prerequisites

- Step 21 completed: All validation checks run
- Gate decision calculated (PASS/CONDITIONAL/FAIL)
- **Load template:** `{project-root}/_bmad/bam/data/templates/validation-report.md`

---

## YOUR TASK

Compile all validation results into a formal QG-I1 report. Document the gate decision with rationale, list all findings with evidence, and provide recommendations based on the outcome. Save the report to the validation folder.

---

## Validation Sequence

### Action 1: Compile Executive Summary

Generate executive summary with gate decision:

```markdown
## QG-I1 Validation Report: Facade Contract

**Gate:** QG-I1 (Convergence Gate)
**Artifact:** facade-{source}-{target}-contract.md
**Source Module:** {source_module}
**Target Module:** {target_module}
**Date:** {current_date}
**Decision:** {PASS / CONDITIONAL / FAIL}

### Summary

{1-2 sentence summary of validation outcome}

### Key Findings

- CRITICAL checks passed: {X}/18
- Non-critical checks passed: {Y}/12
- Contract completeness: {complete/incomplete}
- Tenant isolation: {verified/gaps identified}
```

### Action 2: Document CRITICAL Category Results

Compile detailed results for each CRITICAL category:

```markdown
## CRITICAL Checks

### Contract Completeness: {PASS/FAIL}

| Check | Status | Evidence |
|-------|--------|----------|
| Source/target modules identified | {status} | {evidence} |
| All required operations defined | {status} | {evidence} |
| Operation signatures complete | {status} | {evidence} |
| Contract version specified | {status} | {evidence} |
| Contract scope documented | {status} | {evidence} |

### Tenant Context: {PASS/FAIL}

| Check | Status | Evidence |
|-------|--------|----------|
| TenantContext required on all operations | {status} | {evidence} |
| tenant_id field present | {status} | {evidence} |
| Cross-tenant access rejected | {status} | {evidence} |
| Tenant validation at facade entry | {status} | {evidence} |

### Event Tenant Isolation: {PASS/FAIL}

| Check | Status | Evidence |
|-------|--------|----------|
| Events include tenant_id in envelope | {status} | {evidence} |
| Event envelope structure documented | {status} | {evidence} |
| Consumer tenant validation required | {status} | {evidence} |
| DLQ handling preserves tenant_id | {status} | {evidence} |

### Schema Definitions: {PASS/FAIL}

| Check | Status | Evidence |
|-------|--------|----------|
| Input schemas defined | {status} | {evidence} |
| Output schemas defined | {status} | {evidence} |
| Field types and validation | {status} | {evidence} |
| Required vs optional marked | {status} | {evidence} |
| Event payload schemas | {status} | {evidence} |
```

### Action 3: Document Non-Critical Category Results

```markdown
## Non-Critical Checks

### Error Contracts: {PASS/CONDITIONAL}

| Check | Status | Evidence |
|-------|--------|----------|
| Standard error codes defined | {status} | {evidence} |
| Error response structure | {status} | {evidence} |
| Cross-tenant error (403) | {status} | {evidence} |
| Retry guidance | {status} | {evidence} |

### Versioning: {PASS/CONDITIONAL}

| Check | Status | Evidence |
|-------|--------|----------|
| Version format defined | {status} | {evidence} |
| Breaking change policy | {status} | {evidence} |
| Backward compatibility rules | {status} | {evidence} |
| Deprecation process | {status} | {evidence} |

### Testing Strategy: {PASS/CONDITIONAL}

| Check | Status | Evidence |
|-------|--------|----------|
| Contract test approach | {status} | {evidence} |
| Tenant isolation tests | {status} | {evidence} |
| Integration test scenarios | {status} | {evidence} |
| Test ownership clear | {status} | {evidence} |
```

### Action 4: Generate Recommendations

Based on gate decision, provide recommendations:

**If PASS:**
```markdown
## Recommendations

QG-I1 validation passed. Proceed to:

1. **Implementation Phase:**
   - Share contract with consumer team
   - Implement facade on provider side
   - Implement consumer integration
   - Set up contract tests

2. **Next Workflows:**
   - `bmad-bam-convergence-verification` - Full integration verification
   - `bmad-bam-module-epics` - Create implementation epics

3. **Maintenance:**
   - Schedule periodic contract reviews
   - Monitor contract usage metrics
   - Document any evolution decisions
```

**If CONDITIONAL:**
```markdown
## Recommendations

QG-I1 validation passed with conditions. Required actions:

1. **Remediation Items:**
   {List non-critical items that need addressing}

2. **Timeline:**
   - Address within: {recommended timeframe}
   - Create tickets for tracking

3. **Proceed With:**
   - Can proceed to implementation
   - Monitor remediation progress
   - Re-validate after remediation complete
```

**If FAIL:**
```markdown
## Recommendations

QG-I1 validation failed. CRITICAL issues require resolution:

1. **Failed CRITICAL Categories:**
   {List categories that failed}

2. **Recovery Protocol:**
   - **Attempt {N}:** {Current attempt status}
   - Fix identified issues
   - Re-run validation (Validate mode)
   - Contact: Integration Architect, Module Owners

3. **Blocked Actions:**
   - Cannot proceed to implementation
   - Cannot share contract with consumers
   - Cannot integrate modules

4. **Escalation (if Attempt 3):**
   - Mandatory course correction required
   - Integration architecture review
   - Consider contract redesign
```

### Action 5: Save Report

Save validation report to:
- **Output to:** `{output_folder}/planning-artifacts/validation/facade-{source}-{target}-qg-i1-report.md`

Include in frontmatter:
```yaml
---
gate: QG-I1
artifact: facade-{source}-{target}-contract.md
source_module: {source_module}
target_module: {target_module}
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
QG-I1 FACADE CONTRACT VALIDATION COMPLETE
================================================================================
Contract: {source_module}Facade → {target_module}
Gate Decision: {PASS / CONDITIONAL / FAIL}
================================================================================

CRITICAL Categories (4):
- Contract Completeness:   {PASS/FAIL}
- Tenant Context:          {PASS/FAIL}
- Event Tenant Isolation:  {PASS/FAIL}
- Schema Definitions:      {PASS/FAIL}

Non-Critical Categories (3):
- Error Contracts:         {PASS/CONDITIONAL}
- Versioning:              {PASS/CONDITIONAL}
- Testing Strategy:        {PASS/CONDITIONAL}

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
- **P (Party Mode)**: Architecture review of next steps
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
- Context: "Review QG-I1 validation report and recommended next steps"
- Present architect perspectives
- Return to A/P/C menu

#### If 'C' (Continue):
- Mark Validate mode complete
- Workflow finished

---

## SUCCESS METRICS

- ✅ Executive summary generated with gate decision
- ✅ All CRITICAL category results documented with evidence
- ✅ All non-critical category results documented
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
- [ ] Recommendations generated
- [ ] Report saved to correct location
- [ ] Gate decision clearly stated

---

## Outputs

- **Validation Report:** `{output_folder}/planning-artifacts/validation/facade-{source}-{target}-qg-i1-report.md`
- Gate decision summary
- Recommendations for next steps

---

## WORKFLOW COMPLETE

Validate mode is complete. Based on gate decision:

| Decision | Next Steps |
|----------|------------|
| **PASS** | Proceed to implementation, share with consumer teams |
| **CONDITIONAL** | Proceed with documented remediation plan and timeline |
| **FAIL** | Return to Create/Edit mode to address CRITICAL issues; follow recovery protocol |

---

## Related Workflows

Based on validation outcome, consider:

- `bmad-bam-facade-contract` Edit mode - Modify existing contract
- `bmad-bam-convergence-verification` - Full integration verification
- `bmad-bam-evolve-facade-contract` - Plan contract evolution
- `bmad-bam-facade-mismatch-recovery` - Resolve contract issues

---

## NEXT STEP

Validation workflow complete. Proceed based on gate decision:

- **PASS:** Share contract with consumers, begin implementation
- **CONDITIONAL:** Address documented gaps, then proceed
- **FAIL:** Enter recovery protocol, fix CRITICAL issues, re-validate
