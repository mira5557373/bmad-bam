# Step 20: Load Authentication Architecture for Validation

## Purpose

Load authentication architecture and quality gate criteria for validation.

## Actions

### 1. Load Architecture Document

Read: `{output_folder}/planning-artifacts/auth-integration.md`

### 2. Load Quality Gate Checklists

- **QG-S4:** `{project-root}/_bmad/bam/data/checklists/qg-s4.md`
- **QG-S5:** `{project-root}/_bmad/bam/data/checklists/qg-s5.md`
- **QG-M2:** `{project-root}/_bmad/bam/data/checklists/qg-m2.md` (tenant isolation)

### 3. Load Security Patterns

Read: `{project-root}/_bmad/bam/data/patterns/sso-auth.md`

### 4. Identify Validation Scope

| Component | Validate | Gate |
|-----------|----------|------|
| SSO Configuration | Yes | QG-S4 |
| IdP Integration | Yes | QG-S4 |
| OAuth Provider | Yes | QG-S4 |
| API Key Management | Yes | QG-S4 |
| Session Management | Yes | QG-S5 |
| Tenant Isolation | Yes | QG-M2 |

## Outputs

- Architecture document loaded
- Validation criteria ready
- Scope defined

## Next Step

Proceed to `step-21-v-validate.md` to run validation checks.
