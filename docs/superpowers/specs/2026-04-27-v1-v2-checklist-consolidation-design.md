# V1 to V2 Checklist Consolidation Design Spec

**Version:** 1.1.0  
**Date:** 2026-04-27  
**Status:** Ready for Implementation

## Summary

Consolidate 38 V1 checklists into 29 V2 checklists using a gate-centric approach that preserves 100% of V1 content while achieving 24% file reduction, eliminating redundancy, and adding 3 new focused checklists for complete V2 step file reference coverage. All checklists follow an enhanced BMAD-compliant format with YAML frontmatter, prerequisite gates, phase alignment, and comprehensive recovery protocols.

## Problem Statement

**Current State:**
- V1 has 38 comprehensive checklists (8,805 total lines) with overlapping content
- V2 has only 8 minimal/skeletal checklists (~250 total lines, ~30 lines each) missing:
  - YAML frontmatter
  - Purpose section
  - Classification tables with CONDITIONAL/FAIL thresholds
  - Waiver process
  - Category-specific recovery
  - Related patterns/web research sections
- ~21 checklists referenced in V2 step files don't exist
- 30 unique checklist references in V2 step files, only 12 use correct gate names
- Redundant aggregate checklists (qg-sec-checklist, qg-prod-checklist, qg-tenant-checklist) duplicate content from focused gates

**Goals:**
- Preserve 100% of V1 checklist content and purpose
- Follow V2 consolidation philosophy (fewer, focused files)
- Eliminate redundancy from aggregate checklists
- Ensure all V2 step file references resolve to valid checklists

## Solution: Gate-Centric Consolidation

### Approach

1. **Keep focused QG gates as primary** - Each quality gate has ONE authoritative checklist
2. **Merge aggregate checklists INTO focused gates** - Distribute content, drop aggregates
3. **Use short V2 naming convention** - `qg-f1.md` not `qg-f1-foundation.md`
4. **Apply enhanced BMAD-compliant format** - Comprehensive structure for all files

### File Consolidation Map

#### Core Gates (8 files)

| V2 Target | V1 Source(s) | Action | Est. Lines |
|-----------|--------------|--------|------------|
| `qg-f1.md` | qg-f1-foundation.md | Direct rename | ~145 |
| `qg-m1.md` | qg-m1-module-architecture.md + qg-s1-module-readiness.md | Merge | ~230 |
| `qg-m2.md` | qg-m2-tenant-isolation.md | Direct rename | ~160 |
| `qg-m3.md` | qg-m3-agent-runtime.md + qg-m3-tools.md | Merge | ~250 |
| `qg-i1.md` | qg-i1-convergence.md | Direct rename | ~160 |
| `qg-i2.md` | qg-i2-tenant-safety.md | Direct rename | ~140 |
| `qg-i3.md` | qg-i3-agent-safety.md | Direct rename | ~245 |
| `qg-p1.md` | qg-p1-production-readiness.md + qg-prg-production.md + qg-prod-checklist.md (pre-deploy) | Merge | ~400 |

#### Specialized Gates (14 files)

| V2 Target | V1 Source(s) | Action | Est. Lines |
|-----------|--------------|--------|------------|
| `qg-pl1.md` | qg-pl1-planning.md | Direct rename | ~200 |
| `qg-d1.md` | qg-d1-discovery.md | Direct rename | ~165 |
| `qg-tc1.md` | qg-tc1-tenant-unit-coverage.md + tenant-checklist sections | Merge | ~180 |
| `qg-tc2.md` | qg-tc2-rls-coverage.md + tenant-checklist sections | Merge | ~170 |
| `qg-tc3.md` | qg-tc3-cross-tenant-coverage.md + tenant-checklist sections | Merge | ~200 |
| `qg-ai1.md` | qg-ai1-ai-safety.md | Direct rename | ~320 |
| `qg-ai2.md` | qg-ai-observability.md | Rename | ~375 |
| `qg-ai3.md` | qg-ai3-agent-contracts.md | Direct rename | ~70 |
| `qg-bv1.md` | qg-bv1-billing-validation.md | Direct rename | ~280 |
| `qg-s3.md` | qg-s3-security-baseline.md + qg-sec-checklist.md + qg-security-audit.md + qg-security-continuous.md | Merge | ~500 |
| `qg-s4.md` | qg-s4-ai-security.md | Direct rename | ~240 |
| `qg-cp1.md` | qg-cp1-compliance.md + qg-compliance-continuous.md | Merge | ~400 |
| `qg-ce1.md` | qg-ce1-chaos-engineering.md | Direct rename | ~345 |
| `qg-lt1.md` | qg-lt1-load-testing.md | Direct rename | ~300 |

