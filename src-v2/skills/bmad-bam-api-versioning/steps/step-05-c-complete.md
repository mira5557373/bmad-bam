# Step 5: Compile API Versioning Design

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 NEVER finalize document without all previous steps completed
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: Compile all designs from Steps 01-04 into final document
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- ✅ CRITICAL: Save to `{output_folder}/planning-artifacts/api-versioning-design.md`
- 📋 Include all sections: strategy, lifecycle, compatibility, migration
- 💬 Present final design with A/P/C menu for user confirmation
- 🌐 Include web research references in final document

---

## EXECUTION PROTOCOLS

- 🎯 Compile complete API versioning design document
- 💾 Track: `stepsCompleted: [1, 2, 3, 4, 5]` when complete
- 📖 Reference template: `{project-root}/_bmad/bam/data/templates/api-version.md`
- 🚫 DO NOT proceed without explicit user confirmation via A/P/C
- 📎 Include all working document content from previous steps
- ✅ Complete: Create mode workflow finishes with this step

---

## CONTEXT BOUNDARIES

This step operates within these boundaries:

- **Input context:** All designs from Steps 01-04
- **Template:** `{project-root}/_bmad/bam/data/templates/api-version.md`
- **Output:** Complete API versioning design document
- **Output location:** `{output_folder}/planning-artifacts/api-versioning-design.md`
- **Quality gate:** Document ready for QG-I1 validation

---

## YOUR TASK

Compile all API versioning designs from Steps 01-04 into a comprehensive design document. Include versioning strategy, version lifecycle, backward compatibility, and migration strategy. Save the complete document to the planning artifacts folder.

---

## Main Sequence

### 1. Load Template

**Read template from:**

```
{project-root}/_bmad/bam/data/templates/api-version.md
```

If template not found, use the structure defined below.

### 2. Compile Executive Summary

Generate executive summary with all design decisions:

```markdown
---
name: API Versioning Design
version: 1.0.0
date: {current_date}
tenant_model: {tenant_model}
versioning_strategy: {strategy}
qg_status: PENDING
stepsCompleted: [1, 2, 3, 4, 5]
---

# API Versioning Design

## Executive Summary

**Project:** {{project_name}}
**Date:** {current_date}
**Version:** 1.0.0

### Overview

This document defines the API versioning strategy for {{project_name}}, a multi-tenant SaaS platform. The versioning strategy ensures backward compatibility, clear deprecation timelines, and smooth tenant migration paths.

### Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Versioning Strategy | {strategy} | {reason} |
| Version Format | {format} | {reason} |
| Deprecation Timeline | {timeline} | {reason} |
| Tenant Pinning | {enabled/disabled} | {reason} |
| Rollout Strategy | {strategy} | {reason} |

### Scope

| Facade | Operations | Initial Version |
|--------|------------|-----------------|
| {facade1} | {count} | v1.0.0 |
| {facade2} | {count} | v1.0.0 |
```

### 3. Compile Versioning Strategy Section

Include all content from Step 01:

```markdown
## API Versioning Strategy

### Strategy Selection

**Selected Approach:** {URL path / Header / Query Parameter / Hybrid}

| Aspect | Implementation |
|--------|----------------|
| Primary Method | {method} |
| Version Format | {format} |
| URL Pattern | /api/v{major}/{resource} |
| Header Name | X-API-Version |
| Query Parameter | ?api_version= |

### Multi-Tenant Considerations

| Factor | Impact | Design Choice |
|--------|--------|---------------|
| Tenant Pinning | {impact} | {choice} |
| Tier Access | {impact} | {choice} |
| Override Policy | {impact} | {choice} |

### API Surface Inventory

| Facade | Operations | Current State | Priority |
|--------|------------|---------------|----------|
| {facade1} | {count} | {state} | {priority} |
| {facade2} | {count} | {state} | {priority} |
```

### 4. Compile Version Lifecycle Section

Include all content from Step 02:

```markdown
## Version Lifecycle

### Semantic Versioning Rules

| Version Change | Type | Breaking | Example |
|----------------|------|----------|---------|
| Major (X.0.0) | Breaking changes | Yes | v1 → v2 |
| Minor (0.X.0) | New features | No | v1.0 → v1.1 |
| Patch (0.0.X) | Bug fixes | No | v1.0.0 → v1.0.1 |

### Deprecation Policy

| Phase | Timeline | Actions |
|-------|----------|---------|
| Announcement | T+0 | Mark deprecated, notify tenants |
| Active Deprecation | T+0 to T+6mo | Return deprecation headers |
| Sunset Warning | T+6mo to T+12mo | Urgent notifications |
| End of Life | T+12mo | Return 410 Gone |

### Sunset Headers

| Header | When Sent | Example |
|--------|-----------|---------|
| Deprecation | On deprecated versions | `Deprecation: true` |
| Sunset | On deprecated versions | `Sunset: {date}` |
| Link | On deprecated versions | `Link: <successor>; rel="successor-version"` |

### Per-Tenant Version Pinning

| Configuration | Description |
|---------------|-------------|
| default_version | Tenant's default API version |
| pinned_version | Locked version (overrides default) |
| version_override_allowed | Can override via header |
| extended_deprecation | Extended sunset timeline |
```

