# Step 21: Validate Memory Tier Design (Validate Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Execute validation checks against QG-M3 criteria
- 💾 Track: `stepsCompleted: [20, 21]` when complete
- 📖 Context: Use loaded criteria from Step 20
- 🚫 Do NOT: Generate validation report (that's Step 22)
- 🔍 Use web search: Not required (validation step)
- ⚠️ Note: Critical checks MUST pass for PASS outcome

---


## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Loading artifact and checklist
- Evaluating against criteria
- Documenting evidence

**OUT OF SCOPE:**
- Modifying the artifact
- Creating new content
## Purpose

Execute comprehensive validation checks against QG-M3 (Agent Runtime) quality gate criteria. Document all findings for report generation.

---

## Prerequisites

- Step 20 completed: Documents and criteria loaded
- Validation scope confirmed
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-m3.md`

---

## Actions

### 1. Execute Memory Tier Completeness Checks

| Check ID | Criterion | Status | Notes |
|----------|-----------|--------|-------|
| MT-01 | All 5 memory tiers defined | PASS/FAIL | |
| MT-02 | Session memory specification | PASS/FAIL | |
| MT-03 | Conversation memory specification | PASS/FAIL | |
| MT-04 | Tenant memory specification | PASS/FAIL | |
| MT-05 | Global memory specification | PASS/FAIL | |
| MT-06 | Storage technology per tier | PASS/FAIL | |
| MT-07 | TTL policies per tier | PASS/FAIL | |
| MT-08 | Eviction strategies per tier | PASS/FAIL | |

**Subtotal:** {{passed}}/8 checks passed

### 2. Execute Context Management Checks

| Check ID | Criterion | Status | Notes |
|----------|-----------|--------|-------|
| CTX-01 | Context window allocation defined | PASS/FAIL | |
| CTX-02 | Compression strategies specified | PASS/FAIL | |
| CTX-03 | Token budget management | PASS/FAIL | |
| CTX-04 | Memory key patterns documented | PASS/FAIL | |
| CTX-05 | Importance weighting defined | PASS/FAIL | |

**Subtotal:** {{passed}}/5 checks passed

### 3. Execute Vector Store Checks

| Check ID | Criterion | Status | Notes |
|----------|-----------|--------|-------|
| VEC-01 | Vector database selected | PASS/FAIL | |
| VEC-02 | Embedding model specified | PASS/FAIL | |
| VEC-03 | Embedding dimensions documented | PASS/FAIL | |
| VEC-04 | Similarity metric chosen | PASS/FAIL | |
| VEC-05 | Index type selected | PASS/FAIL | |
| VEC-06 | Retrieval strategies defined | PASS/FAIL | |

**Subtotal:** {{passed}}/6 checks passed

### 4. Execute CRITICAL Isolation Checks

**CRITICAL: Any failure in this section results in FAIL outcome**

| Check ID | Criterion | Status | Notes |
|----------|-----------|--------|-------|
| **ISO-01** | **Tenant isolation for tenant memory tier** | PASS/FAIL | **CRITICAL** |
| **ISO-02** | **Vector store namespace/collection per tenant** | PASS/FAIL | **CRITICAL** |
| **ISO-03** | **Retrieval ALWAYS includes tenant filter** | PASS/FAIL | **CRITICAL** |
| **ISO-04** | **Cross-tenant verification designed** | PASS/FAIL | **CRITICAL** |
| **ISO-05** | **Session/conversation keyed with tenant** | PASS/FAIL | **CRITICAL** |
| **ISO-06** | **Global memory contains NO tenant data** | PASS/FAIL | **CRITICAL** |

**Subtotal:** {{passed}}/6 CRITICAL checks passed

### 5. Execute Compliance Checks

| Check ID | Criterion | Status | Notes |
|----------|-----------|--------|-------|
| COMP-01 | Memory access audit logging | PASS/FAIL | |
| COMP-02 | Audit log schema defined | PASS/FAIL | |
| COMP-03 | Data export capability (GDPR Art. 20) | PASS/FAIL | |
| COMP-04 | Export format specification | PASS/FAIL | |
| COMP-05 | Tenant deletion process (GDPR Art. 17) | PASS/FAIL | |
| COMP-06 | Deletion verification checklist | PASS/FAIL | |
| COMP-07 | GDPR compliance mapping | PASS/FAIL | |
| COMP-08 | SOC 2 compliance mapping | PASS/FAIL | |

**Subtotal:** {{passed}}/8 checks passed

### 6. Execute Implementation Checks

| Check ID | Criterion | Status | Notes |
|----------|-----------|--------|-------|
| IMPL-01 | Implementation roadmap present | PASS/FAIL | |
| IMPL-02 | Phase dependencies documented | PASS/FAIL | |
| IMPL-03 | Effort estimates provided | PASS/FAIL | |
| IMPL-04 | Design decisions documented | PASS/FAIL | |

**Subtotal:** {{passed}}/4 checks passed

### 7. Calculate Gate Decision

**Summary:**

| Category | Passed | Total | Status |
|----------|--------|-------|--------|
| Memory Tier Completeness | {{n}} | 8 | {{status}} |
| Context Management | {{n}} | 5 | {{status}} |
| Vector Store | {{n}} | 6 | {{status}} |
| **Isolation (CRITICAL)** | {{n}} | 6 | {{status}} |
| Compliance | {{n}} | 8 | {{status}} |
| Implementation | {{n}} | 4 | {{status}} |
| **TOTAL** | {{n}} | 37 | {{status}} |

**Gate Decision Logic:**

| Condition | Outcome |
|-----------|---------|
| All CRITICAL checks pass, ALL other checks pass | **PASS** |
| All CRITICAL checks pass, 90%+ other checks pass | **CONDITIONAL** |
| Any CRITICAL check fails | **FAIL** |
| All CRITICAL pass, <90% other checks pass | **FAIL** |

**GATE DECISION: {{PASS/CONDITIONAL/FAIL}}**

### 8. Document Findings

**Critical Issues (if any):**

| Issue | Check ID | Description | Remediation |
|-------|----------|-------------|-------------|
| {{issue}} | {{id}} | {{desc}} | {{fix}} |

**Non-Critical Issues (if any):**

| Issue | Check ID | Description | Remediation |
|-------|----------|-------------|-------------|
| {{issue}} | {{id}} | {{desc}} | {{fix}} |

---

## COLLABORATION MENUS (A/P/C):

After completing validation checks, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific validation findings
- **P (Party Mode)**: Bring perspectives on remediation strategies
- **C (Continue)**: Proceed to generate validation report

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: validation results, issues found
- Process enhanced insights on specific findings
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review validation findings and remediation strategies"
- Present synthesized recommendations on addressing issues
- Return to A/P/C menu

#### If 'C' (Continue):
- Document all findings
- Proceed to: `step-22-v-report.md`

---

## Verification

- [ ] All memory tier checks executed
- [ ] All context management checks executed
- [ ] All vector store checks executed
- [ ] **CRITICAL:** All isolation checks executed
- [ ] All compliance checks executed
- [ ] All implementation checks executed
- [ ] Gate decision calculated
- [ ] Findings documented

---

## Outputs

- Validation check results by category
- Critical issues list (if any)
- Non-critical issues list (if any)
- Gate decision with rationale

---


---

## SUCCESS METRICS:

- [ ] Artifact loaded for validation
- [ ] All checklist items evaluated
- [ ] Evidence documented for each check
- [ ] Gate decision determined (PASS/CONDITIONAL/FAIL)
- [ ] Validation report generated

## FAILURE MODES:

- **Artifact not found:** Cannot validate - run Create mode first
- **Missing checklist:** Use embedded criteria as fallback
- **Ambiguous evidence:** Mark as CONDITIONAL, document uncertainty

## Next Step

Proceed to `step-22-v-report.md` to generate the validation report.