#### Operations Gates (3 files)

| V2 Target | V1 Source(s) | Action | Est. Lines |
|-----------|--------------|--------|------------|
| `qg-ops.md` | qg-operations-continuous.md + qg-post-deployment.md + qg-capacity-planning.md + qg-performance-review.md + qg-prod-checklist.md (post-deploy) | NEW consolidated | ~450 |
| `qg-ir.md` | qg-incident-response.md | Direct rename | ~230 |
| `qg-dr.md` | qg-disaster-recovery-drill.md | Direct rename | ~260 |

#### Developer Gate (1 file)

| V2 Target | V1 Source | Action | Est. Lines |
|-----------|-----------|--------|------------|
| `qg-dev1.md` | qg-dev1-pre-commit.md | Direct rename | ~115 |

#### New Focused Checklists (3 files)

| V2 Target | V1 Source | Action | Est. Lines |
|-----------|-----------|--------|------------|
| `qg-av1.md` | None (NEW) | Create from web research + qg-i1 API sections | ~150 |
| `qg-rr1.md` | None (NEW) | Create from web research + BMM discovery patterns | ~120 |
| `qg-wl1.md` | None (NEW) | Create from web research + tenant-models.csv | ~140 |

### Consolidation Summary

| Metric | V1 | V2 | Change |
|--------|----|----|--------|
| Total files | 38 | 29 | -24% |
| Total lines | ~8,805 | ~6,500 | -26% (deduplication) |
| Avg lines/file | ~232 | ~224 | -3% |
| Redundant aggregates | 4 | 0 | -100% |
| New focused checklists | 0 | 3 | +3 (qg-av1, qg-rr1, qg-wl1) |

---

## Standard Checklist Format (Enhanced)

All V2 checklists follow this BMAD-compliant structure:

