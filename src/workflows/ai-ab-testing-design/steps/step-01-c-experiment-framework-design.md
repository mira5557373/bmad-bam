# Step 1: Experiment Framework Design

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

Design the core experimentation infrastructure for A/B testing AI models, prompts, and configurations while maintaining multi-tenant isolation.

---

## Prerequisites

- Agent runtime architecture document loaded
- AI runtime configuration (`{ai_runtime}`) resolved
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: ai-testing
- **Web research (if available):** Search for current AI A/B testing best practices

---

## Inputs

- User requirements for experimentation
- Agent runtime architecture document
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Define Experiment Schema

Design the experiment definition structure:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| experiment_id | string | Yes | Unique identifier |
| tenant_id | string | Yes | Owning tenant (null for platform) |
| name | string | Yes | Human-readable name |
| hypothesis | string | Yes | What we expect to learn |
| variants | array | Yes | Control and treatment variants |
| traffic_allocation | object | Yes | Percentage per variant |
| start_date | datetime | Yes | Experiment start |
| end_date | datetime | No | Planned end date |
| status | enum | Yes | Draft/Running/Paused/Complete |

### 2. Design Variant Assignment

Specify assignment algorithms:

| Algorithm | Use Case | Consistency |
|-----------|----------|-------------|
| Random Hash | Most experiments | User-sticky |
| Bucket-based | Large experiments | Session-sticky |
| Feature Flag | Gradual rollout | Configuration-based |
| Multi-armed Bandit | Optimization | Dynamic |

### 3. Configure Traffic Allocation

Define allocation strategies:

| Strategy | Description | When to Use |
|----------|-------------|-------------|
| Equal Split | 50/50 control/treatment | Initial testing |
| Ramped Rollout | 5% → 25% → 50% → 100% | Risk mitigation |
| Holdout Group | Reserve 5% never exposed | Long-term measurement |
| Tenant Override | Specific tenants in variant | Beta testing |

### 4. Design Tenant Isolation

Ensure experiment isolation:

| Isolation Level | Description | Implementation |
|-----------------|-------------|----------------|
| Platform | All tenants eligible | Global experiment |
| Tenant-scoped | Single tenant only | tenant_id filter |
| Tier-scoped | Enterprise tier only | tier filter |
| Opt-in | Tenant must enable | Feature flag |

**Verify current best practices with web search:**
Search the web: "AI A/B testing LLM experiments {date}"
Search the web: "multi-tenant experimentation platform design {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the framework analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into assignment algorithms or isolation
- **P (Party Mode)**: Bring data science and engineering perspectives
- **C (Continue)**: Accept framework design and proceed to variant management
- **[Specific refinements]**: Describe framework concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: experiment schema, assignment algorithms, isolation levels
- Process enhanced insights on experimentation trade-offs
- Ask user: "Accept these refined decisions? (y/n)"
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review AI A/B testing framework design for multi-tenant platform"
- Process data science and engineering perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save experiment framework design to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-model-variant-management.md`

---

## Verification

- [ ] Experiment schema defined
- [ ] Assignment algorithms specified
- [ ] Traffic allocation strategies documented
- [ ] Tenant isolation designed
- [ ] Patterns align with pattern registry

---

## Outputs

- Experiment framework specification
- Assignment algorithm documentation
- Traffic allocation strategy
- **Load template:** `{project-root}/_bmad/bam/data/templates/ai-ab-testing-template.md`

---

## Next Step

Proceed to `step-02-c-model-variant-management.md` to design variant management.
