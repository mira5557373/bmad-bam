# Scrum Master Guide - BAM Extension

**When to load:** During Phase 4 (Implementation) when coordinating parallel module development, or when user mentions team coordination, cross-module dependencies, or integration sprints.
**Integrates with:** Developer+SM (dev-bam.yaml), agile ceremonies, team facilitation

This guide provides BAM-specific context for scrum masters working on multi-tenant agentic AI platforms.

## Role Context

As a scrum master on a BAM project, you focus on:
- Facilitating parallel development across modules
- Ensuring teams can work independently
- Managing cross-module dependencies
- Coordinating integration points

## Core Concepts

### Module Team Independence
In modular monolith development, each module team should own their bounded context completely. Teams work against defined facade contracts, enabling parallel development without blocking. Independence is achieved through contract-first development and mock-based testing.

### Cross-Module Dependency Management
Dependencies between modules must be explicitly tracked, planned ahead, and coordinated through defined ceremonies. Facade contract changes require advance notice, and integration points are planned at sprint boundaries rather than ad-hoc.

### Integration Sprint Cadence
Regular integration sprints bring all modules together for full-system testing. During integration sprints, contracts are frozen, all modules deploy together, and cross-team debugging sessions resolve integration issues that unit and contract tests missed.

## Application Guidelines

When coordinating multi-tenant module development:
1. Map all cross-module dependencies before sprint planning
2. Define facade contracts at least one sprint before implementation
3. Schedule regular dependency sync meetings to surface blockers early
4. Use contract testing to enable independent module development
5. Treat all cross-tenant bugs as P0 priority regardless of module

## Cross-Module Sprint Planning Framework

Use this framework to plan and coordinate sprints across multiple module teams:

### Module Dependency Matrix

| Planning Factor | Independent Work | Facade Dependency | Shared Kernel Change |
|----------------|------------------|-------------------|---------------------|
| **Planning Lead Time** | Normal sprint | 1 sprint ahead | 2 sprints ahead |
| **Contract Review** | Not required | Required | Architecture review |
| **Testing Approach** | Unit + module | + Contract tests | + Integration regression |
| **Release Coordination** | Independent | Synchronized | Platform-wide |
| **Risk Level** | Low | Medium | High |

### Sprint Planning Decision Tree

| Scenario | Approach | Team Coordination |
|----------|----------|-------------------|
| Feature within single module | Standard sprint planning | Module team only |
| Feature requires facade call | Plan facade contract first | Provider + Consumer teams |
| Feature spans 3+ modules | Saga planning session | All affected teams |
| Shared kernel enhancement | Architecture spike sprint | Platform team + all module teams |
| Cross-tenant data migration | Dedicated migration sprint | Ops + all module teams |

## Actionable Guidance

### Planning Cross-Module Sprints

1. **Map Feature to Modules** - Identify all modules involved in upcoming features
2. **Identify Dependencies** - Document which modules depend on others
3. **Sequence Work** - Order module work to resolve dependencies
4. **Define Contracts Early** - Lock facade contracts before implementation
5. **Create Integration Points** - Schedule sync points within sprint
6. **Plan Buffer Time** - Allow slack for unexpected integration issues
7. **Establish Communication Cadence** - Daily syncs for dependent teams

### Managing Module Team Independence

1. **Enforce Module Boundaries** - Teams own their modules completely
2. **Use Contract-First Development** - Define interfaces before implementation
3. **Mock External Dependencies** - Teams work against mock facades
4. **Maintain Local Test Suites** - Each module testable in isolation
5. **Document Decision Authority** - Clear who decides what within modules
6. **Enable Async Communication** - Reduce blocking on other teams
7. **Celebrate Module Autonomy** - Recognize independent deliveries

### Coordinating Integration Sprints

1. **Schedule Regularly** - Plan integration sprints quarterly or per release
2. **Freeze Contracts** - No facade changes during integration sprint
3. **Deploy All Modules** - Full system deployment for integration testing
4. **Run E2E Test Suite** - Execute cross-module test scenarios
5. **Fix Issues Together** - Joint debugging sessions
6. **Document Learnings** - Capture integration patterns for future
7. **Celebrate Success** - Recognize successful integration efforts

## Key Considerations

### Parallel Development
- Teams work on different modules simultaneously
- Clear facade contracts enable independence
- Integration testing at sprint boundaries

