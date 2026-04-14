# Step 22: Generate Validation Report

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array

---

## Purpose

Generate a comprehensive validation report summarizing findings from the security audit validation.

---

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- Step 21 completed: Security audit validation performed

---

## Actions

### 1. Compile Validation Results

Organize findings from Step 21:

| Category | Status | Notes |
|----------|--------|-------|
| Audit Scope | | Objectives and systems covered |
| Access Control Review | | RBAC/ABAC verified |
| Vulnerability Assessment | | Scans executed |
| Compliance Verification | | Frameworks checked |
| QG-SA1 Compliance | | All patterns verified |

### 2. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **PASS** | All required QG-SA1 patterns verified |
| **CONDITIONAL** | Minor gaps documented |
| **NEEDS REVISION** | Critical pattern failing |

### 3. Generate Report

Create validation report summarizing:
- Validation outcome (PASS/CONDITIONAL/FAIL)
- Findings by category
- QG-SA1 pattern status
- Next steps recommendation

---

## COLLABORATION MENUS (A/P/C):

After generating the report, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into report findings
- **P (Party Mode)**: Bring security and compliance perspectives
- **C (Continue)**: Finalize report and complete validation workflow
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

#### If 'C' (Continue):
- Save final validation report
- Update frontmatter `stepsCompleted: [20, 21, 22]`
- Complete validation workflow

---

## Verification

- [ ] All findings from Step 21 documented
- [ ] Severity assigned to each finding
- [ ] Completion status determined
- [ ] Report generated with all required sections

---

## Outputs

- Validation report document
- Gate decision (PASS/CONDITIONAL/FAIL)
- Remediation recommendations (if needed)

---

## Workflow Complete

Validation mode complete for security-audit-execution workflow.
