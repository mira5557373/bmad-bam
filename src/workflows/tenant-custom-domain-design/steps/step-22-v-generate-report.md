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

Generate a comprehensive validation report summarizing findings from the custom domain design validation steps.

---

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- Step 21 completed: Custom domain design validation performed

---

## Inputs

- Validation results from previous steps
- Quality gate decision (PASS/CONDITIONAL/FAIL)
- Specific findings per component

---

## Actions

### 1. Compile Validation Results

Organize findings from Step 21:

| Category | Status | Notes |
|----------|--------|-------|
| Domain Architecture | | Domain types, hierarchy, routing |
| SSL/TLS Management | | Certificate strategy, provisioning |
| Routing Configuration | | Resolution logic, gateway, CDN |
| DNS Integration | | Verification, propagation, ownership |
| Cross-Cutting | | Tenant isolation, consistency |

### 2. Assign Severity to Findings

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| CRITICAL | Missing domain types, undefined SSL strategy | Must fix before proceeding |
| WARNING | Specific provider integrations, minor gaps | Should address |
| INFO | Additional provider support, UX improvements | Consider for future |

### 3. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **PASS** | All domain types defined, SSL configured, routing complete |
| **CONDITIONAL** | Minor gaps documented, core functionality complete |
| **NEEDS REVISION** | Missing critical sections, incomplete security |

### 4. Generate Report

Create validation report summarizing:
- Validation outcome (PASS/CONDITIONAL/FAIL)
- Findings by category
- Configuration gaps documented (if CONDITIONAL)
- Required fixes list (if FAIL)
- Next steps recommendation

---

## COLLABORATION MENUS (A/P/C):

After generating the report, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into report findings
- **P (Party Mode)**: Bring analyst and architect perspectives for final review
- **C (Continue)**: Finalize report and complete validation workflow
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

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
- [ ] Patterns align with pattern registry

---

## Outputs

- Validation report document
- Gate decision (PASS/CONDITIONAL/FAIL)

---

## Workflow Complete

Validation mode complete for tenant-custom-domain-design workflow.
