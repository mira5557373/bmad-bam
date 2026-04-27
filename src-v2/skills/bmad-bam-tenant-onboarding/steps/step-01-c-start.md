# Step 01: Initialize Tenant Onboarding Design

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 📋 **Initialize frontmatter tracking** at start of Create mode

## EXECUTION PROTOCOLS

- 🎯 Focus: Load configuration and establish onboarding context
- 💾 Track: `stepsCompleted: [1]` when complete
- 📖 Context: Tenant model, tier structure, provisioning requirements
- 🚫 Do NOT: Skip to provisioning design without loading patterns
- 🔍 Use web search: After loading patterns to verify current best practices
- ⚠️ Gate: Tenant lifecycle patterns

---

## Purpose

Initialize the tenant onboarding design workflow by loading tenant model configuration, referencing the pattern registry, and identifying provisioning requirements per tier.

---

## Prerequisites

- Master Architecture document exists with tenant model decision
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-lifecycle
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`
- **Load guide:** `{project-root}/_bmad/bam/data/agent-guides/bam/tenant-onboarding-patterns.md`

---

## Inputs

- User configuration: `{project-root}/_bmad/bam/config.yaml` for `tenant_model` value
- Master architecture: `{output_folder}/planning-artifacts/master-architecture.md`
- Existing tier definitions from product documentation

---

## Actions

### 1. Load Tenant Model Configuration

Read the configured tenant model and present:

| Configuration | Value | Source |
|---------------|-------|--------|
| Tenant Model | `{tenant_model}` | config.yaml |
| Isolation Level | RLS/Schema/Database | Derived from model |
| Design-First | `{design_first}` | config.yaml |

### 2. Reference Pattern Registry

Load onboarding patterns from pattern registry:

| Pattern ID | Pattern Name | Decision Criteria |
|------------|--------------|-------------------|
| onboard-saga | Onboarding Saga | Multi-step provisioning with rollback |
| onboard-eager | Eager Provisioning | High-touch, enterprise |
| onboard-lazy | Lazy Provisioning | Self-service, scale |
| onboard-hybrid | Hybrid Provisioning | Common case eager, edge lazy |

### 3. Identify Per-Tier Provisioning Requirements

Define provisioning approach per tier:

| Tier | Onboarding Method | Provisioning Strategy | Isolation Level |
|------|-------------------|----------------------|-----------------|
| Free | Self-service | Lazy | Shared (RLS) |
| Pro | Self-service | Eager | Shared or Dedicated |
| Enterprise | Sales-assisted | Custom | Dedicated |

### 4. Establish Onboarding Scope

Confirm scope with user:

| Scope Area | In Scope | Notes |
|------------|----------|-------|
| Self-service signup | YES/NO | Instant provisioning |
| Assisted onboarding | YES/NO | Sales-guided flow |
| Enterprise custom | YES/NO | Contract-based |
| Trial experience | YES/NO | Time-limited access |
| Resource quotas | YES/NO | Tier-based limits |
| AI agent initialization | YES/NO | Per-tenant AI context |

**Verify current best practices with web search:**
Search the web: "SaaS tenant onboarding patterns {date}"
Search the web: "multi-tenant provisioning best practices {date}"

_Source: [URL]_

---

## Soft Gate Checkpoint

**Step 1 establishes the onboarding design foundation.**

Present summary of:
- Tenant model configuration loaded
- Pattern registry referenced
- Per-tier requirements identified
- Onboarding scope confirmed

Ask for confirmation before proceeding to provisioning flow design.

---

## Verification

- [ ] Tenant model configuration loaded from config.yaml
- [ ] Pattern registry onboarding patterns loaded
- [ ] Per-tier provisioning requirements identified
- [ ] Onboarding scope confirmed with user
- [ ] Patterns align with pattern registry

---

## Outputs

- Tenant model context summary
- Per-tier provisioning requirements matrix
- Onboarding scope definition
- Design decisions documented in frontmatter
- **Load template:** `{project-root}/_bmad/bam/data/templates/tenant-onboarding.md`

---

## Next Step

Proceed to `step-02-c-analyze.md` to design the tenant provisioning flow.
