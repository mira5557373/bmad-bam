# Step 22: Generate QG-M2 Validation Report

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER finalize report without user confirmation** - Wait for explicit approval
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting report** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 📋 **INCLUDE all validation evidence** in final report
- 💾 **SAVE report to validation folder** with timestamp

## EXECUTION PROTOCOLS

- 🎯 Focus: Generate comprehensive QG-M2 validation report
- 💾 Track: `stepsCompleted: [20, 21, 22]` when complete
- 📖 Context: Report documents all findings and gate decision
- 🚫 Do NOT: Change validation results; report findings as-is
- 📎 Reference: Include remediation recommendations if CONDITIONAL/FAIL
- ✅ Complete: Validate mode workflow finishes with this step

---

## Purpose

Generate a formal QG-M2 validation report documenting all tenant isolation validation findings, the gate decision, and recommended next steps based on the outcome.

---

## Prerequisites

- Step 21 completed: All validation checks run
- Gate decision calculated (PASS/CONDITIONAL/FAIL)
- **Load template:** `{project-root}/_bmad/bam/data/templates/validation-report-template.md`

---

## YOUR TASK

Compile all validation results into a formal QG-M2 report. Document the gate decision with rationale, list all findings with evidence, and provide recommendations based on the outcome. Save the report to the validation folder.

---

## Validation Sequence

### Action 1: Compile Executive Summary

Generate executive summary with gate decision:

```markdown
## QG-M2 Validation Report: Tenant Isolation

**Gate:** QG-M2 (Tenant Isolation Complete)
**Artifact:** tenant-isolation.md
**Tenant Model:** {tenant_model}
**Date:** {current_date}
**Decision:** {PASS / CONDITIONAL / FAIL}

### Summary

{1-2 sentence summary of validation outcome}

### Key Findings

- CRITICAL checks passed: {X}/19
- Non-critical checks passed: {Y}/4
- Dimensions verified: {Z}/8
```

### Action 2: Document CRITICAL Category Results

Compile detailed results for each CRITICAL category:

```markdown
## CRITICAL Checks

### Database Level: {PASS/FAIL}

| Check | Status | Evidence |
|-------|--------|----------|
| Tenant_id column on all tables | {status} | {evidence} |
| RLS policies created | {status} | {evidence} |
| RLS policies enabled | {status} | {evidence} |
| Admin bypass documented | {status} | {evidence} |
| Cross-tenant query blocked | {status} | {evidence} |

### Application Level: {PASS/FAIL}

| Check | Status | Evidence |
|-------|--------|----------|
| Tenant context middleware | {status} | {evidence} |
| JWT extraction working | {status} | {evidence} |
| Database session context | {status} | {evidence} |
| Async job propagation | {status} | {evidence} |
| Missing context rejection | {status} | {evidence} |

### Vector Store Level: {PASS/FAIL}

| Check | Status | Evidence |
|-------|--------|----------|
| Collection tenant strategy | {status} | {evidence} |
| Query filter injection | {status} | {evidence} |
| Cross-tenant blocked | {status} | {evidence} |

### Cache Level: {PASS/FAIL}

| Check | Status | Evidence |
|-------|--------|----------|
| Tenant-prefixed keys | {status} | {evidence} |
| No cache pollution | {status} | {evidence} |

### Memory Level: {PASS/FAIL}

| Check | Status | Evidence |
|-------|--------|----------|
| Session memory isolated | {status} | {evidence} |
| User memory isolated | {status} | {evidence} |
| Tenant memory isolated | {status} | {evidence} |
| Global memory audited | {status} | {evidence} |
```

### Action 3: Document Non-Critical Category Results

```markdown
## Non-Critical Checks

### Background Jobs: {PASS/CONDITIONAL}

| Check | Status | Evidence |
|-------|--------|----------|
| Jobs receive tenant context | {status} | {evidence} |
| Job results scoped | {status} | {evidence} |

### Audit: {PASS/CONDITIONAL}

| Check | Status | Evidence |
|-------|--------|----------|
| Tenant actions logged | {status} | {evidence} |
| Cross-tenant attempts logged | {status} | {evidence} |
```

### Action 4: Document 8-Dimension Matrix Validation

