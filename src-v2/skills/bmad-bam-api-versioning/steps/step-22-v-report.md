# Step 22: Generate API Versioning Validation Report

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER finalize report without user confirmation** - Wait for explicit approval
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting report** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 📋 **INCLUDE all validation evidence** in final report
- 💾 **SAVE report to validation folder** with timestamp

## EXECUTION PROTOCOLS

- 🎯 Focus: Generate comprehensive API versioning validation report
- 💾 Track: `stepsCompleted: [20, 21, 22]` when complete
- 📖 Context: Report documents all findings and validation decision
- 🚫 Do NOT: Change validation results; report findings as-is
- 📎 Reference: Include remediation recommendations if CONDITIONAL/FAIL
- ✅ Complete: Validate mode workflow finishes with this step

---

## Purpose

Generate a formal API versioning validation report documenting all validation findings, the final decision, and recommended next steps based on the outcome.

---

## Prerequisites

- Step 21 completed: All validation checks run
- Validation decision calculated (PASS/CONDITIONAL/FAIL)
- **Load template:** `{project-root}/_bmad/bam/data/templates/validation-report.md`

---

## YOUR TASK

Compile all validation results into a formal API versioning validation report. Document the validation decision with rationale, list all findings with evidence, and provide recommendations based on the outcome. Save the report to the validation folder.

---

## Validation Sequence

### Action 1: Compile Executive Summary

Generate executive summary with validation decision:

```markdown
## API Versioning Validation Report

**Artifact:** api-versioning-design.md
**Versioning Strategy:** {strategy}
**Version Format:** {format}
**Date:** {current_date}
**Decision:** {PASS / CONDITIONAL / FAIL}

### Summary

{1-2 sentence summary of validation outcome}

### Key Findings

- CRITICAL checks passed: {X}/24
- Non-critical checks passed: {Y}/8
- Strategy completeness: {complete/incomplete}
- Tenant pinning: {verified/gaps identified}
- Migration readiness: {ready/needs work}
```

### Action 2: Document CRITICAL Category Results

Compile detailed results for each CRITICAL category:

```markdown
## CRITICAL Checks

### Strategy Completeness: {PASS/FAIL}

| Check | Status | Evidence |
|-------|--------|----------|
| Versioning strategy selected | {status} | {evidence} |
| Strategy rationale documented | {status} | {evidence} |
| Multi-tenant considerations | {status} | {evidence} |
| API surface inventoried | {status} | {evidence} |
| Client ecosystem considered | {status} | {evidence} |

### Version Lifecycle: {PASS/FAIL}

| Check | Status | Evidence |
|-------|--------|----------|
| Semver rules defined | {status} | {evidence} |
| Deprecation timeline specified | {status} | {evidence} |
| Enterprise extension documented | {status} | {evidence} |
| Sunset headers defined | {status} | {evidence} |
| Lifecycle states documented | {status} | {evidence} |

### Tenant Pinning: {PASS/FAIL}

| Check | Status | Evidence |
|-------|--------|----------|
| Per-tenant pinning supported | {status} | {evidence} |
| Version override mechanism | {status} | {evidence} |
| Tier-based access specified | {status} | {evidence} |
| Resolution order documented | {status} | {evidence} |

### Backward Compatibility: {PASS/FAIL}

| Check | Status | Evidence |
|-------|--------|----------|
| Breaking changes classified | {status} | {evidence} |
| Non-breaking changes defined | {status} | {evidence} |
| Schema evolution documented | {status} | {evidence} |
| Version negotiation specified | {status} | {evidence} |
| Grace period defined | {status} | {evidence} |

### Migration Strategy: {PASS/FAIL}

| Check | Status | Evidence |
|-------|--------|----------|
| Notification plan defined | {status} | {evidence} |
| Gradual rollout phases | {status} | {evidence} |
| Rollout criteria documented | {status} | {evidence} |
| Rollback procedures defined | {status} | {evidence} |
| Support resources listed | {status} | {evidence} |
```

### Action 3: Document Non-Critical Category Results

```markdown
## Non-Critical Checks

### Analytics: {PASS/CONDITIONAL}

| Check | Status | Evidence |
|-------|--------|----------|
| Adoption tracking defined | {status} | {evidence} |
| Deprecation monitoring | {status} | {evidence} |
| Error rate tracking | {status} | {evidence} |
| Migration progress | {status} | {evidence} |

### Documentation: {PASS/CONDITIONAL}

| Check | Status | Evidence |
|-------|--------|----------|
| Implementation checklist | {status} | {evidence} |
| Web research references | {status} | {evidence} |
| Change log section | {status} | {evidence} |
| Executive summary | {status} | {evidence} |
```

