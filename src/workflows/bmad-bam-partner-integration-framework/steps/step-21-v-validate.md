# Step 21: Validate Partner Framework

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

Validate the partner framework against quality criteria.

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: partner-integration
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/production-readiness.md`

## Actions

Perform the following validation checks:

### Validation Checklist

### Partner Tiers
- [ ] Partner types cataloged
- [ ] Tier benefits defined
- [ ] Access levels planned
- [ ] Certification paths designed

### Sandbox Environment
- [ ] Sandbox provisioning configured
- [ ] Data isolation set up
- [ ] Resource limits planned
- [ ] Testing capabilities designed

### Certification Program
- [ ] Certification levels defined
- [ ] Testing criteria designed
- [ ] Review process planned
- [ ] Badge system created

### Revenue Model
- [ ] Revenue sharing designed
- [ ] Billing integration configured
- [ ] Co-selling arrangements planned
- [ ] Reporting dashboards created

## Gate Decision

- **PASS**: Complete framework, certification ready, revenue model defined
- **CONDITIONAL**: Minor gaps - document and proceed
- **FAIL**: Missing tiers, no certification, or no revenue model

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

---

## Verification

- [ ] All checklist items evaluated
- [ ] Gate decision determined
- [ ] Findings documented per component
- [ ] Patterns align with pattern registry

## Outputs

- Validation report
- Pass/Fail determination
- Specific findings per component

## Next Step

Proceed to `step-22-v-generate-report.md` to generate validation report.
