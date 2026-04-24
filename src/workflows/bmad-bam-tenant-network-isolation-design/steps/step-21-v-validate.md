# Step 21: Validate Network Isolation Design

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- ALWAYS pause after presenting findings and await user direction

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Track progress in `stepsCompleted` array

---

## Purpose

Validate the completeness and quality of the network isolation design.

---

## Prerequisites

- Step 20: Load Artifact completed successfully

---

## Actions

Execute the validation checklist below to verify network isolation design artifacts.

## Verification

### VPC Architecture
- [ ] VPC design defined per tenant tier
- [ ] Subnet allocation documented
- [ ] AZ distribution planned
- [ ] CIDR ranges non-overlapping

### Security Groups
- [ ] Security groups defined per layer
- [ ] Least privilege principle applied
- [ ] Tenant-specific rules documented
- [ ] Naming convention established

### VPC Peering
- [ ] Transit Gateway configured
- [ ] VPC peering patterns defined
- [ ] Private Link endpoints specified
- [ ] Route tables documented

### Traffic Isolation
- [ ] Network ACLs configured
- [ ] Flow logs enabled
- [ ] DDoS protection designed
- [ ] Traffic mirroring specified

### Cross-Cutting
- [ ] Consistent with tenant model isolation
- [ ] Security baseline compliance
- [ ] Patterns align with pattern registry

---

## Gate Decision

- **PASS**: All sections complete, security configured, isolation verified
- **CONDITIONAL**: Minor gaps - document gaps and proceed
- **FAIL**: Missing critical sections - return to Create mode

---

## COLLABORATION MENUS (A/P/C):

After completing validation checks, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation findings
- **P (Party Mode)**: Bring security perspectives for validation review
- **C (Continue)**: Accept validation results and proceed to generate report
```

#### If 'C' (Continue):
- Save validation results
- Update frontmatter `stepsCompleted: [20, 21]`
- Proceed to next step: `step-22-v-generate-report.md`

---

## Outputs

- Validated network isolation design
- Validation gate decision (PASS/CONDITIONAL/FAIL)

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate the validation report.
