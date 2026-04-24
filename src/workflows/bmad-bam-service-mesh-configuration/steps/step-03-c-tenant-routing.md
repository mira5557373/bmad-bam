# Step 3: Tenant Routing

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

Implement tenant-aware routing including header-based routing, namespace isolation, and canary deployments.

---

## Prerequisites

- Step 1: Mesh Architecture completed
- Step 2: Traffic Management completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv -> filter: tenant-isolation`

---

## Actions

### 1. Header-Based Routing

Configure tenant header routing:

| Header | Usage | Routing Action |
|--------|-------|----------------|
| X-Tenant-ID | Primary identifier | Route to tenant namespace |
| X-Tenant-Tier | Tier identification | Select service version |
| X-Trace-ID | Distributed tracing | Propagate through mesh |

### 2. Namespace Isolation

Design namespace strategy per tier:

| Tier | Namespace Pattern | Isolation Level |
|------|-------------------|-----------------|
| FREE | shared-free | Shared services |
| PRO | shared-pro | Shared with quotas |
| ENTERPRISE | tenant-{id} | Dedicated namespace |

### 3. Canary Deployments

Configure per-tenant canary:

- Tenant-scoped traffic splitting
- Gradual rollout (1% -> 10% -> 50% -> 100%)
- Automatic rollback on error rate >1%
- Feature flags integration

**Soft Gate:** Steps 1-3 complete the tenant routing design. Present a summary of routing rules and isolation. Ask for confirmation before proceeding to observability integration.

**Verify current best practices with web search:**
Search the web: "service mesh multi-tenant routing {date}"
Search the web: "Istio canary deployment patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into routing edge cases
- **P (Party Mode)**: Bring security perspectives
- **C (Continue)**: Accept tenant routing and proceed to observability
```

#### If 'C' (Continue):
- Save tenant routing to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-observability-integration.md`

---

## Verification

- [ ] Header-based routing configured
- [ ] Namespace isolation defined
- [ ] Canary deployments specified
- [ ] Patterns align with pattern registry

---

## Outputs

- Tenant routing design document
- Header-based routing configuration
- Namespace isolation specification
- Canary deployment configuration

---

## Next Step

Proceed to `step-04-c-observability-integration.md` to configure observability features.
