# Step 05: Compile Caching Design Document

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER compile document without loading Steps 01-04 context first**
- 📖 **CRITICAL: ALWAYS read the complete step file before taking any action**
- 🔄 **CRITICAL: Compile ALL sections from previous steps into final document**
- ⏸️ **ALWAYS pause after presenting compiled document for user confirmation via A/P/C**
- 🎯 **Focus ONLY on document compilation - this is the final Create mode step**
- ✅ CRITICAL: Verify all cache layers, invalidation, and performance are included
- 📋 Use caching design template for consistent structure
- 💾 Output to `{output_folder}/planning-artifacts/caching-design.md`

---

## EXECUTION PROTOCOLS

- 🎯 **Focus:** Compile final caching design document from Steps 01-04
- 💾 **Track:** Save to `{output_folder}/planning-artifacts/caching-design.md`
- 📖 **Context:** Reference `{project-root}/_bmad/bam/data/templates/caching-strategy.md`
- 🚫 **Do NOT:** Proceed without explicit user confirmation via A/P/C
- 🔍 **Use web search:** Not required for compilation step
- ⚠️ **Gate:** Document feeds QG-M2 cache dimension validation; Create mode completes

---

## CONTEXT BOUNDARIES

This step operates within these boundaries:

- **Input context:** All design decisions from Steps 01-04
- **Template:** `{project-root}/_bmad/bam/data/templates/caching-strategy.md`
- **Output:** `{output_folder}/planning-artifacts/caching-design.md`
- **Quality gate:** Document enables QG-M2 cache validation

---

## YOUR TASK

Compile the complete caching design document using all design decisions from Steps 01-04. Load the caching design template, populate all sections with the design decisions, and save the final document. Present the compiled document via A/P/C menu for user confirmation before saving.

---

## Main Sequence

### Action 1: Load Design Decisions from Steps 01-04

**Gather all design decisions:**

| Step | Content | Status |
|------|---------|--------|
| Step 01 | Cache layer architecture, key patterns | [ ] Loaded |
| Step 02 | Tenant-scoped caching, TTL by tier | [ ] Loaded |
| Step 03 | Invalidation strategy, circuit breaker | [ ] Loaded |
| Step 04 | Performance monitoring, eviction policies | [ ] Loaded |

### Action 2: Load Caching Design Template

**Read template:**

```
{project-root}/_bmad/bam/data/templates/caching-strategy.md
```

If template not found, use default structure below.

### Action 3: Compile Document

**Populate the caching design document:**