```markdown
---
name: {gate-id}-{short-name}
description: {One-line description}
module: bam
tags: [{category}, {subcategory}, multi-tenant, {domain}]
---

# QG-{ID}: {Gate Name}

> Gate ID: QG-{ID} ({Full Name})
> {One-line gate purpose - what MUST be verified}
> Gate definition: {detailed verification scope}
> Workflow integration: {which BAM workflows feed into this gate}
> Executing workflow: `bmad-bam-{workflow}` ({phase})
>
> **Prerequisite Gate:** QG-{ID} must pass before QG-{NEXT} (if applicable)
> **Phase Gate:** QG-{ID} is evaluated at end of {Phase} phase (BMM Phase {N})

## Purpose

{2-3 sentences explaining WHY this gate exists, what risks it mitigates, and its role in the quality gate sequence.}

---

## {Category 1}

### {Subcategory 1.1}

- [ ] **CRITICAL:** {Critical check item}
- [ ] **CRITICAL:** {Critical check item}
- [ ] {Standard check item}
- [ ] {Standard check item}

### {Subcategory 1.2}

- [ ] **CRITICAL:** {Critical check item}
- [ ] {Standard check item}

## {Category 2}

### {Subcategory 2.1}

- [ ] **CRITICAL:** {Critical check item}
- [ ] {Standard check item}

{Continue for all categories...}

---

## Gate Decision

| Outcome | Criteria |
|---------|----------|
| **PASS** | All CRITICAL items pass, ≥80% non-critical pass |
| **CONDITIONAL** | All CRITICAL items pass, <80% non-critical + remediation plan |
| **FAIL** | Any CRITICAL item fails |
| **WAIVED** | Non-critical item waived with stakeholder sign-off |

## Critical vs Non-Critical Classification

| Category | Classification | CONDITIONAL Threshold | FAIL Threshold |
|----------|----------------|----------------------|----------------|
| {Category 1} | CRITICAL | {partial state} | {failure state} |
| {Category 2} | CRITICAL | {partial state} | {failure state} |
| {Category 3} | Non-critical | {partial state} | N/A |

## Waiver Process

For non-critical items that cannot be addressed:
1. Document the specific item and reason for waiver
2. Identify business justification
3. Obtain stakeholder sign-off (Product Owner or Technical Lead)
4. Record waiver in gate report with expiration date (if applicable)
5. Create follow-up ticket for future remediation

**Note:** CRITICAL items cannot be waived.

## Recovery Protocol

**If QG-{ID} fails:**

1. **Attempt 1:** Immediate remediation (target: {timeframe})
   - {Specific recovery actions for this gate}
   - Re-run QG-{ID} validation after fixes
   - **Lock passed categories** — do not re-test locked items

2. **Attempt 2:** Deep investigation (target: {timeframe})
   - Engage {relevant roles} for review
   - {Deeper investigation actions}
   - Re-run QG-{ID} validation after remediation
   - **Preserve locked categories** from Attempt 1

3. **Mandatory Course Correction:**
   - Escalate to {leadership roles}
   - Document failure patterns and blocking issues
   - {Course correction actions}
   - Schedule follow-up validation within {timeframe}

**Category-Specific Recovery:**

| Category | Immediate Action | Escalation Trigger |
|----------|------------------|-------------------|
| {Category 1} | {action} | {trigger} |
| {Category 2} | {action} | {trigger} |

## Related Workflows

- `bmad-bam-{workflow1}` - {relationship/trigger}
- `bmad-bam-{workflow2}` - {relationship/trigger}

## Required Templates

- `{project-root}/_bmad/bam/data/templates/{template}.md` - {purpose}

## Related Patterns

Load decision criteria from pattern registry:

- **{Domain} patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `{category}-*`
- **{Model} patterns:** `{project-root}/_bmad/bam/data/{domain}.csv`

### Web Research

Use the `web_queries` column from pattern registry:
- Search: "{relevant topic} best practices {date}"
- Search: "{specific verification} patterns {date}"

## Web Research Verification

- [ ] Search the web: "{gate-specific query} {date}" - {verification purpose}
- [ ] Search the web: "{gate-specific query} {date}" - {verification purpose}
- [ ] _Source: [URL]_ citations documented for key decisions

---

**PASS CRITERIA:** {Summary of passing state}
**OWNER:** {Responsible team/role}
**REVIEWERS:** {Review roles}
```

### Format Requirements

| Section | Required | Purpose |
|---------|----------|---------|
| YAML Frontmatter | Yes | Enables filtering, search, categorization |
| Header Block | Yes | Gate ID, definition, workflow integration |
| Prerequisite Gate | If applicable | Shows gate dependencies |
| Phase Gate | If applicable | Shows BMM phase alignment |
| Purpose | Yes | Explains WHY gate exists |
| Categories with Checkboxes | Yes | Actual validation items |
| Gate Decision Table | Yes | 4 outcomes (PASS/CONDITIONAL/FAIL/WAIVED) |
| Classification Table | Yes | 4 columns with thresholds |
| Waiver Process | Yes | Standard 5-step process |
| Recovery Protocol | Yes | 3 attempts with escalation |
| Category-Specific Recovery | Yes | Table mapping categories to actions |
| Related Workflows | Yes | Links to BAM workflows |
| Required Templates | If applicable | Template dependencies |
| Related Patterns | Yes | Pattern registry references |
| Web Research Verification | Yes | Web queries with `{date}` placeholder |
| Footer (PASS CRITERIA/OWNER/REVIEWERS) | Yes | Ownership and summary |

---

## Merge Rules

### Major Merges

#### 1. qg-p1.md (Production Readiness)

**Sources:** qg-p1-production-readiness.md + qg-prg-production.md + qg-prod-checklist.md (pre-deploy sections)

