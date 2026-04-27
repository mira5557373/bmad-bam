# Step 01: Initialize Production Readiness Assessment

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- ✅ **VERIFY all prerequisite gates passed** before proceeding

## EXECUTION PROTOCOLS

- 🎯 Focus: Initialize production readiness assessment scope
- 💾 Track: `stepsCompleted: [1]` when complete
- 📖 Context: Load all prior QG artifacts (QG-F1, QG-M1-M3, QG-I1-I3)
- 🚫 Do NOT: Start assessment without verifying prerequisite gates
- 🔍 Use web search: Verify production deployment patterns against current best practices
- ⚠️ Gate: QG-P1 - Final gate before production deployment

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Loading all quality gate artifacts from prior phases
- Verifying prerequisite gate status (QG-F1, QG-M1-M3, QG-I1-I3)
- Establishing production readiness assessment scope
- Identifying production environment requirements

**OUT OF SCOPE:**
- Infrastructure analysis (Step 02)
- Observability verification (Step 03)
- Security validation (Step 04)
- Final GO/NO-GO decision (Step 05)

---

## Purpose

Initialize the production readiness assessment by loading all quality gate artifacts from prior phases, verifying all prerequisite gates have passed, and establishing the scope for QG-P1 (Production Readiness) validation. This is the final quality gate before production deployment.

---

## Prerequisites

- All foundation gates passed: QG-F1
- All module gates passed: QG-M1, QG-M2, QG-M3
- All convergence gates passed: QG-I1, QG-I2, QG-I3
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: production
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-p1.md`

---

## Inputs

- Master architecture: `{output_folder}/planning-artifacts/architecture/master-architecture.md`
- Foundation validation: `{output_folder}/planning-artifacts/architecture/foundation-validation.md`
- Module architectures: `{output_folder}/planning-artifacts/modules/*/architecture.md`
- Convergence report: `{output_folder}/planning-artifacts/architecture/convergence-report.md`
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## YOUR TASK:

Load all prerequisite artifacts and verify gate status before establishing production readiness scope.

---

## Main Sequence

### 1. Load Production Readiness Checklist

Load the QG-P1 production readiness checklist:

```
{project-root}/_bmad/bam/data/checklists/qg-p1.md
```

Extract:
- Infrastructure readiness criteria
- Observability requirements
- Security and compliance checks
- Operational readiness criteria

### 2. Load Prior Quality Gate Artifacts

Load and verify status of all prerequisite gates:

#### 2.1 Foundation Gate (QG-F1)

| Artifact | Path | Status |
|----------|------|--------|
| Foundation Validation | `architecture/foundation-validation.md` | Loaded/Missing |
| Master Architecture | `architecture/master-architecture.md` | Loaded/Missing |

**QG-F1 Status:** {{PASS/FAIL}} - Must be PASS to proceed

#### 2.2 Module Gates (QG-M1, QG-M2, QG-M3)

| Module | QG-M1 | QG-M2 | QG-M3 | Overall |
|--------|-------|-------|-------|---------|
| {{module_name}} | {{status}} | {{status}} | {{status}} | {{status}} |

**Module Gates Status:** All modules must have PASS for all gates

#### 2.3 Convergence Gates (QG-I1, QG-I2, QG-I3)

| Gate | Status | Last Verified | Issues |
|------|--------|---------------|--------|
| QG-I1 (Convergence) | {{status}} | {{date}} | {{count}} |
| QG-I2 (Tenant Safety) | {{status}} | {{date}} | {{count}} |
| QG-I3 (Agent Safety) | {{status}} | {{date}} | {{count}} |

**Convergence Gates Status:** All must be PASS or CONDITIONAL

### 3. Verify Gate Prerequisites

Check that all prerequisite gates have passed:

| Gate | Required Status | Actual Status | Blocking |
|------|-----------------|---------------|----------|
| QG-F1 | PASS | {{status}} | YES/NO |
| QG-M1 | PASS | {{status}} | YES/NO |
| QG-M2 | PASS/CONDITIONAL | {{status}} | YES/NO |
| QG-M3 | PASS/CONDITIONAL | {{status}} | YES/NO |
| QG-I1 | PASS | {{status}} | YES/NO |
| QG-I2 | PASS/CONDITIONAL | {{status}} | YES/NO |
| QG-I3 | PASS/CONDITIONAL | {{status}} | YES/NO |

**Prerequisite Check:** {{ALL_PASS/BLOCKED}}

If any gate is BLOCKED, halt workflow and identify resolution path.

### 4. Load Production Patterns

Load production-related patterns from registry:

```
{project-root}/_bmad/bam/data/bam-patterns.csv → filter: production
```

Extract patterns for:
- Blue-green deployment
- Canary release
- Feature flags
- Rollback strategies
- Health check patterns

### 5. Establish Assessment Scope

Define the production readiness assessment scope:

| Category | Items | Priority |
|----------|-------|----------|
| Infrastructure Readiness | {{count}} checks | CRITICAL |
| Observability & Monitoring | {{count}} checks | CRITICAL |
| Security & Compliance | {{count}} checks | CRITICAL |
| Operational Readiness | {{count}} checks | HIGH |
| Documentation | {{count}} checks | MEDIUM |

### 6. Identify Production Environment

Document target production environment:

| Attribute | Value |
|-----------|-------|
| Cloud Provider | {{provider}} |
| Region(s) | {{regions}} |
| Environment Name | {{env_name}} |
| Deployment Strategy | Blue-green / Canary / Rolling |
| Tenant Isolation Model | {{tenant_model}} |
| Expected Initial Load | {{load_estimate}} |

---

## SUCCESS METRICS:

- [ ] Production readiness checklist loaded
- [ ] All QG-F1 artifacts loaded
- [ ] All QG-M1/M2/M3 statuses verified
- [ ] All QG-I1/I2/I3 statuses verified
- [ ] No blocking gate failures
- [ ] Assessment scope established
- [ ] Production environment documented

---

## FAILURE MODES:

| Failure | Recovery |
|---------|----------|
| Prerequisite gate FAIL | Address failed gate before proceeding |
| Missing gate artifacts | Run missing validation workflow |
| Incomplete module coverage | Complete module validation for all modules |
| Missing convergence report | Run convergence-verification workflow |

---

## Verification

- [ ] All prerequisite gate artifacts loaded
- [ ] All gates show PASS or CONDITIONAL status
- [ ] No blocking issues identified
- [ ] Assessment scope clearly defined
- [ ] Production environment documented

---

## Outputs

- Prerequisite gate status summary
- Production readiness assessment scope
- Production environment specification
- Loaded checklist with criteria

---

## NEXT STEP:

Proceed to `step-02-c-analyze.md` to analyze infrastructure readiness for production deployment.
