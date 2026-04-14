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

Generate a comprehensive validation report summarizing findings from the notification system validation steps and determining the workflow completion status.

---

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- Step 21 completed: Notification system validation performed

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
| Notification Requirements | | Categories, triggers, compliance |
| Channel Architecture | | Email, SMS, push, in-app |
| Template Management | | Schema, variables, localization |
| Tenant Preferences | | Settings, overrides, consent |
| Delivery Infrastructure | | Queues, retry, rate limiting |
| Tracking and Analytics | | Metrics, A/B testing |
| Escalation Rules | | Triggers, paths, acknowledgment |
| Tenant Branding | | Assets, customization, approval |
| Cross-Cutting | | Tenant isolation, compliance |

### 2. Assign Severity to Findings

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| CRITICAL | Missing channel configurations, undefined preferences, incomplete delivery | Must fix before proceeding |
| WARNING | Specific provider configurations, timeout values, minor gaps | Should address |
| INFO | Additional channel options, enhanced analytics | Consider for future |

### 3. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **PASS** | All channels configured, templates managed, preferences defined, delivery operational, tracking complete |
| **CONDITIONAL** | Minor gaps (e.g., specific provider configurations, timeout values) - document gaps and proceed |
| **NEEDS REVISION** | Missing channel configurations, undefined preferences, or incomplete delivery infrastructure |

### 4. Generate Report

Create validation report summarizing:
- Validation outcome (PASS/CONDITIONAL/FAIL)
- Findings by category (Requirements, Channels, Templates, Preferences, Delivery, Tracking, Escalation, Branding)
- Configuration gaps documented (if CONDITIONAL)
- Required fixes list (if FAIL)
- Remediation timeline (if applicable)
- Next steps recommendation

---

## COLLABORATION MENUS (A/P/C):

After generating the report, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into report findings and recommendations
- **P (Party Mode)**: Bring analyst and architect perspectives for final review
- **C (Continue)**: Finalize report and complete validation workflow
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass report context: validation outcome, findings, recommendations
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into final report
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review validation report: {summary of outcome and recommendations}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

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
- Configuration gaps documented (if CONDITIONAL)
- Required fixes list (if FAIL)

---

## Next Step

Based on completion status:
- **PASS:** Notification system design complete, ready for implementation sprint planning.
- **CONDITIONAL:** Document gaps with remediation timeline and proceed to implementation with noted limitations.
- **NEEDS REVISION:** Return to Create mode to address missing channel configurations, preferences, or delivery infrastructure.

---

## Workflow Complete

Validation mode complete for tenant-notification-system workflow.
