# Step 22: Generate Validation Report

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

Generate a comprehensive validation report summarizing findings from the convergence verification and determining the workflow completion status for QG-I1, QG-I2, and QG-I3 gates.

## Prerequisites

- Step 20 completed: Convergence artifacts loaded successfully
- Step 21 completed: Validation performed against integration quality gates


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
| Cross-Module Integration (QG-I1) | | Facade contracts, module boundaries, API consistency |
| Tenant Safety (QG-I2) | | Isolation verification, cross-tenant protection |
| Agent Safety (QG-I3) | | Runtime safety, tool permissions, kill switch |
| Performance Verification | | Latency, throughput, resource utilization |

### 2. Assign Severity to Findings

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| CRITICAL | Blocks production deployment | Must fix before release |
| WARNING | Non-critical integration gap | Should address before GA |
| INFO | Improvement opportunity | Consider for optimization |

**Critical Failure Examples:**
- Cross-module contract mismatch
- Tenant isolation breach possible
- Agent safety controls bypassed
- Performance below SLA thresholds

### 3. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **COMPLETE** | All integration gates pass, tenant/agent safety verified |
| **CONDITIONAL** | Non-critical gaps with documented mitigation |
| **NEEDS REVISION** | Critical integration failures or safety gaps |

### 4. Generate Report

Create validation report summarizing:
- Validation outcome (PASS/CONDITIONAL/FAIL) per gate
- Findings by verification category
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

### [A]nalyze - Deep Dive Options
| Code | Action | Description |
|------|--------|-------------|
| A1 | Analyze validation results | Review compiled findings from Step 21 |
| A2 | Analyze severity distribution | Review CRITICAL/WARNING/INFO breakdown |
| A3 | Analyze gate-level status | Check QG-I1/I2/I3 individual outcomes |
| A4 | Analyze production readiness | Assess overall deployment recommendation |

### [P]roceed - Action Options
| Code | Action | Description |
|------|--------|-------------|
| P1 | Compile validation results | Organize findings by verification category |
| P2 | Assign severity ratings | Categorize findings as CRITICAL/WARNING/INFO |
| P3 | Determine completion status | Set COMPLETE/CONDITIONAL/NEEDS REVISION |
| P4 | Generate final report | Create comprehensive validation report |

### [C]ontinue - Navigation Options
| Code | Action | Description |
|------|--------|-------------|
| C1 | Complete validation | Finish Validate mode with final report |
| C2 | Return to Step 21 | Go back to validation criteria checks |
| C3 | Switch to Edit mode | Go to step-10-e-load-existing.md to address failures |

**Convergence Gate Context:** This step completes validation of QG-I1/I2/I3 gates. COMPLETE status enables progression to QG-P1 production readiness.

---

## Verification

- [ ] All findings from Step 21 documented
- [ ] Severity assigned to each finding
- [ ] Completion status determined per gate (QG-I1, QG-I2, QG-I3)
- [ ] Report generated with integration readiness assessment
- [ ] Patterns align with pattern registry

## Outputs

- Convergence Verification Validation Report
- Gate-level pass/fail summary (QG-I1, QG-I2, QG-I3)
- Integration readiness assessment
- Production deployment recommendation
- **Load template:** `{project-root}/_bmad/bam/templates/test-case-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/cross-tenant-test-plan-template.md`

## Next Step

Based on completion status:
- **COMPLETE:** Workflow finished. Proceed to production readiness (QG-P1).
- **CONDITIONAL:** Document gaps with mitigation plan and timeline.
- **NEEDS REVISION:** Return to Edit mode (step-10-e-load-existing.md) to address integration failures.

## Workflow Complete

Validation mode complete for convergence-verification workflow.
