# Step 10: Load Existing Observability Design

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Load existing observability design, identify modification scope
- 💾 Track: `stepsCompleted: [10]` when complete
- 📖 Context: Existing artifact structure, sections to modify
- 🚫 Do NOT: Apply changes yet - that comes in Step 11
- 🔍 Use web search: Not required for loading (verification only if updating patterns)
- ⚠️ Gate: QG-OC (Observability Completeness)

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

---

## COLLABORATION MENUS (A/P/C):

After loading existing artifacts, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into current configuration details
- **P (Party Mode)**: Bring SRE and platform architect perspectives on modification scope
- **C (Continue)**: Accept loaded artifacts and proceed to apply changes
- **[Specific refinements]**: Describe specific sections to focus on

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: current observability design, section summaries, inconsistencies
- Process enhanced insights on what needs modification
- Ask user: "Accept this detailed analysis? (y/n)"
- If yes, integrate into modification scope
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review existing observability configuration for modification"
- Process SRE and platform architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save modification scope to context
- Update frontmatter `stepsCompleted: [10]`
- Proceed to next step: `step-11-e-apply.md`

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