**Merge Process:**
1. Use qg-p1-production-readiness.md as BASE structure
2. Extract pre-deployment sections from qg-prod-checklist.md:
   - Infrastructure Readiness
   - Multi-Tenant Isolation
   - AI/ML Isolation (pre-deploy checks only)
3. Merge unique checks from qg-prg-production.md
4. Deduplicate overlapping checks (keep most specific wording)
5. Move post-deployment sections to qg-ops.md

#### 2. qg-s3.md (Security Baseline)

**Sources:** qg-s3-security-baseline.md + qg-sec-checklist.md + qg-security-audit.md + qg-security-continuous.md

**Merge Process:**
1. Use qg-s3-security-baseline.md as BASE
2. Add from qg-sec-checklist.md (non-overlapping with qg-s4):
   - AI Model Security (model access, supply chain, inference)
   - Prompt and Input Security (injection, jailbreak, validation)
3. Add "Continuous Monitoring" section from qg-security-continuous.md
4. Add "Periodic Audit" section from qg-security-audit.md
5. Deduplicate: same check in multiple files → keep ONE with best wording

#### 3. qg-m1.md (Module Architecture)

**Sources:** qg-m1-module-architecture.md + qg-s1-module-readiness.md

**Merge Process:**
1. Use qg-m1-module-architecture.md as BASE
2. Add "Module Readiness" subsection from qg-s1
3. Update Classification table to include new category

#### 4. qg-m3.md (Agent Runtime)

**Sources:** qg-m3-agent-runtime.md + qg-m3-tools.md

**Merge Process:**
1. Use qg-m3-agent-runtime.md as BASE
2. Add "Tool Contracts" section from qg-m3-tools.md
3. Merge Recovery Protocol category tables

#### 5. qg-cp1.md (Compliance)

**Sources:** qg-cp1-compliance.md + qg-compliance-continuous.md

**Merge Process:**
1. Use qg-cp1-compliance.md as BASE
2. Add "Continuous Compliance Monitoring" section
3. Merge Web Research queries

#### 6. qg-ops.md (Operations) - NEW FILE

**Sources:** qg-operations-continuous.md + qg-post-deployment.md + qg-capacity-planning.md + qg-performance-review.md + qg-prod-checklist.md (post-deploy sections)

**Merge Process:**
1. Create NEW file with structure:
   - Post-Deployment Verification (from qg-post-deployment + qg-prod-checklist)
   - Continuous Operations (from qg-operations-continuous)
   - Capacity Planning (from qg-capacity-planning)
   - Performance Review (from qg-performance-review)
2. Mark each section with execution frequency:
   - Post-deploy: Once after each deployment
   - Quarterly: Capacity planning, performance review
   - Continuous: Operations monitoring
3. Consolidate Recovery Protocols into unified operations recovery

#### 7. qg-tc1/tc2/tc3.md (TEA Coverage)

**Sources:** qg-tc1-tenant-unit-coverage.md + qg-tc2-rls-coverage.md + qg-tc3-cross-tenant-coverage.md + qg-tenant-checklist.md

**Merge Process:**
1. Each TC file gets its BASE content (direct rename)
2. Distribute qg-tenant-checklist.md sections:
   - Unit test related → qg-tc1.md
   - RLS policy related → qg-tc2.md
   - Cross-tenant boundary related → qg-tc3.md
3. Drop qg-tenant-checklist.md after distribution

### Deduplication Rules

| Rule | Action |
|------|--------|
| Identical checks | Keep ONE, prefer most specific wording |
| Similar checks (>80% overlap) | Merge into single check with combined scope |
| Same check, different categories | Keep in MOST relevant category only |
| Conflicting thresholds | Use STRICTER threshold |
| Web queries overlap | Keep unique queries only |

---

## Dropped Files (Content Absorbed)

These V1 files are dropped after their content is merged:

