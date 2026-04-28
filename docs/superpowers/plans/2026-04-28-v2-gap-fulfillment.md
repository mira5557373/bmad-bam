# V2 Gap Fulfillment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fill all content gaps in BAM V2 to enable complete workflow execution

**Architecture:** Hybrid migration + generation approach. Core templates migrate V1 content. Operational templates generate from patterns. CSV files copy from V1. Checklists fix naming alignment with quality-gates.csv.

**Tech Stack:** Node.js, YAML, Markdown, CSV

---

## File Structure

### Phase 1: CSV Migration (3 files)
- Create: `src-v2/data/bam-patterns.csv` (copy from V1)
- Create: `src-v2/data/compliance-frameworks.csv` (copy from V1)
- Create: `src-v2/data/section-pattern-map.csv` (copy from V1)

### Phase 2: Checklist Alignment (1 file + 2 new)
- Modify: `src-v2/data/quality-gates.csv` (fix checklist_file references to use short names)
- Create: `src-v2/data/checklists/qg-prg.md`
- Create: `src-v2/data/checklists/qg-s2.md`

### Phase 3: Core Templates (10 files)
- Modify: `src-v2/data/templates/master-architecture.md`
- Modify: `src-v2/data/templates/module-architecture.md`
- Modify: `src-v2/data/templates/tenant-isolation.md`
- Modify: `src-v2/data/templates/agent-runtime.md`
- Modify: `src-v2/data/templates/facade-contract.md`
- Modify: `src-v2/data/templates/convergence-report.md`
- Modify: `src-v2/data/templates/production-readiness.md`
- Modify: `src-v2/data/templates/requirements-analysis.md`
- Modify: `src-v2/data/templates/module-epic.md`
- Modify: `src-v2/data/templates/validation-report.md`

### Phase 4: Operational Templates (15 files)
- Modify: `src-v2/data/templates/billing-design.md`
- Modify: `src-v2/data/templates/compliance-mapping.md`
- Modify: `src-v2/data/templates/caching-strategy.md`
- Modify: `src-v2/data/templates/data-residency.md`
- Modify: `src-v2/data/templates/event-architecture.md`
- Modify: `src-v2/data/templates/incident-response.md`
- Modify: `src-v2/data/templates/observability-design.md`
- Modify: `src-v2/data/templates/scaling-design.md`
- Modify: `src-v2/data/templates/security-architecture.md`
- Modify: `src-v2/data/templates/tenant-onboarding.md`
- Modify: `src-v2/data/templates/tenant-offboarding.md`
- Modify: `src-v2/data/templates/white-label-config.md`
- Modify: `src-v2/data/templates/cost-model.md`
- Modify: `src-v2/data/templates/capacity-plan.md`
- Modify: `src-v2/data/templates/decision-log.md`

### Phase 5: Workflow Templates (15 files)
- Modify: `src-v2/data/templates/agent-debug-report.md`
- Modify: `src-v2/data/templates/agent-trace.md`
- Modify: `src-v2/data/templates/api-version.md`
- Modify: `src-v2/data/templates/cross-module-story.md`
- Modify: `src-v2/data/templates/gate-checklist.md`
- Modify: `src-v2/data/templates/integration-test-plan.md`
- Modify: `src-v2/data/templates/llm-version.md`
- Modify: `src-v2/data/templates/memory-tier.md`
- Modify: `src-v2/data/templates/tool-contract.md`
- Modify: `src-v2/data/templates/research-findings.md`
- Modify: `src-v2/data/templates/migration-plan.md`
- Modify: `src-v2/data/templates/rollback-plan.md`
- Modify: `src-v2/data/templates/runbook.md`
- Modify: `src-v2/data/templates/sla-definition.md`
- Modify: `src-v2/data/templates/testing-strategy.md`

### Phase 6: Test Updates (2 files)
- Modify: `test/install.test.js`
- Modify: `test/checklist-format.test.js`

---

## Task 1: Migrate bam-patterns.csv

**Files:**
- Create: `src-v2/data/bam-patterns.csv`
- Source: `src/data/bam-patterns.csv`

