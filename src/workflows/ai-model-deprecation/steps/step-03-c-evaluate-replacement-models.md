# Step 3: Evaluate Replacement Models

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

Identify and evaluate candidate replacement models for migration, comparing capabilities, costs, and compatibility to select optimal migration targets for each tenant tier.

---

## Prerequisites

- Step 02 (Identify Dependent Tenants) completed
- Tenant dependency analysis available
- Access to model provider documentation
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: ai-runtime
- **Load patterns:** `{project-root}/_bmad/bam/data/ai-runtimes.csv`

---

## Actions

### 1. Identify Candidate Replacement Models

Research available models that could replace deprecated model:

| Model | Provider | Release Date | Context Window | Key Capabilities | Status |
|-------|----------|--------------|----------------|------------------|--------|
| {model} | {provider} | {date} | {tokens}K | {capabilities} | GA/Preview |

Evaluation criteria:
- Same or higher capability tier
- Provider stability and roadmap
- API compatibility
- Geographic availability
- Compliance certifications

### 2. Compare Model Capabilities

Create feature parity matrix:

| Capability | Deprecated Model | Candidate A | Candidate B | Candidate C |
|------------|------------------|-------------|-------------|-------------|
| Context window | {size} | {size} | {size} | {size} |
| Reasoning quality | {rating} | {rating} | {rating} | {rating} |
| Code generation | {rating} | {rating} | {rating} | {rating} |
| Vision support | Yes/No | Yes/No | Yes/No | Yes/No |
| Function calling | Yes/No | Yes/No | Yes/No | Yes/No |
| Streaming support | Yes/No | Yes/No | Yes/No | Yes/No |
| JSON mode | Yes/No | Yes/No | Yes/No | Yes/No |

### 3. Analyze Cost Implications

Compare pricing across candidates:

| Model | Input Cost | Output Cost | Est. Monthly Cost | Cost Delta vs Current |
|-------|------------|-------------|-------------------|----------------------|
| Deprecated | ${x}/1K | ${y}/1K | ${total} | Baseline |
| Candidate A | ${x}/1K | ${y}/1K | ${total} | +/-{%} |
| Candidate B | ${x}/1K | ${y}/1K | ${total} | +/-{%} |
| Candidate C | ${x}/1K | ${y}/1K | ${total} | +/-{%} |

Cost considerations:
- Per-token pricing differences
- Batch processing discounts
- Committed use discounts
- Fine-tuning costs

### 4. Evaluate API Compatibility

Assess migration effort for API changes:

| API Feature | Deprecated Model | Candidate A | Migration Effort |
|-------------|------------------|-------------|------------------|
| Request format | {format} | {format} | None/Minor/Major |
| Response format | {format} | {format} | None/Minor/Major |
| Error codes | {codes} | {codes} | None/Minor/Major |
| Rate limits | {limits} | {limits} | None/Minor/Major |
| Auth method | {method} | {method} | None/Minor/Major |

### 5. Assess Performance Characteristics

Compare performance metrics:

| Metric | Deprecated Model | Candidate A | Candidate B | Acceptable Range |
|--------|------------------|-------------|-------------|------------------|
| Latency (p50) | {ms} | {ms} | {ms} | {range} |
| Latency (p95) | {ms} | {ms} | {ms} | {range} |
| Throughput | {req/s} | {req/s} | {req/s} | {range} |
| Availability | {%} | {%} | {%} | >{threshold} |

### 6. Match Models to Tenant Tiers

Recommend replacement models per tier:

| Tenant Tier | Primary Replacement | Fallback Option | Rationale |
|-------------|---------------------|-----------------|-----------|
| Free | {model} | {model} | {reason} |
| Pro | {model} | {model} | {reason} |
| Enterprise | {model} | {model} | {reason} |

### 7. Document Migration Risks per Model

Identify risks with each candidate:

| Model | Risk | Likelihood | Impact | Mitigation |
|-------|------|------------|--------|------------|
| Candidate A | {risk} | High/Med/Low | High/Med/Low | {mitigation} |
| Candidate B | {risk} | High/Med/Low | High/Med/Low | {mitigation} |

**Verify current best practices with web search:**
Search the web: "LLM model comparison evaluation framework {date}"
Search the web: "AI model migration cost analysis enterprise {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into model capabilities
- **[P] Party Mode**: Collaborative model evaluation
- **[C] Continue**: Proceed to migration timeline planning

### Menu Options

### [A]nalyze Options
- **A1**: Detailed benchmark comparison for specific use case
- **A2**: Deep dive into cost modeling scenarios
- **A3**: Analyze API compatibility for custom integrations
- **A4**: Evaluate vendor roadmap and stability

### [P]ropose Changes
- **P1**: Propose alternative candidate models
- **P2**: Suggest capability weighting adjustments
- **P3**: Recommend tier-specific optimization strategies
- **P4**: Identify opportunities for model consolidation

### [C]ontinue
- **C1**: Accept replacement model recommendations and proceed
- **C2**: Mark step complete and load `04-plan-migration-timeline.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Candidate replacement models identified
- [ ] Capability comparison matrix completed
- [ ] Cost analysis documented
- [ ] API compatibility assessed
- [ ] Performance characteristics compared
- [ ] Tier-specific recommendations made
- [ ] Migration risks documented

---

## Outputs

- Candidate model inventory
- Capability parity matrix
- Cost comparison analysis
- API compatibility assessment
- Performance benchmark comparison
- Tier-to-model recommendation map
- Risk assessment per candidate

---

## Next Step

Proceed to `step-04-c-plan-migration-timeline.md` to create the deprecation schedule.
