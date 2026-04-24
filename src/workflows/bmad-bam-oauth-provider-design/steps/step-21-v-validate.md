# Step 21: Validate OAuth Provider Design

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

Validate the OAuth provider design against security and quality criteria.

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: oauth2
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-p1-production-readiness.md`

## Actions

Perform the following validation checks:

### Validation Checklist

### Authorization Flows
- [ ] OAuth2 grant types configured
- [ ] Consent experience designed
- [ ] Redirect handling planned
- [ ] PKCE support set up

### Token Management
- [ ] Token lifecycle designed
- [ ] Refresh strategy planned
- [ ] Token storage configured
- [ ] Revocation set up

### Scopes and Permissions
- [ ] Scope taxonomy created
- [ ] Scopes mapped to APIs
- [ ] Tenant-specific scopes planned
- [ ] Consent prompts designed

## Gate Decision

- **PASS**: Complete OAuth implementation, security validated
- **CONDITIONAL**: Minor gaps - document and proceed
- **FAIL**: Missing flows, no token management, or security issues

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