- [ ] **Step 1: Copy V1 bam-patterns.csv to V2**

```bash
cp src/data/bam-patterns.csv src-v2/data/bam-patterns.csv
```

- [ ] **Step 2: Verify CSV structure**

```bash
head -2 src-v2/data/bam-patterns.csv
```

Expected: CSV with columns: pattern_id,name,category,decision_criteria,signals,intent,variants,decision_questions,web_queries,verification_gate,dependencies,conflicts,skill_level_notes,related_fragments

- [ ] **Step 3: Verify row count**

```bash
wc -l src-v2/data/bam-patterns.csv
```

Expected: ~50+ rows (matches V1)

- [ ] **Step 4: Commit**

```bash
git add src-v2/data/bam-patterns.csv
git commit -m "feat(v2): migrate bam-patterns.csv from V1"
```

---

## Task 2: Migrate compliance-frameworks.csv

**Files:**
- Create: `src-v2/data/compliance-frameworks.csv`
- Source: `src/data/compliance-frameworks.csv`

- [ ] **Step 1: Copy V1 compliance-frameworks.csv to V2**

```bash
cp src/data/compliance-frameworks.csv src-v2/data/compliance-frameworks.csv
```

- [ ] **Step 2: Verify CSV structure**

```bash
head -2 src-v2/data/compliance-frameworks.csv
```

Expected: CSV with compliance framework columns

- [ ] **Step 3: Commit**

```bash
git add src-v2/data/compliance-frameworks.csv
git commit -m "feat(v2): migrate compliance-frameworks.csv from V1"
```

---

## Task 3: Migrate section-pattern-map.csv

**Files:**
- Create: `src-v2/data/section-pattern-map.csv`
- Source: `src/data/section-pattern-map.csv`

- [ ] **Step 1: Copy V1 section-pattern-map.csv to V2**

```bash
cp src/data/section-pattern-map.csv src-v2/data/section-pattern-map.csv
```

- [ ] **Step 2: Verify CSV structure**

```bash
head -2 src-v2/data/section-pattern-map.csv
```

Expected: CSV mapping template sections to patterns

- [ ] **Step 3: Commit**

```bash
git add src-v2/data/section-pattern-map.csv
git commit -m "feat(v2): migrate section-pattern-map.csv from V1"
```

---

## Task 4: Fix quality-gates.csv checklist references

**Files:**
- Modify: `src-v2/data/quality-gates.csv`

The CSV references long filenames (e.g., `qg-f1-foundation.md`) but V2 uses short names (e.g., `qg-f1.md`). Update to match V2 convention.

- [ ] **Step 1: Create mapping and update CSV**

```bash
sed -i \
  -e 's/qg-d1-discovery\.md/qg-d1.md/g' \
  -e 's/qg-pl1-planning\.md/qg-pl1.md/g' \
  -e 's/qg-f1-foundation\.md/qg-f1.md/g' \
  -e 's/qg-m1-module-architecture\.md/qg-m1.md/g' \
  -e 's/qg-m2-tenant-isolation\.md/qg-m2.md/g' \
  -e 's/qg-m3-agent-runtime\.md/qg-m3.md/g' \
  -e 's/qg-i1-convergence\.md/qg-i1.md/g' \
  -e 's/qg-i2-tenant-safety\.md/qg-i2.md/g' \
  -e 's/qg-i3-agent-safety\.md/qg-i3.md/g' \
  -e 's/qg-p1-production-readiness\.md/qg-p1.md/g' \
  -e 's/qg-m3-tools\.md/qg-m3.md/g' \
  -e 's/qg-s1-module-readiness\.md/qg-s2.md/g' \
  -e 's/qg-s3-security-baseline\.md/qg-s3.md/g' \
  -e 's/qg-s4-ai-security\.md/qg-s4.md/g' \
  -e 's/qg-security-continuous\.md/qg-ops.md/g' \
  -e 's/qg-compliance-continuous\.md/qg-ops.md/g' \
  -e 's/qg-incident-response\.md/qg-ir.md/g' \
  -e 's/qg-security-audit\.md/qg-s4.md/g' \
  -e 's/qg-post-deployment\.md/qg-p1.md/g' \
  -e 's/qg-disaster-recovery-drill\.md/qg-dr.md/g' \
  -e 's/qg-capacity-planning\.md/qg-cp1.md/g' \
  -e 's/qg-ai-observability\.md/qg-ai2.md/g' \
  -e 's/qg-ai1-ai-safety\.md/qg-ai1.md/g' \
  -e 's/qg-ai3-agent-contracts\.md/qg-ai3.md/g' \
  -e 's/qg-operations-continuous\.md/qg-ops.md/g' \
  -e 's/qg-performance-review\.md/qg-ops.md/g' \
  -e 's/qg-dev1-pre-commit\.md/qg-dev1.md/g' \
  -e 's/qg-tc1-tenant-unit-coverage\.md/qg-tc1.md/g' \
  -e 's/qg-tc2-rls-coverage\.md/qg-tc2.md/g' \
  -e 's/qg-tc3-cross-tenant-coverage\.md/qg-tc3.md/g' \
  -e 's/qg-bv1-billing-validation\.md/qg-bv1.md/g' \
  -e 's/qg-ce1-chaos-engineering\.md/qg-ce1.md/g' \
  -e 's/qg-lt1-load-testing\.md/qg-lt1.md/g' \
  -e 's/qg-prg-production\.md/qg-prg.md/g' \
  src-v2/data/quality-gates.csv
```