### Action 4: Generate Recommendations

Based on validation decision, provide recommendations:

**If PASS:**
```markdown
## Recommendations

API versioning validation passed. Proceed to:

1. **Implementation Phase:**
   - Configure API gateway version routing
   - Implement Sunset headers in middleware
   - Set up version analytics pipeline
   - Configure tenant version configuration

2. **Next Workflows:**
   - `bmad-bam-facade-contract` - Define versioned contracts
   - `bmad-bam-convergence` - Integration verification
   - `bmad-bam-api-versioning` - Version release workflow

3. **Maintenance:**
   - Schedule periodic design reviews
   - Monitor adoption metrics
   - Document version decisions
```

**If CONDITIONAL:**
```markdown
## Recommendations

API versioning validation passed with conditions. Required actions:

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

API versioning validation failed. CRITICAL issues require resolution:

1. **Failed CRITICAL Categories:**
   {List categories that failed}

2. **Recovery Protocol:**
   - **Attempt {N}:** {Current attempt status}
   - Fix identified issues
   - Re-run validation (Validate mode)
   - Contact: API Architect, Platform Team

3. **Blocked Actions:**
   - Cannot proceed to implementation
   - Cannot implement version routing
   - Cannot configure tenant pinning

4. **Escalation (if Attempt 3):**
   - Mandatory course correction required
   - API architecture review
   - Consider design restructure
```

### Action 5: Save Report

Save validation report to:
- **Output to:** `{output_folder}/planning-artifacts/validation/api-versioning-validation-report.md`

Include in frontmatter:
```yaml
---
artifact: api-versioning-design.md
versioning_strategy: {strategy}
version_format: {format}
decision: {PASS/CONDITIONAL/FAIL}
date: {current_date}
validated_by: {agent}
---
```

---

## Quality Gate Integration

### Validation Decision Summary

Present final validation outcome:

```
================================================================================
API VERSIONING DESIGN VALIDATION COMPLETE
================================================================================
Artifact: api-versioning-design.md
Versioning Strategy: {strategy}
Validation Decision: {PASS / CONDITIONAL / FAIL}
================================================================================

CRITICAL Categories (5):
- Strategy Completeness: {PASS/FAIL}
- Version Lifecycle:     {PASS/FAIL}
- Tenant Pinning:        {PASS/FAIL}
- Backward Compatibility:{PASS/FAIL}
- Migration Strategy:    {PASS/FAIL}

Non-Critical Categories (2):
- Analytics:             {PASS/CONDITIONAL}
- Documentation:         {PASS/CONDITIONAL}

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
- Pass context: report contents, validation decision, recommendations
- Explore additional context for failed items
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review API versioning validation report and recommended next steps"
- Present architect perspectives
- Return to A/P/C menu

#### If 'C' (Continue):
- Mark Validate mode complete
- Workflow finished

---

## SUCCESS METRICS

- ✅ Executive summary generated with validation decision
- ✅ All CRITICAL category results documented with evidence
- ✅ All non-critical category results documented
- ✅ Recommendations provided based on validation outcome
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
- [ ] Validation decision clearly stated

---

## Outputs

- **Validation Report:** `{output_folder}/planning-artifacts/validation/api-versioning-validation-report.md`
- Validation decision summary
- Recommendations for next steps

---

## WORKFLOW COMPLETE

Validate mode is complete. Based on validation decision:

| Decision | Next Steps |
|----------|------------|
| **PASS** | Proceed to implementation, configure API gateway |
| **CONDITIONAL** | Proceed with documented remediation plan and timeline |
| **FAIL** | Return to Create/Edit mode to address CRITICAL issues; follow recovery protocol |

---

## Related Workflows

Based on validation outcome, consider:

- `bmad-bam-api-versioning` Edit mode - Modify existing design
- `bmad-bam-facade-contract` - Define versioned API contracts
- `bmad-bam-convergence` - Full integration verification
- `bmad-bam-api-versioning` - Plan version release

---

## NEXT STEP

Validation workflow complete. Proceed based on validation decision:

- **PASS:** Configure API gateway, implement Sunset headers, begin implementation
- **CONDITIONAL:** Address documented gaps, then proceed
- **FAIL:** Enter recovery protocol, fix CRITICAL issues, re-validate
