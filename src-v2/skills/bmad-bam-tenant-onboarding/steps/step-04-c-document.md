# Step 04: Design Onboarding Validation

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 🤝 **Collaboration menu required** after completing actions

## EXECUTION PROTOCOLS

- 🎯 Focus: Health checks, smoke tests, billing verification, notifications
- 💾 Track: `stepsCompleted: [1, 2, 3, 4]` when complete
- 📖 Context: Provisioned resources from Step 3, saga design from Step 2
- 🚫 Do NOT: Skip to document compilation without completing validation design
- 🔍 Use web search: Verify current onboarding validation patterns
- ⚠️ Gate: Tenant lifecycle patterns

---


## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Gathering required inputs for this step
- Making design decisions within step scope
- Documenting decisions with rationale

**OUT OF SCOPE:**
- Decisions from other steps
- Implementation details
- Validation (separate mode)
## Purpose

Design the onboarding validation process including health checks for provisioned resources, smoke tests for tenant isolation, billing integration verification, and welcome notification triggers.

---

## Prerequisites

- Step 3 completed: Resource initialization designed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-isolation,observability

---

## Inputs

- Output from Steps 2-3: Provisioning flow and resource initialization
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Quality gates: `{project-root}/_bmad/bam/data/quality-gates.csv`

---

## Actions

### 1. Design Health Checks for Provisioned Resources

| Resource | Health Check | Pass Criteria | Timeout |
|----------|--------------|---------------|---------|
| Database | Connection test | Query returns in < 100ms | 5s |
| Storage | Write/read test | File accessible | 10s |
| Cache | Set/get test | Key retrievable | 2s |
| Event Bus | Publish test | Event delivered | 5s |
| AI Context | Embedding test | Vector stored | 10s |
| API Key | Auth test | Token valid | 2s |

#### Health Check Workflow

| Stage | Action | On Failure |
|-------|--------|------------|
| 1 | Run all checks in parallel | Collect failures |
| 2 | Aggregate results | Calculate health score |
| 3 | Evaluate pass threshold | 100% critical, 80% non-critical |
| 4 | Report status | Mark tenant status accordingly |

#### Health Check Result Matrix

| Health Score | Tenant Status | Action |
|--------------|---------------|--------|
| 100% | Active | Proceed to welcome |
| 80-99% | Active (Degraded) | Proceed + alert ops |
| 50-79% | Pending | Retry provisioning |
| < 50% | Failed | Trigger rollback |

### 2. Design Smoke Tests for Tenant Isolation

| Test | Action | Expected Result |
|------|--------|-----------------|
| Cross-tenant query | Query with wrong tenant_id | Empty result / 403 |
| RLS enforcement | Direct DB query | Only tenant rows |
| Storage isolation | Access other tenant path | Access denied |
| Cache isolation | Get other tenant key | Not found |
| API key scope | Use key for wrong tenant | 401 Unauthorized |

#### Isolation Test Suite

| Test ID | Description | Severity | Auto-Remediate |
|---------|-------------|----------|----------------|
| ISO-001 | RLS policy active | Critical | No - block |
| ISO-002 | Storage path ACL | Critical | Yes - apply ACL |
| ISO-003 | Cache namespace | High | Yes - recreate |
| ISO-004 | Event bus scope | High | Yes - reconfigure |
| ISO-005 | API key tenant binding | Critical | No - block |

#### Isolation Test Workflow

| Stage | Action | Duration |
|-------|--------|----------|
| 1 | Create test tenant B | < 1s |
| 2 | Attempt cross-access A→B | < 2s |
| 3 | Verify access denied | < 500ms |
| 4 | Cleanup test tenant B | < 1s |

### 3. Design Billing Integration Verification

| Verification | Check | Pass Criteria |
|--------------|-------|---------------|
| Subscription created | Billing API query | subscription_id exists |
| Plan assigned | Check tier mapping | Plan matches tier |
| Usage metering | Test event recorded | Event in billing system |
| Payment method | Check for Enterprise | Card on file (if required) |
| Invoice preview | Generate preview | Renders without error |

#### Billing Verification Workflow

| Step | Action | For Tiers | On Failure |
|------|--------|-----------|------------|
| 1 | Verify customer created | All | Create customer |
| 2 | Check subscription | Pro, Enterprise | Create subscription |
| 3 | Test metering | All | Alert ops |
| 4 | Validate payment | Enterprise | Block until resolved |

