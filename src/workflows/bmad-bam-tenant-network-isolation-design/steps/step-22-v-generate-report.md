# Step 22: Generate Validation Report

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- ALWAYS pause after presenting findings and await user direction

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Track progress in `stepsCompleted` array

---

## Purpose

Generate a comprehensive validation report for the network isolation design.

---

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- Step 21 completed: Network isolation design validation performed

---

## Actions

### 1. Compile Validation Results

Organize findings from Step 21:

| Category | Status | Notes |
|----------|--------|-------|
| VPC Architecture | | Tier design, subnets, AZs |
| Security Groups | | Layer rules, tenant rules |
| VPC Peering | | Transit Gateway, endpoints |
| Traffic Isolation | | NACLs, flow logs, DDoS |
| Cross-Cutting | | Compliance, consistency |

### 2. Assign Severity to Findings

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| CRITICAL | Missing security controls | Must fix before proceeding |
| WARNING | Configuration gaps | Should address |
| INFO | Enhancement opportunities | Consider for future |

### 3. Generate Report

Create validation report summarizing:
- Validation outcome (PASS/CONDITIONAL/FAIL)
- Findings by category
- Required fixes list (if FAIL)
- Next steps recommendation

---

## COLLABORATION MENUS (A/P/C):

After generating the report, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into report findings
- **P (Party Mode)**: Bring security perspectives for final review
- **C (Continue)**: Finalize report and complete validation workflow
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

- Network Isolation Design Validation Report
- Component-level findings summary
- Gate decision documentation
- **Output to:** `{output_folder}/planning-artifacts/infrastructure/tenant-network-isolation-validation-report.md`

---

## Workflow Complete

Validation mode complete for tenant-network-isolation-design workflow.
