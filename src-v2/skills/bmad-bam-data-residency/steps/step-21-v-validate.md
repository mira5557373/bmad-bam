# Step 21: Validate Data Residency Design

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER skip CRITICAL checks** - All data sovereignty checks must be verified
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 🚦 **HALT on CRITICAL failure** - Document and enter recovery protocol
- 🔍 **Verify current data sovereignty requirements** with web search before finalizing

## EXECUTION PROTOCOLS

- 🎯 Focus: Execute data residency validation checks against artifact
- 💾 Track: `stepsCompleted: [20, 21]` when complete
- 📖 Context: Each check produces PASS, CONDITIONAL, FAIL, or WAIVED
- 🚫 Do NOT: Skip any CRITICAL check; CRITICAL failures block progress
- 🔍 Use web search: Verify residency patterns against current regulations
- ⚠️ Gate: Data Residency - Any CRITICAL failure triggers recovery protocol

---


## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Loading artifact and checklist
- Evaluating against criteria
- Documenting evidence

**OUT OF SCOPE:**
- Modifying the artifact
- Creating new content
## YOUR TASK

Execute all data residency validation checks against the loaded artifact. Verify GDPR Article 17 (Right to Erasure), CCPA compliance, cross-border transfer restrictions, and regional consistency. Document each check result with evidence and calculate the final gate decision.

---

## Purpose

Validate completeness and quality of the data residency design against established criteria, compliance requirements, and architectural best practices.

---

## Prerequisites

- Step 20 completed: Artifact loaded
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: data-residency
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-dr.md`

---

## Actions

### 1. Validate Compliance Coverage

**CRITICAL Checks:**

- [ ] **GDPR compliance addressed** - EU data residency requirements defined
- [ ] **Cross-border transfer restrictions documented** - Clear policies for each compliance zone
- [ ] **Data classification mapped to residency** - PII, non-PII, aggregated data handling

| Compliance Framework | Addressed | Requirements Met | Gaps |
|----------------------|-----------|------------------|------|
| GDPR | YES/NO | YES/PARTIAL/NO | {gaps} |
| CCPA | YES/NO | YES/PARTIAL/NO | {gaps} |
| LGPD | YES/NO | YES/PARTIAL/NO | {gaps} |
| PDPA | YES/NO | YES/PARTIAL/NO | {gaps} |
| PIPL | YES/NO | YES/PARTIAL/NO | {gaps} |

### 2. Validate Regional Architecture

- [ ] Target regions defined with clear codes
- [ ] Database deployment per region specified
- [ ] Storage bucket configuration documented
- [ ] Cache region affinity established
- [ ] Event routing by region configured

| Architecture Component | Complete | Consistent | Issues |
|------------------------|----------|------------|--------|
| Regional databases | YES/NO | YES/NO | {issues} |
| Storage buckets | YES/NO | YES/NO | {issues} |
| Cache deployment | YES/NO | YES/NO | {issues} |
| Event bus | YES/NO | YES/NO | {issues} |

### 3. Validate Cross-Region Handling

- [ ] Data replication restrictions defined
- [ ] Cross-region API routing configured
- [ ] Backup storage policies comply with residency
- [ ] DR strategy maintains compliance

| Cross-Region Policy | Defined | Compliant | Issues |
|---------------------|---------|-----------|--------|
| Replication restrictions | YES/NO | YES/NO | {issues} |
| API routing | YES/NO | YES/NO | {issues} |
| Backup locations | YES/NO | YES/NO | {issues} |
| DR failover | YES/NO | YES/NO | {issues} |

### 4. Validate Tenant Region Assignment

- [ ] Region selection at onboarding documented
- [ ] Region migration workflow defined
- [ ] Compliance verification framework established
- [ ] Edge location configuration specified

| Assignment Component | Complete | Workflow Defined | Issues |
|----------------------|----------|------------------|--------|
| Onboarding region selection | YES/NO | YES/NO | {issues} |
| Migration workflow | YES/NO | YES/NO | {issues} |
| Compliance verification | YES/NO | YES/NO | {issues} |
| Edge configuration | YES/NO | YES/NO | {issues} |

### 5. Validate Internal Consistency

Check cross-references and dependencies:

| Consistency Check | Status | Notes |
|-------------------|--------|-------|
| Region codes match across sections | PASS/FAIL | {notes} |
| Compliance zones consistent | PASS/FAIL | {notes} |
| DR targets within compliance zones | PASS/FAIL | {notes} |
| Backup locations match region policies | PASS/FAIL | {notes} |
| Edge locations align with regions | PASS/FAIL | {notes} |

### 6. Calculate Gate Decision

Based on validation results:

| Outcome | Criteria |
|---------|----------|
| **PASS** | All critical checks pass, no major gaps |
| **CONDITIONAL** | Non-critical gaps, all critical compliance checks pass |
| **FAIL** | Any critical compliance check fails or major architectural gaps |

**Critical Checks (Must Pass):**
- GDPR compliance addressed (if EU regions)
- Cross-border transfer restrictions documented
- Data classification mapped to residency
- DR maintains compliance

**Non-Critical Checks:**
- Edge configuration complete
- All minor regions documented
- Implementation roadmap detailed

---

## COLLABORATION MENUS (A/P/C):

After completing validation, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation findings
- **P (Party Mode)**: Bring compliance and architecture perspectives on gate decision
- **C (Continue)**: Proceed to generate validation report
- **[Specific concerns]**: Describe validation concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: validation results, gate decision
- Process enhanced insights
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review data residency validation results"
- Present synthesized recommendations
- Return to A/P/C menu

#### If 'C' (Continue):
- Document gate decision
- Proceed to next step: `step-22-v-report.md`

---

## SUCCESS METRICS

- ✅ All compliance coverage categories validated with evidence
- ✅ All regional architecture checks verified
- ✅ CRITICAL data sovereignty checks documented
- ✅ Cross-border transfer restrictions validated
- ✅ Gate decision calculated correctly
- ✅ GDPR Article 17 workflow verified
- ✅ Recovery protocol activated (if FAIL)

---

## FAILURE MODES

- ❌ **CRITICAL compliance fails:** Enter recovery protocol, document gaps
- ❌ **Missing regional evidence:** Cannot validate without regional config
- ❌ **Cross-border violation detected:** Block until legal review complete
- ❌ **Recovery attempt exhausted:** Escalate to mandatory course correction

---

## Verification

- [ ] Compliance coverage validated
- [ ] Regional architecture validated
- [ ] Cross-region handling validated
- [ ] Tenant region assignment validated
- [ ] Internal consistency checked
- [ ] Gate decision calculated
- [ ] Issues documented

---

## Outputs

- Validation checklist results
- Gate decision (PASS/CONDITIONAL/FAIL)
- List of issues found
- Remediation recommendations

---

## Next Step

Proceed to `step-22-v-report.md` to generate the validation report.