#### Trial/Free Tier Handling

| Tier | Billing Requirement | Grace Period |
|------|---------------------|--------------|
| Free | None (usage limits) | N/A |
| Trial | Optional card | 14 days |
| Pro | Card required | 3 days |
| Enterprise | Invoice setup | Contract terms |

### 4. Design Welcome Email/Notification Triggers

| Notification | Trigger | Channel | Timing |
|--------------|---------|---------|--------|
| Welcome email | Onboarding complete | Email | Immediate |
| Setup guide | First login | In-app | On login |
| Quick start | No activity 24h | Email | 24h after signup |
| Activation reminder | No first action 48h | Email + Push | 48h after signup |
| Trial ending | 3 days before expiry | Email | 3 days before |

#### Notification Content Matrix

| Notification | Subject | Key Content | CTA |
|--------------|---------|-------------|-----|
| Welcome | Welcome to {app}! | Login link, getting started | Login |
| Setup guide | Complete your setup | Checklist, resources | Continue setup |
| Quick start | Get started in 5 min | Top 3 actions | Try feature |
| Activation | Don't miss out | Value props | Activate |
| Trial ending | {N} days left | Upgrade benefits | Upgrade |

#### Notification Trigger Logic

| Condition | Notification | Suppress If |
|-----------|--------------|-------------|
| onboarding_complete = true | Welcome | Already sent |
| first_login = true AND setup_incomplete | Setup guide | Setup complete |
| hours_since_signup > 24 AND actions = 0 | Quick start | Any action taken |
| hours_since_signup > 48 AND activated = false | Activation reminder | Activated |
| trial_days_remaining <= 3 | Trial ending | Upgraded |

### 5. Design Onboarding Metrics and Tracking

| Metric | Description | Target |
|--------|-------------|--------|
| signup_completion_rate | % completing signup form | > 90% |
| provisioning_success_rate | % successful provisions | > 99% |
| time_to_provision | Avg provisioning duration | < 30s |
| isolation_test_pass_rate | % passing isolation tests | 100% |
| time_to_first_action | Duration to first use | < 5 min |
| activation_rate | % reaching activation | > 70% |

**Verify current best practices with web search:**
Search the web: "SaaS onboarding validation patterns {date}"
Search the web: "tenant isolation smoke testing {date}"
Search the web: "SaaS welcome email best practices {date}"
Search the web: "time-to-value optimization SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After designing onboarding validation, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into health checks, isolation tests, or notifications
- **P (Party Mode)**: Bring QA, security, and customer success perspectives
- **C (Continue)**: Accept validation design and proceed to document compilation
- **[Specific refinements]**: Describe additional validation requirements

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: health checks, isolation tests, billing verification, notifications
- Process enhanced insights on validation strategy
- Ask user: "Accept this detailed validation analysis? (y/n)"
- If yes, integrate into validation specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review onboarding validation design for tenant onboarding"
- Process QA engineer, security architect, and customer success perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-complete.md`

---

## Soft Gate Checkpoint

**Steps 1-4 complete the onboarding design foundation.**

Present summary of:
- Health check suite for all provisioned resources
- Isolation smoke tests with pass/fail criteria
- Billing integration verification workflow
- Welcome notification triggers and timing
- Onboarding metrics and targets

Ask for confirmation before proceeding to document compilation.

---

## Verification

- [ ] Health checks for all resources defined
- [ ] Isolation smoke tests specified
- [ ] Billing verification workflow documented
- [ ] Welcome notifications and triggers designed
- [ ] Onboarding metrics identified
- [ ] Patterns align with pattern registry

---

## Outputs

- Health check specification
- Isolation test suite definition
- Billing verification workflow
- Notification trigger matrix
- Onboarding metrics dashboard spec

---


---

## SUCCESS METRICS:

- [ ] All required inputs gathered from user
- [ ] Design decisions documented with rationale
- [ ] User confirmed choices via A/P/C menu
- [ ] Output artifact updated with step content
- [ ] Frontmatter stepsCompleted updated

## FAILURE MODES:

- **Missing input:** Cannot proceed without required context - return to prerequisites
- **Unclear requirements:** Use Advanced Elicitation (A) to clarify
- **Conflicting constraints:** Use Party Mode (P) for multi-perspective analysis
- **User rejects output:** Iterate on design, do not force acceptance

## Next Step

Proceed to `step-05-c-complete.md` to compile the onboarding design document.
