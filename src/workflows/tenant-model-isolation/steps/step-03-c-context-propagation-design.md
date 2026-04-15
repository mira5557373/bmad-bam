# Step 3: Context Propagation Design

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

Design comprehensive tenant context propagation ensuring that tenant identity flows through ALL code paths—HTTP requests, background jobs, events, WebSockets, scheduled tasks, and AI agent runs.

---

## Prerequisites

- Isolation matrix complete (Step 2)
- Module boundaries defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-context-propagation`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Load Context Propagation Patterns

Read the TenantContext interface and propagation patterns from knowledge fragments:
- TenantContext interface definition
- Required fields: tenant_id, user_id, workspace_id, tier, permissions
- Optional fields: api_key_id, request_id, timestamp

### 2. Design Propagation for Each Code Path

For each code path type, apply the patterns from knowledge:

| Code Path | Pattern Reference | Key Mechanism |
|-----------|------------------|---------------|
| HTTP Requests | `multi-tenant-patterns.md` → Middleware Section | JWT extraction + SET LOCAL |
| Background Jobs | `multi-tenant-patterns.md` → Job Processing | Context in payload metadata |
| Event Handlers | `multi-tenant-patterns.md` → Event Publishing | Context in event headers |
| WebSocket | `multi-tenant-patterns.md` → Real-time Section | Connection state storage |
| AI Agent Runs | `agent-runtime-patterns.md` → State Management | AgentState with context |

### 3. Document Context Flow Diagram

Create a visual representation showing:
- Entry points where context is established
- How context passes through layers
- Where context is used for enforcement (RLS, cache keys, etc.)

### 4. Design No-Context Guard

Implement defensive pattern to prevent execution without context:
- Reference guard pattern from `multi-tenant-patterns.md`
- Define which operations require mandatory context
- Specify behavior when context is missing (fail fast)

### 5. Create Verification Tests

For each code path, define test cases:
- Valid context propagation test
- Missing context rejection test
- Context tampering prevention test

---

## Verification Matrix

| Code Path | Context Source | DB Session Set | Tested |
|-----------|----------------|----------------|--------|
| HTTP Request | JWT Middleware | SET LOCAL | [ ] |
| Background Job | Job Payload | SET LOCAL | [ ] |
| Event Handler | Event Headers | SET LOCAL | [ ] |
| WebSocket | Connection State | Per message | [ ] |
| AI Agent Run | State Object | Tool wrapper | [ ] |

---

## Soft Gate Checkpoint

**Steps 1-3 complete the isolation model design.** 

Present summary of:
1. Tenant model (hierarchy, billing entity)
2. Isolation matrix (all asset types)
3. Context propagation (all code paths)

Ask for confirmation before proceeding to sharing rules and compliance.

---

## Error Handling

### Context Propagation Failures

#### Missing Tenant Context at Runtime
If code executes without tenant context:
1. **HALT EXECUTION** - Never allow operations without tenant context
2. Check middleware order - tenant extraction must run early
3. Verify JWT contains required claims (tenant_id, user_id)
4. Review code path for context loss (async boundaries, event handlers)
5. Add explicit context guards at all entry points

#### Common Context Errors and Fixes
| Error | Cause | Fix |
|-------|-------|-----|
| "tenant context required" | Guard triggered correctly | Trace back to find where context was lost |
| "invalid tenant_id" | Malformed or expired JWT | Validate JWT structure and expiry |
| "context not propagated" | Async boundary dropped context | Use AsyncLocalStorage or explicit propagation |
| "SET LOCAL failed" | DB transaction not started | Wrap in transaction before SET LOCAL |
| "permission denied for tenant" | Tier mismatch or suspended tenant | Check tenant status and tier permissions |

#### Code Path-Specific Recovery

| Code Path | Failure Symptom | Recovery Action |
|-----------|-----------------|-----------------|
| HTTP Request | 401/403 errors | Check JWT middleware, verify token claims |
| Background Job | Job processing wrong tenant data | Add tenant_id to job payload, validate before processing |
| Event Handler | Events processed without isolation | Add tenant context to event envelope, reject events without context |
| WebSocket | Cross-tenant message delivery | Store tenant_id on connection, validate per message |
| AI Agent Run | Agent accessing wrong tenant memory | Validate AgentState.tenant_context before tool execution |

### Database Session Context Failures
If `SET LOCAL app.current_tenant_id` fails or is bypassed:
1. Verify PostgreSQL session is within a transaction
2. Check that RLS policies reference `current_setting('app.current_tenant_id')`
3. Ensure connection pooler (PgBouncer) is in transaction mode
4. Add logging to detect queries without tenant context set

### Recovery Procedure for Context Loss
If tenant context is lost mid-operation:
1. Immediately abort the current operation
2. Log the failure with full stack trace
3. Do NOT retry without re-establishing context
4. Investigate the code path to identify where context was dropped
5. Add explicit context checks at the identified boundary

### Escalation Path
If context propagation issues persist:
1. Map complete request flow with context checkpoints
2. Identify all async boundaries and event handlers
3. Escalate to platform architect if middleware changes needed
4. Consider adding context validation middleware at additional layers

**Verify current best practices with web search:**
Search the web: "context propagation design best practices {date}"
Search the web: "context propagation design enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the context propagation design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into propagation edge cases and async boundaries
- **P (Party Mode)**: Bring analyst and architect perspectives for context flow review
- **C (Continue)**: Accept context propagation design and proceed to sharing rules
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass propagation context: code paths, verification matrix, guard design
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into context propagation design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review context propagation design: {summary of code paths and guards}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save context propagation design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-sharing-rules.md`

---

## Verification

- [ ] TenantContext interface defined following knowledge pattern
- [ ] All code paths have propagation design
- [ ] No-context-guard approach documented
- [ ] Test cases defined for each path type
- [ ] Patterns align with pattern registry

---

## Outputs

- Context propagation design document
- Code path verification matrix
- Test case specifications
- **Load template:** `{project-root}/_bmad/bam/data/templates/context-propagation-spec.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/tenant-context-propagation-template.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/tenant-routing-template.md`

---

## Next Step

After soft gate approval, proceed to `step-04-c-sharing-rules.md`.
