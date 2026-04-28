# Step 03: Design Resource Initialization

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 🤝 **Collaboration menu required** after completing actions

## EXECUTION PROTOCOLS

- 🎯 Focus: Storage, cache, events, AI context, secrets initialization
- 💾 Track: `stepsCompleted: [1, 2, 3]` when complete
- 📖 Context: Provisioning flow from Step 2, tier quotas
- 🚫 Do NOT: Skip to validation without completing resource initialization
- 🔍 Use web search: Verify current resource provisioning patterns
- ⚠️ Gate: Tenant lifecycle patterns

---

## Purpose

Design the resource initialization process including storage provisioning, cache namespace setup, event subscriptions, AI agent context initialization, and API key/secret management.

---

## Prerequisites

- Step 2 completed: Provisioning flow designed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-isolation,ai-runtime

---

## Inputs

- Output from Step 2: Provisioning flow and saga design
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- AI runtime guide: `{project-root}/_bmad/bam/data/domains/ai-runtime.md`

---

## Actions

### 1. Design Storage Bucket/Path Provisioning

| Tenant Model | Storage Strategy | Path Pattern | Isolation |
|--------------|------------------|--------------|-----------|
| RLS | Shared bucket | `s3://app/{tenant_id}/` | Path-based |
| Schema | Dedicated prefix | `s3://app/tenants/{tenant_id}/` | Prefix ACL |
| Database | Dedicated bucket | `s3://tenant-{tenant_id}/` | Bucket policy |

#### Storage Provisioning Steps

| Step | Action | Duration | Rollback |
|------|--------|----------|----------|
| 1 | Create tenant path/bucket | < 2s | Delete path/bucket |
| 2 | Apply access policies | < 1s | Revert policies |
| 3 | Create default folders | < 1s | N/A |
| 4 | Initialize quota tracking | < 500ms | N/A |

#### Default Folder Structure

| Folder | Purpose | Initial Size |
|--------|---------|--------------|
| `/uploads` | User uploads | Empty |
| `/exports` | Data exports | Empty |
| `/backups` | Automated backups | Empty |
| `/agents` | AI agent artifacts | Empty |
| `/temp` | Temporary files | Empty |

### 2. Design Cache Namespace Setup

| Cache Type | Namespace Pattern | TTL | Per-Tier Limit |
|------------|-------------------|-----|----------------|
| Session | `sess:{tenant_id}:*` | 24h | 1K/10K/100K keys |
| API Rate | `rate:{tenant_id}:*` | 1min | Tier-based |
| Query | `query:{tenant_id}:*` | 5min | 100/500/5K entries |
| Agent State | `agent:{tenant_id}:*` | 1h | 10/50/500 entries |
| Feature Flags | `flags:{tenant_id}:*` | 5min | 100 flags |

#### Cache Initialization Steps

| Step | Action | Duration | Rollback |
|------|--------|----------|----------|
| 1 | Reserve namespace | < 100ms | Release namespace |
| 2 | Set memory quota | < 100ms | N/A |
| 3 | Warm critical paths | < 500ms | N/A |
| 4 | Initialize rate limiters | < 100ms | N/A |

### 3. Design Event Subscription Configuration

| Event Category | Topics | Subscription Type |
|----------------|--------|-------------------|
| Tenant Lifecycle | `tenant.created`, `tenant.activated`, `tenant.suspended` | System |
| User Events | `user.created`, `user.login`, `user.deleted` | Tenant-scoped |
| Agent Events | `agent.run.started`, `agent.run.completed`, `agent.error` | Tenant-scoped |
| Billing Events | `usage.recorded`, `quota.exceeded`, `subscription.changed` | Tenant-scoped |
| Integration Events | `webhook.registered`, `integration.connected` | Tenant-scoped |

#### Event Setup Steps

| Step | Action | Duration | Rollback |
|------|--------|----------|----------|
| 1 | Create tenant event bus | < 500ms | Delete bus |
| 2 | Register default subscribers | < 500ms | Unsubscribe |
| 3 | Configure dead letter queue | < 200ms | N/A |
| 4 | Initialize event replay marker | < 100ms | N/A |

### 4. Design Agent Context Initialization

| Context Component | Data | Per-Tier Default |
|-------------------|------|------------------|
| System Prompt Base | Tenant-specific instructions | Standard/Custom/Branded |
| Memory Store | Vector DB namespace | 10K/100K/1M vectors |
| Tool Registry | Available tools | Basic/Standard/Enterprise |
| Model Access | Allowed LLM models | GPT-3.5/GPT-4/Custom |
| Usage Quotas | Token limits | 10K/100K/Custom tokens/day |

#### Agent Initialization Steps

| Step | Action | Duration | Rollback |
|------|--------|----------|----------|
| 1 | Create vector namespace | < 2s | Delete namespace |
| 2 | Initialize system prompts | < 500ms | N/A |
| 3 | Register default tools | < 500ms | N/A |
| 4 | Configure model access | < 200ms | N/A |
| 5 | Set usage quotas | < 200ms | N/A |

### 5. Design API Key Generation and Secret Management

| Secret Type | Generation | Storage | Rotation |
|-------------|------------|---------|----------|
| API Key (Public) | UUID v4 | Hashed in DB | User-initiated |
| API Secret | Cryptographic random | Vault | 90 days |
| Webhook Secret | HMAC key | Vault | Per webhook |
| Integration Tokens | OAuth2 | Encrypted DB | Provider-dependent |
| Agent Credentials | Service account | Vault | 30 days |

#### Secret Provisioning Steps

| Step | Action | Duration | Rollback |
|------|--------|----------|----------|
| 1 | Generate primary API key | < 100ms | Revoke key |
| 2 | Store in secrets manager | < 500ms | Delete secret |
| 3 | Create webhook signing key | < 100ms | Revoke key |
| 4 | Initialize rotation schedule | < 100ms | N/A |
| 5 | Generate admin recovery codes | < 200ms | N/A |

**Verify current best practices with web search:**
Search the web: "SaaS resource provisioning patterns {date}"
Search the web: "multi-tenant cache namespace isolation {date}"
Search the web: "AI agent context initialization multi-tenant {date}"
Search the web: "API key management best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After designing resource initialization, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific resources (storage, cache, AI, secrets)
- **P (Party Mode)**: Bring DevOps, security, and AI architect perspectives
- **C (Continue)**: Accept resource initialization design and proceed to validation design
- **[Specific refinements]**: Describe additional resource requirements

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: storage design, cache setup, event configuration, AI initialization, secrets
- Process enhanced insights on resource provisioning
- Ask user: "Accept this detailed resource analysis? (y/n)"
- If yes, integrate into resource specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review resource initialization design for tenant onboarding"
- Process DevOps, security architect, and AI architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save resource initialization design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-document.md`

---

## Soft Gate Checkpoint

**Steps 1-3 complete the provisioning and resource design.**

Present summary of:
- Storage provisioning strategy
- Cache namespace configuration
- Event subscription setup
- AI agent context initialization
- API key and secret management

Ask for confirmation before proceeding to onboarding validation design.

---

## Verification

- [ ] Storage provisioning strategy defined
- [ ] Cache namespace isolation configured
- [ ] Event subscriptions specified
- [ ] AI agent context initialization designed
- [ ] API key and secret management documented
- [ ] Rollback procedures for all resources defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Storage provisioning specification
- Cache namespace configuration
- Event subscription matrix
- AI context initialization plan
- Secret management procedures

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

Proceed to `step-04-c-document.md` to design onboarding validation.
