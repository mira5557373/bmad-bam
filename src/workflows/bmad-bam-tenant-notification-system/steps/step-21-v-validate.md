# Step 21: Validate Notification System Design

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

This step validates the completeness and quality of the notification system design, ensuring proper channel configuration, template management, tenant preferences, delivery infrastructure, and tracking capabilities.

---

## Prerequisites

- Step 20: Load Artifact completed successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `event-driven`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `tenant-isolation`



---

## Inputs

- Loaded artifact from validation step 20
- Quality gate criteria and checklist
- Pattern registry for validation rules
- Previous validation findings (if re-validating)

---

## Actions

### 1. Load Artifact

- Read the artifact from `{output_folder}/` specified location
- Parse and validate structure

### 2. Validate Content

- Check all required sections are present
- Verify cross-references are valid
- Validate against quality gate checklist

### 3. Generate Findings

- Document any issues found
- Categorize by severity (Critical/High/Medium/Low)

---

---

## Verification

### Notification Requirements
- [ ] All notification categories defined (transactional, marketing, system, security, billing, AI agent)
- [ ] Triggers documented for each category
- [ ] Urgency levels and SLAs specified
- [ ] Regulatory requirements mapped (CAN-SPAM, GDPR, TCPA)
- [ ] Opt-out eligibility documented per category

### Channel Architecture
- [ ] Email channel configured with tenant isolation
- [ ] SMS channel configured with consent tracking
- [ ] Push notification infrastructure defined
- [ ] In-app notification system designed
- [ ] Channel selection matrix complete
- [ ] Provider failover strategy documented

### Template Management
- [ ] Template schema defined
- [ ] Variables catalog complete
- [ ] Multi-language support designed
- [ ] Testing and preview capabilities specified
- [ ] Versioning strategy documented
- [ ] Tenant customization levels defined

### Tenant Preferences
- [ ] Tenant-level settings schema defined
- [ ] User-level preference overrides documented
- [ ] Category-level preferences specified
- [ ] Inheritance model documented
- [ ] Opt-in/opt-out mechanisms designed
- [ ] Consent tracking specified

### Delivery Infrastructure
- [ ] Queue architecture defined
- [ ] Retry policies documented
- [ ] Rate limiting per tenant tier
- [ ] Scheduling system designed
- [ ] Dead letter queue handling
- [ ] Circuit breaker patterns

### Tracking and Analytics
- [ ] Delivery status tracking defined
- [ ] Analytics metrics documented
- [ ] Tenant dashboard designed
- [ ] A/B testing capability specified
- [ ] Data retention policies defined

### Escalation Rules
- [ ] Escalation triggers defined
- [ ] Escalation paths documented
- [ ] On-call integrations specified
- [ ] Acknowledgment tracking designed
- [ ] Tenant configuration options defined

### Tenant Branding
- [ ] Brand asset schema defined
- [ ] Customization levels documented
- [ ] Brand inheritance model specified
- [ ] Preview capabilities designed
- [ ] Approval workflow defined

### Cross-Cutting
- [ ] Tenant isolation maintained across all components
- [ ] Consistent with tenant model isolation design
- [ ] No cross-tenant data leakage possible
- [ ] Compliance requirements addressed
- [ ] Patterns align with pattern registry

---

## Gate Decision

- **PASS**: All channels configured, templates managed, preferences defined, delivery operational, tracking complete
- **CONDITIONAL**: Minor gaps (e.g., specific provider configurations, timeout values) - document gaps and proceed
- **FAIL**: Missing channel configurations, undefined preferences, or incomplete delivery infrastructure - return to Create mode

Present validation results with specific findings for each section.

---

## COLLABORATION MENUS (A/P/C):

After completing validation checks, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation findings and edge cases
- **P (Party Mode)**: Bring analyst and architect perspectives for validation review
- **C (Continue)**: Accept validation results and proceed to generate report
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass validation context: findings, gate decision, gaps identified
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into validation results
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review notification validation: {summary of findings and gate decision}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation results
- Update frontmatter `stepsCompleted: [20, 21]`
- Proceed to next step: `step-22-v-generate-report.md`

---

## Outputs

- Validated notification system design
- Validation gate decision (PASS/CONDITIONAL/FAIL)
- Configuration gaps documented (if CONDITIONAL)
- Required fixes list (if FAIL)

---

## Next Step

If PASS: Notification system design complete, ready for implementation sprint planning.
If CONDITIONAL: Document gaps with remediation timeline and proceed to implementation with noted limitations.
If FAIL: Return to Create mode to address missing channel configurations, preferences, or delivery infrastructure.
