# Step 4: Define Done Criteria

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 💬 **Present done criteria with A/P/C menu** for user confirmation
- ⚠️ **INCLUDE quality gate requirements** per story

## EXECUTION PROTOCOLS

- 🎯 Focus: Define done criteria with QG requirements, test coverage, documentation
- 💾 Track: `stepsCompleted: [1, 2, 3, 4]` when complete
- 📖 Context: Done criteria must include tenant isolation verification
- 🚫 Do NOT: Proceed without explicit user confirmation via A/P/C
- 🔍 Use web search: Verify definition of done best practices for multi-tenant SaaS
- ⚠️ Gate: Done criteria must include relevant quality gate checks

---

## CONTEXT BOUNDARIES

### Input Context

- **From Step 01:** Module context, epic categories
- **From Step 02:** Epic scope, acceptance criteria, multi-tenant considerations
- **From Step 03:** User stories, estimates, dependencies, sprint allocation
- **Pattern registry:** `{project-root}/_bmad/bam/data/bam-patterns.csv`

### Output

- Quality gate requirements per story
- Test coverage expectations
- Documentation requirements
- Review checkpoints

### Quality Gate

- Done criteria align with BAM quality gates
- Test coverage thresholds defined
- Review checkpoints established

---

## YOUR TASK

Define comprehensive done criteria for stories. Include quality gate requirements, test coverage expectations, documentation requirements, and review checkpoints. Present done criteria via A/P/C menu for user confirmation.

---

## Main Sequence

### Action 1: Quality Gate Requirements per Story

Map stories to applicable quality gates:

| Story ID | Applicable Quality Gates | CRITICAL Checks | Non-Critical Checks |
|----------|-------------------------|-----------------|---------------------|
| S-{module}-001-01 | QG-M1, QG-M2 | Tenant isolation | Documentation |
| S-{module}-001-02 | QG-M1, QG-M2 | Data scoping | Code review |
| S-{module}-AI-01 | QG-M1, QG-M2, QG-M3 | Agent isolation | Tool registry |

**Quality Gate Matrix:**

```markdown
## Quality Gate Requirements by Story Type

### Core Stories (QG-M1, QG-M2)

**CRITICAL Checks:**
- [ ] Module boundary respected
- [ ] API contracts honored
- [ ] Tenant isolation enforced (RLS/Schema/DB)
- [ ] Cross-tenant access blocked

**Non-Critical Checks:**
- [ ] Code review completed
- [ ] Documentation updated
- [ ] Performance benchmarked

### Integration Stories (QG-I1, QG-I2)

**CRITICAL Checks:**
- [ ] Facade contract compliance
- [ ] Cross-module integration tested
- [ ] Tenant context propagated

**Non-Critical Checks:**
- [ ] Error handling documented
- [ ] Retry logic implemented

### AI/Agent Stories (QG-M3, QG-I3)

**CRITICAL Checks:**
- [ ] Agent tenant isolation verified
- [ ] Tool registry tenant-scoped
- [ ] Memory isolation enforced
- [ ] Kill switch operational

**Non-Critical Checks:**
- [ ] Agent observability implemented
- [ ] LLM versioning documented
```

### Action 2: Test Coverage Expectations

Define test coverage requirements by story type:

| Story Type | Unit Test | Integration Test | E2E Test | Tenant Isolation Test |
|------------|-----------|------------------|----------|----------------------|
| **Core** | 80% | Required | Smoke | Required |
| **Integration** | 70% | Required | Full | Required |
| **Infrastructure** | 60% | Optional | Smoke | If applicable |
| **AI/Agent** | 70% | Required | Full | Required (CRITICAL) |

**Test Coverage Checklist:**

```markdown
## Test Coverage Requirements

### Unit Tests
- [ ] Business logic coverage >= {threshold}%
- [ ] Edge cases covered
- [ ] Error paths tested
- [ ] Tenant context passed correctly in mocks

### Integration Tests
- [ ] API endpoints tested with tenant context
- [ ] Database operations scoped to tenant
- [ ] External service mocks include tenant headers
- [ ] Cross-module calls tested

### E2E Tests
- [ ] User flows tested per tier (Free/Pro/Enterprise)
- [ ] Tenant switching tested
- [ ] Multi-tenant concurrency tested
- [ ] Agent workflows tested (if applicable)

### Tenant Isolation Tests
- [ ] **CRITICAL:** Cross-tenant data access blocked
- [ ] **CRITICAL:** Tenant A cannot read Tenant B data
- [ ] **CRITICAL:** RLS policies active and verified
- [ ] Audit logging captures tenant context
```

