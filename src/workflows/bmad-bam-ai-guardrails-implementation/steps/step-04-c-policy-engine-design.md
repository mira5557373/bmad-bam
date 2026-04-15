# Step 4: Policy Engine Design

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics

---

## Purpose

Design the tenant-configurable policy engine that governs guardrail behavior, including policy schema, severity levels, override hierarchies, and comprehensive audit logging.

---

## Prerequisites

- Steps 1-3 completed with input filtering, output validation, and framework selection
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: ai-safety
- **Web research (if available):** Search for policy engine design patterns

---

## Inputs

- Input filtering design from Step 1
- Output validation design from Step 2
- Framework selection from Step 3
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Define Policy Schema

Design the policy definition structure:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| policy_id | string | Yes | Unique identifier |
| tenant_id | string | Yes | Owning tenant |
| category | enum | Yes | Input/Output/Both |
| rules | array | Yes | Rule definitions |
| severity | enum | Yes | Block/Warn/Log |
| enabled | boolean | Yes | Active status |
| priority | integer | No | Evaluation order |

### 2. Design Rule Definition

Specify rule structure:

| Field | Type | Description |
|-------|------|-------------|
| rule_id | string | Unique rule identifier |
| condition | object | Match criteria |
| action | enum | Block/Redact/Flag/Allow |
| message | string | User-facing message |
| logging_level | enum | Full/Summary/None |

### 3. Configure Severity Levels

Define severity hierarchy:

| Level | Action | User Impact | Audit |
|-------|--------|-------------|-------|
| CRITICAL | Block immediately | Request rejected | Full context |
| HIGH | Block with review | Queued for approval | Full context |
| MEDIUM | Warn and continue | Warning displayed | Summary |
| LOW | Log only | No impact | Minimal |

### 4. Design Override Hierarchy

Specify policy precedence:

| Level | Override Capability | Example |
|-------|---------------------|---------|
| Platform | Cannot be overridden | Illegal content blocking |
| Compliance | Limited override | GDPR requirements |
| Tenant Admin | Configurable | Custom deny lists |
| User Preference | Within tenant bounds | Sensitivity settings |

### 5. Implement Audit Logging

Design comprehensive audit trail:

| Event | Data Captured | Retention |
|-------|---------------|-----------|
| Policy Triggered | Input/output, rule matched, action taken | 90 days |
| Policy Modified | Before/after, modifier identity | 365 days |
| Override Used | Override type, justification | 365 days |
| False Positive | Original content, correction | 365 days |

**Verify current best practices with web search:**
Search the web: "content policy engine design patterns {date}"
Search the web: "AI guardrail audit logging compliance {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the policy engine analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into policy schema or override logic
- **P (Party Mode)**: Bring compliance and engineering perspectives on policy engine
- **C (Continue)**: Accept policy engine design and complete Create mode
- **[Specific refinements]**: Describe policy engine concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: policy schema, severity levels, override hierarchy, audit logging
- Process enhanced insights on policy engine trade-offs
- Ask user: "Accept these refined policy engine decisions? (y/n)"
- If yes, integrate into policy engine specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review AI guardrail policy engine design for compliance and scalability"
- Process compliance and engineering perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save policy engine design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Generate final guardrails architecture document
- Workflow Create mode complete

---

## Verification

- [ ] Policy schema defined
- [ ] Rule definition specified
- [ ] Severity levels configured
- [ ] Override hierarchy documented
- [ ] Audit logging designed
- [ ] Patterns align with pattern registry

---

## Outputs

- Policy engine schema
- Severity level definitions
- Override hierarchy specification
- Audit logging design
- **Output to:** `{output_folder}/planning-artifacts/architecture/ai-guardrails-design.md`

---

## Next Step

Create mode complete. Proceed to validation or downstream workflows.
