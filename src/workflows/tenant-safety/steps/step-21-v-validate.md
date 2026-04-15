# Step 21: Validate Tenant Safety

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

Validate the tenant safety artifacts against QG-AI2 (AI Safety Gate) criteria and multi-tenant security standards.

---

## Prerequisites

- Previous step completed (step-20-v-load-artifact.md)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-safety`
- **Load quality gate:** `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-AI2`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-i2-tenant-safety.md`

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

### Data Isolation Audit
- [ ] Database isolation verified (RLS, schema, or database-per-tenant)
- [ ] Object storage isolation verified (bucket or path isolation)
- [ ] Cache isolation verified (key prefix or namespace isolation)
- [ ] Search/index isolation verified (filtered or namespaced)
- [ ] All storage layers have explicit isolation strategy

### Resource Boundary Tests
- [ ] CPU resource limits enforced per tenant
- [ ] Memory resource limits enforced per tenant
- [ ] Network bandwidth limits enforced per tenant
- [ ] API rate limits enforced per tenant
- [ ] Storage quota limits enforced per tenant

### AI Context Separation
- [ ] Agent memory isolated per tenant
- [ ] AI tool permissions scoped per tenant
- [ ] Vector embeddings isolated per tenant
- [ ] Model context windows isolated per tenant
- [ ] AI conversation history isolated per tenant

### Cross-Tenant Attack Tests
- [ ] Cross-tenant data access attempts blocked
- [ ] Privilege escalation attempts blocked
- [ ] AI context leakage attempts blocked
- [ ] Resource exhaustion attacks mitigated
- [ ] Cache poisoning attempts blocked
- [ ] JWT/session manipulation blocked

### Compliance Verification
- [ ] Data isolation meets regulatory requirements
- [ ] Audit trail captures cross-tenant access attempts
- [ ] Security incident response procedures documented
- [ ] Penetration test results reviewed

### QG-AI2 AI Safety Gate Verification
**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-AI2`

- [ ] **data_isolation_verified** (REQUIRED): All tenant data fully isolated
- [ ] **resource_boundaries_enforced** (REQUIRED): Resource limits prevent cross-tenant impact
- [ ] **ai_context_separated** (REQUIRED): AI/LLM context isolated per tenant
- [ ] **cross_tenant_attacks_blocked** (REQUIRED): All cross-tenant attack vectors mitigated
- [ ] **compliance_documented**: Safety compliance requirements documented

**QG-AI2 Required Patterns:**
| Pattern | Required | Status | Evidence |
|---------|----------|--------|----------|
| data_isolation_verified | **YES** | [ ] Pass / [ ] Fail | Isolation audit results |
| resource_boundaries_enforced | **YES** | [ ] Pass / [ ] Fail | Resource boundary test results |
| ai_context_separated | **YES** | [ ] Pass / [ ] Fail | AI context separation verification |
| cross_tenant_attacks_blocked | **YES** | [ ] Pass / [ ] Fail | Cross-tenant test results |
| compliance_documented | NO | [ ] Pass / [ ] Fail | Compliance section present |

**QG-AI2 AI Safety Gate:** [ ] SATISFIED / [ ] NOT SATISFIED

---

## Gate Decision

- **PASS**: All isolation verified, all boundaries enforced, AI context separated, cross-tenant attacks blocked
- **CONDITIONAL**: Minor gaps (e.g., some compliance documentation pending) - document gaps, proceed with mitigation plan
- **FAIL**: Any isolation gap, resource boundary bypass, AI context leakage, or cross-tenant attack vector not mitigated - return to Create mode

### QG-AI2 Exit Criteria
This workflow validates QG-AI2. Upon PASS:
- QG-AI2 AI Safety patterns are satisfied
- Workflow exits to QG-P1 (Production Readiness) as next gate in sequence

Present validation results with specific findings for each section.

---

## Error Handling

### FAIL Outcome Recovery Steps

#### Step 1: Categorize the Failure
Identify which category caused the FAIL:

| Failure Category | Severity | Recovery Path |
|------------------|----------|---------------|
| Data isolation gap | CRITICAL | Return to step-01-c-audit-data-isolation.md |
| Resource boundary bypass | CRITICAL | Return to step-02-c-test-resource-boundaries.md |
| AI context leakage | CRITICAL | Return to step-03-c-verify-ai-context.md |
| Cross-tenant attack vector | CRITICAL | Return to step-04-c-test-cross-tenant.md |
| Missing compliance docs | HIGH | Document gaps, may proceed as CONDITIONAL |

#### Step 2: Critical Failure Remediation

**For Data Isolation Gap:**
1. Identify the unprotected storage layer
2. Return to `steps/step-01-c-audit-data-isolation.md`
3. Implement isolation control following documented patterns
4. Re-run isolation tests
5. Re-run validation

**For Resource Boundary Bypass:**
1. Identify the resource type without limits
2. Return to `steps/step-02-c-test-resource-boundaries.md`
3. Implement resource limits and quotas
4. Re-run boundary tests
5. Re-run validation

**For AI Context Leakage (HIGHEST RISK):**
1. **STOP ALL WORK** - This is a critical security issue
2. Document exactly what context could be exposed
3. Escalate to security architect immediately
4. Do not proceed until explicit approval received
5. Implement fix with mandatory security review
6. Run penetration test before re-validation

**For Cross-Tenant Attack Vector:**
1. Identify the attack vector not mitigated
2. Return to `steps/step-04-c-test-cross-tenant.md`
3. Implement security control to block attack
4. Re-run attack tests
5. Re-run validation

#### Step 3: Re-Validation Protocol
After remediation:
1. Document what was fixed and why
2. Return to `steps/step-20-v-load-artifact.md` to reload artifacts
3. Re-run this validation step
4. If FAIL persists after 2 attempts, escalate to mandatory course correction

### Recovery Attempt Tracking

| Attempt | Max Allowed | Action on Exceed |
|---------|-------------|------------------|
| 1 | - | Fix and retry |
| 2 | - | Fix and retry with peer review |
| 3+ | EXCEEDED | Mandatory course correction - escalate to project leadership |

### Escalation Contacts
When escalation is required:
1. Security Architect - for AI context leakage or cross-tenant issues
2. Platform Architect - for isolation design issues
3. Project Leadership - for mandatory course correction after 2 failed attempts

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
- Context: "Review tenant safety validation: {summary of findings and gate decision}"
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

Proceed to `step-22-v-generate-report.md` to compile the validation report.
