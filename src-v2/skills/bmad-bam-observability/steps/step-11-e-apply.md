# Step 11: Apply Observability Modifications

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Apply targeted changes while preserving consistency
- 💾 Track: `stepsCompleted: [10, 11]` when complete
- 📖 Context: Modification scope from Step 10, cross-pillar consistency
- 🚫 Do NOT: Modify sections not identified for change
- 🔍 Use web search: Verify updated patterns if adding new observability features
- ⚠️ Gate: QG-OC (Observability Completeness)

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
Changes Applied:
================

Section: [Section Name]
-----------------------
Before: [Previous value/configuration]
After:  [New value/configuration]
Impact: [Any cross-pillar impacts]

[Repeat for each modified section]
```

**If updating observability patterns, verify with web search:**
Search the web: "observability best practices multi-tenant {date}"

_Source: [URL]_

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