### Independent Development
- Module ownership enables autonomy
- Minimize cross-team dependencies
- Use contract testing for integration

### Team Coordination
- Sync on facade contract changes
- Plan integration sprints
- Manage cross-module story dependencies

## SaaS-Specific Considerations

### Multi-Tenant Impact Assessment

Before each sprint, assess tenant impact:

| Change Type | Impact Assessment Questions |
|-------------|----------------------------|
| Schema change | Does it require tenant data migration? |
| API change | Does it affect tenant integrations? |
| Feature addition | Which tiers get access when? |
| Performance change | Does it affect tenant SLAs? |
| Security change | Does it require tenant notification? |

### Sprint Planning for Tenant Features

**Tier-Based Sprint Allocation:**

| Sprint Capacity | Recommended Allocation |
|-----------------|----------------------|
| Platform stability | 20-30% |
| Enterprise tier features | 20-30% |
| Pro tier features | 20-30% |
| Free tier features | 10-20% |
| Technical debt | 10-20% |

### Dependency Management Ceremonies

**Weekly Dependency Sync (30 min):**
- Review cross-module blockers
- Surface upcoming facade changes
- Align on shared kernel modifications
- Update dependency board

**Pre-Sprint Dependency Review (1 hour):**
- Identify all cross-module work in upcoming sprint
- Confirm contract availability
- Assign integration testing responsibility
- Schedule sync points

**Post-Sprint Integration Retrospective:**
- Review integration successes/failures
- Document patterns and anti-patterns
- Update team agreements
- Celebrate cross-team collaboration

### Release Coordination

**Release Train for Multi-Tenant:**

| Release Phase | Duration | Activities |
|--------------|----------|------------|
| Development | 2 weeks | Module development in parallel |
| Integration | 3 days | Cross-module testing |
| Staging | 2 days | Full system validation |
| Canary | 1-2 days | Limited tenant rollout |
| GA | 1 day | Full tenant rollout |

### Cross-Team Communication Patterns

**Communication Channels by Urgency:**

| Urgency | Channel | Response Time |
|---------|---------|---------------|
| Blocker | Video call | Immediate |
| Same-day need | Chat/Slack | < 2 hours |
| This sprint | Ticket/Issue | < 1 day |
| Future sprint | Email/RFC | < 1 week |

### Metrics for Cross-Module Health

**Track These Metrics:**
- Cross-module blocker frequency
- Facade contract change rate
- Integration test pass rate
- Cross-team PR review time
- Integration sprint velocity

**Warning Signs:**
- Increasing cross-module blockers
- Frequent contract changes
- Integration test instability
- Long cross-team review cycles
- Integration sprint delays

### Team Agreements for Multi-Tenant

**Recommended Working Agreements:**
- All facade changes require RFC with 48-hour review period
- Contract tests must pass before PR merge
- Tenant context changes require architecture review
- All cross-tenant bugs are P0 priority
- Integration issues get immediate attention

### Scaling Ceremonies

**As Team Count Grows:**

| Team Count | Ceremony Adaptation |
|------------|---------------------|
| 2-3 teams | Direct communication, shared standup |
| 4-6 teams | Scrum of scrums, dependency board |
| 7+ teams | Program increment planning, release train |

## Decision Framework

| Situation | Recommendation | Rationale |
|-----------|---------------|-----------|
| Feature spans multiple modules | Plan facade contracts one sprint ahead | Enables parallel implementation without blocking |
| Cross-module blocker emerges | Escalate to immediate sync meeting | Blockers compound if not resolved quickly |
| Shared kernel change needed | Require architecture review and 2-sprint lead time | High-risk changes need wider coordination |
| Integration tests failing frequently | Schedule dedicated integration sprint | Systemic issues need focused resolution time |
| Team count exceeds 6 | Implement scrum of scrums | Direct coordination doesn't scale beyond 6 teams |
| Cross-tenant bug discovered | P0 priority, all hands on deck | Tenant isolation failures are existential risk |

## Related Workflows

- `bmad-bam-cross-module-story` - Create stories that span multiple modules
- `bmad-bam-convergence-verification` - Verify convergence across module boundaries

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Scrum patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `agile-*`
- **Quality gates:** `{project-root}/_bmad/bam/data/quality-gates.csv`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "SaaS scrum master practices {date}"
- Search: "multi-tenant sprint planning {date}"
- Search: "agile release management SaaS {date}"
