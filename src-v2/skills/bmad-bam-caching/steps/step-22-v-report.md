# Step 22: Generate QG-M2 Cache Validation Report

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER finalize report without user confirmation** - Wait for explicit approval
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting report** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 📋 **INCLUDE all validation evidence** in final report
- 💾 **SAVE report to validation folder** with timestamp

## EXECUTION PROTOCOLS

- 🎯 Focus: Generate comprehensive QG-M2 cache validation report
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

Generate a formal QG-M2 cache dimension validation report documenting all caching validation findings, the gate decision, and recommended next steps based on the outcome.

---

## Prerequisites

- Step 21 completed: All validation checks run
- Gate decision calculated (PASS/CONDITIONAL/FAIL)
- **Load template:** `{project-root}/_bmad/bam/data/templates/validation-report.md`

---

## YOUR TASK

Compile all validation results into a formal QG-M2 cache dimension report. Document the gate decision with rationale, list all findings with evidence, and provide recommendations based on the outcome. Save the report to the validation folder.

---

## Validation Sequence

### Action 1: Compile Executive Summary

Generate executive summary with gate decision:

```markdown
## QG-M2 Cache Dimension Validation Report

**Gate:** QG-M2 (Tenant Isolation Complete) - Cache Dimension
**Artifact:** caching-design.md
**Tenant Model:** {tenant_model}
**Date:** {current_date}
**Decision:** {PASS / CONDITIONAL / FAIL}

### Summary

{1-2 sentence summary of validation outcome}

### Key Findings

- CRITICAL checks passed: {X}/21
- Non-critical checks passed: {Y}/10
- Cache layers verified: {Z}/3
```

### Action 2: Document CRITICAL Category Results

Compile detailed results for each CRITICAL category:

```markdown
## CRITICAL Checks

### Cache Key Isolation: {PASS/FAIL}

| Check | Status | Evidence |
|-------|--------|----------|
| All keys include tenant prefix | {status} | {evidence} |
| Session keys scoped | {status} | {evidence} |
| Entity keys scoped | {status} | {evidence} |
| Query keys scoped | {status} | {evidence} |
| No shared keys for tenant data | {status} | {evidence} |

### L1 Cache Isolation: {PASS/FAIL}

| Check | Status | Evidence |
|-------|--------|----------|
| Tenant context required | {status} | {evidence} |
| Cache miss on absent context | {status} | {evidence} |
| Process isolation documented | {status} | {evidence} |
| No cross-tenant reads | {status} | {evidence} |

### L2 Cache Isolation: {PASS/FAIL}

| Check | Status | Evidence |
|-------|--------|----------|
| Tenant prefix on all keys | {status} | {evidence} |
| No wildcard scans | {status} | {evidence} |
| GET without prefix blocked | {status} | {evidence} |
| Cross-tenant access prevented | {status} | {evidence} |

### CDN Cache Isolation: {PASS/FAIL}

| Check | Status | Evidence |
|-------|--------|----------|
| Tenant header required | {status} | {evidence} |
| Vary header configured | {status} | {evidence} |
| Private caching for tenant content | {status} | {evidence} |
| No public cache for tenant data | {status} | {evidence} |

### Invalidation Strategy: {PASS/FAIL}

| Check | Status | Evidence |
|-------|--------|----------|
| Event-driven invalidation | {status} | {evidence} |
| Entity events trigger invalidation | {status} | {evidence} |
| Tenant events scoped | {status} | {evidence} |
| No cross-tenant invalidation | {status} | {evidence} |
```

### Action 3: Document Non-Critical Category Results

```markdown
## Non-Critical Checks

### TTL Policies: {PASS/CONDITIONAL}

| Check | Status | Evidence |
|-------|--------|----------|
| TTL defined for all types | {status} | {evidence} |
| TTL varies by tier | {status} | {evidence} |
| TTL hierarchy (L1 <= L2) | {status} | {evidence} |

### Circuit Breaker: {PASS/CONDITIONAL}

| Check | Status | Evidence |
|-------|--------|----------|
| Circuit breaker configured | {status} | {evidence} |
| Failure thresholds defined | {status} | {evidence} |
| Fallback behavior documented | {status} | {evidence} |

### Performance Monitoring: {PASS/CONDITIONAL}

| Check | Status | Evidence |
|-------|--------|----------|
| Hit rate metrics by tenant | {status} | {evidence} |
| Hit rate targets by tier | {status} | {evidence} |
| Memory allocation by tier | {status} | {evidence} |
| Eviction policy documented | {status} | {evidence} |
```

### Action 4: Document Cache Layer Validation

