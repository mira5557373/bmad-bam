# Step 1: Define Provisioning Stages

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

Define the ordered stages of tenant provisioning with rollback strategies.

---

## Prerequisites

- Tenant model defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: event-driven`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: compliance`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: compliance`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: encryption-key-management`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: event-driven`

---


## Inputs

- User requirements and constraints for tenant onboarding design
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

Define the ordered stages of tenant provisioning:

| Stage | Name | Description | Rollback Strategy |
|-------|------|-------------|-------------------|
| 1 | Request Validation | Validate tenant registration request (name, slug uniqueness, tier selection) | N/A (pre-creation) |
| 2 | Tenant Record Creation | Create tenant entity in primary database with PROVISIONING status | Delete tenant record |
| 3 | Database Schema Setup | Create tenant-specific schema or apply RLS policies | Drop schema / remove policies |
| 4 | Cache Namespace Setup | Initialize tenant-prefixed cache namespace in Redis | Delete namespace keys |
| 5 | Storage Provisioning | Create tenant-prefixed storage paths (S3 bucket/prefix) | Delete storage prefix |
| 6 | Search Index Setup | Create tenant-filtered search indices | Delete indices |
| 7 | Vector Store Setup | Initialize tenant namespace in vector database | Delete namespace |
| 8 | Admin User Creation | Create initial admin user for tenant | Delete user record |
| 9 | Activation | Transition tenant status to ACTIVE | Revert to PROVISIONING |

For each stage, define:
- Pre-conditions that must be met
- Idempotency guarantees (stage can be re-run safely)
- Timeout and retry configuration
- Failure notification mechanism

**Stage Ordering Rule:** Each stage must complete successfully before the next begins. Use a state machine to track progress and support resumption after failures.

**Verify current best practices with web search:**
Search the web: "tenant provisioning tenant lifecycle {date}"
Search the web: "tenant onboarding multi-tenant SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the provisioning stages above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into stage dependencies and rollback edge cases
- **P (Party Mode)**: Bring analyst and architect perspectives for stage review
- **C (Continue)**: Accept provisioning stages and proceed to data initialization design
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass stage context: stages, dependencies, rollback strategies
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into provisioning stages
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review provisioning stages: {summary of stages and rollback}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save provisioning stages to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-design-data-initialization.md`

---

## Verification

- [ ] All provisioning stages defined
- [ ] Rollback strategies specified
- [ ] Pre-conditions documented
- [ ] Idempotency guaranteed
- [ ] Timeout/retry configured
- [ ] Patterns align with pattern registry

---

## Outputs

- Provisioning stage definitions
- Rollback strategy matrix
- **Load template:** `{project-root}/_bmad/bam/templates/tenant-requirements-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/tenant-persona-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/tenant-persona-analysis-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/tenant-story-template.md`

---

## Next Step

Proceed to `step-02-c-design-data-initialization.md` to define initial data seeding.