### 5. Compile Backward Compatibility Section

Include all content from Step 03:

```markdown
## Backward Compatibility

### Breaking vs Non-Breaking Changes

**Breaking Changes (Require Major Version):**

| Change Type | Example | Migration Required |
|-------------|---------|-------------------|
| Remove endpoint | DELETE /users/{id}/legacy | Yes |
| Remove field | Remove `user.legacy_id` | Yes |
| Change field type | `count: string` → `count: number` | Yes |
| Add required field | New required `tenant_id` in request | Yes |

**Non-Breaking Changes (Minor Version):**

| Change Type | Example | Client Impact |
|-------------|---------|---------------|
| Add endpoint | New POST /users/batch | None |
| Add optional field | New `user.metadata` | Ignored |
| Add response field | New `created_at` in response | Ignored |
| Add enum value | New status `ARCHIVED` | Handle gracefully |

### Schema Evolution Rules

| Evolution | Allowed | Version Impact |
|-----------|---------|----------------|
| Add optional field | Yes | Minor |
| Add nested object | Yes | Minor |
| Remove field | No | Major |
| Change type | No | Major |

### Version Negotiation

**Resolution Priority:**
1. Request Header (X-API-Version)
2. Query Parameter (?api_version)
3. Tenant Pinned Version
4. Tenant Default Version
5. System Default Version

**Error Responses:**

| Condition | Status | Response |
|-----------|--------|----------|
| Version not found | 400 | Version not available |
| Version sunset | 410 | Version has been sunset |
| Tier restricted | 403 | Version requires higher tier |
```

### 6. Compile Migration Strategy Section

Include all content from Step 04:

```markdown
## Migration Strategy

### Tenant Notification Plan

| Event | Channels | Timing |
|-------|----------|--------|
| New Version | Email, Dashboard | Release day |
| Deprecation | Email, Dashboard, API | T+0 |
| Sunset Warning | All channels | T+6mo |
| Final Notice | Direct contact | T+11mo |

### Gradual Rollout

| Phase | Tenants | Duration | Criteria |
|-------|---------|----------|----------|
| Internal | Staff | 1 week | No P0/P1 bugs |
| Alpha | Opt-in devs | 2 weeks | <0.1% errors |
| Beta | Pro tier | 2 weeks | <0.05% errors |
| GA Enterprise | Enterprise | 2 weeks | Stable |
| GA All | All | Ongoing | Default |

### Version Analytics

| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| Latest Version Adoption | >80% in 6mo | <80% after 6mo |
| Deprecated Version Usage | <10% after 6mo | >10% after 6mo |
| Version Error Rate | <0.1% | >0.5% |

### Emergency Rollback

| Severity | Timeline | Trigger |
|----------|----------|---------|
| P0 - Critical | <1 hour | Security, data loss |
| P1 - High | <4 hours | Major functionality |
| P2 - Medium | <24 hours | Significant issues |
| P3 - Low | Next release | Minor issues |

### Migration Support

| Resource | Format | Availability |
|----------|--------|--------------|
| Migration Guide | Documentation | All tiers |
| SDK Update Guide | Per-SDK docs | All tiers |
| Migration Tool | CLI | Pro+ tiers |
| Sandbox | Test environment | All tiers |
```

### 7. Add Implementation Checklist

Include implementation tracking:

```markdown
## Implementation Checklist

### Infrastructure

- [ ] API gateway version routing configured
- [ ] Feature flags for version rollout set up
- [ ] Version analytics pipeline deployed
- [ ] Sunset header middleware implemented
- [ ] Version negotiation logic implemented

### Documentation

- [ ] API versioning policy published
- [ ] Migration guides created
- [ ] SDK documentation updated
- [ ] Changelog system configured

### Monitoring

- [ ] Version adoption dashboard created
- [ ] Deprecation usage alerts configured
- [ ] Error rate by version tracking enabled
- [ ] Migration progress tracking implemented

### Operations

- [ ] Rollback runbook documented
- [ ] On-call procedures updated
- [ ] Support team trained
- [ ] Customer success playbook updated
```

### 8. Add Web Research References

Include all web research from workflow:

```markdown
## Web Research References

The following web searches were performed to validate current best practices:

| Topic | Query | Date |
|-------|-------|------|
| Versioning Strategy | "API versioning best practices multi-tenant SaaS {date}" | {date} |
| Deprecation | "API deprecation policy best practices {date}" | {date} |
| Sunset Headers | "HTTP Sunset header RFC 8594 implementation {date}" | {date} |
| Compatibility | "REST API breaking change definition {date}" | {date} |
| Migration | "API migration notification best practices {date}" | {date} |

_Sources cited throughout document._
```

