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

Generate a comprehensive validation report summarizing findings from the internal contract design validation and determining the workflow completion status.

## Prerequisites

- Step 20 completed: Internal contract artifact loaded successfully
- Step 21 completed: Validation performed against contract design criteria


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
| Internal Interfaces | | All internal interfaces identified, documented |
| Contract Definitions | | Request/response schemas, error contracts |
| Boundary Specifications | | Module responsibilities, ownership clear |
| Contract Documentation | | Complete, versioned, accessible |
| Cross-Cutting | | Consistency with external contracts, tenant context |

### 2. Assign Severity to Findings

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| CRITICAL | Contract incompatibility or boundary violation | Must fix before integration |
| WARNING | Non-critical contract gap | Should address before code review |
| INFO | Documentation improvement | Consider for contract clarity |

**Critical Failure Examples:**
- Missing interface definition
- Inconsistent error contract schema
- Boundary responsibility overlap or gap
- Tenant context not propagated in contract

### 3. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **COMPLETE** | All interfaces defined, contracts documented, boundaries clear |
| **CONDITIONAL** | Minor documentation gaps with completion timeline |
| **NEEDS REVISION** | Critical contract gaps or boundary violations |

### 4. Generate Report

Create validation report summarizing:
- Validation outcome (PASS/CONDITIONAL/FAIL)
- Findings by contract category
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

**[A]pprove** - Report accepted, workflow complete
**[P]ause** - Review report before finalizing
**[C]oncern** - Discuss report findings, severity assignments, or next steps

Select an option:

---

## Verification

- [ ] All findings from Step 21 documented
- [ ] Severity assigned to each finding
- [ ] Completion status determined
- [ ] Report generated with contract readiness assessment
- [ ] Patterns align with pattern registry

## Outputs

- Internal Contract Design Validation Report
- Category-level findings summary
- Integration readiness assessment

## Next Step

Based on completion status:
- **COMPLETE:** Workflow finished. Proceed to module implementation with defined contracts.
- **CONDITIONAL:** Document gaps and proceed with contract review meeting.
- **NEEDS REVISION:** Return to Edit mode (step-10-e-load-existing.md) to address contract gaps.

## Workflow Complete

Validation mode complete for internal-contract-design workflow.
