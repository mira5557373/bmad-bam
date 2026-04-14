# Step 2: Validate Tenant-Aware Observability

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

Validate the tenant-aware observability design against quality criteria ensuring tenant isolation in all signals (metrics, logs, traces), proper dashboard access controls, and compliance with platform observability patterns.

---

## Prerequisites

- Step 01 completed: Artifact loaded successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: observability



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

---

## Validation Checklist

### Tenant Dimensions
- [ ] Core tenant dimensions defined (tenant_id, tenant_slug, tenant_tier)
- [ ] Request context dimensions defined (user_id, session_id, request_id)
- [ ] Resource attribution dimensions defined
- [ ] Dimension propagation rules documented
- [ ] Cardinality management strategy defined
- [ ] High-cardinality dimensions restricted to logs/traces only

### Metric Aggregation
- [ ] Platform metrics defined (control plane visibility)
- [ ] Tenant metrics defined (per-tenant visibility)
- [ ] Resource consumption metrics defined (billing attribution)
- [ ] Aggregation levels defined (request → tenant → tier → platform)
- [ ] Pre-aggregation rules documented
- [ ] Retention policies per aggregation level defined
- [ ] Tenant-scoped query patterns documented

### Log Context
- [ ] Structured log format defined with tenant fields
- [ ] Log context injection mechanism defined
- [ ] Log levels by context documented
- [ ] Tenant log isolation rules defined
- [ ] Sensitive data handling rules defined
- [ ] Log retention by tier documented
- [ ] Audit log requirements documented

### Trace Propagation
- [ ] Trace context structure defined (W3C + baggage)
- [ ] Required span attributes defined
- [ ] Resource attributes defined
- [ ] Sampling strategy by tier documented
- [ ] Cross-service propagation configured
- [ ] Tenant trace isolation rules defined
- [ ] Agent execution tracing defined
- [ ] Export configuration defined

### Dashboards
- [ ] Dashboard hierarchy defined (platform vs tenant)
- [ ] Platform dashboards have operator-only access
- [ ] Tenant dashboards are filtered by tenant_id
- [ ] All dashboards have appropriate access controls
- [ ] Alert rules defined for both platform and tenant level
- [ ] Alert notification routing is tenant-aware

### Cross-Cutting
- [ ] All signals (metrics, logs, traces) include tenant_id
- [ ] Tenant isolation is maintained across all signals
- [ ] No cross-tenant data leakage possible in dashboards
- [ ] Consistent with tenant model isolation design
- [ ] Consistent with master architecture observability section

## Gate Decision

- **PASS**: All signals include tenant context, isolation verified, dashboards access-controlled
- **CONDITIONAL**: Minor gaps (e.g., specific alert thresholds: p99 latency > 500ms, error rate > 1%, CPU > 80%, memory > 85%, queue depth > 1000, circuit breaker trips > 5/min) - document gaps and proceed
- **FAIL**: Missing tenant dimensions, no isolation in dashboards, or cardinality issues - return to Create mode

Present validation results with specific findings for each section.

---

## COLLABORATION MENUS (A/P/C):

After validation, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific validation gaps or findings
- **P (Party Mode)**: Bring SRE and security architect perspectives on validation results
- **C (Continue)**: Accept validation results and proceed to generate report
- **[Specific refinements]**: Describe specific areas to re-validate

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: validation checklist results, gaps identified, isolation verification
- Process enhanced insights on observability quality
- Ask user: "Accept this detailed validation analysis? (y/n)"
- If yes, integrate into validation findings
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review validation results for tenant-aware observability"
- Process SRE and security architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation results
- Update frontmatter `stepsCompleted: [20, 21]`
- Proceed to next step: `step-22-v-generate-report.md`

---

## Verification

- [ ] All checklist items evaluated
- [ ] Gate decision determined
- [ ] Findings documented per section
- [ ] Patterns align with pattern registry

---

## Outputs

- Validation report
- Pass/Fail determination
- Specific findings per observability domain

---

## Next Step

Generate validation report and return results to user.