### 9. Save Document

**Save to:**

```
{output_folder}/planning-artifacts/api-versioning-design.md
```

Include frontmatter:

```yaml
---
name: API Versioning Design
version: 1.0.0
date: {current_date}
tenant_model: {tenant_model}
versioning_strategy: {strategy}
qg_status: PENDING
stepsCompleted: [1, 2, 3, 4, 5]
---
```

---

## COLLABORATION MENUS (A/P/C)

After compiling complete document, present options:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into document sections
- **P (Party Mode)**: Final architecture review before save
- **C (Continue)**: Save document and complete Create mode

Select an option:
```

### If 'A' (Advanced Elicitation)

Invoke `bmad-advanced-elicitation` skill to explore:

- **Section completeness:** Are all sections comprehensive?
- **Missing considerations:** Any gaps in the design?
- **Implementation readiness:** Is document actionable?
- **Stakeholder concerns:** Any anticipated objections?

Pass context: Complete document content.

**After processing enhanced insights, return to A/P/C menu.**

### If 'P' (Party Mode)

Invoke `bmad-party-mode` skill with context:

```
Final review of API Versioning Design:
Strategy: {versioning_strategy}
Lifecycle: {lifecycle_summary}
Compatibility: {compatibility_summary}
Migration: {migration_summary}
```

Gather perspectives from:

| Persona | Focus Area | Key Questions |
|---------|------------|---------------|
| API Architect | Design completeness | Is design comprehensive? |
| Platform Engineer | Implementation | Is design implementable? |
| Customer Success | Tenant experience | Will tenants accept this? |
| Engineering Manager | Resource planning | Is scope realistic? |

Process multi-perspective review and incorporate feedback.

**After processing perspectives, return to A/P/C menu.**

### If 'C' (Continue)

1. Save the complete document:

```
{output_folder}/planning-artifacts/api-versioning-design.md
```

2. Update workflow state:

```yaml
stepsCompleted: [1, 2, 3, 4, 5]
currentStep: complete
mode: create
status: done
```

3. Present completion summary:

```
================================================================================
API VERSIONING DESIGN COMPLETE
================================================================================
Document saved: {output_folder}/planning-artifacts/api-versioning-design.md

Versioning Strategy: {strategy}
Version Format: {format}
Deprecation Timeline: {timeline}
Tenant Pinning: {enabled/disabled}

Sections Completed:
✓ Executive Summary
✓ Versioning Strategy
✓ Version Lifecycle
✓ Backward Compatibility
✓ Migration Strategy
✓ Implementation Checklist
✓ Web Research References

Next Steps:
- [V] Run Validate mode to verify against QG-I1 criteria
- [E] Run Edit mode to modify specific sections
- [I] Proceed to implementation planning

================================================================================
```

---

## SUCCESS METRICS

- ✅ All designs from Steps 01-04 compiled
- ✅ Executive summary generated
- ✅ Versioning strategy section complete
- ✅ Version lifecycle section complete
- ✅ Backward compatibility section complete
- ✅ Migration strategy section complete
- ✅ Implementation checklist included
- ✅ Web research references included
- ✅ Document saved to correct location
- ✅ User confirmed completion

---

## FAILURE MODES

- ❌ **Missing step content:** Verify all Steps 01-04 completed
- ❌ **Template not found:** Use built-in structure
- ❌ **Save failed:** Check output folder permissions
- ❌ **Incomplete sections:** Review working documents

---

## Verification

- [ ] Executive summary complete
- [ ] All design sections included
- [ ] Frontmatter metadata correct
- [ ] Document saved to planning-artifacts
- [ ] QG status set to PENDING
- [ ] User confirmed completion

---

## Outputs

- **API Versioning Design:** `{output_folder}/planning-artifacts/api-versioning-design.md`
- Comprehensive design covering strategy, lifecycle, compatibility, migration
- Ready for QG-I1 validation

---

## WORKFLOW COMPLETE

Create mode is complete.

**Next Steps:**

| Action | Description |
|--------|-------------|
| **Validate** | Run Validate mode (step-20-v-*) to verify against QG-I1 |
| **Edit** | Run Edit mode (step-10-e-*) to modify specific sections |
| **Implement** | Proceed to implementation based on design |

---

## Related Workflows

Based on completion, consider:

- `bmad-bam-api-versioning` Validate mode - Verify design against criteria
- `bmad-bam-facade-contract` - Define versioned API contracts
- `bmad-bam-convergence-verification` - Integration verification
- `bmad-bam-api-release` - Version release workflow

---

## NEXT STEP

Create mode complete.

**Recommended:** Run validation workflow to verify design quality:
- Proceed to `step-20-v-load.md` to load design for QG-I1 validation

**Alternative:** If design changes needed:
- Proceed to `step-10-e-load.md` to enter Edit mode
