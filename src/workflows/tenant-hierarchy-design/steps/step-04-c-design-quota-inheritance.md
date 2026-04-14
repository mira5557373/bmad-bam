# Step 4: Design Quota Inheritance

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

Define resource quota distribution and inheritance across the tenant hierarchy.

---

## Prerequisites

- Step 3 completed (Billing rollup defined)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: quota-management`

---

## Actions

### 1. Define Quota Pool Allocation

Specify how quotas flow from parent to children:

| Resource Type | Allocation Model | Example |
|---------------|------------------|---------|
| API Calls | Fixed allocation | Parent: 1M/month, allocate to children |
| Storage | Proportional split | Parent: 100TB, split by department size |
| Compute | Dynamic pool | Shared pool with reservation minimums |
| AI Tokens | Usage-based | No pre-allocation, metered |
| Users | Per-seat | Hard limits per tenant level |

### 2. Define Limit Types

| Limit Type | Behavior | Override Allowed |
|------------|----------|------------------|
| Hard Limit | Absolute maximum, cannot exceed | No |
| Soft Limit | Warning threshold, can exceed | Yes |
| Reserved | Guaranteed minimum allocation | No |
| Burst | Temporary overage capacity | Parent approval |
| Shared | Pool shared across siblings | Automatic |

### 3. Quota Distribution Rules

For each hierarchy level:

| Level | Receives From | Can Allocate | Unallocated Handling |
|-------|---------------|--------------|---------------------|
| Root | Platform contract | Yes | Remains in root pool |
| BU | Root | Yes | Shared BU pool |
| Department | BU | Yes | Shared dept pool |
| Team | Department | Limited | Direct consumption |
| Project | Team | No | Direct consumption |

### 4. Burst Capacity Sharing

Define burst behavior:

- **Intra-sibling burst:** Siblings can borrow unused capacity
- **Upward burst:** Child can request from parent's unallocated
- **Cross-BU burst:** Requires explicit approval
- **Burst duration:** Maximum burst period before enforcement
- **Burst pricing:** Premium rate for burst usage

### 5. Quota Rebalancing Procedures

| Trigger | Action | Approval |
|---------|--------|----------|
| New child tenant | Automatic allocation from parent | Auto |
| Child deletion | Return to parent pool | Auto |
| Manual request | Admin-initiated rebalance | Parent admin |
| Threshold breach | Alert and optional auto-adjust | Configurable |
| Seasonal adjustment | Scheduled rebalancing | Pre-approved |

**Verify current best practices with web search:**
Search the web: "resource quota hierarchical allocation SaaS {date}"
Search the web: "multi-tenant quota management best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the quota inheritance design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into quota edge cases and rebalancing scenarios
- **P (Party Mode)**: Bring analyst and architect perspectives for quota model review
- **C (Continue)**: Accept quota design and proceed to runbook creation
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass quota context: allocation models, limit types, rebalancing rules
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into quota design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review quota inheritance: {summary of allocation and limits}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save quota inheritance design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-create-runbook.md`

---

## Verification

- [ ] Quota pool allocation defined
- [ ] Limit types specified
- [ ] Distribution rules documented
- [ ] Burst capacity rules established
- [ ] Rebalancing procedures defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Quota allocation model
- Limit type definitions
- Burst capacity rules
- Rebalancing procedures

---

## Next Step

Proceed to `step-05-c-create-runbook.md` to create operational runbook.
