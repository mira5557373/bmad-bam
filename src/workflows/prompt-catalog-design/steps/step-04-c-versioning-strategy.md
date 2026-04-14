# Step 4: Versioning Strategy

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
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Define the versioning strategy for the prompt catalog, including semantic versioning, deprecation policies, and migration path management to ensure smooth evolution of the prompt library.

---

## Prerequisites

- Step 3 completed: Tenant isolation defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: prompt-management
- **Web research (if available):** Search for prompt versioning best practices

---

## Inputs

- Tenant isolation design from Step 3
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Existing versioning conventions (if any)

---

## Actions

### 1. Define Semantic Versioning

Establish versioning semantics for catalog entries:

| Version Component | Change Type | Example Trigger |
|-------------------|-------------|-----------------|
| Major (X.0.0) | Breaking change | Output format change |
| Minor (X.Y.0) | New capability | Added context variable |
| Patch (X.Y.Z) | Bug fix | Typo correction, wording |

| Version Status | Description | Behavior |
|----------------|-------------|----------|
| DRAFT | Work in progress | Not executable |
| ACTIVE | Current version | Default for execution |
| DEPRECATED | Marked for removal | Warning on use |
| ARCHIVED | Historical only | Read-only, no execution |

### 2. Define Deprecation Policy

Establish deprecation and sunset procedures:

| Stage | Duration | Actions |
|-------|----------|---------|
| Deprecation Notice | 30 days before | Mark deprecated, notify users |
| Soft Deprecation | 30-60 days | Warnings in logs, migration guide |
| Hard Deprecation | 60-90 days | Explicit opt-in to continue use |
| Sunset | 90+ days | Remove from active catalog |

| Notification Channel | Audience | Timing |
|---------------------|----------|--------|
| In-App Alert | All users of prompt | Immediate |
| Email Digest | Tenant admins | Weekly |
| API Response Header | Integration consumers | Per-request |
| Changelog | All stakeholders | On change |

### 3. Define Breaking Change Management

Establish procedures for breaking changes:

| Change Type | Migration Requirement | Approval Level |
|-------------|----------------------|----------------|
| Output Schema | Automatic transformer | Platform Admin |
| Input Variables | Migration script | Tenant Admin |
| Model Compatibility | Model upgrade guide | Platform Admin |
| Behavior Change | Golden test updates | AI Ethics + QA |

| Migration Path Element | Description | Required |
|------------------------|-------------|----------|
| Before/After Examples | Show change impact | YES |
| Automated Migration | Script for bulk update | If applicable |
| Rollback Procedure | Revert instructions | YES |
| Testing Checklist | Validation steps | YES |

### 4. Define Backward Compatibility

Establish compatibility guarantees:

| Compatibility Level | Guarantee | Duration |
|--------------------|-----------|----------|
| API Compatibility | Input/output contract | 1 major version |
| Behavioral Compatibility | Same results for same input | Best effort |
| Performance Compatibility | No regression >10% | Per version |

| Compatibility Check | Automation | Blocking |
|--------------------|------------|----------|
| Input Schema | CI/CD validation | YES |
| Output Schema | Golden test comparison | YES |
| Model Support | Model matrix test | YES |
| Performance | Benchmark comparison | NO (warning) |

### 5. Define Version Resolution

Specify how versions are resolved at runtime:

| Resolution Strategy | Use Case | Configuration |
|--------------------|----------|---------------|
| Latest Active | Default behavior | No version specified |
| Pinned Version | Stability requirement | version: "1.2.3" |
| Range | Flexible updates | version: "^1.2.0" |
| Canary | Testing new versions | version: "canary" |

| Tenant Override | Description | Priority |
|-----------------|-------------|----------|
| Platform Default | Base resolution | Lowest |
| Tenant Config | Tenant-wide setting | Medium |
| Agent Config | Per-agent setting | High |
| Request Override | Per-request setting | Highest |

**Verify current best practices with web search:**
Search the web: "semantic versioning for AI prompts {date}"
Search the web: "LLM prompt deprecation lifecycle management {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the versioning strategy above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into version migration complexities
- **P (Party Mode)**: Bring DevOps and platform perspectives
- **C (Continue)**: Accept versioning strategy and proceed to testing framework
- **[Specific refinements]**: Describe versioning concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: semantic versioning, deprecation policy, migration paths
- Process enhanced insights on versioning trade-offs
- Ask user: "Accept these refined versioning decisions? (y/n)"
- If yes, integrate into versioning specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review versioning strategy for prompt catalog"
- Process DevOps and platform perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save versioning strategy to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-prompt-testing-framework.md`

---

## Verification

- [ ] Semantic versioning strategy defined
- [ ] Deprecation policy documented with timelines
- [ ] Breaking change management procedures established
- [ ] Backward compatibility guarantees specified
- [ ] Version resolution strategy defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Versioning strategy specification
- Deprecation policy document
- Migration path guidelines
- Version resolution configuration

---

## Next Step

Proceed to `step-05-c-prompt-testing-framework.md` to design prompt testing infrastructure.
