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

## Purpose

Generate a comprehensive validation report summarizing findings from the facade contract validation and determining the workflow completion status.

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- Step 21 completed: Facade contract validation performed

---

## Inputs

- Validation results from previous steps
- Quality gate decision (PASS/CONDITIONAL/FAIL)
- Specific findings per component
- Recommendations for remediation (if applicable)

---

## Actions

### 1. Compile Validation Results

Organize findings from Step 21:

| Category | Status | Notes |
|----------|--------|-------|
| Contract Structure | | Operations defined, types specified, boundaries documented |
| Tenant Context | | Propagation defined, isolation verified, cross-tenant blocked |
| Error Handling | | Codes standardized, retry policies defined, circuit breakers configured |
| Versioning | | Strategy documented, deprecation timeline, migration path |
| Security | | Auth requirements, rate limiting, audit logging |

### 2. Assign Severity to Findings

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| CRITICAL | Tenant isolation gaps, security issues, or missing error handling | Must fix before integration |
| WARNING | Documentation gaps or incomplete versioning | Should address before release |
| INFO | Optional improvements to contract clarity | Consider for completeness |

### 3. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **COMPLETE** | All validation areas pass, tenant context properly defined |
| **NEEDS REVISION** | Critical gaps in tenant isolation, error handling, or security |

### 4. Generate Report

Create validation report summarizing:
- Facade contract validation outcome
- Contract structure assessment
- Tenant context verification
- Error handling confirmation
- Versioning strategy assessment
- Security review summary
- Required actions for any gaps

#### Checkpoint: Report Generated

Before finalizing, confirm:
- [ ] All findings compiled
- [ ] Severity assigned to each finding
- [ ] Completion status determined
- [ ] Report generated

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
- [ ] Completion status determined
- [ ] Report generated with facade contract summary
- [ ] Patterns align with pattern registry

## Outputs

- Validation report document
- **Load template:** `{project-root}/_bmad/bam/data/templates/quality-gate-report-template.md`
- **Output to:** `{output_folder}/planning-artifacts/quality/facade-contract-validation-report.md`

## Next Step

Based on completion status:
- **COMPLETE:** Workflow finished. Facade contract validated. Proceed to `bmad-bam-convergence-verification` for integration testing.
- **NEEDS REVISION:** Return to `bmad-bam-define-facade-contract` or `bmad-bam-evolve-facade-contract` to address gaps.

## Workflow Complete

Validation mode complete for facade contract validation workflow.
