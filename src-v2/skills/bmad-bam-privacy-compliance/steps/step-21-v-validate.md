# Step 21: Execute Privacy Compliance Validation

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- **ALWAYS pause after presenting findings** and await user direction
- **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- Focus: Execute systematic validation against QG-CC criteria
- Track: `stepsCompleted: [20, 21]` when complete
- Context: Document evidence for each check
- Do NOT: Modify artifact during validation
- Use web search: Verify current regulatory requirements if needed

---


## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Executing validation checks
- Documenting evidence
- Identifying gaps and issues

**OUT OF SCOPE:**
- Modifying the artifact
- Creating new content
- Report generation (next step)

## YOUR TASK

Execute systematic validation of the privacy compliance design against QG-CC criteria. Document evidence for each check. Identify gaps, issues, and recommendations. Do not modify the artifact during validation.

---

## Purpose

Perform systematic validation of the privacy compliance design against continuous compliance quality gate criteria, documenting evidence and identifying gaps.

## Prerequisites

- Step 20 completed with artifact and checklist loaded
- Validation scope determined

## Actions

### 1. Execute Critical Checks

**CRITICAL checks must ALL pass for QG-CC approval:**

| Check | Criteria | Evidence | Status |
|-------|----------|----------|--------|
| DSR-1 | All GDPR Art. 15-22 rights addressed | List of rights with implementation | [ ] |
| DSR-2 | Rights fulfillment tenant-isolated | RLS/isolation mechanism documented | [ ] |
| DSR-3 | Response timeline automation specified | Timeline targets documented | [ ] |
| LB-1 | All processing has lawful basis | Processing activity table complete | [ ] |
| LB-2 | Consent proof captured for consent-based | Evidence schema defined | [ ] |
| LB-3 | LIA documented for legitimate interest | LIA workflow specified | [ ] |
| TI-1 | Data discovery tenant-scoped | Discovery architecture shows isolation | [ ] |
| TI-2 | Export pipeline tenant-isolated | Export shows RLS/tenant filter | [ ] |

### 2. Execute Required Checks

**Required checks should pass; gaps need mitigation plan:**

| Check | Criteria | Evidence | Status |
|-------|----------|----------|--------|
| EXP-1 | Machine-readable export format | JSON/CSV format defined | [ ] |
| EXP-2 | Data categories for export identified | Portable data table complete | [ ] |
| EXP-3 | Direct transfer capability designed | Transfer workflow present | [ ] |
| CON-1 | Consent collection workflow defined | Collection points documented | [ ] |
| CON-2 | Granular consent options available | Category structure defined | [ ] |
| CON-3 | Withdrawal mechanism immediate | Withdrawal workflow specified | [ ] |
| CON-4 | Preference center designed | UI requirements documented | [ ] |
| AUD-1 | Audit trail for basis changes | Audit schema defined | [ ] |
| AUD-2 | Consent events logged | Event types documented | [ ] |
| CCPA-1 | 12-month lookback supported | Disclosure format defined | [ ] |

### 3. Execute Recommended Checks

**Recommended checks enhance compliance maturity:**

| Check | Criteria | Evidence | Status |
|-------|----------|----------|--------|
| REG-1 | Article 30 processing register | Register schema present | [ ] |
| REG-2 | Cross-border transfer mechanisms | SCCs/adequacy documented | [ ] |
| REG-3 | DPO integration specified | Contact mechanism defined | [ ] |
| UX-1 | No dark patterns in consent UI | Equal prominence specified | [ ] |
| UX-2 | Double opt-in for marketing | Workflow defined | [ ] |
| AUTO-1 | Automated evidence collection | Collection automation specified | [ ] |

### 4. Document Validation Evidence

For each check, document:

```yaml
validation_evidence:
  check_id: "DSR-1"
  criteria: "All GDPR Art. 15-22 rights addressed"
  status: pass | fail | partial
  evidence:
    location: "Section: Data Subject Rights"
    finding: "All 7 rights documented with implementation approach"
    gaps: null | ["Missing Art. 22 implementation"]
  recommendation: null | "Add automated decision opt-out"
```

### 5. Calculate Compliance Score

**Scoring Matrix:**

| Check Type | Weight | Pass Score | Fail Score |
|------------|--------|------------|------------|
| CRITICAL | 3x | 3 points | 0 points |
| Required | 2x | 2 points | 0 points |
| Recommended | 1x | 1 point | 0 points |

**Threshold for Outcomes:**
| Outcome | Criteria |
|---------|----------|
| PASS | All CRITICAL pass, >80% Required pass |
| CONDITIONAL | All CRITICAL pass, 60-80% Required pass |
| FAIL | Any CRITICAL fails |

### 6. Identify Issues and Recommendations

**Issue Classification:**

| Severity | Impact | Timeline |
|----------|--------|----------|
| CRITICAL | Blocks compliance, legal risk | Immediate |
| HIGH | Significant gap, regulatory exposure | 1 week |
| MEDIUM | Partial compliance, some risk | 2 weeks |
| LOW | Enhancement opportunity | Backlog |

**Document issues:**

```markdown
## Validation Issues

### CRITICAL Issues
1. **[Issue Title]**
   - Check: [Check ID]
   - Finding: [Description]
   - Recommendation: [Action required]
   - Owner: [Role]

### HIGH Issues
1. ...

### MEDIUM Issues
1. ...

### LOW Issues / Recommendations
1. ...
```

---

## SUCCESS METRICS

- All CRITICAL checks executed with evidence
- All Required checks executed with evidence
- Recommended checks executed where applicable
- Evidence documented for each check
- Issues classified by severity
- Compliance score calculated
- Recommendations documented

---

## FAILURE MODES

- **Missing section:** Cannot validate - mark check as FAIL
- **Ambiguous evidence:** Request clarification, mark as PARTIAL
- **Conflicting requirements:** Document both interpretations, escalate
- **External dependency:** Note dependency, mark as CONDITIONAL

---

## Verification

- [ ] All CRITICAL checks executed
- [ ] All Required checks executed
- [ ] Evidence documented for each check
- [ ] Issues identified and classified
- [ ] Compliance score calculated
- [ ] Ready to generate report

## Outputs

- Validation check results (in working memory)
- Evidence documentation
- Issue list with severity
- Compliance score
- Recommendations

## Next Step

Proceed to `step-22-v-report.md` to generate validation report.

---

**Navigation:** Enter 'C' to continue to report generation