```markdown
## 8-Dimension Isolation Matrix

| Dimension | Isolation Level | Tier Variations | Verified |
|-----------|-----------------|-----------------|----------|
| Data | {level} | {variations} | {yes/no} |
| Cache | {level} | {variations} | {yes/no} |
| Storage | {level} | {variations} | {yes/no} |
| Compute | {level} | {variations} | {yes/no} |
| Network | {level} | {variations} | {yes/no} |
| API | {level} | {variations} | {yes/no} |
| Events | {level} | {variations} | {yes/no} |
| Logs | {level} | {variations} | {yes/no} |

**Dimensions Complete:** {X}/8
```

### Action 5: Generate Recommendations

Based on gate decision, provide recommendations:

**If PASS:**
```markdown
## Recommendations

QG-M2 validation passed. Proceed to:

1. **Next Workflows:**
   - `bmad-bam-validate-foundation` - Run QG-F1 validation
   - `bmad-bam-create-module-architecture` - Design individual modules
   - `bmad-bam-convergence-verification` - QG-I2 (Tenant Safety) verification

2. **Maintenance:**
   - Schedule periodic isolation audits
   - Include tenant isolation tests in CI/CD
   - Document any future isolation changes
```

**If CONDITIONAL:**
```markdown
## Recommendations

QG-M2 validation passed with conditions. Required actions:

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

QG-M2 validation failed. CRITICAL issues require resolution:

1. **Failed CRITICAL Categories:**
   {List categories that failed}

2. **Recovery Protocol:**
   - **Attempt {N}:** {Current attempt status}
   - Fix identified issues
   - Re-run validation (Validate mode)
   - Contact: Security Lead, Platform Architect

3. **Blocked Actions:**
   - Cannot proceed to module design
   - Cannot proceed to integration
   - Cannot deploy to production

4. **Escalation (if Attempt 3):**
   - Mandatory course correction required
   - Architecture review with Security team
   - Consider tenant model change
```

### Action 6: Save Report

Save validation report to:
- **Output to:** `{output_folder}/planning-artifacts/validation/tenant-isolation-qg-m2-report.md`

Include in frontmatter:
```yaml
---
gate: QG-M2
artifact: tenant-isolation.md
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
QG-M2 TENANT ISOLATION VALIDATION COMPLETE
================================================================================
Gate Decision: {PASS / CONDITIONAL / FAIL}
================================================================================

CRITICAL Categories (5):
- Database Level:      {PASS/FAIL}
- Application Level:   {PASS/FAIL}
- Vector Store Level:  {PASS/FAIL}
- Cache Level:         {PASS/FAIL}
- Memory Level:        {PASS/FAIL}

Non-Critical Categories (2):
- Background Jobs:     {PASS/CONDITIONAL}
- Audit:               {PASS/CONDITIONAL}

8-Dimension Matrix:    {COMPLETE/INCOMPLETE}

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
- **P (Party Mode)**: Security and architect review of next steps
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
- Context: "Review QG-M2 validation report and recommended next steps"
- Present security and architect perspectives
- Return to A/P/C menu

#### If 'C' (Continue):
- Mark Validate mode complete
- Workflow finished

---

## SUCCESS METRICS

- ✅ Executive summary generated with gate decision
- ✅ All CRITICAL category results documented with evidence
- ✅ All non-critical category results documented
- ✅ 8-dimension matrix validation documented
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
- [ ] 8-dimension matrix included
- [ ] Recommendations generated
- [ ] Report saved to correct location
- [ ] Gate decision clearly stated

---

## Outputs

- **Validation Report:** `{output_folder}/planning-artifacts/validation/tenant-isolation-qg-m2-report.md`
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

- `bmad-bam-tenant-isolation` Edit mode - Modify existing design
- `bmad-bam-validate-foundation` - QG-F1 validation
- `bmad-bam-create-module-architecture` - Module design
- `bmad-bam-convergence-verification` - QG-I2 (Tenant Safety)

---

## NEXT STEP

Validation workflow complete. Proceed based on gate decision:

- **PASS:** Continue to next planning workflow
- **CONDITIONAL:** Address documented gaps, then continue
- **FAIL:** Enter recovery protocol, fix CRITICAL issues, re-validate
