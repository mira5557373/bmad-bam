# Step 1: Assess Migration Scope

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

Assess the source and target environments, data volume, dependencies, and constraints for tenant data migration.

---

## Prerequisites

- Tenant model defined
- Source and target environments identified
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-lifecycle`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-isolation`

---


## Inputs

- User requirements and constraints for tenant data migration
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Identify Migration Type

Determine the type of migration being performed:

| Migration Type | Description | Complexity |
|----------------|-------------|------------|
| Environment Migration | Dev to Staging, Staging to Production | Medium |
| Tier Upgrade | FREE to PRO, PRO to ENTERPRISE | Medium |
| Tier Downgrade | ENTERPRISE to PRO, PRO to FREE | High (data reduction) |
| Cross-Region Migration | Move tenant to different geographic region | High |
| Isolation Model Change | RLS to Schema, Schema to Database | Very High |

### 2. Assess Source Environment

Document the source environment characteristics:

| Aspect | Details |
|--------|---------|
| Tenant ID | Unique identifier of tenant |
| Current Tier | FREE / PRO / ENTERPRISE |
| Data Volume | Database size, storage usage, vector store size |
| Active Users | Number of active users in tenant |
| Active Agents | Number of AI agents configured |
| Integration Count | External integrations configured |
| Isolation Model | RLS / Schema / Database |

### 3. Assess Target Environment

Document the target environment requirements:

| Aspect | Details |
|--------|---------|
| Target Tier | FREE / PRO / ENTERPRISE |
| Target Region | Geographic location |
| Target Isolation | RLS / Schema / Database |
| Capacity Limits | Storage, users, agents quotas |
| Required Downtime Window | Acceptable migration window |

### 4. Identify Data Dependencies

Map all data that must be migrated:

| Data Category | Source Location | Target Location | Dependencies |
|---------------|-----------------|-----------------|--------------|
| Tenant Configuration | Primary DB | Primary DB | None |
| User Accounts | Keycloak | Keycloak | Tenant config |
| Agent Configurations | Primary DB | Primary DB | Tenant config |
| Conversation History | Primary DB | Primary DB | Users, Agents |
| Vector Embeddings | Vector Store | Vector Store | Conversations |
| File Attachments | S3 Bucket | S3 Bucket | Conversations |
| Usage Metrics | TimescaleDB | TimescaleDB | Tenant config |
| Billing Records | Orb | Orb | Tenant config |

### 5. Identify Migration Constraints

| Constraint Type | Description | Impact |
|-----------------|-------------|--------|
| Downtime Tolerance | Maximum acceptable downtime | Strategy selection |
| Data Consistency | Required consistency level | Dual-write feasibility |
| Compliance | Data residency requirements | Region selection |
| Dependencies | External system dependencies | Sequencing |

**Verify current best practices with web search:**
Search the web: "assess migration scope best practices {date}"
Search the web: "assess migration scope enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the scope assessment above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into migration constraints and dependencies
- **P (Party Mode)**: Bring analyst and architect perspectives for scope analysis
- **C (Continue)**: Accept scope assessment and proceed to migration strategy design
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass migration context: source/target environments, constraints identified
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into scope assessment
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review migration scope assessment: {summary of environments and constraints}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save scope assessment to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-design-migration-strategy.md`

---

## Verification

- [ ] Migration type identified
- [ ] Source environment fully documented
- [ ] Target environment requirements defined
- [ ] All data dependencies mapped
- [ ] Constraints identified and documented
- [ ] Data volume estimates calculated
- [ ] Patterns align with pattern registry

---

## Outputs

- Migration scope assessment document
- Data dependency matrix
- Constraint analysis
- **Load template:** `{project-root}/_bmad/bam/templates/tenant-data-migration-template.md`

---

## Next Step

Proceed to `step-02-c-design-migration-strategy.md` to select the migration strategy based on scope assessment.
