# Step 21: Validate Cross-Module Story

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 NEVER skip validation criteria - check every item
- 📖 ALWAYS evaluate each criterion objectively against artifact content
- 🔄 ALWAYS document evidence for PASS/FAIL decisions
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- ✅ FLAG critical failures immediately - they determine gate decision
- 📋 CATEGORIZE issues by severity (Critical/Warning/Info)
- 💬 PRESENT validation summary before gate decision
- 🎯 FOCUS on coordination quality, not implementation details

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Systematic validation against coordination criteria
- 💾 Track: Validation results per category
- 📖 Context: Use loaded artifact from Step 20
- 🚫 Do NOT: Modify artifact during validation - only assess
- ⚠️ Gate: Critical failures require remediation before sprint planning
- 🔍 Use web search: Not applicable for Validate mode

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

Validate the cross-module story against quality criteria ensuring proper module identification, dependency mapping, integration point specification, coordinated story structure, and multi-tenant safety.

---

## YOUR TASK

Systematically validate the cross-module epic against all quality gate criteria, document findings with evidence, categorize issues by severity, and calculate the gate decision. Present results clearly to enable informed next steps.

---

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: facade-contracts
- Validation checklists loaded from Step 20

---

## Actions

### 1. Validate Module Identification

| Criterion | Status | Evidence | Notes |
|-----------|--------|----------|-------|
| All necessary modules identified | PASS/FAIL | {where found} | {details} |
| Module roles classified (primary/supporting/observing) | PASS/FAIL | {where found} | {details} |
| Module owners identified and available | PASS/FAIL | {where found} | {details} |
| No module boundary violations | PASS/FAIL | {where found} | {details} |
| Each module has clear responsibility | PASS/FAIL | {where found} | {details} |

**Module identification score:** {passed}/{total}

**Critical failures in this category:**
- {list any FAIL items that are blockers}

### 2. Validate Dependencies

| Criterion | Status | Evidence | Notes |
|-----------|--------|----------|-------|
| All dependencies mapped (data/functional/temporal) | PASS/FAIL | {where found} | {details} |
| Critical path identified | PASS/FAIL | {where found} | {details} |
| No circular dependencies | PASS/FAIL | {where found} | {details} |
| New contracts required are documented | PASS/FAIL | {where found} | {details} |
| Dependency resolution sequence defined | PASS/FAIL | {where found} | {details} |

**Dependency validation score:** {passed}/{total}

**Circular dependency check:**
```
{Run cycle detection on dependency graph}
Result: {PASS - no cycles / FAIL - cycles found at: {cycle_path}}
```

**Critical failures in this category:**
- {list any FAIL items that are blockers}

### 3. Validate Integration Points

| Criterion | Status | Evidence | Notes |
|-----------|--------|----------|-------|
| All cross-module interactions specified | PASS/FAIL | {where found} | {details} |
| Facade calls fully documented with signatures | PASS/FAIL | {where found} | {details} |
| Event schemas defined with versioning | PASS/FAIL | {where found} | {details} |
| Contract tests planned for each facade | PASS/FAIL | {where found} | {details} |
| Tenant context propagation verified | PASS/FAIL | {where found} | {details} |
| Error handling defined for cross-module calls | PASS/FAIL | {where found} | {details} |

**Integration points score:** {passed}/{total}

**Multi-tenant validation:**
```
Checking tenant context propagation across:
- Facade calls: {all/partial/none} include tenant context
- Events: {all/partial/none} include tenant_id
- Cross-module data access: {verified/unverified}
```

**Critical failures in this category:**
- {list any FAIL items that are blockers}

### 4. Validate Coordinated Stories

| Criterion | Status | Evidence | Notes |
|-----------|--------|----------|-------|
| Story for each primary module created | PASS/FAIL | {where found} | {details} |
| Dependencies between stories linked | PASS/FAIL | {where found} | {details} |
| Acceptance criteria include integration requirements | PASS/FAIL | {where found} | {details} |
| Coordination schedule realistic | PASS/FAIL | {where found} | {details} |
| Sync points defined with frequency | PASS/FAIL | {where found} | {details} |
| Rollback scenarios documented | PASS/FAIL | {where found} | {details} |

