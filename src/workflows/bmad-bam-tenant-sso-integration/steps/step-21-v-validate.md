# Step 21: Validate Tenant SSO Integration

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- **ALWAYS pause after presenting findings** and await user direction
- **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array

---

## Purpose

Validate the tenant SSO integration design against quality criteria.

---

## Prerequisites

- Step 20: Load Artifact completed successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `sso-authentication`

## Quality Gate

**Gate:** QG-S5 (Security - SSO Integration)

---

## Inputs

- Loaded artifact from validation step 20
- Quality gate criteria and checklist
- Pattern registry for validation rules

---

## Actions

### 1. Validate Protocol Configuration

| Check | Requirement | Status |
|-------|-------------|--------|
| SAML metadata | Complete SP metadata | |
| OIDC discovery | Well-known endpoint | |
| Token validation | Signature verification | |

### 2. Validate IdP Integration

| Check | Requirement | Status |
|-------|-------------|--------|
| IdP registration | Self-service or admin | |
| Metadata exchange | Automated or manual | |
| Multi-IdP support | Per-tenant configuration | |

### 3. Validate Session Management

| Check | Requirement | Status |
|-------|-------------|--------|
| Session lifetime | Configurable per tenant | |
| Single logout | SLO implementation | |
| Session revocation | Admin capabilities | |

---

## Verification

- [ ] SAML 2.0 SP metadata complete
- [ ] OIDC client configuration documented
- [ ] IdP onboarding procedure documented
- [ ] Session timeout configurable
- [ ] Single logout implemented
- [ ] Patterns align with pattern registry

---

## Gate Decision

- **PASS**: All protocol configs complete
- **CONDITIONAL**: Minor gaps - document and proceed
- **FAIL**: Missing protocol config - return to Create mode

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation findings
- **P (Party Mode)**: Bring analyst and architect perspectives
- **C (Continue)**: Proceed to generate report

Select an option:
```

#### If 'C' (Continue):
- Save validation results
- Update frontmatter `stepsCompleted: [20, 21]`
- Proceed to next step: `step-22-v-generate-report.md`

---

## Outputs

- Validated tenant SSO integration design
- Validation gate decision (PASS/CONDITIONAL/FAIL)

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate the validation report.
