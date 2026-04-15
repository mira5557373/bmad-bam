# Step 21: Validate Tenant Model Isolation

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array

---

## Purpose

Validate the tenant model and isolation artifacts against quality criteria and multi-tenant architecture standards.

---

## Prerequisites

- Previous step completed (step-20-v-load-artifact.md)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`
- **Load quality gate:** `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-S7,QG-DC1`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/tenant-isolation.md`



---

## Inputs

- Loaded artifact from validation step 20
- Quality gate criteria and checklist
- Pattern registry for validation rules
- Previous validation findings (if re-validating)

---

## Actions

### 1. Load Artifact

- Read the artifact from `{output_folder}/` specified location
- Parse and validate structure

### 2. Validate Content

- Check all required sections are present
- Verify cross-references are valid
- Validate against quality gate checklist

### 3. Generate Findings

- Document any issues found
- Categorize by severity (Critical/High/Medium/Low)

---

---

## Validation Checklist

### Tenant Model Definition
- [ ] Tenant entity structure defined (id, name, slug, tier, status, settings)
- [ ] Plan/tier model defined (FREE / PRO / ENTERPRISE or custom)
- [ ] Tenant lifecycle states defined (provisioning → active → suspended → archived → deleted)

### Isolation Matrix Completeness
- [ ] Database rows isolation strategy defined
- [ ] Cache entries isolation strategy defined
- [ ] Log entries isolation strategy defined
- [ ] Agent memory isolation strategy defined
- [ ] AI tools isolation strategy defined
- [ ] Background jobs isolation strategy defined
- [ ] Vector embeddings isolation strategy defined
- [ ] Analytics data isolation strategy defined
- [ ] File storage isolation strategy defined
- [ ] Search indices isolation strategy defined
- [ ] All asset types have explicit isolation strategy (no gaps)

### Context Propagation
- [ ] JWT claim extraction → TenantContext middleware defined
- [ ] Async job propagation defined
- [ ] Event context passing defined
- [ ] WebSocket connection state defined
- [ ] Outbound webhook headers defined
- [ ] No boundary exists without tenant context propagation

### Data Sharing Rules
- [ ] Cross-tenant data limited to admin/control-plane only
- [ ] Shared reference data explicitly listed
- [ ] No implicit sharing of tenant-specific data

### Compliance
- [ ] GDPR data export requirements documented per tenant
- [ ] Data deletion requirements documented (right to be forgotten)
- [ ] Audit trail requirements documented
- [ ] Data residency considerations addressed

### Cross-Cutting Safety
- [ ] No asset type allows cross-tenant data leakage
- [ ] Isolation matrix is consistent with master architecture tenant model section
- [ ] All isolation strategies are implementable with the chosen technology stack
- [ ] Patterns align with pattern registry

### QG-S7 Data Protection Gate Verification
**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-S7`

- [ ] **classification_implemented** (REQUIRED): Data classification scheme applied to tenant data types
- [ ] **dlp_policies_active**: Data loss prevention policies defined for cross-tenant boundaries
- [ ] **encryption_verified** (REQUIRED): Encryption requirements documented per data sensitivity level
- [ ] **access_logging_active** (REQUIRED): Access logging enabled for all tenant data operations
- [ ] **retention_enforced**: Data retention policies defined per data category

**QG-S7 verification_tests (from CSV):** classification_implemented, encryption_verified, access_logging_active

**QG-S7 Required Patterns:**
| Pattern | Required | Status | Evidence |
|---------|----------|--------|----------|
| classification_implemented | **YES** | [ ] Pass / [ ] Fail | Isolation matrix sensitivity column |
| dlp_policies_active | NO | [ ] Pass / [ ] Fail | Cross-tenant sharing rules |
| encryption_verified | **YES** | [ ] Pass / [ ] Fail | Encryption requirements per asset |
| access_logging_active | **YES** | [ ] Pass / [ ] Fail | Audit trail specification |
| retention_enforced | NO | [ ] Pass / [ ] Fail | Compliance mapping retention section |

**QG-S7 Data Protection Gate:** [ ] SATISFIED / [ ] NOT SATISFIED

### QG-DC1 Data Classification Contribution Verification
**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-DC1`

This workflow contributes to QG-DC1 (Data Classification):

| QG-DC1 Pattern | Required | Status | Evidence |
|----------------|----------|--------|----------|
| `classification_scheme_defined` | **YES** | [ ] Pass / [ ] Fail | Sensitivity levels in isolation matrix |
| `data_inventory_complete` | NO | [ ] Pass / [ ] Fail | All asset types inventoried |
| `sensitivity_labels_applied` | **YES** | [ ] Pass / [ ] Fail | Labels (PUBLIC/INTERNAL/CONFIDENTIAL/RESTRICTED) assigned |
| `handling_procedures_documented` | NO | [ ] Pass / [ ] Fail | Sharing rules and handling in step 4 |

