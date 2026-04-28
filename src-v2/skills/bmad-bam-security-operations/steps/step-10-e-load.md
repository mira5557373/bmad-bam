# Step 10: Load Existing Security Operations Design (Edit Mode)

## MANDATORY EXECUTION RULES

- STOP NEVER proceed without locating the existing security-operations.md file
- READ ALWAYS read the complete document including frontmatter metadata
- LOOP ALWAYS parse all sections (secrets, threats, incidents)
- PAUSE **ALWAYS pause after presenting findings** and await user direction
- CHECK EXTRACT all configurations, policies, and runbooks
- LIST PRESENT a structured summary of current security operations before accepting edits
- CHAT PAUSE after summary presentation and await user edit selection
- TARGET IDENTIFY QG-S3 and QG-IR status from frontmatter
- WARN FLAG any sections marked as "TODO" or incomplete

---

## EXECUTION PROTOCOLS

- TARGET Focus: Load and parse existing security operations design for modification
- SAVE Track: Document load status and parse results
- READ Context: Extract secrets policies, threat mitigations, incident procedures
- STOP Do NOT: Modify any content during load phase
- WARN Gate: Changes may invalidate QG-S3 or QG-IR compliance status
- SEARCH Use web search: Only if user requests updated security practices

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Loading existing artifact
- Presenting current state summary
- Identifying edit targets

**OUT OF SCOPE:**
- Creating new artifacts (use Create mode)
- Validation (use Validate mode)
- Making changes (step-11)

## YOUR TASK

Load the existing security operations design document, parse its structure, extract the current configuration including secrets management, threat modeling, and incident response sections. Present a summary showing what can be edited and enable the user to select specific sections for modification.

---

## Purpose

Load and review existing security operations design to identify sections requiring modification based on new requirements, policy updates, or organizational changes.

---

## Prerequisites

- Existing security operations document to modify
- **Load artifact:** `{output_folder}/planning-artifacts/security-operations.md`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-s3.md`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-ir.md`

---

## Actions

### 1. Load Existing Documents

Load the existing security operations design:
- `{output_folder}/planning-artifacts/security-operations.md`

If the file does not exist, inform the user and suggest switching to Create mode.

### 2. Parse Document Structure

Parse and display a summary of the current security operations design:

| Section | Status | Last Updated | Key Configuration |
|---------|--------|--------------|-------------------|
| Secrets Management (ZSR) | YES/NO | {date} | {vault provider, rotation policies} |
| Threat Modeling (ZST) | YES/NO | {date} | {STRIDE coverage, attack trees} |
| Incident Response (ZIR) | YES/NO | {date} | {severity levels, runbook count} |
| Quality Gate Status | QG-S3: {status}, QG-IR: {status} | {date} | {pass/conditional/fail} |

### 3. Extract Section Details

**Secrets Management Summary:**
- Vault provider: {provider}
- Secret types: {count} defined
- Rotation policies: {count} active
- Agent credentials: {configured/not configured}

**Threat Modeling Summary:**
- Components analyzed: {count}
- STRIDE coverage: {complete/partial}
- Attack trees: {count} documented
- Mitigations mapped: {count}

**Incident Response Summary:**
- Severity levels: {P0-P3 defined}
- Escalation matrix: {complete/partial}
- Runbooks: {count} documented
- Tenant notification: {configured/not configured}

### 4. Identify Potential Updates

Check for potential updates needed:

| Area | Document Version | Current Best Practice | Update Needed |
|------|------------------|----------------------|---------------|
| Vault provider | {version} | {current} | YES/NO |
| STRIDE methodology | {version} | {current} | YES/NO |
| Incident SLAs | {version} | {current} | YES/NO |
| AI safety | {version} | {current} | YES/NO |

### 5. Gather Modification Requirements

Collect user input on required changes:

| Change Category | Examples |
|-----------------|----------|
| Secrets updates | New secret types, rotation changes, vault migration |
| Threat updates | New components, additional attack vectors, AI threats |
| Incident updates | SLA changes, escalation updates, new runbooks |
| Organization changes | Team changes, contact updates, process changes |
| Compliance updates | New requirements, audit findings |

### 6. Present Edit Summary

**Display current state and available edit targets:**

```
================================================================================
SECURITY OPERATIONS - EDIT MODE
================================================================================
Document: security-operations.md
Version: {version}
Quality Gates: QG-S3 {status}, QG-IR {status}
================================================================================

CURRENT COVERAGE:
1. Secrets (ZSR):      {secret_count} types, {rotation_policies} rotation policies
2. Threats (ZST):      {component_count} components, {mitigation_count} mitigations
3. Incidents (ZIR):    {runbook_count} runbooks, {severity_levels} severity levels

EDITABLE SECTIONS:
[1] Secrets Management - Update vault, rotation, agent credentials
[2] Threat Modeling - Add components, update attack trees, new mitigations
[3] Incident Response - Update SLAs, escalation, add runbooks
[4] AI Safety - Update AI-specific threats, guardrails, kill switch
[5] Tenant Notification - Update notification templates, SLAs
[6] Quality Gate Evidence - Update compliance evidence
[7] Full Document - Major restructure (requires re-validation)

================================================================================
Select section(s) to edit (comma-separated) or 'C' to cancel:
```

---

## SUCCESS METRICS

- CHECK Document located and fully loaded
- CHECK Frontmatter parsed with all metadata extracted
- CHECK Secrets management section parsed
- CHECK Threat modeling section parsed
- CHECK Incident response section parsed
- CHECK Quality gate status identified
- CHECK Edit summary presented to user
- CHECK User has selected edit target(s)

---

## FAILURE MODES

- X **Document not found:** Redirect to Create mode or request alternate path
- X **Invalid frontmatter:** Attempt recovery, flag missing fields
- X **Incomplete sections:** Flag sections needing completion before edit
- X **QG already failed:** Warn that edits require full re-validation
- X **Missing sub-workflow:** Cannot edit ZSR/ZST/ZIR if not present

---

## Verification

- [ ] Existing security operations design loaded successfully
- [ ] Document structure understood
- [ ] All three sub-workflows parsed (ZSR, ZST, ZIR)
- [ ] Quality gate status identified
- [ ] Sections for modification identified

---

## Outputs

- Summary of current security operations state
- Quality gate status assessment
- List of required modifications with impact assessment

---

## Next Step

Proceed to `step-11-e-apply.md` with identified modifications.
