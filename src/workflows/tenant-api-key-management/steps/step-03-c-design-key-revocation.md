# Step 3: Design Key Revocation

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

Design API key revocation procedures for immediate and graceful key invalidation.

---

## Prerequisites

- Step 2 completed (Key rotation design)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: encryption-key-management`

---

## Actions

### 1. Define Revocation Types

| Type | Effect | Use Case |
|------|--------|----------|
| Immediate | Key invalid instantly | Security breach |
| Graceful | Grace period before invalid | Planned decommission |
| Temporary | Suspended, can reactivate | Investigation |
| Cascade | Revoke key + all derived tokens | Full cleanup |

### 2. Revocation Triggers

| Trigger | Revocation Type | Automation |
|---------|-----------------|------------|
| Admin request | Configurable | Manual |
| User request | Graceful | Manual |
| Suspicious activity | Temporary | Automatic |
| Confirmed breach | Immediate + Cascade | Automatic |
| Tenant suspension | Temporary (all keys) | Automatic |
| Tenant deletion | Immediate (all keys) | Automatic |

### 3. Cascade Effects

Define impact on dependent resources:

| Resource | On Revocation | Cleanup Timing |
|----------|---------------|----------------|
| Active sessions | Terminate | Immediate |
| Refresh tokens | Invalidate | Immediate |
| Cached permissions | Clear | Immediate |
| Rate limit counters | Preserve | 24 hours |
| Audit logs | Preserve | Per retention policy |

### 4. Recovery Procedures

| Scenario | Recovery Path | Approval |
|----------|---------------|----------|
| Accidental revocation | Reissue new key | Key owner |
| False positive | Reactivate (temporary only) | Security team |
| Confirmed breach | New key + security review | Security + Admin |

### 5. Compliance Evidence

Preserve revocation evidence:

| Data Point | Retention | Purpose |
|------------|-----------|---------|
| Revocation timestamp | 7 years | Compliance |
| Revoking user/system | 7 years | Accountability |
| Reason code | 7 years | Audit trail |
| Key metadata snapshot | 7 years | Forensics |
| Active sessions at revocation | 90 days | Investigation |

**Verify current best practices with web search:**
Search the web: "API key revocation security best practices {date}"
Search the web: "credential revocation compliance requirements {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the revocation design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into revocation edge cases and recovery scenarios
- **P (Party Mode)**: Bring security and compliance perspectives for revocation review
- **C (Continue)**: Accept revocation design and proceed to audit logging
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass revocation context: types, triggers, cascade effects, recovery
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into revocation design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review key revocation: {summary of types and procedures}"
- Process collaborative analysis from security and compliance personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save revocation design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-design-audit-logging.md`

---

## Verification

- [ ] Revocation types defined
- [ ] All triggers documented
- [ ] Cascade effects specified
- [ ] Recovery procedures complete
- [ ] Compliance evidence requirements met
- [ ] Patterns align with pattern registry

---

## Outputs

- Revocation type definitions
- Trigger matrix
- Cascade effect specification
- Recovery procedures
- Compliance evidence requirements

---

## Next Step

Proceed to `step-04-c-design-audit-logging.md` to design comprehensive audit trail.