- [ ] **Step 2: Verify changes**

```bash
grep -c "\.md" src-v2/data/quality-gates.csv
```

Expected: All checklist references now use short names

- [ ] **Step 3: Commit**

```bash
git add src-v2/data/quality-gates.csv
git commit -m "fix(v2): align checklist references to V2 short names"
```

---

## Task 5: Create missing qg-prg.md checklist

**Files:**
- Create: `src-v2/data/checklists/qg-prg.md`

- [ ] **Step 1: Create PRG gate checklist**

Create file `src-v2/data/checklists/qg-prg.md` with content:

```markdown
---
name: qg-prg-production-readiness-gate
description: Production-Readiness Gate - final gate before production deployment
module: bam
tags: [quality-gate, production, nexus, prg]
version: 2.0.0
---

# QG-PRG: Production-Readiness Gate Checklist

> **Gate ID:** QG-PRG (Production-Readiness Gate)
> **Definition:** Final gate validating all NEXUS requirements before production deployment.
> **Scope:** Action contracts, tenant isolation, observability, chaos testing, human review.
> **Recovery:** Address specific failing checks before re-validation.

**Workflow:** bmad-bam-prg-gate-setup, bmad-bam-production-readiness
**Prerequisites:** QG-I1, QG-I2, QG-I3

---

## Purpose

The Production-Readiness Gate (QG-PRG) validates all 10 NEXUS production requirements are met before deployment.

---

## NEXUS 10-Point Checklist

### Action Contract Validation
- [ ] **CRITICAL:** All action contracts have 8-field schema complete
- [ ] **CRITICAL:** Confidence thresholds configured per action type
- [ ] Proof certificates enabled for audit trail
- [ ] Loop bindings verified for all agent loops

### Tenant Isolation
- [ ] **CRITICAL:** Tenant isolation verified (no cross-tenant data access)
- [ ] RLS policies tested with cross-tenant attack simulation
- [ ] Tenant context propagation verified across async boundaries

### Rollback & Recovery
- [ ] **CRITICAL:** Rollback tested successfully (< 5 min recovery)
- [ ] Blue-green deployment configured
- [ ] Feature flags ready for kill switches

### Audit Trail
- [ ] **CRITICAL:** Audit trail complete for all agent actions
- [ ] Action gateway logging all mutations
- [ ] Compliance evidence collection automated

### Resource Budgets
- [ ] Resource budgets configured per tenant tier
- [ ] Token limits enforced per request/session
- [ ] Cost tracking active with alerts

### Confidence Thresholds
- [ ] **CRITICAL:** Confidence thresholds set for all AI actions
- [ ] Low-confidence actions route to human review
- [ ] Threshold tuning documented

### Loop Bindings
- [ ] Agent loops have max iteration limits
- [ ] Watchdog timeouts configured
- [ ] Infinite loop detection active

### Observability
- [ ] LLM metrics collected (latency, tokens, cost)
- [ ] Tenant-scoped dashboards available
- [ ] Alerting configured for anomalies

### Chaos Testing
- [ ] Critical failure scenarios tested
- [ ] Recovery verified for each scenario
- [ ] Blast radius contained

### Human Review
- [ ] **CRITICAL:** Human review sign-off obtained
- [ ] Security review completed
- [ ] Architecture review approved

---

## Gate Decision

| Classification | Criteria |
|----------------|----------|
| **PASS** | All CRITICAL items pass, >=80% non-critical pass |
| **CONDITIONAL** | All CRITICAL pass, <80% non-critical with remediation plan |
| **FAIL** | Any CRITICAL item fails |

---

## Recovery Protocol

**If QG-PRG fails:**

1. Identify failed CRITICAL categories
2. Address specific failing checks
3. Re-run QG-PRG validation
4. Escalate if 3 consecutive failures

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 2.0.0 | 2026-04-28 | BAM V2 | Initial V2 checklist |
```

