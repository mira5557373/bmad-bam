# Step 3: Configure Log Context

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

Define tenant-aware logging configuration to ensure all logs contain proper tenant attribution.

---

## Prerequisites

- Tenant dimensions defined (Step 1)
- Metric aggregation designed (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: observability,tenant-isolation

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Define Structured Log Format

Reference log format patterns from knowledge:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| timestamp | ISO8601 | Yes | Event time |
| level | enum | Yes | info/warn/error/debug |
| message | string | Yes | Log message |
| tenant.id | string | Yes | Tenant identifier |
| tenant.slug | string | Yes | Human-readable tenant ID |
| tenant.tier | enum | Yes | FREE/PRO/ENTERPRISE |
| request.id | string | Yes | Correlation ID |
| request.user_id | string | If auth | User identifier |
| context.module | string | Yes | Source module |

### 2. Design Context Injection

Using middleware patterns from `multi-tenant-patterns.md`:
- Auto-inject tenant context from TenantContext
- Extract user/session from request headers
- Generate or propagate request_id

### 3. Configure Log Levels by Context

| Context | Debug | Info | Warn | Error |
|---------|-------|------|------|-------|
| Development | All | All | All | All |
| Production (Platform) | Off | All | All | All |
| Production (Tenant) | Off | Sampled | All | All |

### 4. Design Tenant Log Isolation

Reference isolation patterns from knowledge:
- All logs tagged with tenant_id
- Tenant-specific log streams (if using Loki)
- Access control: tenant users only see their logs
- Platform operators have full access

### 5. Define Sensitive Data Handling

| Field Type | Handling |
|------------|----------|
| PII (email, phone) | Redact or hash |
| Secrets (keys, tokens) | Never log |
| Tenant data | Log with tenant_id |
| User input | Truncate + sanitize |

### 6. Configure Log Retention by Tier

| Tier | Retention | Query Access |
|------|-----------|--------------|
| FREE | 7 days | Last 24 hours |
| PRO | 30 days | Full retention |
| ENTERPRISE | 90 days+ | Full retention |

### 7. Define Audit Log Requirements

Audit logs (separate from operational logs):
- Events: login, logout, permission changes, data export/delete
- Retention: 7 years (regulatory requirement)
- Immutability: Cannot be modified or deleted

**Verify current best practices with web search:**
Search the web: "tenant logging context tenant lifecycle {date}"
Search the web: "structured logging multi-tenant SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After configuring log context, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into log format, sensitive data handling, or audit requirements
- **P (Party Mode)**: Bring security architect and compliance perspectives on logging
- **C (Continue)**: Accept log context configuration and proceed to trace propagation
- **[Specific refinements]**: Describe specific logging aspects to refine

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: log format, isolation rules, sensitive data handling, audit requirements
- Process enhanced insights on logging configuration
- Ask user: "Accept this detailed log configuration analysis? (y/n)"
- If yes, integrate into logging specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review log context configuration for tenant-aware observability"
- Process security architect and compliance perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save log configuration to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-setup-trace-propagation.md`

---

## Verification

- [ ] Log format follows knowledge patterns
- [ ] Context injection designed using middleware pattern
- [ ] Log levels configured per environment
- [ ] Tenant isolation rules specified
- [ ] Sensitive data handling documented
- [ ] Retention policies per tier defined
- [ ] Audit log requirements specified
- [ ] Patterns align with pattern registry

---

## Outputs

- Log format specification
- Context injection design
- Retention policy configuration
- Sensitive data handling rules
- **Load template:** `{project-root}/_bmad/bam/data/templates/logging-spec.md`

---

## Next Step

Proceed to `step-04-c-setup-trace-propagation.md` to configure distributed tracing.
