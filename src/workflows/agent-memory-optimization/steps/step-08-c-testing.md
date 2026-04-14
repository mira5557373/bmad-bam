# Step 8: Testing

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

Plan comprehensive memory testing strategy including load testing, eviction verification, quota enforcement, and failover testing.

---

## Prerequisites

- Steps 1-7 completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: testing
- **Web research (if available):** Search for memory system testing strategies

---

## Inputs

- Monitoring design from Step 7
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Design Load Testing

| Test Scenario | Load Profile | Duration | Success Criteria |
|---------------|--------------|----------|------------------|
| Normal load | 100 concurrent | 1 hour | Latency < SLA |
| Peak load | 500 concurrent | 15 min | No failures |
| Sustained | 200 concurrent | 24 hours | Stable memory |
| Burst | 1000 concurrent | 5 min | Graceful degradation |

### 2. Plan Eviction Verification

| Test Case | Setup | Verification |
|-----------|-------|--------------|
| TTL expiry | Create with TTL, wait | Data removed |
| LRU eviction | Fill to capacity, access subset | Old data evicted |
| Importance scoring | Create varied importance | High-importance retained |
| Manual eviction | Trigger admin cleanup | Target data removed |

### 3. Design Quota Enforcement Tests

| Test Case | Action | Expected Result |
|-----------|--------|-----------------|
| Soft limit | Write to 80% quota | Warning notification |
| Hard limit | Write to 100% quota | Write blocked |
| Grace period | Write to 110% quota | Allowed with alert |
| Recovery | Clean up below limit | Writes resume |

### 4. Plan Failover Testing

| Failure Mode | Injection | Expected Behavior |
|--------------|-----------|-------------------|
| Primary down | Kill primary | Failover to replica |
| Network partition | Split network | Read from available |
| Disk full | Fill disk | Eviction triggered |
| Memory exhaustion | Allocate all | OOM handling |

### 5. Define Performance Benchmarks

| Benchmark | Baseline | Regression Threshold |
|-----------|----------|---------------------|
| Read latency p50 | [ ] ms | +20% |
| Read latency p99 | [ ] ms | +30% |
| Write latency p50 | [ ] ms | +20% |
| Throughput | [ ] ops/sec | -20% |

**Verify current best practices with web search:**
Search the web: "distributed cache testing strategies {date}"
Search the web: "memory system failover testing {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the testing analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into test scenarios and benchmarks
- **P (Party Mode)**: Bring QA and SRE perspectives on testing strategy
- **C (Continue)**: Accept testing design and proceed to documentation
- **[Specific refinements]**: Describe testing concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: load tests, eviction tests, failover tests, benchmarks
- Process enhanced insights on testing coverage
- Ask user: "Accept these refined testing decisions? (y/n)"
- If yes, integrate into testing specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review memory testing strategy for coverage and reliability"
- Process QA and SRE perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save testing plan to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]`
- Proceed to next step: `step-09-c-documentation.md`

---

## Verification

- [ ] Load testing scenarios designed
- [ ] Eviction verification planned
- [ ] Quota enforcement tests defined
- [ ] Failover testing planned
- [ ] Performance benchmarks established
- [ ] Patterns align with pattern registry

---

## Outputs

- Testing specification
- Load test scenarios
- Eviction test plan
- Failover test procedures
- Benchmark definitions

---

## Next Step

Proceed to `step-09-c-documentation.md` to generate documentation.
