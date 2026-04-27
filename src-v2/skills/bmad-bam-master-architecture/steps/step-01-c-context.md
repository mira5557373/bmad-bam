# Step 01: Gather Project Context

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 NEVER generate content without user input on project requirements
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- ✅ CRITICAL: Capture ALL context dimensions before proceeding
- 📋 Document all gathered context in structured format for later steps
- 💬 Engage user to fill gaps in project context understanding
- 🌐 Use web search to verify current technology best practices

---

## EXECUTION PROTOCOLS

- 🎯 Show gathered context summary before taking any action
- 💾 Store context in memory for propagation to subsequent steps
- 📖 Reference domain files for context structure guidance
- 🚫 DO NOT make architecture decisions in this step - context only
- ⚠️ Flag missing critical context that blocks architecture design
- 🔍 Use web search to verify current best practices when gathering technical constraints

---

## CONTEXT BOUNDARIES

This step operates within these boundaries:

- **Domain files:** `{project-root}/_bmad/bam/data/domains/tenant.md`, `{project-root}/_bmad/bam/data/domains/ai-runtime.md`
- **Pattern registry:** `{project-root}/_bmad/bam/data/patterns/bam-patterns.csv`
- **Existing context:** `{project-root}/**/project-context.md` (if exists)
- **Quality gate:** Context feeds into QG-F1 (Foundation Gate) checklist

---

## YOUR TASK

Gather comprehensive project context across four dimensions: project basics, tenant requirements, AI agent requirements, and technical constraints. This context informs all subsequent architecture decisions in steps 02-05.

---

## Main Sequence

### 1. Load Domain Context

Read and internalize the BAM domain knowledge files:

| File | Purpose |
|------|---------|
| `{project-root}/_bmad/bam/data/domains/tenant.md` | Tenant isolation concepts, decision matrix |
| `{project-root}/_bmad/bam/data/domains/ai-runtime.md` | AI runtime patterns, selection criteria |

**Action:** Confirm domain files loaded before proceeding.

---

### 2. Gather Project Basics

Collect foundational project information from the user:

| Dimension | Question | Example Values |
|-----------|----------|----------------|
| Project Name | What is this project called? | `MyAIPlatform`, `TenantHub` |
| Project Domain | What industry/domain does this serve? | Healthcare, Finance, E-commerce |
| Project Purpose | What problem does this solve? | AI agent marketplace, SaaS analytics |
| Target Users | Who are the primary users? | Enterprise teams, SMBs, Developers |
| MVP Timeline | When is first release targeted? | 3 months, 6 months, 12 months |

**Capture in structured format:**

```yaml
project:
  name: {user_input}
  domain: {user_input}
  purpose: {user_input}
  target_users: {user_input}
  mvp_timeline: {user_input}
```

---

### 3. Gather Tenant Requirements

Collect multi-tenancy requirements using the domain decision matrix:

| Dimension | Question | Impact on Architecture |
|-----------|----------|------------------------|
| Expected Tenant Count | How many tenants at launch? Year 1? Year 3? | Isolation model selection |
| Tenant Tier Mix | What % Free / Pro / Enterprise? | Resource allocation strategy |
| Compliance Requirements | PCI-DSS? HIPAA? SOC2? GDPR? | Isolation level, audit needs |
| Data Sensitivity | What data classifications apply? | Encryption, isolation stringency |
| Tenant Customization | Per-tenant branding? Configs? Schemas? | Schema vs RLS decision |
| Geographic Distribution | Single region? Multi-region? | Data residency, latency |

**Reference decision matrix from tenant.md:**

| Tenants | Compliance | Tier | Recommendation |
|---------|------------|------|----------------|
| <1000 | Low | All | RLS |
| <1000 | High | Pro/Enterprise | Schema |
| Any | PCI/HIPAA | Enterprise | Database |
| >10000 | Low | All | RLS + Sharding |

**Capture in structured format:**

```yaml
tenant:
  count_launch: {user_input}
  count_year1: {user_input}
  count_year3: {user_input}
  tier_mix:
    free_percent: {user_input}
    pro_percent: {user_input}
    enterprise_percent: {user_input}
  compliance: [{user_input}]  # e.g., [PCI-DSS, SOC2]
  data_sensitivity: {user_input}  # public, internal, confidential, restricted
  customization_level: {user_input}  # none, config, branding, schema
  geographic: {user_input}  # single-region, multi-region, global
```

---

### 4. Gather AI Agent Requirements

Collect AI/agent-specific requirements using the ai-runtime domain context:

| Dimension | Question | Impact on Architecture |
|-----------|----------|------------------------|
| Agent Types | What AI capabilities needed? | Runtime selection, tool design |
| Agent Count | How many distinct agents? | Orchestration complexity |
| Agent Orchestration | Single agent? Multi-agent? Teams? | CrewAI vs LangGraph vs AutoGen |
| State Management | Stateless? Checkpointed? Long-running? | Memory tier selection |
| Tool Integrations | What external systems? | MCP server design |
| LLM Strategy | Single provider? Multi-provider? | Abstraction layer needs |

