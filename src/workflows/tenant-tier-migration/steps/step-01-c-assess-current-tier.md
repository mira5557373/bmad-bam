# Step 1: Assess Current Tier

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

Assess the current tier configuration and identify all tier-specific features, limits, and capabilities that will be affected during migration.

---

## Prerequisites

- Master architecture document loaded with tier definitions
- Tenant onboarding design with tier specifications
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-lifecycle
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`

---


## Inputs

- User requirements and constraints for tenant tier migration
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Document Tier Definitions

Identify and document all tiers in the platform:

| Tier | Features Included | Limits | Pricing Model |
|------|-------------------|--------|---------------|
| FREE | {base features} | {quotas} | {model} |
| PRO | {enhanced features} | {quotas} | {model} |
| ENTERPRISE | {full features} | {quotas} | {model} |

### 2. Map Feature Differences

Create a feature matrix showing differences between tiers:

| Feature | FREE | PRO | ENTERPRISE | Migration Impact |
|---------|------|-----|------------|------------------|
| {feature_1} | [ ] | [x] | [x] | {impact} |
| {feature_2} | [ ] | [ ] | [x] | {impact} |
| {feature_3} | [x] | [x] | [x] | None |

### 3. Identify Resource Limits

Document resource limits per tier:

| Resource | FREE Limit | PRO Limit | ENTERPRISE Limit |
|----------|------------|-----------|------------------|
| API calls/day | {limit} | {limit} | {limit} |
| Storage (GB) | {limit} | {limit} | {limit} |
| Users | {limit} | {limit} | {limit} |
| AI agents | {limit} | {limit} | {limit} |

### 4. Assess Data Isolation Requirements

Evaluate if tier migration affects data isolation:

| Aspect | Upgrade Impact | Downgrade Impact |
|--------|---------------|------------------|
| Database schema | {change needed?} | {change needed?} |
| Storage location | {change needed?} | {change needed?} |
| Compute resources | {change needed?} | {change needed?} |

**Verify current best practices with web search:**
Search the web: "assess current tier best practices {date}"
Search the web: "assess current tier enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the tier assessment above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific tier configurations
- **P (Party Mode)**: Bring product and billing perspectives on tier definitions
- **C (Continue)**: Accept tier assessment and proceed to migration planning
- **[Specific refinements]**: Describe tier concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: tier definitions, feature matrices, resource limits
- Process enhanced insights on tier complexity
- Ask user: "Accept these refined tier definitions? (y/n)"
- If yes, integrate into tier assessment
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tier definitions for multi-tenant platform migration planning"
- Process product owner and billing perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save tier assessment to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-plan-migration.md`

---

## Verification

- [ ] All tiers documented (FREE, PRO, ENTERPRISE)
- [ ] Feature matrix completed
- [ ] Resource limits documented
- [ ] Data isolation impact assessed
- [ ] Patterns align with pattern registry

---

## Outputs

- Tier definitions summary
- Feature difference matrix
- Resource limits table
- Data isolation assessment
- **Load template:** `{project-root}/_bmad/bam/templates/tier-migration-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/tier-journey-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/tier-journey-map-template.md`

---

## Next Step

Proceed to `step-02-c-plan-migration.md` to plan migration paths.
