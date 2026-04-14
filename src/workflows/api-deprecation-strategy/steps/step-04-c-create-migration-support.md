# Step 4: Create Migration Support

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

Document migration paths, generate code examples, plan support resources, and design rollback procedures.

## Prerequisites

- Steps 1-3 completed: Candidates, timeline, signals configured
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: migration-patterns
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: documentation

---

## Inputs

- Output from Steps 1-3
- SDK documentation
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`

---

## Actions

**Verify current best practices with web search:**
Search the web: "API migration guide best practices {date}"
Search the web: "developer experience deprecation communication {date}"

_Source: [URL]_

### 1. Document Migration Paths

| Old Endpoint | New Endpoint | Changes | Migration Steps |
|--------------|--------------|---------|-----------------|
| GET /v1/users | GET /v2/users | Response schema | Update client, handle new fields |
| POST /v1/users | POST /v2/users | Request schema | Update payload structure |

### 2. Generate Code Examples

| Language | Before Example | After Example | Notes |
|----------|----------------|---------------|-------|
| TypeScript | | | Include error handling |
| Python | | | Async support |
| Go | | | Context handling |
| curl | | | Direct API calls |

### 3. Plan Support Resources

| Resource | Description | Availability |
|----------|-------------|--------------|
| Migration Guide | Step-by-step documentation | Public |
| FAQ | Common migration questions | Public |
| Office Hours | Live Q&A sessions | Weekly during deprecation |
| Support Ticket | Direct assistance | Tier-based |
| Codemods/Scripts | Automated migration tools | GitHub |

### 4. Design Rollback Procedures

| Scenario | Trigger | Rollback Action |
|----------|---------|-----------------|
| Breaking bug in new API | Critical defect | Re-enable deprecated endpoint |
| Mass migration failure | >10% errors | Extend sunset date |
| Enterprise blocker | Enterprise escalation | Custom timeline |

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

After completing the migration support above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into migration guides and support planning
- **P (Party Mode)**: Bring tech writer and PM perspectives for documentation review
- **C (Continue)**: Complete Create mode - workflow finished
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass migration context: paths, examples, resources, rollback
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, finalize migration support
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review migration support materials: {summary of guides and resources}"
- Process collaborative analysis from tech writer and PM personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save migration support documentation
- Create mode complete

---

## Verification

- [ ] Migration paths documented for all deprecated endpoints
- [ ] Code examples generated for key languages
- [ ] Support resources planned
- [ ] Rollback procedures designed
- [ ] Patterns align with pattern registry

## Outputs

- Migration guide documentation
- Code examples per language
- Support resource plan
- Rollback procedure runbook

## Next Step

Workflow complete. Present API Deprecation Strategy with migration support to user for review and approval.