**Coordinated stories score:** {passed}/{total}

**Story coverage check:**
| Module | Primary | Stories | Coverage |
|--------|---------|---------|----------|
| {module} | Yes/No | {count} | {complete/partial/missing} |

**Critical failures in this category:**
- {list any FAIL items that are blockers}

### 5. Validate Cross-Cutting Concerns

| Criterion | Status | Evidence | Notes |
|-----------|--------|----------|-------|
| Feature aligns with master architecture | PASS/FAIL | {where found} | {details} |
| Tenant isolation maintained across modules | PASS/FAIL | {where found} | {details} |
| No single module creates bottleneck | PASS/FAIL | {where found} | {details} |
| Risk mitigation strategies documented | PASS/FAIL | {where found} | {details} |

**Cross-cutting concerns score:** {passed}/{total}

**Architecture alignment check:**
```
Comparing epic structure against master architecture:
- Module boundaries: {aligned/deviation at: {location}}
- Facade pattern: {aligned/deviation at: {location}}
- Event-driven: {aligned/deviation at: {location}}
```

**Critical failures in this category:**
- {list any FAIL items that are blockers}

### 6. Compile Issue Summary

**Issues by severity:**

| Severity | Count | Categories Affected |
|----------|-------|---------------------|
| CRITICAL | {count} | {categories} |
| WARNING | {count} | {categories} |
| INFO | {count} | {categories} |

**Critical issues (must fix before sprint planning):**

| ID | Category | Issue | Impact | Recommendation |
|----|----------|-------|--------|----------------|
| C1 | {category} | {issue} | {impact} | {recommendation} |
| C2 | {category} | {issue} | {impact} | {recommendation} |

**Warnings (should address before development):**

| ID | Category | Issue | Impact | Recommendation |
|----|----------|-------|--------|----------------|
| W1 | {category} | {issue} | {impact} | {recommendation} |
| W2 | {category} | {issue} | {impact} | {recommendation} |

### 7. Calculate Gate Decision

**Validation summary:**

| Category | Score | Status |
|----------|-------|--------|
| Module Identification | {x}/{5} | PASS/FAIL |
| Dependencies | {x}/{5} | PASS/FAIL |
| Integration Points | {x}/{6} | PASS/FAIL |
| Coordinated Stories | {x}/{6} | PASS/FAIL |
| Cross-Cutting Concerns | {x}/{4} | PASS/FAIL |
| **TOTAL** | **{x}/{26}** | |

**Gate decision criteria:**

| Outcome | Criteria | Action |
|---------|----------|--------|
| **PASS** | All categories pass, no critical issues | Proceed to sprint planning |
| **CONDITIONAL** | Minor gaps (warnings only), all critical pass | Proceed with documented risks |
| **FAIL** | Any critical failure OR <80% total score | Return to Edit mode |

**GATE DECISION: {PASS/CONDITIONAL/FAIL}**

---

## SUCCESS METRICS

- ✅ All 26 validation criteria evaluated
- ✅ Evidence documented for each decision
- ✅ Issues categorized by severity
- ✅ Remediation recommendations provided
- ✅ Gate decision calculated with clear rationale
- ✅ Summary presented for user decision

---

## FAILURE MODES

- ❌ **Incomplete validation:** Missing artifact sections prevent full evaluation
- ❌ **Ambiguous criteria:** Criterion cannot be evaluated - document as WARNING
- ❌ **Conflicting evidence:** Multiple sections contradict - flag for user resolution
- ❌ **Circular dependencies detected:** Automatic FAIL for dependency category

---

## Verification

- [ ] All validation criteria checked
- [ ] Each criterion has PASS/FAIL with evidence
- [ ] Gate decision calculated correctly
- [ ] Issues documented with severity
- [ ] Remediation recommendations prepared
- [ ] Patterns align with pattern registry

---

## Outputs

- Validation checklist results by category (26 criteria)
- Issue summary by severity
- Gate decision (PASS/CONDITIONAL/FAIL)
- Remediation recommendations for failures
- Architecture alignment assessment

---

## Next Step

Proceed to `step-22-v-report.md` to generate the formal validation report.
