# Step 22: Generate Validation Report

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- ⏸️ ALWAYS pause after presenting findings and await user direction

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action

---

## Purpose

Generate a comprehensive validation report summarizing findings from the AI fallback chains architecture validation.

---

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- Step 21 completed: Validation performed
- **Load template:** `{project-root}/_bmad/bam/templates/quality-gate-report-template.md`

---

## Actions

### 1. Compile Validation Results

| Category | Status | Notes |
|----------|--------|-------|
| Provider Catalog | | Capabilities, SLAs, costs |
| Quality Thresholds | | Metrics, triggers |
| Failover Logic | | Circuit breaker, retry |
| Tenant Configuration | | Preferences, constraints |

### 2. Assign Severity to Findings

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| CRITICAL | Blocks resilience | Must fix |
| WARNING | Non-critical gap | Should address |
| INFO | Improvement opportunity | Consider |

### 3. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **COMPLETE** | All components defined, resilience verified |
| **CONDITIONAL** | Minor gaps with mitigation |
| **NEEDS REVISION** | Missing critical components |

### 4. Generate Report

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into report findings
- **P (Party Mode)**: Bring PM and SRE perspectives
- **C (Continue)**: Accept report and complete validation workflow
```

#### If 'C' (Continue):
- Save validation report to output location
- Complete validation workflow

---

## Outputs

- AI Fallback Chains Validation Report
- **Output to:** `{output_folder}/planning-artifacts/ai-fallback-chains-validation-report.md`

---

## Verification

- [ ] Results compiled successfully
- [ ] Status determined correctly
- [ ] Report generated
- [ ] Output exported to correct location

---

## Next Step

Workflow complete. Present AI Fallback Chains Validation Report to user for review and approval.
