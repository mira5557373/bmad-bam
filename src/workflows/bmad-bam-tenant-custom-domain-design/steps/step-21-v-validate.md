# Step 21: Validate Custom Domain Design

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array

---

## Purpose

This step validates the completeness and quality of the custom domain design, ensuring proper domain architecture, SSL/TLS configuration, routing rules, and DNS integration.

---

## Prerequisites

- Step 20: Load Artifact completed successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv -> filter: infrastructure`

---

## Actions

Execute the validation checklist below to verify custom domain design artifacts.

## Inputs

- Loaded artifact from validation step 20
- Quality gate criteria and checklist
- Pattern registry for validation rules

---

## Verification

### Domain Architecture
- [ ] All domain types defined (platform, subdomain, custom, API)
- [ ] Domain hierarchy documented
- [ ] Routing strategy specified
- [ ] Wildcard certificate scope defined

### SSL/TLS Management
- [ ] Certificate strategy defined per domain type
- [ ] Provisioning flow documented
- [ ] Renewal automation configured
- [ ] Security requirements specified
- [ ] Emergency revocation process defined

### Routing Configuration
- [ ] Tenant resolution logic defined
- [ ] API gateway integration configured
- [ ] CDN configuration specified
- [ ] Failover scenarios documented
- [ ] Health check endpoints defined

### DNS Integration
- [ ] DNS verification methods defined
- [ ] Propagation monitoring designed
- [ ] Ownership verification implemented
- [ ] Multi-provider support documented
- [ ] Timeout and retry policies specified

### Cross-Cutting
- [ ] Consistent with tenant model isolation design
- [ ] All configurations are tenant-aware
- [ ] Patterns align with pattern registry

---

## Gate Decision

- **PASS**: All sections complete, all domain types covered, security configured
- **CONDITIONAL**: Minor gaps (e.g., specific provider integrations) - document gaps and proceed
- **FAIL**: Missing domain types, undefined SSL strategy, or incomplete routing - return to Create mode

Present validation results with specific findings for each section.

---

## COLLABORATION MENUS (A/P/C):

After completing validation checks, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation findings
- **P (Party Mode)**: Bring analyst and architect perspectives for validation review
- **C (Continue)**: Accept validation results and proceed to generate report
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Save validation results
- Update frontmatter `stepsCompleted: [20, 21]`
- Proceed to next step: `step-22-v-generate-report.md`

---

## Outputs

- Validated custom domain design
- Validation gate decision (PASS/CONDITIONAL/FAIL)
- Configuration gaps documented (if CONDITIONAL)
- Required fixes list (if FAIL)

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate the validation report.
