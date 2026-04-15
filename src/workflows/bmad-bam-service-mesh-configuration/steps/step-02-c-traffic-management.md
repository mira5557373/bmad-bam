# Step 2: Traffic Management

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- ALWAYS pause after presenting findings and await user direction

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices

---

## Purpose

Configure traffic management policies including circuit breakers, retries, and load balancing.

---

## Prerequisites

- Step 1: Mesh Architecture completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv -> filter: infrastructure`

---

## Actions

### 1. Circuit Breaker Configuration

Define circuit breaker policies:

| Service Type | Max Connections | Max Pending | Consecutive Errors | Ejection Time |
|--------------|-----------------|-------------|-------------------|---------------|
| API Services | 1000 | 100 | 5 | 30s |
| AI Inference | 100 | 50 | 3 | 60s |
| Databases | 500 | 50 | 3 | 60s |

### 2. Retry Policies

Configure retry behavior:

| Condition | Max Retries | Backoff | Timeout |
|-----------|-------------|---------|---------|
| 5xx errors | 3 | Exponential | 2s |
| Connection errors | 2 | Linear | 1s |
| Rate limited | 3 | Fixed 1s | 5s |

### 3. Load Balancing Strategies

Define load balancing per service type:

| Service Type | Algorithm | Session Affinity | Health Check |
|--------------|-----------|------------------|--------------|
| Stateless API | Round Robin | None | HTTP 200 |
| AI Inference | Least Connections | None | HTTP 200 |
| WebSocket | Consistent Hash | Required | TCP |

**Verify current best practices with web search:**
Search the web: "service mesh circuit breaker best practices {date}"
Search the web: "Istio retry policies configuration {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into traffic policies
- **P (Party Mode)**: Bring operations perspectives
- **C (Continue)**: Accept traffic management and proceed to tenant routing
```

#### If 'C' (Continue):
- Save traffic management to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-tenant-routing.md`

---

## Verification

- [ ] Circuit breakers configured
- [ ] Retry policies defined
- [ ] Load balancing strategies specified
- [ ] Patterns align with pattern registry

---

## Next Step

Proceed to `step-03-c-tenant-routing.md` to implement tenant-aware routing.
