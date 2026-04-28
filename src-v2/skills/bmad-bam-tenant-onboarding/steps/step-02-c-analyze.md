# Step 02: Design Tenant Provisioning Flow

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 🤝 **Collaboration menu required** after completing actions

## EXECUTION PROTOCOLS

- 🎯 Focus: Design registration, metadata, database provisioning, quota configuration
- 💾 Track: `stepsCompleted: [1, 2]` when complete
- 📖 Context: Onboarding scope from Step 1, tier requirements
- 🚫 Do NOT: Jump to resource initialization without completing provisioning flow
- 🔍 Use web search: Verify current provisioning patterns
- ⚠️ Gate: Tenant lifecycle patterns

---

## Purpose

Design the tenant provisioning flow including registration workflow, tenant metadata creation, database provisioning per isolation model, and initial quota configuration.

---

## Prerequisites

- Step 1 completed: Tenant model and scope established
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-lifecycle,saga-orchestration

---

## Inputs

- Output from Step 1: Tenant model context and scope
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Onboarding guide: `{project-root}/_bmad/bam/data/domains/onboarding.md`

---

## Actions

### 1. Design Registration and Signup Workflow

Define the user-facing signup flow:

| Step | Action | Validation | Duration |
|------|--------|------------|----------|
| 1 | Collect email/domain | Email verification | User-paced |
| 2 | Verify ownership | DNS or email token | 1-24 hours |
| 3 | Collect organization info | Required fields | User-paced |
| 4 | Select tier | Tier availability | Instant |
| 5 | Accept terms | Legal acceptance | Instant |
| 6 | Create admin account | Password requirements | User-paced |
| 7 | Trigger provisioning | Start saga | < 1s |

### 2. Design Tenant Metadata Creation

Define the tenant record structure:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| tenant_id | UUID | Yes | Unique identifier |
| name | String | Yes | Organization name |
| domain | String | No | Custom domain |
| tier | Enum | Yes | Free/Pro/Enterprise |
| status | Enum | Yes | pending/active/suspended |
| created_at | Timestamp | Yes | Creation timestamp |
| onboarding_state | JSON | Yes | Saga progress tracking |
| settings | JSONB | No | Tenant configuration |
| owner_user_id | UUID | Yes | Admin user reference |

### 3. Design Database Provisioning by Isolation Model

#### Row-Level Security (RLS)

| Step | Action | Duration | Rollback |
|------|--------|----------|----------|
| 1 | Insert tenant record | < 100ms | Delete record |
| 2 | Verify RLS policies active | < 100ms | N/A (policies exist) |
| 3 | Validate isolation | < 500ms | Log warning |

#### Schema-per-Tenant

| Step | Action | Duration | Rollback |
|------|--------|----------|----------|
| 1 | Create tenant schema | < 2s | Drop schema |
| 2 | Run migrations | < 30s | Drop schema |
| 3 | Set search_path | < 100ms | N/A |
| 4 | Insert tenant record | < 100ms | Delete record |

#### Database-per-Tenant

| Step | Action | Duration | Rollback |
|------|--------|----------|----------|
| 1 | Provision database instance | 2-5 min | Terminate instance |
| 2 | Run migrations | < 60s | Terminate instance |
| 3 | Configure connection string | < 1s | N/A |
| 4 | Insert tenant record in control plane | < 100ms | Delete record |

### 4. Design Initial Quota and Limit Configuration

| Quota | Free | Pro | Enterprise |
|-------|------|-----|------------|
| Users | 5 | 25 | Unlimited |
| Storage (GB) | 1 | 10 | Custom |
| API calls/day | 1,000 | 50,000 | Custom |
| AI agents | 1 | 5 | Custom |
| Integrations | 2 | 10 | Unlimited |
| Retention (days) | 30 | 90 | Custom |

### 5. Design Onboarding Saga

| Saga Step | Action | Critical | Timeout | Retry |
|-----------|--------|----------|---------|-------|
| 1 | Create tenant record | Yes | 5s | 3x |
| 2 | Provision database | Yes | 60s | 2x |
| 3 | Initialize quotas | Yes | 5s | 3x |
| 4 | Create admin user | Yes | 5s | 3x |
| 5 | Configure billing | No | 10s | 3x |
| 6 | Send welcome email | No | 10s | 5x |
| 7 | Initialize AI context | No | 30s | 2x |

**Verify current best practices with web search:**
Search the web: "tenant provisioning saga pattern {date}"
Search the web: "multi-tenant database isolation provisioning {date}"
Search the web: "SaaS signup flow best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After designing the provisioning flow, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific provisioning steps or saga design
- **P (Party Mode)**: Bring platform architect and DevOps perspectives on provisioning
- **C (Continue)**: Accept provisioning flow design and proceed to resource initialization
- **[Specific refinements]**: Describe additional provisioning requirements

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: registration workflow, database provisioning, saga design
- Process enhanced insights on provisioning strategy
- Ask user: "Accept this detailed provisioning analysis? (y/n)"
- If yes, integrate into provisioning specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tenant provisioning flow design for onboarding workflow"
- Process platform architect and DevOps perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save provisioning flow design to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-design.md`

---

## Soft Gate Checkpoint

**Steps 1-2 complete the provisioning flow foundation.**

Present summary of:
- Registration and signup workflow
- Tenant metadata structure
- Database provisioning by isolation model
- Initial quota configuration
- Onboarding saga design

Ask for confirmation before proceeding to resource initialization design.

---

## Verification

- [ ] Registration workflow defined
- [ ] Tenant metadata structure specified
- [ ] Database provisioning matches tenant model
- [ ] Quota configuration per tier established
- [ ] Onboarding saga with rollback designed
- [ ] Patterns align with pattern registry

---

## Outputs

- Registration workflow specification
- Tenant metadata schema
- Database provisioning workflow by model
- Quota configuration matrix
- Onboarding saga definition

---


---

## SUCCESS METRICS:

- [ ] All required inputs gathered from user
- [ ] Design decisions documented with rationale
- [ ] User confirmed choices via A/P/C menu
- [ ] Output artifact updated with step content
- [ ] Frontmatter stepsCompleted updated

## FAILURE MODES:

- **Missing input:** Cannot proceed without required context - return to prerequisites
- **Unclear requirements:** Use Advanced Elicitation (A) to clarify
- **Conflicting constraints:** Use Party Mode (P) for multi-perspective analysis
- **User rejects output:** Iterate on design, do not force acceptance

## Next Step

Proceed to `step-03-c-design.md` to design resource initialization.