| File | Content Destination |
|------|---------------------|
| qg-prod-checklist.md | qg-p1.md (pre-deploy) + qg-ops.md (post-deploy) |
| qg-prg-production.md | qg-p1.md |
| qg-sec-checklist.md | qg-s3.md |
| qg-security-audit.md | qg-s3.md |
| qg-security-continuous.md | qg-s3.md |
| qg-tenant-checklist.md | qg-tc1.md + qg-tc2.md + qg-tc3.md |
| qg-s1-module-readiness.md | qg-m1.md |
| qg-m3-tools.md | qg-m3.md |
| qg-compliance-continuous.md | qg-cp1.md |
| qg-post-deployment.md | qg-ops.md |
| qg-operations-continuous.md | qg-ops.md |
| qg-capacity-planning.md | qg-ops.md |
| qg-performance-review.md | qg-ops.md |

**Total dropped:** 13 files (content preserved in merged targets)

---

## V2 Step File Reference Updates

V2 step files reference 30 unique checklist files. This section provides complete mapping.

### Core Gate References (Already Short-Named)

These references already use correct V2 naming - no updates needed:

| Reference | Status | Notes |
|-----------|--------|-------|
| `qg-f1.md` | ✓ Keep | Foundation gate |
| `qg-m1.md` | ✓ Keep | Module architecture |
| `qg-m2.md` | ✓ Keep | Tenant isolation |
| `qg-m3.md` | ✓ Keep | Agent runtime |
| `qg-i1.md` | ✓ Keep | Convergence |
| `qg-i2.md` | ✓ Keep | Tenant safety |
| `qg-i3.md` | ✓ Keep | Agent safety |
| `qg-p1.md` | ✓ Keep | Production readiness |
| `qg-pl1.md` | ✓ Keep | Planning gate |
| `qg-tc1.md` | ✓ Keep | Tenant unit coverage |
| `qg-tc2.md` | ✓ Keep | RLS coverage |
| `qg-tc3.md` | ✓ Keep | Cross-tenant coverage |

### Semantic Alias References (Require Mapping)

These semantic references need explicit mapping to gate checklists:

| Current Reference | Map To | Rationale |
|-------------------|--------|-----------|
| `requirements-checklist.md` | `qg-pl1.md` | Planning gate covers requirements validation |
| `data-residency-checklist.md` | `qg-cp1.md` | Compliance gate covers data residency |
| `tenant-onboarding-checklist.md` | `qg-ops.md` | Operations gate covers tenant onboarding |
| `scaling-design.md` | `qg-ops.md` | Operations gate covers capacity planning |
| `event-architecture.md` | `qg-i1.md` | Convergence gate covers event schemas |
| `billing-validation.md` | `qg-bv1.md` | Direct mapping to billing gate |
| `ai-observability.md` | `qg-ai2.md` | Direct mapping to AI observability gate |
| `ai-fallback.md` | `qg-ai1.md` | AI safety gate covers fallback strategies |
| `ai-cost.md` | `qg-ai2.md` | AI observability gate covers cost tracking |
| `cross-module-coordination.md` | `qg-i1.md` | Convergence gate covers cross-module |
| `compliance-continuous-verification.md` | `qg-cp1.md` | Compliance gate covers continuous verification |
| `qg-security-continuous.md` | `qg-s3.md` | Absorbed into security baseline |
| `cloudevents.md` | `qg-i1.md` | Convergence gate covers event architecture |
| `epic-validation.md` | `qg-pl1.md` | Planning gate covers epic validation |
| `tenant-lifecycle.md` | `qg-ops.md` | Operations gate covers tenant lifecycle |

### New Checklist Requirements

These semantic references have no V1 equivalent and require NEW focused checklists:

| Reference | Create As | Content Source |
|-----------|-----------|----------------|
| `api-versioning.md` | `qg-av1.md` | NEW - Extract from qg-i1.md API compatibility section |
| `research-report.md` | `qg-rr1.md` | NEW - Research/discovery validation checklist |
| `white-labeling-checklist.md` | `qg-wl1.md` | NEW - White-label customization validation |

### Reference Update Commands

