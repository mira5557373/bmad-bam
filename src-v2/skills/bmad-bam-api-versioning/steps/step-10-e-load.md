# Step 10: Load Existing API Versioning Design

## MANDATORY EXECUTION RULES

- 🛑 NEVER proceed without locating the existing API versioning design file
- 📖 ALWAYS read the complete document including frontmatter metadata
- 🔄 ALWAYS parse all sections: strategy, lifecycle, compatibility, migration
- ✅ EXTRACT all design decisions and current configuration
- 📋 PRESENT a structured summary of current design before accepting edits
- 💬 PAUSE after summary presentation and await user edit selection
- 🎯 IDENTIFY QG status from frontmatter to understand validation state
- ⚠️ FLAG any sections marked as "TODO" or incomplete

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Load and parse existing API versioning design for modification
- 💾 Track: Document load status and parse results
- 📖 Context: Extract versioning strategy, lifecycle, compatibility, migration
- 🚫 Do NOT: Modify any content during load phase
- ⚠️ Gate: Changes may invalidate QG-I1 status
- 🔍 Use web search: Only if user requests updated best practices

---

## YOUR TASK

Load the existing API versioning design document, parse its structure, extract the current configuration, and present a summary showing what can be edited. Enable the user to select specific sections for modification.

---

## Load Sequence

### Action 1: Locate Document

**Search for existing artifact:**

```
{output_folder}/planning-artifacts/api-versioning-design.md
```

If not found, check alternate locations:
- `{output_folder}/api-versioning-design.md`
- `{project-root}/docs/api/versioning-design.md`

**If document not found:**
```
================================================================================
EDIT MODE ERROR: No existing API versioning design found
================================================================================
Expected location: {output_folder}/planning-artifacts/api-versioning-design.md

Options:
[C] Switch to Create mode to generate new design
[P] Specify alternate path to existing document
[L] List available API design documents
================================================================================
```

### Action 2: Parse Frontmatter

**Extract document metadata:**

```yaml
# Expected frontmatter structure
name: API Versioning Design
version: {semantic_version}
date: {last_modified_date}
tenant_model: {rls/schema/database/hybrid}
versioning_strategy: {url_path/header/query_param/hybrid}
qg_status: {PASS|CONDITIONAL|PENDING}
stepsCompleted: [1, 2, 3, 4, 5]
```

Document current state:

| Metadata | Value |
|----------|-------|
| Document Name | |
| Document Version | |
| Last Modified | |
| Tenant Model | |
| Versioning Strategy | |
| QG Status | |
| Steps Completed | |

### Action 3: Extract Versioning Strategy

**Parse current strategy configuration:**

| Setting | Current Value |
|---------|---------------|
| Primary Method | {url_path/header/query_param/hybrid} |
| Version Format | {semver/major_only/date} |
| URL Pattern | {pattern} |
| Header Name | {header} |
| Query Parameter | {param} |

**Strategy Health Check:**

| Check | Status |
|-------|--------|
| Strategy defined | {yes/no} |
| Format specified | {yes/no} |
| Multi-tenant considered | {yes/no} |
| API surface inventoried | {yes/no} |

### Action 4: Extract Version Lifecycle

**Parse current lifecycle configuration:**

| Setting | Current Value |
|---------|---------------|
| Semver Rules | {defined/undefined} |
| Deprecation Timeline | {months} |
| Enterprise Extension | {months} |
| Sunset Headers | {defined/undefined} |
| Tenant Pinning | {enabled/disabled} |

**Lifecycle Health Check:**

| Check | Status |
|-------|--------|
| Semver rules documented | {yes/no} |
| Deprecation policy defined | {yes/no} |
| Sunset headers specified | {yes/no} |
| Tenant pinning configured | {yes/no} |

### Action 5: Extract Backward Compatibility

**Parse current compatibility configuration:**

| Setting | Current Value |
|---------|---------------|
| Breaking Change Rules | {defined/undefined} |
| Schema Evolution Rules | {defined/undefined} |
| Version Negotiation | {defined/undefined} |
| Grace Period | {days} |

**Compatibility Health Check:**

| Check | Status |
|-------|--------|
| Breaking changes classified | {yes/no} |
| Schema evolution documented | {yes/no} |
| Negotiation logic defined | {yes/no} |
| Testing strategy included | {yes/no} |

### Action 6: Extract Migration Strategy

**Parse current migration configuration:**

| Setting | Current Value |
|---------|---------------|
| Notification Channels | {channels} |
| Rollout Phases | {count} phases |
| Analytics Metrics | {metrics} |
| Rollback Procedures | {defined/undefined} |

**Migration Health Check:**

| Check | Status |
|-------|--------|
| Notification plan defined | {yes/no} |
| Gradual rollout designed | {yes/no} |
| Analytics specified | {yes/no} |
| Rollback documented | {yes/no} |

### Action 7: Present Edit Summary

**Display current state and available edit targets:**

```
================================================================================
API VERSIONING DESIGN - EDIT MODE
================================================================================
Document: api-versioning-design.md
Version: {version}
QG Status: {status}
Last Modified: {date}
================================================================================

CURRENT CONFIGURATION:

Versioning Strategy: {strategy} - {status}
  Method: {method}
  Format: {format}
  Tenant Pinning: {enabled/disabled}

Version Lifecycle:
  Deprecation Timeline: {months} months (standard)
  Enterprise Extension: {months} months
  Sunset Headers: {configured/not configured}

Backward Compatibility:
  Breaking Change Rules: {defined/undefined}
  Schema Evolution: {defined/undefined}
  Version Negotiation: {defined/undefined}

Migration Strategy:
  Notification: {channels}
  Rollout: {phases} phases
  Rollback: {defined/undefined}

================================================================================
DESIGN HEALTH: {healthy|warning|critical}

EDITABLE SECTIONS:
[1] Versioning Strategy - Change method, format, or tenant pinning
[2] Version Lifecycle - Update deprecation timelines and sunset headers
[3] Backward Compatibility - Modify breaking change rules and schema evolution
[4] Migration Strategy - Update notifications, rollout, or rollback
[5] Implementation Checklist - Update implementation status
[6] Full Design - Major restructure (requires re-validation)

================================================================================
Select section(s) to edit (comma-separated) or 'C' to cancel:
```

---

## SUCCESS METRICS

- ✅ Document located and fully loaded
- ✅ Frontmatter parsed with all metadata extracted
- ✅ Versioning strategy parsed completely
- ✅ Version lifecycle extracted and categorized
- ✅ Backward compatibility documented
- ✅ Migration strategy parsed
- ✅ Edit summary presented to user
- ✅ User has selected edit target(s)

---

## FAILURE MODES

- ❌ **Document not found:** Redirect to Create mode or request alternate path
- ❌ **Invalid frontmatter:** Attempt recovery, flag missing fields
- ❌ **Incomplete sections:** Flag sections needing completion before edit
- ❌ **QG already failed:** Warn that edits require full re-validation
- ❌ **Missing required fields:** Critical gap must be addressed

---

## Verification

- [ ] Document loaded from expected location
- [ ] Frontmatter parsed with version, strategy, QG status
- [ ] Versioning strategy extracted
- [ ] Version lifecycle documented
- [ ] Backward compatibility captured
- [ ] Migration strategy parsed
- [ ] Edit summary presented
- [ ] User selection received

---

## NEXT STEP

Proceed to `step-11-e-apply.md` with:
- Selected edit target(s)
- Current document state
- Parsed design structure
- QG status for re-validation tracking