**QG-DC1 verification_tests (from CSV):** classification_scheme_defined, sensitivity_labels_applied

**QG-DC1 Data Classification contribution:** [ ] SATISFIED / [ ] NOT SATISFIED

---

## Gate Decision

- **PASS**: All asset types covered, all boundaries have context propagation, no implicit sharing, compliance documented, QG-S7 patterns verified
- **CONDITIONAL**: Minor gaps (e.g., data residency not yet decided) — document gaps, proceed with QG-S7 mitigation plan
- **FAIL**: Missing isolation strategy for any asset type, missing context propagation for any boundary, implicit tenant data sharing detected, or QG-S7 critical patterns failing — return to Create mode

### QG-S7 Exit Criteria
This workflow is the entry workflow for QG-S7. Upon PASS:
- QG-S7 data protection patterns are satisfied
- Workflow exits to QG-S5 (Continuous Security Gate) as next gate in sequence

Present validation results with specific findings for each section.

---

## Error Handling

### FAIL Outcome Recovery Steps

#### Step 1: Categorize the Failure
Identify which category caused the FAIL:

| Failure Category | Severity | Recovery Path |
|------------------|----------|---------------|
| Missing isolation strategy | CRITICAL | Return to 02-isolation-matrix-creation.md |
| Missing context propagation | CRITICAL | Return to 03-context-propagation-design.md |
| Implicit tenant data sharing | CRITICAL | Security review required before retry |
| RLS policy misconfiguration | CRITICAL | Fix policy, run penetration test |
| Incomplete compliance docs | HIGH | Document gaps, may proceed as CONDITIONAL |

#### Step 2: Critical Failure Remediation

**For Missing Isolation Strategy:**
1. Identify the undocumented asset type
2. Return to `steps/step-02-c-isolation-matrix-creation.md`
3. Load `rls-best-practices.md` for database assets
4. Load `multi-tenant-patterns.md` for other asset types
5. Add isolation strategy following documented patterns
6. Re-run validation

**For Missing Context Propagation:**
1. Identify the code path without context
2. Return to `steps/step-03-c-context-propagation-design.md`
3. Design propagation following knowledge patterns
4. Add no-context guard for the identified path
5. Re-run validation

**For Implicit Tenant Data Sharing (HIGHEST RISK):**
1. **STOP ALL WORK** - This is a potential data leakage issue
2. Document exactly what data could be exposed
3. Escalate to security architect immediately
4. Do not proceed until explicit approval received
5. Implement fix with mandatory security review
6. Run penetration test before re-validation

**For RLS Policy Misconfiguration:**
1. Disable RLS temporarily: `ALTER TABLE {table} DISABLE ROW LEVEL SECURITY`
2. Review policy against `rls-best-practices.md`
3. Fix policy syntax or logic
4. Test with explicit tenant context switching
5. Re-enable RLS and run cross-tenant query test
6. Re-run validation

#### Step 3: Re-Validation Protocol
After remediation:
1. Document what was fixed and why
2. Return to `steps/step-20-v-load-artifact.md` to reload artifacts
3. Re-run this validation step
4. If FAIL persists after 2 attempts, escalate to mandatory course correction

### Recovery Attempt Tracking

| Attempt | Max Allowed | Action on Exceed |
|---------|-------------|------------------|
| 1 | - | Fix and retry |
| 2 | - | Fix and retry with peer review |
| 3+ | EXCEEDED | Mandatory course correction - escalate to project leadership |

### Escalation Contacts
When escalation is required:
1. Security Architect - for data leakage or RLS issues
2. Platform Architect - for context propagation design issues
3. Project Leadership - for mandatory course correction after 2 failed attempts

### Post-Recovery Documentation
After successful recovery:
1. Document root cause of the failure
2. Update knowledge fragments if patterns were unclear
3. Consider adding automated checks for the failure mode
4. Update this workflow's error handling if new patterns discovered

---

## COLLABORATION MENUS (A/P/C):

After completing validation checks, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation findings and edge cases
- **P (Party Mode)**: Bring analyst and architect perspectives for validation review
- **C (Continue)**: Accept validation results and proceed to generate report
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass validation context: findings, gate decision, gaps identified
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into validation results
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tenant model validation: {summary of findings and gate decision}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation results
- Update frontmatter `stepsCompleted: [20, 21]`
- Proceed to next step: `step-22-v-generate-report.md`

---

## Verification

- [ ] All validation checklist items evaluated
- [ ] Gate decision determined (PASS/CONDITIONAL/FAIL)
- [ ] Findings documented with specific details

---

## Outputs

- Validation report with findings
- Gate decision with rationale
- Remediation recommendations (if CONDITIONAL or FAIL)

---

## Next Step

Return to workflow selection or proceed to remediation if validation failed.
