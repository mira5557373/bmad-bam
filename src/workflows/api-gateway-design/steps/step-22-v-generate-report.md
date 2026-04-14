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

Generate a comprehensive validation report summarizing findings from the gateway design validation and determining the workflow completion status.

## Prerequisites

- Step 20 completed: Gateway design artifact loaded successfully
- Step 21 completed: Validation performed against gateway criteria

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
| Requirements | | Traffic, endpoints, auth, routing needs |
| Rate Limiting | | Quotas, burst, enforcement, isolation |
| Authentication | | Flows, validation, extraction, policies |
| Routing | | Routes, transformation, failover |

### 2. Assign Severity to Findings

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| CRITICAL | Blocks gateway deployment | Must fix before production |
| WARNING | Non-critical gap | Should address before GA |
| INFO | Configuration improvement | Consider for optimization |

**Critical Failure Examples:**
- Missing authentication on protected endpoints
- No rate limiting configured
- Security vulnerabilities in configuration
- No failover strategy defined

### 3. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **COMPLETE** | Full configuration, security validated, deployment ready |
| **CONDITIONAL** | Minor gaps with timeline for completion |
| **NEEDS REVISION** | Critical gaps in security or configuration |

### 4. Generate Report

Create validation report summarizing:
- Validation outcome (PASS/CONDITIONAL/FAIL)
- Findings by gateway component
- Required actions for each critical/warning item
- Next steps based on outcome

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

After generating the report, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into findings and recommendations
- **P (Party Mode)**: Bring QA and PM perspectives for report review
- **C (Continue)**: Complete Validate mode - workflow finished
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass report context: validation results, severity assignments, completion status
- Process enhanced insights from deep questioning
- Ask user: "Accept these findings? (y/n)"
- If yes, finalize report
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review validation report for gateway design: {summary of findings and status}"
- Process collaborative analysis from QA and PM personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation report
- Validate mode complete

---

## Verification

- [ ] All findings from Step 21 documented
- [ ] Severity assigned to each finding
- [ ] Completion status determined
- [ ] Report generated with gateway readiness assessment
- [ ] Patterns align with pattern registry

## Outputs

- Gateway Design Validation Report
- Category-level findings summary
- Gateway deployment go/no-go recommendation

## Next Step

Based on completion status:
- **COMPLETE:** Workflow finished. Proceed with gateway deployment.
- **CONDITIONAL:** Document gaps and proceed with staged rollout.
- **NEEDS REVISION:** Return to Edit mode (step-10-e-load-existing.md) to address findings.

## Workflow Complete

Validation mode complete for api-gateway-design workflow.
