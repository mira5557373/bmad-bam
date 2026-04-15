# Step 4: Tenant Configuration Design

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

---

## Purpose

Design tenant-level controls for provider preferences, quality requirements, cost constraints, and fallback restrictions.

---

## Prerequisites

- Steps 1-3 completed with provider catalog, quality thresholds, and failover logic
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: ai-operations

---

## Actions

### 1. Define Provider Preferences

Design tenant provider configuration:

| Setting | Type | Default | Configurable |
|---------|------|---------|--------------|
| Primary Provider | enum | Platform default | Enterprise only |
| Allowed Providers | array | All | Yes |
| Blocked Providers | array | None | Yes |
| Region Restriction | enum | Any | Compliance |

### 2. Configure Quality Requirements

Design tenant quality settings:

| Setting | Type | Default | Configurable |
|---------|------|---------|--------------|
| Min Quality Score | float | 0.80 | Enterprise |
| Max Latency | int | 3000ms | Yes |
| Retry Enabled | bool | true | Yes |
| Fallback Enabled | bool | true | Enterprise |

### 3. Set Cost Constraints

Design cost controls:

| Constraint | Type | Default | Configurable |
|------------|------|---------|--------------|
| Max Cost per Request | decimal | Unlimited | Yes |
| Prefer Economy Models | bool | false | Yes |
| Cost vs Quality Trade-off | enum | Balanced | Enterprise |

### 4. Define Fallback Restrictions

Design fallback limitations:

| Restriction | Purpose | Application |
|-------------|---------|-------------|
| No Cross-region | Data residency | GDPR tenants |
| Provider Lock-in | Contract | Enterprise |
| Quality Floor | SLA | All tenants |
| Cost Ceiling | Budget | Per-tenant |

**Verify current best practices with web search:**
Search the web: "multi-tenant AI provider configuration {date}"
Search the web: "LLM provider selection per customer {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into tenant settings or restrictions
- **P (Party Mode)**: Bring product and compliance perspectives
- **C (Continue)**: Accept tenant configuration and complete Create mode
```

#### If 'C' (Continue):
- Save tenant configuration design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Generate final fallback chains architecture document
- Workflow Create mode complete

---

## Verification

- [ ] Provider preferences defined
- [ ] Quality requirements configured
- [ ] Cost constraints set
- [ ] Fallback restrictions documented

---

## Outputs

- Tenant configuration specification
- **Output to:** `{output_folder}/planning-artifacts/architecture/ai-fallback-chains-design.md`

---

## Next Step

Create mode complete. Proceed to validation or downstream workflows.
