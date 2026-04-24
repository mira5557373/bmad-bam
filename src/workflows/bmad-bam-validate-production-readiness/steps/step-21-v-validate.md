# Step 21: Validate Production Readiness

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

## Purpose

This step performs comprehensive validation against QG-P1 Production Readiness criteria, covering tenant isolation, agent safety, operational readiness, security posture, and deployment configuration.

## Prerequisites

- Step 20: Load Artifacts completed successfully
- All prerequisite gates (QG-I1, QG-I2, QG-I3) passed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `production-deployment`

---

## Inputs

- Loaded artifacts from validation step 20
- Production readiness checklist
- Pattern registry for validation rules
- Previous validation findings (if re-validating)

---

## Actions

### 1. Review Prerequisite Gates

- Confirm QG-I1 (Convergence) findings addressed
- Confirm QG-I2 (Tenant Safety) findings addressed
- Confirm QG-I3 (Agent Safety) findings addressed

### 2. Validate Production Categories

- Assess tenant isolation in production config
- Review agent safety in production environment
- Check operational readiness
- Verify security posture
- Validate deployment configuration

### 3. Generate Findings

- Document any issues found
- Categorize by severity (Critical/High/Medium/Low)

---

## Verification

### Tenant Isolation (Production)
- [ ] All tenant isolation tests pass in production config
- [ ] RLS policies verified in production database
- [ ] Cross-tenant access blocked at all layers
- [ ] Tenant data encryption at rest and in transit
- [ ] Tenant backup isolation verified

### Agent Safety (Production)
- [ ] All agent safety tests pass in production config
- [ ] Tool permissions verified in production
- [ ] NeMo guardrails configured for production
- [ ] Kill switches tested in staging
- [ ] Agent resource limits configured

### Operational Readiness
- [ ] Monitoring dashboards configured
- [ ] Alerting rules defined and tested
- [ ] Runbooks documented for common scenarios
- [ ] Incident response procedures tested
- [ ] On-call rotation established
- [ ] Escalation paths defined

### Security Posture
- [ ] Security scan clean (no critical/high vulnerabilities)
- [ ] Secrets management verified (no hardcoded secrets)
- [ ] Access controls reviewed and approved
- [ ] Audit logging enabled and verified
- [ ] Penetration testing completed (if required)

### Deployment Configuration
- [ ] Infrastructure as Code reviewed and approved
- [ ] Rollback procedures documented and tested
- [ ] Blue-green or canary deployment strategy defined
- [ ] Health checks configured and working
- [ ] Auto-scaling policies configured
- [ ] Disaster recovery plan documented

### Cross-Cutting
- [ ] All critical items from previous gates resolved
- [ ] No outstanding security issues
- [ ] No outstanding tenant isolation issues
- [ ] Patterns align with pattern registry

#### Checkpoint: Production Validation Complete

Before proceeding, confirm:
- [ ] All verification sections reviewed
- [ ] Gate decision determined
- [ ] Gaps documented (if any)

**STOP: Present the A/P/C menu to the user**

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Conduct deeper analysis of the current step's domain
- Present additional options and trade-offs
- Return to checkpoint after elicitation

#### If 'P' (Party Mode):
- Enable collaborative exploration
- Generate creative alternatives
- Document insights before returning

#### If 'C' (Continue):
- Verify all outputs are complete
- Proceed to next step file

---

## Gate Decision

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` → filter: `QG-P1`

**Load Checklist:** `{project-root}/_bmad/bam/data/checklists/qg-p1-production-readiness.md`

- **PASS**: All production readiness criteria met, no critical issues, ready for deployment
- **CONDITIONAL**: Minor gaps that can be addressed post-deployment - document with timeline
- **FAIL**: Critical issues in tenant isolation, agent safety, security, or operations - must resolve before deployment

Present validation results with specific findings for each category.

## Outputs

- Production readiness assessment
- Validation gate decision (PASS/CONDITIONAL/FAIL)
- Outstanding items documented (if CONDITIONAL)
- Blocking issues (if FAIL)

## Next Step

Proceed to Step 22: Generate Production Readiness Report to compile final report and determine deployment approval.
