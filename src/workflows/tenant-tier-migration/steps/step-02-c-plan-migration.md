# Step 2: Plan Migration

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

Define migration paths between tiers, including upgrade and downgrade scenarios, with specific transition strategies.

---

## Prerequisites

- Step 1 completed: Tier assessment with feature matrix
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-lifecycle

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Define Migration Paths

Document all valid migration paths:

| From Tier | To Tier | Direction | Complexity |
|-----------|---------|-----------|------------|
| FREE | PRO | Upgrade | Low |
| FREE | ENTERPRISE | Upgrade | Medium |
| PRO | ENTERPRISE | Upgrade | Low |
| PRO | FREE | Downgrade | High |
| ENTERPRISE | PRO | Downgrade | Medium |
| ENTERPRISE | FREE | Downgrade | High |

### 2. Design Upgrade Strategy

For each upgrade path, define:

| Upgrade Path | Feature Enablement | Resource Allocation | Data Migration |
|--------------|-------------------|---------------------|----------------|
| FREE → PRO | {how features activate} | {how resources scale} | {data changes} |
| FREE → ENTERPRISE | {how features activate} | {how resources scale} | {data changes} |
| PRO → ENTERPRISE | {how features activate} | {how resources scale} | {data changes} |

### 3. Design Downgrade Strategy

For each downgrade path, define data handling:

| Downgrade Path | Feature Disablement | Data Retention | Notification |
|----------------|---------------------|----------------|--------------|
| PRO → FREE | {graceful disable} | {what to keep/archive} | {user comms} |
| ENTERPRISE → PRO | {graceful disable} | {what to keep/archive} | {user comms} |
| ENTERPRISE → FREE | {graceful disable} | {what to keep/archive} | {user comms} |

### 4. Define Transition States

Plan intermediate states during migration:

| Phase | State | Duration | Rollback Possible |
|-------|-------|----------|-------------------|
| Pre-migration | Validation | Minutes | Yes |
| Migration | In-Progress | {estimate} | Conditional |
| Post-migration | Verification | Minutes | Yes |
| Complete | New Tier Active | - | No |

### 5. Plan Billing Transition

Document billing considerations:

| Scenario | Proration | Effective Date | Refund Policy |
|----------|-----------|----------------|---------------|
| Upgrade mid-cycle | {approach} | {timing} | N/A |
| Downgrade mid-cycle | {approach} | {timing} | {policy} |

**Verify current best practices with web search:**
Search the web: "plan migration best practices {date}"
Search the web: "plan migration enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the migration plan above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific migration path complexity
- **P (Party Mode)**: Bring operations and billing perspectives on migration design
- **C (Continue)**: Accept migration plan and proceed to feature transition design
- **[Specific refinements]**: Describe migration concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: migration paths, upgrade/downgrade strategies, billing transitions
- Process enhanced insights on migration complexity
- Ask user: "Accept these refined migration paths? (y/n)"
- If yes, integrate into migration plan
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tier migration paths for multi-tenant platform"
- Process operations and billing perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save migration plan to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-design-feature-transition.md`

---

## Soft Gate Checkpoint

**Steps 1-2 complete the migration planning phase.**

Present summary of:
- Tier assessment with feature matrix
- Migration paths with upgrade and downgrade strategies
- Billing transition and proration rules

Ask for confirmation before proceeding to feature transition design.

---

## Verification

- [ ] All migration paths documented
- [ ] Upgrade strategies defined
- [ ] Downgrade strategies with data handling defined
- [ ] Transition states planned
- [ ] Billing transition documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Migration paths matrix
- Upgrade strategy documentation
- Downgrade strategy with data retention rules
- Billing transition plan

---

## Next Step

Proceed to `step-03-c-design-feature-transition.md` to design feature transitions.