- [ ] **Step 2: Commit**

```bash
git add src-v2/data/checklists/qg-prg.md
git commit -m "feat(v2): add qg-prg production-readiness gate checklist"
```

---

## Task 6: Create missing qg-s2.md checklist

**Files:**
- Create: `src-v2/data/checklists/qg-s2.md`

- [ ] **Step 1: Create S2 module readiness checklist**

Create file `src-v2/data/checklists/qg-s2.md` with content:

```markdown
---
name: qg-s2-module-implementation-readiness
description: Module Implementation Readiness - validates module ready for sprint
module: bam
tags: [quality-gate, module, sprint, stories]
version: 2.0.0
---

# QG-S2: Module Implementation Readiness Checklist

> **Gate ID:** QG-S2 (Module Implementation Readiness)
> **Definition:** Validates module is ready for implementation sprint.
> **Scope:** Stories defined, acceptance criteria clear, test plan ready.
> **Recovery:** Run create-module-epics workflow.

**Workflow:** bmad-bam-create-module-epics, bmad-bam-validate-module
**Prerequisites:** QG-S1

---

## Purpose

Validates that a module has complete stories with acceptance criteria before sprint begins.

---

## Stories & Acceptance Criteria

- [ ] **CRITICAL:** All stories have acceptance criteria defined
- [ ] **CRITICAL:** Story estimates provided (story points or t-shirt)
- [ ] Stories mapped to module boundaries
- [ ] Dependencies between stories documented
- [ ] Technical debt stories included if applicable

---

## Test Plan

- [ ] **CRITICAL:** Test plan exists for module
- [ ] Unit test coverage targets defined
- [ ] Integration test scenarios documented
- [ ] Tenant isolation test cases included

---

## Sprint Readiness

- [ ] Sprint backlog prioritized
- [ ] Team capacity confirmed
- [ ] Dependencies with other modules identified
- [ ] Definition of Done agreed

---

## Gate Decision

| Classification | Criteria |
|----------------|----------|
| **PASS** | All CRITICAL pass, stories ready for sprint |
| **CONDITIONAL** | All CRITICAL pass, minor gaps with mitigation |
| **FAIL** | Any CRITICAL fails |

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 2.0.0 | 2026-04-28 | BAM V2 | Initial V2 checklist |
```

- [ ] **Step 2: Commit**

```bash
git add src-v2/data/checklists/qg-s2.md
git commit -m "feat(v2): add qg-s2 module implementation readiness checklist"
```

---

## Task 7: Migrate master-architecture.md template

**Files:**
- Modify: `src-v2/data/templates/master-architecture.md`
- Source: `src/data/templates/master-architecture-template.md`

- [ ] **Step 1: Read V1 template and copy content structure to V2**

Migrate content from `src/data/templates/master-architecture-template.md` maintaining:
- YAML frontmatter
- FILL directives
- Domain-specific sections
- Web Research Queries section
- Verification Checklist
- Change Log