```bash
# Run these sed commands to update V2 step file references
find src-v2/skills -name "*.md" -exec sed -i \
  -e 's|checklists/requirements-checklist\.md|checklists/qg-pl1.md|g' \
  -e 's|checklists/data-residency-checklist\.md|checklists/qg-cp1.md|g' \
  -e 's|checklists/tenant-onboarding-checklist\.md|checklists/qg-ops.md|g' \
  -e 's|checklists/scaling-design\.md|checklists/qg-ops.md|g' \
  -e 's|checklists/event-architecture\.md|checklists/qg-i1.md|g' \
  -e 's|checklists/billing-validation\.md|checklists/qg-bv1.md|g' \
  -e 's|checklists/ai-observability\.md|checklists/qg-ai2.md|g' \
  -e 's|checklists/ai-fallback\.md|checklists/qg-ai1.md|g' \
  -e 's|checklists/ai-cost\.md|checklists/qg-ai2.md|g' \
  -e 's|checklists/cross-module-coordination\.md|checklists/qg-i1.md|g' \
  -e 's|checklists/compliance-continuous-verification\.md|checklists/qg-cp1.md|g' \
  -e 's|checklists/qg-security-continuous\.md|checklists/qg-s3.md|g' \
  -e 's|checklists/cloudevents\.md|checklists/qg-i1.md|g' \
  -e 's|checklists/epic-validation\.md|checklists/qg-pl1.md|g' \
  -e 's|checklists/tenant-lifecycle\.md|checklists/qg-ops.md|g' \
  -e 's|checklists/api-versioning\.md|checklists/qg-av1.md|g' \
  -e 's|checklists/research-report\.md|checklists/qg-rr1.md|g' \
  -e 's|checklists/white-labeling-checklist\.md|checklists/qg-wl1.md|g' \
  {} \;
```

---

## Gate-to-Checklist Mapping (44 Gates → 29 Files)

The quality-gates.csv defines 44 quality gates. Multiple gates can share a checklist file when they validate related concerns.

### Checklist File Inventory (29 Files)

| V2 File | Gates Using This File | Primary Gate |
|---------|----------------------|--------------|
| `qg-d1.md` | QG-D1 | Discovery |
| `qg-pl1.md` | QG-PL1 | Planning |
| `qg-f1.md` | QG-F1 | Foundation |
| `qg-m1.md` | QG-M1, QG-S1, QG-M1-R | Module Architecture |
| `qg-m2.md` | QG-M2, QG-S7, QG-DC1 | Tenant Isolation |
| `qg-m3.md` | QG-M3, QG-M3-T | Agent Runtime |
| `qg-i1.md` | QG-I1 | Convergence |
| `qg-i2.md` | QG-I2 | Tenant Safety |
| `qg-i3.md` | QG-I3 | Agent Safety |
| `qg-p1.md` | QG-P1, QG-CS1, QG-MG1 | Production Readiness |
| `qg-s3.md` | QG-S3, QG-S5, QG-S8 | Security Baseline |
| `qg-s4.md` | QG-S4 | AI Security |
| `qg-ai1.md` | QG-AI1 | AI Safety |
| `qg-ai2.md` | QG-AI2 | AI Observability |
| `qg-ai3.md` | QG-AI3 | Agent Contracts |
| `qg-tc1.md` | QG-TC1 | Tenant Unit Coverage |
| `qg-tc2.md` | QG-TC2 | RLS Coverage |
| `qg-tc3.md` | QG-TC3 | Cross-Tenant Coverage |
| `qg-bv1.md` | QG-BV1 | Billing Validation |
| `qg-cp1.md` | QG-CP1, QG-S6, QG-CC | Compliance |
| `qg-ce1.md` | QG-CE1 | Chaos Engineering |
| `qg-lt1.md` | QG-LT1 | Load Testing |
| `qg-ops.md` | QG-PD1, QG-OC | Operations |
| `qg-ir.md` | QG-IR1, QG-S9 | Incident Response |
| `qg-dr.md` | QG-DR1 | Disaster Recovery |
| `qg-dev1.md` | QG-DEV1 | Pre-Commit |
| `qg-av1.md` | NEW | API Versioning |
| `qg-rr1.md` | NEW | Research Report |
| `qg-wl1.md` | NEW | White Labeling |

### Gate Sharing Rules

