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
| Contract Structure | | Version, provider, status, change history |
| Interface Definitions | | Method signatures, tenant context, DTOs |
| Data Transfer Objects | | Schema definitions, validation rules |
| Tenant Context | | Propagation, boundary enforcement |
| Error Handling | | Error schema, codes, retriable errors |
| Cross-Cutting | | Master architecture alignment, no circular deps |

### 2. Assign Severity to Findings

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| CRITICAL | Missing interface definitions, undefined DTOs, or no tenant context handling | Must fix before proceeding |
| WARNING | Minor documentation gaps in error handling or pagination | Should address before consumer adoption |
| INFO | Optional improvements to DTO naming or versioning metadata | Consider for future iterations |

### 3. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **COMPLETE** | All interfaces defined, tenant context handled, DTOs complete, errors documented |
| **NEEDS REVISION** | Missing interface definitions, undefined DTOs, or tenant context gaps |

### 4. Generate Report

Create validation report summarizing:
- Contract validation outcome
- Interface completeness assessment
- Tenant isolation verification
- Error handling coverage
- Required actions for any gaps

## Verification

- [ ] All findings from Step 21 documented
- [ ] Severity assigned to each finding
- [ ] Completion status determined
- [ ] Report generated with contract summary
- [ ] Patterns align with pattern registry

## Outputs

- Validation report document
- **Load template:** `{project-root}/_bmad/bam/templates/quality-gate-report-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/integration-patterns-template.md`
- **Output to:** `{output_folder}/planning-artifacts/{module-name}-facade-contract-validation-report.md`

---

## COLLABORATION MENUS (A/P/C)

> **Quick Actions** - Type the letter + number:
>
> **[A] Assist Options:**
> - `A1` - Help compile validation results
> - `A2` - Clarify severity assignment criteria
> - `A3` - Explain completion status determination
> - `A4` - Review report structure requirements
>
> **[P] Proactive Options:**
> - `P1` - Suggest report formatting improvements
> - `P2` - Flag critical findings requiring action
> - `P3` - Recommend follow-up validation steps
> - `P4` - Identify consumer notification needs
>
> **[C] Completion Options:**
> - `C1` - Finalize validation report
> - `C2` - Determine workflow completion status
> - `C3` - Generate report output file
> - `C4` - **Complete Validation Mode** (workflow finished)

---

## PROTOCOL INTEGRATION

### A/P/C Handler
- **[A] Response:** Deep-dive into requested topic, then return to current step
- **[P] Response:** Acknowledge party mode, continue with enhanced engagement
- **[C] Response:** Proceed to next logical step in workflow

---

## Next Step

Based on completion status:
- **COMPLETE:** Workflow finished. Facade contract ready for consumer modules. Proceed to implementation or `bmad-bam-validate-module`.
- **NEEDS REVISION:** Return to Edit mode to address interface, DTO, or tenant context gaps.

## Workflow Complete

Validation mode complete for facade contract definition workflow.
