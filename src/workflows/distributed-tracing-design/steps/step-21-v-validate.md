# Step 21: Validate Distributed Tracing Design

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array

---

## Purpose

Validate the distributed tracing design artifact against quality criteria and production readiness standards (QG-P1).

---

## Prerequisites

- Previous step completed (step-20-v-load-artifact.md)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv -> filter: observability`
- **Load quality gate:** `{project-root}/_bmad/bam/data/quality-gates.csv -> filter: QG-P1`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/production-readiness.md`

---

## Inputs

- Loaded artifact from validation step 20
- Quality gate criteria and checklist
- Pattern registry for validation rules
- Previous validation findings (if re-validating)

---

## Actions

### 1. Load Artifact

- Read the artifact from `{output_folder}/` specified location
- Parse and validate structure

### 2. Validate Content

- Check all required sections are present
- Verify cross-references are valid
- Validate against quality gate checklist

### 3. Generate Findings

- Document any issues found
- Categorize by severity (Critical/High/Medium/Low)

---

## Validation Checklist

### OpenTelemetry Configuration
- [ ] SDK configuration documented
- [ ] Language bindings specified
- [ ] Batch processor settings defined
- [ ] Resource attributes complete

### Trace Exporters
- [ ] Primary exporter selected
- [ ] Exporter configuration documented
- [ ] Fallback exporter defined (optional)
- [ ] Connection parameters specified

### Span Naming Conventions
- [ ] HTTP span naming defined
- [ ] gRPC span naming defined
- [ ] Database span naming defined
- [ ] Message queue span naming defined
- [ ] Background job span naming defined

### Context Propagation
- [ ] HTTP propagation (W3C/B3) configured
- [ ] gRPC metadata propagation defined
- [ ] Message queue propagation for all systems
- [ ] Background job context injection documented
- [ ] WebSocket propagation strategy defined
- [ ] All service boundaries covered

### Tenant Correlation
- [ ] Tenant span attributes defined
- [ ] Tenant context injection middleware designed
- [ ] Log-trace correlation patterns documented
- [ ] Tenant-scoped query patterns defined
- [ ] Cardinality analysis performed

### Sampling Strategies
- [ ] Head-based sampling by endpoint defined
- [ ] Tail-based sampling rules configured
- [ ] Tier-based rates documented (Enterprise/Pro/Free)
- [ ] Cost optimization strategies defined
- [ ] Sampling decision flow documented

### QG-P1 Production Readiness Verification
**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv -> filter: QG-P1`

- [ ] **tracing_configured** (REQUIRED): OpenTelemetry SDK and exporters configured
- [ ] **context_propagation_complete** (REQUIRED): All boundaries have trace propagation
- [ ] **tenant_correlation_active** (REQUIRED): Tenant ID in all spans
- [ ] **sampling_policy_defined** (REQUIRED): Tier-based sampling rates documented

**QG-P1 Required Patterns:**
| Pattern | Required | Status | Evidence |
|---------|----------|--------|----------|
| tracing_configured | **YES** | [ ] Pass / [ ] Fail | SDK config documented |
| context_propagation_complete | **YES** | [ ] Pass / [ ] Fail | Boundary coverage matrix |
| tenant_correlation_active | **YES** | [ ] Pass / [ ] Fail | Tenant attribute schema |
| sampling_policy_defined | **YES** | [ ] Pass / [ ] Fail | Tier sampling rates |

**QG-P1 Production Readiness (Tracing):** [ ] SATISFIED / [ ] NOT SATISFIED

---

## Gate Decision

- **PASS**: All required sections complete, all boundaries covered, tenant correlation active, sampling defined
- **CONDITIONAL**: Minor gaps (e.g., cost projections incomplete) - document gaps, proceed
- **FAIL**: Missing context propagation for any boundary, missing tenant correlation, no sampling strategy - return to Create mode

Present validation results with specific findings for each section.

---

## COLLABORATION MENUS (A/P/C):

After completing validation checks, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation findings and edge cases
- **P (Party Mode)**: Bring analyst and architect perspectives for validation review
- **C (Continue)**: Accept validation results and proceed to generate report
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass validation context: findings, gate decision, gaps identified
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into validation results
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review distributed tracing validation: {summary of findings and gate decision}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation results
- Update frontmatter `stepsCompleted: [20, 21]`
- Proceed to next step: `step-22-v-generate-report.md`

---

## Verification

- [ ] All validation checklist items evaluated
- [ ] Gate decision determined (PASS/CONDITIONAL/FAIL)
- [ ] Findings documented with specific details

---

## Outputs

- Validation report with findings
- Gate decision with rationale
- Remediation recommendations (if CONDITIONAL or FAIL)

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate the validation report.