When multiple gates share a checklist:
1. **Primary gate** owns the file structure and critical checks
2. **Secondary gates** add supplementary sections (clearly labeled)
3. Each section header indicates which gate it serves: `## Section Name (QG-XX)`

### Example Multi-Gate Checklist Structure

```markdown
# QG-M2: Tenant Isolation (Primary)

## Core Tenant Isolation (QG-M2)
- [ ] **CRITICAL:** RLS policies defined
- [ ] **CRITICAL:** Tenant context propagation

## Data Protection Controls (QG-S7)
- [ ] Data classification implemented
- [ ] DLP policies active

## Data Classification (QG-DC1)
- [ ] Classification scheme defined
- [ ] Sensitivity labels applied
```

---

## New Checklist Specifications

Three checklists require NEW content (no V1 source):

### qg-av1.md (API Versioning)

**Purpose:** Validate API versioning strategy for multi-tenant compatibility

**Categories:**
- Version Strategy (CRITICAL)
- Deprecation Policy
- Client Compatibility
- Documentation

**Content Source:** Extract patterns from:
- `qg-i1-convergence.md` API compatibility sections
- Web search: "API versioning best practices SaaS {date}"

### qg-rr1.md (Research Report)

**Purpose:** Validate research/discovery artifacts before planning

**Categories:**
- Research Completeness (CRITICAL)
- Stakeholder Validation
- Scope Definition
- Risk Assessment

**Content Source:** 
- Web search: "product discovery validation checklist {date}"
- BMM discovery phase patterns

### qg-wl1.md (White Labeling)

**Purpose:** Validate white-label customization for reseller tenants

**Categories:**
- Branding Isolation (CRITICAL)
- Theme Configuration
- Domain Mapping
- Feature Flags

**Content Source:**
- Web search: "white label SaaS checklist multi-tenant {date}"
- BAM reseller patterns from `tenant-models.csv`

---

## Updated Consolidation Summary

| Metric | V1 | V2 | Change |
|--------|----|----|--------|
| Total checklist files | 38 | 29 | -24% |
| Total lines | ~8,805 | ~6,500 | -26% (deduplication) |
| Gates covered | 44 | 44 | 0% (full coverage) |
| Redundant aggregates | 4 | 0 | -100% |
| New checklists | 0 | 3 | +3 (api, research, white-label) |
| V2 step references resolved | 0% | 100% | +100% |

---

## Verification Checklist

After consolidation, verify:

| Check | Method |
|-------|--------|
| All 29 V2 files exist | `ls src-v2/data/checklists/*.md \| wc -l` = 29 |
| No CRITICAL items lost | Compare `grep -c "CRITICAL"` totals V1 vs V2 |
| All categories preserved | Compare category headers V1 vs V2 |
| Recovery protocols complete | Each file has 3-attempt structure |
| Web queries preserved | Compare `grep -c "Search the web"` totals |
| Classification tables complete | Each file has 4-column table |
| YAML frontmatter present | Each file starts with `---` block |
| All V2 step references resolve | `grep -r "checklists/" src-v2/skills/` all valid |
| Gate coverage complete | All 44 gates have checklist reference |
| Multi-gate sections labeled | Shared files have `(QG-XX)` section markers |
| New checklists created | qg-av1.md, qg-rr1.md, qg-wl1.md exist |

### Verification Commands

```bash
# Count V2 checklist files
ls src-v2/data/checklists/*.md | wc -l
# Expected: 29

# Count CRITICAL items preserved
grep -c "CRITICAL" src/data/checklists/*.md | awk -F: '{sum+=$2} END {print "V1:", sum}'
grep -c "CRITICAL" src-v2/data/checklists/*.md | awk -F: '{sum+=$2} END {print "V2:", sum}'
# V2 should be >= V1

# Verify all step file references resolve
for ref in $(grep -roh "checklists/[a-z0-9_-]*\.md" src-v2/skills/ | sort -u); do
  file="src-v2/data/$ref"
  [ -f "$file" ] && echo "✓ $ref" || echo "✗ MISSING: $ref"
done

# Verify YAML frontmatter
for f in src-v2/data/checklists/*.md; do
  head -1 "$f" | grep -q "^---" && echo "✓ $f" || echo "✗ NO FRONTMATTER: $f"
done
```