**Reference decision matrix from ai-runtime.md:**

| Requirement | Recommended Runtime | Rationale |
|-------------|---------------------|-----------|
| Complex state machines | LangGraph | Native checkpointing |
| Role-based teams | CrewAI | Built-in delegation |
| Multi-agent debate | AutoGen | Conversation patterns |
| Existing infrastructure | Custom | Leverage investments |

**Capture in structured format:**

```yaml
ai_agents:
  types: [{user_input}]  # e.g., [analyst, coder, reviewer]
  count: {user_input}
  orchestration: {user_input}  # single, sequential, parallel, hierarchical
  state_management: {user_input}  # stateless, session, checkpointed
  tool_integrations: [{user_input}]  # e.g., [GitHub, Slack, Jira]
  llm_providers: [{user_input}]  # e.g., [OpenAI, Anthropic, Local]
  llm_strategy: {user_input}  # single, failover, routing
```

---

### 5. Gather Technical Constraints

Collect technical stack and team constraints:

| Dimension | Question | Options/Examples |
|-----------|----------|------------------|
| Backend Stack | Primary language/framework? | Node.js, Python, Go, Rust |
| Database | Primary data store? | PostgreSQL, MySQL, MongoDB |
| Cloud Provider | Target deployment? | AWS, GCP, Azure, Self-hosted |
| Container Strategy | Kubernetes? Serverless? VMs? | EKS, Cloud Run, Lambda |
| Team Size | How many developers? | 1-3, 4-8, 9-20, 20+ |
| Team Experience | Multi-tenant experience? | None, Some, Expert |
| Existing Systems | What must integrate? | Auth provider, billing, CRM |

**Verify current best practices with web search:**

Search the web: "multi-tenant SaaS architecture best practices {date}"
Search the web: "AI agent infrastructure production patterns {date}"

_Source: [URL]_

**Capture in structured format:**

```yaml
technical:
  backend_stack: {user_input}
  database: {user_input}
  cloud_provider: {user_input}
  container_strategy: {user_input}
  team_size: {user_input}
  team_experience: {user_input}
  existing_systems: [{user_input}]
  budget_constraints: {user_input}  # none, moderate, strict
```

---

### 6. Consolidate and Verify Context

Compile all gathered context and verify completeness:

**Context Summary Template:**

```markdown
## Project Context Summary

### Project: {project.name}
- **Domain:** {project.domain}
- **Purpose:** {project.purpose}
- **Timeline:** {project.mvp_timeline}

### Tenant Profile
- **Scale:** {tenant.count_launch} launch → {tenant.count_year3} Y3
- **Compliance:** {tenant.compliance}
- **Isolation Hint:** {derived from decision matrix}

### AI Agent Profile
- **Types:** {ai_agents.types}
- **Orchestration:** {ai_agents.orchestration}
- **Runtime Hint:** {derived from decision matrix}

### Technical Constraints
- **Stack:** {technical.backend_stack} + {technical.database}
- **Cloud:** {technical.cloud_provider}
- **Team:** {technical.team_size} ({technical.team_experience} MT experience)

### Context Gaps
- [ ] {List any missing critical context}
```

**Present summary to user for confirmation before proceeding.**

---

## SUCCESS METRICS

- ✅ All four context dimensions captured (project, tenant, AI, technical)
- ✅ Domain files loaded and referenced
- ✅ Decision matrix hints derived for tenant model and AI runtime
- ✅ Web search performed for current best practices
- ✅ Context gaps explicitly identified and flagged
- ✅ User confirmed context summary before proceeding
- ✅ Structured context ready for propagation to step-02

---

## FAILURE MODES

- ❌ Proceeding without tenant count estimates - blocks isolation model selection
- ❌ Missing compliance requirements - may select wrong isolation level
- ❌ Unknown AI orchestration needs - may select wrong runtime
- ❌ No team context - cannot assess implementation complexity
- ❌ Skipping web search - may miss current best practices
- ❌ Not confirming with user - may build on incorrect assumptions

---

## NEXT STEP

After user confirms the context summary:

1. Store the consolidated context for use in subsequent steps
2. Proceed to `step-02-c-model.md` to select tenant isolation model
3. The context will inform:
   - Step 02: Tenant model selection
   - Step 03: Module boundary design
   - Step 04: Pattern application
   - Step 05: Document generation

**Note:** Step 01 does not have A/P/C menu - this is a context gathering step only. Proceed directly to step-02 once context is confirmed.

---

## Outputs

- Domain context loaded and internalized
- Initial requirements captured
- Pattern registry referenced

