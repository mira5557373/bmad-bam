# Step 3: Circuit Breaker

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

Implement resilience patterns including circuit breaker configuration, timeout policies, retry strategies, fallback mechanisms, and health monitoring.

---

## Prerequisites

- Step 2 completed: State sharing designed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: resilience-patterns
- **Web research (if available):** Search for current circuit breaker patterns

---

## Inputs

- State sharing design from Step 2
- Handoff protocol from Step 1
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Availability requirements

---

## Actions

### 1. Design Circuit Breaker Configuration

Define circuit breaker states and thresholds:

| State | Condition | Behavior |
|-------|-----------|----------|
| CLOSED | Normal operation | Allow requests |
| OPEN | Failure threshold reached | Block requests |
| HALF-OPEN | After timeout | Test recovery |

Circuit Breaker Parameters:

| Parameter | Value | Purpose |
|-----------|-------|---------|
| Failure Threshold | 5 errors | Trigger open |
| Success Threshold | 3 successes | Return to closed |
| Timeout | 30 seconds | Half-open transition |
| Monitoring Window | 60 seconds | Error rate calculation |
| Min Requests | 10 | Before evaluation |

Per-Agent Configuration:

| Agent Type | Failure Threshold | Timeout | Fallback |
|------------|-------------------|---------|----------|
| Primary | 5 | 30s | Secondary agent |
| Secondary | 3 | 20s | Graceful degrade |
| Specialist | 10 | 60s | General agent |
| External | 2 | 10s | Cached response |

### 2. Define Timeout Policies

Configure timeout handling:

| Timeout Type | Duration | Scope | Action |
|--------------|----------|-------|--------|
| Connection | 5s | Network | Retry |
| Request | 30s | API call | Fail |
| Task | 120s | Agent task | Escalate |
| Session | 300s | User session | Checkpoint |
| Transaction | 60s | State operation | Rollback |

Timeout Configuration per Agent:

| Agent | Task Timeout | Retry | Fallback |
|-------|--------------|-------|----------|
| Chat | 30s | 2x | Template response |
| Analysis | 120s | 1x | Partial results |
| Code | 180s | 1x | Error explanation |
| Search | 10s | 3x | Cached results |

### 3. Design Retry Strategies

Define retry behavior:

| Strategy | Implementation | Use Case |
|----------|----------------|----------|
| Immediate | No delay | Transient errors |
| Fixed Delay | Constant wait | Rate limiting |
| Exponential Backoff | Increasing delay | Overload |
| Jitter | Random variance | Thundering herd |
| Circuit-Aware | Check circuit | Cascading failures |

Retry Configuration:

| Error Type | Max Retries | Initial Delay | Backoff |
|------------|-------------|---------------|---------|
| Network | 3 | 100ms | Exponential |
| Rate Limit | 5 | 1s | Fixed |
| Server Error | 2 | 500ms | Exponential + jitter |
| Timeout | 2 | 0ms | None |
| Validation | 0 | N/A | No retry |

### 4. Implement Fallback Mechanisms

Define fallback hierarchy:

| Level | Fallback | Trigger | Quality |
|-------|----------|---------|---------|
| 1 | Alternative agent | Primary fails | High |
| 2 | Cached response | All agents fail | Medium |
| 3 | Template response | Cache miss | Low |
| 4 | Graceful error | Template fails | Minimal |

Fallback Configuration per Scenario:

| Scenario | Primary | Fallback 1 | Fallback 2 |
|----------|---------|------------|------------|
| Customer query | Support agent | FAQ bot | Ticket creation |
| Code review | Code agent | Lint only | Queue for human |
| Data analysis | Analysis agent | Summary only | Error report |
| Search | RAG pipeline | Keyword search | No results |

### 5. Design Health Monitoring

Define health check infrastructure:

| Check Type | Frequency | Timeout | Action on Fail |
|------------|-----------|---------|----------------|
| Liveness | 10s | 5s | Restart |
| Readiness | 30s | 10s | Remove from pool |
| Deep Health | 60s | 30s | Alert |
| Dependency | 30s | 15s | Circuit breaker |

Health Metrics:

| Metric | Threshold | Alert Level |
|--------|-----------|-------------|
| Error Rate | >5% | Warning |
| Error Rate | >10% | Critical |
| Latency P95 | >2x baseline | Warning |
| Latency P95 | >5x baseline | Critical |
| Success Rate | <95% | Warning |
| Success Rate | <90% | Critical |

### 6. Configure Bulkhead Pattern

Isolate failures:

| Bulkhead | Scope | Isolation Method |
|----------|-------|------------------|
| Per-Tenant | Tenant | Resource pool |
| Per-Agent | Agent type | Thread pool |
| Per-Feature | Feature | Semaphore |
| Per-Region | Region | Separate instance |

Bulkhead Configuration:

| Pool | Max Concurrent | Queue Size | Timeout |
|------|----------------|------------|---------|
| Tenant Pool | 10 | 50 | 60s |
| Agent Pool | 5 per type | 20 | 30s |
| External Call | 3 | 10 | 10s |

**Verify current best practices with web search:**
Search the web: "circuit breaker pattern microservices {date}"
Search the web: "resilience patterns distributed AI systems {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the circuit breaker design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into resilience patterns and thresholds
- **P (Party Mode)**: Bring SRE and distributed systems perspectives
- **C (Continue)**: Accept circuit breaker and proceed to recovery patterns
- **[Specific refinements]**: Describe resilience concerns to address

Select an option:
```

#### If 'C' (Continue):
- Save circuit breaker design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-recovery-patterns.md`

---

## Verification

- [ ] Circuit breaker configuration defined
- [ ] Timeout policies specified per agent
- [ ] Retry strategies designed
- [ ] Fallback mechanisms implemented
- [ ] Health monitoring configured
- [ ] Bulkhead pattern applied
- [ ] Patterns align with pattern registry

---

## Outputs

- Circuit breaker specification
- Timeout configuration
- Retry strategy design
- Fallback hierarchy
- Health monitoring plan

---

## Next Step

Proceed to `step-04-c-recovery-patterns.md` to define recovery strategies.
