# Step 1: Load Existing Secrets Management Plan

## MANDATORY EXECUTION RULES (READ FIRST)

- STOP **NEVER generate content without user input** - Wait for explicit direction
- BOOK **CRITICAL: ALWAYS read the complete step file** before taking any action
- CYCLE **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- PAUSE **ALWAYS pause after presenting findings** and await user direction
- TARGET **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- TARGET Show your analysis before taking any action
- SAVE Update document frontmatter after each section completion
- MEMO Maintain append-only document building
- CHECK Track progress in `stepsCompleted` array

---

## Purpose

This step loads the existing secrets management plan for modification. Edit mode allows updates to secret classification, vault configuration, rotation policies, or access control without recreating the entire plan.

## Prerequisites

- Existing secrets management plan document to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: security


---

## Inputs

- Existing artifact file path
- User-specified modifications
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Secrets Management Plan Document

Load the existing plan:
- `{output_folder}/planning-artifacts/secrets-management-plan.md`

If the file does not exist, inform the user and suggest switching to Create mode.

### 2. Parse Document Structure

Parse and display a summary of the current plan:

**Document Sections:**
- Executive Summary
- Secret Classification (types, sensitivity, lifecycle)
- Vault Architecture (deployment, auth, engines)
- Rotation Policies (schedules, automation, emergency)
- Operational Runbooks
- Access Control (RBAC, policies)
- Review Schedule

### 3. Identify Modification Areas

Present modification options:

| Section | Common Updates |
|---------|---------------|
| Secret Classification | Add types, adjust sensitivity |
| Vault Architecture | Update auth methods, add engines |
| Rotation Policies | Modify schedules, add automation |
| Runbooks | Add procedures, update steps |
| Access Control | Update roles, adjust permissions |

### 4. Confirm Modification Scope

Present options to user and document confirmed scope.

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### Menu Options

### [A]nalyze Options
- **A1**: Review current plan structure
- **A2**: Analyze secret classification effectiveness
- **A3**: Evaluate vault configuration
- **A4**: Assess rotation compliance

### [P]ropose Changes
- **P1**: Propose classification updates
- **P2**: Suggest vault improvements
- **P3**: Recommend rotation adjustments
- **P4**: Propose access control changes

### [C]ontinue
- **C1**: Accept modification scope and proceed
- **C2**: Mark step complete and load `step-11-e-apply-secrets-changes.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Existing secrets management plan loaded successfully
- [ ] Document structure parsed correctly
- [ ] All sections identified
- [ ] Modification scope confirmed with user

## Outputs

- Summary of current secrets management plan
- Confirmed list of sections to modify
- Change rationale documented

## Next Step

Proceed to `step-11-e-apply-secrets-changes.md` with identified modification targets.
