# Step 11: Apply Observability Modifications (Edit Mode)

## MANDATORY EXECUTION RULES

- 🛑 NEVER apply changes that break cross-pillar consistency
- 📖 ALWAYS validate changes maintain tenant isolation across metrics, logs, traces
- 🔄 ALWAYS preserve document structure and unmodified sections
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- ✅ UPDATE frontmatter version after any successful edit
- 📋 DOCUMENT change rationale in Change Log section
- 💬 PRESENT diff summary before final save
- ⚠️ FLAG if changes require QG-OC re-validation
- 🔒 LOCK critical tenant dimensions without explicit SRE override

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Apply user-requested changes while maintaining cross-pillar consistency
- 💾 Track: `stepsCompleted: [10, 11]` when complete
- 📖 Context: Preserve all unmodified content exactly
- 🚫 Do NOT: Auto-modify unrelated sections or break tenant isolation
- ⚠️ Gate: Critical observability changes require re-validation warning
- 🔍 Use web search: If user requests updated observability patterns for specific changes

---

## YOUR TASK

Apply the user's requested changes to the observability design, validate consistency across all three pillars (metrics, logs, traces), update document metadata, and present a summary of modifications with any re-validation requirements.

---

## Purpose

Apply the identified changes to the existing observability design artifacts. Changes are applied incrementally while preserving consistency across the three pillars (metrics, logs, traces) and ensuring tenant isolation remains intact.

---

## Prerequisites

- Step 10 complete: Artifact loaded and modification scope identified
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `observability`

---

## Inputs

- Loaded artifact from Step 10
- Identified modification targets
- User-confirmed changes to apply
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Apply Requested Changes

Process modifications by section:

#### If Modifying Tenant Dimensions:
- Update dimension catalog
- Verify propagation rules remain consistent
- Check impact on all three pillars (metrics labels, log fields, trace attributes)
- Update cardinality analysis if adding high-cardinality dimensions

#### If Modifying Metrics:
- Add/update metric definitions
- Verify cardinality impact
- Update aggregation rules if changing labels
- Ensure quota metrics align with tier definitions

#### If Modifying Logging:
- Update log format specification
- Verify PII handling rules
- Adjust retention policies if changing tier requirements
- Update context injection rules

#### If Modifying Tracing:
- Update span attributes
- Adjust sampling rates
- Modify propagation rules
- Update agent tracing spans if changing agent architecture

#### If Modifying Dashboards:
- Update panel definitions
- Verify access controls remain correct
- Ensure queries reference valid metrics
- Update tier availability if changing access

#### If Modifying Alerting:
- Update alert expressions
- Verify threshold values
- Adjust routing rules
- Update tenant notification settings

#### If Modifying SLOs:
- Update target values
- Recalculate burn rate thresholds
- Verify SLO queries reference correct metrics

### 2. Validate Cross-Pillar Consistency

After applying changes, verify consistency:

| Dimension | Metrics | Logs | Traces |
|-----------|---------|------|--------|
| tenant_id | Label: `tenant_id` | Field: `tenant.id` | Attribute: `tenant.id` |
| tenant_tier | Label: `tenant_tier` | Field: `tenant.tier` | Baggage: `tenant_tier` |
| user_id | N/A (high cardinality) | Field: `request.user_id` | Attribute: `user.id` |
| request_id | N/A (high cardinality) | Field: `request.id` | Trace context |

Ensure new dimensions are consistently applied if added.

### 3. Verify Tenant Isolation

Confirm tenant isolation is preserved:

- [ ] All tenant-scoped metrics include `tenant_id` label
- [ ] Log queries enforce tenant filtering
- [ ] Trace queries respect tenant isolation
- [ ] Dashboards filter by `tenant_id` for tenant users
- [ ] Alerts scope correctly to tenant context
- [ ] SLOs can be calculated per-tenant

### 4. Update Metadata

Update document metadata:

```yaml
metadata_updates:
  version: "Increment patch version (e.g., 1.0.0 -> 1.0.1)"
  last_modified: "Current timestamp"
  change_summary: "Description of modifications"
  modified_sections:
    - "List of sections changed"
```

### 5. Generate Change Summary

Present diff summary:

```
================================================================================
OBSERVABILITY DESIGN EDIT SUMMARY
================================================================================
Document: observability-design.md
Previous Version: {old_version}
New Version: {new_version}
================================================================================

CHANGES APPLIED:

[Pillar Changes]
- Metrics: {list of metric modifications}
- Logs: {list of logging modifications}
- Traces: {list of tracing modifications}

[Tenant Dimension Changes]
{list of dimension modifications}

[SLO/Alerting Changes]
{list of SLO and alert rule modifications}

[Dashboard Changes]
{list of dashboard modifications}

================================================================================
CROSS-PILLAR CONSISTENCY CHECK:

tenant_id: Metrics ({status}) | Logs ({status}) | Traces ({status})
tenant_tier: Metrics ({status}) | Logs ({status}) | Traces ({status})
Cardinality: {within_limits/exceeded}

================================================================================
VALIDATION STATUS:

QG-OC Status: {PASS|CONDITIONAL|PENDING}
Re-validation Required: {Yes/No}
{if yes: Run `bmad-bam-observability` Validate mode (step-20-v-*)}

================================================================================
[S] Save changes to {output_folder}/planning-artifacts/observability-design.md
[R] Review changes before saving
[U] Undo and return to edit selection
================================================================================
```

**If updating observability patterns, verify with web search:**
Search the web: "observability best practices multi-tenant {date}"

_Source: [URL]_

---

## SUCCESS METRICS

- ✅ All requested changes captured and validated
- ✅ Cross-pillar consistency checks passed or exceptions documented
- ✅ Tenant dimensions updated correctly across all pillars
- ✅ Dependent changes propagated (metrics to dashboards, alerts)
- ✅ Frontmatter version incremented
- ✅ Cardinality limits respected
- ✅ Change Log updated with modification summary
- ✅ Document saved to correct location
- ✅ Re-validation requirements communicated

---

## FAILURE MODES

- ❌ **Cross-pillar inconsistency:** Block change, present resolution options
- ❌ **Tenant isolation gap created:** Require explicit SRE override with justification
- ❌ **Cardinality exceeded:** Warn that metric cardinality exceeds acceptable limits
- ❌ **SLO query break:** Require SLO query update before saving
- ❌ **Save failure:** Retry with backup to alternate location

---

## Verification

- [ ] All requested changes applied correctly
- [ ] Cross-pillar consistency verified
- [ ] Tenant isolation preserved
- [ ] No unintended side effects
- [ ] Metadata updated with version and change summary
- [ ] Patterns align with pattern registry

---

## Outputs

- Updated observability design document
- Change summary with diff
- Updated dashboard specifications (if affected)
- Updated alert rules (if affected)
- Updated SLO definitions (if affected)

---

## Next Step

Edit mode complete.

For quality gate validation, run: `bmad-bam-observability` in Validate mode.

Validate changes against QG-OC (Observability Completeness) criteria.
