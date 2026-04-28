# Step 20: Load Privacy Compliance Design for Validation

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- **ALWAYS pause after presenting findings** and await user direction
- **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- Focus: Load privacy compliance artifact and QG-CC checklist
- Track: `stepsCompleted: [20]` when complete
- Context: Prepare for systematic validation against criteria
- Do NOT: Begin validation yet - only load required materials
- Use web search: Not required for validation loading

---


## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Loading artifact and checklist
- Preparing validation criteria
- Documenting validation scope

**OUT OF SCOPE:**
- Modifying the artifact
- Creating new content
- Executing validation checks

## YOUR TASK

Load the privacy compliance artifact created in Create mode. If the artifact does not exist, inform the user and suggest switching to Create mode. Prepare all validation criteria from QG-CC checklist for systematic verification of privacy compliance requirements.

---

## Purpose

Load the privacy compliance artifact and validation checklist to prepare for systematic validation against GDPR, CCPA, and continuous compliance quality gate criteria.

## Prerequisites

- Privacy compliance artifact exists at `{output_folder}/planning-artifacts/compliance/privacy-compliance.md`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-cc.md`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` - filter: `privacy-*`

## Actions

### 1. Load Privacy Compliance Artifact

Read the privacy compliance document:
```
{output_folder}/planning-artifacts/compliance/privacy-compliance.md
```

**Parse and index all sections:**
- Compliance Context
- Data Subject Rights
- Lawful Basis Tracking
- Data Portability
- Consent Management
- Quality Gate Checklist (if embedded)

### 2. Load Validation Criteria

Load the QG-CC (Continuous Compliance) validation checklist:

**Privacy Compliance Validation Criteria:**

| Category | Criteria | Weight |
|----------|----------|--------|
| **Data Subject Rights** | All GDPR Articles 15-22 addressed | CRITICAL |
| **Tenant Isolation** | Rights fulfillment tenant-scoped | CRITICAL |
| **Lawful Basis** | All processing has documented basis | CRITICAL |
| **Consent Proof** | Evidence captured for consent | CRITICAL |
| **Data Export** | Machine-readable format available | Required |
| **Withdrawal** | Consent withdrawal immediate | Required |
| **Timeline** | Rights fulfilled within GDPR timeline | Required |
| **CCPA** | Disclosure requirements met (if applicable) | Required |
| **Audit Trail** | All compliance events logged | Required |
| **Processing Register** | Article 30 register maintained | Recommended |

### 3. Identify Validation Scope

Determine what to validate:

| Scope | Description | Applicable |
|-------|-------------|------------|
| **Full Validation** | All sections against all criteria | [Yes/No] |
| **Section Validation** | Specific section only | [Section name] |
| **Framework Validation** | Specific framework (GDPR/CCPA) | [Framework] |
| **Post-Edit Validation** | Changed sections only | [List changes] |

### 4. Prepare Validation Context

Document validation setup:

```markdown
## Validation Context

**Artifact:** {output_folder}/planning-artifacts/compliance/privacy-compliance.md
**Checklist:** QG-CC (Continuous Compliance)
**Scope:** [Full | Section | Framework | Post-Edit]

### Sections to Validate:
- [ ] Compliance Context
- [ ] Data Subject Rights
- [ ] Lawful Basis Tracking
- [ ] Data Portability
- [ ] Consent Management

### Criteria Categories:
- [ ] Data Subject Rights (CRITICAL)
- [ ] Tenant Isolation (CRITICAL)
- [ ] Lawful Basis (CRITICAL)
- [ ] Consent Proof (CRITICAL)
- [ ] Timeline Compliance (Required)
- [ ] Best Practices (Recommended)

### Applicable Frameworks:
- [ ] GDPR
- [ ] CCPA
- [ ] Other: [specify]

**Ready for validation.**
```

---

## SUCCESS METRICS

- Privacy compliance artifact loaded successfully
- Document metadata extracted and displayed
- All privacy sections parsed
- Consent configurations extracted
- Lawful basis mappings loaded
- QG-CC checklist loaded and understood
- Validation readiness confirmed by user
- Create mode steps completed in artifact

---

## FAILURE MODES

- **Artifact not found:** Redirect to Create mode
- **Missing frontmatter:** Cannot extract version/frameworks
- **Incomplete Create mode:** stepsCompleted missing required steps
- **QG-CC checklist not found:** Verify BAM installation
- **Missing sections:** Flag sections needing completion

---

## Verification

- [ ] Privacy compliance artifact loaded
- [ ] All sections parsed and indexed
- [ ] QG-CC checklist loaded
- [ ] Validation scope determined
- [ ] Validation context documented
- [ ] Ready to proceed with validation

## Outputs

- Parsed privacy compliance (in working memory)
- Validation criteria loaded
- Validation scope defined
- Validation context summary

## Next Step

Proceed to `step-21-v-validate.md` to perform systematic validation.

---

**Navigation:** Enter 'C' to continue to validation
