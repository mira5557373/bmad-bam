# Step 3: Rollback Procedures

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics

---

## Purpose

Define comprehensive rollback mechanisms for prompt versions, including automatic triggers, manual procedures, and version pinning for critical tenants.

---

## Prerequisites

- Step 2 completed: A/B testing framework designed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: rollback-patterns
- **Web research (if available):** Search for current rollback best practices

---

## Inputs

- Version schema from Step 1
- A/B testing framework from Step 2
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- SLA requirements

---

## Actions

### 1. Define Automatic Rollback Triggers

Specify conditions that trigger automatic rollback:

| Trigger | Threshold | Window | Action |
|---------|-----------|--------|--------|
| Error Rate Spike | >5% increase | 5 min | Immediate rollback |
| Latency Degradation | P95 >2x baseline | 10 min | Gradual rollback |
| Safety Violation | Any critical | Immediate | Immediate rollback |
| User Feedback | Rating drop >20% | 1 hour | Alert + review |
| Cost Spike | >50% token increase | 15 min | Alert + review |
| Availability Drop | <99% success | 5 min | Immediate rollback |

### 2. Design Manual Rollback Workflow

Define the manual rollback process:

| Step | Action | Actor | Duration |
|------|--------|-------|----------|
| 1 | Identify issue | Ops/On-call | - |
| 2 | Assess impact | AI Engineer | 5 min |
| 3 | Select rollback version | AI Engineer | 2 min |
| 4 | Execute rollback | Ops | 1 min |
| 5 | Verify rollback | QA/Automated | 5 min |
| 6 | Notify stakeholders | Ops | 2 min |
| 7 | Document incident | AI Engineer | 30 min |

### 3. Version Pinning for Critical Tenants

Define version pinning strategy:

| Tier | Pin Capability | Override Authority | Change Window |
|------|----------------|-------------------|---------------|
| Free | No pinning | Platform only | Any time |
| Pro | Request pinning | Tenant + Platform | Scheduled |
| Enterprise | Self-service pin | Tenant admin | Custom |

Version Pin Configuration:

| Field | Type | Description |
|-------|------|-------------|
| tenant_id | string | Pinning tenant |
| prompt_id | string | Pinned prompt |
| pinned_version | semver | Specific version |
| pin_reason | text | Justification |
| expiry_date | timestamp | Auto-unpin date |
| override_approval | boolean | Can platform override |

### 4. Define Rollback Verification Tests

Specify tests that must pass after rollback:

| Test Category | Tests | Pass Criteria |
|---------------|-------|---------------|
| Smoke Tests | 5-10 critical paths | 100% pass |
| Golden Tasks | 20-50 representative | >95% match baseline |
| Safety Suite | Adversarial prompts | 0 violations |
| Integration | API contracts | All contracts valid |
| Performance | Latency benchmarks | Within baseline |

### 5. Communication and Notification Procedures

Define stakeholder communication:

| Event | Notification | Recipients | Channel |
|-------|--------------|------------|---------|
| Auto Rollback | Immediate | On-call, Ops | PagerDuty |
| Manual Rollback | Immediate | Team, Stakeholders | Slack |
| Pinning Request | On request | Tenant, Support | Email |
| Version Deprecation | 2 weeks notice | All tenants | In-app |
| Emergency Rollback | Real-time | All | Status page |

### 6. Rollback Metrics and Reporting

Track rollback effectiveness:

| Metric | Target | Description |
|--------|--------|-------------|
| MTTR | <5 min | Mean time to rollback |
| Rollback Success Rate | >99% | Successful rollbacks |
| Detection Time | <2 min | Time to detect issue |
| Recovery Time | <10 min | Full recovery time |
| Incident Frequency | <1/month | Rollback triggers |

**Verify current best practices with web search:**
Search the web: "LLM prompt rollback strategies production {date}"
Search the web: "AI model rollback best practices enterprise {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the rollback procedures analysis, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into rollback scenarios and edge cases
- **P (Party Mode)**: Bring SRE and DevOps perspectives on rollback design
- **C (Continue)**: Accept rollback procedures and proceed to deployment pipeline
- **[Specific refinements]**: Describe rollback concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: automatic triggers, manual workflow, version pinning
- Process enhanced insights on rollback reliability
- Ask user: "Accept these refined rollback decisions? (y/n)"
- If yes, integrate into rollback specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review prompt rollback procedures for multi-tenant AI platform"
- Process SRE and DevOps perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save rollback procedures to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-deployment-pipeline.md`

---

## Verification

- [ ] Automatic rollback triggers defined
- [ ] Manual rollback workflow documented
- [ ] Version pinning strategy specified
- [ ] Rollback verification tests defined
- [ ] Communication procedures documented
- [ ] Rollback metrics established
- [ ] Patterns align with pattern registry

---

## Outputs

- Rollback procedure documentation
- Automatic trigger configuration
- Version pinning specification
- Verification test suite definition
- Communication plan

---

## Next Step

Proceed to `step-04-c-deployment-pipeline.md` to create prompt deployment pipeline.
