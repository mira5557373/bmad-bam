# Step 22: Generate Production Readiness Report

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

## Purpose

Generate a comprehensive production readiness report summarizing all validation findings and providing the final QG-P1 gate decision for deployment approval.

## Prerequisites

- Step 20 completed: Artifacts loaded successfully
- Step 21 completed: Production readiness validation performed

---

## Inputs

- Validation results from previous steps
- Quality gate decision (PASS/CONDITIONAL/FAIL)
- Specific findings per category
- Recommendations for remediation (if applicable)

---

## Actions

### 1. Compile Validation Results

Organize findings from Step 21:

| Category | Status | Notes |
|----------|--------|-------|
| Tenant Isolation | | RLS verified, encryption confirmed, backup isolation |
| Agent Safety | | Permissions verified, guardrails configured, kill switches tested |
| Operational Readiness | | Monitoring, alerting, runbooks, incident response |
| Security Posture | | Scan clean, secrets managed, access controls, audit logging |
| Deployment Configuration | | IaC reviewed, rollback tested, health checks working |

### 2. Assign Severity to Findings

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| CRITICAL | Tenant isolation gaps, security vulnerabilities, or agent safety issues | Must fix before deployment |
| WARNING | Operational gaps or incomplete runbooks | Should address within first week |
| INFO | Optional improvements to monitoring or documentation | Consider for next iteration |

### 3. Determine Deployment Approval

| Status | Criteria |
|--------|----------|
| **APPROVED** | All critical checks pass, ready for production deployment |
| **APPROVED WITH CONDITIONS** | Minor gaps documented with timeline for resolution |
| **NOT APPROVED** | Critical issues must be resolved before deployment |

### 4. Generate Report

Create production readiness report summarizing:
- Executive summary with deployment recommendation
- Prerequisite gate status summary
- Tenant isolation assessment
- Agent safety assessment
- Operational readiness assessment
- Security posture assessment
- Deployment configuration assessment
- Outstanding items (if any)
- Sign-off requirements

#### Checkpoint: Report Generated

Before finalizing, confirm:
- [ ] All findings compiled
- [ ] Severity assigned to each finding
- [ ] Deployment approval determined
- [ ] Report generated with executive summary

**STOP: Present the A/P/C menu to the user**

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

---

## Verification

- [ ] All findings from Step 21 documented
- [ ] Severity assigned to each finding
- [ ] Deployment approval determined
- [ ] Report generated with complete assessment
- [ ] Sign-off requirements documented
- [ ] Patterns align with pattern registry

## Outputs

- Production readiness report document
- **Load template:** `{project-root}/_bmad/bam/data/templates/production-readiness-template.md`
- **Output to:** `{output_folder}/planning-artifacts/quality/production-readiness-report.md`

## Next Step

Based on deployment approval:
- **APPROVED:** QG-P1 PASSED. System is approved for production deployment. Proceed to deployment.
- **APPROVED WITH CONDITIONS:** QG-P1 CONDITIONAL. Deploy with documented timeline for resolving outstanding items.
- **NOT APPROVED:** QG-P1 FAILED. Return to relevant workflows to address critical issues before re-validation.

## Workflow Complete

Production readiness validation complete. QG-P1 gate decision documented.