- [ ] **Step 2: Verify migrated template**

```bash
wc -l src-v2/data/templates/master-architecture.md
```

Expected: ~130 lines (similar to V1)

- [ ] **Step 3: Commit**

```bash
git add src-v2/data/templates/master-architecture.md
git commit -m "feat(v2): migrate master-architecture template from V1"
```

---

## Tasks 8-14: Migrate Remaining Core Templates

Follow same pattern as Task 7 for:
- Task 8: module-architecture.md
- Task 9: tenant-isolation.md
- Task 10: agent-runtime.md
- Task 11: facade-contract.md
- Task 12: convergence-report.md
- Task 13: production-readiness.md
- Task 14: requirements-analysis.md, module-epic.md, validation-report.md (batch)

Each template should have:
- YAML frontmatter with name, description, category, version, type, web_research_enabled
- Purpose section
- Domain-specific content with FILL directives
- Tables with proper headers
- Web Research Queries section
- Verification Checklist
- Change Log

---

## Tasks 15-17: Migrate Operational Templates (3 batches of 5)

**Task 15 Files:** billing-design, compliance-mapping, caching-strategy, data-residency, event-architecture
**Task 16 Files:** incident-response, observability-design, scaling-design, security-architecture, tenant-onboarding
**Task 17 Files:** tenant-offboarding, white-label-config, cost-model, capacity-plan, decision-log

Each operational template follows pattern:
- YAML frontmatter
- Purpose section
- Domain-specific tables and sections
- Web Research Queries
- Change Log

---

## Tasks 18-20: Migrate Workflow Templates (3 batches of 5)

**Task 18 Files:** agent-debug-report, agent-trace, api-version, cross-module-story, gate-checklist
**Task 19 Files:** integration-test-plan, llm-version, memory-tier, tool-contract, research-findings
**Task 20 Files:** migration-plan, rollback-plan, runbook, sla-definition, testing-strategy

Each workflow template follows pattern:
- YAML frontmatter
- Purpose section
- Workflow-specific content
- Change Log

---

## Task 21: Update test assertions

**Files:**
- Modify: `test/install.test.js`
- Modify: `test/checklist-format.test.js`

- [ ] **Step 1: Verify test file paths reference correct directories**

```bash
grep -l "src/data\|src-v2/data" test/*.test.js
```

- [ ] **Step 2: Update expected counts if needed**

- [ ] **Step 3: Run tests**

```bash
npm test
```

Expected: All tests pass

- [ ] **Step 4: Commit**

```bash
git add test/
git commit -m "test(v2): update assertions for V2 content counts"
```

---

## Task 22: Final verification

- [ ] **Step 1: Verify all templates have content (>60 lines)**

```bash
find src-v2/data/templates -name "*.md" -exec wc -l {} \; | awk '$1 < 60 {print "STUB:", $2}'
```

Expected: No output (no stubs)

- [ ] **Step 2: Verify all 6 CSVs exist**

```bash
ls src-v2/data/*.csv | wc -l
```

Expected: 6

- [ ] **Step 3: Verify checklist alignment**

```bash
python3 -c "
import csv, os
with open('src-v2/data/quality-gates.csv') as f:
    missing = [r['checklist_file'] for r in csv.DictReader(f) 
               if r.get('checklist_file') and not os.path.exists(f\"src-v2/data/checklists/{r['checklist_file']}\")]
print('Missing:', missing) if missing else print('All checklists exist')
"
```

Expected: "All checklists exist"

- [ ] **Step 4: Run full test suite**

```bash
npm test
```

Expected: All tests pass

---

## Summary

| Gap | Tasks | Files |
|-----|-------|-------|
| 3 Missing CSVs | 1-3 | 3 created |
| Checklist naming | 4-6 | 1 modified, 2 created |
| 10 Core templates | 7-14 | 10 modified |
| 15 Operational templates | 15-17 | 15 modified |
| 15 Workflow templates | 18-20 | 15 modified |
| Test assertions | 21 | 2 modified |
| Verification | 22 | - |

**Total: 22 tasks, 48 files**
