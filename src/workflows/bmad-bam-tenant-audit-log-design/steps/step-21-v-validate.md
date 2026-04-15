# Step 21: Validate Against Criteria

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array

---

## Purpose

Validate the audit log design against QG-I2 quality gate criteria, compliance requirements, and architectural best practices.

---

## Prerequisites

- Step 20 completed: Artifact loaded and parsed
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-i2-tenant-safety.md`
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

---

## Inputs

- Loaded artifact from Step 20
- Quality gate checklist: `{project-root}/_bmad/bam/data/checklists/qg-i2-tenant-safety.md`
- Compliance frameworks: `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

---

## Actions

### 1. Schema Completeness Validation

| Check | Criteria | Status | Finding |
|-------|----------|--------|---------|
| Core fields | All required fields defined | Pass/Fail | {detail} |
| Tenant isolation | tenant_id present and indexed | Pass/Fail | {detail} |
| Timestamps | event_timestamp with timezone | Pass/Fail | {detail} |
| Actor tracking | actor_id and actor_type defined | Pass/Fail | {detail} |
| Resource tracking | resource_type and resource_id defined | Pass/Fail | {detail} |
| Correlation | request_id for tracing | Pass/Fail | {detail} |
| AI agent fields | Agent-specific extension present | Pass/Fail | {detail} |
| Immutability | Hash chain or signing defined | Pass/Fail | {detail} |

### 2. Tenant Isolation Validation

| Check | Criteria | Status | Finding |
|-------|----------|--------|---------|
| Partition strategy | Tenant-based partitioning defined | Pass/Fail | {detail} |
| RLS policy | Row-level security enforced | Pass/Fail | {detail} |
| Index optimization | Tenant-prefixed indexes | Pass/Fail | {detail} |
| Query enforcement | Mandatory tenant context | Pass/Fail | {detail} |
| Cross-tenant prevention | No cross-tenant query paths | Pass/Fail | {detail} |

### 3. Retention Policy Validation

| Check | Criteria | Status | Finding |
|-------|----------|--------|---------|
| Regulatory minimums | Meets all framework minimums | Pass/Fail | {detail} |
| Tier definitions | Storage tiers defined | Pass/Fail | {detail} |
| Lifecycle automation | Automated transitions | Pass/Fail | {detail} |
| Deletion procedures | Secure deletion defined | Pass/Fail | {detail} |
| Legal hold support | Hold mechanism defined | Pass/Fail | {detail} |

### 4. Compliance Coverage Validation

| Framework | Required Controls | Mapped | Coverage | Status |
|-----------|-------------------|--------|----------|--------|
| SOC 2 | 7 | {count} | {%} | Pass/Fail |
| GDPR | 7 | {count} | {%} | Pass/Fail |
| HIPAA | 6 | {count} | {%} | Pass/Fail |
| PCI DSS | 10 | {count} | {%} | Pass/Fail |

### 5. QG-I2 Checklist Validation

Run through QG-I2 (Tenant Safety) checklist items related to audit:

| Check ID | Description | Status | Evidence |
|----------|-------------|--------|----------|
| I2-AUD-01 | Audit logs are tenant-scoped | Pass/Fail | {evidence} |
| I2-AUD-02 | Tenant cannot access other tenant logs | Pass/Fail | {evidence} |
| I2-AUD-03 | Audit queries enforce tenant context | Pass/Fail | {evidence} |
| I2-AUD-04 | Cross-tenant admin access is audited | Pass/Fail | {evidence} |
| I2-AUD-05 | Audit data retention meets requirements | Pass/Fail | {evidence} |

### 6. Calculate Validation Score

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Schema completeness | 25% | {score}/100 | {weighted} |
| Tenant isolation | 30% | {score}/100 | {weighted} |
| Retention policies | 20% | {score}/100 | {weighted} |
| Compliance coverage | 25% | {score}/100 | {weighted} |
| **Total** | 100% | - | **{total}/100** |

**Pass threshold: 85/100**

---

## COLLABORATION MENUS (A/P/C):

After completing the validation above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation findings
- **P (Party Mode)**: Bring auditor and architect perspectives on findings
- **C (Continue)**: Proceed to generate validation report
- **[Specific findings]**: Investigate specific validation results

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: validation results, failed checks, gap analysis
- Process enhanced insights on remediation priorities
- Ask user: "Accept this validation analysis? (y/n)"
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review audit log design validation findings"
- Process auditor and architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document validation results
- Proceed to next step: `step-22-v-generate-report.md`

---

## Verification

- [ ] All validation checks executed
- [ ] Scores calculated for each category
- [ ] Overall validation score determined
- [ ] Pass/fail status clear
- [ ] Patterns align with pattern registry

---

## Outputs

- Validation check results
- Category scores
- Overall validation score
- Findings list

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate the validation report.
