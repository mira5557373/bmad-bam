# Step 9: Create Deployment Documentation

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
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Create comprehensive deployment documentation including operator runbooks, release notes templates, incident response procedures, and post-deployment verification checklists.

---

## Prerequisites

- Steps 1-8 completed with all deployment components defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `model-deployment`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `compliance`

---

## Inputs

- Complete deployment configuration from Steps 1-8
- Documentation standards
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Create Operator Runbook

| Section | Content |
|---------|---------|
| Overview | Purpose, scope, audience |
| Prerequisites | Required access, tools, training |
| Pre-Deployment | Checklist, validation steps |
| Deployment Execution | Step-by-step procedures |
| Monitoring | Key metrics, dashboards to watch |
| Rollback | Trigger conditions, procedures |
| Post-Deployment | Verification, cleanup |
| Troubleshooting | Common issues, resolutions |
| Escalation | Contact chain, SLAs |

Runbook structure:

```markdown
# Model Deployment Runbook

## Quick Reference
- Deployment Command: `{{deploy_command}}`
- Rollback Command: `{{rollback_command}}`
- Dashboard: {{dashboard_url}}
- On-Call: {{oncall_schedule}}

## Pre-Deployment Checklist
- [ ] Model artifacts validated
- [ ] Configuration reviewed
- [ ] Tenant communications sent
- [ ] Rollback tested in staging
- [ ] On-call confirmed available

## Deployment Steps
1. Verify prerequisites
2. Initiate canary deployment
3. Monitor initial metrics
4. Progress through stages
5. Complete full rollout
6. Verify post-deployment

## Rollback Procedures
1. Identify rollback trigger
2. Execute rollback command
3. Verify previous version active
4. Notify stakeholders
5. Initiate incident process
```

### 2. Define Release Notes Template

| Section | Purpose |
|---------|---------|
| Version Header | Version, date, codename |
| Summary | Executive summary |
| New Features | User-facing additions |
| Improvements | Performance, quality gains |
| Bug Fixes | Resolved issues |
| Breaking Changes | Migration requirements |
| Known Issues | Outstanding limitations |
| Upgrade Path | Migration instructions |
| API Changes | Endpoint modifications |

Release notes template:

```markdown
# Release Notes: {{model_name}} v{{version}}

**Release Date:** {{date}}
**Codename:** {{codename}}

## Summary
{{executive_summary}}

## New Features
- **{{feature_name}}**: {{feature_description}}

## Improvements
- {{improvement_description}}

## Bug Fixes
- Fixed: {{bug_description}} (#{{issue_number}})

## Breaking Changes
{{#if breaking_changes}}
- {{breaking_change_description}}
- **Migration Required:** {{migration_steps}}
{{else}}
None in this release.
{{/if}}

## Known Issues
- {{known_issue_description}}

## Upgrade Instructions
1. {{step_1}}
2. {{step_2}}
```

### 3. Establish Incident Response Procedures

| Phase | Actions | Roles |
|-------|---------|-------|
| Detection | Alert triggered, triage | On-call |
| Assessment | Impact evaluation, severity | On-call + TL |
| Mitigation | Rollback or fix | Engineering |
| Resolution | Full recovery | Engineering |
| Post-Mortem | RCA, improvements | All stakeholders |

Incident response flow:

```
Alert Triggered
    |
    v
Triage (5 min)
    |-- Severity: Critical --> Immediate Rollback
    |-- Severity: High --> Assess Rollback Need
    |-- Severity: Low --> Monitor
    |
    v
Rollback Decision
    |
    |-- Execute Rollback
    |       |
    |       v
    |   Verify Recovery
    |       |
    |       v
    |   Notify Stakeholders
    |
    v
Incident Report
    |
    v
Post-Mortem (within 48h)
    |
    v
Action Items
```

### 4. Create Post-Deployment Verification Checklist

| Category | Checks | Method |
|----------|--------|--------|
| Health | All endpoints responding | Automated probes |
| Metrics | Within baseline bounds | Dashboard review |
| Logs | No error spike | Log analysis |
| Tenants | Sample tenant validation | Manual spot check |
| Integration | Downstream systems healthy | Integration tests |
| Security | No new vulnerabilities | Security scan |

Verification checklist:

```markdown
## Post-Deployment Verification

### Immediate (0-15 min)
- [ ] Health endpoints returning 200
- [ ] Error rate < 0.5%
- [ ] Latency p99 < 2x baseline
- [ ] No OOM or crash events
- [ ] Canary metrics green

### Short-term (15-60 min)
- [ ] All tenant tiers operational
- [ ] Sample API calls successful
- [ ] Dashboard metrics stable
- [ ] No new alerts triggered
- [ ] Webhook deliveries successful

### Extended (1-24 hours)
- [ ] Full traffic without issues
- [ ] No customer complaints
- [ ] SLO metrics on target
- [ ] Cost within projections
- [ ] Cleanup complete

### Sign-off
- [ ] Engineering sign-off: ___________
- [ ] Product sign-off: ___________
- [ ] Deployment closed: ___________
```

**Verify current best practices with web search:**
Search the web: "ML deployment runbook best practices {date}"
Search the web: "incident response machine learning {date}"
Search the web: "post-deployment verification checklist {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the documentation above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into runbook details and incident procedures
- **P (Party Mode)**: Bring analyst and architect perspectives for documentation review
- **C (Continue)**: Finalize documentation and complete Create mode
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass documentation context: runbook, templates, procedures
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into documentation
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review documentation: {summary of runbooks and procedures}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save all documentation to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8, 9]`
- Generate final model-deployment-spec.md
- Complete Create mode

---

## Verification

- [ ] Operator runbook created
- [ ] Release notes template defined
- [ ] Incident response procedures established
- [ ] Post-deployment verification checklist created
- [ ] All documentation reviewed and approved
- [ ] Patterns align with pattern registry

---

## Outputs

- Model deployment specification document
- Operator runbook
- Release notes template
- Incident response procedures
- Post-deployment verification checklist

**Load template:** `{project-root}/_bmad/bam/templates/model-deployment-template.md`
**Load template:** `{project-root}/_bmad/bam/templates/model-release-checklist-template.md`

---

## Next Step

Create mode complete. Run validation mode to verify the deployment pipeline against quality criteria.

---

## Workflow Complete

Create mode complete for model-deployment-pipeline workflow. The following artifacts have been generated:

- `{output_folder}/planning-artifacts/model-deployment-spec.md`
- Deployment runbook
- Release notes template
- Incident response procedures
- Post-deployment verification checklist
