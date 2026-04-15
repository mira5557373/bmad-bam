# Step 3: Plan Migration

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

Create a migration strategy for API consumers.

## Prerequisites

- Compatibility assessed (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-isolation,tenant-lifecycle
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: event-driven
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: experimentation


---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

**Verify current best practices with web search:**
Search the web: "API migration API integration patterns {date}"
Search the web: "API migration strategy contract design {date}"

_Source: [URL]_

## Migration Timeline

Define phases:
1. **Announcement**: Notify consumers of upcoming changes
2. **Preview Period**: New version available alongside old
3. **Migration Window**: Active migration support
4. **Deprecation**: Old version marked deprecated
5. **Sunset**: Old version removed

For each phase, specify:
- Duration
- Communication channels
- Support resources
- Success criteria

## Migration Guides

For each breaking change, create:
- Before/after code examples
- Step-by-step migration instructions
- Testing recommendations
- Rollback procedures

## Consumer Communication

**Notification Plan:**
- Email announcement to registered developers
- In-app notification for dashboard users
- Documentation banner
- Status page update

**Support Resources:**
- Migration office hours
- Dedicated support channel
- FAQ document
- Troubleshooting guide

## Tenant Tier Considerations

- Enterprise tenants: Direct account manager outreach
- Professional tenants: Email + in-app notification
- Free tier: Documentation + community support

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

After completing the migration plan above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into migration timeline and communication strategy
- **P (Party Mode)**: Bring analyst and PM perspectives for migration review
- **C (Continue)**: Accept migration plan and proceed to changelog generation
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass migration context: timeline, communication plan, support resources
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into migration plan
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review migration plan for API version release: {summary of timeline and guides}"
- Process collaborative analysis from analyst and PM personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save migration plan to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-generate-changelog.md`

---

## Verification

- [ ] Migration timeline defined
- [ ] Migration guides created
- [ ] Communication plan documented
- [ ] Tenant tier considerations addressed
- [ ] Support resources identified
- [ ] Patterns align with pattern registry

## Outputs

- Migration plan document
- Migration guides
- Communication strategy
- **Load template:** `{project-root}/_bmad/bam/data/templates/api-specification-template.md`

## Next Step

Proceed to `step-04-c-generate-changelog.md` to create release documentation.
