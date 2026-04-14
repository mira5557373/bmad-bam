# Step 4: Tenant Quotas

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Design tenant quota system for memory allocation including limits per tier, soft vs hard limits, overage handling, and tier-based allocations.

---

## Prerequisites

- Steps 1-3 completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: quota
- **Web research (if available):** Search for multi-tenant quota management patterns

---

## Inputs

- Eviction policies from Step 3
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Define Tier-Based Quotas

| Pricing Tier | Session | User Memory | Tenant Memory | Episodic |
|--------------|---------|-------------|---------------|----------|
| Free | 10 MB | 50 MB | 100 MB | 500 MB |
| Pro | 50 MB | 500 MB | 5 GB | 10 GB |
| Enterprise | 200 MB | 5 GB | Unlimited | 100 GB |

### 2. Configure Soft vs Hard Limits

| Limit Type | Threshold | Behavior | User Experience |
|------------|-----------|----------|-----------------|
| Soft limit | 80% quota | Warning | Banner notification |
| Hard limit | 100% quota | Block new writes | Error + eviction prompt |
| Grace period | 110% quota | 24h grace | Urgent notification |
| Absolute cap | 120% quota | Force eviction | Service degradation |

### 3. Design Overage Handling

| Scenario | Action | Billing | Notification |
|----------|--------|---------|--------------|
| Soft limit hit | Warning only | None | Dashboard + email |
| Hard limit hit | Block writes | None | Popup + email |
| Grace period | Allow writes | Overage charges | Urgent notification |
| Absolute cap | Force cleanup | Overage charges | Admin alert |

### 4. Implement Quota Tracking

| Metric | Granularity | Update Frequency | Storage |
|--------|-------------|------------------|---------|
| Current usage | Per-tenant | Real-time | Redis |
| Historical usage | Per-tenant | Hourly | PostgreSQL |
| Usage trends | Per-tenant | Daily | Analytics DB |
| Quota changes | Per-tenant | On change | Audit log |

### 5. Design Self-Service Management

| Feature | Availability | Implementation |
|---------|--------------|----------------|
| View usage | All tiers | Dashboard widget |
| Download data | All tiers | Export API |
| Selective cleanup | All tiers | UI + API |
| Quota upgrade | Self-service | Billing integration |

**Soft Gate:** Steps 1-4 complete the core quota design. Present summary of quotas, limits, and overage handling. Ask for confirmation before proceeding.

**Verify current best practices with web search:**
Search the web: "multi-tenant quota management patterns {date}"
Search the web: "SaaS resource quota best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the tenant quotas analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into quota thresholds and overage handling
- **P (Party Mode)**: Bring product manager and billing perspectives on quotas
- **C (Continue)**: Accept quota design and proceed to performance tuning
- **[Specific refinements]**: Describe quota concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: tier quotas, limit types, overage handling
- Process enhanced insights on quota management
- Ask user: "Accept these refined quota decisions? (y/n)"
- If yes, integrate into quota specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tenant memory quota design for fairness and revenue"
- Process product manager and billing perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save tenant quotas to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-performance-tuning.md`

---

## Verification

- [ ] Tier-based quotas defined
- [ ] Soft vs hard limits configured
- [ ] Overage handling designed
- [ ] Quota tracking implemented
- [ ] Self-service management planned
- [ ] Patterns align with pattern registry

---

## Outputs

- Tenant quota specification
- Limit configuration
- Overage handling procedures
- Self-service features plan

---

## Next Step

Proceed to `step-05-c-performance-tuning.md` to optimize performance.
