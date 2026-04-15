# Step 21: Validate Compliance Coverage

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array

---

## Purpose

Validate the compliance specification against framework requirements, audit logging best practices, and control coverage completeness to ensure production readiness.

## Prerequisites

- Compliance specification loaded (step-20-v-load-compliance.md completed)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance

## Validation Categories

### 1. Framework Coverage Validation

Validate that all applicable frameworks are properly addressed:

| Check | Description | Status | Finding |
|-------|-------------|--------|---------|
| FW-001 | All applicable frameworks identified | {PASS/FAIL} | {Details} |
| FW-002 | Framework requirements documented | {PASS/FAIL} | {Details} |
| FW-003 | Framework scope defined | {PASS/FAIL} | {Details} |
| FW-004 | Certification timeline established | {PASS/FAIL} | {Details} |
| FW-005 | Framework owners assigned | {PASS/FAIL} | {Details} |

### 2. Audit Logging Architecture Validation

Validate audit logging design meets requirements:

| Check | Description | Status | Finding |
|-------|-------------|--------|---------|
| AL-001 | Audit event schema complete | {PASS/FAIL} | {Details} |
| AL-002 | All required fields present | {PASS/FAIL} | {Details} |
| AL-003 | Tenant isolation enforced | {PASS/FAIL} | {Details} |
| AL-004 | Immutability requirements satisfied | {PASS/FAIL} | {Details} |
| AL-005 | Event categories comprehensive | {PASS/FAIL} | {Details} |
| AL-006 | Storage architecture scalable | {PASS/FAIL} | {Details} |
| AL-007 | Search capability specified | {PASS/FAIL} | {Details} |
| AL-008 | Real-time processing SLAs defined | {PASS/FAIL} | {Details} |

### 3. Control Mapping Validation

Validate control-framework mapping completeness:

| Check | Description | Status | Finding |
|-------|-------------|--------|---------|
| CM-001 | All controls inventoried | {PASS/FAIL} | {Details} |
| CM-002 | Controls mapped to all frameworks | {PASS/FAIL} | {Details} |
| CM-003 | No unmapped framework requirements | {PASS/FAIL} | {Details} |
| CM-004 | Control ownership assigned | {PASS/FAIL} | {Details} |
| CM-005 | Gap analysis complete | {PASS/FAIL} | {Details} |
| CM-006 | Remediation plans for all gaps | {PASS/FAIL} | {Details} |

### 4. Evidence Collection Validation

Validate evidence requirements are complete:

| Check | Description | Status | Finding |
|-------|-------------|--------|---------|
| EV-001 | Evidence types specified per control | {PASS/FAIL} | {Details} |
| EV-002 | Collection methods defined | {PASS/FAIL} | {Details} |
| EV-003 | Collection frequency appropriate | {PASS/FAIL} | {Details} |
| EV-004 | Evidence retention aligned | {PASS/FAIL} | {Details} |
| EV-005 | Chain of custody defined | {PASS/FAIL} | {Details} |

### 5. Retention Policy Validation

Validate retention policies meet framework requirements:

| Check | Description | Status | Finding |
|-------|-------------|--------|---------|
| RP-001 | Retention policies defined | {PASS/FAIL} | {Details} |
| RP-002 | Meets SOC 2 requirements (1 year) | {PASS/FAIL} | {Details} |
| RP-003 | Meets GDPR requirements | {PASS/FAIL} | {Details} |
| RP-004 | Meets HIPAA requirements (6 years) | {PASS/FAIL} | {Details} |
| RP-005 | Meets SOX requirements (7 years) | {PASS/FAIL} | {Details} |
| RP-006 | Secure deletion procedures defined | {PASS/FAIL} | {Details} |

### 6. Multi-Tenant Compliance Validation

Validate tenant-specific compliance considerations:

| Check | Description | Status | Finding |
|-------|-------------|--------|---------|
| MT-001 | Tenant isolation in audit logs | {PASS/FAIL} | {Details} |
| MT-002 | Per-tenant compliance reporting | {PASS/FAIL} | {Details} |
| MT-003 | Tenant-specific retention support | {PASS/FAIL} | {Details} |
| MT-004 | Data sovereignty addressed | {PASS/FAIL} | {Details} |
| MT-005 | Tenant evidence segregation | {PASS/FAIL} | {Details} |

