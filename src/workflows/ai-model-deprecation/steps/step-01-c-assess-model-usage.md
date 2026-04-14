# Step 1: Assess Model Usage

## MANDATORY EXECUTION RULES (READ FIRST)

- STOP **NEVER generate content without user input** - Wait for explicit direction
- READ **CRITICAL: ALWAYS read the complete step file** before taking any action
- LOOP **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- PAUSE **ALWAYS pause after presenting findings** and await user direction
- FOCUS **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- TARGET Show your analysis before taking any action
- SAVE Update document frontmatter after each section completion
- WRITE Maintain append-only document building
- CHECK Track progress in `stepsCompleted` array
- SEARCH Use web search to verify current best practices when making technology decisions
- CLIP Reference pattern registry `web_queries` for search topics

---

## Purpose

Analyze current AI model usage across all tenants to understand adoption patterns, usage volumes, and identify which tenants actively use the model targeted for deprecation.

---

## Prerequisites

- Master architecture document available
- AI runtime configuration established
- Access to model usage telemetry and metrics
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: ai-runtime
- **Load patterns:** `{project-root}/_bmad/bam/data/ai-runtimes.csv`

---

## Actions

### 1. Inventory All Active Models

Document all AI models currently deployed across the platform:

| Model ID | Provider | Model Name | Version | Deployment Date | Status |
|----------|----------|------------|---------|-----------------|--------|
| {id} | {provider} | {name} | {version} | {date} | Active/Deprecated |

Considerations:
- Include all model versions currently serving traffic
- Note any models already in sunset period
- Document model aliases and routing configurations

### 2. Collect Usage Metrics by Model

Gather comprehensive usage data for each model:

| Model | Daily Requests | Avg Tokens/Request | Peak QPS | Cost/Day | Trend |
|-------|----------------|-------------------|----------|----------|-------|
| {model} | {count} | {tokens} | {qps} | ${cost} | Up/Down/Stable |

Metrics to collect:
- Request volume (daily, weekly, monthly)
- Token consumption patterns
- Latency percentiles (p50, p95, p99)
- Error rates by model
- Cost attribution

### 3. Analyze Usage Patterns by Tenant Tier

Break down model usage across tenant tiers:

| Tier | Total Tenants | Using Deprecated Model | % of Tier Requests | Primary Use Cases |
|------|---------------|------------------------|-------------------|-------------------|
| Free | {count} | {count} | {%} | {cases} |
| Pro | {count} | {count} | {%} | {cases} |
| Enterprise | {count} | {count} | {%} | {cases} |

### 4. Identify Usage Hot Spots

Map high-usage patterns and critical dependencies:

| Usage Pattern | Frequency | Tenant Tiers | Criticality | Notes |
|---------------|-----------|--------------|-------------|-------|
| Agent reasoning | High | All | Critical | Core functionality |
| Code generation | Medium | Pro/Enterprise | High | Developer features |
| Embeddings | High | All | Critical | Search/RAG |
| Chat completion | Very High | All | Critical | Primary interface |

### 5. Document Model Configuration Dependencies

Capture model-specific configurations in use:

| Configuration | Current Value | Tenants Using | Migration Impact |
|--------------|---------------|---------------|------------------|
| Max tokens | {value} | {count} | {impact} |
| Temperature settings | {values} | {count} | {impact} |
| Custom system prompts | {count} | {count} | {impact} |
| Fine-tuned versions | {count} | {count} | {impact} |

**Verify current best practices with web search:**
Search the web: "AI model usage analytics multi-tenant {date}"
Search the web: "LLM deprecation assessment patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into usage patterns, explore edge cases
- **[P] Party Mode**: Collaborative analysis, creative insights
- **[C] Continue**: Proceed to next step with current assessment

### Menu Options

### [A]nalyze Options
- **A1**: Deep dive into usage patterns for specific tenant tier
- **A2**: Analyze time-series trends for deprecation timing
- **A3**: Evaluate cost implications of current usage
- **A4**: Review error patterns and reliability metrics

### [P]ropose Changes
- **P1**: Propose usage categorization improvements
- **P2**: Suggest additional metrics to collect
- **P3**: Recommend usage alert thresholds
- **P4**: Identify optimization opportunities

### [C]ontinue
- **C1**: Accept usage assessment and proceed to tenant identification
- **C2**: Mark step complete and load `02-identify-dependent-tenants.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] All active models inventoried with versions
- [ ] Usage metrics collected for each model
- [ ] Tenant tier breakdown completed
- [ ] Usage hot spots identified
- [ ] Configuration dependencies documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Complete model inventory matrix
- Usage metrics summary by model
- Tenant tier usage breakdown
- Usage hot spot analysis
- Configuration dependency map

**Load template:** `{project-root}/_bmad/bam/templates/ai-model-deprecation-plan-template.md`

---

## Next Step

Proceed to `step-02-c-identify-dependent-tenants.md` to map tenant model dependencies.
