# Step 3: Failover Logic Design

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

Design failover mechanisms including circuit breaker patterns, retry strategies, provider selection algorithms, and health check design.

---

## Prerequisites

- Steps 1-2 completed with provider catalog and quality thresholds
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: ai-operations

---

## Actions

### 1. Design Circuit Breaker Pattern

Specify circuit breaker configuration:

| State | Condition | Behavior |
|-------|-----------|----------|
| Closed | Normal operation | Route to provider |
| Open | Failure threshold exceeded | Skip provider |
| Half-Open | Recovery period elapsed | Test with limited traffic |

| Parameter | Value | Rationale |
|-----------|-------|-----------|
| Failure Threshold | 5 failures / 10s | Quick detection |
| Recovery Timeout | 30s | Allow recovery |
| Success Threshold | 3 successes | Confirm recovery |

### 2. Configure Retry Strategies

Define retry behavior:

| Error Type | Retries | Backoff | Same Provider |
|------------|---------|---------|---------------|
| Timeout | 2 | Exponential | No |
| Rate Limit | 3 | Fixed + jitter | Yes |
| Server Error | 2 | Exponential | No |
| Network Error | 1 | None | No |

### 3. Design Provider Selection Algorithm

Specify selection logic:

| Algorithm | Use Case | Trade-off |
|-----------|----------|-----------|
| Priority-based | Default ordering | Predictable |
| Weighted Random | Load distribution | Balanced |
| Latency-based | Performance critical | Responsive |
| Cost-optimized | Budget constrained | Economical |

### 4. Implement Health Check Design

Define health monitoring:

| Check Type | Frequency | Timeout | Action on Fail |
|------------|-----------|---------|----------------|
| Synthetic Probe | 30s | 5s | Mark degraded |
| API Status | 60s | 10s | Update status |
| Full Request | 5 min | 30s | Validate capability |

**Verify current best practices with web search:**
Search the web: "circuit breaker pattern LLM providers {date}"
Search the web: "AI provider health check design {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into circuit breaker or selection algorithms
- **P (Party Mode)**: Bring SRE and reliability engineering perspectives
- **C (Continue)**: Accept failover logic and proceed to tenant configuration
```

#### If 'C' (Continue):
- Save failover logic design to output document
- Proceed to next step: `step-04-c-tenant-configuration-design.md`

---

## Verification

- [ ] Circuit breaker designed
- [ ] Retry strategies configured
- [ ] Selection algorithm specified
- [ ] Health checks designed

---

## Outputs

- Failover logic specification
- Health check configuration
- **Load template:** `{project-root}/_bmad/bam/templates/circuit-breaker-template.md`

---

## Next Step

Proceed to `step-04-c-tenant-configuration-design.md` to design tenant controls.
