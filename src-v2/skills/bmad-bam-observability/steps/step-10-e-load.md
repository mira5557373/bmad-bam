# Step 10: Load Existing Observability Design (Edit Mode)

## MANDATORY EXECUTION RULES

- 🛑 NEVER proceed without locating the existing observability-design.md file
- 📖 ALWAYS read the complete document including frontmatter metadata
- 🔄 ALWAYS parse the three pillars (metrics, logs, traces) configuration
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- ✅ EXTRACT all tenant dimensions, SLO definitions, and alerting rules
- 📋 PRESENT a structured summary of current observability posture before accepting edits
- 💬 PAUSE after summary presentation and await user edit selection
- 🎯 IDENTIFY QG-OC status from frontmatter to understand completeness state
- ⚠️ FLAG any pillars marked as "TODO" or incomplete

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Load and parse existing observability design for modification
- 💾 Track: `stepsCompleted: [10]` when complete
- 📖 Context: Extract tenant dimensions, three pillars config, SLOs, dashboards
- 🚫 Do NOT: Modify any content during load phase
- ⚠️ Gate: Changes may invalidate QG-OC status
- 🔍 Use web search: Only if user requests updated observability patterns

---

## YOUR TASK

Load the existing observability design document, parse its structure, extract the current observability configuration including the three pillars (metrics, logs, traces), tenant dimensions, SLO definitions, and alerting rules. Present a summary showing what can be edited and enable the user to select specific sections for modification.

---

## Purpose

Load the existing tenant-aware observability design document for modification. Edit mode allows targeted updates to metrics, logging, tracing, dashboards, or alerting without recreating the entire design from scratch.

---

## Prerequisites

- Existing observability design document exists
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `observability`

---

## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Existing Artifact

Locate and load the observability design:

```yaml
artifact_locations:
  primary: "{output_folder}/planning-artifacts/observability-design.md"
  related:
    - "{output_folder}/planning-artifacts/observability/dashboard-specifications.md"
    - "{output_folder}/planning-artifacts/observability/alert-rules.md"
    - "{output_folder}/planning-artifacts/observability/slo-definitions.md"
```

If the files do not exist, inform the user and suggest switching to Create mode.

### 2. Parse Document Structure

Extract current configuration from each section:

| Section | Status | Content Summary |
|---------|--------|-----------------|
| Tenant Dimensions | | Core dimensions, propagation rules |
| Metrics Collection | | Tenant, quota, business metrics |
| Logging Strategy | | Format, retention, PII handling |
| Distributed Tracing | | Context, sampling, agent tracing |
| Dashboards | | Platform and tenant views |
| Alerting | | Rules and routing |
| SLO Definitions | | Targets by tier |

### 3. Identify Modification Scope

Present the user with modification options:

```
Current observability design sections:

1. **Tenant Dimensions** - Core dimensions and propagation
2. **Metrics Collection** - Tenant, quota, business, infrastructure
3. **Logging Strategy** - Format, retention, PII handling
4. **Distributed Tracing** - Context, sampling, agent tracing
5. **Dashboards** - Platform and tenant views
6. **Alerting** - Platform and tenant alert rules
7. **SLO Definitions** - Availability, latency, agent response

Which sections require modification?
```

### 4. Validate Current State

Before modification, verify:

- [ ] Tenant dimensions are consistently applied across signals
- [ ] Metric cardinality is within acceptable limits
- [ ] Log retention policies are documented
- [ ] Trace sampling aligns with tier definitions
- [ ] Dashboards have appropriate access controls
- [ ] Alert rules reference valid metrics
- [ ] SLO definitions have burn rate alerts

Document any inconsistencies found during loading.

### 5. Present Edit Summary

**Display current state and available edit targets:**

```
================================================================================
OBSERVABILITY DESIGN - EDIT MODE
================================================================================
Document: observability-design.md
Version: {version}
Pillars: Metrics ({status}), Logs ({status}), Traces ({status})
QG-OC Status: {status}
================================================================================

CURRENT THREE PILLARS CONFIGURATION:
1. Tenant Dimensions: {dimension_count} dimensions - {status}
2. Metrics Collection: {metric_count} tenant-scoped metrics - {status}
3. Logging Strategy:  {log_format}, {retention_policy} - {status}
4. Distributed Tracing: {sampling_strategy} - {status}
5. Dashboards:        {dashboard_count} defined - {status}
6. Alerting:          {alert_count} rules configured - {status}
7. SLO Definitions:   {slo_count} SLOs by tier - {status}

CROSS-PILLAR CONSISTENCY: tenant_id in {pillar_count}/3 pillars

EDITABLE SECTIONS:
[1] Tenant Dimensions - Modify core dimensions and propagation
[2] Metrics Collection - Update tenant, quota, business metrics
[3] Logging Strategy - Change format, retention, PII handling
[4] Distributed Tracing - Modify sampling, context propagation
[5] Dashboards - Update platform and tenant views
[6] Alerting - Modify alert rules and routing
[7] SLO Definitions - Update availability, latency targets
[8] Full Document - Major restructure (requires re-validation)

================================================================================
Select section(s) to edit (comma-separated) or 'C' to cancel:
```

---

## SUCCESS METRICS

- ✅ Document located and fully loaded
- ✅ Frontmatter parsed with all metadata extracted
- ✅ Three pillars configuration parsed completely
- ✅ Tenant dimensions extracted and categorized
- ✅ SLO definitions documented
- ✅ Cross-pillar consistency verified
- ✅ Edit summary presented to user
- ✅ User has selected edit target(s)

---

## FAILURE MODES

- ❌ **Document not found:** Redirect to Create mode or request alternate path
- ❌ **Invalid frontmatter:** Attempt recovery, flag missing fields
- ❌ **Incomplete pillar config:** Flag pillars needing completion before edit
- ❌ **QG-OC already failed:** Warn that edits require full re-validation
- ❌ **Cross-pillar inconsistency:** Flag dimensions not applied across all pillars

---

## Verification

- [ ] Existing artifacts loaded successfully
- [ ] Document structure parsed correctly
- [ ] Modification scope confirmed with user
- [ ] Current state validation complete
- [ ] Inconsistencies documented (if any)

---

## Outputs

- Summary of current observability configuration
- Confirmed list of sections to modify
- Inconsistency report (if applicable)

---

## Next Step

Proceed to `step-11-e-apply.md` with identified modification targets.