### Action 3: Documentation Requirements

Define documentation expectations per story:

| Story Type | Code Comments | API Docs | Runbook | Architecture |
|------------|---------------|----------|---------|--------------|
| **Core** | Required | Required | If operational | Update if changed |
| **Integration** | Required | Required | Required | Update facade docs |
| **Infrastructure** | Required | Optional | Required | Update infra docs |
| **AI/Agent** | Required | Required | Required | Update agent docs |

**Documentation Checklist:**

```markdown
## Documentation Requirements

### Code Documentation
- [ ] Public methods documented
- [ ] Complex logic commented
- [ ] Tenant handling explained
- [ ] Agent decision points documented (if applicable)

### API Documentation
- [ ] Endpoint documented with tenant context
- [ ] Request/response schemas current
- [ ] Error codes documented
- [ ] Rate limits by tier documented

### Operational Runbooks
- [ ] Deployment steps documented
- [ ] Rollback procedure defined
- [ ] Monitoring alerts configured
- [ ] Tenant-specific troubleshooting guide

### Architecture Updates
- [ ] Module architecture reflects changes
- [ ] ADR created for significant decisions
- [ ] Tenant isolation patterns documented
- [ ] Agent architecture updated (if applicable)
```

### Action 4: Review Checkpoints

Define review checkpoints for stories:

```markdown
## Review Checkpoints

### Pre-Development
- [ ] Story requirements clarified
- [ ] Technical approach agreed
- [ ] Dependencies identified
- [ ] Tenant model implications understood

### During Development
- [ ] Daily standup progress
- [ ] Blockers raised promptly
- [ ] Code in WIP branch
- [ ] Tests written alongside code

### Code Review
- [ ] PR created with story link
- [ ] Self-review completed
- [ ] Tenant isolation verified
- [ ] Test coverage verified
- [ ] Documentation updated

### Pre-Merge
- [ ] All tests passing
- [ ] Quality gate checks passed
- [ ] Product Owner sign-off (if needed)
- [ ] QA approval (if needed)

### Post-Merge
- [ ] Deployed to staging
- [ ] Smoke tests passed
- [ ] Monitoring verified
- [ ] Story moved to Done
```

### Action 5: Definition of Done Template

Create the master Definition of Done:

```markdown
## Definition of Done

A story is DONE when ALL of the following are true:

### Functional Completeness
- [ ] All acceptance criteria met
- [ ] No known defects
- [ ] User value delivered

### Code Quality
- [ ] Code review approved
- [ ] No linting errors
- [ ] No security vulnerabilities
- [ ] Follows coding standards

### Testing
- [ ] Unit tests passing ({threshold}% coverage)
- [ ] Integration tests passing
- [ ] E2E tests passing (if required)
- [ ] **TENANT:** Isolation tests passing

### Documentation
- [ ] Code documented
- [ ] API docs updated
- [ ] Runbook updated (if operational)

### Quality Gates
- [ ] Applicable QG checks passed
- [ ] No CRITICAL failures
- [ ] Non-critical items documented

### Deployment
- [ ] Deployed to staging
- [ ] Smoke tests passed
- [ ] Ready for production deploy

### Sign-off
- [ ] Product Owner approved
- [ ] Tech Lead approved
- [ ] QA approved (if required)
```

### Action 6: Web Research Verification

**Verify current best practices with web search:**

Search the web: "definition of done best practices agile {date}"
Search the web: "test coverage requirements SaaS {date}"
Search the web: "quality gates multi-tenant software {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

After presenting done criteria:

```
================================================================================
DONE CRITERIA DEFINED
================================================================================

MODULE: {module_name}
STORIES: {story_count}

QUALITY GATES:
- Core Stories: QG-M1, QG-M2
- Integration Stories: QG-I1, QG-I2
- AI/Agent Stories: QG-M3, QG-I3

TEST COVERAGE:
- Unit: {threshold}% minimum
- Integration: Required for all stories
- Tenant Isolation: CRITICAL for all stories

REVIEW CHECKPOINTS: 5 stages defined

================================================================================
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific criteria or thresholds
- **P (Party Mode)**: Gather QA, Tech Lead, and DevOps perspectives
- **C (Continue)**: Accept done criteria and proceed to compile epic document

Select an option:
================================================================================
```

### If 'A' (Advanced Elicitation)

Invoke `bmad-advanced-elicitation` skill to explore:

| Topic | Questions to Explore |
|-------|---------------------|
| **Coverage Thresholds** | Are test coverage thresholds appropriate? |
| **Quality Gates** | Are all relevant QG checks included? |
| **Review Process** | Is the review checkpoint flow realistic? |
| **Documentation** | Is documentation scope appropriate? |
| **Tenant Testing** | Are tenant isolation tests comprehensive? |

Pass context: Done criteria, test thresholds, QG mappings, specific concerns.

**After processing enhanced insights, return to A/P/C menu.**

### If 'P' (Party Mode)

Invoke `bmad-party-mode` skill with context:

```
Review done criteria for module {module_name}:
- Stories: {story_count}
- Test thresholds: {thresholds}
- Quality gates: {gates}
- Review stages: 5
```

Gather perspectives from:

| Persona | Focus Area | Key Questions |
|---------|------------|---------------|
| **QA Lead** | Testing | Are test criteria sufficient? |
| **Tech Lead** | Quality | Are quality gates appropriate? |
| **DevOps** | Deployment | Are deployment criteria realistic? |
| **Scrum Master** | Process | Is the DoD achievable in sprints? |

Process multi-perspective analysis and synthesize into refined criteria.

**After processing perspectives, return to A/P/C menu.**

### If 'C' (Continue)

1. Record the done criteria in working document:

```yaml
# Add to module epics document
done_criteria:
  quality_gates:
    core: [QG-M1, QG-M2]
    integration: [QG-I1, QG-I2]
    ai_agent: [QG-M3, QG-I3]
  test_coverage:
    unit: 80
    integration: required
    e2e: by_type
    tenant_isolation: critical
  documentation:
    code: required
    api: required
    runbook: by_type
  review_checkpoints: 5
done_criteria_completed_at: {timestamp}
```

2. Update workflow state:

```yaml
stepsCompleted:
  - step-01-c-start
  - step-02-c-analyze
  - step-03-c-design
  - step-04-c-document  # Add this
currentStep: step-05-c-complete
```

3. Proceed to NEXT STEP.

---

## SUCCESS METRICS

- ✅ Quality gate requirements mapped per story
- ✅ Test coverage thresholds defined
- ✅ Documentation requirements specified
- ✅ Review checkpoints established
- ✅ Definition of Done created
- ✅ Web research completed
- ✅ User confirmed criteria via A/P/C menu

---

## FAILURE MODES

- ❌ **Missing QG mapping:** Map all stories to applicable quality gates
- ❌ **Unrealistic coverage:** Adjust thresholds to be achievable
- ❌ **Incomplete DoD:** Ensure all required elements included
- ❌ **Missing tenant criteria:** Add tenant isolation verification
- ❌ **Proceeding without A/P/C:** User not engaged in criteria decisions

---

## Verification

- [ ] Quality gates mapped to stories
- [ ] Test coverage defined
- [ ] Documentation requirements specified
- [ ] Review checkpoints established
- [ ] Definition of Done complete
- [ ] Web research completed
- [ ] Patterns align with pattern registry

---

## Outputs

- Quality gate requirements per story
- Test coverage expectations
- Documentation requirements
- Review checkpoints
- Definition of Done template

---

## NEXT STEP

After user confirms done criteria with 'C':

1. Record the done criteria in working document
2. Proceed to `step-05-c-complete.md` to compile the final epic document
3. The done criteria inform:
   - Sprint planning
   - QA planning
   - Deployment readiness

**Transition to Step 05 with:**
- Quality gates: `{gates}` mapped
- Test coverage: `{thresholds}` defined
- Review checkpoints: `5` stages