```markdown
## Cache Layer Summary

| Layer | Technology | Isolation | Verified |
|-------|------------|-----------|----------|
| L1 (In-Memory) | {tech} | Process + tenant context | {yes/no} |
| L2 (Distributed) | {tech} | Tenant-prefixed keys | {yes/no} |
| CDN | {tech} | Header-based (Vary) | {yes/no} |

**Layers Complete:** {X}/3
```

### Action 5: Generate Recommendations

Based on gate decision, provide recommendations:

**If PASS:**
```markdown
## Recommendations

QG-M2 cache dimension validation passed. Proceed to:

1. **Next Workflows:**
   - `bmad-bam-tenant-isolation` - Complete full QG-M2 validation
   - `bmad-bam-observability` - Integrate cache metrics
   - `bmad-bam-convergence` - QG-I2 (Tenant Safety)

2. **Maintenance:**
   - Schedule periodic cache isolation audits
   - Include cache isolation tests in CI/CD
   - Document any future cache changes
```

**If CONDITIONAL:**
```markdown
## Recommendations

QG-M2 cache dimension validation passed with conditions. Required actions:

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

QG-M2 cache dimension validation failed. CRITICAL issues require resolution:

1. **Failed CRITICAL Categories:**
   {List categories that failed}

2. **Recovery Protocol:**
   - **Attempt {N}:** {Current attempt status}
   - Fix identified issues
   - Re-run validation (Validate mode)
   - Contact: Security Lead, Platform Architect

3. **Blocked Actions:**
   - Cannot proceed to full QG-M2 validation
   - Cannot proceed to integration
   - Cannot deploy to production

4. **Escalation (if Attempt 3):**
   - Mandatory course correction required
   - Architecture review with Security team
   - Consider alternative caching strategy
```

### Action 6: Save Report

Save validation report to:
- **Output to:** `{output_folder}/planning-artifacts/validation/caching-qg-m2-report.md`

Include in frontmatter:
```yaml
---
gate: QG-M2
dimension: cache
artifact: caching-design.md
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
QG-M2 CACHE DIMENSION VALIDATION COMPLETE
================================================================================
Gate Decision: {PASS / CONDITIONAL / FAIL}
================================================================================

CRITICAL Categories (5):
- Cache Key Isolation:    {PASS/FAIL}
- L1 Cache Isolation:     {PASS/FAIL}
- L2 Cache Isolation:     {PASS/FAIL}
- CDN Cache Isolation:    {PASS/FAIL}
- Invalidation Strategy:  {PASS/FAIL}

Non-Critical Categories (3):
- TTL Policies:           {PASS/CONDITIONAL}
- Circuit Breaker:        {PASS/CONDITIONAL}
- Performance Monitoring: {PASS/CONDITIONAL}

Cache Layers Verified:    {3/3}

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
- Context: "Review QG-M2 cache validation report and recommended next steps"
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
- ✅ Cache layer validation documented
- ✅ Recommendations provided based on gate outcome
- ✅ Report saved to validation folder
- ✅ Recovery protocol status documented (if applicable)

---

## FAILURE MODES

- ❌ **Report generation failed:** Verify all Step 21 results available
- ❌ **Save failed:** Check output folder permissions
- ❌ **Missing evidence:** Cannot generate complete report
- ❌ **Template not found:** Use default report structure

---

## Verification

- [ ] Executive summary complete
- [ ] CRITICAL categories documented
- [ ] Non-critical categories documented
- [ ] Cache layer summary included
- [ ] Recommendations generated
- [ ] Report saved to correct location
- [ ] Gate decision clearly stated

---

## Outputs

- **Validation Report:** `{output_folder}/planning-artifacts/validation/caching-qg-m2-report.md`
- Gate decision summary
- Recommendations for next steps

---

## WORKFLOW COMPLETE

Validate mode is complete. Based on gate decision:

| Decision | Next Steps |
|----------|------------|
| **PASS** | Proceed to `bmad-bam-tenant-isolation` for full QG-M2, or next workflow |
| **CONDITIONAL** | Proceed with documented remediation plan and timeline |
| **FAIL** | Return to Create/Edit mode to address CRITICAL issues; follow recovery protocol |

---

## Related Workflows

Based on validation outcome, consider:

- `bmad-bam-caching` Edit mode - Modify existing design
- `bmad-bam-tenant-isolation` - Full QG-M2 validation
- `bmad-bam-observability` - Cache metrics integration
- `bmad-bam-convergence` - QG-I2 (Tenant Safety)

---

## NEXT STEP

Validation workflow complete. Proceed based on gate decision:

- **PASS:** Continue to full QG-M2 or next planning workflow
- **CONDITIONAL:** Address documented gaps, then continue
- **FAIL:** Enter recovery protocol, fix CRITICAL issues, re-validate
