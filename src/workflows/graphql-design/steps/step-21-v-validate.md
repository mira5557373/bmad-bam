# Step 21: Validate GraphQL Design

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array

---

## Purpose

Validate the GraphQL design against quality criteria.

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: graphql
- **Load checklist:** `{project-root}/_bmad/bam/checklists/production-readiness.md`

## Actions

Perform the following validation checks:

### Validation Checklist

### Schema Architecture
- [ ] Type system defined
- [ ] Schema organization planned
- [ ] Federation boundaries designed
- [ ] Directives configured

### Resolvers
- [ ] Resolver architecture designed
- [ ] Data loaders planned
- [ ] Tenant context configured
- [ ] N+1 optimization addressed

### Query Optimization
- [ ] Query complexity limits designed
- [ ] Caching strategy planned
- [ ] Rate limiting configured
- [ ] Monitoring set up

## Gate Decision

- **PASS**: Complete GraphQL implementation, performance optimized
- **CONDITIONAL**: Minor gaps - document and proceed
- **FAIL**: Missing schema, no resolvers, or performance issues

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
- Gap analysis (if any)
- Recommendations

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate validation report.
