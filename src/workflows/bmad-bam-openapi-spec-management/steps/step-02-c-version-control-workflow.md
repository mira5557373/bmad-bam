# Step 2: Version Control Workflow

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
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics


---

## Purpose

Establish API specification version management and change control processes.

---

## Prerequisites

- Step 1 completed (Spec Structure Standards)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `api-versioning`

---


## Inputs

- Structure standards from Step 1
- API change management requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Establish API specification version management:

## Semantic Versioning Strategy

```yaml
versioning:
  format: "v{major}.{minor}.{patch}"
  
  major:
    trigger: Breaking changes
    examples:
      - Removing endpoints
      - Changing response structure
      - Removing required fields
      
  minor:
    trigger: Backward-compatible additions
    examples:
      - New endpoints
      - New optional fields
      - New query parameters
      
  patch:
    trigger: Backward-compatible fixes
    examples:
      - Documentation updates
      - Example corrections
      - Description improvements
```

## Breaking vs Non-Breaking Changes

| Change Type | Breaking | Non-Breaking |
|-------------|----------|--------------|
| Remove endpoint | Yes | - |
| Add endpoint | - | Yes |
| Remove field | Yes | - |
| Add optional field | - | Yes |
| Add required field | Yes | - |
| Change field type | Yes | - |
| Change enum values (remove) | Yes | - |
| Change enum values (add) | - | Yes |
| Change URL path | Yes | - |
| Change auth scheme | Yes | - |

## Branch Strategy

```yaml
branch_strategy:
  main:
    purpose: Production-ready specs
    protection: Required reviews, CI pass
    
  develop:
    purpose: Integration branch
    merges_to: main
    
  feature/*:
    purpose: New endpoint/feature specs
    naming: feature/add-{resource}-endpoints
    merges_to: develop
    
  breaking/*:
    purpose: Breaking changes
    naming: breaking/v{next-major}-{description}
    merges_to: develop (after version bump)
```

## Review and Approval Process

```yaml
review_process:
  new_endpoints:
    reviewers: [api-team, security-team]
    checks:
      - Naming conventions
      - Tenant isolation
      - Security schemes
      
  breaking_changes:
    reviewers: [api-team, tech-lead, product]
    checks:
      - Migration path documented
      - Deprecation notice added
      - Consumer impact assessed
      
  documentation_only:
    reviewers: [api-team]
    checks:
      - Accuracy verification
```

## Change Tracking

```yaml
changelog:
  format: keep-a-changelog
  file: CHANGELOG.md
  
  categories:
    - Added      # New endpoints, fields
    - Changed    # Modifications
    - Deprecated # Upcoming removals
    - Removed    # Breaking removals
    - Fixed      # Bug fixes
    - Security   # Security updates
    
  automation:
    tool: semantic-release
    commit_convention: conventional-commits
```

## Deprecation Policy

```yaml
deprecation:
  notice_period: 90 days
  
  process:
    1. Add deprecated flag to endpoint
    2. Add sunset header to responses
    3. Update documentation with alternatives
    4. Notify API consumers
    5. Remove after sunset date
    
  headers:
    Deprecation: "true"
    Sunset: "Sat, 31 Dec 2025 23:59:59 GMT"
    Link: "</docs/migration>; rel=\"successor-version\""
```

**Verify current best practices with web search:**
Search the web: "API versioning best practices {date}"
Search the web: "OpenAPI specification version control {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the version control workflow above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into versioning requirements using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for version strategy
- **C (Continue)**: Accept version control workflow and proceed to validation rules
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass versioning context: strategy, change classification, deprecation policy
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into version control summary
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review API version control workflow: {summary of versioning strategy}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save version control workflow to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-validation-rules.md`

---

## Verification

- [ ] Semantic versioning strategy defined
- [ ] Breaking changes classified
- [ ] Branch strategy established
- [ ] Review process documented
- [ ] Changelog format specified
- [ ] Deprecation policy created
- [ ] Patterns align with pattern registry

---

## Outputs

- Versioning strategy document
- Change classification matrix
- Branch and review workflows
- Deprecation policy

---

## Next Step

Proceed to `step-03-c-validation-rules.md` to create validation rules.
