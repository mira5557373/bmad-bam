# Step 1: Analyze Trial Model

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics

---

## Purpose

Analyze the existing trial model configuration, including trial duration, feature access, and conversion triggers to establish the foundation for conversion optimization.

---

## Prerequisites

- Master architecture document loaded with tenant model
- Tenant onboarding design with trial specifications
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-lifecycle
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`

---

## Inputs

- User requirements and constraints for trial conversion
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Document Trial Configuration

Identify and document the current trial model:

| Aspect | Configuration | Rationale |
|--------|---------------|-----------|
| Trial Duration | {days} | {why this duration} |
| Trial Type | {freemium/time-limited/feature-limited} | {model rationale} |
| Feature Access | {full/limited} | {access strategy} |
| Usage Limits | {quotas during trial} | {limit rationale} |
| Credit Card Required | {yes/no} | {conversion strategy} |

### 2. Identify Conversion Triggers

Map events that indicate conversion readiness:

| Trigger | Signal Type | Weight | Action |
|---------|-------------|--------|--------|
| Feature Usage | {specific feature used N times} | High | Conversion prompt |
| Time in App | {X hours of engagement} | Medium | Nurture email |
| Team Invites | {user invited teammates} | High | Team upgrade offer |
| Limit Hit | {quota approached/exceeded} | High | Upgrade CTA |
| Trial Expiry | {N days before expiry} | Critical | Urgency campaign |

### 3. Map Conversion Barriers

Identify and document common conversion barriers:

| Barrier | Description | Mitigation Strategy |
|---------|-------------|---------------------|
| Price Sensitivity | {cost concerns} | {discount/payment plans} |
| Feature Uncertainty | {unclear value prop} | {demo/education} |
| Decision Authority | {not the buyer} | {stakeholder materials} |
| Integration Concerns | {technical blockers} | {support/docs} |
| Time Constraints | {evaluation incomplete} | {trial extension} |

### 4. Define Success Metrics

Establish conversion success metrics:

| Metric | Target | Measurement |
|--------|--------|-------------|
| Trial-to-Paid Rate | {X%} | Conversions / Trial Starts |
| Time to Convert | {X days} | Avg days from trial start |
| Revenue per Trial | {$X} | Total revenue / Trials |
| Feature Adoption | {X features used} | Avg features used in trial |
| Activation Rate | {X%} | Activated / Trial Starts |

**Verify current best practices with web search:**
Search the web: "SaaS trial conversion best practices {date}"
Search the web: "trial to paid conversion optimization strategies {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the trial analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific trial configurations
- **P (Party Mode)**: Bring product and growth perspectives on trial model
- **C (Continue)**: Accept trial analysis and proceed to engagement tracking design
- **[Specific refinements]**: Describe trial concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: trial configuration, conversion triggers, barriers
- Process enhanced insights on trial optimization
- Ask user: "Accept these refined trial insights? (y/n)"
- If yes, integrate into trial analysis
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review trial model for multi-tenant platform conversion optimization"
- Process product owner and growth perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save trial analysis to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-design-engagement-tracking.md`

---

## Verification

- [ ] Trial configuration documented
- [ ] Conversion triggers identified
- [ ] Barriers mapped with mitigations
- [ ] Success metrics defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Trial configuration summary
- Conversion trigger matrix
- Barrier mitigation strategies
- Success metrics framework

---

## Next Step

Proceed to `step-02-c-design-engagement-tracking.md` to design engagement tracking.
