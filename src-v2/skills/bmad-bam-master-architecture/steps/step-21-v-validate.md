# Step 21: Validate Master Architecture Against QG-F1

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 NEVER skip CRITICAL checks - all four must be evaluated
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: Check loaded document from Step 20 against QG-F1 checklist
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- ✅ CRITICAL: Mark each check as PASS/FAIL/CONDITIONAL with evidence
- 📋 Document findings for every check, not just failures
- ⚠️ Any CRITICAL check failure triggers recovery protocol
- 🔒 Do not modify the document - validation is read-only

---

## EXECUTION PROTOCOLS

- 🎯 Evaluate each QG-F1 check against loaded document content
- 📖 Reference QG-F1 checklist from `{project-root}/_bmad/bam/data/checklists/qg-f1.md`
- 🚫 DO NOT mark PASS without explicit evidence from document
- ⚠️ Flag missing sections or incomplete content immediately
- 🔍 Verify decisions have documented rationale, not just presence

---

## YOUR TASK

Systematically validate the master architecture document against the QG-F1 Foundation Gate checklist. Evaluate all CRITICAL and standard checks, record status with evidence, and prepare results for Step 22 report generation.

---

## Validation Sequence

### 1. Validate CRITICAL Checks (All Must Pass)

**ALL four CRITICAL checks must PASS for QG-F1 to pass.**

| CRITICAL Check | Evidence Required | Status |
|----------------|-------------------|--------|
| **C1: Tenant Isolation Model** | Model selected (RLS/Schema/Database), rationale documented, trade-offs acknowledged | [ ] PASS / FAIL |
| **C2: Module Boundaries** | Modules identified, responsibilities assigned, interfaces specified, dependencies mapped | [ ] PASS / FAIL |
| **C3: AI Runtime Framework** | Runtime selected, integration planned, state management defined, tool contracts outlined | [ ] PASS / FAIL |
| **C4: Document Frozen** | Version specified, no TODOs, date recorded, author attributed | [ ] PASS / FAIL |

For each CRITICAL check, document:
```markdown
### CRITICAL-{N}: {Check Name}
**Finding:** {PASS | FAIL}
**Evidence:** {quote or reference from document}
**Notes:** {concerns or observations}
```

---

### 2. Validate Standard Checks (80% Required)

**At least 5 of 6 standard checks must PASS (80%).**

| # | Check | Evidence Required | Finding |
|---|-------|-------------------|---------|
| S1 | Quality attributes | Latency, throughput, availability targets | PASS/FAIL |
| S2 | Cross-cutting concerns | Logging, auth, monitoring approach | PASS/FAIL |
| S3 | Technology stack | Language, framework, database choices | PASS/FAIL |
| S4 | Deployment topology | Infrastructure and scaling approach | PASS/FAIL |
| S5 | Data architecture | Storage, caching, backup strategy | PASS/FAIL |
| S6 | Integration patterns | Event, API, messaging patterns | PASS/FAIL |

**Standard checks passed:** {count}/6 ({percentage}%)

---

### 3. Compile Validation Summary

```markdown
## QG-F1 Validation Summary

**Document:** master-architecture.md | **Validated:** {date}

### CRITICAL Checks
| Check | Status | Blocker |
|-------|--------|---------|
| Tenant isolation model | {PASS/FAIL} | {Yes if FAIL} |
| Module boundaries | {PASS/FAIL} | {Yes if FAIL} |
| AI runtime framework | {PASS/FAIL} | {Yes if FAIL} |
| Document frozen | {PASS/FAIL} | {Yes if FAIL} |

### Standard Checks: {count}/6 passed ({percentage}%)
```

---

## Quality Gate Integration

### Outcome Determination

| Outcome | Criteria |
|---------|----------|
| **PASS** | All 4 CRITICAL pass AND >= 80% standard (5/6) |
| **CONDITIONAL** | All 4 CRITICAL pass AND < 80% standard + mitigation plan |
| **FAIL** | Any CRITICAL check fails |

### Recovery Protocol (If FAIL)

If any CRITICAL check FAILS:

- **Attempt 1:** Fix issues, re-run validation
- **Attempt 2:** Fix issues, re-run validation  
- **Attempt 3 FAIL:** MANDATORY COURSE CORRECTION

After 3 failed attempts, escalate:
> **[R] Revise** - Fundamentally restructure approach
> **[W] Waive** - Stakeholder accepts risk (documented waiver required)
> **[E] Escalate** - Elevate to project leadership

**Return to Create mode to fix:**
- Tenant model missing → `step-02-c-model.md`
- Module boundaries missing → `step-03-c-boundaries.md`
- AI runtime missing → `step-04-c-patterns.md`
- Document incomplete → `step-05-c-document.md`

**Locked categories:** Checks that PASS are locked and do not require re-validation.

---

## SUCCESS METRICS

- ✅ All 4 CRITICAL checks evaluated with documented evidence
- ✅ All 6 standard checks evaluated with documented evidence
- ✅ Each finding includes PASS/FAIL status and evidence
- ✅ Validation summary compiled with counts and percentages
- ✅ Outcome determined per QG-F1 criteria
- ✅ Recovery protocol identified if applicable
- ✅ Results ready for Step 22 report generation
- ✅ No document modifications made (read-only validation)

---

## NEXT STEP

Proceed to `step-22-v-report.md` to generate the formal QG-F1 validation report.

**Pass to Step 22:** Validation summary, outcome determination, recovery protocol status, evidence.
