# Step 2: Design Key Rotation

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

Design API key rotation policies and procedures for secure key lifecycle management.

---

## Prerequisites

- Step 1 completed (Key creation design)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: encryption-key-management`

---

## Actions

### 1. Define Rotation Triggers

| Trigger Type | Condition | Automation |
|--------------|-----------|------------|
| Scheduled | Key age > policy threshold | Automatic |
| Manual | Admin/user request | On-demand |
| Forced | Security incident detected | Immediate |
| Compliance | Regulatory requirement | Policy-based |
| Anomaly | Unusual usage pattern | Alert + optional |

### 2. Rotation Policy Configuration

| Policy Attribute | Default | Configurable | Tier Override |
|------------------|---------|--------------|---------------|
| Max age | 90 days | Yes | Enterprise |
| Warning period | 14 days before expiry | Yes | All |
| Grace period | 30 days overlap | Yes | Enterprise |
| Auto-rotation | Disabled | Yes | Pro/Enterprise |
| Notification | Email + webhook | Yes | All |

### 3. Rotation Process Flow

Define the rotation state machine:

| State | Description | Next States |
|-------|-------------|-------------|
| ACTIVE | Current valid key | ROTATING |
| ROTATING | New key created, old still valid | ROTATED |
| ROTATED | Old key in grace period | EXPIRED |
| EXPIRED | Old key no longer valid | (terminal) |
| REVOKED | Manually invalidated | (terminal) |

### 4. Zero-Downtime Rotation

Design seamless rotation:

1. Generate new key (enters ACTIVE state)
2. Old key enters ROTATING state
3. Both keys valid during grace period
4. Notify integrators of new key
5. After grace period, old key enters EXPIRED
6. Clean up expired key metadata

### 5. Rotation Notifications

| Event | Channel | Content |
|-------|---------|---------|
| Rotation due | Email, webhook | Warning with days remaining |
| New key created | Email, webhook | New key (once), migration guide |
| Grace period ending | Email, webhook | Urgency reminder |
| Key expired | Email, webhook | Confirmation, troubleshooting |

**Soft Gate:** Steps 1-2 complete key creation and rotation design. Present summary of key format and rotation policies. Ask for confirmation before proceeding to revocation.

**Verify current best practices with web search:**
Search the web: "API key rotation best practices {date}"
Search the web: "zero downtime key rotation patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the rotation design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into rotation edge cases and failure scenarios
- **P (Party Mode)**: Bring security and operations perspectives for rotation review
- **C (Continue)**: Accept rotation design and proceed to revocation procedures
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass rotation context: triggers, policies, process flow
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into rotation design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review key rotation: {summary of policies and process}"
- Process collaborative analysis from security and operations personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save rotation design to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-design-key-revocation.md`

---

## Verification

- [ ] All rotation triggers defined
- [ ] Policy configuration complete
- [ ] State machine documented
- [ ] Zero-downtime process specified
- [ ] Notification strategy complete
- [ ] Patterns align with pattern registry

---

## Outputs

- Rotation trigger matrix
- Policy configuration schema
- Rotation state machine
- Notification specification

---

## Next Step

Proceed to `step-03-c-design-key-revocation.md` to define revocation procedures.
