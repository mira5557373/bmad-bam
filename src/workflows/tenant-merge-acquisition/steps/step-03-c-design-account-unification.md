# Step 3: Design Account Unification

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

Design the account unification procedures for the merged entity, including billing consolidation, permission harmonization, and branding transition.

---

## Prerequisites

- Step 2 completed: Data merging design
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: billing

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Design Billing Consolidation

Define billing unification strategy:

| Scenario | Approach | Timeline | Proration |
|----------|----------|----------|-----------|
| Both on same plan | Combine seats | Immediate | Credit balance |
| Different plans | Align to higher | Next renewal | Upgrade credit |
| Different billing cycles | Align cycles | Next renewal | Pro-rate |
| Enterprise custom | Renegotiate | 30-90 days | Custom terms |
| Multi-currency | Standardize | Next renewal | FX at cutover |

### 2. Design Permission Harmonization

Define permission unification:

| Aspect | Strategy | Conflict Resolution | Audit |
|--------|----------|---------------------|-------|
| Roles | Union of roles | Keep all unique | Log changes |
| Permissions | Union (default) or intersect | Configurable per customer | Full audit |
| Admin access | Merge admin lists | Notify all admins | Admin log |
| API keys | Migrate all active | New key for merged | Key rotation notice |
| SSO config | Target SSO wins | Migrate users to target | Auth audit |

### 3. Design Hierarchy Restructure

Define organizational structure changes:

| Merge Type | Hierarchy Change | Implementation |
|------------|------------------|----------------|
| Full Acquisition | Source becomes division | Create sub-tenant |
| Merger of Equals | New parent, both as divisions | New root tenant |
| Subsidiary | Source under parent | Reparent operation |
| Carve-Out | Clone hierarchy, prune | Split operation |

### 4. Design Communication Plan

Define stakeholder communications:

| Audience | Timing | Message | Channel |
|----------|--------|---------|---------|
| Admins (both) | T-30 days | Merge announcement, timeline | Email + meeting |
| All users | T-14 days | What's changing, action needed | Email + in-app |
| All users | T-7 days | Final preparation, downtime | Email + banner |
| All users | T-0 | Cutover complete, new access | Email + in-app |
| All users | T+7 | Support resources, feedback | Email |

### 5. Design Post-Merge Cleanup

Define cleanup procedures:

| Task | Timing | Scope | Owner |
|------|--------|-------|-------|
| Decommission source tenant | T+30 | Disable access | Ops |
| Archive source data | T+60 | Cold storage backup | Data team |
| Delete source tenant | T+90 | Full removal | Compliance |
| Update integrations | T+7 | Reconnect all | Integrations team |
| Remove duplicate content | T+14 | Dedupe records | Data team |

**Verify current best practices with web search:**
Search the web: "SaaS account consolidation M&A {date}"
Search the web: "multi-tenant billing merge patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the account unification design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific unification aspects
- **P (Party Mode)**: Bring finance and CS perspectives on consolidation
- **C (Continue)**: Accept account unification design and proceed to runbook creation
- **[Specific refinements]**: Describe account unification concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: billing consolidation, permission harmonization, communications
- Process enhanced insights on unification complexity
- Ask user: "Accept these refined unification specs? (y/n)"
- If yes, integrate into unification design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review account unification design for M&A consolidation"
- Process finance and CS perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save account unification design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-create-runbook.md`

---

## Verification

- [ ] Billing consolidation strategy defined
- [ ] Permission harmonization documented
- [ ] Hierarchy restructure planned
- [ ] Communication plan complete
- [ ] Post-merge cleanup defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Billing consolidation strategy
- Permission harmonization rules
- Hierarchy restructure plan
- Communication timeline
- Post-merge cleanup procedures

---

## Next Step

Proceed to `step-04-c-create-runbook.md` to create the operational runbook.