### 7. Operational Readiness Validation

Validate operational aspects are addressed:

| Check | Description | Status | Finding |
|-------|-------------|--------|---------|
| OR-001 | Compliance monitoring dashboards | {PASS/FAIL} | {Details} |
| OR-002 | Alerting thresholds defined | {PASS/FAIL} | {Details} |
| OR-003 | Remediation SLAs established | {PASS/FAIL} | {Details} |
| OR-004 | Escalation paths documented | {PASS/FAIL} | {Details} |
| OR-005 | Review cadence specified | {PASS/FAIL} | {Details} |

## Validation Summary

Generate validation summary report:

| Category | Total Checks | Passed | Failed | Compliance % |
|----------|--------------|--------|--------|--------------|
| Framework Coverage | {count} | {count} | {count} | {%} |
| Audit Logging | {count} | {count} | {count} | {%} |
| Control Mapping | {count} | {count} | {count} | {%} |
| Evidence Collection | {count} | {count} | {count} | {%} |
| Retention Policies | {count} | {count} | {count} | {%} |
| Multi-Tenant | {count} | {count} | {count} | {%} |
| Operational Readiness | {count} | {count} | {count} | {%} |
| **Overall** | {total} | {total_pass} | {total_fail} | {overall_%} |

## Validation Outcome

Based on validation results, determine outcome:

| Outcome | Criteria | Next Steps |
|---------|----------|------------|
| **PASS** | All checks pass | Proceed to implementation |
| **CONDITIONAL** | Non-critical failures only | Address issues, re-validate |
| **FAIL** | Critical failures exist | Enter remediation, re-run Create mode |

## Critical Failures

Document any critical failures requiring immediate attention:

| Check ID | Description | Impact | Remediation |
|----------|-------------|--------|-------------|
| {Check ID} | {Description} | {Impact level} | {Required action} |

## Recommendations

Based on validation findings, document recommendations:

1. **Immediate Actions:** Critical issues requiring immediate remediation
2. **Short-term Actions:** Issues to address within 30 days
3. **Long-term Improvements:** Enhancements for future iterations



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

### [A] Analyse - Validation Results Analysis
- **A1**: Analyze SOC 2 Trust Services Criteria validation gaps
- **A2**: Evaluate HIPAA Security Rule compliance validation findings
- **A3**: Assess GDPR Article 32 technical measures validation results
- **A4**: Review multi-tenant compliance isolation validation outcomes

### [P] Propose - Remediation Recommendations
- **P1**: Propose prioritized remediation plan for critical failures
- **P2**: Suggest quick-win fixes for non-critical validation gaps
- **P3**: Recommend control implementation improvements
- **P4**: Propose validation re-run strategy after remediation

### [C] Continue - Workflow Navigation
- **C1**: Continue to Step 22 (Generate Report) - load `step-22-v-generate-report.md`
- **C2**: Return to Edit Mode - load `step-10-e-load-compliance.md`
- **C3**: Export validation results summary

---

## Verification

- [ ] All validation categories checked
- [ ] Validation summary generated
- [ ] Outcome determined
- [ ] Critical failures documented
- [ ] Recommendations provided
- [ ] Validation report complete
- [ ] Patterns align with pattern registry

## Outputs

- Compliance validation report
- Validation summary with pass/fail metrics
- Critical findings list
- Remediation recommendations
- Validation outcome determination

## Next Step

This completes the Validate mode. If validation passed, the compliance specification is ready for implementation. If validation failed or returned conditional status, enter Edit mode via `step-10-e-load-compliance.md` to address identified gaps.

## Quality Gate Summary

### Compliance Validation Gate
- [ ] All critical checks passed
- [ ] Framework coverage >= 100%
- [ ] Control mapping complete
- [ ] Evidence requirements specified
- [ ] Retention policies compliant
- [ ] Multi-tenant considerations addressed
