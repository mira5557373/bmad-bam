# Step 21: Validate API Versioning Design

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER skip CRITICAL checks** - All CRITICAL categories must be verified
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 🚦 **HALT on CRITICAL failure** - Document and enter recovery protocol
- 🔍 **Verify current best practices** with web search before finalizing

## EXECUTION PROTOCOLS

- 🎯 Focus: Execute validation checks against API versioning design artifact
- 💾 Track: `stepsCompleted: [20, 21]` when complete
- 📖 Context: Each check produces PASS, CONDITIONAL, FAIL, or WAIVED
- 🚫 Do NOT: Skip any CRITICAL check; CRITICAL failures block progress
- 🔍 Use web search: Verify versioning patterns against current best practices
- ⚠️ Gate: Any CRITICAL failure triggers recovery protocol

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

Execute systematic validation of the API versioning design against quality criteria. Verify strategy completeness, lifecycle definition, tenant pinning, backward compatibility, and migration strategy.

---

## Prerequisites

- Step 20 completed: Artifact and checklist loaded
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` --> filter: api-*
- **Load checklist:** API versioning validation criteria

---

## YOUR TASK

Execute all validation checks against the loaded API versioning design artifact. Document each check result with evidence. Calculate the final validation decision based on CRITICAL and non-critical check outcomes.

---

## Validation Sequence

### Action 1: Validate Strategy Completeness (CRITICAL)

Execute strategy completeness checks:

| Check | Status | Evidence |
|-------|--------|----------|
| Versioning strategy explicitly selected | [ ] | |
| Strategy rationale documented | [ ] | |
| Multi-tenant considerations addressed | [ ] | |
| API surface inventoried | [ ] | |
| Client ecosystem considered | [ ] | |

**CRITICAL Classification:**
- CONDITIONAL threshold: Minor rationale missing
- FAIL threshold: No strategy selected or multi-tenant not considered

### Action 2: Validate Version Lifecycle (CRITICAL)

Execute lifecycle definition checks:

| Check | Status | Evidence |
|-------|--------|----------|
| Semantic versioning rules defined | [ ] | |
| Deprecation timeline specified | [ ] | |
| Enterprise extension documented | [ ] | |
| Sunset header implementation defined | [ ] | |
| Lifecycle states documented | [ ] | |

**CRITICAL Classification:**
- CONDITIONAL threshold: Minor timeline details missing
- FAIL threshold: No deprecation policy or missing semver rules

### Action 3: Validate Tenant Pinning (CRITICAL)

Execute tenant pinning checks:

| Check | Status | Evidence |
|-------|--------|----------|
| Per-tenant version pinning supported | [ ] | |
| Version override mechanism defined | [ ] | |
| Tier-based version access specified | [ ] | |
| Version resolution order documented | [ ] | |

**CRITICAL Classification:**
- CONDITIONAL threshold: Tier restrictions incomplete
- FAIL threshold: No tenant pinning mechanism for multi-tenant

### Action 4: Validate Backward Compatibility (CRITICAL)

Execute compatibility checks:

| Check | Status | Evidence |
|-------|--------|----------|
| Breaking changes clearly classified | [ ] | |
| Non-breaking changes defined | [ ] | |
| Schema evolution rules documented | [ ] | |
| Version negotiation specified | [ ] | |
| Grace period for changes defined | [ ] | |

**CRITICAL Classification:**
- CONDITIONAL threshold: Minor classification gaps
- FAIL threshold: No breaking change rules or missing negotiation

### Action 5: Validate Migration Strategy (CRITICAL)

Execute migration strategy checks:

| Check | Status | Evidence |
|-------|--------|----------|
| Tenant notification plan defined | [ ] | |
| Gradual rollout phases specified | [ ] | |
| Rollout criteria documented | [ ] | |
| Emergency rollback procedures defined | [ ] | |
| Migration support resources listed | [ ] | |

**CRITICAL Classification:**
- CONDITIONAL threshold: Support resources incomplete
- FAIL threshold: No rollback procedures or missing notification plan

### Action 6: Validate Analytics (Non-Critical)

Execute analytics checks:

| Check | Status | Evidence |
|-------|--------|----------|
| Version adoption tracking defined | [ ] | |
| Deprecation usage monitoring specified | [ ] | |
| Error rate by version planned | [ ] | |
| Migration progress tracking designed | [ ] | |

**Non-Critical:** Does not block validation pass, but should be addressed.

### Action 7: Validate Documentation (Non-Critical)

Execute documentation checks:

| Check | Status | Evidence |
|-------|--------|----------|
| Implementation checklist included | [ ] | |
| Web research references provided | [ ] | |
| Change log section present | [ ] | |
| Executive summary complete | [ ] | |

**Non-Critical:** Does not block validation pass, but required for quality.

### Action 8: Web Research Verification

**Verify current best practices with web search:**

Search the web: "API versioning strategy validation checklist {date}"
Search the web: "REST API deprecation policy requirements {date}"
Search the web: "multi-tenant API version management best practices {date}"

Document findings and compare against artifact design:

_Source: [URL]_

---

## Quality Gate Integration

### Calculate Validation Decision

Aggregate all check results:

| Category | Classification | Checks Passed | Checks Total | Result |
|----------|----------------|---------------|--------------|--------|
| Strategy Completeness | CRITICAL | /5 | | |
| Version Lifecycle | CRITICAL | /5 | | |
| Tenant Pinning | CRITICAL | /4 | | |
| Backward Compatibility | CRITICAL | /5 | | |
| Migration Strategy | CRITICAL | /5 | | |
| Analytics | Non-critical | /4 | | |
| Documentation | Non-critical | /4 | | |
| **CRITICAL Total** | | /24 | | |
| **Non-Critical Total** | | /8 | | |

### Validation Decision Rules

| Outcome | Criteria |
|---------|----------|
| **PASS** | All CRITICAL pass (24/24), >=80% non-critical (>=7/8) |
| **CONDITIONAL** | All CRITICAL pass, <80% non-critical - remediation plan required |
| **FAIL** | Any CRITICAL check fails - block until resolved |
| **WAIVED** | Non-critical item waived with stakeholder sign-off |

### Recovery Protocol (If FAIL)

**3-Attempt Rule for CRITICAL Failures:**

**Attempt 1:** Immediate remediation (target: 1-2 days)
- Identify failed CRITICAL categories
- Review design completeness
- Verify multi-tenant requirements
- Add missing components
- Re-run validation after fixes
- **Lock passed categories** - do not re-test

**Attempt 2:** Deep investigation (target: 1-2 days)
- Engage API Architect and platform team
- Analyze design gaps
- Review tenant requirements
- Verify implementation feasibility
- Re-run validation after remediation
- **Preserve locked categories** from Attempt 1

**Attempt 3 FAIL:** Mandatory Course Correction
- Escalate to Platform Architect and Tech Lead
- Document design gaps with evidence
- Conduct API architecture review
- Consider design restructure
- Create remediation plan with architect sign-off
- Schedule architecture review before proceeding

---

## COLLABORATION MENUS (A/P/C)

After completing validation, present options:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific failed checks
- **P (Party Mode)**: Architecture review of validation findings
- **C (Continue)**: Proceed to generate validation report
- **[Specific concerns]**: Describe concerns about validation results

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: failed checks, CRITICAL categories, evidence gaps
- Explore root causes and remediation approaches
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review API versioning validation results"
- Present architect perspectives on CRITICAL failures
- Return to A/P/C menu

#### If 'C' (Continue):
- Document validation decision
- Proceed to `step-22-v-report.md`

---

## SUCCESS METRICS

- ✅ All 7 validation categories verified with evidence
- ✅ Strategy completeness verified
- ✅ Version lifecycle verified
- ✅ Tenant pinning verified
- ✅ CRITICAL check results documented
- ✅ Non-critical check results documented
- ✅ Validation decision calculated correctly
- ✅ Web research verification completed
- ✅ Recovery protocol activated (if FAIL)

---

## FAILURE MODES

- ❌ **CRITICAL category fails:** Enter recovery protocol, document gaps
- ❌ **Missing evidence:** Cannot validate without evidence
- ❌ **Tenant pinning missing:** Critical multi-tenant failure
- ❌ **No rollback procedures:** Critical operational failure
- ❌ **Recovery attempt exhausted:** Escalate to mandatory course correction

---

## Verification

- [ ] Strategy Completeness checks completed
- [ ] Version Lifecycle checks completed
- [ ] Tenant Pinning checks completed
- [ ] Backward Compatibility checks completed
- [ ] Migration Strategy checks completed
- [ ] Analytics checks completed
- [ ] Documentation checks completed
- [ ] Validation decision calculated
- [ ] Web research verification completed

---

## Outputs

- Validation checklist results with evidence
- Validation decision: PASS / CONDITIONAL / FAIL
- List of issues found (if any)
- Recovery protocol status (if FAIL)

---

## NEXT STEP

Proceed to `step-22-v-report.md` to generate the formal validation report documenting all findings and the validation decision.
