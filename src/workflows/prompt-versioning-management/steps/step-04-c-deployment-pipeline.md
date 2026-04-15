# Step 4: Deployment Pipeline

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

Create a comprehensive prompt deployment pipeline with CI/CD integration, environment promotion, approval gates, canary deployment, and feature flag integration.

---

## Prerequisites

- Steps 1-3 completed: Version schema, A/B testing, rollback procedures
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: deployment-patterns
- **Web research (if available):** Search for current prompt deployment practices

---

## Inputs

- Version schema from Step 1
- A/B testing framework from Step 2
- Rollback procedures from Step 3
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- CI/CD infrastructure requirements

---

## Actions

### 1. Define CI/CD Integration

Design prompt CI/CD pipeline:

| Stage | Action | Trigger | Gate |
|-------|--------|---------|------|
| Validate | Schema validation | PR created | Auto |
| Test | Golden task suite | PR created | Auto |
| Review | Human review | Tests pass | Manual |
| Stage | Deploy to staging | Approval | Auto |
| Verify | Staging validation | Stage complete | Auto |
| Approve | Production approval | Verify pass | Manual |
| Deploy | Production rollout | Approval | Auto |
| Monitor | Post-deploy metrics | Deploy complete | Auto |

### 2. Design Environment Promotion

Define promotion flow:

| Environment | Purpose | Promotion Criteria | Duration |
|-------------|---------|-------------------|----------|
| Development | Author testing | Unit tests pass | Hours |
| Integration | Cross-agent testing | Integration tests | 1-2 days |
| Staging | Production mirror | QA sign-off | 1-3 days |
| Production | Live traffic | All gates pass | Permanent |

Environment Configuration:

| Setting | Development | Staging | Production |
|---------|-------------|---------|------------|
| Traffic | Synthetic | 5% shadow | 100% live |
| Data | Test data | Anonymized | Real |
| Tenants | Test tenant | Beta tenants | All |
| Logging | Verbose | Standard | Sampled |
| Alerts | None | Warning | Critical |

### 3. Configure Approval Gates

Define approval requirements:

| Gate | Approvers | Timeout | Auto-Approve |
|------|-----------|---------|--------------|
| Development | Author | None | Yes (tests pass) |
| Staging | Tech Lead | 24 hours | No |
| Production | AI Lead + PM | 72 hours | No |
| Hotfix | On-call + Lead | 1 hour | No |
| Rollback | On-call | None | Yes (triggers met) |

Approval Checklist:

- [ ] All automated tests pass
- [ ] Security scan clean
- [ ] Performance within baseline
- [ ] Cost impact assessed
- [ ] Documentation updated
- [ ] Rollback plan confirmed

### 4. Design Canary Deployment Strategy

Define canary deployment:

| Phase | Traffic % | Duration | Success Criteria |
|-------|-----------|----------|------------------|
| Initial | 1% | 30 min | Error rate <1% |
| Expand | 5% | 2 hours | Error rate <0.5% |
| Ramp | 25% | 6 hours | Error rate <0.5% |
| Majority | 50% | 12 hours | Error rate <0.5% |
| Complete | 100% | Permanent | Error rate <0.5% |

Canary Monitoring:

| Metric | Threshold | Action |
|--------|-----------|--------|
| Error Rate | >2% | Halt canary |
| Latency P99 | >150% baseline | Alert |
| Token Usage | >125% baseline | Alert |
| User Feedback | <3.5 stars | Pause + review |
| Safety Flags | Any critical | Immediate rollback |

### 5. Feature Flag Integration

Design feature flag strategy:

| Flag Type | Scope | Use Case |
|-----------|-------|----------|
| Release Flag | Prompt version | Version switching |
| Experiment Flag | A/B test | Traffic splitting |
| Kill Switch | Agent/Prompt | Emergency disable |
| Tenant Flag | Tenant-specific | Custom behavior |
| Ops Flag | Operational | Maintenance mode |

Feature Flag Configuration:

| Property | Value | Description |
|----------|-------|-------------|
| Provider | GrowthBook/LaunchDarkly | Feature flag service |
| Sync Interval | 10 seconds | Flag refresh rate |
| Fallback | Last known | Network failure behavior |
| Audit | Enabled | Track flag changes |
| Targeting | User/Tenant/% | Assignment method |

### 6. Post-Deployment Monitoring

Define post-deployment observability:

| Metric | SLI | SLO | Alert Threshold |
|--------|-----|-----|-----------------|
| Availability | Success rate | 99.9% | <99.5% |
| Latency | P95 response | <500ms | >750ms |
| Quality | Task accuracy | >95% | <90% |
| Safety | Violation rate | 0% | >0.01% |
| Cost | Token usage | Budget | >120% budget |

**Verify current best practices with web search:**
Search the web: "prompt deployment pipeline CI/CD best practices {date}"
Search the web: "LLM canary deployment strategies {date}"

_Source: [URL]_

---

## Soft Gate Checkpoint

**Steps 1-4 complete the prompt versioning management design.**

Present a summary:
- Version schema with semantic versioning and tenant overrides
- A/B testing framework with statistical rigor
- Rollback procedures with automatic triggers
- Deployment pipeline with approval gates and canary deployment

Ask for confirmation before generating final output document.

---

## COLLABORATION MENUS (A/P/C):

After completing the deployment pipeline design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into CI/CD and deployment edge cases
- **P (Party Mode)**: Bring DevOps and platform engineering perspectives
- **C (Continue)**: Accept deployment pipeline and generate final output
- **[Specific refinements]**: Describe deployment concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: CI/CD stages, promotion flow, canary strategy
- Process enhanced insights on deployment reliability
- Ask user: "Accept these refined deployment decisions? (y/n)"
- If yes, integrate into deployment specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review prompt deployment pipeline for multi-tenant AI platform"
- Process DevOps and platform engineering perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Generate final prompt versioning architecture document
- Save to `{output_folder}/planning-artifacts/architecture/prompt-versioning-architecture.md`
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Mark Create mode complete

---

## Verification

- [ ] CI/CD pipeline stages defined
- [ ] Environment promotion flow documented
- [ ] Approval gates configured
- [ ] Canary deployment strategy designed
- [ ] Feature flag integration specified
- [ ] Post-deployment monitoring defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Complete prompt versioning architecture
- Deployment pipeline specification
- Feature flag configuration
- Monitoring requirements
- **Load template:** `{project-root}/_bmad/bam/data/templates/prompt-version-template.md`

---

## Next Step

Create workflow complete. Prompt versioning architecture ready for validation using Validate mode (`step-20-v-*`).

---

## Workflow Complete

Create mode is complete. The prompt versioning architecture is now ready for validation using Validate mode (`step-20-v-*`).
