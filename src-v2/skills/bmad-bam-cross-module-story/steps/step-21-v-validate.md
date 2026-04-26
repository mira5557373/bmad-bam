# Step 21: Validate Cross-Module Story

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

Validate the cross-module story against quality criteria ensuring proper module identification, dependency mapping, integration point specification, and coordinated story structure.

---

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: facade-contracts

---

## Inputs

- Loaded artifact from Step 20
- Quality gate criteria and checklist
- Pattern registry for validation rules
- Previous validation findings (if re-validating)

---

## Actions

### 1. Validate Module Identification

| Criterion | Status | Notes |
|-----------|--------|-------|
| All necessary modules identified | PASS/FAIL | {details} |
| Module roles classified (primary/supporting/observing) | PASS/FAIL | {details} |
| Module owners identified and available | PASS/FAIL | {details} |
| No module boundary violations | PASS/FAIL | {details} |

### 2. Validate Dependencies

| Criterion | Status | Notes |
|-----------|--------|-------|
| All dependencies mapped (data/functional/temporal) | PASS/FAIL | {details} |
| Critical path identified | PASS/FAIL | {details} |
| No circular dependencies | PASS/FAIL | {details} |
| New contracts required documented | PASS/FAIL | {details} |

### 3. Validate Integration Points

| Criterion | Status | Notes |
|-----------|--------|-------|
| All cross-module interactions specified | PASS/FAIL | {details} |
| Facade calls fully documented | PASS/FAIL | {details} |
| Event schemas defined | PASS/FAIL | {details} |
| Contract tests planned | PASS/FAIL | {details} |
| Tenant context propagation verified | PASS/FAIL | {details} |

### 4. Validate Coordinated Stories

| Criterion | Status | Notes |
|-----------|--------|-------|
| Story for each primary module created | PASS/FAIL | {details} |
| Dependencies between stories linked | PASS/FAIL | {details} |
| Acceptance criteria include integration requirements | PASS/FAIL | {details} |
| Coordination schedule realistic | PASS/FAIL | {details} |
| Sync points defined | PASS/FAIL | {details} |

### 5. Validate Cross-Cutting Concerns

| Criterion | Status | Notes |
|-----------|--------|-------|
| Feature aligns with master architecture | PASS/FAIL | {details} |
| Tenant isolation maintained across modules | PASS/FAIL | {details} |
| No single module creates bottleneck | PASS/FAIL | {details} |
| Risk mitigation strategies documented | PASS/FAIL | {details} |

### 6. Calculate Gate Decision

Based on validation results:

| Outcome | Criteria |
|---------|----------|
| **PASS** | All modules identified, dependencies clear, stories coordinated, integration planned |
| **CONDITIONAL** | Minor gaps (e.g., some contracts pending), document and proceed with risk awareness |
| **FAIL** | Missing module identification, circular dependencies, or no integration strategy |

---

## Verification

- [ ] All validation checks completed
- [ ] Gate decision calculated
- [ ] Issues documented with severity
- [ ] Remediation recommendations prepared
- [ ] Patterns align with pattern registry

---

## Outputs

- Validation checklist results by category
- Gate decision (PASS/CONDITIONAL/FAIL)
- List of issues found with severity
- Remediation recommendations

---

## Next Step

Proceed to `step-22-v-report.md` to generate the validation report.
