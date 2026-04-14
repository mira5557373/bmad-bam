# Step 3: Handle Active Resources

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

Define procedures for handling active tenant resources during offboarding.

---

## Prerequisites

- Data retention designed (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: agent-runtime`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: agent-runtime`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

Define procedures for handling active tenant resources during offboarding:

---

## Active Session Handling

| Session Type | Handling Strategy | Grace Period |
|--------------|-------------------|--------------|
| Web Sessions | Invalidate tokens, redirect to offboarding page | Immediate |
| API Sessions | Return 403 with offboarding message | Immediate |
| WebSocket Connections | Send disconnect event, close connection | 5 minutes |
| Mobile App Sessions | Push notification, token invalidation | 1 hour |

---

## Running Job Handling

| Job Type | Handling Strategy | Max Wait |
|----------|-------------------|----------|
| Sync API Requests | Complete in-flight, reject new | 30 seconds |
| Background Jobs | Allow completion, no new scheduling | 1 hour |
| Scheduled Tasks | Cancel pending, complete running | 15 minutes |
| Long-Running Agents | Graceful shutdown signal | 30 minutes |
| Batch Exports | Complete if started, cancel if pending | 2 hours |

---

## Agent Runtime Cleanup

```yaml
agent_shutdown_sequence:
  1. Stop accepting new conversations
  2. Send "session ending" message to active conversations
  3. Save conversation state to memory tier
  4. Complete tool executions in progress
  5. Release LLM API connections
  6. Mark agent as OFFLINE
  7. Archive agent configuration
```

---

## Integration Disconnection

| Integration Type | Disconnection Action |
|------------------|---------------------|
| OAuth Connections | Revoke tokens, notify provider |
| Webhook Endpoints | Disable endpoints, queue cleanup |
| API Keys | Invalidate immediately |
| SSO Connections | Remove from IdP, notify admin |

---

## Resource Lock Prevention

Before starting offboarding:
1. Acquire distributed lock on tenant resources
2. Set tenant status to OFFBOARDING
3. Block all write operations
4. Allow read-only access during grace period
5. Release lock after archive creation

---

## Notification Sequence

```
T-7 days:  Email warning to tenant admin
T-3 days:  Email reminder with export option
T-1 day:   Final warning, export deadline
T-0:       Offboarding initiated
T+1 hour:  Active sessions terminated
T+24h:     Suspension complete notification
```

**Verify current best practices with web search:**
Search the web: "tenant resource cleanup tenant lifecycle {date}"
Search the web: "graceful shutdown multi-tenant SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the active resource handling above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into resource handling edge cases and timing
- **P (Party Mode)**: Bring analyst and architect perspectives for resource handling review
- **C (Continue)**: Accept resource handling and proceed to cleanup isolation
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass resource context: session handling, job handling, agent shutdown
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into resource handling
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review active resource handling: {summary of sessions, jobs, and agents}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save resource handling to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-cleanup-isolation.md`

---

## Verification

- [ ] Session handling strategies defined
- [ ] Job handling strategies specified
- [ ] Agent shutdown sequence documented
- [ ] Integration disconnection planned
- [ ] Resource lock prevention configured
- [ ] Notification sequence established
- [ ] Patterns align with pattern registry

---

## Outputs

- Active resource handling procedures
- Notification sequence configuration

---

## Next Step

Proceed to `step-04-c-cleanup-isolation.md` to define cleanup procedures.