```markdown
---
name: caching-design
description: Tenant-aware caching strategy design
category: architecture
version: 1.0.0
date: {current_date}
tenant_model: {from_master_architecture}
stepsCompleted: [1, 2, 3, 4, 5]
---

# Tenant-Aware Caching Design

## Executive Summary

This document defines the multi-layer caching strategy for the {{project_name}} platform, ensuring tenant isolation, optimal performance, and cache consistency across all cache tiers.

**Tenant Model:** {{tenant_model}}
**Cache Layers:** L1 (In-Memory), L2 (Distributed), CDN
**Key Pattern:** `tenant:{tenant_id}:{type}:{key}`

---

## 1. Cache Layer Architecture

### 1.1 L1 In-Memory Cache

| Aspect | Configuration |
|--------|---------------|
| Technology | {from Step 01} |
| Scope | Per-process, request-scoped |
| Isolation | Process isolation + tenant context |
| TTL | {from Step 02} |

### 1.2 L2 Distributed Cache

| Aspect | Configuration |
|--------|---------------|
| Technology | {from Step 01} |
| Cluster Mode | {from Step 01} |
| Isolation | Tenant-prefixed keys |
| TTL by Tier | {from Step 02} |

### 1.3 CDN Cache

| Aspect | Configuration |
|--------|---------------|
| Technology | {from Step 01} |
| Isolation | Header-based (X-Tenant-ID) |
| Vary Headers | Accept-Encoding, X-Tenant-ID |

---

## 2. Cache Key Strategy

### 2.1 Key Pattern

```
tenant:{tenant_id}:{type}:{key}
```

### 2.2 Key Types

| Type | Pattern | Example |
|------|---------|---------|
| Session | `tenant:{id}:session:{sid}` | `tenant:acme:session:abc123` |
| Entity | `tenant:{id}:entity:{type}:{pk}` | `tenant:acme:entity:user:42` |
| Query | `tenant:{id}:query:{hash}` | `tenant:acme:query:a1b2c3` |

---

## 3. TTL Policies

### 3.1 TTL by Tier

| Tier | Session | Entity | Query |
|------|---------|--------|-------|
| Free | {from Step 02} | {from Step 02} | {from Step 02} |
| Pro | {from Step 02} | {from Step 02} | {from Step 02} |
| Enterprise | {from Step 02} | {from Step 02} | {from Step 02} |

---

## 4. Cache Invalidation

### 4.1 Event-Driven Invalidation

| Event Type | Affected Caches | Scope |
|------------|-----------------|-------|
| Entity Events | {from Step 03} | Tenant-scoped |
| Tenant Events | {from Step 03} | Single tenant |
| System Events | {from Step 03} | Global |

### 4.2 Cross-Module Coordination

| Pattern | Implementation |
|---------|----------------|
| {from Step 03} | {description} |

### 4.3 Circuit Breaker

| Layer | Failure Threshold | Reset Timeout |
|-------|-------------------|---------------|
| L1 | {from Step 03} | {from Step 03} |
| L2 | {from Step 03} | {from Step 03} |

---

## 5. Performance Monitoring

### 5.1 Hit Rate Targets

| Tier | L1 | L2 | CDN |
|------|----|----|-----|
| Free | {from Step 04} | {from Step 04} | {from Step 04} |
| Pro | {from Step 04} | {from Step 04} | {from Step 04} |
| Enterprise | {from Step 04} | {from Step 04} | {from Step 04} |

### 5.2 Memory Allocation

| Tier | L2 Quota |
|------|----------|
| Free | {from Step 04} |
| Pro | {from Step 04} |
| Enterprise | {from Step 04} |

### 5.3 Hot Key Mitigation

| Strategy | Trigger |
|----------|---------|
| {from Step 04} | {threshold} |

### 5.4 Eviction Policies

| Tier | Policy |
|------|--------|
| Free | {from Step 04} |
| Pro | {from Step 04} |
| Enterprise | {from Step 04} |

---

## 6. Cache Warming

### 6.1 Warming Strategies

| Trigger | Strategy |
|---------|----------|
| Tenant Onboarding | {from Step 02} |
| Scheduled | {from Step 02} |
| Lazy | {from Step 02} |

---

## 7. Quality Gate Integration

This document supports QG-M2 (Tenant Isolation) cache dimension validation:

| Check | Evidence Location |
|-------|-------------------|
| Tenant-prefixed keys | Section 2.1 |
| No cross-tenant pollution | Section 2.2, 4.1 |
| Invalidation strategy | Section 4 |
| Performance monitoring | Section 5 |

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | {date} | Create Mode | Initial caching design |
```

### Action 4: Present Document for Confirmation

**Display compiled document summary:**

```
================================================================================
CACHING DESIGN DOCUMENT COMPILED
================================================================================
Document: caching-design.md
Version: 1.0.0
Tenant Model: {tenant_model}
================================================================================

DOCUMENT SECTIONS:
1. Cache Layer Architecture - L1, L2, CDN configured
2. Cache Key Strategy - Tenant-prefixed patterns defined
3. TTL Policies - Per-tier TTL documented
4. Cache Invalidation - Event-driven, cross-module, circuit breaker
5. Performance Monitoring - Hit rates, memory, hot keys, eviction
6. Cache Warming - Onboarding, scheduled, lazy strategies
7. Quality Gate Integration - QG-M2 evidence locations

================================================================================
Steps Completed: [1, 2, 3, 4, 5]
Output Location: {output_folder}/planning-artifacts/caching-design.md
================================================================================
```

