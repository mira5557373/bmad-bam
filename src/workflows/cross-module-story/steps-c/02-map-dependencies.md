# Step 2: Map Dependencies

Document the dependencies between modules for this feature:

## Dependency Types

**Data Dependencies:**
- Module A needs data owned by Module B
- Data flow direction (push/pull/event)
- Data freshness requirements

**Functional Dependencies:**
- Module A calls Module B's facade
- Synchronous vs. asynchronous
- Failure handling requirements

**Temporal Dependencies:**
- Module A must complete before Module B starts
- Parallel execution possible
- Ordering constraints

## Dependency Matrix

| From Module | To Module | Type | Contract | Critical Path |
|-------------|-----------|------|----------|---------------|
| ... | ... | Data/Func/Temporal | facade/event/direct | Yes/No |

## Critical Path Analysis

- Identify the longest dependency chain
- Determine minimum time to completion
- Find parallelization opportunities
- Identify risk points (single module blockers)

## New Contracts Required

For each dependency without existing contract:
- Define required interface
- Specify data schema
- Document SLA requirements
- Plan contract creation story

Output: Dependency graph with critical path and contract requirements.
