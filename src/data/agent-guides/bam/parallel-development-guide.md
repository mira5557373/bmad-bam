# Parallel Development Guide

**When to load:** When coordinating multiple developers on modules, managing feature branches, or when user mentions parallel work, merge conflicts, or team coordination.

**Integrates with:** Dev agent, PM agent, Architect (Atlas persona)

---

## Core Concepts

### What is Parallel Development in Modular Monolith?

Parallel development enables multiple teams or developers to work on different modules simultaneously without blocking each other. Clear module boundaries, stable interfaces, and proper coordination minimize conflicts.

### Parallel Development Prerequisites

| Prerequisite | Description | Impact |
|--------------|-------------|--------|
| Clear module ownership | One team per module | Reduces conflicts |
| Stable facade contracts | Versioned interfaces | Enables independence |
| Feature flags | Incomplete work hidden | Safe integration |
| CI/CD pipeline | Continuous integration | Early conflict detection |

### Parallel Work Architecture

```
Main Branch (always deployable)
    │
    ├── Module A Team
    │   ├── feature/module-a-user-auth
    │   └── feature/module-a-profile-api
    │
    ├── Module B Team
    │   ├── feature/module-b-billing-v2
    │   └── feature/module-b-invoices
    │
    └── Cross-Module Feature
        └── feature/x-tenant-onboarding (coordinated)
            ├── Module A changes
            └── Module B changes
```

---

## Key Patterns

### Pattern 1: Module Ownership Model

| Model | Description | Team Size |
|-------|-------------|-----------|
| Single owner | One team owns module | 2-5 devs |
| Shared ownership | Multiple teams contribute | Requires coordination |
| Inner source | Module accepts contributions | Large organizations |

### Ownership Assignment Criteria

| Factor | Single Owner | Shared Ownership | Inner Source |
|--------|--------------|------------------|--------------|
| Module stability | Evolving | Stable | Very stable |
| Domain expertise | Specialized | Cross-functional | Common knowledge |
| Change frequency | High | Medium | Low |
| Team capacity | Available | Distributed | Platform-wide |

### Pattern 2: Branch Strategy

| Strategy | Use Case | Conflict Risk |
|----------|----------|---------------|
| Feature branches | Small features | Low |
| Module branches | Large module changes | Medium |
| Release branches | Staged releases | Low |
| Trunk-based | Continuous deployment | Requires discipline |

### Branch Strategy Selection

| Scenario | Recommended Strategy | Integration Frequency |
|----------|----------------------|----------------------|
| Startup, small team | Trunk-based | Continuous |
| Growing team (5-15) | Short-lived feature branches | Daily |
| Multiple teams (15-50) | Feature flags + trunk | Continuous |
| Regulated industry | Release branches | Per release cycle |

### Pattern 3: Interface Contracts

| Approach | Description | Breaking Changes |
|----------|-------------|------------------|
| Contract-first | Define before implement | ADR approval |
| Consumer-driven | Tests define contract | Consumer notified |
| Provider-driven | Owner decides | Consumer adapts |

### Contract Change Process

| Change Type | Process | Timeline |
|-------------|---------|----------|
| Non-breaking addition | PR review | Same sprint |
| Deprecation | Announce + 2 versions | 2-4 sprints |
| Breaking change | ADR + migration plan | 1-2 quarters |

---

## Decision Criteria

### When to Coordinate vs Work Independently

| Scenario | Approach | Coordination Level |
|----------|----------|-------------------|
| Feature within one module | Independent | Low |
| Facade change | Notify consumers | Medium |
| Cross-module feature | Coordinated | High |
| Shared kernel change | Team-wide discussion | Very high |

### Feature Flag vs Branch Strategy

| Factor | Favor Feature Flag | Favor Branch |
|--------|-------------------|--------------|
| Integration risk | Low | High |
| Deployment frequency | High | Low |
| Feature completeness | Incremental | All-or-nothing |
| Testing complexity | Simple | Complex |

---

## Application Guidelines

- Multiple developers working on same codebase
- Planning sprint work across modules
- Designing team topology for modules
- Managing long-running feature development
- Coordinating cross-module features

---

## Coordination Checklist

- [ ] Module ownership assigned
- [ ] Facade contracts documented
- [ ] Feature flags for incomplete work
- [ ] Integration tests for contracts
- [ ] Daily integration to main branch
- [ ] Conflict resolution process defined

---

## Avoiding Merge Conflicts

| Area | Strategy | Implementation |
|------|----------|----------------|
| Schema changes | Migration per module | Prefixed names |
| Shared config | Module sections | YAML includes |
| Test fixtures | Module-scoped | Namespace |
| Dependencies | Module lockfile section | Package manager |

### Conflict Prevention Checklist

- [ ] Module prefixes on database migrations
- [ ] Namespaced test fixtures
- [ ] Separate CI config per module
- [ ] Module-scoped environment variables
- [ ] Independent dependency sections

---

## Common Pitfalls and Anti-Patterns

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| Long-lived branches | Merge hell | Short branches + feature flags |
| No contract tests | Silent breaks | Consumer-driven contracts |
| Shared code ownership | Diffuse responsibility | Clear module ownership |
| Big bang integration | Late conflict discovery | Continuous integration |
| Manual coordination | Scales poorly | Automated contract tests |
| Skipping code review | Quality degradation | PR requirements |

### Team Communication Patterns

| Communication Type | Frequency | Medium |
|-------------------|-----------|--------|
| Stand-up | Daily | Sync meeting |
| Contract changes | As needed | Slack/PR |
| Cross-module planning | Sprint start | Planning meeting |
| Architecture decisions | As needed | ADR |

---

## Integration with BAM Patterns

| Pattern | Integration Point | Purpose |
|---------|-------------------|---------|
| Module Facade | Interface stability | Contract protection |
| Feature Toggles | Work-in-progress hiding | Safe integration |
| Context Propagation | Consistent tenant handling | Multi-tenant safety |
| Local Development | Developer productivity | Fast feedback loops |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Development patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `module-boundaries`
- **Related guides:** `local-development-setup`, `module-facade-patterns`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "parallel development modular monolith {date}"
- Search: "trunk-based development multi-team {date}"
- Search: "team topology module ownership {date}"
- Search: "feature flags continuous integration {date}"

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|---------------|-----------|
| Which module ownership model to use? | Single owner for evolving modules; inner source for stable, widely-used modules | Clear ownership reduces coordination overhead; inner source scales for platform capabilities |
| When to use feature flags vs long-lived branches? | Feature flags for incremental rollout and A/B testing; short branches only for isolated changes | Feature flags enable continuous integration; long branches create merge debt |
| How to handle cross-module feature development? | Coordinated planning at sprint start; interface contracts defined before implementation | Early alignment prevents integration failures; contract-first enables parallel work |
| What branch strategy for different team sizes? | Trunk-based for <5 devs; short feature branches for 5-15; feature flags + trunk for 15+ | Matches coordination overhead to team scale; automation compensates at larger sizes |
| When to require contract-first approach? | Always for facade changes; consumer-driven tests for all public interfaces | Prevents breaking changes; enables independent team velocity |

## Related Workflows

- `define-facade-contract` - Define stable interfaces for parallel team work
- `create-module-architecture` - Establish module boundaries for team ownership
- `bmad-bam-convergence-verification` - Verify integration from parallel development streams
- `bmad-bam-chaos-engineering-design` - Validate cross-module integration from multiple teams
- `validate-foundation` - Ensure code quality across parallel development