---

## COLLABORATION MENUS (A/P/C):

After presenting compiled document:

```
Your options:
- **A (Advanced Elicitation)**: Review specific sections before saving
- **P (Party Mode)**: Final review from architecture and operations
- **C (Continue)**: Save document and complete Create mode

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):

Invoke `bmad-advanced-elicitation` skill to explore:

- **Section gaps:** Are any sections incomplete?
- **Consistency check:** Do all sections align?
- **Integration concerns:** Does design integrate with other modules?
- **Documentation clarity:** Is the document clear and actionable?

Pass context: Compiled document, specific section concerns.

**After processing enhanced insights, return to A/P/C menu.**

#### If 'P' (Party Mode):

Invoke `bmad-party-mode` skill with context:

```
Final review of caching design document before saving
```

Gather perspectives from:

| Persona | Focus Area | Key Questions |
|---------|------------|---------------|
| Architect | Completeness | Does design cover all requirements? |
| DevOps | Operations | Can team implement and operate this? |
| Security | Isolation | Is tenant isolation properly documented? |

Process multi-perspective analysis and synthesize feedback.

**After processing perspectives, return to A/P/C menu.**

#### If 'C' (Continue):

1. Save compiled document:

**Output to:** `{output_folder}/planning-artifacts/caching-design.md`

2. Update workflow state:

```yaml
stepsCompleted:
  - step-01-c-start
  - step-02-c-analyze
  - step-03-c-design
  - step-04-c-document
  - step-05-c-complete  # Add this
workflowStatus: COMPLETE
```

3. Present completion summary:

```
================================================================================
CREATE MODE COMPLETE
================================================================================
Document saved: {output_folder}/planning-artifacts/caching-design.md
Version: 1.0.0
Status: Ready for validation

NEXT STEPS:
- [V] Run Validate mode (step-20-v-*) to verify against QG-M2
- [E] Run Edit mode (step-10-e-*) to modify design
- [I] Proceed to implementation

================================================================================
```

---

## SUCCESS METRICS

- ✅ All design decisions from Steps 01-04 loaded
- ✅ Template loaded and populated
- ✅ All document sections complete
- ✅ Document compiled with consistent structure
- ✅ User confirmed document via A/P/C menu
- ✅ Document saved to correct location
- ✅ Workflow state updated to COMPLETE

---

## FAILURE MODES

- ❌ Missing step context - cannot compile complete document
- ❌ Template not found - use default structure
- ❌ Incomplete sections - flag for user review
- ❌ Save failure - retry with alternate location
- ❌ Confirmation denied - return to A/P/C menu

---

## Verification

- [ ] Steps 01-04 context loaded
- [ ] Template applied
- [ ] All sections populated
- [ ] Document preview presented
- [ ] User confirmation received
- [ ] Document saved successfully
- [ ] Workflow marked complete

---

## Outputs

- **Caching Design Document:** `{output_folder}/planning-artifacts/caching-design.md`
- Workflow completion status
- Next step recommendations

---

## WORKFLOW COMPLETE

Create mode is complete. The caching design document is ready for:

| Next Action | Workflow |
|-------------|----------|
| **Validate** | Run Validate mode (`step-20-v-*`) to verify QG-M2 cache dimension |
| **Edit** | Run Edit mode (`step-10-e-*`) to modify specific sections |
| **Implement** | Proceed to implementation with design as reference |

---

## Related Workflows

Based on completion, consider:

- `bmad-bam-tenant-isolation` - Overall tenant isolation (QG-M2)
- `bmad-bam-observability` - Integrate cache metrics into observability
- `bmad-bam-rate-limiting` - Coordinate with rate limiting strategy
