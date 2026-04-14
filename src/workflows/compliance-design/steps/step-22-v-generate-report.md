# Step 22: Generate Validation Report

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

Generate a comprehensive validation report summarizing findings from the compliance design validation and determining the workflow completion status.

## Prerequisites

- Step 20 completed: Compliance specification artifact loaded successfully
- Step 21 completed: Validation performed against framework requirements and control coverage


---

## Inputs

- Validation results from previous steps
- Quality gate decision (PASS/CONDITIONAL/FAIL)
- Specific findings per component
- Recommendations for remediation (if applicable)

---

## Actions

### 1. Compile Validation Results

Organize findings from Step 21 validation:

| Category | Status | Notes |
|----------|--------|-------|
| Framework Coverage | | SOC 2, GDPR, HIPAA, SOX requirements addressed |
| Audit Logging Architecture | | Event schema, tenant isolation, immutability |
| Control Mapping | | Controls mapped to all frameworks, gap analysis |
| Evidence Collection | | Evidence types, collection methods, retention |
| Retention Policies | | Framework-specific retention compliance |
| Multi-Tenant Compliance | | Per-tenant reporting, data sovereignty |
| Operational Readiness | | Dashboards, alerting, remediation SLAs |

### 2. Assign Severity to Findings

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| CRITICAL | Compliance violation or audit failure risk | Must fix before certification |
| WARNING | Non-critical compliance gap | Should address before audit |
| INFO | Enhancement opportunity | Consider for continuous compliance |

**Critical Failure Examples:**
- Framework requirements not fully mapped
- Audit logging missing tenant isolation
- Retention policies below framework minimums
- No evidence collection procedures defined

### 3. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **COMPLETE** | All frameworks covered, controls mapped, evidence requirements defined |
| **CONDITIONAL** | Non-critical gaps with documented remediation timeline |
| **NEEDS REVISION** | Critical compliance gaps or unmapped framework requirements |

### 4. Generate Report

Create validation report summarizing:
- Validation outcome (PASS/CONDITIONAL/FAIL)
- Findings by compliance category
- Required actions for each critical/warning item
- Next steps based on outcome

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

### [A] Analyse - Report Analysis
- **A1**: Analyze validation report completeness for SOC 2 audit readiness
- **A2**: Evaluate HIPAA compliance report findings for BAA requirements
- **A3**: Assess GDPR compliance documentation sufficiency
- **A4**: Review multi-framework certification timeline feasibility

### [P] Propose - Report Recommendations
- **P1**: Propose executive summary for compliance stakeholders
- **P2**: Suggest remediation priority ordering for certification timeline
- **P3**: Recommend compliance monitoring improvements based on findings
- **P4**: Propose next certification milestone and preparation steps

### [C] Continue - Workflow Navigation
- **C1**: Return to Create Mode - load `step-01-c-identify-frameworks.md`
- **C2**: Return to Edit Mode - load `step-10-e-load-compliance.md`
- **C3**: Export final validation report

---

## Verification

- [ ] All findings from Step 21 documented
- [ ] Severity assigned to each finding
- [ ] Completion status determined
- [ ] Report generated with compliance readiness assessment
- [ ] Patterns align with pattern registry

## Outputs

- Compliance Design Validation Report
- Category-level findings summary
- Certification readiness assessment
- Remediation recommendations

## Next Step

Based on completion status:
- **COMPLETE:** Workflow finished. Proceed to compliance implementation.
- **CONDITIONAL:** Document gaps with remediation timeline and proceed.
- **NEEDS REVISION:** Return to Edit mode (step-10-e-load-compliance.md) to address compliance gaps.

## Workflow Complete

Validation mode complete for compliance-design workflow.
