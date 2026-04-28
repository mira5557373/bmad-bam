# Step 20: Load Security Operations for Validation (Validate Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- STOP **NEVER generate content without user input** - Wait for explicit direction
- READ **CRITICAL: ALWAYS read the complete step file** before taking any action
- LOOP **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- PAUSE **ALWAYS pause after presenting findings** and await user direction
- TARGET **Focus ONLY on current step scope** - do not look ahead
- SEARCH **LOAD QG-S3 and QG-IR checklists** - These are the validation gates
- LIST **VERIFY artifact exists** before proceeding to validation checks

## EXECUTION PROTOCOLS

- TARGET Focus: Load security operations artifact and validation checklists
- SAVE Track: `stepsCompleted: [20]` when complete
- READ Context: Validate mode verifies existing artifact against security criteria
- STOP Do NOT: Generate new content; Edit mode handles modifications
- SEARCH Use web search: Verify current security best practices
- WARN Gate: QG-S3 (Security Baseline) and QG-IR (Incident Response)

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Loading artifact and checklists
- Preparing validation criteria
- Assessing document completeness

**OUT OF SCOPE:**
- Modifying the artifact
- Creating new content
- Executing validation checks (step-21)

## YOUR TASK

Load the security operations design artifact created in Create or Edit mode. If the artifact does not exist, inform the user and suggest switching to Create mode. Prepare all validation criteria from QG-S3 and QG-IR checklists for systematic verification.

---

## Purpose

Load the security operations artifact and validation checklists to prepare for systematic validation against quality gate criteria.

---

## Prerequisites

- Security operations document exists (from Create or Edit mode)
- **Load artifact:** `{output_folder}/planning-artifacts/security-operations.md`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-s3.md` (Security Baseline)
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-ir.md` (Incident Response)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `security`

---

## Actions

### 1. Load Security Operations Artifact

Load the security operations document:
- `{output_folder}/planning-artifacts/security-operations.md`

If the file does not exist:
- Inform user that validation requires an existing artifact
- Suggest running Create mode first

### 2. Parse Document Completeness

Verify all required sections are present:

| Section | Required | Present | Status |
|---------|----------|---------|--------|
| Executive Summary | Yes | YES/NO | OK/MISSING |
| Secrets Management (ZSR) | Yes | YES/NO | OK/MISSING |
| - Secret Inventory | Yes | YES/NO | OK/MISSING |
| - Rotation Policies | Yes | YES/NO | OK/MISSING |
| - Vault Configuration | Yes | YES/NO | OK/MISSING |
| Threat Modeling (ZST) | Yes | YES/NO | OK/MISSING |
| - STRIDE Analysis | Yes | YES/NO | OK/MISSING |
| - Attack Trees | Yes | YES/NO | OK/MISSING |
| - Mitigations | Yes | YES/NO | OK/MISSING |
| Incident Response (ZIR) | Yes | YES/NO | OK/MISSING |
| - Severity Matrix | Yes | YES/NO | OK/MISSING |
| - Escalation Procedures | Yes | YES/NO | OK/MISSING |
| - Runbooks | Yes | YES/NO | OK/MISSING |
| - Tenant Notification | Yes | YES/NO | OK/MISSING |

### 3. Load Validation Checklists

Load the applicable quality gate checklists:

**QG-S3 Security Baseline (Key Checks):**
- [ ] Secrets encrypted at rest (AES-256)
- [ ] Tenant secrets isolated by namespace/path
- [ ] Rotation automation in place
- [ ] Agent tokens are short-lived (<1 hour)
- [ ] **CRITICAL:** No secrets in code, logs, or environment dumps
- [ ] STRIDE analysis covers all components
- [ ] Threat mitigations documented

**QG-IR Incident Response (Key Checks):**
- [ ] Severity classification matrix documented
- [ ] Response time SLAs defined
- [ ] Escalation paths documented with contacts
- [ ] Runbooks exist for P0/P1 scenarios
- [ ] **CRITICAL:** Postmortem process enforced
- [ ] Tenant notification procedures documented

### 4. Extract Validation Context

Extract key information for validation:

| Context Item | Value |
|--------------|-------|
| Document version | {version} |
| Last updated | {date} |
| Tenant model | {tenant_model} |
| Secret types defined | {count} |
| Components analyzed | {count} |
| Runbooks documented | {count} |
| QG-S3 previous status | {status} |
| QG-IR previous status | {status} |

### 5. Prepare Validation Criteria

Map security operations to validation criteria:

**Secrets Management (QG-S3):**

| Requirement | Expected | Documented | Gap |
|-------------|----------|------------|-----|
| Vault provider | Specified | {status} | {gap} |
| Rotation policies | All types covered | {status} | {gap} |
| Zero-downtime rotation | Designed | {status} | {gap} |
| Agent credentials | Short-lived tokens | {status} | {gap} |

**Threat Modeling (QG-S3):**

| Requirement | Expected | Documented | Gap |
|-------------|----------|------------|-----|
| STRIDE coverage | All components | {status} | {gap} |
| Attack trees | Critical paths | {status} | {gap} |
| Mitigations | All high/critical | {status} | {gap} |
| AI threats | If applicable | {status} | {gap} |

**Incident Response (QG-IR):**

| Requirement | Expected | Documented | Gap |
|-------------|----------|------------|-----|
| Severity levels | P0-P3 defined | {status} | {gap} |
| Response SLAs | Per severity | {status} | {gap} |
| Escalation matrix | With contacts | {status} | {gap} |
| Runbooks | P0, P1 minimum | {status} | {gap} |
| Postmortem process | Defined | {status} | {gap} |

---

## COLLABORATION MENUS (A/P/C):

After loading the artifact and checklists, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Clarify validation scope and criteria
- **P (Party Mode)**: Bring security and audit perspectives on validation approach
- **C (Continue)**: Proceed to validation execution
- **[Specific section]**: Focus validation on ZSR, ZST, or ZIR

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: document state, applicable checklists, validation scope
- Clarify validation priorities
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Prepare for security operations validation"
- Present security and audit perspective on validation approach
- Return to A/P/C menu

#### If 'C' (Continue):
- Proceed to validation execution
- Next step: `step-21-v-validate.md`

---

## SUCCESS METRICS

- CHECK Security operations artifact loaded successfully
- CHECK Document metadata extracted and displayed
- CHECK QG-S3 and QG-IR checklists loaded and understood
- CHECK All three sub-workflows present (ZSR, ZST, ZIR)
- CHECK Validation readiness confirmed by user

---

## FAILURE MODES

- X **Artifact not found:** Redirect to Create mode
- X **Missing frontmatter:** Cannot extract version/sections
- X **Incomplete Create mode:** stepsCompleted missing required steps
- X **QG checklists not found:** Verify BAM installation

---

## Verification

- [ ] Security operations document loaded successfully
- [ ] Document structure completeness assessed
- [ ] Validation checklists loaded
- [ ] Validation context extracted
- [ ] Section coverage identified

---

## Outputs

- Document completeness summary
- Loaded validation checklists
- Validation context and criteria
- Section coverage analysis

---

## Next Step

Proceed to `step-21-v-validate.md` to execute validation checks.
