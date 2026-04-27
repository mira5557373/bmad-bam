# Step 20: Load Observability Artifact for Validation

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Load artifact and validation checklist, prepare validation context
- 💾 Track: `stepsCompleted: [20]` when complete
- 📖 Context: Artifact structure, validation criteria from QG-OC
- 🚫 Do NOT: Perform validation yet - that comes in Step 21
- 🔍 Use web search: Not required for loading
- ⚠️ Gate: QG-OC (Observability Completeness)

---

## Purpose

Load the tenant-aware observability design artifact for validation against QG-OC (Observability Completeness) quality gate criteria. The validation ensures all three pillars (metrics, logs, traces) include tenant attribution and isolation is maintained.

---

## Prerequisites

- Observability design artifact exists to validate
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `observability`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-m3.md`

---

## Inputs

- Artifact file path for validation
- Quality gate checklist: `{project-root}/_bmad/bam/data/checklists/`
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Artifact

Locate and load the observability design:

```yaml
artifact_locations:
  primary: "{output_folder}/planning-artifacts/observability-design.md"
  related:
    - "{output_folder}/planning-artifacts/observability/dashboard-specifications.md"
    - "{output_folder}/planning-artifacts/observability/alert-rules.md"
    - "{output_folder}/planning-artifacts/observability/slo-definitions.md"
```

### 2. Verify Document Integrity

Pre-validation checks:

| Check | Status | Notes |
|-------|--------|-------|
| File exists | | Primary artifact present |
| Valid markdown | | Proper section headers |
| Required sections present | | All pillars documented |
| Tenant dimensions defined | | Dimension catalog exists |
| Cross-references valid | | No broken links |

### 3. Load Validation Checklist

Load QG-OC validation criteria:

```yaml
quality_gate: "QG-OC (Observability Completeness)"

validation_categories:
  tenant_dimensions:
    weight: "CRITICAL"
    description: "Core dimensions defined and consistently applied"
    
  metrics_coverage:
    weight: "CRITICAL"
    description: "Tenant, quota, business metrics defined"
    
  logging_strategy:
    weight: "CRITICAL"
    description: "Format, retention, PII handling documented"
    
  tracing_design:
    weight: "CRITICAL"
    description: "Context propagation and sampling configured"
    
  dashboards:
    weight: "HIGH"
    description: "Platform and tenant views defined"
    
  alerting:
    weight: "HIGH"
    description: "Alert rules with tenant context"
    
  slo_definitions:
    weight: "MEDIUM"
    description: "SLOs defined per tier"
    
  tenant_isolation:
    weight: "CRITICAL"
    description: "Isolation maintained across all signals"
```

### 4. Prepare Validation Context

Extract key elements for validation:

| Element | Source Section | For Validation |
|---------|----------------|----------------|
| Dimension catalog | Tenant Dimensions | Consistency check |
| Metric labels | Metrics Collection | Cardinality check |
| Log fields | Logging Strategy | PII compliance check |
| Trace attributes | Distributed Tracing | Propagation check |
| Dashboard access | Dashboards | Isolation check |
| Alert expressions | Alerting | Metrics reference check |
| SLO targets | SLO Definitions | Tier alignment check |

---

## YOUR TASK

Load the observability design artifact created in Create mode. If the artifact does not exist, inform the user and suggest switching to Create mode. Prepare all validation criteria from QG-OC checklist for systematic verification of tenant-aware observability across all three pillars.

---

### 5. Error Handling

If artifact is missing or incomplete:

```
Error Handling Guidance:

1. If files do not exist:
   - Inform user: "No observability design artifact found at expected location"
   - Suggest: "Switch to Create mode to generate observability design"

2. If files exist but lack required sections:
   - Document specific gaps
   - Prompt: "Proceed with partial validation? (y/n)"
   - If yes, note gaps in validation report

3. If cross-references are broken:
   - List broken references
   - Suggest: "Run Edit mode to fix references before validation"
```

---

## COLLABORATION MENUS (A/P/C):

After loading artifact, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into artifact structure or pre-validation findings
- **P (Party Mode)**: Bring SRE and security architect perspectives on observability design
- **C (Continue)**: Accept loaded artifact and proceed to validation
- **[Specific refinements]**: Describe specific areas to examine

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: artifact structure, validation categories, pre-validation checks
- Process enhanced insights on artifact completeness
- Ask user: "Accept this detailed artifact analysis? (y/n)"
- If yes, integrate into validation context
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review observability artifact for QG-OC validation"
- Process SRE and security architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation context
- Update frontmatter `stepsCompleted: [20]`
- Proceed to next step: `step-21-v-validate.md`

---

## SUCCESS METRICS

- ✅ Observability artifact loaded successfully
- ✅ Document metadata extracted and displayed
- ✅ QG-OC checklist loaded and understood
- ✅ Three pillars presence verified (metrics, logs, traces)
- ✅ Tenant dimension consistency assessed
- ✅ Validation readiness confirmed by user

---

## FAILURE MODES

- ❌ **Artifact not found:** Redirect to Create mode
- ❌ **Missing frontmatter:** Cannot extract version/pillar status
- ❌ **Incomplete Create mode:** stepsCompleted missing required steps
- ❌ **QG-OC checklist not found:** Verify BAM installation

---

## Verification

- [ ] Artifact loaded successfully
- [ ] Document integrity verified
- [ ] Validation checklist loaded
- [ ] Validation context prepared
- [ ] Pre-validation issues documented

---

## Outputs

- Validation context prepared
- Document structure parsed
- Pre-validation findings (if any)

---

## Next Step

Proceed to `step-21-v-validate.md` to run validation checks against QG-OC criteria.