---

## Success Criteria

| Metric | Target |
|--------|--------|
| V2 checklist file count | 29 |
| Content preservation | 100% (no CRITICAL items lost) |
| Redundancy elimination | 0 duplicate checks across files |
| V2 step file references | 100% resolve to valid files |
| Format compliance | 100% files follow enhanced format |
| YAML frontmatter | 100% files have frontmatter |
| Gate coverage | 100% (all 44 gates mapped) |
| New checklists | 3 created (qg-av1, qg-rr1, qg-wl1) |

---

## Implementation Priority

### Phase 1: Core Gate Checklists (HIGH)

Enhance existing 8 V2 files and create merged versions:

| Priority | File | Action | Complexity |
|----------|------|--------|------------|
| 1 | `qg-f1.md` | Enhance with V1 content | Low |
| 2 | `qg-m1.md` | Merge qg-m1 + qg-s1 | Medium |
| 3 | `qg-m2.md` | Enhance with V1 content | Low |
| 4 | `qg-m3.md` | Merge qg-m3 + qg-m3-tools | Medium |
| 5 | `qg-i1.md` | Enhance with V1 content | Low |
| 6 | `qg-i2.md` | Enhance with V1 content | Low |
| 7 | `qg-i3.md` | Enhance with V1 content | Low |
| 8 | `qg-p1.md` | Merge qg-p1 + qg-prg + qg-prod (pre-deploy) | High |

### Phase 2: Planning & Testing Gates (HIGH)

| Priority | File | Action | Complexity |
|----------|------|--------|------------|
| 9 | `qg-pl1.md` | Direct rename | Low |
| 10 | `qg-d1.md` | Direct rename | Low |
| 11 | `qg-tc1.md` | Merge + tenant-checklist sections | Medium |
| 12 | `qg-tc2.md` | Merge + tenant-checklist sections | Medium |
| 13 | `qg-tc3.md` | Merge + tenant-checklist sections | Medium |

### Phase 3: AI & Security Gates (MEDIUM)

| Priority | File | Action | Complexity |
|----------|------|--------|------------|
| 14 | `qg-ai1.md` | Direct rename | Low |
| 15 | `qg-ai2.md` | Rename qg-ai-observability | Low |
| 16 | `qg-ai3.md` | Direct rename | Low |
| 17 | `qg-s3.md` | Mega-merge (4 files) | High |
| 18 | `qg-s4.md` | Direct rename | Low |

### Phase 4: Operations & Specialized Gates (MEDIUM)

| Priority | File | Action | Complexity |
|----------|------|--------|------------|
| 19 | `qg-bv1.md` | Direct rename | Low |
| 20 | `qg-cp1.md` | Merge qg-cp1 + compliance-continuous | Medium |
| 21 | `qg-ops.md` | NEW mega-merge (5 files) | High |
| 22 | `qg-ir.md` | Direct rename | Low |
| 23 | `qg-dr.md` | Direct rename | Low |
| 24 | `qg-ce1.md` | Direct rename | Low |
| 25 | `qg-lt1.md` | Direct rename | Low |
| 26 | `qg-dev1.md` | Direct rename | Low |

### Phase 5: New Focused Checklists (LOW)

| Priority | File | Action | Complexity |
|----------|------|--------|------------|
| 27 | `qg-av1.md` | Create NEW | Medium |
| 28 | `qg-rr1.md` | Create NEW | Medium |
| 29 | `qg-wl1.md` | Create NEW | Medium |

### Phase 6: Reference Updates & Cleanup

| Priority | Task | Complexity |
|----------|------|------------|
| 30 | Run sed commands to update V2 step file references | Low |
| 31 | Delete absorbed V1 files (13 files) | Low |
| 32 | Verify all references resolve | Low |
| 33 | Run verification commands | Low |

---

## Change Log

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-04-27 | Initial spec |
| 1.1.0 | 2026-04-27 | Added complete V2 reference mapping (30 files), gate-to-checklist mapping (44 gates), 3 new checklists, implementation priority |
