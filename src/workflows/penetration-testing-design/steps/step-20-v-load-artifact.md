# Step 20: Load Artifact (Validate Mode)

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array

---

## Purpose

Load the penetration testing design documents for validation against quality criteria for test coverage, methodology completeness, and compliance alignment.

---

## Prerequisites

- Penetration testing design artifact exists to validate
- **Load checklist:** `{project-root}/_bmad/bam/checklists/qg-i3-agent-safety.md`

---

## Actions

### 1. Load Existing Documents

Load the existing penetration testing design documents:
- `{output_folder}/planning-artifacts/security/penetration-testing-plan.md`
- `{output_folder}/planning-artifacts/security/test-cases.md`
- `{output_folder}/planning-artifacts/security/reporting-procedures.md`

If the files do not exist, inform the user and suggest switching to Create mode.

### 2. Pre-Validation Check

| Component | Present | Status |
|-----------|---------|--------|
| Scope definition | Yes/No | {ready/incomplete} |
| Rules of engagement | Yes/No | {ready/incomplete} |
| Test categories | Yes/No | {ready/incomplete} |
| Tenant isolation tests | Yes/No | {ready/incomplete} |
| AI agent tests | Yes/No | {ready/incomplete} |
| Severity framework | Yes/No | {ready/incomplete} |
| Reporting procedures | Yes/No | {ready/incomplete} |
| Remediation workflow | Yes/No | {ready/incomplete} |

---

## COLLABORATION MENUS (A/P/C):

After loading the artifact, present options and proceed to `step-21-v-validate.md` when ready.

---

## Outputs

- Validation context prepared
- Document structure parsed

---

## Verification

- [ ] Artifact loaded successfully
- [ ] All required sections present
- [ ] Pre-validation check completed
- [ ] Patterns align with pattern registry

---

## Next Step

Proceed to `step-21-v-validate.md` to run validation checks.
